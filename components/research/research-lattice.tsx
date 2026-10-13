/**
 * ResearchLattice — the research page's ambient hero visual.
 *
 * A regular lattice of linked nodes: orthogonal, dense and even, deliberately
 * distinct from the sparse constellation used elsewhere on the platform. It
 * carries no measurements — it is the atmosphere behind the archive. Every
 * animation is CSS-driven, so it freezes under prefers-reduced-motion.
 */

const COLS = 9;
const ROWS = 5;
const W = 440;
const H = 320;
const PAD_X = 28;
const PAD_Y = 34;

const stepX = (W - PAD_X * 2) / (COLS - 1);
const stepY = (H - PAD_Y * 2) / (ROWS - 1);

const cx = (c: number) => PAD_X + c * stepX;
const cy = (r: number) => PAD_Y + r * stepY;

/** Deterministic "live cell" picks — composition only, no data implied. */
const isActive = (c: number, r: number) => (c * 2 + r * 3) % 5 === 0;
const PULSE_ROWS = [1, 3];
const PULSE_COL = 4;

export default function ResearchLattice({ className = "" }: { className?: string }) {
  const nodes = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const live = isActive(c, r);
      const core = c === PULSE_COL && r === Math.floor(ROWS / 2);
      nodes.push(
        <g key={`${c}-${r}`}>
          {core ? (
            <>
              <circle cx={cx(c)} cy={cy(r)} r={7} fill="none" stroke="var(--signal)" strokeWidth="1" opacity="0.5" />
              <circle cx={cx(c)} cy={cy(r)} r={2.4} fill="var(--signal)" className="pulse-dot" />
            </>
          ) : (
            <circle
              cx={cx(c)}
              cy={cy(r)}
              r={live ? 2.4 : 1.4}
              fill={live ? "var(--research)" : "var(--faint)"}
              opacity={live ? 0.9 : 0.6}
              className={live ? "anim-breathe" : undefined}
              style={live ? { animationDelay: `${((c + r) % 5) * 0.9}s` } : undefined}
            />
          )}
        </g>
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label={`Research lattice: a ${COLS} by ${ROWS} grid of linked nodes, the ambient signature of this archive.`}
    >
      <title>Research lattice</title>

      {/* orthogonal lattice lines */}
      {Array.from({ length: ROWS }, (_, r) => (
        <line
          key={`h-${r}`}
          x1={PAD_X - 14}
          y1={cy(r)}
          x2={W - PAD_X + 14}
          y2={cy(r)}
          stroke="var(--line-strong)"
          strokeWidth="1"
          strokeDasharray="2 7"
          opacity="0.55"
        />
      ))}
      {Array.from({ length: COLS }, (_, c) => (
        <line
          key={`v-${c}`}
          x1={cx(c)}
          y1={PAD_Y - 14}
          x2={cx(c)}
          y2={H - PAD_Y + 14}
          stroke="var(--line-strong)"
          strokeWidth="1"
          strokeDasharray="2 7"
          opacity="0.4"
        />
      ))}

      {/* travelling signals along two rows and one column */}
      {PULSE_ROWS.map((r, i) => (
        <line
          key={`ph-${r}`}
          x1={PAD_X}
          y1={cy(r)}
          x2={W - PAD_X}
          y2={cy(r)}
          className="travel-pulse"
          pathLength={100}
          stroke="var(--research)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.1 100"
          opacity="0.6"
          style={{ animationDelay: `${i * 1.6}s` }}
        />
      ))}
      <line
        x1={cx(PULSE_COL)}
        y1={PAD_Y}
        x2={cx(PULSE_COL)}
        y2={H - PAD_Y}
        className="travel-pulse"
        pathLength={100}
        stroke="var(--signal)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="0.1 100"
        opacity="0.5"
        style={{ animationDelay: "2.4s" }}
      />

      {nodes}
    </svg>
  );
}
