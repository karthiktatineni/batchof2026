'use client';

import { useState } from 'react';
import styles from './StoryReels.module.css';
import { getCdnUrl } from '@/utils/cdn';

const reels = [
  {
    id: 1,
    title: 'THE BOYS',
    images: []
  },
  {
    id: 2,
    title: '',
    images: []
  },
  {
    id: 3,
    title: '',
    images: []
  },
  {
    id: 4,
    title: '',
    images: []
  },
];

export default function StoryReels() {
  const [activeReelId, setActiveReelId] = useState<number | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const activeReel = reels.find(r => r.id === activeReelId);

  // Filter out empty reels for the main list
  const validReels = reels.filter(r => r.images.length > 0);

  const nextImage = () => {
    if (!activeReel) return;
    if (currentIdx < activeReel.images.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setActiveReelId(null);
      setCurrentIdx(0);
    }
  };

  const prevImage = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const openReel = (id: number) => {
    setActiveReelId(id);
    setCurrentIdx(0);
  };

  if (validReels.length === 0) return null;

  return (
    <section className={`section ${styles.section}`} id="stories">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <div className="section-label reveal">Highlights</div>
          <h2 className="reveal">Featured Chronicles</h2>
        </div>

        <div className={styles.reelsWrapper}>
          {validReels.map((reel, idx) => (
            <div
              key={reel.id}
              className={`${styles.reelCard} reveal`}
              style={{ animationDelay: `${idx * 0.15}s` }}
              onClick={() => openReel(reel.id)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={getCdnUrl(reel.images[0])} alt={reel.title} className={styles.image} loading="lazy" />
              <div className={styles.overlay}>
                <div className={styles.ring} />
                <h3 className={styles.title}>{reel.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {activeReel && (
          <div className={styles.viewerModal} onClick={() => setActiveReelId(null)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setActiveReelId(null)}>×</button>

              <div className={styles.storyHeader}>
                <div className={styles.progressBarWrapper}>
                  {activeReel.images.map((_, i) => (
                    <div key={i} className={styles.progressContainer}>
                      <div
                        className={styles.progressFillStatic}
                        style={{
                          width: i < currentIdx ? '100%' : i === currentIdx ? '0%' : '0%',
                          backgroundColor: i < currentIdx ? 'var(--color-accent-warm)' : 'rgba(255,255,255,0.2)'
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.storyMeta}>
                  <span className={styles.storyTitle}>{activeReel.title}</span>
                </div>
              </div>

              <div className={styles.imageNavWrapper}>
                <div className={styles.navZone} onClick={prevImage} />
                <div className={styles.navZone} onClick={nextImage} />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getCdnUrl(activeReel.images[currentIdx])}
                  alt="Story content"
                  className={styles.modalImage}
                />
              </div>

              <div className={styles.modalFooter}>
                <span>{currentIdx + 1} / {activeReel.images.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
