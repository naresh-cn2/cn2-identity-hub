"use client";

import { useState } from "react";
import Link from "next/link";
import { getProject } from "@/data/projects";

const GATES = [
  { id: "verified", label: "VERIFIED EVIDENCE", hint: "Artifacts verified against deterministic fixtures" },
  { id: "reproducible", label: "REPRODUCIBLE RUN", hint: "Byte-identical regeneration from raw inputs" },
  { id: "limitations", label: "LIMITATIONS DOCUMENTED", hint: "Known failure modes written down, not implied" },
  { id: "ci", label: "CI / SECURITY PASS", hint: "Suite green — 352 tests on deterministic fixtures" },
] as const;

type GateId = (typeof GATES)[number]["id"];

/**
 * LAB / EXP-01 — walk an experiment through the QRSIP governance workflow
 * and let the promotion gate decide. The gate is structural, not advisory.
 * Every stage, experiment and gate shown here is real project data.
 */
export default function ExperimentExplorer() {
  const qrsip = getProject("qrsip")!;
  const stages = qrsip.architecture;
  const [stage, setStage] = useState(0);
  const [openExp, setOpenExp] = useState<number | null>(null);
  const [gates, setGates] = useState<Record<GateId, boolean>>({
    verified: false,
    reproducible: false,
    limitations: false,
    ci: false,
  });
  const passed = GATES.every((g) => gates[g.id]);
  const passCount = GATES.filter((g) => gates[g.id]).length;
  const active = stages[stage];

  return (
    <div className="space-y-14">
      {/* interactive governance workflow */}
      <div>
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
          <p className="label-mono text-faint">GOVERNANCE WORKFLOW — HYPOTHESIS → PROMOTION</p>
          <p className="label-mono text-faint">SELECT A STAGE TO INSPECT</p>
        </div>
        <ol className="grid gap-px bg-line md:grid-cols-3 lg:grid-cols-6">
          {stages.map((s, i) => (
            <li key={s.name} className="bg-surface">
              <button
                type="button"
                onClick={() => setStage(i)}
                aria-pressed={stage === i}
                className={`flex h-full w-full flex-col items-start p-4 text-left transition-colors ${
                  stage === i ? "bg-surface-2" : "hover:bg-surface-2"
                }`}
              >
                <span className={`num-mono text-xs ${stage === i ? "text-signal" : "text-faint"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`label-mono mt-3 ${stage === i ? "text-foreground" : "text-muted"}`}>
                  {s.name}
                </span>
                <span className="mt-2 text-xs leading-relaxed text-muted">{s.role}</span>
                {stage === i && (
                  <span className="mt-3 h-1 w-8 bg-signal" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ol>

        <div aria-live="polite" className="viz-frame mt-6 p-5 md:p-8">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
              <p className="label-mono text-foreground">
                STAGE <span className="num-mono text-signal">{String(stage + 1).padStart(2, "0")}</span>{" "}
                — {active.name}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStage((s) => Math.max(0, s - 1))}
                  disabled={stage === 0}
                  aria-label="Previous workflow stage"
                  className="label-mono border border-line px-4 py-2 text-muted transition-colors hover:border-line-strong hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ◀ PREV
                </button>
                <button
                  type="button"
                  onClick={() => setStage((s) => Math.min(stages.length - 1, s + 1))}
                  disabled={stage === stages.length - 1}
                  aria-label="Next workflow stage"
                  className="label-mono border border-line px-4 py-2 text-muted transition-colors hover:border-line-strong hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  NEXT ▶
                </button>
              </div>
            </div>
            <ul className="mt-5 space-y-3">
              {(active.detail ?? []).map((d) => (
                <li key={d} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-research" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-foreground">
              {qrsip.dataFlow[stage]}
            </p>
          </div>
        </div>
      </div>

      {/* experiment records — expandable, real questions and results */}
      <div>
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
          <p className="label-mono text-faint">EXPERIMENT RECORDS</p>
          <p className="label-mono text-faint">EXPAND A RECORD FOR ITS REGISTERED QUESTION</p>
        </div>
        <div className="space-y-px bg-line">
          {qrsip.experiments.map((exp, i) => {
            const open = openExp === i;
            return (
              <div key={exp.title} className="bg-surface">
                <button
                  type="button"
                  onClick={() => setOpenExp(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`exp-detail-${i}`}
                  className="flex w-full flex-wrap items-baseline gap-x-6 gap-y-2 p-5 text-left transition-colors hover:bg-surface-2"
                >
                  <span className="display text-lg md:text-xl">{exp.title}</span>
                  <span
                    className={`label-mono border px-2 py-1 text-[10px] ${
                      exp.status === "COMPLETED" ? "border-line text-muted" : "border-signal text-signal"
                    }`}
                  >
                    {exp.status}
                  </span>
                  <span className="num-mono ml-auto text-sm text-faint" aria-hidden="true">
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <div id={`exp-detail-${i}`} className="border-t border-line px-5 pb-5 pt-4">
                    <p className="label-mono text-[10px] text-signal">REGISTERED QUESTION</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">{exp.question}</p>
                    <p className="label-mono mt-4 text-[10px] text-research">RESULT</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{exp.result}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={qrsip.github}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono border border-line-strong px-5 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
          >
            SOURCE REPOSITORY ↗
          </a>
          <Link
            href={`/builds/${qrsip.id}`}
            className="label-mono border border-line px-5 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
          >
            OPEN THE QRSIP BUILD →
          </Link>
        </div>
      </div>

      {/* promotion decision simulator */}
      <div>
        <p className="label-mono mb-6 text-faint">PROMOTION DECISION SIMULATOR</p>
        <div className="grid gap-10 lg:grid-cols-2">
          <fieldset className="card-depth border border-line bg-surface p-6">
            <legend className="sr-only">Promotion gates</legend>
            <div className="space-y-px bg-line">
              {GATES.map((g) => (
                <label
                  key={g.id}
                  htmlFor={`gate-${g.id}`}
                  className="flex cursor-pointer items-start gap-4 bg-surface p-5 transition-colors hover:bg-surface-2"
                >
                  <input
                    id={`gate-${g.id}`}
                    type="checkbox"
                    checked={gates[g.id]}
                    onChange={(e) => setGates((s) => ({ ...s, [g.id]: e.target.checked }))}
                    className="mt-1 h-4 w-4 accent-[var(--signal)]"
                  />
                  <span>
                    <span className="label-mono block text-foreground">{g.label}</span>
                    <span className="mt-1 block text-sm text-muted">{g.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div aria-live="polite" className="viz-frame flex flex-col justify-center p-8">
            <div className="relative z-10">
              <p className="label-mono text-faint">GATE VERDICT</p>
              <p className="display mt-4 text-4xl md:text-5xl">
                {passed ? "PROMOTED" : "HELD IN RESEARCH"}
              </p>
              <p className="num-mono mt-4 text-signal">{passCount} / {GATES.length} GATES CLOSED</p>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                {passed
                  ? "All evidence gates are closed. The strategy may be considered for deployment review — governance proves process integrity, not edge."
                  : "One or more gates are open. The gate's refusal to bend is the feature being purchased: no rhetoric passes a structural control."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
