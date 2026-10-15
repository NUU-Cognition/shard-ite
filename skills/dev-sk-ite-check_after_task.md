---
description: "At the end of a product task: emit the event task.finished with the changed files, so that the agent of each program keeps its map true; for a program with no standing process that takes the event, check the parts and the views that name the changed files, and review them or change them through a candidate or a map change. An aid that never blocks a landing or a release."
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` (headless: `flint shard hstart ite`) if you haven't already.

# Skill: Check After Task

A product task changes code. A part or a view node that names that code can then say a thing that is no longer true. This skill tells the ITE that the task finished: it emits the event `task.finished` with the changed files. The ITE routes the event to each program that the files touch, and the keeper of each program (its standing process `keep-map-true`, `recipe: keep-map-true`) gives the work to the agent of that program. That agent proposes the change of the map, and the realize of each future note that the work made true. Thus the coding agent does no map work, and the map has one writer: its keeper. The event is in [[knw-ite-loop]].

**The fallback.** Steps 3 to 9 are the old steps of this skill. They run only for a program with no standing process that took the event. A standing process is a keeper with `agent: program` (usually `recipe: keep-map-true`) and an event trigger. It takes the event when its route is `started` or `queued`. It does not take the event when it is not enabled on this machine, or when its route is `refused`. For such a program, the coding agent does the map work. It finds the parts and the views that name the changed files. It compares each node that needs a review with the code. Then it reviews the node, or it changes the node through a candidate (a view node) or a map change (a part). The rules of the review are in The Review of [[knw-ite-software]].

**The skill is an aid.** It never blocks a landing, the review of a task, the close of a task, or a release. A finding that stays is a line in the result, not a stop.

# Input

- The product task: a `(Task)` with `git-repos` and `wip-commits`. Or the list of the files that the work changed, and the repository of each file.
- (Optional) The Orbtest stories that the work changed

# When to Run It

`flint ite check --paths` reads the code in the codebase path of each program with a codebase: the first line of `flint resolve codebase <name>`. With `--checkout <dir>`, it reads a worktree of the same repository in place of that checkout. The agent of a program also reads the code in the codebase path. Run the full skill when the commits of the task are in the checkout of the codebase path.

- The task committed in the checkout of the codebase path: run the skill after the WIP commits, before the task goes to review.
- The task committed on a worktree branch: do not emit the event before the landing. Before the landing, you can run steps 3 to 6 with `--checkout "<worktree path>"`, and name each finding that the work caused in the result. Do not review a node before the landing: the landing can give the commits new ids, and a review row with an old id gives `anchor-unknown`. After the landing, run steps 1 and 2, and then steps 7 to 9 for the fallback programs, with no `--checkout`. When the session that ends the task does not land, it writes the line `ITE: run sk-ite-check_after_task after the landing` in its result, and the session that lands runs the skill.
- A link in the worktree that leaves the worktree: `--checkout` refuses with exit 2. Run the skill after the landing.
- No part and no view names the changed files: the event has no route to a standing process. The command of step 3 prints `No part or view names <paths>. Nothing to check.` and exits 0. The skill is then done after step 9.

# Actions

1. **Emit the event `task.finished`.**
   - List the changed files. For each repository of `git-repos`, resolve the codebase path: the first line of `flint resolve codebase <name>`. For each SHA of `wip-commits` of that repository, list its files: `git -C "<codebase path>" show --name-only --format= <sha>`. Remove the duplicates. When the task has no `wip-commits`, use the files that the work changed.
   - Make each path absolute. Join the codebase path and each file. An absolute path matches only the code-refs of its own repository.
   - Emit the event, with each path, the name of the task note (for example `(Task) 1245 ITE MVP - Events In, the Plan of Future Notes, Dev Versions, and the Program Agent After a Task`), one sentence for a person, and the commits:

     ```bash
     flint ite event emit --kind task.finished --path <absolute path>... --task "<the name of the task note>" --summary "<one sentence: what the task changed>" --payload '{"commits":["<sha>"],"repos":["<repo>"]}' --source projects --json
     ```

     The output is the event and its routes. Each route names a program, a target (`process:<id>`, or none: only a process has a trigger), a status (`started`, `queued`, `refused`, `not-enabled`, or `no-match`), a run, and a job.

     The emit writes on this machine. It appends the event to `.flint/steel/events/log.jsonl`. It appends one line for each route to `.flint/steel/events/routes.jsonl`. A route that starts a target can write more. A process can start a run: a check can write a result, and a maker can write a snapshot. A standing process puts a job in the queue of the agent of the program. Later, that agent can write one proposal (a map change or a candidate) and a realize proposal for each future note that the work made true. It never sets a state of a future note. The emit never blocks the task.
2. **Read the routes, and find the fallback programs.**
   - A program is **taken** only when one of its routes went to a standing process and that route is `started` or `queued`. Such a route has a `job`: the job of the agent of the program. Only a process with `by: agent` and `agent: program` gives a route a job. When you are not sure, read the target: `flint ite process show "<program>" <process id> --json` must give `by: agent` and `agent: program`.
   - A route to another process does not take the map work, also when it is `started`. Such a process is a code process, an agent process with `agent: own`, a check (a process that keeps a claim), or a maker (a process that keeps a data item).
   - Do no map work for a taken program: the agent of that program does it. Do not review, edit, or propose for a taken program.
   - Each other program is a **fallback program**. Steps 3 to 9 run only for the fallback programs.
   - When `flint ite event emit` is not a command of this Flint (an older Flint CLI), or when it fails, write the error in the result. Then each program is a fallback program.
   - When no program is a fallback program, go to step 9.
3. **Run the check.**

   ```bash
   flint ite check --paths <absolute path>... --json
   flint ite check --checkout "<worktree path>" --paths <absolute path in the worktree>... --json   # before the landing
   ```

   The output is one JSON value of the schema `steel-check-paths/1`: for each program, the selected `parts` (each with `id`, `title`, and `findings`) and the selected `views` (each with `id`, `view`, `file`, and `findings`). Each finding has `code`, `level`, `detail`, and `node` when it is about one node. `flint ite view "<view id>" --json` gives the `lifetime` of each view. Exit 0: no error. Exit 1: a finding of the level error. Exit 2: a refusal; read the reason, and stop. Use only the programs that are fallback programs.
4. **Check the changed stories.** When the work changed a story file of Orbtest (`orbtest/stories/<area>.yaml`), run `flint ite check "<program>" --json` with no `--paths` for each fallback program of that product. Take each `review-due` finding whose `detail` names a changed story. `--paths` does not find them, because a story is not a code-ref.
5. **Act on each finding that the work caused.** The check gives all the findings of each selected part and view, also the findings that were there before the work. Act only on a finding of a part, or of a node of an **accepted** view, that names a file or a story that the work changed: a `review-due` whose `detail` lists a changed file or a changed story (the list holds at most 20 files; with more, read the diff of step 6), or a `code-ref-missing` whose `detail` names a changed path. A draft view is low cost: name its findings in the result, and do nothing more.

   | Finding caused by the work | Action |
   |----------------------------|--------|
   | `review-due` | Compare the node with the code (step 6). Then review it (step 7) or change it (step 8). |
   | `code-ref-missing` | The work removed, moved, or renamed a file that the node names. Change the node (step 8) with the new path. |
   | `anchor-unknown` | Git does not have the commit of the review row, for example after a rewrite of the history. Compare the node with the code (step 6), then review it (step 7). |

   No action in this skill for `never-reviewed`, `anchor-missing`, `anchor-none`, or a finding that was there before the work. When the work removed a story or a criterion that a part names, the check of the claim `orbtest-proof` gives `error` for that part: change the node (step 8). A node with no row in `reviews` gives no `review-due`, so the first review of a node is the work of the person who keeps it, not of a product task. A gap of the main map changes only through a map change that a person applies. Name the count of these findings in the result.

6. **Compare the node with the code.** Read the text and the fields of the node: the part note, or the node in the view file. `flint ite review "<program>" <ref>... --show --json` gives the review row, the reasons, and the changed files of each node, and writes nothing. Read the diff of the code under its code-refs after the review: `git -C "<codebase path>" diff <commit of the row> -- <code-ref path>`. For a code-ref of another codebase (`@<Codebase name>/<path>`), use that codebase and its commit in `commits` of the row. Read each changed story with `flint orbtest story show <id> --root <product root>`. Answer one question: does the text of the node still say what the code and the stories do? The claim is the text, not the names in the code. A new name of a function or a change of its inner logic often keeps the claim true.
7. **The claim is still true: review the node.** Run `flint ite review "<program>" <ref>...` with each node that you compared and found true: the part id, or `view:<view id>#<node id>`. The command writes the row of each node in the data item `reviews`. Do not review a node that you did not compare. A review is at a commit: review only after the WIP commits of the task. A file with changes that are not committed stays `review-due` after a review.
8. **The claim is not true: change the node.**
   - A view node: follow the workflow reshape for the accepted view, with the request "Make the nodes <ids> true to the code after <task>". In an interactive session, use [[wkfl-ite-reshape]]. In a headless session, use Stages 1 to 4 of [[hwkfl-ite-reshape]] (see Headless Use).
   - A part: propose one map change with the operation `edit` (a new sentence, new prose, or new `sources`: the `code-refs` of a part of a program with a codebase) with `flint ite map change propose "<program>" --ops - --reason "<one sentence>"`. Put a change of the `stories` or the `criteria` of a part in the `fields` of the same `edit` (`"fields":{"stories":["<story id>"]}`). An agent's `flint ite part set "<program>" <part id> --field 'stories=["<story id>"]'` proposes one more map change: a person applies it.
   - Do not review a node that your change changes: the person applies the candidate or the map change, then the node gets its review.
9. **Record the result.** Add one line to the Task Log of the task. Name the event id, and each taken program with its process and its job. For the fallback programs, name the parts and the views that the check selected, the nodes that you reviewed, the candidates and the map changes that you wrote, and each finding that stays. Example: `ITE: event 3f2a… task.finished; Flint took it (keep-map-true, job qj-9c1d…); CLI Core: 1 part and 2 views checked; reviewed view:4c1e…#select-the-agent; candidate onboarding-20261002-101500 for Onboarding#check-the-tools.`

# Headless Use

A headless product task follows the same actions, with these differences:

- Ask no question. When you cannot decide if a claim is still true, do not review the node. Name it in the result as `review-due, not decided`.
- For a view that is not true, write the candidate with Stages 1 to 4 of [[hwkfl-ite-reshape]]. Skip its last stage: do not return a `steel-result/1` value. The result of the turn is the result of the product task. Put the event id, the candidate id, the map change id, and the view in it.
- Never apply, revert, or discard a candidate or a map change. Never enable a process. Never set a state of a future note: name the future notes that the work made true in the result (the keeper proposes their realize). Never run `flint ite view accept`, `view draft`, or `view remove`. `flint ite review` is allowed for a node of a fallback program that you compared and found true.
- Set the phase `ite-check` while the skill runs: `flint orbh session set phase ite-check`.

# Output

- One event `task.finished` with the changed files, and its routes
- For each fallback program: the row in `reviews` of each node that the agent compared and found true, a candidate for each accepted view that is no longer true, and a map change for each part that is no longer true, not applied
- One line in the Task Log of the task with the event, the taken programs, the reviews, the proposals, and the findings that stay
