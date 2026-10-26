import type { ProjectMetric } from "@/data/projects";
import TiltCard from "@/components/ui/tilt-card";

/**
 * One figure, with its provenance attached.
 *
 * `resultClass` and `provenance` are optional (data/projects/types.ts):
 * when absent nothing extra renders, so legacy records keep their exact
 * original card. The badge is a neutral mono chip — no green/red
 * implication — and provenance is plain text under the context line.
 */
export default function Metric({ metric, size = "md" }: { metric: ProjectMetric; size?: "md" | "lg" }) {
  return (
    <TiltCard className="corner-ticks border border-line bg-surface p-5 md:p-6" max={5}>
      <p
        className={`num-mono font-semibold leading-none ${
          size === "lg" ? "text-[clamp(2.2rem,4.5vw,3.6rem)]" : "text-[clamp(1.6rem,3vw,2.4rem)]"
        }`}
      >
        {metric.value}
      </p>
      <p className="label-mono mt-4 text-foreground">{metric.label}</p>
      {metric.resultClass && (
        <p
          data-result-class={metric.resultClass}
          className="label-mono mt-3 inline-block border border-line px-2 py-1 text-[10px] text-muted"
        >
          {metric.resultClass}
        </p>
      )}
      <p className="label-mono mt-1 text-faint">{metric.context}</p>
      {metric.provenance && (
        <p className="mt-3 text-xs leading-relaxed text-muted">{metric.provenance}</p>
      )}
    </TiltCard>
  );
}
