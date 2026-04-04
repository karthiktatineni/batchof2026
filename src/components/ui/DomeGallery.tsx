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
    const total = 24;
    const pool = [
      '/td1/IMG_0236.JPG', '/td1/IMG_0273.JPG', '/td1/IMG_0358.JPG', '/td1/IMG_0440.JPG', '/td1/IMG_0485.JPG', '/td1/IMG_E0044.JPG',
      '/td3/IMG20250415114235.jpg', '/td3/IMG20250415120108.jpg', '/td3/IMG20250415120412.jpg', '/td3/IMG20250415120705.jpg',
      '/td3/IMG20250415123112.jpg', '/td3/IMG20250415124255.jpg', '/td3/IMG20250415124257.jpg', '/td3/IMG20250415124815.jpg',
      '/td3/IMG20250415125707.jpg', '/td3/IMG20250415130055.jpg', '/td3/IMG20250415141656.jpg', '/td3/IMG20250415144357.jpg',
      '/td3/IMG20250415150222.jpg', '/td3/IMG20250415150300.jpg', '/td3/IMG20250415160503.jpg', '/td3/IMG20250416191619.jpg'
    ];

    return Array.from({ length: total }).map((_, i) => {
      const angle = (i / total) * Math.PI * 2;
      const radius = minRadius;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const rotateY = angle * (180 / Math.PI);
      
      const verticalVariation = (i % 3 - 1) * 280 + (Math.sin(i) * 60);
      const imgSrc = pool[i % pool.length];

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
            src={imgSrc} 
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
