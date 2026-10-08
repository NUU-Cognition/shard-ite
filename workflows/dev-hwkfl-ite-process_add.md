---
description: "Headless: add one process to a program from the words of a person: select its form, make it with flint ite process new, write its code, prompt, or task, test it, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Process Add (Headless)

Add one process to a program: a small instruction that the program owns and can run, by code, an agent, or a person. A headless agent session follows this workflow for a job of the action `process-add` ("+ Add a process" in the Workbench), with no person in the session. The form is in Processes of [[init-ite]] and in [[tmp-ite-process-v0.1]]. The rules of a headless session are in [[hinit-ite]].

The focus of this job: the selected parts.

# Input

- The program
- (Optional) The selected parts: the parts that the process uses
- The text of the person: the work that the process must do

# Actions

## Stage 1: Read the Work

1. Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the map (`flint ite map "<program>" --json`), the processes (`flint ite process list "<program>" --json`), and the claims (`flint ite claim list "<program>" --json`).
4. Read the note of each selected part, and the sources that the note names.
5. Say the work again in one sentence: what the process does, what goes in, and what comes out. When the text can have two meanings, select the reading that best helps the person, and keep it for the `summary`.
6. When a process of the program already does the work, add no process: return `No change:` with the id of that process.
7. Once you know the work, progress to the next stage.

## Stage 2: Select the Form

1. Run `flint orbh session set phase planning`.
2. Select the form:
   - `code` when code can do the work on this machine: a script that reads and writes files, calls a command, or calls an API.
   - `agent` when the work needs reading and judgement.
   - `person` when a person must act: a call, a signature, a decision.
3. When the work needs steps and decisions in order, or more than one actor, the process needs an instruction map. Add the process now, and propose the action `flow-add` in the `summary`.
4. Select the `id`: a short, readable slug (`send-reminders`). Check that it is free: `flint ite process show "<program>" <id>` must refuse with `not-found`.
5. Select the `inputs` and the `outputs` (each a name and a kind), and the `effect`: the ids of the claims that show that the work worked. Name only claims that exist. When no claim shows the work, propose the action `claim-add` in the `summary`.
6. Select the authority. A process that changes the world outside this machine (a push, a send, a publish, a payment) gets `irreversible: true`, so a person approves each run. The trigger stays `manual`: only a person enables a trigger.
7. Once the form is selected, progress to the next stage.

## Stage 3: Write the Process

1. Run `flint orbh session set phase writing`.
2. Make the process:

   ```bash
   flint ite process new "<program>" <id> --by code|agent|person --title "<title>" [--part <part id>...] [--text "<prose>"]
   ```

   It writes `Steel/Programs/<program>/Processes/<id>/process.md` from the form, with `trigger: manual`, and records you in the activity. It refuses an id that is not a slug and an id that exists: repair the input and run it again.
3. Complete `process.md` with the form of [[tmp-ite-process-v0.1]]: the prose (what the process does, why, and what it changes), `inputs`, `outputs`, `effect`, `authority`, and `timeout`. Keep `format`, `id`, `by`, and `trigger`.
4. Write the work:
   - `code`: the entry `index.js` in the process folder (`runtime: node`), or another entry with its `runtime`. It prints one JSON line for each record: `{ "output": { "<name>": <value> } }`, `{ "state": { ... } }`, or `{ "log": "<text>" }`. Exit 0 is `done`. A file that it writes on this machine goes into `.flint/steel/state/<program id>/`.
   - `agent`: the `prompt`, with `${inputs.<name>}` for each input.
   - `person`: the `task`: what the person does, and the outputs that the person gives with Done.
5. Run `flint ite process list "<program>"`. Repair each problem of the process: it does not run until its file is correct.
6. Once the process is written, progress to the next stage.

## Stage 4: Test the Process

1. Run `flint orbh session set phase checking`.
2. A code process: test it with `flint ite process test "<program>" <id> [--input <name>=<value>]...`. It runs the code one time, writes nothing to the log, and changes no state. Each record must pass, and the outputs must be the `outputs` of the file. Repair the code and test again. Never keep a process that you did not test.
3. A process with `irreversible: true` or a `source`, and an agent process: test it with `--dry`. It prints what it would run, and runs nothing.
4. A person process: `flint ite process test "<program>" <id>` runs nothing. Check that it shows the task.
5. Never run the process (`flint ite process run`): a process can change the world. Never enable a trigger.
6. Run `flint ite check "<program>"`. Repair each error finding of the process, and each `claim-fixed-by` finding that names it.
7. Once the test passes, progress to the next stage.

## Stage 5: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: the process id, its form, its inputs and outputs, its effect claims, what the test showed, and the next action for the person (`flow-add`, `claim-add`, or Run now). Use no `'` character.
3. End the job with the result, and nothing else:

   ```bash
   flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

   When you added no process, the `summary` starts with `No change:` and gives the reason.

# Output

- One process in `Steel/Programs/<program>/Processes/<id>/`, with its code, prompt, or task, tested
- One activity record of `flint ite process new`
- One `steel-result/1` JSON value as the result of the job
