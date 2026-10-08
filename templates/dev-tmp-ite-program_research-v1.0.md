---
description: "The template research of a program: a research pipeline and the research itself: the questions, the hypotheses and the claims, the evidence, the methods and the experiments, and the results. An instruction for an agent that models a system of this kind, and the template block that Steel reads"
---

# Research

A research pipeline and the research itself: the questions, the hypotheses and the claims, the evidence, the methods and the experiments, and the results.

## How to model a system of this kind

You are an agent that models one system of the kind "Research" as a program of Steel. Follow these steps:

1. Write the root note of the program with `flint ite create "<Name>" --template research --purpose "<one sentence>"`. The root note gets the `types` of this template and `from-template: research`.
2. Find the first level of the main map: at most 9 parts below the root. Each part is one Mesh note of one of the types below, with `parent` set to the root note. Propose them as one map change with `flint ite map change propose`. A person applies it.
3. Join the parts with the connections below. A connection is a frontmatter key of a part, with a wikilink to the other part.
4. Write each statement that must be true as a claim about its parts (`Steel/Programs/<Name>/Reality/<id>/claim.md`, [[tmp-ite-claim-v0.1]]), with a check that reads reality. When the work of the system runs in an order that a person or an agent follows, write it as the instruction map of a process ([[tmp-ite-instruction_map-v0.1]]): steps of a run are nodes of a map, not parts.
5. Answer the questions below with views. Each view is one map for one question.

Use only the types of this template. When a part fits no type, use the type `note` and tell the person.

## The types

| Type | Id | When to use it |
|------|----|----------------|
| Question | `question` | A question that the research must answer. |
| Hypothesis | `hypothesis` | A possible answer that a test can support or refute. |
| Claim | `claim` | Something that the research says is true. It links to its evidence. |
| Source | `source` | A paper, a book, a person, or a site that gives evidence. |
| Dataset | `dataset` | A set of data that the research reads. |
| Method | `method` | A way to get evidence or to test it. |
| Experiment | `experiment` | One test of a hypothesis, with its setup and its result. |
| Step | `step` | One step of the pipeline: one action and its result. |
| Finding | `finding` | What the research found. It links to its evidence. |
| Output | `output` | A thing that the research gives out: a paper, a talk, or a tool. |
| Note | `note` | A note that explains a part of the system. It makes no claim, so it has no grounding. |

## The connections

| Key | Words | Meaning |
|-----|-------|---------|
| `next` | then | The next node in a flow. A step goes to its next step. |
| `uses` | uses | The node needs the other node to do its work. |
| `depends-on` | depends on | The node cannot finish before the other node is done. |
| `owner` | owned by | The person, the role, or the team that is responsible for the node. |
| `informs` | informs | The node gives information to the other node. |
| `mentions` | mentions | The text of the node names the other node. |
| `supports` | supports | The node is evidence for the other node. |
| `refutes` | refutes | The node is evidence against the other node. |

## The questions

- Which evidence supports each claim?
- Which hypotheses are not tested yet?
- What does the pipeline do from the raw data to the paper?
- Which findings answer the main question?
- Which sources does each chapter use?

```template
format: steel-template/1
id: research
title: "Research"
description: "A research pipeline and the research itself: the questions, the hypotheses and the claims, the evidence, the methods and the experiments, and the results."
types: [question, hypothesis, claim, source, dataset, method, experiment, step, finding, output, note]
connections: [next, uses, depends-on, owner, informs, mentions, supports, refutes]
views:
  - { map: tree, question: "Which findings answer the main question?" }
  - { map: flow, question: "What does the pipeline do from the raw data to the paper?" }
questions: ["Which evidence supports each claim?", "Which hypotheses are not tested yet?", "What does the pipeline do from the raw data to the paper?", "Which findings answer the main question?", "Which sources does each chapter use?"]
shapes: [tree, flow, layers, table, free]
layers:
  - { id: argument, title: "Argument", description: "What do we ask, and what do we claim?" }
  - { id: evidence, title: "Evidence", description: "What do the claims stand on?" }
  - { id: process, title: "Process", description: "How do we get and test the evidence?" }
  - { id: result, title: "Result", description: "What did we find, and what did we make?" }
  - { id: notes, title: "Notes", description: "Which notes explain the system?" }
```
