'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './QuotesSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  { text: "We didn't realize we were making memories, we just knew we were having fun.", author: "Anonymous" },
  { text: "The days were long, but the years were short.", author: "Batch of '25" }
];

export default function QuotesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    textRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(el, 
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { 
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://picsum.photos/1920/1080?random=30&grayscale=1" alt="Background" className={styles.bgImage} />
        <div className={styles.overlay} />
      </div>
      
      <div className={`container ${styles.container}`}>
        {quotes.map((quote, i) => (
          <div key={i} className={styles.quoteBlock}>
            <h2 className={styles.quoteText} ref={el => { textRefs.current[i] = el; }}>
              &quot;{quote.text}&quot;
            </h2>
            <p className={styles.author}>— {quote.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
