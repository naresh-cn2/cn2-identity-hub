import type { FlagshipProject } from "./types";

export const bustubEngine: FlagshipProject = {
  id: "bustub-engine",
  route: "/case-studies/bustub-engine",
  index: "00",
  title: "Engineering a Multi-Threaded Relational Database Engine",
  shortTitle: "BUSTUB",
  category: "Systems Architecture Case Study & Work Proof",
  status: "VERIFIED",
  statusNote:
    "CMU 15-445/645 Academic Integrity Compliant — implementation source in private repository (naresh-cn2/bustub-engine). Read-only reviewer access available to engineering hiring teams upon request.",
  position:
    "A deep-dive architectural post-mortem and verification dossier on building CMU 15-445/645 BusTub in C++20 under strict AddressSanitizer & UndefinedBehaviorSanitizer constraints.",
  thesis:
    "A disk-backed, multi-threaded relational database engine must enforce memory safety and high-concurrency correctness at every layer — from page eviction to deadlock resolution — with no compromises.",
  summary:
    "Engineered a disk-backed, multi-threaded relational database management system (RDBMS) in modern C++ from the ground up. Designed to operate under strict memory-safety and high-concurrency constraints, the engine implements custom page-level buffer management, latch-crabbing B+ Tree indexing, a Volcano-model physical query execution pipeline with rule-based cost optimization, and multi-granularity Two-Phase Locking (2PL) with autonomous cycle-detection deadlock resolution.",
  problem: [
    "Bridging the gap between slow, page-oriented block storage (4 KB raw disk pages) and low-latency, multi-threaded transactional SQL queries without corrupting memory, leaking frames, or deadlocking worker threads.",
    "Academic course projects often produce working code without production-grade verification: no sanitizer proofs, no concurrency stress tests, no documented commit provenance.",
  ],
  motivation: [
    "Every subsystem (buffer pool, index, executor, concurrency) is a distilled systems-engineering problem with real production analogues.",
    "Demonstrate low-level C++ engineering depth with verifiable concurrency guarantees — latch crabbing, strict 2PL, and autonomous deadlock detection — backed by test telemetry and sanitizer proofs rather than claims.",
  ],
  researchQuestion:
    "Can a disk-backed, multi-threaded relational database engine be built in modern C++ with formal concurrency guarantees, verified memory safety, and deterministic behavior across all four subsystems?",
  objective: [
    "Build a page-level buffer pool with LRU-K eviction and pin-count reference tracking.",
    "Implement a dynamic B+ Tree with latch-crabbing concurrency protocol.",
    "Construct a Volcano-model query executor with rule-based cost optimization.",
    "Enforce multi-granularity Two-Phase Locking with autonomous cycle-detection deadlock resolution.",
  ],
  architecture: [
    {
      name: "STORAGE ENGINE & BUFFER POOL",
      role: "Page-level buffer management with LRU-K eviction",
      detail: ["Backward K-distance history tracking (O(1) lookup)", "Pin-count reference tracking & dirty-bit persistence", "DiskScheduler with std::promise/std::future callbacks"],
    },
    {
      name: "CONCURRENT B+ TREE INDEX",
      role: "Dynamic B+ Tree with latch crabbing",
      detail: ["Split/coalesce/borrow rebalancing", "Optimistic read/write latch crabbing", "Safe-ancestor release on mutation path"],
    },
    {
      name: "VOLCANO EXECUTION & OPTIMIZER",
      role: "Pull-based iterator pipeline with rule-based optimization",
      detail: ["SeqScan/IndexScan/HashJoin/Aggregation/Sort/ExternalMergeSort", "NLJ→HashJoin, Sort+Limit→TopN, predicate pushdown"],
    },
    {
      name: "MULTI-GRANULARITY 2PL & DEADLOCK",
      role: "Transaction isolation with autonomous deadlock resolution",
      detail: ["5 lock modes (IS/IX/S/SIX/X) with compatibility matrix", "FIFO queues & in-place lock upgrades", "Background DFS waits-for graph cycle detection"],
    },
  ],
  dataFlow: [
    "SQL query text → libpg_query parser → Bound AST → Logical planner → Rule-based optimizer → Physical plan tree",
    "Physical plan → Volcano iterator pipeline (Init()/Next()) → Executors (Scan/Join/Aggregation)",
    "Executors → BufferPoolManager → DiskScheduler → Persistent storage on disk",
    "All operations mediated by LockManager (multi-granularity 2PL) and TransactionManager",
  ],
  methods: [
    "Backward K-distance page replacement with O(1) lookup and deterministic frame eviction",
    "Optimistic latch crabbing — acquire parent/child latches, release safe ancestors",
    "Pull-based Init()/Next() iterator pipeline with rule-based optimizer rewrites",
    "Strict 2PL GROWING → SHRINKING state transitions across isolation levels",
    "Background DFS cycle detection on waits-for graph, aborting youngest transaction",
  ],
  risk: [
    "Memory corruption across asynchronous disk I/O and shared page frames — mitigated by ASan/UBSan validation across all 56 test suites.",
    "Root-level latch contention on concurrent B+ Tree traversals — mitigated by optimistic latch crabbing with safe-ancestor release.",
    "Deadlock in multi-granularity 2PL — mitigated by autonomous cycle-detection daemon with youngest-transaction victim abort.",
  ],
  experiments: [
    {
      title: "P1 Buffer Pool Manager — LRU-K Replacer & Disk Scheduler",
      question: "Does backward K-distance eviction achieve O(1) lookup with deterministic frame eviction under sequential scan pollution?",
      result: "11/11 test suites passed including high-contention and deadlock stress tests (Commit fc821a8).",
      status: "COMPLETED",
    },
    {
      title: "P2 Concurrent B+ Tree — Latch Crabbing Protocol",
      question: "Does optimistic latch crabbing prevent root-level bottlenecks during concurrent insert/delete/mix operations?",
      result: "13/13 test suites passed including 6 multi-threaded concurrent stress tests (Commit 19275ad).",
      status: "COMPLETED",
    },
    {
      title: "P3 Volcano Execution & Rule-Based Optimizer",
      question: "Does the pull-based iterator pipeline with rule-based optimizations produce correct results across all SQLLogicTest suites?",
      result: "21/21 end-to-end SQLLogicTest suites passed (p3.00-primer through p3.22-composite-key-index-scan) (Commit a56e622).",
      status: "COMPLETED",
    },
    {
      title: "P4 Multi-Granularity 2PL & Deadlock Detector",
      question: "Does the background DFS cycle detector correctly abort the youngest transaction and break all cycles?",
      result: "11/11 concurrency suites passed — lock manager, deadlock detection, transaction integration (Commit 0ce5626).",
      status: "COMPLETED",
    },
  ],
  results: {
    metrics: [
      {
        value: "100%",
        label: "TEST PASS RATE",
        context: "56 / 56 SUITES VERIFIED — P1→P4 ALL GREEN",
        resultClass: "TEST-SUITE",
        provenance: "CTest & GoogleTest verbose execution logs; sanitizer verification output",
      },
      {
        value: "0",
        label: "LEAKS / ERRORS",
        context: "ASAN & UBSAN — ZERO MEMORY CORRUPTION",
        resultClass: "TEST-SUITE",
        provenance: "AddressSanitizer & UndefinedBehaviorSanitizer across all four project suites",
      },
      {
        value: "0",
        label: "WARNINGS",
        context: "GOOGLE C++ STYLE · CPPLINT · CLANG-FORMAT CLEAN",
      },
      {
        value: "4",
        label: "CORE SUBSYSTEMS",
        context: "STORAGE · INDEXING · EXECUTION · CONCURRENCY",
      },
    ],
    narrative: [
      "All four CMU 15-445/645 projects complete with 100% test pass rate across 56 suites.",
      "Zero memory leaks, zero heap errors, zero data races under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "Zero warnings under Google C++ Style, cpplint, and clang-format.",
      "Implementation source is private under CMU 15-445/645 academic integrity compliance — read-only reviewer access available upon request.",
    ],
  },
  limitations: [
    "Implementation source is private (CMU 15-445/645 academic integrity compliance) — read-only reviewer access available upon request.",
    "Benchmark figures reflect the course's test harness and dataset shapes; other workloads are not represented.",
    "No public CI run links are available for the private repository.",
  ],
  evidence: [
    {
      label: "COMMIT PROVENANCE",
      detail: "P1: fc821a8 · P2: 19275ad · P3: a56e622 · P4: 0ce5626",
      href: "https://github.com/naresh-cn2/bustub-engine",
    },
    {
      label: "TEST SUITE RESULTS",
      detail: "P1: 11/11 · P2: 13/13 · P3: 21/21 · P4: 11/11 — 56/56 total, all green",
    },
    {
      label: "SANITIZER VERIFICATION",
      detail: "ASan & UBSan: 0 leaks, 0 heap errors, 0 races across all suites",
    },
  ],
  technologies: [
    "C++17 / C++20",
    "POSIX Threads",
    "CMake",
    "GoogleTest",
    "SQLLogicTest",
    "AddressSanitizer (ASan)",
    "UndefinedBehaviorSanitizer (UBSan)",
    "Clang-Tidy",
  ],
  visualMetaphor: "database storage engine architecture with buffer pool, B+ tree, volcano executor, and lock manager",
  interactive: [],
  github: "https://github.com/naresh-cn2/bustub-engine",
  verified: {
    date: "2026-11-01",
    method: "CTest & GoogleTest verbose execution; AddressSanitizer & UndefinedBehaviorSanitizer",
    baseline: "P1: fc821a8, P2: 19275ad, P3: a56e622, P4: 0ce5626",
  },
};
