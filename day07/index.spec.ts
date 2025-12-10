import { expect } from 'chai';
import { day07PartOne, day07PartTwo } from './index';

describe('Day 7', () => {
  describe('Part 1', async () => {
    it('should return the correct total: 1690', async () => {
      const total = await day07PartOne();
      expect(total).to.equal(1690);
    });
  });
  describe('Part 2', async () => {
    it('should return the correct total: 221371496188107', async () => {
      const total = await day07PartTwo();
      expect(total).to.equal(221371496188107);
    });
  });
});
