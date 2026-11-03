---
description: "Make a new program with a person: the purpose and the template, the first map as one map change, the check, and the list of what only the person applies; in a headless session, make it for a person or a manager, and return a result that lists each map change that waits for the person"
orb:
  - "@v1/nuucognition/session/ccaed053-844a-48bd-966a-41a2e32d6412#flint/nuu-flint"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Program Create

Make one program from the words of a person, and draft its first map. Example: "Make a program for my weekly team meeting." You make the program and propose its first map. The person reads the map change and applies it.

A new program gets only its root note: no other file. Use the words of the person. Do not teach the person a new word.

> [!headless]
> A headless session follows this workflow with no person in the session. Do each stage, and follow the `> [!headless]` callout in it. The rules are in [[init-ite#Headless]].
> - You propose the first map. The person reads your result later and applies the map change with one command.

# Input

- The words of the person: the system, and what the person wants to see in it
- (Optional) Sources: notes, files, or pages that describe the system

> [!headless]
> - (Optional) The name of the program, and its template

# Actions

## Stage 1: The Purpose and the Template

1. Say the system again in one sentence: what it is, and why the person models it. This is the purpose.
2. Run `flint ite list`. When a program already models this system, show it to the person, and ask: extend it, or make a new program.
3. Run `flint ite templates`, and select the template by the kind of system: `organisation` (a team, its meetings and duties), `process` (repeated work of a business), `event` (one dated event), `research` (a question), `software` (a product with code), else `general`. A template of this Flint can fit better: read its description.
4. Show the person the name, the purpose, and the template. Ask: make it, or change it.
5. Once the person agrees, make the program:

   ```bash
   flint ite create "<name>" --purpose "<purpose>" --template <id>
   ```

   The command writes the root note (with the `types` of the template) and the empty folder of the program in `Steel/`.
6. Once the program exists, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase purpose`.
> - Do not ask the person (step 2). Make a new program, unless the prompt says to extend one. An empty program with the same name (a scratch program with no parts) is not a reason to extend: name it in the result.
> - When the prompt names a template, use it.
> - Do not show the name, the purpose, and the template to a person, and do not wait for a person (step 4). Make the program, then progress to the next stage.

## Stage 2: The First Map

1. Read the types of the program: the field `types` of its root note (the template gave them). `flint ite types --type <id>` shows one type. The template note in `Mesh/Metadata/Templates/` says how to model a system of its kind.
2. Read the sources that the person gave. Never invent a path, a URL, or a note name.
3. Select the parts of level 1: what the system is made of, in the words of the person. For the weekly meeting: the meeting itself (a ritual), the agenda, the people or the roles, and the decisions. Each part has a title of two to six words, a type of the program, and one sentence. When no type fits, use `note`, and tell the person.
4. Write the operations into one JSON array (The Operations of a Map Change in [[init-ite]]), in a file in the scratch folder of your session. Check that it parses: `python3 -m json.tool < <file>`. For a deeper part, give its parent an `id` (a new UUID v4) in the same change.
5. Propose it, and read the preview:

   ```bash
   flint ite map change propose "<program>" --ops <file> --reason "<one sentence for the person>"
   flint ite map change show "<program>" <change id>
   ```

   An operation that does not apply refuses with `invalid-input` and its index. Repair that operation and propose again. Nothing was written.
6. **Stage gate.** Show the person the tree after. Ask: apply, change, or discard.
   - **Apply**: the person applies it in the Workbench, or runs `flint ite map change apply "<program>" <change id>` in their own terminal. You never apply it.
   - **Change**: discard the change (`flint ite map change discard "<program>" <change id>`), change the operations, and propose again.
   - **Discard**: `flint ite map change discard "<program>" <change id>`.
7. Once the person applied or discarded the change, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase first-map`.
> - Do not invent a fact: say a gap in the sentence of the part.
> - Put a deeper level in the same change, and give its parent an `id` (a new UUID v4): a map change cannot name a part of another waiting change.
> - Read the preview with `flint ite map change show "<program>" <change id> --json`. The state must be `proposed`, with no conflict and no new error finding in the tree after. When the preview shows a mistake, discard your change, repair the operations, and propose again. Do this at most two times.
> - Do not show the tree to a person, and do not wait for the apply (steps 6 and 7). Never apply the change. Progress to the next stage.

## Stage 3: Check

1. Run `flint ite map check "<program>"` and `flint ite check "<program>"`. Repair each error of a part that you proposed: discard the change, and propose it again with the repair.
2. Before the apply, the program has no part, so the check reads only the root note. After the apply, run `flint ite map check "<program>"` again, and show the person the findings of level 1.
3. Progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase checking`.
> - Read the tree after of your change for its findings: the person applies it later.

## Stage 4: Hand Over

1. Show the person the list of what only the person does, one command each:

   ```bash
   flint ite map change apply "<program>" <change id>     # when not applied yet
   ```

2. Propose the next step, as one more map change: a part one level deeper ([[wkfl-ite-map_expand]]), the files that no part covers ([[wkfl-ite-map_cover]]), or the parts that the person names ([[wkfl-ite-parts_add]]).
3. The workflow is done.

> [!headless]
> - Do not show the list to a person (step 1), and do not propose the next step to a person (step 2). Return as your prompt says. When the prompt gives no shape, return Markdown with these lines:
>
>   ```
>   PROGRAM: <name> (<template>): <purpose>
>   PROPOSED: <the map change id, with the count of each operation>
>   WAITS FOR YOU: flint ite map change apply "<program>" <change id>
>   GAPS: <what you did not know, and the question for the person>
>   ```

# Output

- One program: the root note and its empty folder in `Steel/Programs/<name>/`
- One map change with the first level: applied by the person, or discarded
- The list of the applies for the person

> [!headless]
> - One program, or one extended program
> - One map change that waits for the person, with the state `proposed`
> - A result that names the change id and the command that only the person runs
