import type { FlagshipProject } from "./types";
import { bustubEngine } from "./bustub-engine";
import { apexQuantEngine } from "./apex-quant-engine";
import { automatedTradingOs } from "./automated-trading-os";
import { marketDataReplay } from "./market-data-replay";
import { qrsip } from "./qrsip";

export type {
  FlagshipProject,
  ProjectMetric,
  ArchLayer,
  EvidenceItem,
  InteractiveModule,
  ResultClass,
  VerificationRecord,
} from "./types";

export const flagshipProjects: FlagshipProject[] = [
  bustubEngine,
  apexQuantEngine,
  automatedTradingOs,
  marketDataReplay,
  qrsip,
];

export function getProject(id: string): FlagshipProject | undefined {
  return flagshipProjects.find((p) => p.id === id);
}
