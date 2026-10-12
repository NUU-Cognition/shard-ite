---
description: "Programs and their things: the root note, the part file, types, connections, and templates, the view file, maps, references, proposals (the candidate and the apply), the main map, its saved places, and the map change, and the quality rules of a program"
---

# Knowledge: Programs, Parts, the Main Map, and Views

Read this file before you write a root note, a part, a map change, a view, a candidate, a map of `Steel/Maps/`, or a type. The rules of [[init-ite]] apply with no change. The terms and the folders are in [[knw-ite-reference]].

## The Root Note

`Mesh/Programs/(Program) <Name>/(Program) <Name>.md`. Make it with `flint ite create "<Name>" --purpose "<text>" [--template <id>]` (with no `--template`, the template is a guess from the purpose; each new program also gets the process `keep-map-true`, not enabled, and a starter kit of its template: one piece of state, one code process, and one code claim); the form is [[tmp-ite-program-v0.1]].

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
| `codebase`, `product-root` | Software only: the codebase and the folder of the product that holds `orbtest/` (see Software Programs in [[knw-ite-software]]) |
| `template`, `authors`, `orbh-sessions` | The Flint conventions |

A living system adds one fenced `system` block to the body (see Living Systems in [[knw-ite-loop]]).

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
5. **No claims in a part.** A part has no field `claims`. A claim is a folder of `Reality/`, and it names its parts with `about` (see Claims and Checks in [[knw-ite-state]]).
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

**A template** is the start of a new program: one note `Mesh/Metadata/Templates/(Template) <Name>.md`. A shard gives its templates as install files into that folder: the ITE shard installs `(Template) <Title> (ITE Shard).md` with the mode `force`, so each new version of the shard writes them again. A template is an instruction for the agent that models a system of that kind, with one fenced `template` block that Steel reads for the New program dialog. The form is [[tmp-ite-template-v0.1]].

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

`flint ite create` copies the types of the template into the root note (`types`) and writes `from-template`. After that, nothing reads the template. The ITE shard gives six templates: `software`, `process`, `event`, `research`, `organisation`, and `general` ([[(Template) Event (ITE Shard)]] and the others). To change one, write your own template in a new note with another id: an update of the shard writes its own six again. Follow the instruction of the template when you model a new program. Add a type, a connection, or a template only when none fits, and when the person agrees.

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
4. The node block: `kind` (a type id); `layer`; the relations `next`, `uses`, `blocks`, `informs`, `depends-on` (lists of heading ids of the same view: part ids or slugs); `inside`, `actor`, `action`, `result`; `date` (map `timeline`); `status` (map `board`). A node with a slug id can also have `part` (the id of the part where a step runs: see The Anchor of a Step in [[knw-ite-software]]), `code-refs`, `stories`, and `criteria` (see Software Programs in [[knw-ite-software]]), and `reviewed` (only the review writes it: see The Review in [[knw-ite-software]]).
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
6. **A data map** (`kind: data`) draws one piece of data, not a view, and it has the code of a store (`store: data.js`). See Data Maps in [[knw-ite-state]].

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

### The Places of the Main Map

The main map is manual: each card stays where a person or an agent puts it.

- **A saved place.** Each part has one place in `Steel/Programs/<P>/State/main.json`: `positions[<part id>] = { x, y, parent }`. The place is the top left corner of the box of the part, relative to the **room** of its parent: in a group, the room inside the group box (below its title row); at the top of the root or of a layer, the canvas of that level. `parent` is the parent that the place is for (null: the top of the root). A place for another parent than the parent of the part now is old: the part shows at the place of a new card.
- **A group or a layer.** A part with children is a group (a box on the level of its parent, with its parts inside) or a layer (one card that a person enters). The field `map-mode` of the note (`group` or `layer`) gives the mode; with no field, a part with at most 9 parts and 2 levels below it is a group, and a larger part is a layer. The size of a group follows its parts.
- **Only a person or an agent moves a card.** Nothing pushes a card, and two cards can overlap. The canvas of the Workbench and `flint ite place` write one place. A place is not meaning: it is in `State/`, not in the Mesh, so a move applies at once, also for an agent. It is not a proposal.
- **The place of a new card.** The engine calculates only the place of a new card: to the right of the last box of its level, or at the start of a new row below. When a map change applies or reverts (an add, a move, a split, a merge, a removal), and when a revision of a part file applies or reverts, each part with no saved place for its parent now gets that place in the same lock. A new part that the canvas adds at a position keeps that position. Each other place stays.
- **Arrange runs only when a person or an agent asks.** `flint ite arrange` puts the groups of one level in columns, then the cards in rows. It never runs by itself.

| Command | Result | Writes |
|---|---|---|
| `flint ite places <program> [--in <part>] [--deep]` | The place and the size of each part of one level (default: the top of the root), its mode, and `saved` or `new` (no saved place for its parent now). `--deep` adds each level below, indented. | Nothing |
| `flint ite place <program> <part> --at <x>,<y>` | Sets the place of one part, relative to the room of its parent. The place snaps to the grid of 8. In a group, a negative value is 0. | `State/main.json` |
| `flint ite place <program> <part> --near <part> [--side right\|below]` | Puts one part beside a part with the same parent (default: to its right). A part of another parent is refused. | `State/main.json` |
| `flint ite arrange <program> [--in <part>] [--only <part>,<part>] [--deep]` | One Arrange of the parts of `--in` (default: the top of the root). `--only` moves only the named parts and keeps the top left corner of their boxes. `--deep` arranges each group and layer below too. It prints how many parts moved. | `State/main.json` |
| `flint ite arrange <program> --all` | One Arrange of each level of the program | `State/main.json` |

A part reference is an id, a note name, or a title. Example: `flint ite place "Club Launch" "Venue booked" --near "Launch budget" --side below`. Read `flint ite places` before a move: each place is relative to the room of the parent of the part.

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

Each verb takes `--json`. `flint ite map <program>` with no verb gives the tree with the id of each part, the totals, and three next commands; `--full` adds the text, the links, and the grounding of each part, and `--json` gives each part with its type, its parent, its links, and its grounding. In an Orbh session the actor is `agent:<session id>`, else `person:<Name>`.

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
