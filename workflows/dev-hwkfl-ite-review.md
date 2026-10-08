---
description: "Headless: review nodes of a software program against their code: compare each node with the diff of its code and its stories after the anchor, review the true nodes, propose a candidate or a map change for the others, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Review (Headless)

Compare the nodes of a job with their code, with no person in the session. A node that is still true gets its review (`flint ite review`). A node that is not true gets a change that the person applies: a candidate for a view node, or a map change for a part. The rules of the review are in The Review of [[init-ite]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program (its name and its id): a program of the template `software`
- The document of the job: `map` (the nodes are parts), or a view (the nodes are nodes of that view)
- The nodes of the job: part ids, or the heading ids of view nodes
- (Optional) The text of the person: the change of the code that the review must follow

# Actions

## Stage 1: Read the Nodes

1. Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the review of each node: `flint ite review "<program>" <ref>... --show --json`. A ref is a part id, or `view:<view id>#<node id>` for a node of a view (`view:<view id>` gives each node of the view that has a block). It writes nothing. For each node it gives the state (`reviewed`, `review-due`, `anchor-unknown`, `never-reviewed`), the anchor (`commit`, `at`, `by`, `commits`), the reasons, the changed files (at most 20, relative to the codebase; `@<Codebase>/<path>` for another codebase), the changed stories, and `codebase` (the absolute path of the codebase).
4. Keep only the nodes that can be reviewed: a part, or a view node with a slug id, that has `code-refs` or `stories`. A node of a part in a view: review its part. Name each other node in the `summary`.
5. The codebase path is the field `codebase` of the output of step 3. For a code-ref of another codebase, resolve its path: the first line of `flint resolve codebase <name>`. The product root of Orbtest is the codebase path joined with `product-root` of the root note.
6. Once you know the nodes and their states, progress to the next stage.

## Stage 2: Compare Each Node with the Code

1. Run `flint orbh session set phase comparing`.
2. Read the text and the fields of the node: the part note, or the node in the view file.
3. A node with an anchor: read the diff of the code under each code-ref after the anchor: `git -C "<codebase path>" diff <reviewed.commit> -- <code-ref path>`, and the new files under it (`git -C "<codebase path>" status --short -- <code-ref path>`). For a code-ref of another codebase (`@<Codebase name>/<path>`), use that codebase and its commit in `reviewed.commits`. A node with no anchor, or with `anchor-unknown`: read the code under its code-refs now.
4. Read each story of the node: `flint orbtest story show <id> --root <product root>`.
5. Give each node one answer: **true** (the text still says what the code and the stories do), **not true** (keep the sentence that is false and the fact of the code), or **not decided** (you could not read the code or the story, or the answer is not clear). The claim is the text, not the names in the code. A new name of a function or a change of its inner logic often keeps the claim true.
6. Once each node has an answer, progress to the next stage.

## Stage 3: Review the True Nodes

1. Run `flint orbh session set phase reviewing`.
2. Run `flint ite review "<program>" <ref>...` with each node that is true: the part id, or `view:<view id>#<node id>`. Never review a node that is not true, that is not decided, or that you did not compare.
3. A refusal: `invalid-input` (a node with no code and no stories, or a block that does not parse), `changed` (a file changed during the write), or `unavailable` (the codebase is not a Git repository). Read the reason, read the file again, and run the command again once. Name a refusal that stays in the `summary`.
4. Read the review again (Stage 1, step 3): each reviewed node is `reviewed`.
5. Once the true nodes are reviewed, progress to the next stage.

## Stage 4: Propose a Change for the Nodes That Are Not True

1. Run `flint orbh session set phase writing`. Set the focus on the nodes that are not true. When each node is true or not decided, skip this stage.
2. A view node: write one candidate for the view with Stages 1 to 4 of [[hwkfl-ite-reshape]], with the change "Make the nodes <ids> true to the code". In the candidate, keep the `reviewed` mapping of each node that does not change, and remove it from each node that changes.
3. A part: write one map change with the operation `edit` for each part that is not true (a new sentence, new prose, or new `sources`: the `code-refs` of a software part), and propose it: `flint ite map change propose "<program>" --ops - --reason "<one sentence>"`. Read the preview: `flint ite map change show "<program>" <change id> --json`. Name a change of the `stories` or the `criteria` of a part in the `summary`: the person makes it.
4. Write at most one proposal: one candidate for the view of the job, or one map change for the parts. Never apply, revert, or discard it.
5. Once the proposal passes its checks (Before You Return of [[hinit-ite]]), progress to the next stage.

## Stage 5: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage.
2. Write the `summary`: the count of the reviewed nodes, the nodes that are not true and the proposal, and each node that is not decided ("review-due, not decided"). Use no `'` character.
3. End the job with the result, and nothing else. `candidate_id` is the candidate id, the map change id (`mc-...`), or `null` when you proposed nothing. `view_id` is the id of the view of the job, or `null` for the map. `base_hash` is the `base_hash` of the candidate, or `null`.

   ```bash
   flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":<"view id" or null>,"candidate_id":<"id" or null>,"base_hash":<"hash" or null>,"summary":"<summary>"}'
   ```

# Output

- The anchor `reviewed` of each node that is still true
- At most one proposal for the nodes that are not true: a candidate in `Steel/Programs/<Program>/Proposals/`, or a map change, not applied
- One `steel-result/1` JSON value as the result of the job
