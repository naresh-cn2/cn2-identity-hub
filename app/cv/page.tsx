import type { Metadata } from "next";
import KineticText from "@/components/ui/kinetic-text";
import type { ReactNode } from "react";
import Link from "next/link";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import PosterPlate from "@/components/viz/poster-plates";
import { capabilities } from "@/data/capabilities";
import { career } from "@/data/career";
import { credentials } from "@/data/credentials";
import { researchEntries } from "@/data/research";
import { site } from "@/data/site";
import { getAllWorks } from "@/data/works";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Print-ready CV — BUKYA NARESH / CN2.DEV. Quantitative engines, market-data infrastructure, research governance and performance systems.",
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
  { label: "WORK", href: "/work" },
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
        <PageAtmosphere variant="motes" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-12 pt-32 sm:px-8 md:pb-16 md:pt-40 print:pb-6 print:pt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="label-mono text-muted">
              CV <span className="text-signal">/</span> HEADER
            </p>
            <p className="label-mono text-faint print:hidden">CTRL/CMD + P — PRINT OR SAVE AS PDF</p>
          </div>

          <KineticText accent={site.identity} className="display mt-8 text-[clamp(2.75rem,8vw,5.5rem)] print:mt-4 print:text-4xl">
            {site.name}
          </KineticText>

          <p className="display-condensed mt-6 text-2xl text-muted md:text-3xl">
            {site.system} / {site.descriptor}
          </p>
          <p className="label-mono mt-4 text-faint">{site.subtitle}</p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-14 print:mt-5">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
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
            <div className="print:hidden">
              <PosterPlate
                variant="route"
                label="PLATE / ROUTE"
                alt="Illustration: a light path climbing over layered ridge lines through four glowing waypoints, the last one red, against a dawn horizon."
              />
            </div>
          </div>
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

      <CvSection code="08" title="FLAGSHIP PROJECTS">
        <div className="space-y-8 print:space-y-5">
          {getAllWorks()
            .filter((w) => ["bustub-engine", "apex-quant-engine", "qrsip", "market-data-replay", "automated-trading-os", "billing-data-gateway", "context-engineering-labs", "stratlab"].includes(w.id))
            .map((project) => (
              <div key={project.id} className="min-w-0 break-inside-avoid border-t border-line pt-6 print:pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
                  <div>
                    <h3 className="display text-xl">{project.shortTitle}</h3>
                    <p className="label-mono text-xs text-muted">{project.categoryLabel}</p>
                  </div>
                  <span className={`label-mono border px-2.5 py-1 text-[9px] ${
                    project.status.includes("VERIFIED") || project.status.includes("PRODUCTION") || project.status.includes("RELEASED")
                      ? "border-signal text-signal"
                      : "border-research text-research"
                  }`}>
                    {project.status.split(" · ")[0]}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 5).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[9px] label-mono border border-line bg-background rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-baseline gap-4">
                  <span className="label-mono text-faint">STATUS</span>
                  <span className="num-mono text-sm text-foreground">{project.status}</span>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-mono text-sm text-signal hover:text-white transition-colors"
                    >
                      GITHUB →
                    </a>
                  )}
                </div>
                {project.metrics.length > 0 && (
                  <div className="mt-3">
                    <p className="label-mono text-[9px] text-faint mb-1">RESULTS</p>
                    <ul className="space-y-1">
                      {project.metrics.map((m, i) => (
                        <li key={i} className="flex justify-between text-sm text-muted">
                          <span>{m.label}</span>
                          <span className="text-foreground">{m.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.evidenceAndResults.length > 0 && (
                  <div className="mt-3">
                    <p className="label-mono text-[9px] text-faint mb-1">EVIDENCE</p>
                    <ul className="space-y-1">
                      {project.evidenceAndResults.slice(0, 2).map((e, i) => (
                        <li key={i} className="text-sm text-muted leading-relaxed">{e}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
        </div>
      </CvSection>

      <CvSection code="09" title="SUPPORTING PROJECTS &amp; RESEARCH">
        <div className="grid gap-8 sm:grid-cols-2 print:gap-y-4">
          <div>
            <p className="label-mono text-[9px] text-signal mb-3">SUPPORTING PROJECTS</p>
            <ul className="space-y-4">
              {getAllWorks()
                .filter((w) => ["ifm-costintel", "forex-platform", "crypto-platform", "settle-iq", "b2b-lead-prospector", "forge-stream", "zero-latency-engine", "forge-core"].includes(w.id))
                .map((project) => (
                  <li key={project.id} className="border-t border-line pt-3">
                    <h4 className="font-mono text-sm font-bold text-foreground">{project.shortTitle}</h4>
                    <p className="text-xs text-muted leading-relaxed mt-1">{project.summary}</p>
                    <span className={`label-mono border px-2 py-0.5 text-[8px] ${
                      project.status.includes("VERIFIED") || project.status.includes("PRODUCTION") || project.status.includes("RELEASED")
                        ? "border-signal text-signal"
                        : "border-line text-muted"
                    }`}>
                      {project.status}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <p className="label-mono text-[9px] text-research mb-3">RESEARCH &amp; DEVELOPMENT</p>
            <ul className="space-y-4">
              {researchEntries.map((entry) => (
                <li key={entry.id} className="border-t border-line pt-3">
                  <h4 className="font-mono text-sm font-bold text-foreground">{entry.title}</h4>
                  <p className="text-xs text-muted leading-relaxed mt-1">{entry.result}</p>
                  <span className={`label-mono border px-2 py-0.5 text-[8px] border-research text-research`}>
                    {entry.status.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CvSection>

      <CvSection code="10" title="VERIFIED CERTIFICATIONS">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 print:gap-y-4">
          {credentials
            .filter((c) => c.state === "VERIFIED" || c.state === "COMPLETED")
            .map((cert) => (
              <div key={cert.id} className="border border-line bg-surface p-5 transition-colors hover:border-signal/50">
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <h4 className="font-mono text-sm font-bold text-foreground">{cert.provider}</h4>
                  <span className={`label-mono border px-2 py-0.5 text-[9px] ${
                    cert.state === "VERIFIED" ? "border-signal text-signal" : "border-line text-muted"
                  }`}>
                    {cert.state}
                  </span>
                </div>
                <p className="font-mono text-base font-bold text-foreground mb-1">{cert.program}</p>
                <p className="text-xs text-muted leading-relaxed mb-3">{cert.learned}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cert.skills.slice(0, 3).map((s) => (
                    <span key={s} className="px-2 py-0.5 text-[9px] label-mono border border-line bg-background rounded">
                      {s}
                    </span>
                  ))}
                </div>
                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-mono text-[9px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5"
                  >
                    VERIFY CREDENTIAL →
                  </a>
                )}
                {cert.certificateUrl && !cert.verificationUrl && (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-mono text-[9px] text-signal hover:text-white transition-colors border-b border-signal pb-0.5"
                  >
                    VIEW CERTIFICATE →
                  </a>
                )}
              </div>
            ))}
        </div>
      </CvSection>

      <CvSection code="11" title="EVIDENCE">
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
          Results above are labelled by method — BACKTEST, SIMULATION, SELF-BENCHMARK or TEST
          SUITE.
        </p>
      </CvSection>
    </div>
  );
}
