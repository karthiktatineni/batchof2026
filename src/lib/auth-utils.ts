import students from './students.json';

/**
 * Checks if a roll number (case-insensitive) is in the class list.
 * @param rollNumber The roll number to verify.
 * @returns boolean
 */
export const isValidStudent = (rollNumber: string): boolean => {
  if (!rollNumber) return false;
  const normalizedInput = rollNumber.trim().toLowerCase();
  return students.some(student => student.role.toLowerCase() === normalizedInput);
};

/**
 * Maps a roll number to a standard email format for Firebase Auth.
 * This ensures uniqueness and satisfies Firebase Auth's email requirement.
 * @param rollNumber 
 * @returns 
 */
export const rollToEmail = (rollNumber: string): string => {
  return `${rollNumber.trim().toLowerCase()}@class-2026.edu`;
};
