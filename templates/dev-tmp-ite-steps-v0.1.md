---
description: "A step library note (format ite-steps/1): reusable worksteps with an instruction, inputs, and outputs, that a flow names with uses_step"
---

# Filename: Mesh/Metadata/Step Libraries/(Step Library) [Title].md

/*
  A step library holds reusable worksteps. A workstep is one step definition: an instruction that a
  person reads in the Run panel, the inputs that it needs, an executor, and the outputs that it
  writes. A flow names a workstep with `uses_step: <id>` (or `<library id>/<id>` for another
  library). The resolver reads the library at the start of a run and copies the workstep into the
  snapshot of the run: a later edit of the library never changes an active run.

  FRONTMATTER CONTRACT
  - format: always "ite-steps/1".
  - id: a new UUID v4. This is the id of the note, not the id of the library.
  - tags: always "#ite/steps".
  - template, authors, orbh-sessions: the Flint conventions.

  THE BODY
  - One H1: the title of the library. One or two paragraphs for a person: what the library is for,
    and how a flow uses it. The engine reads only the fenced block with the info string `steps`.

  THE FIELDS OF THE BLOCK
  - id: a lower-case word with "-", unique among the libraries. A flow names it in `library`.
  - title: the title that a person reads.
  - steps: a list of worksteps. Each has:
      id: a lower-case word with "-", unique in the library. `uses_step` names it.
      title: two to five words, imperative or a noun phrase.
      instruction: two to four sentences of Simplified Technical English, imperative. The person
        reads it in the Run panel: it is the largest text of the panel. Say what to write, in which
        form, and what NOT to do.
      by: the default executor (person | agent | command). Night 1 runs only `person`.
      inputs: each with name, kind (text | number | choice | note | notes), required.
      outputs: each with name and kind. An output of the kind `note` or `notes` has:
        part_kind: the `kind` of the part note that the engine writes on the map.
        min: for `notes`, the least count of lines.
        link: { relation, to }: the relation from the new note to the note of the input named `to`,
          or to "$choice" (the chosen note of a `choice` output). When the run value of `to` is a
          text and not a note, the engine writes the note with no link, and the check reports one
          warning (code link-missing): the price of a text input.
        An output of the kind `choice` has `of: <input name>` (the person picks one of those notes).
*/

````markdown
---
format: "ite-steps/1"
id: GENERATE-UUID4
tags:
  - "#ite/steps"
template: "[[tmp-ite-steps-v0.1]]"
authors:
  - "[[@author]]"
---

# [Title]

[One or two paragraphs: what the library is for, and how a flow uses it.]

```steps
id: LIBRARY-ID
title: "TITLE"
steps:
  - id: WORKSTEP-ID
    title: "TITLE"
    instruction: "TWO TO FOUR IMPERATIVE SENTENCES THAT THE PERSON READS IN THE RUN PANEL."
    by: person
    inputs:
      - { name: NAME, kind: note, required: true }
    outputs:
      - { name: NAME, kind: notes, part_kind: KIND-ID, min: 1, link: { relation: RELATION-ID, to: INPUT-NAME } }
```
````

## A complete example

The library `Mesh/Metadata/Step Libraries/(Step Library) Thinking.md` of this Flint holds the ten worksteps of structured thinking (factor, clarify, options, compare, critique, pre-mortem, invert, decide, commit, recall). Read it as the reference form; the workstep `decide` shows a `choice` output and a link to `$choice`.
