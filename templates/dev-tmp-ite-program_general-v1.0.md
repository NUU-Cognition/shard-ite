---
description: "The template general of a program: a system of any kind. An instruction for an agent that models a system of this kind, and the template block that Steel reads"
---

# General

A system of any kind. Use it when no other framework fits: it has things, actors, processes, states, goals, and questions.

## How to model a system of this kind

You are an agent that models one system of the kind "General" as a program of Steel. Follow these steps:

1. Write the root note of the program with `flint ite create "<Name>" --template general --purpose "<one sentence>"`. The root note gets the `types` of this template and `from-template: general`.
2. Find the first level of the main map: at most 9 parts below the root. Each part is one Mesh note of one of the types below, with `parent` set to the root note. Propose them as one map change with `flint ite map change propose`. A person applies it.
3. Join the parts with the connections below. A connection is a frontmatter key of a part, with a wikilink to the other part.
4. Write each claim that a person can check as a claim of a part (`claims`), and give it a process that checks it against reality.
5. Answer the questions below with views. Each view is one map for one question.

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

- What are the main parts of the system?
- What happens, and in which order?
- Who acts in the system, and what do they change?
- What must the system achieve?
- What do we not know yet?

```template
format: steel-template/1
id: general
title: "General"
description: "A system of any kind. Use it when no other framework fits: it has things, actors, processes, states, goals, and questions."
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
