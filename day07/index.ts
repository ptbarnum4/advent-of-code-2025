import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<string[]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/);
};

const day7PartOne = async () => {
  const lines = await getParsedData();
  console.log(lines);
};

const day7PartTwo = async () => {
  const lines = await getParsedData();
  console.log(lines);
};

const day7 = async () => {
  await day7PartOne();
  // await day7PartTwo();
};

export default day7;

