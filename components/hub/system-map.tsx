"use client";

import { useState } from "react";
import Link from "next/link";
import type { HubDestination } from "@/data/hub";

/**
 * SystemMap — the headquarters system-structure visualization.
 *
 * A live node graph: the CN2.DEV core wired to each of the eight destinations.
 * Every node is a real link; hovering or focusing a node illuminates its
 * pathway from the core. Signal dots travel outward along each spoke
 * (CSS-driven, frozen automatically under prefers-reduced-motion).
 *
 * The graph is laid out on the same 3×3 grid as the HTML nodes, with the SVG
 * stretched to match (preserveAspectRatio="none" + non-scaling strokes), so
 * pathways stay attached to their nodes at every viewport size.
 */

/** Destination order → grid cell (column, row); core sits in the middle. */
const CELLS: Array<[number, number]> = [
  [0, 0], // 01 BUILDS
  [1, 0], // 02 CREDENTIALS
  [2, 0], // 03 SERVICES
  [2, 1], // 04 LABORATORY
  [2, 2], // 05 RESEARCH
  [1, 2], // 06 OPPORTUNITIES
  [0, 2], // 07 ABOUT
  [0, 1], // 08 CONNECT
];

const CORE: [number, number] = [1, 1];

/** SVG-space centres for a 0…300 grid (3 cells of 100 units). */
const centre = (cell: [number, number]) => ({
  x: cell[0] * 100 + 50,
  y: cell[1] * 100 + 50,
});

const CORE_PT = centre(CORE);

/** Faint perimeter ring tying the outer nodes into one system. */
const RING: Array<[number, number]> = [
  [50, 50], [150, 50], [250, 50],
  [250, 150], [250, 250],
  [150, 250], [50, 250],
  [50, 150], [50, 50],
];
const RING_PATH = RING.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");

export default function SystemMap({ destinations }: { destinations: HubDestination[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative grid grid-cols-3 grid-rows-3 gap-2 md:gap-3">
      {/* pathways layer */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 300 300"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {/* structural ring */}
        <path
          d={RING_PATH}
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.55"
        />
        {/* spokes: base + travelling signal dot */}
        {destinations.map((d, i) => {
          const pt = centre(CELLS[i]);
          const lit = active === i;
          return (
            <g key={d.code}>
              <line
                x1={CORE_PT.x}
                y1={CORE_PT.y}
                x2={pt.x}
                y2={pt.y}
                stroke={lit ? "var(--signal)" : "var(--line-strong)"}
                strokeWidth={lit ? 1.5 : 1}
                vectorEffect="non-scaling-stroke"
                opacity={lit ? 1 : 0.7}
                style={{ transition: "stroke 260ms ease, opacity 260ms ease" }}
              />
              <line
                x1={CORE_PT.x}
                y1={CORE_PT.y}
                x2={pt.x}
                y2={pt.y}
                className="travel-pulse"
                stroke={lit ? "var(--signal)" : "var(--research)"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="0.1 100"
                vectorEffect="non-scaling-stroke"
                opacity={lit ? 0.95 : 0.6}
                style={{
                  transition: "stroke 260ms ease, opacity 260ms ease",
                  animationDelay: `${(i % 4) * 0.85}s`,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* nodes layer — the eight destinations */}
      {destinations.map((d, i) => {
        const [col, row] = CELLS[i];
        return (
          <Link
            key={d.code}
            href={d.href}
            className="card-depth group relative z-10 flex h-full flex-col items-center justify-center gap-1 border border-line bg-background/85 px-2 py-4 text-center backdrop-blur-sm md:px-3 md:py-5"
            style={{ gridColumn: col + 1, gridRow: row + 1 }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive((prev) => (prev === i ? null : prev))}
            onFocus={() => setActive(i)}
            onBlur={() => setActive((prev) => (prev === i ? null : prev))}
          >
            <span className="num-mono text-[9px] text-muted transition-colors group-hover:text-signal group-focus-visible:text-signal">
              {d.code}
            </span>
            <span className="label-mono text-[9px] leading-tight text-foreground transition-colors group-hover:text-signal group-focus-visible:text-signal md:text-[10px]">
              {d.label}
            </span>
          </Link>
        );
      })}

      {/* core */}
      <div
        className="corner-ticks relative z-10 m-auto flex h-[86%] w-[86%] flex-col items-center justify-center gap-1.5 border border-signal bg-surface text-center"
        style={{ gridColumn: CORE[0] + 1, gridRow: CORE[1] + 1 }}
        aria-hidden="true"
      >
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" />
        <span className="display text-xs md:text-sm">CN2<span className="text-signal">.DEV</span></span>
        <span className="label-mono hidden text-[8px] text-muted sm:block">CORE</span>
      </div>
    </div>
  );
}
