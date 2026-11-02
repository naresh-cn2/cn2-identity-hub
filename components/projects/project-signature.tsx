import FlagshipInstrument from "@/components/work/flagship-instrument";
import ProjectMark from "@/components/work/project-mark";
import TierTwoSignature from "./tier-two-signatures";
import { getFlagship, type ArchiveProject } from "@/data/archive";

/**
 * ProjectSignature — the visual identity that follows a project.
 *
 * One signature per project, used both in the /work showcase and at the
 * entrance of its world, so a system is recognizable wherever it appears.
 * Flagships keep their bespoke instruments; tier-2 builds carry their own
 * signature scenes. Falls back to the deterministic mark if a project has
 * neither yet.
 */
export default function ProjectSignature({
  project,
  embedded = false,
}: {
  project: ArchiveProject;
  /** Rendered inside an ancestor <a> — internal links become inert spans
   *  so the document never nests anchors (React hydration error). */
  embedded?: boolean;
}) {
  if (project.tier === 1) {
    const flagship = getFlagship(project.id);
    if (flagship) return <FlagshipInstrument project={flagship} embedded={embedded} />;
    return <ProjectMark id={project.id} />;
  }
  return <TierTwoSignature project={project} />;
}
