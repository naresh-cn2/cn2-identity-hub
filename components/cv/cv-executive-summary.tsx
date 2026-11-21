import Reveal from "@/components/ui/reveal";
import { CvChapterSection } from "@/components/cv/cv-layout";

/**
 * Chapter — Executive Summary
 * One editorial statement, a working-principles column, an asymmetric
 * evidence column, and a live four-domain network. No equal card grid.
 */

const summary =
  "As a quantitative developer, I build software systems, financial infrastructure and AI-assisted tools across quantitative finance, software engineering, data infrastructure and artificial intelligence. The work is grounded in systems engineering and documented with inspectable artifacts — working repositories, test suites, research entries and certificates with verification links.";

const principles = [
  "I build systems where correctness precedes performance — every result carries explicit provenance labels, never presented as live trading returns.",
  "I treat engineering as an evidence discipline: hypotheses are explicit, experiments are reproducible, and promotion decisions are backed by verified artifacts.",
  "AI extends human capability; it does not replace understanding of the problem. Human judgment accepts, rejects or revises, and accountability stays with the operator.",
];

const facts = [
  { value: "CN2", label: "professional identity — Quantitative Developer" },
  { value: "8", label: "verified systems" },
  { value: "10", label: "certificates issued" },
  { value: "7", label: "documented research investigations" },
  { value: "305/305", label: "assertions green" },
];

const networkNodes = [
  { id: "markets", label: "Markets", x: 50, y: 14, color: "#ff3030" },
  { id: "data", label: "Data", x: 86, y: 50, color: "#35d6ff" },
  { id: "systems", label: "Systems", x: 50, y: 86, color: "#7aa7ff" },
  { id: "ai", label: "AI", x: 14, y: 50, color: "#35d6ff" },
];

const networkEdges = [
  "M50 14 Q 78 22 86 50",
  "M86 50 Q 78 78 50 86",
  "M50 86 Q 22 78 14 50",
  "M14 50 Q 22 22 50 14",
  "M50 14 Q 50 50 50 86",
  "M14 50 Q 50 50 86 50",
];

export function CvExecutiveSummary() {
  return (
    <CvChapterSection
      id="executive-summary"
      number="02"
      title="Executive Summary"
      kicker="Overview"
      lead="The work, the engineering approach and the evidence behind it."
      tone="research"
      visual={
        <div>
          <div
            style={{
              width: "100%",
              maxWidth: 540,
              aspectRatio: "1 / 1",
              margin: "0 auto",
            }}
          >
            <svg
              viewBox="0 0 100 100"
              width="100%"
              height="100%"
              role="img"
              aria-label="Network graph connecting Markets, Data, Systems and AI"
            >
              <defs>
                <linearGradient id="cv-exec-link" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff3030" />
                  <stop offset="100%" stopColor="#35d6ff" />
                </linearGradient>
                <filter id="cv-exec-glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="1.2" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(122,167,255,0.10)"
                strokeWidth="0.3"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="rgba(122,167,255,0.22)"
                strokeWidth="0.3"
                strokeDasharray="1 2"
              />

              {networkEdges.map((d, i) => (
                <path
                  key={d}
                  d={d}
                  className={
                    i === 0 || i === 3
                      ? "cv-flow"
                      : i === 4
                        ? "cv-trace"
                        : undefined
                  }
                  fill="none"
                  stroke="url(#cv-exec-link)"
                  strokeWidth="0.45"
                  opacity="0.55"
                  filter="url(#cv-exec-glow)"
                />
              ))}

              <circle
                cx="50"
                cy="50"
                r="1.6"
                fill="#ff3030"
                filter="url(#cv-exec-glow)"
              />

              {networkNodes.map((n) => (
                <g key={n.id}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="6.5"
                    fill="rgba(9,20,36,0.9)"
                    stroke={n.color}
                    strokeWidth="0.6"
                    filter="url(#cv-exec-glow)"
                  />
                  <circle cx={n.x} cy={n.y} r="2" fill={n.color} />
                  <text
                    x={n.x}
                    y={n.y + 11}
                    textAnchor="middle"
                    fill="var(--cv-ink)"
                    fontSize="3.4"
                    fontFamily="var(--font-plex-mono), monospace"
                    letterSpacing="0.35"
                  >
                    {n.label.toUpperCase()}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <p className="cv-label" style={{ textAlign: "center", marginTop: 14 }}>
            Four domains · one evidence discipline
          </p>
        </div>
      }
    >
      <div style={{ display: "grid", gap: 36 }}>
        <Reveal>
          <p className="cv-label" style={{ color: "var(--cv-blue)" }}>
            Professional summary
          </p>
          <p
            className="cv-statement"
            style={{
              marginTop: 16,
              maxWidth: "62ch",
              fontSize: "clamp(1.1rem, 1.9vw, 1.5rem)",
            }}
          >
            {summary}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
              gap: 28,
              alignItems: "start",
            }}
          >
            <div>
              <p className="cv-label" style={{ color: "var(--cv-blue)" }}>
                Working principles
              </p>
              <ul className="cv-list" style={{ marginTop: 14 }}>
                {principles.map((p) => (
                  <li className="cv-list-item" key={p}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="cv-label" style={{ color: "var(--cv-blue)" }}>
                At a glance
              </p>
              <div style={{ marginTop: 14 }}>
                {facts.map((f) => (
                  <div
                    key={f.value}
                    style={{
                      borderTop: "1px solid var(--cv-edge)",
                      padding: "12px 0",
                      display: "grid",
                      gap: 4,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-plex-mono), monospace",
                        fontSize: "clamp(1.25rem, 2.4vw, 1.9rem)",
                        fontWeight: 700,
                        lineHeight: 1.1,
                        letterSpacing: "-0.03em",
                        color: "var(--cv-red)",
                      }}
                    >
                      {f.value}
                    </p>
                    <p className="cv-label" style={{ lineHeight: 1.5 }}>
                      {f.label}
                    </p>
                  </div>
                ))}
                <div
                  style={{
                    borderTop: "1px solid var(--cv-edge)",
                    padding: "12px 0",
                  }}
                >
                  <p className="cv-label">Primary domains</p>
                  <p style={{ marginTop: 6, fontSize: 13, color: "var(--cv-ink)" }}>
                    Systems · Quant · FinTech · AI · Data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <span className="cv-pill" data-tone="red">OPEN TO SELECTED WORK</span>
            <span className="cv-pill" data-tone="cyan">RESEARCH · COLLABORATION</span>
            <span className="cv-pill">VERIFIED EVIDENCE</span>
          </div>
        </Reveal>
      </div>
    </CvChapterSection>
  );
}
