"use client";

import { useState } from "react";
import { candleSeries } from "@/lib/series";

/**
 * POINT-IN-TIME REPLAY PREVIEW
 * A deterministic synthetic candle series. A scrubber selects timestamp t:
 * candles at or before t render as "visible at t"; candles after t render
 * ghosted as "future-dated" — making the lookahead boundary tactile.
 */
export default function ReplayPreview() {
  const series = candleSeries(1337, 42, 100);
  const [t, setT] = useState(Math.floor(series.length * 0.55));

  const W = 1000;
  const H = 260;
  const pad = 16;
  const min = Math.min(...series.map((c) => c.l));
  const max = Math.max(...series.map((c) => c.h));
  const range = max - min || 1;
  const y = (p: number) => pad + (1 - (p - min) / range) * (H - pad * 2);
  const bw = W / series.length;

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Point-in-time replay view at index ${t}. Candles up to index ${t} are visible; later candles are future-dated and ghosted.`}
      >
        <title>Point-in-time replay — information boundary at t = {t}</title>
        {/* boundary line */}
        <line
          x1={(t + 0.5) * bw}
          x2={(t + 0.5) * bw}
          y1={0}
          y2={H}
          stroke="var(--signal)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />
        {series.map((c, i) => {
          const visibleAtT = i <= t;
          const up = c.c >= c.o;
          return (
            <g
              key={c.t}
              opacity={visibleAtT ? 1 : 0.14}
              fill={up ? "var(--foreground)" : "var(--chart-axis)"}
              stroke={up ? "var(--foreground)" : "var(--chart-axis)"}
            >
              <line x1={i * bw + bw / 2} x2={i * bw + bw / 2} y1={y(c.h)} y2={y(c.l)} strokeWidth={1} />
              <rect
                x={i * bw + bw * 0.25}
                y={y(Math.max(c.o, c.c))}
                width={bw * 0.5}
                height={Math.max(1.5, Math.abs(y(c.o) - y(c.c)))}
                strokeWidth={0}
              />
            </g>
          );
        })}
      </svg>

      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
        <label htmlFor="pit-t" className="label-mono text-muted">
          TIMESTAMP t — <span className="num-mono text-signal">{t}</span>
        </label>
        <span className="label-mono text-foreground">VISIBLE AT t: {t + 1} CANDLES</span>
        <span className="label-mono text-faint">FUTURE-DATED: {series.length - t - 1} CANDLES</span>
      </div>
      <input
        id="pit-t"
        type="range"
        min={0}
        max={series.length - 1}
        value={t}
        onChange={(e) => setT(Number(e.target.value))}
        className="mt-4 w-full accent-[var(--signal)]"
        aria-describedby="pit-note"
      />
      <p id="pit-note" className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        A query at <span className="num-mono text-foreground">t</span> can only read the solid
        candles. The ghosted region is information that did not yet exist — in a naive backtest it
        silently leaks in (lookahead); in point-in-time infrastructure it is structurally
        unreachable. Series is deterministic and synthetic.
      </p>
    </div>
  );
}
