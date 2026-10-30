import type { Metadata } from "next";
import KineticText from "@/components/ui/kinetic-text";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import { engagementAreas } from "@/data/lab";
import { labModules } from "@/data/lab";
import { ScopeFlow } from "@/components/opportunities/pathway-visuals";

export const metadata: Metadata = {
  title: "Freelance & Contracts",
  description:
    "Available for defined-scope technical projects: research prototypes, market-data tooling, quantitative analysis systems, and automation workflows.",
  alternates: { canonical: "/opportunities/freelance" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Freelance & Contracts — Bukya Naresh / CN2.dev",
    description:
      "Technical freelance and contract work: quantitative research, market-data engineering, FinTech systems.",
  },
};

export default function FreelancePage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="pathways" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                PATH <span className="text-signal">/</span> FREELANCE & CONTRACTS
              </p>
              <p className="label-mono text-faint">TECHNICAL PROJECTS & RESEARCH PROTOTYPES</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <KineticText accent={"CONTRACTS"} className="display mt-8 text-[clamp(2.8rem,9vw,7rem)]">
              FREELANCE
            </KineticText>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                I&apos;m available for defined-scope technical projects: research prototypes,
                market-data tooling, quantitative analysis systems, and automation workflows.
                Every engagement ends with working software, reproducible artifacts, and written
                limitations.
              </p>
              <div className="viz-frame p-4 md:p-6">
                <div className="relative z-10">
                  <ScopeFlow />
                  <p className="label-mono mt-3 border-t border-line pt-3 text-[10px] text-faint">
                    ENGAGEMENT FLOW — PROBLEM → BUILD → ARTIFACT.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      <section aria-label="Scope alignment" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-signal">SCOPE ALIGNMENT</p>
            <h2 className="display mt-4 text-3xl md:text-5xl">THE PROBLEM, THE BUILD, THE DELIVERABLE</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              I scope engagements by deliverable rather than by hours. Each row below maps a
              common client problem to the system that addresses it and the artifact you
              receive at handover.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px bg-line">
            {[
              {
                have: "Market question without a harness",
                build: "Deterministic research engine + reproducible artifacts",
                get: "A result that regenerates byte-identically, plus its limitations",
              },
              {
                have: "Vendor and internal data that disagrees with itself",
                build: "Point-in-time safe ingestion, validation and replay",
                get: "One canonical model, with the failure modes quarantined and visible",
              },
              {
                have: "A strategy that looks good and cannot be trusted",
                build: "Adversarial tests, cost modelling and structural risk gates",
                get: "An honest read on what the strategy actually does",
              },
              {
                have: "Cost or financial data at volume",
                build: "High-throughput, low-dependency processing",
                get: "A published benchmark with its methodology attached",
              },
            ].map((row, i) => (
              <Reveal key={row.have} delay={Math.min(i, 3) * 70}>
                <div className="grid gap-6 bg-background p-6 md:grid-cols-[1fr_1.2fr_1.2fr] md:items-start md:gap-10 md:p-8">
                  <div>
                    <p className="label-mono text-[10px] text-faint md:hidden">YOU HAVE</p>
                    <p className="text-base leading-relaxed text-muted md:text-lg">{row.have}</p>
                  </div>
                  <div className="border-t border-line pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    <p className="label-mono text-[10px] text-signal">WHAT I BUILD</p>
                    <p className="mt-2 text-base leading-relaxed text-foreground">{row.build}</p>
                  </div>
                  <div className="border-t border-line pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    <p className="label-mono text-[10px] text-research">WHAT YOU GET</p>
                    <p className="mt-2 text-base leading-relaxed text-foreground">{row.get}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Engagement areas" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl">ENGAGEMENT AREAS</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              These are the areas where I can take work end to end — each one backed by systems
              I have already built and used in practice.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {engagementAreas.map((area, i) => (
              <Reveal key={area.title} delay={Math.min(i, 3) * 80}>
                <div className="corner-ticks h-full bg-background p-6 md:p-8">
                  <h3 className="display mt-4 text-xl md:text-2xl">{area.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{area.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="How to start" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-faint">STARTING POINT</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 grid gap-px bg-line sm:grid-cols-2">
              {[
                { n: "01", t: "DESCRIBE THE QUESTION", d: "What are you trying to find out, and what would count as an answer? If that second half is unclear, that is the first thing we work on." },
                { n: "02", t: "DESCRIBE THE DATA", d: "What exists, where it lives, and what state it is in. Data reality usually determines the shape of the project." },
                { n: "03", t: "AGREE THE EVIDENCE", d: "We decide in advance what artifact would prove the work succeeded. This is fixed before anything is built." },
                { n: "04", t: "BUILD AND HAND OVER", d: "You get the system, the reproducible artifact, the published benchmark or test result, and the written limitations." },
              ].map((s) => (
                <div key={s.n} className="bg-background p-6">
                  <span className="num-mono text-xs text-signal">{s.n}</span>
                  <h3 className="display mt-3 text-lg">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="Lab instruments" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <h2 className="display text-3xl md:text-5xl">TOOLS I USE</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              The same instruments that power the research — available as part of the engagement.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {labModules.map((m, i) => (
              <Reveal key={m.id} delay={i * 60}>
                <Link
                  href={m.href}
                  className="card-depth group flex h-full flex-col border border-line bg-background p-4"
                >
                  <span className="label-mono text-faint">LAB / {m.code}</span>
                  <span className="display mt-2 text-lg md:text-xl">{m.name}</span>
                  <p className="mt-2 text-sm leading-relaxed text-muted flex-1">{m.description}</p>
                  <span className="label-mono mt-4 text-signal transition-transform duration-300 group-hover:translate-x-1">
                    OPEN INSTRUMENT →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Contact" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="label-mono text-faint">NEXT</p>
                <p className="display mt-2 text-2xl md:text-3xl">LET&apos;S DEFINE THE SCOPE</p>
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
