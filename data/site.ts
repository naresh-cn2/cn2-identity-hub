export const site = {
  /** Primary brand — the professional entity is the person. */
  name: "CN2.DEV",
  /** Secondary brand — the digital platform. */
  identity: "BUKYA NARESH",
  /** System tag used in technical chrome. */
  system: "CN2",
  descriptor: "QUANTITATIVE DEVELOPER",
  subtitle: "Research · Markets · Data · Engineering",
  description:
    "CN2.dev — the digital headquarters of CN2.DEV. Quantitative development through research, markets, data and engineering: deterministic systems for understanding markets.",
  status: "OPEN TO SELECTED WORK · RESEARCH · COLLABORATION",
  url: "https://cn2-identity-hub.vercel.app",
  email: "bukyanaresh2003@gmail.com",
  links: {
    github: "https://github.com/naresh-cn2",
    linkedin: "https://www.linkedin.com/in/bukya-naresh-cn2",
    orcid: "https://orcid.org/0009-0007-7269-1583",
    contra: "https://contra.com/naresh_cn2",
    twitter: "https://x.com/mr_cn2",
    email: "mailto:bukyanaresh2003@gmail.com",
    phone: "tel:+919490004978",
    whatsapp: "https://wa.me/919490004978",
  },
  repos: {
    apex: "https://github.com/naresh-cn2/apex-quant-engine",
    atos: "https://github.com/naresh-cn2/automated_trading_os",
    qmdr: "https://github.com/naresh-cn2/quant-market-data-replay",
    qrsip: "https://github.com/naresh-cn2/quant-research-strategy-intelligence-platform",
    billingGateway: "https://github.com/CloudOps-Financial-Platform/billing-data-gateway",
  },
} as const;

/** A single navigable destination. */
export interface NavLeaf {
  label: string;
  href: string;
  code: string;
}

/** A primary nav entry — optionally a mega-menu group with children. */
export interface NavItem extends NavLeaf {
  children?: NavLeaf[];
}

/**
 * Primary navigation (spec §20, IA v5).
 *
 * The eight primary destinations, in journey order, grouped the same way the
 * hub groups them: BUILDS · LABORATORY · RESEARCH & JOURNAL under Engineering;
 * SERVICES · EDUCATION & CREDENTIALS under Professional Capabilities;
 * CAREERS & COLLABORATION · ABOUT · CONTACT under Engagement.
 *
 * The top bar itself stays minimal (brand · search · theme) — this registry
 * is what the footer index, /links and the command palette render, so the
 * names and the order must match the hub exactly.
 */
export const primaryNav: NavItem[] = [
  {
    label: "BUILDS",
    href: "/works",
    code: "01",
    children: [
      { label: "BUILDS", href: "/works", code: "01" },
      { label: "PRODUCTS", href: "/works/products", code: "01A" },
      { label: "PROJECTS", href: "/works/projects", code: "01B" },
      { label: "INDEPENDENT BUILDS", href: "/works/personal-builds", code: "01C" },
      { label: "CASE STUDIES", href: "/case-studies", code: "02" },
      { label: "CAPABILITIES", href: "/about#capability-map", code: "03" },
      { label: "PROOF", href: "/proof", code: "09" },
    ],
  },
  {
    label: "LABORATORY",
    href: "/lab",
    code: "11",
    children: [
      { label: "LABORATORY", href: "/lab", code: "11" },
      { label: "EXPERIMENTS", href: "/lab/experiments", code: "11A" },
      { label: "RISK SIMULATOR", href: "/lab/risk", code: "11B" },
      { label: "POINT-IN-TIME REPLAY", href: "/lab/market-replay", code: "11C" },
      { label: "STRATEGY VISUALIZER", href: "/lab/strategy", code: "11D" },
    ],
  },
  {
    label: "RESEARCH & JOURNAL",
    href: "/research",
    code: "04",
    children: [
      { label: "RESEARCH & JOURNAL", href: "/research", code: "04" },
      { label: "ARTICLES", href: "/articles", code: "05" },
      { label: "INTELLIGENCE", href: "/intelligence", code: "06" },
    ],
  },
  { label: "SERVICES", href: "/services", code: "20" },
  { label: "EDUCATION & CREDENTIALS", href: "/credentials", code: "07" },
  {
    label: "CAREERS & COLLABORATION",
    href: "/opportunities",
    code: "12",
    children: [
      { label: "CAREERS & COLLABORATION", href: "/opportunities", code: "12" },
      { label: "CAREER & ROLES", href: "/opportunities/career", code: "12A" },
      { label: "FREELANCE", href: "/opportunities/freelance", code: "13" },
      { label: "COLLABORATE", href: "/opportunities/collaborate", code: "14" },
      { label: "PARTNERSHIPS", href: "/opportunities/partnerships", code: "15" },
    ],
  },
  { label: "ABOUT", href: "/about", code: "10" },
  { label: "CONTACT", href: "/contact", code: "16" },
];

/** Secondary destinations — carried by the footer index, /links and the command palette. */
export const secondaryNav: NavItem[] = [
  { label: "TESTIMONIALS", href: "/testimonials", code: "21" },
  { label: "CV", href: "/cv", code: "18" },
  { label: "LINKS", href: "/links", code: "19" },
  { label: "PRIVACY", href: "/privacy", code: "22" },
  { label: "TERMS", href: "/terms", code: "23" },
];

/** The professional action, kept visually distinct from navigation. */
export const workRoute = { label: "WORK WITH ME", href: "/work-with-me", code: "17" } as const;

/**
 * Flat index of every destination — the single source of truth for the footer
 * index and the command palette. Ordered to match the primary nav, then the
 * secondary destinations the bar does not carry.
 */
export const allRoutes: NavLeaf[] = [
  { label: "HOME", href: "/", code: "00" },
  { label: "UNIVERSE HUB", href: "/hub", code: "HUB" },
  ...primaryNav.flatMap((item) =>
    item.children ? item.children : [{ label: item.label, href: item.href, code: item.code }]
  ),
  ...secondaryNav.flatMap((item) =>
    item.children ? item.children : [{ label: item.label, href: item.href, code: item.code }]
  ),
  { label: workRoute.label, href: workRoute.href, code: workRoute.code },
  { label: "PROJECT WORLDS", href: "/work", code: "01D" },
];

/** Deduplicated route index (a group landing href can repeat as a child). */
export const indexRoutes: NavLeaf[] = allRoutes.filter(
  (route, i, arr) => arr.findIndex((r) => r.href === route.href) === i
);

/** Legacy alias retained for existing imports. */
export const navRoutes = indexRoutes;

export const utilityLinks = [
  { label: "GITHUB", href: site.links.github, external: true },
  { label: "LINKEDIN", href: site.links.linkedin, external: true },
  { label: "EMAIL", href: site.links.email, external: true },
  { label: "CV", href: "/cv", external: false },
] as const;

/** True when a nav item should be marked active for the current pathname. */
export function isActiveRoute(pathname: string, href: string): boolean {
  const base = href.split("#")[0];
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}

/** True when any leaf of a nav item (or the item itself) is active. */
export function isActiveNavItem(pathname: string, item: NavItem): boolean {
  if (isActiveRoute(pathname, item.href)) return true;
  return item.children?.some((c) => isActiveRoute(pathname, c.href)) ?? false;
}
