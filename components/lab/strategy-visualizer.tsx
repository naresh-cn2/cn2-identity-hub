"use client";

import { useMemo, useState } from "react";

/**
 * LAB / STRAT-01 — R:R geometry and break-even win rate.
 * Drag entry / stop / target, read the geometry and the win rate required
 * for expectancy to break even under the selected cost rate.
 */
export default function StrategyVisualizer() {
  const [entry, setEntry] = useState(100);
  const [stop, setStop] = useState(96);
  const [target, setTarget] = useState(116);
  const [costPct, setCostPct] = useState(0.1);

  const { risk, reward, rr, breakEven } = useMemo(() => {
    const r = Math.abs(entry - stop) || 0.0001;
    const w = Math.abs(target - entry);
    const ratio = w / r;
    // EV = p*R - (1-p)*1 - cost(in R); p* = (1 + costR) / (R + 1)
    const costR = (2 * costPct * entry) / 100 / r;
    return { risk: r, reward: w, rr: ratio, breakEven: (1 + costR) / (ratio + 1) };
  }, [entry, stop, target, costPct]);

  const W = 1000;
  const H = 300;
  const lo = Math.min(stop, entry, target);
  const hi = Math.max(stop, entry, target);
  const range = hi - lo || 1;
  const y = (p: number) => 24 + (1 - (p - lo) / range) * (H - 48);

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full border border-line bg-surface"
        role="img"
        aria-label={`Trade geometry: entry ${entry}, stop ${stop} risking ${risk.toFixed(2)}, target ${target} rewarding ${reward.toFixed(2)} — reward to risk ${rr.toFixed(2)} to 1.`}
      >
        <title>R:R geometry — entry, stop and target</title>
        {[
          { p: target, label: `TARGET ${target}`, color: "var(--foreground)" },
          { p: entry, label: `ENTRY ${entry}`, color: "var(--chart-axis)" },
          { p: stop, label: `STOP ${stop}`, color: "var(--signal)" },
        ].map((l) => (
          <g key={l.label}>
            <line x1={0} x2={W} y1={y(l.p)} y2={y(l.p)} stroke={l.color} strokeWidth={1.5} />
            <text x={8} y={y(l.p) - 6} className="label-mono" fill={l.color} fontSize={12}>
              {l.label}
            </text>
          </g>
        ))}
        {/* risk / reward bands */}
        <rect
          x={W * 0.55}
          y={Math.min(y(entry), y(stop))}
          width={W * 0.42}
          height={Math.abs(y(entry) - y(stop)) || 1}
          fill="var(--signal-soft)"
        />
        <rect
          x={W * 0.55}
          y={Math.min(y(entry), y(target))}
          width={W * 0.42}
          height={Math.abs(y(entry) - y(target)) || 1}
          fill="var(--grid-line)"
        />
      </svg>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <fieldset className="grid grid-cols-2 gap-6">
          <legend className="label-mono mb-2 text-faint">GEOMETRY INPUTS</legend>
          {(
            [
              ["entry", "ENTRY", entry, setEntry, 1, 400],
              ["stop", "STOP", stop, setStop, 1, 400],
              ["target", "TARGET", target, setTarget, 1, 400],
              ["cost", "COST %", costPct, setCostPct, 0, 1],
            ] as const
          ).map(([key, label, value, set, min, max]) => (
            <div key={key}>
              <div className="flex items-baseline justify-between">
                <label htmlFor={`strat-${key}`} className="label-mono text-foreground">
                  {label}
                </label>
                <span className="num-mono text-sm text-signal">{value}</span>
              </div>
              <input
                id={`strat-${key}`}
                type="range"
                min={min}
                max={max}
                step={key === "cost" ? 0.01 : 0.5}
                value={value}
                onChange={(e) => set(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--signal)]"
              />
            </div>
          ))}
        </fieldset>

        <div aria-live="polite" className="space-y-px bg-line">
          {(
            [
              ["RISK PER UNIT", risk.toFixed(2)],
              ["REWARD PER UNIT", reward.toFixed(2)],
              ["R MULTIPLE", `${rr.toFixed(2)} : 1`],
              ["BREAK-EVEN WIN RATE", `${(breakEven * 100).toFixed(1)}%`],
              ["1:4 STRUCTURAL FLOOR", rr >= 4 ? "PASSES" : "FAILS — BELOW FLOOR"],
            ] as const
          ).map(([label, value]) => (
            <div
              key={label}
              className="flex items-baseline justify-between bg-surface px-5 py-4"
            >
              <span className="label-mono text-muted">{label}</span>
              <span className="num-mono text-lg font-semibold text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
        Break-even win rate is the frequency above which expectancy is positive after modeled
        costs. A 1:4 geometry needs only ~20% winners to break even — which is exactly why the
        pipeline refuses setups below it.
      </p>
    </div>
  );
}
