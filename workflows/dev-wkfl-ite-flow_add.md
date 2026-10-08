---
description: "Add one instruction map to a process from the words of a person: plan the nodes with the person, make it with flint ite flow new, write the nodes in order, and check it with flint ite flow show"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Flow Add

Add one instruction map to a program: the nodes of a large process in order (steps, decisions, waits, parallel branches and joins, and sub-maps). The person says the work, and you plan the nodes with the person, write the map, and check it. The form is in Instruction Maps and Runs of [[init-ite]] and in [[tmp-ite-instruction_map-v0.1]].

# Input

- The program
- (Optional) The selected parts: the parts that the steps work on. They go into the `about` of the steps.
- The words of the person: the work that the map must put in order, or the process that has no map yet

# Actions

## Stage 1: Read the Work

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the map (`flint ite map "<program>" --json`), the processes (`flint ite process list "<program>"`), the instruction maps (`flint ite flow list "<program>"`), and the claims (`flint ite claim list "<program>"`).
3. Read the note of each selected part. When the person names a process, read it: `flint ite process show "<program>" <id>`.
4. Select the process of the map: the process that the person names, or a new slug id (`run-the-night`). When that process has a map already, show it to the person, and stop: this workflow adds a map, and does not change one.
5. Say the work again in one or two sentences: where it starts, where it ends, and who acts. When it can have two meanings, ask the person one question.
6. Once you know the work and the process, progress to the next stage.

## Stage 2: Plan the Nodes

1. Write the nodes in order, each with a slug id and a title: `step` (a process of the program, or an inline instruction for a person or an agent), `decision` (a question with its outcomes), `wait`, `parallel` and `join`, and `sub-map`.
2. Give a step `precondition` and `effect` only with claims that exist, and `about` with the refs that it works on: a part id, `process:<id>`, `process:<id>#<node>`, or `data:<id>`.
3. **The rules of a map.** Loops go only out of a decision. Each node has a way to an exit. A `join` has a `parallel` before it. A step that changes the world outside this machine does a process with `irreversible: true`.
4. Select `entry`, `exits`, and the `inputs` of the run.
5. Show the person the plan: the nodes in order, who acts in each, and the decisions. Ask: write it, or change it.
6. Once the person agrees, progress to the next stage.

## Stage 3: Write the Map

1. Make the map:

   ```bash
   flint ite flow new "<program>" <process id> --title "<title>" [--text "<prose>"]
   ```

   It writes `Steel/Programs/<program>/Processes/<process id>/map.md` with one step `start` of a person, and writes `process.md` when the process has none.
2. Write the nodes of the plan into `map.md` with the form of [[tmp-ite-instruction_map-v0.1]]: the frontmatter (`format: steel-flow/1`, `entry`, `exits`, `inputs`), one H1 with the prose for a person, and one H2 for each node with its instruction and its fenced block. Replace the step `start` when the plan does not use it.
3. When `flow new` wrote `process.md`, complete its prose with the form of [[tmp-ite-process-v0.1]].
4. Once the map is written, progress to the next stage.

## Stage 4: Check the Map

1. Run `flint ite flow show "<program>" <process id>`. It must show no problem. Repair each problem and run it again.
2. Run `flint ite check "<program>"`. Repair each error finding of the map and of its process.
3. Show the person the resolved map: the nodes, `run` of each node, and the mode. Do not start a run (`flint ite flow start`) unless the person asks for exactly that.
4. Once the map has no problem, the workflow is done.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the process id, the count of the nodes of each kind, the mode, and the most important gap. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

# Output

- One instruction map `Steel/Programs/<program>/Processes/<process id>/map.md` (and `process.md` when it was absent), with no problem in `flint ite flow show`
