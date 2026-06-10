# CLAUDE.md — maintainer notes for neurodivergent-mode

A Claude Code skill repo: markdown prompt-artifacts plus one Workflow script. No dependencies, no build step. The product is the text — most bugs here are text drift, not logic.

## Sanity check

```
node tools/doctor.mjs
```

Run after every edit. CI (`.github/workflows/check.yml`) runs the same script on every push and pull request. It checks: relative links resolve, `§` references match `foundation.md` headings, code fences balance, SKILL.md frontmatter stays ≤ 1024 chars, `arena.js` compiles with no forbidden globals, and the arena's terminal paths never drop a reframe unlabeled.

## Sync map — the duplication is deliberate; drift is not

`neurodivergent-mode/SKILL.md` and `neurodivergent-mode/references/arena.js` both carry the canon, because Workflow subagents never load the skill: every prompt must be self-contained. **If you edit one side, update its twin in the same commit.**

| Canon | SKILL.md | arena.js |
|---|---|---|
| Five-move chain | `## The engine: the five-move chain` | `generatorPrompt()` |
| Kill calibration | `## The selection layer` → What a kill needs | `criticPrompt()` |
| Output formats 2a / 2c | `### Format 2a` / `### Format 2c` | `judgePrompt()` — `businessFormat` / `philoFormat` |
| Anti-flattening rule | `## The banned anti-patterns` #4 | `judgePrompt()` hard limits |

## Contracts

- The Workflow runtime hands `args` to a script as a **JSON string** — parse before use (`arena.js` does this at the top).
- Arena exits: the markdown deliverable (normal), `{status:"no_survivors", killed:[], unjudged:[]}`, or `{status:"no_question"}`. Handling is documented in `neurodivergent-mode/SKILL.md` → `## The arena`.
- There are exactly **three** drift directions (detail-first, divergent, social); "global" is the return-side switch, never a fourth generator.

## Conventions

- English only, everywhere in the repo.
- Prose follows the skill's own polish rules (`SKILL.md` → `## Polish`).
- `HANDOFF.md` and `test-results/` are local-only (gitignored) — never commit them.
