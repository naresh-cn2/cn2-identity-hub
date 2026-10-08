import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/data/projects";
import CaseStudy from "@/components/case-study/case-study";

const project = getProject("automated-trading-os");

export const metadata: Metadata = {
  title: "Automated Trading OS",
  description:
    "Multi-timeframe quantitative trading and execution architecture — HTF to LTF information flow with a 1% risk cap, 1:4 R:R floor and full cost modelling as structural gates.",
  alternates: { canonical: "/quant/automated-trading-os" },
};

export default function AtosPage() {
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
