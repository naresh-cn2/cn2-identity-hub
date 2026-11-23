import type { Metadata } from "next";
import SystemsUniverse from "@/components/about/systems-universe";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import MindsetDiagram from "@/components/about/mindset-diagram";
import CapabilityConstellation from "@/components/about/capability-constellation";
import ProcessChain from "@/components/about/process-chain";
import PrinciplesEditorial from "@/components/about/principles-editorial";
import VisionNetwork from "@/components/about/vision-network";
import { aiStages, systemsStages } from "@/data/about";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About — CN2.DEV",
  description:
    "Bukya Naresh — Quantitative Developer. Professional identity: systems engineering, financial technology, AI engineering. Who I am, how I think, how I work, how I use AI, my capabilities, vision, and principles.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Bukya Naresh / CN2.DEV",
    description:
      "I think in systems. I build what's possible — quantitative finance, data, software, and AI-accelerated automation.",
    images: [
      {
        url: "/images/about-cosmos.png",
        width: 1085,
        height: 1450,
        alt: "A figure formed of starlight, holding a burning red ember",
      },
    ],
  },
};

function ChapterHead({
  eyebrow,
  lines,
  support,
}: {
  eyebrow: string;
  lines: string[];
  support: string;
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="label-mono text-faint">{eyebrow}</span>
      </div>
      <h2 className="display mt-7 max-w-4xl text-3xl leading-[1.06] md:text-5xl">
        {lines.map((l) => (
          <span key={l} className="block">{l}</span>
        ))}
      </h2>
      <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted">{support}</p>
    </Reveal>
  );
}

/* Destination section modeled on /hub BUILDS: full-screen, large heading,
   blurb, prominent action link, and a visual scene. */
function DestinationSection({
  caption,
  label,
  fullForm,
  description,
  audience,
  accent,
  href,
}: {
  caption: string;
  label: string;
  fullForm: string;
  description: string;
  audience: string;
  accent: "signal" | "research" | "electric";
  href: string;
}) {
  const accentCls =
    accent === "signal"
      ? "border-signal text-signal"
      : accent === "research"
        ? "border-research text-research"
        : "border-electric text-electric";

  return (
    <section
      id={label.toLowerCase()}
      className="relative min-h-[90svh] w-full overflow-hidden border-t border-line/60"
    >
      <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Copy column */}
          <div className="relative z-10">
            <Reveal>
              <p className={`label-mono text-signal ${accentCls}`}>{caption}</p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display mt-5 text-[clamp(3rem,9vw,6rem)] leading-[0.92] text-foreground">
                {label}
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="label-mono text-[10px] text-faint mb-2">{fullForm}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
                {description}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <Link
                href={href}
                className="corner-ticks group mt-9 inline-flex items-center gap-4 border border-signal/80 bg-signal/15 px-8 py-4 label-mono font-semibold text-signal transition-all duration-200 hover:bg-signal hover:text-white"
              >
                <span>{`EXPLORE ${label}`}</span>
                <span aria-hidden="true" className="arr-live transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </Reveal>

            <Reveal delay={280}>
              <p className="label-mono mt-5 text-[10px] text-faint">
                FOR {audience}
              </p>
            </Reveal>
          </div>

          {/* Visual column */}
          <div className="relative">
            <Reveal delay={140}>
              <div className="relative aspect-[560/420] w-full max-w-[560px] mx-auto">
                <svg
                  viewBox="0 0 560 420"
                  focusable="false"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full"
                >
                  <defs>
                    <linearGradient id="dossier-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--surface)" />
                      <stop offset="100%" stopColor="var(--surface-2)" />
                    </linearGradient>
                  </defs>
                  {/* Dossier document stack */}
                  <rect x="60" y="40" width="440" height="320" fill="url(#dossier-gradient)" stroke="var(--line)" strokeWidth="1" opacity="0.9" />
                  <rect x="75" y="25" width="440" height="320" fill="none" stroke="var(--line-strong)" strokeWidth="1" opacity="0.5" />
                  <rect x="90" y="10" width="440" height="320" fill="none" stroke="var(--line-strong)" strokeWidth="1" opacity="0.3" />
                  {/* Header band */}
                  <rect x="60" y="40" width="440" height="34" fill="none" stroke="var(--signal)" strokeWidth="1" opacity="0.8" />
                  <rect x="60" y="40" width="14" height="34" fill="var(--signal)" opacity="0.9" />
                  {/* Text lines */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <rect key={i} x="80" y={100 + i * 22} width={300} height="8" fill="var(--muted)" opacity="0.4" />
                  ))}
                  <rect x="80" y={200} width={180} height="8" fill="var(--signal)" opacity="0.6" />
                  <rect x="80" y={230} width={220} height="8" fill="var(--muted)" opacity="0.4" />
                  <rect x="80" y={260} width={260} height="8" fill="var(--muted)" opacity="0.4" />
                  <rect x="80" y={290} width={200} height="8" fill="var(--muted)" opacity="0.4" />
                  {/* Corner marks */}
                  <rect x="50" y="30" width="16" height="16" fill="none" stroke="var(--signal)" strokeWidth="1.5" opacity="0.7" />
                  <rect x="494" y="30" width="16" height="16" fill="none" stroke="var(--signal)" strokeWidth="1.5" opacity="0.7" transform="rotate(180 502 38)" />
                  <rect x="50" y="374" width="16" height="16" fill="none" stroke="var(--signal)" strokeWidth="1.5" opacity="0.7" transform="rotate(90 58 382)" />
                  <rect x="494" y="374" width="16" height="16" fill="none" stroke="var(--signal)" strokeWidth="1.5" opacity="0.7" transform="rotate(270 502 382)" />
                </svg>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumeDestinationSection({
  caption,
  label,
  fullForm,
  description,
  audience,
  accent,
  href,
}: {
  caption: string;
  label: string;
  fullForm: string;
  description: string;
  audience: string;
  accent: "signal" | "research" | "electric";
  href: string;
}) {
  const accentCls =
    accent === "signal"
      ? "border-signal text-signal"
      : accent === "research"
        ? "border-research text-research"
        : "border-electric text-electric";

  return (
    <section
      id={label.toLowerCase()}
      className="relative min-h-[90svh] w-full overflow-hidden border-t border-line/60"
    >
      <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Copy column */}
          <div className="relative z-10">
            <Reveal>
              <p className={`label-mono text-research ${accentCls}`}>{caption}</p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display mt-5 text-[clamp(3rem,9vw,6rem)] leading-[0.92] text-foreground">
                {label}
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="label-mono text-[10px] text-faint mb-2">{fullForm}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
                {description}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <Link
                href={href}
                className="corner-ticks group mt-9 inline-flex items-center gap-4 border border-signal/80 bg-signal/15 px-8 py-4 label-mono font-semibold text-research transition-all duration-200 hover:bg-research hover:text-white"
              >
                <span>{`EXPLORE ${label}`}</span>
                <span aria-hidden="true" className="arr-live transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </Reveal>

            <Reveal delay={280}>
              <p className="label-mono mt-5 text-[10px] text-faint">
                FOR {audience}
              </p>
            </Reveal>
          </div>

          {/* Visual column */}
          <div className="relative">
            <Reveal delay={140}>
              <div className="relative aspect-[560/420] w-full max-w-[560px] mx-auto">
                <svg
                  viewBox="0 0 560 420"
                  focusable="false"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full"
                >
                  <defs>
                    <linearGradient id="resume-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--surface)" />
                      <stop offset="100%" stopColor="var(--surface-2)" />
                    </linearGradient>
                  </defs>
                  {/* Career path timeline */}
                  <rect x="60" y="40" width="440" height="340" fill="url(#resume-gradient)" stroke="var(--line)" strokeWidth="1" opacity="0.9" />
                  {/* Timeline path */}
                  <path d="M 60 200 L 300 200 L 300 100 L 500 100 L 500 300" fill="none" stroke="var(--research)" strokeWidth="2" strokeDasharray="8 8" opacity="0.7" />
                  {/* Path nodes */}
                  <circle cx="60" cy="200" r="6" fill="var(--research)" />
                  <circle cx="300" cy="200" r="6" fill="var(--research)" />
                  <circle cx="300" cy="100" r="6" fill="var(--research)" />
                  <circle cx="500" cy="100" r="6" fill="var(--research)" />
                  <circle cx="500" cy="300" r="6" fill="var(--research)" />
                  {/* Node labels */}
                  <text x="60" y="190" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">START</text>
                  <text x="300" y="90" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">SYSTEMS</text>
                  <text x="500" y="90" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">QUANT</text>
                  <text x="500" y="310" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">AI</text>
                  {/* Card stack */}
                  <rect x="100" y="240" width="160" height="120" fill="none" stroke="var(--line)" strokeWidth="1" opacity="0.6" />
                  <rect x="115" y="225" width="160" height="120" fill="none" stroke="var(--line-strong)" strokeWidth="1" opacity="0.4" />
                  <rect x="130" y="210" width="160" height="120" fill="none" stroke="var(--line-strong)" strokeWidth="1" opacity="0.2" />
                  <text x="190" y="285" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">CV</text>
                  <text x="190" y="297" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">RÉSUMÉ</text>
                  {/* Corner marks */}
                  <rect x="50" y="30" width="16" height="16" fill="none" stroke="var(--research)" strokeWidth="1.5" opacity="0.7" />
                  <rect x="494" y="30" width="16" height="16" fill="none" stroke="var(--research)" strokeWidth="1.5" opacity="0.7" transform="rotate(180 502 38)" />
                  <rect x="50" y="374" width="16" height="16" fill="none" stroke="var(--research)" strokeWidth="1.5" opacity="0.7" transform="rotate(90 58 382)" />
                  <rect x="494" y="374" width="16" height="16" fill="none" stroke="var(--research)" strokeWidth="1.5" opacity="0.7" transform="rotate(270 502 382)" />
                </svg>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full bg-background transition-colors duration-500">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <SystemsUniverse />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden cn2-depth-layer cn2-diffuse" data-cn2-depth="" style={{ "--cn2-depth-k": 0.4 } as React.CSSProperties} aria-hidden="true">
        <div className="absolute inset-0 grid-field opacity-70" />
        <div className="absolute -left-[20vw] -top-[10vh] h-[75vh] w-[75vw] rounded-full bg-[radial-gradient(closest-side,rgba(22,119,255,0.16),transparent)] blur-2xl" />
        <div className="absolute -bottom-[15vh] -right-[15vw] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(0,240,255,0.10),transparent)] blur-2xl" />
        <div className="absolute inset-x-0 top-[38%] h-px bg-gradient-to-r from-transparent via-signal/20 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* SECTION 1 — COMPLETE PROFESSIONAL IDENTITY */}
        <section id="identity" className="relative min-h-dvh w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[64%] bg-gradient-to-r from-black/85 via-black/50 to-transparent md:block" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/50 to-transparent" aria-hidden="true" />

          <div className="relative z-20 px-6 pb-10 pt-28 md:absolute md:left-0 md:top-0 md:flex md:h-full md:w-[54%] md:items-center md:px-14 md:pb-0 md:pt-0 lg:px-20">
            <div className="max-w-[30rem]">
              <p className="label-mono text-[10px] text-white/45">ABOUT / IDENTITY</p>
              <h1 className="display mt-6 text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.04] text-white md:text-5xl lg:text-6xl">
                <span className="block">I THINK IN</span>
                <span className="block">SYSTEMS.</span>
                <span className="block">I BUILD WHAT&apos;S</span>
                <span className="block">POSSIBLE.</span>
              </h1>
              <p className="mt-8 max-w-[26rem] text-sm leading-relaxed text-white/75">
                I am Bukya Naresh — a quantitative developer who engineers software,
                financial infrastructure, and AI-powered systems.
              </p>
              <p className="mt-4 max-w-[26rem] text-sm leading-relaxed text-white/60">
                My work sits at the convergence of quantitative finance, software
                engineering, data infrastructure, and artificial intelligence. I
                design, build, and validate systems that solve real problems —
                with evidence, not narrative.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="#capabilities" className="label-mono border border-signal/70 bg-signal/10 px-4 py-2.5 text-[10px] text-white transition-colors duration-300 hover:bg-signal hover:text-white">
                  EXPLORE MY CAPABILITIES
                </Link>
                <Link href="#mindset" className="label-mono border border-white/25 px-4 py-2.5 text-[10px] text-white/85 transition-colors duration-300 hover:border-white/60 hover:text-white">
                  HOW I THINK ↓
                </Link>
                <Link href="/cv" className="label-mono border border-white/25 px-4 py-2.5 text-[10px] text-white/85 transition-colors duration-300 hover:border-white/60 hover:text-white">
                  OPEN MY CV ↗
                </Link>
              </div>

              <p className="label-mono mt-10 inline-flex items-center gap-3 text-[10px] text-white/45">
                SCROLL TO EXPLORE
                <span className="h-px w-8 bg-white/30" aria-hidden="true" />
              </p>
            </div>
          </div>
        </section>

        {/* Who I Do */}
        <section id="what-i-do" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="WHAT I DO"
              lines={["QUANTITATIVE FINANCE · SOFTWARE ENGINEERING · DATA INFRASTRUCTURE · AI ENGINEERING"]}
              support="My disciplines connect through systems thinking. Financial intelligence, quantitative reasoning, software, data, and intelligent automation — I build the bridges between them so complex ideas become useful, measurable, and increasingly automated systems."
            />
            <div className="mt-16 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "QUANTITATIVE FINANCE", desc: "Mathematical investigation of financial questions — strategies, risk, and evidence." },
                { label: "SOFTWARE ENGINEERING", desc: "Turning ideas into functioning software through programming, design, testing, and debugging." },
                { label: "DATA INFRASTRUCTURE", desc: "Reliable processes for collecting, validating, processing, and analyzing information." },
                { label: "AI ENGINEERING", desc: "AI-assisted workflows and agent infrastructure with human direction and verification." },
              ].map((d) => (
                <div key={d.label} className="border border-line bg-surface p-6 transition-colors hover:border-signal/50">
                  <h3 className="font-mono text-sm font-bold text-foreground mb-2">{d.label}</h3>
                  <p className="text-xs leading-relaxed text-muted">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How I Think */}
        <section id="mindset" className="scroll-mt-20 border-t border-line/60 bg-surface/75 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="HOW I THINK"
              lines={["I DON&apos;T JUST LOOK AT THE PROBLEM.", "I LOOK AT THE SYSTEM BEHIND IT."]}
              support="I want to understand why something happens, which variables influence it, how its components interact, and what would make a solution reliable. Whether the subject is a market, a data problem, a piece of software, or an AI workflow — the underlying logic comes before the approach."
            />
            <Reveal className="mt-14">
              <MindsetDiagram />
            </Reveal>
          </div>
        </section>

        {/* How I Work */}
        <section id="how-i-work" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="HOW I WORK"
              lines={["FROM THINKING TO EXECUTION.", "IDEAS ARE THE BEGINNING. SYSTEMS MAKE THEM USEFUL."]}
              support="One process connects the disciplines: reasoning to implementation, implementation to evidence — follow it as you scroll, or select any stage directly."
            />
            <Reveal className="mt-16">
              <ProcessChain stages={systemsStages} accent="signal" />
            </Reveal>
          </div>
        </section>

        {/* How I Use AI */}
        <section id="how-i-use-ai" className="scroll-mt-20 border-t border-line/60 bg-surface/75 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="HOW I USE AI"
              lines={["I DEFINE THE DIRECTION.", "AI ACCELERATES THE EXECUTION."]}
              support="I see AI as a way to extend human capability — never a replacement for understanding the problem. The objective, the constraints, and the final decision stay human; verification determines whether the work earns trust."
            />
            <Reveal className="mt-16">
              <ProcessChain stages={aiStages} accent="research" />
            </Reveal>
          </div>
        </section>

        {/* My Capabilities */}
        <section id="capabilities" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="MY CAPABILITIES"
              lines={["DIFFERENT DISCIPLINES.", "ONE CONNECTED DIRECTION."]}
              support="I work toward connecting financial understanding, quantitative reasoning, software, data, and intelligent automation. Select any discipline to see what it means, the problems it addresses, its status, and the work that supports it."
            />
            <Reveal className="mt-14">
              <CapabilityConstellation />
            </Reveal>
          </div>
        </section>

        {/* My Vision */}
        <section id="vision" className="scroll-mt-20 border-t border-line/60 bg-surface/75 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="MY VISION"
              lines={["FROM INDIVIDUAL TOOLS", "TO INTEGRATED INTELLIGENT SYSTEMS."]}
              support="My long-term direction is to develop the knowledge and practical capability to build increasingly sophisticated systems that connect data, computation, decision-making, and automation — moving beyond isolated technologies toward complete, useful solutions."
            />
            <Reveal className="mt-14">
              <VisionNetwork />
            </Reveal>
          </div>
        </section>

        {/* My Principles */}
        <section id="principles" className="scroll-mt-20 border-t border-line/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
            <ChapterHead
              eyebrow="MY PRINCIPLES"
              lines={["BUILD WITH INTENT.", "MEASURE WITH EVIDENCE."]}
              support="The standards I want my work to reflect — not slogans, but the criteria results are held to."
            />
            <PrinciplesEditorial />
          </div>
        </section>

        {/* SECTION 2 — CV DESTINATION */}
        <DestinationSection
          caption="01 · CV"
          label="CV"
          fullForm="CURRICULUM VITAE"
          description="A comprehensive engineering dossier of the systems I&apos;ve designed, developed, researched and validated — projects, metrics, certifications, education, and achievements. Every claim backed by inspectable artifacts."
          audience="RECRUITERS · ENGINEERING LEADERS"
          accent="signal"
          href="/cv"
        />

        {/* SECTION 3 — RÉSUMÉ DESTINATION */}
        <ResumeDestinationSection
          caption="02 · RÉSUMÉ"
          label="RÉSUMÉ"
          fullForm="PROFESSIONAL CAREER PROFILE"
          description="Role-specific résumés aligned to specific professional directions: Systems Engineer, Quantitative Developer, AI Engineer. Each prioritizes the skills, projects, and achievements most relevant to the role."
          audience="HIRING MANAGERS · TALENT PARTNERS"
          accent="research"
          href="/resume"
        />

        {/* SECTION 4 — FINAL IDENTITY FOOTER */}
        <footer id="site-footer" className="relative z-10 mt-20 border-t border-line/60 bg-background/95 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-20">
            <div className="text-center">
              <span className="label-mono text-[10px] text-signal/60">CN2.DEV</span>
              <h2 className="display mt-3 text-[2.4rem] leading-[1.04] text-white md:text-4xl lg:text-5xl">
                BUKYA NARESH
              </h2>
              <p className="label-mono mt-2 text-xs text-white/45">CN2.DEV · QUANTITATIVE DEVELOPER</p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <a href={site.links.email} className="label-mono border border-signal/70 bg-signal/10 px-4 py-2.5 text-[10px] text-white transition-colors duration-300 hover:bg-signal hover:text-white">
                  EMAIL ↗
                </a>
                <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="label-mono border border-white/25 px-4 py-2.5 text-[10px] text-white/85 transition-colors duration-300 hover:border-white/60 hover:text-white">
                  GITHUB ↗
                </a>
                <a href="/contact" className="label-mono border border-white/25 px-4 py-2.5 text-[10px] text-white/85 transition-colors duration-300 hover:border-white/60 hover:text-white">
                  CONTACT ↗
                </a>
              </div>
              <nav aria-label="Footer destinations" className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2">
                <Link href="/work" className="label-mono text-[10px] text-white/55 transition-colors duration-300 hover:text-signal">
                  WORK ↗
                </Link>
                <Link href="/research" className="label-mono text-[10px] text-white/55 transition-colors duration-300 hover:text-signal">
                  RESEARCH ↗
                </Link>
              </nav>
              <p className="label-mono mt-12 text-[10px] text-white/30">
                c 2026 CN2.DEV — all systems self-engineered
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}