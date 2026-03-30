'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './BounceCards.module.css';

interface BounceCardsProps {
  className?: string;
  images: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles: string[];
  enableHover?: boolean;
}

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 500,
  containerHeight = 250,
  animationDelay = 0.5,
  animationStagger = 0.08,
  easeType = 'elastic.out(1, 0.5)',
  transformStyles = [],
  enableHover = false,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return;

    gsap.fromTo(
      cardsRef.current,
      { y: 150, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      gsap.killTweensOf(cardsRef.current);
    };
  }, [animationDelay, animationStagger, easeType]);

  const handleMouseEnter = (index: number) => {
    if (!enableHover || !cardsRef.current[index]) return;
    gsap.to(cardsRef.current[index], { y: -20, scale: 1.05, duration: 0.4, ease: 'power2.out' });
  };

  const handleMouseLeave = (index: number) => {
    if (!enableHover || !cardsRef.current[index]) return;
    gsap.to(cardsRef.current[index], { y: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={{
        width: '100%',
        maxWidth: `${containerWidth}px`,
        height: `${containerHeight}px`,
      }}
    >
      {images.map((src, idx) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={`card-${idx}`}
          ref={(el) => { cardsRef.current[idx] = el; }}
          className={styles.card}
          style={{ transform: transformStyles[idx] || 'none' }}
          onMouseEnter={() => handleMouseEnter(idx)}
          onMouseLeave={() => handleMouseLeave(idx)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={`Memory ${idx + 1}`} className={styles.image} loading="lazy" />
        </div>
      ))}
    </div>
  );
}
