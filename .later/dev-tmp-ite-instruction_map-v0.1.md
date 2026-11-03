---
description: "An instruction map: Steel/Programs/<Program>/Processes/<id>/map.md (format steel-flow/1), the nodes of a large process in order (step, decision, wait, parallel, join, sub-map), native, blended, or external, with a complete example"
---

# Filename: Steel/Programs/[Program]/Processes/[id]/map.md

/*
  An instruction map is a large instruction: the nodes of a process in order, with the claims that must hold
  before a step (precondition) and the claims that show that a step worked (effect). It is the file map.md in the
  folder of its process, beside process.md (tmp-ite-process-v0.1). A process gets a map when one description is
  not enough: more than one actor, a decision, a loop, a branch, or a step that waits for a claim.

  Steps are not parts. The main map says what the system is; an instruction map says how it moves. A step names
  the elements that it acts on with about (references: a part id, process:<id>, data:<id>). Each node is an
  element too (process:<id>#<node>): a claim can be about it, and a process can keep it up to date. Steel draws
  each map itself: no view names a map.

  THE GRAMMAR (the grammar of a view file)
  - The frontmatter: format "steel-flow/1"; entry (the id of the first node); exits (the ids of the nodes where a
    run ends); inputs (a list of { name, kind, required?, prompt? }; kind: text | number | boolean | choice |
    json | date | money); source (only for an external map: { ref: "[[<note>]]", hash } or
    { path: "@<Codebase>/<path>", hash } or { command: "<line>" }).
  - One H1: the title. The prose after it says what the map does, in one to three sentences.
  - One H2 for each node: "## Title {#id}" (the id is a lower-case slug), the instruction for a person under it,
    and one fenced block whose info word is the kind of the node.

  THE NODES
  - step: does ({ process: <id> }, or inline { by: person | agent, instruction: "...", target? }), next (one id, or a list of one
    id; none for an exit), run (auto | manual), inputs ({ <name>: "<value>" }), outputs (a list of fields, for
    an inline step), precondition (claim ids), effect (claim ids), retry ({ max, wait }), on-fail (a node id),
    timeout, session (an agent step: the id of an earlier agent step whose session it continues, with its context),
    source (a mirrored step: { ref | path | command, hash? }), about (references), reads (the
    data that the step reads). A step has no writes: a step writes a data item only when the data item names the
    process of the step in kept-by (the process of does, or the process of this map for an inline step). A node id
    runs is not allowed: process:<id>#runs is the data of the runs.
  - decision: question, by (person | agent; default person), outcomes ({ "<outcome>": <node id> }).
  - wait: one of claim: <id> (until it holds), until: "<ISO time>", for: 10m, or event: <event kind> (for example
          commit.landed or claim.holds: the next event of that kind that routes to the program; the node gets the
          output event); timeout; next.
  - parallel: next: [<id>, <id>, ...] (two or more).
  - join: wait: all | any; next.
  - sub-map: process: <id> (a process with a map.md), inputs, next. The child run names its parent run and node.

  THE DATA: ${inputs.<name>} names an input of the run; ${<node id>.<output>} names an output of an earlier node;
  ${<decision id>.answer} names an answer.

  RUN: the default is auto for a step that does a code process or an agent with no approval, and for each wait,
  parallel, join, and sub-map; manual (a person presses Begin) for a step of a person, a decision of a person, and
  a step whose process needs an approval.

  THE MODES (counted, never written): a step is mirrored when it has source or does a process with source, else
  native. A map with source in its frontmatter is external: each node is mirrored, and the map is only for view.
  All native: native. Both: blended.

  MIRRORS: a source with a hash (sha256 of the source text when you drew it: shasum -a 256 <file>) is a mirror.
  `flint ite process show "<program>" <id> --json` gives the state of each hash now (sources: same, changed,
  or missing). Write one normal claim for each mirror: Reality/<claim id>/claim.md with about:
  ["process:<id>"] for the source of the map or of its process, or ["process:<id>#<node>"] for a step whose
  own block has the source, and a check process check-<claim id> with recipe: source-unchanged and no trigger
  (`flint ite claim new ... --recipe source-unchanged` writes both; tmp-ite-claim-v0.1). The claim fails when the source changes. A process that draws the map again (an agent
  that proposes the new map.md as a revision of Steel/) gets the trigger
  { on: event, kinds: [claim.failed], about: ["claim:<claim id>"] }. The key redraw is gone: a source with it
  has a problem.

  THE HASH: the sha256 of the bytes of the source file. The file of a ref "[[<name>]]" is the Mesh note with that
  name, else the shard file with that name (for example Shards/<Shard>/workflows/<name>.md). The file of a path
  "@<Codebase>/<path>" is <path> in the folder that flint resolve codebase "<Codebase>" prints. Get the hash with:
    shasum -a 256 "<file>" | cut -d" " -f1
  and paste the 64 hex characters. A command has no hash: it is not a mirror.

  RULES
  - Loops go only out of a decision. A node gets at most 20 visits in one run.
  - Each node has a way to an exit. A join has a parallel before it. A sub-map names a process with a map.
  - A step that changes the world outside this machine does a process with irreversible: true, so a person
    approves it. A Done of a person is a report: only a check of an effect claim confirms the work.
  - After you write a map, run `flint ite flow show "<program>" <process>`: it gives the resolved map and its
    problems. A map with a problem of the level error does not start a run.
  - Never write a file of Runs/: only the run engine writes there.
*/

````markdown
---
format: steel-flow/1
entry: write-summary
exits: [ship]
inputs: [{ name: head, kind: text, required: true, prompt: "The sha of the head of nathan-main to ship" }]
---

# Ship Flint to canon

The custodian writes the ship summary and ships `nathan-main` to `canon`, only when `nathan-main` is level with `canon` and the checks passed on the head.

## Write the ship summary {#write-summary}

An agent reads the commits of `origin/canon..<head>` and writes one line for the ship.

```step
does: { process: write-ship-summary }
inputs: { head: "${inputs.head}" }
next: [release]
```

## Is this a release {#release}

Most ships stop at `canon`. A release is a separate decision of Nathan.

```decision
question: Is this a release?
by: person
outcomes: { "yes": ship, "no": ship }
```

## Ship to canon {#ship}

Nathan approves the ship. Then the process runs `ndv repo ship flint` with the summary line. The step is done only when the check of `canon-shipped` finds the head on `origin/canon`.

```step
does: { process: ship-to-canon }
inputs: { head: "${inputs.head}", summary: "${write-summary.summary}" }
precondition: [no-pull-debt, checks-on-head]
effect: [canon-shipped]
source: { path: "@NUU Dev/src/repo/verbs.ts", hash: "<sha256 of the file when you drew the step>" }
```
````

This map is blended: the summary and the decision are native, and the step "Ship to canon" mirrors the command `ndv repo ship` (its source is the file of the command). The claim of the mirror has `about: ["process:ship-flint#ship"]`, and its check has `recipe: source-unchanged`. The process that draws the map again has a trigger on `claim.failed` of that claim. The program Workflow Lab of this Flint has one map with each kind of node (`lab-flow`) and one external map (`notepad-start`).
