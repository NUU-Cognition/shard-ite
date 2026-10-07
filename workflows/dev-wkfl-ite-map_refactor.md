---
description: "Bring one level of the main map to the size limit with split, merge, move, and rename, as one map change that a person applies, with one stage gate: the person reads the preview"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Map Refactor

Refactor one level of the main map: the children of the focus (a part, or the root). Bring the level to the size limit: at most `max-children` children, no part with one child, and no part with a marker. The result is one map change that the person reads and applies. The rules of the main map are in The Main Map of [[init-ite]].

The focus of this workflow: the selected part, or the root when no node is selected.

# Input

- The program (its name or id)
- (Optional) The focus: one selected part; no node is the root
- (Optional) The instructions of the person

# Actions

## Stage 1: Read the Level

1. Set the focus: `flint ite focus <the part id>` ([[sk-ite-focus]]); at the root, set it when you start to work on a part.
2. Read the level: `flint ite map show "<program>" [--focus <part>]` (the cards, the relations, the findings), `flint ite map coverage "<program>"`, and `flint ite map check "<program>"`.
3. Read the waiting changes: run `flint ite map change list "<program>" --state proposed`, then `flint ite map change show "<program>" <change id>` for each one, and read its operations. The list shows no focus: decide from the operations. When a waiting change does the task already, show it to the person, and ask: review it, or make a new one. Do not `edit` or `move` a part that a waiting change moves or edits: the later change gets a conflict (`changed`) at the apply.
4. Note `max-children` (default 9) and the product root of a software program. When `max-children` is less than 3, read "3 to `max-children`" below as exactly `max-children`.
5. Once you know the level, progress to the next stage.

## Stage 2: Read the Sources

1. Read the cards of the level: the title, the sentence, the type, the count of children, and the findings of each.
2. Read the relations of the level: the cards with many links between them belong together.
3. Read the part notes of the cards when the sentence does not say what the part is.
4. Never invent a path, a URL, or a note name. Each source that you write exists now.
5. When the scope of the task can have two meanings, ask the person one question. Ask no other question in this stage.
6. Once you know what the sources hold, progress to the next stage.

## Stage 3: Plan the Operations

1. Use only `split`, `merge`, `move`, and `rename`. Do not change sources, and do not remove parts in this job.
2. **Too many children** (`map-too-many-children`): group related cards into 2 to `max-children` subsystems with `split`. Each subsystem gets a title, a type of the program (software: `system` or `module`), and one sentence that says what it holds. Group by meaning and by the relations of the level, not by the first letter.
3. **One child** (`map-single-child`): `merge` the child into its parent, or `move` siblings to it.
4. **A marker** (`parent-missing`, `parent-outside`, `cycle`): `move` the part to its correct parent.
5. **A part at the wrong level**: `move` it. **A title that does not say what the part is**: `rename` it. **A type that does not fit the part**: `rename` it with `kind`, the new type id (`{"op":"rename","part":"<id>","title":"<the title>","kind":"<type id>"}`). The title can stay.
6. The level after the change has 3 to `max-children` children. Do not make a new level of one child.
7. Name each existing part by its id (the `id` of the cards). Follow the quality rules of [[init-ite]] for each new part. When no type of the program fits a new part, use `note`, and tell the person.
8. Once the plan does the task, progress to the next stage.

## Stage 4: Propose the Change and Review It With the Person

1. Write the operations as one JSON array to a file: `/tmp/ite-map-<program slug>.json`. Check that it parses: `python3 -m json.tool < <file>`.
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

# Output

- One map change in `Steel/Programs/<program>/Proposals/`: applied by the person, or discarded
