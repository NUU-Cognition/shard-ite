---
description: "Find where the parts touch reality: write the claims of the parts in Steel/Programs/<program>/Reality/, each with its check (code, an agent, or a person), and run each check one time"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Ground

Give parts their claims. For each part, write what must be true in reality, find the data that shows it, select the form of the check that reads it best, write the claim and its check, and run the check one time. The form is in Claims and Checks and in Data of [[init-ite]], in [[tmp-ite-claim-v0.1]], and in [[tmp-ite-data-v0.1]].

# Input

- The program
- (Optional) The part ids. With no part: each part of the map with the grounding `no-claim` or `unchecked`.

# Actions

## Stage 1: Read the Parts

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the map: `flint ite map "<program>" --json`, and the claims: `flint ite claim list "<program>"`. With no part ids, select each part with the grounding `no-claim` that is not of the type `note`, and each claim with `by: none`.
3. For each part, read its note and write its claim in one sentence: what must be true in reality when the part is true. A part that makes no claim (a group, a remark, a person) needs no claim: say so, and skip it.
4. Give each claim its mode. `is`: the part describes the world, and a failure means that the model is out of date. `ought`: the part is a goal or a limit, and a failure means that the world is off target. `will`: the part predicts, with a probability and a date.
5. One claim can be about many parts. When one check answers for many parts (one page, one query, one script), plan one claim with each of those parts in `about`, and a check that prints one result for each part.
6. Once each selected part has its claim, progress to the next stage.

## Stage 2: Find the Checks

For each claim, find the place where reality shows it, and select the form. Prefer code: a check with no mind. A code check is always its own code in the claim folder:

| When the claim is about | Select | Example |
|---|---|---|
| A fact that code can read: a file of a codebase, a public page or an API, a state that a command prints, a count of records | `by: code` with `runtime` and `entry`: a short script in the claim folder | a script that reads the page of the venue and checks its title |
| A fact that an agent can check by reading | `by: agent` with `prompt` | "Read the sponsor sheet and say if two sponsors signed." |
| A fact that only a person knows or sees | `by: person` with `question` | "Is the hall still booked for 12 November?" |
| No check is possible yet | `by: none` | The brief lists the claim in `unwatched` |

**Read data, not the source.** When a check needs a value of the world (a count, a version, the rows of a sheet, a time), the value is data. Run `flint ite data list "<program>"`. When a piece of data holds the value, the claim names it in `reads` (`data:<id>` or `data:<id>#<output>`), and the check reads it from `STEEL_DATA`. When no data holds it, plan one: external data with a `source` and a reader for a value of the world, or native data for a value that a person decides (a target, a limit). Two claims that read one source read one piece of data. A claim about how well an instruction works reads the data of its runs (`process:<id>#runs`).

1. Give each claim an `id` (a short slug: `hall-booked`), its `about` (the part ids, never the titles; or a reference of another element: `process:<id>`, `process:<id>#<node>`, `data:<id>`), its `reads` (the data that the check reads), and a `fresh-for` when reality changes (`12h` for a status, `7d` for a plan, `30d` for a booking).
2. Give an `ought` claim its `owner`, and its `fixed-by` when a process of the program can make it true.
3. **The check judges.** Each result is `holds`, `fails`, or `error`, with the values that it saw as evidence. A claim never holds only a value.
4. **A check only reads.** It never changes the world, and it never fetches: a process fetches, and the reader of the data reads what the fetch brought.
5. A check touches reality outside the model. Code that only finds a part of this program (for example the part of a person, to prove a role) proves only that the model has the part: do not write it. Code can count records of the work or of the world: tasks, meetings, reports, or the `status` that a person writes on a part.
6. Show the person the list: each claim, its mode, its form, its parts, the data that it reads, its sentence, and each new piece of data with its mode and its source. Ask: write them, or change them.
7. Once the person agrees, progress to the next stage.

## Stage 3: Write and Check

1. Make each claim with `flint ite claim new "<program>" <id> --about <part id>... --mode is|ought|will --by code|agent|person|none --title "<the claim in one sentence>"`. Then complete `Steel/Programs/<program>/Reality/<id>/claim.md` with the form of [[tmp-ite-claim-v0.1]] (the prose, `fresh-for`, `owner`, `fixed-by`). A code check gets its code (`check.js`, `check.py`) in the same folder. Write each new piece of data first, with the form of [[tmp-ite-data-v0.1]]: `Steel/Programs/<program>/Data/<id>/data.md` and its reader or its maker. Test the reader with `flint ite data test "<program>" <id>`, pull it one time with `flint ite data pull "<program>" <id>`, and then give the claim its `reads`. When `flint ite claim new` is not a command of the CLI (an older build), write the whole file with the form.
2. Run `flint ite claim list "<program>"`. Repair each claim that shows a problem: it does not check until its file is correct.
3. **Test each code check before you keep it** with `flint ite claim test "<program>" <id>`: the check runs, and each line passes the door. Never keep a check that you did not test.
4. Run each check one time: `flint ite claim check "<program>" <id>`. Run a new code check only when the person agreed to its code. An agent check starts one Orbh session, and a person check waits for the answer of the person in Steel.
5. Read the result. A claim that fails now is not an error of the workflow: it is a fact for the person. A check that gives `error` has a wrong form: repair it and run it again.
6. Run `flint ite check "<program>"`. Repair each `claim-invalid`, `claim-fixed-by`, and `unknown-reference` finding.
7. Show the person each part with its claims and their states. Propose [[wkfl-ite-observe]] for the agent and person checks.
8. Once each claim is written and checked one time, the workflow is done.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the count of the new claims by form, the count that hold and that fail now, the claim ids, and the parts with no possible check. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

# Output

- Claims in `Steel/Programs/<program>/Reality/`, each with its check, each checked one time
- The data that the checks read in `Steel/Programs/<program>/Data/`, each reader tested and pulled one time
- The first results of the code checks, in the log of this machine
- Each part with no possible check, named to the person (a claim with `by: none`, or no claim)
