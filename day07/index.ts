import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<string[][]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/).map((r) => r.split('').map((v) => (v === '.' ? '.' : v)));
};

const traverseDown = (
  grid: string[][],
  rowIndex: number,
  colIndexes: Set<number>,
  allColIndexes: number[][] = [],
): { grid: string[][]; allColIndexes: number[][] } => {
  const prev = grid[rowIndex - 1] as string[];
  const row = grid[rowIndex] as string[];

  if (!row || !prev) {
    return { grid, allColIndexes };
  }

  if (rowIndex < grid.length) {
    colIndexes.forEach((colIndex) => {
      const ch = row[colIndex];
      const pch = prev[colIndex];

      if (rowIndex >= grid.length) {
        return { lines: grid, allColIndexes };
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

    allColIndexes.push(Array.from(colIndexes.values()));
    return traverseDown(grid, rowIndex + 1, colIndexes, allColIndexes);
  }

  return { grid, allColIndexes };
};

const cachedLR = new Map<string, { left: number; right: number }>();

const walkPathFrom = (grid: string[][], rowIndex: number, colIndex: number): number => {
  if (rowIndex >= grid.length) {
    return 1;
  }

  const ch = grid[rowIndex]?.[colIndex];

  const nextCh = grid[rowIndex + 1]?.[colIndex];

  if (ch === '|' && nextCh === '^') {
    const clr = cachedLR.get(`${rowIndex},${colIndex}`);

    const left = clr?.left ?? walkPathFrom(grid, rowIndex + 1, colIndex - 1);
    const right = clr?.right ?? walkPathFrom(grid, rowIndex + 1, colIndex + 1);

    cachedLR.set(`${rowIndex},${colIndex}`, { left, right });

    return left + right;
  }
  if (!nextCh) {
    return 1;
  }

  return walkPathFrom(grid, rowIndex + 1, colIndex);
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
  traverseDown(lines, 1, new Set([startIndex]));
  return countSplits(lines);
};

export const day07PartTwo = async () => {
  const lines = await getParsedData();
  const startIndex = lines[0]?.findIndex((v) => v === 'S') ?? 0;
  const grid = traverseDown(lines, 1, new Set([startIndex])).grid;
  const totalPaths = walkPathFrom(grid, 1, startIndex);

  return totalPaths;
};

const day07 = async () => {
  await day07PartOne();
  await day07PartTwo();
};

export default day07;
