---
description: "Check claims against reality now: run the code checks, do each agent check and report it through the door, ask the person each person check, and report each claim that fails; in a headless session, list each person check, and return one steel-result/1 JSON value with each claim that fails"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Observe

Check the claims of a program against reality now, and record what the checks see. The check of each claim is a process (`kept-by` of the claim). Each result goes through the one door (`flint ite claim report`, or Check now) into the log of this machine: you never write one into a file. The claims, their checks, and the grounding are in Claims and Checks of [[knw-ite-state]]; the data that the checks read is in Data.

> [!headless]
> A headless agent session follows this workflow with no person in the session. Do each stage, and follow the `> [!headless]` callout in it. The rules of a headless session are in [[init-ite#Headless]].
> - Each result goes through the one door (`flint ite claim report`, or `flint ite claim check`) into the log of this machine.
> - The job ends with one `steel-result/1` JSON value, as the callout of The End of a Job says.

# Input

- The program
- (Optional) The part ids. With no part: each claim of the program.
- (Optional) The claims to check.

> [!headless]
> - The parts are the selected parts. With no part: each claim of the program.
> - (Optional) The instructions of the person: the claims to check.

# Actions

## Stage 1: Read the Claims

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the claims: `flint ite claim list "<program>"` (with `--part <id>` for one part). For each claim, note its check process, the form of the check, its parts, its state, and the age of its newest result.
3. Sort the claims in three lists by the form of the check: the code checks (`by: code`), the agent checks (`by: agent`), and the person checks (`by: person`). A claim whose check is a draft only takes no result until a person applies its promote: note it for Stage 4. A claim of a source, the claim `reviews-current`, and the claim `orbtest-proof` are normal claims with a check of a recipe: check them as each code check.
4. Read the data that the checks read: `flint ite data list "<program>"`. Note each piece of data that is old, has an error, or waits for a person.
5. Once the three lists are complete, progress to the next stage.

> [!headless]
> - Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]). Then run `flint orbh session set phase reading`.
> - Read the claims with `flint ite claim list "<program>" --json`, and the data with `flint ite data list "<program>" --json`.
> - Keep each claim whose check is a draft only for the `summary`: it takes no result until a person applies its promote.

## Stage 2: Run the Code Checks

1. Pull each external data that a check reads and that is old: `flint ite data pull "<program>" <id>` (one run of its maker). A pull only reads the source. The core pulls it by itself only when its maker is enabled on this machine. A pull that fails keeps the old value: note it for Stage 4.
2. Run each code check: `flint ite claim check "<program>" <id>` (one run of the check process).
3. Read each result: the state, the part (when the check names parts), the values, and the summary.
4. A check that gives `error` has a wrong form, cannot read its source on this machine, or reads data with no value. Note it for Stage 4.
5. Once each check is done, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase running`.
> - Give `--json` to each pull (`flint ite data pull "<program>" <id> --json`) and to each check (`flint ite claim check "<program>" <id> --json`). Keep each pull that failed for the `summary`.
> - Keep the counts: holds, fails, error, and the checks that could not run (with the message).

## Stage 3: Do the Agent Checks

You are the agent of each agent check in this session. For each one:

1. Set the focus on its parts.
2. Do what the `prompt` of its check process asks (`flint ite process show "<program>" check-<claim id>`): read the notes, the files, or the pages that it names, and the data of its `reads` (`flint ite data show "<program>" <id>`). Only read: do not change the world to make a claim true.
3. Decide the state: `holds` when what you saw answers yes, `fails` when it answers no, `error` when you could not check it.
4. Report it through the door, one command for the claim, or one for each part when the claim is about many parts:
   ```bash
   flint ite claim report "<program>" <claim id> --state holds|fails|error --summary "<one to three sentences: what you saw>" [--part <part id>] [--value <name>=<value>]... [--evidence note="<note name>"] [--evidence url=<url>]
   ```
5. Once each agent check has its result, progress to the next stage.

> [!headless]
> - Read the values of the `reads` with `flint ite data show "<program>" <id> --json`.
> - The door also takes `--evidence kind=value`. In an Orbh session, the door records you as `agent:<session id>`.

## Stage 4: Report

1. Ask the person each person check: the claim, the `task` of its check, and its parts. Report each answer that the person gives in the session with `flint ite claim report "<program>" <claim id> --state holds|fails --summary "<what the person saw>"`, with the words of the person in the summary. Ask the person each data that waits for a person (a person maker): the `task` of its maker. Report each value that the person gives with `flint ite data report "<program>" <id> --value <value>`. Report nothing that the person did not say. The person can also answer in Steel.
2. Read the claims again: `flint ite claim list "<program>"` and `flint ite map "<program>"`.
3. Show the person each claim that fails, with its `on_fail` (`flint ite claim show "<program>" <id>`): "repair by <process>" (a process with an event trigger on its `claim.failed` repairs the world) or "change the model: <keeper>" (the claim says what the system is, and the system is now different). Show each claim with the state `error` and why, each `old` claim (with the data that made it old) each pull that failed, and each claim whose check waits for its promote.
4. Propose [[wkfl-ite-repair]] for the claims that fail. Do not run a repair process: the person decides.
5. Once the person has the report, the workflow is done.

> [!headless]
> A headless session does not do this stage: it asks the person no person check, shows nothing to a person, and proposes nothing. In place of this stage, it reads the claims again and reports in the result, as the callout of The End of a Job says.
> - Do not answer a person check, and do not write a value that waits for a person: the person answers in Steel.
> - Do not run a process.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the counts of the claims that hold, fail, have an error, and wait for a person, and the claim that fails and matters most. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

> [!headless]
> A headless session does not end the job in the chat, and does not wait for the person. It returns the result:
> 1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[init-ite#Headless]]. When an item fails, go back to its stage: do not return with an item open.
> 2. Read the claims again (`flint ite claim list "<program>" --json`).
> 3. Write the `summary`: the counts ("9 claims hold, 2 fail, 1 error, 3 wait for a person."), then the claim that fails and matters most, with what the check saw and its `on_fail` (`flint ite claim show "<program>" <id> --json`: "repair by <process>" or "change the model: <keeper>"), the old data, and the pulls that failed. Do not answer a person check, and do not write a value that waits for a person: the person answers in Steel. Do not run a process. Use no `'` character.
> 4. End the job with the result, and nothing else:
>
>    ```bash
>    flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
>    ```

# Output

- Results in the log of this machine, recorded by `flint ite claim check` and `flint ite claim report`
- New snapshots of the external data that the claims read, recorded by `flint ite data pull`
- A report of each claim that fails, each old claim, each check with an error, and each person check that waits for the person

> [!headless]
> - One `steel-result/1` JSON value as the result of the job
