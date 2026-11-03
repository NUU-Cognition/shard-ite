---
id: 92deef82-1111-401b-89a8-1fee90c245e3
tags:
  - "#ite/template"
---

# Organisation

A team or an organisation: its teams, roles, and people, the duties, the meetings, and the decisions that run it, and the goals and numbers that direct it.

## How to model a system of this kind

You are an agent that models one system of the kind "Organisation" as a program of Steel. Follow these steps:

1. Write the root note of the program with `flint ite create "<Name>" --template organisation --purpose "<one sentence>"`. The root note gets the `types` of this template and `from-template: organisation`.
2. Find the first level of the main map: the parts below the root. Each part is one Mesh note of one of the types below, with `parent` set to the root note. Propose them as one map change with `flint ite map change propose`. A person applies it.
3. Join the parts with the connections below. A connection is a frontmatter key of a part, with a wikilink to the other part.
4. Give each part one to three short paragraphs in the words of the person. When a fact is not known, say so in the prose. Take a part one level deeper with one more map change, when the person asks for it.
5. Use the questions below to find the parts that a person needs. Check the map with `flint ite map check "<Name>"`. A person reads each map change and applies it.

Use only the types of this template. When a part fits no type, use the type `note` and tell the person.

## The types

| Type | Id | When to use it |
|------|----|----------------|
| Team | `team` | A group of people that work together. |
| Role | `role` | A set of duties that one person holds. |
| Person | `person` | A person of the organisation. |
| Responsibility | `responsibility` | A duty that a team or a role owns. |
| Ritual | `ritual` | A meeting or a practice that repeats, such as a weekly review. |
| Decision | `decision` | A choice that the organisation made, with its reason. |
| Goal | `goal` | What the organisation wants to achieve. |
| Metric | `metric` | A number that shows the progress to a goal. |
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
| `reports-to` | reports to | The person or the role reports to the other node. |

## The questions

- Who owns each responsibility?
- Which meetings does each team hold, and why?
- Which decisions did we make this quarter, and why?
- Which goals have no metric?
- Who does a new member talk to in the first week?

```template
format: steel-template/1
id: organisation
title: "Organisation"
description: "A team or an organisation: its teams, roles, and people, the duties, the meetings, and the decisions that run it, and the goals and numbers that direct it."
types: [team, role, person, responsibility, ritual, decision, goal, metric, note]
connections: [next, uses, depends-on, owner, informs, mentions, reports-to]
views:
  - { map: tree, question: "Who owns each responsibility?" }
  - { map: table, question: "Which decisions did we make this quarter, and why?" }
questions: ["Who owns each responsibility?", "Which meetings does each team hold, and why?", "Which decisions did we make this quarter, and why?", "Which goals have no metric?", "Who does a new member talk to in the first week?"]
shapes: [tree, layers, table, board, free]
layers:
  - { id: structure, title: "Structure", description: "Who is in the organisation, and in which team?" }
  - { id: operation, title: "Operation", description: "Who does what, and how do they decide?" }
  - { id: direction, title: "Direction", description: "Where does the organisation go, and how do we know?" }
  - { id: notes, title: "Notes", description: "Which notes explain the system?" }
```
