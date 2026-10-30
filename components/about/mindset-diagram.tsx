"use client";

import { useState } from "react";
import { mindset } from "@/data/about";

/* Radial system diagram: THE PROBLEM at the center, five investigative
   moves around it. Selecting a node illuminates its connection and
   reveals its explanation. Stacks to a vertical list on mobile. */

const R = 37; // ring radius, percent of the square

function ringPos(i: number) {
  const a = ((-90 + (360 / mindset.nodes.length) * i) * Math.PI) / 180;
  return { x: 50 + Math.cos(a) * R, y: 50 + Math.sin(a) * R };
}

export default function MindsetDiagram() {
  const [sel, setSel] = useState(0);
  const node = mindset.nodes[sel];

  return (
    <div>
      {/* radial diagram (md+) */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[28rem] md:block">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {mindset.nodes.map((n, i) => {
            const p = ringPos(i);
            return (
              <line
                key={n.id}
                x1={50}
                y1={50}
                x2={p.x}
                y2={p.y}
                className={
                  i === sel
                    ? "stroke-signal cn2-dash transition-all duration-500"
                    : "stroke-line transition-all duration-500"
                }
                strokeWidth={i === sel ? 0.6 : 0.3}
              />
            );
          })}
        </svg>

        {/* center node */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-strong bg-surface px-5 py-3 text-center"
          aria-hidden="true"
        >
          <span className="label-mono text-[10px] text-foreground">{mindset.center}</span>
        </div>

        {mindset.nodes.map((n, i) => {
          const p = ringPos(i);
          return (
            <button
              key={n.id}
              type="button"
              aria-pressed={i === sel}
              onClick={() => setSel(i)}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className={`label-mono absolute -translate-x-1/2 -translate-y-1/2 border px-3.5 py-2 text-[10px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${
                i === sel
                  ? "border-signal bg-signal text-white"
                  : "border-line-strong bg-surface text-muted hover:border-signal/60 hover:text-foreground"
              }`}
            >
              {n.label}
            </button>
          );
        })}
      </div>

      {/* vertical list (mobile) */}
      <div className="grid gap-2 md:hidden">
        {mindset.nodes.map((n, i) => (
          <button
            key={n.id}
            type="button"
            aria-pressed={i === sel}
            onClick={() => setSel(i)}
            className={`label-mono border px-4 py-3 text-left text-[10px] transition-colors ${
              i === sel
                ? "border-signal bg-signal text-white"
                : "border-line-strong bg-surface text-muted"
            }`}
          >
            {n.label}
          </button>
        ))}
      </div>

      {/* explanation panel */}
      <div
        aria-live="polite"
        className="mt-6 border-l-2 border-signal pl-5 md:mt-8"
      >
        <p className="text-base leading-relaxed text-foreground">{node.line}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{node.body}</p>
      </div>
    </div>
  );
}
