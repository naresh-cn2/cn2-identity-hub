"use client";

import { useState } from "react";
import Link from "next/link";
import type { ArchStep } from "@/data/archive";
import type { ComponentEvidence, ComponentLink } from "@/data/project-worlds";

/**
 * ArchitectureExplorer — the project's component graph, selectable.
 *
 * Every node is a real component of the system; selecting one reveals its
 * role, its parts, and the evidence connected to it (tests, results,
 * limitations, state) — each connection derived from the project's own
 * record, never invented. Keyboard-operable: nodes are buttons, the panel
 * announces changes politely.
 */

const KIND_TONE: Record<ComponentEvidence["kind"], string> = {
  TEST: "border-signal/60 text-signal",
  EVIDENCE: "border-research/60 text-research",
  RESULT: "border-research/60 text-research",
  LIMITATION: "border-line-strong text-faint",
  STATE: "border-line-strong text-muted",
};

export default function ArchitectureExplorer({
  steps,
  links = [],
}: {
  steps: ArchStep[];
  links?: ComponentLink[];
}) {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const linked = links.find((l) => l.component === step?.name)?.items ?? [];

  if (!step) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-12">
      {/* ---- selectable node chain ---- */}
      <div className="relative">
        <div className="dash-rule-v absolute bottom-4 left-[1.15rem] top-4 hidden lg:block" aria-hidden="true" />
        <p className="label-mono mb-4 text-faint">SELECT A COMPONENT</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:gap-2.5">
          {steps.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.name}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(i)}
                className={`wx-node group relative flex items-center gap-3 border px-3 py-3 text-left transition-colors duration-300 ${
                  isActive
                    ? "border-signal bg-signal/10"
                    : "border-line bg-surface hover:border-line-strong"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 shrink-0 rotate-45 transition-colors duration-300 ${
                    isActive ? "bg-signal" : "bg-research group-hover:bg-foreground"
                  }`}
                />
                <span className={`label-mono text-[10px] leading-tight ${isActive ? "text-foreground" : "text-muted group-hover:text-foreground"}`}>
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---- detail panel ---- */}
      <div aria-live="polite">
        <div key={step.name} className="wx-panel corner-ticks border border-line bg-surface p-6 md:p-8">
          <p className="label-mono text-signal">COMPONENT</p>
          <h3 className="display mt-3 text-xl md:text-2xl">{step.name}</h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{step.role}</p>

          {step.detail && step.detail.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {step.detail.map((d) => (
                <li key={d} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-research" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          )}

          {linked.length > 0 && (
            <div className="mt-8 border-t border-line pt-6">
              <p className="label-mono text-faint">CONNECTED IN THIS RECORD</p>
              <ul className="mt-4 space-y-3">
                {linked.map((item) => {
                  const row = (
                    <>
                      <span className={`label-mono shrink-0 border px-2 py-0.5 text-[9px] ${KIND_TONE[item.kind]}`}>
                        {item.kind}
                      </span>
                      <span className="text-sm leading-relaxed text-muted">{item.label}</span>
                      {item.href && (
                        <span aria-hidden="true" className="ml-auto shrink-0 text-signal transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      )}
                    </>
                  );
                  return (
                    <li key={item.label}>
                      {item.href?.startsWith("http") ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 border border-transparent px-1 py-1 transition-colors hover:border-line"
                        >
                          {row}
                        </a>
                      ) : item.href ? (
                        <Link href={item.href} className="group flex items-center gap-3 border border-transparent px-1 py-1 transition-colors hover:border-line">
                          {row}
                        </Link>
                      ) : (
                        <span className="flex items-center gap-3 px-1 py-1">{row}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
