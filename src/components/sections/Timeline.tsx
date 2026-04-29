'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Timeline.module.css';

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  { year: 'Year 1', date: 'Aug 2022', title: 'Orientation', desc: 'Faces we didn’t know, halls we got lost in.' },
  { year: 'Year 2', date: 'Oct 2023', title: 'The First Fest', desc: 'Decorations, music, and the first all-nighter for fun.' },
  { year: 'Year 3', date: 'Mar 2024', title: 'Internships & Panic', desc: 'Realizing adulting is difficult. But we had each other.' },
  { year: 'Year 4', date: 'May 2026', title: 'Final Project', desc: 'The last submission. Relief mixed with an strange emptiness.' },
];

export default function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!lineRef.current) return;

    gsap.fromTo(lineRef.current, 
      { height: '0%' },
      { 
        height: '100%', 
        ease: 'none',
        scrollTrigger: {
          trigger: `.${styles.timelineWrapper}`,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1,
        }
      }
    );

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className={`section ${styles.section}`} id="timeline">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <div className="section-label reveal">Chronicles // Timeline</div>
          <h2 className="reveal">The Journey</h2>
        </div>
        
        <div className={styles.timelineWrapper}>
          <div className={styles.lineBg} />
          <div className={styles.lineFill} ref={lineRef} />
          
          <div className={styles.events}>
            {timelineEvents.map((event, i) => (
              <div 
                key={i} 
                className={`${styles.item} ${i % 2 === 0 ? styles.itemLeft : styles.itemRight}`}
                ref={el => { itemsRef.current[i] = el; }}
              >
                <div className={styles.dot} />
                <div className={styles.card}>
                  <div className={styles.date}>{event.date}</div>
                  <h3 className={styles.title}>{event.title}</h3>
                  <p className={styles.desc}>{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
