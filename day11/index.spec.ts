import { expect } from 'chai';
import { day11PartOne, day11PartTwo } from './index';

describe.only('Day 11', () => {
  describe('Part 1', async () => {
    it('should return the correct total: 431', async () => {
      const total = await day11PartOne();
      expect(total).to.equal(431);
    });
  });
  describe('Part 2', async () => {
    it('should return the correct total: TBD', async () => {
      const total = await day11PartTwo();
      expect(total).to.equal(0);
    });
  });
});
