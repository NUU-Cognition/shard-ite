---
description: "The template process of a program: a process of a business: the people and the tools that do the work, the steps and the decisions in order, what goes in and what comes out, and the rules and numbers that control it. An instruction for an agent that models a system of this kind, and the template block that Steel reads"
---

# Business process

A process of a business: the people and the tools that do the work, the steps and the decisions in order, what goes in and what comes out, and the rules and numbers that control it.

## How to model a system of this kind

You are an agent that models one system of the kind "Business process" as a program of Steel. Follow these steps:

1. Write the root note of the program with `flint ite create "<Name>" --template process --purpose "<one sentence>"`. The root note gets the `types` of this template and `from-template: process`.
2. Find the first level of the main map: at most 9 parts below the root. Each part is one Mesh note of one of the types below, with `parent` set to the root note. Propose them as one map change with `flint ite map change propose`. A person applies it.
3. Join the parts with the connections below. A connection is a frontmatter key of a part, with a wikilink to the other part.
4. Write each statement that must be true as a claim about its parts (`Steel/Programs/<Name>/Reality/<id>/claim.md`, [[tmp-ite-claim-v0.1]]), with a check that reads reality. When the work of the system runs in an order that a person or an agent follows, write it as the instruction map of a process ([[tmp-ite-instruction_map-v0.1]]): steps of a run are nodes of a map, not parts.
5. Answer the questions below with views. Each view is one map for one question.

Use only the types of this template. When a part fits no type, use the type `note` and tell the person.

## The types

| Type | Id | When to use it |
|------|----|----------------|
| Actor | `actor` | A person, a team, or a partner that does steps of the process. |
| System | `system` | A tool or a system that the process uses, such as a spreadsheet or a shop. |
| Stage | `stage` | A group of steps of the process that go together, such as the review or the release. |
| Step | `step` | One step of the process: one action and its result. |
| Decision | `decision` | A point in the process where the path divides. |
| Input | `input` | What the process takes in: a request, a form, or a material. |
| Output | `output` | What the process gives out: a product, a record, or a message. |
| Policy | `policy` | A rule that the process must obey. |
| Metric | `metric` | A number that shows how well the process works. |
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
| `blocks` | blocks | The node stops the other node until it is done. |

## The questions

- What happens from the first request of a customer to the payment?
- Who does each step, and which tool do they use?
- Where does the process wait, and why?
- Which policies apply to each step?
- Which numbers show that the process works well?

```template
format: steel-template/1
id: process
title: "Business process"
description: "A process of a business: the people and the tools that do the work, the steps and the decisions in order, what goes in and what comes out, and the rules and numbers that control it."
types: [actor, system, stage, step, decision, input, output, policy, metric, note]
connections: [next, uses, depends-on, owner, informs, mentions, blocks]
views:
  - { map: flow, question: "What happens from the first request of a customer to the payment?" }
  - { map: streams, question: "Who does each step, and which tool do they use?" }
questions: ["What happens from the first request of a customer to the payment?", "Who does each step, and which tool do they use?", "Where does the process wait, and why?", "Which policies apply to each step?", "Which numbers show that the process works well?"]
shapes: [flow, streams, board, table, tree, free]
layers:
  - { id: structure, title: "Structure", description: "Who and what does the work?" }
  - { id: process, title: "Process", description: "What happens, and in which order?" }
  - { id: control, title: "Control", description: "Which rules and numbers control the process?" }
  - { id: notes, title: "Notes", description: "Which notes explain the system?" }
```
