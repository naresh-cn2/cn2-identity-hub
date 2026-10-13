import { getArchiveProject } from "./archive";
import { researchEntries } from "./research";
import { publishedArticles } from "./articles";

/**
 * Project world registry (spec: CN2.DEV Level 2 & 4).
 *
 * A project world is the layered home of one build: entrance, sticky
 * navigation, architecture, case study, evidence, documentation and its
 * connections outward. Navigation is DERIVED from the content that actually
 * exists for the project — a section with no real content is never exposed,
 * so an empty world cannot be padded to look complete.
 *
 * `componentLinks` is the Level-4 knowledge graph for the architecture
 * explorer: which test, result, limitation or state connects to which
 * component. Every label is carried from the project's own record in
 * `data/archive.ts`; nothing here introduces a new claim.
 */

export type EvidenceKind = "TEST" | "EVIDENCE" | "RESULT" | "LIMITATION" | "STATE";

export interface ComponentEvidence {
  kind: EvidenceKind;
  label: string;
  /** Optional real destination — omitted rows are statements, not links. */
  href?: string;
}

export interface ComponentLink {
  /** Must match an ArchStep.name exactly. */
  component: string;
  items: ComponentEvidence[];
}

export interface RelatedWork {
  id: string;
  /** Why this project is connected — stated, never implied. */
  reason: string;
}

export interface ProjectWorld {
  /** Architecture component → connected record items (the knowledge graph). */
  componentLinks: ComponentLink[];
  /** Connected projects with an explicit reason each. */
  related: RelatedWork[];
}

export interface WorldNavItem {
  id: string;
  label: string;
}

/* ------------------------------------------------------------------ *
 * Worlds registered so far. Other projects adopt the same architecture
 * by adding an entry here — the page dispatches on its presence.
 * ------------------------------------------------------------------ */

export const projectWorlds: Record<string, ProjectWorld> = {
  "crypto-platform": {
    componentLinks: [
      {
        component: "INGESTION",
        items: [
          { kind: "EVIDENCE", label: "9,608 / 9,608 tick-invariant replay confirmed on every CI run" },
          { kind: "TEST", label: "Full pytest suite — unit, integration and invariant regression — runs in GitHub Actions alongside secret scanning", href: "https://github.com/Quantitative-Systems/crypto-platform" },
        ],
      },
      {
        component: "STATE ENGINE",
        items: [
          { kind: "STATE", label: "State updates only on closed candles; entries execute at next bar open" },
          { kind: "EVIDENCE", label: "Five overlapping observation sets model structure once across the 7-timeframe ladder" },
        ],
      },
      {
        component: "DECISION ENGINE",
        items: [
          { kind: "EVIDENCE", label: "Contract SHA-256 8fbc923a… re-checked on demand — python cli.py verify-contract", href: "https://github.com/Quantitative-Systems/crypto-platform" },
          { kind: "STATE", label: "Confidence ≥ 0.50 required for a candidate to proceed" },
        ],
      },
      {
        component: "RISK GOVERNOR",
        items: [
          { kind: "RESULT", label: "+0.8885R expectancy · 4.918 profit factor (confidence ≥ 0.60 cohort) — BACKTEST SIMULATION", href: "#case-study" },
          { kind: "LIMITATION", label: "All expectancy, profit-factor and win-rate figures are historical backtest simulations — not live performance" },
        ],
      },
      {
        component: "CAPITAL GATE",
        items: [
          { kind: "STATE", label: "Real capital $0.00 — live order submission disabled, fail-closed" },
          { kind: "STATE", label: "A hardware authorization module gates any future capital unlock (roadmap)" },
        ],
      },
      {
        component: "SERVER & CLIENTS",
        items: [
          { kind: "EVIDENCE", label: "21 REST endpoints · WebSocket — one state contract for web workstation and Android" },
          { kind: "TEST", label: "Restart recovery exercises idempotent order reconciliation against SQLite WAL", href: "#evidence" },
        ],
      },
    ],
    related: [
      {
        id: "forex-platform",
        reason:
          "The methodology twin — the same closed-bar causal timeframe ladder, five overlapping observation sets and predeclared gate funnel, built for FX instead of digital assets.",
      },
      {
        id: "apex-quant-engine",
        reason:
          "The flagship quant sibling — a multi-strategy engine with its own risk controls, backtest evidence and published research.",
      },
      {
        id: "market-data-replay",
        reason:
          "Determinism as a test primitive — the 9,608-tick invariant replay follows the same byte-identical discipline this platform's evidence rests on.",
      },
    ],
  },
};

export function getProjectWorld(id: string): ProjectWorld | undefined {
  return projectWorlds[id];
}

/**
 * The world's navigation, derived from what actually exists:
 * research stays hidden when the project has no published entries, and
 * engineering-log is never exposed because no build-history source exists.
 */
export function getWorldNav(id: string): WorldNavItem[] {
  const project = getArchiveProject(id);
  if (!project) return [];

  const nav: WorldNavItem[] = [{ id: "overview", label: "OVERVIEW" }];

  if (project.detail) {
    nav.push({ id: "architecture", label: "ARCHITECTURE" });
    nav.push({ id: "case-study", label: "CASE STUDY" });
  }
  if (project.metrics.length > 0 || project.detail?.testing.length || project.detail?.artifacts.length) {
    nav.push({ id: "evidence", label: "EVIDENCE" });
  }

  const hasResearch =
    researchEntries.some((r) => r.relatedProject === id) ||
    publishedArticles.some((a) => a.relatedProject === id);
  if (hasResearch) nav.push({ id: "research", label: "RESEARCH & EXPERIMENTS" });

  if (project.detail?.artifacts.length) nav.push({ id: "documentation", label: "DOCUMENTATION" });
  if (projectWorlds[id]?.related.length) nav.push({ id: "related-work", label: "RELATED WORK" });

  return nav;
}
