---
description: "Add one process to a program from the words of a person: select its form with the person, make it with flint ite process new, write its code, prompt, or task, and test it"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Process Add

Add one process to a program: a small instruction that the program owns and can run, by code, an agent, or a person. The person says the work, and you write the process and test it. The form is in Processes of [[knw-ite-processes]] and in [[tmp-ite-process-v0.1]].

# Input

- The program
- (Optional) The selected parts: the parts that the process works on. They go into `about`.
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
3. Find the job of the process. The job comes from the links: a `check` keeps a claim, a `maker` keeps a data item, a `keeper` keeps a model note, and a `worker` keeps nothing. When the work checks a claim, use [[wkfl-ite-claim_add]] in place of this workflow: `flint ite claim new` writes the claim and its check process.
4. Select a short slug `id` (`send-reminders`). Check that it is free: `flint ite process show "<program>" <id>` refuses with `not-found`.
5. Select `about`: the selected parts, and each other ref that the process works on. `about` names what the process works on: a part id, another process (`process:<id>`), a node of a map (`process:<id>#<node>`), or data (`data:<id>`).
6. Select the `inputs`, the `outputs`, and the `effect` (the claims that show that the work worked; only claims that exist).
7. Select the data that the process keeps. A process has no `writes`. When the process must write the values of a data item, the data item names the process as its keeper: `kept-by: "process:<id>"` in its `data.md`. Only the keeper writes the values of a data item. A data item has one keeper: when it has a keeper already, tell the person.
8. Select the authority. A process that changes the world outside this machine (a push, a send, a publish, a payment) gets `irreversible: true`, so a person approves each run.
9. Select the trigger. A trigger has one of three kinds: `manual`, `schedule` (`{ every: 30m }` or `{ cron: "0 9 * * *" }`), and `event` (`{ on: event, kinds: [<kind>...], about: [<ref>...] }`). The event kinds are `task.finished`, `commit.landed`, `note.added`, `webhook`, `manual`, `file.changed`, `claim.failed`, `claim.holds`, `data.changed`, `run.finished`, and `proposal.applied`. A process that repairs a failed claim gets `trigger: { on: event, kinds: [claim.failed], about: ["claim:<claim id>"] }`: when the claim fails, the brief says "repair by <process id>". Else the trigger stays `manual`. Only a person enables a process (`flint ite enable "<program>" <id>`), and that enables each trigger of the process.
10. Show the person the plan: the id, the form, `about`, the inputs and the outputs, the effect, the data that it keeps, the trigger, and the authority. Ask: write it, or change it.
11. Once the person agrees, progress to the next stage.

## Stage 3: Write the Process

1. Make the process:

   ```bash
   flint ite process new "<program>" <id> --by code|agent|person --task "<the work in words>" [--about <ref>...] \
     [--reads <ref>...] [--inputs <name[:kind][!]>...] [--outputs <name[:kind][!]>...] [--irreversible] [--dry-run]
   ```

   One command writes the work and the fields ([[sk-ite-process_new]]). Check the flags with `flint ite process new --help`. When a starter fits (`flint ite process starters`), use `--starter <name> [--with k=v]...`: a starter writes the files one time. A recipe is a shared process of `Steel/Recipes/` (an agent action, or `keep-map-true`): `--recipe <id>` writes a process with `recipe: <id>`, and the process gets each field of the recipe that it does not write. A code process gets a stub `index.js` that runs at once. Give no trigger flag, except for a process that repairs a failed claim: `--on claim.failed --on-about claim:<claim id>`. Only a person enables a process.

   It writes `Steel/Programs/<program>/Processes/<id>/process.md` from the form, with `trigger: manual` (or the event trigger of a repair). A process has no `kept-by` and no `writes`.
2. When the process keeps a new data item, make the data item: `flint ite data new "<program>" <data id> --kept-by process:<id>`.
3. Complete `process.md` with the form of [[tmp-ite-process-v0.1]]: the prose, `about`, `inputs`, `outputs`, `effect`, `authority`, and `timeout`.
4. Write the work: the code (`index.js` with `runtime: node`) for `code`, the `prompt` for `agent`, or the `task` for `person`.
5. Run `flint ite process check "<program>" <id>`. Repair each problem of the process (it gives the file, the line, the cause, and the fix).
6. Once the process is written, progress to the next stage.

## Stage 4: Test the Process

1. A code process: show the person the code. Test it with `flint ite process test "<program>" <id> [--input <name>=<value>]...`: it runs the code one time, writes nothing to the log, and changes no state. Repair and test again.
2. A process with `irreversible: true` or a `source`, and an agent process: test it with `--dry`. It prints what it would run, and runs nothing.
3. Run `flint ite process show "<program>" <id>`. It gives the computed `keeps` (the notes that name the process in `kept-by`) and `jobs` (`check`, `maker`, `keeper`, or `worker`). They must be the data and the job of your plan.
4. Run `flint ite check "<program>"`. Repair each error finding of the process.
5. Do not run the process (`flint ite process run`) unless the person asks for exactly that.
6. Show the person the result of the test, and propose the next step: Run now, [[wkfl-ite-flow_add]], or [[wkfl-ite-claim_add]] for an effect claim.
7. Once the test passes, the workflow is done.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the process id, its form, its inputs and outputs, its effect claims, and what the test showed. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

# Output

- One process in `Steel/Programs/<program>/Processes/<id>/`, with its code, prompt, or task, tested
