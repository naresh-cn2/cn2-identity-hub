import type { FlagshipProject } from "./types";
import { apexQuantEngine } from "./apex-quant-engine";
import { automatedTradingOs } from "./automated-trading-os";
import { marketDataReplay } from "./market-data-replay";
import { qrsip } from "./qrsip";

export type { FlagshipProject, ProjectMetric, ArchLayer, EvidenceItem, InteractiveModule } from "./types";

export const flagshipProjects: FlagshipProject[] = [
  apexQuantEngine,
  automatedTradingOs,
  marketDataReplay,
  qrsip,
];

export function getProject(id: string): FlagshipProject | undefined {
  return flagshipProjects.find((p) => p.id === id);
}
