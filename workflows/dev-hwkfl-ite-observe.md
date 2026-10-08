---
description: "Headless: run the code processes of parts, do each agent process and report it through the door, list each person check, and return one steel-result/1 JSON value with each part that fails"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Observe (Headless)

Check parts against reality now, with no person in the session. Each observation goes through the one door (`flint ite process observe`) into the log of this machine: you never write one into a file. The processes and the grounding are in Processes and the Log of [[init-ite]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program
- The selected parts. With no part: each part that a process checks.
- (Optional) The instructions of the person: the processes to run. A `command` process runs only when the instructions name it.

# Actions

## Stage 1: Read the Processes

1. Run the `flint ite focus` command of the prompt ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the processes: `flint ite process list "<program>" --json` (with `--part <id>` for one part). For each process, note its form, its parts, and its state for each part.
4. Sort the processes: the code processes, the agent processes, and the person checks.
5. Once the three lists are complete, progress to the next stage.

## Stage 2: Run the Code Processes

1. Run `flint orbh session set phase running`.
2. Run each one: `flint ite process run "<program>" <id> --json`. Run a `command` process only when the instructions name it.
3. Keep the counts: holds, fails, error, and the runs that failed (with the message).
4. Once each run is done, progress to the next stage.

## Stage 3: Do the Agent Processes

For each `agent` process:

1. Set the focus on its parts.
2. Do what its `prompt` asks, by reading only. Do not change the world to make a claim true.
3. Report it through the door, one command for each part: `flint ite process observe "<program>" <process id> --part <part id> --state holds|fails|error --summary "<what you saw>" [--claim <claim id>] [--evidence kind=value]`. In an Orbh session, the door records you as `agent:<session id>`.
4. Once each agent process has an observation for each part, progress to the next stage.

## Stage 4: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Read the grounding again (`flint ite map "<program>" --json`).
3. Write the `summary`: the counts ("9 processes hold, 2 fail, 1 error, 3 wait for a person."), then the part that fails and matters most, with what the check saw. Do not answer a person check: the person answers it in Steel. Use no `'` character.
4. End the turn with the result, and nothing else:

   ```bash
   flint orbh session return --finish '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

# Output

- Observations in the log of this machine, recorded by `flint ite process run` and `flint ite process observe`
- One `steel-result/1` JSON value as the result of the turn
