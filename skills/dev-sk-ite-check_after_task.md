---
description: "At the end of a product task: find the parts of the main map whose sources name the changed files, compare their text with the change, then propose one map change or name one gap. An aid that never blocks a landing or a release."
orb:
  - "@v1/nuucognition/session/ccaed053-844a-48bd-966a-41a2e32d6412#flint/nuu-flint"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Skill: Check After Task

A product task changes code. A part of the main map that names that code in its sources (`code-refs`) can then say a thing that is no longer true. This skill finds those parts and keeps the main map true: it proposes one map change, or it names one gap for the person.

**The skill is an aid.** It never blocks a landing, the review of a task, the close of a task, or a release. A finding that stays is a line in the result, not a stop.

# Input

- The product task: a `(Task)` with `git-repos` and `wip-commits`. Or the list of the files that the work changed, and the repository of each file.

# When to Run It

Run the skill after the WIP commits, when the commits are in the checkout of the codebase path (the first line of `flint resolve codebase <name>`). When the task committed on a worktree branch, run it after the landing. When the session that ends the task does not land, it writes the line `ITE: run sk-ite-check_after_task after the landing` in its result.

# Actions

1. **List the changed files.** For each repository of `git-repos`, resolve the codebase path: the first line of `flint resolve codebase <name>`. For each SHA of `wip-commits` of that repository, list its files: `git -C "<codebase path>" show --name-only --format= <sha>`. Remove the duplicates. When the task has no `wip-commits`, use the files that the work changed. Make each path absolute: join the codebase path and the file.
2. **Find the parts.**

   ```bash
   flint ite check --paths <absolute path>... --json
   ```

   The output gives, for each program, the parts whose sources name one of the paths (each with `id`, `title`, and `findings`). Use only the parts. Exit 2 is a refusal: read the reason, write it in the result, and stop. When the command says that no part names the paths, it exits 0: go to step 5.
3. **Compare each part with the change.** Read the text and the sources of the part: `flint ite map "<program>" --full`, or the part note. Read the diff of its sources: `git -C "<codebase path>" diff <sha>~1 <sha> -- <path>` for each commit of the task. Answer one question: does the text of the part still say what the code does? A new name of a function, or a change of its inner logic, often keeps the text true.
4. **Propose one map change, or name one gap.** For each program with a part that is no longer true:
   - Write all the operations of that program in one map change: `edit` (a new sentence, new prose, or new `sources`), `add` (a new part for new code that no part covers), or `remove` (a part whose code is gone). Then run `flint ite map change propose "<program>" --ops - --reason "<one sentence: the task and what changed>"`, and read the preview with `flint ite map change show "<program>" <change id>`. The person applies it.
   - When you cannot decide, propose nothing for that part. Name it as a gap: `<program>: <part title> (<part id>): <the question for the person>`.
   - When each part is still true, propose nothing, and say so.
5. **Record the result.** Add one line to the Task Log of the task. Name each program, the count of the parts that you compared, each map change id, and each gap. Example: `ITE: CLI Core: 3 parts compared; map change mc-20261103-101500-sync-flags proposed; 1 gap: Sync (6d1c…): is the old flag still read?`

# Headless Use

A headless product task follows the same actions, with these differences:

- Ask no question. When you cannot decide if a part is still true, name it as a gap.
- Never apply, revert, or discard a map change.
- Set the phase `ite-check` while the skill runs: `flint orbh session set phase ite-check`.
- Put the map change ids and the gaps in the result of the product task.

# Output

- At most one map change for each program, not applied, or one named gap
- One line in the Task Log of the task
