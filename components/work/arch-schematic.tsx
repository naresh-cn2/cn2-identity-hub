/**
 * ArchSchematic — the wide architecture / data-path topology for a build.
 *
 * A horizontal pipeline rail: one station per documented layer, callouts
 * alternating above and below the rail so nine-stage pipelines still read at
 * a glance. Stations are numbered in the same order as the ArchFlow list
 * beneath it, so the diagram and the text describe exactly the same system —
 * the steps come from the project record, nothing is invented here.
 *
 * Motion is CSS only (`.dash-march` on the rail, `.travel-pulse` carrying a
 * signal dot along it, `.anim-blink` on the stations), which the global
 * reduced-motion rule freezes automatically. The schematic is a diagram, not
 * a measurement, and the note says so — following the page's existing
 * labeling pattern.
 */

interface SchematicStep {
  name: string;
  role?: string;
}

const W = 1200;
const H = 300;
const RAIL_Y = 150;
const RAIL_PAD = 60;

/** Break a stage name into short lines so labels never collide across stations. */
function wrapLabel(text: string, max = 16): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

export default function ArchSchematic({
  steps,
  label = "ARCHITECTURE — DATA PATH",
  note = "ARCHITECTURE DIAGRAM — THE DOCUMENTED LAYERS, NOT A MEASUREMENT",
}: {
  steps: SchematicStep[];
  label?: string;
  note?: string;
}) {
  if (steps.length === 0) return null;

  const n = steps.length;
  const spacing = Math.min(240, (W - RAIL_PAD * 2) / Math.max(1, n - 1));
  const total = spacing * (n - 1);
  const startX = (W - total) / 2;
  const railStart = RAIL_PAD;
  const railEnd = W - RAIL_PAD;

  const summary = steps.map((s, i) => `${String(i + 1).padStart(2, "0")} ${s.name}`).join(", ");

  return (
    <div className="hidden md:block">
      <div className="viz-frame p-4 md:p-6">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
          <p className="label-mono text-research">{label}</p>
          <p className="label-mono text-faint">{note}</p>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`Architecture pipeline: ${summary}`}
        >
          <title>{`Architecture pipeline: ${summary}`}</title>

          {/* rail — base line, marching dashes, and travelling signals */}
          <line
            x1={railStart}
            y1={RAIL_Y}
            x2={railEnd}
            y2={RAIL_Y}
            stroke="var(--line-strong)"
            strokeWidth="1.5"
            opacity="0.75"
          />
          <line
            x1={railStart}
            y1={RAIL_Y}
            x2={railEnd}
            y2={RAIL_Y}
            stroke="var(--research)"
            strokeWidth="1.5"
            strokeDasharray="8 16"
            className="dash-march"
            opacity="0.5"
          />
          {[0, 1.7].map((delay) => (
            <line
              key={delay}
              x1={railStart}
              y1={RAIL_Y}
              x2={railEnd}
              y2={RAIL_Y}
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
          {/* direction marker */}
          <polygon
            points={`${railEnd + 2},${RAIL_Y} ${railEnd - 12},${RAIL_Y - 5} ${railEnd - 12},${RAIL_Y + 5}`}
            fill="var(--signal)"
            opacity="0.7"
          />

          {/* stations */}
          {steps.map((step, i) => {
            const x = startX + i * spacing;
            const above = i % 2 === 0;
            const isFirst = i === 0;
            const isLast = i === n - 1;
            const accent = isFirst || isLast;
            const number = String(i + 1).padStart(2, "0");
            const lines = wrapLabel(step.name);

            const riser = above
              ? `M${x} ${RAIL_Y - 9} L${x} ${RAIL_Y - 66}`
              : `M${x} ${RAIL_Y + 9} L${x} ${RAIL_Y + 76}`;
            const numberY = above ? RAIL_Y - 76 : RAIL_Y + 90;
            const nameY = (k: number) =>
              above
                ? RAIL_Y - 76 - 16 * (lines.length - k)
                : RAIL_Y + 90 + 22 * (k + 1);

            return (
              <g key={step.name}>
                <path
                  d={riser}
                  fill="none"
                  stroke="var(--line-strong)"
                  strokeWidth="1.2"
                  opacity="0.7"
                />
                {(isFirst || isLast) && (
                  <path
                    d={riser}
                    fill="none"
                    className="travel-pulse"
                    stroke="var(--signal)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="0.1 100"
                    pathLength={100}
                    opacity="0.85"
                    style={{ animationDelay: `${0.6 + i * 0.5}s` }}
                  />
                )}

                <circle
                  cx={x}
                  cy={RAIL_Y}
                  r="8"
                  fill="var(--background)"
                  stroke={accent ? "var(--signal)" : "var(--line-strong)"}
                  strokeWidth={accent ? 1.8 : 1.3}
                />
                <circle
                  cx={x}
                  cy={RAIL_Y}
                  r="3.4"
                  fill={accent ? "var(--signal)" : "var(--research)"}
                  className="anim-blink"
                  style={{ animationDelay: `${(i % 5) * 0.5}s` }}
                />

                <text
                  x={x}
                  y={numberY}
                  textAnchor="middle"
                  className="cn2-mono"
                  fontSize="9.5"
                  fill="var(--signal)"
                  opacity="0.9"
                >
                  {number}
                </text>

                {lines.map((line, k) => (
                  <text
                    key={line + k}
                    x={x}
                    y={nameY(k)}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="12.5"
                    fontWeight="500"
                    fill="var(--foreground)"
                    opacity="0.92"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
