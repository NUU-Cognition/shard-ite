---
description: "The loop of a program: the four kernel words, events and their routes, the event triggers, the standing process keep-map-true and the agent of the program, the plan of future notes with no state and the realize, draft versions, the pulse, living systems (each program is one: the brief, the vital signs, revisions, authority), and agent sessions with their jobs (each action is a recipe) and focus"
---

# Knowledge: The Loop of a Program

A program is live when events keep it true. This file gives the loop of a program in five parts:

- **Events**: what comes in.
- **The standing process and the agent of the program**: who does the work.
- **The plan**: what must be next: future notes for the model, draft versions for a process.
- **Draft versions**: how a process changes safely.
- **The pulse**: what a person reads first.

Then two more parts:

- **Living systems**: a program whose loop is closed, with the brief, the vital signs, revisions, and authority.
- **Agent sessions and jobs**: the agents that a person starts in the Workbench, one job at a time, with their focus.

The rules of [[init-ite]] apply with no change. An agent proposes. Only a person applies (a map change, a revision, a realize, a promote), approves, or enables.

```
event in → route by "about" → a trigger of a process (code, agent, or person)
   → proposal → a person applies it → the data changes → the checks judge → the pulse
```

## The Kernel

Four words describe each system. Use them with a person, together with the words of each type (a guest, a budget, a release). Do not add a new word that a person must learn.

| Word | Meaning | In the ITE |
|---|---|---|
| Model | What the system is, and what must be true now | The root note, the parts, the pointer parts, the views, the future notes, the statement of each claim, and the instruction maps |
| Process | Everything that executes | Each process: a check (it keeps a claim), a maker (it keeps a data item), a keeper (it keeps a model note), or a worker (it keeps nothing). A recipe is a shared process. |
| Data | What the system holds and measures | The data notes, and the state: values, verdicts, runs, places, proposals, enables, and approvals |
| Event | A fact in time: this happened, here, now | One line of the form `steel-event/1`. It starts processes through triggers. |

The plan is not a fifth word: the plan of the model is a set of future notes (`steel-future/1`, a part of the model), and the plan of a process is its draft version (`dev/`). A **proposal** (a map change, a candidate, a revision, a realize, or a promote) is how a change reaches a person. It is not a kernel word. A proposal follows reality (what is true now); a plan leads it (what must be next).

## Events

### The Form

An event is one JSON line of the form `steel-event/1`:

```json
{
  "format": "steel-event/1",
  "id": "<uuid>",
  "kind": "task.finished",
  "at": "2026-10-09T05:10:00.000Z",
  "source": { "kind": "cli", "name": "projects", "session": "<orbh session id or null>" },
  "about": {
    "paths": ["/abs/path/to/changed/file.ts"],
    "refs": ["<part id>", "claim:<id>", "process:<id>"],
    "tasks": ["(Task) 1245 ITE MVP - ..."]
  },
  "summary": "Task 1245 finished: 12 files changed in flint.",
  "payload": { "commits": ["<sha>"], "repos": ["flint"] }
}
```

1. `kind` is lower-case words with dots. The kinds of this build: `task.finished`, `commit.landed`, `note.added`, `webhook`, `manual`, `file.changed`, `claim.failed`, `claim.holds`, `data.changed`, `run.finished`, and `proposal.applied`. An unknown kind is valid: a process can listen to it.
2. `about` can be empty. Each list in it is optional.
3. `summary` is one sentence for a person.
4. **Who emits.** A person or an agent emits with `flint ite event emit` (the skill [[sk-ite-check_after_task]] emits `task.finished`). A Git hook emits `commit.landed`. The file watch emits `file.changed` for the `code-refs` of the parts of the `about` of each enabled trigger with `file.changed` (one event for each burst of changes of 2 s). The HTTP hook of a process (`POST /api/steel/programs/<program>/hooks/<process>`) emits `webhook` about `process:<process>`, with the body as `payload`. The engine emits through one function:
   - `claim.failed`: when it stores a verdict `fails` and the last verdict of the claim (or of that part) was not `fails`. `about.refs`: `claim:<id>` and each reference of the `about` of the claim.
   - `claim.holds`: when a verdict `holds` follows a verdict `fails` or `error`.
   - `data.changed`: when a pull, a maker run, or a write of a person gives values that differ from the last values. `about.refs`: `data:<id>`.
   - `run.finished`: when a run ends (`done`, `failed`, `cancelled`). `about.refs`: `process:<id>`. `payload`: `{ run, state }`.
   - `proposal.applied`: when a person applies a map change, a revision, a realize, or a promote. `about.refs`: the references of the changed notes.
5. **The loop guard.** An event that a run emits carries `payload.chain`, the list of the process ids of the chain. The router never routes an event to a process that is in its chain.

### The Store

Events are facts of this machine. Git does not keep them.

- The event log of the Flint: `.flint/steel/events/log.jsonl` (append only).
- Each route of an event is one line of `.flint/steel/events/routes.jsonl`: `{ "format": "steel-event-route/1", "event": "<id>", "program": "<program id>", "target": "process:<id>", "at": "...", "status": "started|queued|refused|not-enabled|no-match", "run": "<run id or null>", "job": "<job id or null>", "detail": "<one sentence>" }`.

### The One Door

| Command or route | Result | Writes |
|---|---|---|
| `flint ite event emit --kind <kind> [--path <abs path>...] [--ref <ref>...] [--task "<task title>"...] [--summary "<text>"] [--payload <json\|->] [--json]` | Emits one event, and prints its id and each route | The event log and the routes; the runs and the jobs that the routes start |
| `flint ite event list [<program>] [--limit <n>] [--json]` | The events, the newest first, each with its routes | Nothing |
| `flint ite event show <id> [--json]` | One event and its routes | Nothing |
| `POST /api/steel/events` | The body is an event with no `id`, `at`, or `format`. Gives `{ ok, event, routes }`. | As `emit` |
| `GET /api/steel/events?program=<id>&limit=<n>` | `{ events: [{ ...event, routes: [...] }] }` | Nothing |

When a Flint server runs, the CLI sends the event to it. With no server, the CLI routes the event in its own process. Both paths give the same result.

### Routing by `about`

The ITE routes an event by what it is about, not by a URL. An event goes to each program that it is about:

1. A reference names a part or an element of the program.
2. A path is covered by the `code-refs` of a part of a program with a codebase. The router uses the matcher of `flint ite check --paths`.
3. A task title names a part of the program (a task can be a part).

In each program that matches, the event starts each process whose event trigger matches it (see The Event Trigger). A process with `scope: any` gets each event of its kind, also with no match. One event can go to many programs: a changed file can touch Flint, CLI Core, and Plate SDK. The agent of each program proposes its own change.

### The Event Trigger

```yaml
trigger: { on: event, kinds: [claim.failed], about: ["claim:remote-fresh"] }   # a repair of the world
trigger: { on: event, kinds: [task.finished, commit.landed] }                 # with no about: the about of the process
trigger: { on: event, kinds: [note.added], scope: any }                       # each event of the kind for this program
trigger: [{ every: 1h }, { on: event, kinds: [claim.failed], about: ["claim:remote-fresh"] }]   # a list
```

1. An event matches an event trigger when its kind is in `kinds`, and: with `about` on the trigger, a reference of the event is in that `about` (a part id matches a part id; a path matches a `code-refs` of a part of that `about`); with no `about` on the trigger and `scope: about` (the default), the event is about the `about` of the process; with `scope: any`, each event of the kind that routes to the program matches.
2. An event trigger runs only on a machine where a person enabled its process (`flint ite enable "<program>" <process id>`), as each other trigger. A route to a process that is not enabled has the status `not-enabled`.
3. The run gets the event as `STEEL_EVENT`.
4. Only a process has a trigger. A check process and a maker process can listen to an event too: a check or a pull starts.
5. **A worker that repairs a failed claim** has the trigger `{ on: event, kinds: [claim.failed], about: ["claim:<id>"] }`. Then the claim names it in `on_fail.repair`, and the brief says "repair by <process>" (see When a Claim Fails in [[knw-ite-state]]).

## The Standing Process and the Agent of the Program

A process can name the agent of its program as its performer:

```yaml
by: agent
agent: program      # the default is agent: own (the process starts its own agent)
```

1. `agent: program` means: the agent session of the program does the work. That agent does many jobs, one at a time (see Agent Sessions and Jobs below).
2. Such a process can start by an event, a schedule, or Run now. Then the ITE gives the agent of the program **one job**. The job has the action `update`, the text of the process (its `task`), and the event (`STEEL_EVENT`). The run of the process records the job id. The run ends when the job ends.
3. **The queue.** When the agent of the program works on another job, the new job waits in the queue of that agent. The agent takes the next job when it returns. When no agent of the program runs, the ITE starts one.
4. The route of the event records the `job` and the status `queued` or `started`.

The **standing process** of a program is the process `keep-map-true`: it has `recipe: keep-map-true` (the shared process `Steel/Recipes/keep-map-true/process.md` of this shard: `by: agent`, `agent: program`, and the task), and its own `about`, event trigger, `authority`, and `concurrency`. It is the keeper of the root note, so it keeps each part and each view with no `kept-by` of its own. In NUU Flint, `Steel/Programs/Flint/Processes/keep-map-true/` listens to `task.finished` and `commit.landed`. An old program gets it with `flint ite process new "<program>" keep-map-true --recipe keep-map-true --on task.finished --on commit.landed`.

**The job of an event** asks the agent for:

1. **One proposal for each event.** The proposal is one map change with all the parts that the event touches. Add a view candidate only when a node of an accepted view must change. One task gives one proposal, not one proposal for each part.
2. **The plan**: for each future note that the work made true, a realize proposal: `flint ite plan realize "<program>" <future id>` when the work made it true in full, or `flint ite plan realize "<program>" <future id> --part -` with `{ "now": "<the new full text of the true note>", "rest": "<the text that stays in the future note>" }` on stdin when the work made a part of it true. This is how the keeper reports progress.

The agent never applies a proposal, and it never sets a state of a future note: a person applies each realize. The coding agent that did the task does no map work: at the end of a product task, [[sk-ite-check_after_task]] emits `task.finished`. Its old steps run only for a program with no standing process that took the event.

## The Plan

### The Future Note

A **future note** is the future state of one thing. It lives beside the true note, in the same folder, with the form `steel-future/1`:

```
Map/(Program) Orbh . (Process) Wake delivery.md                   ← the true note
Map/(Program) Orbh . (Process) Wake delivery . (Future) Next.md   ← the future note
Map/(Program) Orbh . (Process) Wake digest . (Future) Next.md     ← a planned new part
```

```yaml
---
format: steel-future/1
id: <uuid>
plan-of: "[[(Program) Orbh . (Process) Wake delivery]]"   # empty for a new thing
plan-parent: "[[(Program) Orbh . (Thing) Delivery]]"       # only for a new thing: a true part or another future note
type: Process                                              # only for a new thing
change: change            # change | add | remove
horizon: Next             # one horizon now: Next
based-on: <sha256 of the true note when the plan was written; empty for add>
tasks: ["[[(Task) 1245 ...]]"]
fields: { code-refs: [...] }   # optional: the fields that the thing gets when the future becomes true
authors: ["[[@Nathan]]"]
---

# Wake delivery

<the full text of the thing as it must be>
```

1. The name is the name of the thing, then ` . (Future) Next`. `Next` is the horizon. There is one horizon now: `Next`.
2. The ITE finds a future note by its form, not by its name or its folder.
3. **A future note is not a part.** It has no `parent`. It does not count for the coverage, the tree, or the claims of a part. The rule "the type of a part is the last `(Type)` word" does not apply to it. The type of the future thing is the type of the true note. For a new thing, it is the field `type`.
4. The body holds the full text of the thing as it must be, not a diff. The ITE computes the diff.
5. One future note changes one thing on one horizon.
6. `based-on` is the sha256 of the bytes of the true note: `shasum -a 256 "<true note>"`.
7. **A future note has no state.** It has no `status` and no `done-at`. It stays until a realize makes it true (it goes), or a partial realize makes it shorter. The keeper of a future note is the keeper of its true note, or of its `plan-parent` for a new thing.

### The Findings of the Plan

| Code | Level | When |
|---|---|---|
| `plan-behind` | warning | The true note changed after `based-on` |
| `plan-orphan` | error | `plan-of` or `plan-parent` names no part and no future note |
| `plan-twice` | error | Two future notes change one thing on one horizon |
| `plan-stale` | note | A future note is older than 14 days |

`flint ite check` shows them, as each other finding.

### The Commands of the Plan

| Command or route | Result | Writes |
|---|---|---|
| `flint ite plan "<program>" [--json]`, `GET /api/steel/programs/:id/plan` | The plan: the future notes, and the drafts (each process with a `dev/` folder: `{ process, files, updated_at }`), with the counts `futures`, `behind`, `adds`, `changes`, `removes`, and `drafts` | Nothing |
| `flint ite plan show "<program>" <future id\|ref> [--diff] [--json]`, `GET .../plan/:futureId` | One future note, with the diff to the true note | Nothing |
| `flint ite plan add "<program>" --of <ref> \| --parent <ref> --type <Type> --title "<title>" [--text <file\|->] [--append "<paragraph>"] [--change change\|add\|remove]`, `POST .../plan` | Writes a new future note, with `based-on`. With `--of` and no `--text`, the future starts as the true note; `--append` adds one paragraph to it (the change in one sentence). An agent uses it only in a session that a person drives, or as a builder when its prompt asks for it. | One future note |
| `flint ite plan realize "<program>" <future id> [--reason "<text>"]`, `POST .../plan/:futureId/realize` | Proposes **one map change** that makes the future true: `edit` (the text and `fields` replace the true note), `add` (a new part with `plan-parent`, `type`, and the title), or `remove`; the future note goes. The map change records `realizes: [<future id>]`. | One proposal |
| `flint ite plan realize "<program>" <future id> --part -` | Proposes a **partial realize**: stdin holds `{ "now": "<the new full text of the true note>", "rest": "<the text that stays in the future note>" }`. The map change edits the true note and the future note: the future note gets shorter. | One proposal |

A realize applies only when a person applies its map change. The apply emits `proposal.applied`. A future note has no state to set: `plan set --status` is gone.

### Who Writes the Plan

1. A person writes the plan. An agent can draft a future note only in a session that a person drives, or as a builder when its prompt (the words of a person, or of a manager for a person) asks for it. The agent lists each one for the person. A job agent and an engine agent write no future note.
2. The keeper reports progress with a realize proposal: after a task, the agent of a program proposes the realize of each future note that the work made true, in full or in part (`flint ite plan realize`, `--part -`). A person applies it (Make it true in the Workbench applies a realize too). No agent sets a state of a future note.
3. The Workbench draws the plan over the main map with the switch "Now / Next". A new thing is a ghost card under its parent, with no state. A changed thing has a mark. A removed thing is struck through. A future that is behind has a warning mark. A process with a draft has the mark "draft".

## Draft Versions

Each process and each instruction map has a production version and can have one draft version (the folder `dev/`). The draft is the plan of a process: a process has consequences when it runs, so its change waits in a draft until a person promotes it.

| | Production | Draft (`dev/`) |
|---|---|---|
| Files | `Steel/Programs/<Name>/Processes/<id>/` | `Steel/Programs/<Name>/Processes/<id>/dev/`: the same files (`process.md`, `map.md`, the code) |
| Started by | A trigger, Run now, or an event | Only a person, by hand: `--dev` |
| Writes | The real state and the world | A dev state: `.flint/steel/dev/<program id>/...`. An irreversible step does not run: the run records "would do", and it goes on. |
| Changes | When a person applies a promotion | Freely: it is a draft |

1. **The version** of a process is the sha256 of its files, in a fixed order. Each run records `channel: production|dev` and `version: <sha>` in `run.md`, and it keeps a copy of the definition that it started with (`Runs/<run id>/definition/`).
2. **A run ends on the version that it started with.** A change of the process changes only new runs.
3. **A promotion is a proposal.** `flint ite process promote` writes one revision of kind `steel`. The revision replaces the production files with the dev files. It moves the old files to `Processes/<id>/history/<version>/`. Only a person applies it.

| Command or route | Result |
|---|---|
| `flint ite process dev "<program>" <id>`, `POST /api/steel/programs/:id/processes/:pid/dev` | Makes the draft version from production. It refuses when a draft exists. |
| `flint ite process run "<program>" <id> --dev`, `flint ite flow start "<program>" <id> --dev` (the field `channel: "dev"` on a route that starts a run) | A dev run. A person only. |
| `flint ite process promote "<program>" <id> [--reason "<text>"]`, `POST .../processes/:pid/promote` | One revision that promotes the draft version. A person applies it. |
| `flint ite process show "<program>" <id>` | Both versions, each with its version and its time |

An agent can write the files of a draft version. It never starts a dev run by a trigger, and it never applies a promotion. A new check (`flint ite claim new`) starts as a draft: its claim counts only after a person applies the promote. The plan document lists each draft in `drafts`.

## The Pulse

The pulse is what a person reads first about a program.

```ts
type SteelPulse = {
  program: string; at: string;
  plan: { ... };                           // the counts of the plan: the future notes, the ones that are behind, and the drafts (`flint ite pulse --json` gives the exact fields)
  machinery: {
    events_7d: number;                     // the events routed to this program in 7 days
    events_unhandled: number;              // routes with status refused, not-enabled, or no job result after 24 h
    standing: { process: string; last_run_at: string | null; runs_24h: number } | null;
    proposals_open: number; oldest_proposal_days: number | null;
    applied_share_7d: number | null;       // applied / (applied + discarded) of the proposals of 7 days
    triggers_enabled: number; triggers_total: number;
  };
  attention: string[];                     // at most 5 sentences for a person, the most important first
};
```

1. `flint ite pulse "<program>" [--json]` and `GET /api/steel/programs/:id/pulse` give the pulse. Both write nothing.
2. The brief of a program gets two more sections from the same read: **the plan** and **the machinery**.
3. The pulse monitors the machinery of the loop. It gives the age of the map, the runs of the standing process, the share of proposals that a person applied, and the age of the oldest future note. Read it before you start the work of a program.

## Living Systems

A **living system** is a system whose actors act through its own model: each claim shows its check process and the age of its newest result, each process shows its runs, and a step with an effect stays pending until a check confirms the effect. Each program is a living system. The `system` block of the root note is optional: a program with no block has the default block, and each program has a brief and vital signs.

Steel is the tool through which a person constructs a living system, reads it, runs it, and develops it. The code keeps the name `ite` (`flint ite`, the page `/ite`). In this Flint, the program Flint Release is the first living system: read its root note, its claims in `Steel/Programs/Flint Release/Reality/`, and its processes (the checks, the makers, the workers) and instruction maps in `Steel/Programs/Flint Release/Processes/` as the reference forms.

### The Loop

1. **A process acts.** A person, a trigger, or a step of a run starts it.
2. **The world changes.**
3. **The checks read the world**: the checks of the `effect` claims at once, and each other check by its trigger.
4. **A claim judges**: `holds` (nothing to do); `fails` (the links say which side changes: a process with an event trigger on `claim.failed` of the claim repairs the world, "repair by fetch-flint"; else the keeper of the first part of `about` proposes a change of the model, "change the model: keep-map-true"); a result is old (the check must run again).

### The Terms of a Living System

These terms add to The Terms of [[knw-ite-reference]]. One term has one meaning.

| Term | Meaning |
|---|---|
| System | A program with a `system` block in its root note |
| Root | The root note of a system: the boundary, the owners, the maps, and the connections. It is an index, not the one truth. |
| Boundary | What is inside the system, what is outside, and what is unknown: a decision of a person, with a date and a reason |
| Connection | What crosses the boundary to another system: imports, exports, and the integration that carries them |
| On fail | What a claim that fails says: `repair` (the processes that repair the world) and `keeper` (the keeper that proposes a change of the model) |
| Effect | The change in the world that a process or a step must cause. It is pending until a check of an `effect` claim confirms it. |
| Brief | The page of attention: six sections of items, and the vital signs |
| Episode | One continuous interval in which the condition of an item of the brief is true. An acknowledgement and an escalation bind to one episode. |
| Revision | A candidate change of one file of the system, with a reason and a check, that a person applies and can revert |
| Protected change | A change of `authority` or `governor` of the system block. Only a person applies it, and only through a revision. |
| Vital signs | Measures, each from independent evidence: freshness, closure, use, surprise (a claim that changed from `holds` to `fails` with no run), and coverage. No single score. |

Do not use "environment" (it is an Information Environment or an Orbtest environment), "turn" for an Orbh run, or "live" for "fresh".

### One Authority for Each Fact

| Fact | Authority | Writer |
|---|---|---|
| Parts, links, the system block, prose | The Mesh | A person, an agent, or an applied revision. A protected change: a revision only. |
| Claims | `Steel/Programs/<P>/Reality/<claim>/claim.md` | A person or an agent |
| Data: its note and its native values | `Steel/Programs/<P>/Data/<id>/` | The note: a person or an agent. A native value: a person, the keeper of the data (`kept-by`), or the door. |
| Snapshots, caches, and the history of pulled and calculated values | `.flint/steel/data/<program id>/<id>/` | The core only |
| Processes (checks, makers, keepers, workers) and instruction maps | `Steel/Programs/<P>/Processes/<process>/` | A person or an agent; a draft is promoted only by a person |
| Recipes | `Steel/Recipes/<id>/` | The ITE shard (install and update) |
| Run control, attempts, approvals, the copy of the evidence | The run folder in `Steel/Programs/<P>/Runs/` | The run engine only |
| Results, process runs, acknowledgements, escalations, prompts | The log `.flint/steel/logs/<program id>.jsonl` | The commands only (the one door of the results) |
| Enables | `.flint/steel/enabled.json` | A person, through `flint ite enable` |
| The jobs, the dock records, and the activity of the agent sessions | The agent log `.flint/steel/agents.jsonl` (append-only) | The agent routes and the `flint ite` commands only |
| Revisions and their exact old bytes | `Steel/Programs/<P>/Proposals/` | The revision commands only |
| The states of the claims, the findings, the brief, the vital signs | Nobody: a command computes them on each read | Nobody |

No file holds a result, a state of a claim, an item of the brief, or a vital sign. Never write the log by hand, and never edit or remove a line of it.

### The System Block (`steel-system/1`)

One fenced ` ```system ` YAML block in the root note, under the H1 and the first paragraph. The block is optional, and each key is optional. Write the block only when a default does not fit. The keys are kebab-case.

````markdown
```system
format: steel-system/1
owners: ["[[@Nathan]]"]
timezone: Australia/Sydney
boundary:
  inside:
    - { name: "the branch canon", parts: ["[[(Program) Flint Release . (System) Canon]]"] }
  outside: ["the hotfix loop"]
  unknown: ["who runs each publish to npm"]
  decided-by: "[[@Nathan]]"
  decided-at: "2026-10-05"
  reason: "The release of the Flint CLI from nathan-main to npm."
connections:
  - { to: "npm registry", exports: ["the package @nuucognition/flint-cli"], via: "scripts/publish.sh" }
attention: { escalate-after: 24h, brief-since: 24h }
authority: { run: ["person:Nathan"], approvers: ["person:Nathan"] }
governor: { max-runs-per-day: 3, max-attempts-per-step: 3, max-agent-attempts-per-day: 10, irreversible-needs-approval: true }
```
````

1. `format` is `steel-system/1` (the default). Another value gives the finding `system-invalid`.
2. The block has no `goals`: a block with `goals` has the finding `system-invalid`. A claim says what must be true now; a goal is the prose of a part (the type `goal` is plain text), and a plan is a future note.
3. Each wikilink in `boundary.inside[].parts` is a part of the program. A boundary item with no part shows as unwatched.
4. The defaults: `owners` the `authors` of the root note, `timezone` `UTC`, `escalate-after` and `brief-since` `24h`, `boundary`, `connections`, and `maps` empty, `authority` null (the owners run each process), `governor` null.
5. A prose edit of the root note keeps the block. Only a revision changes the block.

### The Brief and the Vital Signs

The brief is the centre of a program in Steel. It has five sections, in this order:

| Section | Items |
|---|---|
| `fails` | A claim that fails, with its `on_fail`: "repair by <process>" (a process with an event trigger on its `claim.failed`) or "change the model: <keeper>" (the claim of a source and the claim `reviews-current` are normal claims too); and external data whose last pull gave "The source changed its shape" |
| `old` | A claim whose newest result is older than its `fresh-for`, a claim that is old because a value that its check reads is old, and data whose value is old or whose last pull failed (with Pull now) |
| `unwatched` | A part that no claim is about, a claim whose check is a draft only, a boundary item with no part, and external data that nothing reads (no `reads` of a process) |
| `pending` | A person check, an approval, an effect that waits for its check, a task of a person, a revision that waits (also a promote), and data that waits for a person maker ("Write the value") |
| `surprises` | A claim that changed from `holds` to `fails` with no run |

Each item names its source, its age, and its owner. An item belongs to one **episode**: the interval in which its condition is true. An acknowledgement binds to one episode and stops only its escalation. A later failure of the same subject opens a new episode. An item that nobody acknowledges escalates after `escalate-after`. The brief writes nothing.

The vital signs come from the results and the runs, each on its own. There is no single score.

| Vital sign | What it counts |
|---|---|
| Freshness | The claims by state, and the data by state |
| Closure | The effects that a check confirmed, over the effects that need confirmation |
| Use | The runs and the process runs, the prompts that agents took from the system, and the days that a person opened the brief |
| Surprise | The claims that changed from `holds` to `fails` with no run |
| Coverage | The boundary items and the parts that a claim is about, with the exclusions and the unknown areas. Never a percentage of reality. |

### Revisions

A revision is a candidate change of one file of the system: a file in `Steel/Programs/<P>/Proposals/` (`steel-revision/1`). `flint ite revision propose` writes it, with the kind `part`, `system`, or `steel`, and the trigger `person` or `failed`. The promote of a draft (`flint ite process promote`) is a revision of the kind `steel` too. The kind `steel` targets a model file of the program in `Steel/Programs/<P>/`: `Processes/<id>/map.md`, `Processes/<id>/process.md`, `Reality/<id>/claim.md`, or `Data/<id>/data.md`. A process that keeps an instruction up to date (it draws the map again when the claim of its source fails) proposes its new file this way; only a person applies it.

1. **The targets:** the root note, a part file, a new part file, and (kind `steel`) a model file of the program in `Steel/`.
2. **The check** reads the whole system with the new bytes in place. A finding of the level error stops the apply.
3. **The apply** writes the target only when its hash is the base hash, and keeps the exact old bytes in the revision file. **The revert** writes the old bytes back only when the target has the hash of the apply.
4. **A protected change** is a change of `authority` or `governor` of the system block. Only a person applies it, through a revision, with `--protected`. A change of these keys by hand is the finding `protected-change`.

### Authority

**The actor comes from the caller, never from a request.** The CLI acts as `agent:<ORBH_SESSION_ID>` in an Orbh session, else as `person:<Name>`. The server acts as `agent:<session id>` for a request with the header `x-orbh-session-id`, else as the person of this machine. The trust boundary is this machine: the authority layer stops an honest agent from acting outside its policy, and it records who asked. A direct edit of a file is outside the enforced boundary.

The refusals: `not-allowed` (the actor is not in `run`), `needs-approval`, `governor-limit`, `agent-cannot-approve`, `agent-cannot-enable`, and `protected-change`.

### The Rules of a Living System

1. **Never confidently wrong.** A check that cannot read its source gives `error`, never an old value. A result older than `fresh-for` is `old`. A claim says what is true now, never a prediction.
2. **Only a check confirms an effect.** A Done of a person, the report of an agent, and the record of a process never confirm one.
3. **A protected change needs a revision** that a person applies. An agent proposes; it never applies a protected revision.
4. **Only commands write facts.** Never write the log or a run by hand. Report a result with `flint ite claim report`.
5. **The core runs a check or a process only by its trigger, by Check now or Run now, or by a run.** A trigger runs only on a machine where a person enabled it.
6. **An agent never decides for a person.** It never approves, refuses, waives, enables, or answers a decision of a person, and it never acts on the world unless the step that it does says so.
7. **The links decide the direction.** When a claim fails, a process with an event trigger on its `claim.failed` repairs the world; else the keeper of its subject proposes a change of the model. A map drawn from a source follows the world. A native map directs it.

### The Commands of the System

Each command takes `--json`. `<program>` is the name or the id of a program. Each command works for each program, also for a program with no system block.

| Command | Result | Writes |
|---|---|---|
| `flint ite system "<program>"` | The root: the owners, the boundary, the maps, the connections, the claims, the processes, the vital signs | Nothing |
| `flint ite log "<program>" [--since-seq <n>] [--kind <k>] [--limit <n>]` | The records of the log | Nothing |
| `flint ite brief "<program>" [--since <d>] [--markdown]` | The brief | Nothing |
| `flint ite brief ack "<program>" <item> --episode <id> [--note "<text>"]` | Acknowledges one episode of one item | The log |
| `flint ite vitals "<program>" [--window <d>]` | The vital signs | Nothing |
| `flint ite prompt "<program>"` | The reconciliation prompt of the system for an agent: the root, the brief, the check of the old claims, and the return of the brief | The log (an agent only) |
| `flint ite adopt "<program>"` | A person adopts the protected declarations of the system as they are now | The baseline beside the log |
| `flint ite revision list "<program>" [--state <s>]`, `show "<program>" <id>` | The revisions; one revision with its diff | Nothing |
| `flint ite revision propose "<program>" --kind part\|system\|steel --target <file> --content-file <path> --reason "<text>" [--trigger person\|failed] [--base-hash <h>]` | Proposes a revision | `Proposals/` |
| `flint ite revision apply\|revert "<program>" <id> [--protected]`, `discard "<program>" <id>` | Applies, reverts, or discards a revision | The target, `Proposals/` |

The claims, the data, the processes, the triggers, and the runs of a program use the commands of Claims and Checks and of Data ([[knw-ite-state]]), and of Processes, Triggers and Enables, and Instruction Maps and Runs ([[knw-ite-processes]]).

## Agent Sessions and Jobs

An **agent session** is one Orbh session that Steel starts for one program. A person starts it in the agent panel of the Workbench (the tab Agents of the right column) with "New agent", or with `flint ite agent start`. One agent session does many jobs, one at a time. Keep what you learn about the program for the next job.

**The agent of the program.** Each program has one agent: an Orbh wisp, with a name (the alias of the wisp, for example "Quiet Amber Heron"), a purpose, its sessions, a memory folder, and the address `@v1/<org>/wisp/<uuid>#flint/<slug>`. Each job of the program goes to that agent: a send of the composer with no selected agent, `flint ite job "<program>"` with no `--session`, and each job of a process with `agent: program`. A ready session of the agent takes the job by a resume. A session of the agent that works refuses a job (`agent-busy`); the queue keeps a job of a process until the session is ready. With no session that can take the job, a new session starts and joins the wisp, so the agent keeps its memory. With no agent yet, the first job makes it (a new wisp). `flint ite agent program "<program>"` shows the agent; a person makes a session the agent with `--set <session>`, and sets the target of its new sessions with `--target` and `--account`. "A new agent (one time)" of the composer and `flint ite job --new-agent` start a session outside the agent. The binding is `.flint/steel/agents/<program id>/agent.json`; the identity stays in the Orbh wisp store. When you are the agent of a program, the prompt says it: run `flint orbh wisp show` to find your memory folder, read its `MEMORY.md` before the work, and add to it what the next job needs before you return.

1. **The orientation.** The first prompt of each agent session gives the program (its name, its id, its types, its folders, and its counts) and tells the agent to load this shard, then each shard of the field `shards` of the root note. It holds no job. With no job, the agent reads the program, then ends with one to three sentences: what the program is, and what needs work.
2. **A job.** Each job comes as a new prompt: the action and its workflow, the document, the nodes, the text of the person, the first `flint ite focus` command, and the form of the result. The prompt of a job never repeats the orientation. Read each prompt of a job fully: a new job can name another action, other nodes, or another document. Do not carry the focus or the instructions of an older job into a new job.
3. **The end of a job.** A headless agent session ends each job with `flint orbh session return --await "<result>"`. Never use `--finish`: a finished agent session takes no new job. The person ends the agent session with End in the Workbench: End finishes it and undocks it. An ended agent session (finished or abandoned) takes no job and no message from the Workbench (`agent-ended`): the person starts a new agent. An interactive agent session writes the result in the chat, then waits for the person. The result form is in [[init-ite#Headless]].
4. **One job at a time.** A job for an agent session that works now is refused with `agent-busy`. A message of the person can still reach the session in its queue during a job. Answer it in the result of the current job, or of the next job. Never answer it with `flint orbh message send`: a message from the Workbench has no session as its sender.
5. **Dock.** A person docks an agent session to keep it at the top of the agent panel, and gives it the next job from its jobs, from its activity, or from a node. End undocks it. An agent never docks or undocks.
6. **Activity.** Each write of an agent session through `flint ite` adds one activity record to the agent log: `part set` and `link` (each one a proposal of a map change), a map change (`propose`, `discard`, `part add`, `part remove`), a view candidate, a revision, `claim report`, and `claim new`, `process new`, and `flow new`. The person clicks a record to open its object. Write through `flint ite` each time a command exists, so that the person sees what you changed.
7. **Agent checks, agent processes, and agent steps** of a run each keep one Orbh session for one dispatch. They show in the agent panel and on the map, and they take no job.
8. **A session in Obsidian (Task 1265).** "Work on these in Obsidian" (the bar of a selection, the menu of a card, the inspector, or the palette) asks the person for an Orbh profile, then opens an interactive agent session in a new terminal tab of the Obsidian of this Flint (`POST /api/ite/agents/obsidian`; the plugin `nuu-flint` runs `flint orbh i <profile>` at the root of the vault). Its prompt says where it runs and names the selected nodes. The session loads the shards, runs `flint ite focus <ids> --program "<program>"`, reads the nodes, writes two to four sentences, and waits: the person gives the work in the terminal. The server writes the keys of the presence, so its orb shows on the nodes at once. It has no job record: the person talks to it in the terminal, not with the jobs of the Workbench.

Each action except `free` is a recipe: a shared process `Steel/Recipes/<id>/process.md` of this shard, with the block `action: { object, needs-nodes, needs-text, writes-proposal, ask, workflow }`. `flint ite actions` reads the list from `Steel/Recipes/`. The actions:

| Action | Title | Needs | Workflow (headless / interactive) | Ends with a proposal |
|---|---|---|---|---|
| `free` | Free text | Text | None: the prompt of the job gives the steps | No |
| `model` | Model this system | — | [[wkfl-ite-model]] | Yes: a map change |
| `update` | Bring this program up to date | — | None: the prompt of the job gives the steps | No |
| `explain` | Explain these nodes | Nodes | None: the prompt of the job gives the steps. It changes no file. | No |
| `do` | Do the work of these nodes | Nodes | None: the prompt of the job gives the steps | Yes: a map change for each change of a part |
| `parts-add` | Add parts | — | [[wkfl-ite-parts_add]] | Yes: a map change |
| `map-create`, `map-expand`, `map-refactor`, `map-cover`, `map-update` | See The Actions of the Main Map in [[knw-ite-programs]] | One part for `map-expand` and `map-update` | `wkfl-ite-map_*` | Yes: a map change |
| `view` | Answer a question with a view | Text | [[wkfl-ite-view]] | Yes: a candidate |
| `reshape` | Change this view | Text | [[wkfl-ite-reshape]] | Yes: a candidate |
| `claim-add` | Add a claim | — | [[wkfl-ite-claim_add]] | No (the promote of its check is a revision for the person) |
| `ground` | Write the claims of these parts | Nodes | [[wkfl-ite-ground]] | No (the promote of each check is a revision for the person) |
| `observe` | Check the claims | — | [[wkfl-ite-observe]] | No |
| `repair` | Repair what fails | — | [[wkfl-ite-repair]] | Yes, when the model must change: a map change, a revision, or a candidate |
| `process-add` | Add a process | — | [[wkfl-ite-process_add]] | No |
| `flow-add` | Add an instruction map | — | [[wkfl-ite-flow_add]] | No |
| `revise` | Write a revision | Text | None: the prompt of the job gives the steps | Yes: a revision |
| `review` | Review these nodes against their code | Nodes | [[wkfl-ite-review]] | Only for a node that is not true: a candidate or a map change |

`flint ite actions` gives the list of this machine. Each action has one workflow (`wkfl-ite-<name>`). A headless agent session follows it with its `> [!headless]` callouts. An interactive agent session follows it with no callout, and it can ask the person.

## The Focus of an Agent

A person sees each live agent session on the map, as an orb on the nodes of its focus. The focus is the union of the metadata `ite-focus` (the nodes of the current job: Steel writes it at each new job) and the interface key `ite-focus` that the agent sets. Each prompt of a job starts with `flint ite focus <node ids>`, or `flint ite focus --clear` for a job with no nodes. Each workflow of this shard changes the focus when its work moves to other nodes. Follow [[sk-ite-focus]].
