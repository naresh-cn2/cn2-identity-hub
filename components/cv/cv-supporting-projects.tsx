"use client";

import { getAllWorks, type ComprehensiveWorkItem } from "@/data/works";
import { CvChapterSection } from "@/components/cv/cv-layout";
import { CvMeter, CvTechPill } from "@/components/cv/cv-visuals";

/**
 * Chapter 10 — Supporting Portfolio.
 * A dense engineering index grouped by the real lifecycle state in each
 * project's `status` string. No status is substituted for another.
 */

const SUPPORTING_IDS = [
  "ifm-costintel",
  "forex-platform",
  "crypto-platform",
  "settle-iq",
  "b2b-lead-prospector",
  "forge-stream",
  "zero-latency-engine",
  "forge-core",
  "forge-engine",
  "forge-workspace",
  "forge-ipc",
  "axiom-probe",
  "axiom-protocol-release",
  "axiom-protocol",
  "hydra-core",
  "axiom-json",
  "omni-ledger-engine",
  "cloud-cost-engine",
];

/* The catalogue records this one as `settleiq`; the CV index keeps its
 * published slug. Both point at the same verified data record. */
const ID_ALIASES: Record<string, string> = { "settle-iq": "settleiq" };

type StatusGroup = "Completed" | "Verified" | "Active development" | "Research-experimental" | "Private-unpublished";

const GROUP_ORDER: StatusGroup[] = [
  "Active development",
  "Completed",
  "Verified",
  "Research-experimental",
  "Private-unpublished",
];

const GROUP_COLOR: Record<StatusGroup, string | undefined> = {
  Completed: "#5fe0a8",
  Verified: "var(--cv-cyan)",
  "Active development": undefined,
  "Research-experimental": "#c792ff",
  "Private-unpublished": "var(--cv-dim)",
};

function statusGroup(status: string): StatusGroup {
  const s = status.toUpperCase();
  if (/PRIVATE|UNPUBLISHED|NOT PUBLISHED|ACCESS RESTRICTED/.test(s)) return "Private-unpublished";
  if (/PAPER|RESEARCH|EXPERIMENT|ALPHA|PROTOTYPE|SIMULATION/.test(s)) return "Research-experimental";
  if (/VERIFIED|REPRODUCED|TEST SUITE|100%/.test(s)) return "Verified";
  if (/RELEASED|PRODUCTION|COMPLETED/.test(s)) return "Completed";
  return "Active development";
}

function StatusDot({ group }: { group: StatusGroup }) {
  return (
    <span className="cv-status" data-tone={group === "Active development" ? "red" : undefined} style={GROUP_COLOR[group] ? { color: GROUP_COLOR[group] } : undefined}>
      {group}
    </span>
  );
}

function ProjectRow({ project, index }: { project: ComprehensiveWorkItem; index: number }) {
  const group = statusGroup(project.status);
  const links = project.linksList.map((l) => ({ label: l.label, href: l.href, external: l.href.startsWith("http") }));
  if (project.github && !links.some((l) => l.href === project.github)) {
    links.unshift({ label: "GITHUB REPOSITORY", href: project.github, external: true });
  }

  return (
    <div className="cv-project-row">
      <span className="cv-project-index">{String(index).padStart(2, "0")}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h4 style={{ fontSize: 15, fontWeight: 600, color: "var(--cv-ink)", letterSpacing: "0.02em" }}>
            {project.shortTitle}
          </h4>
          <StatusDot group={group} />
        </div>
        <p className="cv-label" style={{ marginTop: 4, color: "var(--cv-dim)" }}>{project.status}</p>
        <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: "var(--cv-muted)" }}>{project.summary}</p>

        {project.tags.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
            {project.tags.map((t) => <CvTechPill key={`tag-${t}`} label={t} />)}
          </div>
        ) : null}
        {project.technologies.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
            {project.technologies.map((t) => <CvTechPill key={`tech-${t}`} label={t} tone="cyan" />)}
          </div>
        ) : null}

        {project.keyCapabilities.length > 0 ? (
          <p style={{ marginTop: 10, fontSize: 11.5, lineHeight: 1.6, color: "var(--cv-muted)" }}>
            <span className="cv-label" style={{ color: "var(--cv-red)" }}>CAPABILITIES </span>
            {project.keyCapabilities.map((c) => c.title).join(" · ")}
          </p>
        ) : null}
        {project.metrics.length > 0 ? (
          <p style={{ marginTop: 5, fontSize: 11.5, lineHeight: 1.6, color: "var(--cv-muted)" }}>
            <span className="cv-label" style={{ color: "var(--cv-red)" }}>METRICS </span>
            {project.metrics.map((m) => `${m.value} ${m.label}${m.context ? ` — ${m.context}` : ""}`).join(" · ")}
          </p>
        ) : null}
        {project.evidenceAndResults.length > 0 ? (
          <p style={{ marginTop: 5, fontSize: 11.5, lineHeight: 1.6, color: "var(--cv-muted)" }}>
            <span className="cv-label" style={{ color: "var(--cv-red)" }}>EVIDENCE </span>
            {project.evidenceAndResults.join(" ")}
          </p>
        ) : null}

        {links.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", marginTop: 10 }}>
            {links.map((link) => (
              <a key={link.href} className="cv-link" href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>
                {link.label} {link.external ? "↗" : "→"}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function LandscapeVisual({ projects }: { projects: ComprehensiveWorkItem[] }) {
  const counts = GROUP_ORDER.map((group) => ({ group, count: projects.filter((p) => statusGroup(p.status) === group).length }));
  const dots = projects.map((p, i) => ({
    id: p.id,
    x: 48 + (i % 6) * 84,
    y: 46 + Math.floor(i / 6) * 86,
    color: GROUP_COLOR[statusGroup(p.status)] ?? "var(--cv-red)",
  }));

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div className="cv-panel">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
          <span className="cv-label">LIFECYCLE DISTRIBUTION</span>
          <span className="num-mono" style={{ color: "var(--cv-red)", fontSize: 20 }}>{String(projects.length).padStart(2, "0")}</span>
        </div>
        <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
          {counts.map(({ group, count }) => (
            <div key={group} style={{ display: "grid", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <StatusDot group={group} />
                <span className="num-mono" style={{ fontSize: 12, color: "var(--cv-ink)" }}>{String(count).padStart(2, "0")}</span>
              </div>
              <CvMeter value={(count / Math.max(1, projects.length)) * 100} />
            </div>
          ))}
        </div>
      </div>

      <div className="cv-panel">
        <span className="cv-label">BUILD CONSTELLATION / ONE NODE PER PROJECT</span>
        <svg viewBox="0 0 520 280" width="100%" role="img" aria-label="Supporting portfolio constellation" style={{ display: "block", marginTop: 14 }}>
          {dots.map((d, i) => (
            <g key={d.id}>
              {i > 0 ? <line x1={dots[i - 1].x} y1={dots[i - 1].y} x2={d.x} y2={d.y} stroke="rgba(122,167,255,0.22)" strokeWidth="1" /> : null}
              <circle cx={d.x} cy={d.y} r="5" fill={d.color} style={{ filter: "drop-shadow(0 0 6px rgba(122,167,255,0.5))" }} />
            </g>
          ))}
        </svg>
        <p className="cv-label" style={{ marginTop: 12, lineHeight: 1.7, color: "var(--cv-dim)" }}>
          Colour follows the recorded status string. Private and unpublished builds are never presented as active or verified.
        </p>
      </div>
    </div>
  );
}

export function CvSupportingProjects() {
  const all = getAllWorks();
  const projects = SUPPORTING_IDS
    .map((id) => all.find((w) => w.id === id) ?? all.find((w) => w.id === (ID_ALIASES[id] ?? "")))
    .filter((item): item is ComprehensiveWorkItem => Boolean(item));
  const numbered = new Map(projects.map((p, i) => [p.id, i + 1]));

  return (
    <CvChapterSection
      id="supporting-projects"
      number="10"
      title="Supporting Portfolio"
      kicker="CHAPTER 10 / ENGINEERING INDEX"
      lead="A dense index of additional builds. Each state label is derived from the project's own status string — completed, verified, active development, research-experimental and private-unpublished are kept distinct."
      tone="research"
      visual={<LandscapeVisual projects={projects} />}
    >
      <div style={{ display: "grid", gap: 18 }}>
        <div className="cv-panel" style={{ padding: 16 }}>
          <span className="cv-label">STATUS LEGEND</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 18px", marginTop: 12 }}>
            {GROUP_ORDER.map((group) => <StatusDot key={group} group={group} />)}
          </div>
        </div>

        {GROUP_ORDER.map((group) => {
          const items = projects.filter((p) => statusGroup(p.status) === group);
          if (items.length === 0) return null;
          return (
            <section key={group} style={{ display: "grid" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid var(--cv-edge)" }}>
                <span className="cv-label" style={{ color: GROUP_COLOR[group] ?? "var(--cv-red)" }}>
                  {group.toUpperCase()}
                </span>
                <span className="num-mono" style={{ fontSize: 12, color: "var(--cv-dim)" }}>{String(items.length).padStart(2, "0")}</span>
              </div>
              {items.map((p) => <ProjectRow key={p.id} project={p} index={numbered.get(p.id) ?? 0} />)}
            </section>
          );
        })}
      </div>
    </CvChapterSection>
  );
}
