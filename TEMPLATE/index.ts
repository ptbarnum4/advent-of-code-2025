import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<string[]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/);
};

const dayTEMPLATEPartOne = async () => {
  const lines = await getParsedData();
  console.log(lines);
};

const dayTEMPLATEPartTwo = async () => {
  const lines = await getParsedData();
  console.log(lines);
};

const dayTEMPLATE = async () => {
  await dayTEMPLATEPartOne();
  // await day7PartTwo();
};

export default dayTEMPLATE;

