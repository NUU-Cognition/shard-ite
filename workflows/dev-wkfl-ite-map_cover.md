---
description: "Give each file that no part covers a place on the main map, by the sources of a part or a new part, as one map change that a person applies, with one stage gate: the person reads the preview"
orb:
  - "@v1/nuucognition/session/578f9937-43d6-4705-9622-d380db0d2ab4#flint/nuu-orbh"
  - "@v1/nuucognition/session/ccaed053-844a-48bd-966a-41a2e32d6412#flint/nuu-flint"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Map Cover

Cover the gap: give each file (or boundary item) that no part covers a part of the main map. Remove the overlaps, and repair the sources that match no file. The result is one map change that the person reads and applies. The rules of the main map are in The Main Map of [[knw-ite-programs]].

> [!headless]
> A headless session follows this workflow with no person in the session. Do each stage, and follow the `> [!headless]` callout in it. The rules of a headless session are in [[init-ite#Headless]].
> - The result is one map change that the person reads and applies. At the end, return the change id as the prompt says (the callout of The End).

# Input

- The program (its name or id)
- (Optional) The focus: one selected part; the gap files go to its subtree when they fit there
- (Optional) The instructions of the person

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

1. Read the full list of the gaps: `flint ite map coverage "<program>" --gaps --json` (`gaps`, `overlaps`, `refs_missing`). The counts are of the time of the read: other sessions can commit to the product while you work, so the total can change. Read the coverage again before you propose, and give the counts of that read in the result.
2. Group the gap files by folder. For each group, read one or two files to know what they do.
3. Find the part that each group belongs to: `flint ite map tree "<program>"` and the sentences of the parts.
4. Never invent a path, a URL, or a note name. Each source that you write exists now.
5. When the scope of the task can have two meanings, ask the person one question. Ask no other question in this stage.
6. Once you know what the sources hold, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase reading-sources`.
> - Ask no question (step 5). When the scope of the task can have two meanings, select the reading that best helps the person, and write it in your result (the rule Ask no question of [[init-ite#Headless]]).

## Stage 3: Plan the Operations

1. For each group of gap files, `edit` the sources of the part that it belongs to. `edit` replaces the whole list: give the old sources and the new paths. Prefer a folder path (`dir/`) when all the files of the folder go to one part.
2. When no part fits, `add` a new part of a type of the program, with the files, under the correct parent.
3. **Overlaps**: a file that two leaves cover stays in one leaf only: `edit` the sources of the other leaf.
4. **Missing sources** (`code-ref-missing`): `edit` the source to the path now, or remove it from the list.
5. Do not cover a file that no person needs to see (a generated file, a lock file, a fixture). Name those files in the result: the person can add them to `main-map.coverage-ignore` of the root note. `coverage-ignore` takes plain paths and globs: `**/test/` is a folder of that name at any depth, `**/package.json` is a file name at any depth, `*` does not cross `/`, `?` is one character, and `{a,b}` is one of the words.
6. **Only two leaves make an overlap.** A folder ref on a part that is not a leaf covers its files for the part and its ancestors, and makes no overlap.
7. **A folder ref that makes an overlap becomes a list of files.** When the folder ref of a leaf covers a file that another leaf also covers, replace the folder ref with the list of the files that belong to that leaf.
8. **A shared file can stay in the common ancestor.** A file that two or more leaves use can be a source of their common ancestor (a part that is not a leaf), not of each leaf.
9. **A slice never makes an overlap.** A slice is a code ref with a symbol or a line range: `path#symbol` or `path:Lx-Ly`. It covers the file. A slice and a whole-file ref of one file make no overlap. Give a slice to each leaf that is one part of a shared file, with a symbol that you read in the file.
10. **Do not edit a part that a waiting change moves.** The `move` (or the `split`) of the waiting change writes the `parent` of the same file, so your `edit` gets a conflict (`changed`) at the apply. Leave that part, or name it in the result for a later map change.
11. Name each existing part by its id (the `id` of the cards). Follow the quality rules of [[knw-ite-programs]] for each new part. When no type of the program fits a new part, use `note`, and tell the person.
12. Once the plan does the task, progress to the next stage.

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

## Stage 4: Place the Parts on the Canvas

Every part that you add, and every part that gets a new parent, needs a place: the engine refuses an agent's change without it. The method is in [[knw-ite-canvas]].

1. Read the level: `flint ite map canvas "<program>" [--in <part>]`, and render it: `flint ite map render "<program>" [--in <part>] --out "$ORBH_SCRATCH_DIR/now.png"`. Read the image with your file read tool.
2. Decide what the level says (the order, the flow, the groups). Write `layout.places` for your own parts, and the drawings that help, to a file: `"$ORBH_SCRATCH_DIR/ite-layout-<program slug>.json"` (the file holds the layout: `{"places":{...},"drawings":{...}}`). Keep each card that a person placed.
3. Write the operations of the plan to the ops file `"$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"`. Render the draft: `flint ite map render "<program>" --ops "$ORBH_SCRATCH_DIR/ite-map-<program slug>.json" --layout "$ORBH_SCRATCH_DIR/ite-layout-<program slug>.json" --out "$ORBH_SCRATCH_DIR/draft.png"`. Read the image. Fix the layout until the level reads well and the render shows no `overlap` that you made.
4. Once the image is right, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase placing`.
> - Read each image yourself with your file read tool. Ask no person.
> - Fix the layout at most three times. Then go on, and name each problem that is left in your result.
> - Never run `flint ite arrange` on a real level.

## Stage 5: Propose the Change and Review It With the Person

1. Write the operations as one JSON array to a file in the scratch folder of your session: `"$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"`. Check that it parses: `python3 -m json.tool < <file>`.
2. Propose the change:

   ```bash
   flint ite map change propose "<program>" --ops <file> --layout <layout file> --reason "<one sentence: what the change does>"
   ```

   An operation that does not apply refuses with `invalid-input` and its index. Repair that operation and propose again. Nothing was written.
   A part with no place refuses with `refused-state` (`unplaced-parts`) and a suggested place for each part. Choose better places from the canvas, and propose again. Run the propose with `--dry-run` first to see the `Layout` block.
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
>   flint ite map change propose "<program>" --ops - --layout "$ORBH_SCRATCH_DIR/ite-layout-<program slug>.json" --reason "<one sentence: what the change does>" --json < "$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"
>   ```
>
>   An operation that does not apply refuses with `invalid-input` and its index ("Operation 3 (move): ..."). Repair that operation and propose again. Nothing was written.
> - A part with no place refuses with `refused-state` (`unplaced-parts`). Choose better places from the canvas than the suggested ones, and propose again. Run the propose with `--dry-run` first.
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
