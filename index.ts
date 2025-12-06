(async (n = '1') => {
  const fn = (await import(`./day${n.trim().padStart(2, '0')}/index.ts`)).default;

  if (typeof fn !== 'function') {
    console.error('You must `export` a default function.\n');
    process.exit(1);
  }
  fn();
})(process.argv[2] || '1');
