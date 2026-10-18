---
description: "Review nodes of a program with a codebase against their code: compare the text of each node with the diff of its code and its stories after its last review, review the true nodes with the person, and change the others through a candidate or a map change; in a headless session, propose a candidate or a map change for the others, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Review

Compare the nodes of a program with a codebase with their code, with the person. A node that is still true gets its review: `flint ite review` writes its row in the data item `reviews`. A node that is not true gets a change: a candidate for a view node, or a map change for a part. The rules of the review are in The Review of [[knw-ite-software]].

The focus of this workflow: the nodes of the job.

> [!headless]
> A headless agent session follows this workflow with no person in the session. Do each stage, and follow the `> [!headless]` callout in it. The rules of a headless session are in [[init-ite#Headless]].
> - The nodes are the nodes of a job. A node that is not true gets a change that the person applies.
> - The job ends with one `steel-result/1` JSON value, as the callout of The End of a Job says.

# Input

- The program (its name or id): a program with `codebase` on its root note and the data item `reviews` (`flint ite review` refuses a program with no `reviews`, and its message gives the command that adds it)
- The nodes: part ids, view nodes (`view:<view id>#<node id>`), or a whole view (`view:<view id>`: each node that has a block)
- (Optional) The instructions of the person: the change of the code that the review must follow, for example a task

> [!headless]
> - The program (its name and its id), with `codebase` and the data item `reviews`
> - The document of the job: `map` (the nodes are parts), or a view (the nodes are nodes of that view)
> - The nodes of the job: part ids, or the heading ids of view nodes
> - (Optional) The text of the person: the change of the code that the review must follow

# Actions

## Stage 1: Read the Nodes

1. Set the focus: `flint ite focus <node ids>` ([[sk-ite-focus]]).
2. List the references of the nodes. A part is its id. For a view, read it first: `flint ite view "<view id>" --json`, and take `view:<view id>#<node id>` for each node with a slug id that has `code-refs` or `stories`, and the part id for each node of a part. Then read the review of each node: `flint ite review "<program>" <ref>... --show --json` with these references. `--show` reads one part or one view node for each reference: it refuses a whole view (`view:<view id>`), which expands to the nodes of the view only for the write. It writes nothing. For each node it gives the state (`reviewed`, `review-due`, `anchor-unknown`, `never-reviewed`, or `null` when the node has no row and no finding), the row (`commit`, `at`, `by`, `commits`), the reasons, the changed files (at most 20, relative to the codebase; `@<Codebase>/<path>` for another codebase), the changed stories, and `codebase` (the absolute path of the codebase).
3. Keep only the nodes that a review can cover: a part or a view node with a slug id that has `code-refs` or `stories`. Tell the person each other node and why (a node of a part has the review of its part; a node with no code and no stories has nothing to compare).
4. The codebase path is the field `codebase` of the output of step 2. For a code-ref of another codebase, resolve its path: the first line of `flint resolve codebase <name>`. The product root of Orbtest is the codebase path joined with `product-root` of the root note.
5. Once you know the nodes and their states, progress to the next stage.

> [!headless]
> - Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]). Then run `flint orbh session set phase reading`.
> - A node of a part in a view: review its part. Do not tell a person: name each other node in the `summary`.

## Stage 2: Compare Each Node with the Code

1. Read the text and the fields of the node: the part note, or the node in the view file.
2. A node with a row: read the diff of the code under each code-ref after the review: `git -C "<codebase path>" diff <commit of the row> -- <code-ref path>`, and the new files under it (`git -C "<codebase path>" status --short -- <code-ref path>`). For a code-ref of another codebase (`@<Codebase name>/<path>`), use that codebase and its commit in `commits` of the row. A node with no row, or with `anchor-unknown`: read the code under its code-refs now.
3. Read each story of the node: `flint orbtest story show <id> --root <product root>`.
4. Answer one question for each node: does the text of the node still say what the code and the stories do? The claim is the text, not the names in the code. A new name of a function or a change of its inner logic often keeps the claim true. When the text changed after the review ("The text changed after the review."), compare the new text with the code.
5. Write a table for the person: each node, its state, the files that changed, and your answer: **true**, **not true** (with the sentence that is false and the fact of the code), or **not decided** (with what you could not read).
6. **Stage gate.** Show the table to the person. Ask: review the true nodes, and change the nodes that are not true?
7. Once the person agrees with the answers, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase comparing`.
> - Give each node one answer: **true** (the text still says what the code and the stories do), **not true** (keep the sentence that is false and the fact of the code), or **not decided** (you could not read the code or the story, or the answer is not clear).
> - Do not write the table for a person, and do not do the stage gate (steps 5 to 7). Once each node has an answer, progress to the next stage.

## Stage 3: Review the True Nodes

1. Run `flint ite review "<program>" <ref>...` with each node that the person agreed is true: the part id, or `view:<view id>#<node id>`. Give `--commit <sha>` only when the person names a commit; the default is the HEAD of the codebase. Give all true nodes in ONE call. An agent writes rows only inside a run of the keeper of `reviews` (a job of the action `review`), and the first write that succeeds uses up that job or ends that run: each later write is refused. A refusal does not use it up. When no node is true: in a run of the process `review`, give the one answer of the run with `flint ite data report "<program>" reviews --unchanged` (it changes no row); in a review job of the Workbench, write nothing. When the command refuses you ("Run the process review of the program, or ask a person."), give the person the command to run in their own terminal.
2. Never review a node that you did not compare, and never review a node that the next stage changes. A review is at a commit: when a reason says that files have changes that are not committed, do not commit the work of another person. Do not review that node; name it, and the person commits the change and then reviews it.
3. A refusal: `invalid-input` (a node with no code and no stories, or a block that does not parse), `changed` (a file changed during the write), or `unavailable` (the codebase is not a Git repository). Read the reason, repair or read the file again, and run the command again.
4. Read the review again (Stage 1, step 2): each reviewed node is `reviewed`.
5. Once the true nodes are reviewed, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase reviewing`.
> - Run `flint ite review "<program>" <ref> <ref> ...` ONE time, with each node that is true (no person agrees first). The first write that succeeds uses up the job (a review job of the Workbench) or ends the run (a run of the process `review`): each later write of that job or run is refused. A refusal does not use it up. So decide each node first, and then write all true nodes in one call. The job is valid only in the Orbh run that got it, while that run runs.
> - Never review a node that is not true, that is not decided, or that you did not compare.
> - A refusal writes nothing. Read the reason, read the file again, and run the command again once with the true nodes that it accepts. Name a refusal that stays in the `summary`.

## Stage 4: Change the Nodes That Are Not True

1. Set the focus on the nodes that are not true.
2. A view node: follow the stages of [[wkfl-ite-reshape]] for its view, with the change "Make the nodes <ids> true to the code". A node block has no `reviewed` key: after the apply, the review of each changed node is due.
3. A part: write one map change with the operation `edit` (a new sentence, new prose, or new `sources`: the `code-refs` of a part), and propose it with `flint ite map change propose "<program>" --ops <file> --reason "<one sentence>"`. Put a change of the `stories` or the `criteria` of a part in the `fields` of the same `edit` (`"fields":{"stories":["<story id>"]}`). An agent's `flint ite part set "<program>" <part id> --field 'stories=["<story id>"]'` proposes one more map change: a person applies it.
4. **Stage gate.** Show the person the diff of the candidate (`flint ite diff --candidate <id>`) or the preview of the map change (`flint ite map change show "<program>" <change id>`). The person applies it in the Workbench or in their own terminal. You cannot apply it.
5. After the person applies it, the changed nodes have no review: tell the person to review them (this workflow again).
6. Once each node is reviewed, changed, or named as not decided, the workflow is done.

> [!headless]
> A headless session proposes the change, and does not do the stage gate (steps 4 and 5).
> - Run `flint orbh session set phase writing`. When each node is true or not decided, skip this stage.
> - A view node: write one candidate for the view with Stages 1 to 4 of [[wkfl-ite-reshape]], with the change "Make the nodes <ids> true to the code". After its Stage 4, come back to this callout: do not do The End of a Job of the reshape workflow, and do not return its result. This job returns once, as the callout of The End of a Job of this workflow says.
> - A part: write one map change with the operation `edit` for each part that is not true, and propose it: `flint ite map change propose "<program>" --ops - --reason "<one sentence>"`. Read the preview: `flint ite map change show "<program>" <change id> --json`. Do not put a change of the `stories` or the `criteria` in the change: name it in the `summary`, and the person makes it.
> - Write at most one proposal: one candidate for the view of the job, or one map change for the parts. Never apply, revert, or discard it.
> - Once the proposal passes its checks (Before You Return of [[init-ite#Headless]]), end the job as the callout of The End of a Job says.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the nodes that you reviewed, the candidate or the map change and whether the person applied it, and each node that is not decided. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

> [!headless]
> A headless session does not end the job in the chat, and does not wait for the person. It returns the result:
> 1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[init-ite#Headless]]. When an item fails, go back to its stage.
> 2. Write the `summary`: the count of the reviewed nodes, the nodes that are not true and the proposal, and each node that is not decided ("review-due, not decided"). Use no `'` character.
> 3. End the job with the result, and nothing else. `candidate_id` is the candidate id, the map change id (`mc-...`), or `null` when you proposed nothing. `view_id` is the id of the view of the job, or `null` for the map. `base_hash` is the `base_hash` of the candidate, or `null`.
>
>    ```bash
>    flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":<"view id" or null>,"candidate_id":<"id" or null>,"base_hash":<"hash" or null>,"summary":"<summary>"}'
>    ```

# Output

- The row in `reviews` of each node that is still true
- A candidate or a map change for the nodes that are not true: applied by the person, or discarded

> [!headless]
> - At most one proposal for the nodes that are not true: a candidate in `Steel/Programs/<Program>/Proposals/`, or a map change, not applied
> - One `steel-result/1` JSON value as the result of the job
