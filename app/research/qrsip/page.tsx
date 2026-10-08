import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/data/projects";
import CaseStudy from "@/components/case-study/case-study";

const project = getProject("qrsip");

export const metadata: Metadata = {
  title: "QRSIP — Research Intelligence Platform",
  description:
    "Deterministic quantitative experimentation and research governance platform — hypothesis, experiment, verification, artifact, report, promotion. 352 tests on deterministic fixtures.",
  alternates: { canonical: "/research/qrsip" },
};

export default function QrsipPage() {
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
