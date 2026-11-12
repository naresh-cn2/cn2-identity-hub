import type { Metadata } from "next";
import Link from "next/link";
import KineticText from "@/components/ui/kinetic-text";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import MarketDepth from "@/components/visuals/market-depth";

export const metadata: Metadata = {
  title: "Harvard CS50 AI — Twelve Applied AI Projects — Case Study",
  description:
    "Applied artificial intelligence engineering case study: search algorithms, knowledge representation, probabilistic reasoning, optimization, machine learning, reinforcement learning, neural networks, and natural language processing. Harvard CS50AI certificate, 12/12 projects.",
  alternates: { canonical: "/builds/projects/cs50-ai" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Harvard CS50 AI — Twelve Applied AI Projects — CN2.DEV Case Study",
    description:
      "Applied AI engineering case study — twelve projects, verified certificate from CS50, Harvard University.",
    type: "article",
  },
};

const PROJECTS = [
  {
    name: "Degrees",
    theme: "Graph Search",
    description: "Graph search and breadth-first search for finding connections between actors.",
    foundation: "Breadth-first search (BFS) on unweighted graphs; adjacency-list representation.",
    algorithms: ["BFS", "Graph traversal", "Queue-based exploration"],
    tech: ["Python", "Collections.deque"],
  },
  {
    name: "Tic-Tac-Toe",
    theme: "Adversarial Search",
    description: "Minimax with alpha-beta pruning for optimal tic-tac-toe play.",
    foundation: "Minimax algorithm on a game tree; alpha-beta pruning for node reduction.",
    algorithms: ["Minimax", "Alpha-beta pruning", "Game-tree search"],
    tech: ["Python", "Recursion"],
  },
  {
    name: "Knights",
    theme: "Propositional Logic",
    description: "Propositional logic knowledge base and model checking for knight/knave puzzles.",
    foundation: "Propositional logic semantics; model enumeration over all possible worlds.",
    algorithms: ["Model checking", "Logical entailment", "Symbol resolution"],
    tech: ["Python", "Symbolic logic"],
  },