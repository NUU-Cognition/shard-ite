---
description: "Make one process from one sentence with one command: select a recipe or the form (code, agent, person), write the process with flint ite process new and its one-line flags (task, trigger, reads, writes, inputs, outputs), check it, and test it. The person enables its trigger."
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` (or `hstart` in a headless session) if you haven't already.

# Skill: Process New

Make one process of a program from one sentence of a person, for example "send the agenda each Monday at 08:00". One command writes a correct `process.md` (and the code of a recipe). Then you check it and test it. You never run it and never enable it: the person does.

# Input

- The program
- One sentence: the work, when it runs, what it reads, and what it writes
- (Optional) The part or the data that the process works on

# Actions

1. **Look for a recipe.** Run `flint ite process recipes`. A recipe is a process that runs at once: `heartbeat`, `http-check` (a URL answers), `json-pull` (one value of a JSON URL), `command` (one shell command), `git-stats` (a Git repository), `keep-map-true` (the agent of the program keeps the map true after each event), `person-approve` (a person answers one question), and `daily-digest` (an agent writes a digest of the last day each morning). When one fits the sentence, use it with its values:

   ```bash
   flint ite process new "<program>" <id> --recipe <name> [--with <name>=<value>]...
   ```

2. **Else select the form.** `code` when code can do the work on this machine; `agent` when the work needs reading and judgement; `person` when a person must act (a call, a signature, a decision).
3. **Select the id.** A short slug: `send-agenda`. `flint ite process list "<program>"` shows the ids that exist.
4. **Write the process with one command.** Give what the sentence says, and nothing more:

   ```bash
   flint ite process new "<program>" <id> --by code|agent|person --task "<the work in words>" \
     [--about <part id or data:<id>>...] [--reads data:<id>...] [--writes data:<id>...] \
     [--inputs <name>[:<kind>][!]...] [--outputs <name>[:<kind>]...] \
     [--every 1h | --cron "0 8 * * 1" | --on task.finished commit.landed | --on hook] [--irreversible] [--agent program]
   ```

   - `--task` is the prompt of an agent, the task of a person, or the comment of the code. The title is its first sentence. Put the prose for a person in `--text`.
   - `--run-by agent` lets each agent start it (`agent:*`): only for a process that changes nothing outside this Flint (it reads, or it writes only the native data of its `writes`). With no `--run-by`, only the owners (else the person of this machine) start it.
   - The trigger: `--every <duration>`, `--cron "<expression>"`, or `--on <event kind>...` (also `--on hook`, `--on watch`). With none, the trigger is `manual`.
   - `--irreversible` for a process that changes the world outside this machine (an email, a message, a push, a payment): a person approves each run.
   - `--agent program` gives each start to the agent of the program as one job.
   - The kinds of an input or an output: `text`, `number`, `boolean`, `choice`, `json`, `date`, `money`. A `!` makes an input required.
   - Add `--dry-run` first when you are not sure: it prints the files and writes nothing.
5. **Write the work.** A code process gets a stub `index.js` that passes `process test` at once. The stub prints sample outputs, does not read the data of `--reads`, and does not write the data of `--writes`. Never keep a stub that reports work that it did not do: replace the stub with the work, read `STEEL_DATA["data:<id>"]`, and print one `data` record for each data that it writes, in `Steel/Programs/<program>/Processes/<id>/`. It prints one JSON line for each record: `{"output":{...}}`, `{"state":{...}}`, `{"data":{"id":"<data id>","value":...}}` for data of `writes`, or `{"log":"<text>"}`. A recipe wrote its code already. An agent or a person process needs no code.
6. **Check it.** `flint ite process check "<program>" <id>`: each problem with the file, the line, the cause, and the fix. Repair each error, and check again.
7. **Test it.** `flint ite process test "<program>" <id> [--input <name>=<value>]...`. The test gives the code the data of `reads` as it is now: when that data has no value yet, a correct process fails its test, and the error names the data. That is a true answer: say it in your result. Add `--dry` for an agent process, an irreversible process, or a process with a `source`: it prints what it would run. Repair and test again. Never keep a process that you did not test.
8. **Hand over.** Tell the person the id, the trigger, and the two commands that only a person runs: `flint ite enable "<program>" <id>` (the trigger) and `flint ite process run "<program>" <id>` (Run now). Name an effect claim when one shows that the work worked ([[wkfl-ite-claim_add]]).

# Rules

- Never run the process and never enable its trigger. Only a person does.
- An agent may Run now only a process whose `authority.run` names it (`agent:*`, written by `--run-by agent`). Give it only to a process that changes nothing outside this Flint (it reads, or it writes only the native data of its `writes`).
- When the work has steps and decisions in order, or more than one actor, follow [[sk-ite-workflow_new]].
- The full form is in [[tmp-ite-process-v0.1]] and in Processes of [[knw-ite-processes]].

# Output

- `Steel/Programs/<program>/Processes/<id>/process.md`, and its code for a code process, checked and tested
- The enable and the Run now commands for the person
