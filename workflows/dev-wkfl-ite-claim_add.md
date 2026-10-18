---
description: "Add one claim about the selected parts from the words of a person: a test of what must be true now, with its check process (code, an agent, or a person) selected with the person, made with flint ite claim new as a draft, tested, promoted by the person, and run one time; in a headless session, the promote of the check is proposed for the person, and the result is one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Claim Add

Add one claim to a program: what must be true now, about the selected parts, with its check process `Processes/check-<id>/`. The person says what must be true, and you write the claim and its check, and test the check. The person applies the promote of the check, and then you run it one time. The form is in Claims and Checks of [[knw-ite-state]] and in [[tmp-ite-claim-v0.1]].

> [!headless]
> A headless agent session follows this workflow for a job of the action `claim-add` ("+ Add a claim" in the Workbench), with no person in the session. Do each stage, and follow the `> [!headless]` callout in it. The rules of a headless session are in [[init-ite#Headless]].
> - The focus of this job: the selected parts.
> - The job ends with one `steel-result/1` JSON value, as the callout of The End of a Job says.

# Input

- The program
- The selected parts: the parts that the claim is about. With no part, find the parts from the words of the person.
- The words of the person: what must be true now, and optionally the form of the check ("I check it myself")

> [!headless]
> - The words of the person are the text of the person in the job. With no selected part, select the parts from that text.
> - The text can name the form of the check ("a person checks it", "an agent reads the sheet").

# Actions

## Stage 1: Read the Parts

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the map (`flint ite map "<program>" --json`) and the claims of the parts (`flint ite claim list "<program>" --part <id>`).
3. Read the note of each part, and the sources that the note names.
4. With no selected part, find the parts that the person names in the map. When no part fits, propose [[wkfl-ite-parts_add]] first: a claim names at least one part.
5. When a claim of the parts already says the same thing, show it to the person, and ask: use it, or add a new claim.
6. When the words of the person can have two meanings, ask the person one question.
7. Once you know the parts and what must be true, progress to the next stage.

> [!headless]
> - Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]). Then run `flint orbh session set phase reading`.
> - Read the claims of each part with `flint ite claim list "<program>" --part <id> --json`.
> - With no selected part, find the parts that the text of the person names in the map. When no part fits, stop: end the job as the callout of The End of a Job says, with a `summary` that starts with `No change:` and gives the next step "add the part first (the action parts-add)". A claim names at least one part.
> - When a claim of the parts already says what the text says, add no claim: end the job with a `summary` that starts with `No change:` and gives the id of that claim.
> - Do not wait for a person, and ask no question. When the text can have two meanings, select the reading that best helps the person, and write it in the `summary` (rule 3 of [[init-ite#Headless]]).

## Stage 2: Select the Claim and Its Check

1. Write the claim as one sentence, in the words of the person, about now. A claim is a test of reality: it never states a goal, a target with a date, or a prediction. When the person gives a goal or a plan, say so, and offer a part of the type `goal` or a future note in place of a claim.
2. Select the form of the check with the table of Stage 2 of [[wkfl-ite-ground]]. Prefer `code` when code can read the source. Use `agent` when a reading decides, and `person` when only a person knows or when no other check is possible now ("Is this true now: <the claim>?"). The person can ask for a person check: write the form that the person asks for.
3. A check touches reality outside the model. Code that only finds a part of this program proves only that the model has the part: do not write it.
4. Select a short slug `id` (`hall-booked`). Check that it is free: `flint ite claim show "<program>" <id>` refuses with `not-found`. The check gets the id `check-<id>`.
5. Select `fresh-for`, and an `owner` when the owner of the first part does not answer for the claim. When the check needs a value of the world, name the data that it reads (`--reads`), or make that data first with its maker ([[tmp-ite-data-v0.1]]).
6. Ask the person which side changes when the claim fails. When a process of the program repairs the world, it gets the trigger `{ on: event, kinds: [claim.failed], about: ["claim:<id>"] }`. Else the keeper of the first part proposes a change of the model. A claim names no fix. When the person agrees that a process repairs the world, change the process. Add the trigger, and keep the other triggers of the process: `flint ite process set "<program>" <process> --add-trigger --on claim.failed --on-about claim:<claim id>` (add `--dry-run` first: it prints the new `process.md`). Without `--add-trigger`, the trigger flags replace each trigger of the process.
7. Show the person the claim: the sentence, the form of the check, the parts, what the check reads, and which side changes when it fails. Ask: write it, or change it.
8. Once the person agrees, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase planning`.
> - Write the claim as one sentence for a person, in the words of the person, about now: "The hall is booked for the night". "80 people come" and "We ship by 5 November" are not claims. When the text of the person gives a goal or a plan, write no claim: end the job as the callout of The End of a Job says, with a `summary` that starts with `No change:`, and name a part of the type `goal` or a future note as the next step for the person.
> - The form of the check: `code` first, when code can read the source: a file, a page, an API, a command, or a count of records. `agent` when a reading decides, and code cannot decide it. `person` when only a person knows, when no other check is possible now, or when the text of the person asks for a person check. The task of a person check is "Is this true now: <the claim>?".
> - The `id` is a short, readable slug. `flint ite claim show "<program>" <id>` must refuse with `not-found`.
> - Select `fresh-for` when reality changes (`12h` for a status, `7d` for a plan). Select an `owner` when the owner of the first part is not the person who answers for the claim.
> - When the check needs a value of the world, read it as data: `flint ite data list "<program>"`. Name the data in `--reads`. When the data does not exist, make it first with its maker ([[tmp-ite-data-v0.1]]).
> - Do not ask the person which side changes. Read `flint ite process list "<program>"`. When a process of the program can repair the world (for example a fetch for a claim that data is fresh), it needs the trigger `{ on: event, kinds: [claim.failed], about: ["claim:<id>"] }`. Do not change the process yourself: name the command in the `summary` for the person: `flint ite process set "<program>" <process> --add-trigger --on claim.failed --on-about claim:<claim id>`. `--add-trigger` keeps the other triggers of the process; without it, the trigger flags replace each trigger. With no such process, the keeper of the first part proposes a change of the model when the claim fails. A claim names no fix.
> - Do not show the claim to a person, and do not wait for a person. Once the claim and its check are selected, progress to the next stage.

## Stage 3: Write the Claim and Its Check

1. Make the claim and its check:

   ```bash
   flint ite claim new "<program>" <id> --about <ref>... --title "<the claim in one sentence>" [--owner "[[@Name]]"] [--fresh-for <d>] \
     --by code|agent|person [--runtime node|python] [--reads <ref>...] [--prompt "<request>"] [--task "<question>"] [--who person:<Name>] \
     [--every <d> | --cron "<e>"] [--text "<prose>"]
   ```

   It writes `Steel/Programs/<program>/Reality/<id>/claim.md` (`steel-claim/2`) and the check as a draft: `Processes/check-<id>/dev/process.md` (with a stub `check.js` for a code check). A refusal (an id that is not a slug, an id that exists, a reference that names nothing in the program) writes nothing: repair the input. The CLI is the truth: check the flags with `--help`.
2. Complete `claim.md` with the form of [[tmp-ite-claim-v0.1]]: the prose. The keys stay exactly `format`, `id`, `about`, `kept-by`, `owner`, and `fresh-for`.
3. Write the check in the draft folder: the code (`check.js` with `runtime: node`, or `check.py` with `runtime: python`) for `code`, the `prompt` for `agent`, or the `task` for `person`. A code check reads only, and prints one JSON line for each verdict.
4. Run `flint ite claim list "<program>"` and `flint ite process check "<program>" check-<id>`. Repair each problem of the claim and its check.
5. Once the claim and its check are written, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase writing`.
> - `flint ite claim new` records you in the activity. When it refuses, repair the input and run it again.
> - The prose of `claim.md`: why it matters, what the check reads, and what a person does when it fails.
> - The check in the draft folder `Processes/check-<id>/dev/`:
>   - `code`: the entry `check.js` (`runtime: node`), or `check.py` with `runtime: python`. It reads only. It prints one JSON line for each verdict (`state`, `part`, `values`, `summary`, `evidence`), and one `error` line when it cannot read its source.
>   - `agent`: the `prompt` of the check process: what the agent reads, and when the claim holds or fails.
>   - `person`: the `task` of the check process: what Steel asks the person, and `who` when one person knows.
> - Repair each problem of the claim and of its check: a claim with a problem does not check.

## Stage 4: Test, Promote, and Run the Check One Time

1. A code check: show the person the code. Test it with `flint ite claim test "<program>" <id>`: each line must pass the door. Repair and test again.
2. Propose the promote of the check: `flint ite process promote "<program>" check-<id> --reason "<the claim in one sentence>"`. Show the person the revision id. The person applies it (`flint ite revision apply "<program>" <revision id>`, or in Steel). The claim counts only after the apply. Never apply it yourself.
3. After the person applied the promote, run the check one time:
   - A code check: `flint ite claim check "<program>" <id>`.
   - An agent check: `flint ite claim check "<program>" <id>`. It starts one agent session that reports through the door.
   - A person check: ask the person the `task` now, and report the answer with `flint ite claim report "<program>" <id> --state holds|fails --summary "<the words of the person>"`. The person can also answer in Steel.
4. Run `flint ite check "<program>"`. Repair each `claim-invalid`, `process-invalid`, and `unknown-reference` finding of the claim and its check.
5. Show the person the state of the claim and what the check saw. A claim that fails is a fact for the person, not an error of the workflow.
6. Once the check ran one time (or its promote waits for the person), the workflow is done.

> [!headless]
> - Run `flint orbh session set phase checking`.
> - A code check: do not show the code to a person. Test it with `flint ite claim test "<program>" <id>`. Each line must pass the door, and the exit must be 0. Repair the code and test again. Never leave a check that you did not test.
> - An agent check: `flint ite claim test` has no code to test. Read one time what its `prompt` names, as Stage 3 of [[wkfl-ite-observe]] does, to see that the prompt can decide. Write what you saw in the `summary`. Do not report it: a draft check takes no result.
> - A person check: test nothing. Steel asks the person after the promote.
> - Propose the promote. It writes one revision. The claim counts only after a person applies it (D5): until then it is `unchecked`. Never apply it. Do not wait for the apply, and do not run the check one time (step 3): the promote waits for the person.
> - A check that gives `error` in the test has a wrong form: repair it, and test it again. A claim that fails in the test is not an error of the workflow: it is a fact for the person.
> - Once the check passed its test and its promote waits for the person, end the job as the callout of The End of a Job says.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the claim id, the form of its check, the promote (applied, or the revision id that waits), its state now, and what the check saw. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

> [!headless]
> A headless session does not end the job in the chat, and does not wait for the person. It returns the result:
> 1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[init-ite#Headless]]. When an item fails, go back to its stage: do not return with an item open.
> 2. Write the `summary`: the claim id, the form of its check, what the test of the check saw, the id of the promote revision that waits for the person, and the process that repairs the world when the claim fails (or "the keeper changes the model"). Use no `'` character.
> 3. End the job with the result, and nothing else:
>
>    ```bash
>    flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
>    ```
>
>    When you added no claim, the `summary` starts with `No change:` and gives the reason.

# Output

- One claim in `Steel/Programs/<program>/Reality/<id>/claim.md`, and its check `Processes/check-<id>/`, tested, and promoted by the person
- The first result of the check in the log of this machine, after the promote

> [!headless]
> - The check `Processes/check-<id>/` stays a draft, tested.
> - One revision that proposes the promote of the check, for the person
> - One activity record of `flint ite claim new`
> - One `steel-result/1` JSON value as the result of the job
