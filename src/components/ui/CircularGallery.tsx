'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
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
    const images = [
      '/WhatsApp Image 2026-04-29 at 10.32.40 AM.jpeg',
      '/Any group Photos Taken by Your batch (File responses)/IMG-20260315-WA0081 - B Krishna.jpg',
      '/Any group Photos Taken by Your batch (File responses)/IMG-20260313-WA0542 - Hemasri Podakanti.jpg',
      '/Any group Photos Taken by Your batch (File responses)/group pic - 23955A0408 PADIGELA KALYANI.jpg',
      '/Any group Photos Taken by Your batch (File responses)/IMG_0006 - Lingam Suresh.jpeg',
      '/Any group Photos Taken by Your batch (File responses)/IMG-20260315-WA0068 - EDHA MEGHANA.jpg',
      '/Any group Photos Taken by Your batch (File responses)/IMG-20260404-WA0003 - Hemasri Podakanti.jpg',
      '/Any group Photos Taken by Your batch (File responses)/IMG-20260405-WA0009 - Nithinreddy Diddakuntla.jpg',
      '/Any group Photos Taken by Your batch (File responses)/group photo - JAHNAVI MUDILI.jpeg',
      '/Any group Photos Taken by Your batch (File responses)/IMG-20240419-WA0010 - Preetham Preetham.jpg',
    ];
    
    if (images.length === 0) return [];

    const total = images.length;
    return images.map((src, i) => ({
      id: i,
      src: src,
      angle: (i / total) * 360,
    }));
  }, []);

  const smoothRotation = useSpring(rotation, { 
    damping: 30,
    stiffness: 120,
    mass: 0.1,
  });

  // Local wheel listener - only works when mouse is over the container
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
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
        // Only prevent default if we're actually over the gallery
        if (e.cancelable) e.preventDefault();
        rotation.set(rotation.get() + e.deltaY * 0.5 * scrollSpeed);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [rotation, scrollSpeed]);

  const bind = useGesture(
    {
      onDrag: ({ delta: [dx] }) => {
        rotation.set(rotation.get() + dx * 0.6);
      },
    },
    { 
      drag: { 
        filterTaps: true,
      }
    }
  );

  // Responsive radius calculation for sharp 3D
  const radius = useMemo(() => {
    if (typeof window === 'undefined') return 600;
    const baseRadius = window.innerWidth < 480 ? 280 : window.innerWidth < 768 ? 400 : 650;
    return baseRadius + (bend * 10);
  }, [bend, isMobile]);

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={item.src} 
                alt={`Memory ${item.id}`} 
                className={styles.image}
                loading="eager" // Load eager for clarity and speed
                decoding="sync"
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
