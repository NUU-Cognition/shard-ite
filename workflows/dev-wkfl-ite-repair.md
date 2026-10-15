---
description: "Make the model or the world true again: for each claim that fails or is old, read which side the links say must change (a repair process for the world, or the keeper for the model), confirm it with evidence, then propose the change of the model or of the check, or name the repair of the world"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Repair

A claim that fails says: the model and reality disagree. The links say which side must change (D10 of Task 1271). When a process of the program has the trigger `{ on: event, kinds: [claim.failed], about: ["claim:<id>"] }`, that process repairs the **world**: `on_fail.repair` names it, and the brief says "repair by <process>". Else the claim says what the system is, and the system is now different: the keeper of the first part of `about` proposes a change of the **model**, and the brief says "change the model: <keeper>". A check can also be wrong (it reads an old place). This workflow confirms the side for each claim with evidence. It proposes the change of the model or of the check. It names the repair when reality is wrong: it never changes the world to make a claim true.

# Input

- The program
- (Optional) The part ids. With no part: each claim that fails, has an error, or is old.

# Actions

## Stage 1: Read the Failures

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the claims: `flint ite claim list "<program>"` (with `--part <id>` for one part). With no part ids, select each claim that is `fails`, `error`, or `old`.
3. For each claim, read its newest results and its `on_fail`: `flint ite claim show "<program>" <claim>`. Keep what the check saw, when, and the side that the links name.
4. For an old claim, run its check again first (`flint ite claim check "<program>" <claim>`, or [[wkfl-ite-observe]] for an agent check or a person check). A claim that holds again needs no repair.
5. Once each claim has what its check saw, progress to the next stage.

## Stage 2: Find What Is Wrong

For each claim that fails or has an error, decide one cause, with evidence. Start from `on_fail`: it gives the side that the links name. The evidence can show that the check is wrong.

| Cause | Evidence | Repair |
|---|---|---|
| The check is wrong: the path moved, the URL changed, the query is too narrow | The thing exists, but at another place or in another form | Change the check in a draft, and propose its promote (Stage 3) |
| The model is wrong: the system changed, and the part or the claim says the old system. `on_fail.repair` is empty, and `on_fail.keeper` names the keeper | A newer note, a commit, a message, or the person says the new state | The keeper proposes the change of the part, the claim, or the view (Stage 3) |
| Reality is wrong: the work is not done, or something broke. `on_fail.repair` names a process | The check is correct, and the claim says what must be true now | Name the repair process (Stage 4) |
| Not known | The evidence does not decide | Ask the person |

1. Set the focus on the parts of the claim. Read the notes of the parts, the sources that they name, and the place that the check reads.
2. Show the person each claim with its cause and its evidence. When the evidence goes against `on_fail` (for example, reality is wrong, but no process repairs it), say so: the person can give a process the trigger on `claim.failed` of the claim (`flint ite process set "<program>" <process> --on claim.failed --on-about claim:<id>`). Ask the person to confirm each cause that is not certain.
3. Once each claim has a cause, progress to the next stage.

## Stage 3: Change the Model or the Check

Write each change as a proposal: the keeper of a note writes only proposals for it.

1. A wrong check: the check is a process (`Processes/check-<id>/`). Make its draft with `flint ite process dev "<program>" check-<id>`, and edit the draft (its code, its `prompt`, or its `task`) with the form of [[tmp-ite-claim-v0.1]]. Test it with `flint ite claim test "<program>" <id>`, and run `flint ite process check "<program>" check-<id>`. Propose its promote: `flint ite process promote "<program>" check-<id>`. The person applies it, and then you run the check (`flint ite claim check "<program>" <id>`).
2. A wrong part: propose the change of its text or its fields with a map change (`edit`), or change the prose with `flint ite part set` when the person agrees. A change of the tree (a move, a rename, a merge) is a map change: propose it with `flint ite map change propose`. Keep the id of the part.
3. A wrong claim (the system changed what must be true now): propose a revision of its `claim.md` (`flint ite revision propose "<program>" --kind steel --target "Steel/Programs/<program>/Reality/<id>/claim.md" --content-file <file> --reason "<why>" --trigger failed`), and say so to the person. Keep its id.
4. A wrong view node: write a candidate with [[wkfl-ite-reshape]]. Apply it only when the person agrees.
5. Never remove a claim only because it fails. Propose its removal only when it is no longer true of the system that it must hold, and say so to the person.
6. Once each wrong model and each wrong check has its proposal, progress to the next stage.

## Stage 4: Name the Repair of the World

1. For each claim where reality is wrong, write one sentence: what must happen in reality so that the claim holds, and who can do it (the `owner` of the claim). Name each process of `on_fail.repair`: it runs by its event trigger when a person enabled it, or the person runs it.
2. Do not change the world to make a claim true, and do not run a repair process. When the person asks you to do the work, that is a new job (the action `do`), or a run of the process by the person, not a repair.
3. Show the person the list of the work. Propose a task of the Projects shard for each large item, when the person wants one.
4. Run `flint ite claim list "<program>"` and show the states after the repair.
5. Once the person has the list, the workflow is done.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the claims that hold again, the proposals for the model and for the checks (with the id of each map change, revision, promote, or candidate), and the repair that reality needs. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

# Output

- A proposal for each claim where the model or the check was wrong: a map change, a revision, a promote of a draft check, or a candidate
- A list of the repairs that reality needs, with the repair process or the owner of each item
