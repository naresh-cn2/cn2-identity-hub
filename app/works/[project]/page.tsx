import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComprehensiveCaseStudy from "@/components/work/comprehensive-case-study";
import { getAllWorks, getWorkItem } from "@/data/works";
import { site } from "@/data/site";

/**
 * Records that own their own route.
 *
 * Context Engineering Labs has a bespoke page at
 * /works/context-engineering-labs that carries the six-unit breakdown,
 * the verification run and the per-unit limitations in full. The
 * catalogue rendering cannot hold that, so the record declares its own
 * static route and is excluded here — otherwise the dynamic segment
 * would generate a second, thinner version of the same record.
 */
const STANDALONE_RECORDS = new Set(["context-engineering-labs"]);

export function generateStaticParams() {
  return getAllWorks()
    .filter((w) => !STANDALONE_RECORDS.has(w.id))
    .map((w) => ({ project: w.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ project: string }>;
}): Promise<Metadata> {
  const { project: id } = await params;
  const item = getWorkItem(id);
  if (!item) return { title: "Work not found" };

  return {
    title: `${item.title} — Works`,
    description: item.thesis,
    alternates: { canonical: `/works/${item.id}` },
    openGraph: {
      images: ["/opengraph-image"],
      title: `${item.title} — ${site.name} / ${site.identity}`,
      description: item.thesis,
      type: "article",
    },
  };
}

export default async function WorkItemPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: id } = await params;
  const item = getWorkItem(id);
  if (!item) notFound();

  return <ComprehensiveCaseStudy item={item} />;
}

