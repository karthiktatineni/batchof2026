'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import styles from './Navigation.module.css';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Journey', href: '/#chapters' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Timeline', href: '/#timeline' },
  { label: 'Wall', href: '/#messages' },
  { label: 'Meet the Class', href: '/class' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} id="main-nav">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          <span className={styles.logoText}>Memories</span>
        </Link>

        <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={styles.link}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          {user && (
            <div className={styles.userBadge}>
              <span className={styles.roll}>{user.displayName || user.email?.split('@')[0]}</span>
            </div>
          )}

          {user && (
            <button 
              onClick={handleLogout} 
              className={styles.logoutBtnDesktop}
            >
              Exit Archive
            </button>
          )}

          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}
