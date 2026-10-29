import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComprehensiveCaseStudy from "@/components/work/comprehensive-case-study";
import { getAllWorks, getWorkItem } from "@/data/works";
import { site } from "@/data/site";

export function generateStaticParams() {
  return getAllWorks().map((w) => ({ project: w.id }));
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
