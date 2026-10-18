---
id: df4118e8-3257-437f-8a83-d6acf31ba027
tags:
  - "#ite/template"
---

# Software

A software product: its systems, modules, features, and data, the people and programs that use it, and the processes that run through it. The root note names the codebase, and the parts and the views name the code and the stories of Orbtest. Normal claims test each node: `orbtest-proof` (the proof of Orbtest) and `reviews-current` (the review). See Programs with a Codebase of [[knw-ite-software]].

## How to model a system of this kind

You are an agent that models one system of the kind "Software" as a program of Steel. Follow these steps:

1. Write the root note of the program with `flint ite create "<Name>" --template software --purpose "<one sentence>"`. The root note gets the `types` of this template and `from-template: software`. Give it `codebase` (a wikilink to the codebase marker `"[[rf-cb-<slug>]]"`) and `product-root` (the folder that holds `orbtest/`, relative to the codebase) when `orbtest/` is not at the codebase root. With no `product-root`, the product root is the codebase root. The field `codebase` gives the program its file coverage and its code checks.
2. Find the first level of the main map: the parts below the root. Each part is one Mesh note of one of the types below, with `parent` set to the root note. Give each part the `code-refs` of its code (name files, not large folders) and the `stories` of Orbtest that test it. Propose them as one map change with `flint ite map change propose`. A person applies it.
3. Join the parts with the connections below. A connection is a frontmatter key of a part, with a wikilink to the other part.
4. Write each statement that must be true now as a claim about its parts (`Steel/Programs/<Name>/Reality/<id>/claim.md`, [[tmp-ite-claim-v0.1]]), with its check process (`Processes/check-<id>/`) that reads reality. A claim never states a goal, a target with a date, or a prediction. When the work of the system runs in an order that a person or an agent follows, write it as the instruction map of a process ([[tmp-ite-instruction_map-v0.1]]): steps of a run are nodes of a map, not parts.
5. Answer the questions below with views. Each view is one map for one question. A process of the product is a view of the map `flow` or `streams`: each step names the part where it runs with `part` and who acts with `actor` (see The Anchor of a Step of [[knw-ite-software]]).

Use only the types of this template. When a part fits no type, use the type `note` and tell the person.

## The types

| Type | Id | When to use it |
|------|----|----------------|
| System | `system` | A large part of the product that a person can name, such as the command line or the server. |
| Module | `module` | A part of a system that has one job, such as the parser of a file. |
| Feature | `feature` | One thing that a person can do with the product. |
| Data | `data` | A file, a record, or a store that the product reads or writes. |
| Actor | `actor` | A person or another program that uses the product. |
| Step | `step` | One step of a process: one action and its result. |
| Decision | `decision` | A point in a process where the path divides. |
| Process | `process` | A series of steps that the product runs from a start to an end, such as the sync of a Flint. |
| Stream | `stream` | A lane of steps that runs beside other lanes, such as the work of the server during the work of the client. |
| Note | `note` | A note that explains a part of the system. It makes no claim, so it has no grounding. |

## The connections

| Key | Words | Meaning |
|-----|-------|---------|
| `next` | then | The next node in a flow. A step goes to its next step. |
| `uses` | uses | The node needs the other node to do its work. |
| `depends-on` | depends on | The node cannot finish before the other node is done. |
| `owner` | owned by | The person, the role, or the team that is responsible for the node. |
| `informs` | informs | The node gives information to the other node. |
| `mentions` | mentions | The text of the node names the other node. |

## The questions

- How does a person go from a new machine to the first agent session?
- Which systems make up the product, and what does each one do?
- What happens when a person saves a file?
- Which data does each feature read and write?
- Which parts of the product have no test?

```template
format: steel-template/1
id: software
title: "Software"
description: "A software product: its systems, modules, features, and data, the people and programs that use it, and the processes that run through it."
types: [system, module, feature, data, actor, step, decision, process, stream, note]
connections: [next, uses, depends-on, owner, informs, mentions]
views:
  - { map: layers, question: "Which systems make up the product, and what does each one do?" }
  - { map: flow, question: "How does a person go from a new machine to the first agent session?" }
questions: ["How does a person go from a new machine to the first agent session?", "Which systems make up the product, and what does each one do?", "What happens when a person saves a file?", "Which data does each feature read and write?", "Which parts of the product have no test?"]
shapes: [layers, flow, streams, tree, table, free]
layers:
  - { id: structure, title: "Structure", description: "What are the parts of the product?" }
  - { id: actors, title: "Actors", description: "Who and what uses the product?" }
  - { id: process, title: "Process", description: "What happens, and in which order?" }
  - { id: notes, title: "Notes", description: "Which notes explain the system?" }
```
