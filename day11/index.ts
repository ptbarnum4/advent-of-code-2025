import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<string[]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/);
};

export const day11PartOne = async () => {
  const lines = await getParsedData();
  console.log(lines);
  return 0;
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
