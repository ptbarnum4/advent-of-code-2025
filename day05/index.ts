import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getParsedData = async (file = 'data.txt'): Promise<{ ranges: number[][]; ids: number[] }> => {
  const data = await fs.readFile(path.resolve(__dirname, file), 'utf8');
  const [rangesData, idsData] = data.split('\n\n');
  const ranges = rangesData?.split(/\r?\n/).map(v => v.split('-').map(v => parseInt(v)));
  const ids = idsData?.split(/\r?\n/).map(v => parseInt(v));

  return { ranges, ids } as { ranges: number[][]; ids: number[] };
};

const isInRange = (id: number, range: number[]) => {
  const [from, to] = range as [number, number];

  if (id >= from && id <= to) {
    return true;
  }

  return false;
};

const isInRanges = (id: number, ranges: number[][]) => {
  for (let i = 0; i < ranges.length; i++) {
    const r = ranges[i];
    if (r && isInRange(id, r)) {
      return true;
    }
  }
  return false;
};

const groupRanges = (ranges: number[][]) => {
  const newRanges: number[][] = [];

  ranges.forEach(range => {
    let [start, end] = range as [number, number];

    for (let i = 0; i < ranges.length; i++) {
      const rangeToCheck = ranges[i] as [number, number];
      // If start digit is in current range
      if (start && rangeToCheck && isInRange(start, rangeToCheck)) {
        start = rangeToCheck[0];
      }
      // If end digit is in current range
      if (end && isInRange(end, rangeToCheck)) {
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
  const freshCount = ids?.filter(id => ranges && isInRanges(id, ranges)).length;
  console.log('Fresh Items:', freshCount, freshCount === 601); // 601

  // Part Two
  const sum = groupRanges(ranges?.slice(0).sort(([a], [b]) => (a ?? 0) - (b ?? 0)) ?? []).reduce(
    (total, [a, b]) => total + (b ?? 0) - (a ?? 0) + 1,
    0
  );

  console.log('Total Fresh IDs', sum, sum === 367899984917516);
};

export default day05;
