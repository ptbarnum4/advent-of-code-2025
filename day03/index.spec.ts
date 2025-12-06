import { expect } from 'chai';
import { day03PartOne, day03PartTwo } from './index';

describe('Day 3', () => {
  describe('Part 1', async () => {
    it('should return the correct total: 17166', async () => {
      const total = await day03PartOne();
      expect(total).to.equal(17166);
    });
  });
  describe('Part 2', async () => {
    it('should return the correct total: 169077317650774', async () => {
      const total = await day03PartTwo();
      expect(total).to.equal(169077317650774);
    });
  });
});
