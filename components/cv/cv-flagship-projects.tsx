"use client";

import { useState, type ReactNode } from "react";
import { getAllWorks } from "@/data/works";
import { CvChapterSection, CvEvidenceBadge, CvLinkList } from "@/components/cv/cv-layout";
import { CvHexTile, CvTechPill } from "@/components/cv/cv-visuals";

/**
 * Flagship projects.
 * One selected system at a time, with a distinct schematic per project.
 * Every fact shown here comes from getAllWorks(); nothing is invented.
 */

const FLAGSHIP_IDS = [
  "bustub-engine",
  "apex-quant-engine",
  "qrsip",
  "market-data-replay",
  "automated-trading-os",
  "billing-data-gateway",
  "context-engineering-labs",
  "stratlab",
];

const RED = "#ff3030";
const BLUE = "#7aa7ff";
const CYAN = "#35d6ff";
const DIM = "#6d819c";

function StageFrame({ code, caption, children }: { code: string; caption: string; children: ReactNode }) {
  return (
    <div className="cv-panel" style={{ padding: 0, overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          borderBottom: "1px solid var(--cv-edge)",
        }}
      >
        <span className="cv-label">{code}</span>
        <span className="cv-label" style={{ color: "var(--cv-red)" }}>SCHEMATIC</span>
      </div>
      <div style={{ padding: "16px 14px 18px" }}>
        {children}
        <p className="cv-label" style={{ marginTop: 14, lineHeight: 1.7, color: "var(--cv-dim)" }}>
          {caption}
        </p>
      </div>
    </div>
  );
}

function SvgCanvas({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 520 340"
      width="100%"
      role="img"
      aria-label={label}
      style={{ display: "block", overflow: "visible" }}
    >
      {children}
    </svg>
  );
}

function Cylinder({ x, y, label, sub, tone }: { x: number; y: number; label: string; sub: string; tone: "blue" | "red" }) {
  const c = tone === "red" ? RED : BLUE;
  return (
    <g>
      <rect x={x} y={y} width="96" height="56" fill={c} fillOpacity={0.08} stroke={c} strokeOpacity={0.55} />
      <ellipse cx={x + 48} cy={y + 56} rx="48" ry="12" fill={c} fillOpacity={0.12} stroke={c} strokeOpacity={0.5} />
      <ellipse cx={x + 48} cy={y} rx="48" ry="12" fill={c} fillOpacity={0.22} stroke={c} />
      <text x={x + 48} y={y + 4} textAnchor="middle" fill="#f4f8ff" fontSize="10" fontFamily="monospace" letterSpacing="1">
        {label}
      </text>
      <text x={x + 48} y={y + 82} textAnchor="middle" fill={DIM} fontSize="8" fontFamily="monospace" letterSpacing="1">
        {sub}
      </text>
    </g>
  );
}

function GraphNode({ x, y, label, tone = "blue" }: { x: number; y: number; label: string; tone?: "blue" | "red" }) {
  const c = tone === "red" ? RED : BLUE;
  return (
    <g>
      <circle cx={x} cy={y} r="25" fill="#091422" stroke={c} strokeOpacity={0.8} />
      <circle cx={x} cy={y} r="31" fill="none" stroke={c} strokeOpacity={0.18} strokeDasharray="3 5" />
      <text x={x} y={y + 3} textAnchor="middle" fill={c} fontSize="8" fontFamily="monospace" letterSpacing="1">
        {label}
      </text>
    </g>
  );
}

/** Eight project-specific compositions. */
function ProjectDiagram({ projectId }: { projectId: string }) {
  switch (projectId) {
    case "bustub-engine":
      return (
        <StageFrame
          code="BUSTUB / STORAGE → EXECUTION → ISOLATION"
          caption="Four independently verified subsystems above a waits-for cycle detector. 56/56 suites, ASan/UBSan clean."
        >
          <SvgCanvas label="BusTub four-pillar engine with deadlock detector">
            {[20, 140, 260, 380].map((x, i) => (
              <Cylinder
                key={x}
                x={x}
                y={64}
                label={["BUFFER POOL", "B+ TREE", "VOLCANO", "STRICT 2PL"][i]}
                sub={["P1 / LRU-K", "P2 / LATCH", "P3 / OPTIMIZER", "P4 / DEADLOCK"][i]}
                tone={i === 3 ? "red" : "blue"}
              />
            ))}
            {[116, 236, 356].map((x) => (
              <path key={x} className="cv-flow" d={`M${x} 92 L${x + 24} 92`} stroke={RED} strokeWidth="1.5" markerEnd="url(#cv-arrow-red)" />
            ))}
            <defs>
              <marker id="cv-arrow-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0 0 L6 3 L0 6 Z" fill={RED} />
              </marker>
            </defs>
            <path d="M120 180 L120 224 L260 224 L260 196 M400 180 L400 224 L300 224" fill="none" stroke={BLUE} strokeOpacity={0.5} />
            <GraphNode x={120} y={172} label="TXN A" />
            <GraphNode x={260} y={188} label="WAITS-FOR" tone="red" />
            <GraphNode x={400} y={172} label="TXN B" />
            <text x="260" y="278" textAnchor="middle" fill={DIM} fontSize="9" fontFamily="monospace" letterSpacing="2">
              DFS CYCLE DETECTION · YOUNGEST VICTIM ABORT
            </text>
          </SvgCanvas>
        </StageFrame>
      );

    case "apex-quant-engine":
      return (
        <StageFrame
          code="APEX / BACKTEST ORBITAL TRACE"
          caption="Deterministic replay over 11.9M+ bars and 5,867 completed simulated trades. Backtest, not live performance."
        >
          <SvgCanvas label="APEX orbital backtest equity trace">
            <ellipse cx="260" cy="164" rx="208" ry="78" fill="none" stroke={BLUE} strokeOpacity={0.38} transform="rotate(-16 260 164)" />
            <ellipse cx="260" cy="164" rx="158" ry="58" fill="none" stroke={BLUE} strokeOpacity={0.28} transform="rotate(-16 260 164)" />
            <ellipse cx="260" cy="164" rx="104" ry="36" fill="none" stroke={RED} strokeOpacity={0.4} transform="rotate(-16 260 164)" />
            <polyline
              points="30,262 80,244 130,250 180,208 230,214 280,166 330,176 380,126 430,134 486,84"
              fill="none"
              stroke={RED}
              strokeWidth="2.2"
              style={{ filter: "drop-shadow(0 0 6px rgba(255,48,48,0.6))" }}
            />
            {[
              [30, 262], [130, 250], [230, 214], [330, 176], [430, 134], [486, 84],
            ].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3" fill={CYAN} />)}
            <circle cx="260" cy="164" r="9" fill={RED} style={{ filter: "drop-shadow(0 0 12px rgba(255,48,48,0.8))" }} />
            <text x="36" y="30" fill={BLUE} fontSize="9" fontFamily="monospace" letterSpacing="2">RAW BAR FEED</text>
            <text x="330" y="300" fill={RED} fontSize="9" fontFamily="monospace" letterSpacing="2">EQUITY / SIMULATED</text>
            <text x="36" y="318" fill={DIM} fontSize="8" fontFamily="monospace" letterSpacing="1.5">DETERMINISTIC REPLAY · BTC / ETH / SOL</text>
          </SvgCanvas>
        </StageFrame>
      );

    case "qrsip":
      return (
        <StageFrame
          code="QRSIP / PROMOTION GRAPH"
          caption="Hypothesis → experiment → verification → artifact → report → promotion. 352 tests on deterministic fixtures; CI security validation."
        >
          <SvgCanvas label="QRSIP research promotion node graph">
            {[
              [70, 82, 190, 82], [190, 82, 310, 82], [310, 82, 430, 82],
              [310, 82, 350, 226], [430, 82, 350, 226], [350, 226, 170, 226],
            ].map(([x1, y1, x2, y2]) => (
              <line key={`${x1}-${x2}`} className="cv-flow" x1={x1} y1={y1} x2={x2} y2={y2} stroke={BLUE} strokeOpacity={0.45} strokeWidth="1.4" />
            ))}
            <GraphNode x={70} y={82} label="HYPOTHESIS" />
            <GraphNode x={190} y={82} label="EXPERIMENT" />
            <GraphNode x={310} y={82} label="VERIFY" tone="red" />
            <GraphNode x={430} y={82} label="ARTIFACT" />
            <GraphNode x={350} y={226} label="PROMOTE" tone="red" />
            <GraphNode x={170} y={226} label="REPORT" />
            <text x="260" y="304" textAnchor="middle" fill={DIM} fontSize="9" fontFamily="monospace" letterSpacing="2">
              GATE VERIFIES PROCESS INTEGRITY — NOT EDGE
            </text>
          </SvgCanvas>
        </StageFrame>
      );

    case "market-data-replay":
      return (
        <StageFrame
          code="MARKET-DATA-REPLAY / NINE STAGES"
          caption="Raw feed → analytics with point-in-time reads, exact decimal arithmetic and deterministic tie-breaking."
        >
          <SvgCanvas label="Nine-stage market data pipeline">
            {[
              "RAW FEED", "NORMALIZE", "TIME ALIGN",
              "DEDUPE", "REORDER", "TIE-BREAK",
              "EXACT DECIMAL", "POINT-IN-TIME", "ANALYTICS",
            ].map((label, i) => {
              const col = i % 3;
              const row = Math.floor(i / 3);
              const x = 26 + col * 166;
              const y = 34 + row * 96;
              const hot = i === 7;
              return (
                <g key={label}>
                  <rect
                    x={x}
                    y={y}
                    width="126"
                    height="44"
                    fill={hot ? RED : BLUE}
                    fillOpacity={hot ? 0.14 : 0.07}
                    stroke={hot ? RED : BLUE}
                    strokeOpacity={hot ? 0.9 : 0.5}
                  />
                  <text x={x + 63} y={y + 19} textAnchor="middle" fill={hot ? RED : "#f4f8ff"} fontSize="8" fontFamily="monospace" letterSpacing="1">
                    {String(i + 1).padStart(2, "0")}
                  </text>
                  <text x={x + 63} y={y + 34} textAnchor="middle" fill={hot ? RED : BLUE} fontSize="9" fontFamily="monospace">
                    {label}
                  </text>
                </g>
              );
            })}
            {[152, 318].map((x) => (
              <path key={x} className="cv-flow" d={`M${x} 56 L${x + 14} 56`} stroke={RED} strokeWidth="1.5" />
            ))}
            <text x="260" y="326" textAnchor="middle" fill={DIM} fontSize="9" fontFamily="monospace" letterSpacing="2">
              CONSUMERS CANNOT OPT OUT OF POINT-IN-TIME READS
            </text>
          </SvgCanvas>
        </StageFrame>
      );

    case "automated-trading-os":
      return (
        <StageFrame
          code="AUTOMATED-TRADING-OS / ORDER OF OPERATIONS"
          caption="One-way information flow: HTF context → MTF structure → LTF timing → pre-trade risk gate."
        >
          <SvgCanvas label="Layered trading pipeline with pre-trade risk gate">
            {[
              { label: "HTF DIRECTION", color: BLUE, y: 44 },
              { label: "MTF STRUCTURE", color: BLUE, y: 100 },
              { label: "LTF TRIGGER", color: BLUE, y: 156 },
              { label: "RISK GATE / 1% CAP · 1:4 R:R", color: RED, y: 212 },
            ].map((bar) => (
              <g key={bar.label}>
                <rect x="54" y={bar.y} width="300" height="38" fill={bar.color} fillOpacity={0.09} stroke={bar.color} strokeOpacity={0.65} />
                <text x="204" y={bar.y + 23} textAnchor="middle" fill={bar.color} fontSize="10" fontFamily="monospace" letterSpacing="1">
                  {bar.label}
                </text>
              </g>
            ))}
            {[82, 138, 194].map((y) => (
              <path key={y} d={`M204 ${y} L204 ${y + 18}`} stroke={RED} strokeWidth="1.4" />
            ))}
            <path d="M354 231 L430 231" stroke={RED} strokeWidth="1.6" />
            <circle cx="454" cy="231" r="30" fill="#091422" stroke={CYAN} strokeOpacity={0.7} />
            <text x="454" y="234" textAnchor="middle" fill={CYAN} fontSize="8" fontFamily="monospace">ADMIT</text>
            <text x="260" y="304" textAnchor="middle" fill={DIM} fontSize="9" fontFamily="monospace" letterSpacing="1.5">
              FAILING SETUPS NEVER REACH EXECUTION
            </text>
          </SvgCanvas>
        </StageFrame>
      );

    case "billing-data-gateway":
      return (
        <StageFrame
          code="BILLING-DATA-GATEWAY / CONVERGENCE BUS"
          caption="Zero-dependency C11 utility normalizing AWS CUR 2.0 and Azure exports into one intermediate financial model through memory page projection. Throughput is self-benchmarked."
        >
          <SvgCanvas label="Parallel ingestion lanes converging into an output bus">
            {[52, 100, 148, 196, 244].map((y, i) => (
              <g key={y}>
                <path d={`M28 ${y} L300 ${y} L360 148`} className="cv-trace" fill="none" stroke={i % 2 ? BLUE : CYAN} strokeOpacity={0.5} />
                <circle cx={70 + i * 18} cy={y} r="3" fill={RED} />
                <circle cx={150 + i * 10} cy={y} r="2" fill={CYAN} />
                <text x="28" y={y - 8} fill={DIM} fontSize="7" fontFamily="monospace">LANE 0{i + 1}</text>
              </g>
            ))}
            <rect x="356" y="120" width="86" height="56" fill={RED} fillOpacity={0.1} stroke={RED} strokeOpacity={0.8} />
            <text x="399" y="143" textAnchor="middle" fill={RED} fontSize="9" fontFamily="monospace">OUTPUT</text>
            <text x="399" y="160" textAnchor="middle" fill="#f4f8ff" fontSize="8" fontFamily="monospace">BUS</text>
            <path d="M442 148 L488 148" stroke={RED} strokeWidth="1.6" />
            <text x="260" y="304" textAnchor="middle" fill={DIM} fontSize="9" fontFamily="monospace" letterSpacing="1.5">
              PARALLEL INGEST · ZERO-DEPENDENCY C11
            </text>
          </SvgCanvas>
        </StageFrame>
      );

    case "context-engineering-labs":
      return (
        <StageFrame
          code="CONTEXT-ENGINEERING-LABS / SIX LAYERS"
          caption="One public MIT-licensed repository, six source directories, 72/72 tests reproduced from a fresh clone."
        >
          <div className="cv-hex-grid">
            {[
              ["01", "KNOWLEDGE"], ["02", "PROTOCOL"], ["03", "DISTRIBUTION"],
              ["04", "ORCHESTRATION"], ["05", "OBSERVABILITY"], ["06", "BOUNDARY"],
            ].map(([index, label]) => (
              <CvHexTile key={index} index={index} label={label} />
            ))}
          </div>
        </StageFrame>
      );

    case "stratlab":
      return (
        <StageFrame
          code="STRATLAB / HISTORICAL REPLAY"
          caption="Harvard CS50x final capstone: deterministic backtesting, portfolio analytics and interactive visualization."
        >
          <SvgCanvas label="StratLab deterministic backtest equity curve">
            {[60, 120, 180, 240, 300].map((y) => (
              <line key={y} x1="36" y1={y} x2="492" y2={y} stroke={BLUE} strokeOpacity={0.14} />
            ))}
            {[36, 150, 264, 378, 492].map((x) => (
              <line key={x} x1={x} y1="52" x2={x} y2="300" stroke={BLUE} strokeOpacity={0.1} />
            ))}
            <polygon
              points="40,286 100,272 160,244 220,252 280,196 340,176 400,128 460,104 490,70 490,300 40,300"
              fill={RED}
              fillOpacity={0.1}
            />
            <polyline
              points="40,286 100,272 160,244 220,252 280,196 340,176 400,128 460,104 490,70"
              fill="none"
              stroke={RED}
              strokeWidth="2.2"
              style={{ filter: "drop-shadow(0 0 6px rgba(255,48,48,0.55))" }}
            />
            {[[160, 244], [280, 196], [400, 128], [490, 70]].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="3.5" fill={CYAN} />
            ))}
            <text x="40" y="326" fill={DIM} fontSize="9" fontFamily="monospace" letterSpacing="1.5">
              DETERMINISTIC HISTORICAL SIMULATION · NOT LIVE TRADING
            </text>
          </SvgCanvas>
        </StageFrame>
      );

    default:
      return (
        <StageFrame code="SYSTEM SCHEMATIC" caption="Architecture and evidence are listed alongside.">
          <SvgCanvas label="Project node schematic">
            <GraphNode x={260} y={164} label="SYSTEM" tone="red" />
          </SvgCanvas>
        </StageFrame>
      );
  }
}

export function CvFlagshipProjects() {
  const projects = getAllWorks().filter((w) => FLAGSHIP_IDS.includes(w.id));
  const [selected, setSelected] = useState(0);
  const project = projects[selected] ?? projects[0];

  if (!project) return null;

  const go = (next: number) => {
    setSelected((next + projects.length) % projects.length);
  };

  const links = project.linksList.map((l) => ({
    label: l.label,
    href: l.href,
    external: l.href.startsWith("http"),
  }));
  if (project.github && !links.some((l) => l.href === project.github)) {
    links.unshift({ label: "GITHUB REPOSITORY", href: project.github, external: true });
  }

  return (
    <CvChapterSection
      id="flagship-projects"
      number="09"
      title="Selected Projects"
      kicker="Systems and evidence"
      lead="Eight systems, presented one at a time. Each shows the engineering problem, the architecture, the implementation and the evidence as recorded in the source data."
      tone="signal"
      visual={<ProjectDiagram projectId={project.id} />}
    >
      <div style={{ display: "grid", gap: 22 }}>
        <div className="cv-panel" style={{ padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <span className="cv-label">PROJECT INDEX / {String(projects.length).padStart(2, "0")} SYSTEMS</span>
            <span className="cv-label" style={{ color: "var(--cv-red)" }}>
              {String(selected + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
          <div
            role="group"
            aria-label="Select a flagship project"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") { event.preventDefault(); go(selected + 1); }
              if (event.key === "ArrowLeft") { event.preventDefault(); go(selected - 1); }
            }}
            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}
          >
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={i === selected}
                aria-label={`Show ${p.shortTitle}`}
                onClick={() => setSelected(i)}
                className="cv-action subtle"
                style={{
                  minHeight: 36,
                  padding: "0 11px",
                  fontSize: 10,
                  ...(i === selected
                    ? { borderColor: "var(--cv-red)", color: "var(--cv-red)", background: "rgba(255,48,48,0.10)" }
                    : {}),
                }}
              >
                {String(i + 1).padStart(2, "0")} {p.shortTitle}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16, alignItems: "center", flexWrap: "wrap" }}>
            <button type="button" className="cv-action subtle" style={{ minHeight: 38, fontSize: 10 }} onClick={() => go(selected - 1)}>
              ← PREVIOUS
            </button>
            <button type="button" className="cv-action subtle" style={{ minHeight: 38, fontSize: 10 }} onClick={() => go(selected + 1)}>
              NEXT →
            </button>
            <span className="cv-label" style={{ marginLeft: "auto" }}>← / → TO NAVIGATE</span>
          </div>
        </div>

        <article key={project.id} style={{ display: "grid", gap: 18 }}>
          <header style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <span className="cv-label" style={{ lineHeight: 1.6, color: "var(--cv-blue)" }}>
                {project.categoryLabel}
              </span>
              <CvEvidenceBadge level={project.status} />
            </div>
            <h3 style={{ fontSize: "clamp(1.9rem, 3.4vw, 3rem)", lineHeight: 1.02, letterSpacing: "-0.03em", color: "var(--cv-ink)" }}>
              {project.shortTitle}
            </h3>
            <p className="cv-statement">{project.thesis}</p>
            {project.statusNote ? (
              <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--cv-dim)" }}>{project.statusNote}</p>
            ) : null}
          </header>

          <hr className="cv-rule" />

          <section style={{ display: "grid", gap: 8 }}>
            <span className="cv-label">WHAT IT IS</span>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--cv-muted)" }}>{project.summary}</p>
          </section>

          {project.tags.length > 0 ? (
            <section style={{ display: "grid", gap: 10 }}>
              <span className="cv-label">CLASSIFICATION</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {project.tags.map((t) => <CvTechPill key={`tag-${t}`} label={t} tone="red" />)}
              </div>
            </section>
          ) : null}

          {project.engineeringChallenges.length > 0 ? (
            <section style={{ display: "grid", gap: 10 }}>
              <span className="cv-label">ENGINEERING PROBLEM → RESOLUTION</span>
              <div className="cv-list" style={{ gap: 14 }}>
                {project.engineeringChallenges.map((c, i) => (
                  <div className="cv-list-item" key={i}>
                    <span>{c.challenge} <em style={{ color: "var(--cv-cyan)", fontStyle: "normal" }}> → {c.solution}</em></span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {project.keyCapabilities.length > 0 ? (
            <section style={{ display: "grid", gap: 10 }}>
              <span className="cv-label">ARCHITECTURE / IMPLEMENTATION</span>
              <div className="cv-list">
                {project.keyCapabilities.map((cap, i) => (
                  <div className="cv-list-item" key={i}>
                    <span>
                      <strong style={{ color: "var(--cv-ink)", fontWeight: 600 }}>{cap.title}</strong>
                      {cap.desc ? <span style={{ color: "var(--cv-muted)" }}> — {cap.desc}</span> : null}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {project.metrics.length > 0 ? (
            <section style={{ display: "grid", gap: 12 }}>
              <span className="cv-label">MEASURED / VERIFIED RESULTS</span>
              <div style={{ display: "grid", gap: 12 }}>
                {project.metrics.map((m, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(90px, auto) 1fr", gap: 14, alignItems: "baseline" }}>
                    <span className="num-mono" style={{ fontSize: 18, color: "var(--cv-red)" }}>{m.value}</span>
                    <span style={{ fontSize: 13, color: "var(--cv-muted)" }}>
                      {m.label}
                      {m.context ? (
                        <em style={{ display: "block", marginTop: 3, fontSize: 11, fontStyle: "normal", color: "var(--cv-dim)" }}>
                          {m.context}
                        </em>
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {project.evidenceAndResults.length > 0 ? (
            <section style={{ display: "grid", gap: 10 }}>
              <span className="cv-label">VERIFIED EVIDENCE / {project.evidenceLabel}</span>
              <div className="cv-list">
                {project.evidenceAndResults.map((e, i) => (
                  <div className="cv-list-item" key={i}><span>{e}</span></div>
                ))}
              </div>
            </section>
          ) : null}

          <section style={{ display: "grid", gap: 10 }}>
            <span className="cv-label">TECHNOLOGY SURFACE</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {project.technologies.map((t) => <CvTechPill key={t} label={t} />)}
            </div>
          </section>

          <section style={{ display: "grid", gap: 12 }}>
            <span className="cv-label">LINKS &amp; ARTIFACTS</span>
            <CvLinkList links={links} />
          </section>
        </article>
      </div>
    </CvChapterSection>
  );
}
