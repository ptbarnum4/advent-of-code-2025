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
 * @param {number[]} range
 */
const isInRange = (id, range) => {
  const [from, to] = range;
  if (id >= from && id <= to) {
    return true;
  }

  return false;
};

/**
 * @param {number} id
 * @param {number[][]} ranges
 */
const isInRanges = (id, ranges) => {
  for (let i = 0; i < ranges.length; i++) {
    const [from, to] = ranges[i];
    if (isInRange(id, ranges[i])) {
      return true;
    }
  }
  return false;
};

/** @param {number[][]} ranges */
const groupRanges = ranges => {
  /** @type {number[][]} ranges */
  const newRanges = [];

  ranges.forEach(range => {
    let [start, end] = range;

    for (let i = 0; i < ranges.length; i++) {
      const rangeToCheck = ranges[i];
      // If start digit is in current range
      if (isInRange(start, rangeToCheck)) {
        start = rangeToCheck[0];
      }
      // If end digit is in current range
      if (isInRange(end, rangeToCheck)) {
        end = rangeToCheck[1];
      }
    }

    // Check if we already have the range
    const alreadyIncluded = newRanges.some(([a1, a2]) => a1 === start && a2 === end);

    if (!alreadyIncluded) {
      // Only push new range if we don't already have it
      newRanges.push([start, end]);
    }
  });

  // Check if the group length has changed. if it has, we're not done grouping
  if (newRanges.length !== ranges.length) {
    return groupRanges(newRanges);
  }

  // Grouping complete
  return newRanges;
};

const day05 = async () => {
  const { ranges, ids } = await getParsedData();

  // Part One
  const freshCount = ids.filter(id => isInRanges(id, ranges)).length;
  console.log('Fresh Items:', freshCount, freshCount === 601); // 601

  // Part Two
  const sum = groupRanges(ranges.slice(0).sort(([a], [b]) => a - b)).reduce(
    (total, [a, b]) => total + b - a + 1,
    0
  );

  console.log('Total Fresh IDs', sum, sum === 367899984917516);
};

module.exports = day05;
