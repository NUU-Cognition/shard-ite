---
description: "A view of an ITE program (format ite-view/1): the frontmatter, the headings with ids, the node blocks with ref and contact, the eight shapes, and one complete example of a view that is not about software"
---

# Filename: Mesh/Programs/(Program) [Name]/Candidates/[candidate-id].md

/*
  An agent writes a view as a CANDIDATE in Candidates/. The apply (flint ite apply, or the Workbench of Steel)
  writes it to Views/(View) <H1 title>.md: the view gets the id of view_id, and view_id and base_hash go.
  A person can write a view directly (the Workbench, or by hand in Views/). An agent never writes a file in
  Views/ or in History/.

  candidate-id: <view-slug>-<UTC yyyymmdd-hhmmss>, for example run-sheet-of-the-night-20261001-013000.
  The view slug is the H1 title in lower case; each run of characters other than a-z and 0-9 becomes one "-".

  FRONTMATTER CONTRACT (format ite-view/1). Replace the VALUES, keep the shapes. No comment in the frontmatter.
  - format: always "ite-view/1".
  - id: a NEW UUID v4, always: the id of the candidate file. Each id of the Mesh is unique. Write it with no quotes (id: <uuid>).
    In a view that a person writes directly in Views/, id is the id of the view.
  - view_id: the id of the view. For a new view, a second new UUID (the view gets it at the apply).
    For a reshape, the id of the view, unchanged. A file in Views/ has no view_id.
  - tags: always "#ite/view".
  - program: the wikilink to the program file.
  - question: the question of the person, as one sentence.
  - shape: flow | streams | layers | tree | table | free | timeline | board.
  - lifetime: draft for a new view. A reshape keeps the value of the view. Only a person writes kept.
  - curation: an agent always writes proposed. Only a person writes accepted.
  - derived-from: "" or the wikilink of the view that this view came from.
  - base_hash: null for a new view. For a reshape, the SHA-256 hex of the bytes of the view file,
    computed before you read it: shasum -a 256 "<view file>". A file in Views/ has no base_hash.
  - template, authors, orbh-sessions: the Flint conventions.
  - The view holds no grounding, no observation, no finding, no position, and no agent.
  - The H1 has none of the characters \ / : * ? " < > | # ^ [ ]. It is unique in the Mesh.

  THE BODY (the grammar of OrbCode views)
  - One H1: the name of the view. The prose after it answers the question in one to three sentences.
  - Each H2 to H6 heading ends with a stable id: "## Doors open {#doors-open}". The id matches
    [a-z0-9]+(-[a-z0-9]+)* and is unique in the view. It never changes.
  - Depth is containment: a section is inside the nearest heading above it with a lower level.
  - A section has zero or one fenced YAML block with the info string `node`. With a block it is a node;
    with no block it is a group.

  THE NODE BLOCK (each field is optional; write kind in each block)
  - kind: a kind of the framework of the program (`flint ite frameworks`). A lane of a streams view, a group of a
    table, or a band takes the kind of what it stands for (a role, a team, a system). Another word gives a framework note.
  - ref: a wikilink to the note that the node stands for: a part of the map, or another note of the Mesh.
    The node then shares the contacts of that note. Take each ref from `flint ite map <program> --json`.
    Never invent a ref.
  - contact: a list of contacts, in the form of the field contact of a part (tmp-ite-part-v0.1).
  - layer: the layer of the node, when it is not the layer of its kind.
  - A key whose value is a list of node ids of this view is a relation: next, uses, blocks, informs.
  - inside (the id of the parent heading), actor (who acts, one name for one actor), action, result.
  - date (shape timeline, ISO date), status (shape board: the column).

  THE EIGHT SHAPES
  - flow: "how does X happen?" as one sequence. H2 steps with next; a decision has two next or more.
  - streams: two or more sequences with separate purposes (lanes). One H2 for each lane; H3 steps with next.
    A next to a step of another lane is a hand-over.
  - layers: "how is it built?". One H2 group for each layer; H3 nodes with uses to the layers below.
  - tree: "what are the parts of X?". The depth of the headings is the tree.
  - table: items on the same properties. One H2 node for each item, with the same fields and the same order
    of sentences in each.
  - free: no other shape fits. The answer after the H1 says how to read the view.
  - timeline: events in time. One H2 node for each event, each with date.
  - board: items by state. One H2 node for each item, each with status (the column).

  THE QUALITY RULES (the rules of a program, in init-ite)
  - Answer first. Prose first: one to three sentences of prose before each block.
  - One idea for each node. A short title: two to six words.
  - The words of the person. Explain each word of the system at its first use.
  - Select, do not dump: five to fifteen nodes. Propose a split above 25.
  - Anchor each claim: a ref to a part with contacts, or a contact on the node. Never invent a contact.
  - Tell the truth about gaps: say in the prose when a claim has no contact yet.
  - End with one node of kind note: what the view leaves out, and why.
*/

````markdown
---
format: "ite-view/1"
id: GENERATE-UUID4
view_id: "UUID-OF-THE-VIEW"
tags:
  - "#ite/view"
program: "[[(Program) NAME]]"
question: "THE QUESTION OF THE PERSON?"
shape: "flow"
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

## [Title of the node] {#node-id}

[One to three sentences of prose: the one idea of this node.]

```node
kind: "step"
ref: "[[(Program) NAME . (KIND TITLE) TITLE OF THE PART]]"
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

## A complete example (shape `flow`, not about software)

File: `Mesh/Programs/(Program) Garden Share/Views/(View) How the Harvest Reaches Each House.md` (a view that a person wrote directly, so it has no `view_id` and no `base_hash`).

````markdown
---
format: "ite-view/1"
id: 8d2e5b19-0f47-4a3c-9c61-5e7a2b4d0f18
tags:
  - "#ite/view"
program: "[[(Program) Garden Share]]"
question: "How does the harvest of one week get from the beds to each house?"
shape: "flow"
lifetime: "draft"
curation: "proposed"
derived-from: ""
template: "[[tmp-ite-view-v0.1]]"
authors:
  - "[[@Nathan]]"
---

# How the Harvest Reaches Each House

On Saturday the member on duty picks what is ripe, weighs it, and puts it in twelve equal boxes. Each house collects its box from the shed before Sunday night. A box that nobody collects goes to the food bank on Monday.

## Pick what is ripe {#pick}

The member on duty picks only what is ripe, and leaves the rest for the next week.

```node
kind: "step"
ref: "[[(Program) Garden Share . (Step) Pick the harvest]]"
actor: "Member on duty"
next: [weigh]
```

## Weigh and record {#weigh}

The member weighs the harvest of each bed and writes the weights in the harvest log. The log shows which bed gives the most.

```node
kind: "step"
ref: "[[(Program) Garden Share . (Step) Record the harvest]]"
actor: "Member on duty"
next: [share]
contact:
  - id: "log"
    kind: "mesh"
    claim: "The harvest log of this week exists."
    query:
      type: "Log"
      search: "Harvest"
    expect:
      count: ">=1"
    fresh-for: "7d"
```

## Share into twelve boxes {#share}

The member puts the harvest into one box for each house. The boxes get equal weights, not equal items.

```node
kind: "step"
ref: "[[(Program) Garden Share . (Policy) Equal shares by weight]]"
actor: "Member on duty"
next: [collected]
```

## Is each box collected? {#collected}

On Sunday night the member on duty looks in the shed.

```node
kind: "decision"
actor: "Member on duty"
next: [done, food-bank]
```

## Each house has its box {#done}

Each house has its share. The week of the harvest ends.

```node
kind: "output"
contact:
  - id: "boxes"
    kind: "human"
    claim: "No box stayed in the shed on Sunday night."
    fresh-for: "7d"
```

## Give the rest to the food bank {#food-bank}

On Monday the member takes each box that stayed in the shed to the food bank on the main street. No record of the food bank exists yet: this is a gap.

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
- Each step names the part of the map that it stands for with `ref`, and who acts with `actor`. One name for one actor.
- The decision has two `next`. The node "Each house has its box" has its own `human` contact, because no part of the map holds that claim.
- The step "Give the rest to the food bank" has no ref and no contact, and its prose says the gap.
- The last node is a note that says what the view leaves out.
