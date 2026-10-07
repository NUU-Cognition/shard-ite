---
description: "A part of an ITE program: one Mesh note of a type, with its parent, its links, its optional claims, and prose for a person, with complete examples"
---

# Filename: Mesh/Programs/(Program) [Name]/Map/(Program) [Name] . ([Type]) [Title].md

/*
  A part is one Mesh note of a program. A note is a part when its `parent` chain reaches the root note.
  `flint ite part add <program> --kind <type id> --title "<title>" [--parent <part>]` makes it with a map change:
  a person's change applies at once, an agent's change is a proposal that a person applies.
  Each change of the structure (the title, the type, the parent) is a map change. Never write a new part file,
  a `parent`, or a `(Type)` word with your own tools. `flint ite part set` changes the prose, the claims, and the
  fields that are not structure. Write a part by hand only when `flint ite` is not a command of your CLI.
  A note of another type (a Task, a Person) is a part when its `parent` names a part of the program: give it its
  parent with a map change (op move).

  THE FILE NAME
  - "(Program) <Name> . (<Type>) <Title>.md", for example "(Program) Club Launch Night . (Milestone) Venue booked.md".
  - The type is the last (Type) word of the file name. It is one of the `types` of the root note
    (`flint ite types` lists the types of this Flint). The type id is the name in lower case, spaces as "-".
    A change of type is a rename with a new (Type) word: the map change op rename with `kind`.
  - The title has none of the characters \ / : * ? " < > | # ^ [ ]. The name is unique in the Mesh.
  - The title starts with a word, not a number: a number after the (Type) word reads as the number of an artifact,
    as in "(Task) 1099 ...". Write "A full hall and 30 new members", not "80 guests".
  - The folder Map/ is the default home of a new part. A folder is for a person only: the membership is `parent`.

  FRONTMATTER CONTRACT. Replace the VALUES, keep the shapes. No comment in the frontmatter.
  - id: a new UUID v4 (uuidgen | tr A-Z a-z). It never changes. Each view heading, process, run, state, and proposal
    names the part by this id. Write it with no quotes (id: <uuid>), so that grep "^id: <uuid>" finds the note.
  - tags: always "#ite/part".
  - parent: one wikilink to the part that holds this part, or to the root note "[[(Program) <Name>]]" for a top part.
  - A connection is a key whose value is one wikilink or a list of wikilinks: next, uses, depends-on, informs, owner,
    blocks. Each wikilink gives one link, with the key as the connection. Use the connections of the types of the
    program (`flint ite types`). Name a link only when it is true.
  - owner: the person or the role that answers for the part, as a wikilink. Omit it when nobody owns the part.
  - status: a short word as the person uses it: active, todo, in-progress, done, open, closed.
  - claims: optional, a part of a type with the capability has-claims (see THE CLAIMS).
  - template, authors, orbh-sessions: the Flint conventions.
  - A part has no field kind, program, contact, include, or place.
  - The part holds no grounding, no observation, no finding, and no position. A command computes these facts.
    A process in Steel/Programs/<Name>/Reality/ checks the part against reality ([[tmp-ite-process-v0.1]]).

  THE CLAIMS (optional)
  - claims: a list. Each item says something about the system, with a mode. The keys are kebab-case.
    id: a slug, unique in the program (not only in the part).
    mode: is (a claim about now or the past), ought (an expectation that must hold), or will (a prediction).
    about: the claim in words, for a person.
    is:    a process that names the claim in its `feeds` gives the value; property names the property of that
           process. With no process, a person, an agent, or a run reports the value with flint ite observe --claim.
           type: number | text | boolean | time | version | sha | json | verdict.
           fresh-for: how long an accepted value stays fresh (1h, 6h, 7d). Omit it only for a fact that never changes.
           selection: newest | authoritative | agree (default: newest for one source, agree for more).
    ought: holds-when: a list of predicates; each must be true. A predicate is
           { of: <is claim>, op: eq | ne | lt | le | gt | ge | match | exists | age-lt | age-gt,
             value: <a literal> or value-of: <another is claim>, path: <a dot path into a json value> }.
           owner, reason (a goal has both), refute (the observation that would show it false), limit: true (a limit).
    will:  holds-when as an ought, p (0 to 1), and resolves (a quoted date or date-time).
  - owner defaults to the owner of the part, else the first owner of the system.
  - The claims hold meaning only: no value, no state, and no time of a read. A command computes them.
  - In a living system, a change of holds-when, fresh-for, property, selection, or limit, and the removal of a claim,
    is a protected change: it goes only through a revision that a person applies (flint ite revision propose).

  THE BODY
  - One H1: "(<Type>) <Title>". It is for a person; no code reads it.
  - One to three short paragraphs for a person: what this part is, and what is true when it is done or when it holds.
    Use the words of the person. One idea for each part. A wikilink in the prose gives a link of the connection mentions.
*/

````markdown
---
id: GENERATE-UUID4
tags:
  - "#ite/part"
parent: "[[(Program) NAME . (TYPE) TITLE OF THE PARENT]]"
next:
  - "[[(Program) NAME . (TYPE) TITLE OF THE NEXT PART]]"
owner: "[[(Program) NAME . (Person) NAME OF THE OWNER]]"
status: "active"
template: "[[tmp-ite-part-v0.1]]"
authors:
  - "[[@author]]"
orbh-sessions:
  - "[[AGENT-SESSION-UUID]]"
---

# (TYPE) [Title]

[One to three short paragraphs for a person: what this part is, and what is true when it is done.]
````

## A complete example

File: `Mesh/Programs/(Program) Garden Share/Map/(Program) Garden Share . (Step) Water the beds.md`.

````markdown
---
id: 3f1c9a47-7e2b-4d08-b6a5-91c0e4d27f83
tags:
  - "#ite/part"
parent: "[[(Program) Garden Share . (System) The week of the garden]]"
next:
  - "[[(Program) Garden Share . (Step) Record the harvest]]"
uses:
  - "[[(Program) Garden Share . (System) Tool shed]]"
owner: "[[(Program) Garden Share . (Actor) Member on duty]]"
status: "active"
template: "[[tmp-ite-part-v0.1]]"
authors:
  - "[[@Nathan]]"
---

# (Step) Water the beds

The member on duty waters the four beds on Tuesday and on Saturday. On a day with more than 5 mm of rain, the member skips the water and writes "rain" in the roster.

The forecast and the roster check this part: the process `rain` reads the forecast, and the process `roster` asks the member on duty each week.
````

What the example does:

- The file name gives the program, the type `Step`, and the title. The H1 repeats the type and the title.
- `parent` puts the step inside the system "The week of the garden". `next` and `uses` are connections: each wikilink is one link.
- `owner` names a part of the same program (an actor), so the link has a target.
- Two processes in `Steel/Programs/Garden Share/Reality/` check the part: `rain` (code, `uses: http`) and `roster` (a person's check). Each names the part by its id. The part file holds no process and no state.

## A complete example with claims

File: `Mesh/Programs/(Program) Flint Release/Map/(Program) Flint Release . (Metric) Debt against canon.md` of this Flint, a part of a living system. The frontmatter:

````markdown
---
id: 1260b6db-fd46-45ce-b734-8c5984b9464c
tags:
  - "#ite/part"
parent: "[[(Program) Flint Release . (System) Repository and Branches]]"
informs:
  - "[[(Program) Flint Release . (Step) Ship to canon]]"
status: "active"
claims:
  - id: pull-debt
    mode: is
    about: "The count of the commits of origin/canon that nathan-main does not have"
    property: origin/canon...nathan-main.left
    type: number
    fresh-for: 1h
  - id: no-pull-debt
    mode: ought
    owner: "[[@Nathan]]"
    about: "nathan-main has each commit of origin/canon"
    holds-when:
      - { of: pull-debt, op: eq, value: 0 }
    refute: "origin/canon has a commit that nathan-main does not have"
    reason: "A ship needs no sync first."
template: "[[tmp-ite-part-v0.1]]"
authors:
  - "[[@Nathan]]"
---
````

What the example does:

- `pull-debt` is an `is` claim: the process `git-flint-remote` names it in its `feeds`, and the property `origin/canon...nathan-main.left` of its read gives the value. The value is old after 1 hour.
- `no-pull-debt` is an `ought` claim and a goal of the system (the system block names it in `goals`). It holds when the debt is 0. When `pull-debt` is old, it is `unknown`, never `holds`.
- The part prose names the claims in words, and holds no value.
