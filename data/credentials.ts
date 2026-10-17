/**
 * Credential records.
 *
 * Hard rule for this file: nothing is listed here that was not actually earned.
 * Every entry in `credentials` is an issued certificate recorded from the
 * document itself — named provider, printed date, printed identifier, and a
 * verification link where the provider issues one. Fields the certificate does
 * not print are simply omitted. Certificates of participation say participation;
 * durations appear as printed.
 *
 * Also listed is self-directed study, evidenced by the systems and research in
 * this repository. Those tracks are listed separately as study tracks and are
 * never presented as accredited credentials.
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
  /** Additional printed details, such as a QR target or issuer context. */
  notes?: string[];
  relatedProject?: string;
  relatedResearch?: string;
}

/**
 * Formal, issued credentials.
 *
 * Issued certificates, each recorded from the document itself. A new entry
 * appears here only after it has been issued.
 */
export const credentials: CredentialRecord[] = [
  {
    id: "wqu-data-science-lab",
    provider: "WorldQuant University",
    program: "Data Science Lab",
    state: "COMPLETED",
    date: "2026-10-15",
    topics: ["Data science lab — applied, project-based completion programme"],
    skills: ["Data science applied end to end in a lab setting"],
    learned:
      "Working through the lab end to end turned data into an analysis that had to stand on its own evidence — every step producing something inspectable, not just described.",
    assessment: "Certificate of Completion issued by WorldQuant University.",
    certificateUrl: "/credentials/worldquant-data-science-lab.pdf",
    notes: [
      "The certificate prints the recipient name and the issue date (Oct 15, 2026).",
      "The issuer's digital badge for this completion is shown in the BADGES section below.",
    ],
  },
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
    assessment: "Certificate of completion issued for the internship programme.",
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
    assessment: "Certificate of completion issued for the boot camp.",
    notes: ["The QR printed on the certificate resolves to quantconnect.com/learning."],
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
    assessment: "Certificate of Completion for the 210-hour online skilling course.",
    verificationUrl:
      "https://api-fe.skillindiadigital.gov.in/api/registry-course/getCertificatePresignedUrl/2025080842904947-f09bf277-3615-45db-8ebb-65ea222ac556",
    notes: ["210 hours of coursework as printed on the certificate."],
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
    assessment: "Certificate of Participation for the 15-hour online skilling course.",
    verificationUrl:
      "https://api-fe.skillindiadigital.gov.in/api/registry-course/getCertificatePresignedUrl/2025080842904947-755cb06d-8412-4fc1-b5ef-0ae95a32f059",
    notes: ["15 hours of coursework as printed on the certificate."],
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
    assessment: "Certificate of Participation for the 1-hour online skilling course.",
    verificationUrl:
      "https://api-fe.skillindiadigital.gov.in/api/registry-course/getCertificatePresignedUrl/2025080842904947-6d136b29-9b3a-4b26-9d76-b05369cb648c",
    notes: ["1 hour of coursework as printed on the certificate."],
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
    assessment: "Certificate of Achievement issued for completing the standard.",
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
    assessment: "Course completion certificate for the Python DSA track.",
    notes: ["The certificate carries an Unstop verification QR."],
  },
];

/** Issuer-issued digital badges, displayed as issued (image + printed labels). */
export interface CredentialBadge {
  id: string;
  provider: string;
  /** The title exactly as the badge prints it. */
  label: string;
  /** The status word printed on the badge. */
  status: string;
  image: string;
  imageAlt: string;
  /** The credential record this badge accompanies, if any. */
  credentialId?: string;
}

/**
 * Digital badges earned alongside issued certificates. The badge artwork and
 * its printed labels are reproduced as issued; nothing is added or reworded.
 */
export const credentialBadges: CredentialBadge[] = [
  {
    id: "wqu-data-science-application",
    provider: "WorldQuant University",
    label: "Data Science Application",
    status: "COMPLETED",
    image: "/images/badge-wqu-data-science-application.png",
    imageAlt:
      "WorldQuant University digital badge — Data Science Application, Completed",
    credentialId: "wqu-data-science-lab",
  },
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
  { state: "PLANNED", meaning: "Intended, not yet started." },
  { state: "IN PROGRESS", meaning: "Started, not yet finished." },
  { state: "COMPLETED", meaning: "Finished, with the issuer's own record confirming it." },
  { state: "VERIFIED", meaning: "Independently confirmable at the provider through a verification link." },
];
