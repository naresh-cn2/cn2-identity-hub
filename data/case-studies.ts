import { flagshipProjects, type FlagshipProject } from "./projects";

/**
 * Case-study layer (spec §09).
 *
 * Case studies are the deep technical proof for the flagship builds. This module
 * introduces NO new content — it is a thin projection over `flagshipProjects`,
 * the same single source of truth that powers /builds. /builds/[project] is the
 * product overview; /case-studies/[project] is the full evidence chain rendered
 * by the CaseStudy component. Keeping both derived from one dataset is what
 * prevents the two routes from drifting apart.
 */

/** The canonical deep-proof route for a flagship project. */
export function caseStudyRoute(id: string): string {
    return `/case-studies/${id}`;
}

/** Flagship projects that carry a full case study (tier-1 evidence chain). */
export const caseStudies: FlagshipProject[] = flagshipProjects;

export function getCaseStudy(id: string): FlagshipProject | undefined {
    return flagshipProjects.find((p) => p.id === id);
}

/** A compact card projection used by the case-studies index. */
export interface CaseStudyCard {
    id: string;
    index: string;
    title: string;
    shortTitle: string;
    category: string;
    status: string;
    thesis: string;
    researchQuestion: string;
    visualMetaphor: string;
    technologies: string[];
    headlineMetric?: { value: string; label: string; context: string };
    github: string;
}

export const caseStudyCards: CaseStudyCard[] = flagshipProjects.map((p) => ({
    id: p.id,
    index: p.index,
    title: p.title,
    shortTitle: p.shortTitle,
    category: p.category,
    status: p.status,
    thesis: p.thesis,
    researchQuestion: p.researchQuestion,
    visualMetaphor: p.visualMetaphor,
    technologies: p.technologies,
    headlineMetric: p.results.metrics[0],
    github: p.github,
}));
