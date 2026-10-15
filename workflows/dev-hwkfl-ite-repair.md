---
description: "Headless: for each claim that fails or is old, read which side the links say must change, confirm it with evidence, propose the change of the model or of the check or name the repair of the world, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Repair (Headless)

Make the model true again, with no person in the session. For each claim that fails or is old, read its `on_fail`: the links say which side must change (a process with an event trigger on its `claim.failed` repairs the world; else the keeper of its first part proposes a change of the model). Confirm the side with evidence, and find a check that is wrong. Propose the change of the model or of the check. Name the repair when reality is wrong: never change the world to make a claim true. The causes and the repairs are in [[wkfl-ite-repair]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program
- The selected parts. With no part: each claim that fails, has an error, or is old.
- (Optional) The instructions of the person

# Actions

## Stage 1: Read the Failures

1. Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the claims (`flint ite claim list "<program>" --json`).
4. For each claim that fails, has an error, or is old, read its newest results and its `on_fail`: `flint ite claim show "<program>" <claim> --json`.
5. Run each old code check again: `flint ite claim check "<program>" <claim>`. A claim that holds again needs no repair.
6. Once each claim has what its check saw, progress to the next stage.

## Stage 2: Find What Is Wrong

1. Run `flint orbh session set phase diagnosing`.
2. For each claim, set the focus on its parts, read the notes, their sources, and the place that the check reads, and decide one cause with the table of Stage 2 of [[wkfl-ite-repair]]: the check is wrong, the model is wrong (`on_fail.keeper`), reality is wrong (`on_fail.repair`), or not known.
3. Decide a cause only with evidence. When the evidence does not decide, the cause is "not known": change nothing for that part.
4. Once each claim has a cause, progress to the next stage.

## Stage 3: Change the Model or the Check

1. Run `flint orbh session set phase writing`.
2. A wrong check: the check is a process. Make its draft (`flint ite process dev "<program>" check-<id>`), edit the draft with the form of [[tmp-ite-claim-v0.1]], and test the draft. A code check: `flint ite process test "<program>" check-<id> --dev` (the claim test tests the production check when it exists). An agent check: `flint ite process test "<program>" check-<id> --dev --dry` (the test refuses an agent process with no `--dry`; with it, the test starts no session and runs nothing), then read the sources that its `prompt` names, and see that the prompt can decide holds or fails. A person check: read its `task`: it asks one clear question about now. Then run `flint ite process check "<program>" check-<id>`, and propose its promote (`flint ite process promote "<program>" check-<id>`). Never apply the promote.
3. A wrong part: propose the change with one map change (`edit` for the text and the fields; `move`, `rename`, `merge` for the tree) with `flint ite map change propose`. Keep its id.
4. A wrong claim (the system changed what must be true now): propose a revision of its `claim.md` with `flint ite revision propose "<program>" --kind steel --target "<the claim file>" --content-file <file> --reason "<why>" --trigger failed`.
5. A wrong view node: write one candidate for the view (Stage 3 of [[hwkfl-ite-reshape]]). Write at most one candidate in this job, and return it.
6. Never remove a claim only because it fails, and never run a repair process: a process of `on_fail.repair` runs by its trigger when a person enabled it.
7. Run `flint ite check "<program>"` and repair each error that your changes made.
8. Once each wrong model and each wrong check has its proposal, progress to the next stage.

## Stage 4: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: the count of the claims that hold again, the proposals (the map change, the revisions, the promotes, the candidate), and the repairs that reality needs (the most important item first, with its owner and its repair process, or "no process repairs it"). Name each claim whose cause is not known. Use no `'` character.
3. End the job with the result, and nothing else (`candidate_id` and `base_hash` of the candidate when you wrote one, else null):

   ```bash
   flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

# Output

- Proposals for the model and for the checks: at most one map change, revisions, promotes of draft checks, and at most one candidate
- One `steel-result/1` JSON value as the result of the job
