"use client";

import { researchEntries, type ResearchEntry } from "@/data/research";
import { CvChapterSection } from "@/components/cv/cv-layout";
import { CvMeter } from "@/components/cv/cv-visuals";

/**
 * Research and development.
 * Scientific composition: a wave-mesh field and research tracks on the left,
 * investigation records on the right. Every recorded field is preserved.
 */

const RED = "#ff3030";
const BLUE = "#7aa7ff";
const CYAN = "#35d6ff";
const DIM = "#6d819c";

function wavePath(baseY: number, amplitude: number, phase: number, cycles: number) {
  const points: string[] = [];
  for (let x = 0; x <= 420; x += 12) {
    const y = baseY + amplitude * Math.sin((x / 420) * Math.PI * 2 * cycles + phase);
    points.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`);
  }
  return points.join(" ");
}

function WaveMesh() {
  const redWaves = [
    wavePath(110, 26, 0, 2),
    wavePath(145, 34, 0.7, 2),
    wavePath(180, 22, 1.4, 2),
    wavePath(210, 30, 2.1, 2),
  ];
  const blueWaves = [
    wavePath(96, 30, 1.1, 2.4),
    wavePath(132, 24, 1.9, 2.4),
    wavePath(168, 36, 2.6, 2.4),
    wavePath(204, 20, 3.3, 2.4),
  ];

  return (
    <div className="cv-panel" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid var(--cv-edge)" }}>
        <span className="cv-label">Research map</span>
        <span className="cv-label" style={{ color: "var(--cv-red)" }}>RESEARCH</span>
      </div>
      <div style={{ padding: "10px 12px 16px" }}>
        <svg viewBox="0 0 420 300" width="100%" role="img" aria-label="Red and blue research wave mesh" style={{ display: "block" }}>
          {[60, 120, 180, 240].map((y) => <line key={y} x1="0" y1={y} x2="420" y2={y} stroke={BLUE} strokeOpacity={0.1} />)}
          {[70, 140, 210, 280, 350].map((x) => <line key={x} x1={x} y1="40" x2={x} y2="260" stroke={BLUE} strokeOpacity={0.08} />)}
          {blueWaves.map((d, i) => (
            <path key={`b${i}`} className={i === 1 ? "cv-flow" : undefined} d={d} fill="none" stroke={i % 2 ? CYAN : BLUE} strokeOpacity={0.3 + i * 0.08} strokeWidth="1.2" />
          ))}
          {redWaves.map((d, i) => (
            <path
              key={`r${i}`}
              className={i === 1 ? "cv-trace" : undefined}
              d={d}
              fill="none"
              stroke={RED}
              strokeOpacity={0.38 + i * 0.12}
              strokeWidth={i === 2 ? 2 : 1.3}
              style={i === 2 ? { filter: "drop-shadow(0 0 6px rgba(255,48,48,0.55))" } : undefined}
            />
          ))}
          {[70, 210, 350].map((x, i) => {
            const y = 110 + 26 * Math.sin((x / 420) * Math.PI * 4);
            return <circle key={x} cx={x} cy={y} r={i === 1 ? 4.5 : 3} fill={i === 1 ? RED : CYAN} />;
          })}
          <text x="10" y="286" fill={DIM} fontSize="9" fontFamily="monospace" letterSpacing="1.5">
            QUESTION → HYPOTHESIS → METHOD → EVIDENCE → LIMIT
          </text>
        </svg>
      </div>
    </div>
  );
}

function ResearchTracks() {
  const categories = Array.from(new Set(researchEntries.map((entry) => entry.category)));
  const max = Math.max(...categories.map((c) => researchEntries.filter((e) => e.category === c).length));

  return (
    <div className="cv-panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="cv-label">Topics</span>
        <span className="num-mono" style={{ fontSize: 14, color: "var(--cv-blue)" }}>{String(categories.length).padStart(2, "0")}</span>
      </div>
      <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
        {categories.map((category, i) => {
          const count = researchEntries.filter((entry) => entry.category === category).length;
          return (
            <div key={category} style={{ display: "grid", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                <span style={{ fontSize: 12, color: "var(--cv-ink)", lineHeight: 1.4 }}>
                  <span className="cv-label" style={{ color: "var(--cv-red)", marginRight: 8 }}>{String(i + 1).padStart(2, "0")}</span>
                  {category}
                </span>
                <span className="num-mono" style={{ fontSize: 11, color: "var(--cv-dim)" }}>{String(count).padStart(2, "0")}</span>
              </div>
              <CvMeter value={(count / max) * 100} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <span className="cv-label" style={color ? { color } : undefined}>{label}</span>
      <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7, color: "var(--cv-muted)" }}>{value}</p>
    </div>
  );
}

function InvestigationRecord({ entry, index }: { entry: ResearchEntry; index: number }) {
  const tone = entry.status === "VERIFIED" ? "green" : entry.status === "ONGOING" ? "red" : undefined;

  return (
    <article className="cv-panel" style={{ display: "grid", gap: 0 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
        <div style={{ minWidth: 0 }}>
          <span className="cv-label" style={{ color: "var(--cv-red)" }}>
            INVESTIGATION {String(index).padStart(2, "0")} / {entry.category}
          </span>
          <h3 style={{ marginTop: 8, fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", lineHeight: 1.25, color: "var(--cv-ink)", letterSpacing: "-0.01em" }}>
            {entry.title}
          </h3>
        </div>
        <span className="cv-status" data-tone={tone}>{entry.status}</span>
      </header>

      <hr className="cv-rule" style={{ marginTop: 18 }} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px 26px", marginTop: 18 }}>
        <Field label="QUESTION" value={entry.question} color={BLUE} />
        <Field label="HYPOTHESIS" value={entry.hypothesis} color={CYAN} />
      </div>

      <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
        <Field label="METHOD" value={entry.method} color={BLUE} />
        <Field label="EVIDENCE" value={entry.evidence} color={DIM} />
        <Field label="RESULT" value={entry.result} color="var(--cv-ink)" />
        <Field label="LIMITATION" value={entry.limitation} color={RED} />
        <Field label="CONCLUSION" value={entry.conclusion} color="var(--cv-ink)" />
      </div>

      {entry.relatedProject ? (
        <footer style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginTop: 20, paddingTop: 14, borderTop: "1px solid var(--cv-edge)" }}>
          <span className="cv-label">Project</span>
          <a className="cv-link" href={`/works/${entry.relatedProject}`}>
            {entry.relatedProject} ↗
          </a>
        </footer>
      ) : null}
    </article>
  );
}

export function CvResearch() {
  return (
    <CvChapterSection
      id="research"
      number="09"
      title="Research"
      kicker="Research"
      lead="Registered questions, stated methods, recorded results and explicit limitations. An unfinished study is marked ongoing; a structural guarantee is not presented as a profitable strategy."
      tone="research"
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 32 }}>
        <aside style={{ flex: "1 1 300px", minWidth: 0, display: "grid", gap: 20 }}>
          <WaveMesh />
          <ResearchTracks />
          <p className="cv-label" style={{ lineHeight: 1.8, color: "var(--cv-dim)" }}>
            {String(researchEntries.length).padStart(2, "0")} INVESTIGATIONS · TOPICS FROM THE RECORDED CATEGORIES
          </p>
        </aside>

        <div style={{ flex: "2 1 520px", minWidth: 0, display: "grid", gap: 20 }}>
          {researchEntries.map((entry, i) => <InvestigationRecord key={entry.id} entry={entry} index={i + 1} />)}
        </div>
      </div>
    </CvChapterSection>
  );
}
