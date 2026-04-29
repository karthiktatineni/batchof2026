import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import BounceCards from '@/components/ui/BounceCards';
import styles from './BounceCardsSection.module.css';

export default function BounceCardsSection() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const images = [
    '/Any group Photos Taken by Your batch (File responses)/IMG-20230503-WA0019 - Murali Krishna.jpg',
    '/Any group Photos Taken by Your batch (File responses)/IMG-20240803-WA0003 - Hemasri Podakanti.jpg',
    '/Any group Photos Taken by Your batch (File responses)/IMG-20241213-WA0268 - Hemasri Podakanti.jpg',
    '/Any group Photos Taken by Your batch (File responses)/IMG-20230427-WA0047 - Nagaraj Gatla.jpg',
    '/Any group Photos Taken by Your batch (File responses)/IMG-20221229-WA0008 - Murali Krishna.jpg',
  ];

  const transformStyles = [
    "rotate(15deg) translate(-220px, -150px)",
    "rotate(8deg) translate(-110px, -220px)",
    "rotate(0deg) translate(0, -260px)",
    "rotate(-8deg) translate(110px, -220px)",
    "rotate(-15deg) translate(220px, -150px)"
  ];

  if (images.length === 0) return null;

  return (
    <section className={`section ${styles.section}`} id="bounce-cards">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <div className="section-label reveal">The Middle Years</div>
          <h2 className="reveal">Chaos & Connections</h2>
          <p className={`reveal ${styles.sectionDesc}`}>
            Those nights before submissions where logic faded and only adrenaline remained.
          </p>
        </div>
        
        <div className={styles.cardsWrapper}>
          <BounceCards
            className="custom-bounceCards reveal"
            images={images}
            containerWidth={600}
            containerHeight={300}
            animationDelay={0.2}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.5)"
            transformStyles={transformStyles}
            enableHover={true}
            onCardClick={(src) => setSelectedImg(src)}
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <button className={styles.closeBtn} onClick={() => setSelectedImg(null)}>
              <X size={32} />
            </button>
            <motion.div 
              className={styles.lightboxContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedImg} alt="Memory" className={styles.lightboxImage} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
