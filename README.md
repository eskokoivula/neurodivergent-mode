# Neurodivergent Reasoning Engine — a Claude skill

> Claude skill: a neurodivergent reasoning engine that rejects neurotypical default frames and sees the larger system behind the obvious answer.

Most AI brainstorming gives you a cleaner, smarter, better-formatted version of the obvious answer.

This skill does something else.

It applies a disciplined imitation of neurodivergent-style cognition: bottom-up perception, internal simulation, pattern recognition across completely unrelated domains, and a deep allergic reaction to default frames.

The result is not “10 more ideas.”

The result is:
“Wait. Are we even asking the right question?”

Humanity did not evolve through consensus. It evolved because some people noticed what everyone else missed. Einstein looked at time and said “what if it’s not fixed?” Newton saw an apple fall and pulled a law of nature out of it. Tesla helped wire the modern world. Satoshi Tajiri turned bug collecting into Pokémon and permanently altered childhood. The list goes on and on.

Progress has always depended on cognitive variation: explorers, pattern-spotters, obsessives, system-builders, danger-sensors, and the beautifully inconvenient people who looked at the tribe’s obvious answer and said:

“No. That is not the real problem."

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

## Two modes

Both modes run the same engine. Only the input differs.

- **Primary brainstorming.** Apply directly to a raw problem or question.
- **Elevation pass.** Apply to an existing brainstorm or analysis to reframe it. Especially powerful as a second stage after a conventional brainstorm — it turns parts-thinking into systems-thinking.

---

## Installation

### Claude Code

```bash
git clone https://github.com/eskokoivula/autist-mode.git
cp -r autist-mode/neurodivergent-mode ~/.claude/skills/
```

Restart Claude Code, or run `claude -c` to continue your current session with the skill loaded. The skill auto-loads when triggered.

### Claude.ai

Claude.ai does not yet support user-installable skills natively. You can paste the contents of [`neurodivergent-mode/SKILL.md`](neurodivergent-mode/SKILL.md) into a Project's custom instructions, or include it in a system prompt.

---

## Trigger phrases

- *"Engage ND mode on this"*
- *"Brainstorm this in neurodivergent mode"* / *"...in autist mode"*
- *"Elevate this with ND reasoning"*
- *"What am I missing structurally?"*
- *"Reframe this — see the system"*

The skill also triggers proactively when the user is wrestling with a problem that has obvious surface answers but no obvious right answer.

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
