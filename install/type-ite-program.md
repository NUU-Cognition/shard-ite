---
id: 5d87c27e-8de4-42f0-95d9-3e3d2d3235fc
tags:
  - "#f/metadata"
  - "#f/type"
---

# Program

A Program is a cognitive program: the model of one system, so that a person can think about the system, see it, and check it against reality. The system can be software, an event of a club, a process of a business, a research pipeline, or a team. A Program has a map (its parts: one Mesh note for each part, of any Mesh type), views (one file for each question of a person), contacts (the places where each claim touches reality, and the way to check them), and jobs (agent sessions that work on its nodes). Its framework gives the kinds of its parts, the relations, the layers, and the shapes of its views. A Program is not a Project of the Projects shard: a Project holds work that ends, and a Program holds the model of a system that stays. A Program is not a single note about a topic: each part of a Program is its own note, and a command computes the grounding of each part from its contacts. An OrbCode Project is a Program of the framework `software`.

## Properties

| Property | Value |
|----------|-------|
| Tag | `#ite/program` |
| Format | `ite-program/1` |
| Naming | `(Program) <Name>.md` |
| Location | `Mesh/Programs/(Program) <Name>/` |
| Parts | `Map/(Program) <Name> . (<Kind>) <Title>.md` (tag `#ite/part`), and each note that `include` names |
| Views | `Views/(View) <Title>.md` (tag `#ite/view`, format `ite-view/1`) |
| Layout | `(Program) <Name> . (Layout).md` (tag `#ite/layout`): only `flint ite` and the layout route write it |
| Observations | `.flint/ite/observations/<program id>.jsonl`: only `flint ite run`, `flint ite observe`, and the routes write them |

## Lifecycle

```
active → archived
```

`status: active` is a program that a person uses. `status: archived` is a program that a person keeps for the record. The Workbench of Steel and `flint ite list` show both.

## Templates

- [[tmp-ite-program-v0.1]] — Program
- [[tmp-ite-part-v0.1]] — Part
- [[tmp-ite-view-v0.1]] — View
