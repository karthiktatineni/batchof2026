'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ChapterScroll.module.css';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    id: '01',
    title: 'Strangers Who Became Family',
    subtitle: 'From a classroom of unfamiliar faces to a bond that will last a lifetime.',
    image: '/Group%20photo.jpeg',
    position: 'top',
    objectPosition: 'center',
  },
  {
    id: '02',
    title: 'Brothers for Life',
    subtitle: 'Through thick and thin, the friendships we built are the truest treasures of these four years.',
    image: '/WhatsApp Image 2026-04-29 at 10.32.40 AM (3).jpeg',
    position: 'top',
    objectPosition: 'center',
  },
  {
    id: '03',
    title: 'A Thousand Memories',
    subtitle: "It's not just a goodbye; it's a 'see you later' to the years that defined us.",
    image: '/Any group Photos Taken by Your batch (File responses)/group photo - JAHNAVI MUDILI.jpeg',
    position: 'top',
    objectPosition: 'top',
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
      const totalWidth = window.innerWidth * (chapters.length - 1);

      gsap.to(scrollContainer, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (chapters.length - 1),
          end: () => "+=" + totalWidth,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });
    }, containerRef);

    ScrollTrigger.refresh();
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
              {/* Blurred background version */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={chapter.image}
                alt=""
                className={styles.imageBlur}
                aria-hidden="true"
              />
              {/* Main crisp image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={chapter.image}
                alt={chapter.title}
                className={styles.image}
                style={{ objectPosition: (chapter as any).objectPosition || 'center' }}
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
