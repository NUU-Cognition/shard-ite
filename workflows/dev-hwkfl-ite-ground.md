---
description: "Headless: write the claims of parts (tests of what must be true now) in Steel/Programs/<program>/Reality/, each with its check process as a draft, test each check, propose the promote of each check for the person, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Ground (Headless)

Give parts their claims, with no person in the session. A claim is a test of reality: it says what must be true now. Its check is a process `Processes/check-<claim id>/`. The form is in Claims and Checks and in Data of [[knw-ite-state]], in [[tmp-ite-claim-v0.1]], and in [[tmp-ite-data-v0.1]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program
- The selected parts. With no part: each part of the map with the grounding `no-claim` that is not of the type `note`.
- (Optional) The instructions of the person: the sources to use, or the forms to prefer

# Actions

## Stage 1: Read the Parts

1. Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the map (`flint ite map "<program>" --json`) and the claims (`flint ite claim list "<program>" --json`).
4. For each part, read its note and write its claim in one sentence: what must be true now. A claim never states a goal, a target with a date, or a prediction: for a part of the type `goal`, a milestone with a date, or a plan, write the claim of now that a check can test (for example "The hall is booked"), or skip the part. Skip a part that makes no claim, and keep it for the `summary`.
5. Once each selected part has its claim, progress to the next stage.

## Stage 2: Find the Checks

1. Run `flint orbh session set phase grounding`.
2. For each claim, select the form of its check with the table of Stage 2 of [[wkfl-ite-ground]]. Prefer code: a short script in the folder of the check process. When one check answers for many parts, plan one claim with each of those parts in `about`, and a check that prints one verdict for each part.
3. Set the focus on the part that you work on. The check judges (`holds`, `fails`, or `error`, with the values as evidence), and it only reads: never write a check that changes the world or fetches.
4. **Read data, not the source.** When a check needs a value of the world (a count, a version, the rows of a sheet), run `flint ite data list "<program>"`: name a piece of data that holds the value in `reads` of the check, or plan a new piece of data ([[tmp-ite-data-v0.1]]): external with a `source` and a maker that pulls it, or native for a value that a person decides (a person maker). Two claims that read one source read one piece of data. A claim about how well an instruction works reads `process:<id>#runs`.
5. A check touches reality outside the model. Code that only finds a part of this program (for example the part of a person, to prove a role) proves only that the model has the part: do not write it. Code can count records of the work or of the world: tasks, meetings, reports, or the `status` of a Task.
6. When no code check and no agent check is possible, give the claim a person check: the task "Is this true now: <the claim>?". Keep it for the `summary`.
7. Which side changes when a claim fails? When a process of the program repairs the world for that claim, name it in the `summary`: a person gives it the trigger `--on claim.failed --on-about claim:<id>`. Else the keeper of the first part proposes a change of the model. A claim names no fix.
8. Once each claim has its check, progress to the next stage.

## Stage 3: Write and Check

1. Run `flint orbh session set phase writing`.
2. Write each new piece of data first, with its maker: `flint ite data new "<program>" <id> ...` (`Steel/Programs/<program>/Data/<id>/data.md` and `Processes/make-<id>/`). Test the maker with `flint ite data test "<program>" <id>`, and pull it one time with `flint ite data pull "<program>" <id>`. Never write a value that a person decides: give such data a person maker (`--by person --task "<the question>"`).
3. Make each claim and its check: `flint ite claim new "<program>" <id> --about <part id>... --title "<the claim in one sentence>" --by code|agent|person [--reads <ref>...] [--prompt "<request>"] [--task "<question>"] [--fresh-for <d>]`. Give it a short, readable `id` (`hall-booked`): the person reads it in the Workbench. Name the parts by their ids, never by their titles. The command writes `Steel/Programs/<program>/Reality/<id>/claim.md` and the check as a draft (`Processes/check-<id>/dev/`). Complete the prose of the claim with the form of [[tmp-ite-claim-v0.1]], and write the code of the check in its draft folder. The CLI is the truth: check the flags with `--help`.
4. Run `flint ite claim list "<program>"` and `flint ite process check "<program>"`, and repair each claim and each check that shows a problem.
5. Run `flint orbh session set phase checking`. Test each code check: `flint ite claim test "<program>" <id>`. Never leave a check that you did not test. Take the counts of the `summary` from these tests (holds, fails, error), not from your own reading.
6. Propose the promote of each check: `flint ite process promote "<program>" check-<id>`. Each claim counts only after a person applies its promote: until then it is `unchecked`. Never apply a promote.
7. Run `flint ite check "<program>"`. Repair each `claim-invalid`, `process-invalid`, and `unknown-reference` finding.
8. Once each claim is written, each code check passed its test, and each promote waits for the person, progress to the next stage.

## Stage 4: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: the count of the new claims by the form of their check, the new data by mode, the count of code checks that hold in the test and that fail in the test, the count of promotes that wait for the person, and the parts with no claim. Use no `'` character.
3. End the job with the result, and nothing else (`candidate_id` is the candidate of a view, else null):

   ```bash
   flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

# Output

- Claims in `Steel/Programs/<program>/Reality/`, each with its check process as a draft, tested, and one promote revision for each check
- The data that the checks read in `Steel/Programs/<program>/Data/`, each maker tested and pulled one time
- One `steel-result/1` JSON value as the result of the job
