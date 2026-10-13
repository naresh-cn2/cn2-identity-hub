import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import {
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
    "Education, completed programmes and continuous learning — Bukya Naresh. Internships, courses and certifications across generative AI, quantitative finance, data and software engineering, plus active self-directed study tracks.",
  alternates: { canonical: "/certifications" },
  openGraph: {
    title: "Certifications — Bukya Naresh / CN2.dev",
    description:
      "Completed programmes, issued certificates and self-directed study — each linked to the work it produced.",
  },
};

/** Print a date exactly as the certificate does — string parsing, no timezone math. */
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function formatDate(iso?: string) {
  if (!iso) return undefined;
  const [y, m, d] = iso.split("-");
  return `${d} ${MONTHS[Number(m) - 1]} ${y}`;
}

/** Credential constellation — node count reflects credentials in each state. */
function CredentialConstellation({
  credentials,
  studyCount,
}: {
  credentials: { state: string }[];
  studyCount: number;
}) {
  const nodes = ["PLANNED", "IN PROGRESS", "COMPLETED", "VERIFIED"] as const;
  const count = (s: string) => credentials.filter((c) => c.state === s).length;
  return (
    <svg
      viewBox="0 0 840 132"
      className="h-auto w-full"
      role="img"
      aria-label={`Credential counts: ${nodes
        .map((n) => `${count(n)} ${n.toLowerCase()}`)
        .join(", ")}. ${studyCount} self-directed study tracks are active.`}
    >
      <line x1="60" y1="56" x2="780" y2="56" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 5" />
      {nodes.map((label, i) => {
        const x = 60 + (i * 720) / (nodes.length - 1);
        const n = count(label);
        const filled = n > 0;
        return (
          <g key={label}>
            <circle cx={x} cy="56" r="11" fill="none" stroke="var(--line-strong)" strokeWidth="1.25" />
            <circle
              cx={x}
              cy="56"
              r="3"
              fill={filled ? (label === "VERIFIED" ? "var(--research)" : "var(--signal)") : "var(--faint)"}
            />
            <text
              x={x}
              y="90"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="0.14em"
              fill="var(--faint)"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {label}
            </text>
            <text
              x={x}
              y="108"
              textAnchor="middle"
              fontSize="9"
              letterSpacing="0.1em"
              fill={filled ? "var(--muted)" : "var(--faint)"}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {filled ? `${n} ${label}` : `0 ${label}`}
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
        {studyCount} SELF-DIRECTED STUDY TRACKS — ACTIVE
      </text>
    </svg>
  );
}

export default function CertificationsPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="motes" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-muted">
                EDUCATION <span className="text-signal">/</span> CERTIFICATIONS{" "}
                <span className="text-signal">/</span> CONTINUOUS LEARNING
              </p>
              <p className="label-mono text-faint">
                {credentials.length} FORMAL · {studyTracks.length} SELF-DIRECTED
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-8 text-[clamp(2.6rem,8.5vw,6.5rem)]">
              LEARN. BUILD. PROGRESS.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              My learning journey spans generative AI, quantitative finance, algorithmic trading,
              data, and software engineering. Here, I document the programmes I have completed, the
              skills I am developing, and the knowledge I put into practice through technical
              projects.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-12 max-w-4xl">
              <CredentialConstellation
                credentials={credentials}
                studyCount={studyTracks.length}
              />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- completed programmes ---- */}
      <section aria-label="Completed programmes" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <div>
              <p className="label-mono text-signal">COMPLETED PROGRAMMES</p>
              <h2 className="display mt-4 text-3xl md:text-4xl">
                INTERNSHIPS, COURSES AND TRAINING
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                A record of the internships, courses, and training programmes I have completed,
                including the knowledge and practical experience gained through each.
              </p>
            </div>
          </Reveal>

          <ol className="mt-12 space-y-px bg-line">
            {credentials.map((c, i) => (
              <Reveal key={c.id} delay={Math.min(i, 3) * 70}>
                <li className="bg-background p-6 md:p-8">
                  <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                    <div>
                      <div className="flex flex-wrap items-baseline gap-4">
                        <span className="num-mono text-xs text-signal">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`label-mono border px-2 py-1 text-[10px] ${
                            c.state === "VERIFIED"
                              ? "border-research text-research"
                              : "border-line-strong text-foreground"
                          }`}
                        >
                          {c.state}
                        </span>
                        <span className="label-mono text-[10px] text-faint">
                          {formatDate(c.date)}
                        </span>
                      </div>
                      <h3 className="display mt-4 text-xl md:text-2xl">{c.program}</h3>
                      <p className="label-mono mt-3 text-[10px] leading-relaxed text-muted">
                        {c.provider}
                      </p>
                      {c.credentialId && (
                        <p className="num-mono mt-3 text-xs text-faint">{c.credentialId}</p>
                      )}
                    </div>

                    <div>
                      <p className="label-mono text-faint">TOPICS</p>
                      <ul className="mt-4 space-y-3">
                        {c.topics.map((t) => (
                          <li key={t} className="flex gap-3 text-sm leading-relaxed text-muted">
                            <span
                              className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal"
                              aria-hidden="true"
                            />
                            {t}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6">
                        <p className="label-mono text-faint">SKILLS</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {c.skills.map((s) => (
                            <span
                              key={s}
                              className="label-mono border border-line px-2.5 py-1 text-[10px] text-muted"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <p className="label-mono text-faint">LEARNED</p>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{c.learned}</p>
                      </div>

                      <div className="mt-6">
                        <p className="label-mono text-faint">ASSESSMENT</p>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{c.assessment}</p>
                      </div>

                      {(c.verificationUrl || c.certificateUrl || (c.notes?.length ?? 0) > 0) && (
                        <div className="mt-6 space-y-3 border-t border-line pt-5">
                          {c.verificationUrl && (
                            <a
                              href={c.verificationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-block"
                            >
                              <span className="label-mono text-research transition-transform duration-300 group-hover:translate-x-1">
                                VERIFY AT THE ISSUER →
                              </span>
                            </a>
                          )}
                          {c.certificateUrl && (
                            <a
                              href={c.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-block"
                            >
                              <span className="label-mono text-foreground transition-transform duration-300 group-hover:translate-x-1">
                                VIEW CERTIFICATE →
                              </span>
                            </a>
                          )}
                          {c.notes?.map((n) => (
                            <p key={n} className="text-xs leading-relaxed text-faint">
                              {n}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/builds"
              className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
            >
              SEE THE PROJECTS →
            </Link>
            <Link
              href="/capabilities"
              className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
            >
              CAPABILITY MAP →
            </Link>
          </div>
        </div>
      </section>

      {/* ---- states ---- */}
      <section aria-label="Credential states" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <h2 className="display text-2xl md:text-4xl">WHAT EACH STATE MEANS</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Every record on this page carries one of four states, so you can see exactly where a
              programme stands.
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
      <section id="study" aria-label="Self-directed study" className="scroll-mt-28 border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="label-mono text-research">SELF-DIRECTED STUDY</p>
                <h2 className="display mt-4 text-3xl md:text-5xl">KNOWLEDGE IN PRACTICE</h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                  Beyond formal education, I study quantitative methods, market systems, data
                  infrastructure, software development, and AI-assisted automation. I connect each
                  track to the practical projects, experiments, and technical investigations where
                  it shows up.
                </p>
              </div>
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

      {/* ---- continue ---- */}
      <section aria-label="Continue" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="label-mono text-faint">CONTINUE</p>
                <p className="display mt-2 text-2xl md:text-3xl">SEE WHERE THE LEARNING SHOWS UP</p>
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
