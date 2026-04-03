'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ChapterScroll.module.css';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    id: '01',
    title: 'The First Day',
    subtitle: 'Nervous energy, lost in the corridors, and the first "Hi".',
    image: 'https://picsum.photos/1000/600?random=11',
  },
  {
    id: '02',
    title: 'The Fests',
    subtitle: 'Vibrant colors, sleepless event planning, and stage lights.',
    image: 'https://picsum.photos/1000/600?random=12',
  },
  {
    id: '03',
    title: 'Late Night Studies',
    subtitle: 'Midnight chats, group projects, and realizing exams are tomorrow.',
    image: 'https://picsum.photos/1000/600?random=13',
  },
];

export default function ChapterScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const panels = panelsRef.current;

    // Horizontal scroll pinning
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + containerRef.current!.offsetWidth * panels.length
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section className={`section ${styles.section}`} id="chapters" ref={containerRef}>
      <div className={styles.scrollContainer}>
        {chapters.map((chapter, i) => (
          <div 
            key={chapter.id} 
            className={styles.panel}
            ref={(el) => { panelsRef.current[i] = el; }}
          >
            <div className={styles.imageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={chapter.image} alt={chapter.title} className={styles.image} loading="lazy" />
              <div className={styles.overlay} />
            </div>
            <div className={styles.content}>
              <div className={styles.chapterNum}>Ch. {chapter.id}</div>
              <h2 className={styles.title}>{chapter.title}</h2>
              <p className={styles.subtitle}>{chapter.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
