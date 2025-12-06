import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const createJs = (day = 1) =>
  `\
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<string[]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\\r?\\n/);
};

const day${day}PartOne = async () => {
  const lines = await getParsedData();
  console.log(lines);
};

const day${day}PartTwo = async () => {
  const lines = await getParsedData();
  console.log(lines);
};

const day${day} = async () => {
  await day${day}PartOne();
  // await day${day}PartTwo();
};

export default day${day};

`;

const createReadme = (day = 1) => `[Back](../README.md)

# Day ${day}: [Problem Name]

[Code](./index.ts)

## Part One

> **PROMPT _PART 1_**
>
> Answer: \`TBD\`

---

## Part Two

> **PROMPT _PART 2_**
>
> Answer: \`TBD\`
`;

const main = async () => {
  const folders = await fs.readdir(__dirname);
  const dayFolders = folders.filter(folder => folder.startsWith('day'));

  // for (const dayFolder of dayFolders) {
  for (let d = 7; d <= 12; d++) {
    const day = String(d).padStart(2, '0');
    console.log('Resetting Day:', day);

    const dayFolder = `day${day}`;
    if (!day) {
      continue;
    }

    const jsPath = `${__dirname}/${dayFolder}/index.ts`;
    const readmePath = `${__dirname}/${dayFolder}/README.md`;
    const txtPath = `${__dirname}/${dayFolder}/data.txt`;

    await fs.writeFile(jsPath, createJs(parseInt(day)));
    await fs.writeFile(readmePath, createReadme(parseInt(day)));
    await fs.writeFile(txtPath, '');
    console.log('Reset day: ', day);
  }
  console.log('Done!');
};
main();
