import { expect } from 'chai';
import { day05PartOne, day05PartTwo } from './index';

describe('Day 5', () => {
  describe('Part 1', async () => {
    it('should return the correct total: 601', async () => {
      const total = await day05PartOne();
      expect(total).to.equal(601);
    });
  });
  describe('Part 2', async () => {
    it('should return the correct total: 367899984917516', async () => {
      const total = await day05PartTwo();
      expect(total).to.equal(367899984917516);
    });
  });
});
