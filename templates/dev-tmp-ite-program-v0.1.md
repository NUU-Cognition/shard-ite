---
description: "The root note of an ITE program (format steel-program/1): the frontmatter, the text for a person, the optional system block of a living system (steel-system/1), and complete examples"
---

# Filename: Mesh/Programs/(Program) [Name]/(Program) [Name].md

/*
  The root note is the root of one program: the model of one system. A note of the Mesh is a part of the
  program when its `parent` chain reaches the root note.
  `flint ite create "<Name>" --template <id> --purpose "<text>"` makes it, and the folder Steel/Programs/<Name>/.
  `flint ite templates` lists the templates.

  THE FOLDERS OF A PROGRAM
    Mesh/Programs/(Program) <Name>/
      (Program) <Name>.md                        the root note (this template)
      Map/(Program) <Name> . (<Type>) <Title>.md the default home of a new part (tmp-ite-part-v0.1)
    Steel/Programs/<Name>/
      program.md                                 id = the id of the root note
      Views/(View) <Title>.md                    one file for each view (tmp-ite-view-v0.1)
      Reality/<id>/claim.md                      one folder for each claim, with its check (tmp-ite-claim-v0.1)
      Processes/<id>/process.md (+ map.md)       one folder for each process (tmp-ite-process-v0.1), with its map (tmp-ite-instruction_map-v0.1)
      Proposals/<id>.md                          map changes, view candidates, revisions (only the engines write here)
      Runs/, History/, State/                    run records, replaced forms of views, positions (only the engines write here)

  FRONTMATTER CONTRACT (format steel-program/1). Replace the VALUES, keep the shapes. No comment in the frontmatter.
  - format: always "steel-program/1".
  - id: a new UUID v4 (uuidgen | tr A-Z a-z). It never changes. It is the id of the program in Steel/ and in the log.
    Write it with no quotes (id: <uuid>), so that grep "^id: <uuid>" finds the note.
  - tags: always "#ite/program".
  - purpose: one sentence for a person: what the system is, and why a person models it.
  - status: active or archived.
  - types: the names of the types that the program uses, from its template: [Goal, Milestone, Step, Note].
    `flint ite types` lists the types of this Flint. Each part has one of these types.
  - from-template: the id of the template that made the program. History only: nothing decides with it.
  - main-map (optional): max-children and coverage-ignore (see The Main Map of init-ite).
  - codebase, product-root (software only): the codebase and the folder of the product.
  - template, authors, orbh-sessions: the Flint conventions. authors is the person for whom you work.
  - The root note holds no grounding, no result, no finding, no position, and no agent.
    A command computes these facts.

  THE BODY
  - One H1: the name of the program. The file name is "(Program) <H1>.md".
  - One to three short paragraphs for a person: what the system is, what the map shows, and how to read it.
    Name the views that a person reads first. Say what the program leaves out.

  THE SYSTEM BLOCK (optional: a living system only, format steel-system/1)
  - A program becomes a living system with one fenced block with the info string `system`, under the H1 and the
    first paragraph. The root note keeps `format: steel-program/1`. A program with no block is not living.
  - Add the block only when the person wants the system watched: claims, processes that feed them, and the brief.
  - The keys are kebab-case:
    format: always steel-system/1.
    owners: the wikilinks of the persons who own the system. They are the default approvers and owners.
    timezone: the IANA timezone of the system. A `resolves` date of a will claim ends in this timezone. Default UTC.
    boundary: inside (a list of { name, parts }: the words of the person and the wikilinks of the parts of the map
      that cover it), outside (a list of words), unknown (a list of words), decided-by (a wikilink), decided-at
      (a quoted date), reason (one sentence). The boundary is a decision of a person: never invent it.
    connections: a list of { to, imports, exports, via }: what crosses the boundary, and what carries it.
    maps: a list of { path, owner, standpoint, scope, detail }. path is "Map/" for the map of this program.
      standpoint is native (the actors act through this map), operator, or observer (the default).
    goals: the ids of the ought claims that are the goals. Each must exist.
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
format: "steel-program/1"
id: GENERATE-UUID4
tags:
  - "#ite/program"
purpose: "ONE SENTENCE: WHAT THE SYSTEM IS, AND WHY A PERSON MODELS IT."
status: "active"
types: [TYPE NAME, TYPE NAME, Note]
from-template: "TEMPLATE-ID"
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
format: "steel-program/1"
id: 0b7d8e2a-4c15-4f63-9a0e-6d2c1b8f5e37
tags:
  - "#ite/program"
purpose: "How the street garden shares its tools and its harvest, so that a new member knows what to do each week."
status: "active"
types: [Actor, System, Stage, Step, Decision, Input, Output, Policy, Metric, Note]
from-template: "process"
template: "[[tmp-ite-program-v0.1]]"
authors:
  - "[[@Nathan]]"
---

# Garden Share

The street garden has twelve members, one tool shed, and four beds. This program models the week of the garden: who waters, who takes the tools, and how the harvest goes to each house. The map shows the actors, the steps of one week, and the policies that the members agreed.

Read the view "One week in the garden" first. The program leaves out the money of the garden: the treasurer keeps it in another sheet.
````

## A complete example of a living system

The root note of Flint Release in this Flint (`Mesh/Programs/(Program) Flint Release/(Program) Flint Release.md`) is the reference form. Its root, cut short:

````markdown
# Flint Release

This program models how a change of Flint reaches a release. [...]

```system
format: steel-system/1
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
  - { path: "Map/", owner: "[[@Nathan]]", standpoint: native, scope: "the release of the Flint CLI", detail: "one part for each actor, system, step, gate, and rule" }
goals: [no-pull-debt, monthly-release]
attention: { escalate-after: 24h, brief-since: 24h }
authority:
  run: ["person:Nathan"]
  approvers: ["person:Nathan"]
governor: { max-runs-per-day: 3, max-attempts-per-step: 3, max-agent-attempts-per-day: 10, irreversible-needs-approval: true }
```

Since 2026-10-05, Flint Release is a living system. [...]
````
