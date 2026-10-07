---
description: "Update one part of the main map and its children from their sources now, as one map change that a person applies, with one stage gate: the person reads the preview"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Map Update

Update one part of the main map from its sources now: its sentence, its prose, its sources, and its children. The result is one map change that the person reads and applies. The rules of the main map are in The Main Map of [[init-ite]].

The focus of this workflow: the selected part.

# Input

- The program (its name or id)
- The part: one selected node
- (Optional) The instructions of the person: what changed

# Actions

## Stage 1: Read the Level

1. Set the focus: `flint ite focus <the part id>` ([[sk-ite-focus]]); at the root, set it when you start to work on a part.
2. Read the level: `flint ite map show "<program>" [--focus <part>]` (the cards, the relations, the findings), `flint ite map coverage "<program>"`, and `flint ite map check "<program>"`.
3. Read the waiting changes: run `flint ite map change list "<program>" --state proposed`, then `flint ite map change show "<program>" <change id>` for each one, and read its operations. The list shows no focus: decide from the operations. When a waiting change does the task already, show it to the person, and ask: review it, or make a new one. Do not `edit` or `move` a part that a waiting change moves or edits: the later change gets a conflict (`changed`) at the apply.
4. Note `max-children` (default 9) and the product root of a software program. When `max-children` is less than 3, read "3 to `max-children`" below as exactly `max-children`.
5. Once you know the level, progress to the next stage.

## Stage 2: Read the Sources

1. Read the part note and the notes of its children.
2. Read each source of the part and of its children now. Software: `git -C <product root> ls-files <ref>` for each code ref, and `git -C <product root> log --oneline -20 -- <refs>` for the recent changes.
3. Compare: what the notes say, and what the sources hold now.
4. Never invent a path, a URL, or a note name. Each source that you write exists now.
5. When the scope of the task can have two meanings, ask the person one question. Ask no other question in this stage.
6. Once you know what the sources hold, progress to the next stage.

## Stage 3: Plan the Operations

1. When the sentence or the prose of the part (or of a child) is not true now, `edit` it.
2. When the sources moved, `edit` the sources (the whole new list). Repair each `code-ref-missing` of the part and its children.
3. When a child is gone from the sources, `remove` it. When the sources hold a new thing that has no part, `add` a child of a type of the program.
4. When the title or the type of a part is not true now, `rename` it. For a new type, give `kind`: the new type id.
5. Change only the part and its subtree.
6. Name each existing part by its id (the `id` of the cards). Follow the quality rules of [[init-ite]] for each new part. When no type of the program fits a new part, use `note`, and tell the person.
7. Once the plan does the task, progress to the next stage.

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
