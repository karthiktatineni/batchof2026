'use client';

import { useEffect, useState } from 'react';
import styles from './AchievementsSection.module.css';

const START_DATE = new Date('2022-11-03T10:00:00');

export default function AchievementsSection() {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setElapsed({ days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Days', value: String(elapsed.days).padStart(3, '0') },
    { label: 'Hours', value: String(elapsed.hours).padStart(2, '0') },
    { label: 'Minutes', value: String(elapsed.minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(elapsed.seconds).padStart(2, '0') },
  ];

  return (
    <section className={`section ${styles.section}`} id="achievements">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <div className="section-label reveal">The Journey</div>
          <h2 className="reveal">Since the Day It All Began</h2>
          <p className={`reveal ${styles.goldDate}`}>November 3, 2022</p>
        </div>

        <div className={styles.grid}>
          {timeUnits.map((item, i) => (
            <div key={i} className={`${styles.card} reveal-scale`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.valueRow}>
                <h3 className={styles.value}>
                  {item.value}
                </h3>
              </div>
              <p className={styles.label}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
