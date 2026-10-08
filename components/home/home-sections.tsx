import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import ProjectMark from "@/components/builds/project-mark";
import { capabilities, type CapabilityDomain } from "@/data/capabilities";
import { flagshipProjects } from "@/data/projects";
import { researchEntries } from "@/data/research";
import { labModules, engagementAreas } from "@/data/lab";
import { credentials, studyTracks } from "@/data/certifications";
import { equitySeries, mulberry32, toPath } from "@/lib/series";
import { site, utilityLinks } from "@/data/site";

/* ------------------------------------------------------------------ *
 * deterministic module-level geometry — computed once, never at runtime
 * ------------------------------------------------------------------ */

const PRICE_PATH = toPath(equitySeries(7, 140), 1000, 240, 16);
const DENSITY_RAW = Array.from({ length: 72 }, (_, i) => {
  const rand = mulberry32(11 + i);
  return Math.exp(-Math.pow((i - 34) / 10, 2)) + rand() * 0.07;
});
const DENSITY_PATH = `${toPath(DENSITY_RAW, 1000, 96, 4)} L1000,96 L0,96 Z`;

const REGIMES = [
  { x: 0, w: 260, label: "REGIME I — TREND" },
  { x: 260, w: 230, label: "REGIME II — COMPRESSION" },
  { x: 490, w: 290, label: "REGIME III — EXPANSION" },
  { x: 780, w: 220, label: "REGIME IV — MEAN REVERT" },
];

/* ------------------------------------------------------------------ *
 * ACT II — SIGNAL
 * ------------------------------------------------------------------ */

export function SignalAct() {
  return (
    <section aria-label="Signal" className="relative border-b border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="label-mono text-muted">
            ACT II <span className="text-research">/</span> SIGNAL
          </p>
          <p className="label-mono text-faint">REGIME-FIELD COMPOSITION — SCHEMATIC</p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <h2 className="display text-[clamp(1.8rem,4.6vw,3.2rem)]">
              MARKETS ARE A FIELD, NOT A LINE
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              A price series is the visible edge of something with structure underneath it —
              regimes, volatility states, and a distribution that keeps changing while you look at
              it. The work is in deciding which of that structure is real and which is your
              instrument talking.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Everything downstream in this site exists to answer that question honestly: point-in-time
              data, deterministic replay, structural risk, and a governance gate that will not accept
              an argument in place of an artifact.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/research"
                className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-research hover:text-research"
              >
                THE RESEARCH →
              </Link>
              <Link
                href="/lab"
                className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                RUN THE INSTRUMENTS →
              </Link>
            </div>
          </div>

          <Reveal>
            <figure className="border border-line bg-surface p-4 md:p-6">
              <svg
                viewBox="0 0 1000 360"
                className="h-auto w-full"
                role="img"
                aria-label="Schematic of a price path over four market regimes, with a probability density band beneath it. Illustrative diagram, not market data."
              >
                {/* regime bands */}
                {REGIMES.map((r, i) => (
                  <g key={r.label}>
                    <rect
                      x={r.x}
                      y="0"
                      width={r.w}
                      height="240"
                      fill={i % 2 === 0 ? "var(--research)" : "var(--chart-grid)"}
                      opacity={i % 2 === 0 ? 0.07 : 0.5}
                    />
                    <line x1={r.x} y1="0" x2={r.x} y2="360" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 5" />
                    <text
                      x={r.x + 10}
                      y="18"
                      fontSize="10"
                      letterSpacing="0.12em"
                      fill="var(--muted)"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {r.label}
                    </text>
                  </g>
                ))}

                {/* price path */}
                <path d={PRICE_PATH} fill="none" stroke="var(--research)" strokeWidth="2" />
                <path d={`${PRICE_PATH} L1000,240 L0,240 Z`} fill="var(--research)" opacity="0.06" />

                {/* density band */}
                <g transform="translate(0,248)">
                  <path d={DENSITY_PATH} fill="var(--signal)" opacity="0.14" />
                  <path d={toPath(DENSITY_RAW, 1000, 96, 4)} fill="none" stroke="var(--signal)" strokeWidth="1.25" opacity="0.7" />
                  <line x1="0" y1="96" x2="1000" y2="96" stroke="var(--line-strong)" strokeWidth="1" />
                </g>

                {/* axes */}
                <line x1="0" y1="240" x2="1000" y2="240" stroke="var(--chart-axis)" strokeWidth="1" />
                <text x="0" y="356" fontSize="10" letterSpacing="0.12em" fill="var(--faint)" style={{ fontFamily: "var(--font-mono)" }}>
                  TIME →
                </text>
                <text x="1000" y="356" textAnchor="end" fontSize="10" letterSpacing="0.12em" fill="var(--faint)" style={{ fontFamily: "var(--font-mono)" }}>
                  RETURN DISTRIBUTION
                </text>
              </svg>
              <figcaption className="label-mono mt-4 text-[10px] leading-relaxed text-faint">
                SCHEMATIC — A DETERMINISTIC ILLUSTRATION OF REGIME STRUCTURE, NOT MARKET DATA AND
                NOT A RESULT.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * WHAT I DO
 * ------------------------------------------------------------------ */

const GROUPS: { title: string; domains: CapabilityDomain[]; note: string }[] = [
  {
    title: "QUANTITATIVE SYSTEMS",
    domains: ["QUANT", "RESEARCH"],
    note: "Research, backtesting, risk and strategy experimentation.",
  },
  { title: "DATA", domains: ["DATA"], note: "Market data, pipelines, validation and replay." },
  { title: "ENGINEERING", domains: ["ENGINEERING"], note: "Systems, performance and testing." },
  { title: "AI / INTELLIGENCE", domains: ["AI"], note: "Automation and research workflows." },
];

export function WhatIDo() {
  return (
    <section aria-label="What I do" className="border-b border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="label-mono text-muted">
            CAPABILITY <span className="text-signal">/</span> SCOPE
          </p>
          <Link href="/capabilities" className="link-line label-mono text-[10px] text-muted hover:text-signal">
            FULL CAPABILITY MAP →
          </Link>
        </div>
        <h2 className="display mt-6 text-[clamp(2rem,5.5vw,4rem)]">WHAT I DO</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Four areas, and every item below maps to a system or a research entry you can open. No
          percentage bars, and no technology listed that is not in the archive.
        </p>

        <div className="mt-12 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g, i) => {
            const items = capabilities.filter((c) => g.domains.includes(c.domain));
            return (
              <Reveal key={g.title} delay={i * 80}>
                <div className="flex h-full flex-col bg-background p-6">
                  <span className="num-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-4 text-xl">{g.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{g.note}</p>
                  <ul className="mt-6 space-y-4">
                    {items.map((c) => (
                      <li key={c.id} className="border-t border-line pt-4">
                        <p className="label-mono text-foreground">{c.name}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{c.description}</p>
                        <p className="label-mono mt-3 text-[10px] text-research">
                          {c.technologies.slice(0, 2).join(" · ")}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * ACT III — SELECTED BUILDS
 * ------------------------------------------------------------------ */

export function SelectedBuilds() {
  return (
    <section aria-label="Selected builds" className="border-b border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="label-mono text-muted">
            ACT III <span className="text-signal">/</span> SELECTED WORK
          </p>
          <Link href="/builds" className="link-line label-mono text-[10px] text-muted hover:text-signal">
            VIEW ALL BUILDS →
          </Link>
        </div>
        <h2 className="display mt-6 text-[clamp(2rem,5.5vw,4rem)]">SELECTED QUANT WORK</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Four flagship systems. Each has its own visual identity, its own case study, and its own
          provenance label on every figure.
        </p>

        <div className="mt-12 grid gap-px bg-line lg:grid-cols-2">
          {flagshipProjects.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 3) * 90}>
              <article className="flex h-full flex-col bg-background p-6 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="num-mono text-4xl font-semibold text-line-strong md:text-5xl">
                    {p.index}
                  </span>
                  <span className="label-mono text-faint">{p.category}</span>
                </div>

                <div className="mt-6 h-32 w-full border border-line bg-surface md:h-36">
                  <ProjectMark id={p.id} />
                </div>

                <h3 className="display mt-6 text-2xl md:text-3xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{p.thesis}</p>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <span className="label-mono flex items-center gap-2 text-foreground">
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                    {p.status}
                  </span>
                  <span className="label-mono text-faint">{p.statusNote}</span>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
                  <Link
                    href={p.route}
                    className="label-mono border border-line-strong px-5 py-2.5 text-foreground transition-colors hover:border-signal hover:text-signal"
                  >
                    OPEN CASE STUDY →
                  </Link>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line label-mono text-xs text-muted hover:text-signal"
                  >
                    REPOSITORY →
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * ACT IV — RESEARCH
 * ------------------------------------------------------------------ */

export function ResearchTeaser() {
  const featured = [
    researchEntries.find((e) => e.id === "lookahead-bias"),
    researchEntries.find((e) => e.id === "backtest-overfitting"),
    researchEntries.find((e) => e.id === "risk-first-sizing"),
  ].filter(Boolean) as typeof researchEntries;

  return (
    <section aria-label="Research" className="border-b border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="label-mono text-muted">
            ACT IV <span className="text-research">/</span> RESEARCH
          </p>
          <Link href="/research" className="link-line label-mono text-[10px] text-muted hover:text-research">
            ENTER RESEARCH →
          </Link>
        </div>
        <h2 className="display mt-6 text-[clamp(2rem,5.5vw,4rem)]">QUESTIONS BEFORE CONCLUSIONS</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {researchEntries.length} entries, each carrying its question, hypothesis, method, evidence,
          result, limitation and conclusion — including the ones still running.
        </p>

        <div className="mt-12 grid gap-px bg-line lg:grid-cols-3">
          {featured.map((e, i) => (
            <Reveal key={e.id} delay={i * 90}>
              <Link
                href={`/research/${e.id}`}
                className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface md:p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="label-mono text-research">{e.category}</span>
                  <span
                    className={`label-mono border px-2 py-0.5 text-[10px] ${
                      e.status === "VERIFIED"
                        ? "border-line-strong text-foreground"
                        : e.status === "DOCUMENTED"
                          ? "border-line text-muted"
                          : "border-signal text-signal"
                    }`}
                  >
                    {e.status}
                  </span>
                </div>
                <h3 className="display mt-5 text-xl md:text-2xl">{e.title}</h3>
                <dl className="mt-6 space-y-4">
                  <div>
                    <dt className="label-mono text-[10px] text-faint">QUESTION</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted">{e.question}</dd>
                  </div>
                  <div>
                    <dt className="label-mono text-[10px] text-faint">RESULT</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted">{e.result}</dd>
                  </div>
                </dl>
                <span className="label-mono mt-auto pt-6 text-research transition-transform duration-300 group-hover:translate-x-1">
                  READ THE ENTRY →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * ACT V — LAB
 * ------------------------------------------------------------------ */

export function LabTeaser() {
  const instruments = labModules.filter((m) => m.href.startsWith("/lab/"));
  return (
    <section aria-label="Lab" className="border-b border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="label-mono text-muted">
            ACT V <span className="text-signal">/</span> LAB
          </p>
          <Link href="/lab" className="link-line label-mono text-[10px] text-muted hover:text-signal">
            ENTER LAB →
          </Link>
        </div>
        <h2 className="display mt-6 text-[clamp(2rem,5.5vw,4rem)]">INSTRUMENTS, NOT CALCULATORS</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Every instrument derives from the same rules as the systems it illustrates. Change an input
          and the arithmetic changes with it — nothing here is a demo figure.
        </p>

        <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {instruments.map((m, i) => (
            <Reveal key={m.id} delay={i * 70}>
              <Link
                href={m.href}
                className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="num-mono text-xs text-signal">{m.code}</span>
                  <span className="label-mono text-[10px] text-faint">{m.status}</span>
                </div>
                <h3 className="display mt-4 text-lg md:text-xl">{m.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{m.description}</p>
                <span className="label-mono mt-auto pt-6 text-signal transition-transform duration-300 group-hover:translate-x-1">
                  RUN INSTRUMENT →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * CREDENTIALS
 * ------------------------------------------------------------------ */

export function CredentialsTeaser() {
  return (
    <section aria-label="Credentials" className="border-b border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <p className="label-mono text-muted">
              CREDENTIALS <span className="text-signal">/</span> PROOF
            </p>
            <h2 className="display mt-6 text-[clamp(1.8rem,4.6vw,3.2rem)]">
              NOTHING CLAIMED, EVERYTHING SHOWN
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              There is currently no accredited certificate to list. Rather than pad the page, it says
              so — and lists what is actually being studied, with the system each track produced.
            </p>
            <Link
              href="/certifications"
              className="label-mono mt-8 inline-block border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
            >
              VIEW CERTIFICATIONS →
            </Link>
          </div>

          <div className="grid gap-px bg-line sm:grid-cols-2">
            <div className="bg-background p-6">
              <p className="num-mono text-4xl font-semibold text-foreground">{credentials.length}</p>
              <p className="label-mono mt-2 text-[10px] text-faint">FORMAL CREDENTIALS CLAIMED</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                A credential appears only after it is issued and independently verifiable.
              </p>
            </div>
            <div className="bg-background p-6">
              <p className="num-mono text-4xl font-semibold text-research">{studyTracks.length}</p>
              <p className="label-mono mt-2 text-[10px] text-faint">SELF-DIRECTED STUDY TRACKS</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Active study, each evidenced by a build or a written research entry.
              </p>
            </div>
            <div className="bg-background p-6 sm:col-span-2">
              <p className="label-mono text-[10px] text-faint">CURRENTLY STUDYING</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {studyTracks.slice(0, 4).map((t) => (
                  <li key={t.id} className="text-sm leading-snug text-muted">
                    <span className="num-mono mr-2 text-xs text-research">{t.index}</span>
                    {t.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * WORK WITH ME
 * ------------------------------------------------------------------ */

export function WorkTeaser() {
  return (
    <section aria-label="Work with me" className="border-b border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="label-mono text-muted">
            OPPORTUNITY <span className="text-signal">/</span> ENGAGEMENT
          </p>
          <p className="label-mono text-faint">{site.status}</p>
        </div>
        <h2 className="display mt-6 text-[clamp(2rem,5.5vw,4rem)]">WORK WITH ME</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Open to roles, freelance and research collaboration. Everything offered below is something
          already evidenced in the archive — not a service list written in advance of the work.
        </p>

        <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {engagementAreas.map((a, i) => (
            <Reveal key={a.title} delay={Math.min(i, 3) * 70}>
              <div className="h-full bg-background p-6">
                <span className="num-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-4 text-lg">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/work-with-me"
            className="label-mono bg-signal px-7 py-4 text-background transition-colors hover:bg-foreground hover:text-background"
          >
            WORK WITH ME →
          </Link>
          <Link
            href="/capabilities"
            className="label-mono border border-line-strong px-7 py-4 text-foreground transition-colors hover:border-signal hover:text-signal"
          >
            WHAT I CAN CONTRIBUTE →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * ACT IX — CONTACT
 * ------------------------------------------------------------------ */

export function ContactFinale() {
  return (
    <section aria-label="Contact" className="relative overflow-hidden">
      <div className="grid-field absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="label-mono text-muted">
              ACT IX <span className="text-signal">/</span> CONTACT
            </p>
            <p className="label-mono text-faint">NO FORM. NO GATEKEEPER.</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display mt-8 text-[clamp(2.2rem,7vw,5.5rem)]">
            {site.name}
            <br />
            <span className="text-signal">{site.identity}</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="label-mono mt-6 text-muted">
            {site.system} / {site.descriptor} — {site.subtitle}
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {utilityLinks.map((l) => (
              <div key={l.label} className="bg-background p-6">
                <p className="label-mono text-[10px] text-faint">{l.label}</p>
                {l.href.startsWith("http") || l.href.startsWith("mailto:") ? (
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="link-line mt-3 block break-all text-sm text-foreground transition-colors hover:text-signal"
                  >
                    {l.href.replace("mailto:", "").replace("https://", "")}
                  </a>
                ) : (
                  <Link
                    href={l.href}
                    className="link-line mt-3 block text-sm text-foreground transition-colors hover:text-signal"
                  >
                    /{l.href.replace("/", "")} — PRINT READY
                  </Link>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
            <p className="label-mono flex items-center gap-2 text-foreground">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
              {site.status}
            </p>
            <Link href="/links" className="link-line label-mono text-[10px] text-muted hover:text-signal">
              ALL LINKS →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
