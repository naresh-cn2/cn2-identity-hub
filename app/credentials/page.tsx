import type { Metadata } from "next";
import Image from "next/image";
import KineticText from "@/components/ui/kinetic-text";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from '@/components/ui/page-atmosphere';
import LearningNetwork from "@/components/credentials/learning-network";
import NeuralFigure from "@/components/visuals/neural-figure";
import CredentialTimeline from "@/components/credentials/credential-timeline";
import LearningMap from "@/components/credentials/learning-map";
import {
  credentialBadges,
  credentialStates,
  credentials,
  studyTracks,
} from "@/data/credentials";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Credentials",
  description:
    "Education, completed programmes and continuous learning — Bukya Naresh. Internships, courses and certifications across generative AI, quantitative finance, data and software engineering, plus active self-directed study tracks.",
  alternates: { canonical: "/credentials" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Credentials — Bukya Naresh / CN2.dev",
    description:
      "Completed programmes, issued certificates and self-directed study — each linked to the work it produced.",
  },
};

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

export default function CredentialsPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="motes" />
        <NeuralFigure compact seed={4} />
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
            <KineticText className="display mt-8 text-[clamp(2.6rem,8.5vw,6.5rem)]">
              LEARN. BUILD. PROGRESS.
            </KineticText>
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
            <div className="mt-12 max-w-5xl">
              <LearningNetwork credentials={credentials} tracks={studyTracks} />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- professional development timeline ---- */}
      <section aria-label="Professional development timeline" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="label-mono text-signal">PROFESSIONAL DEVELOPMENT</p>
                <h2 className="display mt-4 text-3xl md:text-4xl">
                  INTERNSHIPS, COURSES AND TRAINING
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                  A record of the internships, courses, and training programmes I have completed —
                  each shown with the date printed on its certificate — followed by the
                  self-directed tracks I study in parallel, including the knowledge and practical
                  experience gained through each.
                </p>
              </div>
              <p className="label-mono text-faint">EXPAND ANY RECORD FOR THE FULL DETAIL</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12">
              <CredentialTimeline credentials={credentials} tracks={studyTracks} />
            </div>
          </Reveal>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/work"
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

      {/* ---- digital badges ---- */}
      <section aria-label="Digital badges" className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="label-mono text-signal">BADGES</p>
                <h2 className="display mt-4 text-3xl md:text-4xl">
                  DIGITAL BADGES I&apos;VE EARNED
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                  A digital badge is the compact form of a completed course — issued by the
                  programme itself and easy to spot at a glance. Every badge here links straight
                  to the full certificate behind it, so anyone reviewing my work can open the
                  original and verify every detail for themselves.
                </p>
              </div>
              <p className="label-mono text-faint">{credentialBadges.length} EARNED</p>
            </div>
          </Reveal>

          <div
            className={`mt-10 grid gap-px ${
              credentialBadges.length > 1
                ? "bg-line sm:grid-cols-2 lg:grid-cols-3"
                : "max-w-md sm:max-w-lg"
            }`}
          >
            {credentialBadges.map((b, i) => {
              const record = credentials.find((c) => c.id === b.credentialId);
              return (
                <Reveal key={b.id} delay={i * 70}>
                  <div className="flex h-full flex-col items-center bg-background p-8 text-center">
                    <Image
                      src={b.image}
                      alt={b.imageAlt}
                      width={168}
                      height={168}
                      className="h-40 w-40"
                    />
                    <p className="label-mono mt-7 text-faint">{b.provider}</p>
                    <p className="display mt-3 text-xl">{b.label}</p>
                    <p className="label-mono mt-3 text-signal">{b.status}</p>
                    {record && (
                      <div className="mt-6 border-t border-line pt-5">
                        <p className="label-mono text-[10px] text-faint">EARNED WITH</p>
                        <p className="mt-2 text-sm leading-snug text-muted">{record.program}</p>
                        {record.certificateUrl && (
                          <a
                            href={record.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link mt-4 inline-block"
                          >
                            <span className="label-mono text-foreground transition-transform duration-300 group-hover/link:translate-x-1">
                              VIEW CERTIFICATE →
                            </span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
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
          <Reveal delay={80}>
            <div className="mt-10 max-w-4xl">
              <CredentialConstellation credentials={credentials} studyCount={studyTracks.length} />
            </div>
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

      {/* ---- learning → practice map ---- */}
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
              <p className="label-mono text-faint">S1–S{studyTracks.length} · HOVER OR FOCUS TO TRACE</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10">
              <LearningMap tracks={studyTracks} />
            </div>
          </Reveal>
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
                  href="/work"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  BUILDS →
                </Link>
                <Link
                  href="/research"
                  className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  RESEARCH →
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
