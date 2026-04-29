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
  '/Any group Photos Taken by Your batch (File responses)/IMG-20260315-WA0081 - B Krishna.jpg',
  '/Any group Photos Taken by Your batch (File responses)/IMG-20260313-WA0542 - Hemasri Podakanti.jpg',
  '/Any group Photos Taken by Your batch (File responses)/group pic - 23955A0408 PADIGELA KALYANI.jpg',
  '/Any group Photos Taken by Your batch (File responses)/IMG_0006 - Lingam Suresh.jpeg'
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
            start: 'top 95%',
            end: 'bottom 5%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Slideshow + Scroll logic
    bgRefs.current.forEach((img, i) => {
      if (!img) return;
      
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: `top+=${(i / bgImages.length) * 100}% center`,
        end: `top+=${((i + 1) / bgImages.length) * 100}% center`,
        onToggle: self => {
          if (self.isActive) {
            gsap.to(bgRefs.current, { opacity: 0, duration: 1.5 });
            gsap.to(img, { opacity: 1, duration: 1.5 });
          }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className={`section ${styles.section}`} ref={containerRef}>
      <div className={styles.background}>
        {bgImages.map((src, i) => (
          <div 
            key={src}
            ref={el => { bgRefs.current[i] = el as any; }}
            className={styles.bgImageWrapper}
            style={{ 
              opacity: i === 0 ? 1 : 0,
              zIndex: i === 0 ? 2 : 1
            }}
          >
            <img src={src} alt="" className={styles.bgImage} />
          </div>
        ))}
        <div className={styles.overlay} />
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
