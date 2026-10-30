import type { ServiceCategoryMeta } from "@/data/services";

/**
 * Technical schematics for /services.
 *
 * Two drawing families, both token-driven so they hold up in both themes:
 *  - `ServicesFlowViz` — the hero's architecture/data-flow band: a question
 *    becomes data, runs through an experiment harness, and comes back as a
 *    written report. It supports the headline; it never carries content the
 *    page does not also say in words.
 *  - `ServiceSchematic` — one restrained diagram per service category, shown
 *    in the selector panel. Each carries a screen-reader description; none
 *    presents measured results.
 *
 * All motion comes from the shared ambient helpers (.dash-march, .anim-blink),
 * which the global reduced-motion rule freezes. No SMIL, no JS.
 */

type SchematicKey = ServiceCategoryMeta["schematic"];

const SCHEMATIC_ARIA: Record<SchematicKey, string> = {
  "strategy-eval":
    "Illustrative schematic: a registered hypothesis feeds a deterministic experiment harness, and the evidence ends in a supported or rejected conclusion.",
  pipeline:
    "Illustrative schematic: ingestion feeds validation, failed data drops into quarantine, clean data enters a canonical model and replays deterministically.",
  architecture:
    "Illustrative schematic: data feeds a signal, the signal passes a risk gate that cannot be skipped, and only then does it reach execution.",
  flow: "Illustrative schematic: sources feed retrieval, retrieval feeds a cited analysis draft, and a human reviews the draft before any conclusion.",
};

/* ---------------- shared drawing parts ---------------- */

function ArrowDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 z" className="fill-line-strong" />
      </marker>
    </defs>
  );
}

function Box({
  x,
  y,
  w,
  h,
  label,
  lines,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  lines?: string[];
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={2}
        className={accent ? "fill-signal-soft stroke-signal" : "fill-surface stroke-line-strong"}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={lines?.length ? y + h / 2 - 2 : y + h / 2 + 4}
        textAnchor="middle"
        className={`font-mono text-[11px] uppercase tracking-[0.12em] md:text-[10px] ${
          accent ? "fill-signal" : "fill-foreground"
        }`}
      >
        {label}
      </text>
      {lines?.map((line, i) => (
        <text
          key={line}
          x={x + w / 2}
          y={y + h / 2 + 11 + i * 11}
          textAnchor="middle"
          className="hidden font-mono text-[9px] uppercase tracking-[0.1em] fill-faint md:block"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/* ---------------- category schematics ---------------- */

function StrategyEval() {
  const id = "svc-eval-arrow";
  return (
    <>
      <ArrowDefs id={id} />

      <Box x={14} y={66} w={104} h={44} label="HYPOTHESIS" lines={["REGISTERED"]} />

      <path
        d="M118 88 H156"
        className="stroke-line-strong dash-march"
        strokeWidth={1.2}
        strokeDasharray="4 6"
        markerEnd={`url(#${id})`}
        fill="none"
      />

      <g>
        <rect
          x={160}
          y={48}
          width={116}
          height={84}
          rx={2}
          className="fill-surface stroke-line-strong"
          strokeWidth={1}
        />
        <text
          x={218}
          y={66}
          textAnchor="middle"
          className="font-mono text-[11px] uppercase tracking-[0.12em] fill-foreground md:text-[10px]"
        >
          HARNESS
        </text>
        <text
          x={218}
          y={78}
          textAnchor="middle"
          className="hidden font-mono text-[9px] uppercase tracking-[0.1em] fill-faint md:block"
        >
          DETERMINISTIC
        </text>
        {/* illustrative simulated path — never a measured result */}
        <path
          d="M170 120 L184 112 L196 116 L210 102 L224 108 L238 94 L250 98 L266 84"
          className="stroke-research"
          strokeWidth={1.4}
          fill="none"
        />
        <circle cx={266} cy={84} r={2.4} className="fill-research" />
      </g>

      <path
        d="M276 88 H306"
        className="stroke-line-strong"
        strokeWidth={1.2}
        fill="none"
        markerEnd={`url(#${id})`}
      />

      <circle cx={312} cy={88} r={3} className="fill-foreground" />
      <path d="M312 88 L340 62" className="stroke-line-strong" strokeWidth={1} fill="none" />
      <path d="M312 88 L340 114" className="stroke-line-strong" strokeWidth={1} fill="none" />
      <Box x={344} y={44} w={80} h={30} label="SUPPORTED" />
      <Box x={344} y={102} w={80} h={30} label="REJECTED" accent />

      <path
        d="M14 152 H424"
        className="stroke-line"
        strokeWidth={1}
        strokeDasharray="2 6"
        fill="none"
      />
      <text x={14} y={168} className="hidden font-mono text-[9px] uppercase tracking-[0.16em] fill-faint md:block">
        EVIDENCE STANDARD FIXED BEFORE DATA IS TOUCHED
      </text>
    </>
  );
}

function Pipeline() {
  const id = "svc-pipe-arrow";
  return (
    <>
      <ArrowDefs id={id} />
      <Box x={14} y={54} w={86} h={38} label="INGEST" />
      <path
        d="M100 73 H128"
        className="stroke-line-strong dash-march"
        strokeWidth={1.2}
        strokeDasharray="4 6"
        markerEnd={`url(#${id})`}
        fill="none"
      />
      <Box x={132} y={54} w={86} h={38} label="VALIDATE" />
      <path
        d="M218 73 H246"
        className="stroke-line-strong dash-march"
        strokeWidth={1.2}
        strokeDasharray="4 6"
        markerEnd={`url(#${id})`}
        fill="none"
      />
      <Box x={250} y={54} w={86} h={38} label="CANONICAL" lines={["EXACT DECIMAL"]} />
      <path
        d="M336 73 H364"
        className="stroke-line-strong dash-march"
        strokeWidth={1.2}
        strokeDasharray="4 6"
        markerEnd={`url(#${id})`}
        fill="none"
      />
      <Box x={368} y={54} w={58} h={38} label="REPLAY" />

      {/* failure branch — explicit, not silent */}
      <path
        d="M175 92 V118"
        className="stroke-signal"
        strokeWidth={1.2}
        strokeDasharray="3 5"
        markerEnd={`url(#${id})`}
        fill="none"
      />
      <Box x={132} y={122} w={86} h={32} label="QUARANTINE" accent />

      <text x={14} y={176} className="hidden font-mono text-[9px] uppercase tracking-[0.16em] fill-faint md:block">
        POINT-IN-TIME READS · NANOSECOND TIMESTAMPS
      </text>
    </>
  );
}

function Architecture() {
  const id = "svc-arch-arrow";
  const layers: Array<{ y: number; label: string; accent?: boolean }> = [
    { y: 34, label: "DATA" },
    { y: 66, label: "SIGNAL" },
    { y: 98, label: "RISK", accent: true },
    { y: 130, label: "EXECUTION" },
  ];
  return (
    <>
      <ArrowDefs id={id} />
      {layers.map((layer, i) => (
        <g key={layer.label}>
          <rect
            x={14}
            y={layer.y}
            width={188}
            height={24}
            rx={2}
            className={layer.accent ? "fill-signal-soft stroke-signal" : "fill-surface stroke-line-strong"}
            strokeWidth={1}
          />
          <text
            x={26}
            y={layer.y + 16}
            className={`font-mono text-[11px] uppercase tracking-[0.14em] md:text-[10px] ${
              layer.accent ? "fill-signal" : "fill-foreground"
            }`}
          >
            {layer.label}
          </text>
          {i < layers.length - 1 && (
            <path
              d={`M108 ${layer.y + 24} V${layer.y + 30}`}
              className="stroke-line-strong"
              strokeWidth={1}
              markerEnd={`url(#${id})`}
              fill="none"
            />
          )}
        </g>
      ))}

      {/* the gate — controls sit between signal and execution and cannot be skipped */}
      <path
        d="M202 104 H222"
        className="stroke-signal"
        strokeWidth={1}
        strokeDasharray="3 4"
        fill="none"
      />
      <rect x={226} y={88} width={92} height={44} rx={2} className="fill-surface stroke-signal" strokeWidth={1} />
      <text x={272} y={106} textAnchor="middle" className="font-mono text-[11px] uppercase tracking-[0.12em] fill-signal md:text-[10px]">
        RISK GATE
      </text>
      <text x={272} y={120} textAnchor="middle" className="hidden font-mono text-[9px] uppercase tracking-[0.1em] fill-faint md:block">
        CANNOT SKIP
      </text>

      <path d="M272 88 V70" className="stroke-line-strong" strokeWidth={1} strokeDasharray="3 4" fill="none" />
      <text x={272} y={62} textAnchor="middle" className="hidden font-mono text-[9px] uppercase tracking-[0.14em] fill-faint md:block">
        SIGNAL CONTRACT
      </text>

      <text x={14} y={176} className="hidden font-mono text-[9px] uppercase tracking-[0.16em] fill-faint md:block">
        SIZING · R:R FLOOR · COST BUDGET ENFORCED IN CODE
      </text>
      <path
        d="M318 110 H346"
        className="stroke-line-strong"
        strokeWidth={1}
        markerEnd={`url(#${id})`}
        fill="none"
      />
      <circle cx={352} cy={110} r={2.4} className="fill-foreground anim-blink" />
      <text x={362} y={114} className="hidden font-mono text-[9px] uppercase tracking-[0.14em] fill-faint md:block">
        ORDER
      </text>
    </>
  );
}

function Flow() {
  const id = "svc-flow-arrow";
  return (
    <>
      <ArrowDefs id={id} />
      <Box x={14} y={60} w={82} h={36} label="SOURCES" lines={["YOUR DOCS"]} />
      <path
        d="M96 78 H122"
        className="stroke-line-strong dash-march"
        strokeWidth={1.2}
        strokeDasharray="4 6"
        markerEnd={`url(#${id})`}
        fill="none"
      />
      <Box x={126} y={60} w={92} h={36} label="RETRIEVAL" />
      <path
        d="M218 78 H244"
        className="stroke-line-strong dash-march"
        strokeWidth={1.2}
        strokeDasharray="4 6"
        markerEnd={`url(#${id})`}
        fill="none"
      />
      <Box x={248} y={60} w={92} h={36} label="DRAFT" lines={["CITED"]} />
      <path
        d="M340 78 H364"
        className="stroke-line-strong"
        strokeWidth={1.2}
        markerEnd={`url(#${id})`}
        fill="none"
      />
      <Box x={368} y={54} w={58} h={48} label="REVIEW" lines={["HUMAN"]} />

      {/* citations point back at the source they came from */}
      <path
        d="M294 96 C294 130 90 130 55 100"
        className="stroke-research"
        strokeWidth={1.1}
        strokeDasharray="2 5"
        fill="none"
      />
      <text x={150} y={140} className="hidden font-mono text-[9px] uppercase tracking-[0.14em] fill-faint md:block">
        CITATIONS BACK TO SOURCE
      </text>

      {/* review sends the draft back — nothing concludes without a person */}
      <path
        d="M397 54 C397 26 294 26 294 58"
        className="stroke-line-strong"
        strokeWidth={1.1}
        strokeDasharray="3 5"
        fill="none"
        markerEnd={`url(#${id})`}
      />
      <text x={306} y={22} className="hidden font-mono text-[9px] uppercase tracking-[0.14em] fill-faint md:block">
        REVISE
      </text>

      <text x={14} y={172} className="hidden font-mono text-[9px] uppercase tracking-[0.16em] fill-faint md:block">
        DRAFT FOR HUMAN REVIEW · NEVER AN AUTHORITATIVE RESULT
      </text>
    </>
  );
}

/** One restrained diagram per service category. Informative → labelled for AT. */
export function ServiceSchematic({
  schematic,
  className = "",
}: {
  schematic: SchematicKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 440 190"
      role="img"
      aria-label={SCHEMATIC_ARIA[schematic]}
      className={`block w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {schematic === "strategy-eval" && <StrategyEval />}
      {schematic === "pipeline" && <Pipeline />}
      {schematic === "architecture" && <Architecture />}
      {schematic === "flow" && <Flow />}
    </svg>
  );
}

/* ---------------- hero data-flow band ---------------- */

const HERO_NODES: Array<{ x: number; label: string; sub: string }> = [
  { x: 92, label: "QUESTION", sub: "REGISTERED" },
  { x: 320, label: "DATA", sub: "POINT-IN-TIME" },
  { x: 580, label: "HARNESS", sub: "DETERMINISTIC" },
  { x: 840, label: "EVIDENCE", sub: "COST-MODELLED" },
  { x: 1068, label: "REPORT", sub: "WITH LIMITS" },
];

/** The /services hero band: question → data → harness → evidence → report. */
export function ServicesFlowViz() {
  const id = "svc-hero-arrow";
  return (
    <svg
      viewBox="0 0 1160 190"
      role="img"
      aria-label="Illustrative flow: a registered question becomes point-in-time data, runs through a deterministic harness, and returns as cost-modelled evidence written up with its limits."
      className="block w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <ArrowDefs id={id} />

      {/* spine */}
      <path d="M14 95 H1146" className="stroke-line" strokeWidth={1} strokeDasharray="2 6" fill="none" />

      {HERO_NODES.map((node, i) => (
        <g key={node.label}>
          {i < HERO_NODES.length - 1 && (
            <path
              d={`M${node.x + 58} 95 H${HERO_NODES[i + 1].x - 58}`}
              className="stroke-line-strong dash-march"
              strokeWidth={1.2}
              strokeDasharray="4 8"
              markerEnd={`url(#${id})`}
              fill="none"
            />
          )}
          <rect
            x={node.x - 54}
            y={72}
            width={108}
            height={46}
            rx={2}
            className={i === 2 ? "fill-surface stroke-signal" : "fill-surface stroke-line-strong"}
            strokeWidth={1}
          />
          <text
            x={node.x}
            y={94}
            textAnchor="middle"
            className={`hidden font-mono text-[11px] uppercase tracking-[0.14em] md:block ${
              i === 2 ? "fill-signal" : "fill-foreground"
            }`}
          >
            {node.label}
          </text>
          <text
            x={node.x}
            y={108}
            textAnchor="middle"
            className="hidden font-mono text-[9px] uppercase tracking-[0.12em] fill-faint md:block"
          >
            {node.sub}
          </text>
          <circle
            cx={node.x}
            cy={62}
            r={2.2}
            className={`anim-blink ${i === 2 ? "fill-signal" : "fill-foreground"}`}
            style={{ animationDelay: `${i * 450}ms` }}
          />
          <path
            d={`M${node.x} 66 V70`}
            className={i === 2 ? "stroke-signal" : "stroke-line-strong"}
            strokeWidth={1}
            fill="none"
          />
        </g>
      ))}

      {/* the loop that makes it research rather than a one-off answer */}
      <path
        d="M1068 72 C1068 22 92 22 92 72"
        className="stroke-research"
        strokeWidth={1.1}
        strokeDasharray="3 6"
        fill="none"
        markerEnd={`url(#${id})`}
      />
      <text
        x={580}
        y={20}
        textAnchor="middle"
        className="hidden font-mono text-[9px] uppercase tracking-[0.24em] fill-faint md:block"
      >
        ITERATE ON THE LIMITS
      </text>

      {/* what the harness carries */}
      <text
        x={580}
        y={150}
        textAnchor="middle"
        className="hidden font-mono text-[9px] uppercase tracking-[0.16em] fill-faint md:block"
      >
        COST MODEL · FIXTURES · REPRODUCIBILITY TESTS · WRITTEN LIMITS
      </text>
      <circle cx={580} cy={128} r={2} className="fill-signal anim-blink" />
      <path d="M580 118 V126" className="stroke-line-strong" strokeWidth={1} fill="none" />
    </svg>
  );
}
