---
description: "Add the parts that a person names below one part of the main map (or the root), as one map change of add operations that a person applies, with one stage gate: the person reads the preview; in a headless session, return the change id as the prompt says"
orb:
  - "@v1/nuucognition/session/578f9937-43d6-4705-9622-d380db0d2ab4#flint/nuu-orbh"
  - "@v1/nuucognition/session/ccaed053-844a-48bd-966a-41a2e32d6412#flint/nuu-flint"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Parts Add

Add the parts that a person names below one part of the main map, or below the root. The result is one map change that the person reads and applies. The rules of the main map are in The Main Map of [[knw-ite-programs]].

> [!headless]
> A headless session follows this workflow with no person in the session. Do each stage, and follow the `> [!headless]` callout in it. The rules of a headless session are in [[init-ite#Headless]].
> - The result is one map change that the person reads and applies. At the end, return the change id as the prompt says (the callout of The End).

# Input

- The program (its name or id)
- (Optional) The parent: one selected part. No node is the root.
- The words of the person: the parts to add

> [!headless]
> - The words of the person are the text of the person in the prompt: the parts to add, in the words of the person.

# The Operations

This workflow uses `add`, and `split` when related parts belong in one container. A map change is one JSON array of operations. They apply in order. Name a part by its id or by its note name. `parent: null` is the root note. `kind` is a type id of the program. `sources` are the `code-refs` of a program with a codebase, else wikilinks or URLs.

```text
{"op":"add","title":"<title>","kind":"<type id>","parent":"<part, or null>","sentence":"<one sentence>","prose":"<optional>","sources":["<source>"]}
{"op":"split","parent":"<part, or null>","subsystem":{"title":"<title>","kind":"<type id>","sentence":"<one sentence>"},"children":["<part>","<part>"]}
```

`add` and `split` take an optional `id` (a new UUID v4: `uuidgen | tr A-Z a-z`) for a part that a later operation names. The other operations are in The Map Change of [[knw-ite-programs]].

> [!headless]
> - `kind` is a type id of the program (the `types` of the root note). The `code-refs` are paths relative to the product root; a folder ends with `/`.
> - Give an `id` to an `add` or a `split` when a later operation of the same change names the new part: a new part below a new part.
> - `split` takes only children of its `parent` at that point of the change.
> - Change the main map only through a map change: do not write a part file with your own tools, and do not run `flint ite part add` for each part.

# Actions

## Stage 1: Read the Level

1. Read the level of the parent: `flint ite map show "<program>" [--focus <part>]` (the cards, the relations, the findings), and the `types` of the root note.
2. Read the waiting changes: run `flint ite map change list "<program>" --state proposed`, then `flint ite map change show "<program>" <change id>` for each one. When a waiting change adds the same parts already, show it to the person, and ask: review it, or make a new one.
3. Note `max-children` when the program sets it (the `main-map` block of the program file). When the program does not set it, a level has no size limit.
4. Once you know the level, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase reading`.
> - Read the level of the parent with `flint ite map show "<program>" [--focus <part>] --json`, and the root note (its `types`).
> - Read each waiting change with `flint ite map change show "<program>" <change id> --json`, and read its operations. When a waiting change adds the same parts already, do not ask the person, and propose nothing: end as the callout of The End says. Name the id of that waiting change in your result.

## Stage 2: Plan the Parts

1. Write the list of the parts that the person names, with the words of the person for each title. Find each part that exists already (`flint ite map tree "<program>"`), and do not add it again.
2. For each new part: a title of two to six words, a type of the program, one sentence that says what the part is, and its sources. Never invent a path, a URL, or a note name.
3. A level has no size limit. When the new parts belong together, group them with one `split`, or add a container part with an `id` and put the new parts under it. When the program sets `max-children`, the level after the change holds at most `max-children` parts.
4. Follow the quality rules of [[knw-ite-programs]] for each new part. When no type of the program fits a new part, use `note`, and tell the person.
5. When the words of the person can have two meanings, ask the person one question.
6. Once the plan holds each part of the list, progress to the next stage.

> [!headless]
> - At the start, run `flint orbh session set phase reading-sources`.
> - Write the list of the parts that the text of the person names. Do not add a part that the person did not name, except a container that groups them.
> - Do not add a second part for one thing: name the existing part in your result.
> - Read the note of the parent and the sources that the text names. Each source that you write exists now.
> - When the text of the person is empty or names no part, propose nothing: end as the callout of The End says. Start your result with `No change:`, and give the reason.
> - Before you plan the operations, run `flint orbh session set phase planning`.
> - Write one `add` for each new part, under the parent (`parent`: the id of the parent, or `null` for the root). For each: a title of two to six words in the words of the person, a type of the program, one sentence that says what the part is, the prose that the text gives, and its sources.
> - When the program sets `max-children` and a group is not clear, add the parts and name the finding `map-too-many-children` in your result, with [[wkfl-ite-map_refactor]] as the next step.
> - When no type of the program fits a new part, use `note`, and name the part in your result.
> - Ask no question (step 5). When the text can have two meanings, select the reading that best helps the person, and write it in your result (the rule Ask no question of [[init-ite#Headless]]).

## Stage 3: Propose the Change and Review It With the Person

1. Write the operations as one JSON array to a file in the scratch folder of your session: `"$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"`. Check that it parses: `python3 -m json.tool < <file>`.
2. Propose the change:

   ```bash
   flint ite map change propose "<program>" --ops - --reason "<one sentence: what the change adds>" < <file>
   ```

   An operation that does not apply refuses with `invalid-input` and its index. Repair that operation and propose again. Nothing was written.
3. Show the person the preview: `flint ite map change show "<program>" <change id>` (the tree before and after with the marks, the files, and the new findings).
4. **Stage gate.** Ask the person: apply, change, or discard.
   - **Apply**: the person applies the change in the Workbench (the review of the change) or runs `flint ite map change apply "<program>" <change id>` in their own terminal. You cannot apply it: in an Orbh session the engine refuses an agent with `forbidden`. A conflict (`changed`) means that a file changed after the propose: propose the change again from the files now.
   - **Change**: discard the change (`flint ite map change discard "<program>" <change id>`), change the operations, and propose again.
   - **Discard**: `flint ite map change discard "<program>" <change id>`.
5. After an apply, run `flint ite map check "<program>"` and show the person the findings of the level.
6. Once the person applied or discarded the change, the workflow is done.

> [!headless]
> A headless session does not do the review with the person (steps 3 to 6): it reads the preview itself, and never applies the change.
> - Run `flint orbh session set phase proposing`.
> - Write the operations as one JSON array to the file `"$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"` (the scratch folder of your session). Check that it parses: `python3 -m json.tool < "$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"`.
> - Propose the change:
>
>   ```bash
>   flint ite map change propose "<program>" --ops - --reason "<one sentence: what the change adds>" --json < "$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"
>   ```
>
>   An operation that does not apply refuses with `invalid-input` and its index ("Operation 3 (add): ..."). Repair that operation and propose again. Nothing was written.
> - Read the preview of the output (`flint ite map change show "<program>" <change id> --json`): the tree after, `findings.added`, `files`, and `conflicts`.
>   - The tree after must hold your plan. It must have no new finding of the level error.
>   - When the preview shows a mistake, discard your change (`flint ite map change discard "<program>" <change id>`), repair the operations, and propose again. Do this at most two times.
> - Change the main map only through a map change. Never apply the change. Once one change is proposed and its preview is correct, end as the callout of The End says.

# The End

Tell the person the result in short sentences. Give the map change id, whether the person applied it, the count of the new parts and their parent, and the most important gap.

> [!headless]
> A headless session has no person to tell. It returns the result:
> 1. Run `flint orbh session set phase returning`.
> 2. Check each item of Before You Return of [[init-ite#Headless]].
> 3. Do not apply, revert, or discard the change that you return.
> 4. Return as your prompt says. When the prompt gives no shape, use the shape of [[init-ite#Headless]]. Name the map change id, the count of the new parts and their parent, and the most important gap or decision.
> 5. When you proposed no change, start your result with `No change:`, and give the reason.

# Output

- One map change in `Steel/Programs/<program>/Proposals/` with the new parts: applied by the person, or discarded

> [!headless]
> - One map change in `Steel/Programs/<program>/Proposals/` with the new parts, with the state `proposed`
> - A result as the prompt says, with the change id
