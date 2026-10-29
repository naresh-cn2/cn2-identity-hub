import type { Metadata } from "next";
import CategoryCatalogue from "@/components/work/category-catalogue";
import { WORK_CATEGORIES, getWorksByCategory } from "@/data/works";

export const metadata: Metadata = {
  title: "Projects — Works",
  description:
    "What I've worked on, researched, and accomplished — quantitative research platforms, deterministic order-book execution engines, and technical engineering proofs.",
  alternates: { canonical: "/works/projects" },
};

export default function ProjectsCategoryPage() {
  const category = WORK_CATEGORIES.projects;
  const items = getWorksByCategory("projects");

  return <CategoryCatalogue category={category} items={items} />;
}
