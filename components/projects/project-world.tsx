import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import Metric from "@/components/ui/metric";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import ChapterNav from "@/components/case-study/chapter-nav";
import ArchFlow from "@/components/viz/arch-flow";
import ArchitectureExplorer from "./architecture-explorer";
import ProjectSignature from "./project-signature";
import { getArchiveProject, type ArchiveProject } from "@/data/archive";
import { getWorldNav, getProjectWorld } from "@/data/project-worlds";
import { researchEntries } from "@/data/research";
import { publishedArticles } from "@/data/articles";
import { site } from "@/data/site";

/**
 * ProjectWorld — Level 2 of the CN2.DEV architecture.
 *
 * One home for one build: a cinematic entrance with the project's own
 * visual signature, a compact sticky navigation, and sections that are
 * exposed only when the project actually has that content. The architecture
 * explorer is the Level-4 graph — components connect to the tests, results,
 * limitations and states that belong to them.
 *
 * Everything inside is data-driven: adding a registry entry adopts another
 * project into the same architecture without touching this file.
 */

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line pt-10 md:pt-14">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 shrink-0 rotate-45 bg-signal anim-breathe" aria-hidden="true" />
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

function SubHeading({ children }: { children: React.ReactNode }) {
  return <p className="label-mono mb-5 text-research">{children}</p>;
}

export default function ProjectWorld({ project }: { project: ArchiveProject }) {
  const detail = project.detail;
  const world = getProjectWorld(project.id);
  const nav = getWorldNav(project.id);
  const relatedResearch = researchEntries.filter((r) => r.relatedProject === project.id);
  const relatedArticles = publishedArticles.filter((a) => a.relatedProject === project.id);
  if (!detail) return null;

  return (
    <article>
      {/* ---- entrance: this project's own opening experience ---- */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="field" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                PROJECT WORLD <span className="text-signal">/</span> {project.index}
              </p>
              <p className="label-mono text-faint">{project.tags.join(" / ")}</p>
            </div>
          </Reveal>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* identity + statement + actions */}
            <div>
              <Reveal delay={80}>
                <h1 className="display text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.96]">{project.title}</h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-xl text-lg leading-snug text-foreground md:text-xl">{project.thesis}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                  <span className="label-mono flex items-center gap-2 text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-research" aria-hidden="true" />
                    {project.status}
                  </span>
                  <span className="label-mono text-faint">{project.evidenceLabel}</span>
                </div>
              </Reveal>
              {project.statusNote && (
                <Reveal delay={300}>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{project.statusNote}</p>
                </Reveal>
              )}
              <Reveal delay={360}>
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span key={t} className="label-mono border border-line px-3 py-1.5 text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={420}>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a
                    href="#architecture"
                    className="corner-ticks group inline-flex items-center gap-3 border border-signal/70 bg-signal/10 px-7 py-3.5 label-mono text-signal transition-colors hover:bg-signal hover:text-background"
                  >
                    EXPLORE ARCHITECTURE
                    <span aria-hidden="true" className="arr-down transition-transform duration-300 group-hover:translate-y-1">↓</span>
                  </a>
                  <a
                    href="#evidence"
                    className="label-mono group inline-flex items-center gap-3 border border-line-strong px-7 py-3.5 text-foreground transition-colors hover:border-research hover:text-research"
                  >
                    VIEW EVIDENCE
                    <span aria-hidden="true" className="arr-down transition-transform duration-300 group-hover:translate-y-1">↓</span>
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-mono inline-flex items-center gap-3 border border-line px-7 py-3.5 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                    >
                      {project.githubVerified ? "REPOSITORY →" : "GITHUB PROFILE →"}
                    </a>
                  )}
                </div>
              </Reveal>
            </div>

            {/* the project's signature visual */}
            <Reveal delay={200}>
              <ProjectSignature project={project} />
            </Reveal>
          </div>
        </div>
      </header>

      {/* ---- the world: navigation + exposed sections ---- */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="grid gap-12 py-16 md:py-24 lg:grid-cols-[240px_1fr] lg:gap-20">
          <ChapterNav chapters={nav} />

          <div className="min-w-0 space-y-16 md:space-y-24">
            <Section id="overview" title="OVERVIEW">
              <Prose items={[project.summary, project.categoryLabel]} />
              <div className="mt-8 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span key={t} className="label-mono border border-line px-3 py-1.5 text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </Section>

            <Section id="architecture" title="ARCHITECTURE">
              <div className="space-y-12">
                <ArchitectureExplorer steps={detail.architecture} links={world?.componentLinks ?? []} />
                <div>
                  <SubHeading>DATA FLOW — ARCHITECTURE DIAGRAM, NOT A MEASUREMENT</SubHeading>
                  <ArchFlow steps={detail.architecture} />
                </div>
              </div>
            </Section>

            <Section id="case-study" title="CASE STUDY">
              <div className="space-y-12">
                <div>
                  <SubHeading>THE PROBLEM</SubHeading>
                  <Prose items={detail.problem} />
                </div>
                <div>
                  <SubHeading>THE APPROACH</SubHeading>
                  <BulletList items={detail.approach} tone="research" />
                </div>
                <div>
                  <SubHeading>RESULTS — WITH PROVENANCE</SubHeading>
                  {project.metrics.length > 0 ? (
                    <>
                      <div className="viz-frame max-w-3xl p-4 md:p-6">
                        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
                          {project.metrics.map((m, i) => (
                            <Reveal key={m.label} delay={i * 70}>
                              <Metric metric={m} size="lg" />
                            </Reveal>
                          ))}
                        </div>
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
                          No benchmark has been published for this system yet, so this record stays
                          qualitative.
                        </p>
                      </div>
                    </Reveal>
                  )}
                </div>
                <div>
                  <SubHeading>LIMITATIONS</SubHeading>
                  <BulletList items={detail.limitations} />
                </div>
              </div>
            </Section>

            <Section id="evidence" title="EVIDENCE">
              <div className="space-y-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="label-mono border border-research/60 px-3 py-1.5 text-research">
                    {project.evidenceLabel}
                  </span>
                  <span className="label-mono text-faint">HOW THE CLAIMS ABOVE ARE CHECKED</span>
                </div>
                <BulletList items={detail.testing} tone="research" />
                {project.github && (
                  <Reveal>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-depth label-mono inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                    >
                      {project.githubVerified ? "INSPECT THE REPOSITORY →" : "GITHUB PROFILE →"}
                    </a>
                  </Reveal>
                )}
              </div>
            </Section>

            {/* exposed only when the project has published research or articles */}
            {(relatedResearch.length > 0 || relatedArticles.length > 0) && (
              <Section id="research" title="RESEARCH & EXPERIMENTS">
                <div className="grid gap-px bg-line md:grid-cols-2">
                  {relatedResearch.map((r, i) => (
                    <Reveal key={r.id} delay={i * 80}>
                      <Link
                        href={`/research/${r.id}`}
                        className="card-depth group flex h-full flex-col border border-transparent bg-background p-6 transition-colors hover:bg-surface md:p-8"
                      >
                        <p className="label-mono text-faint">{r.category} · {r.status}</p>
                        <h3 className="display mt-3 text-xl md:text-2xl">{r.title}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-muted">{r.result}</p>
                        <span className="label-mono mt-auto pt-6 text-research transition-transform duration-300 group-hover:translate-x-1">
                          OPEN THE ENTRY →
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                  {relatedArticles.map((a, i) => (
                    <Reveal key={a.id} delay={i * 80}>
                      <Link
                        href={`/articles/${a.id}`}
                        className="card-depth group flex h-full flex-col border border-transparent bg-background p-6 transition-colors hover:bg-surface md:p-8"
                      >
                        <p className="label-mono text-faint">{a.category} · ARTICLE</p>
                        <h3 className="display mt-3 text-xl md:text-2xl">{a.title}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-muted">{a.dek}</p>
                        <span className="label-mono mt-auto pt-6 text-signal transition-transform duration-300 group-hover:translate-x-1">
                          READ THE ARTICLE →
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </Section>
            )}

            <Section id="documentation" title="DOCUMENTATION">
              <BulletList items={detail.artifacts} tone="research" />
            </Section>

            <Section id="related-work" title="RELATED WORK">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {world?.related.map((rel, i) => {
                  const target = getArchiveProject(rel.id);
                  if (!target) return null;
                  return (
                    <Reveal key={rel.id} delay={i * 80}>
                      <Link
                        href={`/builds/${rel.id}`}
                        className="card-depth group flex h-full flex-col border border-line bg-surface p-6 transition-colors hover:border-signal/60 md:p-7"
                      >
                        <p className="label-mono text-faint">{target.status}</p>
                        <h3 className="display mt-3 text-lg md:text-xl">{target.title}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-muted">{rel.reason}</p>
                        <span className="label-mono mt-auto pt-6 text-signal transition-transform duration-300 group-hover:translate-x-1">
                          ENTER ITS WORLD →
                        </span>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </Section>
          </div>
        </div>
      </div>

      {/* ---- the way out ---- */}
      <section aria-label="World navigation" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/builds"
                className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                ← ALL PROJECTS
              </Link>
              <a
                href="#overview"
                className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                ↑ WORLD TOP
              </a>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link href="/research" className="link-line label-mono text-xs text-muted hover:text-research">
                RESEARCH LIBRARY →
              </Link>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line label-mono text-xs text-muted hover:text-signal"
              >
                GITHUB →
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
