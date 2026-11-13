import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import KineticText from "@/components/ui/kinetic-text";
import Reveal from "@/components/ui/reveal";
import PageAtmosphere from "@/components/ui/page-atmosphere";
import MarketDepth from "@/components/visuals/market-depth";
import { site } from "@/data/site";

const REPO = "https://github.com/naresh-cn2/harvard-cs50-ai";
const CERTIFICATE = "https://cs50.harvard.edu/certificates/693ef47a-6151-4545-9661-add787b5f7b";

export const metadata: Metadata = {
  title: "Harvard CS50 AI — Twelve Applied AI Projects — Case Study",
  description:
    "Applied artificial intelligence engineering case study: search algorithms, knowledge representation, probabilistic reasoning, optimization, machine learning, reinforcement learning, neural networks and natural language processing. Twelve projects completed and verified by CS50, Harvard University.",
  alternates: { canonical: "/builds/projects/cs50-ai" },
  keywords: [
    "applied artificial intelligence",
    "CS50AI",
    "Harvard CS50 AI",
    "search algorithms",
    "minimax",
    "Bayesian networks",
    "Q-learning",
    "convolutional neural networks",
    "transformer attention",
    "natural language processing",
    "Bukya Naresh",
  ],
  openGraph: {
    images: ["/opengraph-image"],
    title: "Harvard CS50 AI — Twelve Applied AI Projects — CN2.DEV Case Study",
    description:
      "Applied AI engineering case study — twelve projects, verified certificate from CS50, Harvard University.",
    type: "article",
  },
};

const REPO_DOCS = {
  algorithms: `${REPO}/blob/main/DOCUMENTATION/algorithms-reference.md`,
  overview: `${REPO}/blob/main/DOCUMENTATION/technical-overview.md`,
  outcomes: `${REPO}/blob/main/DOCUMENTATION/learning-outcomes.md`,
  integrity: `${REPO}/blob/main/DOCUMENTATION/academic-integrity.md`,
};

/* ------------------------------------------------------------------ */
/* Twelve-project case-study records.                                  */
/* Every field is grounded in the published repository documentation   */
/* (PROJECTS/*.md). No performance statistics beyond what the          */
/* repository itself reports.                                          */
/* ------------------------------------------------------------------ */

interface ProjectStudy {
  num: string;
  id: string;
  name: string;
  theme: string;
  paradigm: string;
  problem: string;
  objective: string;
  foundation: string;
  architecture: string[];
  algorithms: string[];
  tech: string[];
  implementation: string;
  testing: string;
  results: string;
  challenges: string[];
  findings: string[];
  limitations: string[];
  applications: string[];
}

const PROJECTS: ProjectStudy[] = [
  {
    num: "01",
    id: "degrees",
    name: "Degrees",
    theme: "Graph Search & Breadth-First Search",
    paradigm: "SEARCH",
    problem:
      "The “Six Degrees of Kevin Bacon” problem: given a large bipartite graph of actors and films built from IMDb data, find the shortest chain of shared film appearances connecting any two actors.",
    objective:
      "Implement a provably optimal shortest-path search over an unweighted state space large enough that representation and memory choices determine feasibility.",
    foundation:
      "Breadth-first search on an unweighted graph: all paths of length k are explored before any path of length k+1, so the first time the target is reached is necessarily via a shortest path. Time and space are O(b^d) for branching factor b and solution depth d.",
    architecture: [
      "Node records carry state (actor ID), parent pointer and action (movie ID) so the path can be reconstructed by backtracking.",
      "QueueFrontier — a FIFO queue — enforces the breadth-first layer order.",
      "An explored set of visited actor IDs eliminates cycles and redundant states.",
    ],
    algorithms: ["Breadth-first search", "FIFO frontier", "Backtracking path reconstruction"],
    tech: ["Python", "csv", "collections.deque", "IMDb datasets"],
    implementation:
      "The search initialises the frontier with the source, then repeatedly dequeues a node, goal-tests, expands its neighbours (movie → person pairs) and enqueues unvisited children. Goal-checking happens at generation rather than expansion, which the documentation identifies as cutting memory by a full factor of b.",
    testing:
      "Assessed by Harvard's check50 harness against defined source/target pairs, then submitted through submit50.",
    results:
      "All check50 test suites passed, including the canonical Kevin Bacon / Tom Hanks connections through the full IMDb dataset.",
    challenges: [
      "Memory scaling on IMDb dumps with millions of rows — solved by storing node states as lightweight integer IDs rather than strings.",
      "Correct frontier semantics: dequeuing in the wrong order silently degrades BFS into an unweighted, non-optimal traversal.",
    ],
    findings: [
      "Early goal checking at the generation step accelerates BFS by roughly a factor of b in practice.",
      "Representation choices — integer IDs over strings, adjacency built from CSV joins — dominate runtime on real data at this scale.",
    ],
    limitations: [
      "BFS is optimal only because edges are unweighted; a weighted variant would need Dijkstra or A*.",
      "Space complexity O(b^d) makes deep searches on very large graphs impractical without bidirectional search or iterative deepening.",
    ],
    applications: [
      "Social-network distance queries",
      "Knowledge-graph traversal",
      "Routing over unweighted connection networks",
    ],
  },
  {
    num: "02",
    id: "tic-tac-toe",
    name: "Tic-Tac-Toe",
    theme: "Minimax & Adversarial Search",
    paradigm: "SEARCH",
    problem:
      "Build an unbeatable opponent in two-player, zero-sum Tic-Tac-Toe by computing the optimal move for every board state rather than encoding strategies by hand.",
    objective:
      "Implement the Minimax decision rule over the full game tree with alpha-beta pruning, and derive the game formalism — player, actions, result, terminal, utility — from the specification.",
    foundation:
      "Minimax recursion with utilities +1 (X wins), −1 (O wins), 0 (draw). Alpha-beta pruning maintains α (the best value MAX is assured) and β (the best MIN is assured) and cuts a branch the moment α ≥ β, since it can no longer affect the decision.",
    architecture: [
      "Pure game formalism: player(s), actions(s), result(s, a), terminal(s), utility(s).",
      "The AI selects argmax/argmin over recursively computed values; no heuristic evaluation function is needed because the game is shallow.",
    ],
    algorithms: ["Minimax", "Alpha-beta pruning", "Depth-first game-tree search"],
    tech: ["Python", "Recursion", "pytest harness"],
    implementation:
      "MAX-VALUE and MIN-VALUE mutually recurse across the action set, threading the α/β bounds through the call stack and breaking out of sibling loops on a prune condition.",
    testing:
      "check50 verifies both legality of moves and adversarial optimality — the AI must respond optimally to every legal opponent move.",
    results:
      "All check50 suites passed. Per the repository's analysis, pruning reduces the evaluated tree from 9! = 362,880 leaf states to roughly 30,000 state evaluations.",
    challenges: [
      "Correct pruning direction: the bounds must thread through alternating min/max layers or pruning becomes unsound (a subtle correctness bug, not a performance one).",
      "Handling terminal and draw conditions without double-counting utility.",
    ],
    findings: [
      "With optimal move ordering, alpha-beta reduces the effective branching factor from b toward √b.",
      "The guarantee is absolute: the agent never loses — the worst outcome against any adversary is a draw.",
    ],
    limitations: [
      "Minimax is exponential in depth; it suits small, perfect-information games and needs depth-limited evaluation for larger domains.",
      "Two-player zero-sum only — multi-agent or non-zero-sum settings require different frameworks.",
    ],
    applications: [
      "Adversarial planning under conflict",
      "Game-playing engines",
      "Any decision process with a minimising opponent — including adversarial testing of strategies",
    ],
  },
  {
    num: "03",
    id: "knights",
    name: "Knights",
    theme: "Propositional Logic & Model Checking",
    paradigm: "KNOWLEDGE",
    problem:
      "Raymond Smullyan's Knights and Knaves puzzles: every character is either a knight (always tells the truth) or a knave (always lies). Determine each character's identity from their statements alone.",
    objective:
      "Translate natural-language statements into formal propositional sentences, and answer entailment queries mechanically via model checking.",
    foundation:
      "A knowledge base KB entails α (KB ⊨ α) exactly when every truth assignment satisfying KB also satisfies α. Each character contributes two symbols (AKnight, AKnave) plus an axiom that exactly one holds, and each statement S becomes AKnight ⟺ S.",
    architecture: [
      "A propositional-logic layer with logical connectives (And, Or, Not, Implication, Biconditional) composably overloading Python operators.",
      "A model checker enumerating the full 2^n truth-assignment lattice for n symbols.",
    ],
    algorithms: ["Model checking", "Logical entailment", "Truth-table enumeration"],
    tech: ["Python", "Operator overloading", "Symbolic logic"],
    implementation:
      "Each puzzle is a knowledge base built from the domain axioms plus biconditionals for every spoken statement; check_all recursively fixes symbols true/false and verifies the query in every model that satisfies the KB.",
    testing:
      "check50 confirms the derived identities for all four puzzles, including the multi-agent dialogue puzzle where A's exact words are unknown.",
    results:
      "All four puzzles solved correctly — e.g. Puzzle 1: A is a Knave, B is a Knight; the multi-agent puzzle: A is a Knight, B is a Knave, C is a Knight.",
    challenges: [
      "Encoding indirect speech: B reporting what A said requires a nested conditional sentence, not a flat statement.",
      "Keeping the axiom set minimal so the model checker is not over-constrained.",
    ],
    findings: [
      "Model checking is sound and complete for propositional logic — the only cost is the exponential model count.",
      "Raising natural-language puzzles to formal logic is the real engineering task; the checking itself is mechanical.",
    ],
    limitations: [
      "Enumeration is O(2^n) in symbols; SAT-solving or resolution would be needed at practical symbol counts.",
      "Propositional only — no quantifiers, predicates or first-order structure.",
    ],
    applications: [
      "Rule-engine verification",
      "Consistency checking of constraints in configuration systems",
      "Formal specification and validation",
    ],
  },
  {
    num: "04",
    id: "minesweeper",
    name: "Minesweeper",
    theme: "Knowledge Representation & Inference",
    paradigm: "KNOWLEDGE",
    problem:
      "Play Minesweeper with certain knowledge only: from each revealed neighbour-mine count, deduce cells that are provably safe or provably mines, and never guess when a safe move exists.",
    objective:
      "Represent partial information as sentences of the form {cells} = count and derive an agent whose every claim follows logically from its accumulated evidence.",
    foundation:
      "Sentence-level propositional calculus. Two definite rules: |cells| = count ⇒ every cell is a mine; count = 0 ⇒ every cell is safe. The subset rule: if cells₁ ⊂ cells₂ then (cells₂ \\ cells₁) = count₂ − count₁ generates new, sharper sentences.",
    architecture: [
      "Knowledge base as a collection of sentences over unrevealed cells.",
      "add_knowledge(cell, count) marks the move, registers the sentence, then repeatedly draws definite conclusions and applies pairwise subset inference until fixed point.",
      "make_safe_move draws from the proven-safe set; make_random_move is the declared fallback.",
    ],
    algorithms: ["Subset-based inference", "Fixed-point knowledge propagation", "Set difference"],
    tech: ["Python", "Set operations"],
    implementation:
      "After each observation the knowledge base is repaired: empty and satisfied sentences are purged, safes and mines are extracted, and every sentence pair is compared so that subset differences cascade into new conclusions.",
    testing:
      "check50 validates that knowledge is updated correctly after each reveal and that the agent never marks a known-safe cell as a mine.",
    results:
      "All check50 suites passed — the agent plays using only logically certain information.",
    challenges: [
      "Avoiding redundant sentence growth: naive accumulation bloats the knowledge base without adding inferential power.",
      "Ordering the inference loop so cascaded deductions settle before moves are chosen.",
    ],
    findings: [
      "The subset rule alone is surprisingly powerful: pairs of weak sentences frequently collapse into definite mines or safes.",
      "An honest agent needs a declared policy for genuine uncertainty — here, a flagged random move — rather than pretending certainty.",
    ],
    limitations: [
      "Subset inference is incomplete: it cannot derive every consequence expressible as a propositional sentence (e.g. combined counting arguments).",
      "When no safe move is provable, play is random — win rate is bounded by luck, not logic.",
    ],
    applications: [
      "Reasoning under incomplete information",
      "Constraint propagation in diagnosis and fault isolation",
      "Explicit uncertainty handling in automated decisions",
    ],
  },
  {
    num: "05",
    id: "pagerank",
    name: "PageRank",
    theme: "Markov Chains & Random Walks",
    paradigm: "UNCERTAINTY",
    problem:
      "Rank pages in a hyperlink corpus by estimating the stationary distribution of a “random surfer” who either follows an outgoing link (probability d = 0.85) or teleports to any page (probability 1 − d).",
    objective:
      "Implement both canonical estimators — Monte Carlo sampling and iterative fixed-point solving — and understand why they must converge to the same answer.",
    foundation:
      "The transition law P(s|p) = (1 − d)/N + d/|Links(p)| for s linked from p; dangling pages distribute uniformly. The chain is ergodic (damping makes it irreducible and aperiodic), so by the Perron–Frobenius theorem a unique stationary distribution exists. The iterative form solves PR(p) = (1 − d)/N + d·Σ PR(i)/|Outbound(i)| until max change < ε = 0.001.",
    architecture: [
      "Transition-model function shared by both estimators.",
      "sample_pagerank: random-walk simulation accumulating visit frequencies, normalised by n samples.",
      "iterate_pagerank: parallel fixed-point recalculation of every page each round.",
    ],
    algorithms: ["Markov chains", "Monte Carlo sampling", "Fixed-point iteration", "Power method (equivalent form)"],
    tech: ["Python", "Probability", "random"],
    implementation:
      "Both estimators share the transition model, so their agreement is meaningful rather than coincidental: sampling approximates the distribution by frequency, iteration solves the linear system directly.",
    testing:
      "check50 verifies sampling and iterative ranks converge to consistent distributions within tolerance on fixed corpora.",
    results:
      "All check50 suites passed — both estimators agree with each other and with the theoretical stationary distribution.",
    challenges: [
      "Handling dangling pages (no outbound links) so the chain remains well-defined and aperiodic.",
      "Choosing a sample count large enough that Monte Carlo noise is small but the run stays tractable.",
    ],
    findings: [
      "Damping is not a heuristic — it is the mathematical device that guarantees existence and uniqueness of the stationary distribution.",
      "Sampling and iteration are two views of one fixed point; understanding both transfers directly to any Markov-chain estimation problem.",
    ],
    limitations: [
      "Monte Carlo estimates carry variance for finite n; iteration needs enough rounds for ε-convergence.",
      "Ranking quality depends entirely on the corpus — the algorithm has no semantic notion of “importance” beyond link structure.",
    ],
    applications: [
      "Network centrality and ranking systems",
      "Markov Chain Monte Carlo estimation — a core quantitative-research technique",
      "Stationary analysis of any regime-switching process",
    ],
  },
  {
    num: "06",
    id: "heredity",
    name: "Heredity",
    theme: "Bayesian Networks & Probability",
    paradigm: "UNCERTAINTY",
    problem:
      "Infer each person's probability of carrying the GJB2 gene and of expressing the associated trait from a family pedigree with partial observations — where inheritance follows Mendelian rules plus a 1% spontaneous mutation rate.",
    objective:
      "Build a Bayesian network over gene counts Gᵢ ∈ {0,1,2} and trait indicators Tᵢ, and compute posterior marginals by enumeration and normalisation.",
    foundation:
      "Joint factorisation by the chain rule: P(G₁,T₁,…,Gₙ,Tₙ) = ∏ᵢ P(Gᵢ | Parents(Gᵢ)) · P(Tᵢ | Gᵢ). Transmission: a parent with g copies passes the allele with probability 1−μ (g=2), 0.5 (g=1) or μ (g=0); the child inherits two independent Bernoulli events.",
    architecture: [
      "DAG: parent genes → child gene → child trait.",
      "Inference loop: enumerate joint configurations consistent with observed evidence, accumulate probability mass per variable, normalise by the partition function α.",
    ],
    algorithms: ["Bayesian networks", "Inference by enumeration", "Marginalisation and normalisation"],
    tech: ["Python", "Probability theory"],
    implementation:
      "For every person the joint probability is accumulated over all assignments of unobserved variables; posteriors P(Gᵢ = g | evidence) and P(Tᵢ = t | evidence) are then normalised so they sum to one.",
    testing:
      "check50 validates posterior distributions against known pedigree structures and observations.",
    results:
      "All check50 suites passed — posteriors correctly sharpen with each additional phenotypic observation in the family.",
    challenges: [
      "Structuring the joint enumeration so evidence variables are clamped rather than summed over.",
      "Getting the conditional-dependency structure exactly right: Gᵢ depends only on parents, Tᵢ only on Gᵢ — adding more edges both slows inference and changes answers.",
    ],
    findings: [
      "Factorisation is what makes Bayesian networks tractable: the joint never has to be represented explicitly.",
      "Even exact enumeration over a modest network demonstrates the evidence-accumulation pattern that all posterior inference shares.",
    ],
    limitations: [
      "Enumeration is exponential in the number of unobserved variables; variable elimination or sampling would be needed at scale.",
      "The independence assumptions are a modelling choice — real genetics includes effects this network deliberately excludes.",
    ],
    applications: [
      "Risk propagation through dependency graphs",
      "Factor-model thinking: conditionals, evidence, posteriors",
      "Bayesian updating in noisy measurement domains",
    ],
  },
  {
    num: "07",
    id: "crossword",
    name: "Crossword",
    theme: "Constraint Satisfaction & Backtracking",
    paradigm: "OPTIMIZATION",
    problem:
      "Generate crossword fillings: assign dictionary words to grid slots so that every slot length matches its word and every intersection shares the same letter.",
    objective:
      "Formalise the puzzle as a constraint satisfaction problem and solve it by constraint propagation plus heuristic-guided backtracking.",
    foundation:
      "CSP (X, D, C): variables are slots, domains are length-matched words, constraints enforce uniqueness and letter agreement at overlaps. AC-3 enforces arc consistency — arc (X,Y) is consistent when every x ∈ Dₓ has some supporting y ∈ Dʏ — and prunes domains until fixed point.",
    architecture: [
      "Constraint layer: enforce_node_consistency, ac3 (with revise), and neighbour/overlap bookkeeping.",
      "Backtracking search with MRV (fewest remaining values), degree heuristic (most unassigned overlaps) and least-constraining-value ordering, re-running AC-3 after each tentative assignment.",
    ],
    algorithms: ["Constraint satisfaction", "AC-3 arc consistency", "Backtracking", "MRV / degree / LCV heuristics"],
    tech: ["Python", "Set operations", "itertools"],
    implementation:
      "CrosswordCreator maintains per-variable domains, prunes them, then searches: pick the variable by MRV/degree, order its values by LCV, assign, propagate with AC-3, recurse, and undo on failure.",
    testing:
      "check50 validates generated crosswords against fixed structure/word-list pairs — every intersection consistent, no word reused.",
    results:
      "All check50 suites passed; the solver fills structures that plain backtracking alone could not finish in reasonable time.",
    challenges: [
      "Engineering the propagation/search interleave — running AC-3 after every assignment is what prunes doomed subtrees early.",
      "Correctly revising arcs in both directions and re-queuing affected neighbours after domain changes.",
    ],
    findings: [
      "Heuristics transform the search: choosing the most-constrained variable first makes most assignments self-evidently forced.",
      "Constraint propagation buys optimality of effort, not just speed — failed branches are removed before they are ever explored.",
    ],
    limitations: [
      "AC-3 enforces only arc consistency; some inconsistent assignments survive it and require search to reject.",
      "Backtracking remains exponential in the worst case — structure hardness dominates.",
    ],
    applications: [
      "Scheduling and rostering",
      "Resource assignment under pairwise constraints",
      "Configuration and layout problems",
    ],
  },
  {
    num: "08",
    id: "shopping",
    name: "Shopping",
    theme: "Supervised Machine Learning",
    paradigm: "LEARNING",
    problem:
      "Predict whether an e-commerce session ends in a purchase from session telemetry — page durations, bounce and exit rates, visitor type, month — on the Online Shoppers Purchasing Intention dataset.",
    objective:
      "Build an end-to-end supervised pipeline — feature engineering, training, cross-validated evaluation — and evaluate with metrics that stay honest under severe class imbalance.",
    foundation:
      "k-Nearest Neighbours over Euclidean distance in normalised feature space, with k = 1 for the assessment. Class imbalance (non-purchases vastly outnumber purchases) makes raw accuracy misleading, so sensitivity TP/(TP+FN) and specificity TN/(TN+FP) are the operative metrics.",
    architecture: [
      "Feature pipeline: month mapped to ordinal integers, VisitorType reduced to returning/non-returning, weekend and revenue mapped to booleans-as-integers.",
      "Training/evaluation split with the classifier fitted on training folds only.",
    ],
    algorithms: ["k-Nearest Neighbours (k = 1)", "Euclidean-distance classification", "Train/test evaluation"],
    tech: ["Python", "scikit-learn", "csv"],
    implementation:
      "The loader performs the categorical→numerical mappings exactly as specified, the model is trained on the labelled split, and evaluation reports sensitivity and specificity on held-out data.",
    testing:
      "check50 verifies the feature-engineering function and the trained model's evaluation metrics against defined thresholds.",
    results:
      "All check50 suites passed. The repository's evaluation describes the trade-off: specificity around 90% (correctly clearing non-purchases) with actionable sensitivity around 40–50% on high-intent sessions despite the imbalance.",
    challenges: [
      "Class imbalance: a trivial all-negative classifier scores ~85% accuracy while detecting zero purchases — accuracy had to be rejected as a headline metric.",
      "Feature scaling: with mixed-magnitude features, Euclidean distance is dominated by the largest-scale column unless normalised.",
    ],
    findings: [
      "Metric selection is a modelling decision: sensitivity/specificity expose what accuracy hides.",
      "Nearest-neighbour learning is transparent — every prediction traces to actual training examples, which makes failure analysis straightforward.",
    ],
    limitations: [
      "k = 1 is sensitive to noise; larger k with distance weighting would smooth the boundary.",
      "Instance-based memory grows linearly with the dataset, and inference cost scales with the training set size.",
    ],
    applications: [
      "Intent and conversion modelling",
      "Any imbalanced binary classification — fraud-style flagging, anomaly triage",
      "Baseline modelling before committing to heavier learners",
    ],
  },
  {
    num: "09",
    id: "nim",
    name: "Nim",
    theme: "Reinforcement Learning & Q-Learning",
    paradigm: "LEARNING",
    problem:
      "Learn to play Nim optimally — remove objects from piles, whoever takes the last object loses — without being given any strategy: no Nim-sum arithmetic, no minimax, only the game rules and a reward signal.",
    objective:
      "Implement model-free temporal-difference Q-learning so the agent's policy is learned purely through 10,000 self-play episodes.",
    foundation:
      "The Bellman TD update Q(s,a) ← Q(s,a) + α[r + γ·max Q(s′,a′) − Q(s,a)] with α = 0.5 and γ = 1.0 (episodic). Rewards: +1 for the move that wins, −1 for the move that loses, 0 otherwise. ε-greedy selection balances exploration against exploitation during play.",
    architecture: [
      "Tabular Q-function over states (pile tuples) and actions (pile, count) pairs.",
      "Two player objects per episode alternate moves; each updates the Q-values of the moves it played as outcomes resolve.",
      "Evaluation sets ε = 0 for deterministic greedy play.",
    ],
    algorithms: ["Q-learning", "Temporal-difference learning", "ε-greedy action selection"],
    tech: ["Python", "random"],
    implementation:
      "During training each player records its (state, action) sequence and applies the TD update as the next state reveals itself, so credit propagates backwards from terminal wins and losses through the episode.",
    testing:
      "check50 plays the trained agent against reference opponents and verifies the Q-table has learned non-trivial values for reachable states.",
    results:
      "All check50 suites passed. Q-values propagate from terminal outcomes back to opening moves, and the agent converges to game-theoretic equilibrium without any hardcoded Nim arithmetic.",
    challenges: [
      "Exploration discipline: with ε too low the agent settles on untested moves; too high and it never consolidates what it proved.",
      "Assigning credit to the moves that caused a terminal outcome several turns earlier — the TD mechanism, not an explicit backward pass.",
    ],
    findings: [
      "Reward structure is a design surface: moving the −1 penalty from “losing the game” to “making the losing move” changes what convergence means.",
      "Self-play is a complete teacher for adversarial games with enumerable states — no expert demonstrations required.",
    ],
    limitations: [
      "Tabular Q-learning scales badly: state–action tables explode combinatorially outside small games.",
      "Convergence depends on sufficient exploration of the state space; rarely visited states retain unreliable values.",
    ],
    applications: [
      "Sequential decision optimisation",
      "Learning policies for games whose closed-form strategy is unknown or expensive to derive",
      "Foundations for deep RL (DQN-style value learning)",
    ],
  },
  {
    num: "10",
    id: "traffic",
    name: "Traffic",
    theme: "Computer Vision & CNNs",
    paradigm: "LEARNING",
    problem:
      "Classify German Traffic Sign Recognition Benchmark (GTSRB) images — thousands of colour photographs across 43 sign categories — into the correct category under varied lighting and conditions.",
    objective:
      "Design, train and validate a deep convolutional neural network in TensorFlow/Keras, including the full image pre-processing pipeline in OpenCV.",
    foundation:
      "2D convolution S(i,j) = (X∗W)(i,j) + b with ReLU non-linearity, max-pooling for translation invariance, dropout regularisation, and softmax cross-entropy over 43 classes.",
    architecture: [
      "Input 30×30×3 → Conv2D (32 filters, 3×3, ReLU) → MaxPooling 2×2 → Conv2D (64 filters, 3×3, ReLU) → MaxPooling 2×2 → Flatten → Dense 128 (ReLU) → Dropout 0.5 → Dense 43 (softmax).",
      "Pre-processing: cv2.imread → cv2.resize to 30×30 → intensity normalisation to [0,1] → one-hot labels.",
    ],
    algorithms: ["Convolutional neural networks", "Softmax cross-entropy", "Dropout regularisation", "Adam optimisation (η = 0.001)"],
    tech: ["Python", "TensorFlow / Keras", "OpenCV (cv2)", "NumPy", "sklearn"],
    implementation:
      "The loader walks 43 class directories, standardises every image, and one-hot encodes labels; the model is compiled with Adam and trained on the standardised tensors.",
    testing:
      "check50 verifies the loading pipeline, model structure and that held-out evaluation meets the defined accuracy threshold.",
    results:
      "All check50 suites passed; the project's documented evaluation reports test accuracy above 95% on unseen splits.",
    challenges: [
      "Overfitting control on a benchmark with per-class variability — dropout at 0.5 breaks neuron co-adaptation during training.",
      "Pre-processing consistency: mixed original resolutions must become one canonical tensor shape before training.",
    ],
    findings: [
      "Feature hierarchy is empirical: two convolution/pooling stages followed by a dense layer suffice for 43-way sign discrimination at small input scale.",
      "Normalisation is not cosmetic — unscaled intensities destabilise Adam's effective step sizes in practice.",
    ],
    limitations: [
      "Input is fixed at 30×30; fine detail is discarded before the network ever sees it.",
      "Performance is benchmark-bound; domain shift (weather, wear, camera) would need augmentation and retraining.",
    ],
    applications: [
      "Visual inspection and classification pipelines",
      "Perception modules for robotics and automation",
      "Document and symbol recognition at scale",
    ],
  },
  {
    num: "11",
    id: "parser",
    name: "Parser",
    theme: "Context-Free Grammars & NLP",
    paradigm: "LANGUAGE",
    problem:
      "Extract every noun phrase from natural-language sentences — first cleaning and tokenising raw text, then parsing it with a hand-built context-free grammar.",
    objective:
      "Write a CFG covering realistic sentence structure, parse sentences into hierarchical trees with NLTK, and extract minimal NP chunks by tree traversal.",
    foundation:
      "A CFG G = (V, Σ, R, S) with productions for sentence structure (S → NP VP | S Conj S | S Conj VP), recursive noun and verb phrases, prepositional and adjective-phrase attachment. An NP chunk is any NP subtree containing no other NP — the minimal, flat noun phrase.",
    architecture: [
      "Pre-processing pipeline: lowercase → nltk.word_tokenize → filter to alphabetic tokens only.",
      "Grammar definition over the pre-terminal categories (Det, N, V, P, Adj, Adv, Conj).",
      "np_chunk: traverses parse-tree subtrees and yields minimal NPs.",
    ],
    algorithms: ["Context-free grammar parsing", "Recursive-descent over CFGs (NLTK)", "Tree traversal for chunk extraction"],
    tech: ["Python", "NLTK (word_tokenize, CFG, chart parsing)"],
    implementation:
      "The grammar composes NP from determiners, adjective phrases and post-modifying PPs; VP from transitive/intransitive verbs, objects, PPs and adverbs — with recursion (AP → Adj | Adj AP) handling stacked modifiers such as “the small red house”.",
    testing:
      "check50 compares extracted chunks against gold NP sets for fixed sentences.",
    results:
      "All check50 suites passed — every minimal noun phrase extracted correctly, including ones inside recursive structures.",
    challenges: [
      "Grammar coverage versus ambiguity: every added production multiplies the parse paths the parser must weigh.",
      "Chunk definition precision — NPs nested inside larger NPs must be excluded by construction, not by post-filtering.",
    ],
    findings: [
      "Pre-processing is load-bearing: punctuation leaking into the token stream breaks production matching silently.",
      "Minimal-chunk extraction isolates the entities a downstream system actually needs — the parse tree is the medium, not the goal.",
    ],
    limitations: [
      "A hand-written CFG covers only the sentences its productions admit; out-of-grammar input fails to parse.",
      "Purely syntactic: no semantics, no disambiguation by meaning.",
    ],
    applications: [
      "Entity and phrase extraction",
      "Syntactic pre-processing for NLP pipelines",
      "Structured information extraction from text",
    ],
  },
  {
    num: "12",
    id: "attention",
    name: "Attention",
    theme: "Transformer Attention Mechanisms",
    paradigm: "LANGUAGE",
    problem:
      "Work inside a pre-trained bidirectional transformer (BERT): predict masked words in sentences (the Cloze/MLM task) and visualise how individual attention heads distribute focus across tokens.",
    objective:
      "Interface with a production transformer — tokenisation, mask-index location, logit prediction — and render per-layer, per-head attention heatmaps to expose what heads actually learn.",
    foundation:
      "Scaled dot-product self-attention: Attention(Q,K,V) = softmax(QKᵀ/√dₖ)·V, with attention weights Aᵢⱼ = exp(qᵢ·kⱼ/√dₖ)/Σₗ exp(qᵢ·kₗ/√dₖ). WordPiece tokenisation brackets each input with [CLS] and [SEP].",
    architecture: [
      "Mask pipeline: tokenize → get_mask_token_index locates  in the input IDs → model logits at that index → top-K vocabulary candidates.",
      "Visualisation pipeline: get_color_for_attention_score maps Aᵢⱼ ∈ [0,1] to grayscale (round(score × 255)); visualize_attentions draws an N×N token grid for every layer and head.",
    ],
    algorithms: ["Masked language modelling", "Scaled dot-product self-attention", "Attention-head visualisation"],
    tech: ["Python", "PyTorch", "Hugging Face Transformers (BERT)", "PIL"],
    implementation:
      "For each layer and head the code extracts the attention tensor, renders the token-to-token matrix in grayscale, and composites the diagrams — making lexical alignment, syntax resolution and coreference patterns directly observable.",
    testing:
      "check50 verifies mask-index detection, candidate predictions against expected answers, and generated attention diagrams against reference structure.",
    results:
      "All check50 suites passed — e.g. “We turned on the  because it was dark.” yields plausible illumination candidates (light, lamp, lantern) with diagrams showing heads specialising in different token relationships.",
    challenges: [
      "Aligning WordPiece token indices with original sentence positions when locating the mask.",
      "Reading N×N attention matrices correctly: rows are query tokens, columns are attended keys — transposing the meaning inverts the analysis.",
    ],
    findings: [
      "Individual heads specialise: some track immediate neighbours (local syntax), some verb–object dependencies, some coreference links, and some attend universally to delimiter tokens.",
      "Bidirectional context is what makes the Cloze task solvable — both left and right of the mask contribute evidence.",
    ],
    limitations: [
      "The model is fixed and pre-trained — no fine-tuning, so predictions are bounded by the original training distribution.",
      "Attention weights indicate where the model looks, not a guaranteed causal explanation of its output.",
    ],
    applications: [
      "Interpretability analysis of transformer models",
      "Relevance and ranking systems built on transformer representations",
      "Any modern NLP system — attention is the mechanism underneath",
    ],
  },
];

/* ------------------------------------------------------------------ */

const SKILLS = [
  "Python Engineering",
  "Algorithm Design & Analysis",
  "Graph Search",
  "Adversarial Search",
  "Propositional Logic",
  "Knowledge Representation",
  "Probabilistic Reasoning",
  "Bayesian Inference",
  "Constraint Satisfaction",
  "Supervised Learning",
  "Reinforcement Learning",
  "Neural Networks",
  "Computer Vision",
  "Natural Language Processing",
  "Transformer Architectures",
];

const QUANT_RELEVANCE = [
  {
    area: "Probabilistic modelling → risk and factor thinking",
    detail:
      "PageRank's Markov chains and Heredity's Bayesian networks are the same mathematics used to reason about regime persistence and conditional dependence in market data — conditioning on evidence, propagating uncertainty, normalising posteriors.",
  },
  {
    area: "Search and optimization → algorithmic research",
    detail:
      "BFS optimality guarantees, CSP propagation and backtracking heuristics are the working patterns behind parameter search, scheduling and any constrained allocation problem.",
  },
  {
    area: "Reinforcement learning → sequential decision processes",
    detail:
      "Nim's Q-learning — states, actions, rewards, temporal-difference credit assignment — is the formal skeleton of sequential decision research, from policy learning to process optimisation.",
  },
  {
    area: "Machine learning → intelligent systems",
    detail:
      "Supervised evaluation under class imbalance (Shopping), CNN pipelines (Traffic) and transformer interpretability (Attention) cover the modelling-and-validation loop that any applied AI system must pass.",
  },
];

const WORKSAMPLES = [
  {
    src: "/works/cs50-ai/assets/paradigms-map.svg",
    title: "Curriculum Architecture Map",
    type: "ARCHITECTURE",
    caption:
      "The twelve projects organised into six paradigms — search, knowledge, uncertainty, optimization, learning and language — as documented in the repository.",
  },
  {
    src: "/works/cs50-ai/assets/bfs-graph-search.svg",
    title: "Degrees — BFS on the IMDb Graph",
    type: "ALGORITHM VISUALIZATION",
    caption:
      "Bipartite actor–movie graph with the FIFO frontier's solution path highlighted; complexity and engineering notes from PROJECTS/degrees.md.",
  },
  {
    src: "/works/cs50-ai/assets/minimax-alphabeta.svg",
    title: "Tic-Tac-Toe — Minimax with α/β Pruning",
    type: "ALGORITHM VISUALIZATION",
    caption:
      "Game-tree search showing utilities (+1 / −1 / 0), a pruned branch at α ≥ β, and the 362,880 → ~30,000 evaluation reduction analysed in the repository.",
  },
  {
    src: "/works/cs50-ai/assets/bayesian-network-heredity.svg",
    title: "Heredity — Bayesian Network",
    type: "ARCHITECTURE",
    caption:
      "The gene–trait DAG with the transmission model (μ = 0.01) and joint factorisation implemented for posterior inference.",
  },
  {
    src: "/works/cs50-ai/assets/csp-crossword-ac3.svg",
    title: "Crossword — CSP & AC-3",
    type: "ALGORITHM VISUALIZATION",
    caption:
      "Overlap constraints at grid intersections, the AC-3 revision loop, and the MRV / degree / LCV backtracking heuristics.",
  },
  {
    src: "/works/cs50-ai/assets/qlearning-loop.svg",
    title: "Nim — Q-Learning Loop",
    type: "ALGORITHM VISUALIZATION",
    caption:
      "The temporal-difference update cycle and ε-greedy selection that let the agent learn optimal play from reward alone.",
  },
  {
    src: "/works/cs50-ai/assets/cnn-traffic-architecture.svg",
    title: "Traffic — CNN Pipeline",
    type: "ARCHITECTURE",
    caption:
      "The GTSRB classification pipeline: OpenCV pre-processing, two conv/pool stages, dense head with dropout, softmax over 43 classes.",
  },
  {
    src: "/works/cs50-ai/assets/attention-head-heatmap.svg",
    title: "Attention — Head Patterns",
    type: "VISUALIZATION",
    caption:
      "A head-level attention matrix in the grayscale rendering the project generates, with the head specialisations the visualisation exposes.",
  },
  {
    src: "/works/cs50-ai/assets/verification-12of12.svg",
    title: "Testing Evidence — 12/12 Suites",
    type: "TESTING EVIDENCE",
    caption:
      "Per-project verification record: every assignment graded by Harvard's automated check50 harness and submitted via submit50.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LearningResource",
      name: "Harvard CS50 AI — Twelve Applied Artificial Intelligence Projects",
      description:
        "Applied AI engineering case study covering search algorithms, knowledge representation, probabilistic reasoning, optimization, machine learning, reinforcement learning, neural networks and natural language processing.",
      url: `${site.url}/builds/projects/cs50-ai`,
      inLanguage: "en",
      about: "Artificial Intelligence",
      teaches: SKILLS.join(", "),
      author: { "@id": `${site.url}/#person` },
      provider: {
        "@type": "Organization",
        name: "CS50, Harvard University",
      },
    },
    {
      "@type": "ItemList",
      name: "Twelve CS50 AI Projects",
      itemListElement: PROJECTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${p.name} — ${p.theme}`,
        url: `${site.url}/builds/projects/cs50-ai#${p.id}`,
      })),
    },
  ],
};

export default function CS50AICaseStudy() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---- hero ---- */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <PageAtmosphere variant="schematic" />
        <MarketDepth />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label-mono text-signal">
                BUILDS / PROJECTS / <span className="text-foreground">CASE STUDY</span>
              </p>
              <p className="label-mono text-faint">APPLIED ARTIFICIAL INTELLIGENCE ENGINEERING</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <KineticText
              className="display mt-8 text-[clamp(2.4rem,7.5vw,6rem)]"
              ariaLabel="Harvard CS50 AI — Twelve Applied AI Projects"
            >
              TWELVE AI SYSTEMS. ONE STANDARD.
            </KineticText>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
              Harvard CS50&apos;s <strong className="text-foreground">Introduction to Artificial Intelligence with Python</strong> —
              twelve applied projects spanning search algorithms, knowledge representation, probabilistic
              reasoning, optimization, machine learning, reinforcement learning, neural networks and
              natural language processing. Every project was implemented from problem formulation through
              validation, and every one passed Harvard&apos;s automated check50 verification.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {[
                "12/12 PROJECTS COMPLETE",
                "CS50 · HARVARD UNIVERSITY",
                "COMPLETED NOVEMBER 11, 2026",
                "NOT A HARVARD DEGREE — PROFESSIONAL CERTIFICATE",
              ].map((badge) => (
                <span
                  key={badge}
                  className="label-mono border border-line-strong px-3 py-1.5 text-[10px] text-muted"
                >
                  {badge}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={CERTIFICATE}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono border border-signal bg-signal/10 px-6 py-3 text-signal transition-colors hover:bg-signal/20"
              >
                VERIFY CERTIFICATE AT HARVARD →
              </a>
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                GITHUB REPOSITORY →
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        {/* ---- executive summary ---- */}
        <section id="summary" aria-labelledby="summary-heading" className="scroll-mt-28 border-b border-line py-16 md:py-20">
          <Reveal>
            <p className="label-mono text-signal">EXECUTIVE SUMMARY</p>
            <h2 id="summary-heading" className="display mt-4 text-3xl md:text-4xl">
              AN ENGINEERING BODY OF WORK, NOT A COURSE RECORD
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            <Reveal delay={60}>
              <p className="max-w-xl text-base leading-relaxed text-muted">
                This case study documents twelve complete artificial intelligence systems built for
                Harvard CS50&apos;s graduate-level AI curriculum. Each project formulates a problem
                precisely, implements the algorithm from its mathematical foundation, and validates
                the result through Harvard&apos;s automated grading harness — the same
                hypothesis → implementation → verification loop used in professional research
                engineering.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-xl text-base leading-relaxed text-muted">
                The span is deliberate. Explicit reasoning (search, logic, constraints), probabilistic
                reasoning (Markov chains, Bayesian networks), statistical learning (supervised
                classification, reinforcement learning, deep neural networks) and language (grammars,
                transformers) together cover the intellectual toolkit of modern AI engineering —
                from classical symbol manipulation to the attention mechanisms behind current
                language models.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-1">
                {[
                  ["12/12", "PROJECTS VERIFIED BY check50"],
                  ["6", "AI PARADIGMS COVERED"],
                  ["11", "TECHNOLOGY DOMAINS — NUMPY TO TRANSFORMERS"],
                  ["0", "SOLUTION CODE PUBLISHED — INTEGRITY POLICY HELD"],
                ].map(([v, l]) => (
                  <div key={l} className="bg-background p-5">
                    <p className="display text-2xl text-foreground md:text-3xl">{v}</p>
                    <p className="label-mono mt-2 text-[10px] leading-relaxed text-faint">{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- project overview ---- */}
        <section id="overview" aria-labelledby="overview-heading" className="scroll-mt-28 border-b border-line py-16 md:py-20">
          <Reveal>
            <p className="label-mono text-signal">PROJECT OVERVIEW</p>
            <h2 id="overview-heading" className="display mt-4 text-3xl md:text-4xl">
              THE PROGRAMME AND ITS ARCHITECTURE
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <Reveal delay={60}>
              <div className="space-y-6 text-base leading-relaxed text-muted">
                <p>
                  CS50AI is Harvard&apos;s graduate-level introduction to the core ideas of artificial
                  intelligence, taught with Python and assessed entirely through programming projects.
                  The curriculum moves through six paradigms: <strong className="text-foreground">search</strong> (exploring
                  state spaces), <strong className="text-foreground">knowledge</strong> (representing facts and deriving
                  consequences), <strong className="text-foreground">uncertainty</strong> (reasoning probabilistically),{" "}
                  <strong className="text-foreground">optimization</strong> (satisfying constraints efficiently),{" "}
                  <strong className="text-foreground">learning</strong> (improving from data and experience) and{" "}
                  <strong className="text-foreground">language</strong> (structure and meaning in natural text).
                </p>
                <p>
                  Each of the twelve projects below maps onto one or two of these paradigms and ships
                  as a working system, not an exercise fragment: a search agent that answers queries
                  over real IMDb data, a logic engine that solves puzzles mechanically, a rank
                  estimator with two independent implementations that must agree, a learning agent
                  that masters a game from nothing but rules and reward.
                </p>
                <p className="label-mono text-xs text-faint">
                  FULL THEORETICAL REFERENCE: DOCUMENTATION/ALGORITHMS-REFERENCE.MD IN THE REPOSITORY
                </p>
              </div>
            </Reveal>
            <Reveal delay={140} focus>
              <figure className="m-0">
                <div className="viz-frame p-4 sm:p-6">
                  <Image
                    src="/works/cs50-ai/assets/paradigms-map.svg"
                    alt="Architecture map of the twelve CS50 AI projects organised into six paradigms"
                    width={960}
                    height={540}
                    unoptimized
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="label-mono mt-4 text-[10px] text-faint">
                  FIG. 1 — CURRICULUM ARCHITECTURE: TWELVE PROJECTS · SIX PARADIGMS
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ---- twelve-project index ---- */}
        <section id="index" aria-labelledby="index-heading" className="scroll-mt-28 border-b border-line py-16 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="label-mono text-signal">PROJECT INDEX</p>
                <h2 id="index-heading" className="display mt-4 text-3xl md:text-4xl">
                  TWELVE-PROJECT INDEX
                </h2>
              </div>
              <p className="label-mono text-faint">SELECT A PROJECT FOR ITS TECHNICAL DEEP DIVE</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 60}>
                <a
                  href={`#${p.id}`}
                  className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="num-mono text-xs text-faint">{p.num}</span>
                    <span className="label-mono text-[9px] text-faint">{p.paradigm}</span>
                  </div>
                  <p className="display mt-4 text-lg text-foreground group-hover:text-signal">{p.name}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.theme}</p>
                  <p className="label-mono mt-4 text-[9px] text-faint transition-transform duration-300 group-hover:translate-x-1">
                    DEEP DIVE →
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- technical deep dives ---- */}
        <section id="deep-dives" aria-labelledby="deep-dives-heading" className="scroll-mt-28 border-b border-line py-16 md:py-20">
          <Reveal>
            <p className="label-mono text-signal">TECHNICAL DEEP DIVES</p>
            <h2 id="deep-dives-heading" className="display mt-4 text-3xl md:text-4xl">
              TWELVE CASE STUDIES
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              Each project documented from problem statement to limitations. Every implementation
              detail and result below is grounded in the project&apos;s published technical
              documentation — nothing is asserted beyond the evidence.
            </p>
          </Reveal>

          <div className="mt-14 space-y-16">
            {PROJECTS.map((p) => (
              <article
                key={p.id}
                id={p.id}
                aria-labelledby={`${p.id}-heading`}
                className="scroll-mt-28 border border-line bg-background/50"
              >
                <Reveal>
                  <div className="border-b border-line p-6 md:p-8">
                    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                      <span className="num-mono text-sm text-faint">PROJECT {p.num}</span>
                      <span className="label-mono border border-line-strong px-2 py-1 text-[9px] text-muted">
                        {p.paradigm}
                      </span>
                    </div>
                    <h3 id={`${p.id}-heading`} className="display mt-4 text-2xl md:text-3xl">
                      {p.name} <span className="text-muted">— {p.theme}</span>
                    </h3>
                  </div>

                  <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
                    <div>
                      <p className="label-mono text-faint">PROBLEM STATEMENT</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{p.problem}</p>
                    </div>
                    <div>
                      <p className="label-mono text-faint">ENGINEERING OBJECTIVE</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{p.objective}</p>
                    </div>
                    <div>
                      <p className="label-mono text-faint">MATHEMATICAL / ALGORITHMIC FOUNDATION</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{p.foundation}</p>
                    </div>
                    <div>
                      <p className="label-mono text-faint">SYSTEM ARCHITECTURE</p>
                      <ul className="mt-3 space-y-2">
                        {p.architecture.map((a) => (
                          <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted">
                            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="label-mono text-faint">ALGORITHMS</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.algorithms.map((a) => (
                          <span key={a} className="label-mono border border-line px-2.5 py-1 text-[10px] text-muted">
                            {a}
                          </span>
                        ))}
                      </div>
                      <p className="label-mono mt-6 text-faint">TECHNOLOGIES &amp; DEPENDENCIES</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                          <span key={t} className="label-mono border border-line px-2.5 py-1 text-[10px] text-faint">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="label-mono text-faint">IMPLEMENTATION OVERVIEW</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{p.implementation}</p>
                    </div>
                    <div>
                      <p className="label-mono text-faint">TESTING &amp; VALIDATION</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{p.testing}</p>
                    </div>
                    <div>
                      <p className="label-mono text-faint">VERIFIED RESULTS</p>
                      <p className="mt-3 text-sm leading-relaxed text-foreground">{p.results}</p>
                    </div>

                    <div className="md:col-span-2">
                      <div className="grid gap-8 md:grid-cols-3">
                        <div>
                          <p className="label-mono text-faint">ENGINEERING CHALLENGES</p>
                          <ul className="mt-3 space-y-2">
                            {p.challenges.map((c) => (
                              <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted">
                                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="label-mono text-faint">RESEARCH FINDINGS</p>
                          <ul className="mt-3 space-y-2">
                            {p.findings.map((f) => (
                              <li key={f} className="flex gap-3 text-sm leading-relaxed text-muted">
                                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-research" aria-hidden="true" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="label-mono text-faint">LIMITATIONS</p>
                          <ul className="mt-3 space-y-2">
                            {p.limitations.map((l) => (
                              <li key={l} className="flex gap-3 text-sm leading-relaxed text-muted">
                                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-faint" aria-hidden="true" />
                                {l}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-line pt-5 md:col-span-2">
                      <p className="label-mono text-faint">REAL-WORLD APPLICATIONS</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.applications.map((a) => (
                          <span
                            key={a}
                            className="label-mono border border-line px-2.5 py-1 text-[10px] text-muted"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                      <a
                        href={`${REPO}/blob/main/PROJECTS/${p.name.toLowerCase()}.md`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link mt-5 inline-block"
                      >
                        <span className="label-mono text-research transition-transform duration-300 group-hover/link:translate-x-1">
                          FULL PROJECT DOCUMENTATION IN REPOSITORY →
                        </span>
                      </a>
                    </div>
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
        </section>

        {/* ---- algorithms & mathematical foundations ---- */}
        <section id="foundations" aria-labelledby="foundations-heading" className="scroll-mt-28 border-b border-line py-16 md:py-20">
          <Reveal>
            <p className="label-mono text-signal">FOUNDATIONS</p>
            <h2 id="foundations-heading" className="display mt-4 text-3xl md:text-4xl">
              ALGORITHMS &amp; MATHEMATICAL FOUNDATIONS
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              The curriculum&apos;s through-line: every system above is an implementation of a
              mathematical structure with a known correctness argument.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["GRAPH THEORY", "BFS optimality on unweighted graphs; O(b^d) time and space; frontier and explored-set mechanics."],
              ["GAME THEORY & DECISION RULES", "Minimax optimality in zero-sum perfect-information games; α/β bounds and the b → √b reduction."],
              ["PROPOSITIONAL LOGIC", "Entailment as model-space inclusion; sound and complete model checking over 2^n assignments."],
              ["MARKOV PROCESSES", "Ergodicity via damping; Perron–Frobenius uniqueness of the stationary distribution; fixed-point iteration."],
              ["BAYESIAN PROBABILITY", "Chain-rule factorisation of joint distributions; inference by enumeration; partition-function normalisation."],
              ["CONSTRAINT SYSTEMS", "Node and arc consistency (AC-3); MRV, degree and LCV ordering; interleaved inference in backtracking."],
              ["STATISTICAL LEARNING", "Nearest-neighbour decision boundaries; sensitivity/specificity under class imbalance."],
              ["REINFORCEMENT LEARNING", "Bellman temporal-difference updates; ε-greedy exploration; credit assignment in episodic play."],
              ["DEEP LEARNING", "2D convolution, ReLU, max-pooling, dropout, softmax cross-entropy, Adam optimisation."],
              ["FORMAL LANGUAGE THEORY", "Context-free grammars as 4-tuples; parse-tree recursion; minimal chunk extraction."],
              ["TRANSFORMER MECHANICS", "Scaled dot-product attention softmax(QKᵀ/√dₖ)V; multi-head specialisation; WordPiece tokenisation."],
            ].map(([t, d]) => (
              <Reveal key={t}>
                <div className="h-full bg-background p-6">
                  <p className="label-mono text-[10px] text-signal">{t}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- engineering workflow & validation ---- */}
        <section id="workflow" aria-labelledby="workflow-heading" className="scroll-mt-28 border-b border-line py-16 md:py-20">
          <Reveal>
            <p className="label-mono text-signal">ENGINEERING WORKFLOW</p>
            <h2 id="workflow-heading" className="display mt-4 text-3xl md:text-4xl">
              HOW EVERY PROJECT WAS BUILT AND PROVEN
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <Reveal delay={60}>
              <ol className="space-y-6">
                {[
                  ["01", "FORMULATE", "Reduce the problem to its formal skeleton: state space, constraints, probability model, or grammar — before any code."],
                  ["02", "IMPLEMENT", "Build the system from its mathematical foundation, keeping the specification layer separable from the algorithm layer."],
                  ["03", "VALIDATE", "Run Harvard's check50 harness — automated assertions over defined behaviour, from answer correctness to adversarial optimality."],
                  ["04", "SUBMIT", "Submit through submit50, Harvard's git-based submission engine, against the assignment deadline."],
                  ["05", "DOCUMENT", "Publish conceptual write-ups — formulations, architecture, complexity bounds — while keeping solution code out of the repository."],
                ].map(([n, t, d]) => (
                  <li key={n} className="flex gap-5">
                    <span className="num-mono text-sm text-faint">{n}</span>
                    <div>
                      <p className="label-mono text-foreground">{t}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={140}>
              <div className="space-y-6">
                <div className="border border-line p-6">
                  <p className="label-mono text-signal">VALIDATION METHODOLOGY</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    check50 is an independent grading harness: it executes the submitted system
                    against fixed inputs and behavioural assertions and reports pass/fail per test
                    suite. It is not a linter and not a style checker — it verifies behaviour.
                    Each project&apos;s certificate rests on every suite passing, and the
                    repository&apos;s verification log records the 12/12 outcome per project.
                  </p>
                </div>
                <div className="border border-line p-6">
                  <p className="label-mono text-research">ACADEMIC INTEGRITY — WHAT IS AND IS NOT PUBLISHED</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    Harvard&apos;s academic honesty policy prohibits distributing solution code to
                    current or future students. Accordingly, the repository publishes only the
                    layer this case study mirrors: conceptual documentation, mathematical
                    formulations, architecture descriptions and verification records. Student
                    implementation files, datasets and model weights are excluded by design.
                    This page links to the public repository only — no restricted assessment
                    source code is reproduced here.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- results & limitations ---- */}
        <section id="results" aria-labelledby="results-heading" className="scroll-mt-28 border-b border-line py-16 md:py-20">
          <Reveal>
            <p className="label-mono text-signal">RESULTS &amp; LIMITATIONS</p>
            <h2 id="results-heading" className="display mt-4 text-3xl md:text-4xl">
              WHAT THE EVIDENCE SUPPORTS — AND WHAT IT DOES NOT
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <Reveal delay={60}>
              <div className="border border-line p-6 md:p-8">
                <p className="label-mono text-signal">VERIFIED OUTCOMES</p>
                <ul className="mt-6 space-y-4">
                  {[
                    "All twelve projects completed and passed every check50 test suite — the verification log in the repository records the 12/12 outcome per project.",
                    "The Tic-Tac-Toe agent is provably unbeatable: minimax with alpha-beta pruning guarantees at least a draw against any adversary.",
                    "Both PageRank estimators — Monte Carlo sampling and iterative fixed-point — converge to consistent distributions, as the shared transition model requires.",
                    "The Traffic CNN exceeds 95% test accuracy on held-out GTSRB splits, per the project's documented evaluation.",
                    "The Nim agent converges to game-theoretic equilibrium through self-play alone, with no rules beyond the reward signal.",
                    "The official CS50 certificate was issued November 11, 2026, and is independently verifiable at Harvard's certificate portal.",
                  ].map((r) => (
                    <li key={r} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="border border-line p-6 md:p-8">
                <p className="label-mono text-faint">HONEST LIMITATIONS</p>
                <ul className="mt-6 space-y-4">
                  {[
                    "These are curriculum systems: correctness and clarity were the objective, not production throughput or deployment hardening.",
                    "Tabular methods (Q-learning in Nim, enumeration in Heredity, model checking in Knights) are pedagogically exact but scale exponentially — the documented limitation of each.",
                    "The Traffic CNN operates on 30×30 fixed-resolution inputs and a benchmark distribution; real-world sign recognition would require augmentation and domain adaptation.",
                    "The Shopping evaluation reports the sensitivity/specificity trade-off of a k = 1 classifier; it is a metric-foundation exercise, not a production intent model.",
                    "The published documentation is conceptual: it describes formulations, architecture and verification, not proprietary solution code — by design, per Harvard's honesty policy.",
                  ].map((l) => (
                    <li key={l} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-faint" aria-hidden="true" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- worksamples ---- */}
        <section id="worksamples" aria-labelledby="worksamples-heading" className="scroll-mt-28 border-b border-line py-16 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="label-mono text-signal">WORKSAMPLES</p>
                <h2 id="worksamples-heading" className="display mt-4 text-3xl md:text-4xl">
                  TECHNICAL EVIDENCE GALLERY
                </h2>
              </div>
              <p className="label-mono text-faint">
                DIAGRAMS GENERATED FROM THE REPOSITORY&apos;S DOCUMENTATION · NO RESTRICTED CODE REPRODUCED
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {WORKSAMPLES.map((w, i) => (
              <Reveal key={w.src} delay={(i % 2) * 80} focus>
                <figure className="m-0">
                  <div className="viz-frame p-4 sm:p-6">
                    <Image
                      src={w.src}
                      alt={w.caption}
                      width={960}
                      height={w.src.includes("verification") ? 560 : 540}
                      unoptimized
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="label-mono text-foreground">{w.title}</p>
                      <span className="label-mono border border-line px-2 py-0.5 text-[9px] text-faint">{w.type}</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{w.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
              <a href={REPO_DOCS.algorithms} target="_blank" rel="noopener noreferrer" className="group/link">
                <span className="label-mono text-research transition-transform duration-300 group-hover/link:translate-x-1">
                  ALGORITHMS REFERENCE →
                </span>
              </a>
              <a href={REPO_DOCS.overview} target="_blank" rel="noopener noreferrer" className="group/link">
                <span className="label-mono text-research transition-transform duration-300 group-hover/link:translate-x-1">
                  TECHNICAL OVERVIEW →
                </span>
              </a>
              <a href={REPO_DOCS.outcomes} target="_blank" rel="noopener noreferrer" className="group/link">
                <span className="label-mono text-research transition-transform duration-300 group-hover/link:translate-x-1">
                  LEARNING OUTCOMES →
                </span>
              </a>
              <a href={REPO_DOCS.integrity} target="_blank" rel="noopener noreferrer" className="group/link">
                <span className="label-mono text-research transition-transform duration-300 group-hover/link:translate-x-1">
                  ACADEMIC INTEGRITY DECLARATION →
                </span>
              </a>
            </div>
          </Reveal>
        </section>

        {/* ---- skills + career positioning ---- */}
        <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-28 border-b border-line py-16 md:py-20">
          <Reveal>
            <p className="label-mono text-signal">CAPABILITIES</p>
            <h2 id="skills-heading" className="display mt-4 text-3xl md:text-4xl">
              TECHNICAL SKILLS DEMONSTRATED
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <span key={s} className="label-mono border border-line px-3 py-1.5 text-[10px] text-muted">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-12 border border-line p-6 md:p-8">
              <p className="label-mono text-signal">
                RELEVANCE TO CN2&apos;S POSITIONING — QUANTITATIVE DEVELOPER · FINANCIAL SYSTEMS &amp; AI ENGINEERING
              </p>
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                {QUANT_RELEVANCE.map((q) => (
                  <div key={q.area}>
                    <p className="text-sm font-semibold text-foreground">{q.area}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{q.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 border-t border-line pt-5 text-xs leading-relaxed text-faint">
                Scope note: these projects are applied AI engineering artefacts — search, inference,
                learning and language systems. They are not financial trading systems, and this page
                does not claim they are. The relevance is the transferable engineering: the
                mathematics, the validation discipline and the systems habit.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ---- CTAs ---- */}
        <section id="cta" aria-label="Continue" className="pt-16 md:pt-20">
          <Reveal>
            <div className="grid gap-px border border-line bg-line md:grid-cols-2">
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-background p-8 transition-colors hover:bg-surface md:p-10"
              >
                <p className="label-mono text-signal">GITHUB REPOSITORY</p>
                <p className="display mt-4 text-2xl text-foreground md:text-3xl">
                  READ THE FULL TECHNICAL DOCUMENTATION
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Twelve project write-ups, the algorithms reference, technical overview, learning
                  outcomes and the academic-integrity declaration.
                </p>
                <p className="label-mono mt-6 text-signal transition-transform duration-300 group-hover:translate-x-1">
                  github.com/naresh-cn2/harvard-cs50-ai →
                </p>
              </a>
              <a
                href={CERTIFICATE}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-background p-8 transition-colors hover:bg-surface md:p-10"
              >
                <p className="label-mono text-research">OFFICIAL CERTIFICATE</p>
                <p className="display mt-4 text-2xl text-foreground md:text-3xl">
                  VERIFY AT HARVARD&apos;S CERTIFICATE PORTAL
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  CS50&apos;s Introduction to Artificial Intelligence with Python — issued November
                  11, 2026, by CS50, Harvard University. Independent verification at the issuer.
                </p>
                <p className="label-mono mt-6 text-research transition-transform duration-300 group-hover:translate-x-1">
                  cs50.harvard.edu/certificates →
                </p>
              </a>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/builds/projects"
                className="label-mono border border-line-strong px-6 py-3 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                ALL PROJECTS →
              </Link>
              <Link
                href="/credentials"
                className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                CREDENTIALS →
              </Link>
              <Link
                href="/research"
                className="label-mono border border-line px-6 py-3 text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                RESEARCH →
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
