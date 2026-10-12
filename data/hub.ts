import { archiveProjects } from "./archive";
import { caseStudyCards } from "./case-studies";
import { researchEntries } from "./research";
import { publishedArticles } from "./articles";
import { labModules } from "./lab";
import { serviceSlugs } from "./services";
import { capabilities } from "./capabilities";
import { credentials, studyTracks } from "./certifications";
import { site } from "./site";

/**
 * Digital Headquarters registry (spec: /hub).
 *
 * Single source of truth for the destination panels shown after ENTER CN2.DEV.
 * The hub is a wayfinding layer — it routes visitors to a destination and shows
 * a live count drawn from that destination's own data file. It never restates
 * the content of the page it points at, so a count or status can never drift
 * out of sync with the archive behind it.
 *
 * Every `href` here is an existing route. No panel is decorative: each one
 * opens its destination.
 */

export interface HubDestination {
  /** Nav code shown in the panel corner — matches the route index. */
  code: string;
  label: string;
  href: string;
  /** One line on who this destination is for. */
  blurb: string;
  /** Live figure pulled from the destination's own data source. */
  metric: { value: string; label: string };
}

export const hubDestinations: HubDestination[] = [
  {
    code: "01",
    label: "BUILDS",
    href: "/builds",
    blurb:
      "Systems, engines and tools — what has actually been built, with status, stack and the evidence behind each one.",
    metric: { value: String(archiveProjects.length), label: "SYSTEMS ARCHIVED" },
  },
  {
    code: "02",
    label: "CREDENTIALS",
    href: "/certifications",
    blurb:
      "Education, certifications and self-directed study — labelled honestly as accredited, in progress or self-directed.",
    metric: {
      value: `${credentials.length} / ${studyTracks.length}`,
      label: "FORMAL / STUDY TRACKS",
    },
  },
  {
    code: "03",
    label: "SERVICES",
    href: "/services",
    blurb:
      "What can be delivered for someone else: scope, deliverables, explicit boundaries and how to enquire.",
    metric: { value: String(serviceSlugs.length), label: "ENGAGEMENT TYPES" },
  },
  {
    code: "04",
    label: "LABORATORY",
    href: "/lab",
    blurb:
      "Working instruments — risk arithmetic, point-in-time replay and strategy geometry — plus experiments that failed.",
    metric: { value: String(labModules.length), label: "OPERATIONAL MODULES" },
  },
  {
    code: "05",
    label: "RESEARCH",
    href: "/research",
    blurb:
      "Questions, method, evidence, result, limitation, conclusion — the written record behind the systems.",
    metric: { value: String(researchEntries.length), label: "RESEARCH ENTRIES" },
  },
  {
    code: "06",
    label: "OPPORTUNITIES",
    href: "/opportunities",
    blurb:
      "Employment, freelance contracts, research collaboration and technical partnerships — four distinct pathways.",
    metric: { value: "04", label: "PATHWAYS OPEN" },
  },
  {
    code: "07",
    label: "ABOUT",
    href: "/about",
    blurb:
      "Who is behind CN2.DEV: background, direction, working philosophy and what is being built right now.",
    metric: { value: String(capabilities.length), label: "MAPPED CAPABILITIES" },
  },
  {
    code: "08",
    label: "CONNECT",
    href: "/contact",
    blurb:
      "Direct contact with real actions — email, GitHub, LinkedIn and enquiry routes that genuinely resolve.",
    metric: { value: "04", label: "CONTACT ROUTES" },
  },
];

/** Secondary destinations the hub index carries below the main deck. */
export const hubIndex: { label: string; href: string; code: string }[] = [
  { label: "CASE STUDIES", href: "/case-studies", code: "02" },
  { label: "CAPABILITIES", href: "/capabilities", code: "03" },
  { label: "ARTICLES", href: "/articles", code: "05" },
  { label: "INTELLIGENCE", href: "/intelligence", code: "06" },
  { label: "PROOF", href: "/proof", code: "09" },
  { label: "IDENTITY", href: "/identity", code: "10" },
  { label: "CV", href: "/cv", code: "18" },
  { label: "LINKS", href: "/links", code: "19" },
];

/** Counters used by the headquarters status readout. */
export const hubStatus = {
  flagship: archiveProjects.filter((p) => p.tier === 1),
  caseStudies: caseStudyCards.length,
  research: researchEntries.length,
  ongoingResearch: researchEntries.filter((r) => r.status === "ONGOING").length,
  articles: publishedArticles.length,
  lab: labModules.length,
  services: serviceSlugs.length,
  capabilities: capabilities.length,
  studyTracks: studyTracks.filter((s) => s.state === "ONGOING").length,
  status: site.status,
} as const;
