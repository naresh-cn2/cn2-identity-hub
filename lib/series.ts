// Deterministic generators for illustrative visualizations.
// Every series produced here is seeded and reproducible — nothing is random at runtime.

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic pseudo-equity series in [0,1] normalized cumulative-return space. */
export function equitySeries(seed: number, points: number, drift = 0.0016, vol = 0.011): number[] {
  const rand = mulberry32(seed);
  const out: number[] = [];
  let v = 1;
  let regime = 1;
  for (let i = 0; i < points; i++) {
    if (i % 90 === 0) regime = rand() > 0.35 ? 1 : -0.6;
    const shock = (rand() * 2 - 1) * vol * regime;
    v = Math.max(0.35, v * (1 + drift + shock));
    out.push(v);
  }
  // normalize to 0..1 for rendering
  const max = Math.max(...out);
  const min = Math.min(...out);
  return out.map((x) => (x - min) / (max - min || 1));
}

/** Drawdown series (0..1, inverted peaks) derived from an equity series. */
export function drawdownSeries(series: number[]): number[] {
  let peak = -Infinity;
  return series.map((v) => {
    peak = Math.max(peak, v);
    return peak > 0 ? (peak - v) / peak : 0;
  });
}

/** Deterministic candle series for replay demonstration. */
export interface Candle {
  t: number; // index (ms offsets)
  o: number;
  h: number;
  l: number;
  c: number;
}

export function candleSeries(seed: number, count: number, startPrice = 100): Candle[] {
  const rand = mulberry32(seed);
  const out: Candle[] = [];
  let price = startPrice;
  for (let i = 0; i < count; i++) {
    const o = price;
    const drift = (rand() - 0.48) * 2.2;
    const c = Math.max(5, o + drift);
    const h = Math.max(o, c) + rand() * 1.4;
    const l = Math.min(o, c) - rand() * 1.4;
    out.push({ t: i, o, h, l, c });
    price = c;
  }
  return out;
}

/** R-multiple distribution for a synthetic but realistic backtest population. */
export function rDistribution(seed: number, trades: number): number[] {
  const rand = mulberry32(seed);
  const buckets = new Array(13).fill(0); // -3R .. +9R in 1R buckets
  for (let i = 0; i < trades; i++) {
    const u = rand();
    let r: number;
    if (u < 0.42) r = -1 - rand() * 0.4; // full/partial stop-outs
    else if (u < 0.55) r = -0.3 + rand() * 0.25; // scratches
    else if (u < 0.82) r = 1 + rand() * 2; // 1:3R winners
    else if (u < 0.95) r = 3 + rand() * 2; // runners
    else r = 5 + rand() * 4; // tail winners
    const idx = Math.min(12, Math.max(0, Math.floor(r + 3)));
    buckets[idx] += 1;
  }
  return buckets;
}

/** Path for an SVG polyline from values, mapped into a viewBox. */
export function toPath(values: number[], w: number, h: number, pad = 0): string {
  if (values.length === 0) return "";
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const dx = w / (values.length - 1 || 1);
  return values
    .map((v, i) => {
      const x = i * dx;
      const y = pad + (1 - (v - min) / range) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}
