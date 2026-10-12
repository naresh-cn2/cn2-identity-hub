import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import { career } from "@/data/career";
import { studyTracks } from "@/data/certifications";

export const metadata: Metadata = {
  title: "Career — Employment Opportunities",
  description:
    "Education, projects, experience and CV for quantitative development and research roles. Every figure carries its provenance.",
  alternates: { canonical: "/opportunities/career" },
  openGraph: {
    title: "Career — Bukya Naresh / CN2.dev",
    description:
      "Quantitative development and research roles. Education, projects, experience and CV with evidence.",
  },
};

export default function CareerPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                PATH <span className="text-signal">/</span> 01 — EMPLOYMENT
              </p>
              <p className="label-mono text-faint">QUANTITATIVE DEVELOPMENT & RESEARCH ROLES</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(2.8rem,9vw,7rem)]">
              CAREER
              <br />
              <span className="text-signal">OPPORTUNITIES</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Seeking roles in quantitative development, systematic trading research, market-data
              infrastructure, and risk engineering. This page details education, projects, experience
              and an actual CV — all evidenced in the archive.
            </p>
          </Reveal>
        </div>
      </header>

      <section aria-label="Education" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-signal">EDUCATION &amp; STUDY</p>
            <h2 className="display mt-4 text-3xl md:text-5xl">ACTIVE STUDY TRACKS</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Self-directed study, evidenced by the archive — not credentials. Each track has
              produced working systems you can inspect.
            </p>
          </Reveal>
          <div className="mt-10 space-y-8">
            {studyTracks.map((track, i) => (
              <Reveal key={track.id} delay={i * 80}>
                <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-start md:gap-10">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="num-mono text-3xl font-semibold text-line-strong">{track.index}</span>
                    <span className="label-mono mt-2 text-[10px] text-faint">{track.state}</span>
                  </div>
                  <div>
                    <h3 className="display text-xl md:text-2xl">{track.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted">{track.focus}</p>
                    <Link
                      href="/certifications#study"
                      className="link-line label-mono mt-4 inline-block text-[10px] text-foreground transition-colors hover:text-signal"
                    >
                      FULL STUDY RECORD →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Experience" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-signal">EXPERIENCE</p>
            <h2 className="display mt-4 text-3xl md:text-5xl">SYSTEMS BUILT</h2>
          </Reveal>
          <div className="mt-10 space-y-8">
            {career.experience.map((exp, i) => (
              <Reveal key={exp.project} delay={i * 80}>
                <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-start md:gap-10">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="num-mono text-3xl font-semibold text-signal">{String(i + 1).padStart(2, "0")}</span>
                    <span className="label-mono mt-2 text-[10px] text-faint">{exp.role}</span>
                  </div>
                  <div>
                    <h3 className="display text-xl md:text-2xl">{exp.project}</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted">{exp.scope}</p>
                    <p className="label-mono mt-3 text-[10px] text-research">{exp.metrics}</p>
                    {exp.href.startsWith("http") ? (
                      <a
                        href={exp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-line label-mono mt-4 inline-block text-[10px] text-foreground transition-colors hover:text-signal"
                      >
                        REPOSITORY ↗
                      </a>
                    ) : (
                      <Link
                        href={exp.href}
                        className="link-line label-mono mt-4 inline-block text-[10px] text-foreground transition-colors hover:text-signal"
                      >
                        OPEN BUILD →
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="CV" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-signal">CURRICULUM VITAE</p>
            <h2 className="display mt-4 text-3xl md:text-5xl">PRINT-READY RECORD</h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 corner-ticks border border-line bg-surface p-6 md:p-10">
              <p className="text-base leading-relaxed text-muted md:text-lg">
                The full record — capability, work and study — in a print-ready format.
              </p>
              <Link
                href="/cv"
                className="label-mono mt-6 inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                DOWNLOAD CV →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="Contact" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="label-mono text-faint">NEXT</p>
                <p className="display mt-2 text-2xl md:text-3xl">START A CONVERSATION</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  CONTACT →
                </Link>
                <Link
                  href="/opportunities"
                  className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                >
                  ALL PATHWAYS →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}