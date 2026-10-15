---
description: "Make one process from one sentence with one command: select a starter, a recipe, or the form (code, agent, person), write the process with flint ite process new and its one-line flags (task, trigger, reads, inputs, outputs), name it as the keeper of the data that it writes, check it, and test it. The person enables it."
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` (or `hstart` in a headless session) if you haven't already.

# Skill: Process New

Make one process of a program from one sentence of a person, for example "send the agenda each Monday at 08:00". One command writes a correct `process.md` (and the code of a starter). Then you check it and test it. You never run it and never enable it: the person does.

A process that checks a claim is the check of that claim: make it with `flint ite claim new` ([[wkfl-ite-claim_add]]). A process that pulls or makes the values of a data item is the maker of that data item: make it with `flint ite data new` ([[tmp-ite-data-v0.1]]). This skill makes the other processes: workers, and processes that write a data item that they keep.

# Input

- The program
- One sentence: the work, when it runs, what it reads, and what it writes
- (Optional) The part or the data that the process works on

# Actions

1. **Look for a starter or a recipe.** Run `flint ite process starters`. A starter writes the files of a process that runs at once, one time: `heartbeat`, `http-check` (a URL answers), `json-pull` (one value of a JSON URL), `command` (one shell command), `git-stats` (a Git repository), `person-approve` (a person answers one question), and `daily-digest` (an agent writes a digest of the last day each morning). When one fits the sentence, use it with its values:

   ```bash
   flint ite process new "<program>" <id> --starter <name> [--with <name>=<value>]...
   ```

   A recipe is a shared process of the shard (`Steel/Recipes/<id>/process.md`). The process gets each field of the recipe that it does not write. The standing process of a program uses the recipe `keep-map-true` (the agent of the program keeps the map true after each event):

   ```bash
   flint ite process new "<program>" keep-map-true --recipe keep-map-true --on task.finished --on commit.landed
   ```

2. **Else select the form.** `code` when code can do the work on this machine; `agent` when the work needs reading and judgement; `person` when a person must act (a call, a signature, a decision).
3. **Select the id.** A short slug: `send-agenda`. `flint ite process list "<program>"` shows the ids that exist.
4. **Write the process with one command.** Give what the sentence says, and nothing more:

   ```bash
   flint ite process new "<program>" <id> --by code|agent|person --task "<the work in words>" \
     [--about <part id, data:<id>, or claim:<id>>...] [--reads data:<id>...] \
     [--inputs <name>[:<kind>][!]...] [--outputs <name>[:<kind>]...] \
     [--every 1h | --cron "0 8 * * 1" | --on task.finished --on commit.landed [--on-about <ref>] [--scope any] | --manual] \
     [--irreversible] [--agent program] [--effect <claim>...]
   ```

   - `--task` is the prompt of an agent, the task of a person, or the comment of the code. The title is its first sentence: give `--title` when that sentence is not a good title. Put the prose for a person in `--text`.
   - Do not give `--run-by`: an agent never gives a run right, and the engine refuses it. With no `--run-by`, only the owners (else the person of this machine) start it. When an agent must start it, name the command for the person: `flint ite process set "<program>" <id> --run-by agent`.
   - The trigger: `--every <duration>`, `--cron "<expression>"`, or `--on <event kind>` (repeat it for more kinds; `--on-about <ref>` limits the trigger to events about that reference, and `--scope any` takes each event of the kind). With none, the trigger is `manual`. The event kinds: `task.finished`, `commit.landed`, `note.added`, `webhook`, `manual`, `file.changed`, `claim.failed`, `claim.holds`, `data.changed`, `run.finished`, `proposal.applied`. A process that repairs the world when a claim fails: `--on claim.failed --on-about claim:<claim id>`. A process that a webhook starts: `--on webhook --on-about process:<id>`. A Git hook and a file watch are sources of events (`commit.landed`, `file.changed`), not triggers.
   - A process has no `--writes`. When the process writes a data item, the data item names the process as its keeper: for a new data item, `flint ite data new "<program>" <data id> ... --kept-by process:<id>` (after this command). The CLI is the truth: check the flags with `--help`.
   - `--irreversible` for a process that changes the world outside this machine (an email, a message, a push, a payment): a person approves each run.
   - `--agent program` gives each start to the agent of the program as one job.
   - The kinds of an input or an output: `text`, `number`, `boolean`, `choice`, `json`, `date`, `money`. A `!` makes an input required.
   - Add `--dry-run` first when you are not sure: it prints the files and writes nothing.
5. **Write the work.** A code process gets a stub `index.js` that passes `process test` at once: it reads the data of `--reads`, and its outputs are samples. Never keep a stub that reports work that it did not do: replace the sample with the work, in `Steel/Programs/<program>/Processes/<id>/`. It prints one JSON line for each record: `{"output":{...}}` (declare each output with `--outputs`, or `process test` reports an output that the process does not have), `{"state":{...}}`, `{"data":{"id":"<data id>","value":...}}` for a data item that names this process in `kept-by`, or `{"log":"<text>"}`. A starter wrote its code already, and it does only what its summary says: when the process keeps a data item, add the line that prints the `data` record. An agent or a person process needs no code. A trigger runs by the clock of this machine (`--cron "0 8 * * 1"` is 08:00 here), but the times in the code are UTC: compute a day or a week in the time zone of the system (the `timezone` of the system block, else this machine).
6. **Check it.** `flint ite process check "<program>" <id>`: each problem with the file, the line, the cause, and the fix. Repair each error, and check again.
7. **Test it.** `flint ite process test "<program>" <id> [--input <name>=<value>]...`. The test gives the code the data of `reads` as it is now. When that data has no value yet, give a sample for this test only: `--data data:<id>=<json>` (an object gives the outputs). Add `--dry` for an agent process, an irreversible process, or a process with a `source`: it prints what it would run. Repair and test again. Never keep a process that you did not test.
8. **Change it later.** `flint ite process set "<program>" <id> [--task] [--reads|--about ... | none] [--every|--cron|--on <kind> [--on-about <ref>]|--manual] [--irreversible|--reversible] [--effect <claim>...] [--dry-run]` changes only the keys that you give (`--run-by` is for a person); `flint ite process explain "<program>" <id>` says the process in words first; a change that gives the file a problem writes nothing.
9. **Hand over.** Tell the person the id, the trigger, the jobs (`flint ite process show "<program>" <id>`: `keeps` and `jobs`), and the two commands that only a person runs: `flint ite enable "<program>" <id>` (the process and each of its triggers) and `flint ite process run "<program>" <id>` (Run now). Name an effect claim when one shows that the work worked ([[wkfl-ite-claim_add]]).

# Rules

- Never enable the process: only a person does. Never run the process unless the person asks for exactly that. Then the engine also needs your actor in `authority.run`: an agent may Run now only a process whose `authority.run` names it (`agent:*`, which only a person gives). The "Next" line of `process test` names `process run` for a person, not for you.
- A person gives `agent:*` only to a process that changes nothing outside this Flint (it reads, or it writes only the data that names it in `kept-by`).
- When the work has steps and decisions in order, or more than one actor, follow [[sk-ite-workflow_new]].
- The full form is in [[tmp-ite-process-v0.1]] and in Processes of [[knw-ite-processes]].

# Output

- `Steel/Programs/<program>/Processes/<id>/process.md`, and its code for a code process, checked and tested
- The enable and the Run now commands for the person
