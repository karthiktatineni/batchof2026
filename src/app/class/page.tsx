import styles from './page.module.css';

// Using consistent seeds for Picsum to get reliable random faces/photos that look good
// Wait, Picsum Photos without specific IDs can change, so we'll use predefined ones or a placeholder service.
const students = [
  { id: 1, name: 'EDUPUGANTI HARSHITHA', role: '22951A0465', image: 'https://ui-avatars.com/api/?name=Harshitha&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 2, name: 'PODAKANTI HEMA SRI', role: '22951A0466', image: '/profile%20photos/IMG-20260314-WA0648%20-%20Hemasri%20Podakanti.jpg' },
  { id: 3, name: 'PALLEPAGA HYMAVATHI', role: '22951A0467', image: 'https://ui-avatars.com/api/?name=Hymavathi&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 4, name: 'MUDILI JAHNAVI', role: '22951A0468', image: '/profile%20photos/photo-1%20-%20JAHNAVI%20MUDILI.jpeg' },
  { id: 5, name: 'ERAGOUNI JASHNAVI', role: '22951A0469', image: 'https://ui-avatars.com/api/?name=Jashnavi&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 6, name: 'AZMEERA JEEVAN KUMAR', role: '22951A0470', image: '/profile%20photos/IMG_20240922_065913%20-%20Jeevan%20Ajmeera.jpg' },
  { id: 7, name: 'DUVASI KALYANI', role: '22951A0471', image: 'https://ui-avatars.com/api/?name=Kalyani&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 8, name: 'TATINENI KARTHIK SAI', role: '22951A0472', image: '/profile%20photos/image.jpeg' },
  { id: 9, name: 'GURRAM KARTHIKEYA', role: '22951A0473', image: 'https://ui-avatars.com/api/?name=Karthikeya&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 10, name: 'ALLADA KOUSHIK', role: '22951A0474', image: '/profile%20photos/IMG-20230513-WA0003%20-%20Koushik%20Allada.jpg' },
  { id: 11, name: 'P N KOUSHIK SREEVATHSA', role: '22951A0475', image: 'https://ui-avatars.com/api/?name=Koushik+Sreevathsa&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 12, name: 'KILLI MURALI KRISHNA', role: '22951A0476', image: 'https://ui-avatars.com/api/?name=Murali+Krishna&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 13, name: 'GANNAMANEEDI KRISHNA SRI MOHAN', role: '22951A0477', image: 'https://ui-avatars.com/api/?name=Krishna+Sri+Mohan&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 14, name: 'LINGAM LAKSHMI VAGDEVI', role: '22951A0478', image: '/profile%20photos/875cccbd-a801-4445-9f03-102a54a163d4%20-%20Lingam%20Suresh.jpeg' },
  { id: 15, name: 'THATI LAXMI NARAYAN', role: '22951A0479', image: 'https://ui-avatars.com/api/?name=Laxmi+Narayan&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 16, name: 'KONKA LIKHITHA', role: '22951A0480', image: 'https://ui-avatars.com/api/?name=Likhitha&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 17, name: 'M LIKITH MAHENDRA', role: '22951A0481', image: '/profile%20photos/Screenshot_20260321-222653%20-%20M%20Likith%20Mahendra.jpg' },
  { id: 18, name: 'HATKAR LITHIK RAJ', role: '22951A0482', image: '/profile%20photos/1000279569-01%20-%20Lithik%20Raj.jpeg' },
  { id: 19, name: 'LAKKAKULA LOHITH', role: '22951A0483', image: '/profile%20photos/IMG_20260402_134221%20-%20Lohith%20Lakkakula.jpg' },
  { id: 20, name: 'YAGNASRI MADHAV', role: '22951A0484', image: 'https://ui-avatars.com/api/?name=Madhav&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 21, name: 'KANCHARLA MAHESH', role: '22951A0485', image: '/profile%20photos/IMG20250415135734%20-%20Kancharla%20Mahesh.jpg' },
  { id: 22, name: 'M MAHESHWARI', role: '22951A0486', image: 'https://ui-avatars.com/api/?name=Maheshwari&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 23, name: 'PENKEY MAHITHA', role: '22951A0487', image: '/profile%20photos/IMG-20260402-WA0002%20-%20Mahitha%20Penkey.jpg' },
  { id: 24, name: 'MALLAM USHA', role: '22951A0488', image: 'https://ui-avatars.com/api/?name=Usha&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 25, name: 'BYAGARI MANASA', role: '22951A0489', image: 'https://ui-avatars.com/api/?name=Manasa&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 26, name: 'MADDELA MANI SAKETH', role: '22951A0490', image: 'https://ui-avatars.com/api/?name=Mani+Saketh&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 27, name: 'CHANDRAGIRI MANIDEEP', role: '22951A0491', image: 'https://ui-avatars.com/api/?name=Manideep&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 28, name: 'BALLU MANIKANTA', role: '22951A0492', image: '/profile%20photos/IMG-20260214-WA0005%20-%20ballu%20manikanta.jpg' },
  { id: 29, name: 'DANGUDUBIYYAPU MANIKANTA', role: '22951A0493', image: 'https://ui-avatars.com/api/?name=Manikanta&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 30, name: 'MARRI NEHA', role: '22951A0494', image: 'https://ui-avatars.com/api/?name=Neha&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 31, name: 'GONGALLA MAYURI', role: '22951A0495', image: '/profile%20photos/IMG_20260314_011928%20-%20Mayuri%20Gongalla.jpg' },
  { id: 32, name: 'EDHA MEGHANA', role: '22951A0496', image: '/profile%20photos/1000199728%20-%20EDHA%20MEGHANA.webp' },
  { id: 33, name: 'RASAMALLA MEGHANA', role: '22951A0497', image: '/profile%20photos/meg%20-%20RASAMALLA%20MEGHANA.jpeg' },
  { id: 34, name: 'MOHAMMED ABUBAKER', role: '22951A0498', image: '/profile%20photos/IMG-20260331-WA0016%20-%20Mohammed%20Abubaker.jpg' },
  { id: 35, name: 'BOLEM MOUNIKA', role: '22951A0499', image: '/profile%20photos/IMG-20260402-WA0016%20-%20BOLEM%20MOUNIKA.jpg' },
  { id: 36, name: 'KESARI MURALI SATYA SAI', role: '22951A04A0', image: 'https://ui-avatars.com/api/?name=Murali+Satya+Sai&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 37, name: 'BALLA KANTH NAGA AYYAPPA', role: '22951A04A1', image: '/profile%20photos/IMG20260313145837%20-%20Kanth%20Balla.jpg' },
  { id: 38, name: 'GATLA NAGARAJU', role: '22951A04A2', image: '/profile%20photos/IMG_20260402_101224%20-%20Nagaraj%20Gatla.jpg' },
  { id: 39, name: 'KESAPRAGADA S S V NAGAVELLI SHARAVANI', role: '22951A04A3', image: 'https://ui-avatars.com/api/?name=Nagavelli+Sharavani&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 40, name: 'GOPU NANDINI', role: '22951A04A4', image: 'https://ui-avatars.com/api/?name=Nandini&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 41, name: 'NEELAM SINDHU', role: '22951A04A5', image: 'https://ui-avatars.com/api/?name=Sindhu&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 42, name: 'DANAGOUNI NIKHIL KUMAR GOUD', role: '22951A04A6', image: '/profile%20photos/Screenshot_20260402_083911%20-%20Nikhil%20Goud.jpg' },
  { id: 43, name: 'YAMAGOUNI NIKHITHA', role: '22951A04A7', image: 'https://ui-avatars.com/api/?name=Nikhitha&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 44, name: 'DEVANA NIRANJAN', role: '22951A04A8', image: '/profile%20photos/IMG_20250921_022241%20-%20Niranjan%20Devana.jpg' },
  { id: 45, name: 'KOLAPALLI NIROSH KUMAR', role: '22951A04A9', image: 'https://ui-avatars.com/api/?name=Nirosh+Kumar&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 46, name: 'PASUPUNOORI NISHANTH', role: '22951A04B0', image: 'https://ui-avatars.com/api/?name=Nishanth&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 47, name: 'DIDDAKUNTLA NITHIN REDDY', role: '22951A04B1', image: 'https://ui-avatars.com/api/?name=Nithin+Reddy&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 48, name: 'BODDUPELLI NITHISH KUMAR', role: '22951A04B2', image: 'https://ui-avatars.com/api/?name=Nithish+Kumar&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 49, name: 'BELLAMKONDA NITISH KUMAR', role: '22951A04B3', image: '/profile%20photos/IMG_20260314_151040_333%20-%20nitishkumar%20bellamkonda.jpg' },
  { id: 50, name: 'DANTULURI PADMA PRIYA', role: '22951A04B4', image: 'https://ui-avatars.com/api/?name=Padma+Priya&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 51, name: 'AVUKOLLA PARAMESWARA YADAV', role: '22951A04B5', image: 'https://ui-avatars.com/api/?name=Parameswara+Yadav&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 52, name: 'BANDI PAVAN SAI', role: '22951A04B6', image: 'https://ui-avatars.com/api/?name=Pavan+Sai&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 53, name: 'PERUGU PAVAN SRI MANIKANTA', role: '22951A04B7', image: '/profile%20photos/IMG_6015%20-%20PERUGU%20PAVAN%20SRI%20MANIKANTA.jpeg' },
  { id: 54, name: 'CHOWDHARIGARI PAVANI', role: '22951A04B8', image: '/profile%20photos/IMG_4121%20-%20Pavani%20Reddy.jpg' },
  { id: 55, name: 'ALYANA PRADEEP KUMAR', role: '22951A04B9', image: '/profile%20photos/InShot_20260316_211158131%20-%20Pradeep%20Kumar.jpg' },
  { id: 56, name: 'MEDEPALLY PRAJWALA', role: '22951A04C0', image: 'https://ui-avatars.com/api/?name=Prajwala&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 57, name: 'BODDU PRANATHI', role: '22951A04C1', image: '/profile%20photos/IMG_20260313_104110%20-%20Pranathi%20B.jpg' },
  { id: 58, name: 'GONE PRANAY', role: '22951A04C2', image: 'https://ui-avatars.com/api/?name=Pranay&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 59, name: 'GUNTI PRANAY', role: '22951A04C3', image: 'https://ui-avatars.com/api/?name=Pranay&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 60, name: 'ATHIPALLI PRANAY VIKAS REDDY', role: '22951A04C4', image: 'https://ui-avatars.com/api/?name=Pranay+Vikas&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 61, name: 'SWAMULAPALLY PRANITH CHARY', role: '22951A04C5', image: 'https://ui-avatars.com/api/?name=Pranith+Chary&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 62, name: 'SANTI PREETHAM', role: '22951A04C6', image: '/profile%20photos/IMG_20260314_190526767_HDR_PORTRAIT%20-%20Preetham%20Preetham.jpg' },
  { id: 63, name: 'BELLEDIGA PREETHI', role: '22951A04C7', image: 'https://ui-avatars.com/api/?name=Preethi&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 64, name: 'KONDAKALA PRIYANKA', role: '22951A04C8', image: '/profile%20photos/IMG_1932%20-%20Kondakala%20Priyanka.jpg' },
  { id: 65, name: 'PADIGELA KALYANI', role: '23955A0408', image: '/profile%20photos/solopic%20-%2023955A0408%20PADIGELA%20KALYANI.jpg' },
  { id: 66, name: 'BUSSU KRISHNA', role: '23955A0409', image: '/profile%20photos/IMG_20260402_101717%20-%20B%20Krishna.jpg' },
  { id: 67, name: 'MALOTH LAVANYA', role: '23955A0410', image: '/profile%20photos/IMG_20260118_135600%20-%20Maloth%20Lavanya.jpg' },
  { id: 68, name: 'GUGULOTHU MAHESH', role: '23955A0411', image: 'https://ui-avatars.com/api/?name=Gugulothu+Mahesh&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 69, name: 'HULIMANI MANJU BHASHINI', role: '23955A0412', image: 'https://ui-avatars.com/api/?name=Manju+Bhashini&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 70, name: 'SHEELAM MANOJ REDDY', role: '23955A0413', image: 'https://ui-avatars.com/api/?name=Manoj+Reddy&background=1e1e1e&color=bdc3c7&size=512' },
  { id: 71, name: 'MD SHABHANA THANIYA', role: '23955A0414', image: 'https://ui-avatars.com/api/?name=MD+Shabhana+Thaniya&background=1e1e1e&color=bdc3c7&size=512' },
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
