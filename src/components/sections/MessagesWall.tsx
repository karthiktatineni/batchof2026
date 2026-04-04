'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MessagesWall.module.css';

gsap.registerPlugin(ScrollTrigger);

const messages = [
  { id: 1, text: "To the late-night canteen sessions and impromptu road trips, thank you for making it all worthwhile.", author: "Arjun S." },
  { id: 2, text: "I came here for a degree, I'm leaving with a family. Keep in touch, everyone.", author: "Meera K." },
  { id: 3, text: "May our future selves look back and smile at the chaos we caused. Cheers to the Class of '26!", author: "Vikram R." },
  { id: 4, text: "The lectures were long, but the years flew by. I'll miss our designated bench in the quad.", author: "Neha P." },
  { id: 5, text: "To all the professors who tolerated our excuses: we're finally leaving!", author: "Rahul T." },
  { id: 6, text: "Remember when we thought passing the first semester was impossible? Look at us now.", author: "Anjali D." },
  { id: 7, text: "The proxy attendances, the terrible jokes, the unbreakable bonds.", author: "Karthik" },
  { id: 8, text: "Thanks for always sharing your notes the night before the finals. You know who you are.", author: "Nitish" },
  { id: 9, text: "I'll never forget the adrenaline of submitting assignments at 11:59 PM.", author: "Pooja M." },
  { id: 10, text: "From freshers' party to farewell, we've come a long way. Best of luck, batchmates!", author: "Siddharth V." },
  { id: 11, text: "If we survived that one terrifying professor together, we can survive anything.", author: "Sneha R." },
  { id: 12, text: "Those endless club meetings that turned into pizza parties. Pure nostalgia.", author: "Aditya C." },
  { id: 13, text: "We started in a screen during orientation and ended up brothers in arms.", author: "Rohit K." },
  { id: 14, text: "This isn't a goodbye, it's a 'see you at the reunion'.", author: "Priya S." },
  { id: 15, text: "The unspoken rule: if one fails, we all fail. And we barely failed!", author: "Karan B." },
  { id: 16, text: "Endless gratitude to the batch of 2026. Keep shining, trailblazers.", author: "Divya N." },
];

export default function MessagesWall() {
  return (
    <section className={`section ${styles.section}`} id="messages">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <div className="section-label reveal">Student notes</div>
          <h2 className="reveal">The book</h2>
          <p className="reveal">Scribbles from the heart, digitized for eternity.</p>
        </div>

        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {[...messages, ...messages].map((message, i) => {
              const yOffset = i % 3 === 0 ? '-40px' : i % 3 === 1 ? '40px' : '0px';
              const rotate = i % 2 === 0 ? '-4deg' : '4deg';

              return (
                <div
                  key={`msg-${i}`}
                  className={styles.messageCard}
                  style={{ transform: `translateY(${yOffset}) rotate(${rotate})` }}
                >
                  <div className={styles.quoteMark}>"</div>
                  <p className={styles.text}>{message.text}</p>
                  <p className={styles.author}>— {message.author}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
