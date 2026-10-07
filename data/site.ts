export const site = {
  name: "NARESH",
  identity: "QUANTITATIVE INTELLIGENCE",
  subtitle: "Research · Markets · Data · Engineering",
  description:
    "Building quantitative research systems, market-data infrastructure and computational tools for understanding markets.",
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

export const navRoutes = [
  { label: "QUANT", href: "/quant", code: "01" },
  { label: "RESEARCH", href: "/research", code: "02" },
  { label: "BUILDS", href: "/builds", code: "03" },
  { label: "LAB", href: "/lab", code: "04" },
  { label: "INTELLIGENCE", href: "/intelligence", code: "05" },
  { label: "CAREER", href: "/career", code: "06" },
  { label: "WORK WITH ME", href: "/work-with-me", code: "07" },
  { label: "ABOUT", href: "/about", code: "08" },
] as const;
