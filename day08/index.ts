import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<string[]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/);
};

export const day08PartOne = async () => {
  const lines = await getParsedData();
  console.log(lines);
  return 0;
};

export const day08PartTwo = async () => {
  const lines = await getParsedData();
  console.log(lines);
  return 0;
};

const day08 = async () => {
  await day08PartOne();
  // await day08PartTwo();
};

export default day08;
