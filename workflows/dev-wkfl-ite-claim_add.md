---
description: "Add one claim about the selected parts from the words of a person: select its mode and the form of its check with the person, make it with flint ite claim new, write the check, test it, and run it one time"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Claim Add

Add one claim to a program: what must be true, about the selected parts, with its check. The person says what must be true, and you write the claim and its check, test the check, and run it one time. The form is in Claims and Checks of [[init-ite]] and in [[tmp-ite-claim-v0.1]].

# Input

- The program
- The selected parts: the parts that the claim is about. With no part, find the parts from the words of the person.
- The words of the person: what must be true, and optionally the form of the check ("I check it myself")

# Actions

## Stage 1: Read the Parts

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the map (`flint ite map "<program>" --json`) and the claims of the parts (`flint ite claim list "<program>" --part <id>`).
3. Read the note of each part, and the sources that the note names.
4. With no selected part, find the parts that the person names in the map. When no part fits, propose [[wkfl-ite-parts_add]] first: a claim names at least one part.
5. When a claim of the parts already says the same thing, show it to the person, and ask: keep it, or add a new claim.
6. When the words of the person can have two meanings, ask the person one question.
7. Once you know the parts and what must be true, progress to the next stage.

## Stage 2: Select the Claim and Its Check

1. Write the claim as one sentence, in the words of the person.
2. Select the mode: `is` (a description: a failure means that the model is out of date), `ought` (a goal or a limit: a failure means that the world is off target), or `will` (a prediction, with `p` and `resolves`).
3. Select the form of the check with the table of Stage 2 of [[wkfl-ite-ground]]. Prefer `code` when code can read the source. Use `agent` when a reading decides, and `person` when only a person knows. The person can ask for a person check (`by: person`): write the form that the person asks for.
4. A check touches reality outside the model. Code that only finds a part of this program proves only that the model has the part: do not write it.
5. Select a short slug `id` (`hall-booked`). Check that it is free: `flint ite claim show "<program>" <id>` refuses with `not-found`.
6. Select `fresh-for`, an `owner` for an `ought` claim, and `fixed-by` when a process of the program can make it true.
7. Show the person the claim: the sentence, the mode, the form, the parts, and what the check reads. Ask: write it, or change it.
8. Once the person agrees, progress to the next stage.

## Stage 3: Write the Claim and Its Check

1. Make the claim:

   ```bash
   flint ite claim new "<program>" <id> --about <part id>... --mode is|ought|will --by code|agent|person|none --title "<the claim in one sentence>" [--text "<prose>"] [--p <0 to 1> --resolves <YYYY-MM-DD>]
   ```

   It writes `Steel/Programs/<program>/Reality/<id>/claim.md` from the form. A refusal (an id that is not a slug, an id that exists, a part that is not a part of the program, a `will` claim with no `--resolves`) writes nothing: repair the input.
2. Complete `claim.md` with the form of [[tmp-ite-claim-v0.1]]: the prose, `fresh-for`, `owner`, `fixed-by`, and `p` and `resolves` for a `will` claim.
3. Write the check: the code (`check.js` with `runtime: node`, or `check.py` with `runtime: python`) for `code`, the `prompt` for `agent`, or the `question` for `person`. A code check reads only, and prints one JSON line for each result.
4. Run `flint ite claim list "<program>"`. Repair each problem of the claim.
5. Once the claim and its check are written, progress to the next stage.

## Stage 4: Test and Run the Check One Time

1. A code check: show the person the code. Test it with `flint ite claim test "<program>" <id>`: each line must pass the door. Repair and test again. Then run it one time with `flint ite claim check "<program>" <id>`, when the person agreed to its code.
2. An agent check: run it one time with `flint ite claim check "<program>" <id>`. It starts one agent session that reports through the door.
3. A person check: ask the person the `question` now, and report the answer with `flint ite claim report "<program>" <id> --state holds|fails --summary "<the words of the person>"`. The person can also answer in Steel.
4. Run `flint ite check "<program>"`. Repair each `claim-invalid` and `claim-fixed-by` finding of the claim.
5. Show the person the state of the claim and what the check saw. A claim that fails is a fact for the person, not an error of the workflow.
6. Once the check ran one time (or waits for the person), the workflow is done.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the claim id, its mode and its form, its state now, and what the check saw. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

# Output

- One claim in `Steel/Programs/<program>/Reality/<id>/`, with its check, tested and run one time
- The first result of the check in the log of this machine
