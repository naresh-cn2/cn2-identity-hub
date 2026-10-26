export interface ProjectMetric {
  value: string;
  label: string;
  context: string;
  /**
   * Optional classification of what the number actually measures.
   * Absent = no badge rendered (legacy behaviour, byte-identical).
   * No "LIVE" member exists: nothing on CN2.DEV is live-trading evidence.
   */
  resultClass?: ResultClass;
  /**
   * Optional provenance line — measurement context, honest limits
   * ("window not documented"). Absent = nothing rendered.
   */
  provenance?: string;
}

export interface ArchLayer {
  name: string;
  role: string;
  detail?: string[];
}

export interface ExperimentRecord {
  title: string;
  question: string;
  result: string;
  status: "COMPLETED" | "ONGOING";
}

export interface EvidenceItem {
  label: string;
  detail: string;
  /** Optional direct link to the supporting artifact (repo file, CI run). */
  href?: string;
}

/**
 * What a metric actually measures. Optional on every metric — an absent
 * class renders no badge. Deliberately has no "LIVE" member.
 */
export type ResultClass =
  | "BACKTEST"
  | "SIMULATION"
  | "PAPER"
  | "TEST-SUITE"
  | "SELF-BENCHMARK";

/**
 * A dated verification record. Populated only from real, citable checks
 * (repository PROJECT_STATUS / CI runs) — never generated, never implied.
 * Absent on a project = no verification line is rendered.
 */
export interface VerificationRecord {
  /** ISO date of the check (YYYY-MM-DD). */
  date: string;
  /** How the check ran, e.g. "pytest 8.4.2 (Python 3.12): 352 passed". */
  method: string;
  /** Commit SHA or equivalent baseline the check ran against. */
  baseline?: string;
  /** Direct link to the CI run or artifact (must resolve before publish). */
  href?: string;
}

export interface InteractiveModule {
  title: string;
  description: string;
  href: string;
}

export interface FlagshipProject {
  id: string;
  route: string;
  index: string;
  title: string;
  shortTitle: string;
  category: string;
  status: string;
  statusNote: string;
  position: string;
  thesis: string;
  summary: string;
  problem: string[];
  motivation: string[];
  researchQuestion: string;
  objective: string[];
  architecture: ArchLayer[];
  dataFlow: string[];
  methods: string[];
  risk: string[];
  experiments: ExperimentRecord[];
  results: { metrics: ProjectMetric[]; narrative: string[] };
  limitations: string[];
  evidence: EvidenceItem[];
  technologies: string[];
  visualMetaphor: string;
  interactive: InteractiveModule[];
  github: string;
  /** Optional dated verification record — absent = no line rendered. */
  verified?: VerificationRecord;
}
