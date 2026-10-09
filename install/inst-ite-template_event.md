---
id: 981fba84-7ecf-4441-992f-2d2ac585cb56
tags:
  - "#ite/template"
---

# Event

An event, from the first idea to the last thank-you message: its goals and milestones, the people, the places, and the things it needs, the work to do, the run of the day, and the risks and the budget.

## How to model a system of this kind

You are an agent that models one system of the kind "Event" as a program of Steel. Follow these steps:

1. Write the root note of the program with `flint ite create "<Name>" --template event --purpose "<one sentence>"`. The root note gets the `types` of this template and `from-template: event`.
2. Find the first level of the main map: at most 9 parts below the root. Each part is one Mesh note of one of the types below, with `parent` set to the root note. Propose them as one map change with `flint ite map change propose`. A person applies it.
3. Join the parts with the connections below. A connection is a frontmatter key of a part, with a wikilink to the other part.
4. Write each statement that must be true as a claim about its parts (`Steel/Programs/<Name>/Reality/<id>/claim.md`, [[tmp-ite-claim-v0.1]]), with a check that reads reality. When the work of the system runs in an order that a person or an agent follows, write it as the instruction map of a process ([[tmp-ite-instruction_map-v0.1]]): steps of a run are nodes of a map, not parts.
5. Answer the questions below with views. Each view is one map for one question.

Use only the types of this template. When a part fits no type, use the type `note` and tell the person.

## The types

| Type | Id | When to use it |
|------|----|----------------|
| Goal | `goal` | What the event must achieve, such as 120 guests or a new sponsor. |
| Milestone | `milestone` | A point in time when a part of the plan is done, such as "Venue booked". |
| Deliverable | `deliverable` | A thing that the event makes or gives, such as a poster, a booking, or a speech. |
| Person | `person` | A person who takes part: a guest, a speaker, a helper, or a partner. |
| Role | `role` | A job that one person does at the event, such as host or treasurer. |
| Venue | `venue` | A place where the event, or a part of it, happens. |
| Resource | `resource` | A thing that the event needs, such as equipment, food, or a room. |
| Task | `task` | A piece of work that a person must do. It is a Task of the Mesh, with its own status. |
| Step | `step` | One step of the run of the event, in order, such as "Doors open". |
| Risk | `risk` | A thing that can go wrong, and what to do when it does. |
| Budget | `budget` | An amount of money: where it comes from and where it goes. |
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

- What must be done before the doors open, and by when?
- Who does what on the night?
- Which tasks are not done yet, and what do they block?
- What can go wrong, and what do we do then?
- Where does the money come from, and where does it go?

```template
format: steel-template/1
id: event
title: "Event"
description: "An event, from the first idea to the last thank-you message: its goals and milestones, the people, the places, and the things it needs, the work to do, the run of the day, and the risks and the budget."
types: [goal, milestone, deliverable, person, role, venue, resource, task, step, risk, budget, note]
connections: [next, uses, depends-on, owner, informs, mentions, blocks]
views:
  - { map: timeline, question: "What must be done before the doors open, and by when?" }
  - { map: streams, question: "Who does what on the night?" }
  - { map: board, question: "Which tasks are not done yet, and what do they block?" }
questions: ["What must be done before the doors open, and by when?", "Who does what on the night?", "Which tasks are not done yet, and what do they block?", "What can go wrong, and what do we do then?", "Where does the money come from, and where does it go?"]
shapes: [timeline, board, flow, tree, table, free]
layers:
  - { id: plan, title: "Plan", description: "What must the event achieve, and by when?" }
  - { id: structure, title: "Structure", description: "Who takes part, where, and with what?" }
  - { id: work, title: "Work", description: "What work must people do?" }
  - { id: process, title: "Process", description: "What happens on the day, and in which order?" }
  - { id: control, title: "Control", description: "What can go wrong, and what does it cost?" }
  - { id: notes, title: "Notes", description: "Which notes explain the system?" }
```
