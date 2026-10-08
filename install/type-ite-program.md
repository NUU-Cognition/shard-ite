---
id: 5d87c27e-8de4-42f0-95d9-3e3d2d3235fc
tags:
  - "#f/metadata"
  - "#f/type"
---

# Program

A Program is the model of one system, so that a person can think about the system, see it, and check it against reality. The system can be software, an event of a club, a process of a business, a research pipeline, or a team. A Program is a root note of this type and the tree of parts below it: a note of the Mesh, of any type, is a part when its `parent` chain reaches the root note. The root note lists the `types` that the parts use, and `from-template` names the template that made it. The machinery of a Program is in `Steel/Programs/<Name>/`: its views, its claims (what must be true, each with its check), its processes and instruction maps (the work that it can run), its runs, its proposals, and the state of its views. A Program is not a Project of the Projects shard: a Project holds work that ends, and a Program holds the model of a system that stays. A Program is not a single note about a topic: each part of a Program is its own note, and a command computes the grounding of each part from the claims about it. An OrbCode Project is a Program of the template `software`.

## Properties

| Property | Value |
|----------|-------|
| Tag | `#ite/program` |
| Format | `steel-program/1` |
| Naming | `(Program) <Name>.md` |
| Location | `Mesh/Programs/(Program) <Name>/` |
| Parts | Each note whose `parent` chain reaches the root note (tag `#ite/part`); a new part goes to `Map/(Program) <Name> . (<Type>) <Title>.md` |
| Views | `Steel/Programs/<Name>/Views/(View) <Title>.md` (tag `#ite/view`, format `steel-view/1`) |
| Claims | `Steel/Programs/<Name>/Reality/<id>/claim.md` (format `steel-claim/1`), with the code of its check |
| Processes | `Steel/Programs/<Name>/Processes/<id>/process.md` (format `steel-process/1`), and `map.md` (format `steel-flow/1`) for a large process |
| Runs | `Steel/Programs/<Name>/Runs/<run id>/` (only the run engine writes them) |
| Proposals | `Steel/Programs/<Name>/Proposals/`: map changes, view candidates, revisions (only the engines write them) |
| Log | `.flint/steel/logs/<program id>.jsonl`: the results of the checks and the process runs; only the commands write it (the one door of the results is `flint ite claim report`) |

## Lifecycle

```
active → archived
```

`status: active` is a program that a person uses. `status: archived` is a program that a person keeps for the record. The Workbench of Steel and `flint ite list` show both.

## Templates

- [[tmp-ite-program-v0.1]] — Program
- [[tmp-ite-part-v0.1]] — Part
- [[tmp-ite-view-v0.1]] — View
- [[tmp-ite-claim-v0.1]] — Claim
- [[tmp-ite-process-v0.1]] — Process
- [[tmp-ite-instruction_map-v0.1]] — Instruction map
