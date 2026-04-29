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
    // Group photos for the circular gallery
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
      '/Any group Photos Taken by Your batch (File responses)/IMG_20260314_190526767_HDR_PORTRAIT - Preetham Preetham.jpg',
    ];
    
    if (images.length === 0) return [];

    const total = images.length;
    return images.map((src, i) => ({
      id: i,
      src: src, // No getCdnUrl needed if we use absolute paths in public
      angle: (i / total) * 360,
    }));
  }, []);

  const smoothRotation = useSpring(rotation, { 
    damping: 20,
    stiffness: 90,
    mass: 0.1,
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

  const radius = (isMobile ? 320 : 600) + (bend * 10);

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
