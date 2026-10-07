---
description: "Find where each claim of a part touches reality: select the form of the process, write its process.md in Steel/Programs/<program>/Reality/, and run it one time"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Ground

Give parts their processes. For each part, find where its claim touches reality, select the form of process that checks it best, write the process, and run it one time. The process forms are in Processes and the Log of [[init-ite]] and in [[tmp-ite-process-v0.1]].

# Input

- The program
- (Optional) The part ids. With no part: each part of the map that makes a claim and has the grounding `no-contact`.

# Actions

## Stage 1: Read the Parts

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the map: `flint ite map "<program>" --json`, and the processes: `flint ite process list "<program>"`. With no part ids, select each part with the grounding `no-contact` that is not of the type `note`.
3. For each part, read its note and write its claim in one sentence: what is true in reality when the part is true. A part that makes no claim (a group, a remark, a person) needs no process: say so, and skip it.
4. A process can check many parts. When one check answers for many parts (one page, one query, one script), plan one process with each of those parts in `parts`.
5. Once each selected part has its claim, progress to the next stage.

## Stage 2: Find the Processes

For each claim, find the place where reality shows it, and select the form. Prefer a form that a command can check with no mind:

| When the claim is about | Select | Example |
|---|---|---|
| A file, a folder, or a symbol of a codebase | `by: code`, `uses: file` | `path: "@Steel/apps/nuu-steel/src/ite/canvas/"` |
| A state that a command prints (a branch, a build, a count) | `by: code`, `uses: command` with `expect` | `run: git -C "../Repos/flint" rev-parse --verify canon` |
| A public page or an API that answers | `by: code`, `uses: http` with `expect` | the page of the venue, a status API |
| Notes of the Mesh (a count, a state of tasks) | `by: code`, `uses: mesh` with `expect.count` | each task of the launch is done |
| The stories of a product | `by: code`, `uses: orbtest` | `stories: [setup.steps]` |
| A record that is the evidence (a meeting, a report) | `by: code`, `uses: note` | `ref: "(Meeting) 2026-09-28 Venue Call"` |
| A codebase or another Flint that must be on this machine | `by: code`, `uses: reference` | `ref: "rf-cb-flint"` |
| A check that needs its own logic | `by: code` with `runtime` and `entry` | a script that reads an export and counts |
| A fact that an agent can check by reading | `by: agent` with `prompt` | "Read the sponsor sheet and say if two sponsors signed." |
| A fact that only a person knows or sees | `by: person` with `claim` | "Nathan walked through the venue." |

1. Give each process an `id` (a short slug: `booking-email`), its `parts` (the part ids, never the titles), and an `expect-every` when reality changes (`12h` for a status, `7d` for a plan, `30d` for a booking).
2. **Check each code process one time before you write it**: the path exists, the command runs and matches, the URL answers, the note exists, the query matches. Never invent a process that you did not check. A `command` must be cheap and must not change the world: a process observes, and it never acts.
3. A process touches reality outside the model. A `mesh` query that only finds a part of this program (for example the part of a person, to prove a role) proves only that the model has the part: do not write it. A `mesh` process counts records of the work or of the world: tasks, meetings, reports, or the `status` that a person writes on a part.
4. When no process is possible, write no process, and say the gap in the prose of the part.
5. Show the person the list: each process, its form, its parts, and its claim. Ask: write them, or change them.
6. Once the person agrees, progress to the next stage.

## Stage 3: Write and Run

1. For each process, write `Steel/Programs/<program>/Reality/<id>/process.md` with the form of [[tmp-ite-process-v0.1]]. A code process with its own entry gets its file (`check.mjs`, `check.py`) in the same folder.
2. Run `flint ite process list "<program>"`. Repair each process that shows a problem: it does not run until its manifest is correct.
3. Run each code process one time: `flint ite process run "<program>" <id>`. This step is required: before it, each new process is `unobserved`. Run a `command` process only when the person agreed that the command runs.
4. Read the result. A process that fails now is not an error of the workflow: it is a fact for the person. A process that gives `error` has a wrong form: repair it and run it again.
5. Run `flint ite check "<program>"`. Repair each `process-invalid` and `process-no-part` finding.
6. Show the person each part with its processes and their states. Propose [[wkfl-ite-observe]] for the `agent` and `person` processes.
7. Once each process is written and run, the workflow is done.

# Output

- Processes in `Steel/Programs/<program>/Reality/`, each checked one time
- The first observations of the code processes, in the log of this machine
- Each part with no possible process, named to the person
