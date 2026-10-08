import type { Metadata } from "next";
import Link from "next/link";
import { career } from "@/data/career";
import { site } from "@/data/site";
import Reveal from "@/components/ui/reveal";
import { DataField } from "@/components/viz/quant-primitives";

export const metadata: Metadata = {
  title: "Career",
  description:
    "What Bukya Naresh builds, studies and can contribute — quantitative engines, market-data infrastructure, research governance and performance systems, with evidence per claim.",
  alternates: { canonical: "/career" },
};

export default function CareerPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <p className="label-mono text-muted">
              DOMAIN <span className="text-signal">/</span> 06 — CAREER
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">
              {site.name}
              <br />
              <span className="text-signal">{site.identity}</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Not a resume wall. What is built, what is studied, what can be contributed — and the
              evidence behind each claim.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-10 h-64 w-full max-w-4xl">
              <DataField seed={44} gridSize={20} amplitude={0.4} showSignalTrace />
            </div>
          </Reveal>
        </div>
      </header>

      {/* what I build */}
      <section aria-label="What I build" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl">WHAT I BUILD</h2>
          </Reveal>
          <div className="mt-12 space-y-px bg-line">
            {career.whatIBuild.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i, 2) * 80}>
                <div className="grid gap-4 bg-background p-6 md:grid-cols-[16rem_1fr_14rem] md:items-baseline md:gap-10 md:p-8">
                  <h3 className="display text-xl md:text-2xl">{item.title}</h3>
                  <p className="text-base leading-relaxed text-muted">{item.body}</p>
                  <p className="label-mono text-faint">EVIDENCE — {item.evidence.toUpperCase()}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* what I study */}
      <section aria-label="What I study" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl">WHAT I STUDY</h2>
          </Reveal>
          <ul className="mt-12 grid gap-px bg-line md:grid-cols-2">
            {career.whatIStudy.map((s, i) => (
              <Reveal key={s} delay={Math.min(i, 3) * 60}>
                <li className="flex h-full items-start gap-4 bg-background p-5">
                  <span className="num-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-base leading-relaxed text-muted">{s}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* contribution */}
      <section aria-label="What I can contribute" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl">WHAT I CAN CONTRIBUTE</h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
            {career.whatIContribute.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="corner-ticks h-full bg-background p-6">
                  <h3 className="display text-lg md:text-xl">{c.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* what I'm open to */}
      <section aria-label="What I'm open to" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl">WHAT I&apos;M OPEN TO</h2>
          </Reveal>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
            Available for quantitative development, research, and engineering roles. Open to
            freelance/contract work in quant/FinTech domains. Interested in research collaboration
            and technical partnerships.
          </p>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {[
              "Quantitative Development",
              "Quantitative Research",
              "Market Data Engineering",
              "FinTech Engineering",
              "Data / AI Engineering",
              "Research Engineering",
              "Technical Freelance",
              "Quant / FinTech Projects",
              "Research Collaboration",
            ].map((item, i) => (
              <Reveal key={item} delay={Math.min(i, 3) * 60}>
                <div className="bg-background p-5 hover:bg-surface transition-colors">
                  <span className="num-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 display text-lg">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* project experience */}
      <section aria-label="Project experience" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">SELECTED EVIDENCE</h2>
              <p className="label-mono text-faint">PROJECT EXPERIENCE — SOLE ARCHITECT / ENGINEER</p>
            </div>
          </Reveal>
          <div className="mt-12 space-y-px bg-line">
            {career.experience.map((exp, i) => {
              const external = exp.href.startsWith("http");
              const inner = (
                <>
                  <span className="num-mono text-4xl font-semibold text-line-strong transition-colors group-hover:text-signal md:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="display block text-xl md:text-3xl">{exp.project}</span>
                    <span className="label-mono mt-2 block text-faint">{exp.role.toUpperCase()}</span>
                    <span className="mt-3 block text-base leading-relaxed text-muted">{exp.scope}</span>
                    <span className="num-mono mt-3 block text-sm text-foreground">{exp.metrics}</span>
                  </span>
                  <span className="label-mono text-signal transition-transform duration-300 group-hover:translate-x-1">
                    {external ? "GITHUB →" : "CASE STUDY →"}
                  </span>
                </>
              );
              const cls =
                "group grid gap-4 bg-background p-6 transition-colors hover:bg-surface md:grid-cols-[5rem_1fr_auto] md:items-start md:gap-8 md:p-8";
              return (
                <Reveal key={exp.project} delay={Math.min(i, 2) * 80}>
                  {external ? (
                    <a href={exp.href} target="_blank" rel="noreferrer" className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={exp.href} className={cls}>
                      {inner}
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer"
                className="corner-ticks label-mono border border-line-strong bg-surface px-6 py-4 transition-colors hover:border-signal hover:text-signal"
              >
                GITHUB — FULL EVIDENCE BASE →
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="label-mono border border-line px-6 py-4 text-muted transition-colors hover:text-foreground"
              >
                LINKEDIN →
              </a>
              <a
                href={site.links.email}
                className="label-mono border border-line px-6 py-4 text-muted transition-colors hover:text-foreground"
              >
                EMAIL →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
