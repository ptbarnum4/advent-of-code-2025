const fs = require('fs/promises');
const path = require('path');

/** @returns {Promise<number[][]>} */
const getParsedData = async (file = 'data.txt') => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/).map(line => line.split('').map(v => parseInt(v)));
};

/**
 * Find the largest number available for number length
 * @param {number[]} nums
 * @param {number} max
 * @param {number} index
 * @param {number} largest
 * @param {string} currentNumber
 * @returns {number}
 */
const findLargestN = (nums, max = 12, index = 0, largest = 0, currentNumber = '') => {
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

/**
 * Find the next largest digit within range
 * @param {number[]} nums
 * @param {number} startIndex
 * @param {number} toOffset
 * @returns {{ largest: number; index: number }}
 */
const findNextLargestDigitInRange = (nums, startIndex, toOffset) => {
  let largest = 0;
  let largestIndex = -1;
  for (let i = startIndex; i < nums.length - toOffset; i++) {
    const n = nums[i];
    if (n > largest) {
      largest = n;
      largestIndex = i;
    }
  }
  return { largest, index: largestIndex };
};
/**
 * Finds the largest digits available in a list of numbers
 * @param {number[]} nums
 * @param {number} max
 * @returns {number[]}
 *
 */
const reduceToLargestDigits = (nums, max = 12) => {
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

/**
 *
 * @param {number} n
 * @param {number} expected
 */
const findLargestNumber = async (n, expected) => {
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

module.exports = day03;
