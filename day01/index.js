const fs = require('fs/promises');
const path = require('path');

/** @returns {Promise<string[]>} */
const getParsedData = async (file = 'data.txt') => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/);
};

const day01PartOne = async () => {
  const nums = (await getParsedData()).map(l => {
    const neg = l[0] === 'L' ? -1 : 1;
    const n = parseInt(l.replaceAll(/[^0-9]/g, ''));
    const under = n % 100;
    return under * neg;
  });

  let current = 50;
  let zeros = 0;

  nums.forEach(n => {
    const total = current + n;
    current = total;

    if (total < 0) {
      current = 100 + total;
    }

    if (total > 99) {
      current = total % 100;
    }

    if (current === 0) {
      zeros++;
    }
  });

  console.log('Total: ', zeros); // 1168
};

const day01PartTwo = async () => {
  // const parsed = await getParsedData('example.txt');
  const parsed = await getParsedData();

  let current = 50;
  let zeros = 0;

  const nums = parsed.map(l => {
    const neg = l[0] === 'L' ? -1 : 1;
    const n = parseInt(l.replaceAll(/[^0-9]/g, ''));
    const rotations = Math.floor(Math.abs(n) / 100);

    // Always count rotations
    zeros += rotations;

    return (n % 100) * neg;
  });

  nums.forEach(num => {
    const total = current + num;

    if (total < 0) {
      // Omit zeros on decrement when current is zero
      if (current !== 0) {
        zeros++;
      }
      // get backtick from 100
      current = 100 + total;
      return;
    }
    if (total > 99) {
      // Always count the increment over 0
      zeros++;
      current = total % 100;
      return;
    }

    current = total;
    if (total === 0) {
      // Catch when landing on 0
      zeros++;
    }
  });

  console.log('Total: ', zeros); // 7199
};

// module.exports = day01PartOne;
module.exports = day01PartTwo;
