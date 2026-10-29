import type { Metadata } from "next";
import CategoryCatalogue from "@/components/work/category-catalogue";
import { WORK_CATEGORIES, getWorksByCategory } from "@/data/works";

export const metadata: Metadata = {
  title: "Personal Builds — Works",
  description:
    "What I create beyond formal work — autonomous AI assistants, financial intelligence agents, personal workspace kernels, and creative prototypes.",
  alternates: { canonical: "/works/personal-builds" },
};

export default function PersonalBuildsCategoryPage() {
  const category = WORK_CATEGORIES.personal;
  const items = getWorksByCategory("personal");

  return <CategoryCatalogue category={category} items={items} />;
}
