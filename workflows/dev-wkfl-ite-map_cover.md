---
description: "Give each file that no part covers a place on the main map, by the sources of a part or a new part, as one map change that a person applies, with one stage gate: the person reads the preview"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Map Cover

Cover the gap: give each file (or boundary item) that no part covers a part of the main map. Remove the overlaps, and repair the sources that match no file. The result is one map change that the person reads and applies. The rules of the main map are in The Main Map of [[init-ite]].

The focus of this workflow: the selected part, or the root when no node is selected.

# Input

- The program (its name or id)
- (Optional) The focus: one selected part; the gap files go to its subtree when they fit there
- (Optional) The instructions of the person

# Actions

## Stage 1: Read the Level

1. Set the focus: `flint ite focus <the part id>` ([[sk-ite-focus]]); at the root, set it when you start to work on a part.
2. Read the level: `flint ite map show "<program>" [--focus <part>]` (the cards, the relations, the findings), `flint ite map coverage "<program>"`, and `flint ite map check "<program>"`.
3. Read the waiting changes: run `flint ite map change list "<program>" --state proposed`, then `flint ite map change show "<program>" <change id>` for each one, and read its operations. The list shows no focus: decide from the operations. When a waiting change does the task already, show it to the person, and ask: review it, or make a new one. Do not `edit` or `move` a part that a waiting change moves or edits: the later change gets a conflict (`changed`) at the apply.
4. Note `max-children` (default 9) and the product root of a software program. When `max-children` is less than 3, read "3 to `max-children`" below as exactly `max-children`.
5. Once you know the level, progress to the next stage.

## Stage 2: Read the Sources

1. Read the full list of the gaps: `flint ite map coverage "<program>" --gaps --json` (`gaps`, `overlaps`, `refs_missing`). The counts are of the time of the read: other sessions can commit to the product while you work, so the total can change. Read the coverage again before you propose, and give the counts of that read in the result.
2. Group the gap files by folder. For each group, read one or two files to know what they do.
3. Find the part that each group belongs to: `flint ite map tree "<program>"` and the sentences of the parts.
4. Never invent a path, a URL, or a note name. Each source that you write exists now.
5. When the scope of the task can have two meanings, ask the person one question. Ask no other question in this stage.
6. Once you know what the sources hold, progress to the next stage.

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
10. **Do not edit a part that a waiting change moves.** The `move` (or the `split`) of the waiting change writes the `parent` of the same file, so your `edit` gets a conflict (`changed`) at the apply. Leave that part, or name it in the result for a later job.
11. Name each existing part by its id (the `id` of the cards). Follow the quality rules of [[init-ite]] for each new part. When no type of the program fits a new part, use `note`, and tell the person.
12. Once the plan does the task, progress to the next stage.

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

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the map change id, whether the person applied it, the counts of each operation, and the most important gap. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

# Output

- One map change in `Steel/Programs/<program>/Proposals/`: applied by the person, or discarded
