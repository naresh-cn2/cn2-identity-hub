export const site = {
  /** Primary brand — the professional entity is the person. */
  name: "CN2.DEV",
  /** Secondary brand — the digital platform. */
  identity: "BUKYA NARESH",
  /** System tag used in technical chrome. */
  system: "CN2",
  descriptor: "QUANTITATIVE INTELLIGENCE",
  subtitle: "Research · Markets · Data · Engineering",
  description:
    "CN2.dev — the digital headquarters of CN2.DEV. Quantitative intelligence through research, markets, data and engineering: deterministic systems for understanding markets.",
  status: "OPEN TO SELECTED WORK · RESEARCH · COLLABORATION",
  url: "https://cn2-identity-hub.vercel.app",
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
 * Primary navigation (spec §20).
 *
 * The bar carries grouped destinations rather than every route. WORK, RESEARCH
 * and CREDENTIALS expand into mega-menus (WORK also exposes LAB); ABOUT and
 * CONTACT are direct. Each group's own `href` is its landing destination.
 */
export const primaryNav: NavItem[] = [
  {
    label: "WORK",
    href: "/builds",
    code: "01",
    children: [
      { label: "BUILDS", href: "/builds", code: "01" },
      { label: "CASE STUDIES", href: "/case-studies", code: "02" },
      { label: "CAPABILITIES", href: "/capabilities", code: "03" },
      { label: "LAB", href: "/lab", code: "11" },
    ],
  },
  {
    label: "RESEARCH",
    href: "/research",
    code: "04",
    children: [
      { label: "RESEARCH", href: "/research", code: "04" },
      { label: "ARTICLES", href: "/articles", code: "05" },
      { label: "INTELLIGENCE", href: "/intelligence", code: "06" },
    ],
  },
  {
    label: "CREDENTIALS",
    href: "/certifications",
    code: "07",
    children: [
      { label: "CERTIFICATIONS", href: "/certifications", code: "07" },
      { label: "EDUCATION", href: "/certifications#study", code: "08" },
      { label: "PROOF", href: "/proof", code: "09" },
    ],
  },
  { label: "ABOUT", href: "/about", code: "10" },
  { label: "CONTACT", href: "/contact", code: "12" },
];

/** The professional action, kept visually distinct from navigation. */
export const workRoute = { label: "WORK WITH ME", href: "/work-with-me", code: "13" } as const;

/**
 * Flat index of every destination — the single source of truth for the footer
 * index and the command palette. Ordered to match the primary nav, then the
 * secondary destinations the bar does not carry.
 */
export const allRoutes: NavLeaf[] = [
  { label: "HOME", href: "/", code: "00" },
  ...primaryNav.flatMap((item) =>
    item.children ? item.children : [{ label: item.label, href: item.href, code: item.code }]
  ),
  { label: workRoute.label, href: workRoute.href, code: workRoute.code },
  { label: "CV", href: "/cv", code: "14" },
  { label: "LINKS", href: "/links", code: "15" },
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
