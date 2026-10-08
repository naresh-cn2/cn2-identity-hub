import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import {
  credentialSchema,
  credentialStates,
  credentials,
  studyTracks,
} from "@/data/certifications";
import { getArchiveProject } from "@/data/archive";
import { researchEntries } from "@/data/research";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Credential record for Bukya Naresh. Nothing is claimed that was not earned — currently no formal credential is listed, and self-directed study is labelled as self-directed.",
  alternates: { canonical: "/certifications" },
  openGraph: {
    title: "Certifications — Bukya Naresh / Quant.Dev",
    description:
      "An evidence-first credential record: no unearned certificate, no self-directed study presented as accreditation.",
  },
};

/** Credential constellation — hollow nodes are unclaimed, filled nodes are active study. */
function CredentialConstellation({ studyCount }: { studyCount: number }) {
  const nodes = [
    { label: "PLANNED", filled: false },
    { label: "IN PROGRESS", filled: false },
    { label: "COMPLETED", filled: false },
    { label: "VERIFIED", filled: false },
  ];
  return (
    <svg
      viewBox="0 0 840 132"
      className="h-auto w-full"
      role="img"
      aria-label={`Credential constellation: no formal credential is currently claimed. ${studyCount} self-directed study tracks are active.`}
    >
      <line x1="60" y1="56" x2="780" y2="56" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 5" />
      {nodes.map((n, i) => {
        const x = 60 + (i * 720) / (nodes.length - 1);
        return (
          <g key={n.label}>
            <circle cx={x} cy="56" r="11" fill="none" stroke="var(--line-strong)" strokeWidth="1.25" />
            <circle cx={x} cy="56" r="3" fill="var(--faint)" />
            <text
              x={x}
              y="90"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="0.14em"
              fill="var(--faint)"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {n.label}
            </text>
            <text
              x={x}
              y="108"
              textAnchor="middle"
              fontSize="9"
              letterSpacing="0.1em"
              fill="var(--muted)"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              NOT CLAIMED
            </text>
          </g>
        );
      })}
      {[0, 1, 2, 3, 4, 5].slice(0, studyCount).map((i) => {
        const x = 60 + i * 24;
        return <circle key={i} cx={x} cy="20" r="3" fill="var(--research)" opacity="0.75" />;
      })}
      <text
        x="216"
        y="24"
        fontSize="9"
        letterSpacing="0.14em"
        fill="var(--research)"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {studyCount} SELF-DIRECTED STUDY TRACKS — ACTIVE, NOT ACCREDITED
      </text>
    </svg>
  );
}

export default function CertificationsPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                SECTION <span className="text-signal">/</span> 05 — CERTIFICATIONS
              </p>
              <p className="label-mono text-faint">
                {credentials.length} FORMAL · {studyTracks.length} SELF-DIRECTED
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(2.6rem,8.5vw,6.5rem)]">CERTIFICATIONS</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              A credential page is only worth having if it is honest. This one lists no certificate
              that was not issued, and does not present self-directed study as accreditation.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-12 max-w-4xl">
              <CredentialConstellation studyCount={studyTracks.length} />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- formal credentials: honest empty state ---- */}
      <section aria-label="Formal credentials" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <Reveal>
              <p className="label-mono text-signal">FORMAL CREDENTIALS</p>
              <h2 className="display mt-4 text-3xl md:text-4xl">NOTHING CLAIMED</h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="corner-ticks border border-line bg-surface p-6 md:p-10">
                <p className="text-base leading-relaxed text-muted md:text-lg">
                  There is currently no accredited certificate or completed formal programme to list.
                  Rather than pad this page with plausibly-titled entries, it stays empty and says so.
                </p>
                <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
                  The moment a credential is issued, it appears here against the schema below — with
                  the issuer named and a verification link a third party can actually open.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/builds"
                    className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                  >
                    SEE THE ACTUAL EVIDENCE →
                  </Link>
                  <Link
                    href="/capabilities"
                    className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                  >
                    CAPABILITY MAP →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- states ---- */}
      <section aria-label="Credential states" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <h2 className="display text-2xl md:text-4xl">WHAT EACH STATE MEANS</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Four states, used strictly. Intended work is never presented as finished work, and a
              completed course is never presented as mastery.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {credentialStates.map((s, i) => (
              <Reveal key={s.state} delay={i * 70}>
                <div className="h-full bg-background p-6">
                  <p
                    className={`label-mono ${s.state === "VERIFIED" ? "text-research" : s.state === "PLANNED" ? "text-faint" : "text-foreground"}`}
                  >
                    {s.state}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{s.meaning}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- self-directed study ---- */}
      <section aria-label="Self-directed study" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="label-mono text-research">SELF-DIRECTED STUDY</p>
                <h2 className="display mt-4 text-3xl md:text-5xl">WHAT I AM ACTUALLY STUDYING</h2>
              </div>
              <p className="label-mono max-w-xs text-[10px] leading-relaxed text-faint">
                NOT CREDENTIALS. NO PROVIDER, NO CERTIFICATE, NO ASSESSMENT — ONLY METHOD AND THE
                WORK IT PRODUCED.
              </p>
            </div>
          </Reveal>

          <ol className="mt-12 space-y-px bg-line">
            {studyTracks.map((t, i) => {
              const build = t.evidenceProject ? getArchiveProject(t.evidenceProject) : undefined;
              const research = t.evidenceResearch
                ? researchEntries.find((r) => r.id === t.evidenceResearch)
                : undefined;
              return (
                <Reveal key={t.id} delay={Math.min(i, 3) * 70}>
                  <li className="bg-background p-6 md:p-8">
                    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                      <div>
                        <div className="flex items-baseline gap-4">
                          <span className="num-mono text-xs text-research">{t.index}</span>
                          <span className="label-mono border border-research px-2 py-1 text-[10px] text-research">
                            {t.state}
                          </span>
                          <span className="label-mono text-[10px] text-faint">SELF-DIRECTED</span>
                        </div>
                        <h3 className="display mt-4 text-xl md:text-2xl">{t.title}</h3>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{t.focus}</p>
                      </div>

                      <div>
                        <p className="label-mono text-faint">METHOD</p>
                        <ul className="mt-4 space-y-3">
                          {t.method.map((m) => (
                            <li key={m} className="flex gap-3 text-sm leading-relaxed text-muted">
                              <span
                                className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-research"
                                aria-hidden="true"
                              />
                              {m}
                            </li>
                          ))}
                        </ul>

                        {(build || research) && (
                          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5">
                            {build && (
                              <Link href={`/builds/${build.id}`} className="group">
                                <span className="label-mono block text-[10px] text-faint">
                                  APPLIED IN
                                </span>
                                <span className="label-mono text-research transition-transform duration-300 group-hover:translate-x-1">
                                  {build.shortTitle} →
                                </span>
                              </Link>
                            )}
                            {research && (
                              <Link href={`/research/${research.id}`} className="group max-w-sm">
                                <span className="label-mono block text-[10px] text-faint">
                                  WRITTEN UP AS
                                </span>
                                <span className="mt-1 block text-sm leading-snug text-muted transition-colors group-hover:text-foreground">
                                  {research.title}
                                </span>
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---- record schema ---- */}
      <section aria-label="Credential record schema" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <div className="grid gap-10 md:grid-cols-[16rem_1fr] md:gap-16">
            <Reveal>
              <p className="label-mono text-faint">RECORD SCHEMA</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display text-2xl md:text-4xl">EVERY CREDENTIAL MUST CARRY ALL OF THIS</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                The requirements below are fixed in advance so that the first credential listed here
                cannot be a vague line of text.
              </p>
              <dl className="mt-10 grid gap-px bg-line sm:grid-cols-2">
                {credentialSchema.map((f) => (
                  <div key={f.field} className="bg-background p-5">
                    <dt className="label-mono text-foreground">{f.field}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted">{f.why}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- continue ---- */}
      <section aria-label="Continue" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="label-mono text-faint">PROOF OVER PAPER</p>
                <p className="display mt-2 text-2xl md:text-3xl">JUDGE THE SYSTEMS, NOT THE CERTIFICATE</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/capabilities"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  CAPABILITIES →
                </Link>
                <Link
                  href="/builds"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  BUILDS →
                </Link>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
                >
                  LINKEDIN →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
