"use client";

import SceneCanvas, { breathe, rgba, type SceneDraw } from "@/components/hub/visuals/scene";
import type { ArchiveProject } from "@/data/archive";

/**
 * Tier-two project signatures — one distinct visual identity per project.
 *
 * Each system gets its own room: the crypto platform runs its state pipeline
 * over a trading-floor grid, the billing gateway streams records through its
 * normalization chain, CostIntel reconciles two columns of spend, and the
 * forex platform climbs its causal timeframe ladder into the gate funnel.
 *
 * All scenes are illustrative diagrams of the real system shape — the
 * measured figures always appear separately as text with their provenance
 * label. Canvas carries atmosphere; SVG carries the crisp structure.
 */

function Frame({
  label,
  note,
  children,
}: {
  label: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="viz-frame p-4 md:p-6">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <p className="label-mono text-research">{label}</p>
        <p className="label-mono text-faint">{note}</p>
      </div>
      {children}
    </div>
  );
}

function SceneBox({ draw, children }: { draw: SceneDraw; children: React.ReactNode }) {
  return (
    <div className="relative aspect-[560/420] w-full overflow-hidden">
      <SceneCanvas draw={draw} />
      <svg viewBox="0 0 560 420" focusable="false" aria-hidden="true" className="absolute inset-0 h-full w-full">
        {children}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * CRYPTO PLATFORM — state pipeline over a trading-floor grid
 * ------------------------------------------------------------------ */

const drawCrypto: SceneDraw = (ctx, { t, w, h, pal, dim, reduced, small }) => {
  const hz = h * 0.72;
  const haze = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, w * 0.6);
  haze.addColorStop(0, rgba(pal.deep, 0.07 * dim));
  haze.addColorStop(1, rgba(pal.deep, 0));
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, w, h);

  // perspective floor
  ctx.strokeStyle = rgba(pal.deep, 0.09 * dim);
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = -5; i <= 5; i++) {
    ctx.moveTo(w * 0.5, hz);
    ctx.lineTo(w * 0.5 + i * w * 0.17, h * 1.02);
  }
  const travel = reduced ? 0 : (t * 0.09) % 1;
  for (let k = 0; k < 5; k++) {
    const z = 1 + k + travel;
    const y = hz + (h - hz) / z;
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();

  // scanning light
  const sweep = reduced ? 0.5 : ((t * 0.08) % 1.3) - 0.15;
  const g = ctx.createLinearGradient(sweep * w - 60, 0, sweep * w + 60, 0);
  g.addColorStop(0, rgba(pal.bright, 0));
  g.addColorStop(0.5, rgba(pal.bright, 0.05 * dim));
  g.addColorStop(1, rgba(pal.bright, 0));
  ctx.fillStyle = g;
  ctx.fillRect(sweep * w - 60, 0, 120, h);

  // drifting data motes
  const count = small ? 10 : 20;
  for (let i = 0; i < count; i++) {
    const seed = Math.abs(Math.sin(i * 61.7 + 5.3) * 43758.5) % 1;
    const seed2 = Math.abs(Math.sin(i * 23.1 + 8.9) * 43758.5) % 1;
    const x = seed * w + Math.sin(t * 0.2 + i) * 5;
    const y = ((seed2 * h - t * (4 + (i % 4) * 2)) % h + h) % h;
    ctx.fillStyle = rgba(pal.structure, (0.07 + 0.09 * breathe(t, 0.5 + (i % 3) * 0.2, i)) * dim);
    ctx.beginPath();
    ctx.arc(x, y, 0.9, 0, Math.PI * 2);
    ctx.fill();
  }
};

const CRYPTO_NODES = [
  { x: 110, y: 92, lines: ["INGESTION"] },
  { x: 280, y: 92, lines: ["STATE ENGINE"] },
  { x: 450, y: 92, lines: ["DECISION", "ENGINE"] },
  { x: 450, y: 296, lines: ["RISK", "GOVERNOR"] },
  { x: 280, y: 296, lines: ["CAPITAL GATE"], gate: true },
  { x: 110, y: 296, lines: ["SERVERS &", "CLIENTS"] },
];

const CRYPTO_CANDLES: Array<[number, number, boolean]> = [
  [36, 22, true], [22, 30, false], [30, 18, true], [18, 26, false],
  [26, 14, true], [14, 24, false], [24, 12, true], [12, 20, false],
  [20, 34, false], [34, 18, true], [18, 10, true], [10, 22, false],
  [22, 30, false], [30, 16, true], [16, 26, false], [26, 12, true],
];

function CryptoScene() {
  return (
    <SceneBox draw={drawCrypto}>
      {/* candle structure strip — illustrative market shape */}
      <g opacity="0.4">
        <line x1="40" y1="352" x2="520" y2="352" stroke="var(--research)" strokeWidth="1" strokeDasharray="6 10" opacity="0.55" />
        {CRYPTO_CANDLES.map(([up, down, rising], i) => {
          const x = 46 + i * 30;
          const top = 356 + Math.min(up, down) * 0.6;
          const bot = 356 + Math.max(up, down) * 0.6;
          const col = rising ? "var(--research)" : "var(--signal)";
          return (
            <g key={i}>
              <line x1={x} y1={top - 5} x2={x} y2={bot + 5} stroke={col} strokeWidth="1" opacity="0.7" />
              <rect x={x - 5} y={top} width="10" height={Math.max(4, bot - top)} fill={col} opacity="0.75" />
            </g>
          );
        })}
        <circle cx="436" cy="352" r="2.6" fill="var(--signal)" />
      </g>

      {/* the serpentine state pipeline */}
      <path d="M110,92 L450,92 L450,296 L110,296" fill="none" stroke="var(--line-strong)" strokeWidth="1.4" />
      <path
        d="M110,92 L450,92 L450,296 L110,296"
        fill="none"
        stroke="var(--research)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="0.1 100"
        pathLength={100}
        className="travel-pulse"
        style={{ animationDuration: "7s" }}
      />
      <text className="label-mono" x="450" y="56" textAnchor="middle" fill="var(--faint)" fontSize="7.5">
        CONTRACT SHA-256 8FBC923A…
      </text>
      {CRYPTO_NODES.map((n) => (
        <g key={n.lines.join(" ")}>
          <rect
            x={n.x - 66}
            y={n.y - 26}
            width="132"
            height="52"
            rx="3"
            fill="var(--surface)"
            stroke={n.gate ? "var(--signal)" : "var(--line-strong)"}
            strokeWidth={n.gate ? 1.8 : 1.4}
          />
          <rect x={n.x - 66} y={n.y - 26} width="132" height="2.5" fill={n.gate ? "var(--signal)" : "var(--research)"} opacity="0.85" />
          {n.lines.map((line, li) => (
            <text
              key={line}
              className="label-mono"
              x={n.x}
              y={n.y + (n.lines.length === 1 ? 4 : -2 + li * 13)}
              textAnchor="middle"
              fill="var(--foreground)"
              fontSize="9.5"
            >
              {line}
            </text>
          ))}
          {n.gate && (
            <circle cx={n.x + 52} cy={n.y + 16} r="3.5" fill="var(--signal)" className="anim-blink" />
          )}
        </g>
      ))}
    </SceneBox>
  );
}

/* ------------------------------------------------------------------ *
 * BILLING DATA GATEWAY — normalization chain with streaming records
 * ------------------------------------------------------------------ */

const drawBilling: SceneDraw = (ctx, { t, w, h, pal, dim, reduced, small }) => {
  const haze = ctx.createRadialGradient(w * 0.6, h * 0.5, 0, w * 0.6, h * 0.5, w * 0.55);
  haze.addColorStop(0, rgba(pal.structure, 0.05 * dim));
  haze.addColorStop(1, rgba(pal.structure, 0));
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, w, h);

  if (reduced || small) return;

  // record rain — inputs falling toward the projection stage
  for (let lane = 0; lane < 6; lane++) {
    const x = w * (0.06 + lane * 0.032);
    for (let r = 0; r < 4; r++) {
      const y = ((t * (26 + lane * 6) + r * (h / 4) + lane * 40) % (h * 1.1)) - 20;
      const a = (0.16 - lane * 0.015) * dim;
      ctx.fillStyle = rgba(pal.structure, Math.max(0.04, a));
      ctx.fillRect(x, y, 10, 3);
    }
  }
  // normalized rows leaving on the right
  for (let row = 0; row < 4; row++) {
    const y = h * (0.56 + row * 0.07);
    const u = ((t * 0.22 + row * 0.25) % 1);
    const x = w * 0.78 + u * w * 0.2;
    ctx.fillStyle = rgba(pal.bright, (0.1 + 0.16 * (1 - u)) * dim);
    ctx.fillRect(Math.min(x, w * 0.97), y, 22, 3);
  }
};

const BILLING_CHAIN = [
  { y: 78, label: "PAGE PROJECTION" },
  { y: 172, label: "FORMAT ADAPTERS" },
  { y: 266, label: "INTERMEDIATE MODEL" },
  { y: 360, label: "EMIT" },
];

function BillingScene() {
  return (
    <SceneBox draw={drawBilling}>
      {/* source exports feeding the chain */}
      {[
        { y: 118, label: "AWS CUR 2.0" },
        { y: 300, label: "AZURE COST MGMT" },
      ].map((s) => (
        <g key={s.label}>
          <rect x="34" y={s.y - 17} width="132" height="34" rx="3" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.3" />
          <text className="label-mono" x="100" y={s.y + 3.5} textAnchor="middle" fill="var(--muted)" fontSize="8.5">
            {s.label}
          </text>
          <path
            d={`M166,${s.y} C226,${s.y} 240,78 272,78`}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1.1"
            strokeDasharray="4 6"
          />
        </g>
      ))}
      {/* the chain */}
      <line x1="340" y1="78" x2="340" y2="360" stroke="var(--line-strong)" strokeWidth="1.4" />
      <line
        x1="340"
        y1="78"
        x2="340"
        y2="360"
        stroke="var(--research)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="0.1 100"
        pathLength={100}
        className="travel-pulse"
        style={{ animationDuration: "4.6s" }}
      />
      {BILLING_CHAIN.map((stage, i) => (
        <g key={stage.label}>
          <rect x="266" y={stage.y - 22} width="148" height="44" rx="3" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.4" />
          <rect x="266" y={stage.y - 22} width="148" height="2.5" fill="var(--research)" opacity="0.85" />
          <text className="label-mono" x="340" y={stage.y + 3.5} textAnchor="middle" fill="var(--foreground)" fontSize="9.5">
            {stage.label}
          </text>
          <circle cx="340" cy={stage.y} r="2" fill="var(--research)" opacity="0.9" />
          {i === 2 && (
            <g>
              <line x1="414" y1={stage.y} x2="446" y2={stage.y} stroke="var(--line-strong)" strokeWidth="1.1" strokeDasharray="4 5" />
              {[0, 1, 2, 3].map((r) => (
                <rect key={r} x="450" y={stage.y - 22 + r * 12} width="72" height="7" rx="1.5" fill="var(--research)" opacity={0.5 - r * 0.07} />
              ))}
            </g>
          )}
        </g>
      ))}
      <text className="label-mono" x="40" y="398" fill="var(--faint)" fontSize="8">
        READ IN PLACE — NO COPY
      </text>
    </SceneBox>
  );
}

/* ------------------------------------------------------------------ *
 * IFM-COSTINTEL — reconciliation field with one lit anomaly
 * ------------------------------------------------------------------ */

const drawCostintel: SceneDraw = (ctx, { t, w, h, pal, dim }) => {
  // precision grid
  const step = 24;
  ctx.strokeStyle = rgba(pal.deep, 0.06 * dim);
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = step; x < w; x += step) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = step; y < h; y += step) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();

  // slow caliper sweep across the field
  const sweep = 0.5 + 0.42 * Math.sin(t * 0.16);
  const g = ctx.createLinearGradient(sweep * w - 40, 0, sweep * w + 40, 0);
  g.addColorStop(0, rgba(pal.bright, 0));
  g.addColorStop(0.5, rgba(pal.bright, 0.05 * dim));
  g.addColorStop(1, rgba(pal.bright, 0));
  ctx.fillStyle = g;
  ctx.fillRect(sweep * w - 40, 0, 80, h);

  // anomaly glow beside the lit row
  const pulse = breathe(t, 1.6, 0);
  const ax = w * 0.77;
  const ay = h * 0.5;
  const glow = ctx.createRadialGradient(ax, ay, 0, ax, ay, 46);
  glow.addColorStop(0, rgba(pal.signal, 0.16 * pulse * dim));
  glow.addColorStop(1, rgba(pal.signal, 0));
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(ax, ay, 46, 0, Math.PI * 2);
  ctx.fill();
};

function CostintelScene() {
  const rows = [70, 130, 190, 250];
  return (
    <SceneBox draw={drawCostintel}>
      {/* precision tick ruler */}
      <g stroke="var(--line-strong)" strokeWidth="1" opacity="0.6">
        {Array.from({ length: 24 }, (_, i) => (
          <line key={i} x1={40 + i * 20} y1="30" x2={40 + i * 20} y2={i % 5 === 0 ? 42 : 36} />
        ))}
      </g>
      <text className="label-mono" x="40" y="58" fill="var(--faint)" fontSize="7.5">
        RAW SPEND
      </text>
      <text className="label-mono" x="384" y="58" fill="var(--faint)" fontSize="7.5">
        STRUCTURED MODEL
      </text>
      {rows.map((y, i) => {
        const anomaly = i === 2;
        return (
          <g key={y}>
            <rect x="40" y={y} width="130" height="34" rx="2" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.2" />
            <text className="label-mono" x="105" y={y + 21} textAnchor="middle" fill="var(--muted)" fontSize="8">
              {i % 2 === 0 ? "AWS CUR" : "AZURE"}
            </text>
            <line x1="170" y1={y + 17} x2="384" y2={y + 17} stroke={anomaly ? "var(--signal)" : "var(--line-strong)"} strokeWidth={anomaly ? 1.6 : 1.1} strokeDasharray={anomaly ? "5 5" : "3 6"} />
            <rect x="384" y={y} width="136" height="34" rx="2" fill="var(--surface)" stroke={anomaly ? "var(--signal)" : "var(--line-strong)"} strokeWidth={anomaly ? 1.6 : 1.2} />
            <rect x="384" y={y} width="136" height="2.5" fill={anomaly ? "var(--signal)" : "var(--research)"} opacity="0.85" />
            <text className="label-mono" x="452" y={y + 22} textAnchor="middle" fill="var(--foreground)" fontSize="8.5">
              {`SPEND ROW ${i + 1}`}
            </text>
            {anomaly && (
              <g>
                <circle cx="277" cy={y + 17} r="4" fill="var(--signal)" className="anim-blink" />
                <text className="label-mono" x="277" y={y - 8} textAnchor="middle" fill="var(--signal)" fontSize="8">
                  ANOMALY SIGNAL
                </text>
              </g>
            )}
          </g>
        );
      })}
      {/* decision outputs */}
      <rect x="170" y="340" width="220" height="38" rx="3" fill="var(--background)" stroke="var(--signal)" strokeWidth="1.5" />
      <text className="label-mono" x="280" y="363" textAnchor="middle" fill="var(--foreground)" fontSize="9">
        QUERY · DETECT · OPTIMIZE
      </text>
      <path d="M277,300 L277,340" stroke="var(--line-strong)" strokeWidth="1.2" strokeDasharray="4 6" />
    </SceneBox>
  );
}

/* ------------------------------------------------------------------ *
 * FOREX PLATFORM — causal timeframe ladder into the gate funnel
 * ------------------------------------------------------------------ */

const drawForex: SceneDraw = (ctx, { t, w, h, pal, dim, small }) => {
  // session bands breathing along the horizon
  const bands = small ? 2 : 3;
  for (let k = 0; k < bands; k++) {
    const y = h * (0.78 + k * 0.07);
    const a = (0.05 + 0.04 * breathe(t, 0.35 + k * 0.12, k * 1.7)) * dim;
    const g = ctx.createLinearGradient(0, y, w, y);
    g.addColorStop(0, rgba(pal.structure, 0));
    g.addColorStop(0.5, rgba(pal.structure, a));
    g.addColorStop(1, rgba(pal.structure, 0));
    ctx.fillStyle = g;
    ctx.fillRect(0, y, w, 14);
  }

  // drifting haze
  const gx = w * (0.5 + Math.sin(t * 0.05) * 0.25);
  const glow = ctx.createRadialGradient(gx, h * 0.45, 0, gx, h * 0.45, w * 0.55);
  glow.addColorStop(0, rgba(pal.deep, 0.06 * dim));
  glow.addColorStop(1, rgba(pal.deep, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
};

const TIMEFRAMES = ["1M", "1W", "1D", "4H", "1H", "15M", "3M"];

function ForexScene() {
  return (
    <SceneBox draw={drawForex}>
      {/* causal ladder */}
      {TIMEFRAMES.map((tf, i) => {
        const y = 66 + i * 40;
        const bw = 168 + i * 14;
        return (
          <g key={tf}>
            <text className="label-mono" x="66" y={y + 12} textAnchor="end" fill="var(--muted)" fontSize="9">
              {tf}
            </text>
            <rect x="80" y={y} width={bw} height="17" rx="2" fill="var(--research)" opacity={0.14 + i * 0.03} />
            <rect x="80" y={y} width={bw} height="17" rx="2" fill="none" stroke="var(--line-strong)" strokeWidth="1" />
            <circle cx={80 + bw * 0.3} cy={y + 8.5} r="2.4" fill="var(--research)" opacity="0.9" />
            <circle cx={80 + bw * 0.72} cy={y + 8.5} r="2.4" fill="var(--signal)" opacity="0.8" />
          </g>
        );
      })}
      <line x1="66" y1="58" x2="66" y2="348" stroke="var(--line-strong)" strokeWidth="1.2" />
      <path d="M66,348 L66,58" fill="none" stroke="var(--research)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="0.1 100" pathLength={100} className="travel-pulse" style={{ animationDuration: "5.4s" }} />

      {/* four-gate elimination funnel */}
      <text className="label-mono" x="472" y="46" textAnchor="middle" fill="var(--signal)" fontSize="8.5">
        4-GATE FUNNEL
      </text>
      {[0, 1, 2, 3].map((g) => {
        const y = 66 + g * 70;
        const bw = 130 - g * 26;
        return (
          <g key={g}>
            <rect x={472 - bw / 2} y={y} width={bw} height="40" rx="3" fill="var(--surface)" stroke={g === 3 ? "var(--signal)" : "var(--line-strong)"} strokeWidth={g === 3 ? 1.7 : 1.3} />
            <rect x={472 - bw / 2} y={y} width={bw} height="2.5" fill={g === 3 ? "var(--signal)" : "var(--research)"} opacity="0.8" />
            <text className="label-mono" x="472" y={y + 25} textAnchor="middle" fill={g === 3 ? "var(--foreground)" : "var(--muted)"} fontSize="8.5">
              {g === 3 ? "ADMIT" : "GATE"}
            </text>
          </g>
        );
      })}
      {/* ladder feeds the funnel */}
      <path d="M330,186 C390,186 400,46 472,46" fill="none" stroke="var(--line-strong)" strokeWidth="1.1" strokeDasharray="5 7" opacity="0.7" />
      <path d="M472,348 L472,372" stroke="var(--signal)" strokeWidth="1.4" strokeDasharray="4 5" />
      <text className="label-mono" x="472" y="392" textAnchor="middle" fill="var(--faint)" fontSize="8">
        UNSEEN DATA · $0 LIVE
      </text>
      {/* session band */}
      <g>
        <rect x="80" y="368" width="168" height="14" rx="2" fill="var(--research)" opacity="0.16" />
        <rect x="252" y="368" width="120" height="14" rx="2" fill="var(--research)" opacity="0.28" />
        <text className="label-mono" x="80" y="398" fill="var(--faint)" fontSize="7.5">
          SESSION LIQUIDITY FILTER
        </text>
      </g>
    </SceneBox>
  );
}

/* ------------------------------------------------------------------ */

export default function TierTwoSignature({ project }: { project: ArchiveProject }) {
  switch (project.id) {
    case "crypto-platform":
      return (
        <Frame label="SIGNATURE / STATE PIPELINE" note="ILLUSTRATIVE — SYSTEM SHAPE, NOT A MEASUREMENT">
          <CryptoScene />
        </Frame>
      );
    case "billing-data-gateway":
      return (
        <Frame label="SIGNATURE / NORMALIZATION FLOW" note="ILLUSTRATIVE — PIPELINE DIAGRAM">
          <BillingScene />
        </Frame>
      );
    case "ifm-costintel":
      return (
        <Frame label="SIGNATURE / RECONCILIATION FIELD" note="ILLUSTRATIVE — DIAGRAM, NOT MEASURED DATA">
          <CostintelScene />
        </Frame>
      );
    case "forex-platform":
      return (
        <Frame label="SIGNATURE / CAUSAL LADDER" note="ILLUSTRATIVE — DESIGN DIAGRAM, NOT RESULTS">
          <ForexScene />
        </Frame>
      );
    default:
      return null;
  }
}
