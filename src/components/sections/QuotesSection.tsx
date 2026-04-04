'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './QuotesSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  { text: "We didn't realize we were making memories, we just knew we were having fun.", author: "Anonymous" },
  { text: "The days were long, but the years were short.", author: "Batch of '26" }
];

const bgImages = [
  "/td1/IMG_0358.JPG",
  "/td3/IMG20250415125707.jpg",
  "/td3/IMG20250415150300.jpg",
  "/td1/IMG_0273.JPG"
];

export default function QuotesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Background cross-fade parallax logic
    bgRefs.current.forEach((img, i) => {
      if (!img) return;
      
      // Pin background and handle cross-fade
      gsap.to(img, {
        opacity: i === 0 ? 0 : 1, // Start with first visible, others hidden (fade out first, fade in others later)
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top+=${i * 25}% center`,
          end: `top+=${(i + 1) * 25}% center`,
          scrub: true,
        }
      });

      // Subtle parallax for all images
      gsap.fromTo(img, 
        { y: '-15%' },
        {
          y: '5%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    });

    // Content reveals
    textRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(el, 
        { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
        { 
          opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className={`section ${styles.section}`} ref={containerRef}>
      <div className={styles.background}>
        {bgImages.map((src, i) => (
          <img 
            key={src}
            ref={el => { bgRefs.current[i] = el; }}
            src={src} 
            alt={`Atmosphere ${i}`} 
            className={styles.bgImage} 
            style={{ 
              position: 'absolute', 
              opacity: i === 0 ? 1 : 0,
              zIndex: i + 1
            }} 
          />
        ))}
        <div className={styles.overlay} style={{ zIndex: bgImages.length + 1 }} />
      </div>
      
      <div className={`container ${styles.container}`}>
        {quotes.map((quote, i) => (
          <div key={i} className={styles.quoteBlock} ref={el => { textRefs.current[i] = el; }}>
            <h2 className={styles.quoteText}>
              &quot;{quote.text}&quot;
            </h2>
            <p className={styles.author}>— {quote.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
