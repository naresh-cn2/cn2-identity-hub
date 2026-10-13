/**
 * OPPORTUNITIES subpage hero visuals — one family, four variants.
 * Each is a small SVG diagram of the pathway it belongs to, drawn from
 * the same tokens as the hub's pathway map, with restrained CSS motion
 * (auto-frozen under reduced motion).
 */

/** CAREER — the record spine: study, systems, CV, in one line. */
export function RecordSpine() {
  return (
    <svg
      viewBox="0 0 480 320"
      className="h-auto w-full"
      role="img"
      aria-label="Career record spine: study tracks, built systems and a print-ready CV connected on one line."
    >
      <title>Career record — study, systems, CV</title>
      <line x1={70} y1={40} x2={70} y2={280} stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="6 8" className="dash-march" />
      <line
        x1={70}
        y1={40}
        x2={70}
        y2={280}
        stroke="var(--research)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="0.1 100"
        className="travel-pulse"
      />
      {[
        { y: 80, label: "STUDY RECORD", sub: "SELF-DIRECTED TRACKS" },
        { y: 160, label: "SYSTEMS BUILT", sub: "BUILDS · REPOSITORIES · METRICS" },
        { y: 240, label: "PRINT-READY CV", sub: "THE FULL CAREER RECORD" },
      ].map((n) => (
        <g key={n.label}>
          <circle cx={70} cy={n.y} r="13" fill="var(--signal)" opacity="0.12" className="anim-breathe" />
          <circle cx={70} cy={n.y} r="5.5" fill="none" stroke="var(--signal)" strokeWidth="1.5" />
          <circle cx={70} cy={n.y} r="2" fill="var(--signal)" />
          <text x={100} y={n.y - 3} className="label-mono" fill="var(--foreground)" fontSize="15">
            {n.label}
          </text>
          <text x={100} y={n.y + 16} className="label-mono" fill="var(--faint)" fontSize="11">
            {n.sub}
          </text>
        </g>
      ))}
      <circle cx={70} cy={40} r="3" fill="var(--line-strong)" />
      <circle cx={70} cy={280} r="4" fill="var(--signal)" className="anim-blink" />
    </svg>
  );
}

/** FREELANCE — the engagement flow: problem → build → artifact. */
export function ScopeFlow() {
  const boxes = [
    { y: 24, label: "YOU HAVE", sub: "THE QUESTION AND THE DATA" },
    { y: 130, label: "WHAT I BUILD", sub: "DETERMINISTIC SYSTEM + ARTIFACT" },
    { y: 236, label: "WHAT YOU GET", sub: "WORKING SOFTWARE + LIMITATIONS" },
  ];
  return (
    <svg
      viewBox="0 0 480 320"
      className="h-auto w-full"
      role="img"
      aria-label="Engagement flow: the client's problem flows into the build, and out as a deliverable artifact."
    >
      <title>Engagement flow — problem, build, deliverable</title>
      {boxes.map((b) => (
        <g key={b.label}>
          <rect x={40} y={b.y} width={400} height={64} rx={3} fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1" />
          <text x={60} y={b.y + 27} className="label-mono" fill="var(--foreground)" fontSize="15">
            {b.label}
          </text>
          <text x={60} y={b.y + 47} className="label-mono" fill="var(--faint)" fontSize="11">
            {b.sub}
          </text>
        </g>
      ))}
      {[96, 202].map((y, i) => (
        <g key={y}>
          <line x1={240} y1={y} x2={240} y2={y + 24} stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="6 8" className="dash-march" style={{ animationDelay: `${i * 0.5}s` }} />
          <line
            x1={240}
            y1={y}
            x2={240}
            y2={y + 24}
            stroke="var(--research)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="0.1 100"
            className="travel-pulse"
            style={{ animationDelay: `${i * 0.8}s` }}
          />
          <polygon points={`234,${y + 20} 246,${y + 20} 240,${y + 30}`} fill="var(--signal)" />
        </g>
      ))}
    </svg>
  );
}

/** COLLABORATION — convergence: two inputs, one joint experiment, one artifact. */
export function ResearchConvergence() {
  return (
    <svg
      viewBox="0 0 480 320"
      className="h-auto w-full"
      role="img"
      aria-label="Research convergence: a registered hypothesis and a transparent method converge into a joint experiment and a verified artifact."
    >
      <title>Collaboration model — convergence into a joint experiment</title>
      {/* convergence links */}
      <path d="M92 92 C 150 92, 170 152, 226 156" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="6 8" className="dash-march" />
      <path d="M92 228 C 150 228, 170 168, 226 164" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="6 8" className="dash-march" style={{ animationDelay: "0.6s" }} />
      <line x1={254} y1={160} x2={396} y2={160} stroke="var(--line-strong)" strokeWidth="1.5" />
      <line
        x1={254}
        y1={160}
        x2={396}
        y2={160}
        stroke="var(--research)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="0.1 100"
        className="travel-pulse"
      />
      {/* left inputs */}
      {[
        { y: 92, label: "REGISTERED HYPOTHESIS" },
        { y: 228, label: "TRANSPARENT METHOD" },
      ].map((n) => (
        <g key={n.label}>
          <circle cx={70} cy={n.y} r="12" fill="var(--signal)" opacity="0.12" className="anim-breathe" />
          <circle cx={70} cy={n.y} r="5" fill="none" stroke="var(--signal)" strokeWidth="1.5" />
          <text x={70} y={n.y - 20} className="label-mono" fill="var(--faint)" fontSize="11" textAnchor="middle">
            {n.label}
          </text>
        </g>
      ))}
      {/* joint experiment core */}
      <circle cx={240} cy={160} r="22" fill="var(--research)" opacity="0.1" className="anim-breathe" />
      <circle cx={240} cy={160} r="12" fill="none" stroke="var(--research)" strokeWidth="1.5" />
      <circle cx={240} cy={160} r="4" fill="var(--research)" />
      <text x={240} y={200} className="label-mono" fill="var(--foreground)" fontSize="13" textAnchor="middle">
        JOINT EXPERIMENT
      </text>
      {/* output */}
      <circle cx={410} cy={160} r="6" fill="var(--signal)" className="anim-blink" />
      <text x={410} y={136} className="label-mono" fill="var(--foreground)" fontSize="12" textAnchor="middle">
        VERIFIED
      </text>
      <text x={410} y={200} className="label-mono" fill="var(--faint)" fontSize="11" textAnchor="middle">
        REPRODUCIBLE ARTIFACT
      </text>
    </svg>
  );
}

/** PARTNERSHIPS — four models joined to one partnership core. */
export function PartnershipModules() {
  const modules = [
    { x: 20, y: 28, label: "INFRASTRUCTURE" },
    { x: 300, y: 28, label: "RESEARCH PRODUCT" },
    { x: 20, y: 240, label: "DATA LICENSING" },
    { x: 300, y: 240, label: "OPEN SOURCE" },
  ];
  return (
    <svg
      viewBox="0 0 480 320"
      className="h-auto w-full"
      role="img"
      aria-label="Partnership models: infrastructure, research productization, data licensing and open-source collaboration joined to one partnership core."
    >
      <title>Partnership models — four forms, one core</title>
      {/* connectors */}
      {modules.map((m, i) => {
        const cx = m.x + 80;
        const cy = m.y + 26;
        return (
          <line
            key={`${m.label}-link`}
            x1={cx}
            y1={cy}
            x2={240}
            y2={160}
            stroke="var(--line-strong)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            className="dash-march"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        );
      })}
      {/* one connector carries a travelling signal */}
      <line x1={300} y1={54} x2={240} y2={160} stroke="var(--research)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="0.1 100" className="travel-pulse" opacity="0.8" />
      {/* core */}
      <rect x={168} y={132} width={144} height={56} rx={3} fill="var(--surface)" stroke="var(--signal)" strokeWidth="1.5" />
      <text x={240} y={157} className="label-mono" fill="var(--foreground)" fontSize="14" textAnchor="middle">
        PARTNERSHIP
      </text>
      <text x={240} y={175} className="label-mono" fill="var(--faint)" fontSize="10" textAnchor="middle">
        SELECTIVE · DEFINED SCOPE
      </text>
      <circle cx={240} cy={160} r="26" fill="none" stroke="var(--signal)" strokeWidth="1" opacity="0.25" className="anim-breathe" />
      {/* modules */}
      {modules.map((m) => (
        <g key={m.label}>
          <rect x={m.x} y={m.y} width={160} height={52} rx={3} fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1" />
          <text x={m.x + 80} y={m.y + 31} className="label-mono" fill="var(--muted)" fontSize="12" textAnchor="middle">
            {m.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
