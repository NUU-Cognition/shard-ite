---
description: "The Integrated Thinking Environment: model any system as a program of typed parts in the Mesh, see it through views and maps of Steel, check it against reality with claims and their checks, run its processes and instruction maps, and for software see the proof and the review of each node"
---

# ITE

The ITE (Integrated Thinking Environment) lets a person model a **system** of any kind as a **program**, see it on a canvas, check it against reality, and run it. Software is a system. An event of a club, a process of a business, a research pipeline, and a team are systems too.

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

Example: Nathan makes the program "Club Launch Night" from the template `event`. An agent reads his notes and proposes the first level of the main map: the goal, the milestones, the roles, the venue, the risks. Nathan applies it. He asks "What must be true one week before?", and an agent writes a view with the map `table`. Each condition is a claim with a check: the council page, the count of the RSVPs, a check that a founder confirms. The count of the RSVPs is data: code counts the rows of the sign-up sheet (external data, pulled each hour), and the claim `rsvps-30` reads the count and the target (native data). "Check now" runs a check, and the canvas shows which parts hold. When the claim `rsvps-30` fails, the brief offers its fix: "23 of 30 RSVPs. Run `send-reminders`?"

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
| Main map | The tree of the parts by `parent`: what the system is. Each program has one main map. Steps of an instruction map are not parts. See The Main Map. |
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
| Software program | A program of the template `software`: the model of a software product. Its root note names its codebase, and its parts and view nodes name the code (`code-refs`) and the stories of Orbtest (`stories`, `criteria`). See Software Programs. |
| Code-ref | One entry of `code-refs`: a folder, a file, a symbol, a line range, or a path of another codebase |
| Proof | The state of a node from the coverage of Orbtest: `proven`, `partial`, `unproven`, `failing`, `stale`, or `no-contract`. The core computes it at each read. It is not a claim. |
| Review | The anchor `reviewed` of a node: a person or an agent compared the node with its code at one commit. The review is a mirror claim: it fails with `review-due` when the code, the stories, or the text of the node changed after it. |
| Element | Each thing of the model that a link can name: a part, a claim, a process, a node of an instruction map, the runs of a process, a piece of data, an output of data, a view |
| Reference | The one form of a link to an element, for example `claim:rsvps-30`, `process:ship-flint#ship`, or `data:rsvps#count`. A part is its id. See References. |
| Data | One piece of state of the system: one value, a table, a series, or any shape. A folder of `Steel/Programs/<P>/Data/` with `data.md`. Its mode is counted from its `source`. |
| Data map | The code of a large piece of data: its store, its outputs, its edits, and its drawing. A builtin (`table`, `list`) or a map of `Steel/Maps/` with `kind: data`. |
| Store | The folder where a data map keeps its files: the data folder, in Git |
| Output | A named value that a piece of data gives to others: `data:<id>#<output>` |
| Pull | One read of a source outside by the reader of external data. It never changes the source. |
| Snapshot | What the newest good pull gave, with its time. A fact of this machine. |
| Maker | Who makes a native value: a person, code, an agent, or a process |
| Metric | A piece of data that keeps each value with its time (`history: keep`) |
| Run | One walk of an instruction map, with its record in `Steel/Programs/<P>/Runs/<run id>/`. |
| Trigger | What starts a check or a process: nothing (manual), a schedule, a hook, or a watch. |
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
├── Proposals/<id>.md                                # map changes (mc-*), view candidates, revisions (only the engines write here)
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

## The Root Note

`Mesh/Programs/(Program) <Name>/(Program) <Name>.md`. Make it with `flint ite create "<Name>" --template <id> --purpose "<text>"`; the form is [[tmp-ite-program-v0.1]].

| Field | Value |
|---|---|
| `format` | `steel-program/1` |
| `id` | A UUID v4. It never changes. It is the id of the program in `Steel/` and in the log. |
| `tags` | `"#ite/program"` |
| `purpose` | One sentence: what the system is, and why a person models it |
| `status` | `active` or `archived` |
| `types` | The type names that the program uses, for example `[Goal, Milestone, Risk]` |
| `from-template` | The id of the template that made the program. History only: nothing decides with it. |
| `main-map` | Optional: `max-children` and `coverage-ignore` (see The Main Map) |
| `codebase`, `product-root` | Software only: the codebase and the folder of the product that holds `orbtest/` (see Software Programs) |
| `template`, `authors`, `orbh-sessions` | The Flint conventions |

A living system adds one fenced `system` block to the body (see Living Systems).

Example (the program Club Launch Night of this Flint):

```yaml
---
format: steel-program/1
id: dc6779bd-6476-4837-a444-aea795713354
tags: ["#ite/program"]
purpose: "An example that shows how the ITE models an event: the launch night of a new makers club in Sydney on Thursday 12 November 2026."
status: active
types: [Goal, Milestone, Deliverable, Person, Role, Venue, Resource, Task, Risk, Budget, Note]
from-template: event
template: "[[tmp-ite-program-v0.1]]"
authors: ["[[@Nathan]]"]
---

# Club Launch Night

The Inner West Makers Club starts with a launch night on Thursday 12 November 2026. The goal is that 80 people come and 30 of them join. Read the view "What Must Be True One Week Before" first.
```

## The Part File

A part is one Mesh note. A new part goes to `Map/` by default, with the name `(Program) <Name> . (<Type>) <Title>.md`. The form is [[tmp-ite-part-v0.1]].

Example: `Map/(Program) Club Launch Night . (Milestone) Venue booked.md`

```yaml
---
id: a9d285ce-53f0-448d-9580-5eff8cef7b1d
tags: ["#ite/part"]
parent: "[[(Program) Club Launch Night . (Goal) A full hall and 30 new members]]"
depends-on: ["[[(Program) Club Launch Night . (Budget) Venue hire]]"]
owner: "[[(Program) Club Launch Night . (Person) Priya Nair]]"
status: done
template: "[[tmp-ite-part-v0.1]]"
authors: ["[[@Nathan]]"]
---

# (Milestone) Venue booked

Priya booked the hall on 24 September 2026. The booking holds the hall from 17:30 to 22:00. The set-up starts at 17:30, and the hall must be empty at 22:00.
```

The rules of the read:

1. **The type.** The last `(Type)` word of the file name. A note with no `(Type)` word has the type `note`. A change of type is a rename (a map change `rename` with `kind`), and each wikilink changes with it. The part has no field `kind`.
2. **The membership and the parent.** `parent`: one wikilink to the parent part, or to the root note for a top part. A note is a part when its `parent` chain reaches the root note. A part has no field `program`, `include`, or `place`.
3. **The id.** The frontmatter `id` (a UUID) is the key everywhere: each view heading, claim, process, step, record, state, and proposal names the part by its id. Never change it.
4. **The links.** Each frontmatter key whose value is one wikilink or a list of wikilinks gives one link for each wikilink, with the key as the connection (`next`, `uses`, `depends-on`, `informs`, `owner`). These keys give no link: `id`, `tags`, `parent`, `template`, `from-template`, `authors`, `orbh-sessions`, `artifacts-created`. A wikilink in the prose gives a link of the connection `mentions`.
5. **No claims in a part.** A part has no field `claims`. A claim is a folder of `Reality/`, and it names its parts with `about` (see Claims and Checks).
6. **The text.** The body below the H1, up to the first heading `## For a developer`. The H1 is for a person; no code reads it.
7. **The title.** The file name after the `(<Type>)` word, with no number at its start: a number there reads as the number of an artifact, as in `(Task) 1099 ...`. Start a title with a word: "A full hall and 30 new members", not "80 guests".

**One writer of the structure.** Each change of the tree (add, move, rename, merge, remove, a change of type) is a map change. A person's hand change applies at once, with Undo. `flint ite part add` and `part remove` make a map change: a person's change applies at once, and an agent's change is a proposal. `flint ite part set` changes only the prose and the fields that are not structure: it refuses `title`, `kind`, and `parent`.

## Types, Connections, and Templates

One type system with the Mesh. `flint ite types` lists the types and the connections; `flint ite templates` lists the templates.

**A type** is a type note `Mesh/Metadata/Types/(Type) <Name> (<Shard> Shard).md` with one fenced `type` block. A shard installs it with `types:` in its `shard.yaml`. A Flint adds its own type with a note in `Mesh/Metadata/Types/`.

````markdown
```type
format: steel-type/1
id: milestone
name: Milestone
fields:
  date: { type: date }
  status: { type: text }
capabilities: [dated, has-status, container]
connections: { depends-on: [], owner: [person, role] }
look: { hue: fire, icon: flag, layer: plan }
```
````

1. The type id is the type name in lower case, with spaces as `-`: `Milestone` → `milestone`.
2. A type note with no `type` block is a type with no capability: a plain card. A `(Type)` word that no note defines is a plain type too. The type `note` always exists.
3. When two shards define one type name, the note with a `type` block counts.
4. `connections` names the connection keys that a part of the type uses, each with the type ids that it can point to (an empty list: any type).
5. `look.layer` is the default layer of the canvas legend.

The capabilities (fixed in the core):

| Capability | What the core does with a part of the type |
|---|---|
| `covers-files` | Counts the coverage of the files from `code-refs` |
| `covers-boundary` | Counts the items of the boundary that it names |
| `dated` | A timeline can place it |
| `has-status` | A board can place it |
| `owner` | Other parts can name it as owner; the brief names it |
| `container` | It can hold other parts on the canvas |

**A connection** is a note `Mesh/Metadata/Types/(Connection) <Name> (<Shard> Shard).md` with one fenced `connection` block:

````markdown
```connection
format: steel-connection/1
id: depends-on
key: depends-on
title: depends on
capabilities: [rolls-up]
style: dependency
```
````

The connection capability: `rolls-up` (the main map shows the link at each level as a relation with a count). `next` is a plain connection: an order of the parts that the shape `flow` draws. No run follows a connection: a run follows the `map.md` of a process. A connection with no capability is a plain reference. `mentions` (a prose link) is a builtin connection. `parent` is not a connection.

**A template** is the start of a new program: `Mesh/Metadata/Templates/(Template) <Name>.md` (this Flint), or `Shards/<Shard>/templates/tmp-<sh>-program_<id>-v<X.Y>.md` (a shard). A template is an instruction for the agent that models a system of that kind, with one fenced `template` block that Steel reads for the New program dialog. The form is [[tmp-ite-template-v0.1]].

````markdown
```template
format: steel-template/1
id: event
title: Event
types: [goal, milestone, deliverable, person, role, venue, resource, task, risk, budget, note]
connections: [next, uses, depends-on, owner, informs, mentions, blocks]
views: [{ map: timeline, question: "What must be done before the doors open, and by when?" }]
questions: ["Who does what on the night?"]
```
````

`flint ite create` copies the types of the template into the root note (`types`) and writes `from-template`. After that, nothing reads the template. The ITE shard gives six templates: `software`, `process`, `event`, `research`, `organisation`, and `general` ([[tmp-ite-program_event-v1.0]] and the others). Follow the instruction of the template when you model a new program. Add a type, a connection, or a template only when none fits, and when the person agrees.

## The View File

A view is one Markdown file of Steel/, not of the Mesh: `Steel/Programs/<Name>/Views/(View) <Title>.md`, in the format `steel-view/1`. The form, the eight builtin shapes, and one complete example are in [[tmp-ite-view-v0.1]].

| Field | Value |
|---|---|
| `format` | `steel-view/1` |
| `id` | The UUID of the view. A candidate has its own new `id`, and `view_id` names its view. |
| `tags` | `"#ite/view"` |
| `question` | The question of the person, as one sentence |
| `map` | The map that draws the view: a builtin shape (`flow`, `streams`, `layers`, `tree`, `table`, `free`, `timeline`, `board`), which Steel draws natively, or the id of a map of `Steel/Maps/`, which Steel runs in a sandbox |
| `slice` | Optional: `{ below: <part id>, types: [<type id>...] }`. Each part of the slice is a node of the view, also with no heading. |
| `lifetime` | `draft` or `kept`. Only a person writes `kept`. |
| `curation` | `proposed` or `accepted`. An agent always writes `proposed`. |
| `derived-from` | `""`, or the wikilink of the view that this view came from |
| `view_id`, `base_hash`, `state` | A candidate only (see The Candidate and the Apply) |

The folder gives the program: a view has no `program` field.

The body:

1. One H1: the name of the view. The prose after it answers the question in one to three sentences.
2. Each H2 to H6 heading ends with a stable id. A node that stands for a part has the part id as its heading id: `## Doors open {#66d9ddb1-384a-46d7-ae27-1d4061868b88}`. A node with no part has a slug id: `## Set up the hall {#set-up}`, and the check says so (`anchor-missing`).
3. Depth is containment. A section with one fenced block `node` is a node. A section with no block is a group, or the node of its part.
4. The node block: `kind` (a type id); `layer`; the relations `next`, `uses`, `blocks`, `informs`, `depends-on` (lists of heading ids of the same view: part ids or slugs); `inside`, `actor`, `action`, `result`; `date` (map `timeline`); `status` (map `board`). A node with a slug id can also have `part` (the id of the part where a step runs: see The Anchor of a Step), `code-refs`, `stories`, and `criteria` (see Software Programs), and `reviewed` (only the review writes it: see The Review).
5. A node of a part names no part and holds no code: its heading id names the part, and the part holds its code and its stories. `part`, `code-refs`, `stories`, or `criteria` in the block of a node of a part is the error `format`: "The part holds its code and its stories."

The nodes of a view are its headings, and each part of its `slice` that has no heading (with the title and the prose of the part). A node of a part shows the type, the note, the fields, and the grounding of the part: the grounding comes from the claims about the part. The prose of the view stays under the part id, so it survives each refactor of the main map.

### Lifetime and Curation

| Field | Values | Rule |
|---|---|---|
| `lifetime` | `draft`, `kept` | A new view is `draft`. A reshape keeps the value of the view. `kept` means that the person wants to keep the view true: the check gives `never-reviewed` for each node of a kept view that has code or stories and no review. |
| `curation` | `proposed`, `accepted` | An agent always writes `proposed`. `accepted` means that the person read the view and agrees with it. The acceptance blocks nothing. An apply keeps the curation of the view. |

- **Only a person decides `kept` and `accepted`**: `flint ite view set "<view>" --lifetime kept --curation accepted`, or Keep and Accept in the Workbench. Only these two keys of the file change. An agent runs `flint ite view set` only when the person asks for it in the session.
- **Only a person removes a view.** `flint ite view remove <view>` writes the view to `History/` first, so that `flint ite view restore` can bring it back. It refuses a `kept` view with `refused-state` (exit 2): "Set the view to draft first." An agent never removes a view, and nobody removes a view with `rm` or `flint helper delete`.
- `History/` keeps the newest 5 replaced forms of each view. An apply, a restore, and a remove write one. A direct edit of a person (with Undo) writes none.

## Maps

A map is a renderer: `Steel/Maps/<Map Name>/` with a manifest `map.md` (`format: steel-map/1`, `id`, `title`, `entry: index.js`, `needs: { capabilities, connections, fields }`, and prose for a person) and one plain JavaScript ES module (no build). The module exports `render(root, api)`. The form and one complete example are in [[tmp-ite-map-v0.1]].

1. **A map only draws.** It reads one read model through `api.model` (the program, the types and connections that it uses, the parts with their fields and grounding, the claims with their states and newest results, the processes, the instruction maps with their active runs, the links, the view, and the saved state), and it draws again on `api.onModel(fn)`. The core computes each fact.
2. **A map sends intents.** `api.select(ids)`, `api.open(partId)`, `api.propose(ops, reason)` (a map change: a person's hand change applies at once, with Undo), and `api.saveState(state)`. It never writes a file.
3. **A map runs in a sandbox.** Steel runs it in an iframe with `sandbox="allow-scripts"`. It cannot read a file, call a route, or reach the network.
4. **A view names its map.** `map: <map id>` in a view. Steel draws a builtin shape natively, and each other map in the sandbox.
5. **A map says what it needs.** Steel offers a map for a program when the types of the program meet its `needs`.
6. **A data map** (`kind: data`) draws one piece of data, not a view, and it has the code of a store (`store: data.js`). See Data Maps.

This Flint has three example maps: **Outline** (`outline`: the tree of the parts with their types and grounding), **Owners** (`owners`: the parts grouped by the connection `owner`), and **Status Board** (`status-board`: columns by the field `status`). It has one data map: **Seating** (`seating`: the guests of an event at their tables).

| Route | What it gives |
|---|---|
| `GET /api/steel/maps[?program=<p>]` | The maps, each with its `needs`; with a program, whether the program meets them |
| `GET /api/steel/maps/:id/module` | The JavaScript text of one map |
| `GET /api/steel/programs/:program/model[?view=<id>]` | The read model of a program, and of one view |
| `PUT /api/steel/programs/:program/model/state` | The saved state of a map in one view: `State/<view id>.map.json` |
| `GET /api/steel/programs/:program/candidates` | The view candidates of a program in `Proposals/`, in each state |

## References

Each link of the model names one **element** with one form, the **reference**. So a claim can be about a part, a process, a node of an instruction map, or a piece of data, and a process can act on each of them.

| Element | Reference |
|---|---|
| A part | `<part id>` (no prefix) |
| A claim | `claim:<id>` |
| A mirror claim | `claim:mirror:<reference of the mirrored process or node>`, for example `claim:mirror:process:ship-flint#ship`. The review of a node: `claim:mirror:<part id>` or `claim:mirror:view:<view id>#<node id>` |
| A process | `process:<id>` |
| A node of an instruction map | `process:<id>#<node>` |
| The runs of a process (data that the core makes) | `process:<id>#runs` |
| A piece of data | `data:<id>` |
| An output of a piece of data | `data:<id>#<output>`, for example `data:rsvps#count` or `data:budget#total:planned` |
| A view | `view:<id>` |
| A node of a view | `view:<view id>#<node id>` |

1. **The fields that take references:** `about` (claims, processes, steps, data), `reads` (claims, processes, steps), `writes` (processes and steps; data only), and `from` (data; data only). `fixed-by` names processes (`send-reminders` or `process:send-reminders`). `effect` and `precondition` name claim ids.
2. **Quote a reference in YAML** when it has a `:` or a `#`: `reads: ["data:rsvps#count", "data:rsvp-target"]`.
3. **A node id `runs` is not allowed**: `process:<id>#runs` is the data of the runs.
4. **The findings** of `flint ite check`: `unknown-reference` (error: a reference names no element of the program), `data-cycle` (error: the `from` of data make a cycle), `writes-external` (error: a process or a step writes external data).

## Data

**Data** says what the system holds and measures: one value, a table, a series, or any other shape. The parts say what the system is; a value that changes over time, comes from outside, is calculated, or has rows is data, not a field of a part. A piece of data is a folder `Steel/Programs/<P>/Data/<id>/` with `data.md` (`format: steel-data/1`). The folder is also the store of its native values. The form is [[tmp-ite-data-v0.1]].

```yaml
---
format: steel-data/1
id: signups                  # a slug, unique in the program; the name of the folder
about: [04264f99-ff43-4d03-a867-e3634a085813]   # optional: references
map: table                   # optional: table | list | <id of a data map of Steel/Maps>; absent: a value
source: { path: "Media/Club Launch Night/signups-export.csv" }   # external: one of command, path, url, ref
by: code                     # the reader (with source) or the maker (no source): code | agent | person
runtime: node                # code: node | python | exec
entry: pull.js               # code
timeout: 30s
trigger: { every: 1h }       # optional: when the pull or the maker runs again
fresh-for: 2h                # optional: a value older than this is old
shape:                       # a table: the fields of the rows, each with its kind
  - { name: email, kind: text, key: true }
  - { name: signed_up, kind: date }
---
# The sign-ups
Prose for a person: what this data is, and where it comes from.
```

The other fields: `prompt` and `target` (an agent), `question` and `who` (a person), `from` (the inputs of a made value: data references), `value` (a value that a person writes), `outputs` (what others read, each with its kind; the default is one output `value`), `history: keep` (a metric), `list-of` (the type of the builtin `list`), and `native: true` on a field of `shape` (a column that a person or a process writes in external data). The kinds of a value are `text`, `number`, `boolean`, `choice`, `json`, `date`, and `money` (`{ "amount": 450, "currency": "AUD" }`, or the short form `450 AUD`).

**The mode** is counted, never written. It answers one question: where is the truth of the value?

| Mode | When | Example in this Flint |
|---|---|---|
| External | The data has a `source`, and its reader pulls each value | `signups` (Club Launch Night), `origin-refs` and `npm-versions` (Flint Release) |
| Native | The data has no `source`: a person writes it, code calculates it, an agent writes it, or a process writes it. A value calculated from external inputs is native: its rule is in the model. | `rsvp-target`, `rsvps`, `reminder-answers`, `seating` (Club Launch Night) |
| Blended | The data has a `source` and a field with `native: true` (or a custom data map that says so) | `budget` (Club Launch Night): `planned` is native, `paid` is pulled |

**How a value is made and kept:**

| What | Who | When | Where |
|---|---|---|---|
| A pull (external, blended) | The reader: code, an agent, or a person | By its trigger, by Pull now, before a check that reads old data (when the trigger is enabled), and before a check of a run or an effect check (when the trigger is enabled) | The snapshot, on this machine |
| A calculated value (`by: code`, no `source`) | The core runs the maker | When a reader needs it and an input is newer than the cache | Only a cache, on this machine |
| A value that a person writes (`value`) | A person | `flint ite data set`, or Steel (with Undo) | `data.md`, in Git |
| A value by an agent or a person (`by: agent`, `by: person`, no `source`) | The agent or the person, through the door | `flint ite data report`, or Steel ("Waiting for you") | `data.md` or the native store, in Git |
| Rows that a process writes | A process that names the data in `writes` | At the end of a run that is `done` | The native store, in Git |
| The history of a metric | The core | At each new value | With the value: in Git (`history.jsonl` of the data folder) for a written value, on this machine for a pulled or calculated value |

1. **The code of a reader or a maker.** The core runs `entry` in the data folder with `FLINT_ROOT`, `STEEL_PROGRAM_ID`, `STEEL_DATA_ID`, `STEEL_SOURCE` (JSON: the `source`), `STEEL_DATA` (JSON: the values of `from`), and the env files, at most `timeout`. Each output line that is one JSON object is one record: `{ "row": {...} }` (one row), `{ "output": { "<name>": <value> } }`, or `{ "log": "<text>" }`. Exit 0 with no line that is not valid is a good pull: the core writes the snapshot, a `pull` record in the log, and a history line for a metric. A row that lacks a pulled field of `shape` gives `error` with "The source changed its shape", and the old snapshot stays.
2. **A pull never changes the source.** A reader only reads, as a check does. Only the process `fetch-flint` of Flint Release fetches, for example: the reader of `origin-refs` reads only the local refs.
   **What the core enforces** (the permission model of Node):
   - A reader or a maker with `runtime: node` runs with `node --permission`: it may read each file, use the network, and start child processes, and it may write only a temporary folder of the run (`TMPDIR`), which the core removes after the run. A write of any other file (its source, the Flint, `.flint/`) fails with `ERR_ACCESS_DENIED`, and the pull fails.
   - The store code of a custom data map (`data.js`) may read only the Flint and write only its store. It has no child process, no worker, and no network.
   - **What stays a rule of the model:** a child process of a reader (for example `git`) is not limited, and a reader or a maker with `runtime: python` or `exec` runs with no limit. So a reader that starts a command runs only commands that read (`git for-each-ref`, `git reflog`, `uptime`), never `git fetch`, a write, a send, or a push.
3. **The state of a value**: `fresh`, `old` (older than `fresh-for`), `none` (never pulled or made), `pending` (a person must write it), or `error` (the last pull or maker failed; the old value stays). A claim that reads a value with the state `old` is old; a claim that reads a value with the state `none` waits for data ("Waits for data: <name> has no value yet"), and it is not old.
4. **A process writes data** only when it names it in `writes`, and only native data. Its code prints `{ "data": { "id": "<data id>", "value": <value> } }` or `{ "data": { "id": "<data id>", "rows": [...], "how": "append" | "replace" } }`. The core writes the store at the end of a run that is `done`, never after `failed`.
5. **An agent writes data only as a process with `writes`, or as the reader or the maker of the data** (through the door). An agent never writes `data.md` or a store with its own tools, and never decides a value for a person.
6. **A test writes nothing.** `flint ite data test` runs the reader or the maker once and prints each record and its problems. Test each reader and each maker before you keep it.
7. **The runs are data too.** `process:<id>#runs` gives the outputs `count`, `succeeded`, `failed`, `cancelled`, `success_rate` (0 to 1, or null), `last_at`, and `nodes` (for each node: `visits`, `done`, `failed`, `mean_s`), from the runs of the process in the last 30 days. A claim about how well an instruction works reads it.

### Data Maps

A large piece of data names a **data map** in `map`. The core has two builtins:

- **`table`**: rows with a `shape`. The native store is `rows.csv` in the data folder. A blended table joins the pulled rows and the native rows by the field with `key: true`; a pulled cell is read-only in Steel, and a native cell can be edited. The outputs are `rows`, `count`, and `total:<field>` for each `number` or `money` field.
- **`list`**: the parts of the program of one type (`list-of: <Type>`) with their fields. It has no source, and it is read-only. The outputs are `rows`, `count`, and `total:<field>`.

A metric needs no data map: Steel draws its history as a series. Any other shape is a **custom data map**: a map of `Steel/Maps/` with `kind: data`, `entry: index.js` (the drawing in Steel, in the sandbox of the maps), and `store: data.js` (the code of the store, that the core runs in Node). The form is in [[tmp-ite-map-v0.1]].

The protocol of `store`: the core runs `node data.js <op>` in the data folder, with one JSON object on stdin, at most 30 seconds. Stdout is one JSON object.

| `op` | stdin | stdout |
|---|---|---|
| `outputs` | `{ store, snapshot, data, inputs }` | `{ "outputs": {...}, "rows"?: [...], "native"?: true }` |
| `edit` | `{ store, snapshot, data, inputs, intent }` | `{ "files": [{ "path": "<relative to the store>", "content": "<text>" }] }` |
| `merge` | `{ store, snapshot, data, inputs }` | `{ "rows": [...] }` |

`store` is the path of the store, `snapshot` is the newest snapshot (or null), `data` is the frontmatter of `data.md`, and `inputs` is the `STEEL_DATA` object of `from`. **Only the core writes a store**: it writes each file of `edit` inside the store, with the lock and the hash of the store; a path that leaves the store is refused. The drawing gets the data document in `api.model`, and sends an edit with `api.intent({ edit: <intent> })`.

### The Commands of Data

| Command | Result | Writes |
|---|---|---|
| `flint ite data list "<program>"` | The data of a program, with the mode, the state, and the age of each value | Nothing |
| `flint ite data show "<program>" <id>` | One piece of data: its form, its problems, its value now, its rows, and its newest history | Nothing |
| `flint ite data pull "<program>" <id>` | Pull now: runs the reader (or the maker) and keeps the value | The snapshot or the cache, the log |
| `flint ite data test "<program>" <id>` | Runs the reader or the maker once, and prints each record and its problems | Nothing |
| `flint ite data set "<program>" <id> --value <json> [--expect <hash>]` | A person writes the value of native data | `data.md` |
| `flint ite data edit "<program>" <id> --intent <json> [--expect <hash>]` | A person edits the native store of a table or a custom data map with one intent | The store |
| `flint ite data report "<program>" <id> --value <json> \| --output <name=value>... \| --rows <file> [--how append\|replace]` | The door of an agent or a person reader or maker | `data.md`, the store, or the snapshot |
| `flint ite data history "<program>" <id> [--limit <n>]` | The history of a metric, the newest first | Nothing |

## Claims and Checks

A **claim** says what must be true about the system, and its **check** reads reality to see if it is true. A claim is a folder of Steel/, not a field of a part: `Steel/Programs/<P>/Reality/<claim>/claim.md` (`format: steel-claim/1`), with the code of its check in the same folder. The form is [[tmp-ite-claim-v0.1]].

```yaml
---
format: steel-claim/1
id: rsvps-30                 # a slug, unique in the program
mode: ought                  # is | ought | will
about: [8ab2da5b-f95c-43d5-a388-786d06fbda1a, 0910b761-fc23-42a2-ac88-9d0cfebb54cf]   # references
reads: ["data:rsvps#count", "data:rsvp-target"]   # optional: the data that the check reads
owner: "[[@Nathan]]"         # optional; default: the owner of the first part, else the first owner of the system
by: code                     # code | agent | person | none
runtime: node                # code: node | python | exec
entry: check.js              # code
timeout: 30s                 # code; default 60s
trigger: { every: 1d }       # optional (see Triggers and Enables); none: Check now only
fresh-for: 2d                # optional: a newer result is needed after this
fixed-by: [send-reminders]   # optional: the processes that can make an ought claim true
---
# At least 30 people RSVP by 5 November
Prose for a person: why it matters, and what the check reads.
```

1. **A claim names its subjects** with `about`: one or more references (see References). A subject is a part, a process, a node of an instruction map, or a piece of data. A part has no list of claims. One claim can be about many elements, and one element can have many claims.
2. **A check never changes anything.** It only reads: a write, a send, a push, or a fetch is not a read (a process fetches). So anyone can run it again at any time with no harm.
3. **The check judges.** It gives `holds`, `fails`, or `error`. The values that it saw go with the result, as evidence. A claim never holds only a value.
4. **A claim reads data.** `reads` names the data that the check reads, and the core gives the values to the check as `STEEL_DATA`. Two claims that read one source read one piece of data: the source is pulled one time. The check still judges with its own code.
5. **Four forms.** `by: code` runs its own code (`runtime`, `entry`). `by: agent` starts one Orbh session with `prompt` (and `target`, optional), and the agent reports through the door. `by: person` gives `pending`, and Steel asks the person the `question` (`who`, optional: `person:<Name>`). `by: none`: the claim has no check yet; it is `unchecked`, and the brief lists it in `unwatched`.
6. **A `will` claim** has `p` (0 to 1) and `resolves` (a date; quote it, so that YAML keeps it as text).
7. **A mirror is a claim too.** Each `source` with a `hash` (of a step, of an instruction map, or of a process) is the mirror claim `claim:mirror:<reference>` (`mode: is`, `by: core`). The core computes its state at each read: `holds` when the hash of the source now is the `hash`, else `fails` with both hashes. Its `fixed-by` is the `redraw` of the source (a process that draws the mirror again, for example `redraw-mirror`), else the action `map-update`. It is listed with the claims, it has no file, and its results are not logged. "The code of each part exists" (`code-refs` of a software program) is an `is` claim whose check reads the codebase. Each review of a node is a mirror claim too (see The Review).

**The code of a check.** The core runs `entry` in the claim folder (`node`, `python3`, or the file) with `FLINT_ROOT`, `STEEL_PROGRAM_ID`, `STEEL_CLAIM_ID`, `STEEL_PARTS` (JSON: the part ids of `about`), `STEEL_ABOUT` (JSON: each reference of `about`), `STEEL_DATA` (JSON: `{ "<reference as written>": { ref, mode, state, at, age_s, outputs, error? } }` for each reference of `reads`; for `data:<id>#<output>`, `outputs` holds only that output), `STEEL_INPUTS` (JSON: the inputs of the run when the check runs for a step, else `{}`), `STEEL_RUN_ID` (the run, or empty), `STEEL_NODE` (the node of the run, or empty), and the values of `flint.env` and `flint.env.local`, at most `timeout`. Each output line that is one JSON object is one result:

```json
{ "state": "holds|fails|error", "part": "<a part id of about>", "values": { "rsvps": 23 }, "summary": "23 of 30 RSVPs.", "evidence": [{ "kind": "url|file|note|text|output", "value": "...", "label": "..." }] }
```

**Before a check**, the core pulls each external data that the claim reads and that is old, when the trigger of that data is enabled on this machine. A check for a run (a precondition or an effect of a step) and the effect checks after a process run pull each external data that the claim reads, whatever its age, when its trigger is enabled. Else the check runs with the value that is there, and the value says its age. **A check that gets a value with the state `none`, `pending`, or `error` gives `error`** and names the value: it never judges with a default (an amount that was not pulled is not 0) or with the old value of a failed pull. A maker and a custom store follow the same rule for their inputs.

With no `part`, the result is for the whole claim. A check of many parts prints one result for each part (the claim `code-refs` of a software program does). A line that is not valid is a problem of the check, and gives `error`. Test a check with `flint ite claim test "<program>" <claim>`: it runs the check once, prints each line and its problems, and writes nothing.

**The meaning of a failure.** The mode says what must change:

| Mode | What it says | A failure means | What must change | Who |
|---|---|---|---|---|
| `is` | A description of the world | **Drift**: the model is out of date | The model: a map change, a revision, or a new drawing of a mirror | An agent proposes, a person applies |
| `ought` | A goal or a limit | **At risk**: reality is off target | The world: a process of `fixed-by` | The owner of the claim |
| `will` | A prediction | It came true or false | Nothing: the prediction is scored | Nobody |

**The state of a claim** is computed, never stored. It comes from the newest result (of each part, when the results name parts; the claim takes the worst part state): `holds`, `fails`, `error`, `old` (older than `fresh-for`, or a value that it reads is old: the state names that data), `pending` (a person or an agent check waits), or `unchecked`. A `will` claim is `open` until `resolves`, then `came-true` or `came-false` from the first result after `resolves`, else `unresolved`.

**The grounding of a part** comes from the claims about it: `holds` (each claim holds), `failing` (a claim fails or has an error), `old`, `partial`, `unchecked`, or `no-claim`. A review that fails makes the grounding `old`, not `failing`. A group, a view, and a program add the counts of their parts.

**One door.** Each result comes in through one door: `flint ite claim report`, or the route `POST /api/steel/programs/<program>/claims/<claim>/results`. The door checks the claim, the part, and the state, and it records the actor: `person:<Name>`, `agent:<session id>`, `check:<claim>`, or `run:<run id>`. An agent or a person never writes a result into a file.

**The findings.** `flint ite check` gives the findings of the claims, and runs no check:

| Code | Level | When |
|---|---|---|
| `claim-invalid` | error | `claim.md` has a problem, for example a part of `about` that is not a part of the program. The claim does not check. |
| `claim-fails` | error | A result fails: drift for an `is` claim, at risk for an `ought` claim (with `fixed-by`), a surprise for a `will` claim. |
| `claim-error` | error | The check could not check. |
| `claim-old` | warning | The newest result is older than `fresh-for`, or a `will` claim has no result after `resolves`. |
| `claim-unchecked` | note | The claim has no result yet, or it has `by: none`. |
| `claim-fixed-by` | warning | `fixed-by` names a process that `Processes/` does not have. |
| `no-claim` | note | No claim is about a part. |

### The Commands of a Claim

| Command | Result | Writes |
|---|---|---|
| `flint ite claim list "<program>" [--part <id>]` | The claims of a program, with the mode, the form, the parts, the state, and the age of the newest result | Nothing |
| `flint ite claim show "<program>" <claim>` | One claim: its file, its check, its problems, its state, and its newest results | Nothing |
| `flint ite claim new "<program>" <id> --about <part>... --mode is\|ought\|will --by code\|agent\|person\|none --title "<title>" [--text "<prose>"] [--p <0 to 1>] [--resolves <YYYY-MM-DD>]` | Writes a new `claim.md` from the form `steel-claim/1`: code gets `runtime: node`, `entry: check.js`, `timeout: 30s`; agent gets a `prompt`; person gets a `question`; none gets no check. It writes no check code. It refuses an id that is not a slug, an id that exists, a part of `about` that is not a part of the program, and a `will` claim with no `--resolves`. | `Reality/<id>/claim.md`, and one activity record for an agent |
| `flint ite claim check "<program>" <claim>` | Check now: a code check runs on this machine; an agent check starts one Orbh session; a person check gives `pending` | The log |
| `flint ite claim test "<program>" <claim>` | Runs the check once, and prints each line and its problems. Exit 1 when a line has a problem. | Nothing |
| `flint ite claim report "<program>" <claim> --state holds\|fails\|error [--part <id>] --summary "<text>" [--value k=v]... [--evidence kind=value]... [--observed-at <time>] [--run <run id> --node <node id>]` | The one door: records one result. In an Orbh session the actor is `agent:<session id>`, else `person:<Name>`. A result for a precondition of a run names the run and the node (`--node` only with `--run`); only such a result counts for that node. | The log |

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
3. **The effect.** After a process is `done`, the core runs the checks of its `effect` claims once, with the same inputs. Only a check confirms an effect. The report of the process does not.
4. **Authority.** `run` lists who may start it (default: the owners of the system, else the person of this machine). `approve: true` needs the approval of a person before each run. `irreversible: true` implies `approve: true`, and an agent never approves.
5. **A process changes the model only through a proposal.** It has no way around the one writer of the structure. It writes data only through `writes`. A process that keeps an instruction up to date (for example `redraw-mirror`) proposes the new file as a revision of `Steel/` (`flint ite revision propose --kind steel`).
6. **The state of a process** across its runs is `.flint/steel/state/<program id>/<process>.json`: the code gets it as `STEEL_STATE`, and the newest `{ "state": ... }` record of a `done` run replaces it. A process that writes files on this machine writes them in `.flint/steel/state/<program id>/`.
7. **No ready processes.** Each process holds its own code. Test it with `flint ite process test`: it runs the code once with the given inputs, prints each record and its problems, writes nothing to the log, and changes no state. A process with `irreversible: true` or a `source` refuses the test unless `--dry` is given; with `--dry` it prints what it would run.
8. **A large process.** A process with a `map.md` in its folder runs as a run of its instruction map (see Instruction Maps and Runs). One thing at two sizes: one description, or one description and a map.

**The log record** of a process run (`kind: process-run`) holds `process`, `run` (or null), `step` (or null), `state` (`done`, `failed`, `waiting`, `cancelled`), `outputs`, `summary`, `started_at`, `ended_at`, and `by`.

### The Commands of a Process

| Command | Result | Writes |
|---|---|---|
| `flint ite process list "<program>"` | The processes of a program, with the form, the mode, the trigger, and the enable on this machine | Nothing |
| `flint ite process show "<program>" <process>` | One process: its file, its form, its problems, and its newest runs with their outputs and effects | Nothing |
| `flint ite process new "<program>" <id> --by code\|agent\|person --title "<title>" [--about <ref>...] [--text "<prose>"]` | Writes a new `process.md` from the form `steel-process/1`, with `about: [...]` and `trigger: manual`. A ref of `about` is a part id, `process:<id>`, `process:<id>#<node>`, or `data:<id>`. code gets `runtime: node` and `entry: index.js`; agent gets a `prompt`; person gets a `task`. It writes no code. | `Processes/<id>/process.md`, and one activity record for an agent |
| `flint ite process run "<program>" <process> [--input k=v]...` | Run now. A process with a map starts a run. | The log, the state of the process |
| `flint ite process test "<program>" <process> [--input k=v]... [--dry]` | Runs the code once and prints each record and its problems | Nothing |

## Triggers and Enables

Checks, processes, and data (a pull or a maker) have the same triggers. The file says what it wants (in Git). The enable is a fact of the machine (not in Git).

| Trigger | In the file | Who starts it |
|---|---|---|
| Manual | No trigger (`trigger: manual` for a process) | A person (Check now, Run now), or a run (an effect, a precondition, or a wait for a claim) |
| Schedule (and poll) | `trigger: { every: 10m }` or `{ cron: "0 9 * * *" }` | The Flint server |
| A pushed event | `trigger: { on: hook }` | The Flint server, on `POST /api/steel/programs/<program>/hooks/<id>`. The body of the request is the input of the code (`STEEL_EVENT`). |
| A watched source | `trigger: { on: watch }` | The Flint server keeps the entry running, restarts it after a crash (at most 5 times in 10 minutes), and stops it on disable. The entry prints records as a check or a process does. |

1. **A trigger runs only on a machine where a person enabled it**: `flint ite enable "<program>" <claim|process|data:<id>>`, and `flint ite disable`. The record is `.flint/steel/enabled.json`. An agent cannot enable.
2. **The core runs a check or a process only by its trigger, by Check now or Run now, or by a run.** `flint sync` does nothing for them.
3. A trigger of a claim runs its check. A trigger of a process with a map starts a run. A trigger of data pulls it (or runs its maker). Data has no `watch` trigger.
4. A service on the internet cannot reach `127.0.0.1`. For now, such a source is polled.

| Command | Result | Writes |
|---|---|---|
| `flint ite triggers ["<program>"]` | Each trigger, its enable on this machine, and the next time | Nothing |
| `flint ite enable "<program>" <claim\|process\|data:<id>>`, `flint ite disable ...` | Enables or disables one trigger on this machine. A person only. | `.flint/steel/enabled.json` |

## Proposals: The Candidate and the Apply

Each change that waits for a person is a file of `Steel/Programs/<P>/Proposals/`: a map change (`mc-*`, see The Main Map), a view candidate, or a revision of a living system. Each engine keeps its own file form. A proposal outside the Mesh is safe from a rename of the Mesh, so its bytes stay exact for a revert.

A person changes a view directly (the Workbench, or by hand). **An agent changes a view only through a candidate**: a complete view file `Proposals/<candidate-id>.md` in the format `steel-view/1`, with `view_id`, `base_hash`, and `state: proposed`.

1. The candidate id is `<view-slug>-<UTC yyyymmdd-hhmmss>`. The view slug is the H1 in lower case, with each run of other characters than `a-z` and `0-9` replaced by one `-`.
2. A new view: `view_id` is a new UUID, `id` is a second new UUID, `base_hash: null`.
3. A reshape: `view_id` is the `id` of the view, `id` is a new UUID, and `base_hash` is the SHA-256 hex of the bytes of the view file (`shasum -a 256 "<view file>"`), computed before you read the view.
4. Verify with `flint ite check --candidate <id>` (exit 0: no error finding of the candidate) and `flint ite diff --candidate <id>` (no conflict). `flint ite check <program>` reads the main map and the views, not a candidate. `flint ite diff` names each changed node with the kinds of its change: `title`, `claim` (the text, or a field that is not a reference, for example `actor`), `contract` (`part`, `code-refs`, `stories`, or `criteria`), `links`, and `level`. `flint ite view --candidate <id>` shows the candidate as the view will show it, with the proof of each node, and `flint ite diff --candidate <id> --against-candidate <id>` compares two candidates of one view.
5. The apply (`flint ite apply --candidate <id>`, or the Workbench) replaces the view only when the hash of the view file is `base_hash`, and writes the replaced form to `History/`. A conflict writes nothing. The apply and the discard keep the candidate file: they set `state: applied` or `state: discarded`.
6. In an interactive session, apply only when the person agrees. In a headless session, never apply and never discard the candidate that you return.

## The Main Map

The **main map** of a program is the tree of its parts by `parent`. Each program has one main map. A subsystem is a deeper level of the same main map, not a separate program: a person opens it by zoom in the Workbench. The views of the program name the parts of the main map by their ids. For a software program, the code is the sources of the parts (`code-refs`).

### The Tree

- **The root is the root note.** Each part has one `parent`: one wikilink to the parent part, or to the root note for a top part. A note is a part when its `parent` chain reaches the root note.
- **The 100% rule.** The children of a part together are the whole part: each source of the part belongs to one child. Nothing of the system is outside the tree, and nothing is in it two times.
- **The size limit.** A level holds at most `max-children` parts (default 9). A part with exactly one child is a finding: merge the child into the part, or give the child its siblings.
- **Relations are free, and they roll up.** A link of a connection with `rolls-up` (`uses`, `depends-on`, `blocks`) shows at each level as one relation between the two cards whose subtrees hold its two ends, with the count and the connection keys. A link inside one card does not show. A wikilink in the prose (`mentions`), `sources`, and `code-refs` do not roll up.
- **Coverage.** Software (a part of a type with `covers-files`, in a program with `codebase`): each file of `git ls-files` of the product root is covered when one `code-refs` entry of a part is the file, or a folder that holds it (a folder ends with `/`). A file that no part covers is a gap. A file that two leaves cover with a whole-file or folder ref is an overlap. A ref of a part that is not a leaf covers its files and makes no overlap. A slice (`path#symbol` or `path:Lx-Ly`) covers its file and never makes an overlap. The counts are of the time of the read. A living system: each item of `boundary.inside` is covered when one of its `parts` names a part. Another program: the coverage is not computed.
- **Views name parts by id.** A view node that stands for a part has the part id as its heading id. Each part lists the view nodes that look at it.

The configuration is in the frontmatter of the root note. Each key is optional:

```yaml
main-map:
  max-children: 9          # an integer of 2 or more; default 9
  coverage-ignore:         # paths relative to the product root (a folder ends with /), or globs
    - orbtest/
    - "**/test/"           # a folder of that name at any depth
    - "**/package.json"    # a file name at any depth
```

In a glob, `*` does not cross `/`, `**/` is any depth, `?` is one character, and `{a,b}` is one of the words.

### The Findings of the Main Map

`flint ite map check` shows these findings. `flint ite check` does not show them.

| Code | Level | Meaning | The repair |
|---|---|---|---|
| `map-parent-missing` | error | The `parent` of a part names no note. The part shows under the root with a marker. | `move` to the correct parent |
| `map-parent-outside` | error | The `parent` names a note that is not a part of the program. | `move` |
| `map-cycle` | error | The parents of a part make a cycle. | `move` |
| `map-too-many-children` | warning | A level has more than `max-children` parts. | `split`, `merge`, `move` (the action `map-refactor`) |
| `map-single-child` | note | A part has exactly one child. | `merge`, or `add` the siblings |
| `anchor-missing` | warning | A view node names no part of the main map. | Reshape the view, or `add` the part |
| `anchor-none` | note | A view node has no part (a slug heading id). | Give it its part, or keep it as a concept of the view only |
| `coverage-gap` | note | Files that no part covers (one finding on the root, with the count). | The action `map-cover` |
| `coverage-overlap` | warning | Two leaves cover one file. | `edit` the sources of one leaf |
| `code-ref-missing` | warning | A `code-refs` entry matches no file. | `edit` the sources (the action `map-update`) |
| `map-change-stuck` | error | A map change is `applying` or `reverting`: a write did not finish. | The next write of the change engine recovers it |

### The Map Change

Each change of the tree is a **map change** (`steel-map-change/1`): one file `Steel/Programs/<P>/Proposals/mc-<yyyymmdd-hhmmss>-<slug of the reason>.md`, with the list of operations, the hash of each file at the propose, and a preview of the tree before and after. Only the change engine writes a map change.

The operations are one JSON array. They apply in order. A part is named by its id, its note name, or a unique title. `parent: null` is the root. `kind` is a type id. `sources` are the `code-refs` of a software program, else the `sources` of the part (wikilinks or URLs).

| Operation | The JSON | What it does |
|---|---|---|
| `add` | `{"op":"add","title":"<t>","kind":"<type id>","parent":"<part or null>","sentence":"<s>","prose":"<optional>","sources":["..."]}` | A new part. An optional `id` (a UUID v4) lets a later operation name it. |
| `move` | `{"op":"move","part":"<part>","parent":"<part or null>"}` | A new parent. The new parent is not in the subtree of the part. |
| `split` | `{"op":"split","parent":"<part or null>","subsystem":{"title":"<t>","kind":"<type id>","sentence":"<s>"},"children":["<part>","..."]}` | Groups children of `parent` into a new subsystem under `parent`. |
| `merge` | `{"op":"merge","from":"<part>","into":"<part>"}` | The children and the sources of `from` go to `into`; each wikilink to `from` becomes a link to `into`; the file of `from` is removed. |
| `rename` | `{"op":"rename","part":"<part>","title":"<new title>","kind":"<optional new type id>"}` | The new file name (with the new `(Type)` word when `kind` is given) and H1; each wikilink to the old name changes. The id stays. |
| `remove` | `{"op":"remove","part":"<part>"}` | The children move up one level, and the file is removed. The links to the part stay: the preview lists them as dangling. |
| `edit` | `{"op":"edit","part":"<part>","sentence":"<optional>","prose":"<optional>","sources":["<the whole new list>"]}` | A new sentence, prose, or list of sources. `sources` replaces the whole list. |

The states: `proposed`, then `applied` (and `reverted` after a revert), or `discarded`. `applying` and `reverting` are the marks of a write in progress.

1. **One writer of the structure.** Each change of the tree is a map change: `flint ite map change propose`, the shortcuts `map split|move|rename|merge`, and `part add` and `part remove`.
2. **An agent proposes; only a person applies.** The engine refuses an apply, a revert, and `--apply` from an agent with `forbidden`. An agent can discard a change that it proposed.
3. **The apply checks each base hash.** A file that changed after the propose is a conflict (`changed`), and the apply writes nothing. The apply writes in two phases, and a revert writes back the exact old bytes.
4. **A refactor keeps the links valid.** A `rename` and a `merge` rewrite each wikilink to the old part in the Mesh. The views, the claims, the processes, the instruction maps, the runs, and the log name parts by id, so a refactor breaks none of them.
5. **A change by a person applies at once.** In the Workbench, a person adds, removes, groups, moves, renames, and merges by hand. Each hand change is one map change that is proposed and applied in one call, with Undo (a revert).

### The Commands of the Main Map

| Command | Result | Writes |
|---|---|---|
| `flint ite map show <program> [--focus <part>]` | One level: the focus, the cards with their counts, coverage, and findings, and the relations | Nothing |
| `flint ite map tree <program> [--ids]` | The whole tree with the markers and the counts of the findings | Nothing |
| `flint ite map check <program>` | Each finding of the main map. Exit 1 for an error finding. | Nothing |
| `flint ite map coverage <program> [--gaps]` | Covered / total, the coverage of each part, the overlaps; `--gaps` lists the gap files | Nothing |
| `flint ite map change propose <program> --ops <file\|-> --reason "<one sentence>" [--apply]` | Proposes a map change and prints its id and preview. `--apply` applies it at once: a person only. | One proposal |
| `flint ite map change list <program> [--state <state>]` | The map changes, the newest first | Nothing |
| `flint ite map change show <program> <id>` | One change with its preview: the tree before and after with the marks, the files, the dangling links, the conflicts | Nothing |
| `flint ite map change apply\|revert <program> <id>` | Applies or reverts one change. A person only. | The part files, the proposal |
| `flint ite map change discard <program> <id>` | Discards a proposed change; the file stays with the state `discarded`. A person, or the agent that proposed it. | The proposal |
| `flint ite map split <program> --parent <part\|root> --title <t> --kind <type id> --sentence <s> <child>...` | Proposes one `split` | One proposal |
| `flint ite map move <program> <part> --parent <part\|root>`, `map rename <program> <part> --title <t>`, `map merge <program> <from> --into <part>` | Propose one operation; `--apply` applies it (a person only) | One proposal |

Each verb takes `--json`. `flint ite map <program>` with no verb gives the map: each part with its type, its parent, its links, and its grounding. In an Orbh session the actor is `agent:<session id>`, else `person:<Name>`.

### The Rules of the Main Map

1. **A job of a map action changes the main map only through a map change.** It never writes a part file with its own tools.
2. **Never apply a map change, and never revert one.** Only a person does. A headless session never discards the change that it returns.
3. **One change for one job, and read the waiting changes first.** Run `flint ite map change list <program> --state proposed`, then `flint ite map change show <program> <change id>` for each one. Do not propose what a waiting change does already. Do not `edit` or `move` a part that a waiting change moves or edits: the later change gets a conflict (`changed`) at the apply.
4. **Read the preview before you return.** The tree after must have no new finding of the level error, and no new `map-too-many-children` that the job could avoid.
5. **The quality rules apply to each new part**: the words of the person, a type of the program, a title of two to six words, one sentence that says what the part is, and sources that you read (never invented paths).

### The Actions of the Main Map

| Action | Nodes | Workflow (headless / interactive) | The agent does |
|---|---|---|---|
| `map-create` | None | [[hwkfl-ite-map_create]] / [[wkfl-ite-map_create]] | Reads the sources and drafts the root and level 1: 3 to 9 parts, each with one sentence and its sources |
| `map-expand` | 1 part | [[hwkfl-ite-map_expand]] / [[wkfl-ite-map_expand]] | Takes one part one level deeper: 3 to 9 children that cover the sources of the part |
| `map-refactor` | 0 or 1 (the focus) | [[hwkfl-ite-map_refactor]] / [[wkfl-ite-map_refactor]] | Brings one level to the size limit: split, merge, move, rename |
| `map-cover` | 0 or 1 | [[hwkfl-ite-map_cover]] / [[wkfl-ite-map_cover]] | Places the gap files: `edit` the sources of a part, or `add` a part |
| `map-update` | 1 part | [[hwkfl-ite-map_update]] / [[wkfl-ite-map_update]] | Updates one part from its sources now: `edit`, and `add` or `remove` of children |
| `parts-add` | 0 or 1 (the parent) | [[hwkfl-ite-parts_add]] / [[wkfl-ite-parts_add]] | Adds the parts that the person names below one part (or the root): `add` operations |

The prompt of a job of a map action holds only the data: the level of the focus (the cards, the relations, the findings) and the coverage gaps (at most 200 paths). The workflow of the action holds the steps, the form of each operation, and the last step: `flint ite map change propose "<program>" --ops - --reason "<one sentence>"`.

## Software Programs

A **software program** is a program of the template `software`: the model of a software product. Its parts are the systems, the modules, the features, and the data of the product (the types `system`, `module`, `feature`, and `data` of this shard), and its views show the processes that run through the product. Each part and each view node can name the code with `code-refs` and the stories of Orbtest with `stories` and `criteria`. With these links, the core shows the **proof** of each node (does the product do what the node says?), and the **review** of each node (did the code change after a person or an agent compared the node with it?). The check after a task finds the nodes that a product task changed.

### The Root Note and the Code

The root note of a software program has two more fields:

| Field | Value |
|---|---|
| `codebase` | A wikilink to a codebase marker: `"[[rf-cb-<slug>]]"`. The markers are in `Mesh/Metadata/References/Codebases/`. The `name` of the marker is the codebase name. `flint resolve codebase <name>` prints its path on this machine on the first line. Each `code-refs` path is relative to this path. |
| `product-root` | The folder that holds `orbtest/`, relative to the codebase. The value is `"."` when it is the codebase root. The `--root` of each `flint orbtest` command is the codebase path joined with `product-root`. Omit the field when the product has no `orbtest/` folder: then the program has no proof. |

When the product has no codebase marker, the person adds the reference: `flint reference codebase "<Name>" <path>`, then `flint sync` (the sync writes the marker). When the marker exists but its path is not known on this machine, the person runs `flint fulfill codebase "<Name>" <path>`. `flint reference list` shows each codebase name and its state.

### The Grammar of `code-refs`

A part has `code-refs` in its frontmatter. A view node with a slug id has `code-refs` in its block. A view node of a part has none: the part holds its code.

```
"src/auth/"                            # a folder of the codebase of the program
"src/auth/session.ts"                  # a file
"src/auth/session.ts#SessionManager"   # a symbol in a file
"src/auth/session.ts:L20-L80"          # a line range: a weak anchor
"@Steel/apps/steel-cli/src/serve.ts"   # a file of another codebase of the Flint
```

- A path with no `@` is relative to the codebase of the program. Each path must exist: else the finding `code-ref-missing`.
- `@<Codebase name>/<path>` names a path in another codebase of the Flint. The name after `@` is the `name` of its codebase marker (`flint reference list` shows the names), for example `@Steel/`. Use it when one part of the answer is in another repository.
- A path that leaves the codebase (`../plates/...`, or an absolute path) gives `code-ref-missing`. Use `@<Codebase name>/<path>` in its place.
- A symbol (`#Name`) is a name that the file declares: a function, a class, a type, or a constant. The check only looks for the name as a whole word in the file, so a symbol is a weak anchor. Prefer the file when the whole file holds the claim. Do not use a line range in a kept view.
- **Name files, not large folders.** A code-ref matches each spec of Orbtest whose `components` path is equal to it, inside it, or a parent of it. A broad code-ref (a large folder such as `packages/flint/src/`) gives the person hundreds of related cases that tell nothing. After a review, each change of a file in that folder also gives `review-due`. Name the one file or the small folder that holds the claim of the node.
- The coverage of the main map reads the `code-refs` of each part of a type with `covers-files` (see The Main Map).

### Stories and Criteria

The contract of a product is in its Orbtest stories (`orbtest/stories/`). A part has `stories` and `criteria` in its frontmatter. A view node with a slug id has them in its block.

| Field | Value |
|---|---|
| `stories` | Orbtest story ids, for example `[setup.steps]` |
| `criteria` | Criterion addresses `<story-id>#<index>`, 0-based, for example `[setup.steps#0, setup.steps#3]`. Use it only when the node needs some criteria of a story, not all. An explicit list, also an empty list, replaces the criteria of the `stories`. An address gives its story, so the story need not be in `stories`. |

Take each id and each address from `flint orbtest story list --root <product root>` and `flint orbtest story show <id> --root <product root>`. Never invent a story id or a criterion address: an unknown id gives `story-missing` (an error). The ITE writes no story, no spec, and no case: when a node needs a story that does not exist, say the gap in the prose of the node, and tell the person. The Orbtest shard adds stories.

### The Anchor of a Step

A step of a process view names the part where it runs with `part`, and who acts with `actor`. The anchor joins the view and the main map: the Workbench lights the part of each step on the main map, and the card of a part lists the steps that run in it.

````markdown
### Create the first Flint {#create-the-first-flint}

A Flint is one folder for notes and for shards. The person runs one command with a name for the Flint.

```node
kind: step
actor: "Person"
part: 6b0e2f4c-1d3a-4c5b-9e8f-7a6d5c4b3a21
action: 'flint create "<name>"'
next: [check-the-inputs]
criteria: [setup.steps#2]
```
````

1. **The value of `part`** is the id of one part of the same program (its frontmatter `id`). Take it from `flint ite map "<program>" --json`. A `part` that names no part of the program gives `anchor-missing`.
2. **Only a node with a slug id has `part`.** A node that stands for a part has the part id as its heading id and needs no `part`. Use the part id as the heading id when the node is the part (a node of a `tree` or a `layers` view). Use a slug id and `part` when the node is a step that runs in the part: many steps can run in one part.
3. **The part owns the description of the capability.** The step says only what occurs at this moment of the process. Do not copy the rules and the edge cases of the part into the step.
4. **Name the part that holds the whole step.** Usually this is a feature. A coarse step can name a module or a system. A step that only keeps state can name a data part.
5. **Select the part by its text, not only by its code.** `flint ite view "<view>" --json` gives each step with no `part` its proposed parts (`parts`, each with `source: proposed`, at most 5, the nearest first; `parts_total` counts each match): the parts whose `code-refs` match a code-ref of the step. A proposal is not a claim. Read the note of the part. Name it only when its text says what the step does.
6. **Never invent a part.** When the main map has no part for a step, leave `part` out, and name the gap in your result. The Workbench shows the step with "No part on the map" and its proposed parts. The main map changes only through a map change. A part of another program is not a part of this program, also when the two programs have one codebase: leave `part` out, and name that part and its program in your result.
7. **The part owns the wide anchor to the code.** A step keeps its own `code-refs` only when its claim is narrower than the part: one file or one symbol.
8. **`actor`** is who acts at this moment, as a short name that a person reads: `Person` when the person acts, the name of the product (`Flint`) when the product acts, or the name of another actor (`Agent`, `Git`). Write it when the prose says who acts. Use one name for one actor in the whole view: the strip of the Workbench draws one lane for each name.
9. **Both fields are in the review.** `part` is a reference: it is in the `contract_hash`. `actor` is a field of the text: it is in the `meaning_hash`. When a candidate adds or changes one of them, remove the `reviewed` mapping of that node.

### The Processes of a Software Program

A process of a software product is a view of the map `flow` or `streams`. The Workbench lists each such view under Processes, with its proof dot and its count of steps. "Show on map" lights the parts of the steps on the main map with the numbers of the steps and the path, and the strip below the main map shows the steps in order, in lanes by actor (Who acts) or by system (Systems).

| Map | It fits when | How to write it |
|---|---|---|
| `flow` | The question is "how does X happen?", and the answer is one sequence | H2 nodes of `kind: step` in the order of the process, each with `next` to the step that follows, and with its `part` and `actor`. A `kind: decision` node has two or more `next`. A step that happens one time before the process (a setup) is a step at the start, with `next` to the first step; say "one time" in its prose. Use `uses` only for a node that is not a step. |
| `streams` | The answer has two or more sequences with separate purposes: "split the flow into streams", "what does each role do?" | One H2 for each stream: a group, or a node of `kind: stream`. H3 steps inside, with `next` in each stream, and with their `part` and `actor`. A `next` to a step of another stream shows a hand-over. |
| `layers` | The question is "how is it built?" | One H2 group for each layer, the layer nearest to the person first. H3 nodes of the parts (the part id as the heading id) inside, with `uses` to the layers below. |
| `tree` | The question is "what are the parts of X?" | The main map is the tree of the parts. Write a tree view only for another tree than the main map. |
| `table` | The question compares items on the same properties | One H2 node for each item, with the same fields in each block and the same order of sentences in each prose |

Each view ends with one node of `kind: note` that names what the view leaves out (quality rule 10). A node of the kind `note` with no story and no criterion has no proof, and it gets no `no-contract`.

**The quality rules of a software program** add to the quality rules of a program:

1. **Anchor each claim.** Each part and each view node that makes a claim about the product has `code-refs` or `stories`, and when you can, both. Name files, not large folders. Only a node of `kind: note` and a group have neither.
2. **Anchor each step of a process to the main map** with `part` and `actor` (see The Anchor of a Step).
3. **Prefer stories to criteria.** Name `criteria` only when the node needs some criteria of a story, not all.
4. **The words of the person, not of the code.** A command that the person types, such as `flint setup`, is a word of the person. A function, a file, a package, a type, or a variable of the code is not: put it in `code-refs` only.
5. **Tell the truth about gaps.** When a node has no story, say so in its prose: "No story proves this." Never invent a story id, a criterion address, a part, or a path.

### The Proof of a Node

The proof says if the product does what a node says, from the coverage of Orbtest. **The core computes the proof at each read, as it computes the grounding. Never write it into a file.** The proof is not a claim: a claim gives `holds` or `fails`, and the proof has six states.

1. **The criteria of a node** are its `criteria`; an explicit list, also an empty list, wins. Else they are each criterion of each of its `stories`. A part takes them from its frontmatter. A view node with a slug id takes them from its block. A view node of a part has the proof of the part.
2. **The state of a criterion** comes from Orbtest as it is: `proven`, `failing`, `stale`, `gap`, `not-run`, or `waived`.
3. **The proof of a node**, in this order: no criterion: `no-contract`; else a criterion is `failing`: `failing`; else a criterion is `stale`: `stale`; else each criterion is `proven`: `proven`; else one criterion or more is `proven`: `partial`; else `unproven`. An address that Orbtest does not know counts in the total only. A node of the kind `note` with no story and no criterion has no proof.
4. **A part with children** has its own proof, and the proof below: the union of the criteria of its subtree, with the count of the parts below that have no criterion. A closed card of the main map shows the proof below. A group of a view takes the union of its nodes.
5. **Related cases never prove a node.** They are the cases of each spec whose `components` path matches a `code-refs` path of the node, only for the paths of the codebase of the program: at most the 20 nearest, with the total. Only the link from a node to a story, a criterion, and a case gives proof. A node with hundreds of related cases has a code-ref that is too broad.
6. **The report of a case** opens in the Workbench, in the section Proof of the node.
7. **The program needs `product-root`.** With no `product-root`, the program has no proof. When the product root is outside the codebase, or its Orbtest definitions do not load, the finding is `proof-unavailable`.

The Workbench shows the proof as a dot on each card of the main map and of a view, beside the grounding: proven, partial, unproven, failing, stale, or no-contract. `flint ite proof "<program>"` gives the proof of each part and each view node; `flint ite proof "<program>" <ref>` gives the criteria, the cases, and the related cases of one node. A claim can read the proof: its check runs `flint ite proof "<program id>" --json`.

### The Review

A review says that a person or an agent compared a node with its code at one commit, and found the text of the node true. The anchor is one YAML flow mapping under the key `reviewed`: in the frontmatter of a part, or in the `node` block of a view node with a slug id. A view node of a part has the review of the part.

```yaml
reviewed: { commit: 19ad162cf, at: "2026-10-08T22:10:00Z", meaning_hash: "<sha256>", contract_hash: "<sha256>", by: "person:Nathan", commits: { Steel: 243fbb2 } }
```

- `commit` is the HEAD of the codebase of the program at the review. **An anchor is a commit**: a file under a code-ref with changes that are not committed stays `review-due` after a new review, and the reason says so. Commit the change of the code first, then review the node. `commits` gives one commit for each other codebase that a `@<Codebase>/` code-ref names. `by` is `person:<Name>` or `agent:<session id>`.
- `meaning_hash` is the hash of the text of the node and of its fields that are not references (for a view node: `kind`, `action`, `result`, `actor`, and the others). `contract_hash` is the hash of its references: `code-refs`, `stories`, `criteria`, and `part`. The place and the title of the node are in no hash, so a move keeps the anchor.
- **Only the review writes `reviewed`**: `flint ite review`, or Mark as reviewed in the Workbench. Never write or edit a value of `reviewed` with your own tools. A candidate copies the mapping of a node unchanged when the text and the references of the node do not change. When they change, the candidate removes the mapping of that node.

The state of a review is computed at each read, never written:

| State | When | The review mirror claim |
|---|---|---|
| `reviewed` | Nothing changed after the anchor | `holds` |
| `review-due` | The text of the node changed after the review ("The text changed after the review."); its references changed ("The references changed after the review."); a file under a code-ref changed after `commit` (committed, staged, unstaged, or a new file); a referenced story changed after `commit`; or, for another codebase, its commit is missing from `commits` or its files changed. Each reason is listed, with at most 20 changed files. | `fails` |
| `anchor-unknown` | The codebase does not resolve, it is not a Git repository, or Git does not have the commit (for example after a rewrite of the history) | `error` |
| `never-reviewed` | A view node with a slug id in a `kept` view, with `code-refs` or `stories`, and no anchor. A finding only: no claim. | — |

A part with no anchor has no review state and no finding.

**The review is a mirror claim.** Each node with an anchor is the claim `claim:mirror:<reference>`: `claim:mirror:<part id>` for a part, or `claim:mirror:view:<view id>#<node id>` for a view node. Its mode is `is`, it is `by: core`, and it has no file and no log. A review that fails gives the finding `review-due` (a warning), not `claim-fails`: a review is necessary, but the text is not shown false. It makes the grounding of its part `old`, not `failing`. The brief of a living system lists it in `drift`.

**`review-due` does not mean that the node is false.** Compare the text of the node with the diff of its code after the anchor: `git -C "<codebase path>" diff <reviewed.commit> -- <code-ref path>` (for a code-ref of another codebase, use that codebase and its commit in `commits`), and read each changed story with `flint orbtest story show <id> --root <product root>`. The claim is the text, not the names in the code: a new name of a function or a change of its inner logic often keeps the text true. `flint ite review "<program>" <ref>... --show` gives the state, the anchor, the reasons, and the changed files of each node. When the text is still true, review the node: `flint ite review "<program>" <ref>...`. When it is not true, change the node: a candidate for a view node, or a map change (`edit`) for a part. The action `review` does this work ([[hwkfl-ite-review]] / [[wkfl-ite-review]]). Review only a node that you compared with its code.

### The Check After a Task

`flint ite check [<program>] --paths <path...> [--checkout <dir>] [--json]` gives the findings of each part and each view that names one of the paths. It writes nothing. At the end of a product task, follow [[sk-ite-check_after_task]].

1. A path is absolute, or relative to the codebase of a program. A relative path that starts with `..` is dropped. Give absolute paths: then each path matches only the code of its own repository.
2. A path matches a code-ref when both are in one repository, and one path is the other or holds it at a `/` boundary. No glob.
3. A code-ref of a part that matches selects the part, with the findings of the part. A code-ref of a view node that matches selects the whole view, with all the findings of the view.
4. The findings: `review-due`, `anchor-unknown`, `never-reviewed`, `code-ref-missing`, `story-missing`, `no-contract`, `anchor-missing`, and `anchor-none`.
5. When no part and no view names a path, the command prints `No part or view names <paths>. Nothing to check.` and exits 0. Exit 1: a finding of the level error. Exit 2: a refusal (an unknown program, or a `--checkout` that is not a worktree of the repository or that has a link that leaves it).
6. `--checkout <dir>` reads the code and the Orbtest definitions of a worktree of the same repository, in place of the checkout of the codebase. The cases of a checkout that is not the primary checkout have no report.

The text output gives, for each program, each selected part and view with `✓ no findings`, or one line for each finding (`<mark> <level> <code>  <detail>`), then `N part(s), M view(s): E error, W warning, N note`. The check is an aid: it never blocks a landing or a release.

### The Findings of a Software Program

`flint ite check "<program>"` gives these findings with the other findings of the program. A software program with no anchor and no story gives no new warning.

| Code | Level | Meaning |
|---|---|---|
| `code-ref-missing` | warning | A `code-refs` path or symbol of a part or of a view node does not exist, a path leaves its codebase, or the codebase after `@` does not resolve |
| `story-missing` | error | A story id or a criterion address of a part or of a view node does not exist in Orbtest, or an address is not canonical |
| `no-contract` | note | A view node with a slug id names no story and no criterion, and it is not of the kind `note` |
| `proof-unavailable` | warning | The program has `product-root`, but the product root is outside the codebase, or its Orbtest definitions do not load |
| `review-due` | warning | The text, the references, the referenced code, or the referenced stories of a node changed after its review |
| `anchor-unknown` | warning | The codebase of a review does not resolve, or Git does not have its commit |
| `never-reviewed` | warning | A node of a kept view has code or stories, and no review |
| `anchor-missing` | warning | A view node names no part of the main map, or a `part` names no part of the program |
| `anchor-none` | note | A view node has no part (a slug heading id) |

### The Commands of a Software Program

| Command | Result | Writes |
|---|---|---|
| `flint ite proof "<program>" [<ref>] [--candidate <id>] [--checkout <dir>]` | With no `<ref>`: each part and each view node with its proof and its counts. With a `<ref>` (a part id, or `view:<view id>#<node id>`): its criteria with their states, its cases, its tasks, and its related cases with the total | Nothing |
| `flint ite review "<program>" <ref>... [--commit <sha>] [--show]` | Writes the anchor `reviewed` of each node: a part id, `view:<view id>#<node id>`, or `view:<view id>` (each node of the view that has a block). The default commit is the HEAD of the codebase. It refuses (exit 2) a node with no `code-refs` and no `stories` or a block that does not parse (`invalid-input`), a file that changed during the write (`changed`: run it again), and a codebase that is not a Git repository (`unavailable`). With `--show`, it writes nothing and prints the review of each node: its state, its anchor, its reasons, its changed files, and its changed stories. In an Orbh session the actor is `agent:<session id>`, and the review adds one activity record. | The frontmatter key `reviewed` of a part, or the block lines of a view node; nothing with `--show` |
| `flint ite check [<program>] --paths <path...> [--checkout <dir>]` | The check after a task | Nothing |
| `flint ite view --candidate <id>` | The document of a candidate as the view will show it, with the proof of each node | Nothing |
| `flint ite diff --candidate <id> --against-candidate <id>` | The difference of two candidates of one view | Nothing |

The Orbtest commands that an agent reads (each with `--root <product root>`): `flint orbtest story list`, `flint orbtest story show <id>`, `flint orbtest coverage --json`, and `flint orbtest behaviour list --json`. The `components` of a spec are in the frontmatter of `orbtest/behaviour/specs/<spec-id>.md`.

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
| `step` | `does` (`{ process: <id> }`, or inline `{ by: person \| agent, instruction, target? }`), `next` (one id), `run` (`auto \| manual`), `inputs`, `outputs`, `precondition` (claim ids), `effect` (claim ids), `retry` (`{ max, wait }`), `on-fail` (a node id), `timeout`, `source` (with `hash` and `redraw`), `about` (references), `reads` (data that the step reads), `writes` (native data that the step may write) | Opens a visit, checks the preconditions, waits for a person when `manual` or when an approval is needed, runs `does`, collects the outputs, runs the effect checks, then follows `next` |
| `decision` | `question`, `by` (`person \| agent`), `outcomes` (`{ "<outcome>": <node id> }`) | Waits for one outcome |
| `wait` | one of `claim: <id>` (until it holds), `until: "<ISO time>"`, `for: 10m`, `event: <hook id>`; `timeout`, `next` | Waits, then follows `next`. A timeout fails the node. |
| `parallel` | `next: [<id>, ...]` (two or more) | Starts each branch |
| `join` | `wait: all \| any`, `next` | Waits for its branches. `any` cancels the other branches when the first one ends. |
| `sub-map` | `process: <id>` (a process with a `map.md`), `inputs`, `next` | Starts a child run, and waits for its end. The child run names its parent run and node. |

1. **`run`.** The default is `auto` for a step that does a code process or an agent with no approval, and for each `wait`, `parallel`, `join`, and `sub-map`. It is `manual` for a step of a person, for a decision of a person, and for each step whose process needs an approval. A person presses Begin on a `manual` step.
2. **The data.** `${inputs.<name>}` names an input of the run. `${<node id>.<output>}` names an output of an earlier node. `${<decision id>.answer}` names an answer. The value kinds are `text`, `number`, `boolean`, `choice`, `json`, `date`, and `money`.
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
| `flint ite flow new "<program>" <process id> --title "<title>" [--about <ref>...] [--text "<prose>"]` | Writes a new `map.md` (`steel-flow/1`) with one step `start` of a person whose instruction is the title, and writes `process.md` when the process has none, with `about` from `--about` (the refs of `process new`) | `Processes/<id>/map.md` (and `process.md`), and one activity record for an agent |
| `flint ite flow start "<program>" <process> [--input k=v]... [--title "<t>"]` | Starts a run, and prints the run id | A run |
| `flint ite flow runs "<program>" [--status <s>] [--process <id>]` | The runs, the newest first | Nothing |
| `flint ite flow status <run>` | The state of the run and of each node | Nothing |
| `flint ite flow events <run> [--at <seq>]` | The events, or the state after one event | Nothing |
| `flint ite flow begin\|done\|answer\|approve\|refuse\|skip\|retry\|pause\|resume\|cancel <run> [--node <id>] ...` | One action on the run: `done --output k=v`, `answer --outcome <o>`, and `--reason "<text>"` for `approve`, `refuse`, `skip`, `pause`, and `cancel`. `approve` and `refuse` are for a person only. | The events of the run |

## Living Systems

A **living system** is a system whose actors act through its own model: each claim shows its check and the age of its newest result, each process shows its runs, and a step with an effect stays pending until a check confirms the effect. A program becomes a living system when its root note has one `system` block. A program with no block has no brief and no vital signs.

Steel is the tool through which a person constructs a living system, reads it, runs it, and develops it. The code keeps the name `ite` (`flint ite`, the page `/ite`). In this Flint, the program Flint Release is the first living system: read its root note, its claims in `Steel/Programs/Flint Release/Reality/`, and its processes and instruction maps in `Steel/Programs/Flint Release/Processes/` as the reference forms.

### The Loop

1. **A process acts.** A person, a trigger, or a step of a run starts it.
2. **The world changes.**
3. **The checks read the world**: the checks of the `effect` claims at once, and each other check by its trigger.
4. **A claim judges** by its mode: `holds` (nothing to do); an `is` claim fails (**drift**: the model is out of date; an agent can propose a change of the model); an `ought` claim fails (**at risk**: the brief names the owner and offers `fixed-by`: "23 of 30 RSVPs. Run `send-reminders`?"); a `will` claim resolves (the prediction is scored); a result is old (the check must run again).

### The Terms of a Living System

These terms add to The Terms. One term has one meaning.

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

The claims, the data, the processes, the triggers, and the runs of a living system use the commands of Claims and Checks, Data, Processes, Triggers and Enables, and Instruction Maps and Runs.

## The Commands

`flint ite` is a part of the Flint CLI. Each command takes `--json`. `<program>` is the name or the id of a program. `<node>` is the id of a part or of a view node. `<doc>` is `map` or the id of a view.

| Command | Result | Writes |
|---|---|---|
| `flint ite list` | The programs with the counts and the grounding | Nothing |
| `flint ite types [--type <id>]` | The types and the connections of this Flint, with their capabilities | Nothing |
| `flint ite templates` | The templates that a new program can start from | Nothing |
| `flint ite create <name> --template <id> --purpose "<text>"` | A new program: the root note with the `types` of the template, and its folder in `Steel/` | The root note, `Steel/Programs/<Name>/` |
| `flint ite map <program>` | The map: each part with its type, its parent, its links, and its grounding | Nothing |
| `flint ite map show\|tree\|check\|coverage\|change\|split\|move\|rename\|merge ...` | The main map (see The Main Map) | A proposal, or nothing |
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
| `flint ite check [<program>] --paths <path...> [--checkout <dir>]` | The check after a task: the findings of each part and each view that names one of the paths (see The Check After a Task) | Nothing |
| `flint ite proof <program> [<ref>]` | The proof of each part and each view node, or of one node (see The Proof of a Node) | Nothing |
| `flint ite review <program> <ref>... [--commit <sha>] [--show]` | Reviews nodes against their code; `--show` only reads the review of each node (see The Review) | The anchor `reviewed` of each node, or nothing |
| `flint ite diff [<view>] --candidate <id>` | The difference of a candidate and its view | Nothing |
| `flint ite diff --candidate <id> --against-candidate <id>` | The difference of two candidates of one view | Nothing |
| `flint ite apply [<view>] --candidate <id>` | Applies a candidate. A conflict writes nothing and exits 1. | The view, one history file, the candidate (`state: applied`) |
| `flint ite discard --candidate <id>` | Discards a candidate; the view stays | The candidate (`state: discarded`) |
| `flint ite claim list\|show\|check\|test\|report ...` | The claims of a program, Check now, the test of a check, and the one door of the results (see Claims and Checks) | The log, or nothing |
| `flint ite data list\|show\|pull\|test\|set\|edit\|report\|history ...` | The data of a program, Pull now, the test of a reader or a maker, a value of a person, an edit of a store, the door, and the history of a metric (see Data) | A snapshot, a value, a store, or nothing |
| `flint ite process list\|show\|run\|test ...` | The processes of a program, Run now, and the test (see Processes) | The log, or nothing |
| `flint ite triggers\|enable\|disable ...` | The triggers and their enables on this machine (see Triggers and Enables) | `.flint/steel/enabled.json`, or nothing |
| `flint ite flow ...` | The instruction maps and their runs (see Instruction Maps and Runs) | A run, or nothing |
| `flint ite system\|log\|brief\|vitals\|prompt\|revision ...` | A living system (see Living Systems) | The log, a revision, or nothing |
| `flint ite rename <program> <name> [--base-hash <hash>]` | Renames a program and its files, and updates each wikilink in the Mesh. A decision of a person. | The program, the wikilinks |
| `flint ite archive <program> [--base-hash <hash>]` | Moves a program to `Mesh/Archive/Programs`. Deletes no file. A decision of a person. | The program folder |
| `flint ite focus <node id>... [--program <name>]`, `flint ite focus --clear` | Sets the interface key `ite-focus` of this Orbh session; `--clear` writes an empty focus | The session interface |
| `flint ite actions` | The actions: the id, the title, the object, the workflow, and what each one needs | Nothing |
| `flint ite agent start <program> [--target <t>] [--account <a>] [--interactive] [--document <doc>] [--action <id>] [--node <id>...] [--text "<text>"]` | Starts an agent session. With no `--action` and no `--text`, it gets only the orientation. With them, it gets the orientation and its first job. | An Orbh session; a job record in the agent log when it has a job |
| `flint ite agent list <program> [--since <time>]` | The agent sessions of a program: the docked ones, then the live ones, then the newest; each with its jobs | Nothing |
| `flint ite agent show <session>` | One agent session with its jobs and the result of each job | Nothing |
| `flint ite agent activity <session>` | The activity of one agent session, with the job of each record | Nothing |
| `flint ite agent dock <session>`, `agent undock <session>` | Docks or undocks an agent session. A person only. | One dock record in the agent log |
| `flint ite job <program> --action <id> [--session <id>] [--node <id>...] [--document <doc>] [--text "<text>"]` | Gives a job. With no `--session`, it starts a new agent session with the job. With `--session`, it gives the job to that agent session; a session that works refuses with `agent-busy`. | A resume of the session or a new session; one job record in the agent log |

The exit codes: 0 done; 1 a finding of the level error, or a conflict; 2 a refusal, and nothing was written. Each write runs inside the lock of the Flint. The Workbench uses the same code through the routes `/api/ite/*` and `/api/steel/*` of the Flint server.

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
| `map-create`, `map-expand`, `map-refactor`, `map-cover`, `map-update` | See The Actions of the Main Map | One part for `map-expand` and `map-update` | `hwkfl-ite-map_*` / `wkfl-ite-map_*` | Yes: a map change |
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

## Quality Rules of a Program

A program is for a person. A model that breaks these rules does not help that person think.

1. **The words of the person.** Use the words that the person uses for the system, not the words of a tool. Take the names of the parts from the notes, the sources, and the speech of the person.
2. **Prose first.** Each part has one to three short paragraphs for a person before any tool field. Each view node has one to three sentences before its block. A person must understand the map from the prose alone.
3. **One idea for each part.** When the prose of a part needs two claims, make two parts. A short title: two to six words.
4. **The types of the program.** Give each part a type of the `types` of the root note. When no type fits, use `note` and tell the person. Never invent a type: a new type is a type note that a person agrees to.
5. **Explain each word of the system at its first use.** "The run sheet is the list of the steps of the night, with a time and a role for each."
6. **Select, do not dump.** Include only what helps the person see the system or answer the question. A level of the main map holds 3 to 9 parts (`max-children`); a deeper level holds the detail; a view of 5 to 15 nodes reads well. Do not make one part for each file, each email, or each line of a sheet. When a view needs more than 25 nodes, propose a split into two views.
7. **Tell the truth about gaps.** When a part of the system is not known, say so in the prose. When a claim has no check yet, give it `by: none`. A model with an honest gap is better than a model with an invented fact.
8. **Give each claim a check when you can.** A claim about reality has a check: its own code that reads data, a file, a page, or a command; an agent request; or a question to a person. Prefer a check that code can run. A check judges: it gives `holds`, `fails`, or `error`, never only a value. When two claims read one source, make the source one piece of data, and let both claims read it.
9. **Never keep a check, a process, or a reader that you did not test.** Before you keep a code check, test it with `flint ite claim test "<program>" <claim>`; before you keep a code process, test it with `flint ite process test "<program>" <process>`; before you keep a reader or a maker of data, test it with `flint ite data test "<program>" <id>`. Never invent a story id, a path, a URL, or a note name. A check touches reality outside the model: code that only finds a part of the same program proves nothing about the system.
10. **End each view with what it leaves out.** The last section of a view is one node of the type `note` that names what the view does not show, and why.
11. **Meaning only.** No grounding, no result, no state of a claim, no finding, no position, and no presence in a file.
12. **Simplified Technical English.** Short sentences, active voice, and one term for one thing.

## Templates, Skills, and Workflows

| File | Use it when |
|---|---|
| [[tmp-ite-program-v0.1]] | You write a root note |
| [[tmp-ite-part-v0.1]] | You write a part |
| [[tmp-ite-view-v0.1]] | You write a view or a candidate (`steel-view/1`) |
| [[tmp-ite-map-v0.1]] | You write a map of `Steel/Maps/`: a map of views, or a data map (`kind: data`) |
| [[tmp-ite-claim-v0.1]] | You write a claim and its check (`steel-claim/1`) |
| [[tmp-ite-data-v0.1]] | You write a piece of data and its reader or maker (`steel-data/1`) |
| [[tmp-ite-process-v0.1]] | You write a process (`steel-process/1`) |
| [[tmp-ite-instruction_map-v0.1]] | You write an instruction map: the `map.md` of a process (`steel-flow/1`) |
| [[tmp-ite-template-v0.1]] | You write a template of this Flint (`Mesh/Metadata/Templates/`) |
| `tmp-ite-program_<id>-v1.0` | The six templates of a new program: `software`, `process`, `event`, `research`, `organisation`, `general` |
| [[wkfl-ite-model]] | A person wants the map of a system: a new program, or more parts on a map |
| [[wkfl-ite-view]] | A person asks a question about a program, and no view answers it |
| [[wkfl-ite-reshape]] | A person asks for a change of a view in words |
| [[wkfl-ite-ground]] | Parts have no claim, or claims have no check, and the person wants to know where the model touches reality |
| [[wkfl-ite-observe]] | The person wants to check claims against reality now |
| [[wkfl-ite-repair]] | Claims fail or are old, and the person wants the model or the world true again |
| [[wkfl-ite-map_create]] | A program has no main map, or only a flat one, and the person wants its root and level 1 |
| [[wkfl-ite-map_expand]] | The person wants one part one level deeper |
| [[wkfl-ite-map_refactor]] | A level has too many children, one child, or parts at the wrong level |
| [[wkfl-ite-map_cover]] | Files or items have no part (`coverage-gap`), or two leaves cover one file |
| [[wkfl-ite-map_update]] | The sources of a part changed, and the part is not true now |
| [[wkfl-ite-parts_add]] | The person names the parts to add below one part, or below the root |
| [[wkfl-ite-claim_add]] | The person says what must be true about some parts, and wants one claim with a tested check |
| [[wkfl-ite-process_add]] | The person names work that the program must be able to do: one process |
| [[wkfl-ite-flow_add]] | The person names work that needs steps and decisions in order: one instruction map |
| [[wkfl-ite-review]] | Nodes have `review-due`, or the person asks to compare nodes with their code |
| [[sk-ite-check_after_task]] | A product task ends: check the parts and the views that name the changed files |
| [[sk-ite-focus]] | Each workflow: show the person which nodes you work on |

Each workflow has a headless form (`hwkfl-ite-<name>`) that a headless agent session follows for a job of its action, and an interactive form (`wkfl-ite-<name>`). The actions `free`, `update`, `explain`, `do`, and `revise` have no workflow: the prompt of the job gives the steps.
