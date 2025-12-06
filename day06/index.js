const fs = require('fs/promises');
const path = require('path');

/** @param {number[]} nums */
const add = nums => nums.reduce((t, n) => t + n, 0);
/** @param {number[]} nums */
const multiply = nums => nums.reduce((t, n) => t * n, 1);

const comp = {
  '+': add,
  '*': multiply
};

const getParsedData = async (file = 'data.txt') => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/);
};

const day6PartOne = async () => {
  const lines = await getParsedData();
  const processed = lines.map(v => {
    return v
      .split(' ')
      .filter(Boolean)
      .map(s =>
        /[1-9]/.test(s) ? parseInt(s) : comp[/** @type {keyof typeof comp} */ (s.trim())]
      );
  });

  const computations = /** @type {((nums: number[]) => number)[]}*/ (processed.pop());

  const columnsData =
    /** @type {{ compute: (nums: number[]) => number;  numbers: number[]; total: number }[]} */ (
      computations?.map((fn, i) => {
        const numbers = /** @type {number[]} */ (processed.map(p => p[i]));
        return {
          compute: fn,
          numbers: processed.map(p => p[i]),
          total: fn(numbers)
        };
      }) || []
    );

  const sum = add(columnsData.map(l => l.total));
  console.log('Sum: ', sum, sum === 4387670995909); // 4387670995909
};

/**
 *
 * @param {string} computeStr
 * @param {string} str
 * @returns
 */
const parseLine = (computeStr, str) => {
  const nums = [];
  let cur = '';

  for (let i = 0; i < str.length; i++) {
    const cc = computeStr[i];
    const ch = str[i];

    if (cc && cc !== ' ') {
      if (cur) {
        nums.push(cur.slice(0, -1));
      }
      cur = '';
    }
    cur += ch;
  }
  if (cur) {
    nums.push(cur);
  }
  return nums;
};

/**
 *
 * @param {string[][]} rows
 */
const groupColArrays = rows => {
  /**
   *
   * @type {string[][][]}
   */
  const numberGroups = [];

  const colCount = rows[0].length;
  for (let i = 0; i < colCount; i++) {
    const col = rows.map(r => r[i]);
    const cols = col.map(c => c.split(''));
    numberGroups.push(cols);
  }

  return numberGroups;
};

/**
 *
 * @param {string[][]} numGroups
 * @returns
 */
const groupNumCols = numGroups => {
  const nums = [];
  const longest = Math.max(...numGroups.map(g => g.length));

  for (let i = 0; i < longest; i++) {
    let num = '';
    for (let j = 0; j < numGroups.length; j++) {
      const n = numGroups[j][i] ?? '';
      num += n;
    }
    nums.push(parseInt(num.trim()));
  }
  return nums;
};

const day6PartTwo = async () => {
  const lines = await getParsedData();

  const lastLine = lines[lines.length - 1];
  const computations = lastLine
    .split(' ')
    .filter(Boolean)
    .map(v => comp[/** @type {keyof typeof comp} */ (v.trim())]);

  const processed = lines.slice(0, -1).map(v => parseLine(lastLine, v));

  const grouped = groupColArrays(processed).map((numGroup, i) => {
    const group = groupNumCols(numGroup);
    const comp = computations[i];
    return { group, total: comp(group) };
  });

  const total = add(grouped.map(g => g.total));
  console.log('Total:', total, total === 9625320374409);
};
const day06 = async () => {
  await day6PartOne();
  await day6PartTwo();
};

module.exports = day06;
