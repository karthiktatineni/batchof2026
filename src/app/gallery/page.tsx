'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';
import { X, ZoomIn, Camera, MapPin, Calendar, Heart } from 'lucide-react';
import Link from 'next/link';

// Image data structure
interface GalleryImage {
  id: string;
  src: string;
  category: 'Campus' | 'Moments' | 'Events' | 'All';
  title: string;
  date?: string;
  aspect?: string;
}

const images: GalleryImage[] = [
  // td1 - Campus
  { id: 'c1', src: '/td1/IMG_0236.JPG', category: 'Campus', title: 'Campus Corridors' },
  { id: 'c2', src: '/td1/IMG_0273.JPG', category: 'Campus', title: 'Main Arch' },
  { id: 'c3', src: '/td1/IMG_0358.JPG', category: 'Campus', title: 'Golden Hour' },
  { id: 'c4', src: '/td1/IMG_0440.JPG', category: 'Campus', title: 'Library Lane' },
  { id: 'c5', src: '/td1/IMG_0485.jpg', category: 'Campus', title: 'Evening Glow' },
  { id: 'c6', src: '/td1/IMG_E0044.JPG', category: 'Campus', title: 'Modern Wings' },

  // td2 - Moments
  { id: 'm1', src: '/td2/IMG_7072.jpg', category: 'Moments', title: 'Unplanned Stops' },
  { id: 'm2', src: '/td2/IMG_7188.jpg', category: 'Moments', title: 'Laughs & Chaos' },
  { id: 'm3', src: '/td2/IMG_7720.jpg', category: 'Moments', title: 'The Last Trip' },
  { id: 'm4', src: '/td2/IMG_7794.jpg', category: 'Moments', title: 'Coffee Runs' },

  // td3 - Events
  { id: 'e1', src: '/td3/IMG20250415114235.jpg', category: 'Events', title: 'Farewell Eve' },
  { id: 'e2', src: '/td3/IMG20250415120108.jpg', category: 'Events', title: 'Annual Day' },
  { id: 'e3', src: '/td3/IMG20250415120412.jpg', category: 'Events', title: 'Fest Vibes' },
  { id: 'e4', src: '/td3/IMG20250415120705.jpg', category: 'Events', title: 'Group Photos' },
  { id: 'e5', src: '/td3/IMG20250415123112.jpg', category: 'Events', title: 'Behind the Scenes' },
  { id: 'e6', src: '/td3/IMG20250415124255.jpg', category: 'Events', title: 'Stage Moments' },
  { id: 'e7', src: '/td3/IMG20250415124257.jpg', category: 'Events', title: 'Crowd Cheers' },
  { id: 'e8', src: '/td3/IMG20250415124815.jpg', category: 'Events', title: 'Prize Winners' },
  { id: 'e9', src: '/td3/IMG20250415125707.jpg', category: 'Events', title: 'The Band' },
  { id: 'e10', src: '/td3/IMG20250415130055.jpg', category: 'Events', title: 'Flash Mob' },
  { id: 'e11', src: '/td3/IMG20250415141656.jpg', category: 'Events', title: 'Workshop Days' },
  { id: 'e12', src: '/td3/IMG20250415144357.jpg', category: 'Events', title: 'Tech Talk' },
  { id: 'e13', src: '/td3/IMG20250415150222.jpg', category: 'Events', title: 'Seminar Hall' },
  { id: 'e14', src: '/td3/IMG20250415150300.jpg', category: 'Events', title: 'Question Hour' },
  { id: 'e15', src: '/td3/IMG20250415160503.jpg', category: 'Events', title: 'Closing Ceremony' },
  { id: 'e16', src: '/td3/IMG20250416191619.jpg', category: 'Events', title: 'Dinner Night' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<'All' | 'Campus' | 'Moments' | 'Events'>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Filtered images
  const filteredImages = useMemo(() => {
    return filter === 'All' 
      ? images 
      : images.filter(img => img.category === filter);
  }, [filter]);

  // Handle keyboard escape for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className={styles.page}>
      {/* Scroll Navigation Reference only, uses global Nav */}
      <header className={styles.header}>
        <div className="section-label">Archive // 2022-2026</div>
        <h1>Visual Journey</h1>
        <p>A collective gallery of moments that defined our four years. From the quiet corners of the campus to the loudest celebrations.</p>
      </header>

      {/* Filter Controls */}
      <div className={styles.filters}>
        {(['All', 'Campus', 'Moments', 'Events'] as const).map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.activeBtn : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <motion.section 
        className={styles.masonry}
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img) => (
            <motion.div
              layout
              key={img.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className={styles.item}
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className={styles.image}
                loading="lazy"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.lightbox}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              className={styles.closeBtn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={24} />
            </motion.button>
            
            <motion.div 
              className={styles.lightboxContent}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className={styles.lightboxImage}
              />
              
              <div className={styles.lightboxDetails}>
                <div className={styles.lightboxMeta}>
                  <span className={styles.lightboxCategory}>{selectedImage.category}</span>
                  <h2 className={styles.lightboxTitle}>{selectedImage.title}</h2>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className={styles.footer}>
        <p>© 2026 Class Archive. Keep the memories alive.</p>
        <Link href="/" className={styles.backHome}>
          Back to Story
        </Link>
      </footer>
    </main>
  );
}
