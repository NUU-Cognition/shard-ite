---
description: "At the end of a product task: check the parts and the views that name the changed files, compare each node with review-due with the code, and review it or change it through a candidate or a map change. An aid that never blocks a landing or a release."
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` (headless: `flint shard hstart ite`) if you haven't already.

# Skill: Check After Task

A product task changes code. A part or a view node that names that code can then say a thing that is no longer true. This skill finds the parts and the views of the software programs that name the changed files, and keeps them true: the agent compares each node that needs a review with the code, and then reviews the node or changes it through a candidate (a view node) or a map change (a part). The rules of the review are in The Review of [[init-ite]].

**The check is an aid.** It never blocks a landing, the review of a task, the close of a task, or a release. A finding that stays is a line in the result, not a stop.

# Input

- The product task: a `(Task)` with `git-repos` and `wip-commits`. Or the list of the files that the work changed, and the repository of each file.
- (Optional) The Orbtest stories that the work changed

# When to Run It

`flint ite check --paths` reads the code in the codebase path of each software program: the first line of `flint resolve codebase <name>`. With `--checkout <dir>`, it reads a worktree of the same repository in place of that checkout. Run the full skill when the commits of the task are in the checkout of the codebase path.

- The task committed in the checkout of the codebase path: run the skill after the WIP commits, before the task goes to review.
- The task committed on a worktree branch: run steps 1 to 6 before the landing with `--checkout "<worktree path>"`, and name each finding that the work caused in the result. Do not review a node before the landing: the landing can give the commits new ids, and an anchor with an old id gives `anchor-unknown`. Run steps 7 to 9 after the landing, with no `--checkout`. When the session that ends the task does not land, it writes the line `ITE: run sk-ite-check_after_task after the landing` in its result, and the session that lands runs the skill.
- A link in the worktree that leaves the worktree: `--checkout` refuses with exit 2. Run the skill after the landing.
- No part and no view names the changed files: the command prints `No part or view names <paths>. Nothing to check.` and exits 0. The skill is then done.

# Actions

1. **List the changed files.** For each repository of `git-repos`, resolve the codebase path: the first line of `flint resolve codebase <name>`. For each SHA of `wip-commits` of that repository, list its files: `git -C "<codebase path>" show --name-only --format= <sha>`. Remove the duplicates. When the task has no `wip-commits`, use the files that the work changed.
2. **Make each path absolute.** Join the codebase path of step 1 and each file. Give absolute paths: the command then matches each path only with the code-refs of its own repository. Give the path of a file in a worktree only together with `--checkout "<worktree path>"`: with no `--checkout`, it matches nothing.
3. **Run the check.**

   ```bash
   flint ite check --paths <absolute path>... --json
   flint ite check --checkout "<worktree path>" --paths <absolute path in the worktree>... --json   # before the landing
   ```

   The output is one JSON value of the schema `steel-check-paths/1`: for each program, the selected `parts` (each with `id`, `title`, and `findings`) and the selected `views` (each with `id`, `view`, `file`, and `findings`). Each finding has `code`, `level`, `detail`, and `node` when it is about one node. `flint ite view "<view id>" --json` gives the `lifetime` of each view. Exit 0: no error. Exit 1: a finding of the level error. Exit 2: a refusal; read the reason, and stop.
4. **Check the changed stories.** When the work changed a story file of Orbtest (`orbtest/stories/<area>.yaml`), run `flint ite check "<program>" --json` with no `--paths` for each software program of that product. Take each `review-due` finding whose `detail` names a changed story. `--paths` does not find them, because a story is not a code-ref.
5. **Act on each finding that the work caused.** The check gives all the findings of each selected part and view, also the findings that were there before the work. Act only on a finding of a part, or of a node of a **kept** view, that names a file or a story that the work changed: a `review-due` whose `detail` lists a changed file or a changed story (the list holds at most 20 files; with more, read the diff of step 6), or a `code-ref-missing` or `story-missing` whose `detail` names a changed path or a changed story. A draft view is low cost: name its findings in the result, and do nothing more.

   | Finding caused by the work | Action |
   |----------------------------|--------|
   | `review-due` | Compare the node with the code (step 6). Then review it (step 7) or change it (step 8). |
   | `code-ref-missing` | The work removed, moved, or renamed a file that the node names. Change the node (step 8) with the new path. |
   | `story-missing` (error) | The work removed a story or a criterion that the node names. Change the node (step 8). |
   | `anchor-unknown` | Git does not have the commit of the anchor, for example after a rewrite of the history. Compare the node with the code (step 6), then review it (step 7). |

   No action in this skill for `never-reviewed`, `no-contract`, `anchor-missing`, `anchor-none`, `proof-unavailable`, or a finding that was there before the work. A node with no anchor gives no `review-due`, so the first review of a node is the work of the person who keeps it, not of a product task. A gap of the main map changes only through a map change that a person applies. Name the count of these findings in the result.

6. **Compare the node with the code.** Read the text and the fields of the node: the part note, or the node in the view file. `flint ite review "<program>" <ref>... --show --json` gives the anchor, the reasons, and the changed files of each node, and writes nothing. Read the diff of the code under its code-refs after the anchor: `git -C "<codebase path>" diff <reviewed.commit> -- <code-ref path>`. For a code-ref of another codebase (`@<Codebase name>/<path>`), use that codebase and its commit in `reviewed.commits`. Read each changed story with `flint orbtest story show <id> --root <product root>`. Answer one question: does the text of the node still say what the code and the stories do? The claim is the text, not the names in the code. A new name of a function or a change of its inner logic often keeps the claim true.
7. **The claim is still true: review the node.** Run `flint ite review "<program>" <ref>...` with each node that you compared and found true: the part id, or `view:<view id>#<node id>`. Do not review a node that you did not compare. An anchor is a commit: review only after the WIP commits of the task. A file with changes that are not committed stays `review-due` after a review.
8. **The claim is not true: change the node.**
   - A view node: follow the workflow reshape for the kept view, with the request "Make the nodes <ids> true to the code after <task>". In an interactive session, use [[wkfl-ite-reshape]]. In a headless session, use Stages 1 to 4 of [[hwkfl-ite-reshape]] (see Headless Use).
   - A part: propose one map change with the operation `edit` (a new sentence, new prose, or new `sources`: the `code-refs` of a software part) with `flint ite map change propose "<program>" --ops - --reason "<one sentence>"`. Change the `stories` or the `criteria` of a part with `flint ite part set "<program>" <part id> --field 'stories=["<story id>"]'`.
   - Do not review a node that your change changes: the person applies the candidate or the map change, then the node gets its review.
9. **Record the result.** Add one line to the Task Log of the task: the parts and the views that the check selected, the nodes that you reviewed, the candidates and the map changes that you wrote, and each finding that stays. Example: `ITE: 1 part and 2 views checked; reviewed view:4c1e…#select-the-agent; candidate onboarding-20261002-101500 for Onboarding#check-the-tools; 1 draft with review-due (Architecture of Flint).`

# Headless Use

A headless product task follows the same actions, with these differences:

- Ask no question. When you cannot decide if a claim is still true, do not review the node. Name it in the result as `review-due, not decided`.
- For a view that is not true, write the candidate with Stages 1 to 4 of [[hwkfl-ite-reshape]]. Skip its last stage: do not return a `steel-result/1` value. The result of the turn is the result of the product task. Put the candidate id, the map change id, and the view in it.
- Never apply, revert, or discard a candidate or a map change. Never run `flint ite view set` or `flint ite view remove`. `flint ite review` is allowed for a node that you compared and found true.
- Set the phase `ite-check` while the skill runs: `flint orbh session set phase ite-check`.

# Output

- The review anchors of each node that the agent compared and found true
- A candidate for each kept view that is no longer true, and a map change for each part that is no longer true, not applied
- One line in the Task Log of the task with the parts, the views, the reviews, the proposals, and the findings that stay
