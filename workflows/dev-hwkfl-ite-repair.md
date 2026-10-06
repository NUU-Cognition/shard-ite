---
description: "Headless: for each failing or stale node, find whether the model or reality is wrong, change the model or name the work of reality, and return one ite-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Repair (Headless)

Make the model true again, with no person in the session. For each failing or stale node, find whether the model or reality is wrong. Change the model when the model is wrong. Name the work when reality is wrong: never change reality to make a claim true. The causes and the repairs are in [[wkfl-ite-repair]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program and the document (`map`, or a view)
- The selected nodes. With no node: each node with the grounding `failing` or `stale`.
- (Optional) The instructions of the person

# Actions

## Stage 1: Read the Failures

1. Run the `flint ite focus` command of the prompt ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the document with its grounding (`flint ite map "<program>" --json`, or `flint ite view <view> --json`). For an OrbCode program, stop: return `No change:` with the next step "use the OrbCode shard and Orbtest" (rule 6 of [[hinit-ite]]).
4. For each node, read the newest observation of each failing or stale contact: `flint ite observations "<program>" --node <id> --json`.
5. Run each stale automatic contact again: `flint ite run "<program>" --node <id>`. A contact that holds again needs no repair.
6. Once each node has its failing contacts, progress to the next stage.

## Stage 2: Find What Is Wrong

1. Run `flint orbh session set phase diagnosing`.
2. For each failing contact, set the focus on its node, read the note, its sources, and the place that the contact checks, and decide one cause with the table of Stage 2 of [[wkfl-ite-repair]]: the contact is wrong, the part is wrong, reality is wrong, or not known.
3. Decide a cause only with evidence. When the evidence does not decide, the cause is "not known": change nothing for that node.
4. Once each failing contact has a cause, progress to the next stage.

## Stage 3: Change the Model

1. Run `flint orbh session set phase writing`.
2. A wrong contact: remove it with `flint ite contact remove "<program>" <node> --contact <id>`, add the correct one with `flint ite contact add` (with a readable `--id`), check it one time, and run it again.
3. A wrong part: change it with `flint ite part set` and `flint ite link`. Keep its id.
4. A wrong view node: write one candidate for the view (Stage 3 of [[hwkfl-ite-reshape]]). Write at most one candidate in this job, and return it.
5. Never remove a contact only because it fails.
6. Run `flint ite check "<program>"` and repair each error that your changes made.
7. Once each wrong model is changed, progress to the next stage.

## Stage 4: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: the count of the nodes that hold again, the count of the model changes, and the work that reality needs (the most important item first, with its owner). Name each node whose cause is not known. Use no `'` character.
3. End the turn with the result, and nothing else (`candidate_id` and `base_hash` of the candidate when you wrote one, else null):

   ```bash
   flint orbh session return --finish '{"schema":"ite-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

# Output

- Changed parts and contacts, and at most one candidate
- One `ite-result/1` JSON value as the result of the turn
