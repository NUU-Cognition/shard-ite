---
description: "Headless: run the code checks of the claims of a program, do each agent check and report it through the door, list each person check, and return one steel-result/1 JSON value with each claim that fails"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Observe (Headless)

Check the claims of a program against reality now, with no person in the session. Each result goes through the one door (`flint ite claim report`, or `flint ite claim check`) into the log of this machine: you never write one into a file. The claims and the grounding are in Claims and Checks of [[init-ite]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program
- The selected parts. With no part: each claim of the program.
- (Optional) The instructions of the person: the claims to check.

# Actions

## Stage 1: Read the Claims

1. Run the `flint ite focus` command of the prompt ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the claims: `flint ite claim list "<program>" --json` (with `--part <id>` for one part). For each claim, note its mode, its form, its parts, and its state.
4. Sort the claims: the code checks, the agent checks, and the person checks. Keep each claim with `by: none` for the `summary`.
5. Once the lists are complete, progress to the next stage.

## Stage 2: Run the Code Checks

1. Run `flint orbh session set phase running`.
2. Run each one: `flint ite claim check "<program>" <id> --json`.
3. Keep the counts: holds, fails, error, and the checks that could not run (with the message).
4. Once each check is done, progress to the next stage.

## Stage 3: Do the Agent Checks

For each agent check:

1. Set the focus on its parts.
2. Do what its `prompt` asks, by reading only. Do not change the world to make a claim true.
3. Report it through the door: `flint ite claim report "<program>" <claim id> --state holds|fails|error --summary "<what you saw>" [--part <part id>] [--value <name>=<value>]... [--evidence kind=value]`. In an Orbh session, the door records you as `agent:<session id>`.
4. Once each agent check has its result, progress to the next stage.

## Stage 4: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Read the claims again (`flint ite claim list "<program>" --json`).
3. Write the `summary`: the counts ("9 claims hold, 2 fail, 1 error, 3 wait for a person."), then the claim that fails and matters most, with its meaning (drift for `is`, at risk for `ought` with its `fixed-by`) and what the check saw. Do not answer a person check: the person answers it in Steel. Do not run a process. Use no `'` character.
4. End the turn with the result, and nothing else:

   ```bash
   flint orbh session return --finish '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

# Output

- Results in the log of this machine, recorded by `flint ite claim check` and `flint ite claim report`
- One `steel-result/1` JSON value as the result of the turn
