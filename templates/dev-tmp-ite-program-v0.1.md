---
description: "The root note of an ITE program (format steel-program/1): the frontmatter, the text for a person, and a complete example"
orb:
  - "@v1/nuucognition/session/9f552ce0-0455-44ed-b8ec-d749c3ae9b2f#flint/nuu-orbh"
  - "@v1/nuucognition/session/ccaed053-844a-48bd-966a-41a2e32d6412#flint/nuu-flint"
---

# Filename: Mesh/Programs/(Program) [Name]/(Program) [Name].md

/*
  The root note is the root of one program: the model of one system. A note of the Mesh is a part of the
  program when its `parent` chain reaches the root note.
  `flint ite create "<Name>" --template <id> --purpose "<text>"` makes it, and Steel/Programs/<Name>/program.md.
  `flint ite templates` lists the templates. Write the root note with the command, not by hand.

  THE FOLDERS OF A PROGRAM
    Mesh/Programs/(Program) <Name>/
      (Program) <Name>.md                        the root note (this template)
      Map/(Program) <Name> . (<Type>) <Title>.md the default home of a new part (tmp-ite-part-v0.1)
    Steel/Programs/<Name>/
      program.md                                 id = the id of the root note
      Proposals/mc-<stamp>-<slug>.md             the map changes (only the change engine writes here)
      State/main.json                            the places, the sizes, and the faces of the cards, and the drawings
                                                 (only the canvas and flint ite place, arrange, and drawing write here)

  FRONTMATTER CONTRACT (format steel-program/1). Replace the VALUES, keep the shapes. No comment in the frontmatter.
  - format: always "steel-program/1".
  - id: a new UUID v4 (uuidgen | tr A-Z a-z). It never changes. It is the id of the program in Steel/.
    Write it with no quotes (id: <uuid>), so that grep "^id: <uuid>" finds the note.
  - tags: always "#ite/program".
  - purpose: one sentence for a person: what the system is, and why a person models it.
  - status: active or archived.
  - types: the names of the types that the program uses, from its template: [Goal, Milestone, Step, Note].
    `flint ite types` lists the types of this Flint. Each part has one of these types.
  - from-template: the id of the template that made the program. History only: nothing decides with it.
  - main-map (optional): coverage-ignore, max-children only when the person asks for a size limit, and card-face
    (title, sentence, or field:<key>: what each card shows under its title) only when the person asks for one
    (see The Main Map of knw-ite-programs).
  - codebase, product-root (optional, for each template): the codebase of the program, and the folder of the product
    in it. codebase gives the file coverage and the code-refs of the parts, not the template name.
  - template, authors, orb: the Flint conventions. authors is the person for whom you work. orb holds the by address
    of `flint address me` (quoted).
  - A root note can have more keys or a fenced block of a later module. Keep each key and each block that this
    template does not name, and add none.
  - The root note holds no finding, no count, and no place. A command computes these facts.

  THE BODY
  - One H1: the name of the program. The file name is "(Program) <H1>.md".
  - One to three short paragraphs for a person: what the system is, what the map shows, and how to read it.
    Name the part that a person reads first. Say what the program leaves out.
*/

````markdown
---
format: "steel-program/1"
id: GENERATE-UUID4
tags:
  - "#ite/program"
purpose: "ONE SENTENCE: WHAT THE SYSTEM IS, AND WHY A PERSON MODELS IT."
status: "active"
types: [TYPE NAME, TYPE NAME, Note]
from-template: "TEMPLATE-ID"
template: "[[tmp-ite-program-v0.1]]"
authors:
  - "[[@author]]"
orb:
  - "[the output of flint address me]"
---

# [Name of the program: two to five words in the words of the person]

[One to three short paragraphs for a person: what the system is, what the map shows, how to read it, and what the program leaves out.]
````

## A complete example

File: `Mesh/Programs/(Program) Garden Share/(Program) Garden Share.md`.

````markdown
---
format: "steel-program/1"
id: 0b7d8e2a-4c15-4f63-9a0e-6d2c1b8f5e37
tags:
  - "#ite/program"
purpose: "How the street garden shares its tools and its harvest, so that a new member knows what to do each week."
status: "active"
types: [Actor, System, Stage, Step, Decision, Input, Output, Policy, Metric, Note]
from-template: "process"
template: "[[tmp-ite-program-v0.1]]"
authors:
  - "[[@Nathan]]"
---

# Garden Share

The street garden has twelve members, one tool shed, and four beds. This program models the week of the garden: who waters, who takes the tools, and how the harvest goes to each house. The map shows the actors, the steps of one week, and the policies that the members agreed.

Start at the part "One week in the garden". The program leaves out the money of the garden: the treasurer keeps it in another sheet.
````
