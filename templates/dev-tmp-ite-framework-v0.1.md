---
description: "A framework note of the Mesh (format ite-framework/1): the kinds, the relations, the layers, the shapes, and the questions of one kind of system, with one complete example"
---

# Filename: Mesh/Metadata/Frameworks/(Framework) [Title].md

/*
  A framework is the vocabulary of one kind of system. The ITE has six builtin frameworks in code
  (software, process, event, research, organisation, general). A framework note adds a new framework to this Flint.
  A framework note with the id of a builtin framework replaces the builtin framework in this Flint.
  Before you write one, run `flint ite frameworks`: extend a builtin framework only when its kinds do not fit.

  FRONTMATTER CONTRACT
  - format: always "ite-framework/1".
  - id: a new UUID v4. This is the id of the note, not the id of the framework.
  - tags: always "#ite/framework".
  - template, authors, orbh-sessions: the Flint conventions.

  THE BODY
  - One H1: the title of the framework. One or two paragraphs for a person: the kind of system, and when to use it.
  - One fenced block with the info string `framework`: YAML with the fields below. The block is the truth;
    the prose is for the person.

  THE FIELDS OF THE BLOCK
  - id: a lower-case word with "-", unique among the frameworks. A program names it in `framework`.
  - title, description (one to three sentences).
  - layers: each with id, title, description (the question that the layer answers).
  - kinds: each with
      id (a lower-case word with "-", unique in the framework: the `kind` of a part),
      title (singular: the (Kind) word of the file name of a part), plural, description (one sentence: when to use it),
      hue (water | earth | fire | sun | air | teal | rose | stone: a name of the NUU theme, never a colour value),
      icon (a lucide-react icon name, for example box, flag, users, calendar),
      layer (the id of one layer), container (true when a part of this kind holds other parts on the map),
      mesh_type (the Mesh type of a part of this kind, for example Task, or null for a plain part in Map/).
    Always add the kind note (a remark that makes no claim).
  - relations: each with id (the frontmatter key or block field), title (the words for a person: "then", "uses"),
    description, style (flow | dependency | containment | reference). Keep next, uses, inside, depends-on, owner,
    informs, and mentions, with the builtin meaning.
  - shapes: the shapes of views that fit, the best first (flow, streams, layers, tree, table, free, timeline, board).
  - questions: three to six example questions that a view of this framework answers, in the words of a person.
*/

````markdown
---
format: "ite-framework/1"
id: GENERATE-UUID4
tags:
  - "#ite/framework"
template: "[[tmp-ite-framework-v0.1]]"
authors:
  - "[[@author]]"
---

# [Title of the framework]

[One or two paragraphs for a person: the kind of system that the framework models, and when to use it.]

```framework
id: FRAMEWORK-ID
title: "TITLE"
description: "ONE TO THREE SENTENCES."
layers:
  - { id: "LAYER-ID", title: "TITLE", description: "THE QUESTION THAT THE LAYER ANSWERS." }
kinds:
  - { id: "KIND-ID", title: "Title", plural: "Titles", description: "WHEN TO USE IT.", hue: "water", icon: "box", layer: "LAYER-ID", container: false, mesh_type: null }
  - { id: "note", title: "Note", plural: "Notes", description: "A remark that makes no claim.", hue: "stone", icon: "sticky-note", layer: "LAYER-ID", container: false, mesh_type: null }
relations:
  - { id: "next", title: "then", description: "The process continues there.", style: "flow" }
shapes: [flow, table]
questions:
  - "A QUESTION OF A PERSON?"
```
````

## A complete example

File: `Mesh/Metadata/Frameworks/(Framework) Course.md`.

````markdown
---
format: "ite-framework/1"
id: c41e7a90-2d5b-4f86-8b3e-0a9f6c1d7e25
tags:
  - "#ite/framework"
template: "[[tmp-ite-framework-v0.1]]"
authors:
  - "[[@Nathan]]"
---

# Course

A course that a person teaches or takes: its outcomes, its units and lessons, its assessments, and the people in it. Use it to see what a learner must know at the end, and which lesson and which assessment give each outcome.

```framework
id: course
title: "Course"
description: "A course of study: the outcomes, the units and lessons that teach them, and the assessments that check them."
layers:
  - { id: "direction", title: "Direction", description: "What must a learner know at the end?" }
  - { id: "content", title: "Content", description: "What does the course teach, and in which order?" }
  - { id: "check", title: "Check", description: "How does the course know that a learner learned it?" }
  - { id: "people", title: "People", description: "Who teaches and who learns?" }
kinds:
  - { id: "outcome", title: "Outcome", plural: "Outcomes", description: "One thing that a learner can do at the end.", hue: "sun", icon: "target", layer: "direction", container: false, mesh_type: null }
  - { id: "unit", title: "Unit", plural: "Units", description: "A group of lessons on one topic.", hue: "water", icon: "folder", layer: "content", container: true, mesh_type: null }
  - { id: "lesson", title: "Lesson", plural: "Lessons", description: "One session of teaching.", hue: "water", icon: "book-open", layer: "content", container: false, mesh_type: null }
  - { id: "assessment", title: "Assessment", plural: "Assessments", description: "A test or a task that checks an outcome.", hue: "fire", icon: "clipboard-check", layer: "check", container: false, mesh_type: null }
  - { id: "person", title: "Person", plural: "People", description: "A teacher or a learner.", hue: "earth", icon: "user", layer: "people", container: false, mesh_type: null }
  - { id: "note", title: "Note", plural: "Notes", description: "A remark that makes no claim.", hue: "stone", icon: "sticky-note", layer: "content", container: false, mesh_type: null }
relations:
  - { id: "next", title: "then", description: "The course continues there.", style: "flow" }
  - { id: "uses", title: "uses", description: "This node needs the other node.", style: "dependency" }
  - { id: "inside", title: "inside", description: "This node is a part of the other node.", style: "containment" }
  - { id: "depends-on", title: "depends on", description: "This node can start only after the other node.", style: "dependency" }
  - { id: "owner", title: "owned by", description: "The person who answers for this node.", style: "reference" }
  - { id: "informs", title: "informs", description: "This node gives information to the other node.", style: "reference" }
  - { id: "mentions", title: "mentions", description: "The prose names the other node.", style: "reference" }
  - { id: "checks", title: "checks", description: "This assessment checks the outcome.", style: "reference" }
shapes: [tree, flow, table, timeline]
questions:
  - "Which lesson teaches each outcome?"
  - "Which outcome has no assessment?"
  - "What is the order of the units in the term?"
  - "What does a learner do in week 3?"
```
````

What the example does:

- Each kind has a layer, a hue name of the theme, and an icon. Only `unit` is a container.
- The framework adds one relation, `checks`, and keeps the seven relations of the builtin frameworks.
- The questions are in the words of a teacher, so a person can start a view from one of them.
