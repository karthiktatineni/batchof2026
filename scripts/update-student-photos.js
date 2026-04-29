const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const studentsPath = path.join(rootDir, 'src', 'lib', 'students.json');
const photosDir = path.join(rootDir, 'public', 'Solo Photo', 'Solo Photo Of Yours (File responses)');

if (!fs.existsSync(studentsPath)) {
    console.error(`Students file not found at ${studentsPath}`);
    process.exit(1);
}

if (!fs.existsSync(photosDir)) {
    console.error(`Photos directory not found at ${photosDir}`);
    process.exit(1);
}

const students = JSON.parse(fs.readFileSync(studentsPath, 'utf8'));
const files = fs.readdirSync(photosDir);

const mapping = [
    { id: 2, pattern: 'Hemasri Podakanti' },
    { id: 3, pattern: 'PALLEPAGA HYMAVATHI' },
    { id: 4, pattern: 'JAHNAVI MUDILI' },
    { id: 6, pattern: 'Jeevan Ajmeera' },
    { id: 7, pattern: 'KALYANI' },
    { id: 10, pattern: 'Koushik Allada' },
    { id: 12, pattern: 'Murali Krishna' },
    { id: 13, pattern: 'B Krishna' },
    { id: 14, pattern: 'Lingam Suresh' },
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
    { id: 41, pattern: 'NEELAM SINDHU' },
    { id: 42, pattern: 'Nikhil Goud' },
    { id: 44, pattern: 'Niranjan Devana' },
    { id: 47, pattern: 'Nithinreddy Diddakuntla' },
    { id: 49, pattern: 'nitishkumar bellamkonda' },
    { id: 50, pattern: 'DANTULURI PADMA PRIYA' },
    { id: 52, pattern: 'BANDI PAVAN SAI' },
    { id: 53, pattern: 'PERUGU PAVAN SRI MANIKANTA' },
    { id: 54, pattern: 'Pavani Reddy' },
    { id: 55, pattern: 'Pradeep Kumar' },
    { id: 57, pattern: 'Pranathi B' },
    { id: 62, pattern: 'Preetham Preetham' },
    { id: 64, pattern: 'Kondakala Priyanka' }
];

let updatedCount = 0;
mapping.forEach(m => {
    const studentIndex = students.findIndex(s => s.id === m.id);
    if (studentIndex !== -1) {
        // Find best matching file (favor non-heic)
        const matchingFiles = files.filter(f => f.toLowerCase().includes(m.pattern.toLowerCase()));
        if (matchingFiles.length > 0) {
            let bestFile = matchingFiles.find(f => !f.toLowerCase().endsWith('.heic'));
            if (!bestFile) bestFile = matchingFiles[0];
            
            students[studentIndex].image = `/Solo Photo/Solo Photo Of Yours (File responses)/${encodeURIComponent(bestFile)}`;
            console.log(`Updated ${students[studentIndex].name} with ${bestFile}`);
            updatedCount++;
        }
    }
});

fs.writeFileSync(studentsPath, JSON.stringify(students, null, 2));
console.log(`Successfully updated ${updatedCount} student profile photos.`);
