---
description: "Add one instruction map to a process from the words of a person: plan the nodes with the person, make it with flint ite flow new, write the nodes in order, and check it with flint ite flow show; in a headless session, plan the nodes with no person, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Flow Add

Add one instruction map to a program: the nodes of a large process in order (steps, decisions, waits, parallel branches and joins, and sub-maps). The person says the work, and you plan the nodes with the person, write the map, and check it. The form is in Instruction Maps and Runs of [[knw-ite-processes]] and in [[tmp-ite-instruction_map-v0.1]].

> [!headless]
> A headless agent session follows this workflow for a job of the action `flow-add` ("+ Add an instruction map" in the Workbench), with no person in the session. Do each stage, and follow the `> [!headless]` callout in it. The rules of a headless session are in [[init-ite#Headless]].
> - The focus of this job: the selected parts.
> - The job ends with one `steel-result/1` JSON value, as the callout of The End of a Job says.

# Input

- The program
- (Optional) The selected parts: the parts that the steps work on. They go into the `about` of the steps.
- The words of the person: the work that the map must put in order, or the process that has no map yet

> [!headless]
> - The words of the person are the text of the person in the job. It can name a process that has no map yet ("Write the instruction map of the process `<id>`.").

# Actions

## Stage 1: Read the Work

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the map (`flint ite map "<program>" --json`), the processes (`flint ite process list "<program>"`), the instruction maps (`flint ite flow list "<program>"`), and the claims (`flint ite claim list "<program>"`).
3. Read the note of each selected part. When the person names a process, read it: `flint ite process show "<program>" <id>`.
4. Select the process of the map: the process that the person names, or a new slug id (`run-the-night`). When that process has a map already, show it to the person, and stop: this workflow adds a map, and does not change one.
5. Say the work again in one or two sentences: where it starts, where it ends, and who acts. When it can have two meanings, ask the person one question.
6. Once you know the work and the process, progress to the next stage.

> [!headless]
> - Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]). Then run `flint orbh session set phase reading`.
> - Read the processes, the instruction maps, and the claims with `--json`: `flint ite process list "<program>" --json`, `flint ite flow list "<program>" --json`, and `flint ite claim list "<program>" --json`.
> - Read the note of each selected part, and the sources that the note names. When the text names a process, read it.
> - Select the process of the map. When the text names a process with no map, use it. Else select a new process id: a short, readable slug (`run-the-night`). When the named process has a map already, add no map, and do not show it to a person: end the job as the callout of The End of a Job says, with a `summary` that starts with `No change:` and gives the id of that map.
> - Do not wait for a person, and ask no question. When the text can have two meanings, select the reading that best helps the person, and keep it for the `summary`.

## Stage 2: Plan the Nodes

1. Write the nodes in order, each with a slug id and a title: `step` (a process of the program, or an inline instruction for a person or an agent), `decision` (a question with its outcomes), `wait`, `parallel` and `join`, and `sub-map`.
2. Give a step `precondition` and `effect` only with claims that exist, and `about` with the refs that it works on: a part id, `process:<id>`, `process:<id>#<node>`, or `data:<id>`. A step has no `writes`: a step writes a data item only when the data item names its process in `kept-by` (`kept-by: "process:<id>"`).
3. **The rules of a map.** Loops go only out of a decision. Each node has a way to an exit. A `join` has a `parallel` before it. A step that changes the world outside this machine does a process with `irreversible: true`.
4. Select `entry`, `exits`, and the `inputs` of the run.
5. Show the person the plan: the nodes in order, who acts in each, and the decisions. Ask: write it, or change it.
6. Once the person agrees, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase planning`.
> - Give each node a title for a person. The kinds of the nodes:
>   - `step`: one piece of work. It does a process of the program (`does: { process: <id> }`), or an inline instruction (`does: { by: person | agent, instruction: "<text>" }`).
>   - `decision`: a question with its outcomes, each to a node id. `by: person` for a decision of a person.
>   - `wait`: until a claim holds, until a time, for a time, or for an event (an event kind, for example `webhook`: the HTTP hook of a process emits it).
>   - `parallel` and `join`: branches that run at the same time.
>   - `sub-map`: a process that has its own map.
> - `precondition` is the claims that must hold before the step. `effect` is the claims that show that the step worked. `about` names what the step works on: a part id, another process (`process:<id>`), a node of a map (`process:<id>#<node>`), or data (`data:<id>`).
> - The rules of a map also say: a `sub-map` names a process with a map. A step that changes the world outside this machine does a process with `irreversible: true`, so a person approves it.
> - `entry` is the first node. `exits` are the nodes where a run ends.
> - Do not show the plan to a person, and do not wait for a person. Once the plan puts the work in order, progress to the next stage.

## Stage 3: Write the Map

1. Make the map:

   ```bash
   flint ite flow new "<program>" <process id> --steps "<step>; <step>; ..." [--title "<title>"] [--about <ref>...] --dry-run
   ```

   Write the nodes of your plan as a list of steps ([[sk-ite-workflow_new]]: `Person:`, `Agent:`, `Process: <id>`, `<question>? -> A | B`, `Wait:`, `Map: <id>`, `A & B`). Read how the command reads each step, change the words until each step is right, then run it again with no `--dry-run`. When a starter fits (`flint ite flow starters`), use `--starter <name> [--with k=v]...` in place of `--steps`: a starter writes a whole map one time. Check the flags with `flint ite flow new --help`.

   It writes `Steel/Programs/<program>/Processes/<process id>/map.md` with the nodes of the steps, and writes `process.md` when the process has none. Give `--about` the selected parts, and each other process (`process:<id>`) or data (`data:<id>`) that the process works on: a new `process.md` gets them as its `about`.
2. Complete the nodes in `map.md` with the form of [[tmp-ite-instruction_map-v0.1]]: the `inputs` of the frontmatter, the prose for a person under the H1, and under each H2 the instruction, the `inputs` and `outputs`, and `precondition` and `effect`.
3. When `flow new` wrote `process.md`, complete its prose with the form of [[tmp-ite-process-v0.1]]. The process has no `writes` and no `kept-by`. Give the process the trigger that the request needs with `flint ite process set "<program>" <process id>` (a schedule: `--every` or `--cron`; an event: `--on <kind>`), or keep `manual` for runs that a person starts. When the map repairs a failed claim, give the process an event trigger with `flint ite process set "<program>" <process id> --add-trigger --on claim.failed --on-about claim:<claim id>` (`trigger: { on: event, kinds: [claim.failed], about: ["claim:<claim id>"] }`). `--add-trigger` keeps the other triggers of the process; without it, the trigger flags replace each trigger. Only a person enables a process.
4. Once the map is written, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase writing`.
> - `flint ite flow new` also records you in the activity.
> - Complete `map.md` with the form of [[tmp-ite-instruction_map-v0.1]]: the frontmatter (`format: steel-flow/1`, `entry`, `exits`, `inputs`), one H1 with one to three sentences for a person, and one H2 for each node (`## Title {#id}`) with the instruction for a person and one fenced block whose info word is the kind of the node. Complete what the step list cannot say: the instruction under each heading, the `inputs` and `outputs`, `precondition` and `effect`.
> - Never enable the process: only a person enables a process.

## Stage 4: Check the Map

1. Run `flint ite flow check "<program>" <process id>` (each problem with the file, the line, the cause, and the fix), then `flint ite flow show "<program>" <process id>`. It must show no problem. Repair each problem and run it again.
2. Run `flint ite check "<program>"`. Repair each error finding of the map and of its process.
3. Show the person the resolved map: the nodes, `run` of each node, and the mode. Do not start a run (`flint ite flow start`) unless the person asks for exactly that.
4. Once the map has no problem, the workflow is done.

> [!headless]
> - Run `flint orbh session set phase checking`.
> - The problems to repair include: an unknown node id, a node with no way to an exit, a `join` with no `parallel`, a cycle that does not go through a decision, a node that the entry does not reach, and a missing process or claim. Repair each problem, and run the check again.
> - Do not show the map to a person. Never start a run (`flint ite flow start`): a run acts for the person.
> - Once the map has no problem, end the job as the callout of The End of a Job says.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the process id, the count of the nodes of each kind, the mode, and the most important gap. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

> [!headless]
> A headless session does not end the job in the chat, and does not wait for the person. It returns the result:
> 1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[init-ite#Headless]]. When an item fails, go back to its stage: do not return with an item open.
> 2. Write the `summary`: the process id, the count of the nodes of each kind, the mode (native, blended, or external), the steps of a person, and the most important gap (for example a step with no process, or a step with no effect claim). Use no `'` character.
> 3. End the job with the result, and nothing else:
>
>    ```bash
>    flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
>    ```
>
>    When you added no map, the `summary` starts with `No change:` and gives the reason.

# Output

- One instruction map `Steel/Programs/<program>/Processes/<process id>/map.md` (and `process.md` when it was absent), with no problem in `flint ite flow check`

> [!headless]
> - One activity record of `flint ite flow new`
> - One `steel-result/1` JSON value as the result of the job
