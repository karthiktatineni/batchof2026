'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import styles from './LayoutWrapper.module.css';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  
  const isAuthPage = pathname.startsWith('/auth');

  if (loading && !isAuthPage) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner} />
        <p>Entering the Archive...</p>
      </div>
    );
  }

  return (
    <>
      {!isAuthPage && <Navigation />}
      <main className={!isAuthPage ? 'reveal-container' : ''}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}
