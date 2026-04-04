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
    image: '/td2/IMG_7720.jpg',
  },
  {
    id: '02',
    title: 'The Fests',
    subtitle: 'Vibrant colors, sleepless event planning, and stage lights.',
    image: '/td1/IMG_0273.JPG',
  },
  {
    id: '03',
    title: 'Late Night Studies',
    subtitle: 'Midnight chats, group projects, and realizing exams are tomorrow.',
    image: '/td2/IMG_7072.JPG',
  },
];

export default function ChapterScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const scrollContainer = containerRef.current?.querySelector(`.${styles.scrollContainer}`);
    if (!containerRef.current || !scrollContainer) return;

    const panels = gsap.utils.toArray(`.${styles.panel}`);

    const ctx = gsap.context(() => {
      gsap.to(scrollContainer, {
        x: () => -(scrollContainer.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (chapters.length - 1),
          // Base the duration on the amount of horizontal scroll
          end: () => "+=" + (scrollContainer.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`section ${styles.section}`} id="chapters" ref={containerRef}>
      <div className={styles.scrollContainer}>
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className={styles.panel}
          >
            <div className={styles.imageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={chapter.image}
                alt={chapter.title}
                className={styles.image}
                loading="lazy"
              />
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
