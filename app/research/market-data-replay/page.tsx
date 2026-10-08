import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/data/projects";
import CaseStudy from "@/components/case-study/case-study";

const project = getProject("market-data-replay");

export const metadata: Metadata = {
  title: "Quant Market Data Replay",
  description:
    "Point-in-time safe market-data infrastructure — exact decimal arithmetic, nanosecond timestamps, deterministic replay and adversarial testing against lookahead bias.",
  alternates: { canonical: "/research/market-data-replay" },
};

export default function MarketDataReplayPage() {
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
