---
description: "Headless: add one instruction map to a process from the words of a person: make it with flint ite flow new, write its nodes in order, check it with flint ite flow show, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Flow Add (Headless)

Add one instruction map to a program: the nodes of a large process in order (steps, decisions, waits, parallel branches and joins, and sub-maps). A headless agent session follows this workflow for a job of the action `flow-add` ("+ Add an instruction map" in the Workbench), with no person in the session. The form is in Instruction Maps and Runs of [[init-ite]] and in [[tmp-ite-instruction_map-v0.1]]. The rules of a headless session are in [[hinit-ite]].

The focus of this job: the selected parts.

# Input

- The program
- (Optional) The selected parts: the parts that the steps work on. They go into the `about` of the steps.
- The text of the person: the work that the map must put in order. It can name a process that has no map yet ("Write the instruction map of the process `<id>`.").

# Actions

## Stage 1: Read the Work

1. Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the map (`flint ite map "<program>" --json`), the processes (`flint ite process list "<program>" --json`), the instruction maps (`flint ite flow list "<program>" --json`), and the claims (`flint ite claim list "<program>" --json`).
4. Read the note of each selected part, and the sources that the note names. When the text names a process, read it: `flint ite process show "<program>" <id>`.
5. Select the process of the map. When the text names a process with no map, use it. Else select a new process id: a short, readable slug (`run-the-night`). When the named process has a map already, add no map: return `No change:` with the id of that map.
6. Say the work again in one or two sentences: where it starts, where it ends, and who acts. When the text can have two meanings, select the reading that best helps the person, and keep it for the `summary`.
7. Once you know the work and the process, progress to the next stage.

## Stage 2: Plan the Nodes

1. Run `flint orbh session set phase planning`.
2. Write the nodes in order, each with a slug id and a title for a person:
   - `step`: one piece of work. It does a process of the program (`does: { process: <id> }`), or an inline instruction (`does: { by: person | agent, instruction: "<text>" }`).
   - `decision`: a question with its outcomes, each to a node id. `by: person` for a decision of a person.
   - `wait`: until a claim holds, until a time, for a time, or for a hook.
   - `parallel` and `join`: branches that run at the same time.
   - `sub-map`: a process that has its own map.
3. Give a step `precondition` (the claims that must hold before it) and `effect` (the claims that show that it worked) only with claims that exist. Give a step `about`: the refs that it works on. `about` names what the step works on: a part id, another process (`process:<id>`), a node of a map (`process:<id>#<node>`), or data (`data:<id>`).
4. **The rules of a map.** Loops go only out of a decision. Each node has a way to an exit. A `join` has a `parallel` before it. A `sub-map` names a process with a map. A step that changes the world outside this machine does a process with `irreversible: true`, so a person approves it.
5. Select `entry` (the first node), `exits` (the nodes where a run ends), and the `inputs` of the run.
6. Once the plan puts the work in order, progress to the next stage.

## Stage 3: Write the Map

1. Run `flint orbh session set phase writing`.
2. Make the map:

   ```bash
   flint ite flow new "<program>" <process id> --title "<title>" [--about <ref>...] [--text "<prose>"]
   ```

   It writes `Steel/Programs/<program>/Processes/<process id>/map.md` with one step `start` of a person, writes `process.md` when the process has none, and records you in the activity. Give `--about` the selected parts, and each other process (`process:<id>`) or data (`data:<id>`) that the process works on: a new `process.md` gets them as its `about`.
3. Write the nodes of your plan into `map.md` with the form of [[tmp-ite-instruction_map-v0.1]]: the frontmatter (`format: steel-flow/1`, `entry`, `exits`, `inputs`), one H1 with one to three sentences for a person, and one H2 for each node (`## Title {#id}`) with the instruction for a person and one fenced block whose info word is the kind of the node. Replace the step `start` when your plan does not use it.
4. When `flow new` wrote `process.md`, complete its prose with the form of [[tmp-ite-process-v0.1]].
5. Once the map is written, progress to the next stage.

## Stage 4: Check the Map

1. Run `flint orbh session set phase checking`.
2. Run `flint ite flow show "<program>" <process id>`. It must show no problem. Repair each problem (an unknown node id, a node with no way to an exit, a `join` with no `parallel`, a cycle that does not go through a decision, a node that the entry does not reach, a missing process or claim), and run it again.
3. Run `flint ite check "<program>"`. Repair each error finding of the map and of its process.
4. Never start a run (`flint ite flow start`): a run acts for the person.
5. Once the map has no problem, progress to the next stage.

## Stage 5: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: the process id, the count of the nodes of each kind, the mode (native, blended, or external), the steps of a person, and the most important gap (for example a step with no process, or a step with no effect claim). Use no `'` character.
3. End the job with the result, and nothing else:

   ```bash
   flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

   When you added no map, the `summary` starts with `No change:` and gives the reason.

# Output

- One instruction map `Steel/Programs/<program>/Processes/<process id>/map.md` (and `process.md` when it was absent), with no problem in `flint ite flow show`
- One activity record of `flint ite flow new`
- One `steel-result/1` JSON value as the result of the job
