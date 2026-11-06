---
description: "Make a new program with a person: the purpose and the template, the first map as one map change (proposed, or applied with `--apply` in the mode `direct`), the check, and the list of what only the person applies or can revert; in a headless session, make it for a person or a manager, and return a result that lists each map change that waits for the person, or each change that the mode `direct` applied"
orb:
  - "@v1/nuucognition/session/ccaed053-844a-48bd-966a-41a2e32d6412#flint/nuu-flint"
  - "@v1/nuucognition/session/c486136a-df4f-4481-826f-ab4c7dcfc657#flint/nuu-flint"
  - "@v1/nuucognition/session/cb2fbb61-6a9d-4cc8-aa5c-7588d998e369#flint/nuu-flint"
orbh-fleet: steel-map-refresh-1104
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Program Create

Make one program from the words of a person, and draft its first map. Example: "Make a program for my weekly team meeting." You make the program and propose its first map. The person reads the map change and applies it. In the mode `direct`, you apply the first map yourself ([[init-ite#The Two Modes]]).

A new program gets only its root note: no other file. Use the words of the person. Do not teach the person a new word.

> [!headless]
> A headless session follows this workflow with no person in the session. Do each stage, and follow the `> [!headless]` callout in it. The rules are in [[init-ite#Headless]].
> - You propose the first map. The person reads your result later and applies the map change with one command. When the prompt says `mode: direct`, you apply it with `--apply`, and your result gives its revert command.

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

   The command writes the root note (with the `types` of the template) and `Steel/Programs/<name>/program.md`. Its output names the root note and the next commands.
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
4. **Diagrams.** When a part of level 1 has a flow, an order of steps, or states, give its `prose` one Mermaid diagram, after the first paragraph. Follow [[knw-ite-programs#Diagrams in the Prose]].
5. Write the operations into one JSON array (The Operations of a Map Change in [[init-ite]]), in a file in the scratch folder of your session: `"$ORBH_SCRATCH_DIR/ite-map-<program slug>.json"`. Check that it parses: `python3 -m json.tool < <file>`. For a deeper part, give its parent an `id` (a new UUID v4) in the same change.
6. Once the plan holds the parts of level 1, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase first-map`.
> - Do not invent a fact: say a gap in the sentence of the part.
> - Put a deeper level in the same change, and give its parent an `id` (a new UUID v4): a map change cannot name a part of another waiting change.

## Stage 3: Place the Parts on the Canvas

The new program has only its root note, so the first map has no level to keep. Every part of the first map needs a place: the engine refuses an agent's change without it. The method is in [[knw-ite-canvas]].

1. Decide what level 1 says: the order, the flow, and the groups.
2. Write `layout.places` for each part, and the drawings that help, to a file: `"$ORBH_SCRATCH_DIR/ite-layout-<program slug>.json"` (the file holds the layout: `{"places":{...},"drawings":{...}}`).
3. Render the draft: `flint ite map render "<program>" --ops "$ORBH_SCRATCH_DIR/ite-map-<program slug>.json" --layout "$ORBH_SCRATCH_DIR/ite-layout-<program slug>.json" --out "$ORBH_SCRATCH_DIR/draft.png"`. Read the image with your file read tool. Fix the layout until the level reads well and the render shows no `overlap` that you made.
4. Once the image is right, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase placing`.
> - Read each image yourself. Ask no person. Fix the layout at most three times, then go on and name each problem that is left in your result.
> - Never run `flint ite arrange` on a real level.

## Stage 4: Propose or Apply the First Map

The mode decides this stage ([[init-ite#The Two Modes]]). When nobody named a mode, the mode is `proposal`.

1. Plan it with `--dry-run` first, and read the preview and the `Layout` block. Then write it, and read the preview:

   ```bash
   flint ite map change propose "<program>" --ops "$ORBH_SCRATCH_DIR/ite-map-<program slug>.json" --layout "$ORBH_SCRATCH_DIR/ite-layout-<program slug>.json" --reason "<one sentence for the person>"
   flint ite map change show "<program>" <change id>
   ```

   In the mode `direct`, add `--apply` to the propose: the first map applies at once.
   An operation that does not apply refuses with `invalid-input` and its index. Repair that operation and propose again. Nothing was written.
   A part with no place refuses with `refused-state` (`unplaced-parts`) and a suggested place for each part. Choose better places from the canvas, and propose again.
2. **Stage gate (the mode `proposal`).** Show the person the tree after. Ask: apply, change, or discard.
   - **Apply**: the person applies it in the Workbench, or runs `flint ite map change apply "<program>" <change id>` in their own terminal. You never apply a proposal.
   - **Change**: discard the change (`flint ite map change discard "<program>" <change id>`), change the operations, and propose again.
   - **Discard**: `flint ite map change discard "<program>" <change id>`.
3. **The mode `direct`.** Render level 1 (`flint ite map render "<program>" --out "$ORBH_SCRATCH_DIR/after.png"`), read the image, and read its problems. When the first map is wrong, revert it (`flint ite map change revert "<program>" <change id>`), and do this stage again.
4. Once the change is applied or discarded, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase proposing` (the mode `direct`: `applying`).
> - Read the preview with `flint ite map change show "<program>" <change id> --json`. The state must be `proposed` (the mode `direct`: `applied`), with no conflict and no new error finding in the tree after. When the preview shows a mistake, discard your change (the mode `direct`: revert it), repair the operations, and write it again. Do this at most two times.
> - Do not show the tree to a person, and do not wait for the apply (steps 2 and 4). Never apply a proposal. Progress to the next stage.

## Stage 5: Check

1. Run `flint ite map check "<program>"` and `flint ite check "<program>"`. Repair each error of a part that you proposed: discard the change, and propose it again with the repair. In the mode `direct`, repair it with one more change and `--apply`.
2. Before the apply, the program has no part, so the check reads only the root note. After the apply, run `flint ite map check "<program>"` again, and show the person the findings of level 1.
3. Progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase checking`.
> - The mode `proposal`: read the tree after of your change for its findings: the person applies it later. The mode `direct`: run `flint ite map check "<program>"` now.

## Stage 6: Hand Over

1. Show the person the list of what only the person does, one command each. In the mode `direct`, show the revert command of each change in its place, the newest first:

   ```bash
   flint ite map change apply "<program>" <change id>     # the mode proposal: when not applied yet
   flint ite map change revert "<program>" <change id>    # the mode direct: to take the change back
   ```

2. Propose the next step, as one more map change: a part one level deeper ([[wkfl-ite-map_expand]]), the files that no part covers ([[wkfl-ite-map_cover]]), or the parts that the person names ([[wkfl-ite-parts_add]]).
3. The workflow is done.

> [!headless]
> - Do not show the list to a person (step 1), and do not propose the next step to a person (step 2). Return as your prompt says. When the prompt gives no shape, use the shape of [[init-ite#Headless]] for your mode. The mode `proposal`:
>
>   ```
>   PROGRAM: <name> (<template>): <purpose>
>   PROPOSED: <the map change id, with the count of each operation>
>   WAITS FOR YOU: flint ite map change apply "<program>" <change id>
>   GAPS: <what you did not know, and the question for the person>
>   ```
>
>   The mode `direct`: `APPLIED: <the map change id, with the count of each operation>` in place of `PROPOSED`, and `REVERT: flint ite map change revert "<program>" <change id>` in place of `WAITS FOR YOU`.

# Output

- One program: the root note and `Steel/Programs/<name>/program.md`
- One map change with the first level: applied by the person, or discarded. The mode `direct`: applied by you.
- The list of the applies for the person (the mode `direct`: the revert commands)

> [!headless]
> - One program, or one extended program
> - One map change that waits for the person, with the state `proposed` (the mode `direct`: `applied`)
> - A result that names the change id, and the apply command that only the person runs (the mode `direct`: the revert command)
