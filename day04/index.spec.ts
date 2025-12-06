import { expect } from 'chai';
import { day04PartOne, day04PartTwo } from './index';

describe('Day 4', () => {
  describe('Part 1', async () => {
    it('should return the correct total: 1457', async () => {
      const total = await day04PartOne();
      expect(total).to.equal(1457);
    });
  });
  describe('Part 2', async () => {
    it('should return the correct total: 8310', async () => {
      const total = await day04PartTwo();
      expect(total).to.equal(8310);
    });
  });
});
