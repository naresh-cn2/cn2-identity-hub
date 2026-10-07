"use client";

import { useVisible } from "@/lib/use-visible";
import { rDistribution } from "@/lib/series";

interface RRDistributionProps {
  seed?: number;
  trades?: number;
  className?: string;
  summary: string;
}

const BUCKET_LABELS = ["-3R", "-2R", "-1R", "0R", "+1R", "+2R", "+3R", "+4R", "+5R", "+6R", "+7R", "+8R", "+9R"];

export default function RRDistribution({ seed = 7, trades = 200, className = "", summary }: RRDistributionProps) {
  const { ref, visible } = useVisible<HTMLDivElement>();
  const buckets = rDistribution(seed, trades);
  const max = Math.max(...buckets);

  return (
    <div ref={ref} className={`${visible ? "is-visible" : ""} ${className}`}>
      <svg viewBox="0 0 1000 320" className="h-auto w-full" role="img" aria-label={summary}>
        <title>{summary}</title>
        {buckets.map((count, i) => {
          const bw = 1000 / buckets.length;
          const h = (count / max) * 240;
          const x = i * bw + bw * 0.18;
          const negative = i < 3;
          return (
            <g key={i}>
              <rect
                x={x}
                y={280 - h}
                width={bw * 0.64}
                height={h}
                fill={negative ? "var(--chart-axis)" : "var(--signal)"}
                opacity={negative ? 0.55 : 0.9}
                style={{
                  transform: "scaleY(0)",
                  transformOrigin: `${x + bw * 0.32}px 280px`,
                  transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1)",
                  transitionDelay: `${i * 45}ms`,
                }}
                className="rr-bar"
                data-visible={visible ? "1" : "0"}
              />
              <text
                x={x + bw * 0.32}
                y={302}
                textAnchor="middle"
                className="num-mono"
                fill="var(--faint)"
                fontSize={13}
              >
                {BUCKET_LABELS[i]}
              </text>
              {count > 0 && (
                <text
                  x={x + bw * 0.32}
                  y={272 - h}
                  textAnchor="middle"
                  className="num-mono"
                  fill="var(--muted)"
                  fontSize={12}
                >
                  {count}
                </text>
              )}
            </g>
          );
        })}
        <line x1={0} x2={1000} y1={280} y2={280} stroke="var(--chart-axis)" strokeWidth={1} />
        <style>{`.rr-bar[data-visible="1"] { transform: scaleY(1) !important; }`}</style>
      </svg>
    </div>
  );
}
