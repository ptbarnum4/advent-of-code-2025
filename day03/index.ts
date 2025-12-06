import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<number[][]> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/).map(line => line.split('').map(v => parseInt(v)));
};

/** Find the largest number available for number length */
const findLargestN = (
  nums: number[],
  max: number = 12,
  index: number = 0,
  largest: number = 0,
  currentNumber: string = ''
): number => {
  const maxNum = parseInt('9'.repeat(max));

  if (currentNumber.length === max) {
    const n = parseInt(currentNumber);
    if (n > largest) {
      return n;
    }
    if (largest === maxNum) {
      return maxNum;
    }
    return largest;
  }

  for (let i = index; i < nums.length; i++) {
    const next = findLargestN(nums, max, i + 1, largest, `${currentNumber}${nums[i]}`);
    if (next > largest) {
      largest = next;
    }
  }

  return largest;
};

/** Find the next largest digit within range */
const findNextLargestDigitInRange = (
  nums: number[],
  startIndex: number,
  toOffset: number
): { largest: number; index: number } => {
  let largest = 0;
  let largestIndex = -1;
  for (let i = startIndex; i < nums.length - toOffset; i++) {
    const n = nums[i] ?? 0;
    if (n > largest) {
      largest = n;
      largestIndex = i;
    }
  }
  return { largest, index: largestIndex };
};
/** Finds the largest digits available in a list of numbers */
const reduceToLargestDigits = (nums: number[], max: number = 12): number[] => {
  const { largest: initLargest, index } = findNextLargestDigitInRange(nums, 0, max);
  let current = `${initLargest}`;
  let lastIndex = index;

  for (let i = index; i < nums.length; i++) {
    const toIndex = 12 - current.length;
    const { largest, index } = findNextLargestDigitInRange(nums, lastIndex + 1, toIndex);
    if (largest) {
      current = `${current}${largest}`;
      lastIndex = index;
    }
  }
  return current.split('').map(v => parseInt(v));
};

/** Primary helper */
const findLargestNumber = async (n: number, expected: number) => {
  const lines = await getParsedData();

  const result = lines
    .map(nums => findLargestN(reduceToLargestDigits(nums), n))
    .reduce((total, n) => total + n, 0);

  console.log('Sum:', result, result === expected);
};

const day03 = async () => {
  await findLargestNumber(2, 17166);
  await findLargestNumber(12, 169077317650774);
};

export default day03;
