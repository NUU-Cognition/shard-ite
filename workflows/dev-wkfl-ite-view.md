---
description: "Answer one question of a person about a program with a new view: read the map, select a shape, write a candidate, verify it, and apply it when the person agrees"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: View

Answer one question of a person with one new view of a program. The result is a candidate that the person reads, and a view when the person agrees. The rules of the view file and the quality rules are in [[init-ite]]. The form is [[tmp-ite-view-v0.1]].

# Input

- The program: its name or its id
- The question of the person (for example "What must be true one week before the night?")
- (Optional) A map (a builtin shape or a map of `Steel/Maps/`) or a name that the person asks for
- (Optional) The nodes of a focus: the ids of the parts that the view is about

# Actions

## Stage 1: Understand the Question

1. Set the focus: `flint ite focus <ids of the nodes of the focus, or of the top parts>` ([[sk-ite-focus]]).
2. Say the question again in one sentence, in your words. When the question can have two meanings, ask the person one question to select the meaning. Ask no other question in this stage.
3. Read the program: `flint ite map "<program>" --json`. Keep the parts with their ids, names, types, parents, and links. For an OrbCode program (template `software` in `Mesh/OrbCode/`), use the workflow `view` of the OrbCode shard in place of this workflow.
4. Read the views that exist: `flint ite list` and `flint ite view <id>` for each view whose question is near. When a view already answers the question, show it to the person and propose [[wkfl-ite-reshape]] in place of a new view.
5. Once you know the question and the parts that can answer it, progress to the next stage.

## Stage 2: Read the Parts

1. Read the note of each part that can be a part of the answer. The note owns the description; the view says only what answers the question.
2. Note the processes of each part (`flint ite process list "<program>" --json`): a node of a part shows the grounding of its part. Note each claim of the answer that no part holds: its prose says the gap. A view node has no contact.
3. Note the words of the system that the answer needs, and one short explanation of each.
4. Once you can answer the question in one to three sentences, progress to the next stage.

## Stage 3: Select the Map and the Nodes

1. Select the map. A builtin shape: `flow` for "how does X happen?", `streams` for lanes (by role, by team), `layers` for "how is it built?", `tree` for "what are the parts of X?", `table` to compare items on the same properties, `timeline` for events in time, `board` for items by state, `free` when no other fits. Or a map of `Steel/Maps/` when its `map.md` says that it answers the question better (for example `owners` for "who owns what?"). Use the map that the person asked for. A view can also select its parts with `slice: { below: <part id>, types: [...] }` in place of one heading for each part.
2. Write an outline: the H1 name, the answer, the groups, and the nodes. For each node: a title, an id (the part id of its part, from the map of Stage 1, never invented; a slug for a node with no part), a kind, its one idea, and its links (`next`, `uses`) to the ids of other nodes. End with one node of `kind: note` that names what the view leaves out.
3. Select, do not dump: five to fifteen nodes. When the answer needs more than 25 nodes, propose two views to the person.
4. Select the name. Search the views: `find Steel/Programs -iname "(View) <Name>.md"`. When the name exists, add ` of <Program>`.
5. Once the outline answers the question, progress to the next stage.

## Stage 4: Write the Candidate

1. Make the candidate id: `<view-slug>-<UTC yyyymmdd-hhmmss>` (`date -u +%Y%m%d-%H%M%S`).
2. Make two new UUIDs (`uuidgen | tr A-Z a-z`): one for `view_id`, one for `id`.
3. Write `Steel/Programs/<Program>/Proposals/<candidate-id>.md` with [[tmp-ite-view-v0.1]] (format `ite-view/2`): `state: proposed`, `base_hash: null`, `lifetime: "draft"`, `curation: "proposed"`, `derived-from: ""`.
4. Check the candidate against each quality rule of [[init-ite]]:
   - [ ] The answer after the H1 answers the question.
   - [ ] Each node has one idea, a short title, and prose before its block.
   - [ ] Each heading id that is a UUID is the id of a part of the map. No node block has `ref`, `part`, or `contact`.
   - [ ] Each claim that no part holds is a gap that its prose says.
   - [ ] The last node is a `kind: note` that says what the view leaves out.
   - [ ] The view holds no grounding, no observation, no finding, and no position.
5. Once the candidate passes each rule, progress to the next stage.

## Stage 5: Verify the Candidate

1. Run `flint ite diff --candidate <candidate-id> --json`. It reads the candidate as the view will be after the apply. Then run `flint ite check --candidate <candidate-id>`: it shows only the findings of the candidate and exits 1 for an error finding. `conflict` must be `false` and `new_view` must be `true`: the text form says "new view. The candidate can be applied." A conflict for a new view means that the name is taken: change the H1 and the candidate id.
2. Read `candidate.findings` of the same JSON. Repair each finding of the level `error` or `warning` (`format`, `link-missing`, `ref-missing`: a heading id that names no part), and run the diff again.
3. When `flint ite` is not a command of the CLI, check by reading: each heading has a unique id, each link names an id of the view, each block parses as YAML, each heading id that is a UUID is a part id of the map. Tell the person.
4. Once the diff has no conflict and the candidate has no finding of the level error or warning, progress to the next stage.

## Stage 6: Show the Candidate and Apply It

1. Show the person: the path of the candidate, the name, the map, the answer, the outline, and each gap.
2. Ask the person: apply, change, or discard.
   - **Apply**: `flint ite apply --candidate <candidate-id>`. Then run `flint ite view <view_id>` and show the grounding of each node. Tell the person that the view is a `draft` and `proposed`.
   - **Change**: write a new candidate with the same `view_id` and a new `id` that makes the change, verify it (Stage 5), and discard the old one with `flint ite discard --candidate <old-id>`. Then ask again.
   - **Discard**: `flint ite discard --candidate <candidate-id>`.
3. Once the person selected apply or discard, the workflow is done.

# Output

- One view in `Steel/Programs/<Program>/Views/` (after the apply), or one candidate in `Proposals/` with `state: proposed` that waits for the person
- Each gap named to the person
