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

  /** @type {number[]} */
  const paths = [];

  let current = 50;

  nums.forEach(n => {
    const total = current + n;

    if (total < 0) {
      const next = 100 + (total % 100);
      current = next;
      return paths.push(next);
    }
    if (total > 99) {
      const next = total % 100;
      current = next;
      return paths.push(next);
    }

    current = total;
    paths.push(total);
  });

  const zeroCount = paths.filter(v => v === 0).length;

  console.log('Total: ', zeroCount);

  // Total: 1168
};

const day01PartTwo = async () => {
  // const parsed = await getParsedData('example.txt');
  const parsed = await getParsedData();
  const nums = parsed.map(l => {
    const neg = l[0] === 'L' ? -1 : 1;
    const n = parseInt(l.replaceAll(/[^0-9]/g, ''));
    const rotations = Math.floor(Math.abs(n) / 100);

    const under = n % 100;
    const num = under * neg;
    const v = { rotations, num, n };
    // console.log(v);
    return v;
  });

  let current = 50;
  let zeros = 0;

  nums.forEach(({ rotations, num }) => {
    const total = current + num;

    zeros += rotations;
    const prev = current;

    if (total < 0) {
      const next = 100 + total;
      if (current !== 0) {
        zeros++;
      }
      current = next;
    } else if (total > 99) {
      const next = total % 100;
      zeros++;
      current = next;
    } else {
      current = total;
      if (total === 0) {
        zeros++;
      }
    }
  });

  console.log('Total: ', zeros);

  // 7199
};

module.exports = day01PartTwo;
