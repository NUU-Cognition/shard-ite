---
description: "A template of this Flint (steel-template/1): the start of a new program, with its types, connections, views, and questions, and the instruction for the agent that models a system of that kind, with one complete example"
---

# Filename: Mesh/Metadata/Templates/(Template) [Title].md

/*
  A template is the start of a new program. It is an instruction for the agent that models a system of one kind,
  with one fenced `template` block that Steel reads for the New program dialog. `flint ite create --template <id>`
  copies its types into the `types` of the root note and writes `from-template`. After that, nothing reads it.
  A shard gives templates as install files into `Mesh/Metadata/Templates/` (the ITE shard installs software,
  process, event, research, organisation, and general as `(Template) <Title> (ITE Shard).md`, mode force). Give a
  template of this Flint its own id: an update of the shard writes its own templates again.
  Before you write one, run `flint ite templates` and `flint ite types`. Write a template only when no template fits,
  and when the person agrees. A new type is a type note of Mesh/Metadata/Types/, not a part of a template.

  FRONTMATTER CONTRACT
  - id: a new UUID v4. This is the id of the note, not the id of the template.
  - tags: always "#ite/template".
  - authors, orbh-sessions: the Flint conventions.

  THE BODY
  - One H1: the title of the template. One paragraph for a person: the kind of system, and when to use it.
  - "## How to model a system of this kind": the steps of the agent (create the program, propose the first level
    of the main map as one map change, join the parts with the connections, write the claims and their processes,
    answer the questions with views).
  - "## The types": one row for each type: the name, the id, and when to use it.
  - "## The connections" (optional) and "## The questions".
  - One fenced block with the info string `template`, at the end.

  THE TEMPLATE BLOCK (format steel-template/1). The keys:
  - format: always steel-template/1.
  - id: a lower-case word with "-", unique in this Flint.
  - title, description: for a person.
  - types: the type ids of a new program, in order. Each is a type of `flint ite types`; end with note.
  - connections: the connection ids that the parts use (`flint ite types` lists them). parent is not a connection.
  - views: the first views of a new program: a list of { map, question }. map is a builtin shape (flow, streams,
    layers, tree, table, free, timeline, board) or the id of a map of Steel/Maps/.
  - questions: example questions that a view of this kind of system answers.
  - shapes (optional): the builtin shapes that fit, the best first.
  - layers (optional): the layers of the canvas legend: a list of { id, title, description }.
*/

````markdown
---
id: GENERATE-UUID4
tags:
  - "#ite/template"
authors:
  - "[[@author]]"
orbh-sessions:
  - "[[AGENT-SESSION-UUID]]"
---

# [Title of the template]

[One paragraph for a person: the kind of system, and when to use this template.]

## How to model a system of this kind

1. Write the root note with `flint ite create "<Name>" --template TEMPLATE-ID --purpose "<one sentence>"`.
2. Find the first level of the main map: at most 9 parts below the root, each of one of the types below. Propose them as one map change with `flint ite map change propose`. A person applies it.
3. Join the parts with the connections below.
4. Write each claim that a person can check as a claim of a part, and give it a process.
5. Answer the questions below with views.

## The types

| Type | Id | When to use it |
|------|----|----------------|
| [Name] | `[id]` | [One sentence] |

## The questions

- [A question of a person]

```template
format: steel-template/1
id: TEMPLATE-ID
title: "TITLE"
description: "ONE SENTENCE: THE KIND OF SYSTEM."
types: [TYPE-ID, TYPE-ID, note]
connections: [next, uses, depends-on, owner, informs, mentions]
views:
  - { map: tree, question: "A QUESTION OF A PERSON?" }
questions: ["A QUESTION OF A PERSON?"]
```
````

## A complete example

The template Work of this Flint: `Mesh/Metadata/Templates/(Template) Work.md` (cut short).

````markdown
# Work

The work of a Flint as a system: the tasks, the notepads, and the reports that the shards of the Flint define, grouped by the themes that a person thinks in. Use this template to see what is in work now, and which theme each piece of work serves.

## The questions

- What is in work now, and what is blocked?
- Which theme has the most open work?

```template
format: steel-template/1
id: work
title: "Work"
description: "The work of a Flint: tasks, notepads, and reports of the shards, grouped by theme, with the people who own them."
types: [theme, task, notepad, report, person, note]
connections: [next, uses, depends-on, owner, informs, mentions]
views:
  - { map: board, question: "What is in work now, and what is blocked?" }
  - { map: tree, question: "Which theme has the most open work?" }
questions: ["What is in work now, and what is blocked?", "Which theme has the most open work?"]
shapes: [board, tree, table, timeline]
layers:
  - { id: direction, title: "Direction", description: "Which themes does the work serve?" }
  - { id: work, title: "Work", description: "What is in work now, and in which state?" }
```
````

What the example does:

- `types` lists the type ids. `task`, `notepad`, and `report` are types of the shards of this Flint: a part of the type Task is the task note itself, with a `parent` in the program.
- `views` gives the two first views of a new program, each with its map and its question.
- `flint ite templates` shows the template, and `flint ite create "<Name>" --template work` uses it.
