"use client";

import { useState } from "react";
import { visionEdges, visionLayout, visionNodes } from "@/data/about";

/* The long-term direction as a slowly breathing web of connected
   disciplines. Selecting a node shows what it means; the closing note
   keeps the ambition honest — a direction being developed, not a
   finished platform. */

export default function VisionNetwork() {
  const [sel, setSel] = useState(0);
  const node = visionNodes[sel];

  return (
    <div>
      {/* constellation web (md+) */}
      <div className="relative mx-auto hidden h-[22rem] w-full max-w-[60rem] md:block">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {visionEdges.map(([a, b]) => {
            const pa = visionLayout[a];
            const pb = visionLayout[b];
            const active =
              visionNodes[sel].id === a || visionNodes[sel].id === b;
            return (
              <line
                key={`${a}-${b}`}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                className={
                  active
                    ? "stroke-signal/70 cn2-dash transition-all duration-500"
                    : "stroke-line transition-all duration-500"
                }
                strokeWidth={active ? 0.4 : 0.2}
              />
            );
          })}
        </svg>

        {visionNodes.map((n, i) => {
          const p = visionLayout[n.id];
          return (
            <button
              key={n.id}
              type="button"
              aria-pressed={i === sel}
              onClick={() => setSel(i)}
              style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${i * 0.9}s` }}
              className={`cn2-float label-mono absolute max-w-[10rem] -translate-x-1/2 -translate-y-1/2 border px-3.5 py-2.5 text-left text-[9px] leading-tight transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${
                i === sel
                  ? "border-signal bg-signal text-background"
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
        {visionNodes.map((n, i) => (
          <button
            key={n.id}
            type="button"
            aria-pressed={i === sel}
            onClick={() => setSel(i)}
            className={`label-mono border px-4 py-3 text-left text-[10px] transition-colors ${
              i === sel
                ? "border-signal bg-signal text-background"
                : "border-line-strong bg-surface text-muted"
            }`}
          >
            {n.label}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-8 border-l-2 border-signal pl-5">
        <p className="label-mono text-[10px] text-foreground">{node.label}</p>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">{node.body}</p>
      </div>

      <p className="label-mono mt-8 text-[10px] leading-relaxed text-faint">
        A DIRECTION I AM DEVELOPING — PIECE BY PIECE.
      </p>
    </div>
  );
}
