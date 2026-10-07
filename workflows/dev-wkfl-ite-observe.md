---
description: "Check parts against reality now: run the code processes, do each agent process and report it through the door, ask the person each person check, and report each part that fails"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Observe

Check parts against reality now, and record what you see. Each observation goes through the one door (`flint ite process observe`) into the log of this machine: you never write one into a file. The processes and the grounding are in Processes and the Log of [[init-ite]].

# Input

- The program
- (Optional) The part ids. With no part: each part that a process checks.
- (Optional) The processes to run. A `command` process runs only when the person names it.

# Actions

## Stage 1: Read the Processes

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the processes: `flint ite process list "<program>"` (with `--part <id>` for one part). For each process, note its form, its parts, its state for each part, and whether it is late.
3. Sort the processes in three lists: the code processes (`by: code`), the agent processes (`by: agent`), and the person checks (`by: person`).
4. Ask the person whether the `command` processes run now, when there are any. Show each command line first (`flint ite process show "<program>" <id>`).
5. Once the three lists are complete, progress to the next stage.

## Stage 2: Run the Code Processes

1. Run each one: `flint ite process run "<program>" <id>`. Run a `command` process only when the person agreed in Stage 1.
2. Read each result: the status, and each observation with its part, its state, and its summary.
3. A process that gives `error` or the status `failed` has a wrong form or cannot run on this machine. Note it for Stage 4.
4. Once each run is done, progress to the next stage.

## Stage 3: Do the Agent Processes

You are the agent of each `agent` process in this session. For each one:

1. Set the focus on its parts.
2. Do what its `prompt` asks: read the notes, the files, or the pages that it names. Do not change the world to make a claim true.
3. Decide the state for each part: `holds` when what you saw answers yes, `fails` when it answers no, `error` when you could not check it.
4. Report it through the door, one command for each part:
   ```bash
   flint ite process observe "<program>" <process id> --part <part id> --state holds|fails|error --summary "<one to three sentences: what you saw>" [--claim <claim id>] [--evidence note="<note name>"] [--evidence url=<url>]
   ```
5. Once each agent process has an observation for each part, progress to the next stage.

## Stage 4: Report

1. Ask the person each person check: the part, the claim of the process, and its `who`. Report each answer that the person gives in the session with `flint ite process observe "<program>" <process id> --part <part id> --state holds|fails --summary "<what the person saw>"`, with the words of the person in the summary. Report nothing that the person did not say. The person can also answer in Steel, in the panel Reality of the part.
2. Read the grounding again: `flint ite map "<program>"` and `flint ite process list "<program>"`.
3. Show the person each part that is `failing` or `stale`, with the process, its claim, and what the check saw. Show each process with the state `error` and why, and each process that is late.
4. Propose [[wkfl-ite-repair]] for the parts that fail.
5. Once the person has the report, the workflow is done.

# Output

- Observations in the log of this machine, recorded by `flint ite process run` and `flint ite process observe`
- A report of each part that fails, each stale part, each late process, and each person check that waits for the person
