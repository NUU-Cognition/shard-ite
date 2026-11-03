---
id: 5d87c27e-8de4-42f0-95d9-3e3d2d3235fc
tags:
  - "#f/metadata"
  - "#f/type"
---

# Program

A Program is the model of one system, so that a person can think about the system and see it. The system can be software, the launch night of a club, a process of a business, a research, or a team. A Program is a root note of this type and the tree of parts below it: a note of the Mesh, of any type, is a part when its `parent` chain reaches the root note. This tree is the main map of the Program. The root note lists the `types` that the parts use, and `from-template` names the template that made it. Each change of the tree is a map change: an agent proposes it, and a person applies it. A Program is not a Project of the Projects shard: a Project holds work that ends, and a Program holds the model of a system that stays. A Program of the template `software` also names its codebase, and its parts name their code in `code-refs`.

## Properties

| Property | Value |
|----------|-------|
| Tag | `#ite/program` |
| Format | `steel-program/1` |
| Naming | `(Program) <Name>.md` |
| Location | `Mesh/Programs/(Program) <Name>/` |
| Parts | Each note whose `parent` chain reaches the root note (tag `#ite/part`); a new part goes to `Map/(Program) <Name> . (<Type>) <Title>.md` |
| Map changes | `Steel/Programs/<Name>/Proposals/mc-<stamp>-<slug>.md` (only the change engine writes them; a person applies each one) |
| State | `Steel/Programs/<Name>/State/main.json`: the places, the sizes, and the faces of the cards, and the drawings (only the canvas and `flint ite place`, `arrange`, and `drawing` write it) |

The later modules of the ITE add more folders to `Steel/Programs/<Name>/`. They are off by default: `flint ite modules` shows them.

## Lifecycle

```
active → archived
```

`status: active` is a program that a person uses. `status: archived` is a program that a person keeps for the record. The Workbench of Steel and `flint ite list` show both.

## Templates

- [[tmp-ite-program-v0.1]] — Program
- [[tmp-ite-part-v0.1]] — Part
