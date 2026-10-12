/**
 * Credential records.
 *
 * Hard rule for this file: nothing is listed here that was not actually earned.
 * Every entry in `credentials` is an issued certificate recorded exactly as its
 * issuer printed it — named provider, printed date, printed identifier, and a
 * verification link only where the provider actually issues one. Where the
 * certificate itself omits a detail (a date, a score, a verification page),
 * the record omits it and says so rather than filling the gap. Certificates of
 * participation say participation; durations are printed as printed.
 *
 * Also listed is self-directed study, which is evidenced by the systems and
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
  /** The provider's own identifier printed on the certificate, if any. */
  credentialId?: string;
  /** Honest caveats about what the certificate does or does not print. */
  notes?: string[];
  relatedProject?: string;
  relatedResearch?: string;
}

/**
 * Formal, issued credentials.
 *
 * Real certificates, each transcribed from the document itself. A new entry
 * appears here only after it has been issued — and only carrying what the
 * certificate actually says.
 */
export const credentials: CredentialRecord[] = [
  {
    id: "datateach-gen-ai-internship",
    provider: "DataTeach.ai",
    program: "Gen-AI Internship",
    state: "COMPLETED",
    date: "2026-10-11",
    credentialId: "DT1174",
    topics: ["Generative AI — internship programme"],
    skills: ["Generative AI applied in an internship setting"],
    learned:
      "Building with generative AI in an internship format — the difference between prompting a model and shipping something around one.",
    assessment:
      "Certificate of completion issued for the internship; no exam result or score is printed on the certificate.",
    notes: ["No verification URL or QR is printed on this certificate."],
  },
  {
    id: "quantconnect-us-equities-101",
    provider: "QuantConnect",
    program: "US Equities 101 Boot Camp for Algorithmic Trading",
    state: "COMPLETED",
    date: "2026-09-21",
    topics: ["US equities fundamentals (US Equities 101)", "Algorithmic trading boot camp track"],
    skills: ["Algorithmic trading concepts applied to US equities"],
    learned:
      "The boot camp connected the market-data and backtesting work I already do to how US equity sessions and orders actually fit together.",
    assessment:
      "Certificate of completion issued for the boot camp; no exam result or score is printed on the certificate.",
    notes: [
      "The QR printed on the certificate resolves to quantconnect.com/learning — QuantConnect issues no per-certificate verification page.",
    ],
  },
  {
    id: "reliance-ai-data-engineer",
    provider: "Reliance Foundation Skilling Academy — via Skill India Digital (NSDC)",
    program: "AI Data Engineer Certificate Programme",
    state: "VERIFIED",
    date: "2026-07-03",
    topics: ["AI data engineering — 210-hour certificate programme"],
    skills: ["AI data engineering"],
    learned:
      "The 210-hour programme put structure around data engineering for AI systems: pipelines designed for models, not just reports.",
    assessment:
      "Certificate of Completion for a 210-hour online skilling course; no exam result or score is printed on the certificate.",
    verificationUrl:
      "https://api-fe.skillindiadigital.gov.in/api/registry-course/getCertificatePresignedUrl/2025080842904947-f09bf277-3615-45db-8ebb-65ea222ac556",
    notes: ["Course completed Jul 03, 2026 — 210 hours as printed."],
  },
  {
    id: "sfj-generative-ai-ml",
    provider: "SFJ Business Solutions — via Skill India Digital Hub (NSDC)",
    program: "Introduction on Generative AI – Artificial Intelligence and Machine Learning",
    state: "VERIFIED",
    date: "2026-07-03",
    topics: [
      "Generative AI",
      "Artificial intelligence and machine learning",
      "Aligned to QP SSC/Q8108 · NSQF level 7",
    ],
    skills: ["Generative AI, AI and machine learning (NSQF 7 alignment)"],
    learned:
      "Fifteen hours structured around what generative AI is actually doing under the hood — the machine-learning foundations that keep the hype honest.",
    assessment:
      "Certificate of Participation for a 15-hour online skilling course; no exam result or score is printed on the certificate.",
    verificationUrl:
      "https://api-fe.skillindiadigital.gov.in/api/registry-course/getCertificatePresignedUrl/2025080842904947-755cb06d-8412-4fc1-b5ef-0ae95a32f059",
    notes: ["Course completed Jul 03, 2026 — 15 hours as printed."],
  },
  {
    id: "nasscom-ai-devops-analyst",
    provider: "NASSCOM — via Skill India Digital Hub (NSDC)",
    program: "AI DevOps Analyst",
    state: "VERIFIED",
    date: "2026-07-03",
    topics: ["AI DevOps — online skilling course"],
    skills: ["AI DevOps (course exposure)"],
    learned:
      "It gave me the vocabulary of AI delivery pipelines — the names for things I was already assembling by hand.",
    assessment:
      "Certificate of Participation — the certificate prints participation and a course duration of 1 hour; no exam result or score is printed.",
    verificationUrl:
      "https://api-fe.skillindiadigital.gov.in/api/registry-course/getCertificatePresignedUrl/2025080842904947-6d136b29-9b3a-4b26-9d76-b05369cb648c",
    notes: ["Course completed Jul 03, 2026 — 1 hour duration as printed."],
  },
  {
    id: "nsdc-data-engineering-analyst",
    provider: "National Skill Development Corporation (NSDC) — Skill India Digital Hub",
    program: "Data Engineering Analyst",
    state: "VERIFIED",
    date: "2025-08-07",
    credentialId: "NSDC/DE/2025/100190",
    topics: [
      "National Occupational Standards — Data Engineering and Analysis (SSC/Q1005), version 4.0",
    ],
    skills: ["Data engineering and analysis as defined by the Skill India occupational standard"],
    learned:
      "Studying against a published occupational standard gave me a fixed reference point: data work measured against what the standard defines, not against what happens to run.",
    assessment:
      "Issued as a Certificate of Achievement for completing the standard; no exam result or score is printed on the certificate.",
    verificationUrl:
      "https://api-fe.skillindiadigital.gov.in/api/registry-course/getCertificatePresignedUrl/2025080842904947-30abc684-c033-40a9-836b-caa3d4b7be33",
    notes: [
      "Developed by the Microsoft Industry Skill Accelerator in collaboration with NASSCOM under NSDC's Innovation, Research and Development initiative.",
    ],
  },
  {
    id: "unstop-python-dsa",
    provider: "Unstop",
    program: "Python DSA",
    state: "COMPLETED",
    topics: ["Python", "Data structures and algorithms"],
    skills: ["Data structures and algorithms implemented in Python"],
    learned:
      "Revisiting data structures and algorithms in Python made the everyday implementation choices — when a dict, when a list, when a heap — deliberate instead of habitual.",
    assessment:
      "Course completion certificate; no exam result or score is printed on the certificate.",
    notes: [
      "No date is printed on this certificate, so none is claimed here.",
      "The certificate carries an Unstop verification QR; no public verification URL is printed on it.",
    ],
  },
];

/** Fields every credential record is required to carry, shown as the page template. */
export const credentialSchema: { field: string; why: string }[] = [
  { field: "PROVIDER", why: "Who issued it — a credential without a named issuer is not a credential." },
  { field: "PROGRAM", why: "The exact programme or course title, not a paraphrase." },
  { field: "STATE", why: "IN PROGRESS, COMPLETED, VERIFIED or PLANNED. Planned work is never shown as done." },
  { field: "DATE", why: "When it was issued — printed exactly as the certificate prints it, and omitted when the certificate itself prints no date." },
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
