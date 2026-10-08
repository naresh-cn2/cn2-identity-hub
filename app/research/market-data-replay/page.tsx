import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/data/projects";
import CaseStudy from "@/components/case-study/case-study";
import ReplayLab from "@/components/research/replay-lab";

const project = getProject("market-data-replay");

export const metadata: Metadata = {
  title: "Quant Market Data Replay",
  description:
    "Point-in-time safe market-data infrastructure — exact decimal arithmetic, nanosecond timestamps, deterministic replay and adversarial testing against lookahead bias.",
  alternates: { canonical: "/research/market-data-replay" },
};

export default function MarketDataReplayPage() {
  if (!project) notFound();

  return (
    <>
      <CaseStudy project={project} />
      {/* Enhanced Replay Lab Section */}
      <section id="replay-lab" className="border-t border-line" aria-label="Replay Lab">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24">
          <ReplayLab />
        </div>
      </section>
    </>
  );
}