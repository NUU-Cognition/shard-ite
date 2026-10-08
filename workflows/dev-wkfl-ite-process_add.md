---
description: "Add one process to a program from the words of a person: select its form with the person, make it with flint ite process new, write its code, prompt, or task, and test it"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Process Add

Add one process to a program: a small instruction that the program owns and can run, by code, an agent, or a person. The person says the work, and you write the process and test it. The form is in Processes of [[init-ite]] and in [[tmp-ite-process-v0.1]].

# Input

- The program
- (Optional) The selected parts: the parts that the process uses
- The words of the person: the work that the process must do

# Actions

## Stage 1: Read the Work

1. Set the focus: `flint ite focus <part ids>` ([[sk-ite-focus]]).
2. Read the map (`flint ite map "<program>" --json`), the processes (`flint ite process list "<program>"`), and the claims (`flint ite claim list "<program>"`).
3. Read the note of each selected part, and the sources that the note names.
4. Say the work again in one sentence: what the process does, what goes in, and what comes out. When it can have two meanings, ask the person one question.
5. When a process of the program already does the work, show it to the person, and ask: keep it, or add a new process.
6. Once you know the work, progress to the next stage.

## Stage 2: Select the Form

1. Select the form: `code` when code can do the work on this machine, `agent` when the work needs reading and judgement, `person` when a person must act.
2. When the work needs steps and decisions in order, or more than one actor, the process needs an instruction map: propose [[wkfl-ite-flow_add]] after this workflow.
3. Select a short slug `id` (`send-reminders`). Check that it is free: `flint ite process show "<program>" <id>` refuses with `not-found`.
4. Select the `inputs`, the `outputs`, and the `effect` (the claims that show that the work worked; only claims that exist).
5. Select the authority. A process that changes the world outside this machine (a push, a send, a publish, a payment) gets `irreversible: true`, so a person approves each run. The trigger stays `manual`: the person enables a trigger with `flint ite enable`.
6. Show the person the plan: the id, the form, the inputs and the outputs, the effect, and the authority. Ask: write it, or change it.
7. Once the person agrees, progress to the next stage.

## Stage 3: Write the Process

1. Make the process:

   ```bash
   flint ite process new "<program>" <id> --by code|agent|person --title "<title>" [--part <part id>...] [--text "<prose>"]
   ```

   It writes `Steel/Programs/<program>/Processes/<id>/process.md` from the form, with `trigger: manual`.
2. Complete `process.md` with the form of [[tmp-ite-process-v0.1]]: the prose, `inputs`, `outputs`, `effect`, `authority`, and `timeout`.
3. Write the work: the code (`index.js` with `runtime: node`) for `code`, the `prompt` for `agent`, or the `task` for `person`.
4. Run `flint ite process list "<program>"`. Repair each problem of the process.
5. Once the process is written, progress to the next stage.

## Stage 4: Test the Process

1. A code process: show the person the code. Test it with `flint ite process test "<program>" <id> [--input <name>=<value>]...`: it runs the code one time, writes nothing to the log, and changes no state. Repair and test again.
2. A process with `irreversible: true` or a `source`, and an agent process: test it with `--dry`. It prints what it would run, and runs nothing.
3. Run `flint ite check "<program>"`. Repair each error finding of the process.
4. Do not run the process (`flint ite process run`) unless the person asks for exactly that.
5. Show the person the result of the test, and propose the next step: Run now, [[wkfl-ite-flow_add]], or [[wkfl-ite-claim_add]] for an effect claim.
6. Once the test passes, the workflow is done.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the process id, its form, its inputs and outputs, its effect claims, and what the test showed. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

# Output

- One process in `Steel/Programs/<program>/Processes/<id>/`, with its code, prompt, or task, tested
