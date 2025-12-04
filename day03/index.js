const fs = require('fs/promises');
const path = require('path');

/** @returns {Promise<string[]>} */
const getParsedData = async (file = 'data.txt') => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/);
};

/**
 *
 * @param  {...number} nums
 */
const add = (...nums) => {
  return nums.reduce((total, n) => n + total, 0);
};

/**
 *
 * @param {string} str
 */
const findLargestTwo = str => {
  let largest = 0;
  const arr = str.split('');

  for (let i = 0; i < arr.length; i++) {
    const n1 = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      const n2 = arr[j];
      const n = parseInt(`${n1}${n2}`);

      if (n > largest) {
        largest = n;
      }
      if (largest === 99) {
        return 99;
      }
    }
  }

  return largest;
};

const day03PartOne = async () => {
  const lines = await getParsedData();
  const data = lines.map(l => ({ largest: findLargestTwo(l), str: l }));
  const sum = add(...data.map(({ largest }) => largest));
  console.log('Total: ', sum, sum === 17166); // 17166
};

const day03PartTwo = async () => {
  const lines = await getParsedData('example.txt');
  // const lines = await getParsedData();
  const startTime = Date.now();

  const numLines = lines.map(line => line.split('').map(v => parseInt(v)));

  //! 143691836066252
  //! 146757302250048
  //! 156390073228439
};

module.exports = day03PartOne;
// module.exports = day03PartTwo;
