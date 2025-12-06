import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const createJs = (day = 1) => {
  const padded = String(day).padStart(2, '0');
  return `\
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<string[]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\\r?\\n/);
};

export const day${padded}PartOne = async () => {
  const lines = await getParsedData();
  console.log(lines);
  return 0;
};

export const day${padded}PartTwo = async () => {
  const lines = await getParsedData();
  console.log(lines);
  return 0;
};

const day${padded} = async () => {
  await day${padded}PartOne();
  // await day${padded}PartTwo();
};

export default day${padded};
`;
};

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

const createTest = (day = 1) => {
  const padded = String(day).padStart(2, '0');
  return `\
import { expect } from 'chai';
import { day${padded}PartOne, day${padded}PartTwo } from './index';

describe('Day ${day}', () => {
  describe('Part 1', async () => {
    it('should return the correct total: TBD', async () => {
      const total = await day${padded}PartOne();
      expect(total).to.equal(0);
    });
  });
  describe('Part 2', async () => {
    it('should return the correct total: TBD', async () => {
      const total = await day${padded}PartTwo();
      expect(total).to.equal(0);
    });
  });
});
`;
};

const main = async () => {
  const basePath = path.resolve(__dirname, '..');
  const folders = await fs.readdir(basePath);
  const dayFolders = folders.filter((folder) => folder.startsWith('day'));
  const totalDays = dayFolders.length;

  for (let d = 7; d <= totalDays; d++) {
    const day = String(d).padStart(2, '0');

    const dayFolder = `day${day}`;
    if (!day) {
      continue;
    }

    const dayPath = path.resolve(basePath, dayFolder);
    console.info('Resetting Day:', dayPath);

    const jsPath = path.resolve(dayPath, 'index.ts');
    const testPath = path.resolve(dayPath, 'index.spec.ts');
    const readmePath = path.resolve(dayPath, 'README.md');
    const txtPath = path.resolve(dayPath, 'data.txt');
    const exampleTxtPath = path.resolve(dayPath, 'example.txt');

    await fs.writeFile(jsPath, createJs(parseInt(day)));
    await fs.writeFile(testPath, createTest(parseInt(day)));
    await fs.writeFile(readmePath, createReadme(parseInt(day)));
    await fs.writeFile(txtPath, '');
    await fs.writeFile(exampleTxtPath, '');

    console.info('Successfully reset day: ', day);
  }
  console.info('Done!');
};
main();
