import type { Metadata } from "next";
import KineticText from "@/components/ui/kinetic-text";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import { career } from "@/data/career";
import { studyTracks } from "@/data/credentials";
import { RecordSpine } from "@/components/opportunities/pathway-visuals";

export const metadata: Metadata = {
  title: "Career — Employment Opportunities",
  description:
    "Education, projects and CV for quantitative development and research roles.",
  alternates: { canonical: "/opportunities/career" },
  openGraph: {
    title: "Career — Bukya Naresh / CN2.dev",
    description:
      "Quantitative development and research roles. Education, projects, experience and CV.",
  },
};

export default function CareerPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="pathways" />
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
            <KineticText accent={"OPPORTUNITIES"} className="display mt-8 text-[clamp(2.8rem,9vw,7rem)]">
              CAREER
            </KineticText>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                I&apos;m seeking roles in quantitative development, systematic trading research,
                market-data infrastructure, and risk engineering. Below is my study record, the
                systems I&apos;ve built, and a print-ready CV.
              </p>
              <div className="viz-frame p-4 md:p-6">
                <div className="relative z-10">
                  <RecordSpine />
                  <p className="label-mono mt-3 border-t border-line pt-3 text-[10px] text-faint">
                    CAREER PATH — STUDY, SYSTEMS, RECORD.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      <section aria-label="Education" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-signal">EDUCATION &amp; STUDY</p>
            <h2 className="display mt-4 text-3xl md:text-5xl">ACTIVE STUDY TRACKS</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              These are self-directed study tracks rather than formal qualifications — each
              one has produced working systems you can inspect.
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
                      href="/credentials#study"
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
                        OPEN PROJECT →
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
            <div className="card-depth mt-8 corner-ticks border border-line bg-surface p-6 md:p-10">
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
