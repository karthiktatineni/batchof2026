'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FarewellSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function FarewellSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom center',
        scrub: 1,
      }
    });

    tl.fromTo(
      headlineRef.current,
      { y: 100, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
    ).fromTo(
      letterRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=1'
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section className={`section ${styles.section}`} id="farewell" ref={containerRef}>
      <div className={styles.overlay} />

      <div className={`container ${styles.container}`}>
        <h2 className={styles.headline} ref={headlineRef}>
          Some places stay<br />with us forever.
        </h2>

        <div className={styles.letterWrapper} ref={letterRef}>
          <div className={styles.signatureMark}></div>
          <p className={styles.intro}>To the class of 2026,</p>
          <p>
            We arrived as strangers carrying heavy bags and uncertain dreams. We leave with heavier hearts, carrying stories we'll tell for the rest of our lives. You aren't just names in an attendance register anymore; you are the midnight snack runs, the last-minute project panics, the triumphant smiles after surviving that one impossible exam.
          </p>
          <p>
            This website is our digital time capsule. No matter where life takes us—different cities, different careers—we will always have this shared starting line. The campus will welcome new faces, but our footprints remain forever etched in these halls.
          </p>
          <div className={styles.signoff}>
            <p>Signing off,</p>
            <p className={styles.batchName}>The Batch of &apos;26</p>
          </div>
        </div>

        <div className={styles.footerAction}>
          <button className="btn btn--primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Return to Beginning
          </button>
        </div>
      </div>
    </section>
  );
}
