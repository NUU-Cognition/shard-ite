---
description: "Give one level of the main map a clearer shape with split, merge, move, and rename, as one map change that a person applies, with one stage gate: the person reads the preview"
orb:
  - "@v1/nuucognition/session/578f9937-43d6-4705-9622-d380db0d2ab4#flint/nuu-orbh"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Map Refactor

Refactor one level of the main map: the children of the focus (a part, or the root). Give the level a clearer shape: related parts in one subsystem, no part with one child, no part with a marker, each part at its correct level, and a title that says what each part is. A level has no size limit: do not split a level only because it has many parts. The result is one map change that the person reads and applies. The rules of the main map are in The Main Map of [[knw-ite-programs]].

The focus of this workflow: the selected part, or the root when no node is selected.

> [!headless]
> A headless agent session follows this workflow for a job of the action `map-refactor`, with no person in the session. Do each stage, and follow the `> [!headless]` callout in it. The rules of a headless session are in [[init-ite#Headless]].
> - The focus of this job: the selected part, or the root when no node is selected.
> - The result is one map change that the person reviews and applies. The job ends with one `steel-result/1` JSON value, as the callout of The End of a Job says.

# Input

- The program (its name or id)
- (Optional) The focus: one selected part; no node is the root
- (Optional) The instructions of the person

> [!headless]
> - The prompt of the job: the data of the level of the focus (the cards, the relations, the findings) and the coverage gaps. The steps and the form of each operation are in this workflow (the callout of Stage 3).

# Actions

## Stage 1: Read the Level

1. Set the focus: `flint ite focus <the part id>` ([[sk-ite-focus]]); at the root, set it when you start to work on a part.
2. Read the level: `flint ite map show "<program>" [--focus <part>]` (the cards, the relations, the findings), `flint ite map coverage "<program>"`, and `flint ite map check "<program>"`.
3. Read the waiting changes: run `flint ite map change list "<program>" --state proposed`, then `flint ite map change show "<program>" <change id>` for each one, and read its operations. The list shows no focus: decide from the operations. When a waiting change does the task already, show it to the person, and ask: review it, or make a new one. Do not `edit` or `move` a part that a waiting change moves or edits: the later change gets a conflict (`changed`) at the apply.
4. Note the product root of a program with a codebase. A level of the main map has no size limit. When the program sets `max-children` (the `main-map` block of the program file), note it: a level of that program holds at most `max-children` parts.
5. Once you know the level, progress to the next stage.

> [!headless]
> - Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]). Then run `flint orbh session set phase reading`.
> - In place of step 2, read the level of the focus: the section The main map of the prompt of the job. When the prompt says that the ITE could not load the main map, run `flint ite map show "<program>" [--focus <part>] --json` and `flint ite map coverage "<program>" --json`.
> - Read each waiting change with `flint ite map change show "<program>" <change id> --json`.
> - When a waiting change does your task already, do not ask the person, and propose nothing: end the job as the callout of The End of a Job says, and return its id with a `summary` that says so.

## Stage 2: Read the Sources

1. Read the cards of the level: the title, the sentence, the type, the count of children, and the findings of each.
2. Read the relations of the level: the cards with many links between them belong together.
3. Read the part notes of the cards when the sentence does not say what the part is.
4. Never invent a path, a URL, or a note name. Each source that you write exists now.
5. When the scope of the task can have two meanings, ask the person one question. Ask no other question in this stage.
6. Once you know what the sources hold, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase reading-sources`.
> - Ask no question (step 5). When the scope of the task can have two meanings, select the reading that best helps the person, and write it in the `summary` (rule 3 of [[init-ite#Headless]]).

## Stage 3: Plan the Operations

1. Use only `split`, `merge`, `move`, and `rename`. Do not change sources, and do not remove parts in this job.
2. **Related parts**: when cards of the level belong together (one purpose, or many relations between them), group them into one subsystem with `split`. Each subsystem gets a title, a type of the program (a program with a codebase: `system` or `module`), and one sentence that says what it holds. Group by meaning and by the relations of the level, not by the first letter. Do not group cards only to make the level smaller. When the program sets `max-children` and the level has more children (`map-too-many-children`), group the cards so that the level holds at most `max-children` children.
3. **One child** (`map-single-child`): `merge` the child into its parent, or `move` siblings to it.
4. **A marker** (`parent-missing`, `parent-outside`, `cycle`): `move` the part to its correct parent.
5. **A part at the wrong level**: `move` it. **A title that does not say what the part is**: `rename` it. **A type that does not fit the part**: `rename` it with `kind`, the new type id (`{"op":"rename","part":"<id>","title":"<the title>","kind":"<type id>"}`). The title can stay.
6. Do not make a new level of one child.
7. Name each existing part by its id (the `id` of the cards). Follow the quality rules of [[knw-ite-programs]] for each new part. When no type of the program fits a new part, use `note`, and tell the person.
8. Once the plan does the task, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase planning`.
> - When no type of the program fits a new part, use `note`, and name the part in the `summary`.
> - The form of each operation. The prompt of the job gives only the data: the level and the gaps. A map change is one JSON array of operations. They apply in order. Name a part by its id (the `id` of the cards of the prompt of the job) or by its note name. `parent: null` is the root note (the engine writes `parent: "[[<root note>]]"`). `kind` is a type id of the program (the `types` of the root note). `sources` are the `code-refs` of a program with a codebase (paths relative to the product root; a folder ends with `/`), else wikilinks or URLs.
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
> - Change the main map only through a map change. Do not write a part file with your own tools, and do not run `flint ite part add` or `flint ite part set` on the main map in this job.

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
> - Change the main map only through a map change. Never apply the change. Once one change is proposed and its preview is correct, end the job as the callout of The End of a Job says.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the map change id, whether the person applied it, the counts of each operation, and the most important gap. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

> [!headless]
> A headless session does not end the job in the chat, and does not wait for the person. It returns the result:
> 1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[init-ite#Headless]].
> 2. Write the `summary`: what the change does (the counts of each operation), the findings that it repairs, and the most important gap or decision for the person. Use no `'` character.
> 3. Do not apply, revert, or discard the change that you return.
> 4. End the job with the result, and nothing else:
>
>    ```bash
>    flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":"<change id>","base_hash":null,"summary":"<summary>"}'
>    ```
>
>    When you proposed no change, `candidate_id` is `null`, and the `summary` starts with `No change:` and gives the reason.

# Output

- One map change in `Steel/Programs/<program>/Proposals/`: applied by the person, or discarded

> [!headless]
> - One map change in `Steel/Programs/<program>/Proposals/`, with the state `proposed`
> - One `steel-result/1` JSON value as the result of the job, with the change id as `candidate_id`
