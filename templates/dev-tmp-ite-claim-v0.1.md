---
description: "A claim of a program: Steel/Programs/<Program>/Reality/<id>/claim.md (format steel-claim/2), a test of reality that says what must be true now, and its check process Processes/check-<id>/ (code, an agent, or a person), the output and the environment of a check, which side changes when a claim fails, and a complete example of each form of check"
---

# Filename: Steel/Programs/[Program]/Reality/[id]/claim.md

/*
  A claim is a test of reality. It says what must be true NOW about the system. It never states a goal, a target
  with a date, or a prediction: "The remote refs are less than 2 hours old" is a claim; "We ship by 5 November" and
  "80 people will come" are not. Write a goal or a plan as prose of a part (the type goal is plain text), or as a
  future note.

  The claim has one keeper: its CHECK. The check is a normal process of the program: Processes/check-<claim id>/
  (tmp-ite-process-v0.1), with its page, its runs, its log, its triggers, its authority, and its draft version. The
  claim names it with kept-by. "Check now" of a claim is one run of its check. The check reads reality and judges:
  each verdict is holds, fails, or error, with the values that it saw as evidence. A check never changes anything.

  Each verdict goes through one door (`flint ite claim report`, or the route
  POST /api/steel/programs/<program>/claims/<claim>/results) into the log of the program on this machine
  (.flint/steel/logs/<program id>.jsonl). No file of the Mesh or of Steel/ holds a verdict or a state.

  THE FOLDERS
  - Steel/Programs/<Program>/Reality/<id>/claim.md — the folder name is the id of the claim. The claim folder holds
    only claim.md. A person can put it in a folder of the sidebar (Reality/<folder>/<id>/); the id stays the same. The folder of the program is the folder whose program.md has the id of the root note.
  - Steel/Programs/<Program>/Processes/check-<id>/process.md — the check, with its code (check.js, check.py).
  - The values that the check reads are data of the program (Steel/Programs/<Program>/Data/), named in reads of the
    check process: not files in the claim folder.

  THE CLAIM: FRONTMATTER CONTRACT (format steel-claim/2). The keys are kebab-case. No comment in the frontmatter.
  The keys are exactly these six. Each other key is a problem, and a claim with a problem does not check.
  - format: always "steel-claim/2".
  - id: a slug, unique in the program, the same as the folder name: "remote-fresh".
  - about: the references of the elements that the claim is about: one or more. A part is its id (a UUID; find it in
    the frontmatter of the part, or with `flint ite map "<program>" --json`). Another element has a prefix:
    process:<id>, process:<id>#<node> (a node of an instruction map), data:<id>, view:<id>. Never a title. An element
    has no list of claims: the claim names its subjects. Quote a reference with a colon: about: ["data:origin-refs"].
  - kept-by: required: "process:check-<id>", the check of the claim, a process of the same program. A claim never
    inherits a keeper. One check can keep more than one claim: each of its claims names it in kept-by.
  - owner: optional, a person wikilink "[[@Name]]". Default: the owner of the first part, else the first owner of the
    system.
  - fresh-for: optional, a duration (1h, 2d). A verdict older than this is old: the check must run again.

  THE CHECK PROCESS (format steel-process/1; the full form is tmp-ite-process-v0.1)
  - id: "check-<claim id>".
  - by: code | agent | person. A claim with no code check gets a person check.
      code:   runtime (node | python | exec; exec runs the entry file itself), entry ("check.js"), timeout (optional,
              default 60s).
      agent:  prompt (the request: the agent reads, decides holds, fails, or error, and reports through the door),
              target (optional, the Orbh target "runtime/profile"). Check now starts one Orbh session with the prompt,
              the claim, the parts, and the door command.
      person: task (what Steel asks the person: "Is this true now: <the H1 of the claim>?"), who (optional,
              "person:<Name>"). The check gives pending, and the person answers holds or fails, with a note.
  - reads: optional, the data that the check reads: data:<id>, data:<id>#<output>, or process:<id>#runs (the data of
    the runs of a process). The core gives the values to the code as STEEL_DATA, and to an agent in its prompt. A
    claim is old when a value that its check reads is old.
  - trigger: optional: manual (the default: Check now only, or a run), { every: 1d }, { cron: "0 9 * * *" }, or an
    event trigger (tmp-ite-process-v0.1). A trigger runs only on a machine where a person enabled the check process
    (`flint ite enable "<program>" check-<id>`).
  - A check only reads. The engine refuses irreversible: true on a process that keeps a claim.

  THE OUTPUT OF A CODE CHECK
  Each line of its output that is one JSON object is one verdict:
    { "state": "holds|fails|error", "claim"?: "<claim id>", "part"?: "<an id of about>", "values"?: { ... },
      "summary": "<text>", "evidence"?: [{ "kind": "url|file|note|text|output", "value", "label"? }] }
  - claim: required when the process keeps more than one claim; else the verdict is for the one claim that it keeps.
  - part: with no part, the verdict is for the whole claim. A check of many parts prints one verdict for each part.
  - A line that is not valid is a problem of the check, and gives error.
  An agent check and a person check report through the door: `flint ite claim report "<program>" <claim id> --state
  holds|fails|error --summary "<text>"`.

  THE ENVIRONMENT OF A CODE CHECK
  The core runs the entry in the folder of the check process with: FLINT_ROOT, STEEL_PROGRAM_ID, STEEL_PROCESS_ID,
  STEEL_KEEPS (a JSON list of the references that the process keeps, for example ["claim:remote-fresh"]),
  STEEL_CLAIM_ID (when the process keeps one claim), STEEL_PARTS (a JSON list of the part ids of about of that claim),
  STEEL_ABOUT (a JSON list of each reference of about of that claim), STEEL_DATA (JSON: the values of reads of the
  process, { "<reference as written in reads>": { ref, mode, state, at, age_s, outputs, error? } }; for
  data:<id>#<output>, outputs holds only that output; for a table, outputs.rows holds the rows and outputs.count their
  count), STEEL_INPUTS (JSON: the inputs of the run when the check runs for a step, else {}), STEEL_RUN_ID and
  STEEL_NODE (or empty), and the values of flint.env and flint.env.local.

  WHEN A CLAIM FAILS: WHICH SIDE CHANGES
  The links say it. The core computes on_fail for a failing claim: { repair: [<process ids>], keeper: <ref or null> }.
  - repair: the processes of the program with an event trigger whose kinds has claim.failed and whose about names
    claim:<id>: trigger: { on: event, kinds: [claim.failed], about: ["claim:<id>"] }. Such a process repairs the
    WORLD. The brief says "repair by <process>".
  - keeper: when repair is empty, the keeper of the first part of about (the kept-by of the part, or of its parent,
    up to the root: often process:keep-map-true) proposes a change to the MODEL: the claim says what the system is,
    and the system is now different. The brief says "change the model: <keeper>".
  A claim names no process that fixes it. To give a claim a repair, give the repair process the event trigger.

  RULES
  - Prefer code: a check with no mind. Use an agent when a reading decides, and a person only when only a person
    knows.
  - Read data, not the source. When the check needs a value of the world (a count, a version, a sheet), make the
    source one piece of data with a maker (see [[tmp-ite-data-v0.1]]), and name it in reads of the check. Two checks
    that read one source then read one piece of data, and the source is pulled one time.
  - A check only reads. A write, a send, a push, or a fetch is not a read: a fetch is the work of a worker process.
  - Before a check, the core pulls each external data of reads that is old, when its maker is enabled on this
    machine; else the check gets the value that is there, with its state and its age. Before a check for a run (a
    precondition or an effect), the core pulls each external data of reads with a code maker, also when its maker is
    not enabled.
  - A check that gets a value in the state none (never pulled), pending (a person must write it), or error (its last
    pull or calculation failed) prints one error line that names the value. It never judges with a default (an amount
    that was not pulled is not 0). One case reads none as evidence: a claim that native data exists (a value or a row
    that a person or a process writes) prints fails for none, because nobody wrote it yet. The stub check.js gives
    error for none: change that line for such a claim. A scheduled check can judge an old value (the claim is then
    old). In a run (a precondition, an effect, a wait for a claim), the engine turns holds into error when a value that
    the check reads is old, not there, or waits for a person: an old value never confirms a step or an effect.
  - A check that cannot read its source prints one error line, never an old value.
  - Each claim has a file and a check process. A source with a hash, the review of the nodes, and the proof of
    Orbtest are normal claims with a check of a recipe: source-unchanged (about: one reference process:<id> or
    process:<id>#<node>), review-current (reads: ["data:reviews"]), and orbtest-proof (reads:
    ["data:orbtest-results"]). Such a check has recipe: <id> and no code of its own (knw-ite-software).
  - A check touches reality outside the model. Code that only finds a part of this program proves only that the
    model has the part: do not write it.

  NEW CLAIM, TEST, AND PROMOTE
  - `flint ite claim new "<program>" <id> --about <ref>... --title "<the H1>" --by code|agent|person [--runtime]
    [--reads <ref>...] [--prompt "<text>"] [--task "<text>"] [--who person:<Name>] [--every|--cron|--on <kind>]
    [--fresh-for <d>]` writes Reality/<id>/claim.md and the check process as a DRAFT:
    Processes/check-<id>/dev/process.md (and a stub check.js for code). The CLI is the truth: check the flags with
    `--help`.
  - Write the code of the check, then test it: `flint ite claim test "<program>" <id>` runs the check once, prints each
    line and its problems, and writes nothing. Then run `flint ite process check "<program>" check-<id>` and
    `flint ite claim list "<program>"`: a claim with a problem shows it.
  - A new claim counts only after the promote of its check: `flint ite process promote "<program>" check-<id>`
    proposes the revision, and a person applies it. Until then the claim is unchecked.

  THE BODY OF THE CLAIM
  - One H1: the claim as one sentence for a person, about now ("The remote refs of flint are less than 2 hours old").
  - One to three short paragraphs: why it matters, what the check reads, and what a person does when it fails (the
    repair process, or the change of the model).
  THE BODY OF THE CHECK PROCESS
  - One H1: "Check that <the claim>". One sentence: what the check reads.
*/

## A code check that reads data

The claim `Reality/remote-fresh/claim.md`:

````markdown
---
format: steel-claim/2
id: remote-fresh
about: [d24d76dd-8090-4682-82f3-87307db7ed86, "data:origin-refs"]
kept-by: "process:check-remote-fresh"
owner: "[[@Nathan]]"
fresh-for: 2h
---

# The remote refs of flint are less than 2 hours old

The checks of Flint Release read what this machine knows of `origin`, so the refs of this machine must be new. The check reads `fetched_at` of the data `origin-refs`: the time of the last fetch. When the claim fails, the worker `fetch-flint` repairs the world: its event trigger listens to `claim.failed` of this claim.
````

Its check `Processes/check-remote-fresh/process.md`:

````markdown
---
format: steel-process/1
id: check-remote-fresh
by: code
runtime: node
entry: check.js
timeout: 30s
reads: ["data:origin-refs#fetched_at"]
trigger: { every: 1d }
---

# Check that the remote refs of flint are fresh

The check reads the time of the last fetch of `origin-refs`, and judges it against 2 hours.
````

The file `check.js` in the same folder:

```js
const values = JSON.parse(process.env.STEEL_DATA || '{}');
const ref = 'data:origin-refs#fetched_at';
const value = values[ref];
// none, pending, and error give no value to judge: never take a default.
if (!value || ['none', 'pending', 'error'].includes(value.state)) {
  console.log(JSON.stringify({ state: 'error', summary: `No value to judge: ${ref}. Pull origin-refs first.` }));
} else {
  const hours = (Date.now() - Date.parse(value.outputs.fetched_at)) / 3600000;
  console.log(JSON.stringify({
    state: hours < 2 ? 'holds' : 'fails',
    values: { hours: Math.round(hours * 10) / 10 },
    summary: `The last fetch of origin is ${hours.toFixed(1)} hours old.`,
  }));
}
```

The repair of the world, `Processes/fetch-flint/process.md` (cut short): a worker with its schedule and an event trigger on the failure of the claim.

````markdown
---
format: steel-process/1
id: fetch-flint
by: code
runtime: node
entry: index.js
trigger: [{ every: 1h }, { on: event, kinds: [claim.failed], about: ["claim:remote-fresh"] }]
---
````

So `on_fail` of `remote-fresh` is `{ repair: ["fetch-flint"], keeper: ... }`, and the brief says "repair by fetch-flint". With no such process, the brief says "change the model: <the keeper of the first part of about>".

## An agent check

The claim `Reality/invitation-clear/claim.md`:

````markdown
---
format: steel-claim/2
id: invitation-clear
about: [e7990a8a-3ff5-46ea-b2e3-5498aa5d28a2]
kept-by: "process:check-invitation-clear"
fresh-for: 7d
---

# The invitation names the date, the hours, and the hall

A guest who reads the invitation must know when and where to come. A reading decides it, so an agent checks it. When the claim fails, the keeper of the invitation proposes the new text.
````

Its check `Processes/check-invitation-clear/process.md`:

````markdown
---
format: steel-process/1
id: check-invitation-clear
by: agent
prompt: "Read the part (Deliverable) Invitation of the program Club Launch Night. Report holds when its text names the date Thursday 12 November 2026, the hours 17:30 to 22:00, and the community hall, else fails, and name what is missing. Change no file."
target: claude/o55xh
---

# Check that the invitation names the date, the hours, and the hall

An agent reads the text of the invitation, and reports through the door.
````

## A person check

The claim `Reality/hall-booked/claim.md`:

````markdown
---
format: steel-claim/2
id: hall-booked
about: [a9d285ce-53f0-448d-9580-5eff8cef7b1d]
kept-by: "process:check-hall-booked"
owner: "[[@Nathan]]"
fresh-for: 30d
---

# The hall is booked for the night

The booking is an email from the venue manager. No public page shows it, so a person checks it.
````

Its check `Processes/check-hall-booked/process.md`:

````markdown
---
format: steel-process/1
id: check-hall-booked
by: person
task: "Is this true now: the community hall is booked for Thursday 12 November 2026, from 17:30 to 22:00?"
who: "person:Priya"
---

# Check that the hall is booked for the night

Steel asks Priya. She answers holds or fails, with a note.
````

## A claim about a node of an instruction map

A claim can be about a node (`process:<id>#<node>`). Its check reads the data of the runs (`process:<id>#runs`).

````markdown
---
format: steel-claim/2
id: flip-step-fast
about: ["process:lab-flow#flip"]
kept-by: "process:check-flip-step-fast"
fresh-for: 1d
---

# The step "Flip a coin" ends in less than 30 seconds

The check reads the mean time of a visit of the node `flip` in the runs of `lab-flow` of the last 30 days.
````

The check `check-flip-step-fast` has `by: code`, `reads: ["process:lab-flow#runs"]`, and its code reads `nodes.flip.mean_s` of that value.
