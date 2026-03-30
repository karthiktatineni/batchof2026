'use client';

import { useEffect, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import { gsap } from 'gsap';

interface DomeGalleryProps {
  fit?: number;
  minRadius?: number;
  maxVerticalRotationDeg?: number;
  segments?: number;
  dragDampening?: number;
  grayscale?: boolean;
}

export default function DomeGallery({
  fit = 0.8,
  minRadius = 600,
  maxVerticalRotationDeg = 0,
  segments = 34,
  dragDampening = 2,
  grayscale = false,
}: DomeGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ x: 0, y: 0 });

  const bind = useGesture({
    onDrag: ({ offset: [mx, my], direction: [dx, dy] }) => {
      if (!containerRef.current) return;
      
      // Calculate rotation based on drag
      rotationRef.current.x = mx / dragDampening;
      rotationRef.current.y = Math.max(
        -maxVerticalRotationDeg, 
        Math.min(maxVerticalRotationDeg, my / dragDampening)
      );

      gsap.to(containerRef.current, {
        rotationY: rotationRef.current.x,
        rotationX: -rotationRef.current.y,
        duration: 0.5,
        ease: 'power2.out',
      });
    },
  });

  const generateImages = () => {
    return Array.from({ length: 12 }).map((_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = minRadius;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const rotateY = angle * (180 / Math.PI);

      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg)`,
            width: '300px',
            height: '400px',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={`https://picsum.photos/400/600?random=${i}&grayscale=${grayscale ? 1 : 0}`} 
            alt={`Gallery image ${i}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '2px solid rgba(255,255,255,0.1)',
            }}
          />
        </div>
      );
    });
  };

  return (
    <div 
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        perspective: '1000px',
        overflow: 'hidden',
        cursor: 'grab',
      }}
      {...bind()}
    >
      <div 
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          transformStyle: 'preserve-3d',
        }}
      >
        {generateImages()}
      </div>
    </div>
  );
}
