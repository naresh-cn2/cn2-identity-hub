import type { Metadata } from "next";
import Link from "next/link";
import KineticText from "@/components/ui/kinetic-text";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import NeuralFigure from "@/components/visuals/neural-figure";
import ExploreNext from "@/components/engagement/explore-next";
import ContextEngineeringLabs from "@/components/work/context-engineering-labs";
import {
  CE_LABS,
  CE_LABS_REPO,
  CE_LABS_REPO_META,
  CE_LAB_LAYERS,
  repoFile,
} from "@/data/context-engineering-labs";

/**
 * /works/context-engineering-labs
 *
 * The canonical record for the Hugging Face Context Engineering Course
 * labs.
 *
 * The framing matters: this is ONE public repository containing six
 * implementations, not six repositories. The page is built around that
 * distinction — the repository is the project, the six units are its
 * parts.
 *
 * Every claim on this page was checked against the published source.
 * Where the repository's own documentation overstates what its code
 * does, the page states what the code does. The unit explorer carries
 * those corrections per lab, and the "what this is not" section carries
 * them for the repository as a whole.
 */

export const metadata: Metadata = {
  title: "Context Engineering Labs — Six Agent Systems, One Repository",
  description:
    "Six implementations from the Hugging Face Context Engineering Course in one public repository: Agent Skills, an MCP server, a cross-agent plugin bundle, a multi-agent code-quality pipeline, an agent activity dashboard and a sandboxed execution harness. 72 automated tests, independently reproduced.",
  alternates: { canonical: "/works/context-engineering-labs" },
  keywords: [
    "context engineering",
    "agent skills",
    "Model Context Protocol",
    "MCP server",
    "multi-agent orchestration",
    "agent observability",
    "sandboxing",
    "SSRF protection",
    "command allowlist",
    "Python",
    "Hugging Face Context Course",
    "Bukya Naresh",
  ],
  openGraph: {
    images: ["/opengraph-image"],
    title: "Context Engineering Labs — CN2.DEV",
    description:
      "Six agent systems in one repository — skills, protocol, packaging, orchestration, observability and an execution boundary. 72 automated tests, independently reproduced.",
    type: "article",
  },
};

export default function ContextEngineeringLabsPage() {
  return (
    <>
      {/* ---- hero ---- */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="network" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <Reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <p className="label-mono text-signal">
                    BUILDS / PROJECTS /{" "}
                    <span className="text-foreground">AGENT INFRASTRUCTURE</span>
                  </p>
                  <p className="label-mono text-faint">
                    HUGGING FACE CONTEXT ENGINEERING COURSE
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <KineticText
                  className="display mt-8 text-[clamp(2.4rem,7vw,5.8rem)]"
                  ariaLabel="Six labs. One repository."
                >
                  SIX LABS. ONE REPOSITORY.
                </KineticText>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                  Six implementations of the agent stack — portable knowledge, a tool
                  protocol, a distribution bundle, multi-agent orchestration, lifecycle
                  observability and a hardened execution boundary — built while studying
                  the Hugging Face Context Engineering Course. They live in{" "}
                  <strong className="text-foreground">one public repository</strong>, not
                  six. The suite is 72 automated tests, and I re-ran all of them from a
                  fresh clone to produce the numbers below.
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  {[
                    "6 IMPLEMENTATIONS · 1 REPOSITORY",
                    "72 / 72 TESTS REPRODUCED LOCALLY",
                    "MIT LICENSED",
                    "NO CERTIFICATE CLAIMED",
                    "NOT DEPLOYED — LOCAL PROCESSES",
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="label-mono border border-line-strong px-3 py-1.5 text-[10px] text-muted"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={280}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href={CE_LABS_REPO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="corner-ticks group inline-flex items-center gap-4 border border-signal bg-signal/15 px-7 py-3.5 label-mono text-xs font-bold text-signal transition-colors hover:bg-signal hover:text-white"
                  >
                    <span>OPEN THE COMPLETE REPOSITORY</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                  <a
                    href={repoFile("docs/RUNTIME_VERIFICATION.md")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="corner-ticks group inline-flex items-center gap-4 border border-line-strong px-7 py-3.5 label-mono text-xs text-foreground transition-colors hover:border-signal hover:text-signal"
                  >
                    <span>RUNTIME VERIFICATION</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                  <a
                    href={repoFile("PROJECTS.md")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="corner-ticks group inline-flex items-center gap-4 border border-line px-7 py-3.5 label-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-foreground"
                  >
                    <span>PROJECT DOSSIER</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={140} className="w-full">
              <div className="viz-frame mx-auto w-full max-w-[560px] p-2">
                <NeuralFigure compact seed={11} />
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        {/* ================================================================
            01 — THE VERIFICATION
            ================================================================ */}
        <section id="verification" className="scroll-mt-28 pt-20 md:pt-28">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <h2 className="display text-2xl md:text-4xl text-foreground">
                THE VERIFICATION, RE-RUN
              </h2>
            </div>
            <p className="label-mono mt-2 text-faint">
              INDEPENDENT EXECUTION · NOT A REPEAT OF THE REPOSITORY&apos;S OWN CLAIM
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  value: "72 / 72",
                  label: "TESTS PASSING",
                  context: `RE-RUN FROM A FRESH CLONE · ${CE_LABS_REPO_META.testDuration}`,
                },
                {
                  value: "6",
                  label: "IMPLEMENTATIONS",
                  context: "SIX SOURCE DIRECTORIES IN ONE REPOSITORY",
                },
                {
                  value: "1",
                  label: "PUBLIC REPOSITORY",
                  context: "NOT SIX — ONE TREE, SIX UNITS",
                },
                {
                  value: "MIT",
                  label: "LICENCE",
                  context: "ROOT LICENSE FILE · SEE THE NOTE BELOW",
                },
              ].map((m) => (
                <div key={m.label} className="bg-background p-6 md:p-7">
                  <p className="num-mono text-3xl text-foreground md:text-4xl">
                    {m.value}
                  </p>
                  <p className="label-mono mt-3 text-foreground">{m.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{m.context}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal delay={120}>
              <div className="h-full border border-line bg-surface/40 p-6 md:p-8">
                <p className="label-mono text-[10px] text-signal">
                  WHERE THE 72 CASES ACTUALLY SIT
                </p>
                <table className="mt-5 w-full border-collapse text-left">
                  <caption className="sr-only">
                    Test case distribution across the six units and the cross-unit
                    integration audit
                  </caption>
                  <thead>
                    <tr className="border-b border-line">
                      <th scope="col" className="label-mono py-2 text-[9px] text-faint">
                        UNIT
                      </th>
                      <th scope="col" className="label-mono py-2 text-[9px] text-faint">
                        SUITE
                      </th>
                      <th scope="col" className="label-mono py-2 text-right text-[9px] text-faint">
                        CASES
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {CE_LABS_REPO_META.testDistribution.map((row) => (
                      <tr key={row.unit} className="border-b border-line/60">
                        <td className="num-mono py-2.5 text-xs text-signal">
                          {row.unit}
                        </td>
                        <td className="py-2.5 text-sm text-muted">{row.name}</td>
                        <td className="num-mono py-2.5 text-right text-sm text-foreground">
                          {row.tests}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="num-mono py-3 text-xs text-signal">—</td>
                      <td className="py-3 text-sm font-bold text-foreground">
                        TOTAL
                      </td>
                      <td className="num-mono py-3 text-right text-sm font-bold text-foreground">
                        {CE_LABS_REPO_META.testTotal}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-5 text-xs leading-relaxed text-muted">
                  Unit 04 contributes 11 cases from 5 test functions — four agent
                  definitions are checked per host through parametrisation. Unit 06
                  defines 16 functions, one of which is a pytest fixture rather than a
                  case.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="h-full space-y-4">
                <div className="border border-line bg-surface/40 p-6 md:p-7">
                  <p className="label-mono text-[10px] text-faint">
                    EXECUTION ENVIRONMENT
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {CE_LABS_REPO_META.testEnvironment}. The repository documents
                    Python 3.12.10 with pytest 9.2.0; my run used pytest 9.1.1 and
                    collected the same 72 cases.
                  </p>
                </div>

                <div className="border border-line bg-surface/40 p-6 md:p-7">
                  <p className="label-mono text-[10px] text-faint">
                    ONE TEST NEEDS A LIVE SERVICE
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {CE_LABS_REPO_META.liveDependency}
                  </p>
                </div>

                <div className="border border-line bg-surface/40 p-6 md:p-7">
                  <p className="label-mono text-[10px] text-faint">LICENCE NOTE</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {CE_LABS_REPO_META.licenseNote}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            02 — THE STACK
            ================================================================ */}
        <section id="stack" className="scroll-mt-28 pt-20 md:pt-28">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-research" />
              <h2 className="display text-2xl md:text-4xl text-foreground">
                THE SIX LAYERS, IN ORDER
              </h2>
            </div>
            <p className="label-mono mt-2 text-faint">
              A STACK, NOT A LIST · EACH LAYER ANSWERS THE ONE BELOW IT
            </p>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              The units are not six unrelated exercises. Each one supplies something the
              next one needs — knowledge a host can load, a protocol to call it through, a
              bundle to ship it in, agents to divide the work, telemetry to see what
              happened, and a boundary for what the agent is allowed to touch. The
              architecture below is the one the repository itself documents, reduced to
              the six claims worth making.
            </p>
          </Reveal>

          <div className="mt-10 divide-y divide-line border-y border-line">
            {CE_LAB_LAYERS.map((layer, i) => {
              const lab = CE_LABS.find((l) => l.layer === layer.id);
              return (
                <Reveal key={layer.id} delay={i * 50}>
                  <div className="grid gap-4 py-6 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-8">
                    <div className="flex items-baseline gap-4 md:w-64">
                      <span className="num-mono text-xs text-signal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="label-mono text-foreground">{layer.label}</p>
                        <p className="mt-1 text-xs text-faint">{lab?.title}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">{layer.role}</p>
                    {lab && (
                      <a
                        href={`#ce-lab-${lab.code}`}
                        className="link-line label-mono shrink-0 text-[10px] text-research hover:text-foreground"
                      >
                        JUMP TO UNIT {lab.code} →
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ================================================================
            03 — THE UNITS
            ================================================================ */}
        <section id="units" className="scroll-mt-28 pt-20 md:pt-28">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <h2 className="display text-2xl md:text-4xl text-foreground">
                THE SIX UNITS, OPENED
              </h2>
            </div>
            <p className="label-mono mt-2 text-faint">
              EACH CARD OPENS TO ITS CAPABILITIES, ITS STACK, AND ITS LIMITS
            </p>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              Filter by layer, or open a unit for the full record. Every unit links
              straight to its own source directory, README and architecture document
              inside the repository — and every unit states where it stops matching the
              description its own documentation gives it.
            </p>
          </Reveal>

          <div className="mt-10">
            <ContextEngineeringLabs />
          </div>
        </section>

        {/* ================================================================
            04 — WHAT THIS IS NOT
            ================================================================ */}
        <section id="not-claimed" className="scroll-mt-28 pt-20 md:pt-28">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <h2 className="display text-2xl md:text-4xl text-foreground">
                WHAT THIS IS NOT
              </h2>
            </div>
            <p className="label-mono mt-2 text-faint">
              THE CLAIMS A PORTFOLIO WOULD USUALLY MAKE, AND WHY THEY ARE NOT MADE HERE
            </p>
          </Reveal>

          <div className="mt-10 grid gap-px bg-line lg:grid-cols-3">
            {[
              {
                heading: "NO CERTIFICATE",
                body: CE_LABS_REPO_META.certification,
                tone: "text-signal" as const,
              },
              {
                heading: "NO DEPLOYMENT",
                body: CE_LABS_REPO_META.deployment,
                tone: "text-signal" as const,
              },
              {
                heading: "SIX PARTS, NOT SIX PRODUCTS",
                body:
                  "This is one repository with six directories in it. The unit cards link to source directories, not to separate projects. There is one package manifest at the root, one licence, one test suite and one commit history — and the site presents it that way rather than inflating it into six portfolio entries.",
                tone: "text-research" as const,
              },
              {
                heading: "NOT ALL PRODUCTION-READY",
                body:
                  "The repository's own portfolio document calls every unit a “production reference”. The source does not support that. The dashboard has no server-side event stream, the plugin's analytics live in a sibling directory, the pipeline's deterministic mode is string heuristics rather than simulated agents, and the harness is an in-process boundary rather than an operating-system sandbox. Each unit's card says so specifically.",
                tone: "text-signal" as const,
              },
              {
                heading: "NO USERS, NO ADOPTION",
                body:
                  "Nothing here has a user count, a deployment count, a latency figure or a benchmark. The repository has one star and no releases, and none of that is a result worth putting on a page. The numbers on this page are test counts, file counts and a licence — the things that can be checked.",
                tone: "text-signal" as const,
              },
              {
                heading: "COURSE ATTRIBUTION",
                body:
                  "The labs were built while studying the Hugging Face Context Engineering Course by Ben Burtenshaw. The upstream course material is public and the labs are an independent implementation of it — not an official artefact, and not endorsed by Hugging Face.",
                tone: "text-research" as const,
              },
            ].map((item, i) => (
              <Reveal key={item.heading} delay={(i % 3) * 60}>
                <div className="h-full bg-background p-6 md:p-7">
                  <p className={`label-mono ${item.tone}`}>{item.heading}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div className="mt-8 border border-line bg-surface/40 p-6 md:p-8">
              <p className="label-mono text-[10px] text-faint">
                THE REPOSITORY&apos;S OWN AUDIT DOCUMENTS
              </p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {[
                  { label: "RUNTIME VERIFICATION", href: repoFile("docs/RUNTIME_VERIFICATION.md") },
                  { label: "SECURITY AUDIT", href: repoFile("docs/SECURITY_AUDIT.md") },
                  { label: "SYSTEM ARCHITECTURE", href: repoFile("docs/ARCHITECTURE.md") },
                  { label: "PROJECT DOSSIER", href: repoFile("PROJECTS.md") },
                  { label: "PROGRESS & STATUS", href: repoFile("PROGRESS.md") },
                  { label: "CROSS-UNIT AUDIT TEST", href: repoFile("tests/integration_audit_test.py") },
                ].map((d) => (
                  <a
                    key={d.href}
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line label-mono text-[10px] text-muted hover:text-signal"
                  >
                    {d.label} →
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---- closing repository call ---- */}
        <section className="pt-20 md:pt-28">
          <Reveal>
            <div className="corner-ticks border border-signal bg-signal/5 p-8 md:p-12">
              <p className="label-mono text-signal">THE WHOLE THING</p>
              <h2 className="display mt-4 text-2xl md:text-4xl text-foreground">
                ONE REPOSITORY. READ IT.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                Every claim on this page can be checked against the source, because the
                source is one click away. Clone it, install the requirements, and run{" "}
                <code className="font-mono text-foreground">python -m pytest -v</code> to
                reproduce the 72.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={CE_LABS_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="corner-ticks group inline-flex items-center gap-4 border border-signal bg-signal px-7 py-3.5 label-mono text-xs font-bold text-white transition-colors hover:bg-transparent hover:text-signal"
                >
                  <span>{CE_LABS_REPO.replace("https://github.com/", "")}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                <Link
                  href="/works/projects"
                  className="corner-ticks group inline-flex items-center gap-4 border border-line-strong px-7 py-3.5 label-mono text-xs text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  <span>← THE COMPLETE PROJECT CATALOGUE</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <ExploreNext
        eyebrow="WHERE TO GO NEXT"
        title="THIS IS ONE RECORD AMONG SEVERAL."
        intro="The labs are agent infrastructure. These are the neighbouring records — the systems I built to make numbers trustworthy, and the research behind them."
        destinations={[
          {
            code: "1B",
            label: "COMPLETE PROJECT CATALOGUE",
            description:
              "Every flagship quantitative system, research build and agent-infrastructure project in the archive, filterable by discipline.",
            href: "/works/projects",
          },
          {
            code: "03",
            label: "WHAT I CAN CONTRIBUTE",
            description:
              "The capability map — what I build, the evidence behind it, and where that maps onto a commercial engagement.",
            href: "/about#capability-map",
          },
          {
            code: "02",
            label: "DEEP CASE STUDIES",
            description:
              "Five flagship systems taken all the way down — problem, hypothesis, architecture, implementation, validation, results and limits.",
            href: "/case-studies",
          },
          {
            code: "09",
            label: "PROOF PACKAGE",
            description:
              "Repositories, certificates and verification records collected in one place, with the evidence class stated for every item.",
            href: "/proof",
          },
          {
            code: "12",
            label: "HIRE OR COLLABORATE",
            description:
              "If you need agent infrastructure, an MCP server or a hardened execution boundary built, this is where the conversation starts.",
            href: "/opportunities",
          },
        ]}
      />

    </>
  );
}
