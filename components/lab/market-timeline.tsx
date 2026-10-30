/**
 * LAB hero instrument — an animated market-data timeline: price panel,
 * volume panel and a marching time ruler with signals travelling through it.
 * Pure SVG + CSS motion only (all helpers are auto-frozen under reduced
 * motion). The series is deterministic and synthetic — ILLUSTRATIVE by
 * design, never measured market data.
 */

/** Deterministic PRNG so the SSR composition is stable across renders. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Bar {
  o: number;
  c: number;
  h: number;
  l: number;
  v: number;
}

const BAR_COUNT = 54;
const NOW_BACK = 6; // bars to the right of the NOW boundary

const BARS: Bar[] = (() => {
  const rand = mulberry32(9091);
  const bars: Bar[] = [];
  let price = 0.52;
  for (let i = 0; i < BAR_COUNT; i++) {
    const open = price;
    const close = Math.min(0.9, Math.max(0.1, open + (rand() - 0.47) * 0.09));
    const high = Math.min(0.97, Math.max(open, close) + rand() * 0.035);
    const low = Math.max(0.03, Math.min(open, close) - rand() * 0.035);
    bars.push({ o: open, c: close, h: high, l: low, v: 0.2 + rand() * 0.8 });
    price = close;
  }
  return bars;
})();

const W = 1200;
const H = 340;
const PAD_L = 56;
const PAD_R = 28;
const PRICE_TOP = 26;
const PRICE_BOT = 196;
const VOL_TOP = 224;
const VOL_BOT = 292;
const RULE_Y = 318;
const NOW_I = BAR_COUNT - NOW_BACK - 1;

const x = (i: number) => PAD_L + (i / (BAR_COUNT - 1)) * (W - PAD_L - PAD_R);
const y = (p: number) => PRICE_BOT - p * (PRICE_BOT - PRICE_TOP);

const CLOSES = BARS.map((b, i) => `${x(i).toFixed(1)},${y(b.c).toFixed(1)}`).join(" ");

/** Event markers sit on local extremes of the deterministic series. */
const MARKERS = [10, 26, 41];

/** The lab's market-data timeline instrument — schematic, labelled. */
export default function MarketTimeline() {
  return (
    <div className="viz-frame p-3 md:p-5">
      <div className="relative z-10">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line pb-3">
          <p className="label-mono text-faint">
            MARKET-DATA TIMELINE <span className="text-signal">/</span> SYNTHETIC SERIES
          </p>
        </div>

        <div className="relative">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            role="img"
            aria-label="Schematic market-data timeline: a synthetic price series with volume bars, a NOW boundary and a time ruler carrying travelling signals. Not measured market data."
          >
            <title>Market-data timeline — synthetic series</title>

            {/* price panel grid */}
            <g stroke="var(--grid-line)" strokeWidth="1">
              {[0.25, 0.5, 0.75].map((f) => (
                <line key={f} x1={PAD_L} x2={W - PAD_R} y1={y(f)} y2={y(f)} />
              ))}
            </g>
            {/* axes */}
            <line x1={PAD_L} x2={PAD_L} y1={PRICE_TOP - 6} y2={VOL_BOT + 6} stroke="var(--chart-axis)" strokeWidth="1" />
            <text x={16} y={(PRICE_TOP + PRICE_BOT) / 2} className="label-mono hidden sm:block" fill="var(--faint)" fontSize="12" transform={`rotate(-90 16 ${(PRICE_TOP + PRICE_BOT) / 2})`} textAnchor="middle">
              SYNTHETIC PRICE
            </text>

            {/* future region — faded behind the NOW boundary */}
            <rect x={x(NOW_I + 1) - 6} y={PRICE_TOP - 8} width={W - PAD_R - x(NOW_I + 1) + 6} height={VOL_BOT - PRICE_TOP + 16} fill="var(--surface)" opacity="0.45" />

            {/* candle bodies */}
            {BARS.map((b, i) => {
              const up = b.c >= b.o;
              const bw = Math.max(6, (W - PAD_L - PAD_R) / BAR_COUNT - 8);
              const top = y(Math.max(b.o, b.c));
              const bot = y(Math.min(b.o, b.c));
              const future = i > NOW_I;
              return (
                <g key={i} opacity={future ? 0.35 : 1}>
                  <line x1={x(i)} x2={x(i)} y1={y(b.h)} y2={y(b.l)} stroke={up ? "var(--research)" : "var(--signal)"} strokeWidth="1" opacity="0.7" />
                  <rect
                    x={x(i) - bw / 2}
                    y={top}
                    width={bw}
                    height={Math.max(1.5, bot - top)}
                    fill={up ? "var(--research)" : "var(--signal)"}
                    opacity="0.55"
                  />
                </g>
              );
            })}

            {/* close line */}
            <polyline points={CLOSES} fill="none" stroke="var(--chart-axis)" strokeWidth="1.5" />

            {/* event markers */}
            {MARKERS.map((i) => (
              <g key={i}>
                <circle cx={x(i)} cy={y(BARS[i].c)} r="9" fill="var(--signal)" opacity="0.16" className="anim-breathe" />
                <circle cx={x(i)} cy={y(BARS[i].c)} r="3" fill="var(--signal)" />
              </g>
            ))}

            {/* NOW boundary */}
            <line x1={x(NOW_I + 0.5)} x2={x(NOW_I + 0.5)} y1={PRICE_TOP - 8} y2={RULE_Y + 8} stroke="var(--signal)" strokeWidth="1.5" strokeDasharray="4 4" className="dash-march" />
            <circle cx={x(NOW_I + 0.5)} cy={PRICE_TOP - 8} r="4" fill="var(--signal)" className="anim-blink" />
            <text x={x(NOW_I + 0.5) - 10} y={PRICE_TOP + 6} className="label-mono hidden sm:block" fill="var(--signal)" fontSize="12" textAnchor="end">
              NOW
            </text>
            <text x={W - PAD_R} y={PRICE_TOP + 6} className="label-mono hidden sm:block" fill="var(--faint)" fontSize="12" textAnchor="end">
              FUTURE — NOT KNOWABLE AT t
            </text>

            {/* volume panel */}
            {BARS.map((b, i) => {
              const bw = Math.max(4, (W - PAD_L - PAD_R) / BAR_COUNT - 10);
              const bh = b.v * (VOL_BOT - VOL_TOP);
              return (
                <rect
                  key={i}
                  x={x(i) - bw / 2}
                  y={VOL_BOT - bh}
                  width={bw}
                  height={bh}
                  fill="var(--chart-axis)"
                  opacity={i > NOW_I ? 0.15 : 0.35}
                />
              );
            })}
            <line x1={PAD_L} x2={W - PAD_R} y1={VOL_BOT + 1} y2={VOL_BOT + 1} stroke="var(--chart-axis)" strokeWidth="1" />
            <text x={16} y={(VOL_TOP + VOL_BOT) / 2} className="label-mono hidden sm:block" fill="var(--faint)" fontSize="12" transform={`rotate(-90 16 ${(VOL_TOP + VOL_BOT) / 2})`} textAnchor="middle">
              VOLUME
            </text>

            {/* time ruler — marching dashes with signals travelling through time */}
            <line x1={PAD_L} x2={W - PAD_R} y1={RULE_Y} y2={RULE_Y} stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="6 8" className="dash-march" />
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={RULE_Y}
              y2={RULE_Y}
              stroke="var(--research)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="0.1 100"
              className="travel-pulse"
            />
            {Array.from({ length: Math.floor(BAR_COUNT / 6) + 1 }, (_, k) => {
              const i = k * 6;
              return (
                <g key={k}>
                  <line x1={x(i)} x2={x(i)} y1={RULE_Y - 5} y2={RULE_Y + 5} stroke="var(--chart-axis)" strokeWidth="1" />
                  <text x={x(i)} y={RULE_Y + 20} className="label-mono hidden sm:block" fill="var(--faint)" fontSize="11" textAnchor="middle">
                    {i === BAR_COUNT - 1 ? "T" : `T-${BAR_COUNT - 1 - i}`}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* scan sweep — HTML overlay so the motion stays transform/opacity only */}
          <div
            aria-hidden="true"
            className="anim-sweep pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-research-soft to-transparent"
          />
        </div>

        <p className="label-mono mt-3 border-t border-line pt-3 text-[10px] text-faint">
          DETERMINISTIC SYNTHETIC SERIES FOR INSTRUMENT CONTEXT, NOT MEASURED MARKET DATA. THE REPLAY INSTRUMENT DEMONSTRATES THE INFORMATION BOUNDARY INTERACTIVELY.
        </p>
      </div>
    </div>
  );
}
