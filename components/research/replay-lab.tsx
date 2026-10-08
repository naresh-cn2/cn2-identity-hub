"use client";

import { useMemo, useState } from "react";
import { candleSeries } from "@/lib/series";
import { PipelineFlow } from "@/components/viz/quant-primitives";

const pipelineStages: Array<{
    name: string;
    role: string;
    detail?: string[];
    color?: "signal" | "faint" | "foreground";
  }> = [
  { name: "RAW DATA", role: "Unmodified exchange capture", detail: ["No transformation", "Full fidelity"], color: "faint" },
  { name: "INGESTION", role: "Boundary validation", detail: ["Schema check", "Range validation"], color: "faint" },
  { name: "NORMALIZATION", role: "Canonical representation", detail: ["Exact decimals", "Nanosecond timestamps"], color: "foreground" },
  { name: "VALIDATION", role: "Integrity gates", detail: ["Continuity check", "Corrupt isolation"], color: "foreground" },
  { name: "QUARANTINE", role: "Failure containment", detail: ["Explicit isolation", "Audit trail"], color: "signal" },
  { name: "REORDER", role: "Causal ordering", detail: ["Deterministic tie-breaking", "Equal-ts resolution"], color: "foreground" },
  { name: "STORAGE", role: "Point-in-time ledger", detail: ["SQLITE WAL", "Sliding watermark"], color: "foreground" },
  { name: "PIT ACCESS", role: "Point-in-time safe reads", detail: ["Watermark enforcement", "No future data"], color: "signal" },
  { name: "DETERMINISTIC REPLAY", role: "Reproducible research", detail: ["Byte-identical output", "Adversarial tested"], color: "signal" },
];

export default function ReplayLab() {
  const [pitSafeMode, setPitSafeMode] = useState(true);
  const [t, setT] = useState(Math.floor(candleSeries(1337, 42, 100).length * 0.55));

  // Base series (same as used in ReplayPreview)
  const series = useMemo(() => candleSeries(1337, 42, 100), []);

  const W = 1000;
  const H = 260;
  const pad = 16;
  const min = Math.min(...series.map((c) => c.l));
  const max = Math.max(...series.map((c) => c.h));
  const range = max - min || 1;
  const y = (p: number) => pad + (1 - (p - min) / range) * (H - pad * 2);
  const bw = W / series.length;

  const visibleAtT = (index: number) => index <= t;

  return (
    <>
      <div className="mb-10">
        <p className="label-mono text-faint">POINT-IN-TIME REPLAY LAB</p>
        <h2 className="display mt-2 text-3xl md:text-5xl">LOOKAHEAD VS POINT-IN-TIME SAFE</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          The signature research instrument. Scrub the timestamp to see the information
          boundary — what was knowable at t, and what only existed after t. This is not
          a simulation; it is the actual infrastructure property demonstrated.
        </p>
      </div>
      
      {/* Mode toggle */}
      <div className="mb-8 flex items-center gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={!pitSafeMode}
            onChange={() => setPitSafeMode(!pitSafeMode)}
            className="w-4 h-4 accent-[var(--signal)]"
          />
          <span className="label-mono text-sm">
            {pitSafeMode ? "POINT-IN-TIME SAFE" : "LOOKAHEAD (NAIVE BACKTEST)"}
          </span>
        </label>
      </div>

      {/* Replay visualization */}
      <div className="border border-line bg-surface p-4 md:p-6">
        <p className="label-mono mb-4 text-faint">
          {pitSafeMode 
            ? "POINT-IN-TIME SAFE VIEW (STRUCTURAL GUARANTEE)" 
            : "LOOKAHEAD VIEW (WHAT NAIVE BACKTESTS SEE)"
          }
        </p>
        <div>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            role="img"
            aria-label={`Point-in-time replay view at index ${t}. Candles up to index ${t} are visible; later candles are ${pitSafeMode ? "future-dated and ghosted" : "fully visible"}.`}
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
              const visible = visibleAtT(i);
              const up = c.c >= c.o;
              const opacity = pitSafeMode && !visible ? 0.14 : 1;
              return (
                <g
                  key={c.t}
                  opacity={opacity}
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
            <span className="label-mono text-foreground">
              VISIBLE AT t: {t + 1} CANDLES
            </span>
            <span className="label-mono text-faint">
              {pitSafeMode 
                ? `FUTURE-DATED: ${series.length - t - 1} CANDLES (GHOSTED)` 
                : `ALL ${series.length} CANDLES VISIBLE`}
            </span>
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
      </div>

      {/* Pipeline visualization */}
      <div className="mt-14">
        <p className="label-mono mb-8 text-faint">9-STAGE PIPELINE — RAW DATA → ANALYTICS</p>
        <PipelineFlow stages={pipelineStages} flowDirection="horizontal" animated={true} />
      </div>
    </>
  );
}