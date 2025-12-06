import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const add = (nums: number[]) => nums.reduce((t, n) => t + n, 0);
const multiply = (nums: number[]) => nums.reduce((t, n) => t * n, 1);

const comp = {
  '+': add,
  '*': multiply
};

const getParsedData = async (file = 'data.txt'): Promise<string[]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/);
};

const day6PartOne = async () => {
  const lines = await getParsedData();
  const processed = lines.map(v => {
    return v
      .split(' ')
      .filter(Boolean)
      .map(s => (/[1-9]/.test(s) ? parseInt(s) : comp[s.trim() as keyof typeof comp]));
  });

  const computations = processed.pop() as ((nums: number[]) => number)[];

  const columnsData = (computations?.map((fn, i) => {
    const numbers = /** @type {number[]} */ processed.map(p => p[i]);
    return {
      compute: fn,
      numbers: processed.map(p => p[i]),
      total: fn(numbers as number[])
    };
  }) || []) as { compute: (nums: number[]) => number; numbers: number[]; total: number }[];

  const sum = add(columnsData.map(l => l.total));
  console.log('Sum: ', sum, sum === 4387670995909); // 4387670995909
};

const parseLine = (computeStr: string, str: string) => {
  const nums = [];
  let cur = '';

  for (let i = 0; i < str.length; i++) {
    const cc = computeStr[i];
    const ch = str[i];

    if (cc && cc !== ' ') {
      if (cur) {
        nums.push(cur.slice(0, -1));
      }
      cur = '';
    }
    cur += ch;
  }
  if (cur) {
    nums.push(cur);
  }
  return nums;
};

const groupColArrays = (rows: string[][]) => {
  const numberGroups: string[][][] = [];

  const colCount = rows[0]?.length ?? 0;
  for (let i = 0; i < colCount; i++) {
    const col = rows.map(r => r[i]);
    const cols = col.map(c => c?.split('') ?? []);
    numberGroups.push(cols);
  }

  return numberGroups;
};

const groupNumCols = (numGroups: string[][]) => {
  const nums = [];
  const longest = Math.max(...numGroups.map(g => g.length));

  for (let i = 0; i < longest; i++) {
    let num = '';
    for (let j = 0; j < numGroups.length; j++) {
      const n = numGroups[j]?.[i] ?? '';
      num += n;
    }
    nums.push(parseInt(num.trim()));
  }
  return nums;
};

const day6PartTwo = async () => {
  const lines = await getParsedData();

  const lastLine = lines[lines.length - 1] as string;
  const computations = lastLine
    .split(' ')
    .filter(Boolean)
    .map(v => comp[v.trim() as keyof typeof comp]);

  const processed = lines.slice(0, -1).map(v => parseLine(lastLine, v));

  const grouped = groupColArrays(processed).map((numGroup, i) => {
    const group = groupNumCols(numGroup);
    const comp = computations[i] as (nums: number[]) => number;
    return { group, total: comp(group) };
  });

  const total = add(grouped.map(g => g.total));
  console.log('Total:', total, total === 9625320374409);
};
const day06 = async () => {
  await day6PartOne();
  await day6PartTwo();
};

export default day06;
