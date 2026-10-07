export interface Tier2Build {
  id: string;
  name: string;
  category: string;
  description?: string;
  metrics?: { value: string; label: string }[];
  status: string;
  verified: boolean;
  github?: string;
}

export const buildCategories = [
  {
    id: "finops",
    name: "FINANCIAL DATA INFRASTRUCTURE",
    description: "Cost-data engines and financial intelligence layers — exact, fast, and auditable.",
  },
  {
    id: "systems",
    name: "SYSTEMS ENGINEERING INDEX",
    description:
      "Selected repositories from low-latency systems work. Repository links are the evidence — metrics are published per repository.",
  },
] as const;

export const tier2Builds: Tier2Build[] = [
  {
    id: "billing-data-gateway",
    name: "BILLING DATA GATEWAY",
    category: "finops",
    description:
      "Zero-dependency C11 financial infrastructure utility that normalizes multi-cloud cost exports (AWS CUR 2.0 & Azure) into an intermediate financial model at bare-metal speeds, using POSIX memory address page projections.",
    metrics: [
      { value: "487,421", label: "RECORDS / SEC" },
      { value: "31.89", label: "MB / SEC" },
      { value: "2,051", label: "NS PER RECORD" },
    ],
    status: "RELEASED v1.0.0",
    verified: true,
    github: "https://github.com/CloudOps-Financial-Platform/billing-data-gateway",
  },
  {
    id: "ifm-costintel",
    name: "IFM-COSTINTEL",
    category: "finops",
    description:
      "Scalable intelligence layer that ingests, processes and analyzes massive enterprise cost datasets — transforming raw multi-cloud expenditure signals into structured intermediate financial models for querying, anomaly detection and optimization decisions.",
    status: "ACTIVE DEVELOPMENT",
    verified: true,
    github: "https://github.com/naresh-cn2",
  },
];

export const systemsIndex = [
  { id: "sys-01", name: "forge-engine", note: "ENGINE" },
  { id: "sys-02", name: "forge-core", note: "CORE" },
  { id: "sys-03", name: "forge-stream", note: "STREAM" },
  { id: "sys-04", name: "forge-ipc", note: "IPC" },
  { id: "sys-05", name: "Zero-Latency-Engine", note: "LATENCY" },
  { id: "sys-06", name: "axiom-protocol", note: "PROTOCOL" },
  { id: "sys-07", name: "hydra-core", note: "CORE" },
  { id: "sys-08", name: "Axiom-Hydra-Stream", note: "STREAM" },
  { id: "sys-09", name: "Axiom-CSV", note: "DATA" },
] as const;

export const benchmarkStrip = [
  { value: "487,421", unit: "rec/s", label: "BILLING DATA GATEWAY — THROUGHPUT" },
  { value: "15×", unit: "faster", label: "SELF-BENCHMARK — SEE REPOSITORY" },
  { value: "24.5×", unit: "faster", label: "SELF-BENCHMARK — SEE REPOSITORY" },
  { value: "10.3×", unit: "throughput", label: "SELF-BENCHMARK — SEE REPOSITORY" },
] as const;
