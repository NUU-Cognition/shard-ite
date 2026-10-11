---
description: "Headless: make a new program end to end for a person or a manager: the purpose and the template, the first map as one map change, the state (data), the processes, the claims, the plan, the check, and a result that lists each proposal and each enable that waits for the person"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Program Create (Headless)

Make one program from the words of a person, from the purpose to a process that can run, with no person in the session. You are a builder (see [[hinit-ite]]). You propose each change. The person reads your result later, and applies the map change and enables the triggers, each with one command.

The kernel words are in [[init-ite]]: a thing is a part, state is data and claims, a process changes state, an event starts it, and the plan says what must be next.

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

   The program gets the process `keep-map-true` (by the agent of the program, on the events `note.added` and `task.finished`). It is not enabled.

6. Progress to the next stage.

## Stage 2: The First Map

1. Run `flint orbh session set phase first-map`.
2. Read the root and the types: `flint ite map "<program>" --json`, `flint ite types`.
3. Select 3 to 9 parts for level 1, in the words of the person: a title of two to six words, a type of the program, and one sentence each. Do not invent a fact: say a gap in the sentence.
4. Write the operations into one JSON array (the table "The Operations of a Map Change" of [[init-ite]]). Put a deeper level in the same change, and give its parent an `id` (a UUID v4): a map change cannot name a part of another waiting change. Until the person applies the change, the program has no part: the processes and the claims of this workflow name their data (`data:<id>`).
5. Propose it, and read the preview:

   ```bash
   flint ite map change propose "<program>" --ops <file|-> --reason "<one sentence for the person>"
   flint ite map change show "<program>" <change id> --json
   ```

   The state must be `proposed`, with no conflict and no new error finding in the tree after. Never apply it.
6. Progress to the next stage.

## Stage 3: The State

1. Run `flint orbh session set phase state`.
2. For each piece of data that the system holds or measures, select its maker or its reader: a person (`by: person` with a `question`), code from other data (`by: code` with `from`), or a reader of a source outside (`source`, `by: code`, `entry: pull.js`). Never decide a value for a person.
3. Write `Steel/Programs/<program>/Data/<id>/data.md` from [[tmp-ite-data-v0.1]]. There is no `data new` verb.
4. Test each reader or maker that has code with `flint ite data test "<program>" <id>`, and pull it one time with `flint ite data pull "<program>" <id>`. A value that a person writes and a table that a process writes have no code to test. `flint ite data list "<program>"` must show no problem (a value of a person shows as `pending`).
5. Progress to the next stage.

## Stage 4: The Processes

1. Run `flint orbh session set phase processes`.
2. For each piece of work that the system does again and again, follow [[sk-ite-process_new]]. For steps and decisions in order, follow [[sk-ite-workflow_new]].
3. Write the trigger in `process.md`, for example `trigger: { cron: "0 8 * * 1" }`. Never enable it.
4. A process that sends something outside this machine gets `authority: { irreversible: true }`.
5. Test each process with `flint ite process test "<program>" <id>` (`--dry` for an agent process or an irreversible process). Never run it.
6. Progress to the next stage.

## Stage 5: The Claims

1. Run `flint orbh session set phase claims`.
2. For each thing that must be true: `flint ite claim new "<program>" <id> --about <part id> --mode is|ought|will --by code|agent|person|none --title "<title>"`. `claim new` takes only a part of the main map. Before the person applies the first map change, the program has no part: then write `Reality/<id>/claim.md` from [[tmp-ite-claim-v0.1]] by hand, about the data that it judges (`about: ["data:<id>"]`). A claim about data is valid at once.
3. Write its check (`check.js` for `by: code`), `reads`, `fixed-by` for an `ought` claim, and `trigger`. A check only reads.
4. Test it and run it one time: `flint ite claim test "<program>" <id>`, then `flint ite claim check "<program>" <id>`. A claim that fails now is a true answer: say why in the result.
5. Name each claim in the `effect` of the process that makes it true.
6. Progress to the next stage.

## Stage 6: The Plan

1. A headless agent writes no future note: an agent drafts the plan only in a session that a person drives. When the prompt names what must be different next, put each item in the line GAPS of your result, as a proposal for the plan.
2. Progress to the next stage.

## Stage 7: Check and Return

1. Run `flint orbh session set phase checking`.
2. Run `flint ite check "<program>"`. Repair each error finding of a file that you wrote.
3. Run `flint ite pulse "<program>"`.
4. Return with the shape of your prompt. When the prompt gives no shape, return Markdown with these lines:

   ```
   PROGRAM: <name> (<template>) — <purpose>
   WROTE: <each file and each command that wrote it, one line each>
   TESTED: <each check, process, and reader with its test result>
   WAITS FOR YOU:
   - flint ite map change apply "<program>" <change id>
   - flint ite enable "<program>" keep-map-true
   - flint ite enable "<program>" <process id>
   - flint ite enable "<program>" <claim id>
   GAPS: <what you did not know, and the question for the person>
   ```

# Output

- One program, or one extended program
- One map change that waits for the person
- The data, the processes, and the claims, each tested
- A result that lists each apply and each enable for the person
