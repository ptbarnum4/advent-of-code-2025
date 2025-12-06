import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<string[]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/);
};

const day8PartOne = async () => {
  const lines = await getParsedData();
  console.log(lines);
};

const day8PartTwo = async () => {
  const lines = await getParsedData();
  console.log(lines);
};

const day8 = async () => {
  await day8PartOne();
  // await day8PartTwo();
};

export default day8;

