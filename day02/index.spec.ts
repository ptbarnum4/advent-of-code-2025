import { expect } from 'chai';
import { day02PartOne, day02PartTwo } from './index';

describe('Day 2', () => {
  describe('Part 1', async () => {
    it('should return the correct total: 29940924880', async () => {
      const total = await day02PartOne();
      expect(total).to.equal(29940924880);
    });
  });
  describe('Part 2', async () => {
    it('should return the correct total: 48631958998', async () => {
      const total = await day02PartTwo();
      expect(total).to.equal(48631958998);
    });
  });
});
