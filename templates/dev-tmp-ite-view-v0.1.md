---
description: "A view of a program (format steel-view/1): the frontmatter with the map and the slice, the headings with ids (the part id for a node that stands for a part), the node blocks, the eight builtin shapes and the maps of Steel/Maps, and one complete example of a view that is not about software"
---

# Filename: Steel/Programs/[Name]/Proposals/[candidate-id].md

/*
  A view is a file of Steel/, not of the Mesh: Steel/Programs/<Name>/Views/(View) <Title>.md.
  An agent writes a view as a CANDIDATE in Steel/Programs/<Name>/Proposals/. The apply (flint ite apply, or the
  Workbench of Steel) writes it to Views/(View) <H1 title>.md: the view gets the id of view_id, and view_id,
  base_hash, and state go. The candidate file stays, with state: applied.
  A person can write a view directly (the Workbench, or by hand in Views/). An agent never writes a file in
  Views/ or in History/.

  candidate-id: <view-slug>-<UTC yyyymmdd-hhmmss>, for example run-sheet-of-the-night-20261001-013000.
  The view slug is the H1 title in lower case; each run of characters other than a-z and 0-9 becomes one "-".

  FRONTMATTER CONTRACT (format steel-view/1). Replace the VALUES, keep the shapes. No comment in the frontmatter.
  - format: always "steel-view/1".
  - id: a NEW UUID v4, always: the id of the candidate file. Write it with no quotes (id: <uuid>).
    In a view that a person writes directly in Views/, id is the id of the view.
  - view_id: the id of the view. For a new view, a second new UUID (the view gets it at the apply).
    For a reshape, the id of the view, unchanged. A file in Views/ has no view_id.
  - state: always proposed in a candidate. A file in Views/ has no state.
  - tags: always "#ite/view".
  - question: the question of the person, as one sentence.
  - map: the map that draws the view. A builtin shape (flow | streams | layers | tree | table | free | timeline | board),
    which Steel draws natively, or the id of a map of Steel/Maps/ (for example outline, owners, status-board), which
    Steel runs in a sandbox. Read Steel/Maps/*/map.md: each map says what it shows and what it needs.
  - slice: optional. { below: <part id>, types: [<type id>...] }: the parts below one part, of some types. Each part
    of the slice is a node of the view, also when the view has no heading for it. With no slice, the nodes are the
    headings only.
  - lifetime: draft for a new view. A reshape keeps the value of the view. Only a person writes kept.
  - curation: an agent always writes proposed. Only a person writes accepted.
  - derived-from: "" or the wikilink of the view that this view came from.
  - base_hash: null for a new view. For a reshape, the SHA-256 hex of the bytes of the view file,
    computed before you read it: shasum -a 256 "<view file>". A file in Views/ has no base_hash.
  - template, authors, orbh-sessions: the Flint conventions.
  - No program field: the folder gives the program.
  - The view holds no grounding, no observation, no finding, no position, and no agent.
  - The H1 has none of the characters \ / : * ? " < > | # ^ [ ].

  THE BODY (the grammar of OrbCode views)
  - One H1: the name of the view. The prose after it answers the question in one to three sentences.
  - Each H2 to H6 heading ends with a stable id. The id matches [a-z0-9]+(-[a-z0-9]+)* and is unique in the view.
  - A node that stands for a part has the PART ID as its heading id: "## Doors open {#66d9ddb1-384a-46d7-ae27-1d4061868b88}".
    The part id is the frontmatter id of the part. Take each part id from `flint ite map <program> --json`.
    Never invent a part id. A part has at most one node in a view.
  - A node with no part (a concept that no part holds) has a slug id: "## Set up the hall {#set-up}". The check
    says so (anchor-missing): a gap of the main map, or a concept of the view.
  - Depth is containment: a section is inside the nearest heading above it with a lower level.
  - A section has zero or one fenced YAML block with the info string `node`. With a block it is a node;
    with no block it is a group (or, when its id is a part id, the node of that part).

  THE NODE BLOCK (each field is optional)
  - kind: the type id of the node (`flint ite types`). A node of a part takes the type of the part when it has no kind.
  - The heading id names the part, so the block names no part.
  - A process of Steel/Programs/<Name>/Reality/ checks a part. The node shows the grounding of its part.
  - layer: the layer of the node, when it is not the layer of its type.
  - A key whose value is a list of node ids of this view is a relation: next, uses, blocks, informs, depends-on.
    A node id is a heading id: a part id or a slug.
  - inside (the id of the parent heading), actor (who acts, one name for one actor), action, result.
  - date (map timeline, ISO date), status (map board: the column).

  THE EIGHT BUILTIN SHAPES
  - flow: "how does X happen?" as one sequence. H2 steps with next; a decision has two next or more.
    An instruction map (parts with next) gets map: flow and slice: { below: <its root part id> }.
  - streams: two or more sequences with separate purposes (lanes). One H2 for each lane; H3 steps with next.
    A next to a step of another lane is a hand-over.
  - layers: "how is it built?". One H2 group for each layer; H3 nodes with uses to the layers below.
  - tree: "what are the parts of X?". The depth of the headings is the tree.
  - table: items on the same properties. One H2 node for each item, with the same fields and the same order
    of sentences in each.
  - free: no other shape fits. The answer after the H1 says how to read the view.
  - timeline: events in time. One H2 node for each event, each with date.
  - board: items by state. One H2 node for each item, each with status (the column).
  A map of Steel/Maps/ reads the parts of the view (the headings and the slice) and the prose of each node.
  Use one when its map.md says that it answers the question better than a builtin shape.

  THE QUALITY RULES (the rules of a program, in init-ite)
  - Answer first. Prose first: one to three sentences of prose before each block.
  - One idea for each node. A short title: two to six words.
  - The words of the person. Explain each word of the system at its first use.
  - Select, do not dump: five to fifteen nodes. Propose a split above 25. A slice selects too: keep it small.
  - Anchor each claim: a node of a part with a process. Never invent a part id.
  - Tell the truth about gaps: say in the prose when a node has no part, or its part has no process yet.
  - End with one node of kind note: what the view leaves out, and why.
*/

````markdown
---
format: "steel-view/1"
id: GENERATE-UUID4
view_id: "UUID-OF-THE-VIEW"
state: proposed
tags:
  - "#ite/view"
question: "THE QUESTION OF THE PERSON?"
map: flow
lifetime: "draft"
curation: "proposed"
derived-from: ""
base_hash: null
template: "[[tmp-ite-view-v0.1]]"
authors:
  - "[[@author]]"
orbh-sessions:
  - "[[AGENT-SESSION-UUID]]"
---

# [Name of the view: two to five words in the words of the person]

[The answer to the question in one to three sentences.]

## [Title of the node] {#PART-ID-OF-THE-PART}

[One to three sentences of prose: the one idea of this node.]

```node
kind: "step"
actor: "WHO ACTS"
next: [NEXT-NODE-ID]
```

(continue)

## What this view leaves out {#left-out}

[One to three sentences: what the view does not show, and why.]

```node
kind: "note"
```
````

## A complete example (map `flow`, not about software)

File: `Steel/Programs/Garden Share/Views/(View) How the Harvest Reaches Each House.md` (a view that a person wrote directly, so it has no `view_id`, no `state`, and no `base_hash`).

````markdown
---
format: "steel-view/1"
id: 8d2e5b19-0f47-4a3c-9c61-5e7a2b4d0f18
tags:
  - "#ite/view"
question: "How does the harvest of one week get from the beds to each house?"
map: flow
lifetime: "draft"
curation: "proposed"
derived-from: ""
template: "[[tmp-ite-view-v0.1]]"
authors:
  - "[[@Nathan]]"
---

# How the Harvest Reaches Each House

On Saturday the member on duty picks what is ripe, weighs it, and puts it in twelve equal boxes. Each house collects its box from the shed before Sunday night. A box that nobody collects goes to the food bank on Monday.

## Pick what is ripe {#4f1c2a7e-9b3d-4e85-a6f0-1d2c3b4a5e60}

The member on duty picks only what is ripe, and leaves the rest for the next week.

```node
kind: "step"
actor: "Member on duty"
next: [7a9e0c31-52bd-4f6a-8c17-3e4d5f6a7b81]
```

## Weigh and record {#7a9e0c31-52bd-4f6a-8c17-3e4d5f6a7b81}

The member weighs the harvest of each bed and writes the weights in the harvest log. The process "Harvest log" checks each week that the log exists.

```node
kind: "step"
actor: "Member on duty"
next: [share]
```

## Share into twelve boxes {#share}

The member puts the harvest into one box for each house. The boxes get equal weights, not equal items. No part of the map holds this step yet: this is a gap.

```node
kind: "step"
actor: "Member on duty"
next: [collected]
```

## Is each box collected? {#collected}

On Sunday night the member on duty looks in the shed.

```node
kind: "decision"
actor: "Member on duty"
next: [b2d4f6a8-0c1e-4a3b-9d5f-7e8a9b0c1d22, food-bank]
```

## Each house has its box {#b2d4f6a8-0c1e-4a3b-9d5f-7e8a9b0c1d22}

Each house has its share. The week of the harvest ends. A person's check ("No box stayed in the shed") is the process of this part.

```node
kind: "output"
```

## Give the rest to the food bank {#food-bank}

On Monday the member takes each box that stayed in the shed to the food bank on the main street. No part and no process holds this step yet: this is a gap.

```node
kind: "step"
actor: "Member on duty"
```

## What this view leaves out {#left-out}

This view leaves out the water, the tools, and the money of the garden. The question asks only how the harvest reaches each house.

```node
kind: "note"
```
````

What the example does:

- The answer after the H1 answers the question in three sentences, in the words of the members.
- Each step that a part holds has the part id as its heading id. Its grounding comes from the processes of the part. The node block names who acts with `actor`. One name for one actor.
- The decision has two `next`, and each `next` names a heading id: a part id or a slug.
- The steps "Share into twelve boxes" and "Give the rest to the food bank" have slug ids: no part holds them, and their prose says the gap.
- The last node is a note that says what the view leaves out.
