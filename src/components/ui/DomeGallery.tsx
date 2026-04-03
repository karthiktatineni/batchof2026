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
  minRadius = 800, // Slightly larger radius for more space
  maxVerticalRotationDeg = 60, // Significantly increased for better up/down movement
  segments = 34,
  dragDampening = 10, // Significantly reduced sensitivity
  grayscale = false,
}: DomeGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ x: 0, y: 0 });

  const bind = useGesture({
    onDrag: ({ delta: [dx, dy], memo = { x: 0, y: 0 } }) => {
      if (!containerRef.current) return;
      
      // Update cumulative values with deltas
      // We divide by a factor to control sensitivity
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
      from: () => [0, 0], // reset start point
    }
  });

  const generateImages = () => {
    const total = 24; // More images for a fuller look
    return Array.from({ length: total }).map((_, i) => {
      const angle = (i / total) * Math.PI * 2;
      const radius = minRadius;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const rotateY = angle * (180 / Math.PI);
      
      // Jumbled vertical position: alternating rows with slight jitter
      // This creates the "up and down jumbled" effect you requested
      const verticalVariation = (i % 3 - 1) * 280 + (Math.sin(i) * 60);

      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate3d(${x}px, ${verticalVariation}px, ${z}px) rotateY(${rotateY}deg)`,
            width: '200px',
            height: '280px',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={`https://picsum.photos/300/400?random=${i}&grayscale=${grayscale ? 1 : 0}`} 
            alt={`Gallery image ${i}`}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '2px solid rgba(255,255,255,0.1)',
              userSelect: 'none',
              pointerEvents: 'none',
              filter: 'brightness(0.8)',
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
        perspective: '1500px', // More depth for the dome
        overflow: 'hidden',
        cursor: 'grab',
        touchAction: 'none', // Critical: prevent browser scroll hijacking vertical drags
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
