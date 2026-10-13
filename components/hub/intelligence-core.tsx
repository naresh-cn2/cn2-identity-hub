import type { CSSProperties } from "react";

/**
 * IntelligenceCore — the /hub centerpiece illustration.
 *
 * A central CN2.DEV core inside layered orbital rings, with a perspective
 * grid below and six discipline nodes (Data, Research, Models, Systems,
 * Automation, Markets) wired to the core by circuit spokes. Hovering a node
 * lifts its chip, lights the frame and energises its spoke.
 *
 * The diagram illustrates my connected working disciplines — it carries no
 * numbers and shows no live data. Pure server-rendered SVG + CSS motion
 * (spin, march, travel, ring-ping), so the global reduced-motion rule
 * freezes it for free. Decorative and non-navigational (aria-hidden): real
 * destination navigation lives in the SystemMap below this plate.
 */

const CORE_X = 600;
const CORE_Y = 310;
const RING_R = 230;

const DISCIPLINES = ["DATA", "RESEARCH", "MODELS", "SYSTEMS", "AUTOMATION", "MARKETS"];

/** Node centre on the ring — six positions, starting at the top, clockwise. */
function nodePosition(i: number) {
  const rad = ((-90 + i * 60) * Math.PI) / 180;
  const ux = Math.cos(rad);
  const uy = Math.sin(rad);
  return { x: CORE_X + RING_R * ux, y: CORE_Y + RING_R * uy, ux, uy };
}

/** Perspective floor: horizon at y=470, converging verticals below it. */
const HORIZONS = [470, 484, 504, 532, 570, 618];
const CONVERGENTS = [-300, -100, 100, 300, 500, 700, 900, 1100, 1300, 1500];

const orbitStyle = (delay: number): CSSProperties => ({ animationDelay: `${delay}s` });

export default function IntelligenceCore() {
  return (
    <svg viewBox="0 0 1200 620" focusable="false" aria-hidden="true" className="h-full w-full">
      <defs>
        <radialGradient id="nx-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--research)" stopOpacity="0.32" />
          <stop offset="55%" stopColor="var(--research)" stopOpacity="0.10" />
          <stop offset="100%" stopColor="var(--research)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ---- perspective floor ---- */}
      <g stroke="var(--line-strong)" strokeWidth="1" opacity="0.45">
        {HORIZONS.map((y) => (
          <line key={y} x1="0" y1={y} x2="1200" y2={y} />
        ))}
      </g>
      <g stroke="var(--research)" strokeWidth="1" opacity="0.20">
        {CONVERGENTS.map((x) => (
          <line key={x} x1={x} y1="620" x2={CORE_X} y2="470" />
        ))}
      </g>

      {/* ---- holographic core lighting ---- */}
      <circle cx={CORE_X} cy={CORE_Y} r="330" fill="url(#nx-core-glow)" />

      {/* ---- orbital geometry — slow counter-rotating layers ---- */}
      <ellipse
        cx={CORE_X}
        cy={CORE_Y}
        rx="340"
        ry="185"
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="1"
        strokeDasharray="3 10"
        opacity="0.7"
        className="nexus-spin"
      />
      <ellipse
        cx={CORE_X}
        cy={CORE_Y}
        rx="292"
        ry="236"
        fill="none"
        stroke="var(--research)"
        strokeWidth="1"
        strokeDasharray="1 14"
        strokeLinecap="round"
        opacity="0.55"
        className="nexus-spin-rev"
      />
      <circle
        cx={CORE_X}
        cy={CORE_Y}
        r={RING_R}
        fill="none"
        stroke="var(--research)"
        strokeWidth="1.2"
        strokeDasharray="8 12"
        opacity="0.5"
        className="dash-march"
      />

      {/* ---- orbiting beacons ---- */}
      <g className="nexus-spin">
        <circle cx={CORE_X} cy="12" r="9" fill="var(--signal)" opacity="0.25" />
        <circle cx={CORE_X} cy="12" r="4" fill="var(--signal)" opacity="0.9" />
      </g>
      <g className="nexus-spin-rev" style={orbitStyle(0)}>
        <circle cx="898" cy={CORE_Y} r="3.5" fill="var(--research)" opacity="0.9" />
      </g>
      <g className="nexus-spin-2" style={orbitStyle(0)}>
        <circle cx="760" cy={CORE_Y} r="3" fill="var(--research)" opacity="0.7" />
      </g>

      {/* ---- circuit spokes + discipline nodes ---- */}
      {DISCIPLINES.map((label, i) => {
        const { x, y, ux, uy } = nodePosition(i);
        const sx = CORE_X + 84 * ux;
        const sy = CORE_Y + 84 * uy;
        const jx = sx + (x - sx) * 0.62;
        const jy = sy + (y - sy) * 0.62;
        const boxX = x - 75;
        const boxY = y - 22;
        const spoke = `M${sx} ${sy} L${x} ${y}`;
        return (
          <g key={label} className="nexus-node">
            <path
              className="nexus-link"
              d={spoke}
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth="1.2"
              opacity="0.75"
            />
            <path
              className="travel-pulse"
              d={spoke}
              fill="none"
              stroke="var(--signal)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="0.1 100"
              pathLength={100}
              opacity="0.85"
              style={orbitStyle(i * 0.55)}
            />
            <circle cx={jx} cy={jy} r="3" fill="var(--line-strong)" />
            <rect
              className="nexus-node-frame"
              x={boxX}
              y={boxY}
              width="150"
              height="44"
              rx="3"
              fill="var(--surface)"
              stroke="var(--line-strong)"
              strokeWidth="1.2"
            />
            <rect
              className="nexus-node-accent"
              x={boxX}
              y={boxY}
              width="150"
              height="2"
              fill="var(--research)"
              opacity="0.6"
            />
            <path
              d={`M${x - 56} ${y - 5} L${x - 51} ${y} L${x - 56} ${y + 5} L${x - 61} ${y} Z`}
              fill="var(--research)"
              opacity="0.85"
            />
            {/* labels scale with the viewBox — below md they'd render at ~6px,
                so the visible caption row carries the discipline names instead */}
            <text
              className="nexus-node-label hidden font-mono md:block"
              x={x}
              y={y + 4.5}
              textAnchor="middle"
              fontSize="12.5"
              letterSpacing="1.5"
              fill="var(--muted)"
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* ---- the core ---- */}
      <g>
        {/* radar pings — staggered through the shared ring keyframe */}
        <circle
          className="nexus-ping"
          cx={CORE_X}
          cy={CORE_Y}
          r="86"
          fill="none"
          stroke="var(--signal)"
          strokeWidth="1.5"
        />
        <circle
          className="nexus-ping"
          cx={CORE_X}
          cy={CORE_Y}
          r="86"
          fill="none"
          stroke="var(--signal)"
          strokeWidth="1.5"
          style={orbitStyle(1.4)}
        />
        {/* rotating tick ring */}
        <g className="nexus-spin-2">
          {Array.from({ length: 12 }, (_, k) => {
            const a = (k * 30 * Math.PI) / 180;
            return (
              <line
                key={k}
                x1={CORE_X + 120 * Math.cos(a)}
                y1={CORE_Y + 120 * Math.sin(a)}
                x2={CORE_X + 128 * Math.cos(a)}
                y2={CORE_Y + 128 * Math.sin(a)}
                stroke="var(--line-strong)"
                strokeWidth="1.5"
                opacity="0.8"
              />
            );
          })}
        </g>
        <circle
          cx={CORE_X}
          cy={CORE_Y}
          r="104"
          fill="none"
          stroke="var(--signal)"
          strokeWidth="1"
          strokeDasharray="4 9"
          opacity="0.55"
          className="dash-march"
        />
        <circle
          cx={CORE_X}
          cy={CORE_Y}
          r="78"
          fill="var(--surface)"
          stroke="var(--signal)"
          strokeWidth="1.6"
        />
        <circle cx={CORE_X} cy={CORE_Y} r="66" fill="none" stroke="var(--line-strong)" strokeWidth="1" opacity="0.8" />
        <text
          x={CORE_X}
          y={CORE_Y - 4}
          textAnchor="middle"
          fontSize="15"
          fontWeight="600"
          letterSpacing="1"
          fill="var(--foreground)"
          className="hidden font-mono md:block"
        >
          CN2.DEV
        </text>
        <text
          x={CORE_X}
          y={CORE_Y + 16}
          textAnchor="middle"
          fontSize="8"
          letterSpacing="2"
          fill="var(--faint)"
          className="hidden cn2-mono md:block"
        >
          INTELLIGENCE NEXUS
        </text>
        <circle cx={CORE_X} cy="234" r="3.5" fill="var(--signal)" className="anim-blink" />
      </g>

      {/* ---- plate legend ---- */}
      <g className="hidden md:block">
        <circle cx="36" cy="596" r="4" fill="var(--signal)" opacity="0.85" />
        <text x="50" y="600" fontSize="10" letterSpacing="1" fill="var(--faint)" className="cn2-mono">
          SIGNAL PATH
        </text>
        <circle cx="176" cy="596" r="4" fill="var(--research)" opacity="0.85" />
        <text x="190" y="600" fontSize="10" letterSpacing="1" fill="var(--faint)" className="cn2-mono">
          DISCIPLINE NODE
        </text>
      </g>
    </svg>
  );
}
