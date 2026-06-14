# Repo comparison arena: `neurodivergent-mode` vs `adhd`

A head-to-head between two agent-skill repos that fight the same enemy — the
obvious first answer — by different means.

- **`neurodivergent-mode`** (eskokoivula): https://github.com/eskokoivula/neurodivergent-mode
- **`adhd`** (UditAkhourii): https://github.com/UditAkhourii/adhd

## Method: how this arena was run

This comparison borrows the home repo's own selection discipline so it cannot
quietly favour the home repo:

1. **Independent lenses.** Eleven scoring dimensions, each judged on its own
   merits, 0–10, against evidence read directly from both repos (skill bodies,
   source code, evals, research notes, docs).
2. **Blind-critic pass.** After scoring, every lean was attacked: where did the
   home repo get a soft mark, where did the challenger get punished for being
   less finished? Corrections are recorded below.
3. **Anti-flattening rule.** A repo is not downranked for being unconventional,
   nor uppranked for being familiar. Strength is scored, not comfort.
4. **Label, don't delete.** Both repos' weaknesses are named with reasons, not
   buried. The reader is the final judge and can re-weight.

Scores were verified against primary material, not memory. Where a claim could
not be checked (for example, third-party effectiveness), the dimension says so.

## The contestants, in one line each

- **`adhd`** is a *divergent-ideation* engine: spawn N isolated branches under
  different cognitive frames, score and cluster, prune traps, deepen the
  survivors. It ships as a skill **and** a runnable TypeScript library with a
  CLI, benchmarks, and an adoption list. Goal: escape premature convergence and
  surface non-obvious-but-viable options.
- **`neurodivergent-mode`** is a *structural-reframing* engine: run a five-move
  drift-then-return chain, then test the reframe in a blind adversarial arena
  before shipping it. It targets a finished, defended deliverable in one of three
  formats. Goal: attack the frame that produced the question, not just the
  answer.

They overlap in mechanism (parallel divergence under frames, then a separate
critic) but aim at different products: a wide idea set versus a single sharpened
reframe.

## Scoring frame

Each dimension carries a weight reflecting what makes an agent skill strong in
practice. Weights sum to 100.

| # | Dimension | Weight | What it measures |
|---|---|---:|---|
| 1 | Core concept | 12 | Clarity and originality of the central idea |
| 2 | Theoretical grounding | 10 | Depth and honesty of the research basis |
| 3 | Output craft | 14 | Quality of the actual deliverable produced |
| 4 | Epistemic discipline | 12 | Bias control, selection rigor, handling being wrong |
| 5 | Implementation / runnability | 12 | Does it run as real, standalone code |
| 6 | Evidence of effectiveness | 10 | Evals, benchmarks, measured results |
| 7 | Documentation / onboarding | 8 | Install, clarity, learnability |
| 8 | Scope / applicability | 8 | Range of problems and platforms served |
| 9 | Adoption / external traction | 6 | Verifiable outside use |
| 10 | Engineering hygiene | 4 | Tests, CI, drift control |
| 11 | Intellectual honesty | 4 | Care in framing claims |

## The scorecard

| Dimension | Wt | adhd | nd-mode | Note |
|---|---:|---:|---:|---|
| Core concept | 12 | **9** | 8 | adhd's "isolation, not search; mechanical generator/critic split; frames, not personas" is razor-sharp and singular. nd-mode's idea is richer but heavier and more specialised. |
| Theoretical grounding | 10 | 5 | **9** | nd-mode's `foundation.md` opens twelve peer-reviewed sources in plain language and flags contested ones. adhd leans on a self-authored preprint and a prose spec. |
| Output craft | 14 | 8 | **9** | adhd ships a clustered idea set, ★ non-obvious pick, trap list, deepened branches, one provocation. nd-mode ships a finished, sourced reframe with a verdict block and built-in polish. Different products; nd-mode's is more publishable. |
| Epistemic discipline | 12 | 6 | **9** | adhd separates generator and critic and flags traps. nd-mode goes further: kill only on logic or a real test, consensus can only flag, sourced kills, an anti-flattening judge, six named failure modes, unjudged-not-dropped. |
| Implementation | 12 | **9** | 5 | adhd is a real TS/Node library: `engine.ts`, frame selection, concurrency, JSON-safe parsing, a CLI, an npm package. nd-mode's arena is a Workflow script bound to the Claude Code runtime; no standalone executable. |
| Evidence | 10 | **7** | 2 | adhd has `EVALS.md`: six problems, A/B-randomised, a separate judge model, per-problem rationales, and it reports its one loss. nd-mode measures nothing about output quality. |
| Documentation | 8 | **9** | 8 | adhd has seven doc pages, badges, a side-by-side, and install for 50+ agents. nd-mode's docs are strong but Claude-only. |
| Scope | 8 | **9** | 6 | adhd serves design, naming, API, debugging, strategy across many agents. nd-mode is deliberately narrower: reframing in three formats. |
| Adoption | 6 | **8** | 2 | adhd lists merged PRs, an npm package, a press feature, forks. nd-mode has no external adopters yet. |
| Hygiene | 4 | 7 | **9** | adhd has CI and clean config, with minor naming residue (`connect-dots` left in `SOURCE-SPEC.md`). nd-mode's `doctor.mjs` simulates every arena exit and a sync-map governs duplication. |
| Honesty | 4 | 6 | **9** | adhd reports its loss but markets hard (a 5.2× ratio rests on a near-zero baseline). nd-mode refuses the "superpower" story outright and hedges contested theory. |

### Weighted totals

- **`adhd`: 7.64 / 10**
- **`neurodivergent-mode`: 6.96 / 10**

adhd's edge comes almost entirely from product maturity: implementation,
evidence, adoption, scope. nd-mode leads on every *thinking-quality* dimension:
theory, output craft, epistemic discipline, hygiene, honesty.

### Sensitivity check

Strip out the two dimensions that reward shipping and outside validation
(Evidence, Adoption) and judge the designs purely on their intrinsic merit:

- **`neurodivergent-mode`: 7.90 / 10**
- **`adhd`: 7.69 / 10**

The ranking flips. So the result is not "one is better" — it is "they are
strong at different things, and which wins depends on whether you score the
shipped product or the idea behind it."

## Blind-critic pass: where the scores were attacked

- **Is adhd's Evidence (7) inflated?** The evals are self-administered, judged by
  one model not a human panel, n=6, single run. That caps the score below 8. It
  stays at 7 because real A/B work was done and the loss was published — far more
  than the alternative, which is nothing.
- **Is nd-mode's Implementation (5) too harsh?** `arena.js` is genuine, tested
  code, and `doctor.mjs` is unusually rigorous for a text repo. But the arena
  cannot run outside the Claude Code Workflow runtime and there is no general
  executable, so 5 is fair, not lower.
- **Home-repo favouritism check.** The overall verdict hands the edge to the
  challenger. That is the honest call given adhd's maturity, and it is the test
  that this comparison resisted home bias.
- **Underdog favouritism check.** nd-mode's wins on theory, hygiene, and honesty
  were verified against primary files (`foundation.md`'s citations, `doctor.mjs`'s
  path simulation, the "do not romanticise" caution). They are real, not charity.

## Verdict

**Which is stronger overall?** `adhd`, by a modest margin, *as a shipped and
validated product*. It runs as real code, proves something with benchmarks, has
outside adopters, and serves a wider range of work. If you instead weight the
quality of the design itself over distribution and validation, `neurodivergent-mode`
wins — see the sensitivity check.

**Which gives stronger output?** Split by job:

- For a **finished, defended answer** — a reframe you could publish, with sourced
  claims and a visible verdict — `neurodivergent-mode` is stronger.
- For **breadth and trap-spotting** — many distinct ideas, the seductive-but-broken
  ones flagged before they cost you — `adhd` is stronger.

nd-mode's output is more *finished*; adhd's is more *generative*.

**Which has more thought in it?** `neurodivergent-mode`. Its research grounding,
its epistemics (consensus can only flag, kills must be sourced, the judge may not
flatten the weird-but-right survivor), and its refusal to overclaim are a deeper
treatment of the generate-then-select problem than adhd offers. The fair
counterweight: adhd carries more *engineering* thought and more *empirical*
effort, and its core idea is the cleaner one-liner.

## The honest caveat: they are not the same tool

`adhd` is a brainstorming widener — it gives you a bigger, better-sorted menu.
`neurodivergent-mode` is a frame-breaker — it tries to change the question, then
defend the new one. A head-to-head total is therefore partly apples to oranges.
Pick adhd when you want options and trap detection on a code or design decision.
Pick neurodivergent-mode when the problem is that you are asking the wrong
question, and you need one strong, sourced reframe you can stand behind.

> The strongest *product* here is `adhd`. The deepest *thinking instrument* is
> `neurodivergent-mode`. Neither result is close to unanimous, and the reader
> can re-weight the table above to their own job.

## How objectivity was kept

- Both repos were cloned and read in full before any score was assigned.
- The home repo's own discipline judged the contest, including the rule that
  forbids downranking the challenger for being less familiar or uppranking the
  home repo for being close at hand.
- Every weakness on both sides is named with a reason. The weights are visible
  and movable, so the verdict can be audited and overturned.
