---
description: "Review nodes of a software program against their code: compare the text of each node with the diff of its code and its stories after the anchor, review the true nodes with the person, and change the others through a candidate or a map change"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Review

Compare the nodes of a software program with their code, with the person. A node that is still true gets its review (`flint ite review`). A node that is not true gets a change: a candidate for a view node, or a map change for a part. The rules of the review are in The Review of [[init-ite]].

The focus of this workflow: the nodes of the job.

# Input

- The program (its name or id): a program of the template `software`
- The nodes: part ids, view nodes (`view:<view id>#<node id>`), or a whole view (`view:<view id>`: each node that has a block)
- (Optional) The instructions of the person: the change of the code that the review must follow, for example a task

# Actions

## Stage 1: Read the Nodes

1. Set the focus: `flint ite focus <node ids>` ([[sk-ite-focus]]).
2. List the references of the nodes. A part is its id. For a view, read it first: `flint ite view "<view id>" --json`, and take `view:<view id>#<node id>` for each node with a slug id that has `code-refs` or `stories`, and the part id for each node of a part. Then read the review of each node: `flint ite review "<program>" <ref>... --show --json` with these references. `--show` reads one part or one view node for each reference: it refuses a whole view (`view:<view id>`), which expands to the nodes of the view only for the write. It writes nothing. For each node it gives the state (`reviewed`, `review-due`, `anchor-unknown`, `never-reviewed`, or `null` when the node has no anchor and no finding), the anchor (`commit`, `at`, `by`, `commits`), the reasons, the changed files (at most 20, relative to the codebase; `@<Codebase>/<path>` for another codebase), the changed stories, and `codebase` (the absolute path of the codebase).
3. Keep only the nodes that can be reviewed: a part or a view node with a slug id that has `code-refs` or `stories`. Tell the person each other node and why (a node of a part has the review of its part; a node with no code and no stories has nothing to compare).
4. The codebase path is the field `codebase` of the output of step 2. For a code-ref of another codebase, resolve its path: the first line of `flint resolve codebase <name>`. The product root of Orbtest is the codebase path joined with `product-root` of the root note.
5. Once you know the nodes and their states, progress to the next stage.

## Stage 2: Compare Each Node with the Code

1. Read the text and the fields of the node: the part note, or the node in the view file.
2. A node with an anchor: read the diff of the code under each code-ref after the anchor: `git -C "<codebase path>" diff <reviewed.commit> -- <code-ref path>`, and the new files under it (`git -C "<codebase path>" status --short -- <code-ref path>`). For a code-ref of another codebase (`@<Codebase name>/<path>`), use that codebase and its commit in `reviewed.commits`. A node with no anchor, or with `anchor-unknown`: read the code under its code-refs now.
3. Read each story of the node: `flint orbtest story show <id> --root <product root>`.
4. Answer one question for each node: does the text of the node still say what the code and the stories do? The claim is the text, not the names in the code. A new name of a function or a change of its inner logic often keeps the claim true. When the text changed after the review ("The text changed after the review."), compare the new text with the code.
5. Write a table for the person: each node, its state, the files that changed, and your answer: **true**, **not true** (with the sentence that is false and the fact of the code), or **not decided** (with what you could not read).
6. **Stage gate.** Show the table to the person. Ask: review the true nodes, and change the nodes that are not true?
7. Once the person agrees with the answers, progress to the next stage.

## Stage 3: Review the True Nodes

1. Run `flint ite review "<program>" <ref>...` with each node that the person agreed is true: the part id, or `view:<view id>#<node id>`. Give `--commit <sha>` only when the person names a commit; the default is the HEAD of the codebase.
2. Never review a node that you did not compare, and never review a node that the next stage changes. An anchor is a commit: when a reason says that files have changes that are not committed, do not commit the work of another person. Do not review that node; name it, and the person commits the change and then reviews it.
3. A refusal: `invalid-input` (a node with no code and no stories, or a block that does not parse), `changed` (a file changed during the write), or `unavailable` (the codebase is not a Git repository). Read the reason, repair or read the file again, and run the command again.
4. Read the review again (Stage 1, step 2): each reviewed node is `reviewed`.
5. Once the true nodes are reviewed, progress to the next stage.

## Stage 4: Change the Nodes That Are Not True

1. Set the focus on the nodes that are not true.
2. A view node: follow the stages of [[wkfl-ite-reshape]] for its view, with the change "Make the nodes <ids> true to the code". In the candidate, keep the `reviewed` mapping of each node that does not change, and remove it from each node that changes.
3. A part: write one map change with the operation `edit` (a new sentence, new prose, or new `sources`: the `code-refs` of a software part), and propose it with `flint ite map change propose "<program>" --ops <file> --reason "<one sentence>"`. Change the `stories` or the `criteria` of a part with `flint ite part set "<program>" <part id> --field 'stories=["<story id>"]'`.
4. **Stage gate.** Show the person the diff of the candidate (`flint ite diff --candidate <id>`) or the preview of the map change (`flint ite map change show "<program>" <change id>`). The person applies it in the Workbench or in their own terminal. You cannot apply it.
5. After the person applies it, the changed nodes have no review: tell the person to review them (Mark as reviewed in the Workbench, or this workflow again).
6. Once each node is reviewed, changed, or named as not decided, the workflow is done.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the nodes that you reviewed, the candidate or the map change and whether the person applied it, and each node that is not decided. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

# Output

- The anchor `reviewed` of each node that is still true
- A candidate or a map change for the nodes that are not true: applied by the person, or discarded
