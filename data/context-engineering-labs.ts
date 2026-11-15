/**
 * CONTEXT ENGINEERING LABS — source-verified record.
 *
 * This module holds the portfolio record for the Hugging Face Context
 * Engineering Course labs: one public repository containing six
 * implementations, not six repositories.
 *
 * Every field below was checked against the published source, not
 * against the repository's own documentation. Where the repository's
 * prose overstates what the code does, this record states what the code
 * does — the `limitations` field on each lab carries those corrections
 * verbatim in substance, so the site never repeats a claim the
 * implementation cannot support.
 *
 * Verification performed for this record:
 *   - The full suite was cloned and executed locally: 72 passed in 28.38s
 *     on Python 3.12.10 / pytest 9.1.1, including the one test that
 *     drives a live OpenCode server.
 *   - All 47 referenced GitHub URLs were checked over HTTP (200).
 *   - Per-lab behaviour was read from the implementation files directly.
 */

/** The repository. All six labs live inside this one tree. */
export const CE_LABS_REPO = "https://github.com/naresh-cn2/context-engineering-labs";

/** Path helper — a directory inside the repository. */
export const repoTree = (path: string) => `${CE_LABS_REPO}/tree/main/${path}`;
/** Path helper — a file inside the repository. */
export const repoFile = (path: string) => `${CE_LABS_REPO}/blob/main/${path}`;

/** The six labs, in the layering the repository's own architecture uses. */
export type CeLabLayer =
  | "KNOWLEDGE"
  | "PROTOCOL"
  | "PACKAGING"
  | "ORCHESTRATION"
  | "OBSERVABILITY"
  | "EXECUTION";

export interface CeLab {
  /** Unit code as published — "01" … "06". */
  code: string;
  /** Professional title for the unit. */
  title: string;
  /** One-line positioning used as the card headline. */
  subtitle: string;
  /** Which layer of the stack this unit occupies. */
  layer: CeLabLayer;
  /** The problem this unit exists to solve. */
  problem: string;
  /** What the implementation actually does. */
  capabilities: string[];
  /** Stack verified from imports, manifests and requirements files. */
  stack: string[];
  /** The engineering ideas the unit demonstrates. */
  concepts: string[];
  /** Repository-relative source directory. */
  sourcePath: string;
  /** How the verification of this unit was actually done. */
  verification: string;
  /** Evidence class — the site's trust vocabulary. */
  evidenceClass: "VERIFIED" | "SELF-BENCHMARK" | "DEVELOPMENT-STAGE";
  /** Test cases in this unit's own suite. */
  testCount: number;
  /** Where the unit stops being what its documentation implies. */
  limitations: string[];
}

export const CE_LABS: CeLab[] = [
  {
    code: "01",
    title: "Agent Skills — Dataset Validation",
    subtitle: "A portable skill that refuses a broken dataset before training starts",
    layer: "KNOWLEDGE",
    problem:
      "A dataset that does not match its declared schema produces a failed model run, not a failed load. Checking that after training has begun is already too late.",
    capabilities: [
      "The skill is declared in the Agent Skills format — a `SKILL.md` with YAML frontmatter carrying name, description, license, compatibility, metadata, version and an `allowed-tools` grant — so any host that reads the specification can discover it.",
      "A deterministic validation CLI loads CSV, Parquet, JSON/JSONL and Arrow files through one loader that switches on the file extension, and falls back from line-delimited JSON to standard JSON when the first parse fails.",
      "Schema conformity is checked against a required-column set, then four quality checks run: an empty dataset, missing values, duplicate rows, and whitespace-only strings in object columns.",
      "The report is a typed JSON object carrying status, format, errors, warnings and metadata — row count, columns, dtypes, memory footprint, per-column missing-value counts, duplicate count. The process exits 1 on any error, so the check can gate a pipeline instead of only informing it.",
    ],
    stack: [
      "Python 3.12",
      "pandas",
      "datasets",
      "numpy",
      "pyarrow",
      "pytest",
      "Agent Skills Specification v1",
    ],
    concepts: [
      "Declarative skill packaging",
      "Schema-conformity validation",
      "Exit-code pipeline gating",
      "Format-aware loading",
      "Deterministic machine-readable reporting",
    ],
    sourcePath: "unit-01-agent-skills/hf-dataset-validation",
    verification:
      "10 test cases in the unit suite, plus two cases in the root integration audit that run the CLI against a clean and a flawed sample and assert PASS and WARNING with three warnings respectively.",
    evidenceClass: "VERIFIED",
    testCount: 10,
    limitations: [
      "The repository's portfolio document describes this as validation “without external dependencies”; the implementation imports pandas. The checks are deterministic, but they are not dependency-free.",
      "The portfolio document also claims detection of empty splits, categorical imbalance and string-length outliers. The implementation checks empty datasets, missing columns, missing values, duplicate rows and whitespace-only strings — it does not compute class balance or length distributions.",
      "The root README's example invocation uses `--file` and `--columns`; the CLI takes a positional path and an optional `--required-cols`, so that example would error as written.",
    ],
  },
  {
    code: "02",
    title: "Text Processor — MCP Server",
    subtitle: "Five tools a model can call, returning values instead of assertions",
    layer: "PROTOCOL",
    problem:
      "An agent that can only talk to a model cannot measure anything about the text it was given. Every measurement becomes prose the model asserts, rather than a number it computed.",
    capabilities: [
      "A Model Context Protocol server running over JSON-RPC 2.0 on stdio, exposing five tools: `analyze_text`, `extract_keywords`, `check_reading_level`, `reverse_text` and `detect_sentiment`.",
      "Every tool returns a JSON payload the caller can parse — counts, averages, keyword frequencies, a grade level, a polarity score — rather than a natural-language answer.",
      "An import shim supports both MCP 1.x (`FastMCP`) and 2.x (`MCPServer`), so the server does not break when the SDK renames its entry point.",
      "A Gradio front end exposes the three analytical functions directly for human use, with a keyword-count slider and JSON output panes.",
    ],
    stack: ["Python 3.12", "mcp (FastMCP / MCPServer)", "Gradio", "pytest"],
    concepts: [
      "Model Context Protocol",
      "JSON-RPC 2.0 over stdio",
      "Tool schema design",
      "Deterministic preprocessing",
      "SDK compatibility shims",
    ],
    sourcePath: "unit-02-mcp/text-processor-mcp",
    verification:
      "9 test cases in the unit suite, asserting each tool's output values and that the server instance exposes the expected registered tools. The root integration audit calls all five tool functions directly and checks their results.",
    evidenceClass: "VERIFIED",
    testCount: 9,
    limitations: [
      "The repository's portfolio document lists four tools and an `hf://` resource and prompt. The server implements five tools and declares no resources and no prompts — the `hf://` entries are not implemented.",
      "The Gradio app's docstring says it provides an active MCP endpoint, but `demo.launch()` is called without mounting one. It serves the three UI tools and nothing else.",
      "Keyword extraction, reading level and sentiment are heuristics, not models: a 30-word stopword list, a vowel-count syllable estimate for Flesch-Kincaid, and a 20-word polarity lexicon. They are reproducible and testable, and they are not semantic analysis.",
    ],
  },
  {
    code: "03",
    title: "Text Processor — Cross-Agent Plugin",
    subtitle: "One bundle, three host formats, and the packaging problem solved",
    layer: "PACKAGING",
    problem:
      "A tool that only exists inside one agent is not a tool anyone else can use. Distribution is the hard part, and it is a different problem from implementation.",
    capabilities: [
      "One bundle expressed in three host formats: `package.json` for OpenCode and npm, `.claude-plugin/plugin.json` for Claude Code, and `.codex-plugin/plugin.json` for Codex.",
      "`.mcp.json` declares the sibling MCP server as a launch command, so an installed bundle knows which server backs its skills.",
      "Three declarative skills — `analyze-text`, `extract-keywords`, `check-reading-level` — each a `SKILL.md` that instructs an agent to call the corresponding MCP tool rather than reimplementing it.",
      "An OpenCode JavaScript lifecycle plugin registers a `text-stats` command that returns word and character counts, and a `tool.execute.before` hook that logs a suggestion to run readability and keyword analysis whenever the read tool fires.",
    ],
    stack: [
      "JavaScript ES2022 (ESM)",
      "Node.js",
      "JSON manifests",
      "pytest",
      "PyYAML",
    ],
    concepts: [
      "Plugin packaging and distribution",
      "Multi-host manifest formats",
      "Declarative skill instructions",
      "MCP server binding",
      "Agent lifecycle hooks",
    ],
    sourcePath: "unit-03-plugins/text-processor-plugin",
    verification:
      "6 test cases in the unit suite. They are structural assertions: the manifests exist and parse, the Codex manifest lists exactly three skills, `.mcp.json` declares the server, and each skill's frontmatter matches its directory name. The root integration audit additionally resolves the `.mcp.json` command and confirms the target file exists.",
    evidenceClass: "VERIFIED",
    testCount: 6,
    limitations: [
      "This unit is packaging and configuration, not implementation. The analytical behaviour lives in Unit 2, and the manifest points outside this directory — so the unit is not independently installable on its own.",
      "The JavaScript runtime implements one command (word and character count) and one logging hook. The three advertised analytical capabilities are instructions to the agent, not code here.",
      "The README describes `PLUGIN_LOG_LEVEL`, `TEXT_PROCESSOR_MAX_BUFFER`, an MCP-missing fallback that degrades skills to ordinary summarisation, and try/catch around every hook invocation. None of those exist in the module — there is no `process.env` access, no fallback path, and the hook's log call is not guarded.",
      "No test executes the JavaScript. The command registration, the hook, and the OpenCode plugin API contract are asserted by reading the source as a string.",
    ],
  },
  {
    code: "04",
    title: "Code Quality — Multi-Agent Pipeline",
    subtitle: "Four roles, two reviewer verdicts, and one boolean sign-off",
    layer: "ORCHESTRATION",
    problem:
      "An agent reviewing its own code has no independent vantage point. The same blind spot produces the same defect twice, and the reviewer cannot catch what the author could not see.",
    capabilities: [
      "A four-stage topology: Architecture Researcher hands off to Code Implementer, then Security Reviewer and Performance Reviewer run concurrently, and sign-off is the boolean AND of the two reviewer verdicts.",
      "The fan-out uses a two-worker thread pool; the sequential handoff is Researcher → Implementer.",
      "Live mode drives a real OpenCode server over its REST API — `POST /api/session`, `POST /api/session/{id}/prompt`, `GET /api/session/{id}/message` — using only the Python standard library, with a 10-second per-request timeout and a 40-second bound on waiting for a reply.",
      "Reviewer sessions are created with `write` and `edit` denied at the session level, so a review turn cannot modify the code it is reviewing.",
      "Deterministic mode runs source-string heuristics with no network at all, so the orchestration can be exercised in CI without an LLM.",
      "Declarative agent definitions ship for two hosts: `.claude/agents/*.md` with YAML frontmatter and `.codex/agents/*.toml` with `sandbox_mode = \"read-only\"` on the reviewer roles.",
      "A recorded live-run trace is published at `traces/live_run_trace.json`.",
    ],
    stack: [
      "Python 3.12 standard library",
      "urllib",
      "concurrent.futures",
      "pytest",
      "tomlkit",
      "PyYAML",
      "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
    ],
    concepts: [
      "Multi-agent orchestration",
      "Sequential handoff",
      "Fan-out / fan-in review",
      "Least-privilege tool scoping",
      "Session-level permission denial",
      "Dual-mode testability",
      "Execution-trace capture",
    ],
    sourcePath: "unit-04-subagents/code-quality-pipeline",
    verification:
      "11 test cases from 5 test functions — four parametrised agent-definition checks for each host, one reviewer-confinement check, one deterministic orchestration run, and one trace-schema check. The root integration audit runs the deterministic pipeline and asserts the researcher's risks mention the N+1 query and the token comparison.",
    evidenceClass: "VERIFIED",
    testCount: 11,
    limitations: [
      "Deterministic mode is a set of literal string heuristics, not four simulated agents. It rewrites two token comparisons to `hmac.compare_digest` and leaves the N+1 query and the `time.sleep` in place — so on the shipped sample the performance reviewer rejects and the pipeline signs off false, which contradicts the sample output printed in the unit README.",
      "Live mode is real HTTP orchestration, but a JSON parse failure in any reviewer silently substitutes a heuristic verdict — and the trace is still labelled live. A malformed response can therefore look like a successful agent run.",
      "Reviewer confinement in live mode denies `write` and `edit` only. It is not the Read/Grep-only allowlist the static Claude definitions declare, and the runner never loads those definition files — the role text is supplied inside the prompt instead.",
      "The implementer's response is returned in memory. No file is patched, the target is not rewritten, and the implementer's output is not written to the trace — so the trace records the reviewers' verdicts but not the change they reviewed.",
      "The tracked trace carries no session ID, no token usage and no server provenance. It is consistent with a live run and its timestamp matches the repository's publish window, but source inspection alone cannot independently prove the LLM run occurred.",
      "Connection failures are not handled gracefully — the README promises a clean report when OpenCode is offline, but an exception propagates out of the client and terminates the run with a traceback.",
    ],
  },
  {
    code: "05",
    title: "Agent Activity — Lifecycle Dashboard",
    subtitle: "Hook events normalised into one record, forwarded without stalling the agent",
    layer: "OBSERVABILITY",
    problem:
      "When an agent fails you need its lifecycle, not its last sentence. Without an event record there is nothing to inspect after the fact, and a telemetry failure that halts the agent is worse than no telemetry at all.",
    capabilities: [
      "A FastAPI receiver exposing `POST /event` and `GET /health`, with a Gradio dashboard mounted at `/`.",
      "A bounded in-memory ring buffer of 500 events, newest first, normalised to five fields — timestamp, platform, event, tool, args — so payloads from three different agent hosts land in one shape.",
      "Platform and event names are resolved from several body and header aliases in priority order, and the server stamps its own UTC timestamp rather than trusting the client's.",
      "`event_forwarder.py` subscribes to OpenCode's SSE stream at `/api/event`, maps raw event types onto a lifecycle taxonomy — SessionStart, Stop, PreToolUse, PostToolUse, AgentReasoning, AgentMessage — and forwards each normalised event to the dashboard.",
      "An OpenCode JavaScript plugin posts `PreToolUse` and `PostToolUse` events through `fetch` with a two-second `AbortController`, so an unreachable dashboard cannot stall the agent indefinitely.",
      "Dashboard delivery failures are caught, counted and reported rather than raised — the forwarder returns `False` and increments a failure counter instead of propagating.",
    ],
    stack: [
      "Python 3.12",
      "FastAPI",
      "Uvicorn",
      "Gradio",
      "pandas",
      "httpx",
      "JavaScript (fetch / AbortController)",
      "pytest",
    ],
    concepts: [
      "Lifecycle observability",
      "SSE ingestion",
      "Event normalisation",
      "Fail-soft telemetry",
      "Bounded in-memory buffering",
      "Hook-based instrumentation",
    ],
    sourcePath: "unit-05-hooks/agent-activity-dashboard",
    verification:
      "9 test cases across two files — six against the dashboard API and three against the forwarder. Eight are self-contained: health, event ingestion from two platform shapes, truncation, buffer capacity, dataframe and summary construction, event taxonomy mapping, and fail-soft behaviour against a closed port. The ninth is a genuine end-to-end test that starts Uvicorn, creates a session on a live OpenCode server, prompts the model and asserts the dashboard count increments.",
    evidenceClass: "VERIFIED",
    testCount: 9,
    limitations: [
      "The dashboard does not serve an SSE stream. There is no `GET /stream`, no `StreamingResponse` and no browser `EventSource` — SSE is consumed from OpenCode, not served. The repository's README and architecture documents both describe a live stream that does not exist in the code.",
      "The Gradio view is populated once at import and refreshes only when the Clear Events button runs. It is a dashboard page with a manual refresh, not a live console — incoming events do not update the components.",
      "The buffer is process-local and lost on restart; capacity is a constant 500, not configurable, and there is no explicit synchronisation layer.",
      "`args` is truncated to 200 characters but nothing is redacted. The README describes this as preventing credential leaks; truncation does not redact.",
      "The forwarder catches dashboard failures but not a failure to reach OpenCode's stream, and the JavaScript hooks await their fetch — so they can delay execution by up to two seconds before aborting. The README's “never causes agent execution halts” is not strictly true.",
      "The end-to-end test has no skip marker and hardcodes the OpenCode host, so the full-suite result depends on a running OpenCode daemon and a model that answers. On a machine without one, that test errors rather than skipping.",
    ],
  },
  {
    code: "06",
    title: "Nano Harness — Sandboxed Execution",
    subtitle: "The tool boundary drawn in code, because a prompt is not a boundary",
    layer: "EXECUTION",
    problem:
      "An agent that can run code can read your credentials. The tool boundary has to be enforced by the runtime, not requested in the prompt — and it has to fail closed.",
    capabilities: [
      "`safe_path()` rejects a literal null byte, percent-decodes once, resolves the path, and requires the resolved result to sit inside the workspace — which is what actually stops `../` traversal, absolute paths and symlink escapes.",
      "`write_file()` refuses when writes are disabled, and blocks any path component named `.git`, `.env`, `.ssh`, `.gnupg` or `id_rsa`, along with anything beginning with `.git`.",
      "`exec_cmd()` allows a binary only from a fixed allowlist — `ls`, `cat`, `pwd`, `echo`, `head`, `tail`, `wc`, `rg` — rejects any path in the binary name, rejects shell metacharacters (`;`, `&&`, `||`, `|`, `>`, `<`, backtick, `$(`, `${`, newline) and runs with `shell=False`, a timeout and the workspace as the working directory.",
      "`web_fetch()` permits only http and https, and blocks loopback, RFC1918, link-local and cloud metadata addresses (including 169.254.169.254) after resolving the hostname to an address.",
      "`step()` executes caller-supplied Python in a namespace with a restricted builtins set and the sandbox's own tools injected, capturing stdout and stderr as observations.",
      "`sanitize_error()` replaces the workspace and home paths in error text before it reaches a caller.",
    ],
    stack: [
      "Python 3.12 standard library only",
      "subprocess",
      "shlex",
      "pathlib",
      "urllib",
      "ipaddress",
      "socket",
      "pytest",
    ],
    concepts: [
      "Path confinement",
      "Command allowlisting",
      "Write gating",
      "SSRF preflight",
      "Least-privilege namespaces",
      "Error sanitisation",
      "Fail-closed design",
    ],
    sourcePath: "unit-06-nano-harness",
    verification:
      "15 test cases in the unit suite, and they are genuine behavioural assertions rather than smoke tests: traversal and absolute-path rejection, null-byte and percent-encoding rejection, write gating on and off, protected-path refusal, command allowlisting, injection-token rejection, explicit binary-path rejection, output clipping, forbidden URL schemes, private-IP blocking, restricted execution, final-answer capture and error sanitisation. The root integration audit adds two path escapes, two disallowed commands, a write denial and a three-step write/read/final-answer interaction.",
    evidenceClass: "VERIFIED",
    testCount: 15,
    limitations: [
      "This is an application-level boundary, not an operating-system sandbox. The code runs in the same Python process and can be escaped through the object model; the repository's own security audit says to pair it with container or kernel isolation for adversarial code. The word “sandbox” describes the intent, not the isolation level.",
      "It is not an autonomous agent. There is no model client, no prompt loop and no step accounting — `model`, `max_steps` and `extract_python()` are stored or defined but never used. The module has no `__main__` block, so the README's run command is a no-op.",
      "The allowlist constrains the binary name, not its arguments, so an allowed reader can still be pointed at a host path outside the workspace.",
      "The SSRF preflight fails open when DNS resolution raises, and redirect targets are not re-validated, so a public URL redirecting inward is not covered by the check.",
      "The Python it executes has no timeout — an infinite loop is not bounded. Only subprocesses and HTTP requests are timed.",
      "`read_file()` and subprocess capture read fully before clipping, so the hard memory bounds the README describes are not enforced at the read.",
    ],
  },
];

/** Repository-level facts, all independently checked. */
export const CE_LABS_REPO_META = {
  repository: CE_LABS_REPO,
  /** The root LICENSE file. GitHub reports the same licence. */
  license: "MIT",
  licenseNote:
    "The repository's README badge and its package.json metadata both say Apache-2.0, while the root LICENSE file is the MIT licence and GitHub reports MIT. The LICENSE file is the authority.",
  /** Independent reproduction, run against a fresh clone. */
  testTotal: 72,
  testDuration: "28.38s",
  testEnvironment: "Python 3.12.10 · pytest 9.1.1 · Windows",
  /** Per-unit distribution, matching pytest collection exactly. */
  testDistribution: [
    { unit: "01", name: "Dataset validation", tests: 10 },
    { unit: "02", name: "MCP server", tests: 9 },
    { unit: "03", name: "Plugin bundle", tests: 6 },
    { unit: "04", name: "Multi-agent pipeline", tests: 11 },
    { unit: "05", name: "Activity dashboard", tests: 9 },
    { unit: "06", name: "Nano harness", tests: 15 },
    { unit: "—", name: "Cross-unit integration audit", tests: 12 },
  ],
  /** The suite's one environment-dependent test. */
  liveDependency:
    "71 of the 72 cases are self-contained. The remaining one — the end-to-end event-forwarding test — requires a running OpenCode daemon at 127.0.0.1:28894 and a model that answers. It has no skip marker, so on a machine without one it errors rather than skipping.",
  /** What the course completion status actually is. */
  certification:
    "No Hugging Face certificate is claimed. The repository's own progress document records course completion as self-reported and unverified, and states that official certificates are issued only by huggingface.co after the interactive quizzes and capstone are completed.",
  /** No deployment claims exist to make. */
  deployment:
    "Nothing here is deployed. The dashboard, the MCP server and the pipeline are all local processes; the repository is source, documentation and tests.",
} as const;

/** Layer order, used by the architecture strip on the page. */
export const CE_LAB_LAYERS: { id: CeLabLayer; label: string; role: string }[] = [
  {
    id: "KNOWLEDGE",
    label: "PORTABLE KNOWLEDGE",
    role: "What the agent is told, packaged so any host can load it.",
  },
  {
    id: "PROTOCOL",
    label: "TOOL PROTOCOL",
    role: "How the agent calls something and gets a value back.",
  },
  {
    id: "PACKAGING",
    label: "DISTRIBUTION",
    role: "How the whole thing reaches a machine that is not this one.",
  },
  {
    id: "ORCHESTRATION",
    label: "MULTI-AGENT WORK",
    role: "How several agents divide a job and check each other.",
  },
  {
    id: "OBSERVABILITY",
    label: "OBSERVABILITY",
    role: "How you see what the agent actually did.",
  },
  {
    id: "EXECUTION",
    label: "EXECUTION BOUNDARY",
    role: "What the agent is allowed to touch when it runs code.",
  },
];
