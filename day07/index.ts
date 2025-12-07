import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<string[][]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/).map((r) => r.split(''));
};

const traverseDown = (lines: string[][], rowIndex: number, colIndexes: Set<number>) => {
  const prev = lines[rowIndex - 1] as string[];
  const row = lines[rowIndex] as string[];

  if (!row || !prev) {
    return lines;
  }

  if (rowIndex < lines.length) {
    colIndexes.forEach((colIndex) => {
      const ch = row[colIndex];
      const pch = prev[colIndex];
      if (!colIndexes.size) {
        return lines;
      }

      if (!ch || rowIndex >= lines.length) {
        return lines;
      }

      if (pch === 'S') {
        row[colIndex] = '|';
        colIndex++;
      }

      if (pch === '|') {
        if (ch === '^') {
          if (colIndex !== 0) {
            colIndexes.delete(colIndex);
            row[colIndex - 1] = '|';
            colIndexes.add(colIndex - 1);
          }

          if (colIndex < row.length - 1) {
            colIndexes.delete(colIndex);
            row[colIndex + 1] = '|';
            colIndexes.add(colIndex + 1);
          }
        } else {
          row[colIndex] = '|';
        }
      }
    });
    return traverseDown(lines, rowIndex + 1, colIndexes);
  }

  return lines;
};

const countSplits = (rows: string[][]) => {
  let splitCount = 0;
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i] as string[];
    const prev = rows[i - 1] as string[];
    for (let j = 0; j < rows.length; j++) {
      const ch = row[j];
      const pch = prev[j];
      if (ch === '^' && pch === '|') {
        splitCount++;
      }
    }
  }
  return splitCount;
};

export const day07PartOne = async () => {
  const lines = await getParsedData();
  const startIndex = lines[0]?.findIndex((v) => v === 'S') ?? 0;
  const details = traverseDown(lines, 1, new Set([startIndex]));
  return countSplits(details);
};

export const day07PartTwo = async () => {
  const lines = await getParsedData();
  console.log(lines);
  return 0;
};

const day07 = async () => {
  await day07PartOne();
  // await day07PartTwo();
};

export default day07;
