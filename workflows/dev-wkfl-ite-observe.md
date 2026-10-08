---
description: "Check claims against reality now: run the code checks, do each agent check and report it through the door, ask the person each person check, and report each claim that fails"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Observe

Check the claims of a program against reality now, and record what the checks see. Each result goes through the one door (`flint ite claim report`, or Check now) into the log of this machine: you never write one into a file. The claims, their checks, and the grounding are in Claims and Checks of [[init-ite]].

# Input

- The program
- (Optional) The part ids. With no part: each claim of the program.
- (Optional) The claims to check.

# Actions

## Stage 1: Read the Claims

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the claims: `flint ite claim list "<program>"` (with `--part <id>` for one part). For each claim, note its mode, its form, its parts, its state, and the age of its newest result.
3. Sort the claims in three lists: the code checks (`by: code`), the agent checks (`by: agent`), and the person checks (`by: person`). A claim with `by: none` has no check: note it for Stage 4.
4. Once the three lists are complete, progress to the next stage.

## Stage 2: Run the Code Checks

1. Run each one: `flint ite claim check "<program>" <id>`.
2. Read each result: the state, the part (when the check names parts), the values, and the summary.
3. A check that gives `error` has a wrong form or cannot read its source on this machine. Note it for Stage 4.
4. Once each check is done, progress to the next stage.

## Stage 3: Do the Agent Checks

You are the agent of each agent check in this session. For each one:

1. Set the focus on its parts.
2. Do what its `prompt` asks: read the notes, the files, or the pages that it names. Only read: do not change the world to make a claim true.
3. Decide the state: `holds` when what you saw answers yes, `fails` when it answers no, `error` when you could not check it.
4. Report it through the door, one command for the claim, or one for each part when the claim is about many parts:
   ```bash
   flint ite claim report "<program>" <claim id> --state holds|fails|error --summary "<one to three sentences: what you saw>" [--part <part id>] [--value <name>=<value>]... [--evidence note="<note name>"] [--evidence url=<url>]
   ```
5. Once each agent check has its result, progress to the next stage.

## Stage 4: Report

1. Ask the person each person check: the claim, its `question`, and its parts. Report each answer that the person gives in the session with `flint ite claim report "<program>" <claim id> --state holds|fails --summary "<what the person saw>"`, with the words of the person in the summary. Report nothing that the person did not say. The person can also answer in Steel.
2. Read the claims again: `flint ite claim list "<program>"` and `flint ite map "<program>"`.
3. Show the person each claim that fails, with its meaning: an `is` claim that fails is drift (the model is out of date); an `ought` claim that fails is at risk (the world is off target), with its `fixed-by`. Show each claim with the state `error` and why, each `old` claim, and each claim with `by: none`.
4. Propose [[wkfl-ite-repair]] for the claims that fail. Do not run a process of `fixed-by`: the owner of the claim decides.
5. Once the person has the report, the workflow is done.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the counts of the claims that hold, fail, have an error, and wait for a person, and the claim that fails and matters most. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

# Output

- Results in the log of this machine, recorded by `flint ite claim check` and `flint ite claim report`
- A report of each claim that fails, each old claim, each check with an error, and each person check that waits for the person
