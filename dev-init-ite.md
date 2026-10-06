---
description: "The Integrated Thinking Environment: model any system as a program of parts, views, and contacts with reality, and run it as a living system"
---

# ITE

The ITE (Integrated Thinking Environment) lets a person model a **system** of any kind as a **program**, see it on a canvas, and check it against reality. Software is a system. An event of a club, a process of a business, a research pipeline, and a team are systems too.

An IDE gives a person one loop for software: write, navigate, run, test, and keep versions. The ITE gives the same loop for a model of a system:

| An IDE for software | The ITE |
|---|---|
| A project | A **program**: the model of one system |
| A language and its framework | A **framework**: the kinds of nodes, the relations, the layers, and the shapes for one kind of system |
| Source files | **Parts**: one Mesh note for each part of the system, of any Mesh type |
| Editor tabs | **Documents** on a canvas: the map of the program, and its views |
| Run and debug | A **job**: an agent session that works on nodes and shows on the map |
| Tests | **Contacts**: where a node touches reality and how to check it. An **observation** is the result of one check. |
| The Problems panel | **Findings**, and the **grounding** of each node |
| Source control | Candidates, history, and Git |

Example: Nathan makes the program "Club Launch Night" with the framework `event`. An agent reads his notes and makes the first map: the goal, the milestones, the roles, the venue, the risks. Nathan asks "What must be true one week before?", and an agent writes a view of the shape `table`. Each condition has a contact: the venue page, the sign-up count, a statement that the treasurer confirms. `flint ite run` checks the automatic contacts, and the canvas shows which conditions hold.

The surface is the **Workbench** of Steel (the page `/ite`). This shard gives the agent side: the model, the file forms, the quality rules, and the workflows of the jobs.

## The Terms

One term has one meaning. Use these terms in each file, each view, and each result.

| Term | Meaning |
|---|---|
| Program | The model of one system. Type `(Program)`. An OrbCode project is a program of the framework `software`. |
| Framework | The vocabulary of one kind of system: kinds, relations, layers, shapes, example questions. |
| Kind | The kind of one node: `feature`, `milestone`, `hypothesis`, `step`. A kind can be a Mesh type of a shard (`Task`, `Meeting`). |
| Part | One node of the map: one Mesh note. |
| Map | The document that shows each part of a program. Each program has one map. |
| Main map | The parts of a program as one strict tree of containment: each part has one `parent`, and the root is the program. Each system has one main map. See The Main Map. |
| Level | The children of one part (or of the root) on the main map. A level holds at most `max-children` parts. |
| Subsystem | A part of the main map with children. A person opens it by zoom. It is not a separate program. |
| Coverage | How much of the system the parts cover: the files of the product for software, the items of the boundary for a living system. |
| Anchor | The field of a view node that names its part of the main map: `ref` (alias `part`) in an ITE view, `part` in an OrbCode view. |
| Map change | A change of the main map that waits for a person: a list of operations in `Changes/<change id>.md`. An agent proposes it; only a person applies it. |
| View | A document that answers one question of a person. A view has a shape. It is not exhaustive. |
| Document | The map or one view. A canvas tab shows one document. |
| Node | One card on a canvas: a part on the map, or a section of a view. |
| Link | A relation from one node to another node. |
| Layer | A set of kinds that the canvas shows and hides as a whole. |
| Contact | One place where a node touches reality, with the way to check it. |
| Observation | The record of one check of one contact. |
| Grounding | The summary state of a node from its contacts: `grounded`, `partial`, `failing`, `stale`, `unobserved`, `no-contact`. |
| Finding | One problem that a command computes about a program. |
| Job | One agent session that a person starts on nodes. |
| Presence | The mark of a live agent session on the nodes of its focus. |
| Focus | A subsection of a canvas that a person selected to see alone. For an agent: the nodes that it works on now. |
| Pin | A focus with a name. |
| Candidate | A complete view file that an agent wrote and that waits for the apply of a person. |
| Workbench | The ITE surface in Steel. |

## The Five Planes

| Plane | Question | Home | Writer |
|---|---|---|---|
| Map | What are the parts of the system? | One Mesh note for each part | A person or an agent |
| Views | How does a person want to see the system? | One view file for one question | A person (direct), or an agent (through a candidate) |
| Contacts | Where does each claim touch reality, and how do we check it? | The field `contact` of a part or of a view node | A person or an agent |
| Observations | What did a check or an instrument see? | A record store of this machine, and the system log of a living system | Only a command (`flint ite run`, `flint ite read`, `flint ite observe`, the routes) |
| Work | Who works on which node now? | Orbh sessions with a focus | Orbh and `flint ite focus` |

## A Writer Writes Meaning, a Command Computes Facts

A program holds **meaning**: the parts, their prose, their kinds, their links, the views, and the contacts. A program never holds a **fact** that a command computes:

- No grounding state, no observation, no count of checks, and no time of a check.
- No finding.
- No position of a card. Only `flint ite` and the layout route write the layout note.
- No presence of an agent.
- No accepted value, no state of a statement, no item of the brief, and no vital sign of a living system.

**Only a command writes an observation.** An agent that checks an `agent` contact, and a person who confirms a `human` contact, record the result with `flint ite observe`. Never write an observation into a file of the Mesh. Never edit or remove a line of the observation store (`.flint/ite/observations/<program id>.jsonl`): it is a record of this machine, as the runs of Orbtest are.

You can tell a person the facts in a conversation or in your result. Do not write them into a program.

## The Folder of a Program

```
Mesh/Programs/
└── (Program) <Name>/
    ├── (Program) <Name>.md                        # the program file
    ├── (Program) <Name> . (Layout).md             # the layout note: the positions of each document (only flint ite and the layout route write it)
    ├── Map/
    │   └── (Program) <Name> . (<Kind>) <Title>.md  # one note for each part
    ├── Views/
    │   └── (View) <Title>.md                      # one file for each view
    ├── Runs/
    │   └── (Run) <flow title> <yyyy-mm-dd hh-mm>.md # one run record for each run (only the engine writes here)
    ├── Candidates/
    │   └── <candidate-id>.md                      # a complete view file that waits for the apply
    ├── Revisions/
    │   └── <revision-id>.md                       # a living system: a change of one file that waits for a person (see Living Systems)
    ├── Changes/
    │   └── <change-id>.md                         # a map change of the main map (only the change engine writes here)
    └── History/
        └── <view-slug>-<yyyymmdd-hhmmss>.md        # a replaced form of a view (the newest 5 are kept)
```

An OrbCode project (`Mesh/OrbCode/(OrbCode Project) <Name>/`) has the same layout. The ITE reads it in place as a program with the framework `software`: its static map is its main map. Its views change only through the OrbCode shard (`flint shard start orbc`). Its main map changes only through a map change that a person applies (see The Main Map). Never write a file of an OrbCode project with an ITE workflow in another way.

## The Program File

`Mesh/Programs/(Program) <Name>/(Program) <Name>.md`. Make it with `flint ite create`; the form is [[tmp-ite-program-v0.1]].

| Field | Value |
|---|---|
| `format` | `ite-program/1` |
| `id` | A UUID v4. It never changes. |
| `tags` | `"#ite/program"` |
| `framework` | The id of one framework (see The Frameworks) |
| `purpose` | One sentence: what the system is, and why a person models it |
| `status` | `active` or `archived` |
| `include` | Wikilinks to notes of the Mesh, of any type, that are parts of the map: a task, a person, a meeting, a report |
| `sources` | Queries: each note that a query matches is a part of the map (see The Mesh Query) |
| `template`, `authors`, `orbh-sessions` | The Flint conventions |

Example:

```yaml
---
format: ite-program/1
id: 0b7d8e2a-4c15-4f63-9a0e-6d2c1b8f5e37
tags: ["#ite/program"]
framework: event
purpose: "The launch night of the club, from the first idea to the last thank-you message."
status: active
include:
  - "[[@Nathan]]"
sources:
  - { type: Meeting, links_to: "(Program) Club Launch Night", kind: note }
template: "[[tmp-ite-program-v0.1]]"
authors: ["[[@Nathan]]"]
---

# Club Launch Night

The club opens with one night for 80 guests. The map shows the goal, the milestones before the night, the roles, and the run sheet of the night. Read the view "What Must Be True One Week Before" first.
```

## The Part File

A part is one Mesh note. A part that the ITE makes is in `Map/`, with the name `(Program) <Name> . (<Kind title>) <Title>.md`. The form is [[tmp-ite-part-v0.1]]. When the kind has a Mesh type (for example the kind `task` is the type `Task`), the part is a note of that type: `flint ite part add` makes it with the command of the type and adds it to `include`.

Example: `Map/(Program) Club Launch Night . (Milestone) Venue booked.md` (a part of the program Club Launch Night of this Flint)

```yaml
---
id: a9d285ce-53f0-448d-9580-5eff8cef7b1d
tags: ["#ite/part"]
program: "[[(Program) Club Launch Night]]"
kind: milestone
parent: "[[(Program) Club Launch Night . (Goal) A full hall and 30 new members]]"
depends-on: ["[[(Program) Club Launch Night . (Budget) Venue hire]]"]
owner: "[[(Program) Club Launch Night . (Person) Priya Nair]]"
status: done
contact:
  - id: booking-email
    kind: human
    claim: "The venue manager confirmed by email the booking of the hall for Thursday 12 November 2026, from 17:30 to 22:00."
    fresh-for: 30d
template: "[[tmp-ite-part-v0.1]]"
authors: ["[[@Nathan]]"]
---

# (Milestone) Venue booked

Priya booked the hall on 24 September 2026. The booking holds the hall from 17:30 to 22:00. The set-up starts at 17:30, and the hall must be empty at 22:00.

# Contact

The booking is an email from the venue manager to Priya. No public page shows the booking, so a person confirms it.
```

The rules of the read:

1. **The kind.** The field `kind`. Else the kind of the framework whose `mesh_type` is the `(Type)` word of the note. Else the `(Type)` word in lower case. Else `note`.
2. **The parent.** The field `parent`: one wikilink to a part of the same map, or `""` for a top part. A parent that is not on the map gives no parent.
3. **The links.** Each frontmatter key whose value is one wikilink or a list of wikilinks gives one link for each wikilink, with the key as the relation (`next`, `uses`, `depends-on`, `informs`, `owner`). These keys give no link: `id`, `tags`, `program`, `parent`, `kind`, `template`, `authors`, `orbh-sessions`, `artifacts-created`, `contact`, `include`. A wikilink in the prose gives a link of the relation `mentions`.
4. **The text.** The body below the H1, up to the first heading `# Contact` or `## For a developer`.
5. **The title.** The file name after the `(<Kind title>)` word, with no number at its start: a number there reads as the number of an artifact, as in `(Task) 1099 ...`. Start a title with a word: "A full hall and 30 new members", not "80 guests".

## The View File

A view is one Markdown file: `Views/(View) <Title>.md`. It has the grammar of an OrbCode view (read the section The View File of the OrbCode shard when you need the detail), with the format `ite-view/1`. The form, the eight shapes, and one complete example are in [[tmp-ite-view-v0.1]].

| Field | Value |
|---|---|
| `format` | `ite-view/1` |
| `id` | The UUID of the view. A candidate has its own new `id`, and `view_id` names its view. |
| `tags` | `"#ite/view"` |
| `program` | `"[[(Program) <Name>]]"` |
| `question` | The question of the person, as one sentence |
| `shape` | `flow`, `streams`, `layers`, `tree`, `table`, `free`, `timeline`, or `board` |
| `lifetime` | `draft` or `kept`. Only a person writes `kept`. |
| `curation` | `proposed` or `accepted`. An agent always writes `proposed`. |
| `derived-from` | `""`, or the wikilink of the view that this view came from |
| `view_id`, `base_hash` | A candidate only (see The Candidate and the Apply) |

The body:

1. One H1: the name of the view. The prose after it answers the question in one to three sentences.
2. Each H2 to H6 heading ends with a stable id: `## Doors open {#doors-open}`. The id matches `[a-z0-9]+(-[a-z0-9]+)*`, is unique in the view, and never changes.
3. Depth is containment. A section with one fenced block `node` is a node. A section with no block is a group.
4. The node block: `kind`; `ref` (a wikilink to the part or the note that the node stands for); `contact` (a list of contacts); `layer`; the relations `next`, `uses`, `blocks`, `informs` (lists of heading ids of the same view); `inside`, `actor`, `action`, `result`; `date` (shape `timeline`); `status` (shape `board`).

Example (a node of the view "Run Sheet of the Night", shape `streams`):

````markdown
### Open the doors {#open-the-doors}

At 18:30 the door team opens the doors and gives each guest a name tag.

```node
kind: step
ref: "[[(Program) Club Launch Night . (Step) Doors open]]"
actor: "Door"
next: [welcome-talk]
contact:
  - id: count
    kind: human
    claim: "The door team counted each guest at the door."
```
````

A node with `ref` shows the title and the text of its own section. Its grounding comes from its own contacts and from the contacts of its note.

## The Contact

`contact` is a list, in the frontmatter of a part or in the block of a view node. An item is a wikilink or a mapping with `kind`.

| Kind | Form | It holds when | Automatic |
|---|---|---|---|
| `reference` | `"[[rf-cb-flint]]"` (a note of `Mesh/Metadata/References/`) | The marker resolves on this machine | Yes |
| `note` | `"[[(Meeting) 2026-09-28 Venue Call]]"` | The note exists: it is the evidence | Yes |
| `file` | `path: "@Flint/packages/ite/src/views/"` | The path (and the symbol after `#`) exists | Yes |
| `command` | `run: "<command line>"`, `cwd` | The result matches `expect` (default: exit code 0) | Yes, on request |
| `http` | `url: "https://..."` | The response matches `expect` (default: a 2xx status). GET only. | Yes |
| `mesh` | `query: { type, tags, where, links_to, search }` | The count of the matches satisfies `expect.count` (default `>=1`) | Yes |
| `orbtest` | `stories: [...]`, `criteria: [...]` | The coverage of Orbtest proves the criteria | Yes |
| `agent` | `prompt: "<question>"` | An agent answers it and records the observation | No |
| `human` | `claim: "<statement>"` | A person confirms it and records the observation | No |

Each mapping can have `id` (a short slug, unique in the node), `claim` (the statement that is true when the contact holds), `expect` (`exit`, `match`, `not_match`, `status`, `json: { path, equals | exists }`, `count`), `fresh-for` (`12h`, `7d`, `4w`), and `direction: act` (a contact that changes reality: no command runs it with no request of a person).

A complete example with each kind:

```yaml
contact:
  - "[[rf-cb-flint]]"
  - "[[(Meeting) 2026-09-28 Venue Call]]"
  - { kind: file, path: "@Flint/packages/orbcode/src/join.ts#joinView" }
  - { id: ci, kind: command, claim: "The main branch builds.", run: "gh run list --branch main --limit 1 --json conclusion", expect: { json: { path: "0.conclusion", equals: "success" } }, fresh-for: 1d }
  - { id: status, kind: http, url: "https://status.example.org/api", expect: { status: 200 }, fresh-for: 12h }
  - { id: tasks, kind: mesh, claim: "Each task of the launch is done.", query: { type: Task, links_to: "(Program) Club Launch Night", where: { status: [todo, in-progress, blocked] } }, expect: { count: "==0" } }
  - { kind: orbtest, stories: [setup.steps] }
  - { id: sponsors, kind: agent, prompt: "Read the sponsor sheet and say if three sponsors signed.", fresh-for: 7d }
  - { id: walkthrough, kind: human, claim: "Nathan walked through the venue.", fresh-for: 30d }
```

- A wikilink contact names a note of the Mesh. A file of a shard, of a repository, or of another Flint is not a note of the Mesh: write it as `{ kind: file, path: "Shards/<Name>/skills/<file>.md" }` (a path relative to the Flint root) or `@<Codebase>/<path>`.
- `@<Codebase>/<path>` names a path in a codebase of the Flint (`flint reference list` gives the names). A `file` path with no `@` is relative to the Flint root.
- The `cwd` of a command is relative to the Flint root, or `@<Codebase>`. A command runs for at most 60 s. An `http` check runs for at most 20 s.
- A run with no named kinds does not run `command`: a person decides that a command of a note runs. Run a command contact only when the person asks, or when the job names the kind `command` or the contact. A contact with `direction: act` changes reality: only `flint ite act <program> <node> --contact <id>` runs it, and only on the request of a person.

### The Mesh Query

A `mesh` contact and a `sources` item use one query form. Each given field must match:

| Field | Meaning |
|---|---|
| `type` | The last `(Type)` word of the file name, for example `Task`, or `Risk` for a part `(Program) X . (Risk) Rain` |
| `tags` | Each tag must be on the note |
| `where` | Frontmatter fields that must be equal. A list means "one of". |
| `links_to` | Only notes that link to this note in their frontmatter (the name, with no `[[ ]]`) |
| `search` | Text that the title must contain (the case is ignored) |

## The Grounding

The state of one contact: `unobserved` (no observation), `holds`, `fails`, `error`, or `stale` (the newest observation is older than `fresh-for`).

The grounding of a node comes from the states of its contacts, in this order:

| Grounding | Rule |
|---|---|
| `no-contact` | The node has no contact |
| `failing` | Else one contact `fails` or has an `error` |
| `stale` | Else one contact is `stale` |
| `grounded` | Else each contact `holds` |
| `partial` | Else one contact or more `holds` |
| `unobserved` | Else no contact has an observation |

A node of the kind `note`, and a group with no contact below it, has no grounding. The grounding of a group, a view, or a program is the same rule over each contact below it. For an OrbCode node, the proof of Orbtest gives the grounding: `proven` is `grounded`, `unproven` is `unobserved`, `no-contract` is `no-contact`.

## The Frameworks

A framework gives the kinds, the relations, the layers, the shapes, and example questions of one kind of system. `flint ite frameworks` lists them. The builtin frameworks:

| Id | For | Kinds (layer) |
|---|---|---|
| `software` | A software product (OrbCode) | system, module, feature, data (structure); actor (actors); step, decision, stream (process); note |
| `process` | A process of a business | actor, system (structure); step, decision, input, output (process); policy, metric (control); note |
| `event` | An event | goal, milestone, deliverable (plan); person, role, venue, resource (structure); task (work, Mesh type `Task`); step (process); risk, budget (control); note |
| `research` | A research pipeline and the research | question, hypothesis, claim (argument); source, dataset (evidence); method, experiment, step (process); finding, output (result); note |
| `organisation` | A team or an organisation | team, role, person (structure); responsibility, ritual, decision (operation); goal, metric (direction); note |
| `general` | A system with no framework | thing, actor, process, state, goal, question, note |

Each framework has the relations `next` (flow), `uses` (dependency), `inside` (containment), `depends-on` (dependency), `owner` (reference), `informs` (reference), and `mentions` (reference). A node can have a kind that its framework does not have: the canvas draws a plain card, and the check gives a `framework` note.

A Flint adds a framework with one note: `Mesh/Metadata/Frameworks/(Framework) <Title>.md` ([[tmp-ite-framework-v0.1]]). A framework note with the id of a builtin framework replaces it. Add a framework only when no builtin framework fits, and when the person agrees.

## The Candidate and the Apply

A person changes a view directly (the Workbench, or by hand). **An agent changes a view only through a candidate**: a complete view file in `Candidates/<candidate-id>.md`.

1. The candidate id is `<view-slug>-<UTC yyyymmdd-hhmmss>`. The view slug is the H1 in lower case, with each run of other characters than `a-z` and `0-9` replaced by one `-`.
2. A new view: `view_id` is a new UUID, `id` is a second new UUID, `base_hash: null`.
3. A reshape: `view_id` is the `id` of the view, `id` is a new UUID, and `base_hash` is the SHA-256 hex of the bytes of the view file (`shasum -a 256 "<view file>"`), computed before you read the view.
4. Verify with `flint ite check --candidate <id>` (exit 0: no error finding of the candidate) and `flint ite diff --candidate <id>` (no conflict). `flint ite check <program>` reads the map and the views, not a candidate.
5. The apply (`flint ite apply --candidate <id>`, or the Workbench) replaces the view only when the hash of the view file is `base_hash`, and writes the replaced form to `History/`. A conflict writes nothing.
6. In an interactive session, apply only when the person agrees. In a headless session, never apply and never discard the candidate that you return.

An agent writes parts, links, and contacts directly with `flint ite`. The person sees the agent on the map through its focus.

## The Main Map

The **main map** of a program is its map read as one strict tree of containment. Each system has one main map. A subsystem is a deeper level of the same main map, not a separate program: a person opens it by zoom in the Workbench. The views of the program anchor to the parts of the main map. An OrbCode project is a program of the framework `software`, and its static map is its main map: the code is its sources.

### The Tree

- **The root is the program.** Each part (a note in `Map/`, also in a subfolder of `Map/` for an OrbCode project) has one `parent`: one wikilink to the parent part. A part with no `parent` is a child of the root. Included notes, source notes, and self nodes are not parts of the main map.
- **The 100% rule.** The children of a part together are the whole part: each source of the part belongs to one child. Nothing of the system is outside the tree, and nothing is in it two times.
- **The size limit.** A level holds at most `max-children` parts (default 9). A part with exactly one child is a finding: merge the child into the part, or give the child its siblings.
- **Relations are free, and they roll up.** A frontmatter link between two parts (`uses`, `depends-on`, `artifact-refs` of OrbCode) shows at each level as one relation between the two cards whose subtrees hold its two ends, with the count and the relation kinds. A link inside one card does not show. A wikilink in the prose (`mentions`), `sources`, and `code-refs` do not roll up.
- **Coverage.** Software (an OrbCode project, or a program file with `codebase`): each file of `git ls-files` of the product root is covered when one `code-refs` entry of a part is the file, or a folder that holds it (a folder ends with `/`). A file that no part covers is a gap. A file that two leaves cover with a whole-file or folder ref is an overlap. A ref of a part that is not a leaf covers its files and makes no overlap. A slice (`path#symbol` or `path:Lx-Ly`) covers its file and never makes an overlap. The counts are of the time of the read: a commit to the product changes them. A living system: each item of `boundary.inside` is covered when one of its `parts` names a part. Another program: the coverage is not computed.
- **Anchors in both directions.** A node of an ITE view names its part with `ref` (alias `part`); a node of an OrbCode view names it with `part`. An anchor resolves by part id first, then by note name. Each part lists the view nodes that look at it.

The configuration is in the frontmatter of the program file (or of the OrbCode project file). Each key is optional:

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
| `anchor-none` | note | A view node has no anchor. | Anchor it, or keep it as a concept of the view only |
| `coverage-gap` | note | Files that no part covers (one finding on the root, with the count). | The job `map-cover` |
| `coverage-overlap` | warning | Two leaves cover one file. | `edit` the sources of one leaf |
| `code-ref-missing` | warning | A `code-refs` entry matches no file. | `edit` the sources (the job `map-update`) |
| `map-change-stuck` | error | A map change is `applying` or `reverting`: a write did not finish. | The next write of the change engine recovers it |

### The Map Change

A change of the main map is a **map change** (`ite-map-change/1`): one file `Changes/<change id>.md` in the program folder, with the list of operations, the hash of each file at the propose, and a preview of the tree before and after. The change id is `mc-<yyyymmdd-hhmmss>-<slug of the reason>`. Only the change engine writes in `Changes/`.

The operations are one JSON array. They apply in order. A part is named by its id or by its note name. `parent: null` is the root. `sources` are the `code-refs` of a software program, else the `sources` of the part (wikilinks or URLs).

| Operation | The JSON | What it does |
|---|---|---|
| `add` | `{"op":"add","title":"<t>","kind":"<k>","parent":"<part or null>","sentence":"<s>","prose":"<optional>","sources":["..."]}` | A new part. An optional `id` (a UUID v4) lets a later operation name it. |
| `move` | `{"op":"move","part":"<part>","parent":"<part or null>"}` | A new parent. The new parent is not in the subtree of the part. |
| `split` | `{"op":"split","parent":"<part or null>","subsystem":{"title":"<t>","kind":"<k>","sentence":"<s>"},"children":["<part>","..."]}` | Groups children of `parent` into a new subsystem under `parent`. |
| `merge` | `{"op":"merge","from":"<part>","into":"<part>"}` | The children and the sources of `from` go to `into`; each wikilink to `from` becomes a link to `into`; the file of `from` is removed. |
| `rename` | `{"op":"rename","part":"<part>","title":"<new title>"}` | The new file name and H1; each wikilink to the old name changes. The id stays. |
| `remove` | `{"op":"remove","part":"<part>"}` | The children move up one level, and the file is removed. The links to the part stay: the preview lists them as dangling. |
| `edit` | `{"op":"edit","part":"<part>","sentence":"<optional>","prose":"<optional>","sources":["<the whole new list>"]}` | A new sentence, prose, or list of sources. `sources` replaces the whole list. |

The states: `proposed`, then `applied` (and `reverted` after a revert), or `discarded`. `applying` and `reverting` are the marks of a write in progress.

1. **An agent proposes; only a person applies.** The engine refuses an apply, a revert, and `--apply` from an agent with `forbidden`. An agent can discard a change that it proposed.
2. **The apply checks each base hash.** A file that changed after the propose is a conflict (`changed`), and the apply writes nothing. The apply writes in two phases, and a revert writes back the exact old bytes.
3. **A refactor keeps the links valid.** A `rename` and a `merge` rewrite each wikilink to the old part in the Mesh: the links of the parts and the anchors of the views stay valid.
4. **A change by a person applies at once.** In the Workbench, a person groups cards into a subsystem, moves, renames, and merges by hand. Each hand change is one map change that is proposed and applied in one call, with Undo (a revert).

### The Commands of the Main Map

| Command | Result | Writes |
|---|---|---|
| `flint ite map show <program> [--focus <part>]` | One level: the focus, the cards with their counts, coverage, and findings, and the relations | Nothing |
| `flint ite map tree <program>` | The whole tree with the markers and the counts of the findings | Nothing |
| `flint ite map check <program>` | Each finding of the main map. Exit 1 for an error finding. | Nothing |
| `flint ite map coverage <program> [--gaps]` | Covered / total, the coverage of each part, the overlaps; `--gaps` lists the gap files | Nothing |
| `flint ite map change propose <program> --ops <file\|-> --reason "<one sentence>" [--apply]` | Proposes a map change and prints its id and preview. `--apply` applies it at once: a person only. | One change file |
| `flint ite map change list <program> [--state <state>]` | The map changes, the newest first | Nothing |
| `flint ite map change show <program> <id>` | One change with its preview: the tree before and after with the marks, the files, the dangling links, the conflicts | Nothing |
| `flint ite map change apply\|revert <program> <id>` | Applies or reverts one change. A person only. | The part files, the change file |
| `flint ite map change discard <program> <id>` | Discards a proposed change; the file stays with the state `discarded`. A person, or the agent that proposed it. | The change file |
| `flint ite map split <program> --parent <part\|root> --title <t> --kind <k> --sentence <s> <child>...` | Proposes one `split` | One change file |
| `flint ite map move <program> <part> --parent <part\|root>`, `map rename <program> <part> --title <t>`, `map merge <program> <from> --into <part>` | Propose one operation; `--apply` applies it (a person only) | One change file |

Each verb takes `--json`. `flint ite map <program>` with no verb gives the map as before. In an Orbh session the actor is `agent:<session id>`, else `person:<Name>`. When `flint ite map` has no verbs in your CLI (an older build), write the operations to a file, propose nothing, and say so in your result.

### The Rules of the Main Map

1. **A job of the main map changes the main map only through a map change.** It never writes a part file with its own tools, and never runs `flint ite part add`, `part set`, `include`, or `link` on the main map.
2. **Never apply a map change, and never revert one.** Only a person does. A headless session never discards the change that it returns.
3. **One change for one job, and read the waiting changes first.** Run `flint ite map change list <program> --state proposed`, then `flint ite map change show <program> <change id>` for each one (the list shows no focus). Do not propose what a waiting change does already. Do not `edit` or `move` a part that a waiting change moves or edits: the later change gets a conflict (`changed`) at the apply.
4. **Read the preview before you return.** The tree after must have no new finding of the level error, and no new `map-too-many-children` that the job could avoid.
5. **The quality rules apply to each new part**: the words of the person, a title of two to six words, one sentence that says what the part is, and sources that you read (never invented paths).

### The Jobs of the Main Map

| Template | Nodes | Workflow (headless / interactive) | The agent does |
|---|---|---|---|
| `map-create` | None | [[hwkfl-ite-map_create]] / [[wkfl-ite-map_create]] | Reads the sources and drafts the root and level 1: 3 to 9 parts, each with one sentence and its sources |
| `map-expand` | 1 part | [[hwkfl-ite-map_expand]] / [[wkfl-ite-map_expand]] | Takes one part one level deeper: 3 to 9 children that cover the sources of the part |
| `map-refactor` | 0 or 1 (the focus) | [[hwkfl-ite-map_refactor]] / [[wkfl-ite-map_refactor]] | Brings one level to the size limit: split, merge, move, rename |
| `map-cover` | 0 or 1 | [[hwkfl-ite-map_cover]] / [[wkfl-ite-map_cover]] | Places the gap files: `edit` the sources of a part, or `add` a part |
| `map-update` | 1 part | [[hwkfl-ite-map_update]] / [[wkfl-ite-map_update]] | Updates one part from its sources now: `edit`, and `add` or `remove` of children |

The prompt of a map job holds the level of the focus (the cards, the relations, the findings), the coverage gaps (at most 200 paths), the form of each operation, and the last step: `flint ite map change propose "<program>" --ops - --reason "<one sentence>"`.

## Flows and Runs

A program of the ITE is executable. A **flow** is the execution definition of a procedure; a person runs it by hand, step by step, with the Workbench as the externalized working memory. A view is a projection: the `next` arrows of a flow view do not say sequence. The flow block says it.

### The Terms of a Run

| Term | Meaning |
|---|---|
| Flow | The execution definition of a procedure: the steps, the entry, the exits, and the transitions. It lives in a `flow` block of a flow view. |
| Workstep | One step definition: an instruction, inputs, outputs, an executor, and a completion mode. A workstep is inline in a flow or in a step library. |
| Step library | A Mesh note with reusable worksteps (`ite-steps/1`), in `Mesh/Metadata/Step Libraries/`. The first library is `thinking`. |
| Step | One place of a workstep in a flow. Its id is the id of a node of the view. |
| Decision | A step whose completion is an answer: one outcome, from a fixed list. |
| Transition | An edge of the flow: from a step to a step, with an outcome when the source is a decision. |
| Run | One execution of a flow, by an actor, on inputs, with a status and a record. |
| Visit | One entry of control into a step. A loop makes a new visit. |
| Attempt | One try of a visit. Night 1 has one attempt for each visit. |
| Event | One accepted fact of a run, with a sequence number. |
| Output | A value that a step produces: a small value in the run, or a note in the Mesh. |
| Run record | The Mesh note of a run: the snapshot, the events, and a rendered summary. |
| Run panel | The surface of the Workbench that walks a person through a run. |

### The Rules of a Flow and a Run

1. **The flow block.** A flow view (`shape: flow`) has one fenced ` ```flow ` block in its intro: the id, the title, the revision, the default `library`, the `entry`, the `exits`, the run `inputs`, the `steps`, and the `transitions`. The form is [[tmp-ite-flow-v0.1]]. Each step id is a node id of the view; a node with no step is prose and does not run.
2. **A step is a workstep or a decision.** A workstep names a library workstep with `uses_step: <id>` (`<library id>/<id>` for another library), or is inline with `instruction`, `inputs`, `outputs`. An inline field replaces the field of the library workstep. A decision has a `question` and at least two quoted `outcomes`; its answer is the value `<step id>.answer`.
3. **The step library.** A note of the format `ite-steps/1` with one fenced ` ```steps ` block. The form is [[tmp-ite-steps-v0.1]]. The resolver copies each used workstep into the snapshot at the start of a run: a later edit of the library never changes an active run.
4. **The transitions.** A step that is not a decision has exactly one transition out, or none when it is an exit. A decision has one transition for each outcome. A loop goes only out of a decision; the engine bounds each step at 20 visits for each run. A `guard`, a `fork`, a `join`, and a call of another flow are refusals. A step `by: agent` or `by: command` is a refusal in an `ite-flow/1` flow; an `ite-flow/2` flow of a living system runs it (see Living Systems).
5. **The run keeps a snapshot.** The record holds the resolved flow (the block plus the copied worksteps) and its sha256 as the true revision. An edit of the flow after the start makes a new revision for the next run; an active run stays on its snapshot.
6. **The record is an append-only event log.** The state is derived from the events. Each write runs in the lock of the Flint with `expected_seq` (a stale value refuses with `changed`) and `request_id` (a known id returns the earlier result and appends nothing).
7. **The engine is the only writer of a run record.** A run record is the type Run (`ite-flow-run/1`) in `Runs/` of the program folder. Never create, edit, or delete a file in `Runs/`. A person writes below `# Remarks` only.
8. **Outputs.** A small value (`text`, `number`, `choice`) lives in the events. An output of the kind `note` or `notes` is a part of the map, with `generated-by` (the run), `run-step`, `run-visit`, and the `link` relation of the output spec. The three provenance links: the note `generated-by` the run, the run `used` its inputs, the run is `by` its actor. A `link` whose target input holds a `text` or a `number` gives no wikilink: the engine writes the note with no link, and the check reports one finding of the code `link-missing` (level warning) for the step. It is the price of a text input, not an error.
9. **"Done" has one mode in an `ite-flow/1` flow.** A person confirms, with outputs that pass the output schema. A green contact never completes a step by itself. An `ite-flow/2` flow adds the completion policies of Living Systems: there, the Done of a step with an evidence completion is only a report.

### The Flow Commands

`flint ite run` is the contact runner and stays. The flow verbs are `flint ite flow <verb>`. Each takes `--json`. `<run>` is the run id, a prefix of 8 or more characters, the file stem of the run record, or the title.

| Command | Result | Writes |
|---|---|---|
| `flint ite flow list <program>` | The flows of the program with the findings | Nothing |
| `flint ite flow show <view>` | The resolved flow: the steps in order, the decisions and their outcomes, the refusals | Nothing |
| `flint ite flow start <program> <view> [--title "<t>"] [--input name=value]...` | Starts a run; prints the run id and the first step | The record |
| `flint ite flow runs <program> [--status <s>]` | The runs, the newest first | Nothing |
| `flint ite flow status <run>` | The state: the status, the active visit with its instruction, its inputs, and its output form, the path so far | Nothing |
| `flint ite flow done <run> [--output name=value]... [--note name="Title"]... [--notes name="line1;line2;line3"]... [--at <ISO time>]` | Completes the active visit; `--note` gives the title of a `note` output (and `--text name="..."` its body); `--notes` gives the lines | The record and the output notes |
| `flint ite flow answer <run> <outcome>` | Answers the active decision | The record |
| `flint ite flow skip <run> --reason "<text>"` | Skips the active visit (only a step with no required output) | The record |
| `flint ite flow pause\|resume\|cancel <run> [--reason "<text>"]` | Changes the status | The record |

The exit codes are the exit codes of `flint ite`: 0 done; 1 a finding of the level error, a refusal of the flow, or a conflict; 2 a refusal of the input. When `flint ite flow` is not a command of your CLI (an older build), write the flow view and the step library by hand in the forms of the templates, and never write a run record.

## Living Systems

A **living system** is a system whose actors act through its own model: the work writes the map, each claim shows its source and its age, and an action stays pending until an observation confirms its effect. A program becomes a living system when its program file has one `system` block. A program with no block stays a program as the sections above describe it: it has no brief, no statements, and no vital signs, and each command of those sections works as before.

Steel is the tool through which a person constructs a living system, reads it, runs it, and develops it. The code keeps the name `ite` (`flint ite`, the page `/ite`). In this Flint, the program Flint Release is the first living system: read its program file, its parts, and its view "Ship Flint" as the reference forms.

### The Terms of a Living System

These terms add to The Terms and to The Terms of a Run. One term has one meaning.

| Term | Meaning |
|---|---|
| System | A program with a `system` block in its program file |
| Root | The program file of a system: the boundary, the owners, the goals, the maps, and the connections. It is an index, not the one truth. |
| Boundary | What is inside the system, what is outside, and what is unknown: a decision of a person, with a date and a reason |
| Connection | What crosses the boundary to another system: imports, exports, and the integration that carries them |
| Statement | Something that the map asserts about the system, with a **mode**. One item of the `statements` list of a part. |
| `is` | The mode of a claim about the present or the past. An instrument, a person, or a run gives its value. |
| `ought` | The mode of an expectation that must hold, with an owner |
| Goal | An `ought` with an owner and a reason, named in `goals` of the system block |
| Limit | An `ought` that the system must never leave. It escalates at once. |
| `will` | The mode of a prediction, with a probability `p` and an instant `resolves` |
| Instrument | A part of the kind `instrument`: an instruction whose result is observations |
| Read | One run of an instrument. A successful read is the heartbeat, also when no value changed. |
| Notice | A message of an event source that something changed. It is not evidence: a read follows it. |
| Observation | One typed result of a source (`ite-observation/2`), with the time it was observed and the time it was received |
| System log | The append-only file of the observations, reads, notices, and attention records of one system |
| Accepted value | The value that the reducer selects for an `is` statement from its observations |
| Evaluation | The state of a statement now, computed from its declaration, the log, and the time |
| Definition revision | The hash of the binding fields of a statement or an instrument. An observation for another revision is never accepted. |
| Instruction | Text that an actor executes: a flow, or an instrument |
| Executor | Who does a step: `person`, `agent` (an Orbh session), or `command` |
| Completion policy | When a step is complete: `outputs`, `confirm`, or `evidence` |
| Begin | The dispatch of a person step with an evidence completion: the person says "I start now" before the act |
| Receipt | The exact locator of the result of an agent attempt: the Orbh session, the run id, the run number, and the target |
| Precondition | The `ought` statements that must hold at the approval and at the dispatch of a step |
| Effect | The change in the world that a step with an evidence completion must cause. It is `pending` until evidence confirms it. |
| Prediction | What an attempt will change, declared before it acts: the resolved requirements, their pinned sources, and a deadline |
| Approval | The yes or no of a person for one visit of one step, bound to the revision of the instruction and to a digest of each value that the visit uses |
| Governor | The limits of a system in one place |
| Brief | The page of attention: six sections of items, and the vital signs |
| Episode | One continuous interval in which the condition of an item of the brief is true. An acknowledgement and an escalation bind to one episode. |
| Revision | A candidate change of one file of the system, with a reason and a check, that a person applies and can revert |
| Protected change | A change that can weaken a check. Only a person applies it, and only through a revision. |
| Vital signs | Five measures, each from independent evidence: freshness, closure, use, surprise, coverage. No single score. |
| Sense level | How a claim is updated: `written`, `work`, `request`, `polled`, `event` |
| Act level | How the system acts on a part: `none`, `manual`, `assisted`, `approved`, `closed-loop` |

Do not use "environment" (it is an Information Environment or an Orbtest environment), "claim" for an expectation, "turn" for an Orbh run, or "live" for "fresh".

### One Authority for Each Fact

| Fact | Authority | Writer |
|---|---|---|
| Parts, links, statements, instruments, the system block, prose | The Mesh | A person, an agent, or an applied revision. A protected change: a revision only. |
| Flows (instructions) | The `flow` block of a view | As above |
| Run control, attempts, receipts, approvals, the copy of the evidence | The run record in `Runs/` | The engine only |
| Observations, reads, notices, acknowledgements, escalations, prompts, detections, clearances | The system log `.flint/ite/systems/<program id>/log.jsonl` | The commands of the intake and of attention only |
| Revisions and their exact old bytes | `Revisions/<id>.md` in the program folder | The revision commands only |
| The accepted values, the evaluations, the findings, the brief, the vital signs | Nobody: a command computes them on each read | Nobody |

No file of the Mesh holds an accepted value, a state of a statement, an item of the brief, or a vital sign. Never write the system log by hand, and never edit or remove a line of it.

### The System Block (`ite-system/1`)

One fenced ` ```system ` YAML block in the program file, under the H1 and the first paragraph. The program file keeps `format: ite-program/1`. The keys are kebab-case. The form is in [[tmp-ite-program-v0.1]].

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
maps:
  - { path: "Map/", owner: "[[@Nathan]]", standpoint: native, scope: "the release of the CLI" }
goals: [no-pull-debt, monthly-release]
attention: { escalate-after: 24h, brief-since: 24h }
authority: { run: ["person:Nathan"], approvers: ["person:Nathan"] }
governor: { max-runs-per-day: 3, max-attempts-per-step: 3, max-agent-attempts-per-day: 10, irreversible-needs-approval: true }
```
````

1. `format` is required. Another value gives the finding `system-invalid` (warning), and the program is not living.
2. Each id in `goals` is an `ought` statement of the system. Another id is an error.
3. Each wikilink in `boundary.inside[].parts` is a part of the map. A boundary item with no part shows as unwatched.
4. `standpoint` is `native` (the actors act through this map), `operator`, or `observer` (the default).
5. The defaults: `timezone` `UTC`, `escalate-after` and `brief-since` `24h`, `authority` null (the owners run each instruction), `governor` null.
6. A flow id is unique in a system. Two flows with one id are an error, and both refuse.
7. A prose edit of the program file keeps the block. Only a revision changes the block.

### Statements

A part declares its statements in a `statements` list in its frontmatter. A statement id is a slug, unique in the system. The form is in [[tmp-ite-part-v0.1]].

```yaml
statements:
  - id: canon-version
    mode: is
    about: "The version of the CLI on origin/canon"
    instrument: git-flint-remote
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

1. **`is`** has `instrument` and `property`, or neither. With neither, a person, an agent, or a run reports the value with `flint ite observe --statement` (give `type`). An instrument or a property that does not exist is an error.
2. **`type`** is `number`, `text`, `boolean`, `time`, `version` (semver), `sha`, `json`, or `verdict`. The default is the type of the property.
3. **`fresh-for`** is the time that an accepted value stays fresh (`1h`, `6h`, `7d`). With no `fresh-for`, the value never gets old: use that only for a fact that does not change.
4. **`selection`** is `newest` (the default for one source), `authoritative`, or `agree` (the default for two or more sources: two fresh values that differ give `conflict`).
5. **`ought`** and **`will`** have one or more `holds-when` predicates. Each must be true. A predicate has `of` (an `is` statement), `op` (`eq`, `ne`, `lt`, `le`, `gt`, `ge`, `match`, `exists`, `age-lt`, `age-gt`), and `value` or `value-of` (another `is` statement). `path` is a dot path into a `json` value.
6. **`will`** has `p` (0 to 1) and `resolves`: a date (it resolves at the end of that date in the `timezone` of the system) or a date-time. Quote a date, so that YAML keeps it as text.
7. **`owner`** defaults to the `owner` of the part, else the first owner of the system. Give a goal an owner and a `reason`.
8. A contact is not a statement. The contacts of a part stay as they are.

The states: an `is` statement is `fresh`, `stale`, `unobserved`, `conflict`, or `error`. An `ought` is `holds`, `at-risk`, or `unknown`. A `will` is `open`, `came-true`, `came-false`, or `unresolved`.

### Instruments

An instrument is a part of the kind `instrument` in `Map/`, with an `instrument` mapping in its frontmatter. So the map includes it, and a person reads its prose. The form is [[tmp-ite-instrument-v0.1]].

```yaml
kind: "instrument"
instrument:
  id: git-flint-remote
  kind: git
  repo: "@Flint"
  fetch: true
  refs: [origin/canon, origin/main]
  version-file: apps/flint-cli/package.json
  compare:
    - [origin/canon, nathan-main]
  every: 10m
  heartbeat: 30m
  events: true
```

| Kind | Config | Properties of one read |
|---|---|---|
| `git` | `repo` (`@<Codebase>` or a path), `refs`, `fetch`, `version-file`, `compare` | For each ref: `<ref>.sha`, `<ref>.time`, `<ref>.subject`, `<ref>.squashed-from`, `<ref>.version`. For each `compare` pair `[a, b]`: `<a>...<b>.left`, `<a>...<b>.right` |
| `npm` | `package`, `registry` (default `https://registry.npmjs.org`), `tags` (default `[latest]`) | For each tag: `<tag>.version`, `<tag>.integrity`, `<tag>.time`; and `modified` |
| `contact` | `part`, `contacts` | For each contact: `<contact id>` (type `verdict`). It runs no contact. |
| `command`, `http` | `run`, `cwd`, `parse`, `property`; `url`, `json-path`, `property` | They parse and show. No read runs them in this version. |
| `person`, `run` | None | A person or a run reports the value. No `every`. |

1. `id` and `kind` are required. An unknown kind gives `instrument-invalid` (warning), and no read runs.
2. `every` is the period of a poll. `heartbeat` is the most time between two successful reads before the instrument is `dead`; the default is two times `every`. With no `every`, an instrument reads only on a request, a notice, or a reconciliation.
3. **A remote ref needs a fetch in the same read.** An instrument with a ref under `origin/` must have `fetch: true`, else it is an error. A failed fetch makes the whole read fail, with no value. Put local refs in another instrument with `fetch: false`.
4. A change of the source of an instrument (a repository, a ref, a URL) gives a new revision. The values of the old revision are no longer accepted. A change of `every`, `heartbeat`, or `events` does not.
5. A dead instrument does not change a value. It makes the value old, and the brief says so.

### Instructions: Executors, Completion, and Authority (`ite-flow/2`)

A flow block with `format: ite-flow/2` can use executors, completion policies, preconditions, inputs bound to a statement, and authority. A flow block with no `format` is `ite-flow/1`: the rules of night 1 apply, and an `agent` or `command` step refuses. A flow of `ite-flow/2` in a program with no system block refuses. The form is [[tmp-ite-flow-v0.1]].

```yaml
format: ite-flow/2
id: ship
title: "Ship Flint to canon"
revision: 1
entry: summary
exits: [ship]
inputs:
  - { name: head, kind: text, required: true, prompt: "The head of nathan-main to ship", statement: machine-head }
steps:
  summary:
    by: agent
    instruction: "Read the commits of origin/canon..${inputs.head} in the repository flint. Write one line that says what the ship holds. Return only that line."
    outputs: [{ name: summary, kind: text }]
    executor: { target: "claude/o55xh", timeout: 30m }
  ship:
    by: person
    instruction: "Press Begin. Then run ndv repo ship flint, with the line of the step summary as the --summary value."
    precondition: [no-pull-debt, checks-on-head]
    completion:
      mode: evidence
      require:
        - { statement: canon-shipped-from, equals: "${inputs.head}" }
      after: dispatched
      within: 2h
      on-timeout: unknown
transitions:
  - { from: summary, to: ship }
authority:
  run: ["person:Nathan"]
  approve: [ship]
  irreversible: [ship]
  approvers: ["person:Nathan"]
```

1. **`executor`** is for `by: agent` (`target`, `timeout`, `idempotent`) or `by: command` (`run`, `cwd`, `timeout`, `idempotent`). An agent step has at most one output, of the kind `text`: the result of its Orbh session.
2. **No text goes into a shell line.** `${...}` in `executor.run` refuses the flow. A command gets its values as environment variables: `ITE_INPUT_<NAME>` and `ITE_VALUE_<STEP>_<OUTPUT>`. `${...}` in `instruction` is text for a person or an agent only.
3. **`completion.mode`** is `outputs` (the default: the Done of a person with valid outputs), `confirm`, or `evidence`. With `evidence`, each item of `require` names an `is` statement **with an instrument** and the value that it must have. A report of a person or an agent never confirms an effect.
4. **`precondition`** names `ought` statements. Each must `hold` at the approval and at the dispatch, else the command refuses with the reason `precondition`.
5. **An input with `statement`** gets the fresh accepted value of that statement in the start form. When the value moves before the approval or the dispatch, the command refuses with the reason `input-moved`.
6. **`authority`** replaces the authority of the system block for this flow, key by key: `run`, `execute`, `approve`, `irreversible`, `approvers`. An actor is `person:<Name>`, `agent:*`, or `agent:<runtime/profile>`. An empty `run` or `approvers` means the owners of the system.
7. The revision of an `ite-flow/2` flow hashes the complete definition, with the executors, the completion, the preconditions, and the authority. A new revision makes each approval of the old revision stale. An active run keeps its snapshot.

How a run goes through a step with an evidence completion:

1. **Intent before effect.** The engine writes the attempt to the run record before it launches an agent, runs a command, or takes the Begin of a person. A crash leaves a visible `unknown` attempt, never a silent effect.
2. **Approval.** A step in `approve` (or in `irreversible`, when the governor says so) waits for a person in `approvers`. The approval binds to the visit, the revision of the flow, and the digest of each value that the visit uses. An agent never approves.
3. **Begin.** The person presses Begin (or runs `flint ite flow dispatch <run>`) before the act. The effect opens with `after: dispatched`.
4. **A Done is a report.** The Done of the person, or the result of the agent, says only that the executor acted. The effect stays `pending` until an instrument observation after the Begin makes each item of `require` true. An observation of another value is rejected, and the run record keeps the reason.
5. **Confirmation.** The engine copies the confirming observations and their digest into the run record. So a run stays explainable on a machine with no system log.
6. **Timeout.** When `within` passes with no evidence, the effect is `unknown` (or `failed`). Late evidence still confirms an `unknown` effect.
7. **Reconcile, waive, retry.** Only a person in `approvers` decides about an `unknown` attempt (`retry`, `failed`, `wait-evidence`) or waives an effect with a reason. A waiver is not a confirmation: the closure counts it apart. Skip refuses on a step with an evidence completion and on an irreversible step.

### The Brief and the Vital Signs

The brief is the centre of a living system in Steel. It has six sections, in this order:

| Section | Items |
|---|---|
| `changed` | An accepted value that changed in the window |
| `at-risk` | An `ought` that is `at-risk`, or a `will` that came false |
| `old` | An `is` that is `stale`, `unobserved`, `conflict`, or `error`, and an instrument that is `dead` |
| `unwatched` | A part with no statement that has an instrument, and a boundary item with no part. Actors, policies, and instruments are left out. |
| `pending` | An effect that waits for evidence, an `unknown` attempt, an approval that waits, and a revision that waits |
| `surprises` | A difference that an instrument found before a person did |

Each item names its source and its age, and its owner. An item belongs to one **episode**: the interval in which its condition is true. An acknowledgement binds to one episode and stops only its escalation. A later failure of the same subject opens a new episode, which escalates on its own. An item that nobody acknowledges escalates after `escalate-after`; an `at-risk` limit escalates at once. The brief writes nothing: only the refresh of the server writes the `detection`, `clearance`, and `escalation` records.

The five vital signs come from evidence, each on its own. There is no single score.

| Vital sign | What it counts |
|---|---|
| Freshness | The `is` statements by state |
| Closure | The effects that an observation confirmed, over the effects that need confirmation. Waived, unknown, and failed effects show apart. |
| Use | The runs of the instructions of the system, the prompts that agents took from the system, and the days that a person opened the brief |
| Surprise | The episodes of `at-risk`, `came-false`, and `conflict`: found by the system or by a person |
| Coverage | The boundary items that a fresh `is` statement meets, with the exclusions and the unknown areas. Never a percentage of reality. |

### Revisions

A revision is a candidate change of one file of the system: `Revisions/<id>.md` in the program folder (`ite-revision/1`). It is not a view candidate: `Candidates/` stays for views. `flint ite revision propose` writes it. The id is `<kind>-<slug>-<yyyymmdd-hhmmss>`, and the kind is `part`, `statement`, `instruction`, `goal`, or `system`.

1. **The targets:** the program file, a part file in `Map/`, a new part file in `Map/`, and a flow view in `Views/`. Never a file in `Runs/`, `History/`, `Revisions/`, or `Candidates/`, the layout note, a file outside the program folder, or a symbolic link.
2. **The check** reads the whole system with the new bytes in place. A finding of the level error, or a refusal of a flow, stops the apply.
3. **The apply** writes the target only when its hash is the base hash, and keeps the exact old bytes in the revision file. **The revert** writes the old bytes back (or removes a new part) only when the target has the hash of the apply. A write that a crash cut is finished at the next read.
4. **A protected change** is a change of `completion`, `authority`, `governor`, `precondition`, `holds-when`, `limit`, `selection`, `goals`, `fresh-for`, `instrument`, `property`, the config of an instrument, or the removal of a statement or an instrument. Only a person applies it, with `--protected`. Each other write path (`flint ite part set`, the view operations, a view candidate, a history restore, a prose edit of the program) refuses a protected change with `forbidden` and the reason `protected-change`.
5. An active run keeps its snapshot. A new run uses the applied flow.

The refresh suggests a revision when a flow has 3 failed or unknown attempts in a row, when an `ought` stays `at-risk` in one episode for more than 7 days, or when a `will` came false. The suggestion is an item of `pending`.

### Authority

**The actor comes from the caller, never from a request.** The CLI acts as `agent:<ORBH_SESSION_ID>` in an Orbh session, else as `person:<Name>`. The server acts as `agent:<session id>` for a request with the header `x-orbh-session-id`, else as the person of this machine. The trust boundary is this machine: the authority layer stops an honest agent from acting outside its policy, and it records who asked. A direct edit of a file is outside the enforced boundary. The next read shows its result, and a protected change made by hand shows as a finding.

The refusals: `not-allowed` (the actor is not in `run` or `execute`), `needs-approval`, `approval-stale` (another revision or other values), `governor-limit`, `agent-cannot-approve`, and `protected-change`.

### Unknown Forms

A statement, an instrument, or a completion of a form, a mode, or a kind that this version does not know stays readable: Steel and the commands show what was written, and no engine evaluates it. A flow of an unknown `format` and a run record of an unknown format refuse each command. No state is invented for an unknown form.

### The Rules of a Living System

1. **Never confidently wrong.** A stale, unobserved, or conflicting input makes an `ought` `unknown`, never `holds`. A dead instrument makes its claims old. A failed fetch gives no value. A prediction scores as of its instant, never later.
2. **A Done is a report.** Only an instrument observation after the dispatch confirms an effect. A report of a person or an agent never confirms one.
3. **A protected change needs a revision** that a person applies. An agent proposes; it never applies a protected revision.
4. **Only commands write facts.** Never write the system log, a run record, or a revision state by hand. Report a value with `flint ite observe --statement`.
5. **An agent never decides for a person.** An agent never approves, waives, or retries, and it never acts on the world unless the step that it executes says so.
6. **The system gives the instruction.** An agent of a living system takes its prompt from the system (`flint ite prompt`), not from a copy of the instruction in another text.

### The Commands of a Living System

Each command takes `--json`. `<program>` is the name or the id of a program with a system block. A program with no block refuses each command but `flint ite system` with `not-living`.

| Command | Result | Writes |
|---|---|---|
| `flint ite system "<program>"` | The root: the owners, the boundary, the goals with their state, the maps, the connections, the instruments, the instructions, the vital signs | Nothing |
| `flint ite statements "<program>"` | Each statement with its state, its value, its source, and its age | Nothing |
| `flint ite evidence "<program>" <statement>` | The evidence of one statement: the observations, the instrument, the inputs of an `ought` | Nothing |
| `flint ite instruments "<program>"` | Each instrument with its health | Nothing |
| `flint ite read "<program>" [--instrument <id>]... [--reconcile]` | Reads the instruments now | The system log |
| `flint ite notice "<program>" --instrument <id> --id <event id> [--ref <ref>] [--revision <sha>]` | Takes one notice; a read follows | The system log |
| `flint ite observe "<program>" --statement <id> --value <v> [--type <t>] --summary "<text>"` | Reports the value of one statement | The system log |
| `flint ite log "<program>" [--since-seq <n>] [--kind <k>] [--limit <n>]` | The records of the system log | Nothing |
| `flint ite brief "<program>" [--since <d>] [--markdown]` | The brief | Nothing |
| `flint ite brief ack "<program>" <item> --episode <id> [--note "<text>"]` | Acknowledges one episode of one item | The system log |
| `flint ite vitals "<program>" [--window <d>]` | The five vital signs | Nothing |
| `flint ite prompt "<program>" [--flow <id> --step <id>] [--attempt <id>]` | The prompt of the system for an agent; with no flow, the reconciliation prompt | The system log (an agent only) |
| `flint ite revision list "<program>" [--state <s>]`, `show "<program>" <id>` | The revisions; one revision with its diff | Nothing |
| `flint ite revision propose "<program>" --kind <k> --target <file> --content-file <path> --reason "<text>" [--base-hash <h>]` | Proposes a revision | `Revisions/` |
| `flint ite revision apply\|revert "<program>" <id> [--protected]`, `discard "<program>" <id>` | Applies, reverts, or discards a revision | The target, `Revisions/` |
| `flint ite flow dispatch <run>` | Dispatches the active visit: the Begin of a person step, or the launch of an agent or a command step | The record |
| `flint ite flow approve <run> --step <id> [--refuse] [--reason "<text>"]` | Approves or refuses one step; the visit, the revision, and the digest come from a read right before the write | The record |
| `flint ite flow reconcile <run> [--attempt <id>] [--decision retry\|failed\|wait-evidence]` | Checks the pending effects against the log now, or decides about an `unknown` attempt | The record |
| `flint ite flow waive <run> --attempt <id> --reason "<text>"` | Waives one pending or unknown effect | The record |

The exit codes: 0 done; 1 a conflict, a refusal of the flow, or a refusal of the authority layer; 2 a refusal of the input.

## The Commands

`flint ite` is a part of the Flint CLI. Each command takes `--json`. `<program>` is the name or the id of a program. `<node>` is the id of a node. `<doc>` is `map` or the UUID of a view.

| Command | Result | Writes |
|---|---|---|
| `flint ite list` | The programs with the framework, the counts, and the grounding | Nothing |
| `flint ite frameworks` | The frameworks with their kinds | Nothing |
| `flint ite map <program>` | The map: each part with its kind, its parent, its links, and its grounding | Nothing |
| `flint ite view <view>` | One view, joined | Nothing |
| `flint ite view history <view>` | The saved forms of one view, the newest first | Nothing |
| `flint ite view restore <view> --from <history id> [--base-hash <hash>]` | Restores a saved form; the current form goes to the history | The view, one history file |
| `flint ite view remove <view> [--base-hash <hash>]` | Keeps the view in the history, then removes it and its candidates. A decision of a person. | One history file; it removes the view |
| `flint ite check [<program>]` | The findings of the map and the views. Exit 1 for an error finding. | Nothing |
| `flint ite check --candidate <id>` | The findings of one candidate only. Exit 1 for an error finding. | Nothing |
| `flint ite create <name> --framework <id> --purpose "<text>"` | A new program | The program folder |
| `flint ite rename <program> <name> [--base-hash <hash>]` | Renames a program and its files, and updates each wikilink in the Mesh. A decision of a person. | The program folder, the wikilinks |
| `flint ite archive <program> [--base-hash <hash>]` | Moves a program to `Mesh/Archive/Programs`. Deletes no file. A decision of a person. | The program folder |
| `flint ite part add <program> --kind <kind> --title "<title>" [--parent <node>] [--text "<text>"]` | A new part | One note |
| `flint ite part set <program> <node> [--title] [--text] [--kind] [--parent] [--field k=v]...` | A changed part | One note |
| `flint ite include <program> "<note name>" [--remove]` | A note of the Mesh on the map; with `--remove`, off the map (the note stays) | The program file |
| `flint ite link <program> <from> <to> --relation <key> [--document <doc>] [--remove]` | A link | One note or the view |
| `flint ite contact add <program> <node> --id <short-slug> --kind <kind> [--claim] [--run] [--cwd] [--url] [--path] [--ref] [--query <json>] [--expect <json>] [--prompt] [--fresh-for] [--direction observe\|act] [--document <doc>]` | A new contact. Give a mapping contact `--id`: a short slug that a person reads (`booking-email`), not the default UUID. A `note` or `reference` contact is a wikilink: give only `--kind` and `--ref "<note name>"`. | One note or the view |
| `flint ite contact remove <program> <node> --contact <id> [--document <doc>]` | Removes one stored contact; the others stay | One note or the view |
| `flint ite run <program> [--document <doc>] [--node <id>...] [--kind <kind>...] [--contact <id>]` | Runs the automatic contacts and records the observations. A `command` contact runs only with `--kind command` or `--contact`. | The observation store |
| `flint ite act <program> <node> --contact <id> [--document <doc>]` | Runs one contact with `direction: act` (it changes reality) and records its result. Only on the request of a person. | Reality, the observation store |
| `flint ite observe <program> <node> --contact <id> --state holds\|fails\|error --summary "<text>" [--evidence kind=value]... [--document <doc>]` | Records one observation. In an Orbh session, `by` is `agent:<session id>`. | The observation store |
| `flint ite observations <program> [--node <id>]` | The observations, the newest first | Nothing |
| `flint ite focus <node id>...` | Sets the interface key `ite-focus` of this Orbh session | The session interface |
| `flint ite diff [<view>] --candidate <id>` | The difference of a candidate and its view | Nothing |
| `flint ite apply [<view>] --candidate <id>` | Applies a candidate. A conflict writes nothing and exits 1. | The view, one history file |
| `flint ite discard --candidate <id>` | Removes a candidate; the view stays | One candidate |
| `flint ite job <program> --template <id> [--document <doc>] [--node <id>...] [--prompt "<text>"] [--target <t>]` | Starts a job | An Orbh session |

The exit codes: 0 done; 1 a finding of the level error, or a conflict; 2 a refusal, and nothing was written. Each write runs inside the lock of the Flint. The Workbench uses the same code through the routes `/api/ite/*` of the Flint server.

When `flint ite` is not a command of your CLI (an older build), write the files by hand in the forms of the templates, check them by reading, and say so in your result. Never write an observation by hand.

## The Focus of an Agent

A person sees each live agent session on the map, as an orb on the nodes of its focus. The focus is the union of the metadata `ite-focus` that the job wrote at the start, and the interface key `ite-focus` that the agent sets. Each workflow of this shard starts with `flint ite focus <node ids>`, and changes the focus when its work moves to other nodes. Follow [[sk-ite-focus]].

## Quality Rules of a Program

A program is for a person. A model that breaks these rules does not help that person think.

1. **The words of the person.** Use the words that the person uses for the system, not the words of a tool. Take the names of the parts from the notes, the sources, and the speech of the person.
2. **Prose first.** Each part has one to three short paragraphs for a person before any tool field. Each view node has one to three sentences before its block. A person must understand the map from the prose alone.
3. **One idea for each node.** When the prose of a part needs two claims, make two parts. A short title: two to six words.
4. **Explain each word of the system at its first use.** "The run sheet is the list of the steps of the night, with a time and a role for each."
5. **Select, do not dump.** Include only what helps the person see the system or answer the question. A level of the main map holds 3 to 9 parts (`max-children`); a deeper level holds the detail; a view of 5 to 15 nodes reads well. Do not make one part for each file, each email, or each line of a sheet. When a view needs more than 25 nodes, propose a split into two views.
6. **Tell the truth about gaps.** When a part of the system is not known, say so in the prose. When a claim has no contact, say so. A model with an honest gap is better than a model with an invented fact.
7. **Anchor each claim to a contact when you can.** A part that makes a claim about reality has a contact: a file, a page, a note, a query, a command, or a statement that a person confirms. Prefer a contact that a command can check.
8. **Never invent a contact that you did not check.** Before you write an automatic contact, check it one time: the path exists, the URL answers, the note exists, the query matches, the command runs. Never invent a story id, a path, a URL, or a note name.
   A contact touches reality outside the model: a `mesh` query that only finds a part of the same program proves nothing about the system.
9. **End each view with what it leaves out.** The last section of a view is one node of `kind: note` that names what the view does not show, and why.
10. **Meaning only.** No grounding, no observation, no finding, no position, and no presence in a file.
11. **Simplified Technical English.** Short sentences, active voice, and one term for one thing.

## Skills and Workflows

| File | Use it when |
|---|---|
| [[wkfl-ite-model]] | A person wants the map of a system: a new program, or more parts on a map |
| [[wkfl-ite-view]] | A person asks a question about a program, and no view answers it |
| [[wkfl-ite-reshape]] | A person asks for a change of a view in words |
| [[wkfl-ite-ground]] | Nodes have no contact, and the person wants to know where they touch reality |
| [[wkfl-ite-observe]] | The person wants to check nodes against reality now |
| [[wkfl-ite-repair]] | Nodes fail or are stale, and the person wants the model true again |
| [[wkfl-ite-map_create]] | A program has no main map, or only a flat one, and the person wants its root and level 1 |
| [[wkfl-ite-map_expand]] | The person wants one part one level deeper |
| [[wkfl-ite-map_refactor]] | A level has too many children, one child, or parts at the wrong level |
| [[wkfl-ite-map_cover]] | Files or items have no part (`coverage-gap`), or two leaves cover one file |
| [[wkfl-ite-map_update]] | The sources of a part changed, and the part is not true now |
| [[sk-ite-focus]] | Each workflow: show the person which nodes you work on |

Each workflow has a headless form (`hwkfl-ite-<name>`) that a job of the Workbench starts. The job templates `do`, `explain`, and `free` have no workflow: the prompt of the job gives the work.
