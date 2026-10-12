import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { archiveProjects } from "@/data/archive";
import { caseStudies } from "@/data/case-studies";
import { researchEntries } from "@/data/research";
import { publishedArticles } from "@/data/articles";
import { labModules } from "@/data/lab";
import { serviceSlugs } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const main = [
    "",
    "/hub",
    "/identity",
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
    "/services",
    "/work-with-me",
    "/opportunities",
    "/opportunities/career",
    "/opportunities/freelance",
    "/opportunities/collaborate",
    "/opportunities/partnerships",
    "/contact",
    "/links",
    "/cv",
  ];
  const builds = archiveProjects.map((p) => `/builds/${p.id}`);
  const studies = caseStudies.map((p) => `/case-studies/${p.id}`);
  const research = researchEntries.map((e) => `/research/${e.id}`);
  const articles = publishedArticles.map((a) => `/articles/${a.id}`);
  const lab = labModules.map((m) => m.href).filter((h) => h.startsWith("/lab/"));
  const services = serviceSlugs.map((s) => `/services/${s}`);

  const urls = new Set([...main, ...builds, ...studies, ...research, ...articles, ...lab, ...services]);

  return [...urls].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency:
      path === "" || path === "/builds" || path === "/research" || path === "/case-studies"
        ? "weekly"
        : "monthly",
    priority: path === "" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
