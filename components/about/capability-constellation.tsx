"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { capabilities } from "@/data/about";
import type { CapStatus } from "@/data/about";

/* Capability map: QUANTITATIVE DEVELOPER at the center, seven
   disciplines in a staggered constellation. Selecting a node reveals
   what the capability means, the problems it addresses, its honest
   status, and links to real supporting work. */

const statusCls: Record<CapStatus, string> = {
  DEMONSTRATED: "border-signal/50 text-signal",
  "IN ACTIVE DEVELOPMENT": "border-line-strong text-research",
  "RESEARCH DIRECTION": "border-line-strong text-faint",
};

function ringPos(i: number) {
  // staggered radius gives the ring a constellation feel
  const a = ((-90 + (360 / capabilities.length) * i) * Math.PI) / 180;
  const r = i % 2 === 0 ? 41 : 33;
  return { x: 50 + Math.cos(a) * r, y: 50 + Math.sin(a) * r };
}

export default function CapabilityConstellation() {
  const [sel, setSel] = useState(0);
  const cap = capabilities[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_21rem] lg:items-center lg:gap-14">
      <div>
        {/* constellation (md+) */}
        <div className="relative mx-auto hidden aspect-[10/9] w-full max-w-[34rem] md:block">
          <svg
            viewBox="0 0 100 90"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            {capabilities.map((c, i) => {
              const p = ringPos(i);
              return (
                <line
                  key={c.id}
                  x1={50}
                  y1={45}
                  x2={p.x}
                  y2={p.y * 0.9}
                  className={
                    i === sel
                      ? "stroke-signal cn2-dash transition-all duration-500"
                      : "stroke-line transition-all duration-500"
                  }
                  strokeWidth={i === sel ? 0.5 : 0.25}
                />
              );
            })}
          </svg>

          <div
            className="absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/40 bg-surface px-4 py-4 text-center"
            aria-hidden="true"
          >
            <span className="label-mono text-[10px] leading-relaxed text-foreground">
              QUANTITATIVE
              <br />
              DEVELOPER
            </span>
          </div>

          {capabilities.map((c, i) => {
            const p = ringPos(i);
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={i === sel}
                onClick={() => setSel(i)}
                style={{ left: `${p.x}%`, top: `${p.y * 0.9}%` }}
                className={`label-mono absolute max-w-[9.5rem] -translate-x-1/2 -translate-y-1/2 border px-3 py-2 text-left text-[9px] leading-tight transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${
                  i === sel
                    ? "border-signal bg-signal text-white"
                    : "border-line-strong bg-surface text-muted hover:border-signal/60 hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* vertical list (mobile) */}
        <div className="grid gap-2 md:hidden">
          {capabilities.map((c, i) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={i === sel}
              onClick={() => setSel(i)}
              className={`label-mono border px-4 py-3 text-left text-[10px] transition-colors ${
                i === sel
                  ? "border-signal bg-signal text-white"
                  : "border-line-strong bg-surface text-muted"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* evidence panel */}
      <div
        aria-live="polite"
        className="corner-ticks border border-line bg-surface p-7"
      >
        <p className="label-mono text-[10px] text-faint">CAPABILITY</p>
        <h3 className="display mt-3 text-xl">{cap.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted">{cap.purpose}</p>

        <p className="label-mono mt-7 text-[10px] text-faint">PROBLEMS IT ADDRESSES</p>
        <ul className="mt-3 grid gap-2">
          {cap.problems.map((p) => (
            <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-2 h-px w-3 shrink-0 bg-signal" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex items-center justify-between gap-3 border-t border-line pt-5">
          <span className={`label-mono border px-2.5 py-1.5 text-[9px] ${statusCls[cap.status]}`}>
            {cap.status}
          </span>
          {cap.evidence.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="link-line label-mono inline-flex items-center gap-1.5 text-[10px] text-foreground transition-colors hover:text-signal"
            >
              {e.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>

        {cap.work ? (
          <p className="label-mono mt-4 text-[9px] leading-relaxed text-faint">{cap.work}</p>
        ) : null}
      </div>
    </div>
  );
}
