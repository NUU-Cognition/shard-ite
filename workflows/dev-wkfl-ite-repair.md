---
description: "Make the model true again: for each failing or stale node, find whether the model or reality is wrong, then change the model or name the work that reality needs"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Repair

A node that fails or is stale says: the model and reality disagree. Either the model is wrong (the plan changed, the part moved, the contact points to an old place), or reality is wrong (the work is not done, the page is down, the booking fell through). This workflow finds which one is wrong for each node. It changes the model when the model is wrong. It names the work when reality is wrong: it never changes reality to make a claim true.

# Input

- The program and the document (`map`, or a view)
- (Optional) The node ids. With no node: each node with the grounding `failing` or `stale`.

# Actions

## Stage 1: Read the Failures

1. Set the focus: `flint ite focus <node ids>` ([[sk-ite-focus]]).
2. Read the document with its grounding: `flint ite map "<program>" --json` (or `flint ite view <view> --json`). With no node ids, select each node that is `failing` or `stale`.
3. For each node, read the newest observation of each contact that fails or is stale: `flint ite observations "<program>" --node <id>`. Keep what the check saw and when.
4. For a stale contact, run it again first (`flint ite run "<program>" --node <id>`, or [[wkfl-ite-observe]] for an agent contact). A stale contact that holds again needs no repair.
5. Once each node has its failing contacts and what they saw, progress to the next stage.

## Stage 2: Find What Is Wrong

For each failing contact, decide one cause, with evidence:

| Cause | Evidence | Repair |
|---|---|---|
| The contact is wrong: the path moved, the URL changed, the query is too narrow | The thing exists, but at another place or in another form | Change the contact (Stage 3) |
| The part is wrong: the plan changed, and the part says the old plan | A newer note, a message, or the person says the new plan | Change the part or the view (Stage 3) |
| Reality is wrong: the work is not done, or something broke | The contact is correct, and the part says what must be true | Name the work (Stage 4) |
| Not known | The evidence does not decide | Ask the person |

1. Set the focus on the node that you work on. Read the note of the node, the sources that it names, and the place that the contact checks.
2. Show the person each node with its cause and its evidence. Ask the person to confirm each cause that is not certain.
3. Once each failing contact has a cause, progress to the next stage.

## Stage 3: Change the Model

1. A wrong contact: remove it with `flint ite contact remove "<program>" <node> --contact <id>`, add the correct one with `flint ite contact add` (with a readable `--id`), check it one time, and run it (`flint ite run "<program>" --node <id>`).
2. A wrong part: change its text, its fields, or its links with `flint ite part set` and `flint ite link`. Keep its id.
3. A wrong view node: write a candidate with [[wkfl-ite-reshape]]. Apply it only when the person agrees.
4. Never remove a contact only because it fails. Remove it only when its claim is no longer a claim of the node, and say so to the person.
5. Once each wrong model is changed, progress to the next stage.

## Stage 4: Name the Work of Reality

1. For each node where reality is wrong, write one sentence: what must happen in reality so that the claim holds, and who can do it (the `owner` of the part when it has one).
2. Do not change reality to make a claim true. When the person asks you to do the work, that is a new job (the template `do`), not a repair.
3. Show the person the list of the work. Propose a task of the Projects shard for each large item, when the person wants one.
4. Run `flint ite map "<program>"` and show the grounding after the repair.
5. Once the person has the list, the workflow is done.

# Output

- A changed model for each node where the model was wrong, with its contacts run again
- A list of the work that reality needs, with an owner for each item
