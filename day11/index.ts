import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<Map<string, string[]>> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');

  const paths = new Map<string, string[]>();
  data.split(/\r?\n/).forEach((l) => {
    const [key, availablePath] = l.split(':').map((v) => v.trim()) as [string, string];
    const availablePaths = availablePath?.split(' ') as string[];

    const existing = paths.get(key);
    if (existing) {
      return paths.set(key, [...existing, ...availablePaths]);
    }
    return paths.set(key, availablePaths);
  });
  return paths;
};

const followPathsOut = (pathMap: Map<string, string[]>, paths?: string[]): number => {
  if (!paths) {
    return 0;
  }

  if (paths.includes('out') && paths.length === 1) {
    return 1;
  }

  return paths.map((p) => followPathsOut(pathMap, pathMap.get(p) ?? [])).reduce((t, n) => t + n, 0);
};

export const day11PartOne = async () => {
  const pathMap = await getParsedData();
  return followPathsOut(pathMap, pathMap.get('you'));
};

export const day11PartTwo = async () => {
  const lines = await getParsedData();
  console.log(lines);
  return 0;
};

const day11 = async () => {
  await day11PartOne();
  // await day11PartTwo();
};

export default day11;
