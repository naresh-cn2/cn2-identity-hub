/**
 * Credential records.
 *
 * Hard rule for this file: nothing is listed here that was not actually earned.
 * There is currently no formal, accredited credential to claim, so
 * `credentials` is empty — deliberately, and visibly, rather than filled with
 * plausible-looking entries.
 *
 * What IS listed is self-directed study, which is evidenced by the systems and
 * research in this repository. Those tracks are labelled as self-directed and
 * are never presented as accredited credentials or as mastery.
 */

export type CredentialState = "IN PROGRESS" | "COMPLETED" | "VERIFIED" | "PLANNED";

/** The full shape a real credential record must satisfy before it is listed. */
export interface CredentialRecord {
  id: string;
  provider: string;
  program: string;
  state: CredentialState;
  /** ISO date. Omitted while a credential is only planned. */
  date?: string;
  topics: string[];
  skills: string[];
  learned: string;
  assessment: string;
  certificateUrl?: string;
  verificationUrl?: string;
  relatedProject?: string;
  relatedResearch?: string;
}

/**
 * Formal, accredited credentials.
 *
 * Empty by design. A credential appears here only after it has been issued and
 * can be verified by a third party at the provider.
 */
export const credentials: CredentialRecord[] = [];

/** Fields every credential record is required to carry, shown as the page template. */
export const credentialSchema: { field: string; why: string }[] = [
  { field: "PROVIDER", why: "Who issued it — a credential without a named issuer is not a credential." },
  { field: "PROGRAM", why: "The exact programme or course title, not a paraphrase." },
  { field: "STATE", why: "IN PROGRESS, COMPLETED, VERIFIED or PLANNED. Planned work is never shown as done." },
  { field: "DATE", why: "When it was issued. Omitted only while the state is PLANNED." },
  { field: "TOPICS", why: "What the syllabus actually covered." },
  { field: "SKILLS", why: "What the assessment tested, not what the marketing page promised." },
  { field: "LEARNED", why: "A first-person account of the specific thing that changed in how I work." },
  { field: "ASSESSMENT", why: "How competence was tested — exam, project, or nothing at all." },
  { field: "CERTIFICATE", why: "A link to the artifact itself where the provider issues one." },
  { field: "VERIFICATION", why: "A third-party verification link. Without this the claim is unverifiable." },
  { field: "RELATED WORK", why: "The build or research entry where the learning was actually applied." },
];

export interface StudyTrack {
  id: string;
  index: string;
  title: string;
  state: "ONGOING" | "PLANNED";
  focus: string;
  method: string[];
  evidenceProject?: string;
  evidenceResearch?: string;
}

/**
 * Self-directed study, evidenced by the archive.
 *
 * These are NOT credentials. They carry no provider, no certificate and no
 * assessment — they are a record of what is being studied and, crucially, of
 * where that study has already produced working systems.
 */
export const studyTracks: StudyTrack[] = [
  {
    id: "deterministic-simulation",
    index: "01",
    title: "DETERMINISTIC SIMULATION & BACKTESTING",
    state: "ONGOING",
    focus:
      "Building backtest harnesses whose outputs are reproducible run to run, and understanding the limits of what reproducibility proves.",
    method: [
      "Read the primary literature on backtest overfitting and multiple-comparison correction.",
      "Implement the harness, then deliberately break determinism and observe which false results appear.",
      "Record negative results rather than deleting the configurations that produced them.",
    ],
    evidenceProject: "apex-quant-engine",
    evidenceResearch: "backtest-overfitting",
  },
  {
    id: "market-data-integrity",
    index: "02",
    title: "MARKET-DATA INTEGRITY & POINT-IN-TIME CORRECTNESS",
    state: "ONGOING",
    focus:
      "Treating information-flow correctness as an infrastructure property rather than a discipline the researcher must remember.",
    method: [
      "Audit every read path in the data layer for reachable future information.",
      "Write adversarial tests that attempt to extract the future rather than tests that confirm correct behaviour.",
      "Compare exact decimal storage against float storage through aggregation and joins.",
    ],
    evidenceProject: "market-data-replay",
    evidenceResearch: "lookahead-bias",
  },
  {
    id: "structural-risk",
    index: "03",
    title: "STRUCTURAL RISK & TRADE ADMISSION",
    state: "ONGOING",
    focus:
      "Moving risk controls before order construction so that caps and floors define the trade population instead of annotating it.",
    method: [
      "Derive position size from stop distance and the risk cap so the cap is structural.",
      "Model fees and slippage explicitly and filter setups on a cost budget before execution.",
      "Design the ablation study that would attribute contribution to each individual control.",
    ],
    evidenceProject: "automated-trading-os",
    evidenceResearch: "risk-first-sizing",
  },
  {
    id: "systems-performance",
    index: "04",
    title: "SYSTEMS PERFORMANCE — C11 & POSIX",
    state: "ONGOING",
    focus:
      "Learning low-level throughput engineering: memory-mapped I/O, eliminating serialization, and measuring honestly on a published harness.",
    method: [
      "Build zero-dependency tools in C11 against the POSIX API rather than reaching for a framework.",
      "Project memory address pages over input to read records in place.",
      "Publish the benchmark methodology alongside the number so the context travels with the claim.",
    ],
    evidenceProject: "billing-data-gateway",
  },
  {
    id: "research-governance",
    index: "05",
    title: "RESEARCH GOVERNANCE & EXPERIMENT DESIGN",
    state: "ONGOING",
    focus:
      "Designing experiment workflows where nothing reaches promotion without a verified artifact and a documented limitation.",
    method: [
      "Fix the sequence: hypothesis, experiment, verification, artifact, report, promotion.",
      "Make the gate structural so a claim cannot be argued past verification.",
      "Test the gate's own integrity, not only the experiments that pass through it.",
    ],
    evidenceProject: "qrsip",
    evidenceResearch: "promotion-gates",
  },
  {
    id: "exact-arithmetic",
    index: "06",
    title: "EXACT ARITHMETIC IN FINANCIAL COMPUTATION",
    state: "ONGOING",
    focus:
      "Understanding where binary floating point corrupts market data and making that trade-off deliberately rather than by default.",
    method: [
      "Trace representation error through ingestion, storage, aggregation and joins.",
      "Quantify the throughput cost of exact decimal arithmetic at research scale.",
      "Decide the trade-off on the basis of the workload rather than convention.",
    ],
    evidenceProject: "market-data-replay",
    evidenceResearch: "decimal-arithmetic",
  },
];

export const credentialStates: { state: CredentialState; meaning: string }[] = [
  { state: "PLANNED", meaning: "Intended. Not started. Never shown as completed." },
  { state: "IN PROGRESS", meaning: "Started, not finished. No competence claim is made." },
  { state: "COMPLETED", meaning: "Finished, and the issuer's own record confirms it." },
  { state: "VERIFIED", meaning: "Independently confirmable at the provider via a verification link." },
];
