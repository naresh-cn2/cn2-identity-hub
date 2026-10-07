import Reveal from "@/components/ui/reveal";

interface ArchFlowProps {
  steps: { name: string; role: string; detail?: string[] }[];
  compact?: boolean;
}

/**
 * Architecture pipeline visualization — numbered nodes with a continuous
 * signal line. Staggered reveal activates nodes sequentially on scroll.
 */
export default function ArchFlow({ steps, compact = false }: ArchFlowProps) {
  if (compact) {
    return (
      <ol className="flex flex-col md:grid md:grid-cols-3 md:gap-px md:bg-line">
        {steps.map((step, i) => (
          <Reveal key={step.name} delay={i * 80}>
            <li className="group relative flex items-start gap-4 border border-line bg-surface p-4 md:border-0 md:bg-background md:p-5">
              <span className="num-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="label-mono text-foreground">{step.name}</p>
                <p className="mt-1 text-sm text-muted">{step.role}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    );
  }

  return (
    <ol className="relative">
      {steps.map((step, i) => (
        <Reveal key={step.name} delay={i * 120}>
          <li className="relative grid grid-cols-[3rem_1fr] gap-4 pb-10 md:grid-cols-[6rem_1fr] md:gap-8 md:pb-14">
            <div className="flex flex-col items-center">
              <span className="num-mono border border-line-strong bg-surface px-2 py-1 text-xs text-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`mt-2 w-px flex-1 ${i === steps.length - 1 ? "bg-transparent" : "bg-line-strong"}`}
                aria-hidden="true"
              />
            </div>
            <div className="corner-ticks border border-line bg-surface p-5 transition-colors duration-300 hover:border-line-strong md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="display text-xl md:text-2xl">{step.name}</h3>
                <p className="label-mono text-faint">{step.role}</p>
              </div>
              {step.detail && (
                <ul className="mt-4 space-y-1.5">
                  {step.detail.map((d) => (
                    <li key={d} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
