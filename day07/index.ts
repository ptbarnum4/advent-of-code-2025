import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<string[][]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/).map((r) => r.split('').map((v) => (v === '.' ? '.' : v)));
};

const createPaths = (
  grid: string[][],
  rowIndex: number,
  colIndexes: Set<number>,
  splits = 0,
): { splits: number; grid: string[][] } => {
  const prev = grid[rowIndex - 1] as string[];
  const row = grid[rowIndex] as string[];

  if (!row || !prev || rowIndex >= grid.length) {
    return { splits, grid };
  }

  colIndexes.forEach((colIndex) => {
    const char = row[colIndex];
    const prevChar = prev[colIndex];

    if (char === '^' && prevChar === '|') {
      colIndexes.delete(colIndex);
      const left = colIndex - 1;
      const right = colIndex + 1;

      row[left] = row[right] = '|';

      colIndexes.add(left);
      colIndexes.add(right);

      return splits++;
    }
    row[colIndex] = '|';
  });

  return createPaths(grid, rowIndex + 1, colIndexes, splits);
};

const walkPathFrom = (
  grid: string[][],
  rowIndex: number,
  colIndex: number,
  LRC = new Map<string, { left: number; right: number }>(),
): number => {
  if (rowIndex >= grid.length) {
    return 1;
  }
  const ch = grid[rowIndex]?.[colIndex];
  const nextCh = grid[rowIndex + 1]?.[colIndex];

  if (ch === '|' && nextCh === '^') {
    const lr = LRC.get(`${rowIndex},${colIndex}`);
    const nextRow = rowIndex + 1;

    const left = lr?.left ?? walkPathFrom(grid, nextRow, colIndex - 1, LRC);
    const right = lr?.right ?? walkPathFrom(grid, nextRow, colIndex + 1, LRC);

    LRC.set(`${rowIndex},${colIndex}`, { left, right });

    return left + right;
  }

  return walkPathFrom(grid, rowIndex + 1, colIndex, LRC);
};

export const day07PartOne = async () => {
  const lines = await getParsedData();
  const startIndex = lines[0]?.findIndex((v) => v === 'S') ?? 0;
  return createPaths(lines, 1, new Set([startIndex])).splits;
};

export const day07PartTwo = async () => {
  const lines = await getParsedData();
  const startIndex = lines[0]?.findIndex((v) => v === 'S') ?? 0;
  const { grid } = createPaths(lines, 1, new Set([startIndex]));
  return walkPathFrom(grid, 1, startIndex);
};

const day07 = async () => {
  await day07PartOne();
  await day07PartTwo();
};

export default day07;
