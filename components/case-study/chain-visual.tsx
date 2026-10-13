/**
 * ChainVisual — the case-studies hero backdrop.
 *
 * Same family as the builds topology (token-driven SVG, dashed rails,
 * travelling signal dots) but a different structure: one continuous
 * serpentine rail with a station for each step of the study chain the page
 * already documents — QUESTION → HYPOTHESIS → METHOD → EVIDENCE → RESULT →
 * LIMITATION → CONCLUSION → REPOSITORY. It is a diagram of the page's own
 * method, so it carries no numbers and needs no ILLUSTRATIVE tag.
 *
 * CSS motion only (`.dash-march`, `.travel-pulse`, `.anim-blink`) — frozen
 * automatically under prefers-reduced-motion. Decorative backdrop:
 * aria-hidden, pointer-events-none, scrimmed so the title wins.
 */

const W = 1400;
const H = 640;

const ROW_TOP = 220;
const ROW_BOTTOM = 470;
const CORNER_X = 1240;

interface Station {
  label: string;
  x: number;
  y: number;
  terminal?: boolean;
}

/** Row 1 runs left → right, row 2 returns right → left — one unbroken path. */
const STATIONS: Station[] = [
  { label: "QUESTION", x: 150, y: ROW_TOP },
  { label: "HYPOTHESIS", x: 470, y: ROW_TOP },
  { label: "METHOD", x: 790, y: ROW_TOP },
  { label: "EVIDENCE", x: 1110, y: ROW_TOP },
  { label: "RESULT", x: 1110, y: ROW_BOTTOM },
  { label: "LIMITATION", x: 790, y: ROW_BOTTOM },
  { label: "CONCLUSION", x: 470, y: ROW_BOTTOM },
  { label: "REPOSITORY", x: 150, y: ROW_BOTTOM, terminal: true },
];

const CHAIN_PATH = `M150 ${ROW_TOP} H1200 Q${CORNER_X} ${ROW_TOP} ${CORNER_X} ${ROW_TOP + 40} V${ROW_BOTTOM - 40} Q${CORNER_X} ${ROW_BOTTOM} 1200 ${ROW_BOTTOM} H150`;

export default function ChainVisual() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMaxYMid slice"
        focusable="false"
        className="h-full w-full opacity-80"
      >
        {/* plate hairlines */}
        <line x1="60" y1="96" x2={W - 60} y2="96" stroke="var(--line-strong)" strokeWidth="1" opacity="0.25" strokeDasharray="6 14" />
        <line x1="60" y1="574" x2={W - 60} y2="574" stroke="var(--line-strong)" strokeWidth="1" opacity="0.25" strokeDasharray="6 14" />

        {/* the chain — base rail */}
        <path d={CHAIN_PATH} fill="none" stroke="var(--line-strong)" strokeWidth="1.5" opacity="0.75" />
        {/* marching dashes */}
        <path
          d={CHAIN_PATH}
          fill="none"
          stroke="var(--research)"
          strokeWidth="1.5"
          strokeDasharray="8 16"
          className="dash-march"
          opacity="0.5"
        />
        {/* travelling signal dots */}
        {[0, 1.7].map((delay) => (
          <path
            key={delay}
            d={CHAIN_PATH}
            fill="none"
            className="travel-pulse"
            stroke="var(--signal)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="0.1 100"
            pathLength={100}
            opacity="0.85"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}

        {/* stations */}
        {STATIONS.map((s, i) => {
          const onTop = s.y === ROW_TOP;
          const numberY = onTop ? s.y - 44 : s.y + 34;
          const labelY = onTop ? s.y - 24 : s.y + 56;
          return (
            <g key={s.label}>
              <circle
                cx={s.x}
                cy={s.y}
                r="11"
                fill="var(--background)"
                stroke={s.terminal ? "var(--signal)" : "var(--line-strong)"}
                strokeWidth={s.terminal ? 2 : 1.4}
              />
              <circle
                cx={s.x}
                cy={s.y}
                r="4.5"
                fill={s.terminal ? "var(--signal)" : "var(--research)"}
                className="anim-blink"
                style={{ animationDelay: `${(i % 4) * 0.7}s` }}
              />
              <text
                x={s.x}
                y={numberY}
                textAnchor="middle"
                className="cn2-mono"
                fontSize="9.5"
                fill={s.terminal ? "var(--signal)" : "var(--faint)"}
              >
                {String(i + 1).padStart(2, "0")}
              </text>
              <text
                x={s.x}
                y={labelY}
                textAnchor="middle"
                className="font-mono"
                fontSize="13"
                fontWeight="500"
                fill={s.terminal ? "var(--signal)" : "var(--foreground)"}
                opacity={s.terminal ? 1 : 0.9}
              >
                {s.label}
              </text>
            </g>
          );
        })}

        {/* plate caption */}
        <text x={W - 60} y={614} textAnchor="end" className="cn2-mono" fontSize="10" fill="var(--faint)">
          EVIDENCE CHAIN — ONE CONTINUOUS RAIL · DIAGRAM
        </text>
      </svg>

      {/* readability scrims */}
      <div className="absolute inset-0 bg-gradient-to-r from-background from-35% via-background/65 via-60% to-transparent to-85%" />
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-background/75 via-background/25 to-transparent" />
    </div>
  );
}
