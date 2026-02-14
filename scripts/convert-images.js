const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
    'public/hero-digital.png',
    'public/problem-english.png',
    'public/problem-dance.png',
    'public/problem-music.png',
    'public/ai-person.jpeg'
];

async function convert() {
    for (const imgPath of images) {
        const fullPath = path.resolve(process.cwd(), imgPath);
        if (!fs.existsSync(fullPath)) {
            console.warn(`File not found: ${fullPath}`);
            continue;
        }

        const { dir, name } = path.parse(fullPath);
        const outputPath = path.join(dir, `${name}.webp`);

        try {
            console.log(`Converting ${name}...`);
            await sharp(fullPath)
                .webp({ quality: 80 }) // 80% quality is usually good enough for web
                .toFile(outputPath);
            console.log(`Saved to ${outputPath}`);
        } catch (err) {
            console.error(`Error converting ${name}:`, err);
        }
    }
}

convert();
