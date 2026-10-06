---
description: "The program file of an ITE program (format ite-program/1): the frontmatter, the text for a person, the optional system block of a living system (ite-system/1), and complete examples"
---

# Filename: Mesh/Programs/(Program) [Name]/(Program) [Name].md

/*
  The program file is the root of one program: the model of one system.
  `flint ite create "<Name>" --framework <id> --purpose "<text>"` makes it with the folders.
  Write it by hand only when `flint ite` is not a command of your CLI.

  THE FOLDER OF A PROGRAM
    Mesh/Programs/(Program) <Name>/
      (Program) <Name>.md                        the program file (this template)
      (Program) <Name> . (Layout).md             the layout note: only flint ite and the layout route write it
      Map/(Program) <Name> . (<Kind>) <Title>.md one note for each part (tmp-ite-part-v0.1)
      Views/(View) <Title>.md                    one file for each view (tmp-ite-view-v0.1)
      Candidates/<candidate-id>.md               a view that an agent wrote and that waits for the apply
      Revisions/<revision-id>.md                 a living system: a change of one file that waits for a person
      History/<view-slug>-<yyyymmdd-hhmmss>.md   a replaced form of a view (only flint ite writes it)

  FRONTMATTER CONTRACT (format ite-program/1). Replace the VALUES, keep the shapes. No comment in the frontmatter.
  - format: always "ite-program/1".
  - id: a new UUID v4 (uuidgen | tr A-Z a-z). It never changes. Write it with no quotes (id: <uuid>), so that grep "^id: <uuid>" finds the note.
  - tags: always "#ite/program".
  - framework: the id of one framework: software, process, event, research, organisation, general,
    or the id of a framework note of Mesh/Metadata/Frameworks/. `flint ite frameworks` lists them.
  - purpose: one sentence for a person: what the system is, and why a person models it.
  - status: active or archived.
  - include: wikilinks to notes of the Mesh (of any type) that are parts of the map, but that live outside Map/:
    a task, a person, a meeting, a report. [] when there is none.
  - sources: queries; each note that a query matches is a part of the map. Each item has type, where, tags,
    links_to, or search (the fields of a Mesh query), and kind (the kind of the matched parts). [] when there is none.
  - template, authors, orbh-sessions: the Flint conventions. authors is the person for whom you work.
  - The program file holds no grounding, no observation, no finding, no position, and no agent.
    A command computes these facts.

  THE BODY
  - One H1: the name of the program. The file name is "(Program) <H1>.md".
  - One to three short paragraphs for a person: what the system is, what the map shows, and how to read it.
    Name the views that a person reads first. Say what the program leaves out.

  THE SYSTEM BLOCK (optional: a living system only, format ite-system/1)
  - A program becomes a living system with one fenced block with the info string `system`, under the H1 and the
    first paragraph. The program file keeps `format: ite-program/1`. A program with no block is not living.
  - Add the block only when the person wants the system watched: statements, instruments, and the brief.
  - The keys are kebab-case:
    format: always ite-system/1.
    owners: the wikilinks of the persons who own the system. They are the default approvers and owners.
    timezone: the IANA timezone of the system. A `resolves` date of a will statement ends in this timezone. Default UTC.
    boundary: inside (a list of { name, parts }: the words of the person and the wikilinks of the parts of the map
      that cover it), outside (a list of words), unknown (a list of words), decided-by (a wikilink), decided-at
      (a quoted date), reason (one sentence). The boundary is a decision of a person: never invent it.
    connections: a list of { to, imports, exports, via }: what crosses the boundary, and what carries it.
    maps: a list of { path, owner, standpoint, scope, detail }. path is "Map/" for the map of this program.
      standpoint is native (the actors act through this map), operator, or observer (the default).
    goals: the ids of the ought statements that are the goals. Each must exist.
    attention: { escalate-after, brief-since }. Default 24h for each.
    authority: { run, execute, approve, irreversible, approvers }. An actor is person:<Name>, agent:*, or
      agent:<runtime/profile>. Omit it: the owners run each instruction.
    governor: { max-runs-per-day, max-attempts-per-step, max-agent-attempts-per-day, irreversible-needs-approval }.
  - Quote each date, so that YAML keeps it as text.
  - A prose edit keeps the block. A change of goals, authority, or governor is a protected change: it goes only
    through a revision that a person applies (flint ite revision propose).
  - The block holds meaning only: no state of a goal, no value, and no vital sign.
*/

````markdown
---
format: "ite-program/1"
id: GENERATE-UUID4
tags:
  - "#ite/program"
framework: "FRAMEWORK-ID"
purpose: "ONE SENTENCE: WHAT THE SYSTEM IS, AND WHY A PERSON MODELS IT."
status: "active"
include:
  - "[[NAME OF A NOTE OF THE MESH]]"
sources: []
template: "[[tmp-ite-program-v0.1]]"
authors:
  - "[[@author]]"
orbh-sessions:
  - "[[AGENT-SESSION-UUID]]"
---

# [Name of the program: two to five words in the words of the person]

[One to three short paragraphs for a person: what the system is, what the map shows, how to read it, and what the program leaves out.]
````

## A complete example

File: `Mesh/Programs/(Program) Garden Share/(Program) Garden Share.md`.

````markdown
---
format: "ite-program/1"
id: 0b7d8e2a-4c15-4f63-9a0e-6d2c1b8f5e37
tags:
  - "#ite/program"
framework: "process"
purpose: "How the street garden shares its tools and its harvest, so that a new member knows what to do each week."
status: "active"
include:
  - "[[@Nathan]]"
sources:
  - type: "Meeting"
    links_to: "(Program) Garden Share"
    kind: "input"
template: "[[tmp-ite-program-v0.1]]"
authors:
  - "[[@Nathan]]"
---

# Garden Share

The street garden has twelve members, one tool shed, and four beds. This program models the week of the garden: who waters, who takes the tools, and how the harvest goes to each house. The map shows the actors, the steps of one week, and the policies that the members agreed.

Read the view "One week in the garden" first. The program leaves out the money of the garden: the treasurer keeps it in another sheet.
````

## A complete example of a living system

The program file of Flint Release in this Flint (`Mesh/Programs/(Program) Flint Release/(Program) Flint Release.md`) is the reference form. Its root, cut short:

````markdown
# Flint Release

This program models how a change of Flint reaches a release. [...]

```system
format: ite-system/1
owners: ["[[@Nathan]]"]
timezone: Australia/Sydney
boundary:
  inside:
    - { name: "the branch canon", parts: ["[[(Program) Flint Release . (System) Canon]]"] }
    - { name: "the package on npm", parts: ["[[(Program) Flint Release . (System) npm registry]]"] }
  outside: ["the hotfix loop", "the release of the shard sources"]
  unknown: ["who runs each publish to npm"]
  decided-by: "[[@Nathan]]"
  decided-at: "2026-10-05"
  reason: "The release of the Flint CLI from nathan-main to npm. The program prose names the exclusions."
connections:
  - { to: "npm registry", imports: [], exports: ["the package @nuucognition/flint-cli"], via: "scripts/publish.sh" }
maps:
  - { path: "Map/", owner: "[[@Nathan]]", standpoint: native, scope: "the release of the Flint CLI", detail: "one part for each actor, system, step, gate, rule, and instrument" }
goals: [no-pull-debt, monthly-release]
attention: { escalate-after: 24h, brief-since: 24h }
authority:
  run: ["person:Nathan"]
  approvers: ["person:Nathan"]
governor: { max-runs-per-day: 3, max-attempts-per-step: 3, max-agent-attempts-per-day: 10, irreversible-needs-approval: true }
```

Since 2026-10-05, Flint Release is a living system. [...]
````
