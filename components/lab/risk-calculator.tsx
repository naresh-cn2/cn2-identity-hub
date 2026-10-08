"use client";

import { useMemo, useState, useRef, useEffect } from "react";

interface Field {
  key: keyof Inputs;
  label: string;
  min: number;
  max: number;
  step: number;
}

interface Inputs {
  capital: number;
  riskPct: number;
  entry: number;
  stop: number;
  target: number;
  feePct: number;
  slippagePct: number;
}

const FIELDS: Field[] = [
  { key: "capital", label: "CAPITAL", min: 100, max: 1_000_000, step: 100 },
  { key: "riskPct", label: "RISK %", min: 0.1, max: 5, step: 0.1 },
  { key: "entry", label: "ENTRY", min: 1, max: 200_000, step: 1 },
  { key: "stop", label: "STOP", min: 1, max: 200_000, step: 1 },
  { key: "target", label: "TARGET", min: 1, max: 400_000, step: 1 },
  { key: "feePct", label: "FEES %", min: 0, max: 1, step: 0.01 },
  { key: "slippagePct", label: "SLIPPAGE %", min: 0, max: 1, step: 0.01 },
];

const num = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

/**
 * LAB / RISK-01 — risk-first position sizing.
 * Terminal-style instrument with live geometry visualization.
 */
export default function RiskCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    capital: 100_000,
    riskPct: 1,
    entry: 50_000,
    stop: 48_500,
    target: 56_000,
    feePct: 0.05,
    slippagePct: 0.05,
  });

  const out = useMemo(() => {
    const stopDistance = Math.abs(inputs.entry - inputs.stop);
    if (stopDistance === 0) {
      return { valid: false as const };
    }
    const capitalAtRisk = inputs.capital * (inputs.riskPct / 100);
    const units = capitalAtRisk / stopDistance;
    const notional = units * inputs.entry;
    const costRate = (inputs.feePct + inputs.slippagePct) / 100;
    const cost = 2 * notional * costRate; // entry leg + exit leg
    const reward = Math.abs(inputs.target - inputs.entry);
    const rr = reward / stopDistance;
    const netRisk = capitalAtRisk + cost;
    const netRiskPct = (netRisk / inputs.capital) * 100;
    return {
      valid: true as const,
      stopDistance,
      capitalAtRisk,
      units,
      notional,
      cost,
      rr,
      netRisk,
      netRiskPct,
      meetsFloor: rr >= 4,
      riskRegion: stopDistance,
      rewardRegion: reward,
    };
  }, [inputs]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
      {/* inputs */}
      <fieldset className="border border-line bg-surface p-6">
        <legend className="label-mono mb-6 text-faint">INPUTS</legend>
        <div className="space-y-6">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <div className="flex items-baseline justify-between">
                <label htmlFor={`risk-${f.key}`} className="label-mono text-foreground">
                  {f.label}
                </label>
                <span className="num-mono text-sm text-signal">{num.format(inputs[f.key])}</span>
              </div>
              <input
                id={`risk-${f.key}`}
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={inputs[f.key]}
                onChange={(e) =>
                  setInputs((s) => ({ ...s, [f.key]: Number(e.target.value) }))
                }
                className="mt-3 w-full accent-[var(--signal)]"
              />
            </div>
          ))}
        </div>
      </fieldset>

      {/* outputs + geometry visualization */}
      <div className="flex flex-col gap-6">
        <div className="border border-line bg-surface p-6 flex-1">
          <p className="label-mono mb-6 text-faint">R:R GEOMETRY</p>
          <div className="h-64 w-full relative">
            <RiskGeometry
              entry={inputs.entry}
              stop={inputs.stop}
              target={inputs.target}
              valid={out.valid}
              rr={out.valid ? out.rr : 0}
              riskDistance={out.valid ? out.stopDistance : 0}
              rewardDistance={out.valid ? Math.abs(inputs.target - inputs.entry) : 0}
            />
          </div>
        </div>

        <div className="border border-line bg-surface p-6">
          <p className="label-mono mb-6 text-faint">OUTPUTS</p>
          {!out.valid ? (
            <div className="border border-signal bg-surface p-6">
              <p className="label-mono text-signal">INVALID — STOP EQUALS ENTRY</p>
              <p className="mt-3 text-sm text-muted">
                A trade with zero stop distance has undefined position size. In a structural pipeline
                this setup is rejected at admission.
              </p>
            </div>
          ) : (
            <div className="space-y-px bg-line">
              {(
                [
                  ["POSITION SIZE", `${num.format(out.units)} units (${num.format(out.notional)} notional)`],
                  ["CAPITAL AT RISK", num.format(out.capitalAtRisk)],
                  ["R:R", `${out.rr.toFixed(2)} : 1`],
                  ["COST (ROUND TRIP)", num.format(out.cost)],
                  ["NET RISK", `${num.format(out.netRisk)} (${out.netRiskPct.toFixed(2)}% of capital)`],
                ] as const
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-wrap items-baseline justify-between gap-2 bg-surface px-5 py-4"
                >
                  <span className="label-mono text-muted">{label}</span>
                  <span className="num-mono text-lg font-semibold text-foreground">{value}</span>
                </div>
              ))}
              <div
                className={`flex items-baseline justify-between px-5 py-4 ${
                  out.meetsFloor ? "bg-surface" : "bg-signal text-white"
                }`}
              >
                <span className="label-mono">STRUCTURAL FLOOR — 1:4 R:R</span>
                <span className="label-mono">{out.meetsFloor ? "PASSES" : "REJECTED AT ADMISSION"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RiskGeometry({
  entry,
  stop,
  target,
  valid,
  rr,
  riskDistance,
  rewardDistance,
}: {
  entry: number;
  stop: number;
  target: number;
  valid: boolean;
  rr: number;
  riskDistance: number;
  rewardDistance: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const width = rect.width;
      const height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      if (!valid) return;

      const min = Math.min(stop, entry, target);
      const max = Math.max(stop, entry, target);
      const range = max - min || 1;
      const pad = 30;
      const plotH = height - pad * 2;
      const plotW = width - pad * 2;

      const y = (price: number) => pad + (1 - (price - min) / range) * plotH;
      const x = (ratio: number) => pad + ratio * plotW;

      // Grid
      ctx.strokeStyle = "var(--chart-grid)";
      ctx.lineWidth = 0.5;
      for (let i = 1; i < 4; i++) {
        const yy = pad + (plotH * i) / 4;
        ctx.beginPath();
        ctx.moveTo(pad, yy);
        ctx.lineTo(width - pad, yy);
        ctx.stroke();
      }

      // Levels
      const levels = [
        { price: target, label: `TARGET ${target}`, color: "var(--foreground)", dash: [] },
        { price: entry, label: `ENTRY ${entry}`, color: "var(--chart-axis)", dash: [] },
        { price: stop, label: `STOP ${stop}`, color: "var(--signal)", dash: [8, 4] },
      ];

      levels.forEach((l) => {
        const yy = y(l.price);
        ctx.beginPath();
        ctx.moveTo(pad, yy);
        ctx.lineTo(width - pad, yy);
        ctx.strokeStyle = l.color;
        ctx.lineWidth = l.dash.length ? 1.5 : 2;
        if (l.dash.length) ctx.setLineDash(l.dash);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = l.color;
        ctx.font = "11px 'IBM Plex Mono', monospace";
        ctx.textAlign = "left";
        ctx.fillText(l.label, pad + 8, yy - 8);
      });

      // Risk band
      const stopY = y(stop);
      const entryY = y(entry);
      const targetY = y(target);

      ctx.beginPath();
      ctx.moveTo(x(0.15), Math.min(entryY, stopY));
      ctx.lineTo(x(0.85), Math.min(entryY, stopY));
      ctx.lineTo(x(0.85), Math.max(entryY, stopY));
      ctx.lineTo(x(0.15), Math.max(entryY, stopY));
      ctx.closePath();
      ctx.fillStyle = "var(--signal-soft)";
      ctx.fill();

      // Reward band
      ctx.beginPath();
      ctx.moveTo(x(0.15), Math.min(entryY, targetY));
      ctx.lineTo(x(0.85), Math.min(entryY, targetY));
      ctx.lineTo(x(0.85), Math.max(entryY, targetY));
      ctx.lineTo(x(0.15), Math.max(entryY, targetY));
      ctx.closePath();
      ctx.fillStyle = "var(--grid-line)";
      ctx.fill();

      // Labels
      ctx.font = "10px 'IBM Plex Mono', monospace";
      ctx.fillStyle = "var(--signal)";
      ctx.textAlign = "left";
      ctx.fillText(`RISK ${riskDistance.toFixed(2)}`, x(0.15) + 8, (entryY + stopY) / 2 + 4);
      ctx.fillStyle = "var(--foreground)";
      ctx.fillText(`REWARD ${rewardDistance.toFixed(2)}`, x(0.15) + 8, (entryY + targetY) / 2 + 4);
      ctx.fillStyle = "var(--faint)";
      ctx.textAlign = "right";
      ctx.fillText(`R:R ${rr.toFixed(2)} : 1`, x(0.85) - 8, (entryY + targetY) / 2 - 4);
    };

    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    draw();

    return () => ro.disconnect();
  }, [entry, stop, target, valid, rr, riskDistance, rewardDistance, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="w-full h-full"
    />
  );
}