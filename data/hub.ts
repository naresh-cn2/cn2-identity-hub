/**
 * Destination registry (spec: /hub - the CN2.DEV universe).
 *
 * Single source of truth for the hub journey. Every destination gets one
 * full-screen section: a short human-readable introduction, one prominent
 * action, and a visual identity. There are no counts or statistics here by
 * design - the hub is an introduction, never a dashboard. Content and
 * measurements belong to the destination page itself, where they can be
 * explained properly.
 *
 * Eight primary destinations, in journey order. No groups, no nested
 * categories - eight independent destinations of one professional universe.
 *
 * Every `href` is an existing route, verified in `app/`.
 */

export interface HubDestination {
  /** Stable journey key - also the section's anchor code. */
  code: string;
  /** Display title. */
  label: string;
  /** The real destination route. */
  href: string;
  /** One short invitation into the destination. */
  blurb: string;
  /** One line used on the hub index card. */
  summary: string;
  /** The action label - what the visitor taps to enter. */
  action: string;
  /** Short identity word for the visual's caption. */
  caption: string;
  /** Who this destination is written for. */
  audience: string;
}

/** Journey order (IA v5, owner-approved). */

export const hubDestinations: HubDestination[] = [
  {
    code: '01',
    label: 'BUILDS',
    href: '/builds',
    blurb:
      'Products, engineering projects and independent builds - every system documented from the original problem through architecture and implementation to verifiable evidence.',
    summary: 'Products, projects and independent builds, each with its own architecture, evidence and status.',
    action: 'ENTER BUILDS',
    caption: 'PLATFORMS & SYSTEMS',
    audience: 'TECHNICAL VISITORS - RECRUITERS',
  },
  {
    code: '02',
    label: 'LABORATORY',
    href: '/lab',
    blurb:
      'Runnable quantitative instruments - risk simulator, point-in-time replay, strategy visualizer, risk/return surface and experiment governance.',
    summary: 'Risk/return surface, strategy viewer, market replay, experiments.',
    action: 'ENTER LABORATORY',
    caption: 'RUNNABLE INSTRUMENTS',
    audience: 'QUANT VISITORS - RECRUITERS',
  },
  {
    code: '03',
    label: 'RESEARCH & JOURNAL',
    href: '/research',
    blurb:
      'Technical research, quantitative and market investigation, published articles and field notes - each carrying its method, evidence and stated limits.',
    summary: 'Studies, articles and field notes - the evidence chain behind the builds.',
    action: 'ENTER RESEARCH & JOURNAL',
    caption: 'EVIDENCE CHAIN',
    audience: 'TECHNICAL VISITORS - CLIENTS',
  },
  {
    code: '04',
    label: 'SERVICES',
    href: '/services',
    blurb:
      'What an engagement actually produces - software and systems engineering, backend and API work, data infrastructure, AI-assisted automation and quantitative systems.',
    summary: 'The deliverable engagements, their scope boundaries and what you receive.',
    action: 'EXPLORE SERVICES',
    caption: 'DELIVERY FLOW',
    audience: 'CLIENTS',
  },
  {
    code: '05',
    label: 'EDUCATION & CREDENTIALS',
    href: '/credentials',
    blurb:
      'Formal education, issued certifications and self-directed coursework - each record carrying its provider, its state and where it can be checked.',
    summary: 'Formal education, verified credentials and active self-directed study.',
    action: 'EXPLORE CREDENTIALS',
    caption: 'LEARNING STRATA',
    audience: 'RECRUITERS - CLIENTS',
  },
  {
    code: '06',
    label: 'CAREERS & COLLABORATION',
    href: '/opportunities',
    blurb:
      'Employment, freelance engagements, open collaboration and partnerships - the places where my work and your problem meet.',
    summary: 'Roles, freelance work, joint experiments and partnerships.',
    action: 'EXPLORE COLLABORATION',
    caption: 'PATHWAYS',
    audience: 'RECRUITERS - PARTNERS',
  },
  {
    code: '07',
    label: 'ABOUT',
    href: '/about',
    blurb:
      'The person behind CN2.DEV - identity, capabilities, engineering philosophy, working principles, current direction and the vision behind it.',
    summary: 'Identity, capabilities, principles and the direction the work is heading.',
    action: 'GET TO KNOW ME',
    caption: 'HORIZON',
    audience: 'EVERYONE',
  },
  {
    code: '08',
    label: 'CONTACT',
    href: '/contact',
    blurb:
      'Direct channels - email, GitHub, LinkedIn and a project enquiry form. Tell me the problem and I will tell you honestly whether I am the right engineer for it.',
    summary: 'Email, GitHub, LinkedIn and the project enquiry form.',
    action: 'GET IN TOUCH',
    caption: 'CHANNELS',
    audience: 'CLIENTS - RECRUITERS',
  },
];

