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
| Run and debug | **Processes**: everything that executes (checks, makers, keepers, and workers); **recipes** are shared processes. **Instruction maps**: large processes, with steps and decisions in order; a **run** walks one. An **agent session**: an agent that does the jobs of a person, one at a time, and shows on the map. |
| Tests | **Claims**: what must be true now, each kept by a **check** process (code, an agent, or a person) that reads reality, often through the data that the check `reads`. Each result goes into the **log**. |
| The Problems panel | **Findings**, and the **grounding** of each part |
| Source control | **Proposals**, history, and Git |

Example: Nathan makes the program "Club Launch Night" from the template `event`. An agent reads the notes of Nathan and proposes the first level of the main map: the goal, the milestones, the roles, the venue, the risks. Nathan applies it. Nathan asks "What must be true one week before?", and an agent writes a view with the map `table`. Each condition is a claim with its check process: the council page, a check that a founder confirms. The count of the RSVPs is data: its maker counts the rows of the sign-up sheet (external data, pulled each hour). "Check now" runs a check, and the canvas shows which parts hold. When the claim `hall-booked` fails, the brief says which side changes: "repair by <process>" when a process listens to its failure, else "change the model: <keeper>".

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
| Coverage | How much of the system the parts cover: the files of the codebase for a program with `codebase` on its root note, and the items of the boundary for each program. |
| View | One map for one question of one program: a file of `Steel/Programs/<P>/Views/`. It names its map and its slice. |
| Map | A renderer of `Steel/Maps/`. A builtin shape (`flow`, `streams`, `layers`, `tree`, `table`, `free`, `timeline`, `board`) is a map that Steel draws natively. |
| Node | One card on a canvas: a part, a section of a view, or a node of an instruction map. |
| Claim | A test of reality: a statement of what must be true now. Never a goal, a target with a date, or a prediction. A folder of `Steel/Programs/<P>/Reality/` (or of a folder of the sidebar in it) with only `claim.md` (`steel-claim/2`). Each claim has a file and a check process. It names its subjects with `about` (references), and its check with `kept-by`. |
| Check | The process that keeps a claim (`Processes/check-<claim id>/`): code, an agent, or a person that reads reality for the claim. It never changes anything. |
| Keeper | The process that keeps a note true, named in `kept-by` of the note. A part with no `kept-by` uses the keeper of its parent, up to the root; the root uses `keep-map-true`. A claim and a data item never inherit a keeper. |
| Job | What a process does, computed from the notes that name it in `kept-by`: `check` (a claim), `maker` (a data item), `keeper` (a model note), or `worker` (nothing). |
| On fail | What a claim that fails says: `repair` (the processes with an event trigger on its `claim.failed`: they change the world) and `keeper` (the keeper of the first part of `about`: it proposes a change of the model). |
| Result | What one check gave: `holds`, `fails`, or `error`, with the values that it saw. One record of the log. |
| Mode | Of an instruction and of data: `native` (the truth is here), `external` (the truth is outside), or `blended` (both). A claim has no mode. |
| Grounding | The state of a part from the claims about it: `holds`, `failing`, `old`, `partial`, `unchecked`, `no-claim`. |
| Instruction | Know-how: how to do a piece of work. Inside the model (a native step, a process) or outside (a skill, a workflow, a script of a repository, a person). |
| Folder | A folder of the sidebar: a folder under `Processes/`, `Data/`, or `Reality/` that is not an item. Only for organization: the id and each reference of an item stay the same. See Folders in [[knw-ite-processes]]. |
| Process | Everything that executes: one description, and code, an agent, or a person. It can change the world, so it needs authority. A folder of `Steel/Programs/<P>/Processes/` (or of a folder of the sidebar in it). It has no `kept-by` and no `writes`. |
| Recipe | A shared process of the ITE shard: `Steel/Recipes/<id>/process.md`. A process uses it with `recipe: <id>`. The recipes are the agent actions and `keep-map-true`. |
| Starter | A ready form that `--starter <name>` writes one time into a new process or instruction map (`flint ite process starters`, `flint ite flow starters`). |
| Instruction map | A large instruction: the nodes of a process (steps, decisions, waits, branches, sub-maps) in order, with claims before and after each step. The file `map.md` in the folder of the process. |
| Step | One node of an instruction map that does work: a process of the program, or an inline instruction for a person or an agent. |
| Mirror | A thing of the model that describes a truth outside: a mirrored step, an external map, a process with a `source`, the parts of a program with a codebase. A source with a `hash` gets a normal claim with the recipe `source-unchanged` (see The Claim of a Source in [[knw-ite-software]]). |
| Codebase | The field `codebase` of the root note: the code of the program. It decides the file coverage, the `code-refs`, and the code checks, for each template. Its parts and view nodes name the code (`code-refs`) and the stories of Orbtest (`stories`, `criteria`). See Programs with a Codebase in [[knw-ite-software]]. |
| Code-ref | One entry of `code-refs`: a folder, a file, a symbol, a line range, or a path of another codebase |
| Proof | The normal claim `orbtest-proof`: its check (the recipe `orbtest-proof`) reads the data `orbtest-results` (the recipe `orbtest-results`) and gives one verdict for each part. |
| Review | A row of the data item `reviews`: a person or an agent compared the node with its code at one commit. `flint ite review` writes it. The normal claim `reviews-current` (the recipe `review-current`) fails when the code, the stories, or the text of the node changed after it. |
| Element | Each thing of the model that a link can name: a part, a claim, a process, a node of an instruction map, the runs of a process, a piece of data, an output of data, a view |
| Reference | The one form of a link to an element, for example `claim:rsvps-30`, `process:ship-flint#ship`, or `data:rsvps#count`. A part is its id. See References in [[knw-ite-programs]]. |
| Data | What the system holds and measures: one value, a table, a series, or any shape. A folder of `Steel/Programs/<P>/Data/` with the data note `data.md` (`steel-data/2`). Its mode is counted from its `source`. Its keeper (`kept-by`) is its maker. |
| Data map | The code of a large piece of data: its store, its outputs, its edits, and its drawing. A builtin (`table`, `list`) or a map of `Steel/Maps/` with `kind: data`. |
| Store | The folder where a data map keeps its files: the data folder, in Git |
| Output | A named value that a piece of data gives to others: `data:<id>#<output>` |
| Pull | One read of a source outside by the maker of external data. It never changes the source. |
| Snapshot | What the newest good pull gave, with its time. A fact of this machine. |
| Maker | The process that keeps a data item (`kept-by` of the data note, often `Processes/make-<id>/`): code pulls or calculates the value, an agent or a person writes it, or a process writes it as part of its work |
| Metric | A piece of data that keeps each value with its time (`history: keep`) |
| Run | One walk of an instruction map, with its record in `Steel/Programs/<P>/Runs/<run id>/`. |
| Trigger | What starts a process: `manual`, a `schedule` (`every`, `cron`), or an `event` (`on: event`, with `kinds` and an optional `about`). Only a process has a trigger. A Git hook, a file watch, and the HTTP hook of a process are sources of events. |
| Enable | The yes of a person to a process (and each of its triggers) on one machine. |
| Log | What the checks saw and what the processes did, on this machine: `.flint/steel/logs/<program id>.jsonl`. |
| Proposal | A change that waits for a person: a map change (also a realize of a future note), a view candidate, or a revision (also a promote of a draft). It is a file of `Steel/Programs/<P>/Proposals/`. |
| Candidate | A complete view file that an agent wrote and that waits for the apply of a person. |
| Finding | One problem that a command computes about a program. |
| Agent session | One Orbh session that Steel starts for one program. It does one or more jobs, one at a time. The Workbench calls it "an agent". |
| Job | One piece of work that a person gives to an agent session: an action or free text, the nodes, and the text of the person. |
| Action | A kind of job with its own instruction, for example `claim-add` or `map-expand`. Each action but `free` is a recipe of `Steel/Recipes/`. Do not call an action a template: a template is the start of a new program. |
| Orientation | The first prompt of each agent session: the program and the ITE shard, with no job. |
| Dock | A person keeps an agent session at the top of the agent panel of its program, to give it the next job. |
| Activity | The writes of an agent session through `flint ite`, one record each: a part, a link, a proposal, a result, or a new claim, process, or instruction map. |
| Agent log | `.flint/steel/agents.jsonl`: the jobs, the dock records, and the activity of the agent sessions. A fact of this machine. |
| Presence | The mark of a live agent session on the nodes of its focus. |
| Focus | The nodes that a person selected to see alone. For an agent: the nodes that it works on now. |
| Kernel | The four words of a system: model, process, data, and event. See [[knw-ite-loop]]. |
| Event | A fact in time: this happened, here, now. One line of the form `steel-event/1` in the event log of this machine, with what it is about: paths, references, and tasks. |
| Route | The way of one event to one target of one program, with its status: `started`, `queued`, `refused`, `not-enabled`, or `no-match`. |
| Standing process | The process `keep-map-true` of a program (`recipe: keep-map-true`: `by: agent`, `agent: program`), with an event trigger. It gives each event to the agent of the program as one job, and it keeps the root note. |
| Agent of the program | The agent session of a program that does the jobs of its processes with `agent: program`, one at a time, from a queue. |
| Plan | What a program must be next: the future notes (the plan of the model) and the draft versions (the plan of a process). |
| Future note | The future state of one thing: a note of the form `steel-future/1` beside the true note, with the name `<name of the thing> . (Future) Next`. It is not a part, and it has no state. |
| Realize | A map change that makes a future note true: in full (the future note goes) or in part (`--part -`: the future note gets shorter). The keeper proposes it; a person applies it. |
| Draft version | The draft of a process or an instruction map in `Processes/<id>/dev/`: the plan of the process. Only a person runs it, by hand, and it writes only a dev state. A new check starts as a draft. |
| Version | The sha256 of the files of a process. Each run records its channel (`production` or `dev`) and its version. |
| Promotion | A revision that replaces the production files of a process with its draft files. Only a person applies it. |
| Pointer part | A part with `points-to`: its card shows the face of one process, data item, or view of the program. |
| Accept | The decision of a person about a view: `lifetime: accepted`. |
| Pulse | What a person reads first about a program: the plan, the machinery of the loop, and at most five sentences of attention. |
| Workbench | The ITE surface in Steel. |

## The Planes

| Plane | Question | Home | Writer |
|---|---|---|---|
| Main map | What is the system? | The root note and the parts, in the Mesh | A person or an agent, only through a map change (one writer of the structure) |
| Views | How does a person want to see the system? | One view file of `Steel/Programs/<P>/Views/` for one question, drawn by a map | A person (direct), or an agent (through a candidate) |
| Claims | What must be true now, and is it? | `Steel/Programs/<P>/Reality/<claim>/claim.md`; its check is a process | A person or an agent |
| Data | What does the system hold and measure? | `Steel/Programs/<P>/Data/<id>/data.md` and its store; the snapshots on this machine | The note: a person or an agent. A native value: a person, the keeper of the data (`kept-by`), or the door. A pull and a calculated value: only the core. |
| Processes | What work can the program do, and in which order? | `Steel/Programs/<P>/Processes/<process>/process.md` (each check, maker, keeper, and worker), its code, its `map.md`, and its draft; `Steel/Recipes/` (the recipes of the shard) | A person or an agent; a person applies each promote |
| Log and runs | What did the checks see, and what did the processes and the runs do? | The log `.flint/steel/logs/<program id>.jsonl` on this machine, and the runs in `Steel/Programs/<P>/Runs/` | Only a command: the one door of the results, a process run, and the run engine |
| Plan | What must the system be next? | The future notes beside the true notes, in the Mesh, and the drafts of the processes | A person. An agent drafts a future note only in a session that a person drives. The keeper proposes a realize; a person applies it. |
| Events | What happened? | The event log and the routes in `.flint/steel/events/` on this machine | Only the one door: `flint ite event emit` and its route |
| Work | Who works on which node now, and what did each agent do? | Agent sessions with a focus, and the agent log `.flint/steel/agents.jsonl` on this machine | Orbh and `flint ite focus`; the agent log: only the agent routes and the `flint ite` commands |

## A Writer Writes Meaning, a Command Computes Facts

A program holds **meaning**: the root note, the parts, their prose, their types, their links, the views, the claims, the processes, and the instruction maps. A program never holds a **fact** that a command computes:

- No result of a check, no state of a claim, no grounding state, no count of checks, and no time of a check.
- No proof of a node and no state of a review in a note. A review is a row of the data item `reviews`, and only `flint ite review` (or a person in Steel) writes it.
- No finding.
- No place of a card in a note. The saved places of the main map are in `State/main.json` (see The Places of the Main Map in [[knw-ite-programs]]). A person (the canvas) or an agent writes a place with `flint ite place` and `flint ite arrange`; the engine writes the place of each new part. A place is not meaning, so a move applies at once, also for an agent. A pointer part is meaning: it is a part in the Mesh, with `points-to`.
- No presence of an agent, and no job, dock record, or activity of an agent session.
- No item of the brief, and no vital sign of the system.
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
├── Reality/<claim>/claim.md                         # one folder for each claim (steel-claim/2): only claim.md
├── Processes/<process>/process.md                   # one folder for each process (steel-process/1), with its code: each check (check-<claim id>), maker (make-<data id>), keeper, and worker
├── Processes/<process>/map.md                       # the instruction map of a large process (steel-flow/1)
├── Processes/<process>/dev/                         # the draft version of a process (its plan)
├── Data/<id>/data.md                                # one folder for each piece of data (steel-data/2), with its native store
├── Processes|Data|Reality/<folder>/.../<id>/       # the same items in nested folders of the sidebar (a person makes them; .keep holds an empty folder)
├── Runs/<run id>/run.md + events.jsonl              # one folder for each run (only the run engine writes here)
├── Proposals/<id>.md                                # map changes (mc-*) and revisions (only the engines write them), view candidates (an agent writes them)
├── History/<view-slug>-<stamp>.md                   # a replaced form of a view (the newest 5 stay)
└── State/main.json, <view id>.json                  # main.json: the saved place { x, y, parent } of each part of the main map, the viewport, and the pins; <view id>.json: the positions of a view. Only the canvas and the flint ite commands write here.

Steel/Recipes/<id>/process.md                        # a recipe: a shared process of the ITE shard (the shard writes it), with its code files (check.js, make.js) when it has code
Steel/Maps/<Map Name>/map.md + index.js              # a map (a renderer)
Steel/Maps/<Map Name>/map.md + index.js + data.js    # a data map (kind: data): its drawing and the code of its store

.flint/steel/logs/<program id>.jsonl                 # the one log of a program (this machine): results, process runs, and pulls
.flint/steel/data/<program id>/<id>/                 # the snapshot, the cache, and the history of a pulled or calculated value (this machine)
.flint/steel/agents.jsonl                            # the agent log (this machine): the jobs, the dock records, and the activity of the agent sessions
.flint/steel/enabled.json                            # the enables of the processes on this machine
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
| `flint ite` | The start: each program in one line with what waits for a person (proposals, runs that wait, claims that fail, future notes), then three next commands. `--json` gives `{ programs, next }`. | Nothing |
| `flint ite list` | The programs with the counts and the grounding | Nothing |
| `flint ite types [--type <id>]` | The types and the connections of this Flint, with their capabilities | Nothing |
| `flint ite templates` | The templates that a new program can start from | Nothing |
| `flint ite create <name> --purpose "<one sentence>" [--template <id>]` | A new program: the root note with the `types` of the template, its folder in `Steel/`, its first process `keep-map-true` (`recipe: keep-map-true`: the agent of the program, on the events `note.added` and `task.finished`, not enabled; it keeps the root note), and a starter kit of its template (one piece of state, one code process, and one code claim; each process with `trigger: manual` and `authority.run: [person:*, agent:*]`). With no `--template`, the template is a guess from the purpose. The output ends with three next commands. | The root note, `Steel/Programs/<Name>/` |
| `flint ite map <program> [--full]` | The tree of the parts with the id of each part, the totals, and three next commands; `--full` adds the prose; `--json` gives each part with its type, its parent, its links, and its grounding | Nothing |
| `flint ite map show\|tree\|check\|coverage\|change\|split\|move\|rename\|merge ...` | The main map (see The Main Map in [[knw-ite-programs]]) | A proposal, or nothing |
| `flint ite part add <program> --kind <type id> --title "<title>" [--parent <part>] [--text "<text>"] [--field k=v]...` | Adds one part: a map change. A person's change applies at once; an agent's change is a proposal. `--field` is for a person only. | One proposal (and the note, when applied) |
| `flint ite part set <program> <node> [--text "<text>"] [--field k=v]... [--base-hash <hash>]` | Changes the text and the fields of a part. It refuses `title`, `kind`, and `parent`: propose a map change. A person's change writes at once; an agent's change is one map change (`edit`) that a person applies. | One note (a person), or one proposal (an agent) |
| `flint ite part remove <program> <node>` | Removes one part: a map change. Its children move to its parent. | One proposal |
| `flint ite places <program> [--in <part>] [--deep]` | The place of each part of one level of the main map (default: the top of the root): the id, the title, the type, the mode (card, group, or layer), x, y, the width, the height, and `saved` or `new`. Each place is relative to the room of the parent. `--deep` adds each level below. | Nothing |
| `flint ite place <program> <part> (--at <x>,<y> \| --near <part> [--side right\|below])` | Sets the place of one part, relative to the room of its parent, on the grid of 8. `--near` needs a part with the same parent. It applies at once, for a person and for an agent. | `State/main.json` |
| `flint ite arrange <program> [--in <part>] [--only <part>,<part>] [--deep] [--all]` | One Arrange of one level (default: the top of the root); `--deep` adds each level below; `--all` arranges each level of the program. It prints how many parts moved. | `State/main.json` |
| `flint ite link <program> <from> <to> --relation <key> [--document <doc>] [--remove]` | Adds or removes a link of a connection. `--relation refers-to` gives a link that the main map always shows. A person's link writes at once; an agent's link is one map change that a person applies (an agent changes a view only through a candidate: `--document <view>` refuses an agent). | One note or the view (a person), or one proposal (an agent) |
| `flint ite view <view>` | One view, joined | Nothing |
| `flint ite view history <view>` | The saved forms of one view, the newest first | Nothing |
| `flint ite view restore <view> --from <history id> [--base-hash <hash>]` | Restores a saved form; the current form goes to the history | The view, one history file |
| `flint ite view remove <view> [--base-hash <hash>]` | Writes the view to the history, then removes it and its candidates. It refuses an accepted view (exit 2). A decision of a person. | One history file; it removes the view |
| `flint ite view accept <view>`, `flint ite view draft <view>` | Accepts a view (`lifetime: accepted`), or sets it back to draft. A decision of a person. | The key `lifetime` of the view |
| `flint ite view --candidate <id>` | The document of a candidate as the view will show it | Nothing |
| `flint ite waiting` | All that waits for a person in all programs (runs, checks, values, claims that fail, and proposals), each with its program, its age, and its action, the most urgent first | Nothing |
| `flint ite proposals [<program>]` | Each change that waits for a person (with no program: in each program): the map changes, the revisions, and the view candidates, the oldest first, each with its show command | Nothing |
| `flint ite check [<program>]` | The findings of the main map, the views, the claims, the processes, the instruction maps, the data, and the references. Exit 1 for an error finding. It runs no check and no process. | Nothing |
| `flint ite check --candidate <id>` | The findings of one candidate only. Exit 1 for an error finding. | Nothing |
| `flint ite check [<program>] --paths <path...> [--checkout <dir>]` | The check after a task: the findings of each part and each view that names one of the paths (see The Check After a Task in [[knw-ite-software]]) | Nothing |
| `flint ite review <program> <ref>... [--commit <sha>] [--show]` | Reviews nodes against their code; `--show` only reads the review of each part or view node that a reference names, not of a whole view (see The Review in [[knw-ite-software]]). It refuses a program with no data item `reviews`. | The row of each node in `reviews`, or nothing |
| `flint ite diff [<view>] --candidate <id>` | The difference of a candidate and its view | Nothing |
| `flint ite diff --candidate <id> --against-candidate <id>` | The difference of two candidates of one view | Nothing |
| `flint ite apply [<view>] --candidate <id>` | Applies a candidate. A conflict writes nothing and exits 1. | The view, one history file, the candidate (`state: applied`) |
| `flint ite discard --candidate <id>` | Discards a candidate; the view stays | The candidate (`state: discarded`) |
| `flint ite claim list\|show\|new\|set\|check\|test\|report ...` | The claims of a program with their folder paths, a new claim and its draft check (`--folder`: the claim and its check go to that folder), a change of the claim note, Check now, the test of a check, and the one door of the results (see Claims and Checks in [[knw-ite-state]]) | The log, the claim and its check, or nothing |
| `flint ite data list\|show\|new\|pull\|test\|set\|edit\|report\|history ...` | The data of a program with their folder paths, a new data item and its maker (`--folder`), Pull now, the test of a maker, a value of a person, an edit of a store, the door, and the history of a metric (see Data in [[knw-ite-state]]) | A snapshot, a value, a store, or nothing |
| `flint ite process list\|show\|new\|set\|run\|test\|dev\|promote\|runs\|starters ...` | The processes of a program with their jobs and their folder paths (`--folder <path>`: the processes in that folder and below), a new process (`--recipe`, `--starter`, `--folder`), a change, Run now (`--dev`: a dev run), the test, the draft version, the promotion, and the process runs (see Processes in [[knw-ite-processes]]) | The log, a process file, a draft, a revision, or nothing |
| `flint ite process done\|fail\|approve\|refuse\|cancel <program> <run> ...` | A person ends a waiting task, approves or refuses a run, or cancels it | The log |
| `flint ite event emit\|list\|show ...`, `event hook install\|status\|uninstall\|show` | The one door of the events, and the events with their routes (see [[knw-ite-loop]]) | The event log and the routes, or nothing |
| `flint ite plan [show\|add\|realize] <program> ...` | The plan of a program: its future notes and its drafts. `realize` proposes one map change (full), or a partial realize with `--part -` (see [[knw-ite-loop]]) | A future note, one proposal, or nothing |
| `flint ite pulse [<program>]` | The pulse of a program: the plan, the machinery, and the attention sentences. With no program: one line for each program with its first attention sentence (`--json`: `steel-pulse-list/1`) | Nothing |
| `flint ite triggers\|enable\|disable ...` | The triggers and the enables of the processes on this machine (see Triggers and Events in [[knw-ite-processes]]) | `.flint/steel/enabled.json`, or nothing |
| `flint ite trigger fire <program> <trigger id> [--event <file\|->]` | Fires one trigger of an enabled process now on this machine | The log, a run |
| `flint ite flow ...` | The instruction maps and their runs (see Instruction Maps and Runs in [[knw-ite-processes]]) | A run, or nothing |
| `flint ite move <program> <ref> --to "<path>"` | Moves one item (`process:<id>`, `data:<id>`, or `claim:<id>`) with all its files to a folder of the sidebar (`--to ""` is the top). No proposal: a person moves items, and an agent only when a person asks for it. It refuses while a run of the process (or of the keeper of the data item or the claim) is active. | The folders of `Steel/Programs/<P>/` |
| `flint ite folder list\|new\|rename\|move\|remove <program> ...` | The folders of the sidebar: `list [--kind processes\|data\|claims]`, `new <kind> "<path>"`, `rename <kind> "<path>" "<new name>"`, `move <kind> "<path>" --to "<path>"`, `remove <kind> "<path>"` (only an empty folder). An agent changes a folder only when a person asks for it. | The folders, or nothing |
| `flint ite system\|log\|brief\|vitals\|prompt\|revision ...` | The system of each program (see Living Systems in [[knw-ite-loop]]) | The log, a revision, or nothing |
| `flint ite rename <program> <name> [--base-hash <hash>]` | Renames a program and its files, and updates each wikilink in the Mesh. A decision of a person. | The program, the wikilinks |
| `flint ite archive <program> [--base-hash <hash>]` | Moves a program to `Mesh/Archive/Programs`. Deletes no file. A decision of a person. | The program folder |
| `flint ite focus <node id>... [--program <name>]`, `flint ite focus --clear` | Sets the interface key `ite-focus` of this Orbh session; `--clear` writes an empty focus | The session interface |
| `flint ite actions` | The actions (the recipes of `Steel/Recipes/` with an `action` block, and `free`): the id, the title, the object, the workflow, and what each one needs | Nothing |
| `flint ite agent start <program> [--target <t>] [--account <a>] [--interactive] [--document <doc>] [--action <id>] [--node <id>...] [--text "<text>"]` | Starts an agent session. With no `--action` and no `--text`, it gets only the orientation. With them, it gets the orientation and its first job. | An Orbh session; a job record in the agent log when it has a job |
| `flint ite agent list <program> [--since <time>]` | The agent sessions of a program: the docked ones, then the live ones, then the newest; each with its jobs | Nothing |
| `flint ite agent show <session>` | One agent session with its jobs and the result of each job | Nothing |
| `flint ite agent activity <session>` | The activity of one agent session, with the job of each record | Nothing |
| `flint ite agent queue <program> [--pump]` | The queue of the agent of a program: the jobs of the processes with `agent: program`. `--pump` ends each finished job and gives the next job (it starts the agent when none runs). | The queue, or nothing |
| `flint ite agent dock <session>`, `agent undock <session>` | Docks or undocks an agent session. A person only. | One dock record in the agent log |
| `flint ite job <program> --action <id> [--session <id>] [--node <id>...] [--document <doc>] [--text "<text>"]` | Gives a job. With no `--session`, it starts a new agent session with the job. With `--session`, it gives the job to that agent session; a session that works refuses with `agent-busy`. `--wait [minutes]` (also on `agent start`) prints each phase of the agent and ends with the result, the proposal, or why it failed: exit 0 done, 1 failed, 2 still works at the limit (default 30 minutes), 3 waits for a person. | A resume of the session or a new session; one job record in the agent log |

The exit codes: 0 done; 1 a finding of the level error, or a conflict; 2 a refusal, and nothing was written. Each write runs inside the lock of the Flint. The Workbench uses the same code through the routes `/api/ite/*` and `/api/steel/*` of the Flint server.
