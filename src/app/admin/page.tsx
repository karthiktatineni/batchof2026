'use client';

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, LogIn, Clock, ArrowLeft, Search, GraduationCap, 
  Eye, EyeOff, ShieldCheck, Activity, BarChart3, TrendingUp
} from 'lucide-react';
import loginStyles from '../auth/login/page.module.css';
import dashStyles from './page.module.css';

interface UserRecord {
  id: string;
  rollNumber: string;
  email: string;
  createdAt: string;
}

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [dashLoading, setDashLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Dashboard Data Fetching
  useEffect(() => {
    if (isAdmin) {
      const fetchUsers = async () => {
        try {
          const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
          const querySnapshot = await getDocs(q);
          const userData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as UserRecord));
          setUsers(userData);
        } catch (err) {
          console.error('Failed to fetch data:', err);
        } finally {
          setDashLoading(false);
        }
      };
      fetchUsers();
    }
  }, [isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    
    try {
      if (email !== 'admin@batchof2026.com') {
        throw new Error('Unauthorized Access.');
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed.');
      setLoginLoading(false);
    }
  };

  if (authLoading) return null;

  // VIEW 1: LOGIN FORM
  if (!user || !isAdmin) {
    return (
      <main className={loginStyles.container}>
        <div className={loginStyles.blur} style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)' }} />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={loginStyles.card}
        >
          <div className={loginStyles.header}>
            <div className={loginStyles.label} style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              System Authority Required
            </div>
            <h1>Admin Console</h1>
            <p>Access archive analytics and control center.</p>
          </div>

          <form onSubmit={handleLogin} className={loginStyles.form}>
            <div className={loginStyles.inputGroup}>
              <label>Administrator Email</label>
              <input 
                type="email" 
                placeholder="admin@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={loginStyles.inputGroup}>
              <label>Access Key</label>
              <div className={loginStyles.passwordWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className={loginStyles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {loginError && <div className={loginStyles.error}>{loginError}</div>}
            <button 
              type="submit" 
              disabled={loginLoading}
              className={`${loginStyles.submitBtn} ${loginLoading ? loginStyles.loading : ''}`}
              style={{ background: '#10b981', color: '#fff' }}
            >
              {loginLoading ? 'Opening Portal...' : 'Validate & Enter'}
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  // VIEW 2: DASHBOARD
  const filteredUsers = users.filter(u => 
    u.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className={dashStyles.container}>
      <header className={dashStyles.header}>
        <div className={dashStyles.headerLeft}>
          <button onClick={() => router.push('/')} className={dashStyles.backBtn}>
            <ArrowLeft size={18} />
            <span>Archive View</span>
          </button>
          <h1>Control Center</h1>
          <p>Full-scale archive management & analytics</p>
        </div>
        <div className={dashStyles.statsRow}>
          <div className={dashStyles.statCard}>
            <div className={dashStyles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Users size={24} />
            </div>
            <div className={dashStyles.statContent}>
              <span className={dashStyles.statLabel}>Signups</span>
              <span className={dashStyles.statValue}>{users.length}</span>
            </div>
          </div>
          <div className={dashStyles.statCard}>
            <div className={dashStyles.statIcon} style={{ background: 'rgba(64, 112, 244, 0.1)', color: '#4070f4' }}>
              <Activity size={24} />
            </div>
            <div className={dashStyles.statContent}>
              <span className={dashStyles.statLabel}>Status</span>
              <span className={dashStyles.statValue}>Online</span>
            </div>
          </div>
        </div>
      </header>

      <section className={dashStyles.content}>
        <div className={dashStyles.controlBar}>
          <div className={dashStyles.searchWrapper}>
            <Search className={dashStyles.searchIcon} size={18} />
            <input 
              type="text" 
              placeholder="Search by student identifier..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={dashStyles.tableWrapper}>
          <table className={dashStyles.userTable}>
            <thead>
              <tr>
                <th><GraduationCap size={16} /> Identifier</th>
                <th><Clock size={16} /> Registration Date</th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode='popLayout'>
                {filteredUsers.map((u, idx) => (
                  <motion.tr 
                    key={u.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <td>
                      <span className={dashStyles.rollId}>{u.rollNumber}</span>
                    </td>
                    <td>
                      <span className={dashStyles.dateText}>
                        {new Date(u.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <span className={dashStyles.statusBadge}>ACTIVE</span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredUsers.length === 0 && !dashLoading && (
            <div className={dashStyles.emptyState}>No registration records found.</div>
          )}
        </div>
      </section>
      <footer className={dashStyles.footer}>
        System Authenticated • Batch of 2026 Administrator
      </footer>
    </main>
  );
}
