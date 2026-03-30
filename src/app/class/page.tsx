import styles from './page.module.css';

// Using consistent seeds for Picsum to get reliable random faces/photos that look good
// Wait, Picsum Photos without specific IDs can change, so we'll use predefined ones or a placeholder service.
const students = [
  { id: 1, name: 'Karthik', role: 'The Architect', image: 'https://picsum.photos/seed/karthik/400/500' },
  { id: 2, name: 'Nitish', role: 'Chief Debugger', image: 'https://picsum.photos/seed/nitish/400/500' },
  { id: 3, name: 'Aditya', role: 'Late Night Coder', image: 'https://picsum.photos/seed/aditya/400/500' },
  { id: 4, name: 'Neha', role: 'Design Maestro', image: 'https://picsum.photos/seed/neha/400/500' },
  { id: 5, name: 'Siddharth', role: 'Visionary', image: 'https://picsum.photos/seed/siddharth/400/500' },
  { id: 6, name: 'Pooja', role: 'Coffee Addict', image: 'https://picsum.photos/seed/pooja/400/500' },
  { id: 7, name: 'Rahul', role: 'Problem Solver', image: 'https://picsum.photos/seed/rahul/400/500' },
  { id: 8, name: 'Anjali', role: 'The Organizer', image: 'https://picsum.photos/seed/anjali/400/500' },
  { id: 9, name: 'Vikram', role: 'Event Guru', image: 'https://picsum.photos/seed/vikram/400/500' },
  { id: 10, name: 'Meera', role: 'Wordsmith', image: 'https://picsum.photos/seed/meera/400/500' },
  { id: 11, name: 'Arjun', role: 'Tech Lead', image: 'https://picsum.photos/seed/arjun/400/500' },
  { id: 12, name: 'Sneha', role: 'UI/UX Specialist', image: 'https://picsum.photos/seed/sneha/400/500' },
];

export const metadata = {
  title: 'Meet the Class',
  description: 'The faces behind the memories.',
};

export default function MeetTheClass() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className="section-label">Class of 2026</div>
        <h1>Meet the Class</h1>
        <p>The individuals who made the last four years unforgettable. Hover to reveal.</p>
      </header>

      <section className={styles.grid}>
        {students.map((student) => (
          <div key={student.id} className={styles.card}>
            <div className={styles.overlay} />
            
            <div className={styles.imageContainer}>
              <img 
                src={student.image} 
                alt={student.name}
              />
            </div>

            <div className={styles.info}>
              <h2 className={styles.name}>{student.name}</h2>
              <p className={styles.role}>{student.role}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
