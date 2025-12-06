import { expect } from 'chai';
import { day01PartOne, day01PartTwo } from './index';

describe('Day 1', () => {
  describe('Part 1', async () => {
    it('should return the correct total: 1168', async () => {
      const total = await day01PartOne();
      expect(total).to.equal(1168);
    });
  });
  describe('Part 2', async () => {
    it('should return the correct total: 1168', async () => {
      const total = await day01PartTwo();
      expect(total).to.equal(7199);
    });
  });
});
