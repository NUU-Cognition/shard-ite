---
description: "Headless: find the processes of parts with reality, write their process.md files, run each one time, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Ground (Headless)

Give parts their processes, with no person in the session. The process forms are in Processes and the Log of [[init-ite]] and in [[tmp-ite-process-v0.1]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program
- The selected parts. With no part: each part of the map with the grounding `no-process` that is not of the type `note`.
- (Optional) The instructions of the person: the sources to use, or the forms to prefer

# Actions

## Stage 1: Read the Parts

1. Run the `flint ite focus` command of the prompt ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the map (`flint ite map "<program>" --json`) and the processes (`flint ite process list "<program>" --json`). For an OrbCode program, stop: return `No change:` with the next step "use the OrbCode shard and Orbtest" (rule 6 of [[hinit-ite]]).
4. For each part, read its note and write its claim in one sentence. Skip a part that makes no claim, and keep it for the `summary`.
5. Once each selected part has its claim, progress to the next stage.

## Stage 2: Find the Processes

1. Run `flint orbh session set phase grounding`.
2. For each claim, select the form with the table of Stage 2 of [[wkfl-ite-ground]]. Prefer a form that a command can check. When one check answers for many parts, plan one process with each of those parts.
3. Set the focus on the part that you work on. Check each code process one time before you write it (the path, the URL, the note, the query, the command). Never invent a process. Never write a process that changes the world: a process observes, and it never acts.
4. A process touches reality outside the model. A `mesh` query that only finds a part of this program (for example the part of a person, to prove a role) proves only that the model has the part: do not write it. A `mesh` process counts records of the work or of the world: tasks, meetings, reports, or the `status` that a person writes on a part.
5. When no process is possible, write no process, and keep the part for the `summary`.
6. Once each claim has its processes or its gap, progress to the next stage.

## Stage 3: Write and Run

1. Run `flint orbh session set phase writing`.
2. Write each process: `Steel/Programs/<program>/Reality/<id>/process.md` with the form of [[tmp-ite-process-v0.1]]. Give it a short, readable `id` (`booking-email`): the person reads it in the Workbench. Name the parts by their ids, never by their titles.
3. Run `flint ite process list "<program>"`, and repair each process that shows a problem.
4. Run `flint orbh session set phase checking`. Run each code process one time: `flint ite process run "<program>" <id> --json`. This step is required: before it, each new process is `unobserved`, and the person sees no grounding. Do not run a `command` process unless the instructions name it. Take the counts of the `summary` from these runs, not from your own check.
5. Run `flint ite check "<program>"`. Repair each `process-invalid` and `process-no-part` finding.
6. Once each process is written and run, progress to the next stage.

## Stage 4: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: the count of the new processes by form, the count of the parts that hold now, the count that fail now, and the parts with no possible process. Use no `'` character.
3. End the turn with the result, and nothing else (`candidate_id` is the candidate of a view, else null):

   ```bash
   flint orbh session return --finish '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

# Output

- Processes in `Steel/Programs/<program>/Reality/`, each checked one time, and their first observations
- One `steel-result/1` JSON value as the result of the turn
