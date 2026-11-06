---
description: "Update one part of the main map and its children from their sources now, as one map change that a person applies after one stage gate (the mode `proposal`: the person reads the preview), or that the agent applies with `--apply` (the mode `direct`)"
orb:
  - "@v1/nuucognition/session/578f9937-43d6-4705-9622-d380db0d2ab4#flint/nuu-orbh"
  - "@v1/nuucognition/session/ccaed053-844a-48bd-966a-41a2e32d6412#flint/nuu-flint"
  - "@v1/nuucognition/session/c486136a-df4f-4481-826f-ab4c7dcfc657#flint/nuu-flint"
  - "@v1/nuucognition/session/cb2fbb61-6a9d-4cc8-aa5c-7588d998e369#flint/nuu-flint"
orbh-fleet: steel-map-refresh-1104
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Map Update

Update one part of the main map from its sources now: its sentence, its prose, its sources, and its children. The result is one map change: the person reads and applies it, or, in the mode `direct`, you apply it ([[init-ite#The Two Modes]]). The rules of the main map are in The Main Map of [[knw-ite-programs]].

> [!headless]
> A headless session follows this workflow with no person in the session. Do each stage, and follow the `> [!headless]` callout in it. The rules of a headless session are in [[init-ite#Headless]].
> - The result is one map change: it waits for the person, or, when the prompt says `mode: direct`, you apply it. At the end, return the change id as the prompt says (the callout of The End).

# Input

- The program (its name or id)
- The part: one selected node
- (Optional) The instructions of the person: what changed

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

1. Read the part note and the notes of its children.
2. Read each source of the part and of its children now. Software: `git -C <product root> ls-files <ref>` for each code ref, and `git -C <product root> log --oneline -20 -- <refs>` for the recent changes.
3. Compare: what the notes say, and what the sources hold now.
4. Never invent a path, a URL, or a note name. Each source that you write exists now.
5. When the scope of the task can have two meanings, ask the person one question. Ask no other question in this stage.
6. Once you know what the sources hold, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase reading-sources`.
> - Ask no question (step 5). When the scope of the task can have two meanings, select the reading that best helps the person, and write it in your result (the rule Ask no question of [[init-ite#Headless]]).

## Stage 3: Plan the Operations

1. When the sentence or the prose of the part (or of a child) is not true now, `edit` it.
2. When the sources moved, `edit` the sources (the whole new list). Repair each `code-ref-missing` of the part and its children.
3. When a child is gone from the sources, `remove` it. When the sources hold a new thing that has no part, `add` a child of a type of the program.
4. When the title or the type of a part is not true now, `rename` it. For a new type, give `kind`: the new type id.
5. Change only the part and its subtree.
6. Name each existing part by its id (the `id` of the cards). Follow the quality rules of [[knw-ite-programs]] for each new part. When no type of the program fits a new part, use `note`, and tell the person.
7. **Diagrams.** When the sources change the flow, the order of steps, or the states of a part, `edit` its prose: write the whole prose again, with the first paragraph and a diagram that shows the sources now. Follow [[knw-ite-programs#Diagrams in the Prose]].
8. Once the plan does the task, progress to the next stage.

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
> - A diagram is one fenced `mermaid` block in the `prose` of an `add` or an `edit`, after the first paragraph. The prose is one JSON string, so a new line is `\n`. The rules are in [[knw-ite-programs#Diagrams in the Prose]]:
>
>   ```text
>   "prose":"<first paragraph, plain text>\n\n<one plain sentence: what the diagram shows>\n\n```mermaid\nflowchart LR\n  A[Step one] --> B[Step two]\n```"
>   ```

## Stage 4: Propose or Apply the Change

The mode decides this stage ([[init-ite#The Two Modes]]). When nobody named a mode, the mode is `proposal`.

1. Write the operations as one JSON array to a file in the scratch folder of your session: `"$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"`. Check that it parses: `python3 -m json.tool < <file>`.
   A change of text (`edit`) needs no place. A part that you add, move, or remove does: do the stage Place the Parts on the Canvas of [[wkfl-ite-map_expand]], and add `--layout <layout file>` to the command.
2. Plan the change with no write, and read the preview:

   ```bash
   flint ite map change propose "<program>" --ops <file> --reason "<one sentence: what the change does>" --dry-run
   ```

   An operation that does not apply refuses with `invalid-input` and its index. Repair that operation and plan again. Nothing was written.
3. Write the change: run the same command with no `--dry-run`.
   - **The mode `proposal`**: the change waits for the person. Do steps 4 to 6.
   - **The mode `direct`**: add `--apply`. The change applies at once. Do step 7.
4. Show the person the preview: `flint ite map change show "<program>" <change id>` (the tree before and after with the marks, the files, the new findings, and the dangling links).
5. **Stage gate.** Ask the person: apply, change, or discard.
   - **Apply**: the person applies the change in the Workbench (the review of the change) or runs `flint ite map change apply "<program>" <change id>` in their own terminal. You cannot apply it: the apply of a proposal is for a person only, and the engine refuses an agent with `forbidden`. A conflict (`changed`) means that a file changed after the propose: propose the change again from the files now.
   - **Change**: discard the change (`flint ite map change discard "<program>" <change id>`), change the operations, and propose again.
   - **Discard**: `flint ite map change discard "<program>" <change id>`.
6. After an apply, run `flint ite map check "<program>"` and show the person the findings of the level. Once the person applied or discarded the change, the workflow is done.
7. **The mode `direct`.** Render the level again (`flint ite map render "<program>" [--in <part>] --out "$ORBH_SCRATCH_DIR/after.png"`), and read the image. Run `flint ite map check "<program>"`, and read the problems of the level. When the output of the write names a waiting proposal that now has a conflict, tell the person. When the change is wrong, revert it (`flint ite map change revert "<program>" <change id>`), and do this stage again. Then the workflow is done.

> [!headless]
> A headless session does not do the review with the person (steps 4 to 6): it reads the preview itself, and never applies a proposal. Its mode is `proposal`, unless the prompt says `mode: direct`.
> - Run `flint orbh session set phase proposing` (the mode `direct`: `applying`).
> - Write the operations in the form of the callout of Stage 3, as one JSON array to the file `"$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"` (the scratch folder of your session). Check that it parses: `python3 -m json.tool < "$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"`.
> - Plan the change with `--dry-run` first, then write it. In the mode `direct`, add `--apply`:
>
>   ```bash
>   flint ite map change propose "<program>" --ops - --reason "<one sentence: what the change does>" --json < "$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"
>   ```
>
>   An operation that does not apply refuses with `invalid-input` and its index ("Operation 3 (move): ..."). Repair that operation and propose again. Nothing was written.
> - Read the preview of the output (`flint ite map change show "<program>" <change id> --json`): the tree after, `findings.added`, `files`, `dangling`, and `conflicts`.
>   - The tree after must hold your plan. It must have no new finding of the level error.
>   - When the preview shows a mistake, repair the operations and write the change again. Do this at most two times. The mode `proposal`: discard your change first (`flint ite map change discard "<program>" <change id>`). The mode `direct`: revert it first (`flint ite map change revert "<program>" <change id>`).
> - The mode `direct`: render the level again, and read its problems. Name in your result each waiting proposal that the output names with a conflict.
> - Change the main map only through a map change. Never apply a proposal. Once one change is written and its preview is correct, end as the callout of The End says.

# The End

Tell the person the result in short sentences. Give the map change id, its state (the person applied it, it waits, or you applied it in the mode `direct`), the count of each operation, and the most important gap. In the mode `direct`, give the revert command too: `flint ite map change revert "<program>" <change id>`.

> [!headless]
> A headless session has no person to tell. It returns the result:
> 1. Run `flint orbh session set phase returning`.
> 2. Check each item of Before You Return of [[init-ite#Headless]].
> 3. Do not apply a proposal. Do not revert or discard the change that you return.
> 4. Return as your prompt says. When the prompt gives no shape, use the shape of [[init-ite#Headless]] for your mode. Name the map change id, the count of each operation, and the most important gap or decision. In the mode `direct`, name the change as applied, with its revert command.
> 5. When you wrote no change, start your result with `No change:`, and give the reason.

# Output

- One map change in `Steel/Programs/<program>/Proposals/`: applied by the person, or discarded. The mode `direct`: applied by you, with its revert command.

> [!headless]
> - One map change in `Steel/Programs/<program>/Proposals/`, with the state `proposed` (the mode `direct`: `applied`)
> - A result as the prompt says, with the change id
