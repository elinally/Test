import fs from 'node:fs';

function sumNumbers(a, b) {
    const numA= parseInt(fs.readFileSync(a, 'utf8'));
    const numB= parseInt(fs.readFileSync(b, 'utf8'));
    const sum = numA + numB;
    console.log(`Сума: ${sum}`);
}

sumNumbers('a.txt', 'b.txt');
