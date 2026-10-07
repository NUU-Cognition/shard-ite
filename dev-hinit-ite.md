---
description: "Headless: the rules of an ITE job with no person in the session, the focus, and the result shape ite-result/1"
required-reading:
  - "[[init-ite]]"
---

# ITE (Headless)

`flint shard hstart ite` loads this file in a headless Orbh session. Read [[init-ite]] first. Its model, its file forms, its quality rules, and its commands apply with no change. This file gives only what is different when no person is in the session.

## Who Starts a Headless Workflow

A person starts a **job** in the Workbench of Steel (`POST /api/ite/jobs`) or with `flint ite job`. The job is an Orbh session with a prompt that names:

- the program (its name and its id), its types, the root note, and its folders in the Mesh and in `Steel/`;
- the document: `map`, or a view with its id, its file, its question, its map, and its `base_hash` now;
- the nodes: the id, the title, the type, and the note of each selected node;
- the workflow to follow, and the instructions of the person;
- the first `flint ite focus` command.

The session metadata has the keys `ite-program`, `ite-document`, `ite-focus`, and `ite-job`. A person or another agent can start the same workflows with `flint orbh request`, with the same inputs in the prompt.

| Job template | Workflow | Writes |
|---|---|---|
| `model` | [[hwkfl-ite-model]] | One map change with the new parts (`flint ite part add` or `flint ite map change propose`), and links with `flint ite link` |
| `view` | [[hwkfl-ite-view]] | One candidate in `Proposals/` |
| `reshape` | [[hwkfl-ite-reshape]] | One candidate in `Proposals/` |
| `ground` | [[hwkfl-ite-ground]] | Processes in `Reality/`, and their first observations through the door |
| `observe` | [[hwkfl-ite-observe]] | Observations, with `flint ite process run` and `flint ite process observe` |
| `repair` | [[hwkfl-ite-repair]] | Parts (through a map change), processes, and candidates |
| `map-create` | [[hwkfl-ite-map_create]] | One map change (the root and level 1), with `flint ite map change propose` |
| `map-expand` | [[hwkfl-ite-map_expand]] | One map change (the children of one part) |
| `map-refactor` | [[hwkfl-ite-map_refactor]] | One map change (one level to the size limit) |
| `map-cover` | [[hwkfl-ite-map_cover]] | One map change (the sources of the gap files) |
| `map-update` | [[hwkfl-ite-map_update]] | One map change (one part from its sources now) |
| `revise`, `do`, `explain`, `free` | None: the prompt gives the work | What the prompt asks for |

## The Rules of a Headless Session

1. **Show the person where you work.** Run the `flint ite focus` command of the prompt first. Run `flint ite focus <node ids>` again each time your work moves to other nodes. Follow [[sk-ite-focus]].
2. **Show progress.** Set the phase at the start of each stage: `flint orbh session set phase <phase>`. Each workflow names its phases.
3. **Ask no question.** When the instructions are not clear, select the reading that best helps the person, and write that reading in the `summary`.
4. **A view changes only through a candidate.** Never write a file in `Views/` or in `History/` of `Steel/Programs/<P>/`. Never apply a candidate, and never discard the candidate that you return. The person reviews it in the Workbench.
5. **The structure changes only through a map change.** An agent's `flint ite part add` and `part remove` are proposals; `flint ite map change propose` is one proposal for many operations. `flint ite part set` changes the prose, the claims, and the fields that are not structure. Never write the `parent`, the title, or the `(Type)` word of a part with your own tools. Never apply, revert, or discard the map change that you return.
6. **Processes are files; observations go through the door.** Write a process as `Steel/Programs/<P>/Reality/<id>/process.md` ([[tmp-ite-process-v0.1]]). Send each observation with `flint ite process observe` or `flint ite process run`. Never write the log by hand.
7. **Never change an OrbCode project, except through a map change.** A program of the template `software` in `Mesh/OrbCode/` changes only through the OrbCode shard, or through a map change of its main map that a person applies. For such a program, the workflows `model`, `ground`, and `repair` name the change in the `summary` and write nothing. The `map-*` workflows propose a map change.
8. **Never run a process of the ready kind `command`,** unless the prompt of the person names it. Never rename, archive, or remove a program or a view (`flint ite rename`, `archive`, `view remove`), unless the prompt of the person asks for exactly that.
9. **Never invent a process that you did not check.** Run each code process one time before you return.
10. **Stay inside the program.** Change only the parts of the program, the files of its folder in `Steel/`, and the log through `flint ite`. Do not commit: the person commits.

## Instruction Maps and Runs (Headless)

The section Instruction Maps and Runs of [[init-ite]] applies. In a headless session, these rules are added:

1. **The engine is the only writer of a run record.** Never create, edit, or delete a file in `Steel/Programs/<P>/Runs/`, and never write below `# Remarks`.
2. **An instruction map is parts.** A change of a step or of the root block is a change of a part: the structure through a map change, the fields (`does`, `next`, `outcomes`, `effect`) with `flint ite part set`. An edit never changes an active run: the run keeps its snapshot.
3. **Run an instruction map only when the prompt asks for exactly that.** `flint ite flow start`, `done`, `answer`, `skip`, `pause`, `resume`, and `cancel` act for the person. Read the runs with `flint ite flow list`, `show`, `runs`, and `status`.

## Living Systems (Headless)

The section Living Systems of [[init-ite]] applies. In a headless session, these rules are added:

1. **Take the instruction from the system.** When your prompt names a living system, run `flint ite prompt "<program>" --json` (with `--flow <id> --step <id>` for a step of an instruction map) and follow the text in its field `prompt`. Do not follow a copy of the instruction in another text: a copy can be old. The command records that an agent took a prompt (the vital sign "use").
2. **An agent step returns only its result.** When the engine dispatched you for an agent step of a run, your result is the value of the one `text` output of the step. Return only that text, with `flint orbh session return --finish "<text>"`: this result rule replaces the shape `ite-result/1`. The run takes the result of your session only.
3. **A report is not evidence.** Report the value of a claim that no process feeds (a check receipt, for example) with `flint ite observe "<program>" --claim <id> --value <v> --type <t> --summary "<text>"`. Never report a value that you did not see. A report never confirms an effect: only a process does.
4. **Read; do not decide for a person.** You can run `flint ite read`, `flint ite flow reconcile <run>` with no `--decision`, `flint ite brief`, `flint ite statements`, and `flint ite evidence`. Never run `flint ite flow approve`, `waive`, `dispatch`, or `reconcile --decision`, never acknowledge an item of the brief, and never run `flint ite revision apply`, `revert`, or `discard`, unless the prompt of the person asks for exactly that. The authority layer refuses an agent for an approval, a waiver, and a retry.
5. **A protected change goes through a revision.** To change a goal, a predicate, `fresh-for`, a process that feeds a claim, a completion, a precondition, or the authority, write the full new file and run `flint ite revision propose`. Never apply it. A direct edit of such a field refuses with `protected-change`, or shows as a finding.
6. **Never act on the world** (a ship, a push, a publish, a release) in a living system unless the step that you execute says so, and the run has its approval.
7. **Never write the log, a run record, or a proposal by hand.**

The reconciliation of a living system (a cron with no instruction map, for example the morning cron of Flint Release) follows the reconciliation prompt of `flint ite prompt "<program>" --json`: it runs the processes with `flint ite read`, reconciles each run with a pending or unknown effect, and returns the brief as Markdown (`flint ite brief "<program>" --markdown`) as its result. It acts on nothing.

## Before You Return

Check each item. A job that skips an item gives the person a result that the Workbench cannot show or that is not true.

- [ ] You ran `flint shard hstart ite` and the `flint ite focus` command of the prompt, and you changed the focus when the work moved.
- [ ] You did each stage of the workflow, in order, and set its phase.
- [ ] A candidate: `flint ite check --candidate <candidate-id>` exits 0 (no error finding), and `flint ite diff --candidate <candidate-id>` says that it can be applied (no conflict).
- [ ] A map change: `flint ite map change show "<program>" <change id> --json` shows the state `proposed`, no conflict, and no new finding of the level error in the tree after.
- [ ] Parts and processes: `flint ite check "<program>"` gives no new finding of the code `format`, `link-missing`, `ref-missing`, `process-invalid`, or `process-no-part` for a part or a process that you changed.
- [ ] Each code process that you wrote ran one time, and it holds, or its prose says why it fails.
- [ ] A living system: you took the instruction from `flint ite prompt`, and you approved, waived, retried, and applied nothing that the prompt of the person did not ask for.
- [ ] The result is one line of JSON of the schema `ite-result/1`, and nothing else.

## The Result

The last action of the turn is:

```bash
flint orbh session return --finish '<json>'
```

The payload is one line of JSON of the schema `ite-result/1`, with no other text:

```json
{"schema":"ite-result/1","program":"<program name>","view_id":"<uuid or null>","candidate_id":"<candidate id or null>","base_hash":"<sha256 hex or null>","summary":"<one to three short sentences for the person>"}
```

- `program` is the name of the program.
- `view_id` is the `view_id` of the candidate (the UUID of the view, not the `id` of the candidate file), or the id of the view that the job worked on, or `null` for the map.
- `candidate_id` is the file stem of the candidate, or `null` when the workflow wrote its changes with no candidate (`ground`, `observe`, and a `repair` that changed only processes). For a `model` or `map-*` workflow, it is the map change id (`mc-...`), and `view_id` and `base_hash` are `null`.
- `base_hash` is the `base_hash` of the candidate: the SHA-256 hex for a reshape, `null` for a new view or for no candidate.
- `summary` tells the person what changed and what is true now, in one to three short sentences of Simplified Technical English. Name the counts (for example "Added 14 parts and 19 links." or "6 parts hold, 2 fail, 3 wait for a person."), then the most important gap. Write it with no `'` character and no line break, so that the shell quote stays correct.

**A failure has the same schema.** When you cannot do the work (the program does not exist, the view does not exist, or an error of the check stays), return `candidate_id: null` and a `summary` that starts with `No change:` and gives the reason and the one thing that the person can do. When this session wrote a candidate that has an error, remove it first with `flint ite discard --candidate <candidate-id>`: this is the one discard that a headless session does.

When the prompt of the job gives another result shape, use the shape of the prompt.
