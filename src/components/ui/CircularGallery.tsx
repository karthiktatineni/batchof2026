'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const rotation = useMotionValue(0);
  
  // Create 12 items for the cylinder
  const items = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    src: `https://picsum.photos/600/800?random=${i + 800}`,
    angle: (i / 12) * 360,
  })), []);

  const smoothRotation = useSpring(rotation, { 
    damping: 30, 
    stiffness: 120,
    mass: 0.5,
    restDelta: 0.001,
    // Note: scrollEase could be used here if we wanted to dynamically change spring settings
  });

  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) return;
      
      // Block page scroll
      e.preventDefault();
      
      // Update motion value directly
      const current = rotation.get();
      rotation.set(current + e.deltaY * 0.2 * scrollSpeed);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [scrollSpeed, rotation]);

  // Adjust radius based on bend - higher bend means tighter circle (further away)
  const radius = 450 + (bend * 20);

  return (
    <div ref={containerRef} className={styles.wrapper}>
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
