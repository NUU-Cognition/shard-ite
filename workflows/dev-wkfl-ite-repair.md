---
description: "Make the model true again: for each failing or stale part, find whether the model or reality is wrong, then change the model or name the work that reality needs"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Repair

A part that fails or is stale says: the model and reality disagree. Either the model is wrong (the plan changed, the part moved, the process checks an old place), or reality is wrong (the work is not done, the page is down, the booking fell through). This workflow finds which one is wrong for each part. It changes the model when the model is wrong. It names the work when reality is wrong: it never changes the world to make a claim true.

# Input

- The program
- (Optional) The part ids. With no part: each part with the grounding `failing` or `stale`.

# Actions

## Stage 1: Read the Failures

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the map with its grounding: `flint ite map "<program>" --json`. With no part ids, select each part that is `failing` or `stale`.
3. For each part, read its processes and their newest observations: `flint ite process list "<program>" --part <id>`, then `flint ite process show "<program>" <process id>` for each process that fails or is stale. Keep what the check saw and when.
4. For a stale process, run it again first (`flint ite process run "<program>" <id>`, or [[wkfl-ite-observe]] for an agent process or a person check). A stale process that holds again needs no repair.
5. Once each part has its failing processes and what they saw, progress to the next stage.

## Stage 2: Find What Is Wrong

For each failing process, decide one cause, with evidence:

| Cause | Evidence | Repair |
|---|---|---|
| The process is wrong: the path moved, the URL changed, the query is too narrow | The thing exists, but at another place or in another form | Change the process (Stage 3) |
| The part is wrong: the plan changed, and the part says the old plan | A newer note, a message, or the person says the new plan | Change the part or the view (Stage 3) |
| Reality is wrong: the work is not done, or something broke | The process is correct, and the part says what must be true | Name the work (Stage 4) |
| Not known | The evidence does not decide | Ask the person |

1. Set the focus on the part that you work on. Read the note of the part, the sources that it names, and the place that the process checks.
2. Show the person each part with its cause and its evidence. Ask the person to confirm each cause that is not certain.
3. Once each failing process has a cause, progress to the next stage.

## Stage 3: Change the Model

1. A wrong process: edit its `process.md` in `Steel/Programs/<program>/Reality/<id>/` (the settings, the entry, the prompt, or the claim) with the form of [[tmp-ite-process-v0.1]]. Check it one time, run `flint ite process list "<program>"` to see that it has no problem, and run it (`flint ite process run "<program>" <id>`).
2. A wrong part: change its text or its fields with `flint ite part set`, and its links with `flint ite link`. Keep its id. A change of the tree (a move, a rename, a merge) is a map change: propose it with `flint ite map change propose`.
3. A wrong view node: write a candidate with [[wkfl-ite-reshape]]. Apply it only when the person agrees.
4. Never remove a process only because it fails. Remove its folder only when its claim is no longer a claim of the part, and say so to the person.
5. Once each wrong model is changed, progress to the next stage.

## Stage 4: Name the Work of Reality

1. For each part where reality is wrong, write one sentence: what must happen in reality so that the claim holds, and who can do it (the `owner` of the part when it has one).
2. Do not change the world to make a claim true. When the person asks you to do the work, that is a new job (the template `do`), not a repair.
3. Show the person the list of the work. Propose a task of the Projects shard for each large item, when the person wants one.
4. Run `flint ite map "<program>"` and show the grounding after the repair.
5. Once the person has the list, the workflow is done.

# Output

- A changed model for each part where the model was wrong, with its processes run again
- A list of the work that reality needs, with an owner for each item
