import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/data/projects";
import CaseStudy from "@/components/case-study/case-study";

const project = getProject("apex-quant-engine");

export const metadata: Metadata = {
  title: "Apex Quant Engine",
  description:
    "Multi-strategy quantitative trading engine across BTC, ETH and SOL — 11.9M+ bars, 5,867 completed backtest trades, deterministic harness. +570.18% net simulated ROI (master-fund backtest).",
  alternates: { canonical: "/quant/apex-quant-engine" },
};

export default function ApexPage() {
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
