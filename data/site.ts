export const site = {
  name: "BUKYA NARESH",
  identity: "QUANT.DEV",
  system: "CN2",
  descriptor: "QUANTITATIVE INTELLIGENCE",
  subtitle: "Research · Markets · Data · Engineering",
  description:
    "Quantitative intelligence through research, markets, data and engineering. Building deterministic systems for understanding markets.",
  status: "OPEN TO SELECTED WORK · RESEARCH · COLLABORATION",
  url: "https://naresh.dev",
  email: "bukyanaresh2003@gmail.com",
  links: {
    github: "https://github.com/naresh-cn2",
    linkedin: "https://www.linkedin.com/in/bukya-naresh-cn2",
    email: "mailto:bukyanaresh2003@gmail.com",
  },
  repos: {
    apex: "https://github.com/naresh-cn2/apex-quant-engine",
    atos: "https://github.com/naresh-cn2/automated_trading_os",
    qmdr: "https://github.com/naresh-cn2/quant-market-data-replay",
    qrsip: "https://github.com/naresh-cn2/quant-research-strategy-intelligence-platform",
    billingGateway: "https://github.com/CloudOps-Financial-Platform/billing-data-gateway",
  },
} as const;

/**
 * Global information architecture.
 * HOME is the narrative entrance; every other destination owns one
 * proof category and is the only place that category is presented in full.
 */
export const navRoutes = [
  { label: "HOME", href: "/", code: "00" },
  { label: "BUILDS", href: "/builds", code: "01" },
  { label: "RESEARCH", href: "/research", code: "02" },
  { label: "LAB", href: "/lab", code: "03" },
  { label: "ARTICLES", href: "/articles", code: "04" },
  { label: "CERTIFICATIONS", href: "/certifications", code: "05" },
  { label: "CAPABILITIES", href: "/capabilities", code: "06" },
  { label: "ABOUT", href: "/about", code: "07" },
] as const;

/** The professional action, kept visually distinct from navigation. */
export const workRoute = { label: "WORK WITH ME", href: "/work-with-me", code: "08" } as const;

/** Footer index — includes secondary destinations the primary nav does not carry. */
export const indexRoutes = [
  ...navRoutes,
  workRoute,
  { label: "CV", href: "/cv", code: "09" },
  { label: "LINKS", href: "/links", code: "10" },
] as const;

export const utilityLinks = [
  { label: "GITHUB", href: site.links.github, external: true },
  { label: "LINKEDIN", href: site.links.linkedin, external: true },
  { label: "EMAIL", href: site.links.email, external: true },
  { label: "CV", href: "/cv", external: false },
] as const;

/** True when a nav item should be marked active for the current pathname. */
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
