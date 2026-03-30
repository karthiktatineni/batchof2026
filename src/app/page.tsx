'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Layout
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

// Sections
import Hero from '@/components/sections/Hero';
import ChapterScroll from '@/components/sections/ChapterScroll';
import BounceCardsSection from '@/components/sections/BounceCardsSection';
import CampusMap from '@/components/sections/CampusMap';
import StoryReels from '@/components/sections/StoryReels';
import MemoryGallery from '@/components/sections/MemoryGallery';
import Timeline from '@/components/sections/Timeline';
import QuotesSection from '@/components/sections/QuotesSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import MessagesWall from '@/components/sections/MessagesWall';
import FarewellSection from '@/components/sections/FarewellSection';

// Initialize GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Basic global scroll-triggered reveals
    const reveals = document.querySelectorAll('.reveal');
    const revealsLeft = document.querySelectorAll('.reveal-left');
    const revealsRight = document.querySelectorAll('.reveal-right');
    const revealsScale = document.querySelectorAll('.reveal-scale');

    reveals.forEach((el) => {
      gsap.fromTo(el, 
        { y: 30, opacity: 0 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    revealsLeft.forEach((el) => {
      gsap.fromTo(el, 
        { x: -50, opacity: 0 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    revealsRight.forEach((el) => {
      gsap.fromTo(el, 
        { x: 50, opacity: 0 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    revealsScale.forEach((el) => {
      gsap.fromTo(el, 
        { scale: 0.9, opacity: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main ref={mainRef}>
      <Navigation />
      <Hero />
      <ChapterScroll />
      <BounceCardsSection />
      <CampusMap />
      <StoryReels />
      <MemoryGallery />
      <Timeline />
      <QuotesSection />
      <AchievementsSection />
      <MessagesWall />
      <FarewellSection />
      <Footer />
    </main>
  );
}
