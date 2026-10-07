import { mulberry32 } from "./series";

/** Deterministic value-noise height field over [-1,1]², output 0..1. */
export function makeField(seed: number, n = 16) {
  const rand = mulberry32(seed);
  const lattice = new Float64Array((n + 1) * (n + 1));
  for (let i = 0; i < lattice.length; i++) lattice[i] = rand();

  const smooth = (t: number) => t * t * (3 - 2 * t);
  const sample = (x: number, y: number) => {
    const fx = ((x + 1) / 2) * (n - 1);
    const fy = ((y + 1) / 2) * (n - 1);
    const i = Math.min(n - 1, Math.max(0, Math.floor(fx)));
    const j = Math.min(n - 1, Math.max(0, Math.floor(fy)));
    const tx = smooth(fx - i);
    const ty = smooth(fy - j);
    const a = lattice[j * (n + 1) + i];
    const b = lattice[j * (n + 1) + i + 1];
    const c = lattice[(j + 1) * (n + 1) + i];
    const d = lattice[(j + 1) * (n + 1) + i + 1];
    return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty;
  };

  return (x: number, y: number) => 0.65 * sample(x, y) + 0.35 * sample(x * 2.3 + 5, y * 2.3 + 5);
}

export interface Camera {
  rotY: number;
  rotX: number;
  scale: number;
  perspective: number;
  cx: number;
  cy: number;
}

export function project(x: number, y: number, z: number, cam: Camera) {
  const cosY = Math.cos(cam.rotY);
  const sinY = Math.sin(cam.rotY);
  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;
  const cosX = Math.cos(cam.rotX);
  const sinX = Math.sin(cam.rotX);
  const y1 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;
  const depth = cam.perspective / (cam.perspective + z2);
  return { sx: cam.cx + x1 * cam.scale * depth, sy: cam.cy - y1 * cam.scale * depth, depth };
}

/** Analytic illustrative surface for the lab: performance as a function of volatility and R:R. */
export function performanceSurface(vol: number, rr: number): number {
  const v = (vol + 1) / 2; // 0..1
  const r = (rr + 1) / 2;
  const rrTerm = Math.pow(r, 0.7);
  const volPenalty = Math.pow(v, 1.6) * 0.85;
  const ridge = Math.exp(-Math.pow((v - 0.35) / 0.22, 2)) * 0.18;
  return Math.max(0, Math.min(1, rrTerm * (1 - volPenalty) + ridge));
}
