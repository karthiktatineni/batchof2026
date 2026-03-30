'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './MemoryGallery.module.css';

// Dynamically import heavy 3D components to prevent SSR issues
const CircularGallery = dynamic(() => import('@/components/ui/CircularGallery'), { ssr: false });
const DomeGallery = dynamic(() => import('@/components/ui/DomeGallery'), { ssr: false });

export default function MemoryGallery() {
  const [activeTab, setActiveTab] = useState<'circular' | 'dome'>('circular');

  return (
    <section className={`section ${styles.section}`} id="gallery">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <div className="section-label reveal">The Archives</div>
          <h2 className="reveal">Infinite Memories</h2>
          <p className="reveal">
            Scroll or drag to explore our collective visual history. Every angle holds a different story.
          </p>
          
          <div className={`reveal ${styles.tabs}`}>
            <button 
              className={`${styles.tab} ${activeTab === 'circular' ? styles.active : ''}`}
              onClick={() => setActiveTab('circular')}
            >
              Cylinder Gallery
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'dome' ? styles.active : ''}`}
              onClick={() => setActiveTab('dome')}
            >
              Dome Explorer
            </button>
          </div>
        </div>

        <div className={`${styles.galleryWrapper} reveal-scale`}>
          {activeTab === 'circular' && (
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
          )}
          
          {activeTab === 'dome' && (
            <div className={styles.interactiveArea}>
              <DomeGallery 
                fit={0.8}
                minRadius={600}
                maxVerticalRotationDeg={20}
                segments={34}
                dragDampening={2}
                grayscale={false}
              />
              <div className={styles.hint}>Drag to explore</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
