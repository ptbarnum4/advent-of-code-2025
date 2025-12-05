const fs = require('fs/promises');
const path = require('path');

/** @returns {Promise<{ranges: number[][]; ids: number[] }>} */
const getParsedData = async (file = 'data.txt') => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  const [rangesData, idsData] = data.split('\n\n');
  const ranges = rangesData.split(/\r?\n/).map(v => v.split('-').map(v => parseInt(v)));
  const ids = idsData.split(/\r?\n/).map(v => parseInt(v));

  return { ranges, ids };
};

/**
 * @param {number} id
 * @param {number[][]} ranges
 */
const isInRange = (id, ranges) => {
  for (let i = 0; i < ranges.length; i++) {
    const [from, to] = ranges[i];
    if (id >= from && id <= to) {
      return true;
    }
  }
  return false;
};

const day05 = async () => {
  const { ranges, ids } = await getParsedData();
  const freshCount = ids.filter(id => isInRange(id, ranges)).length;
  console.log('Fresh Items:', freshCount, freshCount === 601); // 601
};

module.exports = day05;
