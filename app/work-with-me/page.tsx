import type { Metadata } from "next";
import KineticText from "@/components/ui/kinetic-text";
import Link from "next/link";
import { engagementAreas } from "@/data/lab";
import { site, utilityLinks } from "@/data/site";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import PosterPlate from "@/components/viz/poster-plates";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Open to quantitative research, market-data systems, FinTech engineering, research tooling and technical collaboration — scoped by deliverable.",
  alternates: { canonical: "/work-with-me" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Work With Me — Bukya Naresh / CN2.dev",
    description:
      "Quantitative research, market-data systems, FinTech engineering and technical collaboration.",
  },
};

const ALIGNMENT = [
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
];

const PHRASING = [
  {
    label: "OPEN TO",
    items: [
      "Quantitative development roles",
      "Quantitative research roles",
      "Market-data engineering",
      "FinTech / research engineering",
    ],
  },
  {
    label: "AVAILABLE FOR",
    items: [
      "Technical freelance and contract work",
      "Quant / FinTech engineering projects",
      "Research tooling and prototyping",
    ],
  },
  {
    label: "INTERESTED IN",
    items: [
      "Research collaboration",
      "Open-source data infrastructure",
      "Technical partnerships",
    ],
  },
];

export default function WorkWithMePage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="signal" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                SECTION <span className="text-signal">/</span> WORK WITH ME
              </p>
              <p className="label-mono text-faint">{site.status}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <KineticText accent={"WITH ME"} className="display mt-8 text-[clamp(2.8rem,9.5vw,7.5rem)]">
              WORK
            </KineticText>
          </Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-14">
            <div>
              <Reveal delay={200}>
                <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                  Research-grade engineering for quantitative problems. This is an individual practice —
                  one person, named on every deliverable, no agency and no bench behind the curtain.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <p className="label-mono mt-8 text-muted">
                  {site.name} / {site.identity} / {site.system}
                </p>
              </Reveal>
            </div>
            <Reveal delay={320}>
              <PosterPlate
                variant="threshold"
                label="PLATE / THRESHOLD"
                alt="Illustration: a hooded figure seen from behind, rim-lit red on one side and portal-blue on the other, standing where three light paths converge."
              />
            </Reveal>
          </div>
        </div>
      </header>

      {/* ---- what you need → what I build → what you get ---- */}
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
            {ALIGNMENT.map((row, i) => (
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

      {/* ---- engagement areas ---- */}
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
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/capabilities"
              className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
            >
              FULL CAPABILITY MAP →
            </Link>
            <Link
              href="/work"
              className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
            >
              SEE THE EVIDENCE →
            </Link>
          </div>
        </div>
      </section>

      {/* ---- explicit framing ---- */}
      <section aria-label="What I am open to" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="label-mono text-faint">CURRENTLY OPEN TO</p>
            <h2 className="display mt-4 text-3xl md:text-5xl">OPEN TO · AVAILABLE FOR · INTERESTED IN</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              These are the shapes of work I am actively open to right now — roles, contracts
              and collaborations where quantitative thinking and solid engineering matter.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-px bg-line lg:grid-cols-3">
            {PHRASING.map((p, i) => (
              <Reveal key={p.label} delay={i * 90}>
                <div className="h-full bg-background p-6 md:p-8">
                  <p className="label-mono text-signal">{p.label}</p>
                  <ul className="mt-6 space-y-4">
                    {p.items.map((item) => (
                      <li key={item} className="flex gap-3 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                        <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- how to start ---- */}
      <section aria-label="How to start" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-10 md:grid-cols-[16rem_1fr] md:gap-16">
            <Reveal>
              <p className="label-mono text-faint">STARTING POINT</p>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid gap-px bg-line sm:grid-cols-2">
                {[
                  {
                    n: "01",
                    t: "DESCRIBE THE QUESTION",
                    d: "What are you trying to find out, and what would count as an answer? If that second half is unclear, that is the first thing we work on.",
                  },
                  {
                    n: "02",
                    t: "DESCRIBE THE DATA",
                    d: "What exists, where it lives, and what state it is in. Data reality usually determines the shape of the project.",
                  },
                  {
                    n: "03",
                    t: "AGREE THE EVIDENCE",
                    d: "We decide in advance what artifact would prove the work succeeded. This is fixed before anything is built.",
                  },
                  {
                    n: "04",
                    t: "BUILD AND HAND OVER",
                    d: "You get the system, the reproducible artifact, the published benchmark or test result, and the written limitations.",
                  },
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
        </div>
      </section>

      {/* ---- contact ---- */}
      <section aria-label="Contact" className="border-b border-line">
        <div className="scanlines relative mx-auto max-w-[1440px] px-5 py-20 text-center sm:px-8 md:py-32">
          <Reveal>
            <p className="label-mono text-faint">NO FORMS. NO FUNNELS. DIRECT.</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display mt-8 text-[clamp(2.2rem,6.5vw,5rem)]">
              START A<br />
              <span className="text-signal">CONVERSATION</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Describe the problem, the data, and what would count as success — that is
              enough to start a conversation.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <a
                href={site.links.email}
                className="corner-ticks label-mono border border-line-strong bg-surface px-8 py-5 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                EMAIL — {site.email.toUpperCase()}
              </a>
              <Link
                href="/cv"
                className="label-mono border border-line px-8 py-5 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                CV →
              </Link>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono border border-line px-8 py-5 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                LINKEDIN →
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono border border-line px-8 py-5 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                GITHUB →
              </a>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {utilityLinks.map((l) => (
                <li key={l.label} className="label-mono text-[10px] text-faint">
                  {l.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
