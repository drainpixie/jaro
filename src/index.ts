export function jaro(a: string, b: string) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  if (a === b) return 1.0;

  const m = a.length;
  const n = b.length;

  if (m === 0 || n === 0) return 0.0;
  const range = (Math.max(m, n) >>> 1) - 1;

  let matches = 0;
  const am = new Uint8Array(m);
  const bm = new Uint8Array(n);

  for (let i = 0; i < m; i++) {
    const start = Math.max(0, i - range);
    const end = Math.min(n, i + range + 1);

    for (let j = start; j < end; j++) {
      if (bm[j] || a[i] !== b[j]) continue;

      am[i] = 1;
      bm[j] = 1;
      matches++;
      break;
    }
  }

  if (matches === 0) return 0.0;

  let transpositions = 0;
  let k = 0;

  for (let i = 0; i < m; i++) {
    if (!am[i]) continue;

    while (k < n && !bm[k]) k++;

    if (a[i] !== b[k]) transpositions++;

    k++;
  }

  return (
    (matches / m + matches / n + (matches - (transpositions >>> 1)) / matches) /
    3.0
  );
}

export function jaroWinkler(a: string, b: string) {
  const j = jaro(a, b);
  if (j < 0.7) return j;

  let prefix = 0;
  for (let i = 0; i < Math.min(4, a.length, b.length); i++) {
    if (a[i] !== b[i]) break;
    prefix++;
  }

  return j + prefix * 0.1 * (1 - j);
}
