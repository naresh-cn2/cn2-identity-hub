import type { ProjectMetric } from "@/data/projects";

export default function Metric({ metric, size = "md" }: { metric: ProjectMetric; size?: "md" | "lg" }) {
  return (
    <div className="corner-ticks border border-line bg-surface p-5 md:p-6">
      <p
        className={`num-mono font-semibold leading-none ${
          size === "lg" ? "text-[clamp(2.2rem,4.5vw,3.6rem)]" : "text-[clamp(1.6rem,3vw,2.4rem)]"
        }`}
      >
        {metric.value}
      </p>
      <p className="label-mono mt-4 text-foreground">{metric.label}</p>
      <p className="label-mono mt-1 text-faint">{metric.context}</p>
    </div>
  );
}
