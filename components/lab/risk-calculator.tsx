"use client";

import { useMemo, useState } from "react";

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
 * Size derives from stop distance and the risk cap; costs are charged on
 * both legs (entry + worst-case exit). All arithmetic is explicit.
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
    };
  }, [inputs]);

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* inputs */}
      <fieldset>
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

      {/* outputs */}
      <div aria-live="polite">
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
  );
}
