---
description: "Headless: for each failing or stale part, find whether the model or reality is wrong, change the model or name the work, and return one ite-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Repair (Headless)

Make the model true again, with no person in the session. For each failing or stale part, find whether the model or reality is wrong. Change the model when the model is wrong. Name the work when reality is wrong: never change the world to make a claim true. The causes and the repairs are in [[wkfl-ite-repair]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program
- The selected parts. With no part: each part with the grounding `failing` or `stale`.
- (Optional) The instructions of the person

# Actions

## Stage 1: Read the Failures

1. Run the `flint ite focus` command of the prompt ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the map with its grounding (`flint ite map "<program>" --json`). For an OrbCode program, stop: return `No change:` with the next step "use the OrbCode shard and Orbtest" (rule 6 of [[hinit-ite]]).
4. For each part, read its processes and the newest observation of each failing or stale process: `flint ite process list "<program>" --part <id> --json`, and `flint ite process show "<program>" <process id> --json`.
5. Run each stale code process again: `flint ite process run "<program>" <id>`. A process that holds again needs no repair.
6. Once each part has its failing processes, progress to the next stage.

## Stage 2: Find What Is Wrong

1. Run `flint orbh session set phase diagnosing`.
2. For each failing process, set the focus on its part, read the note, its sources, and the place that the process checks, and decide one cause with the table of Stage 2 of [[wkfl-ite-repair]]: the process is wrong, the part is wrong, reality is wrong, or not known.
3. Decide a cause only with evidence. When the evidence does not decide, the cause is "not known": change nothing for that part.
4. Once each failing process has a cause, progress to the next stage.

## Stage 3: Change the Model

1. Run `flint orbh session set phase writing`.
2. A wrong process: edit its `process.md` in `Steel/Programs/<program>/Reality/<id>/` with the form of [[tmp-ite-process-v0.1]], check it one time, run `flint ite process list "<program>"`, and run it again (`flint ite process run "<program>" <id>`).
3. A wrong part: change it with `flint ite part set` and `flint ite link`. Keep its id. Propose a change of the tree with `flint ite map change propose`.
4. A wrong view node: write one candidate for the view (Stage 3 of [[hwkfl-ite-reshape]]). Write at most one candidate in this job, and return it.
5. Never remove a process only because it fails.
6. Run `flint ite check "<program>"` and repair each error that your changes made.
7. Once each wrong model is changed, progress to the next stage.

## Stage 4: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: the count of the parts that hold again, the count of the model changes, and the work that reality needs (the most important item first, with its owner). Name each part whose cause is not known. Use no `'` character.
3. End the turn with the result, and nothing else (`candidate_id` and `base_hash` of the candidate when you wrote one, else null):

   ```bash
   flint orbh session return --finish '{"schema":"ite-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

# Output

- Changed parts and processes, and at most one candidate
- One `ite-result/1` JSON value as the result of the turn
