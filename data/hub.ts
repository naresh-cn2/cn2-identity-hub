/**
 * Destination registry (spec: /hub — the CN2.DEV universe).
 *
 * Single source of truth for the hub journey. Every destination gets one
 * full-screen section: a short human-readable introduction, one prominent
 * action, and a visual identity. There are no counts or statistics here by
 * design — the hub is an introduction, never a dashboard. Content and
 * measurements belong to the destination page itself, where they can be
 * explained properly.
 *
 * Every `href` is an existing route, verified in `app/`. No section is
 * decorative: each one opens its destination.
 */

export interface HubDestination {
  /** Stable journey key — also the section's anchor code. */
  code: string;
  /** Display title. */
  label: string;
  /** The real destination route. */
  href: string;
  /** One short invitation into the destination. */
  blurb: string;
  /** The action label — what the visitor taps to enter. */
  action: string;
  /** Short identity word for the visual's caption. */
  caption: string;
  /** True when the visual contains real, working links. */
  interactive?: boolean;
}

export const hubDestinations: HubDestination[] = [
  {
    code: "01",
    label: "WORK",
    href: "/work",
    blurb:
      "Explore the software, quantitative systems, and technical infrastructure I'm building.",
    action: "ENTER WORK",
    caption: "ARCHITECTURE",
  },
  {
    code: "02",
    label: "CREDENTIALS",
    href: "/credentials",
    blurb:
      "Education, certifications, and self-directed learning that shape my technical development.",
    action: "EXPLORE CREDENTIALS",
    caption: "LEARNING STRATA",
  },
  {
    code: "03",
    label: "SERVICES",
    href: "/services",
    blurb:
      "Explore the technical work I can deliver, the problems I can help solve, and how we could work together.",
    action: "EXPLORE SERVICES",
    caption: "DELIVERY FLOW",
  },
  {
    code: "04",
    label: "LABORATORY",
    href: "/lab",
    blurb:
      "Explore quantitative experiments, analytical instruments, strategy research, and the results behind tested ideas.",
    action: "ENTER THE LAB",
    caption: "INSTRUMENT",
  },
  {
    code: "05",
    label: "RESEARCH",
    href: "/research",
    blurb:
      "Investigate the questions, experiments, evidence, and conclusions behind my work.",
    action: "EXPLORE RESEARCH",
    caption: "EVIDENCE CHAIN",
  },
  {
    code: "06",
    label: "OPPORTUNITIES",
    href: "/opportunities",
    blurb:
      "Discover ways to work together through employment, freelance projects, research, and technical collaboration.",
    action: "EXPLORE OPPORTUNITIES",
    caption: "PATHWAYS",
  },
  {
    code: "07",
    label: "ABOUT ME",
    href: "/about",
    blurb:
      "The person, thinking, interests, and ambitions behind CN2.DEV.",
    action: "GET TO KNOW ME",
    caption: "HORIZON",
  },
  {
    code: "08",
    label: "LET'S CONNECT",
    href: "/contact",
    blurb:
      "Have a project, opportunity, research idea, or technical question? Let's start a conversation.",
    action: "GET IN TOUCH",
    caption: "CHANNELS",
    interactive: true,
  },
];

/** Secondary destinations the hub index carries below the journey. */
export const hubIndex: { label: string; href: string }[] = [
  { label: "CASE STUDIES", href: "/case-studies" },
  { label: "CAPABILITIES", href: "/capabilities" },
  { label: "ARTICLES", href: "/articles" },
  { label: "INTELLIGENCE", href: "/intelligence" },
  { label: "PROOF", href: "/proof" },
  { label: "IDENTITY", href: "/identity" },
  { label: "CV", href: "/cv" },
  { label: "LINKS", href: "/links" },
  { label: "TESTIMONIALS", href: "/testimonials" },
];
