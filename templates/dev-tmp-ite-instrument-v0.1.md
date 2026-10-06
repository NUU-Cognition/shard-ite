---
description: "An instrument of a living system: a part of the kind instrument with an instrument mapping (format ite-instrument/1) that says what one read observes, with complete examples for git and npm"
---

# Filename: Mesh/Programs/(Program) [Name]/Map/(Program) [Name] . (Instrument) [Title].md

/*
  An instrument is an instruction whose result is observations. It is a part of the kind `instrument` in Map/,
  so the map includes it, and a person reads its prose. Only a program with a `system` block (a living system)
  reads it. The refresh of the server reads it on its period; `flint ite read "<program>"` reads it now.

  THE FILE NAME
  - "(Program) <Name> . (Instrument) <Title>.md", for example "(Program) Flint Release . (Instrument) Git read of the remote.md".
  - The title says what the instrument reads, in the words of the person: "npm read of flint-cli".

  FRONTMATTER CONTRACT. The fields of a part ([[tmp-ite-part-v0.1]]), with these differences. No comment in the frontmatter.
  - kind: always "instrument".
  - informs: the wikilinks of the parts whose statements the instrument feeds. Each gives one link on the map.
  - instrument: one mapping (format ite-instrument/1). The keys are kebab-case.
    id: a slug, unique in the system. A statement names it in `instrument`.
    kind: git | npm | contact | command | http | person | run.
    every: the period of a poll (10m, 1h). Omit it: the instrument reads only on a request, a notice, or a reconciliation.
    heartbeat: the most time between two successful reads before the instrument is dead. Default: two times every.
    events: true when the instrument takes notices (flint ite notice). A notice is not evidence: a read follows it.
    owner: optional, a wikilink.
    form: optional, default ite-instrument/1.
    Each other key is the config of the kind:
    git:     repo ("@<Codebase>" of flint.toml, or a path relative to the Flint root), refs (a list), fetch (true or
             false), version-file (a path in the repository with a JSON `version`), compare (a list of [a, b] pairs).
             Properties: <ref>.sha, <ref>.time, <ref>.subject, <ref>.squashed-from, <ref>.version, and
             <a>...<b>.left, <a>...<b>.right for each compare pair.
    npm:     package, registry (default https://registry.npmjs.org; a file: URL reads a JSON file), tags (default [latest]).
             Properties: <tag>.version, <tag>.integrity, <tag>.time, and modified.
    contact: part (a wikilink; default: this part), contacts (contact ids; default: each). Property: <contact id>
             (type verdict), from the newest observation of each contact. It runs no contact.
    command, http: they parse and show; no read runs them in this version.
  - A REMOTE REF NEEDS A FETCH. An instrument with a ref under origin/ (a remote ref) must have fetch: true. Each read
    then runs git fetch first, and a failed fetch makes the whole read fail with no value. Put the local refs in a
    second instrument with fetch: false. A compare pair with one remote ref goes in the instrument with the fetch.
  - A change of the kind or of the config (repo, refs, fetch, package, registry, a URL) gives a new revision of the
    instrument: the values of the old revision are no longer accepted. It is a protected change, as the removal of
    an instrument is: it goes only through a revision that a person applies (flint ite revision propose).
    every, heartbeat, events, and owner are not in the revision.
  - Before you write an instrument, check its source one time: the repository and the refs exist, the package exists.
  - The instrument holds no value, no health, and no time of a read. A command computes them.

  THE BODY
  - One H1: "(Instrument) <Title>".
  - One to three short paragraphs for a person: what one read observes, how often, when it is dead, and what it does
    not read. Say what happens when the source fails.
*/

````markdown
---
id: GENERATE-UUID4
tags:
  - "#ite/part"
program: "[[(Program) NAME]]"
kind: "instrument"
parent: ""
informs:
  - "[[(Program) NAME . (KIND TITLE) TITLE OF THE PART THAT IT FEEDS]]"
status: "active"
instrument:
  id: INSTRUMENT-ID
  kind: KIND
  every: 10m
  heartbeat: 30m
template: "[[tmp-ite-instrument-v0.1]]"
authors:
  - "[[@author]]"
orbh-sessions:
  - "[[AGENT-SESSION-UUID]]"
---

# (Instrument) [Title]

[One to three short paragraphs for a person: what one read observes, how often it reads, when it is dead, and what it does not read.]
````

## A complete example: git with a remote ref

File: `Mesh/Programs/(Program) Flint Release/Map/(Program) Flint Release . (Instrument) Git read of the remote.md` of this Flint.

````markdown
---
id: 286c1da7-d784-4831-800b-20f78614b843
tags:
  - "#ite/part"
program: "[[(Program) Flint Release]]"
kind: "instrument"
parent: ""
informs:
  - "[[(Program) Flint Release . (System) Canon]]"
  - "[[(Program) Flint Release . (System) Main]]"
  - "[[(Program) Flint Release . (Metric) Debt against canon]]"
status: "active"
instrument:
  id: git-flint-remote
  kind: git
  repo: "@Flint"
  fetch: true
  refs: [origin/canon, origin/main]
  version-file: apps/flint-cli/package.json
  compare:
    - [origin/canon, nathan-main]
  every: 10m
  heartbeat: 30m
  events: true
template: "[[tmp-ite-instrument-v0.1]]"
authors:
  - "[[@Nathan]]"
---

# (Instrument) Git read of the remote

This instrument reads the branches `canon` and `main` of the remote `origin` of the repository `flint`. Each read runs `git fetch --quiet origin` first. [...]

A failed fetch makes the whole read fail, and the read gives no value. So the values of an old fetch never look like the remote. [...]
````

## A complete example: npm

````markdown
---
id: 217e6f4c-752a-47aa-a10d-34b4c9894a20
tags:
  - "#ite/part"
program: "[[(Program) Flint Release]]"
kind: "instrument"
parent: ""
informs:
  - "[[(Program) Flint Release . (System) npm registry]]"
status: "active"
instrument:
  id: npm-flint-cli
  kind: npm
  package: "@nuucognition/flint-cli"
  registry: "https://registry.npmjs.org"
  tags: [latest]
  every: 1h
  heartbeat: 3h
template: "[[tmp-ite-instrument-v0.1]]"
authors:
  - "[[@Nathan]]"
---

# (Instrument) npm read of flint-cli

This instrument reads the record of the package `@nuucognition/flint-cli` on the public npm registry. For the tag `latest`, it reads the version, the integrity, and the time of the publish. [...]
````

What the examples do:

- `git-flint-remote` reads remote refs, so it has `fetch: true`. The local branch `nathan-main` alone goes in a second instrument (`git-flint-local`, `fetch: false`). The compare pair has one remote ref, so it stays in the instrument with the fetch.
- A statement takes a value of the instrument by its property: `instrument: git-flint-remote` and `property: origin/canon.version`.
- `informs` links the instrument to the parts that it feeds, so the map shows where each claim comes from.
