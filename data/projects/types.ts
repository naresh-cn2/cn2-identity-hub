export interface ProjectMetric {
  value: string;
  label: string;
  context: string;
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
}
