import type { ArchiveProject } from "@/data/archive";

/**
 * Builds hero topology — the wide system schematic behind the section title.
 *
 * The diagram is drawn from the archive itself: one bus line carrying every
 * build, one node per project with its real short title and tags, stubs
 * alternating above and below the bus. Flagship systems carry the red
 * status beacon, tier-2 builds the research-blue one.
 *
 * Motion is CSS only (`.dash-march`, `.travel-pulse`, `.anim-blink`), so the
 * global reduced-motion rule freezes it for free — no JS, no rAF, no SMIL.
 * It is a decorative backdrop: aria-hidden, pointer-events-none, and two
 * token-driven scrims keep the title and copy above fully readable.
 */

const W = 1600;
const H = 700;
const SPINE_Y = 450;
const BOX_W = 200;
const BOX_H = 64;
const ABOVE_Y = 316; // box top for stubs rising above the bus
const BELOW_Y = 520; // box top for stubs dropping below the bus

/** Deterministic node positions — anchored to the right half to prevent any collision with text. */
function layout(count: number) {
  const rightStart = 720;
  const availW = W - rightStart - 60;
  const step = Math.min(190, (availW - BOX_W) / Math.max(1, count - 1));
  const startX = rightStart;
  return { step, startX };
}

export default function HeroTopology({ projects }: { projects: ArchiveProject[] }) {
  const { step, startX } = layout(projects.length);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMaxYMid slice"
        focusable="false"
        className="h-full w-full opacity-80"
      >
        {/* ---- backplane: a faint upper rail tying the whole plate together ---- */}
        <line
          x1="0"
          y1="150"
          x2={W}
          y2="150"
          stroke="var(--line-strong)"
          strokeWidth="1"
          opacity="0.3"
        />
        <line
          x1="0"
          y1="150"
          x2={W}
          y2="150"
          stroke="var(--research)"
          strokeWidth="1.5"
          strokeDasharray="8 16"
          className="dash-march"
          opacity="0.32"
        />

        {/* ---- the archive bus ---- */}
        <line
          x1="0"
          y1={SPINE_Y}
          x2={W}
          y2={SPINE_Y}
          stroke="var(--line-strong)"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <line
          x1="0"
          y1={SPINE_Y}
          x2={W}
          y2={SPINE_Y}
          stroke="var(--research)"
          strokeWidth="1.5"
          strokeDasharray="8 16"
          className="dash-march"
          opacity="0.45"
        />
        {[0, 1.15, 2.3].map((delay) => (
          <line
            key={delay}
            x1="0"
            y1={SPINE_Y}
            x2={W}
            y2={SPINE_Y}
            className="travel-pulse"
            stroke="var(--signal)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="0.1 100"
            pathLength={100}
            opacity="0.8"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}

        {/* ---- one node per build, stubs alternating around the bus ---- */}
        {projects.map((p, i) => {
          const x = startX + i * step;
          const above = i % 2 === 0;
          const boxY = above ? ABOVE_Y : BELOW_Y;
          const boxX = x - BOX_W / 2;
          // stub runs from the bus out to the node box
          const stub = above
            ? `M${x} ${SPINE_Y} L${x} ${boxY + BOX_H}`
            : `M${x} ${SPINE_Y} L${x} ${boxY}`;
          const flagship = p.tier === 1;

          return (
            <g key={p.id}>
              {/* riser: dashed column with an occasional travelling signal */}
              <path d={stub} fill="none" stroke="var(--line-strong)" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.7" />
              {(i === 0 || i === projects.length - 1) && (
                <path
                  d={stub}
                  fill="none"
                  className="travel-pulse"
                  stroke={flagship ? "var(--signal)" : "var(--research)"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="0.1 100"
                  pathLength={100}
                  opacity="0.85"
                  style={{ animationDelay: `${0.4 + i * 0.6}s` }}
                />
              )}

              {/* node box */}
              <rect
                x={boxX}
                y={boxY}
                width={BOX_W}
                height={BOX_H}
                rx="3"
                fill="var(--surface)"
                stroke="var(--line-strong)"
                strokeWidth="1"
                opacity="0.97"
              />
              <rect
                x={boxX}
                y={boxY}
                width={BOX_W}
                height="2"
                fill={flagship ? "var(--signal)" : "var(--research)"}
                opacity="0.55"
              />
              <text
                x={boxX + 16}
                y={boxY + 32}
                className="font-mono"
                fontSize="13"
                fontWeight="500"
                fill="var(--foreground)"
                opacity="0.92"
              >
                {p.shortTitle}
              </text>
              <text
                x={boxX + 16}
                y={boxY + 51}
                className="font-mono"
                fontSize="9"
                fill="var(--faint)"
              >
                {p.tags.join(" / ")}
              </text>
              <circle
                cx={boxX + BOX_W - 16}
                cy={boxY + 29}
                r="3.5"
                fill={flagship ? "var(--signal)" : "var(--research)"}
                className={flagship ? "anim-blink" : undefined}
                style={{ animationDelay: `${(i % 4) * 0.6}s` }}
              />
            </g>
          );
        })}

        {/* ---- plate labels ---- */}
        <text
          x={W - 40}
          y={SPINE_Y - 14}
          textAnchor="end"
          className="cn2-mono"
          fontSize="10"
          fill="var(--faint)"
        >
          BUILD TOPOLOGY — ARCHIVE BUS · DIAGRAM
        </text>

        {/* legend: flagship vs build record */}
        <circle cx={1150} cy={652} r="4" fill="var(--signal)" opacity="0.85" />
        <text x={1164} y={656} className="font-mono" fontSize="10" fill="var(--faint)">
          FLAGSHIP
        </text>
        <circle cx={1290} cy={652} r="4" fill="var(--research)" opacity="0.85" />
        <text x={1304} y={656} className="font-mono" fontSize="10" fill="var(--faint)">
          BUILD RECORD
        </text>
      </svg>

      {/* ---- readability scrims: the title and buttons above always stay 100% clear ---- */}
      <div className="absolute inset-0 bg-gradient-to-r from-background from-45% via-background/70 via-65% to-transparent to-90%" />
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background/90 via-background/40 to-transparent" />
    </div>
  );
}
