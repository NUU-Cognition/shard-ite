---
description: "A flow view (format ite-view/1, shape flow) with one flow block: the execution definition of a procedure — the steps, the entry, the exits, and the transitions; with ite-flow/2, the executors, the completion policies, and the authority of a living system"
---

# Filename: Mesh/Programs/(Program) [Name]/Views/(View) [Title].md

/*
  A flow view is a view of the shape `flow` that a person can RUN. One fenced block with the info
  string `flow` stands in the intro, after the H1 prose and before the first node heading. The block
  is the execution definition. The view parser reads the block as prose; the flow parser reads only
  the block and the node ids of the view. A view is a projection: a hidden node, a moved heading, or
  a changed layout never changes execution.

  THE VIEW AROUND THE BLOCK
  - The frontmatter and the body grammar are the grammar of a view ([[tmp-ite-view-v0.1]]), with shape "flow".
  - Each step id of the block MUST be a node id of this view (the {#id} of a heading). A step with no
    node is an error finding. A node with no step is not a step: the view can hold prose nodes that
    do not run, for example the closing note node.
  - Each node has one sentence of prose: what the person does there. The `next` fields of the nodes
    follow the transitions, so that the view draws as a flow with no engine.

  THE FIELDS OF THE FLOW BLOCK
  - id: the id of the flow; stable; one word or a slug.
  - title: the title that the Run panel shows.
  - revision: a number that a person raises on a change. The engine also hashes the resolved
    definition (sha256): the hash is the true revision, the number is for a person.
  - library: optional; a wikilink to a step library note (format ite-steps/1). It is the default
    library of `uses_step`.
  - entry: the id of the first step (a node id of this view).
  - exits: the steps whose completion ends the run with success. At least one.
  - inputs: the inputs of the run; a person gives them at the start. Each has name, kind
    (text | number | choice | note | notes), required, and prompt.
  - steps: a map from step id to a step. A step is one of two kinds:
      1. A workstep: `uses_step: <id>` names a workstep of the library (`<library id>/<id>` names one
         of another library), or an inline definition with `instruction`, `inputs`, `outputs`. An
         inline field replaces the field of the library workstep.
      2. A decision: `kind: decision`, a `question`, and `outcomes` (at least two, quoted strings).
         A decision has no outputs; its answer is the value `<step id>.answer`.
      `by` is `person` in night 1. `agent` and `command` parse, but the validation refuses a run.
  - transitions: the edges. A step that is not a decision has exactly one transition out, or none
    when it is an exit. A decision has exactly one transition for each outcome. A back edge (a loop)
    goes only out of a decision; the engine bounds each step at 20 visits for each run.
  - A `guard`, a `fork`, or a `join` field is a refusal in night 1.
  - Input mapping: a workstep input takes its value from the run, by name: first an output of an
    earlier step with the same name, else a run input with the same name, else the person gives it
    in the Run panel. `inputs: { idea: question }` in a step maps the workstep input `idea` to the
    run value `question`.
  - Quote "yes" and "no" in `outcomes` and `outcome`, so that YAML keeps them as strings.

  ITE-FLOW/2 (a living system only: the program has a `system` block)
  - format: ite-flow/2 as the first key of the block. A block with no format is ite-flow/1: the rules above, and a
    step `by: agent` or `by: command` refuses. An ite-flow/2 flow in a program with no system block refuses.
  - inputs: an input can have `statement: <is statement>`. The start form offers the fresh accepted value of that
    statement. When the value moves before the approval or the dispatch, the command refuses (input-moved).
  - A step can have:
    executor: for by: agent { target: "<runtime/profile>", timeout, idempotent }; for by: command { run, cwd,
      timeout, idempotent }. An agent step has at most one output, of the kind text: the result of its session.
      Never put ${...} in `run`: a command gets its values as the environment variables ITE_INPUT_<NAME> and
      ITE_VALUE_<STEP>_<OUTPUT>. ${...} in `instruction` is text for a person or an agent only.
    precondition: a list of ought statements. Each must hold at the approval and at the dispatch.
    completion: { mode: outputs | confirm | evidence, require, after, within, on-timeout }.
      outputs (default): the Done of a person with valid outputs.
      evidence: require is a list of { statement: <is statement with an instrument>, equals: <a literal, or
        ${inputs.<name>} or ${values.<step>.<output>}> }. after: dispatched (default) or reported. within: the most
        time from the dispatch to the evidence (2h). on-timeout: unknown (default) or failed. A Done is only a report:
        the step completes when an instrument observation after the dispatch makes each item true.
  - authority (on the flow): { run, execute, approve, irreversible, approvers }. It replaces the authority of the
    system block, key by key. An actor is person:<Name>, agent:*, or agent:<runtime/profile>. Name each step whose
    effect cannot be undone in `irreversible`: it needs an approval of a person.
  - A change of completion, precondition, or authority is a protected change: it goes only through a revision that a
    person applies (flint ite revision propose). An active run keeps its snapshot.
*/

````markdown
---
format: "ite-view/1"
id: GENERATE-UUID4
tags:
  - "#ite/view"
program: "[[(Program) NAME]]"
question: "THE QUESTION OF THE PERSON?"
shape: "flow"
lifetime: "draft"
curation: "proposed"
derived-from: ""
template: "[[tmp-ite-flow-v0.1]]"
authors:
  - "[[@author]]"
---

# [Title]

[One to three sentences: what the flow does, and where its outputs land.]

```flow
id: FLOW-ID
title: "TITLE"
revision: 1
library: "[[(Step Library) TITLE]]"
entry: FIRST-STEP-ID
exits: [LAST-STEP-ID]
inputs:
  - { name: NAME, kind: text, required: true, prompt: "THE QUESTION TO THE PERSON?" }
steps:
  FIRST-STEP-ID: { uses_step: WORKSTEP-ID, by: person }
  FORK-ID:       { kind: decision, by: person, question: "THE QUESTION?", outcomes: ["yes", "no"] }
  LAST-STEP-ID:  { uses_step: WORKSTEP-ID, by: person }
transitions:
  - { from: FIRST-STEP-ID, to: FORK-ID }
  - { from: FORK-ID, to: LAST-STEP-ID, outcome: "yes" }
  - { from: FORK-ID, to: FIRST-STEP-ID, outcome: "no" }
```

## [Step title] {#FIRST-STEP-ID}

[One sentence: what the person does in this step.]

```node
kind: "KIND"
next: [FORK-ID]
```

/* One heading with a node block for each step of the flow, in the order of the flow.
   End the view with one node of kind note that says what the view leaves out. */
````

## A complete example

The view `Mesh/Programs/(Program) Thinking/Views/(View) Decide.md` of this Flint is the first flow view: the flow `decide` (clarify, options, compare, critique, decide, commit) with one loop back to options through the decision "Are the options enough?". Read it as the reference form.

## A complete example of `ite-flow/2`

The view `Mesh/Programs/(Program) Flint Release/Views/(View) Ship Flint.md` of this Flint is the reference form of a flow of a living system: an agent step (`summary`) and a person step with an evidence completion (`ship`). The block:

```flow
format: ite-flow/2
id: ship
title: "Ship Flint to canon"
revision: 2
entry: summary
exits: [ship]
inputs:
  - { name: head, kind: text, required: true, prompt: "The head of nathan-main to ship", statement: machine-head }
steps:
  summary:
    by: agent
    instruction: "Read the commits of origin/canon..${inputs.head} in the primary checkout of the repository flint (../Repos/flint from the Flint root, codebase @Flint). Write one line that says what the ship holds. Return only that line."
    outputs: [{ name: summary, kind: text }]
    executor: { target: "claude/o55xh", timeout: 30m }
  ship:
    by: person
    instruction: "Press Begin. Then, in the primary checkout of flint, run ndv repo ship flint, with the line of the step summary as the --summary value. Do not ship when the Run panel says that nathan-main moved."
    precondition: [no-pull-debt, checks-on-head]
    completion:
      mode: evidence
      require:
        - { statement: canon-shipped-from, equals: "${inputs.head}" }
      after: dispatched
      within: 2h
      on-timeout: unknown
transitions:
  - { from: summary, to: ship }
authority:
  run: ["person:Nathan"]
  approve: [ship]
  irreversible: [ship]
  approvers: ["person:Nathan"]
```

What the example does:

- The start form offers the head of `nathan-main` (the statement `machine-head`). The approval and the Begin refuse when the head moved.
- The agent step gets its prompt from the system. Its one `text` output is the result of its session.
- The ship needs an approval of Nathan (it is irreversible), and the `ought` statements `no-pull-debt` and `checks-on-head` must hold at the approval and at the Begin.
- The step stays pending until a read of `origin/canon` after the Begin shows the head in `canon-shipped-from`. A read of another sha is rejected. A Done of Nathan is only a report.
