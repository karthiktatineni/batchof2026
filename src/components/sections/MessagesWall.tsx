'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MessagesWall.module.css';

gsap.registerPlugin(ScrollTrigger);

const messages = [
  { id: 1, text: "To the late-night canteen sessions and impromptu road trips, thank you for making it all worthwhile.", author: "Arjun S." },
  { id: 2, text: "I came here for a degree, I'm leaving with a family. Keep in touch, everyone.", author: "Meera K." },
  { id: 3, text: "May our future selves look back and smile at the chaos we caused. Cheers to the Class of '25!", author: "Vikram R." },
  { id: 4, text: "The lectures were long, but the years flew by. I'll miss our designated bench in the quad.", author: "Neha P." },
  { id: 5, text: "To all the professors who tolerated our excuses: we're finally leaving!", author: "Rahul T." },
  { id: 6, text: "Remember when we thought passing the first semester was impossible? Look at us now.", author: "Anjali D." }
];

export default function MessagesWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(card,
        {
          y: 60,
          opacity: 0,
          rotation: index % 2 === 0 ? -3 : 3,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: (index % 3) * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className={`section ${styles.section}`} id="messages">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <div className="section-label reveal">Student notes</div>
          <h2 className="reveal">The book</h2>
          <p className="reveal">Scribbles from the heart, digitized for eternity.</p>
        </div>

        <div className={styles.masonryGrid} ref={containerRef}>
          {messages.map((message, i) => (
            <div
              key={message.id}
              className={styles.messageCard}
              ref={(el) => { cardsRef.current[i] = el; }}
            >
              <div className={styles.quoteMark}>"</div>
              <p className={styles.text}>{message.text}</p>
              <p className={styles.author}>— {message.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
