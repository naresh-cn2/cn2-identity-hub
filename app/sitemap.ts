import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { archiveProjects } from "@/data/archive";
import { caseStudies } from "@/data/case-studies";
import { researchEntries } from "@/data/research";
import { publishedArticles } from "@/data/articles";
import { labModules } from "@/data/lab";

export default function sitemap(): MetadataRoute.Sitemap {
  const main = [
    "",
    "/builds",
    "/case-studies",
    "/research",
    "/articles",
    "/intelligence",
    "/certifications",
    "/proof",
    "/capabilities",
    "/lab",
    "/about",
    "/work-with-me",
    "/contact",
    "/links",
    "/cv",
  ];
  const builds = archiveProjects.map((p) => `/builds/${p.id}`);
  const studies = caseStudies.map((p) => `/case-studies/${p.id}`);
  const research = researchEntries.map((e) => `/research/${e.id}`);
  const articles = publishedArticles.map((a) => `/articles/${a.id}`);
  const lab = labModules.map((m) => m.href).filter((h) => h.startsWith("/lab/"));

  const urls = new Set([...main, ...builds, ...studies, ...research, ...articles, ...lab]);

  return [...urls].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency:
      path === "" || path === "/builds" || path === "/research" || path === "/case-studies"
        ? "weekly"
        : "monthly",
    priority: path === "" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
