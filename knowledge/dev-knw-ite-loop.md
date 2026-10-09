---
description: "The loop of a program: the kernel words, events and their routes, the standing process and the agent of the program, the plan of future notes, dev versions of processes and instruction maps, and the pulse"
---

# Knowledge: The Loop of a Program

A program is live when events keep it true. This file gives the loop of a program in five parts:

- **Events**: what comes in.
- **The standing process and the agent of the program**: who does the work.
- **The plan**: what must be.
- **Dev versions**: how a process changes safely.
- **The pulse**: what a person reads first.

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

1. `agent: program` means: the agent session of the program does the work. That agent does many jobs, one at a time (see Agent Sessions and Jobs of [[init-ite]]).
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
| `flint ite plan add "<program>" --of <ref> \| --parent <ref> --type <Type> --title "<title>" [--text <file\|->] [--change change\|add\|remove]`, `POST .../plan` | Writes a new future note, with `based-on`. An agent uses it only in a session that a person drives. | One future note |
| `flint ite plan set "<program>" <future id> [--status <s>] [--text <file\|->]`, `PATCH .../plan/:futureId` | Changes the status or the text of a future note | The future note |
| `flint ite plan realize "<program>" <future id> [--reason "<text>"]`, `POST .../plan/:futureId/realize` | Proposes **one map change** that makes the future true: `edit` (the text and `fields` replace the true note), `add` (a new part with `plan-parent`, `type`, and the title), or `remove`. The map change records `realizes: [<future id>]`. | One proposal |

When a person applies a map change that realizes a future note, the ITE sets the future note to `status: done` and moves it to `Steel/Programs/<Name>/History/plan/`. The file keeps its id.

### Who Writes the Plan

1. A person writes the plan. An agent can draft a future note only in a session that a person drives.
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
