'use client';

import React, { useMemo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import styles from './CircularGallery.module.css';

interface CircularGalleryProps {
  bend?: number;
  scrollSpeed?: number;
  scrollEase?: number;
  borderRadius?: number;
  textColor?: string;
}

const CircularGallery: React.FC<CircularGalleryProps> = ({ 
  bend = 3,
  scrollSpeed = 1,
  scrollEase = 0.05,
  borderRadius = 12,
  textColor = '#ffffff',
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const rotation = useMotionValue(0);
  
  const items = useMemo(() => {
    const images = [
      '/td3/IMG20250415124257.jpg',
      '/td3/IMG20250415124815.jpg',
      '/td3/IMG20250415125707.jpg',
      '/td3/IMG20250415130055.jpg',
      '/td3/IMG20250415141656.jpg',
      '/td3/IMG20250415144357.jpg',
      '/td1/IMG_0440.JPG',
      '/td1/IMG_E0044.JPG',
      '/td3/IMG20250415160503.jpg',
      '/td3/IMG20250416191619.jpg',
      '/td1/IMG_0236.JPG',
      '/td1/IMG_0273.JPG',
    ];
    return images.map((src, i) => ({
      id: i,
      src,
      angle: (i / 12) * 360,
    }));
  }, []);

  const smoothRotation = useSpring(rotation, { 
    damping: 30, 
    stiffness: 120,
    mass: 0.5,
    restDelta: 0.001,
  });

  React.useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      const container = containerRef.current;
      if (!container) return;

      // Check if the scroll happened inside our gallery box
      const rect = container.getBoundingClientRect();
      const isInside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (isInside) {
        // Stop the page from scrolling
        if (e.cancelable) {
          e.preventDefault();
        }
        e.stopPropagation();
        
        // Apply rotation
        const current = rotation.get();
        // Increased sensitivity for a more responsive feel
        rotation.set(current + e.deltaY * 0.4 * scrollSpeed);
      }
    };

    // Attach to window to guarantee we catch the event before it scrolls the page
    window.addEventListener('wheel', handleGlobalWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
    };
  }, [rotation, scrollSpeed]);

  const bind = useGesture(
    {
      onDrag: ({ delta: [dx] }) => {
        const current = rotation.get();
        rotation.set(current + dx * 0.4);
      },
    },
    { 
      drag: { 
        filterTaps: true,
        from: () => [0, 0],
      }
    }
  );

  // Adjust radius based on bend - higher bend means tighter circle (further away)
  const radius = 450 + (bend * 20);

  return (
    <div ref={containerRef} {...bind()} className={styles.wrapper}>
      <div className={styles.scene}>
        <motion.div 
          className={styles.cylinder}
          style={{ rotateY: smoothRotation }}
        >
          {items.map((item) => (
            <div 
              key={item.id}
              className={styles.item}
              style={{
                transform: `rotateY(${item.angle}deg) translateZ(${radius}px)`,
                borderRadius: typeof borderRadius === 'number' && borderRadius < 1 ? `${borderRadius * 100}%` : `${borderRadius}px`,
                color: textColor,
              }}
            >
              <img 
                src={item.src} 
                alt={`Memory ${item.id}`} 
                className={styles.image}
                loading="lazy"
              />
              <div 
                className={styles.overlay} 
                style={{ background: `linear-gradient(to bottom, transparent 60%, ${textColor}33)` }} 
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CircularGallery;
