import Link from "next/link";
import type { FlagshipProject } from "@/data/projects";
import Reveal from "@/components/ui/reveal";
import Metric from "@/components/ui/metric";
import ChapterNav from "./chapter-nav";
import ArchFlow from "@/components/viz/arch-flow";
import InteractiveLab from "./interactive-lab";

const CHAPTERS = [
  { id: "problem", label: "PROBLEM" },
  { id: "motivation", label: "MOTIVATION" },
  { id: "research-question", label: "RESEARCH QUESTION" },
  { id: "objective", label: "OBJECTIVE" },
  { id: "architecture", label: "ARCHITECTURE" },
  { id: "data-flow", label: "DATA FLOW" },
  { id: "methods", label: "METHODS" },
  { id: "risk", label: "RISK / VALIDATION" },
  { id: "experiments", label: "EXPERIMENTS" },
  { id: "results", label: "RESULTS" },
  { id: "limitations", label: "LIMITATIONS" },
  { id: "status", label: "CURRENT STATUS" },
  { id: "evidence", label: "EVIDENCE" },
  { id: "interactive", label: "INTERACTIVE LAB" },
  { id: "github", label: "GITHUB" },
] as const;

function Chapter({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line pt-10 md:pt-14">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="num-mono text-sm text-signal">{String(index + 1).padStart(2, "0")}</span>
          <span className="label-mono text-faint">/</span>
          <h2 className="display text-2xl md:text-4xl">{title}</h2>
        </div>
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Prose({ items }: { items: string[] }) {
  return (
    <div className="max-w-3xl space-y-4">
      {items.map((p, i) => (
        <Reveal key={i} delay={i * 80}>
          <p className="text-base leading-relaxed text-muted md:text-lg">{p}</p>
        </Reveal>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-3xl space-y-3">
      {items.map((item, i) => (
        <Reveal key={i} delay={i * 60}>
          <li className="flex gap-3 text-base leading-relaxed text-muted">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
            {item}
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

export default function CaseStudy({ project }: { project: FlagshipProject }) {
  return (
    <article>
      {/* ---- case study hero ---- */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                CASE STUDY <span className="text-signal">/</span> {project.index}
              </p>
              <p className="label-mono text-faint">{project.category}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,9vw,7.5rem)]">{project.title}</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground md:text-xl">
              {project.position}
            </p>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">{project.summary}</p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="label-mono flex items-center gap-2 text-foreground">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                {project.status}
              </span>
              <span className="label-mono text-faint">{project.statusNote}</span>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- body with sticky chapter nav ---- */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="grid gap-12 py-16 md:py-24 lg:grid-cols-[240px_1fr] lg:gap-20">
          <ChapterNav chapters={[...CHAPTERS]} />

          <div className="min-w-0 space-y-16 md:space-y-24">
            <Chapter id="problem" index={0} title="PROBLEM">
              <Prose items={project.problem} />
            </Chapter>

            <Chapter id="motivation" index={1} title="MOTIVATION">
              <Prose items={project.motivation} />
            </Chapter>

            <Chapter id="research-question" index={2} title="RESEARCH QUESTION">
              <Reveal>
                <blockquote className="corner-ticks max-w-3xl border border-line bg-surface p-6 md:p-8">
                  <p className="text-lg leading-relaxed text-foreground md:text-xl">
                    {project.researchQuestion}
                  </p>
                </blockquote>
              </Reveal>
            </Chapter>

            <Chapter id="objective" index={3} title="OBJECTIVE">
              <BulletList items={project.objective} />
            </Chapter>

            <Chapter id="architecture" index={4} title="ARCHITECTURE">
              <p className="label-mono mb-8 text-faint">VISUAL METAPHOR — {project.visualMetaphor.toUpperCase()}</p>
              <ArchFlow steps={project.architecture} />
            </Chapter>

            <Chapter id="data-flow" index={5} title="DATA FLOW">
              <ol className="max-w-3xl">
                {project.dataFlow.map((step, i) => (
                  <Reveal key={i} delay={i * 70}>
                    <li className="flex items-start gap-4 border-b border-line py-4">
                      <span className="num-mono mt-0.5 shrink-0 text-xs text-signal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base leading-relaxed text-muted">{step}</span>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </Chapter>

            <Chapter id="methods" index={6} title="METHODS">
              <BulletList items={project.methods} />
            </Chapter>

            <Chapter id="risk" index={7} title="RISK / VALIDATION">
              <BulletList items={project.risk} />
            </Chapter>

            <Chapter id="experiments" index={8} title="EXPERIMENTS">
              <div className="space-y-px bg-line">
                {project.experiments.map((exp, i) => (
                  <Reveal key={exp.title} delay={i * 80}>
                    <div className="bg-surface p-5 md:p-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="display text-lg md:text-xl">{exp.title}</h3>
                        <span
                          className={`label-mono ${
                            exp.status === "COMPLETED" ? "text-foreground" : "text-signal"
                          }`}
                        >
                          {exp.status}
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-medium text-foreground">{exp.question}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{exp.result}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Chapter>

            <Chapter id="results" index={9} title="RESULTS">
              <div className="grid gap-px bg-line sm:grid-cols-2">
                {project.results.metrics.map((m, i) => (
                  <Reveal key={m.label} delay={i * 80}>
                    <Metric metric={m} size="lg" />
                  </Reveal>
                ))}
              </div>
              <div className="mt-8">
                <Prose items={project.results.narrative} />
              </div>
            </Chapter>

            <Chapter id="limitations" index={10} title="LIMITATIONS">
              <BulletList items={project.limitations} />
            </Chapter>

            <Chapter id="status" index={11} title="CURRENT STATUS">
              <Reveal>
                <div className="corner-ticks max-w-3xl border border-line bg-surface p-6 md:p-8">
                  <p className="label-mono text-signal">{project.status}</p>
                  <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                    {project.statusNote}
                  </p>
                </div>
              </Reveal>
            </Chapter>

            <Chapter id="evidence" index={12} title="EVIDENCE">
              <div className="grid gap-px bg-line md:grid-cols-3">
                {project.evidence.map((e, i) => (
                  <Reveal key={e.label} delay={i * 80}>
                    <div className="bg-surface p-5">
                      <p className="label-mono text-foreground">{e.label}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{e.detail}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Chapter>

            <Chapter id="interactive" index={13} title="INTERACTIVE LAB">
              <InteractiveLab project={project} />
              <div className="mt-10 grid gap-px bg-line md:grid-cols-2">
                {project.interactive.map((mod, i) => (
                  <Reveal key={mod.title} delay={i * 80}>
                    <Link
                      href={mod.href}
                      className="group flex flex-col bg-surface p-5 transition-colors hover:bg-surface-2"
                    >
                      <p className="label-mono text-foreground transition-colors group-hover:text-signal">
                        {mod.title} <span aria-hidden="true">→</span>
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{mod.description}</p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </Chapter>

            <Chapter id="github" index={14} title="GITHUB">
              <Reveal>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex max-w-3xl items-center justify-between border border-line-strong bg-surface p-6 transition-colors hover:border-signal md:p-8"
                >
                  <div>
                    <p className="label-mono text-faint">SOURCE OF EVIDENCE</p>
                    <p className="mt-2 break-all font-mono text-sm text-foreground md:text-base">
                      {project.github.replace("https://", "")}
                    </p>
                  </div>
                  <span
                    className="display ml-6 text-2xl text-signal transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </Reveal>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span key={t} className="label-mono border border-line px-3 py-1.5 text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </Chapter>
          </div>
        </div>
      </div>
    </article>
  );
}
