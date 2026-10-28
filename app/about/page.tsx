import type { Metadata } from "next";
import SystemsUniverse from "@/components/about/systems-universe";
import Link from "next/link";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import Reveal from "@/components/ui/reveal";
import MindsetDiagram from "@/components/about/mindset-diagram";
import CapabilityConstellation from "@/components/about/capability-constellation";
import ProcessChain from "@/components/about/process-chain";
import PrinciplesEditorial from "@/components/about/principles-editorial";
import VisionNetwork from "@/components/about/vision-network";
import CollaborationPaths from "@/components/about/collaboration-paths";
import { aiStages, systemsStages } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who I am, how I think, and what I am building toward — quantitative finance, data infrastructure, software engineering, and AI-accelerated automation. The about page of Bukya Naresh / CN2.DEV.",
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

/* Section shell shared by chapters 02-08. */
function ChapterHead({
  index,
  eyebrow,
  lines,
  support,
}: {
  index: string;
  eyebrow: string;
  lines: string[];
  support: string;
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="num-mono text-xs text-signal">SECTION / {index}</span>
        <span className="label-mono text-faint">{eyebrow}</span>
      </div>
      <h2 className="display mt-7 max-w-4xl text-3xl leading-[1.06] md:text-5xl">
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </h2>
      <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted">{support}</p>
    </Reveal>
  );
}

/* The about page: a cinematic identity opening over the cosmic figure,
   followed by seven editorial chapters with real, interactive diagrams.
   The picture itself never moves; the sky above it lives. */
export default function AboutPage() {
  return (
    <>
      {/* ---- 01 · CINEMATIC IDENTITY ---------------------------------- */}
      <section id="identity" className="relative min-h-dvh w-full overflow-hidden bg-[#030408]">
        {/* readability gradient over the left third (desktop) */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[64%] bg-gradient-to-r from-black/85 via-black/50 to-transparent md:block"
          aria-hidden="true"
        />
        {/* navbar legibility scrim */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/50 to-transparent"
          aria-hidden="true"
        />

        {/* identity text — in flow above the figure on mobile, left-third
            editorial column over it on desktop */}
        <div className="relative z-20 px-6 pb-10 pt-28 md:absolute md:left-0 md:top-0 md:flex md:h-full md:w-[54%] md:items-center md:px-14 md:pb-0 md:pt-0 lg:px-20">
          <div className="max-w-[30rem]">
            <p className="label-mono text-[10px] text-white/45">ABOUT / IDENTITY / 001</p>
            <h1 className="display mt-6 text-[2.4rem] leading-[1.04] text-white md:text-5xl lg:text-6xl">
              <span className="block">I THINK IN</span>
              <span className="block">SYSTEMS.</span>
              <span className="block">I BUILD WHAT&apos;S</span>
              <span className="block">POSSIBLE.</span>
            </h1>
            <p className="mt-8 max-w-[26rem] text-sm leading-relaxed text-white/75">
              I&apos;m Bukya Naresh. My interests span quantitative finance, intelligent automation,
              software engineering, data infrastructure, and computational decision-making.
            </p>
            <p className="mt-4 max-w-[26rem] text-sm leading-relaxed text-white/60">
              I explore how these disciplines connect — and how complex ideas can become useful,
              measurable, and increasingly automated systems.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#capabilities"
                className="label-mono border border-signal/70 bg-signal/10 px-4 py-2.5 text-[10px] text-white transition-colors duration-300 hover:bg-signal hover:text-background"
              >
                EXPLORE MY CAPABILITIES
              </a>
              <a
                href="#mindset"
                className="label-mono border border-white/25 px-4 py-2.5 text-[10px] text-white/85 transition-colors duration-300 hover:border-white/60 hover:text-white"
              >
                HOW I THINK ↓
              </a>
              <Link
                href="/work"
                className="label-mono border border-white/25 px-4 py-2.5 text-[10px] text-white/85 transition-colors duration-300 hover:border-white/60 hover:text-white"
              >
                EXPLORE WORK ↗
              </Link>
            </div>

            <p className="label-mono mt-10 inline-flex items-center gap-3 text-[10px] text-white/45">
              SCROLL TO EXPLORE
              <span className="h-px w-8 bg-white/30" aria-hidden="true" />
            </p>
          </div>
        </div>

        {/* 100% Coded Systems & Trajectories Canvas */}
        <SystemsUniverse />
      </section>

      {/* ---- 02 · THE WAY I THINK ------------------------------------- */}
      <section id="mindset" className="scroll-mt-20 border-t border-line bg-background">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
          <ChapterHead
            index="002"
            eyebrow="THE WAY I THINK"
            lines={["I DON'T JUST LOOK AT THE PROBLEM.", "I LOOK AT THE SYSTEM BEHIND IT."]}
            support="I want to understand why something happens, which variables influence it, how its components interact, and what would make a solution reliable. Whether the subject is a market, a data problem, a piece of software, or an AI workflow — the underlying logic comes before the approach."
          />
          <Reveal className="mt-14">
            <MindsetDiagram />
          </Reveal>
        </div>
      </section>

      {/* ---- 03 · CAPABILITY ARCHITECTURE ----------------------------- */}
      <section id="capabilities" className="scroll-mt-20 border-t border-line bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
          <ChapterHead
            index="003"
            eyebrow="CAPABILITY ARCHITECTURE"
            lines={["DIFFERENT DISCIPLINES.", "ONE CONNECTED DIRECTION."]}
            support="I work toward connecting financial understanding, quantitative reasoning, software, data, and intelligent automation. Select any discipline to see what it means, the problems it addresses, its status, and the work that supports it."
          />
          <Reveal className="mt-14">
            <CapabilityConstellation />
          </Reveal>
        </div>
      </section>

      {/* ---- 04 · FROM THINKING TO EXECUTION -------------------------- */}
      <section id="systems" className="scroll-mt-20 border-t border-line bg-background">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
          <ChapterHead
            index="004"
            eyebrow="FROM THINKING TO EXECUTION"
            lines={["IDEAS ARE THE BEGINNING.", "SYSTEMS MAKE THEM USEFUL."]}
            support="One process connects the disciplines: reasoning to implementation, implementation to evidence — follow it as you scroll, or select any stage directly."
          />
          <Reveal className="mt-16">
            <ProcessChain stages={systemsStages} accent="signal" />
          </Reveal>
        </div>
      </section>

      {/* ---- 05 · HUMAN DIRECTION · INTELLIGENT EXECUTION ------------- */}
      <section id="ai" className="scroll-mt-20 border-t border-line bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
          <ChapterHead
            index="005"
            eyebrow="HUMAN DIRECTION · INTELLIGENT EXECUTION"
            lines={["I DEFINE THE DIRECTION.", "AI ACCELERATES THE EXECUTION."]}
            support="I see AI as a way to extend human capability — never a replacement for understanding the problem. The objective, the constraints, and the final decision stay human; verification determines whether the work earns trust."
          />
          <Reveal className="mt-16">
            <ProcessChain stages={aiStages} accent="research" />
          </Reveal>
        </div>
      </section>

      {/* ---- 06 · WORKING PRINCIPLES ---------------------------------- */}
      <section id="principles" className="scroll-mt-20 border-t border-line bg-background">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
          <ChapterHead
            index="006"
            eyebrow="WORKING PRINCIPLES"
            lines={["BUILD WITH INTENT.", "MEASURE WITH EVIDENCE."]}
            support="The standards I want my work to reflect — not slogans, but the criteria results are held to."
          />
          <PrinciplesEditorial />
        </div>
      </section>

      {/* ---- 07 · THE LONG-TERM DIRECTION ----------------------------- */}
      <section id="vision" className="scroll-mt-20 border-t border-line bg-surface">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
          <ChapterHead
            index="007"
            eyebrow="THE LONG-TERM DIRECTION"
            lines={["FROM INDIVIDUAL TOOLS", "TO INTEGRATED INTELLIGENT SYSTEMS."]}
            support="My long-term direction is to develop the knowledge and practical capability to build increasingly sophisticated systems that connect data, computation, decision-making, and automation — moving beyond isolated technologies toward complete, useful solutions."
          />
          <Reveal className="mt-14">
            <VisionNetwork />
          </Reveal>
        </div>
      </section>

      {/* ---- 08 · LET'S BUILD SOMETHING USEFUL ------------------------ */}
      <section id="collaborate" className="scroll-mt-20 border-t border-line bg-background">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28">
          <ChapterHead
            index="008"
            eyebrow="LET'S BUILD SOMETHING USEFUL"
            lines={[
              "DIFFERENT PERSPECTIVES.",
              "MEANINGFUL PROBLEMS.",
              "USEFUL SYSTEMS.",
            ]}
            support="I am interested in opportunities to apply structured thinking, software, data, research, and intelligent automation to meaningful technical problems. Whatever the perspective, the first step is the same: understand the problem and determine whether there is a useful way to solve it."
          />
          <CollaborationPaths />
        </div>
      </section>
    </>
  );
}


