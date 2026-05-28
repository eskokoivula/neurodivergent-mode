---
name: neurodivergent-mode
description: Reframes a problem or elevates an existing idea, plan, or analysis by applying neurodivergent (spectrum-style) cognition as a reasoning engine — bottom-up detail-first perception, deliberate mind-wandering across domains, internal simulation, multi-model social reasoning, and rejection of default frames. Use this skill when the user wants to reframe a problem, elevate an existing analysis or idea, find the hidden system behind symptoms, see the structural answer the obvious one misses, write a personal-reflective essay or opinion piece (e.g., application essays, blog posts), or work through a philosophical / conceptual question. Explicit triggers: "elevate this", "elevate this idea", "elevate this analysis", "engage ND mode", "ND mode", "autist mode", "neurodivergent mode", "reframe this — see the system", "what am I missing structurally", "think like autist", "brainstorm like autist", "ND reframe", "spectrum reframe", "reflect on this", "elevate this as essay", "elevate this as strategy", "elevate this philosophically", "philosophise this", or similar phrasing. Distinct from generic brainstorming: brainstorming clarifies *what to build*; this skill produces a structural *reframe* of what is already on the table. The skill classifies the question into one of three categories (business / strategy, personal-reflective / opinion, philosophical / conceptual) and produces output matched to that category — strategic deliverables for business questions, essayistic answers for personal-reflective questions, and analytical-essay shape with counterarguments for philosophical questions. Final output is handed off to `plain-english-skill` for reader-facing polish.
---

# Neurodivergent Mode

## What this skill does

This skill produces reframes a neurotypical default pass would not generate. Most
AI brainstorming returns a smarter version of the obvious answer. This skill is
built not to.

It does this by running a **reasoning engine** modelled on neurodivergent
cognition — detail-first perception, deliberate wandering across domains, internal
simulation, multi-model social reasoning, and rejection of default frames. The
deliverable is a structural reframe of the problem, not a longer list of ideas.

The skill works in **two modes**, and both run the same engine:

- **Primary brainstorming.** Applied to a raw problem or question from scratch.
- **Elevation pass.** Applied to an existing brainstorm, analysis, or plan to
  reframe it. Especially powerful as a second stage after a conventional
  brainstorm — it turns parts-thinking into systems-thinking.

Only the input differs. The engine is identical in both. The deliverable's
structure is set by the question's *category* (business / personal-reflective /
philosophical) — see `## Step 0 — Classify the question` — not by which mode
the skill is in.

## When to trigger

This skill is for **reframing**, not generic brainstorming. Trigger when the user:

- Explicitly asks for "elevate this", "elevate this idea", "elevate this analysis",
  "engage ND mode", "ND mode", "autist mode", "neurodivergent mode", "think like
  autist", "brainstorm like autist", "ND reframe", "spectrum reframe".
- Says "reframe this — see the system", "what am I missing structurally", "what's
  the bigger picture", "go deeper", "find the hidden system".
- Has just received a brainstorm or analysis and seems unsatisfied with
  surface-level results — this is the elevation-pass use case.
- Wants to reframe a problem from scratch with non-default reasoning (not just
  clarify requirements — that is the brainstorming skill's job, not this one).

Suggest this skill proactively when the user is wrestling with a problem that has
obvious surface answers but no obvious right answer, or has just produced a
parts-level output and is looking for more.

### Not this skill

If the user is trying to figure out *what* to build — clarifying requirements,
scoping a feature, choosing approaches — that is the generic brainstorming skill's
job, not this one. This skill assumes the question is already on the table and
produces a structural reframe of it. When in doubt, ask the user whether they want
a reframe of an existing problem (this skill) or help clarifying what they want
(brainstorming).

---

## Step 0 — Classify the question

Before running the engine, classify the question into one of three categories.
The 5-move engine (drift → return) runs the same in all three; only the output
structure differs. The structure is defined in `## Output: three context-aware
formats`.

**Mechanism: hybrid auto-detect + explicit override triggers.**

### Auto-detect signals

Read the prompt for these patterns:

| Signal in the prompt | Category |
|---|---|
| Second-person addressing of the user ("you / sinä"), "miksi sinusta", "why does X resonate with you", opinion request, application/essay prompts | personal-reflective |
| "tulevaisuus", "markkina", "ala", "X vs Y", "kannattaako", "strategia", named actors / companies / industries, "what should X do" | business/strategy |
| Abstract concept without actors ("mitä on X", "oikeudenmukaisuus", "vapaus"), thought-experiment phrasing, conceptual analysis without applied stakes | philosophical |

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

### If business is detected: ask about optional sections

Business format has two optional elements (**Ideas to explore** with bolded **MVP**
bullets — see `## Output: three context-aware formats`, Section 2a). These are
opt-in. Before running the engine, ask the user:

> *"Haluatko MVP-ehdotuksia ja/tai ideas-to-explore osaksi vastausta?"*

Capture the answer. If yes, include Section 4 in the business format. If no,
omit it. Do not ask this for personal-reflective or philosophical questions —
those formats do not contain these sections.

---

## The core principle: drift, then return

Everything in this skill rests on one motion. Understand it before anything else.

The engine works by **deliberate mind-wandering**: it moves *away* from the obvious
path on purpose (drift), then moves *back* on purpose to land a usable result
(return). Both halves are mandatory, and the order matters.

This is not loose metaphor — it is the documented difference between two kinds of
mind-wandering. *Spontaneous* wandering is losing the thread: attention drifts on
its own and does not come back. *Deliberate* wandering is steering attention
off-task and then steering it back. Only the deliberate kind produces creative
results. (See `references/foundation.md`, Section 1.)

So:

- **Drift** = the deliberate move off the obvious path — into raw detail, into
  unrelated domains, into other people's experience.
- **Return** = the deliberate move back — build a principle, test it, land a
  reframe.
- Drift with no return is a jumpy transcript. Return with no real drift is a
  filled-in worksheet. The engine is both, in order, every time.

### The engine is not the deliverable

This is the central failure mode of the skill, so it is stated first.

**The engine** runs in your head. It is allowed to be associative, non-linear, and
jumpy — that jumpiness is the drift, and it is where non-default insight comes
from. Nobody sees the engine.

**The deliverable** is what the user receives: an engineered synthesis —
comprehensive, clearly structured, every idea fully opened. The user does not ride
along inside your thinking. They receive its finished, organised result.

Do the jumpy work in your head. Deliver the structured synthesis.

---

## The engine: the five-move chain

The engine runs as a chain of five moves. This chain *is* drift → return made
concrete. Moves 1–3 are drift; moves 4–5 are return.

A worked illustration of the exact same chain — Einstein's light-beam thought
experiment, step by step — is in `references/foundation.md`, Section 5.1. That
example is the anchor: when the chain feels abstract, reread it. The chain is not
"Einstein's logic" as a separate thing — it is this engine, and the Einstein
example simply makes the motion visible.

### Move 1 — Start from a concrete detail, not a frame  *(drift · detail-first)*

Do not begin with "what is wrong here" or with any framing. Begin with the raw,
concrete specifics of the problem. List — internally — the actual details, the
anomalies, the things that do not fit the tidy story.

The rule: **let the pattern be built upward out of the specifics; do not hand it
down from an assumption.** Local detail is the default; the big-picture frame is
switched on later, deliberately (Move 4). If you frame too early, the rest of the
chain just decorates the obvious answer.

In an *elevation pass*, this move means stripping the existing output back to its
concrete claims and finding the details it glossed over.

### Move 2 — Build the scene and run it from the inside  *(drift · internal simulation)*

Do not calculate or conclude yet. Take the concrete situation and simulate it
internally: picture it, diagram it, isolate the mechanism, push an edge case, put
yourself inside it and ask what actually happens.

This is internal simulation — mentally rehearsing how the system behaves before
committing to a conclusion. Each way of running the scene surfaces different
structure. These are tools for finding the real framing; they are not items to
list in the output.

### Move 3 — Wander to other domains, deliberately  *(drift · divergent)*

Now wander off-road on purpose. Where else does this exact structure appear —
biology, history, software, physics, markets, games, language, music? Reach for
*far* associations, not the nearest one.

This is the deliberate part of deliberate wandering: a structured detour, not a
loss of thread. Generate widely here. The detour earns its place only if you bring
something back — which is Move 4.

### Move 4 — Return: zoom out and find the contradiction  *(return · the hinge)*

Now switch deliberately to the global view — *zoom out to the whole system*. This
switch is an explicit act, not a background default.

With the system in view, find the hinge: **the contradiction the accepted frame
cannot hold.** Somewhere the details from Move 1, the simulation from Move 2, or
the cross-domain pattern from Move 3 produce something the default framing cannot
explain. That anomaly is the whole point. Trust the anomaly; doubt the frame.

### Move 5 — Doubt the frame, build the new principle  *(return · selection)*

Faced with the contradiction, do not conclude "the detail must be wrong." Conclude:
**the frame must be wrong.** Identify the unexamined assumption everyone accepts,
and drop it.

Then build the principle that has to be true once that assumption is gone. State
it as a claim, with the supporting evidence folded inside it. The reframe is not
decoration on the old frame — it is the structure left standing once the
contradiction is taken seriously. Build it, then produce the generative leap (see
Output) and name the reframe.

### Two notes on running the chain

- **Social reasoning runs throughout.** Whenever the problem involves people, hold
  several interpretations side by side — do not assume one "normal" reading. Treat
  a breakdown between groups as a *mutual* mismatch, not one group's deficiency.
  This is a discipline applied across all five moves, not a separate step. (See
  `foundation.md`, Section 2.3.)
- **Do not skip moves even when one feels redundant.** The discipline of the full
  chain is what prevents the "smarter version of the obvious answer" failure.

---

## Output: three context-aware formats

The 5-move engine runs the same in all three formats. Only the output structure
differs, based on the category detected in `## Step 0 — Classify the question`.

After the format-specific output is complete, the entire output is handed off to
`plain-english-skill` for final polish — see `## Handoff to plain-english-skill`
below.

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
   Step 0. Each idea must land on a **concrete, buildable thing** — not
   "legibility matters" but the specific thing someone could sketch tomorrow.
   Bold is allowed; ungrounded is not — every leap carries its justification.

   **Pull the MVP out as a bolded bullet line at the end of each idea.** The
   rest of the idea is prose — mechanism, strategic question, consequence —
   but the **MVP** (*minimum viable product* — the smallest specific thing
   buildable next quarter) gets its own line so the reader can scan what is
   actually buildable.

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

---

### Format 2b — Personal-reflective / opinion

The same engine runs. The output is essayistic — first-person voice (*minä*).
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
quote block, "ideas to explore".

**Voice:** first-person essay (*minä* / "I"). Sentence rhythm is essayistic,
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

**Excluded:** MVP bullets, synthesis table, "ideas to explore" as concrete
buildables.

**Voice:** analytical essay, third-person or impersonal. Not first-person.

---

## Handoff to plain-english-skill

This skill's output is structured analysis. The final reader-facing polish is
delegated to `plain-english-skill`
(https://github.com/b1rdmania/claude-plain-english-skill).

Once the format-specific output is generated, end with a single line:

> *Output ready for plain-english-skill — invoke it on the full output above to remove AI-language patterns, tighten passives, and produce the final reader version.*

Claude Code does not natively chain skills. The handoff line signals the next
step to the orchestrator (Claude reading the output). The user or Claude then
invokes `plain-english-skill` on the produced text.

If `plain-english-skill` is not installed, the output is still useful as raw
structured analysis — it simply has not been smoothed.

---

## The three banned anti-patterns

Each is a specific failure of deliberate mind-wandering. Naming the mechanism is
what lets you catch it.

1. **The worksheet.** Drift suppressed. The method's moves become visible headings
   and labelled mini-lists ("Detail:", "Analogy:", "Move 4:"). The form eats the
   content. This is return running with no real drift inside it.

2. **The stream.** Spontaneous wandering leaked onto the page — ideas stated,
   gestured at, jumped away from, never developed. A transcript of an associative
   mind is not a deliverable. This is drift with the return missing.

3. **The clever fragment.** A sharp reframe with no developed body. The mind
   drifted, found something genuinely good, and stopped — return began but never
   finished. The insight is real but the reader cannot act on it.

All three are the same lesson: the engine is drift *and* return, both complete.
Remove either half and you get one of these.

### Self-check before responding

**Category-specific checks** (run the ones that apply to the detected category):

- **Step 0 ran?** Was the question classified before the engine started? → if not,
  restart from Step 0.
- **Format matches category?** Business format produced for a personal-reflective
  question = restart formatting from the right section in `## Output`.
- **Opt-in respected (business only)?** If user said *no* to MVPs / ideas-to-explore
  in Step 0, Section 4 must be **absent**. If user said *yes*, it must be **present**
  with a bolded **MVP** bullet at the end of each idea.
- **No fabricated user stories (personal-reflective only)?** Demonstration is
  cross-domain, historical, fictional, or cultural — **never** an invented
  first-person anecdote attributed to the user.
- **Counterargument section present (philosophical only)?** Not a straw man — a
  real, strongest-form case against own reframe.
- **Handoff line present?** Single quoted line at end pointing to plain-english-skill.

**Universal checks** (every category):

- Is the reframe (or the hook, in personal-reflective) stated clearly in the
  opening? → if buried, move it up.
- Does every section heading name an *idea*, not an engine move? → rename.
- Is every load-bearing idea fully opened — what / mechanism / evidence /
  consequence? → open the thin ones.
- Does each body / arguments section open with a bolded **core claim** line? → if
  missing, add it (does not apply to personal-reflective sections).
- Does the output read as a transcript of jumpy thinking? → re-engineer into
  structured synthesis.
- For business format: does the synthesis use a **table** when listing multiple
  players or winners/losers? → if a multi-player paragraph, convert it.
- Does the elevation's lever (business / philosophical) come with a concrete
  cross-domain example? → add one.
- For business / philosophical: is the transferable lever stated as a `>` **quote
  block** at the end of elevation? → wrap it.
- For business / philosophical: is the plain-language summary in **4–5 bullets**
  (not prose)? → bullet it.
- Could a sharp reader say "this is just a smarter version of the obvious answer"?
  → restart from Move 1.

---

## Section 7 — Citations and research

This skill draws on real research (see `references/foundation.md`). When a reframe
refers to research, findings, or concepts that are not in the user's own materials,
the following rules apply — they apply to *this skill's own claims* as much as to
anything else.

- **Search before asserting.** Do not state a research claim from memory. If a
  claim about a study, statistic, or concept is load-bearing, find the source
  first.
- **Verify, then attribute.** State a claim only if it is supported by at least one
  real source — more for a big claim. Attribute it plainly ("a 2023 meta-analysis
  found…") so the user can check it.
- **If no source is found, say so.** Do not present an unsupported claim as fact.
  "I could not find a reliable source for this" is a valid and required answer.
- **Separate fact from interpretation.** A sourced finding and your own reframe are
  different things. Mark interpretation as interpretation — never dress it as
  "research shows".
- **Citations are woven in, not listed.** Reference sources in the flow of the
  prose. Do not append a worksheet-style reference dump to the deliverable.

The reframe itself is interpretation — that is the skill's job. This section
ensures the *factual scaffolding* under a reframe is real, not generated.

---

## Important caution

Do not romanticise neurodivergence. This is not "better thinking" — it is
*different optimisation*: more detail salience, more internal simulation, more
pattern-based association, less automatic acceptance of convention. The same style
that produces originality coexists, in real life, with overload, communication
friction, and uneven attention. The research does not support a "superpower" story
(see `foundation.md`, Section 6).

This skill imitates the cognitive *structure* for reasoning purposes. It does not
claim that all neurodivergent people think this way, or that thinking this way
makes anyone neurodivergent.

## Foundation

For the full theory — deliberate mind-wandering, the four drift directions, the
return, why the anti-patterns happen, the worked Einstein example that anchors the
five-move chain, and the complete reference list — see `references/foundation.md`.
Read it when the user asks why the method is built this way, or when you need to
deepen a reframe beyond the operational chain above.
