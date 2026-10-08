import type { FlagshipProject } from "./types";

export const qrsip: FlagshipProject = {
  id: "qrsip",
  route: "/builds/qrsip",
  index: "04",
  title: "QRSIP — QUANT RESEARCH STRATEGY INTELLIGENCE PLATFORM",
  shortTitle: "QRSIP",
  category: "DETERMINISTIC EXPERIMENTATION & RESEARCH GOVERNANCE",
  status: "ALPHA",
  statusNote: "Alpha stage — core workflow implemented; deferred systems not yet built.",
  position: "Deterministic quantitative experimentation and research governance platform.",
  thesis:
    "A research idea becomes knowledge only when its evidence is complete, reproducible and gated — the platform enforces the process.",
  summary:
    "QRSIP governs the life of a quantitative research idea: hypothesis → experiment → verification → artifact → report → promotion. 352 tests with deterministic fixtures, CI security validation, and a promotion gate that decides when evidence is strong enough to graduate a strategy.",
  problem: [
    "Quantitative research dies in notebooks. An idea is explored, a chart looks promising, and a number gets screenshotted — but the exact conditions that produced it are lost.",
    "Without governance, results cannot be promoted with confidence, and failures cannot be distinguished from successes because neither was recorded with sufficient discipline.",
  ],
  motivation: [
    "I wanted the research process itself to be a system: every hypothesis explicit, every experiment reproducible, every promotion decision backed by verified evidence.",
    "The platform treats a strategy like a release candidate — it must pass verification before it ships.",
  ],
  researchQuestion:
    "Can the full lifecycle of a quantitative experiment — from hypothesis to promotion decision — be captured as deterministic, verifiable artifacts?",
  objective: [
    "Encode the research workflow as explicit stages with defined entry and exit criteria",
    "Make every experiment reproducible through deterministic fixtures",
    "Produce verifiable artifacts and reports automatically from runs",
    "Gate strategy promotion on verified evidence",
  ],
  architecture: [
    {
      name: "HYPOTHESIS",
      role: "Research intake",
      detail: ["Ideas registered before experiments run", "Falsifiable statements with defined evidence"],
    },
    {
      name: "EXPERIMENT",
      role: "Deterministic execution",
      detail: ["Deterministic fixtures for reproducibility", "352 tests across the workflow"],
    },
    {
      name: "VERIFICATION",
      role: "Evidence checking",
      detail: ["Results verified against fixture expectations", "CI security validation"],
    },
    {
      name: "ARTIFACT",
      role: "Evidence capture",
      detail: ["Runs produce complete, versioned artifacts", "Config, code revision and outputs recorded"],
    },
    {
      name: "REPORT",
      role: "Structured reporting",
      detail: ["Reports generated from artifacts — not hand-written", "Limitations recorded alongside results"],
    },
    {
      name: "PROMOTION",
      role: "Governance gate",
      detail: ["Strategies graduate only on verified evidence", "The gate is a decision, not a formality"],
    },
  ],
  dataFlow: [
    "A hypothesis is registered with its falsifiable claim and required evidence",
    "The experiment stage executes deterministically against fixtures",
    "Verification checks results; failures block progression",
    "Artifacts capture the complete run state",
    "Reports are generated from artifacts",
    "The promotion gate decides whether evidence justifies graduating the strategy",
  ],
  methods: [
    "Deterministic fixtures — experiments produce identical results across runs",
    "Verification before reporting — unverified results cannot become reports",
    "Artifact-first evidence — every claim traces to a versioned run output",
    "CI security validation on the workflow itself",
  ],
  risk: [
    "Governance risk: an unverified strategy reaching promotion — blocked by the gate",
    "Reproducibility risk: results that cannot be regenerated — blocked by deterministic fixtures",
    "Evidence risk: hand-edited reports — reports are generated from artifacts",
  ],
  experiments: [
    {
      title: "Workflow verification",
      question: "Does every stage transition enforce its entry and exit criteria?",
      result: "352 tests verify the workflow with deterministic fixtures.",
      status: "COMPLETED",
    },
    {
      title: "Promotion gate integrity",
      question: "Can a strategy pass promotion without verified evidence?",
      result: "The gate requires verified artifacts; unverified strategies are held.",
      status: "COMPLETED",
    },
    {
      title: "CI security validation",
      question: "Does the workflow withstand CI-level security validation?",
      result: "CI security validation integrated into the experiment pipeline.",
      status: "COMPLETED",
    },
  ],
  results: {
    metrics: [
      { value: "352", label: "TESTS", context: "DETERMINISTIC FIXTURES" },
      { value: "6", label: "WORKFLOW STAGES", context: "HYPOTHESIS → PROMOTION" },
      { value: "ALPHA", label: "PLATFORM STATUS", context: "CORE WORKFLOW LIVE" },
    ],
    narrative: [
      "QRSIP is alpha-stage: the hypothesis-to-promotion workflow is implemented and tested, but this is a governance platform still under development. Systems deferred to later stages are not claimed here as implemented.",
    ],
  },
  limitations: [
    "Alpha status — the platform is operational for its core workflow, not complete",
    "Some planned capabilities remain deferred and are not claimed as implemented",
    "The promotion gate currently governs a small strategy population",
  ],
  evidence: [
    { label: "REPOSITORY", detail: "Platform source on GitHub" },
    { label: "TEST SUITE", detail: "352 tests on deterministic fixtures" },
    { label: "STATUS", detail: "Alpha-stage workflow: hypothesis → experiment → verification → artifact → report → promotion" },
  ],
  technologies: ["Python", "CI pipelines", "Deterministic fixtures", "Report generation"],
  visualMetaphor: "experiment graph / verification pipeline",
  interactive: [
    {
      title: "EXPERIMENT EXPLORER",
      description: "Walk a hypothesis through the six workflow stages to the promotion decision.",
      href: "/lab/experiments",
    },
  ],
  github: "https://github.com/naresh-cn2/quant-research-strategy-intelligence-platform",
};
