---
description: "Headless: write the claims of parts with their checks in Steel/Programs/<program>/Reality/, run each check one time, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Ground (Headless)

Give parts their claims, with no person in the session. The form is in Claims and Checks of [[init-ite]] and in [[tmp-ite-claim-v0.1]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program
- The selected parts. With no part: each part of the map with the grounding `no-claim` that is not of the type `note`, and each claim with `by: none`.
- (Optional) The instructions of the person: the sources to use, or the forms to prefer

# Actions

## Stage 1: Read the Parts

1. Run the `flint ite focus` command of the prompt ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the map (`flint ite map "<program>" --json`) and the claims (`flint ite claim list "<program>" --json`). For an OrbCode program, stop: return `No change:` with the next step "use the OrbCode shard and Orbtest" (rule 6 of [[hinit-ite]]).
4. For each part, read its note and write its claim in one sentence, with its mode (`is`, `ought`, or `will`). Skip a part that makes no claim, and keep it for the `summary`.
5. Once each selected part has its claim, progress to the next stage.

## Stage 2: Find the Checks

1. Run `flint orbh session set phase grounding`.
2. For each claim, select the form with the table of Stage 2 of [[wkfl-ite-ground]]. Prefer code: a short script in the claim folder. When one check answers for many parts, plan one claim with each of those parts in `about`, and a check that prints one result for each part.
3. Set the focus on the part that you work on. The check judges (`holds`, `fails`, or `error`, with the values as evidence), and it only reads: never write a check that changes the world.
4. A check touches reality outside the model. Code that only finds a part of this program (for example the part of a person, to prove a role) proves only that the model has the part: do not write it. Code can count records of the work or of the world: tasks, meetings, reports, or the `status` that a person writes on a part.
5. When no check is possible, write the claim with `by: none`, and keep it for the `summary`.
6. Once each claim has its check or its gap, progress to the next stage.

## Stage 3: Write and Check

1. Run `flint orbh session set phase writing`.
2. Write each claim: `Steel/Programs/<program>/Reality/<id>/claim.md` with the form of [[tmp-ite-claim-v0.1]], and its code in the same folder. Give it a short, readable `id` (`hall-booked`): the person reads it in the Workbench. Name the parts by their ids, never by their titles.
3. Run `flint ite claim list "<program>"`, and repair each claim that shows a problem.
4. Test each code check before you keep it: `flint ite claim test "<program>" <id>`. Never keep a check that you did not test.
5. Run `flint orbh session set phase checking`. Run each code check one time: `flint ite claim check "<program>" <id> --json`. This step is required: before it, each new claim is `unchecked`, and the person sees no grounding. Take the counts of the `summary` from these checks, not from your own reading. Do not run an agent check or a person check: the person starts them in Steel.
6. Run `flint ite check "<program>"`. Repair each `claim-invalid` and `claim-fixed-by` finding.
7. Once each claim is written and each code check ran, progress to the next stage.

## Stage 4: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: the count of the new claims by form, the count that hold now, the count that fail now, and the parts with no possible check. Use no `'` character.
3. End the turn with the result, and nothing else (`candidate_id` is the candidate of a view, else null):

   ```bash
   flint orbh session return --finish '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

# Output

- Claims in `Steel/Programs/<program>/Reality/`, each with its check, and the first results of the code checks
- One `steel-result/1` JSON value as the result of the turn
