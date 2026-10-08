---
description: "Headless: add one claim about the selected parts from the words of a person: select its mode and the form of its check, make it with flint ite claim new, write the check, test it, run it one time, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Claim Add (Headless)

Add one claim to a program: what must be true, about the selected parts, with its check. A headless agent session follows this workflow for a job of the action `claim-add` ("+ Add a claim" in the Workbench), with no person in the session. The form is in Claims and Checks of [[init-ite]] and in [[tmp-ite-claim-v0.1]]. The rules of a headless session are in [[hinit-ite]].

The focus of this job: the selected parts.

# Input

- The program
- The selected parts: the parts that the claim is about. With no part, select the parts from the text of the person.
- The text of the person: what must be true. It can name the form of the check ("a person checks it", "an agent reads the sheet").

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
2. Write the claim as one sentence for a person, in the words of the person: "At least 30 people RSVP by 5 November".
3. Select the mode. `is`: the parts describe the world, and a failure means that the model is out of date. `ought`: a goal or a limit, and a failure means that the world is off target. `will`: a prediction, with `p` (0 to 1) and `resolves` (a date in quotes).
4. Select the form of the check with the table of Stage 2 of [[wkfl-ite-ground]]:
   - `code` first, when code can read the source: a file, a page, an API, a command, or a count of records.
   - `agent` when a reading decides, and code cannot decide it.
   - `person` when only a person knows, or when the text of the person asks for a person check.
   - `none` only when no check is possible now. Say why in the prose.
5. A check touches reality outside the model. Code that only finds a part of this program proves only that the model has the part: do not write it.
6. Select the `id`: a short, readable slug (`hall-booked`). Check that it is free: `flint ite claim show "<program>" <id>` must refuse with `not-found`.
7. Select `fresh-for` when reality changes (`12h` for a status, `7d` for a plan), an `owner` for an `ought` claim, and `fixed-by` when a process of the program (`flint ite process list "<program>"`) can make an `ought` claim true.
8. Once the claim and its check are selected, progress to the next stage.

## Stage 3: Write the Claim and Its Check

1. Run `flint orbh session set phase writing`.
2. Make the claim:

   ```bash
   flint ite claim new "<program>" <id> --about <part id>... --mode is|ought|will --by code|agent|person|none --title "<the claim in one sentence>" [--text "<prose>"] [--p <0 to 1> --resolves <YYYY-MM-DD>]
   ```

   It writes `Steel/Programs/<program>/Reality/<id>/claim.md` from the form and records you in the activity. It refuses an id that is not a slug, an id that exists, a part that is not a part of the program, and a `will` claim with no `--resolves`: repair the input and run it again.
3. Complete `claim.md` with the form of [[tmp-ite-claim-v0.1]]: the prose (why it matters, what the check reads, and what a person does when it fails), `fresh-for`, `owner`, `fixed-by`, and `p` and `resolves` for a `will` claim. Keep `format`, `id`, `mode`, `about`, and `by`.
4. Write the check:
   - `code`: the entry `check.js` in the claim folder (`runtime: node`), or `check.py` with `runtime: python`. It reads only. It prints one JSON line for each result (`state`, `part`, `values`, `summary`, `evidence`), and one `error` line when it cannot read its source.
   - `agent`: the `prompt`: what the agent reads, and when the claim holds or fails.
   - `person`: the `question`: what Steel asks the person, and `who` when one person knows.
5. Run `flint ite claim list "<program>"`. Repair each problem of the claim: it does not check until its file is correct.
6. Once the claim and its check are written, progress to the next stage.

## Stage 4: Test and Run the Check One Time

1. Run `flint orbh session set phase checking`.
2. A code check: test it with `flint ite claim test "<program>" <id>`. Each line must pass the door, and the exit must be 0. Repair the code and test again. Never keep a check that you did not test. Then run it one time: `flint ite claim check "<program>" <id> --json`.
3. An agent check: `flint ite claim test` has no code to test. Do the check one time yourself, as Stage 3 of [[hwkfl-ite-observe]] does: read only what its `prompt` names, then report with `flint ite claim report "<program>" <id> --state holds|fails|error --summary "<what you saw>" [--part <part id>] [--value <name>=<value>]...`.
4. A person check: run `flint ite claim check "<program>" <id>` one time. It gives `pending`, and Steel asks the person the `question`. Do not answer it.
5. A claim with `by: none`: run no check.
6. Run `flint ite check "<program>"`. Repair each `claim-invalid` and `claim-fixed-by` finding of the claim.
7. A claim that fails now is not an error of the workflow: it is a fact for the person. A check that gives `error` has a wrong form: repair it, test it, and run it again.
8. Once the check ran one time (or waits for the person), progress to the next stage.

## Stage 5: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: the claim id, its mode and its form, its state now (from the check, not from your own reading), and what the check saw. Use no `'` character.
3. End the job with the result, and nothing else:

   ```bash
   flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

   When you added no claim, the `summary` starts with `No change:` and gives the reason.

# Output

- One claim in `Steel/Programs/<program>/Reality/<id>/`, with its check, tested and run one time
- One activity record of `flint ite claim new`, and the first result in the log of this machine
- One `steel-result/1` JSON value as the result of the job
