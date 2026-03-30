'use client';

import { useState } from 'react';
import styles from './StoryReels.module.css';

const reels = [
  { id: 1, title: 'Campus Vibe', image: 'https://picsum.photos/400/700?random=21' },
  { id: 2, title: 'Library Chills', image: 'https://picsum.photos/400/700?random=22' },
  { id: 3, title: 'Tech Fest', image: 'https://picsum.photos/400/700?random=23' },
  { id: 4, title: 'Grad Trip', image: 'https://picsum.photos/400/700?random=24' },
];

export default function StoryReels() {
  const [activeReel, setActiveReel] = useState<number | null>(null);

  return (
    <section className={`section ${styles.section}`} id="stories">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <div className="section-label reveal">Highlights</div>
          <h2 className="reveal">Featured Chronicles</h2>
        </div>

        <div className={styles.reelsWrapper}>
          {reels.map((reel, idx) => (
            <div 
              key={reel.id} 
              className={`${styles.reelCard} reveal`}
              style={{ animationDelay: `${idx * 0.15}s` }}
              onClick={() => setActiveReel(reel.id)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={reel.image} alt={reel.title} className={styles.image} loading="lazy" />
              <div className={styles.overlay}>
                <div className={styles.ring} />
                <h3 className={styles.title}>{reel.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {activeReel !== null && (
          <div className={styles.viewerModal} onClick={() => setActiveReel(null)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setActiveReel(null)}>×</button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={reels.find(r => r.id === activeReel)?.image} 
                alt="Story content" 
                className={styles.modalImage} 
              />
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ animationPlayState: 'running' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
