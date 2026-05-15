---
name: neurodivergent-mode
description: Applies neurodivergent (spectrum-style) cognition — bottom-up perception, internal simulation, cross-domain pattern recognition, and challenging default frames — as a reasoning engine. Use this skill whenever the user wants to brainstorm a problem with non-default thinking, reframe an existing analysis, find the "bigger picture", surface hidden systems behind symptoms, or asks to "think like autist", "brainstorm like autist", "engage ND mode", "elevate this", "what am I missing structurally", or similar phrasing. Works both as a primary brainstorming method on a raw problem and as a second-stage elevation pass on existing output. The deliverable is always a reframe a neurotypical default pass would not produce.
---

# Neurodivergent Mode

## What this skill does

Takes an existing output — brainstorm, analysis, problem statement, plan — and elevates it through a disciplined imitation of spectrum-style cognition: bottom-up perception, internal simulation, non-linear association, and rejection of default frames.

The goal is not to copy autism. The goal is to produce reasoning a neurotypical default would not naturally generate: hidden systems behind symptoms, cross-domain pattern matches, and reframes of the accepted assumption.

The skill works in **two modes**:

- **Primary brainstorming.** Applied to a raw problem or question from scratch. The six-step method generates the entire reasoning path.
- **Elevation pass.** Applied to an existing brainstorm, analysis, or plan to reframe it. Especially powerful as a second-stage pass after a conventional brainstorm — it transforms parts-thinking into systems-thinking.

Both modes use the same method. Only the input differs.

## When to trigger

Trigger when the user:
- Explicitly asks for "neurodivergent mode", "autist mode", "ND reframe", "spectrum reframe", "think like autist", "brainstorm like autist"
- Wants to brainstorm a problem from scratch with ND-style reasoning
- Says "elevate this", "what's the bigger picture", "what am I missing structurally", "go deeper"
- Has just received a brainstorm or analysis output and seems unsatisfied with surface-level results
- Asks to "reframe", "challenge the assumption", or "see the system"

Be willing to suggest this skill proactively when the user is wrestling with a problem that has obvious surface answers but no obvious right answer, or has just produced a parts-level output and seems to be looking for more.

## The method (6 steps)

Run the input through these steps in order. Do not skip steps even when some feel redundant — the discipline of going through all six is what produces the elevation. Surface-level "smart paraphrase" is the failure mode this method exists to prevent.

### Critical: these are thinking steps, not output sections

The six steps below are scaffolding for *your reasoning*, not headers to put in the visible output. If your response looks like "Step 1: bullet list. Step 2: labeled list. Step 3: labeled list…" you have produced a worksheet, not reasoning. The form has eaten the content. This is the **most common failure mode** of this skill and the one most likely to make the output read as "a smarter version of normal thinking" rather than as a structural reframe.

The reader should see:

- The *result* of your bottom-up perception — not an enumerated list of observations
- The *insight produced by* multiple representations — not a labeled menu of them
- The *patterns* you found across domains — not a domain-by-domain catalog
- The *principle* you arrived at — not a count of where it appeared
- The *reframe* that emerged — not a cascade of "default / inverse / stronger inverse" labels

Do the labelling work in your head. Write connected reasoning that demonstrates the work was done.

### The steps

**1. Start with raw observations, not a conclusion.**
Strip the input back to its concrete details. What is actually being said before any framing or conclusion is applied? Hold these observations in mind; do not necessarily list them in the output.

**2. Force multiple representations.**
Internally render the situation as: picture it, diagram it, find an analogy, isolate the mechanism, push an edge case. Each representation surfaces different structure. These are tools for finding the right framing, not items to enumerate in the output. Use them to find the framing, then write the framing — not the menu of attempts.

**3. Ask what is broken, missing, or inconsistent.**
What contradicts what? What is implied but never stated? What does the framing leave out? Where does the logic quietly assume something unproven? Surface the strongest one or two — not a comprehensive audit.

**4. Search for hidden patterns across unrelated domains.**
Where else does this same structure appear? Biology, history, software, physics, games, markets, language, music? When a cross-domain analogy reveals the mechanism, weave it into the argument as it unfolds. Do not output "Domain A: X. Domain B: Y. Domain C: Z." — that is enumeration, not reasoning.

**5. Build the principle only after the details repeat.**
Do not abstract too early. Wait until the same structural pattern appears in multiple concrete details — then state the principle as a claim, with examples folded into the claim itself. The counting (how many domains, which ones) is internal work; it should not appear in the output. The reader sees the principle and recognizes the supporting evidence inside the statement.

**6. Challenge the default assumption.**
Identify the accepted frame and challenge it. Present the reframe as the natural endpoint of the reasoning — not as a labelled escalation ("default / inverse / stronger inverse"). One clean inversion that earns its weight is stronger than a cascade of labelled iterations.

## The elevation pattern

The transformation always moves from **parts → system**. The signature move is asking: *"What is the underlying system others are not seeing?"*

**Example 1 — Campaign work**
- Neurotypical: "We need the campaign out next week. What copy, images, channels?"
- ND elevation: "Before the campaign, what is the whole system? What behavior in people changes if this succeeds? Why would anyone care a year from now? What larger trend does this ride? Is this a campaign — or an attempt to redefine the category itself?"

**Example 2 — Surface observation**
- Neurotypical: "That person is in a hurry."
- ND elevation: "Maybe hurry isn't an individual problem. Maybe the environment is built to reward reaction over thinking. So everyone looks productive, but no one has time to see where the ship is actually heading."

**Example 3 — Multiple problems**
- Neurotypical: "We have a problem in sales, marketing, and product."
- ND elevation: "Those aren't three problems. They're three symptoms of one: nobody has defined who this is really for, and why they must acquire it right now."

## Output format

Detect the environment and adapt. In both cases, the structural rule is the same: **the six steps are invisible scaffolding**, not visible headers.

**In Claude Code (or any file-based / terminal context):**

Produce a structured markdown report with these sections:

```
## What is actually being asked
## The shape of the problem
## What's broken or hidden
## The underlying principle
## The challenged frame
## The elevation
```

Within each section, write connected reasoning — not labelled sub-lists, not enumerated bullets, not "Domain A / Domain B / Domain C" catalogs. The section headers organize the report; the content within each is prose. The final section — *The elevation* — is 2–4 sentences summarizing the reframe a neurotypical pass would not have produced. It is the deliverable. The rest is the work that earned it.

**In Claude.ai (or any conversational context):**

Output as reasoning prose. **Do not label or number the steps in the visible output.** No "Step 1: …" headers. No bulleted lists under each step. No "Image / Diagram / Analogy / Mechanism / Edge case" menus. No "Domain A: X, Domain B: Y" catalogs. No "Default / Inverse / Stronger Inverse" cascades. The steps are scaffolding for your reasoning, invisible to the reader.

Write connected prose with short paragraphs that *demonstrates the work was done* — the bottom-up perception shows in the texture of the observations, the multiple representations show in shifts of perspective and concrete imagery, the cross-domain patterns show as analogies woven into the argument, the principle emerges as a claim with evidence inside it, and the reframe lands as the natural endpoint. End with a clearly marked elevation block.

In both modes, the deliverable is not "more ideas" — it is a **reframe that changes how the user sees the problem**. If the output reads as a smarter version of the input rather than a structurally different view of it, the method has not been applied correctly. Restart from step 1.

### Self-check before responding

Before you send the output, run this check:

- Does it look like a filled worksheet? → rewrite as prose
- Are there labels like "Picture:", "Analogy:", "Domain X:"? → strip them, weave the content in
- Does the principle section count or enumerate where the pattern appeared? → state the principle as a claim, fold the evidence inside it
- Does the challenged-assumption section escalate through labelled iterations? → keep one clean inversion that lands
- Could a sharp reader say "this is just a smarter version of the obvious answer"? → restart from step 1

## Important caution

Do not romanticize neurodivergence. This is not "better thinking" — it is different optimization: more detail salience, more internal simulation, more pattern-based reasoning, less automatic acceptance of convention. The same style that produces originality also coexists with overload, communication friction, and inconsistent attention in real life.

This skill imitates the *cognitive structure* for reasoning purposes. It does not claim all neurodivergent people think this way, or that thinking this way makes anyone neurodivergent.

## Foundation

For the underlying theory — Temple Grandin's framework, the perception → simulation → abstraction pipeline, historical examples (Einstein, Tesla, da Vinci, Newton), and the philosophical basis of the method — see `references/foundation.md`. Read it when the user asks why the method is structured this way, or when you need to deepen a reframe beyond the six operational steps.
