const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const studentsPath = path.join(rootDir, 'src', 'lib', 'students.json');
const photosDir = path.join(rootDir, 'public', 'profile photos');

// Full student list extracted from class/page.tsx logic
const fullStudentsList = [
  { id: 1, name: 'EDUPUGANTI HARSHITHA', role: '22951A0465' },
  { id: 2, name: 'PODAKANTI HEMA SRI', role: '22951A0466' },
  { id: 3, name: 'PALLEPAGA HYMAVATHI', role: '22951A0467' },
  { id: 4, name: 'MUDILI JAHNAVI', role: '22951A0468' },
  { id: 5, name: 'ERAGOUNI JASHNAVI', role: '22951A0469' },
  { id: 6, name: 'AZMEERA JEEVAN KUMAR', role: '22951A0470' },
  { id: 7, name: 'DUVASI KALYANI', role: '22951A0471' },
  { id: 8, name: 'TATINENI KARTHIK SAI', role: '22951A0472' },
  { id: 9, name: 'GURRAM KARTHIKEYA', role: '22951A0473' },
  { id: 10, name: 'ALLADA KOUSHIK', role: '22951A0474' },
  { id: 11, name: 'P N KOUSHIK SREEVATHSA', role: '22951A0475' },
  { id: 12, name: 'KILLI MURALI KRISHNA', role: '22951A0476' },
  { id: 13, name: 'GANNAMANEEDI KRISHNA SRI MOHAN', role: '22951A0477' },
  { id: 14, name: 'LINGAM LAKSHMI VAGDEVI', role: '22951A0478' },
  { id: 15, name: 'THATI LAXMI NARAYAN', role: '22951A0479' },
  { id: 16, name: 'KONKA LIKHITHA', role: '22951A0480' },
  { id: 17, name: 'M LIKITH MAHENDRA', role: '22951A0481' },
  { id: 18, name: 'HATKAR LITHIK RAJ', role: '22951A0482' },
  { id: 19, name: 'LAKKAKULA LOHITH', role: '22951A0483' },
  { id: 20, name: 'YAGNASRI MADHAV', role: '22951A0484' },
  { id: 21, name: 'KANCHARLA MAHESH', role: '22951A0485' },
  { id: 22, name: 'M MAHESHWARI', role: '22951A0486' },
  { id: 23, name: 'PENKEY MAHITHA', role: '22951A0487' },
  { id: 24, name: 'MALLAM USHA', role: '22951A0488' },
  { id: 25, name: 'BYAGARI MANASA', role: '22951A0489' },
  { id: 26, name: 'MADDELA MANI SAKETH', role: '22951A0490' },
  { id: 27, name: 'CHANDRAGIRI MANIDEEP', role: '22951A0491' },
  { id: 28, name: 'BALLU MANIKANTA', role: '22951A0492' },
  { id: 29, name: 'DANGUDUBIYYAPU MANIKANTA', role: '22951A0493' },
  { id: 30, name: 'MARRI NEHA', role: '22951A0494' },
  { id: 31, name: 'GONGALLA MAYURI', role: '22951A0495' },
  { id: 32, name: 'EDHA MEGHANA', role: '22951A0496' },
  { id: 33, name: 'RASAMALLA MEGHANA', role: '22951A0497' },
  { id: 34, name: 'MOHAMMED ABUBAKER', role: '22951A0498' },
  { id: 35, name: 'BOLEM MOUNIKA', role: '22951A0499' },
  { id: 36, name: 'KESARI MURALI SATYA SAI', role: '22951A04A0' },
  { id: 37, name: 'BALLA KANTH NAGA AYYAPPA', role: '22951A04A1' },
  { id: 38, name: 'GATLA NAGARAJU', role: '22951A04A2' },
  { id: 39, name: 'KESAPRAGADA S S V NAGAVELLI SHARAVANI', role: '22951A04A3' },
  { id: 40, name: 'GOPU NANDINI', role: '22951A04A4' },
  { id: 41, name: 'NEELAM SINDHU', role: '22951A04A5' },
  { id: 42, name: 'DANAGOUNI NIKHIL KUMAR GOUD', role: '22951A04A6' },
  { id: 43, name: 'YAMAGOUNI NIKHITHA', role: '22951A04A7' },
  { id: 44, name: 'DEVANA NIRANJAN', role: '22951A04A8' },
  { id: 45, name: 'KOLAPALLI NIROSH KUMAR', role: '22951A04A9' },
  { id: 46, name: 'PASUPUNOORI NISHANTH', role: '22951A04B0' },
  { id: 47, name: 'DIDDAKUNTLA NITHIN REDDY', role: '22951A04B1' },
  { id: 48, name: 'BODDUPELLI NITHISH KUMAR', role: '22951A04B2' },
  { id: 49, name: 'BELLAMKONDA NITISH KUMAR', role: '22951A04B3' },
  { id: 50, name: 'DANTULURI PADMA PRIYA', role: '22951A04B4' },
  { id: 51, name: 'AVUKOLLA PARAMESWARA YADAV', role: '22951A04B5' },
  { id: 52, name: 'BANDI PAVAN SAI', role: '22951A04B6' },
  { id: 53, name: 'PERUGU PAVAN SRI MANIKANTA', role: '22951A04B7' },
  { id: 54, name: 'CHOWDHARIGARI PAVANI', role: '22951A04B8' },
  { id: 55, name: 'ALYANA PRADEEP KUMAR', role: '22951A04B9' },
  { id: 56, name: 'MEDEPALLY PRAJWALA', role: '22951A04C0' },
  { id: 57, name: 'BODDU PRANATHI', role: '22951A04C1' },
  { id: 58, name: 'GONE PRANAY', role: '22951A04C2' },
  { id: 59, name: 'GUNTI PRANAY', role: '22951A04C3' },
  { id: 60, name: 'ATHIPALLI PRANAY VIKAS REDDY', role: '22951A04C4' },
  { id: 61, name: 'SWAMULAPALLY PRANITH CHARY', role: '22951A04C5' },
  { id: 62, name: 'SANTI PREETHAM', role: '22951A04C6' },
  { id: 63, name: 'BELLEDIGA PREETHI', role: '22951A04C7' },
  { id: 64, name: 'KONDAKALA PRIYANKA', role: '22951A04C8' },
  { id: 65, name: 'PADIGELA KALYANI', role: '23955A0408' },
  { id: 66, name: 'BUSSU KRISHNA', role: '23955A0409' },
  { id: 67, name: 'MALOTH LAVANYA', role: '23955A0410' },
  { id: 68, name: 'GUGULOTHU MAHESH', role: '23955A0411' },
  { id: 69, name: 'HULIMANI MANJU BHASHINI', role: '23955A0412' },
  { id: 70, name: 'SHEELAM MANOJ REDDY', role: '23955A0413' },
  { id: 71, name: 'MD SHABHANA THANIYA', role: '23955A0414' },
];

const files = fs.readdirSync(photosDir);

const mapping = [
    { id: 1, pattern: 'EDUPUGANTI HARSHITHA' },
    { id: 2, pattern: 'PODAKANTI HEMA SRI' },
    { id: 2, pattern: 'Hemasri Podakanti' },
    { id: 3, pattern: 'PALLEPAGA HYMAVATHI' },
    { id: 4, pattern: 'JAHNAVI MUDILI' },
    { id: 4, pattern: 'Jahnavi' },
    { id: 5, pattern: 'ERAGOUNI JASHNAVI' },
    { id: 6, pattern: 'Jeevan Ajmeera' },
    { id: 6, pattern: 'AZMEERA JEEVAN' },
    { id: 7, pattern: 'KALYANI' },
    { id: 7, pattern: 'DUVASI KALYANI' },
    { id: 10, pattern: 'Koushik Allada' },
    { id: 12, pattern: 'Murali Krishna' },
    { id: 13, pattern: 'B Krishna' },
    { id: 13, pattern: 'GANNAMANEEDI KRISHNA' },
    { id: 14, pattern: 'Lingam Suresh' },
    { id: 14, pattern: 'LINGAM LAKSHMI' },
    { id: 17, pattern: 'M Likith Mahendra' },
    { id: 18, pattern: 'Lithik Raj' },
    { id: 19, pattern: 'Lohith Lakkakula' },
    { id: 21, pattern: 'Kancharla Mahesh' },
    { id: 23, pattern: 'Mahitha Penkey' },
    { id: 28, pattern: 'ballu manikanta' },
    { id: 31, pattern: 'Mayuri Gongalla' },
    { id: 32, pattern: 'EDHA MEGHANA' },
    { id: 33, pattern: 'RASAMALLA MEGHANA' },
    { id: 34, pattern: 'Mohammed Abubaker' },
    { id: 35, pattern: 'BOLEM MOUNIKA' },
    { id: 37, pattern: 'Kanth Balla' },
    { id: 38, pattern: 'Nagaraj Gatla' },
    { id: 38, pattern: 'GATLA NAGARAJU' },
    { id: 41, pattern: 'NEELAM SINDHU' },
    { id: 42, pattern: 'Nikhil Goud' },
    { id: 44, pattern: 'Niranjan Devana' },
    { id: 47, pattern: 'Nithinreddy Diddakuntla' },
    { id: 49, pattern: 'nitishkumar bellamkonda' },
    { id: 50, pattern: 'PADMA PRIYA' },
    { id: 50, pattern: 'DANTULURI PADMA' },
    { id: 52, pattern: 'BANDI PAVAN SAI' },
    { id: 52, pattern: 'PAVAN SAI BANDI' },
    { id: 53, pattern: 'PERUGU PAVAN SRI MANIKANTA' },
    { id: 54, pattern: 'Pavani Reddy' },
    { id: 55, pattern: 'Pradeep Kumar' },
    { id: 57, pattern: 'Pranathi B' },
    { id: 62, pattern: 'Preetham Preetham' },
    { id: 64, pattern: 'Kondakala Priyanka' },
    { id: 65, pattern: 'PADIGELA KALYANI' },
    { id: 66, pattern: 'BUSSU KRISHNA' },
    { id: 67, pattern: 'Maloth Lavanya' },
    { id: 67, pattern: 'MALOTH LAVANYA' },
];

const processedStudents = fullStudentsList.map(s => {
    let image = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=1e1e1e&color=daa520&size=512`;
    
    // Check for "image.jpeg" for Karthik Sai (ID 8)
    if (s.id === 8) {
        image = "/profile%20photos/image.jpeg";
    }

    // Check mapping for others
    const matches = mapping.filter(m => m.id === s.id);
    for (const m of matches) {
        const matchingFile = files.find(f => f.toLowerCase().includes(m.pattern.toLowerCase()) && !f.toLowerCase().endsWith('.heic'));
        if (matchingFile) {
            image = `/profile%20photos/${encodeURIComponent(matchingFile)}`;
            break;
        }
    }

    return {
        ...s,
        image
    };
});

fs.writeFileSync(studentsPath, JSON.stringify(processedStudents, null, 2));
console.log(`Consolidated students.json with ${processedStudents.length} entries.`);
