import students from './students.json';
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Checks if a roll number (case-insensitive) is in the class list.
 */
export const isValidStudent = (rollNumber: string): boolean => {
  if (!rollNumber) return false;
  const normalizedInput = rollNumber.trim().toLowerCase();
  return students.some(student => student.role.toLowerCase() === normalizedInput);
};

/**
 * Gets the student's name from their roll number.
 */
export const getStudentName = (rollNumber: string): string | null => {
  if (!rollNumber) return null;
  const normalizedInput = rollNumber.trim().toLowerCase();
  const student = students.find(s => s.role.toLowerCase() === normalizedInput);
  return student?.name || null;
};

/**
 * Checks if the input looks like an email address.
 */
export const isEmail = (input: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
};

/**
 * Looks up a user's personal email by their roll number from Firestore.
 * This is needed because Firebase Auth now uses the personal email,
 * so when a user logs in with their roll number we need to find their email.
 */
export const lookupEmailByRoll = async (rollNumber: string): Promise<string | null> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('rollNumber', '==', rollNumber.trim().toUpperCase()));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;
    return snapshot.docs[0].data().personalEmail || null;
  } catch (error) {
    console.error('Error looking up email by roll:', error);
    return null;
  }
};

/**
 * Looks up a user's roll number by their personal email from Firestore.
 */
export const lookupRollByEmail = async (personalEmail: string): Promise<string | null> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('personalEmail', '==', personalEmail.trim().toLowerCase()));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;
    return snapshot.docs[0].data().rollNumber || null;
  } catch (error) {
    console.error('Error looking up roll by email:', error);
    return null;
  }
};
