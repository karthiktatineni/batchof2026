'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { rollToEmail, isValidStudent } from '@/lib/auth-utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import styles from './page.module.css';

export default function Login() {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNumber || !password) return;
    
    setError('');
    setLoading(true);
    
    try {
      // Step 1: Basic validation of roll number
      if (!isValidStudent(rollNumber)) {
        throw new Error('Access denied. Roll number not found in class database.');
      }
      
      // Step 2: Map to email format used in Firebase
      const email = rollToEmail(rollNumber);
      
      // Step 3: Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      
      // Success will be handled by AuthContext redirecting to '/'
      // but let's push just in case
      router.push('/');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found for this roll number. Please sign up first.');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Incorrect password. Please try again.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      {/* Background cinematic elements */}
      <div className={styles.blur} />
      <div className={styles.blur2} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={styles.card}
      >
        <div className={styles.header}>
          <div className={styles.label}>Class of 2026</div>
          <h1>Welcome Back</h1>
          <p>Login to revisit our shared journey.</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Roll Number</label>
            <input 
              type="text" 
              placeholder="Enter your roll number" 
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Your choosing" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={styles.error}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={loading}
            className={`${styles.submitBtn} ${loading ? styles.loading : ''}`}
          >
            {loading ? 'Authenticating...' : 'Enter Archives'}
          </button>
        </form>

        <div className={styles.footer}>
          <span>Don't have an account?</span>
          <Link href="/auth/signup">Sign Up</Link>
        </div>
      </motion.div>
      
      <div className={styles.copyright}>© 2026 Batch of Class • Digital Time Capsule</div>
    </main>
  );
}
