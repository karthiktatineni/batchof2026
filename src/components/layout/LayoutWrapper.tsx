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
  const isAdminPage = pathname === '/admin';

  // Prevent flash of protected content while loading or redirecting
  if (!isAuthPage && !isAdminPage && (loading || !user)) {
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
