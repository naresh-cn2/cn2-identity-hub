import type { Metadata } from "next";
import Cs50AiPage, { metadata as baseMeta } from "../../../works/cs50-ai/page";

/**
 * /builds/projects/cs50-ai — the older spelling of the CS50 AI record.
 *
 * The canonical destination is /works/cs50-ai, which carries the same
 * page. This route stays reachable so no inbound link breaks, and it
 * declares /works/cs50-ai as its canonical so the two URLs do not
 * compete for the same query.
 */
export const metadata: Metadata = {
  ...baseMeta,
  alternates: { canonical: "/works/cs50-ai" },
};

export default Cs50AiPage;
