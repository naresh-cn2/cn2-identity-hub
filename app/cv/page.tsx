import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { capabilities } from "@/data/capabilities";
import { career } from "@/data/career";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Print-ready CV — BUKYA NARESH / CN2.DEV. Quantitative engines, market-data infrastructure, research governance and performance systems, with every metric's provenance tagged.",
  alternates: { canonical: "/cv" },
};

/**
 * Print re-scope. The site defaults to the dark terminal palette, whose
 * `--foreground` is near-white; these classes re-point the existing tokens at
 * their paper values inside `@media print`, so the page lands as black-on-white
 * instead of white-on-white. Same tokens, print values only — no new tokens.
 */
const PRINT_TOKENS =
  "print:[--background:#ffffff] print:[--surface:#ffffff] print:[--surface-2:#f4f4f4] print:[--foreground:#000000] print:[--muted:#3f3f46] print:[--faint:#52525b] print:[--line:#d4d4d8] print:[--line-strong:#a1a1aa] print:[--signal:#b91c1c]";

/** Metric provenance, keyed by project so a missing tag is a type error. */
const METRIC_PROVENANCE: Record<(typeof career.experience)[number]["project"], string> = {
  "APEX QUANT ENGINE": "BACKTEST / SIMULATION — SEE CASE STUDY",
  "AUTOMATED TRADING OS": "SIMULATION — STRUCTURAL CONTROLS",
  "QUANT MARKET DATA REPLAY": "TEST SUITE — DETERMINISM",
  QRSIP: "TEST SUITE — 352 TESTS",
  "BILLING DATA GATEWAY": "SELF-BENCHMARK — SELF-MEASURED THROUGHPUT",
};

const EVIDENCE_ROUTES = [
  { label: "BUILDS", href: "/builds" },
  { label: "RESEARCH", href: "/research" },
  { label: "LAB", href: "/lab" },
] as const;

/** Readable, copyable URL text for a printed page. */
function displayUrl(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, "");
}

interface CvSectionProps {
  code: string;
  title: string;
  children: ReactNode;
}

function CvSection({ code, title, children }: CvSectionProps) {
  return (
    <section aria-label={title} className="border-b border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-14 print:py-6">
        <div className="flex items-baseline gap-4 border-t border-line pt-5 print:pt-3">
          <span className="num-mono shrink-0 text-xs text-signal">{code}</span>
          <h2 className="display text-2xl md:text-3xl print:text-xl">{title}</h2>
        </div>
        <div className="mt-8 print:mt-4">{children}</div>
      </div>
    </section>
  );
}

export default function CvPage() {
  return (
    <div className={`${PRINT_TOKENS} print:bg-white print:text-black`}>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0 print:hidden" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-12 pt-32 sm:px-8 md:pb-16 md:pt-40 print:pb-6 print:pt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="label-mono text-muted">
              CV <span className="text-signal">/</span> 01 — HEADER
            </p>
            <p className="label-mono text-faint print:hidden">CTRL/CMD + P — PRINT OR SAVE AS PDF</p>
          </div>

          <h1 className="display mt-8 text-[clamp(2.75rem,8vw,5.5rem)] print:mt-4 print:text-4xl">
            {site.name}
            <br />
            <span className="text-signal">{site.identity}</span>
          </h1>

          <p className="display-condensed mt-6 text-2xl text-muted md:text-3xl">
            {site.system} / {site.descriptor}
          </p>
          <p className="label-mono mt-4 text-faint">{site.subtitle}</p>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 print:mt-5">
            <li className="min-w-0">
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line label-mono break-words text-muted"
              >
                GITHUB / {displayUrl(site.links.github)}
              </a>
            </li>
            <li className="min-w-0">
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line label-mono break-words text-muted"
              >
                LINKEDIN / {displayUrl(site.links.linkedin)}
              </a>
            </li>
            <li className="min-w-0">
              <a href={site.links.email} className="link-line label-mono break-words text-muted">
                EMAIL / {site.email}
              </a>
            </li>
          </ul>
        </div>
      </header>

      <CvSection code="02" title="PROFILE">
        <div className="max-w-3xl space-y-4">
          <p className="text-base leading-relaxed text-muted">{site.description}</p>
          <p className="label-mono text-signal">STATUS — {site.status}</p>
        </div>
      </CvSection>

      <CvSection code="03" title="WHAT I BUILD">
        <ul className="grid gap-x-12 gap-y-8 sm:grid-cols-2 print:gap-y-4">
          {career.whatIBuild.map((item) => (
            <li
              key={item.title}
              className="min-w-0 break-inside-avoid border-t border-line pt-4"
            >
              <h3 className="display text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              <p className="label-mono mt-3 text-faint">REPO / {item.evidence}</p>
            </li>
          ))}
        </ul>
      </CvSection>

      <CvSection code="04" title="EXPERIENCE">
        <ol className="space-y-8 print:space-y-5">
          {career.experience.map((entry) => (
            <li
              key={entry.project}
              className="min-w-0 break-inside-avoid border-t border-line pt-5 print:pt-3"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                <h3 className="display text-xl">{entry.project}</h3>
                <p className="label-mono text-muted">{entry.role}</p>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{entry.scope}</p>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="label-mono text-signal">
                  {METRIC_PROVENANCE[entry.project]}
                </span>
                <span className="num-mono break-words text-sm text-foreground">{entry.metrics}</span>
              </div>
              {entry.href.startsWith("/") ? (
                <Link
                  href={entry.href}
                  className="link-line label-mono mt-3 inline-block text-xs text-muted"
                >
                  CASE STUDY — {displayUrl(site.url)}
                  {entry.href}
                </Link>
              ) : (
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line label-mono mt-3 inline-block break-words text-xs text-muted"
                >
                  REPOSITORY — {displayUrl(entry.href)}
                </a>
              )}
            </li>
          ))}
        </ol>
      </CvSection>

      <CvSection code="05" title="CAPABILITIES">
        <ul className="grid gap-x-12 gap-y-8 sm:grid-cols-2 print:gap-y-4">
          {capabilities.map((capability) => (
            <li key={capability.id} className="min-w-0 break-inside-avoid border-t border-line pt-4">
              <h3 className="display text-lg">{capability.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{capability.description}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {capability.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="label-mono break-words border border-line px-2 py-1 text-[10px] text-faint"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </CvSection>

      <CvSection code="06" title="STUDY FOCUS">
        <ul className="grid gap-x-12 gap-y-3 sm:grid-cols-2">
          {career.whatIStudy.map((topic, i) => (
            <li key={topic} className="flex min-w-0 break-inside-avoid items-baseline gap-4">
              <span className="num-mono shrink-0 text-xs text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="break-words text-sm leading-relaxed text-muted">{topic}</span>
            </li>
          ))}
        </ul>
      </CvSection>

      <CvSection code="07" title="CONTRIBUTION">
        <ul className="grid gap-x-12 gap-y-8 sm:grid-cols-2 print:gap-y-4">
          {career.whatIContribute.map((item) => (
            <li key={item.title} className="min-w-0 break-inside-avoid border-t border-line pt-4">
              <h3 className="display text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </CvSection>

      <CvSection code="08" title="EVIDENCE">
        <ul className="grid gap-3 sm:grid-cols-3">
          {EVIDENCE_ROUTES.map((route) => (
            <li key={route.href} className="min-w-0">
              <Link
                href={route.href}
                className="block h-full border border-line px-5 py-4 transition-colors hover:border-signal hover:bg-surface-2"
              >
                <span className="display block text-lg">{route.label}</span>
                <span className="label-mono mt-2 block break-words text-faint">
                  {displayUrl(site.url)}
                  {route.href}
                </span>
              </Link>
            </li>
          ))}
          <li className="min-w-0">
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full border border-line px-5 py-4 transition-colors hover:border-signal hover:bg-surface-2"
            >
              <span className="display block text-lg">GITHUB</span>
              <span className="label-mono mt-2 block break-words text-faint">
                {displayUrl(site.links.github)}
              </span>
            </a>
          </li>
        </ul>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          Every figure above carries its provenance tag — BACKTEST, SIMULATION, SELF-BENCHMARK or TEST
          SUITE. Simulated results are never presented as live trading.
        </p>
      </CvSection>
    </div>
  );
}
