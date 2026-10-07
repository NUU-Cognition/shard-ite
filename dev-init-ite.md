---
description: "The Integrated Thinking Environment: model any system as a program of typed parts in the Mesh, see it through views and maps of Steel, check it against reality with processes, and run its instruction maps"
---

# ITE

The ITE (Integrated Thinking Environment) lets a person model a **system** of any kind as a **program**, see it on a canvas, and check it against reality. Software is a system. An event of a club, a process of a business, a research pipeline, and a team are systems too.

An IDE gives a person one loop for software: write, navigate, run, test, and keep versions. The ITE gives the same loop for a model of a system:

| An IDE for software | The ITE |
|---|---|
| A project | A **program**: the model of one system. A root note in the Mesh, and the tree of parts below it. |
| A language and its libraries | **Types** and **connections**: Mesh notes that say what each part is and how parts link. A **template** gives the start of a new program. |
| Source files | **Parts**: one Mesh note for each part of the system, of any type |
| Editor tabs | **Views** on a canvas: one map for one question |
| Run and debug | A **job**: an agent session that works on parts and shows on the map. A **run** of an instruction map. |
| Tests | **Processes**: one way that the model touches reality (code, an agent, or a person). Each observation goes into the **log**. |
| The Problems panel | **Findings**, and the **grounding** of each part |
| Source control | **Proposals**, history, and Git |

Example: Nathan makes the program "Club Launch Night" from the template `event`. An agent reads his notes and proposes the first level of the main map: the goal, the milestones, the roles, the venue, the risks. Nathan applies it. He asks "What must be true one week before?", and an agent writes a view with the map `table`. Each condition has a process: the venue page, the sign-up count, a check that the treasurer confirms. "Run now" runs a process, and the canvas shows which parts hold.

The surface is the **Workbench** of Steel (the page `/ite`). This shard gives the agent side: the model, the file forms, the quality rules, and the workflows of the jobs.

## The Terms

One term has one meaning. Use these terms in each file, each view, and each result.

| Term | Meaning |
|---|---|
| Program | The model of one system: a root note in the Mesh (type `(Program)`), and the tree of parts below it. An OrbCode project is a program of the template `software`. |
| Part | One note of a program, of any type. A note is a part when its `parent` chain reaches the root note. |
| Type | The type of a note: the last `(Type)` word of its file name. A type note in `Mesh/Metadata/Types/` with a `type` block gives its fields, capabilities, connections, and look. The wire field `kind` is the type id. |
| Capability | One thing that the core does with a part of a type: `covers-files`, `covers-boundary`, `has-claims`, `runnable`, `decides`, `dated`, `has-status`, `owner`, `container`. |
| Connection | A typed link between two parts: a frontmatter key, defined by a connection note. `parent` is not a connection: it is the containment. |
| Template | The start of a new program: its types, connections, views, and questions, and the instruction for the agent. |
| Main map | The tree of the parts by `parent`. Each program has one main map. See The Main Map. |
| Level | The children of one part (or of the root) on the main map. A level holds at most `max-children` parts. |
| Subsystem | A part of the main map with children. A person opens it by zoom. It is not a separate program. |
| Coverage | How much of the system the parts cover: the files of the product for software, the items of the boundary for a living system. |
| View | One map for one question of one program: a file of `Steel/Programs/<P>/Views/`. It names its map and its slice. |
| Map | A renderer of `Steel/Maps/`. A builtin shape (`flow`, `streams`, `layers`, `tree`, `table`, `free`, `timeline`, `board`) is a map that Steel draws natively. |
| Node | One card on a canvas: a part, or a section of a view. |
| Claim | A statement of a part about reality: `is`, `ought`, or `will`. It is meaning, in the field `claims` of the part. |
| Process | One way that the model touches reality: code, an agent request, or a person's check. It writes observations, and it never changes the system. It owns its trigger. |
| Observation | One record that a process writes: what it saw, about which part, when. |
| Log | The records of one program on this machine: `.flint/steel/logs/<program id>.jsonl`. |
| Grounding | The summary state of a part from its processes: `grounded`, `partial`, `failing`, `stale`, `unobserved`, `no-contact`. |
| Instruction | What makes the system move: a text, a skill or a workflow of a shard, a script of a repository, or a person. It stays outside the model. |
| Instruction map | A branch of the main map: a root part with the block `instruction-map`, and steps below it that point to their instructions. |
| Run | One walk of an instruction map, with its record. |
| Proposal | A change that waits for a person: a map change, a view candidate, or a revision. It is a file of `Steel/Programs/<P>/Proposals/`. |
| Candidate | A complete view file that an agent wrote and that waits for the apply of a person. |
| Finding | One problem that a command computes about a program. |
| Job | One agent session that a person starts on nodes. |
| Presence | The mark of a live agent session on the nodes of its focus. |
| Focus | The nodes that a person selected to see alone. For an agent: the nodes that it works on now. |
| Workbench | The ITE surface in Steel. |

## The Five Planes

| Plane | Question | Home | Writer |
|---|---|---|---|
| Main map | What are the parts of the system? | The root note and the parts, in the Mesh | A person or an agent, only through a map change (one writer of the structure) |
| Views | How does a person want to see the system? | One view file of `Steel/Programs/<P>/Views/` for one question, drawn by a map | A person (direct), or an agent (through a candidate) |
| Processes | Where does each claim touch reality, and how do we check it? | `Steel/Programs/<P>/Reality/<folder>/process.md` | A person or an agent |
| Log | What did a process see? | `.flint/steel/logs/<program id>.jsonl` on this machine | Only a command: the one door (`flint ite process observe`, Run now, the routes) |
| Work | Who works on which node now? | Orbh sessions with a focus, and the runs of the instruction maps | Orbh, `flint ite focus`, and the run engine |

## A Writer Writes Meaning, a Command Computes Facts

A program holds **meaning**: the root note, the parts, their prose, their types, their links, their claims, the views, and the processes. A program never holds a **fact** that a command computes:

- No grounding state, no observation, no count of checks, and no time of a check.
- No finding.
- No position of a card. Only the engine writes `State/*.json`.
- No presence of an agent.
- No accepted value, no state of a claim, no item of the brief, and no vital sign of a living system.

**Only a command writes an observation.** A person, an agent, and a process each send an observation through the one door: `flint ite process observe` (or the route). Never write an observation into a file of the Mesh or of `Steel/`. Never edit or remove a line of the log (`.flint/steel/logs/<program id>.jsonl`): it is a record of this machine, as the runs of Orbtest are.

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
├── Views/(View) <Title>.md                          # one file for each view (ite-view/2)
├── Reality/<folder>/process.md                      # one folder for each process (steel-process/1), with its code
├── Proposals/<id>.md                                # map changes (mc-*), view candidates, revisions (only the engines write here)
├── Runs/(Run) <title> <stamp>.md                    # one record for each run (only the run engine writes here)
├── History/<view-slug>-<stamp>.md                   # a replaced form of a view (the newest 5 are kept)
└── State/main.json, <view id>.json                  # positions and pins by part id (only the engine writes here)

Steel/Maps/<Map Name>/map.md + index.js              # a map (a renderer)

.flint/steel/logs/<program id>.jsonl                 # the one log of a program (this machine)
.flint/steel/cache/                                  # caches
```

A folder is for a person: the identity of a part is its `id`, and its membership is its `parent` chain. A part can live anywhere in the Mesh. A Task or a Person can be a part: its `parent` names a part of the program. Each note has one home: another program links to it with a connection, and does not contain it.

An OrbCode project (`Mesh/OrbCode/(OrbCode Project) <Name>/`) is a program of the template `software`. Its parts are in `Map/`, its root is the project note, and its main map changes only through a map change that a person applies. Its map changes are in `Steel/Programs/<Name>/Proposals/`. Its views stay in the project (`Views/`, `Candidates/`, `History/`) and change only through the OrbCode shard (`flint shard start orbc`). Never write a file of an OrbCode project with an ITE workflow in another way.

## The Root Note

`Mesh/Programs/(Program) <Name>/(Program) <Name>.md`. Make it with `flint ite create "<Name>" --template <id> --purpose "<text>"`; the form is [[tmp-ite-program-v0.1]].

| Field | Value |
|---|---|
| `format` | `ite-program/2` |
| `id` | A UUID v4. It never changes. It is the id of the program in `Steel/` and in the log. |
| `tags` | `"#ite/program"` |
| `purpose` | One sentence: what the system is, and why a person models it |
| `status` | `active` or `archived` |
| `types` | The type names that the program uses, for example `[Goal, Milestone, Step]` |
| `from-template` | The id of the template that made the program. History only: nothing decides with it. |
| `main-map` | Optional: `max-children` and `coverage-ignore` (see The Main Map) |
| `codebase`, `product-root` | Software only: the codebase and the folder of the product |
| `template`, `authors`, `orbh-sessions` | The Flint conventions |

A living system adds one fenced `system` block to the body (see Living Systems). The root note has no `framework`, `include`, `sources`, or `place`.

Example (the program Club Launch Night of this Flint):

```yaml
---
format: ite-program/2
id: dc6779bd-6476-4837-a444-aea795713354
tags: ["#ite/program"]
purpose: "An example that shows how the ITE models an event: the launch night of a new makers club in Sydney on Thursday 12 November 2026."
status: active
types: [Goal, Milestone, Deliverable, Person, Role, Venue, Resource, Task, Step, Risk, Budget, Note]
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
claims:
  - { id: venue-booked, mode: is, about: "The hall is booked for 12 November, 17:30 to 22:00." }
template: "[[tmp-ite-part-v0.1]]"
authors: ["[[@Nathan]]"]
---

# (Milestone) Venue booked

Priya booked the hall on 24 September 2026. The booking holds the hall from 17:30 to 22:00. The set-up starts at 17:30, and the hall must be empty at 22:00.
```

The rules of the read:

1. **The type.** The last `(Type)` word of the file name. A note with no `(Type)` word has the type `note`. A change of type is a rename (a map change `rename` with `kind`), and each wikilink changes with it. The part has no field `kind`.
2. **The membership and the parent.** `parent`: one wikilink to the parent part, or to the root note for a top part. A note is a part when its `parent` chain reaches the root note. A part has no field `program`, `include`, or `place`.
3. **The id.** The frontmatter `id` (a UUID) is the key everywhere: each view heading, process, record, state, and proposal names the part by its id. Never change it.
4. **The links.** Each frontmatter key whose value is one wikilink or a list of wikilinks gives one link for each wikilink, with the key as the connection (`next`, `uses`, `depends-on`, `informs`, `owner`). These keys give no link: `id`, `tags`, `parent`, `template`, `from-template`, `authors`, `orbh-sessions`, `artifacts-created`, `generated-by`, `run-step`, `run-visit`. A wikilink in the prose gives a link of the connection `mentions`.
5. **The claims.** `claims`: a list of `{ id, mode: is|ought|will, about, ... }`. A process gives the value of an `is` claim. A part has no field `contact`: a process holds what a contact held.
6. **The text.** The body below the H1, up to the first heading `# Contact` or `## For a developer`. The H1 is for a person; no code reads it.
7. **The title.** The file name after the `(<Type>)` word, with no number at its start: a number there reads as the number of an artifact, as in `(Task) 1099 ...`. Start a title with a word: "A full hall and 30 new members", not "80 guests".

**One writer of the structure.** Each change of the tree (add, move, rename, merge, remove, a change of type) is a map change. A person's hand change applies at once, with Undo. `flint ite part add` and `part remove` make a map change: a person's change applies at once, and an agent's change is a proposal. `flint ite part set` changes only the prose, the claims, and the fields that are not structure: it refuses `title`, `kind`, and `parent`.

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
capabilities: [has-claims, dated, has-status, container]
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
| `has-claims` | Evaluates its claims; a process can feed them |
| `runnable` | A run can visit it as a workstep |
| `decides` | A run waits for one outcome of a fixed list |
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

The connection capabilities: `rolls-up` (the main map shows the link at each level as a relation with a count) and `orders-run` (a run follows it: `next`). A connection with no capability is a plain reference. `mentions` (a prose link) is a builtin connection. `parent` is not a connection.

**A template** is the start of a new program: `Mesh/Metadata/Templates/(Template) <Name>.md` (this Flint), or `Shards/<Shard>/templates/tmp-<sh>-program_<id>-v<X.Y>.md` (a shard). A template is an instruction for the agent that models a system of that kind, with one fenced `template` block that Steel reads for the New program dialog. The form is [[tmp-ite-template-v0.1]].

````markdown
```template
format: steel-template/1
id: event
title: Event
types: [goal, milestone, deliverable, person, role, venue, resource, task, step, risk, budget, note]
connections: [next, uses, depends-on, owner, informs, mentions, blocks]
views: [{ map: timeline, question: "What must be done before the doors open, and by when?" }]
questions: ["Who does what on the night?"]
```
````

`flint ite create` copies the types of the template into the root note (`types`) and writes `from-template`. After that, nothing reads the template. The ITE shard gives six templates: `software`, `process`, `event`, `research`, `organisation`, and `general` ([[tmp-ite-program_event-v1.0]] and the others). Follow the instruction of the template when you model a new program. Add a type, a connection, or a template only when none fits, and when the person agrees.

## The View File

A view is one Markdown file of Steel/, not of the Mesh: `Steel/Programs/<Name>/Views/(View) <Title>.md`, in the format `ite-view/2`. It has the grammar of an OrbCode view. The form, the eight builtin shapes, and one complete example are in [[tmp-ite-view-v0.1]].

| Field | Value |
|---|---|
| `format` | `ite-view/2` |
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
4. The node block: `kind` (a type id); `layer`; the relations `next`, `uses`, `blocks`, `informs`, `depends-on` (lists of heading ids of the same view: part ids or slugs); `inside`, `actor`, `action`, `result`; `date` (map `timeline`); `status` (map `board`). It has no `ref`, no `part`, and no `contact`.

The nodes of a view are its headings, and each part of its `slice` that has no heading (with the title and the prose of the part). A node of a part shows the type, the note, the fields, and the grounding of the part: the grounding comes from the processes of the part. The prose of the view stays under the part id, so it survives each refactor of the main map.

## Maps

A map is a renderer: `Steel/Maps/<Map Name>/` with a manifest `map.md` (`format: steel-map/1`, `id`, `title`, `entry: index.js`, `needs: { capabilities, connections, fields }`, and prose for a person) and one plain JavaScript ES module (no build). The module exports `render(root, api)`. The form and one complete example are in [[tmp-ite-map-v0.1]].

1. **A map only draws.** It reads one read model through `api.model` (the program, the types and connections that it uses, the parts with their fields, claims, and grounding, the links, the view, and the saved state), and it draws again on `api.onModel(fn)`. The core computes each fact.
2. **A map sends intents.** `api.select(ids)`, `api.open(partId)`, `api.propose(ops, reason)` (a map change: a person's hand change applies at once, with Undo), and `api.saveState(state)`. It never writes a file.
3. **A map runs in a sandbox.** Steel runs it in an iframe with `sandbox="allow-scripts"`. It cannot read a file, call a route, or reach the network.
4. **A view names its map.** `map: <map id>` in a view. Steel draws a builtin shape natively, and each other map in the sandbox.
5. **A map says what it needs.** Steel offers a map for a program when the types of the program meet its `needs`.

This Flint has three example maps: **Outline** (`outline`: the tree of the parts with their types and grounding), **Owners** (`owners`: the parts grouped by the connection `owner`), and **Status Board** (`status-board`: columns by the field `status`).

| Route | What it gives |
|---|---|
| `GET /api/steel/maps[?program=<p>]` | The maps, each with its `needs`; with a program, whether the program meets them |
| `GET /api/steel/maps/:id/module` | The JavaScript text of one map |
| `GET /api/steel/programs/:program/model[?view=<id>]` | The read model of a program, and of one view |
| `PUT /api/steel/programs/:program/model/state` | The saved state of a map in one view: `State/<view id>.map.json` |
| `GET /api/steel/programs/:program/candidates` | The view candidates of a program in `Proposals/`, in each state |

## Processes and the Log

A **process** is one way that the model touches reality. It checks one or more parts of a program and gives observations. It never changes the world: code that changes the world is an instruction, outside the model. A process lives in `Steel/Programs/<Program>/Reality/<id>/process.md` (`format: steel-process/1`). Its form is [[tmp-ite-process-v0.1]].

A process has three forms. Each form gives the same result: observations.

| Form | Manifest | Run now |
|---|---|---|
| Code with a ready process | `by: code`, `uses: file\|http\|mesh\|command\|reference\|note\|orbtest\|git\|npm`, `settings` | The core runs the ready process with the settings, and gives one observation for each part. |
| Code with its own entry | `by: code`, `runtime: node\|python\|exec`, `entry`, `timeout` (default 60s) | The core runs the entry in the process folder with `FLINT_ROOT`, `STEEL_PROGRAM_ID`, `STEEL_PROCESS_ID`, `STEEL_PARTS` (JSON), and the values of `flint.env` and `flint.env.local`. Each line of the output that is one JSON object is one observation. |
| An agent request | `by: agent`, `prompt`, `target` (optional) | One Orbh session starts with the prompt, the parts, the claims, and the door command. The agent reports each part with `flint ite process observe`. The text of its result is not an observation. |
| A person's check | `by: person`, `claim`, `who` (optional) | The result is `pending`. Steel asks the person in the panel Reality of the part, and the answer is the observation. |

Each process names its parts by their ids (`parts`), and it can name the claims that it gives a value to (`feeds`). `expect-every` (`12h`, `7d`, `30d`) is a promise, not a trigger. With `settings.from-part`, a ready process reads fields of each part in place of fixed settings: each OrbCode project has the process `orbtest-proof` (`stories`, `criteria`) and the process `code-refs` (`code-refs`).

**One door.** Each observation comes in through one door: `flint ite process observe`, or the route `POST /api/steel/programs/<program>/observations`. The door checks the observation against the process (the process exists, the part is a part of the process, the observation has a `state` or a `value`), and it records the actor: `person:<Name>`, `agent:<session id>`, `process:<id>`, or `run:<id>`. An agent or a person never writes an observation into a file.

**The log.** Each program has one log on this machine: `.flint/steel/logs/<program id>.jsonl` (the header `ite-system-log/1`, then one record for each line with `seq`, `at`, and `kind`). An observation record holds `process`, `part`, `claim`, `state` or `value`, `summary`, `evidence`, `observed_at`, `received_at`, and `by`. The log of a living system holds its other records too (`read`, `notice`, `ack`, `detection`, `clearance`, `escalation`, `prompt`, `brief-opened`). Git ignores the log: it is a fact of this machine.

**Who starts a process.** The core never starts a process by itself, and `flint sync` does not schedule it. A person or a run asks for it (Run now in Steel, or `flint ite process run`). A process that must run on a schedule starts itself with its own means: a schedule of the module `crons`, an Orbh cron, a live module, or a hook that calls `flint ite process run "<program>" <id>`.

**The grounding.** The grounding of a part comes from the newest observation of each (process, part) pair in the log. A pair with no observation is `unobserved`. An observation that is older than `expect-every` is `stale`. A value observation counts as `holds`. An `orbtest` process counts each criterion. The grounding of a part is, in this order: `no-contact` (no process checks the part), `failing`, `stale`, `grounded`, `partial`, `unobserved`. A group, a view, and a program add the counts of their parts.

**The findings.** `flint ite check` gives the findings of the processes, and runs no process:

| Code | Level | When |
|---|---|---|
| `no-contact` | note | A part that makes a claim has no process. |
| `process-no-part` | warning | A process names a part that is not a part of the program. |
| `process-late` | warning | A process with `expect-every` has no observation that new. |
| `process-fails` | error | The newest observation of a process for a part fails, or the check had an error. |
| `process-unobserved` | note | A process has no observation yet for a part. |
| `process-invalid` | error | The manifest of a process has a problem. The process does not run. |

**The migration.** `flint ite migrate` (the step `processes`) makes each `contact` item of a part or of a view node into one process folder (`human` gives a person check, `agent` an agent request, each other kind a code process with `uses`; `fresh-for` gives `expect-every`), drops the field `contact`, and moves the prose of the `# Contact` section into the process. Each record of `.flint/ite/observations/` goes into the archive of this machine, `.flint/steel/archive/observations/<program id>.jsonl` (machine records; the core never reads them), and the newest 10 observations of each (process, part) pair also go into the live log. An old store goes only when the archive has each of its records. A program that fails makes the step fail.

### The Commands of a Process

| Command | Result |
|---|---|
| `flint ite process list "<program>" [--part <id>]` | The processes of a program, with the form, the state of each part, the parts, and `expect-every`. A late process says `late`. Writes nothing. |
| `flint ite process show "<program>" <process>` | One process: its file, its settings or prompt or claim, its problems, the state of each part, and its newest observations. Writes nothing. |
| `flint ite process run "<program>" <process>` | Run now: a code process runs on this machine; an agent process starts one Orbh session; a person check gives `pending`. Each observation goes through the door. Exit 1 when the run fails. |
| `flint ite process observe "<program>" <process> [--part <id>] [--claim <id>] --state holds\|fails\|error \| --value <v> [--type <t>] --summary "<text>" [--evidence <kind>=<value>]...` | The one door: records one observation in the log of the program. The default part is the only part of the process. In an Orbh session the actor is `agent:<session id>`, else `person:<Name>`. |

## Proposals: The Candidate and the Apply

Each change that waits for a person is a file of `Steel/Programs/<P>/Proposals/`: a map change (`mc-*`, see The Main Map), a view candidate, or a revision of a living system. Each engine keeps its own file form. A proposal outside the Mesh is safe from a rename of the Mesh, so its bytes stay exact for a revert.

A person changes a view directly (the Workbench, or by hand). **An agent changes a view only through a candidate**: a complete view file `Proposals/<candidate-id>.md` in the format `ite-view/2`, with `view_id`, `base_hash`, and `state: proposed`.

1. The candidate id is `<view-slug>-<UTC yyyymmdd-hhmmss>`. The view slug is the H1 in lower case, with each run of other characters than `a-z` and `0-9` replaced by one `-`.
2. A new view: `view_id` is a new UUID, `id` is a second new UUID, `base_hash: null`.
3. A reshape: `view_id` is the `id` of the view, `id` is a new UUID, and `base_hash` is the SHA-256 hex of the bytes of the view file (`shasum -a 256 "<view file>"`), computed before you read the view.
4. Verify with `flint ite check --candidate <id>` (exit 0: no error finding of the candidate) and `flint ite diff --candidate <id>` (no conflict). `flint ite check <program>` reads the main map and the views, not a candidate.
5. The apply (`flint ite apply --candidate <id>`, or the Workbench) replaces the view only when the hash of the view file is `base_hash`, and writes the replaced form to `History/`. A conflict writes nothing. The apply and the discard keep the candidate file: they set `state: applied` or `state: discarded`.
6. In an interactive session, apply only when the person agrees. In a headless session, never apply and never discard the candidate that you return.

## The Main Map

The **main map** of a program is the tree of its parts by `parent`. Each program has one main map. A subsystem is a deeper level of the same main map, not a separate program: a person opens it by zoom in the Workbench. The views of the program name the parts of the main map by their ids. An OrbCode project is a program of the template `software`, and its static map is its main map: the code is its sources.

### The Tree

- **The root is the root note.** Each part has one `parent`: one wikilink to the parent part, or to the root note for a top part. A note is a part when its `parent` chain reaches the root note.
- **The 100% rule.** The children of a part together are the whole part: each source of the part belongs to one child. Nothing of the system is outside the tree, and nothing is in it two times.
- **The size limit.** A level holds at most `max-children` parts (default 9). A part with exactly one child is a finding: merge the child into the part, or give the child its siblings.
- **Relations are free, and they roll up.** A link of a connection with `rolls-up` (`uses`, `depends-on`, `blocks`, `artifact-refs` of OrbCode) shows at each level as one relation between the two cards whose subtrees hold its two ends, with the count and the connection keys. A link inside one card does not show. A wikilink in the prose (`mentions`), `sources`, and `code-refs` do not roll up.
- **Coverage.** Software (a part of a type with `covers-files`, in an OrbCode project or a program with `codebase`): each file of `git ls-files` of the product root is covered when one `code-refs` entry of a part is the file, or a folder that holds it (a folder ends with `/`). A file that no part covers is a gap. A file that two leaves cover with a whole-file or folder ref is an overlap. A ref of a part that is not a leaf covers its files and makes no overlap. A slice (`path#symbol` or `path:Lx-Ly`) covers its file and never makes an overlap. The counts are of the time of the read. A living system: each item of `boundary.inside` is covered when one of its `parts` names a part. Another program: the coverage is not computed.
- **Views name parts by id.** A view node that stands for a part has the part id as its heading id. Each part lists the view nodes that look at it.

The configuration is in the frontmatter of the root note (or of the OrbCode project file). Each key is optional:

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
| `map-too-many-children` | warning | A level has more than `max-children` parts. | `split`, `merge`, `move` (the job `map-refactor`) |
| `map-single-child` | note | A part has exactly one child. | `merge`, or `add` the siblings |
| `anchor-missing` | warning | A view node names no part of the main map. | Reshape the view, or `add` the part |
| `anchor-none` | note | A view node has no part (a slug heading id). | Give it its part, or keep it as a concept of the view only |
| `coverage-gap` | note | Files that no part covers (one finding on the root, with the count). | The job `map-cover` |
| `coverage-overlap` | warning | Two leaves cover one file. | `edit` the sources of one leaf |
| `code-ref-missing` | warning | A `code-refs` entry matches no file. | `edit` the sources (the job `map-update`) |
| `map-change-stuck` | error | A map change is `applying` or `reverting`: a write did not finish. | The next write of the change engine recovers it |

### The Map Change

Each change of the tree is a **map change** (`ite-map-change/1`): one file `Steel/Programs/<P>/Proposals/mc-<yyyymmdd-hhmmss>-<slug of the reason>.md`, with the list of operations, the hash of each file at the propose, and a preview of the tree before and after. Only the change engine writes a map change.

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
4. **A refactor keeps the links valid.** A `rename` and a `merge` rewrite each wikilink to the old part in the Mesh. The views, the processes, the runs, and the log name parts by id, so a refactor breaks none of them.
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

1. **A job of the main map changes the main map only through a map change.** It never writes a part file with its own tools.
2. **Never apply a map change, and never revert one.** Only a person does. A headless session never discards the change that it returns.
3. **One change for one job, and read the waiting changes first.** Run `flint ite map change list <program> --state proposed`, then `flint ite map change show <program> <change id>` for each one. Do not propose what a waiting change does already. Do not `edit` or `move` a part that a waiting change moves or edits: the later change gets a conflict (`changed`) at the apply.
4. **Read the preview before you return.** The tree after must have no new finding of the level error, and no new `map-too-many-children` that the job could avoid.
5. **The quality rules apply to each new part**: the words of the person, a type of the program, a title of two to six words, one sentence that says what the part is, and sources that you read (never invented paths).

### The Jobs of the Main Map

| Template | Nodes | Workflow (headless / interactive) | The agent does |
|---|---|---|---|
| `map-create` | None | [[hwkfl-ite-map_create]] / [[wkfl-ite-map_create]] | Reads the sources and drafts the root and level 1: 3 to 9 parts, each with one sentence and its sources |
| `map-expand` | 1 part | [[hwkfl-ite-map_expand]] / [[wkfl-ite-map_expand]] | Takes one part one level deeper: 3 to 9 children that cover the sources of the part |
| `map-refactor` | 0 or 1 (the focus) | [[hwkfl-ite-map_refactor]] / [[wkfl-ite-map_refactor]] | Brings one level to the size limit: split, merge, move, rename |
| `map-cover` | 0 or 1 | [[hwkfl-ite-map_cover]] / [[wkfl-ite-map_cover]] | Places the gap files: `edit` the sources of a part, or `add` a part |
| `map-update` | 1 part | [[hwkfl-ite-map_update]] / [[wkfl-ite-map_update]] | Updates one part from its sources now: `edit`, and `add` or `remove` of children |

The prompt of a map job holds the level of the focus (the cards, the relations, the findings), the coverage gaps (at most 200 paths), the form of each operation, and the last step: `flint ite map change propose "<program>" --ops - --reason "<one sentence>"`.

## Instruction Maps and Runs

A program of the ITE is executable. An **instruction map** is a branch of the main map whose steps point to their instructions. A person runs it step by step, with the Workbench as the externalized working memory; an agent or a command runs a step of an `ite-flow/2` map of a living system. A view with `map: flow` and `slice: { below: <root part id> }` draws the map. The view does not say the order: `next` and `outcomes` on the parts say it. The form is [[tmp-ite-instruction_map-v0.1]].

### The Terms of a Run

| Term | Meaning |
|---|---|
| Instruction | What makes the system move: a text, a skill or a workflow of a shard, a script of a repository, or a person. It stays outside the model. A step points to it with `does`. |
| Instruction map | One root part with the frontmatter block `instruction-map`, and the step parts below it. |
| Step | A part below the root of a type with the capability `runnable` (a workstep) or `decides` (a decision). The step id in a run is the part id. |
| Decision | A step whose completion is an answer: one outcome, from a fixed list. |
| Transition | `next` of a workstep, or one outcome of a decision. |
| Run | One walk of an instruction map, by an actor, on inputs, with a status and a record. |
| Visit | One entry of control into a step. A loop makes a new visit. |
| Event | One accepted fact of a run, with a sequence number. |
| Output | A value that a step produces: a small value in the run, or a part in the Mesh. |
| Run record | The record of a run in `Steel/Programs/<P>/Runs/`: the snapshot, the events, and a rendered summary. |

### The Rules of an Instruction Map and a Run

1. **The root.** The root part has one frontmatter block `instruction-map` ([[tmp-ite-instruction_map-v0.1]]):

   ```yaml
   instruction-map:
     format: ite-flow/2          # ite-flow/1 (or no format): only steps of a person
     id: ship                    # unique in a living system
     title: "Ship Flint to canon"
     entry: "[[(Program) Flint Release . (Step) Write the ship summary]]"
     exits: ["[[(Program) Flint Release . (Step) Ship to canon]]"]
     inputs: [{ name: head, kind: text, required: true, statement: machine-head }]
     authority: { run: ["person:Nathan"], approve: ["[[(Program) Flint Release . (Step) Ship to canon]]"], irreversible: ["[[(Program) Flint Release . (Step) Ship to canon]]"], approvers: ["person:Nathan"] }
   ```

2. **A workstep** is a part below the root, of a `runnable` type (for example Step) ([[tmp-ite-instruction_map-v0.1]]):

   ```yaml
   parent: "[[(Program) Flint Release . (Step) Shipping to Canon]]"
   next: ["[[(Program) Flint Release . (Step) Ship to canon]]"]
   does:
     by: person                  # person | agent | command
     who: Nathan                 # for a person to read
     instruction: "Press Begin. Then run ndv repo ship flint."   # a text, [[a skill or a workflow]], or a path in a repository
     executor: { target: "claude/o55xh", timeout: 30m }          # agent: target; command: run, cwd; both: timeout, idempotent
   inputs: [{ name: options, kind: notes }]
   outputs: [{ name: summary, kind: text }]
   done-when: "The summary has one line."
   precondition: [no-pull-debt]                                # ought claims
   effect: [{ claim: canon-shipped-from, equals: "${inputs.head}" }]   # is claims that a process must observe
   completion: { after: dispatched, within: 2h, on-timeout: unknown }
   ```

   `effect` makes the completion `evidence`: the step stays pending until the log of a process that feeds the claim confirms the value. A `next` to a part that is not a step of the map is a warning, and a run does not follow it.
3. **A decision** is a part below the root, of a type with `decides` (for example Decision): `question`, `outcomes: { "<outcome>": "[[<step>]]" }`, and `does: { by: person }`. Its answer is the value `<step id>.answer`.
4. **The transitions.** A workstep that is not an exit has exactly one `next` in the map. A decision has one step for each outcome. A loop goes only out of a decision; the engine bounds each step at 20 visits for each run. A step `by: agent` or `by: command` is a refusal in an `ite-flow/1` map.
5. **The run keeps a snapshot.** The record holds the resolved map (each step by its part id, with its instruction) and its sha256 as the revision. An edit of a step after the start makes a new revision for the next run; an active run stays on its snapshot. A run record of a flow view of before Task 1235 keeps its snapshot and stays readable.
6. **The record is an append-only event log.** The state is derived from the events. Each write runs in the lock of the Flint with `expected_seq` and `request_id`.
7. **The engine is the only writer of a run record.** Never create, edit, or delete a file in `Steel/Programs/<P>/Runs/`. A person writes below `# Remarks` only.
8. **Outputs.** A small value (`text`, `number`, `choice`) lives in the events. An output of the kind `note` or `notes` is a part of the program (`parent` is the root note), with `generated-by`, `run-step`, `run-visit`, and the `link` relation of the output spec.
9. **"Done" has one mode in an `ite-flow/1` map.** A person confirms, with outputs that pass the output schema. In an `ite-flow/2` map, the Done of a step with an `effect` is only a report.
10. **The migration.** `flint ite migrate` turns each flow view into an instruction map: a root part (the one parent of the step parts, or a new part `(Instruction Map) <title>` in `Map/`), one part for each step, and the instruction of each step library workstep copied into its step. The view keeps `map: flow` and gets `slice.below`. The step libraries go.

### The Commands of an Instruction Map

The verbs are `flint ite flow <verb>`. Each takes `--json`. `<map>` is the root part of an instruction map: its id, its note name, or its title. `<run>` is the run id, a prefix of 8 or more characters, the file stem of the run record, or the title. Each write of a run takes `--request-id`, `--expected-seq`, and `--at`.

| Command | Result | Writes |
|---|---|---|
| `flint ite flow list <program>` | The instruction maps of the program, with the root part and the findings | Nothing |
| `flint ite flow show <program> <map>` | The resolved map: the root part, the steps in order by title, the decisions and their outcomes, the refusals | Nothing |
| `flint ite flow start <program> <map> [--title "<t>"] [--input name=value]...` | Starts a run; prints the run id and the first step | The record |
| `flint ite flow runs <program> [--status <s>]` | The runs, the newest first | Nothing |
| `flint ite flow status <run>` | The state: the status, the active visit with its instruction, its inputs, and its output form, the path so far | Nothing |
| `flint ite flow done <run> [--output name=value]... [--note name="Title"]... [--text name="..."]... [--notes name="line1;line2"]...` | Completes the active visit; `--note` gives the title of a `note` output and `--text` its body; `--notes` gives the lines | The record and the output notes |
| `flint ite flow answer <run> <outcome>` | Answers the active decision | The record |
| `flint ite flow skip <run> --reason "<text>"` | Skips the active visit (only a step with no required output) | The record |
| `flint ite flow pause\|resume\|cancel <run> [--reason "<text>"]` | Changes the status | The record |
| `flint ite flow dispatch <run>` | Dispatches the active visit: an agent or a command step, or the Begin of a person step | The record, an Orbh session or a command |
| `flint ite flow approve <run> --step <step> [--refuse] [--reason "<text>"]` | Approves or refuses one step (`<step>`: its part id or its title). A person only. | The record |
| `flint ite flow reconcile <run> [--attempt <id>] [--decision <d>]` | Checks the pending effects against the log now, or closes an unknown attempt | The record |
| `flint ite flow waive <run> --attempt <id> --reason "<text>"` | Waives one pending or unknown effect. A person only. | The record |

The exit codes are the exit codes of `flint ite`: 0 done; 1 a finding of the level error, a refusal of the flow, or a conflict; 2 a refusal of the input.

## Living Systems

A **living system** is a system whose actors act through its own model: the work writes the map, each claim shows its source and its age, and an action stays pending until an observation confirms its effect. A program becomes a living system when its root note has one `system` block. A program with no block has no brief, no claims to evaluate, and no vital signs.

Steel is the tool through which a person constructs a living system, reads it, runs it, and develops it. The code keeps the name `ite` (`flint ite`, the page `/ite`). In this Flint, the program Flint Release is the first living system: read its root note, its parts, its processes in `Steel/Programs/Flint Release/Reality/`, and its instruction map "Shipping to Canon" as the reference forms.

### The Terms of a Living System

These terms add to The Terms and to The Terms of a Run. One term has one meaning.

| Term | Meaning |
|---|---|
| System | A program with a `system` block in its root note |
| Root | The root note of a system: the boundary, the owners, the goals, the maps, and the connections. It is an index, not the one truth. |
| Boundary | What is inside the system, what is outside, and what is unknown: a decision of a person, with a date and a reason |
| Connection | What crosses the boundary to another system: imports, exports, and the integration that carries them |
| Claim | Something that the map asserts about the system, with a **mode**. One item of the `claims` list of a part. (Old: statement.) |
| `is` | The mode of a claim about the present or the past. A process, a person, an agent, or a run gives its value. |
| `ought` | The mode of an expectation that must hold, with an owner |
| Goal | An `ought` with an owner and a reason, named in `goals` of the system block |
| Limit | An `ought` that the system must never leave. It escalates at once. |
| `will` | The mode of a prediction, with a probability `p` and an instant `resolves` |
| Process | One way that the model touches reality (`Steel/Programs/<P>/Reality/<folder>/process.md`). A process **feeds** a claim when it names the claim in `feeds`. (Old: instrument.) |
| Ready process | A process of the core that a process folder names with `uses`. A living system adds `git` and `npm`. |
| Late | A process whose newest observation is older than its `expect-every`. Its claims get old. (Old: a dead instrument.) |
| Observation | One record of the log (`ite-observation/2`): the process, the part, the claim, a `state` or a typed `value`, the time it was observed, and the time it was received |
| Log | The append-only file of one program on this machine: `.flint/steel/logs/<program id>.jsonl`. It holds the observations and the attention records. |
| Accepted value | The value that the reducer selects for an `is` claim from its observations |
| Evaluation | The state of a claim now, computed from its declaration, the log, and the time |
| Instruction | What makes the system move: an instruction map (see Instruction Maps and Runs) |
| Effect | The change in the world that a step with an `effect` must cause. It is `pending` until an observation of a process confirms it. |
| Brief | The page of attention: six sections of items, and the vital signs |
| Episode | One continuous interval in which the condition of an item of the brief is true. An acknowledgement and an escalation bind to one episode. |
| Revision | A candidate change of one file of the system, with a reason and a check, that a person applies and can revert |
| Protected change | A change that can weaken a check. Only a person applies it, and only through a revision. |
| Vital signs | Five measures, each from independent evidence: freshness, closure, use, surprise, coverage. No single score. |

Do not use "environment" (it is an Information Environment or an Orbtest environment), "statement" or "instrument" (old words), "turn" for an Orbh run, or "live" for "fresh".

### One Authority for Each Fact

| Fact | Authority | Writer |
|---|---|---|
| Parts, links, claims, the system block, prose | The Mesh | A person, an agent, or an applied revision. A protected change: a revision only. |
| Processes | `Steel/Programs/<P>/Reality/<folder>/process.md` | A person or an agent |
| Instruction maps | The root part with the `instruction-map` block, and its step parts | As the parts |
| Run control, attempts, receipts, approvals, the copy of the evidence | The run record in `Steel/Programs/<P>/Runs/` | The engine only |
| Observations, acknowledgements, escalations, prompts, detections, clearances | The log `.flint/steel/logs/<program id>.jsonl` | The commands only (the one door of the observations) |
| Revisions and their exact old bytes | `Steel/Programs/<P>/Proposals/` | The revision commands only |
| The accepted values, the evaluations, the findings, the brief, the vital signs | Nobody: a command computes them on each read | Nobody |

No file holds an accepted value, a state of a claim, an item of the brief, or a vital sign. Never write the log by hand, and never edit or remove a line of it.

### The System Block (`ite-system/1`)

One fenced ` ```system ` YAML block in the root note, under the H1 and the first paragraph. The keys are kebab-case.

````markdown
```system
format: ite-system/1
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
2. Each id in `goals` is an `ought` claim of the system. Another id is an error.
3. Each wikilink in `boundary.inside[].parts` is a part of the program. A boundary item with no part shows as unwatched.
4. The defaults: `timezone` `UTC`, `escalate-after` and `brief-since` `24h`, `authority` null (the owners run each instruction), `governor` null.
5. A prose edit of the root note keeps the block. Only a revision changes the block.

### Claims

A part declares its claims in a `claims` list in its frontmatter. A claim id is a slug, unique in the system.

```yaml
claims:
  - id: canon-version
    mode: is
    about: "The version of the CLI on origin/canon"
    property: origin/canon.version
    type: version
    fresh-for: 6h
  - id: monthly-release
    mode: ought
    owner: "[[@Nathan]]"
    about: "A release reaches main at least once in 30 days"
    holds-when:
      - { of: newest-release-at, op: age-lt, value: 30d }
    refute: "The newest commit on origin/main is older than 30 days"
    reason: "A user gets fixes within a month."
  - id: rc-ships
    mode: will
    about: "0.7.0 reaches main by 31 October 2026"
    p: 0.6
    resolves: "2026-10-31"
    holds-when:
      - { of: main-version, op: eq, value: "0.7.0" }
```

1. **An `is` claim gets its value from the process that names it in `feeds`.** A claim names no process. When the process is a ready process (`git`, `npm`), the claim gives `property`: the name of the value that it takes (`origin/canon.version`). A property that the process does not give is an error. A person, an agent, or a run can also report the value with `flint ite observe --claim` (give `type`). A report needs a process that names the claim in `feeds`.
2. **`type`** is `number`, `text`, `boolean`, `time`, `version` (semver), `sha`, `json`, or `verdict`. The default is the type of the property.
3. **`fresh-for`** is the time that an accepted value stays fresh (`1h`, `6h`, `7d`). With no `fresh-for`, the value never gets old: use that only for a fact that does not change.
4. **`selection`** is `newest`, `authoritative` (needs a process that feeds the claim), or `agree` (the default: two fresh values from two sources that differ give `conflict`).
5. **`ought`** and **`will`** have one or more `holds-when` predicates. Each must be true. A predicate has `of` (an `is` claim), `op` (`eq`, `ne`, `lt`, `le`, `gt`, `ge`, `match`, `exists`, `age-lt`, `age-gt`), and `value` or `value-of` (another `is` claim). `path` is a dot path into a `json` value.
6. **`will`** has `p` (0 to 1) and `resolves`: a date (it resolves at the end of that date in the `timezone` of the system) or a date-time. Quote a date, so that YAML keeps it as text.
7. **`owner`** defaults to the `owner` of the part, else the first owner of the system. Give a goal an owner and a `reason`.
8. The field `instrument` of a claim is gone. `flint ite migrate` moves it into the `feeds` of the process.

The states: an `is` claim is `fresh`, `stale`, `unobserved`, `conflict`, or `error`. An `ought` is `holds`, `at-risk`, or `unknown`. A `will` is `open`, `came-true`, `came-false`, or `unresolved`.

### The Processes of a Living System

A living system reads reality through the processes of its program (see Processes and the Log). A process feeds a claim when it names the claim in `feeds`. The two ready processes of a living system read Git and npm:

```yaml
---
format: steel-process/1
id: git-flint-remote
by: code
uses: git
parts: [2b11ea5e-3c55-498f-85d8-cf3c702b8b12]
feeds: [canon-version, canon-shipped-from, pull-debt]
expect-every: 30m
settings:
  repo: "@Flint"
  fetch: true
  refs: [origin/canon, origin/main]
  version-file: apps/flint-cli/package.json
  compare:
    - [origin/canon, nathan-main]
---
# Git read of the remote
The prose for a person.
```

| `uses` | `settings` | The values of one run |
|---|---|---|
| `git` | `repo` (`@<Codebase>` or a path), `refs`, `fetch`, `version-file`, `compare` | For each ref: `<ref>.sha`, `<ref>.time`, `<ref>.subject`, `<ref>.squashed-from`, `<ref>.version`. For each `compare` pair `[a, b]`: `<a>...<b>.left`, `<a>...<b>.right` |
| `npm` | `package`, `registry` (default `https://registry.npmjs.org`), `tags` (default `[latest]`) | For each tag: `<tag>.version`, `<tag>.integrity`, `<tag>.time`; and `modified` |

1. **The core never starts a process by itself.** `flint ite read "<program>"` (Run now) runs each `code` process of the system once. A process starts itself with its own means: a schedule of `crons`, an Orbh cron, a hook that runs `flint ite process run`.
2. **One run gives one observation for each value**, also when the value did not change. The observation names the claim that takes the value. The observations are the heartbeat of the process.
3. **`expect-every` is a promise, not a trigger.** Past it with no observation, the process is late: its claims get old, and the brief says so.
4. **A remote ref needs a fetch in the same run.** A `git` process with a ref under `origin/` must have `fetch: true`, else it is an error. A failed fetch gives one observation with the state `error` and no value. Put local refs in another process with `fetch: false`.
5. A late process does not change a value. It makes the value old.

### Instructions

The instruction of a living system is an instruction map: a root part with the `instruction-map` block, and step parts below it (see Instruction Maps and Runs). A step with an `effect` stays `pending` until an observation of a process after the dispatch makes each claim of the effect true. A report of a person or an agent never confirms an effect: an `effect` names claims that a process feeds.

### The Brief and the Vital Signs

The brief is the centre of a living system in Steel. It has six sections, in this order:

| Section | Items |
|---|---|
| `changed` | An accepted value that changed in the window |
| `at-risk` | An `ought` that is `at-risk`, or a `will` that came false |
| `old` | An `is` claim that is `stale`, `unobserved`, `conflict`, or `error`, and a process that is late |
| `unwatched` | A part with no claim that a process feeds, and a boundary item with no part. Actors and policies are left out. |
| `pending` | An effect that waits for evidence, an `unknown` attempt, an approval that waits, and a revision that waits |
| `surprises` | A difference that a process found before a person did |

Each item names its source and its age, and its owner. An item belongs to one **episode**: the interval in which its condition is true. An acknowledgement binds to one episode and stops only its escalation. A later failure of the same subject opens a new episode, which escalates on its own. An item that nobody acknowledges escalates after `escalate-after`; an `at-risk` limit escalates at once. The brief writes nothing: the commands that write the log (`read`, `observe`, the run commands) also write the `detection`, `clearance`, and `escalation` records.

The five vital signs come from evidence, each on its own. There is no single score.

| Vital sign | What it counts |
|---|---|
| Freshness | The `is` claims by state |
| Closure | The effects that an observation confirmed, over the effects that need confirmation. Waived, unknown, and failed effects show apart. |
| Use | The runs of the instructions of the system, the prompts that agents took from the system, and the days that a person opened the brief |
| Surprise | The episodes of `at-risk`, `came-false`, and `conflict`: found by the system or by a person |
| Coverage | The boundary items that a fresh `is` claim meets, with the exclusions and the unknown areas. Never a percentage of reality. |

### Revisions

A revision is a candidate change of one file of the system: a file in `Steel/Programs/<P>/Proposals/` (`ite-revision/1`). `flint ite revision propose` writes it. The id is `<kind>-<slug>-<yyyymmdd-hhmmss>`, and the kind is `part`, `statement`, `instruction`, `goal`, or `system`.

1. **The targets:** the root note, a part file, and a new part file. A revision of an instruction changes the root part or a step part of an instruction map. Never a file of `Steel/`, a file outside the program, or a symbolic link.
2. **The check** reads the whole system with the new bytes in place. A finding of the level error, or a refusal of an instruction map, stops the apply.
3. **The apply** writes the target only when its hash is the base hash, and keeps the exact old bytes in the revision file. **The revert** writes the old bytes back (or removes a new part) only when the target has the hash of the apply. A write that a crash cut is finished at the next read.
4. **A protected change** is a change of `holds-when`, `limit`, `selection`, `fresh-for`, `property`, or `goals`, the removal of a claim, a change of `authority` or `governor` of the system block, a change of the `authority` of an `instruction-map` block, and a change of `effect`, `completion`, or `precondition` of a step part. Only a person applies it, with `--protected`. Each other write path refuses a protected change with `forbidden` and the reason `protected-change`.
5. An active run keeps its snapshot. A new run uses the applied instruction map.

### Authority

**The actor comes from the caller, never from a request.** The CLI acts as `agent:<ORBH_SESSION_ID>` in an Orbh session, else as `person:<Name>`. The server acts as `agent:<session id>` for a request with the header `x-orbh-session-id`, else as the person of this machine. The trust boundary is this machine: the authority layer stops an honest agent from acting outside its policy, and it records who asked. A direct edit of a file is outside the enforced boundary. The next read shows its result, and a protected change made by hand shows as a finding.

The refusals: `not-allowed` (the actor is not in `run` or `execute`), `needs-approval`, `approval-stale` (another revision or other values), `governor-limit`, `agent-cannot-approve`, and `protected-change`.

### Unknown Forms

A claim of a form or a mode that this version does not know stays readable: Steel and the commands show what was written, and no engine evaluates it. A process with a problem in its manifest does not run, and the system shows the problem. No state is invented for an unknown form.

### The Rules of a Living System

1. **Never confidently wrong.** A stale, unobserved, or conflicting input makes an `ought` `unknown`, never `holds`. A late process makes its claims old. A failed fetch gives no value. A prediction scores as of its instant, never later.
2. **A Done is a report.** Only an observation of a process after the dispatch confirms an effect. A report of a person or an agent never confirms one.
3. **A protected change needs a revision** that a person applies. An agent proposes; it never applies a protected revision.
4. **Only commands write facts.** Never write the log, a run record, or a revision state by hand. Report a value with `flint ite observe --claim`, or an observation of a process with `flint ite process observe`.
5. **The core never starts a process.** A person, a run, or the process itself starts it.
6. **An agent never decides for a person.** An agent never approves, waives, or retries, and it never acts on the world unless the step that it executes says so.
7. **The system gives the instruction.** An agent of a living system takes its prompt from the system (`flint ite prompt`), not from a copy of the instruction in another text.

### The Commands of a Living System

Each command takes `--json`. `<program>` is the name or the id of a program with a system block. A program with no block refuses each command but `flint ite system` with `not-living`.

| Command | Result | Writes |
|---|---|---|
| `flint ite system "<program>"` | The root: the owners, the boundary, the goals with their state, the maps, the connections, the processes, the instructions, the vital signs | Nothing |
| `flint ite statements "<program>"` | Each claim with its state, its value, its source, and its age | Nothing |
| `flint ite evidence "<program>" <claim>` | The evidence of one claim: the observations, the process, the inputs of an `ought` | Nothing |
| `flint ite instruments "<program>"` | Each process of the system with its health (`late` when `expect-every` passed) | Nothing |
| `flint ite read "<program>" [--process <id>]...` | Run now: runs the `code` processes of the system once | The log |
| `flint ite observe "<program>" --claim <id> --value <v> [--type <t>] --summary "<text>"` | Reports the value of one claim | The log |
| `flint ite log "<program>" [--since-seq <n>] [--kind <k>] [--limit <n>]` | The records of the log | Nothing |
| `flint ite brief "<program>" [--since <d>] [--markdown]` | The brief | Nothing |
| `flint ite brief ack "<program>" <item> --episode <id> [--note "<text>"]` | Acknowledges one episode of one item | The log |
| `flint ite vitals "<program>" [--window <d>]` | The five vital signs | Nothing |
| `flint ite prompt "<program>" [--flow <id> --step <id>] [--attempt <id>]` | The prompt of the system for an agent; with no flow, the reconciliation prompt | The log (an agent only) |
| `flint ite adopt "<program>"` | A person adopts the protected declarations of the system as they are now | The baseline beside the log |
| `flint ite revision list "<program>" [--state <s>]`, `show "<program>" <id>` | The revisions; one revision with its diff | Nothing |
| `flint ite revision propose "<program>" --kind <k> --target <file> --content-file <path> --reason "<text>" [--base-hash <h>]` | Proposes a revision | `Proposals/` |
| `flint ite revision apply\|revert "<program>" <id> [--protected]`, `discard "<program>" <id>` | Applies, reverts, or discards a revision | The target, `Proposals/` |

The run commands of a living system (`flint ite flow dispatch`, `approve`, `reconcile`, `waive`) are in Instruction Maps and Runs.

The exit codes: 0 done; 1 a conflict, a refusal, or a process run that failed; 2 a refusal of the input.

## The Migration

`flint ite migrate [--dry-run] [--program <p>]` moves the programs of a Flint to this model once. It runs seven steps in order: the stores (`Proposals/`, `Runs/`, `History/`, `State/` to `Steel/`), the types (`framework` becomes `types` and `from-template`; `kind` goes), the membership (`parent` to the root note; `include`, `place`, `sources`, and `program` go), the views (`ite-view/2`), the processes (each contact becomes a process), the systems (instruments become processes, statements become claims, the system log moves into the log of the program), and the instruction maps (each flow view becomes an instruction map). A real run copies the old files to `.flint/steel/backup-<stamp>/` first. After the migration, the old forms are not read any more. Run `--dry-run` first, and read the report.

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
| `flint ite view remove <view> [--base-hash <hash>]` | Keeps the view in the history, then removes it and its candidates. A decision of a person. | One history file; it removes the view |
| `flint ite check [<program>]` | The findings of the main map, the views, and the processes. Exit 1 for an error finding. It runs no process. | Nothing |
| `flint ite check --candidate <id>` | The findings of one candidate only. Exit 1 for an error finding. | Nothing |
| `flint ite diff [<view>] --candidate <id>` | The difference of a candidate and its view | Nothing |
| `flint ite apply [<view>] --candidate <id>` | Applies a candidate. A conflict writes nothing and exits 1. | The view, one history file, the candidate (`state: applied`) |
| `flint ite discard --candidate <id>` | Discards a candidate; the view stays | The candidate (`state: discarded`) |
| `flint ite process list\|show\|run\|observe ...` | The processes of a program, Run now, and the one door (see Processes and the Log) | The log, or nothing |
| `flint ite flow ...` | The instruction maps and their runs (see Instruction Maps and Runs) | A run record, or nothing |
| `flint ite system\|statements\|evidence\|instruments\|read\|log\|brief\|vitals\|prompt\|adopt\|observe\|revision ...` | A living system (see Living Systems) | The log, a revision, or nothing |
| `flint ite rename <program> <name> [--base-hash <hash>]` | Renames a program and its files, and updates each wikilink in the Mesh. A decision of a person. | The program, the wikilinks |
| `flint ite archive <program> [--base-hash <hash>]` | Moves a program to `Mesh/Archive/Programs`. Deletes no file. A decision of a person. | The program folder |
| `flint ite focus <node id>... [--program <name>]` | Sets the interface key `ite-focus` of this Orbh session | The session interface |
| `flint ite job <program> --template <id> [--document <doc>] [--node <id>...] [--prompt "<text>"] [--target <t>] [--account <name>]` | Starts a job | An Orbh session |
| `flint ite migrate [--dry-run] [--program <p>]` | Moves the programs to this model once (see The Migration) | The programs, `Steel/`, the log |

The exit codes: 0 done; 1 a finding of the level error, or a conflict; 2 a refusal, and nothing was written. Each write runs inside the lock of the Flint. The Workbench uses the same code through the routes `/api/ite/*` and `/api/steel/*` of the Flint server.

## The Focus of an Agent

A person sees each live agent session on the map, as an orb on the nodes of its focus. The focus is the union of the metadata `ite-focus` that the job wrote at the start, and the interface key `ite-focus` that the agent sets. Each workflow of this shard starts with `flint ite focus <node ids>`, and changes the focus when its work moves to other nodes. Follow [[sk-ite-focus]].

## Quality Rules of a Program

A program is for a person. A model that breaks these rules does not help that person think.

1. **The words of the person.** Use the words that the person uses for the system, not the words of a tool. Take the names of the parts from the notes, the sources, and the speech of the person.
2. **Prose first.** Each part has one to three short paragraphs for a person before any tool field. Each view node has one to three sentences before its block. A person must understand the map from the prose alone.
3. **One idea for each part.** When the prose of a part needs two claims, make two parts. A short title: two to six words.
4. **The types of the program.** Give each part a type of the `types` of the root note. When no type fits, use `note` and tell the person. Never invent a type: a new type is a type note that a person agrees to.
5. **Explain each word of the system at its first use.** "The run sheet is the list of the steps of the night, with a time and a role for each."
6. **Select, do not dump.** Include only what helps the person see the system or answer the question. A level of the main map holds 3 to 9 parts (`max-children`); a deeper level holds the detail; a view of 5 to 15 nodes reads well. Do not make one part for each file, each email, or each line of a sheet. When a view needs more than 25 nodes, propose a split into two views.
7. **Tell the truth about gaps.** When a part of the system is not known, say so in the prose. When a claim has no process, say so. A model with an honest gap is better than a model with an invented fact.
8. **Give each claim a process when you can.** A part that makes a claim about reality has a process that checks it: code that reads a file, a page, a note, or a command; an agent request; or a check of a person. Prefer a process that code can run.
9. **Never invent a process that you did not check.** Before you write a code process, run it one time: the path exists, the URL answers, the note exists, the command runs. Never invent a story id, a path, a URL, or a note name. A process touches reality outside the model: a `mesh` read that only finds a part of the same program proves nothing about the system.
10. **End each view with what it leaves out.** The last section of a view is one node of the type `note` that names what the view does not show, and why.
11. **Meaning only.** No grounding, no observation, no finding, no position, and no presence in a file.
12. **Simplified Technical English.** Short sentences, active voice, and one term for one thing.

## Templates, Skills, and Workflows

| File | Use it when |
|---|---|
| [[tmp-ite-program-v0.1]] | You write a root note |
| [[tmp-ite-part-v0.1]] | You write a part |
| [[tmp-ite-view-v0.1]] | You write a view or a candidate (`ite-view/2`) |
| [[tmp-ite-map-v0.1]] | You write a map of `Steel/Maps/` |
| [[tmp-ite-process-v0.1]] | You write a process (`steel-process/1`) |
| [[tmp-ite-instruction_map-v0.1]] | You write an instruction map: the root block and the steps |
| [[tmp-ite-template-v0.1]] | You write a template of this Flint (`Mesh/Metadata/Templates/`) |
| `tmp-ite-program_<id>-v1.0` | The six templates of a new program: `software`, `process`, `event`, `research`, `organisation`, `general` |
| [[wkfl-ite-model]] | A person wants the map of a system: a new program, or more parts on a map |
| [[wkfl-ite-view]] | A person asks a question about a program, and no view answers it |
| [[wkfl-ite-reshape]] | A person asks for a change of a view in words |
| [[wkfl-ite-ground]] | Parts have no process, and the person wants to know where they touch reality |
| [[wkfl-ite-observe]] | The person wants to check parts against reality now |
| [[wkfl-ite-repair]] | Parts fail or are stale, and the person wants the model true again |
| [[wkfl-ite-map_create]] | A program has no main map, or only a flat one, and the person wants its root and level 1 |
| [[wkfl-ite-map_expand]] | The person wants one part one level deeper |
| [[wkfl-ite-map_refactor]] | A level has too many children, one child, or parts at the wrong level |
| [[wkfl-ite-map_cover]] | Files or items have no part (`coverage-gap`), or two leaves cover one file |
| [[wkfl-ite-map_update]] | The sources of a part changed, and the part is not true now |
| [[sk-ite-focus]] | Each workflow: show the person which nodes you work on |

Each workflow has a headless form (`hwkfl-ite-<name>`) that a job of the Workbench starts. The job templates `revise`, `do`, `explain`, and `free` have no workflow: the prompt of the job gives the work.
