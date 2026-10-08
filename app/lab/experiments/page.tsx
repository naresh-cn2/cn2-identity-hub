import type { Metadata } from "next";
import { labModules } from "@/data/lab";
import LabShell from "@/components/lab/lab-shell";
import ExperimentExplorer from "@/components/lab/experiment-explorer";

const mod = labModules.find((m) => m.href === "/lab/experiments")!;

export const metadata: Metadata = {
  title: "Experiment Explorer — Quant Lab",
  description:
    "Walk a hypothesis through the QRSIP governance workflow — experiment, verification, artifact, report — and let the promotion gate decide.",
  alternates: { canonical: "/lab/experiments" },
};

export default function ExperimentsLabPage() {
  return (
    <LabShell code={mod.code} name={mod.name} description={mod.description} inputs={mod.inputs} outputs={mod.outputs}>
      <ExperimentExplorer />
    </LabShell>
  );
}
