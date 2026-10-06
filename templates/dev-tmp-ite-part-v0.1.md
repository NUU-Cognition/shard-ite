---
description: "A part of the map of an ITE program: one Mesh note with its kind, its parent, its links, its contacts, its optional statements (a living system), and prose for a person, with complete examples"
---

# Filename: Mesh/Programs/(Program) [Name]/Map/(Program) [Name] . ([Kind title]) [Title].md

/*
  A part is one node of the map: one Mesh note. `flint ite part add <program> --kind <kind> --title "<title>"`
  makes it. Write it by hand only when `flint ite` is not a command of your CLI.
  When the kind has a mesh_type (for example the kind task is the type Task), the part is a note of that type:
  make it with the command of that type (flint helper artifact create), and add it to `include` of the program file.

  THE FILE NAME
  - "(Program) <Name> . (<Kind title>) <Title>.md", for example "(Program) Club Launch Night . (Milestone) Venue booked.md".
  - The kind title is the title of the kind in the framework: "Milestone" for the kind milestone, "Step" for step.
  - The title has none of the characters \ / : * ? " < > | # ^ [ ]. The name is unique in the Mesh.
  - The title starts with a word, not a number: a number after the (Kind) word reads as the number of an artifact,
    as in "(Task) 1099 ...". Write "A full hall and 30 new members", not "80 guests".

  FRONTMATTER CONTRACT. Replace the VALUES, keep the shapes. No comment in the frontmatter.
  - id: a new UUID v4 (uuidgen | tr A-Z a-z). It never changes. It is the id of the node on the map. Write it with no quotes (id: <uuid>), so that grep "^id: <uuid>" finds the note.
  - tags: always "#ite/part".
  - program: the wikilink to the program file.
  - kind: one kind of the framework of the program (`flint ite frameworks`). Another word draws a plain card
    and gives the note `framework`.
  - parent: one wikilink to the part that holds this part on the map, or "" for a top part.
    The parent must be a part of the same map.
  - A relation is a key whose value is one wikilink or a list of wikilinks: next, uses, depends-on, informs, owner.
    Each wikilink gives one link on the map, with the key as the relation. Name a relation only when it is true.
  - owner: the person or the role that answers for the part, as a wikilink. Omit it when nobody owns the part.
  - status: a short word as the person uses it: active, todo, in-progress, done, open, closed.
  - contact: the list of the contacts of the part (see THE CONTACT). [] when the part makes no claim yet.
  - statements: optional, a living system only (see THE STATEMENTS). Omit it in a program with no system block.
  - template, authors, orbh-sessions: the Flint conventions.
  - The part holds no grounding, no observation, no finding, and no position. A command computes these facts.

  THE CONTACT: one item of `contact`. A wikilink, or a mapping with kind.
  - "[[rf-cb-<slug>]]"                reference: holds when the marker resolves on this machine
  - "[[<note name>]]"                 note: a record of the Mesh that is the evidence; holds when it exists.
                                      A file of a shard is not a note of the Mesh: use kind file with its path.
  - kind: file      path: "@<Codebase>/<path>[#Symbol]"        holds when the path (and the symbol) exists
  - kind: command   run: "<command line>"  cwd: "@<Codebase>"   holds when expect matches (default: exit code 0)
  - kind: http      url: "https://..."                         holds when expect matches (default: a 2xx status); GET only
  - kind: mesh      query: { type, tags, where, links_to, search }   holds when expect.count matches (default >=1)
  - kind: orbtest   stories: [<story id>]  criteria: [<story id>#<index>]   the state comes from the coverage of Orbtest
  - kind: agent     prompt: "<question for an agent>"          an agent checks it and records the observation
  - kind: human     claim: "<statement>"                       a person confirms it and records the observation
  Each mapping can have: id (a short slug, unique in the node), claim (the statement that is true when the contact
  holds), expect (exit, match, not_match, status, json: { path, equals | exists }, count), fresh-for (12h, 7d, 4w),
  and direction: act (a contact that changes reality; no command runs it with no request of a person).
  Never invent a contact that you did not check: a path must exist, a URL must answer, a note must exist.

  THE STATEMENTS (optional: a part of a living system, a program with a `system` block)
  - statements: a list. Each item says something about the system, with a mode. The keys are kebab-case.
    id: a slug, unique in the system (not only in the part).
    mode: is (a claim about now or the past), ought (an expectation that must hold), or will (a prediction).
    about: the claim in words, for a person.
    is:    instrument (an instrument id of the system) and property (a property of that instrument), or neither:
           then a person, an agent, or a run reports the value with flint ite observe --statement.
           type: number | text | boolean | time | version | sha | json | verdict (default: the type of the property).
           fresh-for: how long an accepted value stays fresh (1h, 6h, 7d). Omit it only for a fact that never changes.
           selection: newest | authoritative | agree (default: newest for one source, agree for more).
    ought: holds-when: a list of predicates; each must be true. A predicate is
           { of: <is statement>, op: eq | ne | lt | le | gt | ge | match | exists | age-lt | age-gt,
             value: <a literal> or value-of: <another is statement>, path: <a dot path into a json value> }.
           owner, reason (a goal has both), refute (the observation that would show it false), limit: true (a limit).
    will:  holds-when as an ought, p (0 to 1), and resolves (a quoted date or date-time).
  - owner defaults to the owner of the part, else the first owner of the system.
  - The statements hold meaning only: no value, no state, and no time of a read. A command computes them.
  - A change of holds-when, fresh-for, instrument, property, selection, or limit, and the removal of a statement,
    is a protected change: it goes only through a revision that a person applies (flint ite revision propose).
  - A contact is not a statement. Keep the contacts of the part as they are.
  - A part of the kind instrument has an `instrument` mapping, not statements: use [[tmp-ite-instrument-v0.1]].

  THE BODY
  - One H1: "(<Kind title>) <Title>".
  - One to three short paragraphs for a person: what this part is, and what is true when it is done or when it holds.
    Use the words of the person. One idea for each part. A wikilink in the prose gives a link of the relation mentions.
  - Optional: a heading "# Contact" with prose: where and how this part touches reality, and each gap.
*/

````markdown
---
id: GENERATE-UUID4
tags:
  - "#ite/part"
program: "[[(Program) NAME]]"
kind: "KIND"
parent: "[[(Program) NAME . (KIND TITLE) TITLE OF THE PARENT]]"
next:
  - "[[(Program) NAME . (KIND TITLE) TITLE OF THE NEXT PART]]"
owner: "[[@PERSON]]"
status: "active"
contact:
  - id: "SHORT-SLUG"
    kind: "http"
    claim: "THE STATEMENT THAT IS TRUE WHEN THE CONTACT HOLDS."
    url: "https://..."
    fresh-for: "7d"
template: "[[tmp-ite-part-v0.1]]"
authors:
  - "[[@author]]"
orbh-sessions:
  - "[[AGENT-SESSION-UUID]]"
---

# (KIND TITLE) [Title]

[One to three short paragraphs for a person: what this part is, and what is true when it is done.]

# Contact

[Optional: where and how this part touches reality, and each gap.]
````

## A complete example

File: `Mesh/Programs/(Program) Garden Share/Map/(Program) Garden Share . (Step) Water the beds.md`.

````markdown
---
id: 3f1c9a47-7e2b-4d08-b6a5-91c0e4d27f83
tags:
  - "#ite/part"
program: "[[(Program) Garden Share]]"
kind: "step"
parent: "[[(Program) Garden Share . (System) The week of the garden]]"
next:
  - "[[(Program) Garden Share . (Step) Record the harvest]]"
uses:
  - "[[(Program) Garden Share . (System) Tool shed]]"
owner: "[[(Program) Garden Share . (Actor) Member on duty]]"
status: "active"
contact:
  - id: "rain"
    kind: "http"
    claim: "The forecast for the garden answers, so the member on duty can skip the water on a day of rain."
    url: "https://api.open-meteo.com/v1/forecast?latitude=-33.87&longitude=151.21&daily=precipitation_sum&timezone=Australia%2FSydney"
    expect:
      status: 200
      json:
        path: "daily.precipitation_sum.0"
        exists: true
    fresh-for: "12h"
  - id: "roster"
    kind: "human"
    claim: "The member on duty this week watered each bed on Tuesday and on Saturday."
    fresh-for: "7d"
template: "[[tmp-ite-part-v0.1]]"
authors:
  - "[[@Nathan]]"
---

# (Step) Water the beds

The member on duty waters the four beds on Tuesday and on Saturday. On a day with more than 5 mm of rain, the member skips the water and writes "rain" in the roster.

# Contact

The forecast is an automatic contact: a command reads it. The roster is on paper in the tool shed, so a person confirms it each week.
````

What the example does:

- The file name gives the program, the kind title, and the title. The H1 repeats the kind title and the title.
- `parent` puts the step inside the system "The week of the garden". `next` and `uses` are relations: each wikilink is one link on the map.
- `owner` names a part of the same map (an actor), so the link has a target on the map.
- The part has one automatic contact (`http`, with the expected JSON) and one `human` contact. Each has a `claim` and a `fresh-for`.
- The prose is for a person. It holds no state: `flint ite map` computes the grounding from the observations.

## A complete example with statements

File: `Mesh/Programs/(Program) Flint Release/Map/(Program) Flint Release . (Metric) Debt against canon.md` of this Flint, a part of a living system. The frontmatter, with the contacts cut short:

````markdown
---
id: 1260b6db-fd46-45ce-b734-8c5984b9464c
tags:
  - "#ite/part"
program: "[[(Program) Flint Release]]"
kind: "metric"
parent: ""
informs:
  - "[[(Program) Flint Release . (Step) Ship to canon]]"
status: "active"
contact:
  - id: "behind-zero"
    kind: "command"
    claim: "nathan-main is 0 commits behind origin/canon, so it has no pull-down debt."
    run: 'git -C "../Repos/flint" rev-list --left-right --count origin/canon...nathan-main'
    expect:
      match: '^0\s'
    fresh-for: "1d"
statements:
  - id: pull-debt
    mode: is
    about: "The count of the commits of origin/canon that nathan-main does not have"
    instrument: git-flint-remote
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

- `pull-debt` is an `is` statement: the instrument `git-flint-remote` gives its value, and the value is old after 1 hour.
- `no-pull-debt` is an `ought` statement and a goal of the system (the system block names it in `goals`). It holds when the debt is 0. When `pull-debt` is old, it is `unknown`, never `holds`.
- The contact stays a contact. The part prose names the statements in words, and holds no value.
