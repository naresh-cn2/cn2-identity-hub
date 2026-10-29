import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import ArchFlow from "@/components/viz/arch-flow";
import { type ComprehensiveWorkItem, WORK_CATEGORIES } from "@/data/works";

interface Props {
  item: ComprehensiveWorkItem;
}

export default function ComprehensiveCaseStudy({ item }: Props) {
  const categoryMeta = WORK_CATEGORIES[item.workCategory];

  return (
    <article className="overflow-hidden">
      {/* ---- 1. OVERVIEW HERO ---- */}
      <header className="relative border-b border-line bg-surface/30">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-28 sm:px-8 md:pb-24 md:pt-36">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono">
                <Link href="/works" className="text-faint hover:text-foreground">
                  WORKS
                </Link>
                <span className="text-line-strong">/</span>
                <Link href={`/works/${categoryMeta.slug}`} className="text-signal hover:underline">
                  {categoryMeta.title}
                </Link>
                <span className="text-line-strong">/</span>
                <span className="text-foreground font-bold">{item.shortTitle}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="pulse-dot h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
                <span className="label-mono text-xs font-bold text-foreground">{item.status}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 flex flex-wrap items-baseline gap-4">
              <span className="num-mono text-3xl font-bold text-signal">{item.index}</span>
              <p className="label-mono text-faint">{item.categoryLabel}</p>
            </div>
            <h1 className="display mt-4 text-[clamp(2.5rem,7vw,5.5rem)] text-foreground">
              {item.title}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-3xl text-lg font-mono font-semibold text-foreground/90 md:text-xl">
              {item.thesis}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-muted md:text-lg">
              {item.summary}
            </p>
          </Reveal>

          {/* Quick Metrics Bar */}
          {item.metrics.length > 0 && (
            <Reveal delay={260}>
              <div className="mt-10 grid gap-4 border-t border-line/80 pt-8 sm:grid-cols-3">
                {item.metrics.map((m) => (
                  <div key={m.label} className="border border-line bg-surface p-4">
                    <p className="label-mono text-[9px] text-faint">{m.label}</p>
                    <p className="num-mono mt-1 text-2xl font-bold text-foreground">{m.value}</p>
                    <p className="label-mono mt-1 text-[8px] text-research">{m.context}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* Direct Jump Navigation Strip */}
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line/60 pt-6">
            <span className="label-mono text-[10px] text-faint mr-2">QUICK JUMP:</span>
            {[
              { label: "PROBLEM", href: "#problem" },
              { label: "WHY I BUILT IT", href: "#why" },
              { label: "ARCHITECTURE", href: "#architecture" },
              { label: "CAPABILITIES", href: "#capabilities" },
              { label: "TECH STACK", href: "#tech-stack" },
              { label: "CHALLENGES", href: "#challenges" },
              { label: "EVIDENCE & RESULTS", href: "#results" },
              { label: "RESOURCES", href: "#links" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="label-mono border border-line bg-background/50 px-3 py-1 text-[10px] text-muted hover:border-signal hover:text-signal"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24 space-y-20">
        {/* ---- 2. THE PROBLEM ---- */}
        <section id="problem" className="scroll-mt-28 border-t border-line pt-12">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <h2 className="display text-2xl md:text-4xl text-foreground">02 / THE PROBLEM</h2>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {item.detail?.problem ? (
              item.detail.problem.map((prob, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="border border-line bg-surface p-6">
                    <span className="label-mono text-signal text-xs">PROBLEM STATEMENT 0{i + 1}</span>
                    <p className="mt-3 text-base leading-relaxed text-muted">{prob}</p>
                  </div>
                </Reveal>
              ))
            ) : (
              <Reveal>
                <div className="border border-line bg-surface p-6">
                  <p className="text-base leading-relaxed text-muted">{item.summary}</p>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* ---- 3. WHY I BUILT IT ---- */}
        <section id="why" className="scroll-mt-28 border-t border-line pt-12">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-research" />
              <h2 className="display text-2xl md:text-4xl text-foreground">03 / WHY I BUILT IT</h2>
            </div>
            <p className="label-mono mt-2 text-faint">ENGINEERING MOTIVATION &amp; OBJECTIVES</p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {item.whyIBuiltIt.map((reason, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="border-l-2 border-research bg-surface/60 p-6">
                  <p className="text-base leading-relaxed text-foreground/90 font-sans">{reason}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- 4. ARCHITECTURE ---- */}
        <section id="architecture" className="scroll-mt-28 border-t border-line pt-12">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              <h2 className="display text-2xl md:text-4xl text-foreground">04 / ARCHITECTURE</h2>
            </div>
            <p className="label-mono mt-2 text-faint">MODULAR STATE MACHINE &amp; PIPELINE FLOW</p>
          </Reveal>

          {item.detail?.architecture && item.detail.architecture.length > 0 && (
            <div className="mt-10">
              <ArchFlow
                steps={item.detail.architecture.map((a) => ({
                  name: a.name,
                  role: a.role,
                  detail: a.detail,
                }))}
              />
            </div>
          )}

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {item.detail?.architecture?.map((layer, i) => (
              <Reveal key={layer.name} delay={i * 60}>
                <div className="border border-line bg-surface p-5">
                  <span className="num-mono text-xs text-signal">LAYER 0{i + 1}</span>
                  <h3 className="font-mono text-sm font-bold text-foreground mt-2">{layer.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{layer.role}</p>
                  {layer.detail && (
                    <ul className="mt-3 space-y-1 border-t border-line/60 pt-3">
                      {layer.detail.map((d) => (
                        <li key={d} className="label-mono text-[9px] text-faint flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-foreground/40" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- 5. KEY CAPABILITIES ---- */}
        <section id="capabilities" className="scroll-mt-28 border-t border-line pt-12">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <h2 className="display text-2xl md:text-4xl text-foreground">05 / KEY CAPABILITIES</h2>
            </div>
            <p className="label-mono mt-2 text-faint">CORE ENGINES &amp; SYSTEM MODULES</p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {item.keyCapabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 70}>
                <div className="border border-line bg-surface p-6 hover:border-signal/50 transition-colors">
                  <h3 className="font-mono text-base font-bold text-foreground flex items-center gap-2">
                    <span className="text-signal text-xs">◆</span>
                    <span>{cap.title}</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{cap.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- 6. TECHNOLOGY STACK ---- */}
        <section id="tech-stack" className="scroll-mt-28 border-t border-line pt-12">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-research" />
              <h2 className="display text-2xl md:text-4xl text-foreground">06 / TECHNOLOGY STACK</h2>
            </div>
            <p className="label-mono mt-2 text-faint">LANGUAGES, PROTOCOLS &amp; RUNTIME INFRASTRUCTURE</p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-sm border border-line-strong bg-surface px-4 py-2 font-semibold text-foreground shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ---- 7. ENGINEERING CHALLENGES ---- */}
        <section id="challenges" className="scroll-mt-28 border-t border-line pt-12">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <h2 className="display text-2xl md:text-4xl text-foreground">07 / ENGINEERING CHALLENGES</h2>
            </div>
            <p className="label-mono mt-2 text-faint">BOTTLENECK INVESTIGATION &amp; RESOLUTION</p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {item.engineeringChallenges.map((ch, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="border border-line bg-surface p-6 space-y-4">
                  <div>
                    <span className="label-mono text-xs text-signal">CHALLENGE 0{i + 1}</span>
                    <p className="mt-2 text-sm leading-relaxed text-foreground font-semibold">
                      {ch.challenge}
                    </p>
                  </div>
                  <div className="border-t border-line pt-4">
                    <span className="label-mono text-xs text-research">IMPLEMENTED SOLUTION</span>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{ch.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- 8. DEVELOPMENT JOURNEY ---- */}
        <section id="journey" className="scroll-mt-28 border-t border-line pt-12">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              <h2 className="display text-2xl md:text-4xl text-foreground">08 / DEVELOPMENT JOURNEY</h2>
            </div>
            <p className="label-mono mt-2 text-faint">EVOLUTIONARY PHASES &amp; MILESTONES</p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {item.developmentJourney.map((stage) => (
              <div key={stage.phase} className="border border-line bg-surface p-6">
                <span className="num-mono text-xs font-bold text-signal">{stage.phase}</span>
                <h3 className="font-mono text-base font-bold text-foreground mt-2">{stage.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{stage.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- 9. CASE STUDIES ---- */}
        {item.caseStudiesList && item.caseStudiesList.length > 0 && (
          <section id="case-studies" className="scroll-mt-28 border-t border-line pt-12">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-signal" />
                <h2 className="display text-2xl md:text-4xl text-foreground">09 / CASE STUDIES</h2>
              </div>
              <p className="label-mono mt-2 text-faint">EMPIRICAL SCENARIO INVESTIGATIONS</p>
            </Reveal>
            <div className="mt-8 grid gap-6">
              {item.caseStudiesList.map((cs, i) => (
                <div key={cs.title} className="border border-line bg-surface p-6 md:p-8">
                  <span className="num-mono text-xs text-signal">CASE 0{i + 1}</span>
                  <h3 className="display text-xl md:text-2xl mt-2">{cs.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{cs.summary}</p>
                  <div className="mt-5 border-t border-line pt-4">
                    <span className="label-mono text-xs text-research font-bold">VERIFIED OUTCOME</span>
                    <p className="mt-2 text-sm text-foreground/90 font-mono">{cs.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---- 10. EVIDENCE & RESULTS ---- */}
        <section id="results" className="scroll-mt-28 border-t border-line pt-12">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-research" />
              <h2 className="display text-2xl md:text-4xl text-foreground">10 / EVIDENCE &amp; RESULTS</h2>
            </div>
            <p className="label-mono mt-2 text-faint">VERIFIED TEST SUITES, BENCHMARKS &amp; HONEST LIMITATIONS</p>
          </Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="border border-line bg-surface p-6 md:p-8">
              <span className="label-mono text-research text-xs font-bold">EMPIRICAL FINDINGS</span>
              <ul className="mt-4 space-y-3">
                {item.evidenceAndResults.map((res, i) => (
                  <li key={i} className="text-sm leading-relaxed text-muted flex items-start gap-2">
                    <span className="text-research font-bold">✓</span>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-line bg-surface p-6 md:p-8">
              <span className="label-mono text-signal text-xs font-bold">HONEST LIMITATIONS</span>
              <ul className="mt-4 space-y-3">
                {item.detail?.limitations ? (
                  item.detail.limitations.map((lim, i) => (
                    <li key={i} className="text-sm leading-relaxed text-muted flex items-start gap-2">
                      <span className="text-signal font-bold">!</span>
                      <span>{lim}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted">
                    Figures are benchmarked on dedicated harnesses and dependent on underlying hardware.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* ---- 11. SCREENSHOTS & VISUALISATIONS ---- */}
        <section id="visuals" className="scroll-mt-28 border-t border-line pt-12">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              <h2 className="display text-2xl md:text-4xl text-foreground">11 / SCREENSHOTS &amp; VISUALISATIONS</h2>
            </div>
            <p className="label-mono mt-2 text-faint">SYSTEM TOPOLOGY &amp; INSTRUMENTATION SCHEMATICS</p>
          </Reveal>
          <div className="mt-8 grid gap-6">
            {item.screenshotsAndVisuals.map((vis) => (
              <div key={vis.title} className="border border-line bg-surface p-6">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <h3 className="font-mono text-sm font-bold text-foreground">{vis.title}</h3>
                  <span className="label-mono text-[9px] border border-line px-2 py-0.5 text-faint">
                    {vis.type.toUpperCase()}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted font-mono">{vis.caption}</p>
                <div className="mt-6 flex h-48 items-center justify-center border border-dashed border-line bg-background/50 text-xs font-mono text-faint">
                  [LIVE SYSTEM TOPOLOGY · TELEMETRY INLINE]
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- 12. LINKS & RESOURCES ---- */}
        <section id="links" className="scroll-mt-28 border-t border-line pt-12">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <h2 className="display text-2xl md:text-4xl text-foreground">12 / LINKS &amp; RESOURCES</h2>
            </div>
            <p className="label-mono mt-2 text-faint">REPOSITORIES, PROOFS &amp; DOCUMENTATION</p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-4">
            {item.linksList.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="label-mono inline-flex items-center gap-2 border border-signal bg-signal/5 px-6 py-3.5 text-xs font-bold text-signal transition-all hover:bg-signal hover:text-white"
              >
                <span>{link.label}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
            <Link
              href={`/works/${categoryMeta.slug}`}
              className="label-mono inline-flex items-center gap-2 border border-line px-6 py-3.5 text-xs font-bold text-muted transition-colors hover:border-foreground hover:text-foreground"
            >
              <span>← RETURN TO {categoryMeta.title}</span>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
