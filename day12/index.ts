import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<string[]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/);
};

export const day12PartOne = async () => {
  const lines = await getParsedData();
  console.log(lines);
  return 0;
};

export const day12PartTwo = async () => {
  const lines = await getParsedData();
  console.log(lines);
  return 0;
};

const day12 = async () => {
  await day12PartOne();
  // await day12PartTwo();
};

export default day12;
