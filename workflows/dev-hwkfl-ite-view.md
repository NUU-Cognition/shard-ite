---
description: "Headless: answer one question of a person with a candidate view of a program, verify it, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: View (Headless)

Write one new candidate view that answers one question of a person, with no person in the session. The person reviews the candidate in the Workbench and applies it. The rules of the view file and the quality rules are in [[init-ite]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program (its name and its id) and the document (`map`, or a view that the question starts from)
- The instructions of the person: the question, and optionally a map (a builtin shape or a map of `Steel/Maps/`) or a name
- (Optional) The selected nodes: the parts that the view is about ("Make a view of this")

# Actions

## Stage 1: Understand the Question

1. Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Say the question again in one sentence. When it can have two meanings, select the meaning that best helps the person, and keep it for the `summary`. With selected nodes and no question, the question is "How do these parts work together?".
4. Read the program: `flint ite map "<program>" --json`. Keep the parts with their ids, names, types, parents, and links. For a software program (template `software`), a process is a view of the map `flow` or `streams`: give each step its `part` and its `actor` (see The Anchor of a Step of [[init-ite]]), and give each node with a slug id its `code-refs` and `stories`.
5. Read the views that exist (`flint ite list --json`). When a view already answers the question, still write the new candidate, and name that view in the `summary`.
6. Once you know the question and the parts that can answer it, progress to the next stage.

## Stage 2: Read the Parts

1. Read the note of each part that can be a part of the answer. With selected nodes, stay inside these parts and their direct neighbours; name each part outside them in the note of what the view leaves out.
2. Note the claims about each part (`flint ite claim list "<program>" --json`), and each statement of the answer that no part holds.
3. Once you can answer the question in one to three sentences, progress to the next stage.

## Stage 3: Select the Map and the Nodes

1. Run `flint orbh session set phase shaping`.
2. Select the map (see Stage 3 of [[wkfl-ite-view]]): a builtin shape or a map of `Steel/Maps/`. Or use the map that the person asked for.
3. Write an outline: the H1 name, the answer, the groups, and the nodes with titles, ids (the part id of each node that stands for a part, from the map, never invented; a slug for a node with no part), kinds, and links. End with one node of `kind: note` that names what the view leaves out.
4. Select, do not dump: five to fifteen nodes. When the answer needs more than 25 nodes, write the first view only, and propose the second view in the `summary`.
5. Select the name: `find Steel/Programs -iname "(View) <Name>.md"`. When the name exists, add ` of <Program>`.
6. Once the outline answers the question, progress to the next stage.

## Stage 4: Write the Candidate

1. Run `flint orbh session set phase writing`. Set the focus on the parts that the view names.
2. Make the candidate id (`<view-slug>-<UTC yyyymmdd-hhmmss>`, with `date -u +%Y%m%d-%H%M%S`) and two new UUIDs (`uuidgen | tr A-Z a-z`) for `view_id` and `id`.
3. Write `Steel/Programs/<Program>/Proposals/<candidate-id>.md` with [[tmp-ite-view-v0.1]] (format `steel-view/1`): `state: proposed`, `base_hash: null`, `lifetime: "draft"`, `curation: "proposed"`, `derived-from: ""`.
4. For a claim that no part holds, say the gap in the prose. A process of a part checks the part; a view node holds no check.
5. Check the candidate against the quality rules of [[init-ite]] (the list of Stage 4 of [[wkfl-ite-view]]).
6. Once the candidate passes each rule, progress to the next stage.

## Stage 5: Verify the Candidate

1. Run `flint orbh session set phase checking`.
2. Run `flint ite diff --candidate <candidate-id> --json`. It reads the candidate as the view will be after the apply. Then run `flint ite check --candidate <candidate-id>`: it shows only the findings of the candidate and exits 1 for an error finding.
   - `conflict` must be `false` and `new_view` must be `true`. The text form of the command says "new view. The candidate can be applied."
   - Read `candidate.findings`. Repair each finding of the level `error` or `warning` (`format`, `link-missing`, `ref-missing`: a heading id that names no part) in the candidate file, and run the diff again.
   - For a conflict (the name is taken), write the candidate again with another H1 and a new candidate id, discard the first candidate, and verify again.
3. Do not return before step 2 passes. Say in the `summary` that the diff passed.
4. When an error stays and you cannot repair it, discard your candidate and return a failure (see The Result of [[hinit-ite]]).
5. Once the diff has no conflict and the candidate has no finding of the level error or warning, progress to the next stage.

## Stage 6: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: the map, the number of nodes, the reading that you selected, and the most important gap. Use no `'` character.
3. Do not apply and do not discard the candidate.
4. End the job with the result, and nothing else. `view_id` is the `view_id` of the candidate:

   ```bash
   flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":"<view_id>","candidate_id":"<candidate-id>","base_hash":null,"summary":"<summary>"}'
   ```

# Output

- One candidate in `Steel/Programs/<Program>/Proposals/`, with a new `view_id`, its own `id`, `state: proposed`, and `base_hash: null`
- One `steel-result/1` JSON value as the result of the job
