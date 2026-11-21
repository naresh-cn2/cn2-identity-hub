"use client";

import { credentials, credentialBadges, type CredentialRecord } from "@/data/credentials";
import { CvChapterSection, CvEvidenceBadge } from "@/components/cv/cv-layout";

/**
 * Certifications — a featured credential followed by a verification ledger.
 * Only genuine issued records from @/data/credentials appear here.
 */

const issued = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Date not printed";

function LaurelMark() {
  const leaves = Array.from({ length: 6 }, (_, i) => {
    const t = i / 5;
    return { y: 118 - t * 78, x: 47 - t * 6 + Math.sin(t * 3) * 3, rotation: -42 + t * 24 };
  });
  return (
    <svg viewBox="0 0 160 160" width="118" height="118" aria-hidden="true" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id="cv-laurel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#35d6ff" />
          <stop offset="100%" stopColor="#7aa7ff" />
        </linearGradient>
      </defs>
      <path d="M47 124 C30 96 30 58 47 34" fill="none" stroke="rgba(122,167,255,0.5)" strokeWidth="1" />
      <path d="M113 124 C130 96 130 58 113 34" fill="none" stroke="rgba(122,167,255,0.5)" strokeWidth="1" />
      {leaves.map((leaf, i) => (
        <g key={i}>
          <ellipse
            cx={leaf.x}
            cy={leaf.y}
            rx="5"
            ry="12"
            fill="none"
            stroke="url(#cv-laurel)"
            strokeWidth="1"
            transform={`rotate(${leaf.rotation} ${leaf.x} ${leaf.y})`}
          />
          <ellipse
            cx={160 - leaf.x}
            cy={leaf.y}
            rx="5"
            ry="12"
            fill="none"
            stroke="url(#cv-laurel)"
            strokeWidth="1"
            transform={`rotate(${-leaf.rotation} ${160 - leaf.x} ${leaf.y})`}
          />
        </g>
      ))}
      <circle cx="80" cy="80" r="40" fill="rgba(9,20,36,0.9)" stroke="rgba(53,214,255,0.5)" />
      <circle cx="80" cy="80" r="34" fill="none" stroke="rgba(255,48,48,0.4)" strokeDasharray="2 4" />
      <path
        d="M80 56 l6.6 14.6 16 2 -11.9 10.8 3.3 15.8L80 91.7 66 99.2l3.3-15.8L57.4 72.6l16-2z"
        fill="rgba(255,48,48,0.85)"
      />
    </svg>
  );
}

function AwardGlyph() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
      <circle cx="20" cy="16" r="11" fill="none" stroke="rgba(53,214,255,0.8)" strokeWidth="1.4" />
      <path d="M13 25 l-3 12 10-5 10 5 -3-12" fill="none" stroke="rgba(255,48,48,0.85)" strokeWidth="1.4" />
      <path d="M20 11 l1.7 3.6 4 .5 -3 2.8 .8 4 -3.5-1.9 -3.5 1.9 .8-4 -3-2.8 4-.5z" fill="#7aa7ff" />
    </svg>
  );
}

function CredentialLattice({ count }: { count: number }) {
  const ticks = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    return {
      x: 260 + Math.cos(angle) * 196,
      y: 260 + Math.sin(angle) * 196,
      innerX: 260 + Math.cos(angle) * 168,
      innerY: 260 + Math.sin(angle) * 168,
      major: i % 3 === 0,
    };
  });
  return (
    <div
      style={{
        border: "1px solid var(--cv-edge)",
        background: "linear-gradient(180deg, rgba(9,20,36,0.6), rgba(3,7,13,0.2))",
        padding: 18,
      }}
    >
      <svg viewBox="0 0 520 520" width="100%" role="img" aria-label="Verification lattice" style={{ display: "block" }}>
        <defs>
          <radialGradient id="cv-cert-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(53,214,255,0.16)" />
            <stop offset="100%" stopColor="rgba(53,214,255,0)" />
          </radialGradient>
          <linearGradient id="cv-cert-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff3030" />
            <stop offset="100%" stopColor="#7aa7ff" />
          </linearGradient>
        </defs>
        <circle cx="260" cy="260" r="228" fill="url(#cv-cert-halo)" />
        <circle cx="260" cy="260" r="196" fill="none" stroke="rgba(122,167,255,0.22)" strokeDasharray="1 6" />
        <circle cx="260" cy="260" r="150" fill="none" stroke="url(#cv-cert-ring)" strokeWidth="1" opacity="0.5" />
        <circle cx="260" cy="260" r="104" fill="none" stroke="rgba(53,214,255,0.28)" />
        {ticks.map((tick, i) => (
          <g key={i}>
            <line
              x1={tick.innerX}
              y1={tick.innerY}
              x2={tick.x}
              y2={tick.y}
              stroke={tick.major ? "#ff3030" : "rgba(122,167,255,0.5)"}
              strokeWidth={tick.major ? 2 : 1}
            />
            <circle cx={tick.x} cy={tick.y} r={tick.major ? 5 : 3} fill={tick.major ? "#ff3030" : "#35d6ff"} />
          </g>
        ))}
        <text x="260" y="256" textAnchor="middle" fill="#f4f8ff" fontSize="38" fontFamily="ui-monospace, monospace">
          {String(count).padStart(2, "0")}
        </text>
        <text x="260" y="282" textAnchor="middle" fill="#6d819c" fontSize="9" letterSpacing="3" fontFamily="ui-monospace, monospace">
          VERIFIED RECORDS
        </text>
        <text x="260" y="496" textAnchor="middle" fill="#6d819c" fontSize="9" letterSpacing="2" fontFamily="ui-monospace, monospace">
          ISSUER LINK · CERTIFICATE DOCUMENT
        </text>
      </svg>
    </div>
  );
}

function CredentialRow({ cert, position }: { cert: CredentialRecord; position: number }) {
  return (
    <div className="cv-project-row">
      <span className="cv-project-index">{String(position).padStart(2, "0")}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
          <h4 style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 13, lineHeight: 1.35, color: "var(--cv-ink)" }}>
            {cert.program}
          </h4>
          <CvEvidenceBadge level={cert.state} />
        </div>
        <p className="cv-label" style={{ marginTop: 6, lineHeight: 1.5 }}>
          {cert.provider} · Issued {issued(cert.date)}
        </p>
        <p style={{ marginTop: 8, fontSize: 12, color: "var(--cv-muted)", lineHeight: 1.6 }}>{cert.learned}</p>
        <p style={{ marginTop: 6, fontSize: 11, color: "var(--cv-dim)", lineHeight: 1.55 }}>{cert.assessment}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
          {cert.skills.map((skill) => (
            <span key={skill} className="cv-pill" style={{ minHeight: 22, padding: "2px 8px", fontSize: 9 }}>
              {skill}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 10 }}>
          {cert.verificationUrl ? (
            <a className="cv-link" href={cert.verificationUrl} target="_blank" rel="noopener noreferrer">Verify ↗</a>
          ) : null}
          {cert.certificateUrl ? (
            <a className="cv-link" href={cert.certificateUrl} target="_blank" rel="noopener noreferrer">Certificate ↗</a>
          ) : null}
          {!cert.verificationUrl && !cert.certificateUrl && cert.certificateImage ? (
            <a className="cv-link" href={cert.certificateImage} target="_blank" rel="noopener noreferrer">Certificate image ↗</a>
          ) : null}
        </div>
        {cert.credentialId ? (
          <p className="cv-label" style={{ marginTop: 8, fontSize: 9, wordBreak: "break-all" }}>
            Credential ID: {cert.credentialId}
          </p>
        ) : null}
        {cert.notes && cert.notes.length > 0 ? (
          <p style={{ marginTop: 6, fontSize: 10, color: "var(--cv-dim)", lineHeight: 1.55 }}>
            {cert.notes.join(" · ")}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function CvCertifications() {
  const verified = credentials.filter((c) => c.state === "VERIFIED" || c.state === "COMPLETED");
  const featured = credentials.find((c) => c.id === "cs50ai-artificial-intelligence") ?? verified[0];
  if (!featured) return null;
  const remaining = verified.filter((c) => c.id !== featured.id);

  return (
    <CvChapterSection
      id="certifications"
      number="07"
      title="Certifications"
      kicker="Verified credentials"
      lead="Issued, dated and checkable. Every record here carries its provider, its printed identifier and a route back to the source — an issuer verification page or the certificate document itself."
      tone="research"
      visual={<CredentialLattice count={verified.length} />}
    >
      <div
        className="cv-panel"
        style={{
          padding: 26,
          borderColor: "rgba(53,214,255,0.35)",
          background: "linear-gradient(150deg, rgba(13,28,48,0.9), rgba(3,7,13,0.9))",
          boxShadow: "0 0 40px rgba(27,77,201,0.18)",
        }}
      >
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
          <LaurelMark />
          <div style={{ flex: "1 1 260px", minWidth: 0 }}>
            <p className="cv-label" style={{ color: "var(--cv-cyan)" }}>
              Featured credential · independently verifiable
            </p>
            <h3
              style={{
                marginTop: 8,
                fontFamily: "var(--font-plex-mono), monospace",
                fontSize: "clamp(1.05rem, 1.6vw, 1.4rem)",
                lineHeight: 1.3,
                color: "var(--cv-ink)",
              }}
            >
              {featured.program}
            </h3>
            <p style={{ marginTop: 6, fontSize: 12, color: "var(--cv-muted)" }}>{featured.provider}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
              <CvEvidenceBadge level={featured.state} />
              <span className="cv-pill" data-tone="cyan">Issued {issued(featured.date)}</span>
              {featured.expires ? <span className="cv-pill">{featured.expires}</span> : null}
            </div>
          </div>
        </div>

        <hr className="cv-rule" style={{ margin: "22px 0" }} />
        <p style={{ fontSize: 12, color: "var(--cv-muted)", lineHeight: 1.7 }}>{featured.learned}</p>
        <p style={{ marginTop: 8, fontSize: 11, color: "var(--cv-dim)", lineHeight: 1.6 }}>{featured.assessment}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginTop: 18 }}>
          <div>
            <p className="cv-label">Credential ID</p>
            <p
              style={{
                marginTop: 4,
                fontFamily: "var(--font-plex-mono), monospace",
                fontSize: 11,
                color: "var(--cv-ink)",
                wordBreak: "break-all",
              }}
            >
              {featured.credentialId ?? "Not printed on certificate"}
            </p>
          </div>
          <div>
            <p className="cv-label">Coverage</p>
            <p style={{ marginTop: 4, fontSize: 11, color: "var(--cv-muted)", lineHeight: 1.55 }}>
              {featured.topics.length} applied topics · {featured.skills.length} named skills
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
          {featured.skills.map((skill) => (
            <span key={skill} className="cv-pill" data-tone="cyan">{skill}</span>
          ))}
        </div>

        {featured.notes && featured.notes.length > 0 ? (
          <ul className="cv-list" style={{ marginTop: 18 }}>
            {featured.notes.map((note, i) => (
              <li key={i} className="cv-list-item">{note}</li>
            ))}
          </ul>
        ) : null}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
          {featured.verificationUrl ? (
            <a className="cv-action" href={featured.verificationUrl} target="_blank" rel="noopener noreferrer">
              Verify with issuer ↗
            </a>
          ) : null}
          {featured.certificateUrl ? (
            <a className="cv-action subtle" href={featured.certificateUrl} target="_blank" rel="noopener noreferrer">
              Certificate document ↗
            </a>
          ) : null}
        </div>
      </div>

      <div style={{ marginTop: 30, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10 }}>
        <p className="cv-label">Verified records · {String(remaining.length).padStart(2, "0")} more</p>
        <p className="cv-label">Issuer link or certificate document</p>
      </div>
      <hr className="cv-rule" style={{ margin: "12px 0 6px" }} />
      {remaining.map((cert, i) => (
        <CredentialRow key={cert.id} cert={cert} position={i + 2} />
      ))}

      {credentialBadges.length > 0 ? (
        <div className="cv-panel" style={{ marginTop: 30 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10 }}>
            <p className="cv-label">Digital badges · issued as presented</p>
            <span className="cv-status" data-tone="green">Issued</span>
          </div>
          {credentialBadges.map((badge) => (
            <div key={badge.id} style={{ display: "flex", gap: 14, alignItems: "center", paddingTop: 16 }}>
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 52,
                  height: 52,
                  border: "1px solid var(--cv-edge)",
                  background: "rgba(9,20,36,0.7)",
                  flexShrink: 0,
                }}
                aria-label={badge.imageAlt}
              >
                <AwardGlyph />
              </span>
              <div>
                <h4 style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 13, color: "var(--cv-ink)" }}>
                  {badge.label}
                </h4>
                <p className="cv-label" style={{ marginTop: 4 }}>{badge.provider}</p>
                <span className="cv-status" data-tone="green" style={{ marginTop: 6 }}>{badge.status}</span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </CvChapterSection>
  );
}