/**
 * Return formatted diff from `startTime` - now
 * @param {number} start
 * @returns
 */
module.exports.formatTime = start => {
  const now = Date.now();
  const diff = now - start;
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return `${hours}h ${minutes}m ${seconds}s`;
};
