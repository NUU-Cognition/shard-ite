---
description: "Headless: make a new program end to end for a person or a manager: the purpose and the template, the first map as one map change, the state (data), the processes, the claims, the plan, the check, and a result that lists each proposal and each enable that waits for the person"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Program Create (Headless)

Make one program from the words of a person, from the purpose to a process that can run, with no person in the session. You are a builder (see [[hinit-ite]]). You propose each change. The person reads your result later, applies the map change and the promotes, and enables the processes, each with one command.

The kernel words are in [[init-ite]]: the model (the parts, the views, the future notes, and the statements of the claims), the processes (each check, maker, keeper, and worker), the data, and the events that start the processes.

# Input

- The words of the person: the system, and what it must do
- (Optional) The name of the program, and its template
- (Optional) Sources: notes, files, or pages that describe the system

# Actions

## Stage 1: The Purpose and the Template

1. Run `flint orbh session set phase purpose`.
2. Write the purpose in one sentence: what the system is, and why the person models it.
3. Run `flint ite list`. Make a new program, unless the prompt says to extend one. An empty program with the same name (a scratch program with no parts) is not a reason to extend: name it in the result.
4. Run `flint ite templates`, and select the template by the kind of system: `organisation` (a team, its meetings and duties), `process` (repeated work of a business), `event` (one dated event), `research` (a question), `software` (a product with code), else `general`. When the prompt names a template, use it.
5. Make the program:

   ```bash
   flint ite create "<name>" --purpose "<purpose>" --template <id>
   ```

   The program gets the process `keep-map-true` (`recipe: keep-map-true`: the agent of the program, on the events `note.added` and `task.finished`; it keeps the root note; it is not enabled) and a starter kit of its template: one piece of data, one code process that runs at once, and one claim with its code check that reads the data (for an organisation: the data `next-meeting`, the process `days-until-meeting`, and the claim `next-meeting-ahead`; a process template gets the runs of `keep-map-true`; a software template gets the newest commit). Read the kit with `flint ite process list`, `flint ite data list`, and `flint ite claim list` before you add your own: use it where it fits, and change it with `process set`.

6. Progress to the next stage.

## Stage 2: The First Map

1. Run `flint orbh session set phase first-map`.
2. Read the types of the program: the field `types` of its root note (the template gave them). `flint ite types --type <id>` shows one type.
3. Select 3 to 9 parts for level 1, in the words of the person: a title of two to six words, a type of the program, and one sentence each. Do not invent a fact: say a gap in the sentence.
4. Write the operations into one JSON array (the table "The Operations of a Map Change" of [[init-ite]]). Put a deeper level in the same change, and give its parent an `id` (a UUID v4): a map change cannot name a part of another waiting change. Until the person applies the change, the program has no part: the processes and the claims of this workflow name their data (`data:<id>`).
5. Propose it, and read the preview:

   ```bash
   flint ite map change propose "<program>" --ops <file|-> --reason "<one sentence for the person>"
   flint ite map change show "<program>" <change id> --json
   ```

   The state must be `proposed`, with no conflict and no new error finding in the tree after. Never apply it.
6. Progress to the next stage.

## Stage 3: The Data

1. Run `flint orbh session set phase data`.
2. For each piece of data that the system holds or measures, select its maker: a person (`--by person` with a `--task`: the question), code from other data (`--by code --reads data:<id>`: a calculation), or code that pulls a source outside (`--source ... --by code`: a stub `pull.js`). Never decide a value for a person.
3. Write each piece of data and its maker with one command: `flint ite data new "<program>" <id> [--source command:<line>|url:<url>|path:<file> | --value <v>] [--by code|agent|person [--reads data:<id>...] [--task "<question or request>"] [--every|--cron]] [--fresh-for <d>] [--history]`. It writes `Data/<id>/data.md` and `Processes/make-<id>/`. A value or a table that a process of Stage 4 writes: write it in Stage 4, after its process, with `--kept-by process:<id>`. The CLI is the truth: check the flags with `--help`.
4. Test each maker that has code with `flint ite data test "<program>" <id>`, and pull it one time with `flint ite data pull "<program>" <id>`. A value that a person writes has no code to test. `flint ite data list "<program>"` must show no problem (a value of a person shows as `pending`).
5. Progress to the next stage.

## Stage 4: The Processes

1. Run `flint orbh session set phase processes`.
2. For each piece of work that the system does again and again, follow [[sk-ite-process_new]]. For steps and decisions in order, follow [[sk-ite-workflow_new]].
3. Give the trigger with a flag of `process new` (`--every`, `--cron "0 8 * * 1"`, or `--on <kind> [--on-about <ref>]`), or write it in `process.md`. Never enable the process.
4. A process that sends something outside this machine gets `--irreversible`. A process has no `writes`: for each value or table that a process writes, write the data now, with the process as its keeper: `flint ite data new "<program>" <data id> --table <name:kind>... --key <field> --kept-by process:<id>`.
5. Check and test each process: `flint ite process check "<program>" <id>`, then `flint ite process test "<program>" <id>` (`--dry` for an agent process or an irreversible process; `--data data:<id>=<json>` gives a sample of data that has no value yet). Never run it.
6. Progress to the next stage.

## Stage 5: The Claims

1. Run `flint orbh session set phase claims`.
2. For each thing that must be true now (never a goal, a target with a date, or a prediction): `flint ite claim new "<program>" <id> --about <part id> --title "<title>" --by code|agent|person`. For the weekly meeting: `--about data:agenda --by code --reads data:agenda --cron "30 8 * * 1"`. `--about` takes a part (its id or its title), `root`, or `data:<id>`: before the person applies the first map change, name the data that the claim judges. Give the rest in the same command: `--reads data:<id>` of the check, a trigger of the check (`--every`, `--cron`, `--on`), and `--fresh-for`. The command writes the claim and its check as a draft (`Processes/check-<id>/dev/`).
3. Write its check: replace the stub `check.js` in the draft folder (it gives `error` until you write the test). A check only reads.
4. Test it: `flint ite claim test "<program>" <id>`. A claim that fails in the test is a true answer: say why in the result. Then propose the promote of its check: `flint ite process promote "<program>" check-<id>`. The claim counts only after the person applies it.
5. Name each claim in the `effect` of the process that makes it true: `flint ite process set "<program>" <process id> --effect <claim id>...`. When a process repairs the world after a failure of the claim, give it the trigger on `claim.failed` of the claim (`--on claim.failed --on-about claim:<id>`); with no such process, the keeper of the part proposes a change of the model when the claim fails.
6. Progress to the next stage.

## Stage 6: The Plan and the Living System

1. Run `flint orbh session set phase plan`.
2. Write a future note only when your prompt asks for it: `flint ite plan add "<program>" --of <part> --change change --text <file|->`, or `--change add --parent <part> --type <Type> --title "<title>"`. A future note has no state. `plan add` needs a part that exists: it refuses a part of a waiting map change and the root. So before the person applies the first map change, put each item in the line GAPS of your result.
3. When your prompt asks for a living system (a brief for the person), write the full root note with one `system` block (owners, boundary, attention, authority, and governor; no `goals`; the form is in [[tmp-ite-program-v0.1]]) into a file, and propose it:

   ```bash
   flint ite revision propose "<program>" --kind system --target "<root note file>" --content-file <file> --reason "<one sentence>"
   ```

   Never apply it.
4. Progress to the next stage.

## Stage 7: Check and Return

1. Run `flint orbh session set phase checking`.
2. Run `flint ite check "<program>"`, `flint ite process check "<program>"`, and `flint ite flow check "<program>"`. Repair each error of a file that you wrote. `claim-fails` is not an error of a file: it is a true answer about the world, so report it.
3. Run `flint ite pulse "<program>"`.
4. Return with the shape of your prompt. When the prompt gives no shape, return Markdown with these lines:

   ```
   PROGRAM: <name> (<template>) — <purpose>
   WROTE: <each file and each command that wrote it, one line each>
   TESTED: <each check, process, and maker with its test result>
   WAITS FOR YOU:
   - flint ite map change apply "<program>" <change id>
   - flint ite revision apply "<program>" <revision id>   (the promote of each check: then its claim counts)
   - flint ite revision apply "<program>" <revision id> --protected   (a living system)
   - flint ite process set "<program>" <id> --run-by agent   (only for a process that an agent must start)
   - flint ite enable "<program>" --all   (each process and its triggers, also keep-map-true; or one process id each)
   GAPS: <what you did not know, the items for the plan, and the question for the person>
   ```

# Output

- One program, or one extended program
- One map change that waits for the person, and one revision for a living system when the prompt asks for it
- The data and their makers, the processes, and the claims with their checks, each tested, and one promote revision for each check
- A result that lists each apply and each enable for the person
