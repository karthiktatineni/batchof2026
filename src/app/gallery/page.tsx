'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';
import { X } from 'lucide-react';
import Link from 'next/link';
import { galleryImages, GalleryImage, YearCategory } from '@/lib/gallery-data';

type FilterOption = 'All' | YearCategory;
const FILTERS: FilterOption[] = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year'];

// How many images to show initially (progressive reveal)
const PAGE_SIZE = 60;

export default function GalleryPage() {
  const [filter, setFilter] = useState<FilterOption>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // Track which images have already been loaded into DOM
  const loadedCategories = useRef<Set<FilterOption>>(new Set(['All']));

  const handleFilterChange = useCallback((f: FilterOption) => {
    setFilter(f);
    loadedCategories.current.add(f);
    setVisibleCount(PAGE_SIZE);
  }, []);

  // Count per category
  const countFor = (cat: FilterOption) =>
    cat === 'All' ? galleryImages.length : galleryImages.filter(i => i.category === cat).length;

  // Filtered images for lightbox navigation
  const filteredImages =
    filter === 'All' ? galleryImages : galleryImages.filter(i => i.category === filter);

  // Scroll to load more
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 900) {
        setVisibleCount(prev => Math.min(prev + PAGE_SIZE, galleryImages.length));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowRight') {
        const idx = filteredImages.findIndex(i => i.id === selectedImage.id);
        if (idx < filteredImages.length - 1) setSelectedImage(filteredImages[idx + 1]);
      }
      if (e.key === 'ArrowLeft') {
        const idx = filteredImages.findIndex(i => i.id === selectedImage.id);
        if (idx > 0) setSelectedImage(filteredImages[idx - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredImages]);

  // Determine visible slice index globally across all images
  const isVisible = (img: GalleryImage, globalIdx: number): boolean => {
    const matchesFilter = filter === 'All' || img.category === filter;
    // Only show up to visibleCount items within the current filter view
    const itemsInFilter = filter === 'All'
      ? galleryImages.slice(0, visibleCount)
      : galleryImages.filter(i => i.category === filter).slice(0, visibleCount);
    return matchesFilter && itemsInFilter.some(i => i.id === img.id);
  };

  const hasMore = visibleCount < filteredImages.length;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className="section-label">Archive // 2022–2026</div>
        <h1>Visual Journey</h1>
        <p>
          Four years of memories — {galleryImages.length} photos from every chapter of our story.
        </p>
      </header>

      {/* Year Filter Controls */}
      <div className={styles.filters}>
        {FILTERS.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.activeBtn : ''}`}
            onClick={() => handleFilterChange(cat)}
          >
            {cat}
            <span className={styles.filterCount}>{countFor(cat)}</span>
          </button>
        ))}
      </div>

      {/*
        KEY FOR CACHING: All images stay in the DOM permanently.
        We use CSS visibility/opacity + pointer-events to show/hide.
        Browser keeps decoded images in memory cache — switching filters is instant.
      */}
      <section className={styles.masonry}>
        {galleryImages.map((img, globalIdx) => {
          const visible = isVisible(img, globalIdx);
          return (
            <div
              key={img.id}
              className={`${styles.item} ${visible ? styles.itemVisible : styles.itemHidden}`}
              onClick={() => visible && setSelectedImage(img)}
              aria-hidden={!visible}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.title}
                className={styles.image}
                loading={globalIdx < 12 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={globalIdx < 6 ? 'high' : 'low'}
              />
              <div className={styles.itemOverlay}>
                <span className={styles.itemYear}>{img.category}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Load more */}
      {hasMore && (
        <div className={styles.loadMoreWrap}>
          <button
            className={styles.loadMoreBtn}
            onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
          >
            Load More ({filteredImages.length - visibleCount} remaining)
          </button>
        </div>
      )}

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
            {(() => {
              const idx = filteredImages.findIndex(i => i.id === selectedImage.id);
              return (
                <>
                  {idx > 0 && (
                    <button
                      className={`${styles.navBtn} ${styles.navPrev}`}
                      onClick={e => { e.stopPropagation(); setSelectedImage(filteredImages[idx - 1]); }}
                    >‹</button>
                  )}
                  {idx < filteredImages.length - 1 && (
                    <button
                      className={`${styles.navBtn} ${styles.navNext}`}
                      onClick={e => { e.stopPropagation(); setSelectedImage(filteredImages[idx + 1]); }}
                    >›</button>
                  )}
                </>
              );
            })()}

            <motion.button
              className={styles.closeBtn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(null)}
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className={styles.lightboxImage}
                loading="eager"
                decoding="async"
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
        <p>© 2026 Class Archive · Keep the memories alive.</p>
        <Link href="/" className={styles.backHome}>Back to Story</Link>
      </footer>
    </main>
  );
}
