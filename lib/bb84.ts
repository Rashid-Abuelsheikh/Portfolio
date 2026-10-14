// Faithful port of the original Python BB84 simulation.
// Same constants, same sifting and error-check logic.
export const N = 8000;
export const SAMPLE = 500;
export const THRESHOLD = 0.11;

const ri = (n: number) => Math.floor(Math.random() * n); // 0..n-1
const measure = (bit: number, prep: number, meas: number) =>
  prep === meas ? bit : ri(2);

export type Bb84Result = {
  rawBits: number;
  rate: number;
  errors: number;
  sifted: number;
  same: boolean;
};

export function bb84(n: number, eveFraction: number, sample: number): Bb84Result {
  const aBits: number[] = [], aBases: number[] = [], bBases: number[] = [];
  for (let i = 0; i < n; i++) { aBits.push(ri(2)); aBases.push(ri(2)); bBases.push(ri(2)); }

  const bBits: number[] = new Array(n);
  for (let i = 0; i < n; i++) {
    let bit = aBits[i], basis = aBases[i];
    if (Math.random() < eveFraction) { const eb = ri(2); bit = measure(bit, basis, eb); basis = eb; }
    bBits[i] = measure(bit, basis, bBases[i]);
  }

  const keep: number[] = [];
  for (let i = 0; i < n; i++) if (aBases[i] === bBases[i]) keep.push(i);
  const aKey = keep.map((k) => aBits[k]);
  const bKey = keep.map((k) => bBits[k]);

  const m = keep.length;
  const s = Math.min(sample, m);
  const idx: number[] = [];
  for (let i = 0; i < m; i++) idx.push(i);
  for (let i = m - 1; i > 0; i--) { const j = ri(i + 1); const t = idx[i]; idx[i] = idx[j]; idx[j] = t; }

  const checked: Record<number, boolean> = {};
  let errors = 0;
  for (let i = 0; i < s; i++) { const p = idx[i]; checked[p] = true; if (aKey[p] !== bKey[p]) errors++; }

  const fa: number[] = [], fb: number[] = [];
  for (let i = 0; i < m; i++) if (!checked[i]) { fa.push(aKey[i]); fb.push(bKey[i]); }
  const same = fa.length === fb.length && fa.every((v, k) => v === fb[k]);

  return { rawBits: fa.length, rate: s ? errors / s : 0, errors, sifted: m, same };
}
