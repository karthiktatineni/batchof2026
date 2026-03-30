'use client';

import { useState } from 'react';
import { Home, Store, BookOpen, Music } from 'lucide-react';
import styles from './CampusMap.module.css';

const hotspots = [
  { id: 1, x: 30, y: 67, icon: Home, title: 'Bharadwaja Block', desc: 'The starting point. Freshmen fears and big dreams.' },
  { id: 2, x: 45, y: 40, icon: Music, title: 'Open Auditorium', desc: 'Where fests came alive and we danced until our feet gave out.' },
  { id: 3, x: 60, y: 65, icon: Store, title: 'Canteen', desc: 'Food, Endless debates, and Bunks' },
  { id: 4, x: 52, y: 73, icon: BookOpen, title: 'PAT block', desc: 'The quietest place on campus, mostly used for catching up on sleep.' },
];

export default function CampusMap() {
  const [activeSpot, setActiveSpot] = useState<number | null>(null);
  const [hoveredSpot, setHoveredSpot] = useState<number | null>(null);

  const displaySpot = activeSpot !== null ? activeSpot : hoveredSpot;
  const activeData = displaySpot !== null ? hotspots.find(h => h.id === displaySpot) : null;

  return (
    <section className={`section ${styles.section}`} id="map">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Cartography of Memories</h2>
          <p className={styles.subtitle}>TAP A HOTSPOT TO REVEAL A FRAGMENT OF THE PAST</p>
        </div>

        <div className={styles.mapWrapper}>
          <div className={styles.mapBackground}>
            <div className={styles.mapGlow} />
            {/* The map image itself. Using a stylized abstract circular map or campus layout */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/map.png"
              alt="Campus Map"
              className={styles.mapImage}
            />
          </div>

          <div className={styles.hotspotsLayer}>
            {hotspots.map((spot) => (
              <button
                key={spot.id}
                className={`${styles.hotspotBtn} ${displaySpot === spot.id ? styles.active : ''}`}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                onMouseEnter={() => setHoveredSpot(spot.id)}
                onMouseLeave={() => setHoveredSpot(null)}
                onClick={() => setActiveSpot(activeSpot === spot.id ? null : spot.id)}
                aria-label={`View ${spot.title}`}
              >
                <spot.icon size={20} strokeWidth={1.5} className={styles.icon} />
                <span className={styles.pulse} />
              </button>
            ))}
          </div>

          {activeData && (
            <div
              className={styles.infoCardWrapper}
              style={{ left: `${activeData.x}%`, top: `${activeData.y}%` }}
              onMouseEnter={() => setHoveredSpot(activeData.id)}
              onMouseLeave={() => setHoveredSpot(null)}
            >
              <div className={styles.lineConnector} />
              <div className={styles.infoCard}>
                <button className={styles.closeBtn} onClick={() => setActiveSpot(null)}>×</button>
                <h3 className={styles.infoTitle}>{activeData.title}</h3>
                <p className={styles.infoDesc}>{activeData.desc}</p>
              </div>
            </div>
          )}

          <div className={styles.locationBadge}>
            <span className={styles.pinIcon}>📍</span>
            INSTITUTE OF AERONAUTICAL ENGINEERING CAMPUS
          </div>
        </div>
      </div>
    </section>
  );
}
