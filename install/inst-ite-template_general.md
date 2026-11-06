---
id: efe7e52e-6719-4a59-bdea-01d0c9c19a31
tags:
  - "#ite/template"
orb:
  - "@v1/nuucognition/session/cb2fbb61-6a9d-4cc8-aa5c-7588d998e369#flint/nuu-flint"
orbh-fleet: steel-map-refresh-1104
---

# General

A system of any kind. Use it when no other template fits: it has things, actors, processes, states, goals, and questions.

## How to model a system of this kind

You are an agent that models one system of the kind "General" as a program of Steel. Follow these steps:

1. Write the root note of the program with `flint ite create "<Name>" --template general --purpose "<one sentence>"`. The root note gets the `types` of this template and `from-template: general`.
2. Find the first level of the main map: the parts below the root. Each part is one Mesh note of one of the types below, with `parent` set to the root note. Propose them as one map change with `flint ite map change propose`: a person applies it. In the mode `direct` of the ITE shard (The Two Modes in [[init-ite]]), add `--apply`: the change applies at once.
3. Join the parts with the connections below. A connection is a frontmatter key of a part, with a wikilink to the other part.
4. Give each part one to three short paragraphs in the words of the person, and one Mermaid diagram when the part has a flow, an order of steps, or states (see Diagrams in the Prose in [[knw-ite-programs]]). When a fact is not known, say so in the prose. Take a part one level deeper with one more map change, when the person asks for it.
5. Use the questions below to find the parts that a person needs. Check the map with `flint ite map check "<Name>"`. A person reads each map change and applies it, except in the mode `direct`.

Use only the types of this template. When a part fits no type, use the type `note` and tell the person.

## The types

| Type | Id | When to use it |
|------|----|----------------|
| Thing | `thing` | A part of the system. |
| Actor | `actor` | A person or a thing that acts in the system. |
| Process | `process` | A series of actions that changes the system. |
| State | `state` | A condition of the system at one time. |
| Goal | `goal` | What the system must achieve. |
| Question | `question` | A question about the system that has no answer yet. |
| Note | `note` | A note that explains a part of the system. |

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

- What are the main parts of the system?
- What happens, and in which order?
- Who acts in the system, and what do they change?
- What must the system achieve?
- What do we not know yet?

```template
format: steel-template/1
id: general
title: "General"
description: "A system of any kind. Use it when no other template fits: it has things, actors, processes, states, goals, and questions."
types: [thing, actor, process, state, goal, question, note]
connections: [next, uses, depends-on, owner, informs, mentions]
views:
  - { map: free, question: "What are the main parts of the system?" }
  - { map: flow, question: "What happens, and in which order?" }
questions: ["What are the main parts of the system?", "What happens, and in which order?", "Who acts in the system, and what do they change?", "What must the system achieve?", "What do we not know yet?"]
shapes: [free, tree, flow, layers, table, board, timeline, streams]
layers:
  - { id: structure, title: "Structure", description: "What are the parts of the system, and who acts in it?" }
  - { id: dynamics, title: "Dynamics", description: "How does the system change?" }
  - { id: direction, title: "Direction", description: "What must the system achieve, and what do we not know yet?" }
  - { id: notes, title: "Notes", description: "Which notes explain the system?" }
```
