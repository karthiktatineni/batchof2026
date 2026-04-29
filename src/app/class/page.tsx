import styles from './page.module.css';

// Using consistent seeds for Picsum to get reliable random faces/photos that look good
// Wait, Picsum Photos without specific IDs can change, so we'll use predefined ones or a placeholder service.
import studentsData from '@/lib/students.json';

const students = studentsData;

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
              <div className={styles.separator} />
              <h2 className={styles.name}>{student.name}</h2>
              <p className={styles.role}>{student.role}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
