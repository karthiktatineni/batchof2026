'use client';

import { useState } from 'react';
import styles from './StoryReels.module.css';
import { getCdnUrl } from '@/utils/cdn';

const reels = [
  {
    id: 1,
    images: [
      '/Any group Photos Taken by Your batch (File responses)/IMG-20260315-WA0081 - B Krishna.jpg',
      '/Any group Photos Taken by Your batch (File responses)/IMG-20260315-WA0068 - EDHA MEGHANA.jpg',
      '/Any group Photos Taken by Your batch (File responses)/IMG_0006 - Lingam Suresh.jpeg'
    ]
  },
  {
    id: 2,
    images: [
      '/Any group Photos Taken by Your batch (File responses)/IMG-20260313-WA0542 - Hemasri Podakanti.jpg',
      '/Any group Photos Taken by Your batch (File responses)/IMG-20260404-WA0003 - Hemasri Podakanti.jpg',
      '/Any group Photos Taken by Your batch (File responses)/group pic - 23955A0408 PADIGELA KALYANI.jpg'
    ]
  },
  {
    id: 3,
    images: [
      '/Any group Photos Taken by Your batch (File responses)/IMG20260413122612 - 083-manju bhashini.jpg',
      '/Any group Photos Taken by Your batch (File responses)/IMG_20250701_002137 - Niranjan Devana.jpg',
      '/Any group Photos Taken by Your batch (File responses)/group photo - JAHNAVI MUDILI.jpeg'
    ]
  },
  {
    id: 4,
    images: [
      '/Any group Photos Taken by Your batch (File responses)/IMG-20240421-WA0043 - G. Suresh.jpg',
      '/Any group Photos Taken by Your batch (File responses)/IMG_20240419_234245 - Lithik Raj.jpg',
      '/Any group Photos Taken by Your batch (File responses)/IMG-20260405-WA0009 - Nithinreddy Diddakuntla.jpg'
    ]
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
              <img src={reel.images[0]} alt={reel.title} className={styles.image} loading="lazy" />
              <div className={styles.overlay}>
                <div className={styles.ring} />
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
                </div>
              </div>

              <div className={styles.imageNavWrapper}>
                <div className={styles.navZone} onClick={prevImage} />
                <div className={styles.navZone} onClick={nextImage} />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeReel.images[currentIdx]}
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
