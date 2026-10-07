"use client";

import { useMemo, useState } from "react";
import { knowledgeEdges, knowledgeNodes } from "@/data/intelligence";

const VB_W = 1000;
const VB_H = 640;

const positions = Object.fromEntries(
  knowledgeNodes.map((n) => [n.id, { x: (n.x / 100) * VB_W, y: (n.y / 100) * VB_H }])
) as Record<string, { x: number; y: number }>;

/** Knowledge graph — hover a node to isolate its relationships. */
export default function KnowledgeGraph({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  const connected = useMemo(() => {
    if (!active) return null;
    return new Set(
      knowledgeEdges.filter((e) => e[0] === active || e[1] === active).flat()
    );
  }, [active]);

  const relationsText = useMemo(
    () =>
      knowledgeNodes
        .map((n) => {
          const rels = knowledgeEdges
            .filter((e) => e[0] === n.id || e[1] === n.id)
            .map((e) => (e[0] === n.id ? e[1] : e[0]));
          return `${n.label} relates to ${rels.map((r) => knowledgeNodes.find((x) => x.id === r)?.label).join(", ")}.`;
        })
        .join(" "),
    []
  );

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="h-auto w-full" role="img" aria-label={relationsText}>
        <title>Knowledge graph: how the practice areas relate</title>
        {knowledgeEdges.map(([a, b]) => {
          const pa = positions[a];
          const pb = positions[b];
          const isActive = !active || connected?.has(a) === true;
          const dim = active && !(connected?.has(a) && connected?.has(b));
          return (
            <line
              key={`${a}-${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke={dim ? "var(--line)" : "var(--signal)"}
              strokeWidth={dim ? 1 : 1.6}
              opacity={dim ? 0.4 : 0.85}
              className="transition-all duration-300"
            />
          );
        })}
        {knowledgeNodes.map((n) => {
          const p = positions[n.id];
          const dim = active && !connected?.has(n.id);
          return (
            <g
              key={n.id}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(n.id)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              role="button"
              aria-label={`${n.label} node`}
              className="cursor-pointer outline-none"
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={active === n.id ? 12 : 8}
                fill="var(--background)"
                stroke={dim ? "var(--line-strong)" : "var(--signal)"}
                strokeWidth={active === n.id ? 2.5 : 1.8}
                className="transition-all duration-300"
              />
              {n.id === "research" && (
                <circle cx={p.x} cy={p.y} r={3} fill="var(--signal)" className="pulse-dot" />
              )}
              <text
                x={p.x}
                y={p.y - 20}
                textAnchor="middle"
                className="label-mono"
                fontSize={15}
                fill={dim ? "var(--faint)" : "var(--foreground)"}
                style={{ transition: "fill 0.3s" }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="label-mono mt-4 text-center text-faint">
        HOVER A NODE TO ISOLATE ITS RELATIONSHIPS — RESEARCH IS THE HUB
      </p>
    </div>
  );
}
