---
description: "Draft the root and level 1 of the main map of a program from its sources, as one map change that a person applies, with one stage gate: the person reads the preview"
orb:
  - "@v1/nuucognition/session/9f552ce0-0455-44ed-b8ec-d749c3ae9b2f#flint/nuu-orbh"
  - "@v1/nuucognition/session/ccaed053-844a-48bd-966a-41a2e32d6412#flint/nuu-flint"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Map Create

Draft the root and level 1 of the main map: the parts under the root, each with one sentence and its sources. Use it for a program with no main map, or with a flat map (many top parts: parts whose `parent` is the root note). The result is one map change that the person reads and applies. The rules of the main map are in The Main Map of [[knw-ite-programs]].

> [!headless]
> A headless session follows this workflow with no person in the session. Do each stage, and follow the `> [!headless]` callout in it. The rules of a headless session are in [[init-ite#Headless]].
> - The result is one map change that the person reads and applies. At the end, return the change id as the prompt says (the callout of The End).

# Input

- The program (its name or id)
- (Optional) The instructions of the person: what the system is, and what is outside it

> [!headless]
> - The prompt: it can give the facts of the level of the focus (the cards, the relations, the findings) and the coverage gaps. The steps and the form of each operation are in this workflow (the callout of Stage 3).

# Actions

## Stage 1: Read the Level

1. Read the level: `flint ite map show "<program>" [--focus <part>]` (the cards, the relations, the findings), `flint ite map coverage "<program>"`, and `flint ite map check "<program>"`.
2. Read the waiting changes: run `flint ite map change list "<program>" --state proposed`, then `flint ite map change show "<program>" <change id>` for each one, and read its operations. The list shows no focus: decide from the operations. When a waiting change does the task already, show it to the person, and ask: review it, or make a new one. Do not `edit` or `move` a part that a waiting change moves or edits: the later change gets a conflict (`changed`) at the apply.
3. Note the product root of a program with a codebase. A level of the main map has no size limit. When the program sets `max-children` (the `main-map` block of the program file), note it: a level of that program holds at most `max-children` parts.
4. Once you know the level, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase reading`.
> - When the prompt gives the level of the focus (for example, in a section The main map), read it in place of step 1. When the prompt does not give it, or says that the ITE could not load the main map, run `flint ite map show "<program>" [--focus <part>] --json` and `flint ite map coverage "<program>" --json`.
> - Read each waiting change with `flint ite map change show "<program>" <change id> --json`.
> - When a waiting change does your task already, do not ask the person, and propose nothing: end as the callout of The End says. Name the id of that waiting change in your result.

## Stage 2: Read the Sources

1. Software: list the top folders of the product root (`ls`, `git -C <product root> ls-files | cut -d/ -f1-2 | sort | uniq -c`). Read the README files and the entry points. Other programs: read the root note, the parts that exist and their `sources`, and the notes that the root note and the parts link to.
2. Find the large things of the system: the parts that a person names when they explain the system in one minute.
3. Never invent a path, a URL, or a note name. Each source that you write exists now.
4. When the scope of the task can have two meanings, ask the person one question. Ask no other question in this stage.
5. Once you know what the sources hold, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase reading-sources`.
> - Ask no question (step 4). When the scope of the task can have two meanings, select the reading that best helps the person, and write it in your result (the rule Ask no question of [[init-ite#Headless]]).

## Stage 3: Plan the Operations

1. Write the parts under the root (`parent: null`). For each: a title of two to six words in the words of the person, a type of the `types` of the root note (a program with a codebase: `system` for a large part), one sentence that says what the part is, and its sources (a program with a codebase: the folders of the part, each ending with `/`).
2. **The 100% rule.** Together the parts cover the whole system: each top folder (or source) goes to one part. A folder that no person needs to see (a generated folder, a lock file) is not a part: name it in the result, so that the person can add it to `coverage-ignore`.
3. **Keep the parts that exist.** When the main map has parts already, do not add a second part for one thing. Put the existing children of the root under the new parts: one `split` for each new part that groups existing parts (`parent: null`, the children are the existing parts), or `add` with an `id` and then `move`.
4. Give an `add` an `id` (a new UUID v4: `uuidgen | tr A-Z a-z`) when a later operation of the same change names the new part.
5. Name each existing part by its id (the `id` of the cards). Follow the quality rules of [[knw-ite-programs]] for each new part. When no type of the program fits a new part, use `note`, and tell the person.
6. Once the plan does the task, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase planning`.
> - When no type of the program fits a new part, use `note`, and name the part in your result.
> - The form of each operation. The prompt gives only the facts: the level and the gaps. A map change is one JSON array of operations. They apply in order. Name a part by its id (the `id` of the cards) or by its note name. `parent: null` is the root note (the engine writes `parent: "[[<root note>]]"`). `kind` is a type id of the program (the `types` of the root note). `sources` are the `code-refs` of a program with a codebase (paths relative to the product root; a folder ends with `/`), else wikilinks or URLs.
>
>   ```text
>   {"op":"add","title":"<title>","kind":"<type id>","parent":"<part, or null>","sentence":"<one sentence>","prose":"<optional>","sources":["<source>"]}
>   {"op":"move","part":"<part>","parent":"<part, or null>"}
>   {"op":"split","parent":"<part, or null>","subsystem":{"title":"<title>","kind":"<type id>","sentence":"<one sentence>"},"children":["<part>","<part>"]}
>   {"op":"merge","from":"<part>","into":"<part>"}
>   {"op":"rename","part":"<part>","title":"<new title>","kind":"<optional: a new type id>"}
>   {"op":"remove","part":"<part>"}
>   {"op":"edit","part":"<part>","sentence":"<optional>","prose":"<optional>","sources":["<the whole new list>"]}
>   ```
>
>   - `add` and `split` take an optional `id` (a new UUID v4: `uuidgen | tr A-Z a-z`). Give it when a later operation of the same change names the new part.
>   - `split` takes only children of its `parent` at that point of the change.
>   - `merge` moves the children and the sources of `from` to `into`, rewrites each link to `from`, and removes `from`.
>   - `rename` keeps the id and rewrites each wikilink to the old name. With `kind`, the file name gets the new `(Type)` word.
>   - `remove` moves the children up one level, and leaves the links to the part: the preview lists them.
> - Change the main map only through a map change. Do not write a part file with your own tools, and do not run `flint ite part add` or `flint ite part set` on the main map in this workflow.

## Stage 4: Propose the Change and Review It With the Person

1. Write the operations as one JSON array to a file in the scratch folder of your session: `"$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"`. Check that it parses: `python3 -m json.tool < <file>`.
2. Propose the change:

   ```bash
   flint ite map change propose "<program>" --ops <file> --reason "<one sentence: what the change does>"
   ```

   An operation that does not apply refuses with `invalid-input` and its index. Repair that operation and propose again. Nothing was written.
3. Show the person the preview: `flint ite map change show "<program>" <change id>` (the tree before and after with the marks, the files, the new findings, and the dangling links).
4. **Stage gate.** Ask the person: apply, change, or discard.
   - **Apply**: the person applies the change in the Workbench (the review of the change) or runs `flint ite map change apply "<program>" <change id>` in their own terminal. You cannot apply it: in an Orbh session the engine refuses an agent with `forbidden`. A conflict (`changed`) means that a file changed after the propose: propose the change again from the files now.
   - **Change**: discard the change (`flint ite map change discard "<program>" <change id>`), change the operations, and propose again.
   - **Discard**: `flint ite map change discard "<program>" <change id>`.
5. After an apply, run `flint ite map check "<program>"` and show the person the findings of the level.
6. Once the person applied or discarded the change, the workflow is done.

> [!headless]
> A headless session does not do the review with the person (steps 3 to 6): it reads the preview itself, and never applies the change.
> - Run `flint orbh session set phase proposing`.
> - Write the operations in the form of the callout of Stage 3, as one JSON array to the file `"$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"` (the scratch folder of your session). Check that it parses: `python3 -m json.tool < "$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"`.
> - Propose the change:
>
>   ```bash
>   flint ite map change propose "<program>" --ops - --reason "<one sentence: what the change does>" --json < "$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"
>   ```
>
>   An operation that does not apply refuses with `invalid-input` and its index ("Operation 3 (move): ..."). Repair that operation and propose again. Nothing was written.
> - Read the preview of the output (`flint ite map change show "<program>" <change id> --json`): the tree after, `findings.added`, `files`, `dangling`, and `conflicts`.
>   - The tree after must hold your plan. It must have no new finding of the level error.
>   - When the preview shows a mistake, discard your change (`flint ite map change discard "<program>" <change id>`), repair the operations, and propose again. Do this at most two times.
> - Change the main map only through a map change. Never apply the change. Once one change is proposed and its preview is correct, end as the callout of The End says.

# The End

Tell the person the result in short sentences. Give the map change id, whether the person applied it, the count of each operation, and the most important gap.

> [!headless]
> A headless session has no person to tell. It returns the result:
> 1. Run `flint orbh session set phase returning`.
> 2. Check each item of Before You Return of [[init-ite#Headless]].
> 3. Do not apply, revert, or discard the change that you return.
> 4. Return as your prompt says. When the prompt gives no shape, use the shape of [[init-ite#Headless]]. Name the map change id, the count of each operation, and the most important gap or decision.
> 5. When you proposed no change, start your result with `No change:`, and give the reason.

# Output

- One map change in `Steel/Programs/<program>/Proposals/`: applied by the person, or discarded

> [!headless]
> - One map change in `Steel/Programs/<program>/Proposals/`, with the state `proposed`
> - A result as the prompt says, with the change id
