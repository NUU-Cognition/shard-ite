---
description: "Make the model or the world true again: for each claim that fails or is old, find whether the model, the check, or reality is wrong, then change the model or the check, or name the work that reality needs"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Repair

A claim that fails says: the model and reality disagree. The mode of the claim says which side must move. An `is` claim that fails is drift: the model is out of date (the plan changed, the part moved). An `ought` claim that fails is at risk: reality is off target (the work is not done, the page is down, the booking fell through), and its `fixed-by` names the processes that can fix it. A check can also be wrong (it reads an old place). This workflow finds which one is wrong for each claim. It changes the model or the check when they are wrong. It names the work when reality is wrong: it never changes the world to make a claim true.

# Input

- The program
- (Optional) The part ids. With no part: each claim that fails, has an error, or is old.

# Actions

## Stage 1: Read the Failures

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the claims: `flint ite claim list "<program>"` (with `--part <id>` for one part). With no part ids, select each claim that is `fails`, `error`, or `old`.
3. For each claim, read its newest results: `flint ite claim show "<program>" <claim>`. Keep what the check saw, and when.
4. For an old claim, run its check again first (`flint ite claim check "<program>" <claim>`, or [[wkfl-ite-observe]] for an agent check or a person check). A claim that holds again needs no repair.
5. Once each claim has what its check saw, progress to the next stage.

## Stage 2: Find What Is Wrong

For each claim that fails or has an error, decide one cause, with evidence:

| Cause | Evidence | Repair |
|---|---|---|
| The check is wrong: the path moved, the URL changed, the query is too narrow | The thing exists, but at another place or in another form | Change the check (Stage 3) |
| The model is wrong (drift: often an `is` claim): the plan changed, and the part says the old plan | A newer note, a message, or the person says the new plan | Change the part, the claim, or the view (Stage 3) |
| Reality is wrong (at risk: often an `ought` claim): the work is not done, or something broke | The check is correct, and the claim says what must be true | Name the work, and the process of `fixed-by` (Stage 4) |
| Not known | The evidence does not decide | Ask the person |

1. Set the focus on the parts of the claim. Read the notes of the parts, the sources that they name, and the place that the check reads.
2. Show the person each part with its cause and its evidence. Ask the person to confirm each cause that is not certain.
3. Once each claim has a cause, progress to the next stage.

## Stage 3: Change the Model

1. A wrong check: edit the claim folder `Steel/Programs/<program>/Reality/<id>/` (its code, its prompt, or its question) with the form of [[tmp-ite-claim-v0.1]]. Test its code with `flint ite claim test "<program>" <id>`, run `flint ite claim list "<program>"` to see that it has no problem, and run the check (`flint ite claim check "<program>" <id>`).
2. A wrong part: change its text or its fields with `flint ite part set`, and its links with `flint ite link`. A wrong claim (the plan changed what must be true): edit its `claim.md`, and say so to the person. Keep its id. A change of the tree (a move, a rename, a merge) is a map change: propose it with `flint ite map change propose`.
3. A wrong view node: write a candidate with [[wkfl-ite-reshape]]. Apply it only when the person agrees.
4. Never remove a claim only because it fails. Remove its folder only when it is no longer true of the system that it must hold, and say so to the person.
5. Once each wrong model is changed, progress to the next stage.

## Stage 4: Name the Work of Reality

1. For each claim where reality is wrong, write one sentence: what must happen in reality so that the claim holds, and who can do it (the `owner` of the claim). Name each process of its `fixed-by`: the owner decides to run it.
2. Do not change the world to make a claim true, and do not run a process of `fixed-by`. When the person asks you to do the work, that is a new job (the action `do`), or a run of the process by the person, not a repair.
3. Show the person the list of the work. Propose a task of the Projects shard for each large item, when the person wants one.
4. Run `flint ite claim list "<program>"` and show the states after the repair.
5. Once the person has the list, the workflow is done.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the claims that hold again, the changes of the model (with the id of each map change or candidate), and the work that reality needs. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

# Output

- A changed model or check for each claim where the model or the check was wrong, with its check run again
- A list of the work that reality needs, with an owner for each item
