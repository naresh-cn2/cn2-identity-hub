import type { ResearchEntry } from "@/data/research";

/**
 * Method chain visuals.
 *
 * Every research entry follows the same published spine — question,
 * hypothesis, method, evidence, result, limitation, conclusion. These
 * components draw that spine for one entry, with the terminal node styled by
 * the entry's own status: filled for VERIFIED and DOCUMENTED, open for
 * ONGOING. They carry no measurements — the text beside them is the finding.
 */

const STAGES = [
  { key: "question", label: "QUESTION" },
  { key: "hypothesis", label: "HYPOTHESIS" },
  { key: "method", label: "METHOD" },
  { key: "evidence", label: "EVIDENCE" },
  { key: "result", label: "RESULT" },
  { key: "limitation", label: "LIMITATION" },
  { key: "conclusion", label: "CONCLUSION" },
] as const;

const STATUS_FILL: Record<ResearchEntry["status"], string> = {
  VERIFIED: "var(--foreground)",
  DOCUMENTED: "var(--muted)",
  ONGOING: "var(--background)",
};

const STATUS_TEXT: Record<ResearchEntry["status"], string> = {
  VERIFIED: "var(--foreground)",
  DOCUMENTED: "var(--muted)",
  ONGOING: "var(--signal)",
};

/** Horizontal chain — for wide containers. */
export function MethodChainStrip({
  entry,
  className = "",
}: {
  entry: ResearchEntry;
  className?: string;
}) {
  const VB_W = 1000;
  const VB_H = 72;
  const y = 22;
  const xs = (i: number) => 40 + (i * (VB_W - 80)) / (STAGES.length - 1);
  const openTerminal = entry.status === "ONGOING";

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label={`Method chain: ${STAGES.map((s) => s.label).join(" then ")}. Entry status: ${entry.status}.`}
    >
      <title>{`Method chain — ${entry.title}`}</title>
      <line
        x1={xs(0)}
        y1={y}
        x2={xs(STAGES.length - 1)}
        y2={y}
        stroke="var(--line-strong)"
        strokeWidth="1"
        strokeDasharray="3 6"
      />
      <line
        x1={xs(0)}
        y1={y}
        x2={xs(STAGES.length - 1)}
        y2={y}
        className="travel-pulse"
        pathLength={100}
        stroke="var(--research)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="0.1 100"
        opacity="0.5"
      />
      {STAGES.map((stage, i) => {
        const last = i === STAGES.length - 1;
        return (
          <g key={stage.key}>
            <circle
              cx={xs(i)}
              cy={y}
              r={last ? 7 : 4.5}
              fill={last ? STATUS_FILL[entry.status] : "var(--research)"}
              stroke={last && openTerminal ? "var(--signal)" : "none"}
              strokeWidth={last && openTerminal ? 1.6 : 0}
              strokeDasharray={last && openTerminal ? "2 3" : undefined}
            />
            {last && !openTerminal && (
              <circle cx={xs(i)} cy={y} r={11} fill="none" stroke={STATUS_FILL[entry.status]} strokeWidth="1" opacity="0.6" />
            )}
            <text
              x={xs(i)}
              y={y + 26}
              textAnchor="middle"
              fontSize="10"
              letterSpacing="0.12em"
              fill={last ? "var(--foreground)" : "var(--muted)"}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {stage.label}
            </text>
            {last && (
              <text
                x={xs(i)}
                y={y + 42}
                textAnchor="middle"
                fontSize="9"
                letterSpacing="0.12em"
                fill={STATUS_TEXT[entry.status]}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {entry.status}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Vertical rail — for narrow side rails. */
export function MethodChainRail({
  entry,
  className = "",
}: {
  entry: ResearchEntry;
  className?: string;
}) {
  const VB_W = 300;
  const step = 46;
  const top = 20;
  const VB_H = top * 2 + step * (STAGES.length - 1);
  const ys = (i: number) => top + i * step;
  const openTerminal = entry.status === "ONGOING";

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label={`Method chain: ${STAGES.map((s) => s.label).join(" then ")}. Entry status: ${entry.status}.`}
    >
      <title>{`Method chain — ${entry.title}`}</title>
      <line
        x1={14}
        y1={ys(0)}
        x2={14}
        y2={ys(STAGES.length - 1)}
        stroke="var(--line-strong)"
        strokeWidth="1"
        strokeDasharray="3 6"
      />
      <line
        x1={14}
        y1={ys(0)}
        x2={14}
        y2={ys(STAGES.length - 1)}
        className="travel-pulse"
        pathLength={100}
        stroke="var(--research)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="0.1 100"
        opacity="0.5"
      />
      {STAGES.map((stage, i) => {
        const last = i === STAGES.length - 1;
        return (
          <g key={stage.key}>
            <circle
              cx={14}
              cy={ys(i)}
              r={last ? 7 : 4.5}
              fill={last ? STATUS_FILL[entry.status] : "var(--research)"}
              stroke={last && openTerminal ? "var(--signal)" : "none"}
              strokeWidth={last && openTerminal ? 1.6 : 0}
              strokeDasharray={last && openTerminal ? "2 3" : undefined}
            />
            {last && !openTerminal && (
              <circle cx={14} cy={ys(i)} r={11} fill="none" stroke={STATUS_FILL[entry.status]} strokeWidth="1" opacity="0.6" />
            )}
            <text
              x={34}
              y={ys(i) + 4}
              fontSize="12"
              letterSpacing="0.1em"
              fill={last ? "var(--foreground)" : "var(--muted)"}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {stage.label}
            </text>
            {last && (
              <text
                x={34}
                y={ys(i) + 20}
                fontSize="10"
                letterSpacing="0.1em"
                fill={STATUS_TEXT[entry.status]}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {entry.status}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
