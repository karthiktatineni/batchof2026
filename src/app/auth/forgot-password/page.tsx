'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { lookupRollByEmail } from '@/lib/auth-utils';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import styles from '../login/page.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setError('');
    setLoading(true);
    
    try {
      const trimmedEmail = email.trim().toLowerCase();

      // Step 1: Verify this email is actually registered with a student account
      const rollNumber = await lookupRollByEmail(trimmedEmail);
      
      if (!rollNumber) {
        throw new Error('No account found with this email. Please check your email or sign up first.');
      }
      
      // Step 2: Send Firebase password reset email
      // Since Firebase Auth now uses real personal emails, this will
      // actually deliver to the user's inbox
      await sendPasswordResetEmail(auth, trimmedEmail);
      
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email. Please sign up first.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait a while before trying again.');
      } else {
        setError(err.message || 'Failed to send reset email. Please try again.');
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
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={styles.card}
      >
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
            >
              <div className={styles.header}>
                <div className={styles.label}>Password Recovery</div>
                <h1>Forgot Password</h1>
                <p>Enter the email you used during sign up.</p>
              </div>

              <form onSubmit={handleReset} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label>Email Address</label>
                  <div className={styles.inputWrapper}>
                    <Mail size={18} className={styles.inputIcon} />
                    <input 
                      type="email" 
                      placeholder="your.email@gmail.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                      className={styles.inputWithIcon}
                    />
                  </div>
                  <span className={styles.fieldHint}>We&apos;ll send a password reset link to this email</span>
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
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <div className={styles.footer}>
                <Link href="/auth/login" className={styles.backLink}>
                  <ArrowLeft size={16} />
                  <span>Back to Login</span>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={styles.successState}
            >
              <div className={styles.successIcon}>
                <CheckCircle size={56} />
              </div>
              <h2>Check Your Inbox</h2>
              <p>
                We&apos;ve sent a password reset link to <strong>{email}</strong>. 
                Click the link in the email to set a new password.
              </p>
              <p className={styles.successHint}>
                <span className={styles.alertIcon}>⚠️</span> 
                <strong>Important:</strong> If you don&apos;t see the email within 2 minutes, please <strong>check your spam folder</strong>.
              </p>
              
              <div className={styles.successActions}>
                <button 
                  onClick={() => { setSuccess(false); setEmail(''); setLoading(false); setError(''); }}
                  className={styles.ghostBtn}
                >
                  Try Again
                </button>
                <Link href="/auth/login" className={styles.submitBtn}>
                  Back to Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <div className={styles.copyright}>© 2026 Batch of Class • Digital Time Capsule</div>
    </main>
  );
}
