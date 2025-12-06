import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<string[]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/);
};

export const day01PartOne = async () => {
  const nums = (await getParsedData()).map((l) => {
    const neg = l[0] === 'L' ? -1 : 1;
    const n = parseInt(l.replaceAll(/[^0-9]/g, ''));
    const under = n % 100;
    return under * neg;
  });

  let current = 50;
  let zeros = 0;

  nums.forEach((n) => {
    const total = current + n;
    current = total;

    if (total < 0) {
      current = 100 + total;
    }

    if (total > 99) {
      current = total % 100;
    }

    if (current === 0) {
      zeros++;
    }
  });

  return zeros;
};

export const day01PartTwo = async () => {
  const parsed = await getParsedData();

  let current = 50;
  let zeros = 0;

  const nums = parsed.map((l) => {
    const neg = l[0] === 'L' ? -1 : 1;
    const n = parseInt(l.replaceAll(/[^0-9]/g, ''));
    const rotations = Math.floor(Math.abs(n) / 100);

    // Always count rotations
    zeros += rotations;

    return (n % 100) * neg;
  });

  nums.forEach((num) => {
    const total = current + num;

    if (total < 0) {
      // Omit zeros on decrement when current is zero
      if (current !== 0) {
        zeros++;
      }
      // get backtick from 100
      current = 100 + total;
      return;
    }
    if (total > 99) {
      // Always count the increment over 0
      zeros++;
      current = total % 100;
      return;
    }

    current = total;
    if (total === 0) {
      // Catch when landing on 0
      zeros++;
    }
  });

  return zeros;
};

const day01 = async () => {
  await day01PartOne();
  await day01PartTwo();
};
export default day01;
