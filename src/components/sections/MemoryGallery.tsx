'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './MemoryGallery.module.css';

// Dynamically import heavy 3D components to prevent SSR issues
const CircularGallery = dynamic(() => import('@/components/ui/CircularGallery'), { ssr: false });
// const DomeGallery = dynamic(() => import('@/components/ui/DomeGallery'), { ssr: false });

export default function MemoryGallery() {
  // const [activeTab, setActiveTab] = useState<'circular' | 'dome'>('circular');

  return (
    <section className={`section ${styles.section}`} id="gallery">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <div className="section-label reveal">The Archives</div>
          <h2 className="reveal">Infinite Memories</h2>
          <p className="reveal">
            Scroll or drag to explore our collective visual history. Every angle holds a different story.
          </p>

          <div className={styles.actions}>
            <a href="/gallery" className={styles.fullGalleryBtn}>
              <span>View All Photos</span>
              <div className={styles.btnIcon}>→</div>
            </a>
          </div>
          
          {/* 
          <div className={`reveal ${styles.tabs}`}>
            <button 
              className={`${styles.tab} ${styles.active}`}
            >
              Cylinder Gallery
            </button>
          </div>
          */}
        </div>

        <div className={`${styles.galleryWrapper} reveal-scale`}>
          <div className={styles.interactiveArea}>
            <CircularGallery 
              bend={3} 
              textColor="#ffffff" 
              borderRadius={0.05} 
              scrollSpeed={2}
              scrollEase={0.05}
            />
            <div className={styles.hint}>Scroll to rotate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
