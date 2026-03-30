'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Plane, Mesh, Program, Texture } from 'ogl';

interface CircularGalleryProps {
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
}

export default function CircularGallery({
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Basic OGL Setup
    const renderer = new Renderer({ alpha: true, dpr: 2 });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.z = 5;

    const scene = new Transform();

    const resize = () => {
      if (!containerRef.current) return;
      renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener('resize', resize, false);
    resize();

    // Shaders
    const vertex = `
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uBend;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        // Apply cylinder bend
        float radius = 2.0 / uBend;
        float angle = pos.x * uBend;
        pos.x = sin(angle) * radius;
        pos.z = cos(angle) * radius - radius;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragment = `
      precision highp float;
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(uColor * (0.8 + 0.2 * vUv.y), 1.0);
      }
    `;

    // Geometry & Material
    const geometry = new Plane(gl, { width: 1.5, height: 2, widthSegments: 20 });
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uBend: { value: bend },
        uColor: { value: [0.8, 0.6, 0.4] },
      },
      cullFace: null,
    });

    const items: Mesh[] = [];
    const numItems = 8;
    for (let i = 0; i < numItems; i++) {
        const mesh = new Mesh(gl, { geometry, program });
        mesh.setParent(scene);
        items.push(mesh);
    }

    let scrollTarget = 0;
    let scrollCurrent = 0;

    const onWheel = (e: WheelEvent) => {
      scrollTarget += e.deltaY * 0.001 * scrollSpeed;
    };
    containerRef.current.addEventListener('wheel', onWheel, { passive: true });

    let requestID: number;
    const update = () => {
      requestID = requestAnimationFrame(update);
      
      scrollCurrent += (scrollTarget - scrollCurrent) * scrollEase;
      
      items.forEach((mesh, i) => {
        const angle = (i / numItems) * Math.PI * 2 + scrollCurrent;
        const radius = 3;
        mesh.position.x = Math.sin(angle) * radius;
        mesh.position.z = Math.cos(angle) * radius - 2;
        mesh.rotation.y = angle;
      });

      renderer.render({ scene, camera });
    };
    requestID = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      if (containerRef.current?.contains(gl.canvas)) {
        containerRef.current.removeChild(gl.canvas);
      }
      containerRef.current?.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(requestID);
    };
  }, [bend, scrollSpeed, scrollEase]);

  return (
    <div 
      ref={containerRef} 
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} 
    />
  );
}
