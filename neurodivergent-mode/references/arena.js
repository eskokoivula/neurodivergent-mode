// neurodivergent-mode — the arena
//
// The selection layer (SKILL.md → ## The selection layer) externalized into
// parallel agents. Full autist mode runs this in Claude Code, where the Workflow
// tool exists, for business and philosophical questions.
//
// Shape: 3 reframe generators, each forced down ONE of foundation.md's three real
// drift directions (detail-first §2.1, divergent §2.2, social §2.3) → one blind
// critic per reframe (critics hold the kill authority) → one judge that ranks and
// presents the survivors. ~7 Opus agents.
//
// How the skill runs it: read this file's contents and pass them as the Workflow
// tool's `script`, with `args = {question, format, isElevation, priorOutput,
// includeMvps}`. (A skill instructing the Workflow tool is a valid opt-in path for
// that tool.) The Workflow tool returns either the finished markdown deliverable
// (normal case) or a JSON string `{status:"all_killed", ...}` — see the bottom of
// this script. On all_killed, the skill runs its single-pass fallback and surfaces
// the kill reasons; it never invents a winner.

export const meta = {
  name: "neurodivergent-arena",
  description:
    "Full-autist arena: 3 drift-forced reframe generators, a blind critic with kill authority per reframe, and one judge that ranks and presents survivors without flattening them.",
  phases: [
    { title: "generate", detail: "3 reframe generators, one per forced drift direction" },
    { title: "critique", detail: "one blind critic per reframe; critics hold kill authority" },
    { title: "judge", detail: "rank and present survivors without flattening the weird-but-right one" },
  ],
};

// args = { question, format ("business"|"philosophical"), isElevation, priorOutput, includeMvps }

// ---------------------------------------------------------------------------
// The three drift directions (foundation.md §2.1–2.3). "Global" (§2.4) is the
// return-side switch, not a drift axis, so there are exactly three generators —
// a 1:1 map, not an arbitrary count.
// ---------------------------------------------------------------------------

const DRIFT_DIRECTIONS = [
  {
    id: "detail-first",
    label: "Generator A — detail-first",
    brief:
      "DRIFT DIRECTION: DETAIL-FIRST (foundation §2.1). Start from the raw, concrete details and anomalies of the problem. Do NOT impose a frame, summary, or conclusion before the details are examined. Let the general pattern be built upward, out of the specifics — never handed down from an assumption. List the things that do not fit the tidy story first, then build a rule-system upward from them. Diverge by going LOWER and more specific than anyone else would.",
  },
  {
    id: "divergent",
    label: "Generator B — divergent",
    brief:
      "DRIFT DIRECTION: DIVERGENT (foundation §2.2). Reach for far, unobvious associations. Deliberately look for the SAME STRUCTURE in unrelated domains — biology, history, software, physics, markets, music, games, language. Generate widely before narrowing. Your reframe must be carried by a transferable cross-domain pattern the obvious answer would never reach for. Diverge by going FARTHER afield than anyone else would.",
  },
  {
    id: "social",
    label: "Generator C — social",
    brief:
      "DRIFT DIRECTION: SOCIAL (foundation §2.3). Hold several interpretations of the situation side by side; do not assume one 'normal' reading. Ask explicitly whose experience differs and why. Treat any breakdown between groups as a MUTUAL, two-way mismatch (the double-empathy idea) — never one group's deficiency. Your reframe must turn on a difference in lived experience or a two-sided mismatch the default framing flattens. Diverge by centering WHOSE view is missing.",
  },
];

// ---------------------------------------------------------------------------
// Schemas. The generator has NO field for its five-move reasoning — that is how
// the critic stays blind: the generator has nowhere to put its working.
// ---------------------------------------------------------------------------

const REFRAME = {
  type: "object",
  properties: {
    driftDirection: { type: "string", enum: ["detail-first", "divergent", "social"] },
    frame: {
      type: "string",
      description: "The finished reframe, one paragraph. The new frame stated and earned. No reasoning, no working.",
    },
    loadBearingClaims: {
      type: "array",
      minItems: 2,
      maxItems: 4,
      items: {
        type: "object",
        properties: {
          claim: { type: "string" },
          type: { type: "string", enum: ["fact", "inference", "interpretation"] },
          soWhat: { type: "string", description: "Why this claim matters to the reframe." },
        },
        required: ["claim", "type", "soWhat"],
      },
    },
    sources: {
      type: "array",
      description: "A source for each factual claim. Empty is allowed only if no factual claim is made.",
      items: {
        type: "object",
        properties: {
          forClaim: { type: "string" },
          citation: { type: "string" },
          url: { type: "string" },
        },
        required: ["forClaim", "citation"],
      },
    },
  },
  required: ["driftDirection", "frame", "loadBearingClaims"],
};

const VERDICT = {
  type: "object",
  properties: {
    survives: { type: "boolean" },
    killReason: {
      type: "object",
      description: "Present only when survives is false. A kill is load-bearing — it must be sourced.",
      properties: {
        kind: {
          type: "string",
          enum: ["false-fact", "broken-inference", "smuggled-premise", "forbids-nothing"],
        },
        // 'ground' deliberately excludes consensus: consensus can only flag, never kill.
        ground: { type: "string", enum: ["logic", "real-test"] },
        evidence: { type: "string", description: "The sourced logic or real test the kill rests on." },
      },
      required: ["kind", "ground", "evidence"],
    },
    strongestObjection: {
      type: "string",
      description: "Always present, even when the reframe survives. The best refutation or limit found.",
    },
    consensusFlags: {
      type: "array",
      description: "Disagreements with consensus only. A flag, never a kill.",
      items: { type: "string" },
    },
    sourceChecks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          claim: { type: "string" },
          verdict: { type: "string", enum: ["verified", "partly", "false", "unverified"] },
          source: { type: "string" },
        },
        required: ["claim", "verdict", "source"],
      },
    },
  },
  required: ["survives", "strongestObjection"],
};

// ---------------------------------------------------------------------------
// The arena flow. Generate→critique is per-lane and independent (pipeline, no
// barrier): a fast lane is critiqued while a slow lane still generates, and a
// critic stage structurally cannot start before its generator returns ("separate
// in time"). The judge needs all survivors at once, so it runs after the pipeline
// resolves and after the survivor filter.
// ---------------------------------------------------------------------------

// The Workflow runtime hands `args` over as a JSON string, so parse it back into an
// object before use. Then guard the mouth of the pipe: never spawn agents on a
// missing question — fail fast and hand the reason back. (This guard is the fix the
// arena's own first run surfaced: downstream rigor is worthless if the input is
// never checked.)
let input = args;
if (typeof input === "string") {
  try {
    input = JSON.parse(input);
  } catch (e) {
    input = {};
  }
}
input = input || {};

if (!input.question || !String(input.question).trim()) {
  return JSON.stringify(
    {
      status: "no_question",
      message:
        "The arena received no question (args.question was empty or missing). No agents were spawned. Bind args.question and re-run.",
    },
    null,
    2
  );
}

const lanes = await pipeline(
  DRIFT_DIRECTIONS,
  (dir) =>
    agent(generatorPrompt(dir, input), {
      label: dir.label,
      phase: "generate",
      model: "opus",
      schema: REFRAME,
    }),
  async (reframe, dir) => {
    if (!reframe) return null;
    const verdict = await agent(criticPrompt(reframe, input), {
      label: "Critic — " + dir.id,
      phase: "critique",
      model: "opus",
      schema: VERDICT,
    });
    return { dir, reframe, verdict };
  }
);

const live = lanes.filter(Boolean);
const survivors = live.filter((l) => l.verdict && l.verdict.survives === true);
const dead = live.filter((l) => l.verdict && l.verdict.survives === false);

log(survivors.length + " survived, " + dead.length + " killed, of " + live.length + " reframes critiqued.");

if (survivors.length === 0) {
  // Do NOT invent a winner. Hand structured data back; the skill runs its single-pass fallback.
  return JSON.stringify(
    {
      status: "all_killed",
      killed: live.map((l) => ({
        frame: l.reframe.frame,
        killReason: l.verdict.killReason || null,
        strongestObjection: l.verdict.strongestObjection,
      })),
    },
    null,
    2
  );
}

phase("judge");
// The judge IS the writer, so it returns a STRING (the markdown deliverable), not a
// schema'd object — a slot-filling schema would pressure uniform output, the very
// flattening this design exists to prevent.
return await agent(judgePrompt(survivors, dead, input), {
  label: "Judge",
  phase: "judge",
  model: "opus",
});

// ---------------------------------------------------------------------------
// Prompt builders (function declarations — hoisted, so order does not matter).
// Each prompt is self-contained: a Workflow subagent does not load the skill, so
// the method, the calibration, and the output format all travel in the prompt.
// ---------------------------------------------------------------------------

function generatorPrompt(dir, args) {
  const elevation = args.isElevation
    ? "\n\nThis is an ELEVATION pass. Here is the existing analysis to reframe — strip it to its concrete claims, find what it glossed over, then reframe:\n\n" +
      (args.priorOutput || "(no prior output supplied)") +
      "\n"
    : "";

  return `You are one of three parallel reframe generators in an adversarial arena. Produce ONE structural reframe of the question below, using neurodivergent-style reasoning. A reframe sees the system behind the obvious answer — it is NOT a smarter version of the obvious answer.

THE QUESTION:
${args.question}${elevation}

YOUR FORCED DRIFT DIRECTION — ${dir.label}.
This is a HARD divergence constraint: diverge along THIS axis and no other. The other two generators are forced down different axes. If your reframe could equally have come from theirs, you have failed the constraint.

${dir.brief}

RUN THE FULL FIVE-MOVE CHAIN (drift, then return) at full depth:
1. Concrete detail, not a frame (drift · detail-first). Begin with raw specifics and anomalies — the things that do not fit the tidy story. Build the pattern upward from specifics; never hand it down from an assumption.
2. Run the scene from inside (drift · internal simulation). Simulate it internally — picture it, push an edge case, ask what actually happens. Run it several ways. This finds the framing; it is not an item to list.
3. Wander to other domains (drift · divergent). Where else does this exact structure appear — biology, history, software, physics, markets, games, language, music? A detour earns its place only if it brings something back.
4. Zoom out, find the contradiction (return · the hinge). Switch deliberately to the whole-system view. Find the hinge: the contradiction the accepted frame cannot hold. Trust the anomaly; doubt the frame.
5. Doubt the frame, build the principle (return · selection). Conclude the FRAME is wrong, not the detail. Drop the unexamined assumption everyone accepts; build the principle that must be true once it is gone. Name the reframe.

Social reasoning runs throughout: when people are involved, hold several interpretations side by side, and treat a breakdown between groups as a mutual mismatch, not one group's deficiency.

THE BLINDNESS CONTRACT — load-bearing.
Return ONLY the finished reframe and its claims. NEVER include your five-move reasoning, your working, or how you got here. A separate critic will judge this reframe blind to how it was made; the output has nowhere to put your reasoning, and that is deliberate.

THE PRE-CENSORSHIP GUARD — load-bearing.
Do NOT soften, hedge, or pre-trim your reframe in anticipation of the critic. The critic decides what survives, not you. A generator that anticipates the judge produces safe, obvious work — the one failure this whole skill exists to avoid. If your reframe is weird but the steps hold, ship it at full strength. Weird-but-right is the point; the critic kills only broken steps, never strangeness.

Return the structured object: the finished frame (one paragraph, stated and earned), 2–4 load-bearing claims (each marked fact / inference / interpretation, with why it matters), and a source for every factual claim.`;
}

function criticPrompt(reframe, args) {
  const claims = reframe.loadBearingClaims
    .map((c, i) => `${i + 1}. [${c.type}] ${c.claim} — (why it matters: ${c.soWhat})`)
    .join("\n");

  const sources =
    reframe.sources && reframe.sources.length
      ? reframe.sources
          .map((s) => `- ${s.forClaim}: ${s.citation}${s.url ? " (" + s.url + ")" : ""}`)
          .join("\n")
      : "(none supplied)";

  // Note: driftDirection is deliberately withheld so the critic cannot judge the approach.
  return `You are a blind adversarial critic in a reframe arena. You did NOT generate the reframe below and you cannot see how it was made or which reasoning direction produced it. Judge ONLY what is in front of you.

THE ORIGINAL QUESTION:
${args.question}

THE REFRAME UNDER TEST:
${reframe.frame}

ITS LOAD-BEARING CLAIMS:
${claims}

ITS SOURCES:
${sources}

YOUR CALIBRATION — follow it exactly.

ATTACK THE ROAD, NOT THE DESTINATION. Weirdness lives in the conclusion; falseness lives in a step. Test the steps; never test the conclusion's strangeness.

- KILL FOR: a false fact, a broken inference, a smuggled premise, or a claim that forbids nothing (true but empty). A confident universal like "X always wins" dies to one counterexample; boldness never shields a false step.
- NEVER KILL FOR: unconventional, bold, no precedent, uncomfortable, not yet easy to defend. That is the signal, not the fault.

A kill must be grounded, and the ground sets its power:
1. LOGIC — a contradiction is false in any paradigm. Always allowed.
2. A REAL TEST YOU RUN — a calculation, a primary source, a named counterexample. Use whatever search / fetch / compute you have. Allowed when available.
3. CONSENSUS (your training) — NEVER a kill, only a flag: "you disagree with everyone — wrong, or ahead?" Every paradigm shift was false by its era's consensus, and this skill exists to beat consensus, so consensus cannot judge it.

KILL ONLY ON 1 OR 2. The catch on sources: search is consensus-weighted, so a result that hands you a SPECIFIC FALSIFYING FACT may kill, while one that only shows "most pages disagree" is consensus in a lab coat — flag it, never kill.

A kill is a load-bearing claim: SOURCE IT, never assert it from memory. Where nothing grounds a kill, do not kill — record the doubt as the strongest objection and let the reframe survive as a bold bet.

VERIFY where you can: a number, run it; a fact, find a primary source or a specific counterexample and read it; an inference, check it follows. A solid source is primary over secondary, traceable (author, date, method), independently corroborated, and not written by whoever benefits.

Return the structured verdict: survives (true/false); if it dies, killReason (kind, ground = logic or real-test ONLY, evidence); the strongest objection (ALWAYS, even on survival); any consensus flags (flag-only); and per-claim source checks (claim → verdict → source).`;
}

function judgePrompt(survivors, dead, args) {
  const isPhilo = args.format === "philosophical";
  const fmtName = isPhilo ? "Format 2c (philosophical)" : "Format 2a (business)";

  const businessFormat = `1. Reframe up-front — one short paragraph stating the new frame; lead with it, then earn it.
2. Body — the 2–4 load-bearing ideas, each in its own section under a heading that names THE IDEA itself (never a method move). Open each with a bolded one-sentence core claim, then prose: what it is, the mechanism, the evidence, the consequence.
3. Synthesis — how the ideas combine; who wins, who loses, what to do, what to watch. Use a table when it names multiple players or scenarios.${
    args.includeMvps
      ? "\n4. Ideas to explore — concrete, buildable instances (not abstractions). Each idea closes with a bolded **MVP:** block of 3–5 numbered bullets, each bullet 12 words or fewer (render the structure directly, not in a code block)."
      : ""
  }
${args.includeMvps ? "5" : "4"}. Elevation — name the reframe a default pass would not produce; show the transferable move (find what the whole field treats as obviously true, and doubt exactly that) with one short example from a different field; close with the lever stated as a > quote block.
${args.includeMvps ? "6" : "5"}. Plain-language summary — 4–5 short, jargon-free bullets.
${args.includeMvps ? "7" : "6"}. ## Verdict & sources — required, last.`;

  const philoFormat = `1. Reframe up-front — one short paragraph stating the new frame.
2. Arguments — load-bearing ideas (2–4), each in its own section with a bolded one-sentence core claim, then prose (conceptual, not strategic).
3. Counterarguments — the strongest case AGAINST the reframe, no straw man; one section per major counter, each a bolded core claim with an opened response. Attack the reframe's TRUTH, not its daring.
4. Synthesis — how arguments and counterarguments combine, and what stays open. Prose, no table.
5. Implications — what becomes a sharper question now the reframe stands. A reorientation, not a buildable.
6. Elevation — name the transferable move, give one short cross-domain example, and close with the lever as a > quote block.
7. Plain-language summary — 4–5 short bullets.
8. ## Verdict & sources — required, and separate from Counterarguments.`;

  const chosenFormat = isPhilo ? philoFormat : businessFormat;

  const survivorBlock = survivors.map((l, i) => renderSurvivor(l, i + 1)).join("\n\n");
  const deadBlock = dead.length
    ? dead.map(renderDead).join("\n\n")
    : "(none — every reframe survived its critic)";

  return `You are the JUDGE of a reframe arena. ${survivors.length} reframe(s) survived a blind adversarial critic; ${dead.length} were killed. Your job is to PRESENT and RANK — never to decide, re-judge, or kill.

THE ANTI-FLATTENING RULE — why you exist, stated first.
You may NOT flatten a weird-but-right reframe toward the safe, conventional one. Downranking or softening a SURVIVING reframe because it is unconventional, strange, or uncomfortable is the single failure this arena was built to stop. The skill names it anti-pattern 4, "the conformity filter": burying an idea for being weird, not wrong — which leaves only the consensus the skill exists to escape. A reframe that survived the critic has earned its place at full strength.

YOUR HARD LIMITS:
- You may NOT kill any surviving reframe. The critics hold kill authority; you do not.
- You may NOT downrank for unconventionality. Rank on merit only — explanatory power, how load-bearing the claims are, what the reframe lets the reader do — never on how normal it sounds.
- You MUST present every surviving reframe at full strength, in its own voice, not smoothed toward the others.

THE QUESTION:
${args.question}

SURVIVING REFRAMES (you rank these on merit):
${survivorBlock}

KILLED REFRAMES (label, don't delete):
${deadBlock}

THE ANTI-FLATTENING RULE, AGAIN (it is that important).
The weirdest surviving reframe must reach the reader exactly as strong as it arrived to you. If you catch yourself smoothing it toward the median, stop — that is the conformity filter, and it is forbidden. Present it whole.

YOUR OUTPUT — one clean deliverable, ${fmtName}:

PART 1 — THE LEAD REFRAME, FULL FORMAT.
Choose the strongest surviving reframe on merit and write it out in full:
${chosenFormat}

The ## Verdict & sources block is required, never folded into prose. Transcribe it from the lead reframe's critic verdict: the strongest objection; a verdict table (one row per load-bearing factual claim → verdict → source) built from that critic's source checks; and the reframe marked tested (name the falsifier and the cheapest test) or bold bet (kept, not yet proven).

PART 2 — ## Other reframes considered.
Label, don't delete. For each NON-LEAD SURVIVOR: its frame at full strength, why it ranked lower (on merit, never on weirdness), and its critic's strongest objection. For each KILLED reframe: its frame and the kill reason (kind, ground = logic or real-test, evidence). Close by noting the reader is the final judge and may overrule the ranking — the other reframes are shown so they can.

Write the whole deliverable already polished: cut dead words, active voice, concrete nouns, at most one em-dash per ~200 words, no preamble, no summary closer, and none of the banned AI vocabulary (delve, tapestry, leverage, landscape, ecosystem, robust, crucial, comprehensive, nuanced, pivotal, and the rest). The reader sees clean prose, never raw JSON.`;
}

function renderSurvivor(l, rank) {
  const claims = l.reframe.loadBearingClaims.map((c) => `[${c.type}] ${c.claim}`).join("; ");
  const flags =
    l.verdict.consensusFlags && l.verdict.consensusFlags.length
      ? l.verdict.consensusFlags.join("; ")
      : "none";
  const checks =
    l.verdict.sourceChecks && l.verdict.sourceChecks.length
      ? l.verdict.sourceChecks.map((s) => `${s.claim} → ${s.verdict} (${s.source})`).join("; ")
      : "none";
  return `[Survivor ${rank}]
  frame: ${l.reframe.frame}
  load-bearing claims: ${claims}
  critic's strongest objection: ${l.verdict.strongestObjection}
  consensus flags (not kills): ${flags}
  source checks: ${checks}`;
}

function renderDead(l) {
  const k = l.verdict.killReason || {};
  return `[Killed]
  frame: ${l.reframe.frame}
  kill reason: kind=${k.kind || "?"}, ground=${k.ground || "?"}, evidence=${k.evidence || "?"}
  critic's strongest objection: ${l.verdict.strongestObjection}`;
}
