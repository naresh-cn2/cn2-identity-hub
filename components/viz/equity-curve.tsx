"use client";

import { useVisible } from "@/lib/use-visible";
import { drawdownSeries, equitySeries, toPath } from "@/lib/series";

interface EquityCurveProps {
  seed?: number;
  points?: number;
  endValuePct?: number;
  showDrawdown?: boolean;
  className?: string;
  summary: string;
}

const W = 1000;
const H = 360; // 20 equity offset + 210 equity band + 52 gap + 48 drawdown band + labels

export default function EquityCurve({
  seed = 42,
  points = 220,
  endValuePct = 570.18,
  showDrawdown = true,
  className = "",
  summary,
}: EquityCurveProps) {
  const { ref, visible } = useVisible<HTMLDivElement>();

  const series = equitySeries(seed, points);
  const dd = drawdownSeries(series);
  const eqTop = showDrawdown ? 20 : 24;
  const eqHeight = showDrawdown ? 210 : 292;
  const ddTop = eqTop + eqHeight + 52;

  // Paths are generated in band-local coordinates ([0, band height]);
  // each path is positioned via a translate() group so the equity area and the
  // drawdown subplot land in their own bands.
  const ddHeight = 48;
  const eqPath = toPath(series, W, eqHeight, 0);
  const areaPath = `${eqPath} L${W},${eqHeight} L0,${eqHeight} Z`;
  const ddPath = toPath(dd, W, ddHeight, 0);
  const ddAreaPath = `${ddPath} L${W},${ddHeight} L0,${ddHeight} Z`;

  const gridYs = [0.25, 0.5, 0.75].map((f) => eqTop + eqHeight * f);
  const lastX = W;

  const yLabels = [0, endValuePct / 2, endValuePct];
  const maxDD = Math.max(...dd);

  return (
    <div ref={ref} className={`${visible ? "is-visible" : ""} ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={summary}
      >
        <title>{summary}</title>
        {/* gridlines */}
        {gridYs.map((y) => (
          <line key={y} x1={0} x2={W} y1={y} y2={y} stroke="var(--chart-grid)" strokeWidth={1} />
        ))}
        {/* y labels */}
        {yLabels.map((v, i) => (
          <text
            key={i}
            x={4}
            y={eqTop + eqHeight * (i / 2) + 4}
            className="num-mono"
            fill="var(--faint)"
            fontSize={13}
          >
            {v > 0 ? `+${v.toFixed(1)}%` : `${v.toFixed(1)}%`}
          </text>
        ))}
        {/* equity area + line (band-local coordinates, offset by eqTop) */}
        <g transform={`translate(0,${eqTop})`}>
          <path d={areaPath} fill="var(--signal-soft)" />
          <path
            d={eqPath}
            fill="none"
            stroke="var(--signal)"
            strokeWidth={2.5}
            pathLength={1}
            className="chart-draw"
          />
          <circle cx={lastX} cy={series[series.length - 1] ? (1 - series[series.length - 1]) * eqHeight : 0} r={4} fill="var(--signal)" />
        </g>
        {showDrawdown && (
          <g transform={`translate(0,${ddTop})`}>
            <text x={4} y={-10} className="label-mono" fill="var(--faint)" fontSize={12}>
              DRAWDOWN
            </text>
            <line x1={0} x2={W} y1={0} y2={0} stroke="var(--chart-grid)" strokeWidth={1} />
            <path d={ddAreaPath} fill="var(--signal-soft)" opacity={0.4} />
            <path d={ddPath} fill="none" stroke="var(--chart-axis)" strokeWidth={1.5} pathLength={1} className="chart-draw" />
            <text x={W - 4} y={ddHeight + 14} textAnchor="end" className="num-mono" fill="var(--faint)" fontSize={12}>
              MAX {(maxDD * 100).toFixed(1)}% (NORMALIZED TRACE)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
