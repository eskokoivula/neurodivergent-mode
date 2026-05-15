# Neurodivergent Reasoning Engine

> Neurodivergent reasoning engine that rejects neurotypical default frames and sees the larger system behind the obvious answer.

Most AI brainstorming gives you a cleaner, smarter, better-formatted version of the obvious answer.

This skill does something else.

It applies a disciplined imitation of neurodivergent-style cognition: bottom-up perception, internal simulation, pattern recognition across completely unrelated domains, and a deep allergic reaction to default frames.

The result is not “10 more ideas.”

The result is:
“Wait. Are we even asking the right question?”

Humanity has been quietly carried by this kind of thinking for a while. Einstein looked at time and said “what if it’s not fixed?” Newton watched an apple fall and accidentally gave everyone physics homework for 300 years. Tesla helped wire the modern world. Satoshi Tajiri turned bug collecting into Pokémon and permanently altered childhood. The list goes on.

So it is only natural that we now give this cursed blessing to AI.

This repo is not an experiment.
It is not a productivity hack.
It is not another prompt pack.

It is a public service.

You’re welcome.

---

## The method

Six thinking steps, applied in order. Each is internal scaffolding — the visible output is connected reasoning, never a worksheet:

1. **Start with raw observations, not a conclusion.** Strip the problem back to its concrete details before any framing is applied.
2. **Force multiple internal representations.** Picture it, diagram it, find an analogy, isolate the mechanism, push an edge case. Each surfaces different structure.
3. **Ask what is broken, missing, or inconsistent.** What does the framing leave out? Where does the logic quietly assume something unproven?
4. **Search for hidden patterns across unrelated domains.** Where else does this same structure appear — biology, history, software, markets, music?
5. **Build the principle only after the details repeat.** State the principle as a claim, with examples folded inside it. Counting is internal work; it never appears in the output.
6. **Challenge the default assumption.** Identify the accepted frame and present the reframe as the natural endpoint of the reasoning.

---

## Two modes

Both modes use the same six-step method. Only the input differs.

- **Primary brainstorming.** Apply directly to a raw problem or question.
- **Elevation pass.** Apply to an existing brainstorm or analysis to reframe it. Especially powerful as a second stage after a conventional brainstorm — it transforms parts-thinking into systems-thinking.

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
- *"Brainstorm this in neurodivergent mode"*
- *"Elevate this with ND reasoning"*
- *"What am I missing structurally?"*
- *"Reframe this — see the system"*

The skill also triggers proactively when the user is wrestling with a problem that has obvious surface answers but no obvious right answer.

---

## Why this works

Spectrum-style cognition has a different optimization profile: more detail salience, more internal simulation, more pattern-based reasoning, less automatic acceptance of convention.

- **Temple Grandin** describes her own thinking as picture-based and similar to mentally test-running designs before building them.
- **Einstein** worked through thought experiments — turning problems into mental scenes and examining them from inside.
- **Tesla** mentally constructed, adjusted, and tested inventions before manufacturing, refining the design until he saw no fault.
- **Da Vinci's** notebooks show relentless observation converting into principle — a classic bottom-up path to insight.

This skill imitates the *cognitive structure* of that mode for reasoning purposes. It does not claim that all neurodivergent people think this way, or that thinking this way makes anyone neurodivergent.

For the full theoretical foundation, see [`neurodivergent-mode/references/foundation.md`](neurodivergent-mode/references/foundation.md).

---

## A note on framing

Do not romanticize neurodivergence. This is not "better thinking." It is **different optimization**. The same cognitive style that produces originality also coexists with overload, communication friction, and inconsistent attention in real life.

This repo takes the cognitive structure useful for reasoning and applies it deliberately. That is all.

---

## License

MIT. See [LICENSE](LICENSE).

---

## Built by

[Esko Koivula](https://github.com/eskokoivula) with Claude.
