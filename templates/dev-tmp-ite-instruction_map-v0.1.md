---
description: "An instruction map: a root part with the instruction-map block, and the step parts below it (worksteps and decisions) that point to their instructions; with ite-flow/2, the executors, the effects, and the authority of a living system"
---

# Filename: Mesh/Programs/(Program) [Name]/Map/(Program) [Name] . ([Type]) [Title].md

/*
  An instruction map is a branch of the main map that a person can RUN. It is parts, not a view:
  one ROOT part with the frontmatter block `instruction-map`, and the STEP parts below it. Each step
  points to its instruction with `does`; the instruction itself stays outside the model (a text, a
  skill or a workflow of a shard, a script of a repository, a person). A view with `map: flow` and
  `slice: { below: <root part id> }` draws the map. The view never says the order: `next` and
  `outcomes` on the parts say it.

  Write the parts with `flint ite part add` or a map change (`flint ite map change propose`), as each
  part of the main map. Then set the fields below with `flint ite part set`, or in the frontmatter.

  THE ROOT PART
  - Any type. A new map uses the type Instruction Map: `(Program) [Name] . (Instruction Map) [Title]`.
  - `parent`: as each part. The steps are the parts below the root (`parent` is the root or a part
    below it).
  - `instruction-map`:
      format: ite-flow/1 (or no format): only steps of a person. ite-flow/2: a living system only (the
        program has a `system` block); agent and command steps, effects, and authority.
      id: a slug; unique in a living system.
      title: the title of a run. Default: the title of the root part.
      entry: a wikilink to the first step.
      exits: wikilinks to the steps whose completion ends the run with success. At least one.
      inputs: the inputs of a run: name, kind (text | number | choice | note | notes), required, prompt;
        with ite-flow/2, `statement: <is claim>`: the start form offers its fresh value.
      authority (ite-flow/2): { run, execute, approve, irreversible, approvers }. The steps are wikilinks.
        An actor is person:<Name>, agent:*, or agent:<runtime/profile>. Name each step whose effect cannot
        be undone in `irreversible`: it needs an approval of a person.

  A STEP PART
  - A WORKSTEP is a part of a type with the capability `runnable` (for example Step):
      next: one wikilink to the next step. An exit has none. A `next` to a part outside the map is a
        warning, and a run does not follow it.
      does: { by, who, instruction, executor }
        by: person (default) | agent | command. agent and command need ite-flow/2.
        who: the person or the role, for a person to read.
        instruction: the text that the actor reads, a wikilink to a skill or a workflow, or a path in a
          repository. ${inputs.<name>} in the text is for a person or an agent only.
        executor: agent { target: "<runtime/profile>", timeout, idempotent }; command { run, cwd, timeout,
          idempotent }. Never put ${...} in `run`: a command gets ITE_INPUT_<NAME> and
          ITE_VALUE_<STEP>_<OUTPUT> as environment variables. An agent step has at most one text output.
      inputs: the values that the step reads: name, kind, required, prompt, from (a run value name, or
        <step part id>.<output>). A step input takes its value by name from an earlier output or a run input.
      outputs: name, kind, required, prompt; a note output has part_kind (the type id of the new part),
        min, and link: { relation, to: <input name> | $choice }; a choice output has choices or of.
      done-when: one sentence: when the step is done.
      precondition (ite-flow/2): ought claims that must hold at the approval and at the dispatch.
      effect (ite-flow/2): [{ claim: <is claim that a process feeds>, equals: <a literal, ${inputs.<name>},
        or ${values.<step part id>.<output>}> }]. The step stays pending until the log of the process
        confirms each value. A Done is only a report.
      completion (ite-flow/2): { after: dispatched | reported, within: 2h, on-timeout: unknown | failed }:
        the timing of the effect.
  - A DECISION is a part of a type with the capability `decides` (for example Decision):
      question: the question to the person.
      outcomes: { "<outcome>": "[[<step>]]" } with at least two outcomes. Quote "yes" and "no".
      does: { by: person }. Its answer is the value `<step part id>.answer`.
  - A loop goes only out of a decision; the engine bounds each step at 20 visits for each run.
  - A change of `effect`, `completion`, `precondition`, or `authority` in a living system is a protected
    change: it goes only through a revision that a person applies (flint ite revision propose).
  - The step id of a run is the part id. A run keeps its snapshot: an edit of a step makes a new
    revision for the next run only.
*/

````markdown
---
id: GENERATE-UUID4
parent: "[[(Program) NAME]]"
instruction-map:
  format: ite-flow/1
  id: MAP-ID
  title: "TITLE"
  entry: "[[(Program) NAME . (Step) FIRST STEP]]"
  exits: ["[[(Program) NAME . (Step) LAST STEP]]"]
  inputs:
    - { name: question, kind: text, required: true, prompt: "THE QUESTION TO THE PERSON?" }
---

# (Instruction Map) [Title]

[One to three sentences: what the map does, and where its outputs land.]
````

````markdown
---
id: GENERATE-UUID4
parent: "[[(Program) NAME . (Instruction Map) TITLE]]"
next: ["[[(Program) NAME . (Decision) THE QUESTION]]"]
does:
  by: person
  instruction: "WHAT THE PERSON DOES, IN ONE OR TWO SENTENCES."
inputs:
  - { name: question, kind: text }
outputs:
  - { name: options, kind: notes, part_kind: option, min: 3 }
---

# (Step) [First step]

[One sentence: what the person does in this step.]
````

````markdown
---
id: GENERATE-UUID4
parent: "[[(Program) NAME . (Instruction Map) TITLE]]"
question: "THE QUESTION?"
outcomes:
  "yes": "[[(Program) NAME . (Step) LAST STEP]]"
  "no": "[[(Program) NAME . (Step) FIRST STEP]]"
does: { by: person }
---

# (Decision) [The question]

[One sentence: what each answer means.]
````

## A complete example

The instruction map "Decide" of the program Thinking of this Flint is the first map of `ite-flow/1`: the root `(Program) Thinking . (Instruction Map) Decide` and seven steps (clarify, options, the decision "Are the options enough", compare, critique, decide, commit), with one loop back to the options. Read it as the reference form.

## A complete example of `ite-flow/2`

The instruction map "Ship Flint to canon" of the living system Flint Release has the root `(Program) Flint Release . (Step) Shipping to Canon`:

```yaml
instruction-map:
  format: ite-flow/2
  id: ship
  title: Ship Flint to canon
  entry: "[[(Program) Flint Release . (Step) Write the ship summary]]"
  exits:
    - "[[(Program) Flint Release . (Step) Ship to canon]]"
  inputs:
    - { name: head, kind: text, prompt: "The head of nathan-main to ship", statement: machine-head }
  authority:
    run: ["person:Nathan"]
    approve: ["[[(Program) Flint Release . (Step) Ship to canon]]"]
    irreversible: ["[[(Program) Flint Release . (Step) Ship to canon]]"]
    approvers: ["person:Nathan"]
```

The agent step "Write the ship summary":

```yaml
next: ["[[(Program) Flint Release . (Step) Ship to canon]]"]
does:
  by: agent
  instruction: "Read the commits of origin/canon..${inputs.head} in the primary checkout of the repository flint. Write one line that says what the ship holds. Return only that line."
  executor: { target: "claude/o55xh", timeout: 30m }
outputs: [{ name: summary, kind: text }]
```

The person step "Ship to canon", with an effect:

```yaml
does:
  by: person
  who: Nathan
  instruction: "Press Begin. Then, in the primary checkout of flint, run ndv repo ship flint, with the line of the step summary as the --summary value."
precondition: [no-pull-debt, checks-on-head]
effect:
  - { claim: canon-shipped-from, equals: "${inputs.head}" }
completion: { after: dispatched, within: 2h, on-timeout: unknown }
```

What the example does:

- The start form offers the head of `nathan-main` (the claim `machine-head`). The approval and the Begin refuse when the head moved.
- The agent step gets its prompt from the system. Its one `text` output is the result of its session.
- The ship needs an approval of Nathan (it is irreversible), and the ought claims `no-pull-debt` and `checks-on-head` must hold at the approval and at the Begin.
- The step stays pending until the process `git-flint-remote` observes the head in `canon-shipped-from` after the Begin. A Done of Nathan is only a report.
