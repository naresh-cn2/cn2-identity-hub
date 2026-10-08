import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import CapabilityMap from "@/components/capabilities/capability-map";
import KnowledgeGraph from "@/components/viz/knowledge-graph";
import { capabilities } from "@/data/capabilities";
import { researchEntries } from "@/data/research";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "What Bukya Naresh can actually contribute — quantitative research, market data, systems engineering and quantitative tooling, each mapped to inspectable evidence.",
  alternates: { canonical: "/capabilities" },
};

const researchTitles: Record<string, string> = Object.fromEntries(
  researchEntries.map((entry) => [entry.id, entry.title])
);

const verifyLinks = [
  { label: "BUILDS — ENGINEERING EVIDENCE", href: "/builds", external: false },
  { label: "RESEARCH — WRITTEN ENTRIES", href: "/research", external: false },
  { label: "LAB — RUNNABLE INSTRUMENTS", href: "/lab", external: false },
  { label: "GITHUB — ALL REPOSITORIES", href: site.links.github, external: true },
] as const;

export default function CapabilitiesPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                SECTION <span className="text-signal">/</span> 06 — CAPABILITIES
              </p>
              <p className="label-mono text-faint">EVERY CLAIM LINKED TO AN ARTIFACT</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(3rem,10vw,8rem)]">CAPABILITIES</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              What I can actually contribute — quantitative research, market data, systems engineering
              and quantitative tooling, each mapped to evidence you can open.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ---- framing ---- */}
      <section aria-label="What I can actually contribute" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <Reveal>
              <h2 className="display text-3xl md:text-5xl">WHAT CAN I ACTUALLY CONTRIBUTE?</h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-5 text-base leading-relaxed text-muted">
                <p>
                  Research that ends in a decision. Market data that is point-in-time correct. Systems
                  that hold their behaviour when they are re-run. Those are the three things this page
                  is about, and every capability below is stated as the artifact that carries it.
                </p>
                <p>
                  Nothing here is a self-assessment. Each card names a domain, the technologies
                  involved and the concrete project or written entry you can open to check the claim —
                  including the entries that remain open questions rather than settled results.
                </p>
                <p className="label-mono border-l border-signal pl-4 text-[10px] leading-relaxed text-faint">
                  NO SKILL PERCENTAGES, NO SENIORITY LEVELS, NO UNVERIFIED CLAIMS — ONLY DOMAINS,
                  TECHNOLOGIES AND POINTERS TO EVIDENCE.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- capability map ---- */}
      <section aria-label="Capability map" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <CapabilityMap capabilities={capabilities} researchTitles={researchTitles} />
        </div>
      </section>

      {/* ---- domain map ---- */}
      <section aria-label="Domain map" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">DOMAIN MAP</h2>
              <p className="label-mono text-faint">HOVER A NODE TO ISOLATE ITS RELATIONSHIPS</p>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              The domains are not separate skills stacked on top of each other — research sits at the
              centre and every other domain is connected to it because that is how the work actually
              flows. An edge here means a working dependency, not a decorative association.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <KnowledgeGraph />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- how to verify ---- */}
      <section aria-label="How to verify" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-3xl md:text-5xl">HOW TO VERIFY</h2>
              <p className="label-mono text-faint">EACH CAPABILITY → ONE INSPECTABLE ARTIFACT</p>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              Every capability above maps to inspectable code or a written research entry. Nothing on
              this page asks to be taken on trust: read the entry, open the repository, or run the
              instrument and check the result yourself.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {verifyLinks.map((link, i) => (
              <Reveal key={link.href} delay={i * 80} className="bg-background">
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full items-baseline justify-between gap-4 p-6 transition-colors hover:bg-surface"
                  >
                    <span className="label-mono text-xs text-foreground">{link.label}</span>
                    <span aria-hidden="true" className="label-mono text-signal">
                      ↗
                    </span>
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="flex h-full items-baseline justify-between gap-4 p-6 transition-colors hover:bg-surface"
                  >
                    <span className="label-mono text-xs text-foreground">{link.label}</span>
                    <span aria-hidden="true" className="label-mono text-signal">
                      →
                    </span>
                  </Link>
                )}
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="label-mono mt-8 text-[10px] leading-relaxed text-faint">
              NO EMPLOYER, CLIENT LIST, YEARS-OF-EXPERIENCE FIGURE OR CERTIFICATION IS CLAIMED ON THIS
              PAGE. WHERE AN ARTIFACT DOES NOT YET EXIST, THE CAPABILITY IS NOT LISTED.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-5 pb-28 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="label-mono bg-signal px-6 py-3 text-background transition-colors hover:bg-foreground hover:text-background"
            >
              BACKGROUND & CONTEXT
            </Link>
            <Link
              href="/work-with-me"
              className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
            >
              WORK WITH ME
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
