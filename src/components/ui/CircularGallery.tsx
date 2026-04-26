'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import styles from './CircularGallery.module.css';
import { getCdnUrl } from '@/utils/cdn';

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const items = useMemo(() => {
    // Current images are empty as requested
    const images: string[] = [];
    
    if (images.length === 0) return [];

    const total = images.length;
    return images.map((src, i) => ({
      id: i,
      src: getCdnUrl(src),
      angle: (i / total) * 360,
    }));
  }, []);

  const smoothRotation = useSpring(rotation, { 
    damping: isMobile ? 40 : 30, // Smoother damping for mobile
    stiffness: isMobile ? 100 : 120,
    mass: 0.5,
    restDelta: 0.001,
  });

  React.useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const isInside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (isInside) {
        if (e.cancelable) {
          e.preventDefault();
        }
        e.stopPropagation();
        
        const current = rotation.get();
        rotation.set(current + e.deltaY * 0.4 * scrollSpeed);
      }
    };

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

  const radius = (isMobile ? 300 : 450) + (bend * 20);

  if (items.length === 0) return null;

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
