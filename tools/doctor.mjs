#!/usr/bin/env node
// tools/doctor.mjs — mechanical invariant checks for this repo.
//
// The product of this repo is text, and its bug history is text drift: a broken
// relative path (PR #4), stale § references (commit 1f169b1), a stray code-fence
// trap (PR #1). This script rejects those classes mechanically, and simulates the
// arena's terminal paths so no reframe can ever end unlabeled. Zero dependencies.
//
// Run:  node tools/doctor.mjs     → exit 0 = healthy, exit 1 = failures (listed)
// CI:   .github/workflows/check.yml runs this on every push and pull request.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKILL = "neurodivergent-mode/SKILL.md";
const FOUNDATION = "neurodivergent-mode/references/foundation.md";
const ARENA = "neurodivergent-mode/references/arena.js";

// Local-only or generated content is not audited.
const EXCLUDED_DIRS = new Set([".git", ".claude", ".github", "node_modules", "test-results", "outputs", "tools"]);
const EXCLUDED_FILES = new Set(["HANDOFF.md"]);

let failures = 0;
const ok = (msg) => console.log("  ok    " + msg);
const fail = (msg) => { failures += 1; console.error("  FAIL  " + msg); };
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

function section(title, fn) {
  console.log(title);
  const before = failures;
  return Promise.resolve(fn()).then((value) => {
    if (failures === before) ok("clean");
    return value;
  });
}

function mdFiles() {
  const out = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!EXCLUDED_DIRS.has(entry.name)) walk(path.join(dir, entry.name));
      } else if (entry.name.endsWith(".md") && !EXCLUDED_FILES.has(entry.name)) {
        out.push(path.join(dir, entry.name));
      }
    }
  })("");
  return out;
}

// --- 1. Relative markdown links must resolve --------------------------------
function checkLinks(files) {
  for (const file of files) {
    const dir = path.dirname(file);
    read(file).split("\n").forEach((line, i) => {
      for (const m of line.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
        const target = m[1];
        if (/^(https?:|mailto:|#)/.test(target)) continue;
        const clean = target.split("#")[0];
        if (clean && !fs.existsSync(path.join(ROOT, dir, clean))) {
          fail(`${file}:${i + 1} — link target does not exist: ${target}`);
        }
      }
    });
  }
}

// --- 2. § references must match a foundation.md heading ----------------------
// A § token is foundation-bound when "foundation" appears on its line or within
// the two lines above (other § tokens are internal format references).
function checkSectionRefs() {
  const headings = new Set();
  for (const m of read(FOUNDATION).matchAll(/^#{2,3}\s+(\d+(?:\.\d+)?)/gm)) headings.add(m[1]);
  for (const file of [SKILL, ARENA]) {
    const lines = read(file).split("\n");
    lines.forEach((line, i) => {
      if (!/foundation/i.test(lines.slice(Math.max(0, i - 2), i + 1).join("\n"))) return;
      for (const m of line.matchAll(/§\s?(\d+(?:\.\d+)?)/g)) {
        if (!headings.has(m[1])) {
          fail(`${file}:${i + 1} — §${m[1]} has no matching heading in foundation.md`);
        }
      }
    });
  }
}

// --- 3. Code fences must balance ---------------------------------------------
function checkFences(files) {
  for (const file of files) {
    const n = (read(file).match(/^```/gm) || []).length;
    if (n % 2 !== 0) fail(`${file} — unbalanced code fences (${n} fence lines)`);
  }
}

// --- 4. SKILL.md frontmatter: present, named, description ≤ 1024 chars --------
function checkFrontmatter() {
  const text = read(SKILL);
  if (!text.startsWith("---\n")) return fail(`${SKILL} — missing frontmatter`);
  const end = text.indexOf("\n---", 4);
  if (end === -1) return fail(`${SKILL} — unterminated frontmatter`);
  const fm = text.slice(4, end);
  const name = fm.match(/^name:\s*(.+)$/m);
  const desc = fm.match(/^description:\s*(.+)$/m);
  if (!name || !name[1].trim()) fail(`${SKILL} — frontmatter has no name`);
  if (!desc || !desc[1].trim()) return fail(`${SKILL} — frontmatter has no description`);
  const len = desc[1].trim().length;
  if (len > 1024) {
    fail(`${SKILL} — description is ${len} chars (max 1024: longer descriptions get truncated in skill listings, hiding triggers from the router)`);
  } else {
    ok(`description is ${len} chars`);
  }
}

// --- 5. arena.js: compiles, no forbidden globals, meta intact -----------------
function checkArenaStatic() {
  const src = read(ARENA);
  for (const [re, what] of [
    [/\bDate\.now\s*\(/, "Date.now()"],
    [/\bMath\.random\s*\(/, "Math.random()"],
    [/\bnew\s+Date\s*\(\s*\)/, "new Date()"],
  ]) {
    if (re.test(src)) fail(`${ARENA} — forbidden global ${what} (breaks Workflow resume)`);
  }
  const meta = src.match(/export const meta = \{[\s\S]*?\n\};/);
  if (!meta) fail(`${ARENA} — export const meta block not found`);
  else for (const key of ["name:", "description:", "phases:"]) {
    if (!meta[0].includes(key)) fail(`${ARENA} — meta block missing ${key}`);
  }
  // node --check cannot parse a Workflow script (top-level return/await + export),
  // so: strip the export keyword, compile as an async function body.
  const AsyncFunction = (async () => {}).constructor;
  try {
    return new AsyncFunction(
      "args", "budget", "agent", "pipeline", "parallel", "log", "phase", "workflow",
      src.replace(/^export\s+/m, "")
    );
  } catch (e) {
    fail(`${ARENA} — does not compile: ${e.message}`);
    return null;
  }
}

// --- 6. Arena terminal-path simulation ----------------------------------------
// Stubbed agents drive the script through every exit. The invariant under test:
// no generated reframe may end unlabeled, and no terminal path may throw
// (the skill's own anti-pattern 6, "the lossy kill", applied to the code).
async function checkArenaPaths(compiled) {
  if (!compiled) return fail("simulation skipped — arena did not compile");

  const KILL = {
    survives: false,
    killReason: { kind: "false-fact", ground: "real-test", evidence: "a primary source contradicts claim one" },
    strongestObjection: "the objection",
  };
  const PASS = {
    survives: true,
    strongestObjection: "the objection",
    consensusFlags: [],
    sourceChecks: [{ claim: "claim one", verdict: "verified", source: "src" }],
  };

  async function run({ question = "Why do platforms decay?", critic }) {
    const calls = { count: 0, judgePrompt: null };
    const agentStub = async (prompt, opts = {}) => {
      calls.count += 1;
      if (opts.phase === "generate") {
        const id = opts.label.includes("detail") ? "detail-first"
          : opts.label.includes("divergent") ? "divergent" : "social";
        const frame = { "detail-first": "FRAME_detail", divergent: "FRAME_divergent", social: "FRAME_social" }[id];
        return {
          driftDirection: id,
          frame,
          loadBearingClaims: [
            { claim: "claim one", type: "fact", soWhat: "matters" },
            { claim: "claim two", type: "inference", soWhat: "matters" },
          ],
          sources: [],
        };
      }
      if (opts.phase === "critique") return critic(prompt);
      calls.judgePrompt = prompt;
      return "JUDGE_OUTPUT";
    };
    // pipeline per the Workflow contract: stages get (prev, originalItem, index);
    // a throwing stage drops the item to null; a null return passes through.
    const pipelineStub = (items, ...stages) =>
      Promise.all(items.map(async (item, i) => {
        let prev = item;
        for (const stage of stages) {
          try { prev = await stage(prev, item, i); } catch { return null; }
        }
        return prev;
      }));
    const parallelStub = (thunks) => Promise.all(thunks.map((t) => Promise.resolve().then(t).catch(() => null)));
    const budgetStub = { total: null, spent: () => 0, remaining: () => Infinity };
    // The Workflow runtime hands args over as a JSON string — simulate that exactly.
    const argsJson = question === null
      ? JSON.stringify({})
      : JSON.stringify({ question, format: "business", isElevation: false, includeMvps: false });
    const result = await compiled(
      argsJson, budgetStub, agentStub, pipelineStub, parallelStub,
      () => {}, () => {}, async () => { throw new Error("nested workflow unavailable"); }
    );
    return { result, calls };
  }

  const expect = (cond, label) => (cond ? ok(label) : fail(label));

  try { // S1 — happy path
    const { result, calls } = await run({ critic: () => PASS });
    expect(result === "JUDGE_OUTPUT", "S1 happy path: judge writes the deliverable");
    expect(calls.count === 7, `S1: exactly 7 agents spawned (got ${calls.count})`);
    expect(["FRAME_detail", "FRAME_divergent", "FRAME_social"].every((t) => (calls.judgePrompt || "").includes(t)),
      "S1: judge sees all three surviving frames");
  } catch (e) { fail("S1 happy path threw: " + e.message); }

  try { // S2 — every reframe judged and killed
    const { result, calls } = await run({ critic: () => KILL });
    const parsed = JSON.parse(result);
    expect(parsed.status === "no_survivors", `S2: status is no_survivors (got ${parsed.status})`);
    expect(Array.isArray(parsed.killed) && parsed.killed.length === 3, "S2: all 3 kills listed with reasons");
    expect(Array.isArray(parsed.unjudged) && parsed.unjudged.length === 0, "S2: unjudged list present and empty");
    expect(calls.count === 6, `S2: no judge spawned (got ${calls.count} agents)`);
  } catch (e) { fail("S2 all-killed path threw: " + e.message); }

  try { // S3 — one critic never returns, the rest kill: no crash, no silent drop
    const { result } = await run({ critic: (p) => (p.includes("FRAME_detail") ? null : KILL) });
    const parsed = JSON.parse(result);
    expect(parsed.status === "no_survivors", "S3: status is no_survivors");
    expect(parsed.killed.length === 2, "S3: both real kills listed");
    expect(parsed.unjudged.length === 1 && parsed.unjudged[0].frame === "FRAME_detail",
      "S3: lost-critic lane carried as unjudged, not dropped");
  } catch (e) { fail("S3 null-verdict lane crashed the arena: " + e.message); }

  try { // S4 — null critic + a survivor: the judge must be told about the unjudged lane
    const { result, calls } = await run({
      critic: (p) => (p.includes("FRAME_detail") ? null : p.includes("FRAME_divergent") ? PASS : KILL),
    });
    expect(result === "JUDGE_OUTPUT", "S4: judge runs when a survivor exists");
    expect((calls.judgePrompt || "").includes("UNJUDGED REFRAMES") && (calls.judgePrompt || "").includes("FRAME_detail"),
      "S4: judge prompt carries the unjudged lane, labeled");
  } catch (e) { fail("S4 mixed-outcome path threw: " + e.message); }

  try { // S5 — missing question: fail fast, zero agents
    const { result, calls } = await run({ question: null, critic: () => PASS });
    const parsed = JSON.parse(result);
    expect(parsed.status === "no_question", "S5: missing question returns no_question");
    expect(calls.count === 0, `S5: zero agents spawned (got ${calls.count})`);
  } catch (e) { fail("S5 missing-question path threw: " + e.message); }
}

// --- run ----------------------------------------------------------------------
const files = mdFiles();
await section("1. relative markdown links resolve", () => checkLinks(files));
await section("2. § references match foundation.md headings", () => checkSectionRefs());
await section("3. code fences balance", () => checkFences(files));
await section("4. SKILL.md frontmatter", () => checkFrontmatter());
const compiled = await section("5. arena.js static checks", () => checkArenaStatic());
await section("6. arena terminal-path simulation", () => checkArenaPaths(compiled));

console.log(failures ? `\n${failures} check(s) failed.` : "\nAll checks passed.");
process.exit(failures ? 1 : 0);
