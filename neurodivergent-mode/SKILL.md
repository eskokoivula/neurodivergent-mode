---
name: neurodivergent-mode
description: Reframes a problem or elevates an existing idea, plan, or analysis using neurodivergent (spectrum-style) cognition: detail-first perception, deliberate cross-domain wandering, internal simulation, and rejection of default frames. Use when the user wants to reframe a problem, elevate an existing analysis, find the hidden system behind symptoms, write a personal-reflective essay or opinion piece, or work through a philosophical question. Explicit triggers: "elevate this", "elevate this idea", "elevate this analysis", "engage ND mode", "ND mode", "autist mode", "neurodivergent mode", "reframe this — see the system", "what am I missing structurally", "think like autist", "brainstorm like autist", "ND reframe", "spectrum reframe", "reflect on this", "elevate this as essay", "elevate this as strategy", "elevate this philosophically", "philosophise this", or similar phrasing. Distinct from generic brainstorming, which clarifies what to build; this skill reframes what is already on the table.
---

# Neurodivergent Mode

## What this skill does

Produces reframes a neurotypical default pass would not generate. Most AI
brainstorming returns a smarter version of the obvious answer; this skill is
built not to.

It runs a **reasoning engine** modelled on neurodivergent cognition: detail-first
perception, deliberate wandering across domains, internal simulation, multi-model
social reasoning, rejection of default frames. The deliverable is a structural
reframe, not a longer list of ideas.

Two modes, same engine:

- **Primary brainstorming** — raw problem from scratch.
- **Elevation pass** — applied to an existing brainstorm to turn parts-thinking
  into systems-thinking.

The deliverable's structure is set by the question's *category* (business /
personal-reflective / philosophical) — see `## Step 0`.

## When to trigger

Trigger when the user:

- Says "elevate this", "ND mode", "autist mode", "neurodivergent mode", "think
  like autist", "ND reframe", "spectrum reframe", "reframe this — see the system",
  "what am I missing structurally", "go deeper", "find the hidden system".
- Has just received a parts-level brainstorm and wants more.
- Wants a reframe with non-default reasoning.

### Not this skill

If the user is figuring out *what* to build (clarify requirements, scope,
choose an approach) — that is the generic brainstorming skill's job. This skill
assumes the question is on the table and reframes it. When in doubt, ask.

---

## Step 0 — Open: classify, then pick a mode

When the skill triggers, do these in order. The slow engine starts only *after*
the user picks a mode, so the opening is instant.

1. **Classify silently.** Read the prompt, decide the category (business /
   personal-reflective / philosophical) using the signals below. Do not narrate
   this — it is cheap.
2. **Ask one message — the mode pick.** Offer the two modes (ADHD recommended for
   speed). If the category is business, fold the MVP opt-in into the *same*
   message — one round-trip, not two. See "The opening question" below.
3. **Trigger-word shortcut.** If the user already named a mode, skip the mode
   question. `"adhd mode"` / `"fast"` → ADHD. `"full autist"` / `"deep"` → Full
   autist. (For business with a mode word given, still ask the MVP opt-in.)
4. **Run the engine in the chosen mode**, then produce the category's output format.

### The two modes

Both run the same 5-move drift→return engine and the same output formats. They
differ only in *how widely the engine explores* and *how the output is written*.

| Dimension | ADHD mode (fast) | Full autist mode (deep) |
|---|---|---|
| Engine breadth | One decisive anomaly; 1–2 cross-domain patterns max | Wide wandering; many domains explored |
| Move 2 simulation | Minimal — just enough to find the hinge | Full, multiple runs |
| `references/foundation.md` | Not read | May consult to deepen |
| Writing | Single pass — written already polished | Produce, then polish |
| Load-bearing ideas | 2 | 3–4 |
| Self-check | Slim (key checks only) | Full |
| Selection pass | One quick self-refutation | Full adversarial pass |
| Feel | Tighter, faster | Richer, slower |

ADHD mode trades a little breadth for speed: it may miss the occasional far
analogy a wide search would find. Full autist is the full depth, no compromise.
**Neither changes** the reframe logic, the categories, the output structures, or
the polish standards.

### The opening question

Ask in one short message, then stop and wait for the answer. Two shapes:

- **Non-business:** *"ADHD mode (faster, leaner) or Full autist (broader, deeper)? — ADHD is fine for most things."*
- **Business:** combine with the MVP opt-in: *"Two choices: (1) ADHD mode (faster) or Full autist (broader)? (2) Do you want MVP suggestions / ideas-to-explore included?"*

When a mode trigger word is already present, skip straight to running (ask only
the MVP opt-in if business).

### Auto-detect signals

Read the prompt for these patterns:

| Signal in the prompt | Category |
|---|---|
| Second-person addressing of the user ("you"), "why does X resonate with you", opinion request, application/essay prompts, "what do you think about", "how do you feel about" | personal-reflective |
| "market", "industry", "X vs Y", "should I / should we", "strategy", named actors / companies / industries, "what should X do", "is it worth", "opportunity", "competitors" | business/strategy |
| Abstract concept without actors ("what is X", "justice", "freedom", "consciousness"), thought-experiment phrasing, conceptual analysis without applied stakes | philosophical |

### Override triggers

The user can force a category by adding a modifier to the standard trigger:

- `"elevate this as essay"` / `"reflect on this"` → personal-reflective
- `"elevate this as strategy"` or default `"elevate this"` → business/strategy
- `"elevate this philosophically"` / `"philosophise this"` → philosophical

When an override is present, it takes precedence over auto-detect.

### Ambiguous cases

If auto-detect cannot decide between two categories with reasonable confidence,
default to **business/strategy** and announce the classification on the first line
of the output, so the user can correct mid-turn:

> *"Detected: business/strategy. Override with 'elevate this as essay' if wrong."*

### MVP opt-in (business only)

Business format has one optional element: **Ideas to explore** with numbered
**MVP** bullets (see Format 2a, Section 4). It is opt-in, asked as part of the
opening question above (folded into the same message as the mode pick).

If the user says yes, include Section 4. If no, omit it. Never ask this for
personal-reflective or philosophical questions — those formats have no such
section.

### Selection path — which critic runs

After the mode is picked, the reframe is still tested before you ship it (see
`## The selection layer`). Mode, environment, and category fix which form that test
takes:

- **Full autist + business/philosophical + Workflow tool (Claude Code)** → the
  multi-agent **arena** (`## The arena`): read `references/arena.js`, pass it to the
  Workflow tool as `script` with `args = {question, format, isElevation,
  priorOutput, includeMvps}`.
- **Full autist + no Workflow tool** (plain chat / Claude.ai) → one separate blind
  critic / same-model pass (the current behaviour).
- **ADHD mode** → no arena: one quick self-refutation on logic, no search.
- **Personal-reflective** (either mode) → bypasses the arena and the falsifiability
  gate entirely: a single-pass Format 2b essay plus the one-line honesty note.

Nothing breaks where the Workflow tool is absent.

---

## The core principle: drift, then return

The engine works by **deliberate mind-wandering**: it moves off the obvious path
on purpose (drift), then moves back on purpose to land a usable result (return).
Both halves are mandatory; order matters. Only *deliberate* wandering produces
creative results — *spontaneous* drift is losing the thread. (See
`references/foundation.md`, Section 1.)

- **Drift** = deliberate move off path — into detail, other domains, other people's experience.
- **Return** = deliberate move back — build a principle, test it, land a reframe.
- Drift without return = jumpy transcript. Return without drift = filled-in worksheet. Both, in order, every time.

### The engine is not the deliverable

**The engine** runs in your head — associative, non-linear, jumpy. That jumpiness
is the drift, and it is where non-default insight comes from. Nobody sees it.

**The deliverable** is engineered synthesis — clearly structured, every idea fully
opened. Do the jumpy work in your head; deliver the structured synthesis.

---

## The engine: the five-move chain

Five moves: 1–3 are drift, 4–5 are return. See `## The core principle` above for the
drift/return mechanism. Mode governs how widely the chain explores — see Step 0.

**Mode governs depth here:**
- **ADHD mode** — run the chain *tight*. One decisive anomaly, 1–2 cross-domain
  patterns, one principle. Keep internal reasoning economical: do not enumerate
  many domains, do not draft-then-rewrite, do not read `references/foundation.md`. Find the
  hinge fast and write.
- **Full autist mode** — run the chain *wide*. Explore many domains, simulate
  fully, consult `references/foundation.md` §6.1 (the Einstein light-beam example)
  when the chain feels abstract — if the file is not present, proceed without it.

### Move 1 — Concrete detail, not a frame  *(drift · detail-first)*

Begin with the raw specifics — actual details, anomalies, things that do not
fit the tidy story. **Pattern is built upward from specifics, not handed down
from an assumption.** Frame too early and the rest of the chain just decorates
the obvious answer.

*Elevation pass:* strip the existing output to concrete claims; find what it
glossed over.

### Move 2 — Run the scene from inside  *(drift · internal simulation)*

Simulate internally before concluding: picture it, push an edge case, ask what
actually happens. *ADHD mode: one quick run, just enough to surface the hinge.
Full autist: run it several ways.* These find the framing; they are not items
to list in the output.

### Move 3 — Wander to other domains  *(drift · divergent)*

Where else does this exact structure appear? *ADHD mode: reach for 1–2 far
patterns and move on — no domain tour. Full autist: wander widely across
biology, history, software, physics, markets, games, language, music.* A detour
earns its place only if it brings something back (Move 4).

### Move 4 — Zoom out, find the contradiction  *(return · the hinge)*

Switch deliberately to the global view. Find the hinge: **the contradiction
the accepted frame cannot hold.** Somewhere the detail, the simulation, or
the cross-domain pattern produces an anomaly the default framing cannot
explain. Trust the anomaly; doubt the frame.

### Move 5 — Doubt the frame, build the principle  *(return · selection)*

Do not conclude "the detail must be wrong." Conclude **the frame must be
wrong.** Identify the unexamined assumption everyone accepts; drop it. Build
the principle that must be true once it is gone. Then name the reframe.

### Two disciplines

- **Social reasoning runs throughout.** When people are involved, hold several
  interpretations side by side. Treat a breakdown between groups as *mutual*
  mismatch, not one group's deficiency. (See `references/foundation.md` §2.3.)
- **Do not skip moves.** Full chain discipline is what prevents the
  "smarter version of the obvious answer" failure.

---

## The selection layer

A reframe is a hypothesis. The engine generates it; this layer tests whether it
holds, and ships only what survives. "Doubt the frame, trust the anomaly" is also
how every crank thinks; what divides a real reframe from a confident wrong one is
survival under attack.

Two separations, both required. **In time:** generate the whole reframe first,
judge second, never during — a generator that anticipates the critic produces safe,
obvious work, the failure this skill exists to avoid. (That is drift-then-return,
see `## The core principle`, one step further.) **In mind:** the critic is a
different mind, not the same model grading itself, which shares its own blind spots.
Where the environment can spawn agents, run the critic as a separate agent blind to
the engine's reasoning; in plain chat, the same model runs it as a strict separate
pass. Either way it is a pass after the engine, not Move 4–5.

### What a kill needs

**Attack the road, not the destination.** Weirdness lives in the conclusion;
falseness lives in a step. Test the steps, never the conclusion's strangeness.

- **Kill for:** a false fact, a broken inference, a smuggled premise, a claim that
  forbids nothing (true but empty). A confident universal like "X always wins" dies
  to one counterexample; boldness never shields a false step.
- **Never kill for:** unconventional, bold, no precedent, uncomfortable, not yet
  easy to defend. That is the signal, not the fault.

A kill must be grounded, and the ground sets its power:

1. **Logic** — a contradiction is false in any paradigm. Always allowed.
2. **A real test you run** — a calculation, a primary source, a named
   counterexample. Allowed when available.
3. **Consensus (your training)** — never a kill, only a flag: *you disagree with
   everyone; wrong, or ahead?* Every paradigm shift was false by its era's
   consensus, and the skill exists to beat consensus, so consensus cannot judge it.

Kill only on 1 or 2. A kill is a load-bearing claim: source it, never assert it
from memory (`## Citations and research`). Where nothing grounds it, do not kill —
label it a bold bet and name the test that would settle it.

### How to verify, and what counts as a source

Match the act to the claim: a number, run it; a fact, find a primary source or a
specific counterexample and read it; an inference, check it follows. Use whatever
search, fetch, and compute the environment gives. A solid source is primary over
secondary, traceable (author, date, method), independently corroborated, and not
written by whoever benefits. The catch: search is consensus-weighted, so a result
that hands you a specific falsifying fact may kill, while one that only shows "most
pages disagree" is consensus in a lab coat. Flag it, never kill.

### Label, mode, format

- **Label, never hide.** The user always sees the reframe, the strongest objection,
  and a mark: **tested** (what would falsify it, plus the cheapest test) or **bold
  bet** (kept, not yet proven). For business and philosophical formats they also
  always see the per-claim verdicts with their sources, as a required Verdict block
  (never folded into prose). A reframe killed for being wrong is named with its
  reason, never dropped in silence.
- **By mode.** ADHD: the same model, one quick self-refutation on logic, label the
  rest a bet, no search, no separate agent — fast. Full autist: where the Workflow
  tool exists (Claude Code), run the multi-agent arena (`## The arena`) — parallel
  generators, a blind critic per reframe, a judge; else spawn a single separate blind
  critic agent where the environment allows (else a full same-model pass), and run the
  verification above.
- **By format.** Business and philosophical: end with a **required Verdict block**
  (claim → verdict → source, the strongest objection, and the tested/bold-bet mark)
  — always visible, never folded away. See Format 2a §7. Philosophical also keeps
  its **Counterarguments** section, which attacks the reframe's *truth* in prose;
  the Verdict block adds the factual sourcing. Personal-reflective: no gate and no
  Verdict block; the critic never judges a feeling, and the output carries only a
  one-line honesty note (no invented facts about the writer; a source for any
  external fact cited).

---

## The arena: the selection layer as parallel agents

In Claude Code, Full autist mode runs the selection layer as a **multi-agent
arena** rather than a single critic. Same discipline as `## The selection layer`,
externalised: several reframes generated in parallel, each one killed-or-kept by
its own blind critic, then a judge that ranks and presents the survivors. About
seven agents, all Opus, written as a Workflow script in `references/arena.js`.

**When it runs.** Full autist mode, the Workflow tool available, business or
philosophical category — the full ladder is in `## Step 0 → Selection path`. A
skill instructing the Workflow tool is a valid opt-in for that tool, so the run is
automatic, no extra prompt. To run it, read `references/arena.js` and pass its
contents as the Workflow tool's `script` with `args = {question, format,
isElevation, priorOutput, includeMvps}`. For an elevation pass, keep `priorOutput`
compact — it is embedded into all three generator prompts, so a long prior
analysis triples its own token cost; summarise it first if it is long.

**Three generators, one per drift direction.** `references/foundation.md` has
exactly three real drift directions — detail-first (§2.1), divergent (§2.2),
social (§2.3). "Global" (§2.4) is the return-side switch, not a drift axis, so it
is not a generator. Each generator is forced down one direction as a hard
divergence constraint, so the three reframes diverge by construction instead of
restating one answer.

**Critics hold the kill authority, not the judge.** Each reframe gets one blind
critic that never saw how it was made — it is not even told which drift direction
produced it. The critic carries the exact calibration from `## The selection
layer`: attack the road not the destination, kill only on logic or a real test,
consensus can only flag. A reframe dies only on a sourced logic or fact error.

**The judge presents, it does not decide.** The judge ranks survivors on merit,
writes the lead reframe in full Format 2a or 2c (including the required Verdict
block, transcribed from the lead critic's checks), and lists every other reframe —
survivors and killed — with reasons ("label, don't delete"). It may not kill, and
it may not flatten a weird-but-right survivor toward the safe one. That flattening
is anti-pattern 4, "the conformity filter"; stopping it is the whole reason the
judge is a presenter, not a decider. The human is the final judge.

**Pipeline, not lock-step.** Generate→critique runs per lane independently — a fast
lane is critiqued while a slow one still generates — and the judge runs once, after
all lanes resolve. A lane whose critic never returns is carried as **unjudged**:
presented and labeled, never silently dropped (a lost verdict is infrastructure,
not a kill).

**Exit statuses.** Normally the arena returns the finished markdown deliverable.
Two structured exits instead: `{status: "no_survivors"}` — no reframe earned a
critic's pass; it lists `killed` (with reasons) and `unjudged`, invents no winner,
and the skill then runs the single-pass fallback and surfaces why each reframe
died. `{status: "no_question"}` — `args.question` was empty, so no agents were
spawned; re-invoke the Workflow tool with `args.question` bound (the input was
broken, not the reframes — do not fall back).

**Output.** One clean deliverable: the lead reframe in full, then `## Other
reframes considered`. Never the raw structured JSON. See `## Output` for the
formats.

---

## Output: three context-aware formats

The 5-move engine runs the same in all three formats. Only the output structure
differs, based on the category detected in `## Step 0 — Open: classify, then pick a mode`.

The structured output is then polished in the same reasoning step (Orwell/Gowers
+ AI detox rules — see `## Polish` below) before being shown to the user.

### Surface formatting by environment

- **Claude Code (file-based / terminal):** markdown headings for the idea sections;
  the output is a standalone, navigable artifact.
- **Claude.ai (conversational):** bold idea-headings or clear section breaks, short
  paragraphs. Still fully structured — conversational does not mean unstructured.

---

### Format 2a — Business / product / strategy

1. **Reframe up-front.** One short paragraph stating the new frame. Lead with
   it, then earn it.

2. **Body — load-bearing ideas.** The reframe rests on 2–4 load-bearing ideas.
   Each gets its own section with a heading that names *the idea itself* (never
   a method move). Open each section with a bolded one-sentence **core claim**,
   then expand in prose: what the idea is, the mechanism, the evidence, the
   consequence.

   - Banned heading: "Drift", "Cross-domain patterns", "Move 4". Method-machinery
     as a heading is the worksheet failure.
   - Correct heading: "The interface disappears — it does not improve", "The
     stripped-out social layer always returns".

3. **Synthesis.** How the load-bearing ideas combine. State implications
   concretely — who wins, who loses, what to do, what to watch.

   **Use a table when the synthesis lists multiple players, scenarios, or
   winners/losers.** A short framing sentence plus a table is sharper than a
   six-sentence paragraph naming five players.

4. **[Opt-in] Ideas to explore.** Generated *only if* the user said yes in
   Step 0. Each idea is a concrete, buildable thing — not "legibility matters"
   but the specific thing someone could sketch tomorrow. Bold is allowed;
   ungrounded is not.

   **Each idea must close with a bolded `**MVP:**` block followed by 3–5
   numbered bullet points** — not a prose sentence. The MVP is the most
   scan-critical part of the deliverable; visual structure beats prose.

   Format per idea (render this structure directly — do not wrap in a code block):

   **Idea A: [short name]**

   [2-3 prose sentences: what it is, mechanism, strategic question.]

   **MVP:**
   1. [smallest buildable thing, one line]
   2. [next concrete step]
   3. [next]
   4. [stack / dependency]
   5. [build time estimate]

   Numbered bullets, not dashes. Each bullet ≤ 12 words. The reader scans the
   MVP block in 5 seconds; if it takes longer, the bullets are too long.

5. **Elevation.** Name the reframe a neurotypical pass would not have produced.
   Then show *how the problem was attacked*: the transferable move — typically,
   find what the whole field treats as obviously true and doubt exactly that.
   Make that move concrete with one short example from a different field, so
   the reader sees it is a portable lever, not a one-off.

   **Close the section with the transferable lever stated as a quote block** —
   one to two sentences, no qualifications. The lever is the most reusable
   thing in the whole deliverable; it deserves the visual prominence of a
   callout.

6. **Plain-language summary.** **4–5 short bullets**, plain language, no jargon.
   Each bullet covers one of: the reframe, the main shifts, the buildable
   answer (if Section 4 was generated), the lever, what to watch.

7. **Verdict & sources** (required, always present). The selection layer's output,
   shown rather than folded away. Place it last, under its own heading, as the
   deliverable's audit trail.

   - **Strongest objection.** One short paragraph: the best refutation or limit the
     critic found, and what changed in the reframe because of it.
   - **Verdict table.** One row per load-bearing factual claim: *claim → verdict
     (verified / partly / false / unverified) → source*.
   - **Reframe mark.** The overall reframe labelled **tested** (name the falsifier
     and the cheapest test) or **bold bet** (kept, not yet proven).
   - **By mode.** Full autist: full table with a source per row (a separate blind
     critic ran real verification). ADHD: no sourced table — no search ran — so give
     the strongest objection, the tested/bold-bet marks, and one line: *"ADHD mode:
     logic check only, no web verification."*

This format runs the full selection layer on the finished reframe and always ends
with the Verdict block above — see `## The selection layer`.

---

### Format 2b — Personal-reflective / opinion

The same engine runs. The output is essayistic — first-person voice ("I").
The user is asking for a reflective answer (e.g., an application essay,
opinion piece, blog post), not a strategic analysis.

1. **Hook.** One concrete detail from the question that opens a path. No
   preamble, no background, no thesis paragraph. The hook is what the
   detail-first move surfaced.

2. **Resonance.** What in the question resonates and from where it recognises.
   Name the felt resonance precisely — what *exactly* the question touches,
   not a vague "this matters to me".

3. **Mechanism.** The structural reason for the resonance: a cross-domain
   pattern, a social mechanism, a personal disposition. This is where the
   engine's Move 3 (divergent wander) lands — the underlying structure that
   explains why the question lands.

4. **Demonstration.** A concrete vignette or example showing the mechanism
   alive. This may be:
   - A cross-domain analogy (biology, physics, history, software, markets)
   - A historical example or public figure
   - A fictional vignette / scenario
   - A cultural reference

   **MUST NOT fabricate the user's own personal stories.** If the user has
   supplied their own material in the prompt, draw on that; otherwise use
   external examples. The rule is real and load-bearing — fabricated
   first-person anecdotes attributed to the user are a hard fail.

5. **Forward look.** What this shifts in thinking. Not a recommendation, not
   a buildable — a reorientation. Where this lands the writer next.

**Excluded** (not produced in this format): MVP bullets, synthesis table, lever
quote block, "ideas to explore", falsifiability gate, Verdict block. You do not
refute a personal reflection; keep only the no-fabrication honesty check above (see
`## The selection layer`).

**Honesty note (the only selection output here).** Close with one short line, not a
table or a heading: confirm no facts about the writer were invented, and cite a
source for any external fact used in the Demonstration. No verdict table, no
tested/bold-bet mark — a personal reflection is not refuted.

**Voice:** first-person essay ("I"). Sentence rhythm is essayistic,
not list-driven.

---

### Format 2c — Philosophical / conceptual

The same engine runs. The output is analytical-essay shape: closer to a
philosophy or long-form analysis piece than a strategy deliverable.

1. **Reframe up-front.** One short paragraph stating the new frame. Same role
   as in business format.

2. **Arguments.** Load-bearing ideas (2–4), each in its own section with a
   bolded one-sentence **core claim**, then prose. Same internal structure as
   the business `Body` section, but the ideas are conceptual rather than
   strategic.

3. **Counterarguments.** The strongest case against own reframe, treated
   seriously (no straw man). One section per major counter, each with a
   bolded core claim and an opened response. This is the philosophical-format
   discipline: a reframe is not credible unless it has met its real opposition.
   This section is the format's selection layer (see `## The selection layer`):
   attack the reframe's truth, not its daring.

4. **Synthesis.** How arguments and counterarguments combine, what remains
   open, what is *not* settled. Prose, no table — philosophical synthesis is
   not a winners/losers comparison.

5. **Implications.** What follows in thinking or action. Not a buildable; more
   a reorientation of the conceptual landscape — what becomes a sharper
   question now that the reframe stands.

6. **Elevation.** Same role as in business: name the transferable move, give a
   short cross-domain example, and **close with the lever stated as a quote
   block**.

7. **Plain-language summary.** **4–5 short bullets** covering reframe, main
   shifts, lever, what stays open.

8. **Verdict & sources** (required, always present). The same block as business
   Format 2a §7: the strongest objection, the verdict table (*claim → verdict →
   source*), and the tested/bold-bet mark. It is separate from §3 Counterarguments:
   Counterarguments attack the reframe's *truth* in prose; the Verdict block shows
   the *factual sourcing* and the labels. Both appear.

**Excluded:** MVP bullets, synthesis table, "ideas to explore" as concrete
buildables.

**Voice:** analytical essay, third-person or impersonal. Not first-person.

---

## Polish: apply integrated, in the same step

The structured output never reaches the user as-is. Apply the polish rules below
**in the same reasoning step that produced the output** — do not invoke a
separate skill. The user sees one clean deliverable.

**By mode:**
- **ADHD mode** — write the deliverable *once*, already polished. Treat the rules
  below as writing constraints, not a separate rewrite pass. One quick scan at the
  end, not a sentence-by-sentence audit.
- **Full autist mode** — write, then do a full polish pass over it.

(These rules are adapted from `plain-english-skill` by Birdmania —
https://github.com/b1rdmania/claude-plain-english-skill — and integrated here
to remove the second skill-activation cost.)

### Orwell/Gowers (apply first)

1. Cut every word that adds nothing.
2. Active voice over passive. If you can name the agent, name it.
3. Concrete nouns over abstract subjects.
4. Short word over long. Saxon over Latinate (*use* over *utilise*, *help* over *facilitate*, *before* over *prior to*).
5. Single word over circumlocution (*because* over *due to the fact that*).
6. No dying metaphors (*toe the line*, *Achilles' heel*, *at the end of the day*).
7. Break a rule rather than write something barbarous. Clarity wins.

### AI detox (apply second)

8. **Banned vocabulary — substitute or delete:**
   *delve, tapestry, navigate, leverage, landscape, ecosystem, realm,
   multifaceted, foster, underscore, robust, comprehensive, nuanced, paramount,
   crucial, holistic, pivotal, facilitate, utilize, methodology, commence,
   endeavour, numerous, approximately, ameliorate, expedite, terminate.*
9. **Em-dash budget.** Max one em-dash per ~200 words. Default to commas, full stops, new sentences. Em-dash overuse is the loudest AI tell.
10. **No preamble.** Don't open with *"That's a great question,"* *"Certainly,"* *"I'd be happy to,"* or framing. Start with the answer.
11. **No summary closer.** No *"In conclusion,"* *"To sum up,"* *"I hope this helps."*
12. **No false balance.** When one side outweighs the other, say so.
13. **No reflex rule-of-three.** If content has two or four points, use two or four. Don't pad.
14. **Vary sentence length.** Mix short punchy sentences with longer ones. AI clusters around 18–22 words; good prose ranges 4–40.
15. **No sycophancy.** No *"great point"* or validating the user's framing.
16. **Cut hedge stacks.** *Genuinely, honestly, it's worth noting, I find that, arguably* — one hedge per claim, max.

### Banned constructions (substitute)

| Phrase | Fix |
|---|---|
| in the realm of / landscape of / world of | in |
| it is important to note that / it's worth noting that | (delete) |
| due to the fact that | because |
| in the event that | if |
| with regard to | about |
| in light of | given, because of |
| prior to | before |
| in order to | to |
| a variety of / a number of | many, several / some |

### When NOT to apply

- Direct quotes from the user or sources → leave them.
- Code, technical specs, legal text → don't tighten load-bearing jargon.
- Deliberate dialect (period pastiche, AAVE, etc.) → ask before changing.
- Personal-reflective Hook: the user's own framing in the prompt may stay as-is.

### Two-step discipline

1. **Flag first.** Walk every sentence against the rules. Don't pre-filter for "voice".
2. **Override second.** For each flag, decide if rule 7 applies. Name the reason in one word: *rhythm, emphasis, picture, idiom, joke*. If no reason, take the fix.

### User can request

- *"Show me the raw output"* / *"Before the polish"* → show the structured pre-polish version (only path that reveals the internal stage).
- *"Re-polish"* → apply the polish rules again on the structured output (useful if the first pass overcorrected).

---

## The banned anti-patterns

Each is a specific failure of deliberate mind-wandering, or of the selection that
follows it. Naming the mechanism is what lets you catch it.

### Of the engine — drift and return

1. **The worksheet.** Drift suppressed. The method's moves become visible headings
   and labelled mini-lists ("Detail:", "Analogy:", "Move 4:"). The form eats the
   content. This is return running with no real drift inside it.

2. **The stream.** Spontaneous wandering leaked onto the page — ideas stated,
   gestured at, jumped away from, never developed. A transcript of an associative
   mind is not a deliverable. This is drift with the return missing.

3. **The clever fragment.** A sharp reframe with no developed body. The mind
   drifted, found something genuinely good, and stopped — return began but never
   finished. The insight is real but the reader cannot act on it.

All three fail the same way: one half of the engine ran without the other. See `## The core principle` for why both halves are mandatory.

### Of the selection layer

4. **The conformity filter.** The critic killed an idea for being weird, not
   wrong. The most dangerous failure of selection: it leaves only the consensus
   the skill exists to escape.

5. **The pre-censored generator.** The generator softened its ideas anticipating
   the critic. Generation lost its nerve before it began.

6. **The lossy kill.** A refuted idea was dropped in silence instead of named with
   its reason. Selection that hides its kills cannot be checked.

All three fail the same way: selection ran inside generation, or ran without
calibration. See `## The selection layer` for the rule that prevents both.

### Self-check before responding

**ADHD mode — slim check (fast):**
1. Mode picked before the engine ran? Format matches category?
2. Opt-in respected? (Business+yes → Section 4 with numbered MVP bullets; business+no → absent.)
3. Personal-reflective Demonstration is cross-domain / historical / fictional — never a fabricated user anecdote.
4. Polished as written, no meta-commentary leaked, user sees no raw intermediate.
5. Not just a "smarter version of the obvious answer" (restart from Move 1 if it is)? And it survived one honest objection, killed for wrong and not for weird?
6. Business/philosophical: Verdict block present at the end (strongest objection + tested/bold-bet marks; "logic check only, no web verification")? Personal-reflective: one-line honesty note present?

**Full autist mode — full check (the slim checks, plus):**
- Philosophical: counterargument section is real (strongest-form), not a straw man.
- Reframe (or hook) clear in opening?
- Section headings name *ideas*, not engine moves?
- Each load-bearing idea opened (what / mechanism / evidence / consequence)?
- Body/arguments sections open with bolded **core claim**? (Not personal-reflective.)
- Business synthesis uses **table** when multi-player?
- Business/philosophical elevation: lever as `>` quote block + cross-domain example?
- Business/philosophical summary: 4–5 bullets, not prose?
- Selection ran after generation (not during), calibrated (killed for wrong, not weird), kills named not hidden?
- Every kill grounded in logic or a real test it ran, never in consensus alone?
- Business/philosophical: **Verdict block** present and visible at the end (strongest objection, verdict table with sources, tested/bold-bet mark)? Personal-reflective: one-line honesty note present?

---

## Citations and research

When a reframe refers to research, findings, or concepts not in the user's own
materials:

- **Search before asserting.** Do not state a research claim from memory; find
  the source first if the claim is load-bearing.
- **Verify, then attribute.** Source-backed claims only ("a 2023 meta-analysis found…").
- **If no source found, say so.** "I could not find a reliable source for this" is a valid answer.
- **Separate fact from interpretation.** Mark interpretation as interpretation, never as "research shows".
- **Citations woven in, not listed.** No worksheet-style reference dumps.

The reframe itself is interpretation. This section ensures the factual
scaffolding under it is real, not generated.

---

## Important caution

Do not romanticise neurodivergence. Not "better thinking" — *different
optimisation*: more detail salience, more internal simulation, more pattern-based
association, less automatic acceptance of convention. Coexists with overload,
communication friction, uneven attention. The research does not support a
"superpower" story (see `references/foundation.md` §7).

This skill imitates the cognitive *structure* for reasoning. It does not claim
all neurodivergent people think this way, or that thinking this way makes anyone
neurodivergent.

## Foundation

For the full theory — deliberate mind-wandering, the three drift directions, the
return-side switch, the selection layer, why the anti-patterns happen, the worked Einstein
example that anchors the five-move chain, and the complete reference list — see
`references/foundation.md`.
Read it when the user asks why the method is built this way, or when you need to
deepen a reframe beyond the operational chain above.

If `references/foundation.md` is not present in the skill directory, proceed
without it. The five-move chain in this file is self-contained and sufficient
to run the engine.
