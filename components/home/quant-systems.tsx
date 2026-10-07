import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";
import Reveal from "@/components/ui/reveal";
import { flagshipProjects } from "@/data/projects";

export default function QuantSystems() {
  return (
    <section aria-label="Selected quantitative systems">
      <SectionHeader
        act="ACT III"
        code="QUANT"
        title="SELECTED QUANTITATIVE SYSTEMS"
        subtitle="Four flagship builds. Each one is a complete system with a research question at its center."
        meta="04 FLAGSHIPS"
      />

      <div className="border-t border-line">
        {flagshipProjects.map((project, i) => (
          <Reveal key={project.id} delay={i * 60}>
            <Link
              href={project.route}
              className="group relative block border-b border-line transition-colors duration-500 hover:bg-signal-soft"
            >
              <div className="mx-auto grid max-w-[1440px] gap-6 px-5 py-12 sm:px-8 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-10 md:py-16">
                <p className="num-mono select-none text-5xl leading-none text-line-strong transition-colors duration-500 group-hover:text-signal md:text-7xl">
                  {project.index}
                </p>

                <div>
                  <p className="label-mono text-faint">{project.category}</p>
                  <h3 className="display mt-3 text-[clamp(2.2rem,6vw,4.8rem)] leading-[0.95] transition-transform duration-500 group-hover:translate-x-2">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{project.thesis}</p>

                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                    <span className="num-mono border border-signal px-2.5 py-1 text-[10px] text-signal">
                      {project.status}
                    </span>
                    {project.results.metrics.slice(0, 3).map((m) => (
                      <span key={m.label} className="num-mono text-[10px] text-faint">
                        <span className="text-foreground">{m.value}</span> — {m.label}
                      </span>
                    ))}
                  </div>
                </div>

                <p
                  className="num-mono hidden self-center text-2xl text-faint transition-all duration-500 group-hover:translate-x-2 group-hover:text-signal md:block"
                  aria-hidden="true"
                >
                  →
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8">
        <Reveal>
          <p className="label-mono text-xs text-muted">
            ALL RESULTS ARE <span className="text-signal">BACKTEST / SIMULATION / PAPER</span> — NEVER LIVE PERFORMANCE.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
