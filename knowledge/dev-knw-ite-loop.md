---
description: "The loop of a program: the kernel words, events and their routes, the standing process and the agent of the program, the plan of future notes, dev versions, the pulse, living systems (the brief, the vital signs, revisions, authority), and agent sessions with their jobs and focus"
---

# Knowledge: The Loop of a Program

A program is live when events keep it true. This file gives the loop of a program in five parts:

- **Events**: what comes in.
- **The standing process and the agent of the program**: who does the work.
- **The plan**: what must be.
- **Dev versions**: how a process changes safely.
- **The pulse**: what a person reads first.

Then two more parts:

- **Living systems**: a program whose loop is closed, with the brief, the vital signs, revisions, and authority.
- **Agent sessions and jobs**: the agents that a person starts in the Workbench, one job at a time, with their focus.

The rules of [[init-ite]] apply with no change. An agent proposes. Only a person applies, approves, enables, or promotes.

```
event in → route by "about" → process (code, agent, or person)
   → proposal → a person applies it → state changes → checks judge → the pulse
```

## The Kernel

Five words describe each system. Use them with a person, together with the words of each type (a guest, a budget, a release). Do not add a new word that a person must learn.

| Word | Meaning | In the ITE |
|---|---|---|
| Thing | A part of the system, with a note | A part |
| State | What is true now | The fields, the data, the verdicts, and the state of a run |
| Process | What changes state | A process, an instruction map, a check, or a reader |
| Event | A fact in time: this happened, here, now | One line of the form `steel-event/1` |
| Plan | What must be: the future state | The future notes of a program (`steel-future/1`) |

A **proposal** (a map change, a candidate, or a revision) is how a change reaches a person. It is not a kernel word. A proposal follows reality ("is"); a plan leads it ("must be").

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

1. `kind` is lower-case words with dots. The kinds of now: `task.finished`, `commit.landed`, `note.added`, `webhook`, and `manual`. An unknown kind is valid: a process can listen to it.
2. `about` can be empty. Each list in it is optional.
3. `summary` is one sentence for a person.

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
2. A path is covered by the `code-refs` of a part of a software program. The router uses the matcher of `flint ite check --paths`.
3. A task title names a part of the program (a task can be a part).

In each program that matches, the event starts each process whose trigger listens to its kind. A process with `scope: any` gets each event of its kind, also with no match. One event can go to many programs: a changed file can touch Flint, CLI Core, and Plate SDK. The agent of each program proposes its own change.

### The Trigger `on: event`

```yaml
trigger: { on: event, kinds: [task.finished, commit.landed] }
trigger: { on: event, kinds: [note.added], scope: any }
```

1. An event trigger runs only on a machine where a person enabled it (`flint ite enable "<program>" process:<id>`), as each other trigger. A route to a process that is not enabled has the status `not-enabled`.
2. The run gets the event as `STEEL_EVENT`, as a hook does.
3. A claim and a piece of data can also listen to an event: a check or a pull starts.

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

The **standing process** of a program is the process with `by: agent`, `agent: program`, and an event trigger. Its usual id is `keep-map-true`. In NUU Flint, `Steel/Programs/Flint/Processes/keep-map-true/` listens to `task.finished` and `commit.landed`.

**The job of an event** asks the agent for:

1. **One proposal for each event.** The proposal is one map change with all the parts that the event touches. Add a view candidate only when a node of a kept view must change. One task gives one proposal, not one proposal for each part.
2. **The plan**: which future notes the work made true, in part (`doing`) or fully (`done`), set with `flint ite plan set`.

The agent never applies a proposal, and it never realizes a future note. The coding agent that did the task does no map work: at the end of a product task, [[sk-ite-check_after_task]] emits `task.finished`. Its old steps run only for a program with no standing process that took the event.

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
status: next              # next | doing | done | dropped
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

### The Findings of the Plan

| Code | Level | When |
|---|---|---|
| `plan-behind` | warning | The true note changed after `based-on` |
| `plan-orphan` | error | `plan-of` or `plan-parent` names no part and no future note |
| `plan-twice` | error | Two future notes change one thing on one horizon |
| `plan-stale` | note | A `next` future note is older than 14 days |

`flint ite check` shows them, as each other finding.

### The Commands of the Plan

| Command or route | Result | Writes |
|---|---|---|
| `flint ite plan "<program>" [--json]`, `GET /api/steel/programs/:id/plan` | The plan, grouped by status, with the counts | Nothing |
| `flint ite plan show "<program>" <future id\|ref> [--diff] [--json]`, `GET .../plan/:futureId` | One future note, with the diff to the true note | Nothing |
| `flint ite plan add "<program>" --of <ref> \| --parent <ref> --type <Type> --title "<title>" [--text <file\|->] [--append "<paragraph>"] [--change change\|add\|remove]`, `POST .../plan` | Writes a new future note, with `based-on`. With `--of` and no `--text`, the future starts as the true note; `--append` adds one paragraph to it (the change in one sentence). An agent uses it only in a session that a person drives, or as a builder when its prompt asks for it. | One future note |
| `flint ite plan set "<program>" <future id> [--status <s>] [--text <file\|->]`, `PATCH .../plan/:futureId` | Changes the status or the text of a future note | The future note |
| `flint ite plan realize "<program>" <future id> [--reason "<text>"]`, `POST .../plan/:futureId/realize` | Proposes **one map change** that makes the future true: `edit` (the text and `fields` replace the true note), `add` (a new part with `plan-parent`, `type`, and the title), or `remove`. The map change records `realizes: [<future id>]`. | One proposal |

When a person applies a map change that realizes a future note, the ITE sets the future note to `status: done` and moves it to `Steel/Programs/<Name>/History/plan/`. The file keeps its id.

### Who Writes the Plan

1. A person writes the plan. An agent can draft a future note only in a session that a person drives, or as a builder when its prompt (the words of a person, or of a manager for a person) asks for it. The note has the status `next`, and the agent lists each one for the person. A job agent and an engine agent write no future note.
2. An agent of a program sets `doing` or `done` after a task, with `flint ite plan set`. It never runs `plan realize`: a person makes a future true (Make it true in the Workbench).
3. The Workbench draws the plan over the main map with the switch "Now / Next". A new thing is a ghost card under its parent. A changed thing has a mark. A removed thing is struck through. A future that is behind has a warning mark.

## Dev Versions

Each process and each instruction map has a production version and can have one dev version.

| | Production | Dev |
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
| `flint ite process dev "<program>" <id>`, `POST /api/steel/programs/:id/processes/:pid/dev` | Makes the dev version from production. It refuses when a dev version exists. |
| `flint ite process run "<program>" <id> --dev`, `flint ite flow start "<program>" <id> --dev` (the field `channel: "dev"` on a route that starts a run) | A dev run. A person only. |
| `flint ite process promote "<program>" <id> [--reason "<text>"]`, `POST .../processes/:pid/promote` | One revision that promotes the dev version. A person applies it. |
| `flint ite process show "<program>" <id>` | Both versions, each with its version and its time |

An agent can write the files of a dev version. It never starts a dev run by a trigger, and it never applies a promotion.

## The Pulse

The pulse is what a person reads first about a program, also when the program is not a living system.

```ts
type SteelPulse = {
  program: string; at: string;
  plan: { next: number; doing: number; done_7d: number; behind: number; oldest_next_days: number | null };
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
2. The brief of a living system gets two more sections from the same read: **the plan** and **the machinery**.
3. The pulse monitors the machinery of the loop. It gives the age of the map, the runs of the standing process, the share of proposals that a person applied, and the age of the oldest `next` item. Read it before you start the work of a program.

## Living Systems

A **living system** is a system whose actors act through its own model: each claim shows its check and the age of its newest result, each process shows its runs, and a step with an effect stays pending until a check confirms the effect. A program becomes a living system when its root note has one `system` block. A program with no block has no brief and no vital signs.

Steel is the tool through which a person constructs a living system, reads it, runs it, and develops it. The code keeps the name `ite` (`flint ite`, the page `/ite`). In this Flint, the program Flint Release is the first living system: read its root note, its claims in `Steel/Programs/Flint Release/Reality/`, and its processes and instruction maps in `Steel/Programs/Flint Release/Processes/` as the reference forms.

### The Loop

1. **A process acts.** A person, a trigger, or a step of a run starts it.
2. **The world changes.**
3. **The checks read the world**: the checks of the `effect` claims at once, and each other check by its trigger.
4. **A claim judges** by its mode: `holds` (nothing to do); an `is` claim fails (**drift**: the model is out of date; an agent can propose a change of the model); an `ought` claim fails (**at risk**: the brief names the owner and offers `fixed-by`: "23 of 30 RSVPs. Run `send-reminders`?"); a `will` claim resolves (the prediction is scored); a result is old (the check must run again).

### The Terms of a Living System

These terms add to The Terms of [[knw-ite-reference]]. One term has one meaning.

| Term | Meaning |
|---|---|
| System | A program with a `system` block in its root note |
| Root | The root note of a system: the boundary, the owners, the goals, the maps, and the connections. It is an index, not the one truth. |
| Boundary | What is inside the system, what is outside, and what is unknown: a decision of a person, with a date and a reason |
| Connection | What crosses the boundary to another system: imports, exports, and the integration that carries them |
| Goal | An `ought` claim with an owner, named in `goals` of the system block |
| Drift | An `is` claim that fails (a mirror claim too), or external data whose source changed its shape: the model is out of date |
| At risk | An `ought` claim that fails: reality is off target |
| Effect | The change in the world that a process or a step must cause. It is pending until a check of an `effect` claim confirms it. |
| Brief | The page of attention: six sections of items, and the vital signs |
| Episode | One continuous interval in which the condition of an item of the brief is true. An acknowledgement and an escalation bind to one episode. |
| Revision | A candidate change of one file of the system, with a reason and a check, that a person applies and can revert |
| Protected change | A change that can weaken a check. Only a person applies it, and only through a revision. |
| Vital signs | Five measures, each from independent evidence: freshness, closure, use, surprise, coverage. No single score. |

Do not use "environment" (it is an Information Environment or an Orbtest environment), "turn" for an Orbh run, or "live" for "fresh".

### One Authority for Each Fact

| Fact | Authority | Writer |
|---|---|---|
| Parts, links, the system block, prose | The Mesh | A person, an agent, or an applied revision. A protected change: a revision only. |
| Claims and their checks | `Steel/Programs/<P>/Reality/<claim>/` | A person or an agent |
| Data: its file, its code, and its native values | `Steel/Programs/<P>/Data/<id>/` | The file and the code: a person or an agent. A native value: a person, a process with `writes`, or the door. |
| Snapshots, caches, and the history of pulled and calculated values | `.flint/steel/data/<program id>/<id>/` | The core only |
| Processes and instruction maps | `Steel/Programs/<P>/Processes/<process>/` | A person or an agent |
| Run control, attempts, approvals, the copy of the evidence | The run folder in `Steel/Programs/<P>/Runs/` | The run engine only |
| Results, process runs, acknowledgements, escalations, prompts | The log `.flint/steel/logs/<program id>.jsonl` | The commands only (the one door of the results) |
| Enables | `.flint/steel/enabled.json` | A person, through `flint ite enable` |
| The jobs, the dock records, and the activity of the agent sessions | The agent log `.flint/steel/agents.jsonl` (append-only) | The agent routes and the `flint ite` commands only |
| Revisions and their exact old bytes | `Steel/Programs/<P>/Proposals/` | The revision commands only |
| The states of the claims, the findings, the brief, the vital signs | Nobody: a command computes them on each read | Nobody |

No file holds a result, a state of a claim, an item of the brief, or a vital sign. Never write the log by hand, and never edit or remove a line of it.

### The System Block (`steel-system/1`)

One fenced ` ```system ` YAML block in the root note, under the H1 and the first paragraph. The keys are kebab-case.

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
goals: [no-pull-debt, monthly-release]
attention: { escalate-after: 24h, brief-since: 24h }
authority: { run: ["person:Nathan"], approvers: ["person:Nathan"] }
governor: { max-runs-per-day: 3, max-attempts-per-step: 3, max-agent-attempts-per-day: 10, irreversible-needs-approval: true }
```
````

1. `format` is required. Another value gives the finding `system-invalid` (warning), and the program is not living.
2. Each id in `goals` is a claim of the program (a folder of `Reality/`), and it should be an `ought` claim.
3. Each wikilink in `boundary.inside[].parts` is a part of the program. A boundary item with no part shows as unwatched.
4. The defaults: `timezone` `UTC`, `escalate-after` and `brief-since` `24h`, `authority` null (the owners run each process), `governor` null.
5. A prose edit of the root note keeps the block. Only a revision changes the block.

### The Brief and the Vital Signs

The brief is the centre of a living system in Steel. It has six sections, in this order:

| Section | Items |
|---|---|
| `drift` | An `is` claim that fails, a mirror claim that fails (with "Run <redraw>?"), and external data whose last pull gave "The source changed its shape" |
| `at-risk` | An `ought` claim that fails, with the processes of its `fixed-by` |
| `old` | A claim whose newest result is older than its `fresh-for`, a claim that is old because a value that it reads is old, and data whose value is old or whose last pull failed (with Pull now) |
| `unwatched` | A part that no claim is about, a claim with `by: none`, a boundary item with no part, and external data that nothing reads (no `reads`, no `from`) |
| `pending` | A person check, an approval, an effect that waits for its check, a task of a person, a revision that waits, and data that waits for a person (`by: person`: "Write the value") |
| `surprises` | A `will` claim that came false, and a claim that changed from `holds` to `fails` with no run |

Each item names its source, its age, and its owner. An item belongs to one **episode**: the interval in which its condition is true. An acknowledgement binds to one episode and stops only its escalation. A later failure of the same subject opens a new episode. An item that nobody acknowledges escalates after `escalate-after`. The brief writes nothing.

The five vital signs come from the results and the runs, each on its own. There is no single score.

| Vital sign | What it counts |
|---|---|
| Freshness | The claims by state, and the data by state |
| Closure | The effects that a check confirmed, over the effects that need confirmation |
| Use | The runs and the process runs, the prompts that agents took from the system, and the days that a person opened the brief |
| Surprise | The `will` claims that came false, and the claims that changed from `holds` to `fails` with no run |
| Coverage | The boundary items and the parts that a claim is about, with the exclusions and the unknown areas. Never a percentage of reality. |

### Revisions

A revision is a candidate change of one file of the system: a file in `Steel/Programs/<P>/Proposals/` (`steel-revision/1`). `flint ite revision propose` writes it, with the kind `part`, `goal`, `system`, or `steel`. The kind `steel` targets a model file of the program in `Steel/Programs/<P>/`: `Processes/<id>/map.md`, `Processes/<id>/process.md`, `Reality/<id>/claim.md`, or `Data/<id>/data.md`. A process that keeps an instruction up to date (for example `redraw-mirror`) proposes its new file this way; only a person applies it.

1. **The targets:** the root note, a part file, a new part file, and (kind `steel`) a model file of the program in `Steel/`.
2. **The check** reads the whole system with the new bytes in place. A finding of the level error stops the apply.
3. **The apply** writes the target only when its hash is the base hash, and keeps the exact old bytes in the revision file. **The revert** writes the old bytes back only when the target has the hash of the apply.
4. **A protected change** is a change of `goals`, `authority`, or `governor` of the system block. Only a person applies it, through a revision, with `--protected`. A change of these keys by hand is the finding `protected-change`.

### Authority

**The actor comes from the caller, never from a request.** The CLI acts as `agent:<ORBH_SESSION_ID>` in an Orbh session, else as `person:<Name>`. The server acts as `agent:<session id>` for a request with the header `x-orbh-session-id`, else as the person of this machine. The trust boundary is this machine: the authority layer stops an honest agent from acting outside its policy, and it records who asked. A direct edit of a file is outside the enforced boundary.

The refusals: `not-allowed` (the actor is not in `run`), `needs-approval`, `governor-limit`, `agent-cannot-approve`, `agent-cannot-enable`, and `protected-change`.

### The Rules of a Living System

1. **Never confidently wrong.** A check that cannot read its source gives `error`, never an old value. A result older than `fresh-for` is `old`. A prediction scores as of its instant, never later.
2. **Only a check confirms an effect.** A Done of a person, the report of an agent, and the record of a process never confirm one.
3. **A protected change needs a revision** that a person applies. An agent proposes; it never applies a protected revision.
4. **Only commands write facts.** Never write the log or a run by hand. Report a result with `flint ite claim report`.
5. **The core runs a check or a process only by its trigger, by Check now or Run now, or by a run.** A trigger runs only on a machine where a person enabled it.
6. **An agent never decides for a person.** It never approves, refuses, waives, enables, or answers a decision of a person, and it never acts on the world unless the step that it does says so.
7. **The mode decides the direction.** A mirror and an `is` claim follow the world. A native map and an `ought` claim direct it.

### The Commands of a Living System

Each command takes `--json`. `<program>` is the name or the id of a program with a system block. A program with no block refuses each command but `flint ite system` with `not-living`.

| Command | Result | Writes |
|---|---|---|
| `flint ite system "<program>"` | The root: the owners, the boundary, the goals with their state, the maps, the connections, the claims, the processes, the vital signs | Nothing |
| `flint ite log "<program>" [--since-seq <n>] [--kind <k>] [--limit <n>]` | The records of the log | Nothing |
| `flint ite brief "<program>" [--since <d>] [--markdown]` | The brief | Nothing |
| `flint ite brief ack "<program>" <item> --episode <id> [--note "<text>"]` | Acknowledges one episode of one item | The log |
| `flint ite vitals "<program>" [--window <d>]` | The five vital signs | Nothing |
| `flint ite prompt "<program>"` | The reconciliation prompt of the system for an agent: the root, the brief, the check of the old claims, and the return of the brief | The log (an agent only) |
| `flint ite adopt "<program>"` | A person adopts the protected declarations of the system as they are now | The baseline beside the log |
| `flint ite revision list "<program>" [--state <s>]`, `show "<program>" <id>` | The revisions; one revision with its diff | Nothing |
| `flint ite revision propose "<program>" --kind part\|goal\|system\|steel --target <file> --content-file <path> --reason "<text>" [--trigger person\|drift\|at-risk\|surprise] [--base-hash <h>]` | Proposes a revision | `Proposals/` |
| `flint ite revision apply\|revert "<program>" <id> [--protected]`, `discard "<program>" <id>` | Applies, reverts, or discards a revision | The target, `Proposals/` |

The claims, the data, the processes, the triggers, and the runs of a living system use the commands of Claims and Checks and of Data ([[knw-ite-state]]), and of Processes, Triggers and Enables, and Instruction Maps and Runs ([[knw-ite-processes]]).

## Agent Sessions and Jobs

An **agent session** is one Orbh session that Steel starts for one program. A person starts it in the agent panel of the Workbench (the tab Agents of the right column) with "New agent", or with `flint ite agent start`. One agent session does many jobs, one at a time. Keep what you learn about the program for the next job.

1. **The orientation.** The first prompt of each agent session gives the program (its name, its id, its types, its folders, and its counts) and tells the agent to load this shard. It holds no job. With no job, the agent reads the program, then ends with one to three sentences: what the program is, and what needs work.
2. **A job.** Each job comes as a new prompt: the action and its workflow, the document, the nodes, the text of the person, the first `flint ite focus` command, and the form of the result. The prompt of a job never repeats the orientation. Read each prompt of a job fully: a new job can name another action, other nodes, or another document. Do not carry the focus or the instructions of an older job into a new job.
3. **The end of a job.** A headless agent session ends each job with `flint orbh session return --await "<result>"`. Never use `--finish`: a finished agent session takes no new job. The person ends the agent session with End in the Workbench: End finishes it and undocks it. An ended agent session (finished or abandoned) takes no job and no message from the Workbench (`agent-ended`): the person starts a new agent. An interactive agent session writes the result in the chat, then waits for the person. The result form is in [[hinit-ite]].
4. **One job at a time.** A job for an agent session that works now is refused with `agent-busy`. A message of the person can still reach the session in its queue during a job. Answer it in the result of the current job, or of the next job. Never answer it with `flint orbh message send`: a message from the Workbench has no session as its sender.
5. **Dock.** A person docks an agent session to keep it at the top of the agent panel, and gives it the next job from its jobs, from its activity, or from a node. End undocks it. An agent never docks or undocks.
6. **Activity.** Each write of an agent session through `flint ite` adds one activity record to the agent log: `part set`, `link`, a map change (`propose`, `discard`, `part add`, `part remove`), a view candidate, a revision, `claim report`, and `claim new`, `process new`, and `flow new`. The person clicks a record to open its object. Write through `flint ite` each time a command exists, so that the person sees what you changed.
7. **Agent checks, agent processes, and agent steps** of a run each keep one Orbh session for one dispatch. They show in the agent panel and on the map, and they take no job.

The actions:

| Action | Title | Needs | Workflow (headless / interactive) | Ends with a proposal |
|---|---|---|---|---|
| `free` | Free text | Text | None: the prompt of the job gives the steps | No |
| `model` | Model this system | — | [[hwkfl-ite-model]] / [[wkfl-ite-model]] | Yes: a map change |
| `update` | Bring this program up to date | — | None: the prompt of the job gives the steps | No |
| `explain` | Explain these nodes | Nodes | None: the prompt of the job gives the steps. It changes no file. | No |
| `do` | Do the work of these nodes | Nodes | None: the prompt of the job gives the steps | No |
| `parts-add` | Add parts | — | [[hwkfl-ite-parts_add]] / [[wkfl-ite-parts_add]] | Yes: a map change |
| `map-create`, `map-expand`, `map-refactor`, `map-cover`, `map-update` | See The Actions of the Main Map in [[knw-ite-programs]] | One part for `map-expand` and `map-update` | `hwkfl-ite-map_*` / `wkfl-ite-map_*` | Yes: a map change |
| `view` | Answer a question with a view | Text | [[hwkfl-ite-view]] / [[wkfl-ite-view]] | Yes: a candidate |
| `reshape` | Change this view | Text | [[hwkfl-ite-reshape]] / [[wkfl-ite-reshape]] | Yes: a candidate |
| `claim-add` | Add a claim | — | [[hwkfl-ite-claim_add]] / [[wkfl-ite-claim_add]] | No |
| `ground` | Write the claims of these parts | Nodes | [[hwkfl-ite-ground]] / [[wkfl-ite-ground]] | No |
| `observe` | Check the claims | — | [[hwkfl-ite-observe]] / [[wkfl-ite-observe]] | No |
| `repair` | Repair what fails | — | [[hwkfl-ite-repair]] / [[wkfl-ite-repair]] | Yes, when it changes the tree or a view |
| `process-add` | Add a process | — | [[hwkfl-ite-process_add]] / [[wkfl-ite-process_add]] | No |
| `flow-add` | Add an instruction map | — | [[hwkfl-ite-flow_add]] / [[wkfl-ite-flow_add]] | No |
| `revise` | Write a revision | Text | None: the prompt of the job gives the steps | Yes: a revision |
| `review` | Review these nodes against their code | Nodes | [[hwkfl-ite-review]] / [[wkfl-ite-review]] | Only for a node that is not true: a candidate or a map change |

`flint ite actions` gives the list of this machine. A headless agent session follows the headless workflow (`hwkfl-ite-<name>`). An interactive agent session follows the interactive workflow (`wkfl-ite-<name>`), and it can ask the person.

## The Focus of an Agent

A person sees each live agent session on the map, as an orb on the nodes of its focus. The focus is the union of the metadata `ite-focus` (the nodes of the current job: Steel writes it at each new job) and the interface key `ite-focus` that the agent sets. Each prompt of a job starts with `flint ite focus <node ids>`, or `flint ite focus --clear` for a job with no nodes. Each workflow of this shard changes the focus when its work moves to other nodes. Follow [[sk-ite-focus]].
