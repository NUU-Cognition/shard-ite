---
description: "Find where the parts touch reality: write the claims of the parts (tests of what must be true now) in Steel/Programs/<program>/Reality/, each with its check process (code, an agent, or a person), test each check, and run it one time after the person applies its promote"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Ground

Give parts their claims. For each part, write what must be true in reality now, find the data that shows it, select the form of the check that reads it best, write the claim and its check process, test the check, and run it one time after the person applies its promote. The form is in Claims and Checks and in Data of [[knw-ite-state]], in [[tmp-ite-claim-v0.1]], and in [[tmp-ite-data-v0.1]].

# Input

- The program
- (Optional) The part ids. With no part: each part of the map with the grounding `no-claim` or `unchecked`.

# Actions

## Stage 1: Read the Parts

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the map: `flint ite map "<program>" --json`, and the claims: `flint ite claim list "<program>"`. With no part ids, select each part with the grounding `no-claim` that is not of the type `note`.
3. For each part, read its note and write its claim in one sentence: what must be true in reality now when the part is true. A part that makes no claim (a group, a remark, a person) needs no claim: say so, and skip it.
4. A claim is a test of reality. It never states a goal, a target with a date, or a prediction. For a part of the type `goal`, a milestone with a date, or a plan, write the claim of now that a check can test, or skip the part and say why: a goal is the prose of a part, and a plan is a future note.
5. One claim can be about many parts. When one check answers for many parts (one page, one query, one script), plan one claim with each of those parts in `about`, and a check that prints one result for each part.
6. Once each selected part has its claim, progress to the next stage.

## Stage 2: Find the Checks

For each claim, find the place where reality shows it, and select the form of its check. The check is a process `Processes/check-<claim id>/`. Prefer code: a check with no mind. A code check is always its own code in the folder of the check process:

| When the claim is about | Select | Example |
|---|---|---|
| A fact that code can read: a file of a codebase, a public page or an API, a state that a command prints, a count of records | `by: code` with `runtime` and `entry`: a short script in the folder of the check | a script that reads the page of the venue and checks its title |
| A fact that an agent can check by reading | `by: agent` with `prompt` | "Read the sponsor sheet and say if two sponsors signed." |
| A fact that only a person knows or sees, or no other check is possible now | `by: person` with `task` | "Is this true now: the hall is booked for 12 November?" |

**Read data, not the source.** When a check needs a value of the world (a count, a version, the rows of a sheet, a time), the value is data. Run `flint ite data list "<program>"`. When a piece of data holds the value, the check names it in `reads` (`data:<id>` or `data:<id>#<output>`), and the code reads it from `STEEL_DATA`. When no data holds it, plan one: external data with a `source` and a maker that pulls it, for a value of the world, or native data for a value that a person decides (a limit), with a person maker. Two claims that read one source read one piece of data. A claim about how well an instruction works reads the data of its runs (`process:<id>#runs`).

1. Give each claim an `id` (a short slug: `hall-booked`; its check is `check-hall-booked`), its `about` (the part ids, never the titles; or a reference of another element: `process:<id>`, `process:<id>#<node>`, `data:<id>`), the `reads` of its check (the data that the check reads), and a `fresh-for` when reality changes (`12h` for a status, `7d` for a plan, `30d` for a booking).
2. Give a claim an `owner` when the owner of its first part does not answer for it. Ask the person which side changes when it fails: a process that repairs the world gets the trigger `{ on: event, kinds: [claim.failed], about: ["claim:<id>"] }`; else the keeper of the first part proposes a change of the model. A claim names no fix. When the person agrees that a process repairs the world, change the process. Add the trigger, and keep the other triggers of the process: `flint ite process set "<program>" <process> --add-trigger --on claim.failed --on-about claim:<claim id>` (add `--dry-run` first: it prints the new `process.md`). Without `--add-trigger`, the trigger flags replace each trigger of the process.
3. **The check judges.** Each result is `holds`, `fails`, or `error`, with the values that it saw as evidence. A claim never holds only a value.
4. **A check only reads.** It never changes the world, and it never fetches: a worker fetches, and the maker of the data reads what the fetch brought.
5. A check touches reality outside the model. Code that only finds a part of this program (for example the part of a person, to prove a role) proves only that the model has the part: do not write it. Code can count records of the work or of the world: tasks, meetings, reports, or the `status` of a Task.
6. Show the person the list: each claim, the form of its check, its parts, the data that it reads, its sentence, which side changes when it fails, and each new piece of data with its mode, its source, and its maker. Ask: write them, or change them.
7. Once the person agrees, progress to the next stage.

## Stage 3: Write and Check

1. Write each new piece of data first, with the form of [[tmp-ite-data-v0.1]]: `flint ite data new "<program>" <id> ...` writes `Data/<id>/data.md` and its maker `Processes/make-<id>/`. Test the maker with `flint ite data test "<program>" <id>`, and pull it one time with `flint ite data pull "<program>" <id>`.
2. Make each claim and its check: `flint ite claim new "<program>" <id> --about <part id>... --title "<the claim in one sentence>" --by code|agent|person [--reads <ref>...] [--prompt "<request>"] [--task "<question>"] [--owner "[[@Name]]"] [--fresh-for <d>]`. It writes `Reality/<id>/claim.md` and the check as a draft (`Processes/check-<id>/dev/`). Complete the prose of the claim with the form of [[tmp-ite-claim-v0.1]]. A code check gets its code (`check.js`, `check.py`) in its draft folder. The CLI is the truth: check the flags with `--help`.
3. Run `flint ite claim list "<program>"` and `flint ite process check "<program>"`. Repair each claim and each check that shows a problem: a claim does not check until its files are correct.
4. **Test each code check before you hand it over** with `flint ite claim test "<program>" <id>`: the check runs, and each line passes the door. Never leave a check that you did not test.
5. Propose the promote of each check: `flint ite process promote "<program>" check-<id>`. Show the person the revision ids. The person applies them (`flint ite revision apply "<program>" <revision id>`, or in Steel): each claim counts only after the apply. Never apply a promote yourself.
6. After the person applied a promote, run that check one time: `flint ite claim check "<program>" <id>`. Run a code check only when the person agreed to its code. An agent check starts one Orbh session, and a person check waits for the answer of the person in Steel.
7. Read the result. A claim that fails now is not an error of the workflow: it is a fact for the person. A check that gives `error` has a wrong form: repair it in a draft (`flint ite process dev "<program>" check-<id>`), test the draft with `flint ite process test "<program>" check-<id> --dev`, and propose its promote again.
8. Run `flint ite check "<program>"`. Repair each `claim-invalid`, `process-invalid`, and `unknown-reference` finding.
9. Show the person each part with its claims and their states. Propose [[wkfl-ite-observe]] for the agent and person checks.
10. Once each claim is written and each promoted check ran one time, the workflow is done.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the count of the new claims by the form of their check, the count that hold and that fail now, the claim ids, the promotes that wait for the person, and the parts with no claim. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

# Output

- Claims in `Steel/Programs/<program>/Reality/`, each with its check process, promoted by the person and checked one time
- The data that the checks read in `Steel/Programs/<program>/Data/`, each maker tested and pulled one time
- The first results of the checks, in the log of this machine
- Each part with no claim, named to the person
