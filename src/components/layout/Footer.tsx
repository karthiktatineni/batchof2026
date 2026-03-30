'use client';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <span className={styles.logoIcon}>✦</span>
            <span className={styles.logoText}>College Memories</span>
          </div>

          <div className={styles.links}>
            <a href="#chapters">Journey</a>
            <a href="#map">Map</a>
            <a href="#timeline">Timeline</a>
          </div>
        </div>

        <div className={styles.bottom}>
          {/*© {new Date().getFullYear()} Batch of '25. All memories preserved.*/}
          <p className={styles.credit}>Crafted with 🤍 for the alumni</p>
        </div>
      </div>
    </footer>
  );
}
