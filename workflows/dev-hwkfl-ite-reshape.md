---
description: "Headless: change a view of a program in the words of a person through a candidate with the base_hash of the view, verify it, and return one ite-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Reshape (Headless)

Change one view as a person asks, with no person in the session. The person reviews the candidate in the Workbench and applies it. The rules of the view file and the quality rules are in [[init-ite]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program and the view (the document of the job: its id, its file, and its `base_hash` now)
- The instructions of the person: the change, in words
- (Optional) The selected nodes: the scope of the change

# Actions

## Stage 1: Read the View

1. Run the `flint ite focus` command of the prompt ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Compute the `base_hash` before you read the file: `shasum -a 256 "<view file>"` (the first word). When it is not the `base_hash` of the prompt, the view changed after the start of the job: use the new hash, and say so in the `summary`.
4. Read the view: `flint ite view <view id> --json` and the view file in full. For an OrbCode view, follow the workflow `hwkfl-orbc-reshape` of the OrbCode shard (`flint shard hstart orbc`), and return its result in the schema `ite-result/1`.
5. Say the change again in one sentence. When it can have two meanings, select the meaning that best helps the person, and keep it for the `summary`.
6. Once you know the change and the base hash, progress to the next stage.

## Stage 2: Plan the Change

1. Run `flint orbh session set phase shaping`.
2. Write a node map: `keep`, `change`, `move`, or `remove` for each node, and each new node with an id (the part id of its part, from `flint ite map "<program>" --json`, never invented; a slug for a node with no part), a kind, and links. A node keeps its id when it moves and when its title changes. To give a node with a slug its part, change its heading id to the part id and change each link to it.
3. Keep `lifetime` as it is. Set `curation: "proposed"`.
4. Once the plan makes the change, progress to the next stage.

## Stage 3: Write the Candidate

1. Run `flint orbh session set phase writing`. Set the focus on the nodes that change.
2. Make the candidate id (`<view-slug>-<UTC yyyymmdd-hhmmss>`) and one new UUID for `id`. `view_id` is the `id` of the view. `base_hash` is the hash of Stage 1.
3. Write `Steel/Programs/<Program>/Proposals/<candidate-id>.md` with `state: proposed`: the complete view file after the change, in the form of [[tmp-ite-view-v0.1]] (format `ite-view/2`).
4. Check the candidate against the quality rules of [[init-ite]].
5. Once the candidate passes each rule, progress to the next stage.

## Stage 4: Verify the Candidate

1. Run `flint orbh session set phase checking`.
2. Run `flint ite diff --candidate <candidate-id> --json`. It reads the candidate as the view will be after the apply. Then run `flint ite check --candidate <candidate-id>`: it shows only the findings of the candidate and exits 1 for an error finding.
   - `conflict` must be `false`, and `added`, `removed`, `moved`, and `changed` must be the nodes of your node map. The text form of the command says "The candidate can be applied."
   - Read `candidate.findings`. Repair each finding of the level `error` or `warning` in the candidate file (`format`, `link-missing`, `ref-missing`: a heading id that names no part), and run the diff again.
   - For a conflict, read the view again and write a new candidate from the current view.
3. Do not return before step 2 passes. Say in the `summary` that the diff passed.
4. When an error stays and you cannot repair it, discard your candidate and return a failure (see The Result of [[hinit-ite]]).
5. Once the diff has no conflict and the candidate has no finding of the level error or warning, progress to the next stage.

## Stage 5: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: what changed (the counts of the added, the removed, the moved, and the changed nodes), the reading that you selected, and the most important gap. Use no `'` character.
3. Do not apply and do not discard the candidate.
4. End the turn with the result, and nothing else:

   ```bash
   flint orbh session return --finish '{"schema":"ite-result/1","program":"<program>","view_id":"<view id>","candidate_id":"<candidate-id>","base_hash":"<base_hash>","summary":"<summary>"}'
   ```

# Output

- One candidate in `Steel/Programs/<Program>/Proposals/`, with the `view_id` and the `base_hash` of the view, and `state: proposed`
- One `ite-result/1` JSON value as the result of the turn
