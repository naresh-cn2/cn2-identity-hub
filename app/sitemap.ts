import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { flagshipProjects } from "@/data/projects";
import { labModules } from "@/data/lab";

export default function sitemap(): MetadataRoute.Sitemap {
  const main = ["", "/quant", "/research", "/builds", "/lab", "/intelligence", "/career", "/work-with-me", "/about"];
  const projects = flagshipProjects.map((p) => p.route);
  const lab = labModules
    .map((m) => m.href)
    .filter((h) => h.startsWith("/lab/"));

  const urls = new Set([...main, ...projects, ...lab]);
  return [...urls].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
