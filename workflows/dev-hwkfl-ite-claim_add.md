---
description: "Headless: add one claim about the selected parts from the words of a person: a test of what must be true now, with its check process (code, an agent, or a person), made with flint ite claim new as a draft, tested, with the promote of the check proposed for the person, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Claim Add (Headless)

Add one claim to a program: what must be true now, about the selected parts, with its check process `Processes/check-<id>/`. A headless agent session follows this workflow for a job of the action `claim-add` ("+ Add a claim" in the Workbench), with no person in the session. The form is in Claims and Checks of [[knw-ite-state]] and in [[tmp-ite-claim-v0.1]]. The rules of a headless session are in [[hinit-ite]].

The focus of this job: the selected parts.

# Input

- The program
- The selected parts: the parts that the claim is about. With no part, select the parts from the text of the person.
- The text of the person: what must be true now. It can name the form of the check ("a person checks it", "an agent reads the sheet").

# Actions

## Stage 1: Read the Parts

1. Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the map (`flint ite map "<program>" --json`) and the claims of the parts (`flint ite claim list "<program>" --part <id> --json` for each part).
4. Read the note of each part, and the sources that the note names.
5. With no selected part, find the parts that the text of the person names in the map. When no part fits, stop: return `No change:` with the next step "add the part first (the action parts-add)". A claim names at least one part.
6. When a claim of the parts already says what the text says, add no claim: return `No change:` with the id of that claim.
7. Once you know the parts and what must be true, progress to the next stage.

## Stage 2: Select the Claim and Its Check

1. Run `flint orbh session set phase planning`.
2. Write the claim as one sentence for a person, in the words of the person, about now: "The hall is booked for the night". A claim is a test of reality. It never states a goal, a target with a date, or a prediction: "80 people come" and "We ship by 5 November" are not claims. When the text of the person gives a goal or a plan, write no claim: return `No change:`, and name a part of the type `goal` or a future note as the next step for the person.
3. Select the form of the check with the table of Stage 2 of [[wkfl-ite-ground]]:
   - `code` first, when code can read the source: a file, a page, an API, a command, or a count of records.
   - `agent` when a reading decides, and code cannot decide it.
   - `person` when only a person knows, when no other check is possible now, or when the text of the person asks for a person check. The task of a person check is "Is this true now: <the claim>?".
4. A check touches reality outside the model. Code that only finds a part of this program proves only that the model has the part: do not write it.
5. Select the `id`: a short, readable slug (`hall-booked`). Check that it is free: `flint ite claim show "<program>" <id>` must refuse with `not-found`. The check gets the id `check-<id>`.
6. Select `fresh-for` when reality changes (`12h` for a status, `7d` for a plan), and an `owner` when the owner of the first part is not the person who answers for the claim.
7. When the check needs a value of the world, read it as data: `flint ite data list "<program>"`. Name the data in `--reads`. When the data does not exist, make it first with its maker ([[tmp-ite-data-v0.1]]).
8. When the claim fails, which side changes? Read `flint ite process list "<program>"`. When a process of the program can repair the world (for example a fetch for a claim that data is fresh), it needs the trigger `{ on: event, kinds: [claim.failed], about: ["claim:<id>"] }`. Do not change the process yourself: name the command in the `summary` for the person: `flint ite process set "<program>" <process> --add-trigger --on claim.failed --on-about claim:<claim id>`. `--add-trigger` keeps the other triggers of the process; without it, the trigger flags replace each trigger. With no such process, the keeper of the first part proposes a change of the model when the claim fails. A claim names no fix.
9. Once the claim and its check are selected, progress to the next stage.

## Stage 3: Write the Claim and Its Check

1. Run `flint orbh session set phase writing`.
2. Make the claim and its check:

   ```bash
   flint ite claim new "<program>" <id> --about <ref>... --title "<the claim in one sentence>" [--owner "[[@Name]]"] [--fresh-for <d>] \
     --by code|agent|person [--runtime node|python] [--reads <ref>...] [--prompt "<request>"] [--task "<question>"] [--who person:<Name>] \
     [--every <d> | --cron "<e>"] [--text "<prose>"]
   ```

   It writes `Steel/Programs/<program>/Reality/<id>/claim.md` (`steel-claim/2`) and the check process as a draft: `Processes/check-<id>/dev/process.md` (with a stub `check.js` for a code check). It records you in the activity. It refuses an id that is not a slug, an id that exists, and a reference that names nothing in the program: repair the input and run it again. The CLI is the truth: check the flags with `--help`.
3. Complete `claim.md` with the form of [[tmp-ite-claim-v0.1]]: the prose (why it matters, what the check reads, and what a person does when it fails). The keys stay exactly `format`, `id`, `about`, `kept-by`, `owner`, and `fresh-for`.
4. Write the check in the draft folder `Processes/check-<id>/dev/`:
   - `code`: the entry `check.js` (`runtime: node`), or `check.py` with `runtime: python`. It reads only. It prints one JSON line for each verdict (`state`, `part`, `values`, `summary`, `evidence`), and one `error` line when it cannot read its source.
   - `agent`: the `prompt` of the check process: what the agent reads, and when the claim holds or fails.
   - `person`: the `task` of the check process: what Steel asks the person, and `who` when one person knows.
5. Run `flint ite claim list "<program>"` and `flint ite process check "<program>" check-<id>`. Repair each problem of the claim and of its check: a claim with a problem does not check.
6. Once the claim and its check are written, progress to the next stage.

## Stage 4: Test the Check and Propose Its Promote

1. Run `flint orbh session set phase checking`.
2. A code check: test it with `flint ite claim test "<program>" <id>`. Each line must pass the door, and the exit must be 0. Repair the code and test again. Never leave a check that you did not test.
3. An agent check: `flint ite claim test` has no code to test. Read one time what its `prompt` names, as Stage 3 of [[hwkfl-ite-observe]] does, to see that the prompt can decide. Write what you saw in the `summary`. Do not report it: a draft check takes no result.
4. A person check: test nothing. Steel asks the person after the promote.
5. Propose the promote of the check: `flint ite process promote "<program>" check-<id> --reason "<the claim in one sentence>"`. It writes one revision. The claim counts only after a person applies it (D5): until then it is `unchecked`. Never apply it.
6. Run `flint ite check "<program>"`. Repair each `claim-invalid`, `process-invalid`, and `unknown-reference` finding of the claim and its check.
7. A check that gives `error` in the test has a wrong form: repair it, and test it again. A claim that fails in the test is not an error of the workflow: it is a fact for the person.
8. Once the check passed its test and its promote waits for the person, progress to the next stage.

## Stage 5: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: the claim id, the form of its check, what the test of the check saw, the id of the promote revision that waits for the person, and the process that repairs the world when the claim fails (or "the keeper changes the model"). Use no `'` character.
3. End the job with the result, and nothing else:

   ```bash
   flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

   When you added no claim, the `summary` starts with `No change:` and gives the reason.

# Output

- One claim in `Steel/Programs/<program>/Reality/<id>/claim.md`, and its check `Processes/check-<id>/` as a draft, tested
- One revision that proposes the promote of the check, for the person
- One activity record of `flint ite claim new`
- One `steel-result/1` JSON value as the result of the job
