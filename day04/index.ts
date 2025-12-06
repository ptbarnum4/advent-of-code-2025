import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<string[][]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/).map((v) => v.split(''));
};

/**
 * @param {string[][]} lines
 * @param {number} x
 * @param {number} y
 */
const canMovePaper = (lines: string[][], x: number, y: number) => {
  if (lines[x]?.[y] !== '@') {
    return false;
  }
  const dir = [-1, 0, 1];

  let atCount = 0;

  dir.forEach((d1) =>
    dir.forEach((d2) => {
      const v = lines[x + d1]?.[y + d2];
      if ((!d1 && !d2) || !v) {
        return;
      }
      if (v === '@') {
        atCount++;
      }
    }),
  );

  return atCount < 4;
};

const countAndSwap = (lines: string[][]): { clearedLines: string[][]; total: number } => {
  const newLines = [];

  for (let x = 0; x < lines.length; x++) {
    const row = lines[x] as string[];
    const newRow = [];

    for (let y = 0; y < row.length; y++) {
      const canMove = canMovePaper(lines, x, y);

      if (canMove) {
        newRow.push('X');
      } else {
        newRow.push(row[y]);
      }
    }
    newLines.push(newRow);
  }

  const total = newLines.flat().filter((v) => v === 'X').length;

  const clearedLines = newLines.map((l) => l.map((v) => (v === 'X' ? '.' : v))) as string[][];

  return { clearedLines, total };
};

export const day04PartOne = async () => {
  const lines = await getParsedData();
  return countAndSwap(lines).total;
};

export const day04PartTwo = async () => {
  const lines = await getParsedData();

  let currentLines = lines;
  let finalTotal = 0;
  let currentTotal;

  while (currentTotal !== 0) {
    const { total, clearedLines } = countAndSwap(currentLines);
    currentTotal = total;
    finalTotal += total;
    currentLines = clearedLines;
  }
  return finalTotal;
};

const day04 = async () => {
  await day04PartOne();
  await day04PartTwo();
};

export default day04;
