import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { archiveProjects } from "@/data/archive";
import { researchEntries } from "@/data/research";
import { publishedArticles } from "@/data/articles";
import { labModules } from "@/data/lab";

export default function sitemap(): MetadataRoute.Sitemap {
  const main = [
    "",
    "/builds",
    "/research",
    "/articles",
    "/certifications",
    "/capabilities",
    "/lab",
    "/about",
    "/work-with-me",
    "/links",
    "/cv",
  ];
  const builds = archiveProjects.map((p) => `/builds/${p.id}`);
  const research = researchEntries.map((e) => `/research/${e.id}`);
  const articles = publishedArticles.map((a) => `/articles/${a.id}`);
  const lab = labModules.map((m) => m.href).filter((h) => h.startsWith("/lab/"));

  const urls = new Set([...main, ...builds, ...research, ...articles, ...lab]);

  return [...urls].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" || path === "/builds" || path === "/research" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
