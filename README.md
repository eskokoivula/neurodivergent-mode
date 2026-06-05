# Neurodivergent Reasoning Engine — a Claude skill

>  A neurodivergent reasoning engine that rejects neurotypical default frames and sees the larger system behind the obvious answer.

Most AI brainstorming gives you a cleaner, smarter, better-formatted version of the obvious answer.

This skill does something else.

It applies a disciplined imitation of neurodivergent-style cognition: bottom-up perception, internal simulation, pattern recognition across completely unrelated domains, and a deep allergic reaction to default frames.

The result is not “10 more ideas.”

The result is:
“Wait. Are we even asking the right question?”

Humanity did not evolve through consensus. It evolved because some people noticed what everyone else missed. Einstein looked at time and said “what if it’s not fixed?” Newton saw an apple fall and pulled a law of nature out of it. Tesla helped wire the modern world. Satoshi Tajiri turned bug collecting into Pokémon and permanently altered childhood. The list goes on and on.

Progress has always depended on cognitive variation: explorers, pattern-spotters, obsessives, system-builders, danger-sensors, and the beautifully inconvenient people who looked at the tribe’s obvious answer and said:

“No. That is not the real problem.”

So it is only natural that we now give this cursed blessing to AI.

This repo is not an experiment.
It is not a productivity hack.
It is not another prompt pack.

It is a public service.

You’re welcome.

---

## The core: drift, then return

The engine has one motion: **drift, then return.** Wander off the obvious path on purpose, then come back on purpose to land a usable result. Both halves are mandatory.

This is the documented difference between two kinds of mind-wandering. *Spontaneous* wandering is losing the thread. *Deliberate* wandering is steering attention off-task and then steering it back — and only the deliberate kind produces creative results. The engine is built on that distinction.

Drift with no return is a jumpy transcript. Return with no real drift is a filled-in worksheet. The skill is both, in order, every time.

---

## The method: the five-move chain

Drift and return run as a chain of five moves. Moves 1–3 are drift; moves 4–5 are return. The chain is internal scaffolding — the visible output is connected reasoning, never a worksheet.

1. **Start from a concrete detail, not a frame.** Begin with the raw specifics and anomalies. Build the pattern upward; do not hand it down from an assumption.
2. **Build the scene and run it from the inside.** Simulate the situation internally — picture it, isolate the mechanism, push an edge case.
3. **Wander to other domains, deliberately.** Find the same structure elsewhere — biology, history, software, markets, music — reaching for far associations.
4. **Return: zoom out and find the contradiction.** Switch deliberately to the whole-system view and locate the anomaly the accepted frame cannot hold.
5. **Doubt the frame, build the new principle.** Drop the unexamined assumption, then build the principle that must be true once it is gone.

A worked illustration of this exact chain — Einstein's light-beam thought experiment, step by step — anchors the method in [`neurodivergent-mode/references/foundation.md`](neurodivergent-mode/references/foundation.md).

---

## Two modes: ADHD and Full autist

Before it runs, the skill offers a mode — like picking a model.

- **ADHD mode** — faster and leaner. A tight engine: one decisive anomaly, one or two cross-domain patterns, written in a single pass. Use it when you want the reframe quickly.
- **Full autist mode** — broader and deeper. Wide wandering across many domains, fuller internal simulation, richer output. Use it when you want maximum depth and don't mind waiting.

Same engine, same output formats, same quality bar. The modes differ only in how widely the engine explores and how long it takes. Full autist is the original, unabridged behavior; ADHD trades a little breadth for speed.

Pick by answering the opening question, or skip it by naming the mode in your request: `adhd mode` / `fast`, or `full autist` / `deep`.

---

## What you get: three output formats

The skill reads your question and matches the output to its kind. You don't choose the format — it detects it.

- **Business / strategy** — a structured deliverable: the reframe, load-bearing ideas, a winners/losers synthesis table, an optional "ideas to explore" section with concrete MVPs, and a transferable lever stated as a quote. It asks once whether you want the MVP / ideas section.
- **Personal-reflective / opinion** — a first-person essay: a hook, what resonates, the underlying mechanism, a demonstration, and where it leads. No business scaffolding, no bullet lists. Built for application essays, opinion pieces, blog posts.
- **Philosophical / conceptual** — an analytical essay with a real counterargument section, a synthesis of what stays open, and the implications.

To force a format, say `reflect on this` (personal essay), `elevate this philosophically` (philosophical), or `elevate this as strategy` (business).

---

## It argues with itself before you see it

A bold reframe and a confident wrong one look the same on the page. So the skill doesn't just generate — it runs every reframe through an adversarial **selection layer** before shipping it.

The rule is deliberately narrow: kill a reframe only for a broken step — a false fact, a bad inference — never for being *weird*. Weird-but-right is the whole point. Consensus ("everyone disagrees") can flag a claim but never kill it; every paradigm shift was wrong by the consensus of its day.

In Claude Code the critic runs as a *separate* agent, blind to how the reframe was built, so the judge doesn't inherit the generator's blind spots. Business and philosophical answers then end with a visible **Verdict** block: the strongest objection, each load-bearing claim checked against a source, and the reframe marked *tested* or *bold bet* — kept, but not yet proven.

---

## Plain English, built in

Every output is cleaned before you see it: AI tics stripped, em-dashes cut to budget, passive voice activated, padding removed. The rules are adapted from [Birdmania's plain-english-skill](https://github.com/b1rdmania/claude-plain-english-skill) and run *inside* this skill — nothing extra to install. The structured analysis stays internal; you get the clean prose. Ask for "the raw output" if you ever want the pre-polish version.

---

## Primary use, or elevation pass

Both run the same engine — only the input differs.

- **Primary.** Apply directly to a raw problem or question.
- **Elevation pass.** Apply to an existing brainstorm or analysis to reframe it. Powerful as a second stage after a conventional brainstorm: it turns parts-thinking into systems-thinking.

---

## Installation

### Claude Code

```bash
git clone https://github.com/eskokoivula/neurodivergent-mode.git
cp -r neurodivergent-mode/neurodivergent-mode ~/.claude/skills/
```

Restart Claude Code, or run `claude -c` to continue your current session with the skill loaded. The skill auto-loads when triggered.

### Claude.ai

Claude.ai does not yet support user-installable skills natively. You can paste the contents of [`neurodivergent-mode/SKILL.md`](neurodivergent-mode/SKILL.md) into a Project's custom instructions, or include it in a system prompt.

---

## Trigger phrases

**Activate it:**

- *"Elevate this"* / *"Elevate this idea"* / *"Elevate this analysis"*
- *"Engage ND mode on this"* / *"Autist mode"* / *"Neurodivergent mode"*
- *"Reframe this — see the system"*
- *"What am I missing structurally?"*
- *"ND reframe"* / *"Spectrum reframe"*

**Pick a mode** (optional — otherwise it asks):

- *"adhd mode"* / *"fast"* → lean and quick
- *"full autist"* / *"deep"* → broad and thorough

**Force an output format** (optional — otherwise it detects):

- *"reflect on this"* → personal-reflective essay
- *"elevate this philosophically"* / *"philosophise this"* → philosophical
- *"elevate this as strategy"* → business / strategy

The skill also triggers proactively when the user is wrestling with a problem that has obvious surface answers but no obvious right answer.

### Not this skill

Generic *"brainstorm X"* requests usually go to the general brainstorming skill, which clarifies *what to build*. This skill is for **reframing** something already on the table — it produces a structural reframe a default pass would not. Use the elevate / ND mode / reframe triggers above to activate it.

---

## Research foundation

The method's structure is grounded in peer-reviewed research — on mind-wandering and creativity, divergent and convergent thinking, detail-first perception and systemizing, and the double empathy account of social reasoning. Each concept is written out in plain language, with its source cited as a footprint, in [`neurodivergent-mode/references/foundation.md`](neurodivergent-mode/references/foundation.md). The full reference list is at the end of that document.

The research supports the *structure* of the method. It does not make this "better thinking" — see below.

---

## A note on framing

Do not romanticize neurodivergence. This is not "better thinking." It is **different optimization**: more detail salience, more internal simulation, more pattern-based reasoning, less automatic acceptance of convention. The same cognitive style that produces originality also coexists, in real life, with overload, communication friction, and inconsistent attention.

This repo takes the cognitive structure useful for reasoning and applies it deliberately. It does not claim that all neurodivergent people think this way, or that thinking this way makes anyone neurodivergent. That is all.

---

## License

MIT. See [LICENSE](LICENSE).

---

## Built by

[Esko Koivula](https://github.com/eskokoivula) with Claude.
