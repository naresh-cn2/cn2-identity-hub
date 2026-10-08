import Link from "next/link";
import type { ArchiveProject } from "@/data/archive";
import Reveal from "@/components/ui/reveal";
import Metric from "@/components/ui/metric";
import ProjectMark from "./project-mark";
import ChapterNav from "@/components/case-study/chapter-nav";
import ArchFlow from "@/components/viz/arch-flow";

/**
 * Tier-2 build record.
 *
 * Same chapter discipline as a flagship case study, at the evidence surface
 * the project actually supports. Where there is no published benchmark, this
 * page says so instead of implying one.
 */

const CHAPTERS = [
  { id: "overview", label: "OVERVIEW" },
  { id: "problem", label: "PROBLEM" },
  { id: "approach", label: "APPROACH" },
  { id: "architecture", label: "ARCHITECTURE" },
  { id: "results", label: "RESULTS" },
  { id: "limitations", label: "LIMITATIONS" },
  { id: "testing", label: "TESTING" },
  { id: "artifacts", label: "ARTIFACTS" },
  { id: "state", label: "CURRENT STATE" },
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
        <Reveal key={i} delay={i * 70}>
          <p className="text-base leading-relaxed text-muted md:text-lg">{p}</p>
        </Reveal>
      ))}
    </div>
  );
}

function BulletList({ items, tone = "signal" }: { items: string[]; tone?: "signal" | "research" }) {
  return (
    <ul className="max-w-3xl space-y-3">
      {items.map((item, i) => (
        <Reveal key={i} delay={i * 50}>
          <li className="flex gap-3 text-base leading-relaxed text-muted">
            <span
              className={`mt-[0.55em] h-1 w-1 shrink-0 rounded-full ${tone === "signal" ? "bg-signal" : "bg-research"}`}
              aria-hidden="true"
            />
            {item}
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

export default function TierTwoCaseStudy({ project }: { project: ArchiveProject }) {
  const detail = project.detail;
  if (!detail) return null;

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                BUILD RECORD <span className="text-signal">/</span> {project.index}
              </p>
              <p className="label-mono text-faint">
                TIER 2 · {project.tags.join(" / ")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(2.6rem,8vw,6.5rem)]">{project.title}</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground md:text-xl">
              {project.thesis}
            </p>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">{project.summary}</p>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-10 h-40 w-full max-w-3xl border border-line bg-surface md:h-48">
              <ProjectMark id={project.id} />
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="label-mono flex items-center gap-2 text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-research" aria-hidden="true" />
                {project.status}
              </span>
              <span className="label-mono text-faint">{project.evidenceLabel}</span>
            </div>
          </Reveal>
          <Reveal delay={450}>
            <p className="label-mono mt-3 max-w-3xl text-[10px] leading-relaxed text-faint">
              DIAGRAM ABOVE IS ILLUSTRATIVE — IT DEPICTS THE SYSTEM SHAPE, NOT A MEASUREMENT.
            </p>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="grid gap-12 py-16 md:py-24 lg:grid-cols-[240px_1fr] lg:gap-20">
          <ChapterNav chapters={[...CHAPTERS]} />

          <div className="min-w-0 space-y-16 md:space-y-24">
            <Chapter id="overview" index={0} title="OVERVIEW">
              <Prose items={[project.summary, project.categoryLabel]} />
              <div className="mt-8 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span key={t} className="label-mono border border-line px-3 py-1.5 text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </Chapter>

            <Chapter id="problem" index={1} title="PROBLEM">
              <Prose items={detail.problem} />
            </Chapter>

            <Chapter id="approach" index={2} title="APPROACH">
              <BulletList items={detail.approach} tone="research" />
            </Chapter>

            <Chapter id="architecture" index={3} title="ARCHITECTURE">
              <ArchFlow steps={detail.architecture} />
            </Chapter>

            <Chapter id="results" index={4} title="RESULTS">
              {project.metrics.length > 0 ? (
                <>
                  <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {project.metrics.map((m, i) => (
                      <Reveal key={m.label} delay={i * 70}>
                        <Metric metric={m} size="lg" />
                      </Reveal>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Prose items={detail.results} />
                  </div>
                </>
              ) : (
                <Reveal>
                  <div className="corner-ticks max-w-3xl border border-signal bg-surface p-6 md:p-8">
                    <p className="label-mono text-signal">NO PUBLISHED BENCHMARK</p>
                    <p className="mt-4 text-base leading-relaxed text-muted">
                      This system has no released performance figures. Quoting a number here would
                      mean inventing one, so this record stays qualitative until the benchmark is
                      published alongside the code.
                    </p>
                  </div>
                </Reveal>
              )}
            </Chapter>

            <Chapter id="limitations" index={5} title="LIMITATIONS">
              <BulletList items={detail.limitations} />
            </Chapter>

            <Chapter id="testing" index={6} title="TESTING">
              <Prose items={detail.testing} />
            </Chapter>

            <Chapter id="artifacts" index={7} title="ARTIFACTS">
              <BulletList items={detail.artifacts} tone="research" />
            </Chapter>

            <Chapter id="state" index={8} title="CURRENT STATE">
              <Reveal>
                <div className="corner-ticks max-w-3xl border border-line bg-surface p-6 md:p-8">
                  <p className="label-mono text-signal">{project.status}</p>
                  <div className="mt-4">
                    <Prose items={detail.currentState} />
                  </div>
                </div>
              </Reveal>

              <div className="mt-10 flex flex-wrap gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                  >
                    {project.githubVerified ? "REPOSITORY →" : "GITHUB PROFILE →"}
                  </a>
                )}
                <Link
                  href="/builds"
                  className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                >
                  ← ALL BUILDS
                </Link>
              </div>
            </Chapter>
          </div>
        </div>
      </div>
    </article>
  );
}
