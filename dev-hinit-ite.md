---
description: "Headless: the rules of a headless agent session of the ITE: the orientation, one job at a time, the focus, the end of each job with return --await, and the result shape steel-result/1"
required-reading:
  - "[[init-ite]]"
---

# ITE (Headless)

`flint shard hstart ite` loads this file in a headless Orbh session. Read [[init-ite]] first. Its model, its file forms, its quality rules, and its commands apply with no change. This file gives only what is different when no person is in the session.

## The Agent Session and Its Jobs

A person starts a headless **agent session** in the agent panel of the Workbench (`POST /api/ite/agents`), or with `flint ite agent start` or `flint ite job`. See Agent Sessions and Jobs of [[init-ite]].

The first prompt is the **orientation**: the program and this shard, with no job. When it has no job, read the program (`flint ite map tree`, `flint ite claim list`, and `flint ite check`), then end with `flint orbh session return --await "<one to three sentences: what the program is, and what needs work>"`.

Each **job** then comes to you as a new prompt. The prompt of a job names:

- the action, its title, and the workflow to follow (or its steps, for an action with no workflow);
- the document: `map`, or a view with its id, its file, its question, its map, and its `base_hash` now;
- the nodes: the id, the title, the type, and the note of each selected node;
- the data of a map action: the level of the focus and the coverage gaps;
- the text of the person;
- the first `flint ite focus` command;
- the form of the result.

The session metadata has the keys `ite-program`, `ite-program-id`, `ite-kind` (`job`), `ite-document`, `ite-focus` (the nodes of the current job), `ite-job` (the action of the current job), `ite-job-number`, and `ite-target`. Steel writes them at each new job. A person or another agent can start the same workflows with `flint orbh request`, with the same inputs in the prompt.

| Action | Workflow | Writes |
|---|---|---|
| `model` | [[hwkfl-ite-model]] | One map change with the new parts (`flint ite map change propose`), and links with `flint ite link` |
| `parts-add` | [[hwkfl-ite-parts_add]] | One map change with the new parts below one part |
| `view` | [[hwkfl-ite-view]] | One candidate in `Proposals/` |
| `reshape` | [[hwkfl-ite-reshape]] | One candidate in `Proposals/` |
| `claim-add` | [[hwkfl-ite-claim_add]] | One claim in `Reality/` (`flint ite claim new`), its check, and its first result |
| `ground` | [[hwkfl-ite-ground]] | Claims in `Reality/` with their checks, and the first results of the code checks |
| `observe` | [[hwkfl-ite-observe]] | Results, with `flint ite claim check` and `flint ite claim report` |
| `repair` | [[hwkfl-ite-repair]] | Parts (through a map change), claims, and candidates |
| `process-add` | [[hwkfl-ite-process_add]] | One process in `Processes/` (`flint ite process new`) and its code, prompt, or task |
| `flow-add` | [[hwkfl-ite-flow_add]] | One instruction map `map.md` (`flint ite flow new`) and its nodes |
| `map-create` | [[hwkfl-ite-map_create]] | One map change (the root and level 1), with `flint ite map change propose` |
| `map-expand` | [[hwkfl-ite-map_expand]] | One map change (the children of one part) |
| `map-refactor` | [[hwkfl-ite-map_refactor]] | One map change (one level to the size limit) |
| `map-cover` | [[hwkfl-ite-map_cover]] | One map change (the sources of the gap files) |
| `map-update` | [[hwkfl-ite-map_update]] | One map change (one part from its sources now) |
| `free`, `update`, `explain`, `do`, `revise` | None: the prompt of the job gives the steps | What the prompt of the job asks for. `explain` changes no file. |

## The Rules of a Headless Session

1. **Show the person where you work.** Run the `flint ite focus` command of the prompt of the job first. Run `flint ite focus <node ids>` again each time your work moves to other nodes. Follow [[sk-ite-focus]].
2. **Show progress.** Set the phase at the start of each stage: `flint orbh session set phase <phase>`. Each workflow names its phases.
3. **Ask no question during a job.** When the instructions are not clear, select the reading that best helps the person, and write that reading in the `summary`.
4. **A view changes only through a candidate.** Never write a file in `Views/` or in `History/` of `Steel/Programs/<P>/`. Never apply a candidate, and never discard the candidate that you return. The person reviews it in the Workbench.
5. **The structure changes only through a map change.** An agent's `flint ite part add` and `part remove` are proposals; `flint ite map change propose` is one proposal for many operations. `flint ite part set` changes the prose and the fields that are not structure. Never write the `parent`, the title, or the `(Type)` word of a part with your own tools. Never apply, revert, or discard the map change that you return.
6. **Never change an OrbCode project, except through a map change.** A program of the template `software` in `Mesh/OrbCode/` changes only through the OrbCode shard, or through a map change of its main map that a person applies. For such a program, the workflows `model`, `ground`, `claim_add`, and `repair` name the change in the `summary` and write nothing. The `map-*` and `parts_add` workflows propose a map change.
7. **Claims and processes are files; results go through the door.** Start a new claim with `flint ite claim new`, a new process with `flint ite process new`, and a new instruction map with `flint ite flow new`: each command writes the file from its form and records you in the activity. Then write the rest of the file and its code: a claim with [[tmp-ite-claim-v0.1]], a process with [[tmp-ite-process-v0.1]], and a map with [[tmp-ite-instruction_map-v0.1]]. Send each result with `flint ite claim check` or `flint ite claim report`. Never write the log by hand.
8. **Never run code that you did not read.** A code check and a code process run their own code on this machine: read the entry first. Never run a process (`flint ite process run`) unless the prompt of the person asks for exactly that: a process can change the world. Never enable a trigger: only a person does. Never rename, archive, or remove a program or a view (`flint ite rename`, `archive`, `view remove`), unless the prompt of the person asks for exactly that.
9. **Never keep a check or a process that you did not test.** Test each code check that you write with `flint ite claim test "<program>" <claim>`, and run it one time (`flint ite claim check`) before you return. Test each code process that you write with `flint ite process test "<program>" <process>`.
10. **Stay inside the program.** Change only the parts of the program, the files of its folder in `Steel/`, and the log through `flint ite`. Never write the agent log. Do not commit: the person commits.
11. **One session, many jobs.** Keep what you learned about the program for the next job, but read the program again where a job changes it. Do each job alone: do not continue an older job in a new one, unless the text of the person asks for that.

## Instruction Maps and Runs (Headless)

The section Instruction Maps and Runs of [[init-ite]] applies. In a headless session, these rules are added:

1. **The engine is the only writer of a run.** Never create, edit, or delete a file in `Steel/Programs/<P>/Runs/`.
2. **An instruction map is a file.** A change of a node is an edit of `Processes/<id>/map.md` ([[tmp-ite-instruction_map-v0.1]]); check it with `flint ite flow show`. An external map is read-only: a change goes to its source. An edit never changes an active run: the run keeps its snapshot.
3. **Run an instruction map only when the prompt asks for exactly that.** `flint ite flow start`, `begin`, `done`, `answer`, `skip`, `retry`, `pause`, `resume`, and `cancel` act for the person. Never run `approve` or `refuse`. Read the runs with `flint ite flow list`, `show`, `runs`, `status`, and `events`.

## Living Systems (Headless)

The section Living Systems of [[init-ite]] applies. In a headless session, these rules are added:

1. **Take the instruction from the system.** When your prompt names a living system with no other work, run `flint ite prompt "<program>" --json` and follow the text in its field `prompt`. Do not follow a copy of the instruction in another text: a copy can be old. The command records that an agent took a prompt (the vital sign "use").
2. **An agent process or an agent step returns only its outputs.** When a process or a step of a run started you, your result gives its outputs: one JSON line `{ "output": { "<name>": <value> } }`, or, for one `text` output, only that text. Return it with `flint orbh session return --finish "<result>"`: this result rule replaces the shape `steel-result/1` and the `--await` of a job. An agent check, an agent process, and an agent step keep one session for one dispatch: they take no job. The run takes the result of your session only.
3. **An agent check reports through the door.** When the check of a claim started you, read what its prompt names, and report the result with `flint ite claim report "<program>" <claim> --state holds|fails|error --summary "<text>" [--part <id>] [--value <name>=<value>]...`. When the engine started you for a node of a run, your prompt names `--run <run id> --node <node id>`: give both, or the result does not count for that node. Never report what you did not see. A report never confirms the effect of a process: only a check after the work does.
4. **Read; do not decide for a person.** You can run `flint ite claim list`, `claim show`, `claim check` (a check only reads), `flint ite brief`, `flint ite vitals`, and `flint ite system`. Never run `flint ite flow approve` or `refuse`, never answer a decision of a person, never enable a trigger, never acknowledge an item of the brief, and never run `flint ite revision apply`, `revert`, or `discard`, unless the prompt of the person asks for exactly that. The authority layer refuses an agent for an approval and an enable.
5. **A protected change goes through a revision.** To change `goals`, `authority`, or `governor` of the system block, write the full new root note and run `flint ite revision propose`. Never apply it. A direct edit of these keys shows as the finding `protected-change`.
6. **Never act on the world** (a ship, a push, a publish, a release) in a living system unless the process or the step that started you says so, and the run has its approval.
7. **Never write the log, a run, or a proposal by hand.**

The reconciliation of a living system (a cron with no instruction map, for example the morning cron of Flint Release) follows the reconciliation prompt of `flint ite prompt "<program>" --json`: it runs the checks of the old claims with `flint ite claim check`, and returns the brief as Markdown (`flint ite brief "<program>" --markdown`) as its result. It acts on nothing.

## Before You Return

Check each item. A job that skips an item gives the person a result that the Workbench cannot show or that is not true.

- [ ] You ran `flint shard hstart ite` once in this session, and the `flint ite focus` command of the prompt of this job, and you changed the focus when the work moved.
- [ ] You did each stage of the workflow, in order, and set its phase.
- [ ] A candidate: `flint ite check --candidate <candidate-id>` exits 0 (no error finding), and `flint ite diff --candidate <candidate-id>` says that it can be applied (no conflict).
- [ ] A map change: `flint ite map change show "<program>" <change id> --json` shows the state `proposed`, no conflict, and no new finding of the level error in the tree after.
- [ ] Parts, claims, and maps: `flint ite check "<program>"` gives no new finding of the code `format`, `link-missing`, `ref-missing`, `claim-invalid`, or `claim-fixed-by` for a part, a claim, or a map that you changed, and `flint ite flow show` gives no problem for a map that you changed.
- [ ] Each code check that you wrote passed `flint ite claim test` and ran one time, and its claim holds, or its prose says why it fails.
- [ ] A living system: you took the instruction from `flint ite prompt`, and you approved, refused, enabled, and applied nothing that the prompt of the person did not ask for.
- [ ] The result is one line of JSON of the schema `steel-result/1`, and nothing else.
- [ ] You end the job with `flint orbh session return --await`, not `--finish`.

## The Result

The last action of each job is:

```bash
flint orbh session return --await '<json>'
```

Use `--await`, never `--finish`: the agent session stays ready for the next job, and the person ends it with End in the Workbench. The next job comes to you as a new prompt.

The payload is one line of JSON of the schema `steel-result/1`, with no other text:

```json
{"schema":"steel-result/1","program":"<program name>","view_id":"<uuid or null>","candidate_id":"<candidate id or null>","base_hash":"<sha256 hex or null>","summary":"<one to three short sentences for the person>"}
```

- `program` is the name of the program.
- `view_id` is the `view_id` of the candidate (the UUID of the view, not the `id` of the candidate file), or the id of the view that the job worked on, or `null` for the map.
- `candidate_id` is the file stem of the candidate, or `null` when the workflow wrote its changes with no candidate (`ground`, `observe`, and a `repair` that changed only claims). For a `model` or `map-*` workflow, it is the map change id (`mc-...`), and `view_id` and `base_hash` are `null`.
- `base_hash` is the `base_hash` of the candidate: the SHA-256 hex for a reshape, `null` for a new view or for no candidate.
- `summary` tells the person what changed and what is true now, in one to three short sentences of Simplified Technical English. Name the counts (for example "Added 14 parts and 19 links." or "6 parts hold, 2 fail, 3 wait for a person."), then the most important gap. Write it with no `'` character and no line break, so that the shell quote stays correct.

**A failure has the same schema.** When you cannot do the work (the program does not exist, the view does not exist, or an error of the check stays), return `candidate_id: null` and a `summary` that starts with `No change:` and gives the reason and the one thing that the person can do. When this session wrote a candidate that has an error, remove it first with `flint ite discard --candidate <candidate-id>`: this is the one discard that a headless session does.

When the prompt of the job gives another result shape, use the shape of the prompt.
