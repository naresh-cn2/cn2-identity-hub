"use client";

import { useMemo, useState } from "react";

/**
 * LAB / SURF-01 — risk / return surface.
 * A projected-3D wireframe baked in 2D SVG (no WebGL dependency):
 * X = volatility, Y = reward:risk, Z = a deterministic performance heuristic.
 * Drag to rotate; all geometry is computed per render from the formula.
 */
export default function RiskSurface() {
  const [yaw, setYaw] = useState(0.6);
  const [pitch, setPitch] = useState(0.45);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [hover, setHover] = useState<{ vol: number; rr: number; z: number } | null>(null);

  const N = 16;
  const W = 1000;
  const H = 560;

  const { lines, cells } = useMemo(() => {
    const cols: number[][] = [];
    for (let i = 0; i < N; i++) {
      const vol = i / (N - 1); // 0..1 volatility
      const row: number[] = [];
      for (let j = 0; j < N; j++) {
        const rr = j / (N - 1); // 0..1 R:R axis
        // deterministic surface: performance rises with R:R, decays with vol^2, clipped at 0
        const z = Math.max(0, 0.15 + rr * 0.9 - vol * vol * 0.8 + Math.sin(rr * 6 + vol * 4) * 0.06);
        row.push(z);
      }
      cols.push(row);
    }

    const project = (i: number, j: number) => {
      const x = i / (N - 1) - 0.5;
      const y = j / (N - 1) - 0.5;
      const z = cols[i][j];
      // yaw around Z(up), then pitch
      const x1 = x * Math.cos(yaw) - y * Math.sin(yaw);
      const y1 = x * Math.sin(yaw) + y * Math.cos(yaw);
      const y2 = y1 * Math.cos(pitch) - z * Math.sin(pitch);
      const z2 = y1 * Math.sin(pitch) + z * Math.cos(pitch);
      const scale = 420 / (1 + z2 * 0.9);
      return {
        px: W / 2 + x1 * scale,
        py: H / 2 - y2 * scale,
        z: cols[i][j],
      };
    };

    const lines: [number, number, number, number][] = [];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (i + 1 < N) {
          const a = project(i, j);
          const b = project(i + 1, j);
          lines.push([a.px, a.py, b.px, b.py]);
        }
        if (j + 1 < N) {
          const a = project(i, j);
          const b = project(i, j + 1);
          lines.push([a.px, a.py, b.px, b.py]);
        }
      }
    }
    const cells = cols.flatMap((row, i) =>
      row.map((z, j) => ({ i, j, ...project(i, j) }))
    );
    return { lines, cells };
  }, [yaw, pitch, N]);

  const onPointerDown = (e: React.PointerEvent) => {
    setDrag({ x: e.clientX, y: e.clientY });
  };
  const onPointerMove = (e: React.PointerEvent) => {
    setHover(null);
    if (!drag) return;
    setYaw((y2) => y2 + (e.clientX - drag.x) * 0.008);
    setPitch((p) => Math.min(1.4, Math.max(0.1, p + (e.clientY - drag.y) * 0.006)));
    setDrag({ x: e.clientX, y: e.clientY });
  };
  const onPointerUp = () => setDrag(null);

  const nearest = (e: React.PointerEvent<SVGSVGElement>) => {
    if (drag) return;
    const svg = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - svg.left) / svg.width) * W;
    const y = ((e.clientY - svg.top) / svg.height) * H;
    let best = cells[0];
    let bestD = Infinity;
    for (const c of cells) {
      const d = (c.px - x) ** 2 + (c.py - y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
    if (bestD < 1600) {
      setHover({
        vol: best.i / (N - 1),
        rr: best.j / (N - 1),
        z: best.z,
      });
    } else {
      setHover(null);
    }
  };

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full cursor-grab touch-none border border-line bg-background active:cursor-grabbing"
        role="img"
        aria-label="Interactive projected 3D surface. Horizontal axes are volatility and reward-to-risk; height is a deterministic performance heuristic. Drag to rotate."
        onPointerDown={onPointerDown}
        onPointerMove={(e) => {
          onPointerMove(e);
          nearest(e);
        }}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <title>Risk / return surface — drag to rotate</title>
        {lines.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--chart-axis)" strokeWidth={0.7} />
        ))}
        {/* highlight highest band */}
        {cells
          .filter((c) => c.z > 0.85)
          .map((c) => (
            <circle key={`${c.i}-${c.j}`} cx={c.px} cy={c.py} r={2} fill="var(--signal)" />
          ))}
        {hover && (
          <g>
            {(() => {
              const c = cells.find((cc) => cc.i / (N - 1) === hover.vol && cc.j / (N - 1) === hover.rr);
              if (!c) return null;
              return (
                <>
                  <circle cx={c.px} cy={c.py} r={5} fill="var(--signal)" />
                  <text x={c.px + 10} y={c.py - 8} className="num-mono" fill="var(--foreground)" fontSize={13}>
                    VOL {hover.vol.toFixed(2)} · R:R {hover.rr.toFixed(2)} · Z {hover.z.toFixed(2)}
                  </text>
                </>
              );
            })()}
          </g>
        )}
      </svg>
      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
        <p className="label-mono text-faint">X — VOLATILITY</p>
        <p className="label-mono text-faint">Y — REWARD:RISK</p>
        <p className="label-mono text-faint">Z — PERFORMANCE HEURISTIC</p>
        <p className="label-mono text-signal">DRAG TO ROTATE · HOVER FOR READOUT</p>
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        The surface is a deterministic analytic heuristic, not backtest output: performance rises
        with R-multiple structure and decays with volatility squared. High-Z nodes (red) cluster at
        high R:R and low volatility — the region where a structural pipeline concentrates.
      </p>
    </div>
  );
}
