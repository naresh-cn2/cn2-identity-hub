import type { ArchiveCategory } from "@/data/archive";

/**
 * Per-project visual signature.
 *
 * Each build gets its own deterministic, lightweight SVG mark so the archive
 * reads as seven distinct instruments rather than one repeated card. These are
 * diagrams, not measurements — every one is marked `aria-hidden` and the card
 * that contains it always carries the real numbers as text.
 */
export default function ProjectMark({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 320 140"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`h-full w-full ${className}`}
    >
      {marks[id] ?? fallback}
    </svg>
  );
}

const fallback = (
  <g stroke="var(--line-strong)" strokeWidth="1" fill="none">
    <line x1="0" y1="70" x2="320" y2="70" />
  </g>
);

/** APEX — equity trajectory with drawdown envelope. */
const apex = (
  <g fill="none">
    <path
      d="M0 118 C 46 116, 74 120, 104 104 C 140 85, 168 96, 200 74 C 232 53, 262 62, 320 22"
      stroke="var(--research)"
      strokeWidth="2"
    />
    <path
      d="M0 118 C 46 116, 74 120, 104 104 C 140 85, 168 96, 200 74 C 232 53, 262 62, 320 22 L320 140 L0 140 Z"
      fill="var(--research)"
      opacity="0.08"
    />
    <path
      d="M0 122 L40 128 L80 119 L120 131 L160 121 L200 133 L240 124 L280 134 L320 126"
      stroke="var(--chart-axis)"
      strokeWidth="1"
      opacity="0.75"
    />
    <line x1="0" y1="140" x2="320" y2="140" stroke="var(--line-strong)" strokeWidth="1" />
  </g>
);

/** ATOS — one-way pipeline ladder. */
const atos = (
  <g>
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <g key={i}>
        <rect
          x={8 + i * 6}
          y={14 + i * 17}
          width={296 - i * 12}
          height="9"
          fill={i === 4 ? "var(--signal)" : i === 0 ? "var(--research)" : "var(--line-strong)"}
          opacity={i === 4 ? 0.85 : 0.5}
        />
        {i < 6 && (
          <line
            x1={16 + i * 6 + (296 - i * 12) / 2}
            y1={23 + i * 17}
            x2={16 + (i + 1) * 6 + (296 - (i + 1) * 12) / 2}
            y2={31 + i * 17}
            stroke="var(--faint)"
            strokeWidth="1"
          />
        )}
      </g>
    ))}
  </g>
);

/** MARKET DATA REPLAY — candle strip with a hard information boundary. */
const replay = (
  <g>
    {Array.from({ length: 26 }, (_, i) => {
      const future = i > 15;
      const up = (i * 7) % 3 !== 0;
      const h = 18 + ((i * 13) % 34);
      const y = 62 - h / 2 + ((i % 5) - 2) * 4;
      return (
        <g key={i} opacity={future ? 0.16 : 1}>
          <line
            x1={10 + i * 12}
            x2={10 + i * 12}
            y1={y - 8}
            y2={y + h + 8}
            stroke={up ? "var(--research)" : "var(--chart-axis)"}
            strokeWidth="1"
          />
          <rect
            x={6 + i * 12}
            y={y}
            width="8"
            height={h}
            fill={up ? "var(--research)" : "var(--chart-axis)"}
            opacity={up ? 0.75 : 0.45}
          />
        </g>
      );
    })}
    <line x1="198" y1="10" x2="198" y2="130" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray="4 4" />
  </g>
);

/** QRSIP — governed experiment graph. */
const qrsip = (
  <g>
    {[
      [40, 108],
      [96, 40],
      [160, 34],
      [224, 44],
      [284, 92],
      [160, 112],
    ].map(([x, y], i, all) => {
      const next = all[(i + 1) % all.length];
      return (
        <line
          key={`e${i}`}
          x1={x}
          y1={y}
          x2={next[0]}
          y2={next[1]}
          stroke="var(--line-strong)"
          strokeWidth="1"
        />
      );
    })}
    {[
      [40, 108],
      [96, 40],
      [160, 34],
      [224, 44],
      [284, 92],
      [160, 112],
    ].map(([x, y], i) => (
      <circle
        key={`n${i}`}
        cx={x}
        cy={y}
        r={i === 3 ? 7 : 4.5}
        fill={i === 3 ? "var(--signal)" : "var(--research)"}
        opacity={i === 3 ? 0.9 : 0.65}
      />
    ))}
  </g>
);

/** BILLING GATEWAY — throughput column chart. */
const gateway = (
  <g>
    {[
      { x: 34, h: 96 },
      { x: 104, h: 64 },
      { x: 174, h: 112 },
      { x: 244, h: 78 },
    ].map((b, i) => (
      <g key={i}>
        <rect
          x={b.x}
          y={126 - b.h}
          width="42"
          height={b.h}
          fill={i === 2 ? "var(--signal)" : "var(--research)"}
          opacity={i === 2 ? 0.85 : 0.45}
        />
        <line x1={b.x} y1="126" x2={b.x + 42} y2="126" stroke="var(--line-strong)" strokeWidth="1" />
      </g>
    ))}
  </g>
);

/** COSTINTEL — cost scatter with an anomaly isolated. */
const costintel = (
  <g>
    <line x1="0" y1="108" x2="320" y2="108" stroke="var(--line-strong)" strokeWidth="1" />
    {Array.from({ length: 34 }, (_, i) => {
      const x = 14 + ((i * 37) % 290);
      const y = 100 - ((i * 53) % 78);
      return <circle key={i} cx={x} cy={y} r="2.4" fill="var(--research)" opacity="0.45" />;
    })}
    <circle cx="238" cy="26" r="6" fill="none" stroke="var(--signal)" strokeWidth="1.5" />
    <circle cx="238" cy="26" r="2.6" fill="var(--signal)" />
    <line x1="238" y1="32" x2="238" y2="108" stroke="var(--signal)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
  </g>
);

const marks: Record<string, React.ReactNode> = {
  "apex-quant-engine": apex,
  "automated-trading-os": atos,
  "market-data-replay": replay,
  qrsip: qrsip,
  "billing-data-gateway": gateway,
  "ifm-costintel": costintel,
};

export const TAG_TONE: Record<ArchiveCategory, string> = {
  QUANT: "text-signal",
  DATA: "text-research",
  AI: "text-research",
  ENGINEERING: "text-foreground",
  FINTECH: "text-foreground",
  RESEARCH: "text-research",
  TOOLS: "text-muted",
};
