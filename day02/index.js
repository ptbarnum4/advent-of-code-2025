const fs = require('fs/promises');
const path = require('path');

/** @returns {Promise<{start: string, end: string }[]>} */
const getParsedData = async (file = 'data.txt') => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data
    .replaceAll(/\r?\n/g, '')
    .split(',')
    .map(l => {
      const [start, end] = l.split('-');
      return { start, end };
    });
};

/**
 * Check if a sequence of numbers repeats twice in number string
 * @param {string} str
 *
 * @example
 * Since the young Elf was just doing silly patterns, you can find the invalid IDs by
 * looking for any ID which is made only of some sequence of digits repeated twice.
 * So, 55 (5 twice), 6464 (64 twice), and 123123 (123 twice) would all be invalid IDs.
 */
const checkRepeatTwice = str => {
  const len = str.length;
  // only check even length strings
  if (len % 2 !== 0) {
    return null;
  }
  const [a, b] = [str.slice(0, len / 2), str.slice(len / 2)];

  if (a === b) {
    return str;
  }
};

/**
 *
 * @param {string} start
 * @param {string} end
 */
const findInvalidIds = (start, end) => {
  let total = 0;

  for (let i = parseInt(start); i <= parseInt(end); i++) {
    const s = String(i);

    const invalidStr = checkRepeatTwice(s);
    if (invalidStr) {
      total += i;
    }
  }

  return total;
};

const day02PartOne = async () => {
  const lines = await getParsedData();
  // const lines = await getParsedData('example.txt');

  const data = lines.map(({ start, end }) => ({
    start,
    end,
    total: findInvalidIds(start, end)
  }));

  const total = data.reduce((total, d) => total + d.total, 0).toString();

  console.log(`Total: ${total}`, total === '29940924880'); // 29940924880
};

/**
 * Check if a sequence of numbers repeats twice in number string
 * @param {string} str
 *
 * @example
 * Since the young Elf was just doing silly patterns, you can find the invalid IDs by
 * looking for any ID which is made only of some sequence of digits repeated twice.
 * So, 55 (5 twice), 6464 (64 twice), and 123123 (123 twice) would all be invalid IDs.
 */
const checkRepeatAny = str => {
  const len = str.length;

  const minLength = 1;
  const maxLength = Math.floor(str.length / 2);

  for (let i = minLength; i <= maxLength; i++) {
    // only check even length strings
    if (len % i === 0) {
      const segments = new Array(len / i).fill(0).map((_, j) => str.slice(i * j, i * j + i));

      const [a, ...bc] = segments;

      if (bc.every(v => v === a)) {
        return true;
      }
    }
  }
  return false;
};

/**
 *
 * @param {string} start
 * @param {string} end
 */
const findAnyInvalidIds = (start, end) => {
  let total = 0;

  for (let s = parseInt(start); s <= parseInt(end); s++) {
    const n = String(s);

    const invalidStr = checkRepeatAny(n);
    if (invalidStr) {
      total += s;
    }
  }

  return total;
};

const day02PartTwo = async () => {
  const lines = await getParsedData();

  const data = lines.map(({ start, end }) => {
    return { start, end, total: findAnyInvalidIds(start, end) };
  });

  const total = data
    .reduce((total, d) => {
      return total + d.total;
    }, 0)
    .toString();

  console.log(`Total: ${total}`, total === '48631958998'); // 48631958998
};

module.exports = day02PartOne;
// module.exports = day02PartTwo;
