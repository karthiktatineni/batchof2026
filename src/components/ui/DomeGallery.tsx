'use client';

import { useEffect, useRef, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import { gsap } from 'gsap';
import { getCdnUrl } from '@/utils/cdn';

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
  minRadius = 800,
  maxVerticalRotationDeg = 60,
  segments = 34,
  dragDampening = 10,
  grayscale = false,
}: DomeGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const bind = useGesture({
    onDrag: ({ delta: [dx, dy], memo = { x: 0, y: 0 } }) => {
      if (!containerRef.current) return;
      
      const nextX = memo.x + dx / 4; 
      const nextY = Math.max(
        -maxVerticalRotationDeg, 
        Math.min(maxVerticalRotationDeg, memo.y + dy / 2)
      );

      gsap.to(containerRef.current, {
        rotationY: nextX,
        rotationX: -nextY,
        duration: 0.8,
        ease: 'power2.out',
      });

      return { x: nextX, y: nextY };
    },
  }, {
    drag: {
      from: () => [0, 0],
    }
  });

  const generateImages = () => {
    // Current pool is empty as requested
    const pool: string[] = [];
    
    // Fallback if empty, but we'll respect "delete all"
    if (pool.length === 0) return null;

    const total = isMobile ? 12 : 24; // Optimized for mobile performance
    
    return Array.from({ length: total }).map((_, i) => {
      const angle = (i / total) * Math.PI * 2;
      const radius = minRadius;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const rotateY = angle * (180 / Math.PI);
      
      const verticalVariation = (i % 3 - 1) * 280 + (Math.sin(i) * 60);
      const imgSrc = getCdnUrl(pool[i % pool.length]);

      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate3d(${x}px, ${verticalVariation}px, ${z}px) rotateY(${rotateY}deg)`,
            width: isMobile ? '160px' : '200px',
            height: isMobile ? '220px' : '280px',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={imgSrc} 
            alt={`Gallery image ${i}`}
            draggable={false}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '2px solid rgba(255,255,255,0.1)',
              userSelect: 'none',
              pointerEvents: 'none',
              filter: grayscale ? 'brightness(0.8) grayscale(1)' : 'brightness(0.8)',
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
        perspective: '1500px',
        overflow: 'hidden',
        cursor: 'grab',
        touchAction: 'none',
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
