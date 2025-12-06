import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<string[]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/);
};

export const day10PartOne = async () => {
  const lines = await getParsedData();
  console.log(lines);
  return 0;
};

export const day10PartTwo = async () => {
  const lines = await getParsedData();
  console.log(lines);
  return 0;
};

const day10 = async () => {
  await day10PartOne();
  // await day10PartTwo();
};

export default day10;
