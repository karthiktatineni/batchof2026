'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { rollToEmail, isValidStudent } from '@/lib/auth-utils';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import styles from '../login/page.module.css';

export default function SignUp() {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNumber || !password || !confirmPassword) return;
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      // Step 1: Verify roll number
      if (!isValidStudent(rollNumber)) {
        throw new Error('This roll number is not recognized as a student in this class. Access denied.');
      }
      
      // Step 2: Map to email format
      const email = rollToEmail(rollNumber);
      
      // Step 3: Create Firebase Auth User
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Step 4: Update display name with roll number
      await updateProfile(user, {
        displayName: rollNumber.toUpperCase()
      });

      // Step 5: Save record in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        rollNumber: rollNumber.toUpperCase(),
        email: email,
        createdAt: new Date().toISOString()
      });
      
      router.push('/');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This roll number is already registered. Please login.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.blur} />
      <div className={styles.blur2} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className={styles.card}
      >
        <div className={styles.header}>
          <div className={styles.label}>Class of 2026</div>
          <h1>Create Account</h1>
          <p>Join our digital time capsule.</p>
        </div>

        <form onSubmit={handleSignUp} className={styles.form}>
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
            <label>Choose Password</label>
            <div className={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Min 6 characters" 
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

          <div className={styles.inputGroup}>
            <label>Confirm Password</label>
            <div className={styles.passwordWrapper}>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Keep it safe" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
            {loading ? 'Creating Account...' : 'Continue to Journey'}
          </button>
        </form>

        <div className={styles.footer}>
          <span>Already registered?</span>
          <Link href="/auth/login">Login</Link>
        </div>
      </motion.div>
      
      <div className={styles.copyright}>© 2026 Class Archives • Invitation Only</div>
    </main>
  );
}
