'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';
import Link from 'next/link';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(
      badgeRef.current,
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, delay: 0.3 }
    )
      .fromTo(
        headlineRef.current,
        { y: 60, opacity: 0, rotationX: 10 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.4 },
        "-=0.7"
      )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=1.0"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      );

    // Reactive mouse movement for the background
    const handleMouseMove = (e: MouseEvent) => {
      if (!meshRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(meshRef.current, {
        x: x * 60,
        y: y * 60,
        duration: 2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className={styles.hero} ref={heroRef} id="hero">
      {/* Background Layers */}
      <div className={styles.background}>
        <div className={styles.meshGradient} ref={meshRef} />
        <div className={styles.gridOverlay} />
        <div className={styles.noiseOverlay} />
        <div className={styles.vignette} />
      </div>

      {/* Main Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.badge} ref={badgeRef}>
          <span className={styles.badgeIcon}>✦</span>
          <span className={styles.badgeText}>CLASS OF 2026 // DIGITAL YEARBOOK</span>
        </div>

        <h1 className={styles.headline} ref={headlineRef}>
          <span className={styles.headlineLine}>More than a</span>
          <span className={styles.headlineLine}>
            <span className={styles.italicText}>campus.</span> A thousand
          </span>
          <span className={styles.headlineLine}>memories.</span>
        </h1>

        <p className={styles.subtitle} ref={subtitleRef}>
          Four years passed like a single breathless moment. This is our digital time capsule—a symphony of late nights, unwritten rules, and friendships that outlasted it all.
        </p>

        <div className={styles.ctaWrapper} ref={ctaRef}>
          <Link href="/class" className={styles.primaryBtn}>
            <span className={styles.btnText}>Meet the Class</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
