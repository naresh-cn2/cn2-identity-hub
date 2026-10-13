/**
 * JourneyVisual — the eight destination illustrations for the /hub journey.
 *
 * One SVG per destination code, each with its own identity: schematic stack
 * (builds), milestone curve (credentials), converging flow (services),
 * instrument trace (laboratory), question network (research), branching
 * pathways (opportunities), horizon arc (about), orbital channels (connect).
 *
 * Decorative and aria-hidden. No numbers, no axes values, nothing that
 * claims live data — the captions label them ILLUSTRATIVE. Motion reuses the
 * shared CSS helpers (dash-march, travel-pulse, anim-blink, nexus-spin,
 * nexus-ping), so the global reduced-motion rule freezes every one of them.
 */

import type { ReactNode } from "react";

type VisualProps = { code: string };

/* ---------------- shared wrappers ---------------- */

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="aspect-[560/420] w-full">
      <svg viewBox="0 0 560 420" focusable="false" aria-hidden="true" className="h-full w-full">
        {children}
      </svg>
    </div>
  );
}

/** Staggered blink delay for status dots. */
const blink = (i: number) => ({ animationDelay: `${(i * 0.8).toFixed(1)}s` });
const pulse = (i: number) => ({ animationDelay: `${(i * 0.5).toFixed(1)}s` });

/* ---------------- 01 · builds — layered architecture + bus ---------------- */

function BuildsVisual() {
  const blocks = [
    { x: 70, w: 120, h: 150 },
    { x: 220, w: 120, h: 210 },
    { x: 370, w: 120, h: 120 },
  ];
  const base = 300;
  const busY = 344;
  return (
    <Frame>
      {/* dimension bracket */}
      <g stroke="var(--line-strong)" strokeWidth="1.2" opacity="0.7">
        <line x1="40" y1="90" x2="40" y2={busY} />
        <line x1="34" y1="90" x2="46" y2="90" />
        <line x1="34" y1={busY} x2="46" y2={busY} />
      </g>
      {blocks.map((b, i) => {
        const top = base - b.h;
        const cx = b.x + b.w / 2;
        return (
          <g key={i}>
            <rect x={b.x} y={top} width={b.w} height={b.h} rx="2" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.4" />
            <rect x={b.x} y={top} width={b.w} height="3" fill="var(--research)" opacity="0.8" />
            <line x1={b.x + 8} y1={top + b.h / 3} x2={b.x + b.w - 8} y2={top + b.h / 3} stroke="var(--research)" strokeWidth="1" opacity="0.45" />
            <line x1={b.x + 8} y1={top + (2 * b.h) / 3} x2={b.x + b.w - 8} y2={top + (2 * b.h) / 3} stroke="var(--research)" strokeWidth="1" opacity="0.45" />
            <circle cx={b.x + b.w - 13} cy={top + 15} r="3.5" fill="var(--signal)" className="anim-blink" style={blink(i)} />
            <line x1={cx} y1={base} x2={cx} y2={busY} stroke="var(--line-strong)" strokeWidth="1.2" />
            <circle cx={cx} cy={busY} r="4" fill="var(--background)" stroke="var(--research)" strokeWidth="1.4" />
          </g>
        );
      })}
      {/* the archive bus */}
      <line
        x1="70"
        y1={busY}
        x2="490"
        y2={busY}
        stroke="var(--research)"
        strokeWidth="1.6"
        strokeDasharray="10 12"
        opacity="0.85"
        className="dash-march"
      />
    </Frame>
  );
}

/* ---------------- 02 · credentials — ascending milestone curve ---------------- */

const MILESTONES: [number, number][] = [
  [45, 368],
  [125, 336],
  [195, 288],
  [268, 250],
  [335, 202],
  [418, 148],
  [512, 74],
];

function CredentialsVisual() {
  const curve = MILESTONES.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  return (
    <Frame>
      <path d={curve} fill="none" stroke="var(--line-strong)" strokeWidth="1.6" />
      <path
        d={curve}
        fill="none"
        stroke="var(--research)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="0.1 100"
        pathLength={100}
        className="travel-pulse"
      />
      {MILESTONES.map(([x, y], i) => {
        const last = i === MILESTONES.length - 1;
        if (last) {
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="17" fill="none" stroke="var(--signal)" strokeWidth="1" opacity="0.4" />
              <circle cx={x} cy={y} r="9" fill="var(--background)" stroke="var(--signal)" strokeWidth="2" />
              <circle cx={x} cy={y} r="4" fill="var(--signal)" />
            </g>
          );
        }
        const filled = i % 2 === 0;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="7.5"
            fill={filled ? "var(--research)" : "var(--background)"}
            stroke="var(--research)"
            strokeWidth="1.5"
          />
        );
      })}
    </Frame>
  );
}

/* ---------------- 03 · services — converging engagement flow ---------------- */

function ServicesVisual() {
  const sources = [60, 180, 300];
  const paths = [
    "M170,88 C260,88 290,210 400,210",
    "M170,208 L400,208",
    "M170,328 C260,328 290,210 400,210",
  ];
  return (
    <Frame>
      {sources.map((y) => (
        <g key={y}>
          <rect x="40" y={y} width="130" height="56" rx="2" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.4" />
          <rect x="40" y={y} width="130" height="3" fill="var(--research)" opacity="0.7" />
          <circle cx="60" cy={y + 30} r="4" fill="var(--research)" opacity="0.85" />
          <line x1="74" y1={y + 30} x2="150" y2={y + 30} stroke="var(--line-strong)" strokeWidth="1.4" opacity="0.7" />
        </g>
      ))}
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth="1.4"
          strokeDasharray="6 8"
          className="dash-march"
        />
      ))}
      <path
        d={paths[0]}
        fill="none"
        stroke="var(--research)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="0.1 100"
        pathLength={100}
        className="travel-pulse"
        style={pulse(0)}
      />
      <path
        d={paths[2]}
        fill="none"
        stroke="var(--research)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="0.1 100"
        pathLength={100}
        className="travel-pulse"
        style={pulse(1)}
      />
      {/* convergence arrow into the deliverable */}
      <polygon points="398,201 417,210 398,219" fill="var(--research)" />
      <g>
        <path d="M455,172 L493,210 L455,248 L417,210 Z" fill="var(--background)" stroke="var(--signal)" strokeWidth="1.8" />
        <path d="M455,188 L477,210 L455,232 L433,210 Z" fill="var(--signal)" opacity="0.16" />
      </g>
    </Frame>
  );
}

/* ---------------- 04 · laboratory — instrument trace ---------------- */

const TRACE: [number, number][] = [
  [75, 310],
  [130, 285],
  [185, 300],
  [245, 235],
  [300, 258],
  [360, 180],
  [420, 205],
  [475, 140],
  [520, 162],
];

function LabVisual() {
  const trace = TRACE.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  return (
    <Frame>
      {/* frame + guides */}
      <path d="M75,75 L75,345 L520,345" fill="none" stroke="var(--line-strong)" strokeWidth="1.4" />
      {[135, 195, 255, 315].map((y) => (
        <line key={y} x1="75" y1={y} x2="520" y2={y} stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="1 12" opacity="0.4" />
      ))}
      {/* threshold */}
      <line
        x1="75"
        y1="150"
        x2="520"
        y2="150"
        stroke="var(--signal)"
        strokeWidth="1.4"
        strokeDasharray="8 10"
        opacity="0.8"
        className="dash-march"
      />
      {/* instrument trace */}
      <path d={trace} fill="none" stroke="var(--research)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {/* caliper on the measured leg */}
      <g stroke="var(--line-strong)" strokeWidth="1.2" opacity="0.75">
        <line x1="360" y1="98" x2="475" y2="98" />
        <line x1="360" y1="92" x2="360" y2="104" />
        <line x1="475" y1="92" x2="475" y2="104" />
      </g>
      <circle cx="475" cy="140" r="4.5" fill="var(--signal)" className="anim-blink" style={blink(1)} />
    </Frame>
  );
}

/* ---------------- 05 · research — question network ---------------- */

const SATELLITES: [number, number][] = [
  [280, 58],
  [423, 162],
  [368, 329],
  [192, 329],
  [137, 162],
];

function ResearchVisual() {
  const cx = 280;
  const cy = 208;
  return (
    <Frame>
      {/* spokes */}
      {SATELLITES.map(([x, y], i) => (
        <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--line-strong)" strokeWidth="1.2" opacity="0.8" />
      ))}
      <line x1={cx} y1={cy} x2={SATELLITES[1][0]} y2={SATELLITES[1][1]} stroke="var(--research)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="0.1 100" pathLength={100} className="travel-pulse" />
      <line x1={cx} y1={cy} x2={SATELLITES[3][0]} y2={SATELLITES[3][1]} stroke="var(--research)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="0.1 100" pathLength={100} className="travel-pulse" style={pulse(1)} />
      {/* central question */}
      <circle cx={cx} cy={cy} r="44" fill="var(--surface)" stroke="var(--research)" strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r="33" fill="none" stroke="var(--research)" strokeWidth="1" strokeDasharray="4 8" opacity="0.6" className="dash-march" />
      <circle cx={cx} cy={cy} r="5.5" fill="var(--signal)" />
      {/* satellites */}
      {SATELLITES.map(([x, y], i) => (
        <g key={i}>
          {i === 0 && <circle cx={x} cy={y} r="23" fill="none" stroke="var(--research)" strokeWidth="1" opacity="0.4" />}
          <circle cx={x} cy={y} r="17" fill="var(--background)" stroke="var(--line-strong)" strokeWidth="1.4" />
          <circle cx={x} cy={y} r="5" fill="var(--research)" />
        </g>
      ))}
      {/* stars */}
      {[
        [58, 64],
        [500, 92],
        [72, 250],
        [492, 320],
        [268, 396],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="var(--faint)" opacity={i < 2 ? 1 : 0.7} className={i < 2 ? "anim-blink" : undefined} style={i < 2 ? blink(i) : undefined} />
      ))}
    </Frame>
  );
}

/* ---------------- 06 · opportunities — branching pathways ---------------- */

const BRANCHES = [
  "M280,300 C280,240 200,220 130,158",
  "M280,300 C280,250 250,200 238,118",
  "M280,300 C280,250 310,200 322,118",
  "M280,300 C280,240 360,220 430,158",
];
const PATH_ENDS: [number, number][] = [
  [130, 158],
  [238, 118],
  [322, 118],
  [430, 158],
];

function OpportunitiesVisual() {
  return (
    <Frame>
      {/* shared canopy hint */}
      <path d="M145,148 Q280,66 415,148" fill="none" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 9" opacity="0.4" />
      {/* trunk */}
      <line x1="280" y1="400" x2="280" y2="300" stroke="var(--line-strong)" strokeWidth="2" />
      {/* the four pathways */}
      {BRANCHES.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="var(--research)" strokeWidth="1.8" />
      ))}
      {BRANCHES.map((d, i) => (
        <path
          key={`p${i}`}
          d={d}
          fill="none"
          stroke="var(--research)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="0.1 100"
          pathLength={100}
          className="travel-pulse"
          style={pulse(i)}
        />
      ))}
      {/* split junction */}
      <circle cx="280" cy="300" r="8" fill="var(--background)" stroke="var(--signal)" strokeWidth="1.8" />
      <circle cx="280" cy="300" r="3" fill="var(--signal)" />
      {/* pathway endpoints */}
      {PATH_ENDS.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="15" fill="var(--background)" stroke="var(--research)" strokeWidth="1.6" />
          <circle cx={x} cy={y} r="4.5" fill="var(--research)" opacity="0.9" />
        </g>
      ))}
    </Frame>
  );
}

/* ---------------- 07 · about — cinematic horizon ---------------- */

function AboutVisual() {
  const stars: [number, number][] = [
    [72, 82],
    [152, 52],
    [428, 66],
    [500, 128],
    [96, 168],
    [468, 206],
    [214, 62],
    [352, 44],
  ];
  return (
    <Frame>
      {/* sky */}
      <path d="M70,308 A210,210 0 0 1 490,308" fill="none" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray="6 10" opacity="0.7" className="dash-march" />
      <path d="M130,308 A150,150 0 0 1 430,308" fill="none" stroke="var(--research)" strokeWidth="1.2" strokeDasharray="2 8" opacity="0.5" />
      {/* horizon */}
      <line x1="40" y1="308" x2="520" y2="308" stroke="var(--line-strong)" strokeWidth="1.5" />
      {/* ground strata */}
      <g stroke="var(--line-strong)" strokeWidth="1" opacity="0.35">
        <line x1="120" y1="336" x2="440" y2="336" />
        <line x1="170" y1="364" x2="390" y2="364" />
        <line x1="220" y1="392" x2="340" y2="392" />
      </g>
      {/* apex signal */}
      <circle cx="280" cy="98" r="24" fill="none" stroke="var(--signal)" strokeWidth="1" opacity="0.2" />
      <circle cx="280" cy="98" r="14" fill="none" stroke="var(--signal)" strokeWidth="1" opacity="0.4" />
      <circle cx="280" cy="98" r="5" fill="var(--signal)" className="anim-blink" />
      {/* stars */}
      {stars.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 2 : 1.5}
          fill="var(--faint)"
          opacity={i % 2 === 0 ? 0.8 : 0.55}
          className={i % 4 === 0 ? "anim-blink" : undefined}
          style={i % 4 === 0 ? blink(i) : undefined}
        />
      ))}
    </Frame>
  );
}

/* ---------------- 08 · connect — orbital channels ---------------- */

const CHANNEL_NODES: [number, number][] = [
  [410, 135],
  [280, 360],
  [150, 135],
];

function ConnectVisual() {
  const cx = 280;
  const cy = 210;
  return (
    <Frame>
      {/* decorative orbital geometry (spins about the viewBox centre = the core) */}
      <g transform="rotate(-16 280 210)">
        <ellipse cx={cx} cy={cy} rx="170" ry="105" fill="none" stroke="var(--line-strong)" strokeWidth="1.1" strokeDasharray="3 10" opacity="0.8" className="nexus-spin" />
      </g>
      <g transform="rotate(20 280 210)">
        <ellipse cx={cx} cy={cy} rx="105" ry="170" fill="none" stroke="var(--research)" strokeWidth="1" strokeDasharray="1 12" opacity="0.5" className="nexus-spin-2" />
      </g>
      {/* orbiting beacon */}
      <g className="nexus-spin-rev">
        <circle cx={cx} cy="25" r="9" fill="var(--signal)" opacity="0.25" />
        <circle cx={cx} cy="25" r="4" fill="var(--signal)" opacity="0.9" />
      </g>
      {/* node ring (static — the nodes live on it) */}
      <circle cx={cx} cy={cy} r="150" fill="none" stroke="var(--research)" strokeWidth="1.2" strokeDasharray="6 10" opacity="0.5" className="dash-march" />
      {/* spokes */}
      {CHANNEL_NODES.map(([x, y], i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--line-strong)" strokeWidth="1.2" opacity="0.8" />
          <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--research)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="0.1 100" pathLength={100} className="travel-pulse" style={pulse(i)} />
        </g>
      ))}
      {/* core with radar pings (view-box centre sits on it) */}
      <circle className="nexus-ping" cx={cx} cy={cy} r="46" fill="none" stroke="var(--signal)" strokeWidth="1.5" />
      <circle className="nexus-ping" cx={cx} cy={cy} r="46" fill="none" stroke="var(--signal)" strokeWidth="1.5" style={{ animationDelay: "1.4s" }} />
      <circle cx={cx} cy={cy} r="38" fill="var(--surface)" stroke="var(--signal)" strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r="27" fill="none" stroke="var(--line-strong)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r="5" fill="var(--research)" />
      {/* channel nodes */}
      {CHANNEL_NODES.map(([x, y], i) => (
        <g key={`n${i}`}>
          <circle cx={x} cy={y} r="15" fill="var(--background)" stroke="var(--research)" strokeWidth="1.6" />
          <circle cx={x} cy={y} r="4.5" fill="var(--research)" />
        </g>
      ))}
    </Frame>
  );
}

/* ---------------- switch ---------------- */

export default function JourneyVisual({ code }: VisualProps) {
  switch (code) {
    case "01":
      return <BuildsVisual />;
    case "02":
      return <CredentialsVisual />;
    case "03":
      return <ServicesVisual />;
    case "04":
      return <LabVisual />;
    case "05":
      return <ResearchVisual />;
    case "06":
      return <OpportunitiesVisual />;
    case "07":
      return <AboutVisual />;
    case "08":
      return <ConnectVisual />;
    default:
      return null;
  }
}
