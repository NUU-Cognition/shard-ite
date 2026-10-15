---
description: "Make a new program end to end with a person: the purpose and the template, the first map as one map change, the state (data), the processes, the claims, the plan, the check, and the list of what only the person applies and enables"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Program Create

Make one program from the words of a person, from the purpose to a process that can run. Example: "Make a program for my weekly team meeting, with a process that sends the agenda each Monday, and a claim that the agenda exists." You propose each change. The person applies the map change and the promotes, and enables the processes at the end, each with one command.

The kernel words are in [[init-ite]]: the model (the parts, the views, the future notes, and the statements of the claims), the processes (each check, maker, keeper, and worker), the data, and the events that start the processes. Use these words and the words of the person. Do not teach the person a new word.

# Input

- The words of the person: the system, and what it must do
- (Optional) Sources: notes, files, or pages that describe the system

# Actions

## Stage 1: The Purpose and the Template

1. Say the system again in one sentence: what it is, and why the person models it. This is the purpose.
2. Run `flint ite list`. When a program already models this system, show it to the person, and ask: extend it, or make a new program.
3. Run `flint ite templates`, and select the template by the kind of system: `organisation` (a team, its meetings and duties), `process` (repeated work of a business), `event` (one dated event), `research` (a question), `software` (a product with code), else `general`.
4. Show the person the name, the purpose, and the template. Ask: make it, or change it.
5. Once the person agrees, make the program:

   ```bash
   flint ite create "<name>" --purpose "<purpose>" --template <id>
   ```

   The program gets the process `keep-map-true` (`recipe: keep-map-true`: the agent of the program, on the events `note.added` and `task.finished`; it keeps the root note; it is not enabled) and a starter kit of its template: one piece of data, one code process that runs at once, and one claim with its code check that reads the data (for an organisation: the data `next-meeting`, the process `days-until-meeting`, and the claim `next-meeting-ahead`; a process template gets the runs of `keep-map-true`; a software template gets the newest commit). Read the kit with `flint ite process list`, `flint ite data list`, and `flint ite claim list` before you add your own: use it where it fits, and change it with `process set`.

6. Once the program exists, progress to the next stage.

## Stage 2: The First Map

1. Read the types of the program: the field `types` of its root note (the template gave them). `flint ite types --type <id>` shows one type.
2. Select 3 to 9 parts for level 1: what the system is made of, in the words of the person. For the weekly meeting: the meeting itself (a ritual), the agenda, the people or roles, the decisions. Each part has a title of two to six words, a type of the program, and one sentence.
3. Write the operations into one JSON array (the table "The Operations of a Map Change" of [[init-ite]]). For a deeper part, give its parent an `id` (a UUID v4) in the same change.
4. Propose it, and read the preview:

   ```bash
   flint ite map change propose "<program>" --ops <file|-> --reason "<one sentence for the person>"
   flint ite map change show "<program>" <change id>
   ```

5. Show the person the tree after. A person applies it in the Workbench, or with `flint ite map change apply "<program>" <change id>`. You never apply it.
6. Once the person applied it, or asked you to go on, progress to the next stage. The part ids are in `flint ite map tree "<program>" --ids` after the apply. Before the apply, the program has no part: a process can name its data (`--about data:<id>`).

## Stage 3: The Data

1. Ask: what does the system hold or measure? For the weekly meeting: the topics of this week, and the agenda that was sent.
2. For each piece of data, select its maker (the process that keeps it):
   - A person writes it when Steel asks: `--by person` with a `--task` (the question).
   - Code calculates it from other data: `--by code` with `--reads data:<id>`.
   - It comes from outside (a file, a page, a command): a `--source` and a maker that pulls it, `--by code` (a stub `pull.js`).
   - A process of Stage 4 writes it (for example the table of the sent agendas): write it in Stage 4, after its process, with `--kept-by process:<id>`.
3. Write each piece of data and its maker with one command: `flint ite data new "<program>" <id> [--source command:<line>|url:<url>|path:<file> | --value <v>] [--by code|agent|person [--reads data:<id>...] [--task "<question or request>"] [--every|--cron]] [--fresh-for <d>] [--history]`. It writes `Data/<id>/data.md` and `Processes/make-<id>/`. The CLI is the truth: check the flags with `--help`.
4. Test each maker that has code: `flint ite data test "<program>" <id>`. Repair and test again. Then pull it one time: `flint ite data pull "<program>" <id>`. A test writes nothing, and a check does not pull data whose maker is not enabled, so the processes and the claims of the next stages need this first value. A value that a person writes has no code to test. Then `flint ite data list "<program>"` must show no problem (a value of a person shows as `pending`).
5. Once the data is written, progress to the next stage.

## Stage 4: The Processes

1. For each piece of work that the system does again and again, write one process. Follow [[sk-ite-process_new]] for each one. When the work has steps and decisions in order, follow [[sk-ite-workflow_new]].
2. Give the trigger with a flag of `process new` (for example `--cron "0 8 * * 1"` for each Monday at 08:00, or `--on <kind> [--on-about <ref>]` for an event), or write it in `process.md`. A trigger runs only after the person enables the process.
3. A process that sends something outside this machine (an email, a message) gets `--irreversible`, so the person approves each run.
4. A process has no `writes`. For each value or table that a process writes, write the data now, with the process as its keeper: `flint ite data new "<program>" agenda --table week:date sent_at:date --key week --kept-by process:send-agenda`.
5. Check and test each process: `flint ite process check "<program>" <id>`, then `flint ite process test "<program>" <id>` (`--dry` for an agent process or an irreversible process; `--data data:<id>=<json>` gives a sample of data that has no value yet). Never run it.
6. Once each process passes its test, progress to the next stage.

## Stage 5: The Claims

1. For each thing that must be true now, write one claim and its check: `flint ite claim new "<program>" <id> --about <part id> --title "<title>" --by code|agent|person`. A claim never states a goal, a target with a date, or a prediction. For the weekly meeting: `agenda-exists` ("The agenda of this week exists"), about the agenda part, `--by code --reads data:agenda --cron "30 8 * * 1"`. `--about` takes a part (its id or its title), `root`, or `data:<id>`: before the person applies the first map change, name the data that the claim judges. Give the rest in the same command: `--reads data:<id>` of the check, a trigger of the check (`--every`, `--cron`, `--on`), and `--fresh-for`. The command writes the claim and its check as a draft (`Processes/check-<id>/dev/`).
2. Write its check: a code check gets a stub `check.js` in its draft folder that gives `error` until you write the test. The test reads the data of `reads`, and prints one line `{"state":"holds|fails|error","summary":"..."}`.
3. Test it: `flint ite claim test "<program>" <id>`. Then propose the promote of the check: `flint ite process promote "<program>" check-<id>`. The person applies it; then run it one time: `flint ite claim check "<program>" <id>`.
4. Name each claim in the `effect` of the process that makes it true: `flint ite process set "<program>" <process id> --effect <claim id>...`. Ask the person which side changes when the claim fails: a process that repairs the world gets the trigger `--on claim.failed --on-about claim:<id>`; else the keeper of the part proposes a change of the model. Use `--add-trigger` so that the process keeps its other triggers: `flint ite process set "<program>" <process> --add-trigger --on claim.failed --on-about claim:<claim id>`. Without `--add-trigger`, the trigger flags replace each trigger.
5. Once each claim has a tested check, progress to the next stage.

## Stage 6: The Plan

1. Ask: what must be different next? When the person names a change, write one future note: `flint ite plan add "<program>" --of <part> --change change --text <file|->`, or `--change add --parent <part> --type <Type> --title "<title>"` for a new thing. A future note has no state: the keeper proposes its realize when the work makes it true, and the person applies it.
2. When the person names nothing, write no plan. `plan add` needs a part that exists: it refuses a part of a waiting map change and the root. Before the person applies the first map change, write no future note: name what must be next in your result.
3. Progress to the next stage.

## Stage 7: Check and Hand Over

1. Run `flint ite check "<program>"`, `flint ite process check "<program>"`, and `flint ite flow check "<program>"`. Repair each error of a file that you wrote. `claim-fails` is not an error of a file: it is a true answer about the world, so report it.
2. Run `flint ite pulse "<program>"`.
3. Show the person the list of what only the person does, one command each:

   ```bash
   flint ite map change apply "<program>" <change id>     # when not applied yet
   flint ite revision apply "<program>" <revision id>     # the promote of each check: then its claim counts
   flint ite process set "<program>" <id> --run-by agent  # only for a process that an agent must start
   flint ite enable "<program>" --all                     # each process that is off and has no problem, also keep-map-true
   flint ite enable "<program>" <process id>              # or one process (a check, a maker, or a worker), with each of its triggers
   ```

   Each program is a living system: the brief works at once, with the defaults. When a default does not fit (the owners, the boundary, the authority, or the governor), write the full root note with one `system` block (owners, boundary, attention, authority, and governor; no `goals`; [[tmp-ite-program-v0.1]]), propose it with `flint ite revision propose "<program>" --kind system --target "<root note file>" --content-file <file> --reason "<one sentence>"`, and the person applies it with `flint ite revision apply "<program>" <id> --protected`.

4. Propose the next step: Run now of one process (`flint ite process run "<program>" <id>`), a view for a question, or more parts.
5. The workflow is done.

# Output

- One program: the root note and its folder in `Steel/Programs/<name>/`
- One map change with the first level, applied by the person
- The data and their makers, the processes, and the claims with their checks, each tested and promoted by the person
- The future notes that the person named
- The list of the applies, the promotes, and the enables for the person
