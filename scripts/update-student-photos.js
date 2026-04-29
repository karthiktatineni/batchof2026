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
    { id: 1, pattern: 'harshitha-464' },
    { id: 2, pattern: 'Hemasri Podakanti' },
    { id: 3, pattern: 'PALLEPAGA HYMAVATHI' },
    { id: 4, pattern: 'JAHNAVI MUDILI' },
    { id: 5, pattern: 'karthik tatineni-472' },
    { id: 6, pattern: 'Jeevan Ajmeera' },
    { id: 7, pattern: '22951A0471' }, // Duvasi Kalyani
    { id: 10, pattern: 'Koushik Allada' },
    { id: 11, pattern: 'Koushik Sreevathsa P N' },
    { id: 12, pattern: 'Murali Krishna' },
    { id: 13, pattern: 'Krishna shri mohan' },
    { id: 14, pattern: 'Lingam Suresh' },
    { id: 15, pattern: 'Likhitha konka' },
    { id: 17, pattern: 'M Likith Mahendra' },
    { id: 18, pattern: 'Lithik Raj' },
    { id: 19, pattern: 'Lohith Lakkakula' },
    { id: 20, pattern: 'madhav' },
    { id: 21, pattern: 'Kancharla Mahesh' },
    { id: 23, pattern: 'Mahitha Penkey' },
    { id: 25, pattern: 'manisakt' },
    { id: 26, pattern: 'manideep' },
    { id: 28, pattern: 'ballu manikanta' },
    { id: 30, pattern: 'neha - 494' },
    { id: 31, pattern: 'Mayuri Gongalla' },
    { id: 32, pattern: 'EDHA MEGHANA' },
    { id: 33, pattern: 'meg - RASAMALLA MEGHANA' },
    { id: 34, pattern: 'Mohammed Abubaker' },
    { id: 35, pattern: 'BOLEM MOUNIKA' },
    { id: 36, pattern: 'Murali-4a0' },
    { id: 37, pattern: 'Kanth Balla' },
    { id: 38, pattern: 'Nagaraj Gatla' },
    { id: 41, pattern: 'NEELAM SINDHU' },
    { id: 42, pattern: 'Nikhil Goud' },
    { id: 44, pattern: 'Niranjan Devana' },
    { id: 45, pattern: 'niroosh' },
    { id: 46, pattern: 'nishanth' },
    { id: 47, pattern: 'Nithinreddy Diddakuntla' },
    { id: 48, pattern: 'nitishkumar bellamkonda' },
    { id: 49, pattern: 'nitish b3' },
    { id: 50, pattern: 'DANTULURI PADMA PRIYA' },
    { id: 51, pattern: 'paramesh' },
    { id: 52, pattern: 'BANDI PAVAN SAI' },
    { id: 53, pattern: 'PERUGU PAVAN SRI MANIKANTA' },
    { id: 54, pattern: 'Pavani Reddy' },
    { id: 55, pattern: 'Pradeep Kumar' },
    { id: 56, pattern: '4C0 - Medepalli Prajwala' },
    { id: 57, pattern: 'Pranathi B' },
    { id: 60, pattern: 'chary' },
    { id: 62, pattern: 'Preetham Preetham' },
    { id: 63, pattern: 'Preethi-4c7' },
    { id: 64, pattern: 'Kondakala Priyanka' },
    // Lateral entries
    { id: 65, pattern: '23955A0408' }, // Padigela Kalyani
    { id: 66, pattern: 'B Krishna' },    // Bussu Krishna
    { id: 67, pattern: 'Maloth Lavanya' },
    { id: 68, pattern: 'G. Suresh' },     // Gugulothu Mahesh
    { id: 69, pattern: 'manju bhashini' },
    { id: 70, pattern: 'Manoj Reddy' },
    { id: 71, pattern: 'Shabhana Thaniya' }
];

let updatedCount = 0;
const usedFiles = new Set();

students.forEach(student => {
    const m = mapping.find(item => item.id === student.id);
    const pattern = m ? m.pattern : student.name;

    const matchingFiles = files.filter(f => f.toLowerCase().includes(pattern.toLowerCase()));
    if (matchingFiles.length > 0) {
        let bestFile = matchingFiles.find(f => !f.toLowerCase().endsWith('.heic'));
        if (!bestFile) bestFile = matchingFiles[0];

        student.image = `/Solo Photo/Solo Photo Of Yours (File responses)/${bestFile}`;
        usedFiles.add(bestFile);
        console.log(`Mapped: ${student.name} -> ${bestFile}`);
        updatedCount++;
    } else {
        // Use placeholder ONLY if no file found and it's not manually set
        if (!student.image || student.image.includes('ui-avatars.com') || student.image.includes('/Solo Photo/')) {
            student.image = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=1e1e1e&color=C0C0C0&size=512`;
            console.log(`UNMAPPED STUDENT (Using Placeholder): ${student.name}`);
        } else {
            console.log(`UNMAPPED STUDENT (Kept Existing Image): ${student.name}`);
        }
    }
});

console.log('\n--- UNMAPPED FILES ---');
files.forEach(f => {
    if (!usedFiles.has(f)) {
        console.log(f);
    }
});

// Final pass: replace all spaces with %20 in ALL image paths to be safe for browsers
students.forEach(s => {
    if (s.image && !s.image.includes('http')) {
        s.image = s.image.split('/').map(part => part.replace(/ /g, '%20')).join('/');
    }
});

fs.writeFileSync(studentsPath, JSON.stringify(students, null, 2));
console.log(`\nSuccessfully updated ${updatedCount} student profile photos.`);

