/**
 * OPPORTUNITIES hero — the pathway map: one trunk splitting into the four
 * professional routes, with restrained signals travelling through each
 * branch. Pure SVG + CSS motion (auto-frozen under reduced motion).
 * Labels mirror the real pathways passed in from the page.
 */

export interface MapPathway {
  code: string;
  label: string;
  status: string;
}

const W = 1200;
const H = 340;
const TRUNK_Y = 170;
const SPLIT_X = 420;
const END_X = 1090;
const BRANCH_Y = [56, 128, 212, 284];

const branchPath = (y: number) =>
  `M${SPLIT_X} ${TRUNK_Y} C ${SPLIT_X + 120} ${TRUNK_Y}, ${SPLIT_X + 160} ${y}, ${SPLIT_X + 280} ${y} L ${END_X} ${y}`;

export default function PathwayMap({ pathways }: { pathways: readonly MapPathway[] }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Pathway map: one trunk splitting into ${pathways.length} routes — ${pathways
        .map((p) => p.label)
        .join(", ")}.`}
    >
      <title>Pathway map — four routes from one trunk</title>

      {/* trunk */}
      <line x1={60} y1={TRUNK_Y} x2={SPLIT_X} y2={TRUNK_Y} stroke="var(--line-strong)" strokeWidth="2" />
      <line
        x1={60}
        y1={TRUNK_Y}
        x2={SPLIT_X}
        y2={TRUNK_Y}
        stroke="var(--research)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0.1 100"
        className="travel-pulse"
      />
      <circle cx={60} cy={TRUNK_Y} r="16" fill="var(--signal)" opacity="0.12" className="anim-breathe" />
      <circle cx={60} cy={TRUNK_Y} r="7" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
      <circle cx={60} cy={TRUNK_Y} r="2.5" fill="var(--signal)" />
      <text x={60} y={TRUNK_Y - 34} className="label-mono hidden sm:block" fill="var(--faint)" fontSize="14">
        OPPORTUNITIES
      </text>

      {/* branches */}
      {pathways.slice(0, BRANCH_Y.length).map((p, i) => {
        const y = BRANCH_Y[i];
        return (
          <g key={p.code}>
            <path
              d={branchPath(y)}
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              className="dash-march"
              opacity="0.8"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
            <path
              d={branchPath(y)}
              fill="none"
              stroke="var(--research)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="0.1 100"
              className="travel-pulse"
              style={{ animationDelay: `${i * 0.9}s` }}
            />
            {/* destination node */}
            <circle cx={END_X} cy={y} r="12" fill="var(--signal)" opacity="0.14" className="anim-breathe" style={{ animationDelay: `${i * 0.8}s` }} />
            <circle cx={END_X} cy={y} r="5" fill="var(--signal)" />
            {/* labels */}
            <text x={SPLIT_X + 300} y={y - 12} className="label-mono hidden sm:block" fill="var(--foreground)" fontSize="15">
              {p.code} — {p.label}
            </text>
            <text x={END_X - 14} y={y - 12} className="label-mono hidden sm:block" fill="var(--faint)" fontSize="12" textAnchor="end">
              {p.status}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
