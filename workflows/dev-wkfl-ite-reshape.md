---
description: "Change a view of a program in the words of a person, through a candidate with the base_hash of the view, and apply it when the person agrees; in a headless session, verify the candidate, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Reshape

Change one view as a person asks: a new map, a new slice, a split, a merge, new nodes, other titles, or the parts of its steps. The result is a candidate that replaces the view when the person applies it. The rules of the view file and the quality rules are in [[knw-ite-programs]].

> [!headless]
> A headless agent session follows this workflow with no person in the session. Do each stage, and follow the `> [!headless]` callout in it. The rules of a headless session are in [[init-ite#Headless]].
> - The person reviews the candidate in the Workbench and applies it.
> - The job ends with one `steel-result/1` JSON value, as the callout of The End of a Job says.

# Input

- The view: its UUID or its name
- The change that the person asks for, in words (for example "Split the run sheet into lanes by role.")
- (Optional) A scope: the node ids that the change is for

> [!headless]
> - The program and the view (the document of the job: its id, its file, and its `base_hash` now)
> - The instructions of the person: the change, in words
> - (Optional) The selected nodes: the scope of the change

# Actions

## Stage 1: Read the View

1. Set the focus: `flint ite focus <node ids of the scope, or of the top nodes of the view>` ([[sk-ite-focus]]).
2. Find the view file: `flint ite view <view> --json` gives `file`, `file_hash`, `program`, and each node. For a view of a program with a codebase, follow The Anchor of a Step of [[knw-ite-software]]: give each step its `part` and its `actor`. A node block has no `reviewed` key: a review is a row of the data item `reviews`, and a change of the text or of the references of a node makes its review due.
3. Compute the `base_hash` before you read the file: `shasum -a 256 "<view file>"` (the first word). It must be equal to `file_hash`.
4. Read the view file in full. Keep each heading id: a node that stays keeps its id.
5. Say the change again in one sentence. When it can have two meanings, ask the person one question. Ask no other question in this stage.
6. Once you know the change and the base hash, progress to the next stage.

> [!headless]
> - Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]). Then run `flint orbh session set phase reading`.
> - When the `base_hash` that you compute is not the `base_hash` of the prompt, the view changed after the start of the job: use the new hash, and say so in the `summary`.
> - Read the view with `flint ite view <view id> --json` and the view file in full.
> - Ask no question. When the change can have two meanings, select the meaning that best helps the person, and keep it for the `summary`.

## Stage 2: Plan the Change

1. Write a node map: for each node of the view, `keep`, `change` (title, prose, kind, links), `move` (a new parent or place), or `remove`. For each new node: an id (the part id of its part, from `flint ite map "<program>" --json`, never invented; a slug for a node with no part), a title, a kind, and its links.
2. A node keeps its id when it moves and when its title changes. The heading id of a node of a part is the part id: to give a node with a slug its part, change its heading id to the part id and change each link to it. Never give the id of a removed node to a node with another claim.
3. Keep `lifetime` as it is (`draft` or `accepted`): only a person accepts a view. Write no key `curation`: a view has no `curation`. Keep `kept-by` as it is when the view has it.
4. Show the node map to the person when the change removes nodes or changes the shape. Ask: write it, or change the plan.
5. Once the plan makes the change, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase shaping`.
> - Do not show the node map to a person, and do not wait for a person (step 4).

## Stage 3: Write the Candidate

1. Make the candidate id (`<view-slug>-<UTC yyyymmdd-hhmmss>`) and one new UUID for `id`. `view_id` is the `id` of the view. `base_hash` is the hash of Stage 1.
2. Write `Steel/Programs/<Program>/Proposals/<candidate-id>.md` with `state: proposed`: the complete view file after the change, in the form of [[tmp-ite-view-v0.1]] (format `steel-view/1`).
3. Check the candidate against the quality rules of [[knw-ite-programs]]. The last node is still the note of what the view leaves out; change its prose when the change moves the edge of the view.
4. Once the candidate passes each rule, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase writing`. Set the focus on the nodes that change.

## Stage 4: Verify and Apply

1. Run `flint ite diff --candidate <candidate-id> --json`. `conflict` must be `false`, and `added`, `removed`, `moved`, and `changed` must be the nodes of your node map. Then run `flint ite check --candidate <candidate-id>`: it shows only the findings of the candidate and exits 1 for an error finding.
2. Read `candidate.findings` of the same JSON. Repair each finding of the level `error` or `warning`, and run the diff again.
3. Show the person the difference, and ask: apply, change, or discard.
   - **Apply**: `flint ite apply --candidate <candidate-id>`. A conflict means that the view changed after Stage 1: read the view again and write a new candidate from the current view.
   - **Change**: write a new candidate with the same `view_id` and `base_hash`, and discard the old one.
   - **Discard**: `flint ite discard --candidate <candidate-id>`.
4. Once the person selected apply or discard, the workflow is done.

> [!headless]
> A headless session does not do step 3: it shows nothing to a person, and it never applies or discards the candidate that it returns.
> - Run `flint orbh session set phase checking`.
> - `flint ite diff` reads the candidate as the view will be after the apply. The text form of the command says "The candidate can be applied."
> - Repair each finding of the level `error` or `warning` in the candidate file (`format`, `link-missing`, `ref-missing`: a heading id that names no part), and run the diff again.
> - For a conflict, read the view again and write a new candidate from the current view.
> - Do not return before steps 1 and 2 pass. Say in the `summary` that the diff passed.
> - When an error stays and you cannot repair it, discard your candidate and return a failure (see The Result of a Job of [[init-ite#Headless]]).
> - Once the diff has no conflict and the candidate has no finding of the level error or warning, end the job as the callout of The End of a Job says.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the candidate id, whether the person applied it, and the counts of the added, removed, moved, and changed nodes. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

> [!headless]
> A headless session does not end the job in the chat, and does not wait for the person. It returns the result:
> 1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[init-ite#Headless]]. When an item fails, go back to its stage: do not return with an item open.
> 2. Write the `summary`: what changed (the counts of the added, the removed, the moved, and the changed nodes), the reading that you selected, and the most important gap. Use no `'` character.
> 3. Do not apply and do not discard the candidate.
> 4. End the job with the result, and nothing else:
>
>    ```bash
>    flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":"<view id>","candidate_id":"<candidate-id>","base_hash":"<base_hash>","summary":"<summary>"}'
>    ```

# Output

- The view after the apply (the old form in `Steel/Programs/<Program>/History/`, the candidate with `state: applied`), or one candidate that waits for the person

> [!headless]
> - One candidate in `Steel/Programs/<Program>/Proposals/`, with the `view_id` and the `base_hash` of the view, and `state: proposed`
> - One `steel-result/1` JSON value as the result of the job
