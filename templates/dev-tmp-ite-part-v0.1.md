---
description: "A part of an ITE program: one Mesh note of a type, with its parent, its links, its keeper (kept-by), its optional pointer (points-to), and prose for a person, with complete examples of a part and of a pointer part"
---

# Filename: Mesh/Programs/(Program) [Name]/Map/(Program) [Name] . ([Type]) [Title].md

/*
  A part is one Mesh note of a program. A note is a part when its `parent` chain reaches the root note.
  `flint ite part add <program> --kind <type id> --title "<title>" [--parent <part>]` makes it with a map change:
  a person's change applies at once, an agent's change is a proposal that a person applies.
  Each change of the structure (the title, the type, the parent) is a map change. Never write a new part file,
  a `parent`, or a `(Type)` word with your own tools. `flint ite part set` changes the prose and the
  fields that are not structure: a person's change writes at once, and an agent's change is a proposal (one map
  change, `edit`) that a person applies. `flint ite link` is the same for a link.
  A note of another type (a Task, a Person) is a part when its `parent` names a part of the program: give it its
  parent with a map change (op move).

  THE FILE NAME
  - "(Program) <Name> . (<Type>) <Title>.md", for example "(Program) Club Launch Night . (Milestone) Venue booked.md".
  - The type is the last (Type) word of the file name. It is one of the `types` of the root note
    (`flint ite types` lists the types of this Flint). The type id is the name in lower case, spaces as "-".
    A change of type is a rename with a new (Type) word: the map change op rename with `kind`.
  - The title has none of the characters \ / : * ? " < > | # ^ [ ]. The name is unique in the Mesh.
  - The title starts with a word, not a number: a number after the (Type) word reads as the number of an artifact,
    as in "(Task) 1099 ...". Write "A full hall and 30 new members", not "80 guests".
  - The folder Map/ is the default home of a new part. A folder is for a person only: the membership is `parent`.
  - The name starts with the stem of the root note: "<stem of the root note> . (<Type>) <Title>.md". A root note
    with another type word or folder gives its own stem, for example "(Product) Flint . (Feature) Local Flint.md".

  FRONTMATTER CONTRACT. Replace the VALUES, keep the shapes. No comment in the frontmatter.
  - id: a new UUID v4 (uuidgen | tr A-Z a-z). It never changes. Each view heading, claim, process, step, run, state, and proposal
    names the part by this id. Write it with no quotes (id: <uuid>), so that grep "^id: <uuid>" finds the note.
  - tags: always "#ite/part".
  - parent: one wikilink to the part that holds this part, or to the root note "[[(Program) <Name>]]" for a top part.
  - A connection is a key whose value is one wikilink or a list of wikilinks: next, uses, depends-on, informs, owner,
    blocks. Each wikilink gives one link, with the key as the connection. Use the connections of the types of the
    program (`flint ite types`). Name a link only when it is true.
  - owner: the person or the role that answers for the part, as a wikilink. Omit it when nobody owns the part.
  - No status: the engine reads no status of a part. Do not write status: active or status: untested. A note of a
    type with a status of its own (a Task) keeps its status. "Untested" is computed: no claim covers the part.
  - kept-by: optional, "process:<id>": the keeper of the part, a process of the same program that keeps the note true.
    A part with no kept-by uses the keeper of its parent, up to the root note; the root with no kept-by uses
    process:keep-map-true when the program has it. Write kept-by only when this part needs another keeper than its
    parent. A keeper writes only proposals for the part (a map change, a revision, a candidate), never the note itself.
  - points-to: optional, ONE target of the same program: "process:<id>", "data:<id>", or "view:<id>". It makes the part
    a POINTER PART: its card on the main map shows the face of its target (a process: its jobs, its last run, and the
    button Run; a data item: its value or its count and its state; a view: its shape and the button Open). A pointer
    part is a normal part: the rules of the tree count it, it has a keeper, and it can have a future note. Add it with a
    map change, as each part. A target that does not exist is the finding pointer-target-missing (error).
  - SOFTWARE ONLY (a program with codebase, see Software Programs of knw-ite-software):
    code-refs: the paths of the code of the part, relative to the codebase: a file, a small folder (ends with /),
    a symbol (path#Name), or a path of another codebase (@<Codebase name>/<path>). Name files, not large folders.
    Each path must exist. The coverage reads them for a type with covers-files.
    stories: Orbtest story ids. criteria: criterion addresses <story-id>#<index> (only some criteria of a story).
    Take them from `flint orbtest story list --root <product root>`. Never invent them.
    reviewed: the review anchor. Only `flint ite review` writes it. Never write or edit it.
  - template, authors, orbh-sessions: the Flint conventions.
  - The part holds no grounding, no proof, no result, no finding, and no position. A command computes these facts.
  - The part has no field claims. A claim is a folder of Steel/Programs/<Name>/Reality/ that names the part in
    its `about` ([[tmp-ite-claim-v0.1]]). One claim can be about many parts, and one part can have many claims.
  - A part says what the system is. A step of an instruction map is not a part: it is a node of the map.md of a
    process ([[tmp-ite-instruction_map-v0.1]]), and it names the parts that it uses by their ids.

  THE BODY
  - One H1: "(<Type>) <Title>". It is for a person; no code reads it.
  - One to three short paragraphs for a person: what this part is, and what is true when it is done or when it holds.
    Use the words of the person. One idea for each part. A wikilink in the prose gives a link of the connection mentions.
*/

````markdown
---
id: GENERATE-UUID4
tags:
  - "#ite/part"
parent: "[[(Program) NAME . (TYPE) TITLE OF THE PARENT]]"
next:
  - "[[(Program) NAME . (TYPE) TITLE OF THE NEXT PART]]"
owner: "[[(Program) NAME . (Person) NAME OF THE OWNER]]"
template: "[[tmp-ite-part-v0.1]]"
authors:
  - "[[@author]]"
orbh-sessions:
  - "[[AGENT-SESSION-UUID]]"
---

# (TYPE) [Title]

[One to three short paragraphs for a person: what this part is, and what is true when it is done.]
````

## A complete example

File: `Mesh/Programs/(Program) Garden Share/Map/(Program) Garden Share . (Resource) The beds.md`.

````markdown
---
id: 3f1c9a47-7e2b-4d08-b6a5-91c0e4d27f83
tags:
  - "#ite/part"
parent: "[[(Program) Garden Share . (System) The garden]]"
uses:
  - "[[(Program) Garden Share . (System) Tool shed]]"
owner: "[[(Program) Garden Share . (Actor) Member on duty]]"
template: "[[tmp-ite-part-v0.1]]"
authors:
  - "[[@Nathan]]"
---

# (Resource) The beds

The garden has four raised beds behind the hall. The member on duty waters them on Tuesday and on Saturday, with the hose of the tool shed.

Two claims are about this part: `beds-watered` (its check is a person check: the member on duty answers each week) and `rain-week` (its check is code that reads the forecast).
````

What the example does:

- The file name gives the program, the type `Resource`, and the title. The H1 repeats the type and the title.
- `parent` puts the beds inside the system "The garden". `uses` is a connection: each wikilink is one link.
- `owner` names a part of the same program (an actor), so the link has a target.
- Two claims in `Steel/Programs/Garden Share/Reality/` are about the part: `beds-watered` and `rain-week`. Each names the part by its id in `about`, and its check process with `kept-by`. The part file holds no claim and no state.
- The part has no `status` and no `kept-by`: its keeper is the keeper of its parent, and in the end the process `keep-map-true` of the program.

## A complete example of a pointer part

File: `Mesh/Programs/(Program) Garden Share/Map/(Program) Garden Share . (Process) Water the beds.md`. The card stands near the beds on the main map, and it shows the process `water-beds`: its jobs, its last run, and the button Run.

````markdown
---
id: 9c27e1d4-5b83-4f0a-a6d2-3e81f4c07b59
tags:
  - "#ite/part"
parent: "[[(Program) Garden Share . (System) The garden]]"
points-to: "process:water-beds"
template: "[[tmp-ite-part-v0.1]]"
authors:
  - "[[@Nathan]]"
---

# (Process) Water the beds

The member on duty waters the four beds on Tuesday and on Saturday. The process `water-beds` sends the reminder to the member on duty the evening before.
````

- `points-to` names one target of the same program. A run from the card uses the gate of the process: the card gives no authority.
- The pointer part is a part of the tree: it counts for the level, it can have children, and it can have a future note.
