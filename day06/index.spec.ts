import { expect } from 'chai';
import { day06PartOne, day06PartTwo } from './index';

describe('Day 6', () => {
  describe('Part 1', async () => {
    it('should return the correct total: 4387670995909', async () => {
      const total = await day06PartOne();
      expect(total).to.equal(4387670995909);
    });
  });
  describe('Part 2', async () => {
    it('should return the correct total: 9625320374409', async () => {
      const total = await day06PartTwo();
      expect(total).to.equal(9625320374409);
    });
  });
});
