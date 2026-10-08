import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/data/projects";
import CaseStudy from "@/components/case-study/case-study";
import { PipelineFlow, RegimeMap } from "@/components/viz/quant-primitives";

const project = getProject("qrsip");

export const metadata: Metadata = {
  title: "QRSIP — Research Intelligence Platform",
  description:
    "Deterministic quantitative experimentation and research governance platform — hypothesis, experiment, verification, artifact, report, promotion. 352 tests on deterministic fixtures.",
  alternates: { canonical: "/research/qrsip" },
};

export default function QrsipPage() {
  if (!project) notFound();

  const qrsipPipeline: Array<{
    name: string;
    role: string;
    detail?: string[];
    color?: "signal" | "faint" | "foreground";
  }> = [
    { name: "HYPOTHESIS", role: "Falsifiable market question", detail: ["Defined prior", "Measurable outcome"], color: "foreground" },
    { name: "EXPERIMENT", role: "Deterministic test execution", detail: ["Fixed seed", "Controlled vars", "Artifact output"], color: "foreground" },
    { name: "VERIFICATION", role: "Byte-identical reproduction", detail: ["352 test suite", "Deterministic fixtures"], color: "signal" },
    { name: "ARTIFACT", role: "Immutable evidence package", detail: ["Equity curves", "Trade logs", "Config hash"], color: "foreground" },
    { name: "REPORT", role: "Structured findings document", detail: ["Method", "Result", "Limitation"], color: "foreground" },
    { name: "PROMOTION", role: "Governance gate", detail: ["Verified only", "No rhetoric bypass"], color: "signal" },
  ];

  const experimentRegimes: Array<{
    name: string;
    x: number;
    y: number;
    color: string;
    size: number;
    description?: string;
  }> = [
    { name: "COMPLETED", x: 0.2, y: 0.8, color: "var(--signal)", size: 0.9, description: "Promoted to deployment consideration" },
    { name: "VERIFIED", x: 0.4, y: 0.6, color: "var(--foreground)", size: 0.7, description: "Reproducible, limitations documented" },
    { name: "ONGOING", x: 0.6, y: 0.4, color: "var(--muted)", size: 0.5, description: "Experiment in progress" },
    { name: "FAILED GATE", x: 0.8, y: 0.2, color: "var(--chart-axis)", size: 0.4, description: "Did not meet promotion criteria" },
  ];

  return (
    <>
      <CaseStudy project={project} />
      {/* Experiment Topology Section */}
      <section id="experiment-topology" className="border-t border-line" aria-label="Experiment Topology">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <div className="mb-10">
            <p className="label-mono text-faint">EXPERIMENT TOPOLOGY — GOVERNANCE FLOW</p>
            <h2 className="display mt-2 text-3xl md:text-5xl">EXPERIMENT POPULATION MAP</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Each experiment flows through the QRSIP governance pipeline. The map below shows
              the distribution of experiment states across the verification landscape.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="border border-line bg-surface p-6 md:p-8">
              <PipelineFlow stages={qrsipPipeline} flowDirection="vertical" animated={true} />
            </div>
            <div className="border border-line bg-surface p-4 md:p-6">
              <RegimeMap regimes={experimentRegimes} width={600} height={480} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}