'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, isAdmin: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      
      const isAdminUser = user?.email === 'admin@batchof2026.com';
      setIsAdmin(isAdminUser);
      setLoading(false);
      
      const isAuthPage = pathname.startsWith('/auth');
      const isAdminPage = pathname === '/admin';
      
      // 1. Not logged in -> Redirect to login (unless on auth or admin gate)
      if (!user && !isAuthPage && !isAdminPage) {
        router.push('/auth/login');
      }
      
      // 2. Logged in as student, trying to access admin? 
      // Actually /admin will show the login form itself if not isAdmin, 
      // but if already logged in as a student, it should probably stay on /admin 
      // and show the admin login form (which it does via AdminPage conditional).
      
      // 3. Prevent auth page access if already logged in
      if (user && isAuthPage) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
