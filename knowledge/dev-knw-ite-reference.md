---
description: "The reference of the ITE: each term with its meaning, the planes and their writers, meaning versus facts, the folders of a program, and every flint ite command with what it writes and the exit codes"
---

# Knowledge: The Reference of the ITE

Read this file when you need the exact meaning of a term, the folder of a file, or a command that the init does not name. The rules of [[init-ite]] apply with no change.

## The ITE as an IDE for Systems

An IDE gives a person one loop for software: write, navigate, run, test, and keep versions. The ITE gives the same loop for a model of a system:

| An IDE for software | The ITE |
|---|---|
| A project | A **program**: the model of one system. A root note in the Mesh, and the tree of parts below it. |
| A language and its libraries | **Types** and **connections**: Mesh notes that say what each part is and how parts link. A **template** gives the start of a new program. |
| Source files | **Parts**: one Mesh note for each part of the system, of any type |
| Variables and databases | **Data**: what the system holds and measures: one value, a table, a series, or any shape. Its mode is external (pulled from a source outside), native (made in the model), or blended (both). A large piece of data has a **data map**: its store, its outputs, its edits, and its drawing. |
| Editor tabs | **Views** on a canvas: one map for one question |
| Run and debug | **Processes**: the small instructions that the program can run. **Instruction maps**: large processes, with steps and decisions in order; a **run** walks one. An **agent session**: an agent that does the jobs of a person, one at a time, and shows on the map. |
| Tests | **Claims**: what must be true, each with a **check** (code, an agent, or a person) that reads reality, often through the data that the claim `reads`. Each result goes into the **log**. |
| The Problems panel | **Findings**, and the **grounding** of each part |
| Source control | **Proposals**, history, and Git |

Example: Nathan makes the program "Club Launch Night" from the template `event`. An agent reads the notes of Nathan and proposes the first level of the main map: the goal, the milestones, the roles, the venue, the risks. Nathan applies it. Nathan asks "What must be true one week before?", and an agent writes a view with the map `table`. Each condition is a claim with a check: the council page, the count of the RSVPs, a check that a founder confirms. The count of the RSVPs is data: code counts the rows of the sign-up sheet (external data, pulled each hour), and the claim `rsvps-30` reads the count and the target (native data). "Check now" runs a check, and the canvas shows which parts hold. When the claim `rsvps-30` fails, the brief offers its fix: "23 of 30 RSVPs. Run `send-reminders`?"

The surface is the **Workbench** of Steel (the page `/ite`). This shard gives the agent side: the model, the file forms, the quality rules, the agent sessions, and the workflows of the actions.

## The Terms

One term has one meaning. Use these terms in each file, each view, and each result.

| Term | Meaning |
|---|---|
| Program | The model of one system: a root note in the Mesh (format `steel-program/1`), and the tree of parts below it. |
| Part | One note of the main map: what the system is made of. Any Mesh type. A note is a part when its `parent` chain reaches the root note. |
| Type | The type of a note: the last `(Type)` word of its file name. A type note in `Mesh/Metadata/Types/` with a `type` block gives its fields, capabilities, connections, and look. The wire field `kind` is the type id. |
| Capability | One thing that the core does with a part of a type: `covers-files`, `covers-boundary`, `dated`, `has-status`, `owner`, `container`. |
| Connection | A typed link between two parts: a frontmatter key, defined by a connection note. `parent` is not a connection: it is the containment. |
| Template | The start of a new program: its types, connections, views, and questions, and the instruction for the agent. |
| Main map | The tree of the parts by `parent`: what the system is. Each program has one main map. Steps of an instruction map are not parts. See The Main Map in [[knw-ite-programs]]. |
| Level | The children of one part (or of the root) on the main map. A level holds at most `max-children` parts. |
| Subsystem | A part of the main map with children. A person opens it by zoom. It is not a separate program. |
| Coverage | How much of the system the parts cover: the files of the product for software, the items of the boundary for a living system. |
| View | One map for one question of one program: a file of `Steel/Programs/<P>/Views/`. It names its map and its slice. |
| Map | A renderer of `Steel/Maps/`. A builtin shape (`flow`, `streams`, `layers`, `tree`, `table`, `free`, `timeline`, `board`) is a map that Steel draws natively. |
| Node | One card on a canvas: a part, a section of a view, or a node of an instruction map. |
| Claim | A statement about reality that must be true, with a mode (`is`, `ought`, or `will`) and a check. A folder of `Steel/Programs/<P>/Reality/`. It names its subjects with `about` (references), and the data that its check reads with `reads`. |
| Check | The code, the agent, or the person that reads reality for one claim. It never changes anything. |
| Result | What one check gave: `holds`, `fails`, or `error`, with the values that it saw. One record of the log. |
| Mode | Of a claim: `is` (a description), `ought` (a goal or a limit), or `will` (a prediction). Of an instruction and of data: `native` (the truth is here), `external` (the truth is outside), or `blended` (both). |
| Grounding | The state of a part from the claims about it: `holds`, `failing`, `old`, `partial`, `unchecked`, `no-claim`. |
| Instruction | Know-how: how to do a piece of work. Inside the model (a native step, a process) or outside (a skill, a workflow, a script of a repository, a person). |
| Process | A small instruction that the program owns and can run: one description, and code, an agent, or a person. It can change the world, so it needs authority. A folder of `Steel/Programs/<P>/Processes/`. |
| Instruction map | A large instruction: the nodes of a process (steps, decisions, waits, branches, sub-maps) in order, with claims before and after each step. The file `map.md` in the folder of the process. |
| Step | One node of an instruction map that does work: a process of the program, or an inline instruction for a person or an agent. |
| Mirror | A thing of the model that describes a truth outside: a mirrored step, an external map, a process with a `source`, the parts of a software program. |
| Mirror claim | The claim `claim:mirror:<reference>` that the core gives each `source` with a `hash`, and each review of a node. It holds when the source now has that hash, or when the code of the node did not change after the review. It has no file. |
| Software program | A program of the template `software`: the model of a software product. Its root note names its codebase, and its parts and view nodes name the code (`code-refs`) and the stories of Orbtest (`stories`, `criteria`). See Software Programs in [[knw-ite-software]]. |
| Code-ref | One entry of `code-refs`: a folder, a file, a symbol, a line range, or a path of another codebase |
| Proof | The state of a node from the coverage of Orbtest: `proven`, `partial`, `unproven`, `failing`, `stale`, or `no-contract`. The core computes it at each read. It is not a claim. |
| Review | The anchor `reviewed` of a node: a person or an agent compared the node with its code at one commit. The review is a mirror claim: it fails with `review-due` when the code, the stories, or the text of the node changed after it. |
| Element | Each thing of the model that a link can name: a part, a claim, a process, a node of an instruction map, the runs of a process, a piece of data, an output of data, a view |
| Reference | The one form of a link to an element, for example `claim:rsvps-30`, `process:ship-flint#ship`, or `data:rsvps#count`. A part is its id. See References in [[knw-ite-programs]]. |
| Data | One piece of state of the system: one value, a table, a series, or any shape. A folder of `Steel/Programs/<P>/Data/` with `data.md`. Its mode is counted from its `source`. |
| Data map | The code of a large piece of data: its store, its outputs, its edits, and its drawing. A builtin (`table`, `list`) or a map of `Steel/Maps/` with `kind: data`. |
| Store | The folder where a data map keeps its files: the data folder, in Git |
| Output | A named value that a piece of data gives to others: `data:<id>#<output>` |
| Pull | One read of a source outside by the reader of external data. It never changes the source. |
| Snapshot | What the newest good pull gave, with its time. A fact of this machine. |
| Maker | Who makes a native value: a person, code, an agent, or a process |
| Metric | A piece of data that keeps each value with its time (`history: keep`) |
| Run | One walk of an instruction map, with its record in `Steel/Programs/<P>/Runs/<run id>/`. |
| Trigger | What starts a check or a process: nothing (manual), a schedule, a hook, a watch, or an event. |
| Enable | The yes of a person to a trigger on one machine. |
| Log | What the checks saw and what the processes did, on this machine: `.flint/steel/logs/<program id>.jsonl`. |
| Proposal | A change that waits for a person: a map change, a view candidate, or a revision. It is a file of `Steel/Programs/<P>/Proposals/`. |
| Candidate | A complete view file that an agent wrote and that waits for the apply of a person. |
| Finding | One problem that a command computes about a program. |
| Agent session | One Orbh session that Steel starts for one program. It does one or more jobs, one at a time. The Workbench calls it "an agent". |
| Job | One piece of work that a person gives to an agent session: an action or free text, the nodes, and the text of the person. |
| Action | A kind of job with its own instruction, for example `claim-add` or `map-expand`. Do not call an action a template: a template is the start of a new program. |
| Orientation | The first prompt of each agent session: the program and the ITE shard, with no job. |
| Dock | A person keeps an agent session at the top of the agent panel of its program, to give it the next job. |
| Activity | The writes of an agent session through `flint ite`, one record each: a part, a link, a proposal, a result, or a new claim, process, or instruction map. |
| Agent log | `.flint/steel/agents.jsonl`: the jobs, the dock records, and the activity of the agent sessions. A fact of this machine. |
| Presence | The mark of a live agent session on the nodes of its focus. |
| Focus | The nodes that a person selected to see alone. For an agent: the nodes that it works on now. |
| Kernel | The five words of a system: thing, state, process, event, and plan. See [[knw-ite-loop]]. |
| Event | A fact in time: this happened, here, now. One line of the form `steel-event/1` in the event log of this machine, with what it is about: paths, references, and tasks. |
| Route | The way of one event to one target of one program, with its status: `started`, `queued`, `refused`, `not-enabled`, or `no-match`. |
| Standing process | The process of a program with `by: agent`, `agent: program`, and an event trigger, for example `keep-map-true`. It gives each event to the agent of the program as one job. |
| Agent of the program | The agent session of a program that does the jobs of its processes with `agent: program`, one at a time, from a queue. |
| Plan | What a program must be next: the set of its future notes. |
| Future note | The future state of one thing: a note of the form `steel-future/1` beside the true note, with the name `<name of the thing> . (Future) Next`. It is not a part. |
| Dev version | The draft of a process or an instruction map in `Processes/<id>/dev/`. Only a person runs it, by hand, and it writes only a dev state. |
| Version | The sha256 of the files of a process. Each run records its channel (`production` or `dev`) and its version. |
| Promotion | A revision that replaces the production files of a process with its dev files. Only a person applies it. |
| Pulse | What a person reads first about a program: the plan, the machinery of the loop, and at most five sentences of attention. |
| Workbench | The ITE surface in Steel. |

## The Planes

| Plane | Question | Home | Writer |
|---|---|---|---|
| Main map | What is the system? | The root note and the parts, in the Mesh | A person or an agent, only through a map change (one writer of the structure) |
| Views | How does a person want to see the system? | One view file of `Steel/Programs/<P>/Views/` for one question, drawn by a map | A person (direct), or an agent (through a candidate) |
| Claims | What must be true, and is it? | `Steel/Programs/<P>/Reality/<claim>/claim.md` and the code of its check | A person or an agent |
| Data | What does the system hold and measure? | `Steel/Programs/<P>/Data/<id>/data.md`, its code, and its store; the snapshots on this machine | The files: a person or an agent. A native value: a person, a process with `writes`, or the door. A pull and a calculated value: only the core. |
| Processes | What work can the program do, and in which order? | `Steel/Programs/<P>/Processes/<process>/process.md`, its code, and its `map.md` | A person or an agent |
| Log and runs | What did the checks see, and what did the processes and the runs do? | The log `.flint/steel/logs/<program id>.jsonl` on this machine, and the runs in `Steel/Programs/<P>/Runs/` | Only a command: the one door of the results, a process run, and the run engine |
| Plan | What must the system be next? | The future notes beside the true notes, in the Mesh | A person. An agent drafts a future note only in a session that a person drives; the agent of the program sets `doing` and `done`. |
| Events | What happened? | The event log and the routes in `.flint/steel/events/` on this machine | Only the one door: `flint ite event emit` and its route |
| Work | Who works on which node now, and what did each agent do? | Agent sessions with a focus, and the agent log `.flint/steel/agents.jsonl` on this machine | Orbh and `flint ite focus`; the agent log: only the agent routes and the `flint ite` commands |

## A Writer Writes Meaning, a Command Computes Facts

A program holds **meaning**: the root note, the parts, their prose, their types, their links, the views, the claims, the processes, and the instruction maps. A program never holds a **fact** that a command computes:

- No result of a check, no state of a claim, no grounding state, no count of checks, and no time of a check.
- No proof of a node and no state of a review. Only the review (`flint ite review`) writes the anchor `reviewed`.
- No finding.
- No position of a card. Only the engine writes `State/*.json`.
- No presence of an agent, and no job, dock record, or activity of an agent session.
- No item of the brief, and no vital sign of a living system.
- No snapshot of a pull and no calculated value: the core keeps them on this machine (`.flint/steel/data/`).

**Only a command writes a result.** A check, a person, and an agent each send a result through the one door: `flint ite claim report` (or the route). Never write a result into a file of the Mesh or of `Steel/`. Never edit or remove a line of the log (`.flint/steel/logs/<program id>.jsonl`): it is a record of this machine, as the runs of Orbtest are. Never write a file of `Runs/`: only the run engine writes there. Never write the agent log (`.flint/steel/agents.jsonl`): the `flint ite` commands and the agent routes write it.

**What a person or a process decides is written in Git** (a value of native data, the rows of a native store). **What is pulled or calculated is a fact of this machine.** A calculated value is never stored as truth.

You can tell a person the facts in a conversation or in your result. Do not write them into a program.

## The Folders of a Program

The meaning is in the Mesh. The machinery is in `Steel/`. The facts of this machine are in `.flint/steel/`.

```
Mesh/Programs/
└── (Program) <Name>/
    ├── (Program) <Name>.md                          # the root note
    └── Map/
        └── (Program) <Name> . (<Type>) <Title>.md   # the default home of a new part (display only)

Steel/Programs/<Name>/
├── program.md                                       # id = the id of the root note
├── Views/(View) <Title>.md                          # one file for each view (steel-view/1)
├── Reality/<claim>/claim.md                         # one folder for each claim (steel-claim/1), with the code of its check
├── Processes/<process>/process.md                   # one folder for each process (steel-process/1), with its code
├── Processes/<process>/map.md                       # the instruction map of a large process (steel-flow/1)
├── Data/<id>/data.md                                # one folder for each piece of data (steel-data/1), with its code and its native store
├── Runs/<run id>/run.md + events.jsonl              # one folder for each run (only the run engine writes here)
├── Proposals/<id>.md                                # map changes (mc-*) and revisions (only the engines write them), view candidates (an agent writes them)
├── History/<view-slug>-<stamp>.md                   # a replaced form of a view (the newest 5 are kept)
└── State/main.json, <view id>.json                  # positions and pins by part id (only the engine writes here)

Steel/Maps/<Map Name>/map.md + index.js              # a map (a renderer)
Steel/Maps/<Map Name>/map.md + index.js + data.js    # a data map (kind: data): its drawing and the code of its store

.flint/steel/logs/<program id>.jsonl                 # the one log of a program (this machine): results, process runs, and pulls
.flint/steel/data/<program id>/<id>/                 # the snapshot, the cache, and the history of a pulled or calculated value (this machine)
.flint/steel/agents.jsonl                            # the agent log (this machine): the jobs, the dock records, and the activity of the agent sessions
.flint/steel/enabled.json                            # the enables of the triggers on this machine (claims, processes, and data:<id>)
.flint/steel/state/<program id>/                     # the state of each process, and the files that a process writes
.flint/steel/runs/                                   # the leases and the pending files of the run engine
.flint/steel/cache/                                  # caches
```

A folder is for a person: the identity of a part is its `id`, and its membership is its `parent` chain. A part can live anywhere in the Mesh. A Task or a Person can be a part: its `parent` names a part of the program. Each note has one home: another program links to it with a connection, and does not contain it.

**The root note gives the program, not the folder.** The ITE finds each program by its form: each Mesh note with `format: steel-program/1` is a root note. The name of the program is the file stem with no first `(<Type words>) ` prefix: `(Program) Club Launch Night` gives `Club Launch Night`, and a root note `(Product) Flint` gives `Flint`. A new part goes to `Map/` in the folder of the root note, with the name `<stem of the root note> . (<Type>) <Title>.md`. Two root notes with one name give the finding `format` on both, and neither loads.

## The Commands

`flint ite` is a part of the Flint CLI. Each command takes `--json`. `<program>` is the name or the id of a program. `<node>` is the id of a part or of a view node. `<doc>` is `map` or the id of a view.

| Command | Result | Writes |
|---|---|---|
| `flint ite` | The start: each program in one line with what waits for a person (proposals, runs that wait, claims that fail, plan items next), then three next commands. `--json` gives `{ programs, next }`. | Nothing |
| `flint ite list` | The programs with the counts and the grounding | Nothing |
| `flint ite types [--type <id>]` | The types and the connections of this Flint, with their capabilities | Nothing |
| `flint ite templates` | The templates that a new program can start from | Nothing |
| `flint ite create <name> --purpose "<one sentence>" [--template <id>]` | A new program: the root note with the `types` of the template, its folder in `Steel/`, and its first process `keep-map-true` (by the agent of the program, on the events `note.added` and `task.finished`, not enabled). With no `--template`, the template is a guess from the purpose. The output ends with three next commands. | The root note, `Steel/Programs/<Name>/` |
| `flint ite map <program> [--full]` | The tree of the parts with the id of each part, the totals, and three next commands; `--full` adds the prose; `--json` gives each part with its type, its parent, its links, and its grounding | Nothing |
| `flint ite map show\|tree\|check\|coverage\|change\|split\|move\|rename\|merge ...` | The main map (see The Main Map in [[knw-ite-programs]]) | A proposal, or nothing |
| `flint ite part add <program> --kind <type id> --title "<title>" [--parent <part>] [--text "<text>"] [--field k=v]...` | Adds one part: a map change. A person's change applies at once; an agent's change is a proposal. `--field` is for a person only. | One proposal (and the note, when applied) |
| `flint ite part set <program> <node> [--text "<text>"] [--field k=v]... [--base-hash <hash>]` | Changes the text and the fields of a part. It refuses `title`, `kind`, and `parent`: propose a map change. | One note |
| `flint ite part remove <program> <node>` | Removes one part: a map change. Its children move to its parent. | One proposal |
| `flint ite link <program> <from> <to> --relation <key> [--document <doc>] [--remove]` | Adds or removes a link of a connection | One note or the view |
| `flint ite view <view>` | One view, joined | Nothing |
| `flint ite view history <view>` | The saved forms of one view, the newest first | Nothing |
| `flint ite view restore <view> --from <history id> [--base-hash <hash>]` | Restores a saved form; the current form goes to the history | The view, one history file |
| `flint ite view remove <view> [--base-hash <hash>]` | Keeps the view in the history, then removes it and its candidates. It refuses a `kept` view (exit 2). A decision of a person. | One history file; it removes the view |
| `flint ite view set <view> [--lifetime draft\|kept] [--curation proposed\|accepted]` | Sets the lifetime and the curation of a view. A decision of a person. | The two keys of the view |
| `flint ite view --candidate <id>` | The document of a candidate as the view will show it, with the proof of each node | Nothing |
| `flint ite check [<program>]` | The findings of the main map, the views, the claims, the processes, the instruction maps, the data, and the references. Exit 1 for an error finding. It runs no check and no process. | Nothing |
| `flint ite check --candidate <id>` | The findings of one candidate only. Exit 1 for an error finding. | Nothing |
| `flint ite check [<program>] --paths <path...> [--checkout <dir>]` | The check after a task: the findings of each part and each view that names one of the paths (see The Check After a Task in [[knw-ite-software]]) | Nothing |
| `flint ite proof <program> [<ref>]` | The proof of each part and each view node, or of one node (see The Proof of a Node in [[knw-ite-software]]) | Nothing |
| `flint ite review <program> <ref>... [--commit <sha>] [--show]` | Reviews nodes against their code; `--show` only reads the review of each part or view node that a reference names, not of a whole view (see The Review in [[knw-ite-software]]) | The anchor `reviewed` of each node, or nothing |
| `flint ite diff [<view>] --candidate <id>` | The difference of a candidate and its view | Nothing |
| `flint ite diff --candidate <id> --against-candidate <id>` | The difference of two candidates of one view | Nothing |
| `flint ite apply [<view>] --candidate <id>` | Applies a candidate. A conflict writes nothing and exits 1. | The view, one history file, the candidate (`state: applied`) |
| `flint ite discard --candidate <id>` | Discards a candidate; the view stays | The candidate (`state: discarded`) |
| `flint ite claim list\|show\|new\|check\|test\|report ...` | The claims of a program, a new claim, Check now, the test of a check, and the one door of the results (see Claims and Checks in [[knw-ite-state]]) | The log, or nothing |
| `flint ite data list\|show\|new\|pull\|test\|set\|edit\|report\|history ...` | The data of a program, Pull now, the test of a reader or a maker, a value of a person, an edit of a store, the door, and the history of a metric (see Data in [[knw-ite-state]]) | A snapshot, a value, a store, or nothing |
| `flint ite process list\|show\|new\|run\|test\|dev\|promote\|runs ...` | The processes of a program, a new process, Run now (`--dev`: a dev run), the test, the dev version, the promotion, and the process runs (see Processes in [[knw-ite-processes]]) | The log, a process file, a dev version, a revision, or nothing |
| `flint ite process done\|fail\|approve\|refuse\|cancel <program> <run> ...` | A person ends a waiting task, approves or refuses a run, or cancels it | The log |
| `flint ite event emit\|list\|show ...`, `event hook install\|status\|uninstall\|show` | The one door of the events, and the events with their routes (see [[knw-ite-loop]]) | The event log and the routes, or nothing |
| `flint ite plan [show\|add\|set\|realize] <program> ...` | The plan of a program and its future notes (see [[knw-ite-loop]]) | A future note, one proposal, or nothing |
| `flint ite pulse [<program>]` | The pulse of a program: the plan, the machinery, and the attention sentences. With no program: one line for each program with its first attention sentence (`--json`: `steel-pulse-list/1`) | Nothing |
| `flint ite triggers\|enable\|disable ...` | The triggers and their enables on this machine (see Triggers and Enables in [[knw-ite-processes]]) | `.flint/steel/enabled.json`, or nothing |
| `flint ite trigger fire <program> <id> [--event <file\|->]` | Fires an enabled hook or schedule now on this machine | The log, a run |
| `flint ite flow ...` | The instruction maps and their runs (see Instruction Maps and Runs in [[knw-ite-processes]]) | A run, or nothing |
| `flint ite system\|log\|brief\|vitals\|prompt\|revision ...` | A living system (see Living Systems in [[knw-ite-loop]]) | The log, a revision, or nothing |
| `flint ite rename <program> <name> [--base-hash <hash>]` | Renames a program and its files, and updates each wikilink in the Mesh. A decision of a person. | The program, the wikilinks |
| `flint ite archive <program> [--base-hash <hash>]` | Moves a program to `Mesh/Archive/Programs`. Deletes no file. A decision of a person. | The program folder |
| `flint ite focus <node id>... [--program <name>]`, `flint ite focus --clear` | Sets the interface key `ite-focus` of this Orbh session; `--clear` writes an empty focus | The session interface |
| `flint ite actions` | The actions: the id, the title, the object, the workflow, and what each one needs | Nothing |
| `flint ite agent start <program> [--target <t>] [--account <a>] [--interactive] [--document <doc>] [--action <id>] [--node <id>...] [--text "<text>"]` | Starts an agent session. With no `--action` and no `--text`, it gets only the orientation. With them, it gets the orientation and its first job. | An Orbh session; a job record in the agent log when it has a job |
| `flint ite agent list <program> [--since <time>]` | The agent sessions of a program: the docked ones, then the live ones, then the newest; each with its jobs | Nothing |
| `flint ite agent show <session>` | One agent session with its jobs and the result of each job | Nothing |
| `flint ite agent activity <session>` | The activity of one agent session, with the job of each record | Nothing |
| `flint ite agent queue <program> [--pump]` | The queue of the agent of a program: the jobs of the processes with `agent: program`. `--pump` ends each finished job and gives the next job (it starts the agent when none runs). | The queue, or nothing |
| `flint ite agent dock <session>`, `agent undock <session>` | Docks or undocks an agent session. A person only. | One dock record in the agent log |
| `flint ite job <program> --action <id> [--session <id>] [--node <id>...] [--document <doc>] [--text "<text>"]` | Gives a job. With no `--session`, it starts a new agent session with the job. With `--session`, it gives the job to that agent session; a session that works refuses with `agent-busy`. | A resume of the session or a new session; one job record in the agent log |

The exit codes: 0 done; 1 a finding of the level error, or a conflict; 2 a refusal, and nothing was written. Each write runs inside the lock of the Flint. The Workbench uses the same code through the routes `/api/ite/*` and `/api/steel/*` of the Flint server.
