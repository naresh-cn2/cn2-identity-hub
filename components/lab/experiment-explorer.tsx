"use client";

import { useState } from "react";
import { getProject } from "@/data/projects";
import Reveal from "@/components/ui/reveal";

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
 */
export default function ExperimentExplorer() {
  const qrsip = getProject("qrsip")!;
  const [gates, setGates] = useState<Record<GateId, boolean>>({
    verified: false,
    reproducible: false,
    limitations: false,
    ci: false,
  });
  const passed = GATES.every((g) => gates[g.id]);
  const passCount = GATES.filter((g) => gates[g.id]).length;

  return (
    <div className="space-y-14">
      {/* workflow */}
      <div>
        <p className="label-mono mb-6 text-faint">GOVERNANCE WORKFLOW — HYPOTHESIS → PROMOTION</p>
        <ol className="grid gap-px bg-line md:grid-cols-6">
          {qrsip.dataFlow.map((step, i) => (
            <Reveal key={i} delay={i * 90}>
              <li className="flex h-full flex-col bg-surface p-4">
                <span className="num-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                <span className="label-mono mt-3 text-foreground">{step.split(" ")[0]}</span>
                <span className="mt-2 text-xs leading-relaxed text-muted">{step}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* experiments */}
      <div>
        <p className="label-mono mb-6 text-faint">EXPERIMENT RECORDS</p>
        <div className="space-y-px bg-line">
          {qrsip.experiments.map((exp) => (
            <div key={exp.title} className="flex flex-wrap items-baseline gap-x-6 gap-y-2 bg-surface p-5">
              <span className="display text-lg md:text-xl">{exp.title}</span>
              <span className="text-sm text-muted">{exp.result}</span>
              <span
                className={`label-mono ml-auto ${exp.status === "COMPLETED" ? "text-foreground" : "text-signal"}`}
              >
                {exp.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* promotion decision simulator */}
      <div>
        <p className="label-mono mb-6 text-faint">PROMOTION DECISION SIMULATOR</p>
        <div className="grid gap-10 lg:grid-cols-2">
          <fieldset>
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
          <div
            aria-live="polite"
            className={`corner-ticks flex flex-col justify-center border p-8 ${
              passed ? "border-line bg-surface" : "border-line bg-surface"
            }`}
          >
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
  );
}
