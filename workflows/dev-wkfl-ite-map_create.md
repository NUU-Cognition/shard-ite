---
description: "Draft the root and level 1 of the main map of a program from its sources, as one map change that a person applies, with one stage gate: the person reads the preview"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Map Create

Draft the root and level 1 of the main map: 3 to 9 parts under the root, each with one sentence and its sources. Use it for a program with no main map, or with a flat map (many top parts: parts whose `parent` is the root note). The result is one map change that the person reads and applies. The rules of the main map are in The Main Map of [[init-ite]].

The focus of this workflow: the root (no node).

# Input

- The program (its name or id)
- (Optional) The instructions of the person: what the system is, and what is outside it

# Actions

## Stage 1: Read the Level

1. Set the focus: `flint ite focus <the part id>` ([[sk-ite-focus]]); at the root, set it when you start to work on a part.
2. Read the level: `flint ite map show "<program>" [--focus <part>]` (the cards, the relations, the findings), `flint ite map coverage "<program>"`, and `flint ite map check "<program>"`.
3. Read the waiting changes: run `flint ite map change list "<program>" --state proposed`, then `flint ite map change show "<program>" <change id>` for each one, and read its operations. The list shows no focus: decide from the operations. When a waiting change does the task already, show it to the person, and ask: review it, or make a new one. Do not `edit` or `move` a part that a waiting change moves or edits: the later change gets a conflict (`changed`) at the apply.
4. Note `max-children` (default 9) and the product root of a software program. When `max-children` is less than 3, read "3 to `max-children`" below as exactly `max-children`.
5. Once you know the level, progress to the next stage.

## Stage 2: Read the Sources

1. Software: list the top folders of the product root (`ls`, `git -C <product root> ls-files | cut -d/ -f1-2 | sort | uniq -c`). Read the README files and the entry points. Other programs: read the root note, the parts that exist and their `sources`, and the notes that the root note and the parts link to.
2. Find the 3 to `max-children` large things of the system: the parts that a person names when they explain the system in one minute.
3. Never invent a path, a URL, or a note name. Each source that you write exists now.
4. When the scope of the task can have two meanings, ask the person one question. Ask no other question in this stage.
5. Once you know what the sources hold, progress to the next stage.

## Stage 3: Plan the Operations

1. Write 3 to `max-children` parts under the root (`parent: null`). For each: a title of two to six words in the words of the person, a type of the `types` of the root note (software: `system` for a large part), one sentence that says what the part is, and its sources (software: the folders of the part, each ending with `/`).
2. **The 100% rule.** Together the parts cover the whole system: each top folder (or source) goes to one part. A folder that no person needs to see (a generated folder, a lock file) is not a part: name it in the result, so that the person can add it to `coverage-ignore`.
3. **Keep the parts that exist.** When the main map has parts already, do not add a second part for one thing. Put the existing children of the root under the new parts: one `split` for each new part that groups existing parts (`parent: null`, the children are the existing parts), or `add` with an `id` and then `move`.
4. Give an `add` an `id` (a new UUID v4: `uuidgen | tr A-Z a-z`) when a later operation of the same change names the new part.
5. Name each existing part by its id (the `id` of the cards). Follow the quality rules of [[init-ite]] for each new part. When no type of the program fits a new part, use `note`, and tell the person.
6. Once the plan does the task, progress to the next stage.

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
