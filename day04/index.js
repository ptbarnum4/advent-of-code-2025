const fs = require('fs/promises');
const path = require('path');

/** @returns {Promise<string[][]>} */
const getParsedData = async (file = 'data.txt') => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  return data.split(/\r?\n/).map(v => v.split(''));
};

/**
 * @param {string[][]} lines
 * @param {number} x
 * @param {number} y
 */
const canMovePaper = (lines, x, y) => {
  if (lines[x][y] !== '@') {
    return false;
  }
  const dir = [-1, 0, 1];

  let atCount = 0;

  dir.forEach(d1 =>
    dir.forEach(d2 => {
      const v = lines[x + d1]?.[y + d2];
      if ((!d1 && !d2) || !v) {
        return;
      }
      if (v === '@') {
        atCount++;
      }
    })
  );

  return atCount < 4;
};

/**
 * @param {string[][]} lines
 * @returns {{ clearedLines: string[][]; total: number }}
 */
const countAndSwap = lines => {
  const newLines = [];

  for (let x = 0; x < lines.length; x++) {
    const row = lines[x];
    const newRow = [];

    for (let y = 0; y < row.length; y++) {
      const canMove = canMovePaper(lines, x, y);

      if (canMove) {
        newRow.push('X');
      } else {
        newRow.push(row[y]);
      }
    }
    newLines.push(newRow);
  }

  const total = newLines.flat().filter(v => v === 'X').length;

  const clearedLines = newLines.map(l => l.map(v => (v === 'X' ? '.' : v)));

  return { clearedLines, total };
};

const day4PartOne = async () => {
  const lines = await getParsedData();
  const { total } = countAndSwap(lines);
  console.log('Total:', total, total === 1457); // 1457
};

const day4PartTwo = async () => {
  const lines = await getParsedData();

  let currentLines = lines;
  let finalTotal = 0;
  let currentTotal;

  while (currentTotal !== 0) {
    const { total, clearedLines } = countAndSwap(currentLines);
    currentTotal = total;
    finalTotal += total;
    currentLines = clearedLines;
  }
  console.log('Total:', finalTotal, finalTotal === 8310); // 8310
};

const day04 = async () => {
  await day4PartOne();
  await day4PartTwo();
};

module.exports = day04;
