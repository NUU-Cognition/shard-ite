---
description: "Processes of a program: the file and the three forms (code, agent, person), the effect and the authority, triggers and enables, instruction maps (the nodes, the modes, the data between steps), runs, and every command of a process and of a run"
---

# Knowledge: Processes, Triggers, Instruction Maps, and Runs

Read this file before you write a process, a trigger, or an instruction map, or before you start or act on a run. The rules of [[init-ite]] apply with no change. To make one process or one instruction map fast, follow [[sk-ite-process_new]] or [[sk-ite-workflow_new]].

## Processes

A **process** is a small instruction that the program owns and can run: one description, and code, an agent, or a person. It does work, and it can change the world. It lives in `Steel/Programs/<P>/Processes/<process>/process.md` (`format: steel-process/1`), with its code in the same folder. The form is [[tmp-ite-process-v0.1]].

```yaml
---
format: steel-process/1
id: send-reminders
by: code                     # code | agent | person
runtime: node                # code: node | python | exec
entry: index.js
timeout: 60s
about: [366cc014-1f13-49f9-89f7-215623dfc872]   # references: the elements that it acts on
reads: ["data:rsvps#count"]  # optional: the data that it reads (STEEL_DATA)
writes: ["data:reminder-answers"]   # optional: the native data that it may write
inputs: [{ name: summary, kind: text, required: true }]
outputs: [{ name: sent, kind: number }]
effect: [rsvps-30]           # the claims that show that the work worked
trigger: manual              # see Triggers and Enables
authority: { run: ["person:Nathan"], approve: false, irreversible: false }
concurrency: 1               # optional: at most this many runs at once
---
# Send the reminders
For a person: what the process does, and why.
```

1. **Three forms.** `code` runs its entry with `FLINT_ROOT`, `STEEL_PROGRAM_ID`, `STEEL_PROCESS_ID`, `STEEL_PARTS`, `STEEL_ABOUT`, `STEEL_DATA` (the values of `reads`), `STEEL_INPUTS`, `STEEL_STATE` (JSON: the state of the process across its runs), `STEEL_RUN_ID` (or empty), and the env files. Each output line that is a JSON object is one record: `{ "output": { "<name>": <value> } }`, `{ "state": {...} }` (the new state of the process), `{ "data": { "id": "<data id>", "value": <value> } }` or `{ "data": { "id": "<data id>", "rows": [...], "how": "append" | "replace" } }` (data of `writes`, written at the end of a run that is `done`), or `{ "log": "<text>" }`. Exit 0 is `done`; another exit is `failed`. `agent` starts one Orbh session with `prompt` and the inputs (`target`, optional), and its result gives the outputs. `person` gives `waiting`: Steel shows the `task` to the person, who presses Done with the outputs.
2. **The mode.** A process whose code or description is here is native. A process with `source` is external: it runs an instruction outside as one unit. `source` is one of `{ ref: "[[<note>]]" }` (a skill, a workflow, a note: an agent follows it), `{ path: "@<Codebase>/<path>" }`, or `{ command: "<command line>" }`; `ref` and `path` add `hash` (the sha256 of the source text at the drawing), and then the process has a mirror claim. `redraw: <process id>` names the process that draws the mirror again. `${inputs.<name>}` in a command names an input.
3. **The effect.** After a process is `done`, the core runs the checks of its `effect` claims once, with the same inputs. Only a check confirms an effect. The report of the process does not. Before an effect check, the core pulls each external data with a code reader that the claim reads, also when its trigger is not enabled. It does not pull data with an agent or a person reader, or native data. Then the engine gives `error` when the check holds but a value that the claim reads is old (older than its `fresh-for`), not there, or waits for a person. an old value never confirms a step or an effect, and the result names the data to pull or to write again.
4. **Authority.** `run` lists who may start it: `person:<Name>`, `person:*`, `agent:*` (each agent), or `agent:<target>` (default: the owners of the system, else the person of this machine). So an agent may Run now only a process whose `run` names it: a person gives `agent:*` only to a process that changes nothing outside this Flint (it reads, or it writes only the native data of its `writes`), with `flint ite process set "<program>" <id> --run-by agent`. An agent never gives a run right: the engine refuses `--run-by` from an agent on each path (`process new`, `process set`, `flow new`, the routes), and the refusal of `process run` names the command of the person. `approve: true` needs the approval of a person before each run. `irreversible: true` implies `approve: true`, and an agent never approves.
5. **A process changes the model only through a proposal.** It has no way around the one writer of the structure. It writes data only through `writes`, and only in a run that a person started or approved, or that an enabled trigger started. A run that an agent started with no approval of a person writes no data. A process that keeps an instruction up to date (for example `redraw-mirror`) proposes the new file as a revision of `Steel/` (`flint ite revision propose --kind steel`).
6. **The state of a process** across its runs is `.flint/steel/state/<program id>/<process>.json`: the code gets it as `STEEL_STATE`, and the newest `{ "state": ... }` record of a `done` run replaces it. A process that writes files on this machine writes them in `.flint/steel/state/<program id>/`.
7. **No ready processes.** Each process holds its own code. Test it with `flint ite process test`: it runs the code once with the given inputs, prints each record and its problems, writes nothing to the log, and changes no state. A process with `irreversible: true` or a `source` refuses the test unless `--dry` is given; with `--dry` it prints what it would run.
8. **A large process.** A process with a `map.md` in its folder runs as a run of its instruction map (see Instruction Maps and Runs). One thing at two sizes: one description, or one description and a map.
9. **The agent of the program.** `by: agent` with `agent: program` gives the work to the agent session of the program as one job (the action `update`, with the `task` of the process and the event), in place of a new session. The default is `agent: own`. See [[knw-ite-loop]].
10. **A dev version.** A process and an instruction map can have one dev version in `Processes/<id>/dev/`. Only a person runs it (`--dev`), and a person promotes it through a revision. See [[knw-ite-loop]].

**The log record** of a process run (`kind: process-run`) holds `process`, `run` (or null), `step` (or null), `state` (`done`, `failed`, `waiting`, `cancelled`), `outputs`, `summary`, `started_at`, `ended_at`, and `by`.

### The Commands of a Process

| Command | Result | Writes |
|---|---|---|
| `flint ite process list "<program>" [--failing] [--waiting] [--enabled] [--never-ran] [--problems] [--by code\|agent\|person\|map] [--about <ref>] [--find <words>]` | The processes of a program, with the form, the mode, the trigger, and the enable on this machine; the flags filter the list (`--find` looks in the id, the title, the prompt, and the task) | Nothing |
| `flint ite process show "<program>" <process>` | One process: its file, its form, its problems, and its newest runs with their outputs and effects | Nothing |
| `flint ite process new "<program>" <id> --by code\|agent\|person --task "<text>" [--title "<title>"] [--text "<prose>"] [--about <ref>...] [--reads <ref>...] [--writes data:<id>...] [--inputs <name[:kind][!]>...] [--outputs <name[:kind][!]>...] [--every <duration> \| --cron "<expression>" \| --on <kind>... \| --on hook] [--irreversible] [--agent program] [--effect <claim>...] [--run-by person\|agent\|person:<Name>\|agent:<target>...] [--dry-run]` | Writes a new `process.md` in one command (`--run-by agent` writes `agent:*` in `authority.run`): the work (`--task` is the prompt of an agent, the task of a person, or the comment of the code), the fields, and the trigger. A ref of `about` is a part id, `process:<id>`, `process:<id>#<node>`, or `data:<id>`. A code process gets a stub `index.js` that passes `process test` at once. `--dry-run` prints the files and writes nothing. | `Processes/<id>/process.md` (and `index.js`), and one activity record for an agent |
| `flint ite process new "<program>" <id> --recipe <name> [--with k=v]...`, `flint ite process recipes` | A process from a recipe that runs at once: `heartbeat`, `http-check`, `json-pull`, `command`, `git-stats`, `keep-map-true` (the standing process: the agent of the program keeps the map true after each event; `--with kinds=task.finished,commit.landed`, `--with variant=software|general|auto`: the software text has review and commits, and `auto` takes it when the root note names a codebase), `person-approve`, `daily-digest` | The files of the recipe |
| `flint ite process set "<program>" <id> [--task] [--title] [--about\|--reads\|--writes\|--inputs\|--outputs <...>\|none] [--every\|--cron\|--on\|--manual] [--irreversible\|--reversible] [--run-by <who>...\|none] [--effect <claim>...\|none] [--dry-run]` | Changes a process in one command: only the keys that you give; each other key and the prose stay. A change that gives the file a problem, or the check a new error, writes nothing and says why. | `process.md` |
| `flint ite process explain "<program>" <process>` | The process in words: what it does, when it starts, what it reads and writes, who may start it, its last run, and what waits. Read it before you change or run a process. | Nothing |
| `flint ite process check "<program>" [<process>]` | Each problem of a `process.md`, its code, its references, and its map, with the file, the line, the cause, and the fix. Runs nothing. Exit 1 on an error. | Nothing |
| `flint ite process run "<program>" <process> [--input k=v]... [--follow \| --to-end]` | Run now. A process with a map starts a run of its map, as `flow start` does (`--follow` too). | The log, the state of the process |
| `flint ite process test "<program>" <process> [--input k=v]... [--data data:<id>=<json>]... [--dry]` | Runs the code once and prints each record and its problems. `--data` gives a sample value of a reference of `reads` for this test only. | Nothing |
| `flint ite process dev "<program>" <process>`, `process run ... --dev`, `process promote "<program>" <process>` | Makes the dev version, runs it (a person only), and proposes its promotion (see [[knw-ite-loop]]) | The dev files, a dev state, or one revision |
| `flint ite process runs ["<program>"] [--process <id>] [--state done\|failed\|waiting\|cancelled] [--limit <n>]` | The process runs of a program, the newest first; with no program, of each program in one list | Nothing |
| `flint ite process done\|fail "<program>" <run> [--output k=v]... [--summary "<text>"] [--reason "<text>"]` | A person ends a waiting task of a process with `by: person`: `done` with its outputs (the effect checks run after it), or `fail` | The log |
| `flint ite process approve\|refuse\|cancel "<program>" <run> [--reason "<text>"]` | A person approves or refuses a run that waits for an approval, or cancels a waiting run. An agent never approves or refuses. | The log |

## Triggers and Enables

Checks, processes, and data (a pull or a maker) have the same triggers. The file says what it wants (in Git). The enable is a fact of the machine (not in Git).

| Trigger | In the file | Who starts it |
|---|---|---|
| Manual | No trigger (`trigger: manual` for a process) | A person (Check now, Run now), or a run (an effect, a precondition, or a wait for a claim) |
| Schedule (and poll) | `trigger: { every: 10m }` or `{ cron: "0 9 * * *" }` | The Flint server |
| A pushed event | `trigger: { on: hook }` | The Flint server, on `POST /api/steel/programs/<program>/hooks/<id>`. The body of the request is the input of the code (`STEEL_EVENT`). |
| An event | `trigger: { on: event, kinds: [task.finished, commit.landed] }` (`scope: any`: each event of the kinds) | The ITE, at each event that is about the program (see [[knw-ite-loop]]). The event is `STEEL_EVENT`. |
| A watched source | `trigger: { on: watch }` | The Flint server keeps the entry running, restarts it after a crash (at most 5 times in 10 minutes), and stops it on disable. The entry prints records as a check or a process does. |

1. **A trigger runs only on a machine where a person enabled it**: `flint ite enable "<program>" <claim|process|data:<id>>`, and `flint ite disable`. The record is `.flint/steel/enabled.json`. An agent cannot enable.
2. **The core runs a check or a process only by its trigger, by Check now or Run now, or by a run.** `flint sync` does nothing for them.
3. A trigger of a claim runs its check. A trigger of a process with a map starts a run. A trigger of data pulls it (or runs its maker). Data has no `watch` trigger.
4. A service on the internet cannot reach `127.0.0.1`. For now, such a source is polled.

| Command | Result | Writes |
|---|---|---|
| `flint ite triggers ["<program>"] [--enabled]` | Each trigger, its enable on this machine, and the next time in local time; with no program, each trigger of this Flint, the enabled first | Nothing |
| `flint ite enable "<program>" <claim\|process\|data:<id>>`, `flint ite disable ...` | Enables or disables one trigger on this machine. A person only. | `.flint/steel/enabled.json` |
| `flint ite trigger fire "<program>" <id> [--event <file\|->]` | Fires a hook or a schedule of a claim or a process now, on this machine (for example from a Git hook). It fires only when a person enabled it here. Exit 1 when it did not start. | The log, a run |

## Instruction Maps and Runs

An **instruction map** is a large instruction: the nodes of a process in order, with the claims that must hold before a step and the claims that show that a step worked. It is the file `map.md` in the folder of its process (`format: steel-flow/1`). Steps are not parts of the main map: the main map says what the system is, and an instruction map says how it moves. A step names the elements that it acts on with `about` (references). A node is an element too: a claim can be about it (`process:<id>#<node>`), and a process can keep it up to date. Steel draws each map itself. The form is [[tmp-ite-instruction_map-v0.1]].

### The File

The grammar of a view file: one H1, then one heading for each node with its id (`## Title {#id}`, a slug), the instruction for a person under it, and one fenced block whose info word is the kind of the node.

````markdown
---
format: steel-flow/1
entry: write-summary
exits: [ship]
inputs: [{ name: head, kind: text, required: true }]
---
# Ship Flint to canon

The custodian writes the ship summary and ships nathan-main to canon.

## Write the ship summary {#write-summary}
Read the commits of origin/canon..head, and write one line for each change.
```step
does: { process: write-ship-summary }
inputs: { head: "${inputs.head}" }
next: [release]
```

## Is this a release {#release}
```decision
question: Is this a release?
by: person
outcomes: { "yes": ship, "no": ship }
```

## Ship to canon {#ship}
```step
does: { process: ship-to-canon }
inputs: { head: "${inputs.head}", summary: "${write-summary.summary}" }
precondition: [no-pull-debt, checks-on-head]
effect: [canon-shipped]
```
````

### The Nodes

| Kind | Block fields | What the engine does |
|---|---|---|
| `step` | `does` (`{ process: <id> }`, or inline `{ by: person \| agent, instruction, target? }`), `next` (one id), `run` (`auto \| manual`), `inputs`, `outputs`, `precondition` (claim ids), `effect` (claim ids), `retry` (`{ max, wait }`), `on-fail` (a node id), `timeout`, `session` (the id of an earlier agent step: this agent step is a new turn of that agent session, so the agent keeps its context; each agent step returns with `--finish`, and a later step continues the finished session), `source` (with `hash` and `redraw`), `about` (references), `reads` (data that the step reads), `writes` (native data that the step may write) | Opens a visit, checks the preconditions, waits for a person when `manual` or when an approval is needed, runs `does`, collects the outputs, runs the effect checks, then follows `next` |
| `decision` | `question`, `by` (`person \| agent`), `outcomes` (`{ "<outcome>": <node id> }`) | Waits for one outcome |
| `wait` | one of `claim: <id>` (until it holds), `until: "<ISO time>"`, `for: 10m`, `event: <hook id>`, or `event: <event kind>` (for example `commit.landed`: the next event of that kind that the one door routes to the program; the node gets the output `event`: `{ id, kind, summary, payload }`); `timeout`, `next` | Waits, then follows `next`. A timeout fails the node. A hook id has no dot; an event kind has a dot. |
| `parallel` | `next: [<id>, ...]` (two or more) | Starts each branch |
| `join` | `wait: all \| any`, `next` | Waits for its branches. `any` cancels the other branches when the first one ends. |
| `sub-map` | `process: <id>` (a process with a `map.md`), `inputs`, `next` | Starts a child run, and waits for its end. The child run names its parent run and node. |

1. **`run`.** The default is `auto` for a step that does a code process or an agent with no approval, and for each `wait`, `parallel`, `join`, and `sub-map`. It is `manual` for a step of a person, for a decision of a person, and for each step whose process needs an approval. A person presses Begin on a `manual` step.
2. **The data.** `${inputs.<name>}` names an input of the run. `${<node id>.<output>}` names an output of an earlier node. `${<decision id>.answer}` names an answer. An object output gives one level of keys (`${wait.event.id}`, `${wait.event.summary}`). `${run.id}` names the run; in an on-fail step, `${run.failed}` and `${run.error}` name the last step that failed and why. A sub-map gets only the `<node>.<output>` values of its child. An agent step gets only the values that its map names: the inputs of the run, the `inputs` of the step, and the references in its instruction. It does not get the other outputs of the run. Each value in a prompt is cut at 4,000 characters, with a note. The value kinds are `text`, `number`, `boolean`, `choice`, `json`, `date`, and `money`.
3. **Loops** go only out of a decision. A node gets at most 20 visits in one run.
4. **Failures.** A failed node retries up to `retry.max` times, with `retry.wait` between; then it follows `on-fail` when it has one; else the run fails.
5. **Preconditions and effects are claims.** A precondition that does not hold blocks the node (the person can retry or skip it). An effect waits for its checks, and `effect.failed` fails the node. A Done of a person is a report: only a check confirms an effect.
6. **The checks of a map** (`flint ite flow show`, `flint ite check`): an unknown node id, a node with no way to an exit, a `join` with no `parallel` before it, a `sub-map` to a process with no map, a cycle that does not go through a decision, a node that the entry does not reach, and a missing process or claim.

### The Modes

1. A step is **mirrored** when its block has `source`, or when its `does` names a process with `source`. Else it is **native**.
2. A map with `source` in its frontmatter is **external**: each node is mirrored, the map is read-only and only for view, and a run of the process runs the source as one unit.
3. A map is **native** when each step is native, **external** when each is mirrored, else **blended**. The mode is counted, never written. Steel shows it as a mark: "Blended: 1 of 2 steps mirrors `ndv repo ship flint ...`".
4. **The drift of a mirror.** Each `source` with a `hash` is a mirror claim (`claim:mirror:process:<id>`, or `claim:mirror:process:<id>#<node>` for a step whose own block has the source). On each read, the core compares `hash` with the source now. A difference fails the mirror claim, and the brief lists it in `drift` with its fix: the process of `redraw` ("Run redraw-mirror?"), else the action `map-update`. The fix proposes the new drawing as a revision, and a person applies it.

| | Native | Blended | External |
|---|---|---|---|
| The truth | The map | The order is in the map; some steps mirror an instruction outside | Outside |
| An edit of a step | As each file of `Steel/` | Native steps: yes. Mirrored steps: no. | No: the map is read-only. A change goes to the source. |
| A run | Step by step | Step by step; a mirrored step runs its source as one unit | The process runs its source as one unit |
| Example in this Flint | `decide` (Thinking), `run-the-night` (Club Launch Night) | `ship-flint` (Flint Release) | `notepad-start` (Workflow Lab) |

### Runs

1. **A run** is one walk of the map of one process. Its folder `Runs/<run id>/` holds `run.md` (`format: steel-run/1`: the id, the process, the title, the inputs, the start, the actor, the parent run and node or null, the snapshot of the resolved map and its sha, and a summary for a person) and `events.jsonl` (append-only).
2. **The state** of the run and of each node is computed from the events: a node is `waiting` (for its inputs), `ready`, `running`, `blocked` (with the reason), `done`, `failed`, `skipped`, or `cancelled`. The state after each event can be read, so Steel shows each stage of a run on a time bar.
3. **The engine is the only writer.** Each write runs in the lock of the Flint with `expected_seq` and `request_id` (a second write with the same `request_id` does nothing). Never create, edit, or delete a file in `Runs/`.
4. **The driver** is the Flint server of the machine that started the run. Every 5 seconds it recovers the leases, collects the agent results, runs the effect checks, applies the timeouts and the waits, starts each `ready` node that is `auto`, and starts each due trigger. Another machine only reads the run.
5. **Concurrency.** A start of a process at its `concurrency` limit is refused with the reason (a trigger skips it).
6. **An agent never approves, refuses, waives, or answers a decision of a person.**

### The Commands of an Instruction Map

Each command takes `--json`. `<run>` is the run id.

| Command | Result | Writes |
|---|---|---|
| `flint ite flow list "<program>"` | The instruction maps of the program, with the mode and the active runs | Nothing |
| `flint ite flow show "<program>" <process>` | The resolved map: the nodes, the kinds, `run`, the modes, and the problems | Nothing |
| `flint ite flow new "<program>" <process id> [--steps "<step>; <step>" \| --from <file\|->] [--title "<title>"] [--about <ref>...] [--text "<prose>"] [--run-by <who>...] [--dry-run]` | (`--run-by` and the `--run-by` of `process new` and `process set` are for a person: the engine refuses them from an agent.) Writes a new `map.md` (`steel-flow/1`) from a list of steps (see [[sk-ite-workflow_new]]: `Person:`, `Agent:`, `Agent (continue [<step>]):`, `Process:`, `Shell: <command>`, `<question>? -> A \| B` or `yes: A \| no: B`, `Wait:`, `Map:`, `A & B`), and prints how it read each step; with no steps, one step `start` of a person. It writes `process.md` when the process has none, with `about` from `--about` (the refs of `process new`) |
| `flint ite flow set "<program>" <process> --steps "<list>" \| --from <file\|-> [--title] [--inputs <field>...] [--dry-run]` | Replaces the steps of a map in one command. The title, the prose, and the inputs stay; a map with an error writes nothing; an external map refuses; an active run keeps its copy. | `map.md` |
| `flint ite flow recipes`, `flint ite flow new "<program>" <id> --recipe <name> [--with k=v]... [--dry-run]` | Ready maps that run at once: `release`, `triage-event`, `daily-check`, `fix-a-claim`, `fleet-day`. A recipe with agent steps takes `--with target=<runtime/profile>` for each agent step. The command writes `map.md`, `process.md`, and one code process for each shell command; each checks clean at once. | `Processes/<id>/` |
| `flint ite flow check "<program>" [<process>]` | Each problem of a `map.md`, with the file, the line, the cause, and the fix. Runs nothing. Exit 1 on an error. | Nothing | `Processes/<id>/map.md` (and `process.md`), and one activity record for an agent |
| `flint ite flow start "<program>" <process> [--input k=v]... [--title "<t>"] [--follow \| --to-end]` | Starts a run, and prints the run id. `--to-end` follows the run to its end, also through the waits of a person (it prints the command of the person one time): exit 0 or 1. `--follow` drives the run here and prints each event until the run ends or waits for a person: exit 0 succeeded, 1 failed or cancelled, 3 waits for a person or paused. With `--json`, one JSON line for each event, then `{"type":"follow.end","status","reason","exit","waits":[],"next":[]}`. | A run |
| `flint ite flow runs ["<program>"] [--status <s>] [--process <id>] [--failed] [--waiting] [--since <time>] [--limit <n>]` | The runs, the active and paused first, then the newest; with no program, the runs of each program in one read, one line each with its next command | Nothing |
| `flint ite flow status <run> [--follow \| --to-end]` | The state of the run and of each node; `--follow` follows a run that exists, as `flow start --follow` does | Nothing |
| `flint ite flow events <run> [--at <seq>]` | The events, or the state after one event | Nothing |
| `flint ite flow begin\|done\|answer\|approve\|refuse\|skip\|retry\|pause\|resume\|cancel <run> [--node <id>] [--follow \| --to-end] ...` | `retry` of a run that ended (failed or cancelled) starts a new run from its failed node (or `--from <node>`), with its inputs (`--input` changes one); it reuses the outputs of the done nodes before it, runs the version of now, and keeps the channel of the old run (a dev run again is a dev run, and only a person starts it). An agent starts a run again only at a node that the old run reached, so it never passes a decision of a person that has no answer. One action on the run (`--follow`: then follow the run): `done --output k=v`, `answer --outcome <o>`, and `--reason "<text>"` for `approve`, `refuse`, `skip`, `pause`, and `cancel`. `approve` and `refuse` are for a person only. | The events of the run |
