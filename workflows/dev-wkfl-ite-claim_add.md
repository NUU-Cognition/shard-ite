---
description: "Add one claim about the selected parts from the words of a person: a test of what must be true now, with its check process (code, an agent, or a person) selected with the person, made with flint ite claim new as a draft, tested, promoted by the person, and run one time"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Claim Add

Add one claim to a program: what must be true now, about the selected parts, with its check process `Processes/check-<id>/`. The person says what must be true, and you write the claim and its check, and test the check. The person applies the promote of the check, and then you run it one time. The form is in Claims and Checks of [[knw-ite-state]] and in [[tmp-ite-claim-v0.1]].

# Input

- The program
- The selected parts: the parts that the claim is about. With no part, find the parts from the words of the person.
- The words of the person: what must be true now, and optionally the form of the check ("I check it myself")

# Actions

## Stage 1: Read the Parts

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the map (`flint ite map "<program>" --json`) and the claims of the parts (`flint ite claim list "<program>" --part <id>`).
3. Read the note of each part, and the sources that the note names.
4. With no selected part, find the parts that the person names in the map. When no part fits, propose [[wkfl-ite-parts_add]] first: a claim names at least one part.
5. When a claim of the parts already says the same thing, show it to the person, and ask: use it, or add a new claim.
6. When the words of the person can have two meanings, ask the person one question.
7. Once you know the parts and what must be true, progress to the next stage.

## Stage 2: Select the Claim and Its Check

1. Write the claim as one sentence, in the words of the person, about now. A claim is a test of reality: it never states a goal, a target with a date, or a prediction. When the person gives a goal or a plan, say so, and offer a part of the type `goal` or a future note in place of a claim.
2. Select the form of the check with the table of Stage 2 of [[wkfl-ite-ground]]. Prefer `code` when code can read the source. Use `agent` when a reading decides, and `person` when only a person knows or when no other check is possible now ("Is this true now: <the claim>?"). The person can ask for a person check: write the form that the person asks for.
3. A check touches reality outside the model. Code that only finds a part of this program proves only that the model has the part: do not write it.
4. Select a short slug `id` (`hall-booked`). Check that it is free: `flint ite claim show "<program>" <id>` refuses with `not-found`. The check gets the id `check-<id>`.
5. Select `fresh-for`, and an `owner` when the owner of the first part does not answer for the claim. When the check needs a value of the world, name the data that it reads (`--reads`), or make that data first with its maker ([[tmp-ite-data-v0.1]]).
6. Ask the person which side changes when the claim fails. When a process of the program repairs the world, it gets the trigger `{ on: event, kinds: [claim.failed], about: ["claim:<id>"] }` (`flint ite process set "<program>" <process> --on claim.failed --on-about claim:<id>`). Else the keeper of the first part proposes a change of the model. A claim names no fix.
7. Show the person the claim: the sentence, the form of the check, the parts, what the check reads, and which side changes when it fails. Ask: write it, or change it.
8. Once the person agrees, progress to the next stage.

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

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the claim id, the form of its check, the promote (applied, or the revision id that waits), its state now, and what the check saw. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

# Output

- One claim in `Steel/Programs/<program>/Reality/<id>/claim.md`, and its check `Processes/check-<id>/`, tested, and promoted by the person
- The first result of the check in the log of this machine, after the promote
