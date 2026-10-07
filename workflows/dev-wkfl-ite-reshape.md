---
description: "Change a view of a program in the words of a person, through a candidate with the base_hash of the view, and apply it when the person agrees"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Reshape

Change one view as a person asks: a new map, a new slice, a split, a merge, new nodes, other titles, or the parts of its steps. The result is a candidate that replaces the view when the person applies it. The rules of the view file and the quality rules are in [[init-ite]].

# Input

- The view: its UUID or its name
- The change that the person asks for, in words (for example "Split the run sheet into lanes by role.")
- (Optional) A scope: the node ids that the change is for

# Actions

## Stage 1: Read the View

1. Set the focus: `flint ite focus <node ids of the scope, or of the top nodes of the view>` ([[sk-ite-focus]]).
2. Find the view file: `flint ite view <view> --json` gives `file`, `file_hash`, `program`, and each node. For an OrbCode view, use the workflow `reshape` of the OrbCode shard.
3. Compute the `base_hash` before you read the file: `shasum -a 256 "<view file>"` (the first word). It must be equal to `file_hash`.
4. Read the view file in full. Keep each heading id: a node that stays keeps its id.
5. Say the change again in one sentence. When it can have two meanings, ask the person one question. Ask no other question in this stage.
6. Once you know the change and the base hash, progress to the next stage.

## Stage 2: Plan the Change

1. Write a node map: for each node of the view, `keep`, `change` (title, prose, kind, links), `move` (a new parent or place), or `remove`. For each new node: an id (the part id of its part, from `flint ite map "<program>" --json`, never invented; a slug for a node with no part), a title, a kind, and its links.
2. A node keeps its id when it moves and when its title changes. The heading id of a node of a part is the part id: to give a node with a slug its part, change its heading id to the part id and change each link to it. Never give the id of a removed node to a node with another claim.
3. Keep `lifetime` as it is. Set `curation: "proposed"`.
4. Show the node map to the person when the change removes nodes or changes the shape. Ask: write it, or change the plan.
5. Once the plan makes the change, progress to the next stage.

## Stage 3: Write the Candidate

1. Make the candidate id (`<view-slug>-<UTC yyyymmdd-hhmmss>`) and one new UUID for `id`. `view_id` is the `id` of the view. `base_hash` is the hash of Stage 1.
2. Write `Steel/Programs/<Program>/Proposals/<candidate-id>.md` with `state: proposed`: the complete view file after the change, in the form of [[tmp-ite-view-v0.1]] (format `ite-view/2`).
3. Check the candidate against the quality rules of [[init-ite]]. The last node is still the note of what the view leaves out; change its prose when the change moves the edge of the view.
4. Once the candidate passes each rule, progress to the next stage.

## Stage 4: Verify and Apply

1. Run `flint ite diff --candidate <candidate-id> --json`. `conflict` must be `false`, and `added`, `removed`, `moved`, and `changed` must be the nodes of your node map. Then run `flint ite check --candidate <candidate-id>`: it shows only the findings of the candidate and exits 1 for an error finding.
2. Read `candidate.findings` of the same JSON. Repair each finding of the level `error` or `warning`, and run the diff again.
3. Show the person the difference, and ask: apply, change, or discard.
   - **Apply**: `flint ite apply --candidate <candidate-id>`. A conflict means that the view changed after Stage 1: read the view again and write a new candidate from the current view.
   - **Change**: write a new candidate with the same `view_id` and `base_hash`, and discard the old one.
   - **Discard**: `flint ite discard --candidate <candidate-id>`.
4. Once the person selected apply or discard, the workflow is done.

# Output

- The view after the apply (the old form in `Steel/Programs/<Program>/History/`, the candidate with `state: applied`), or one candidate that waits for the person
