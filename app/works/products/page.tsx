import type { Metadata } from "next";
import CategoryCatalogue from "@/components/work/category-catalogue";
import { WORK_CATEGORIES, getWorksByCategory } from "@/data/works";

export const metadata: Metadata = {
  title: "Products & Platforms — Works",
  description:
    "What I build for users, businesses, and the market — production software products, high-throughput financial data gateways, and integrated cloud analytics platforms.",
  alternates: { canonical: "/works/products" },
};

export default function ProductsPage() {
  const category = WORK_CATEGORIES.products;
  const items = getWorksByCategory("products");

  return <CategoryCatalogue category={category} items={items} />;
}
