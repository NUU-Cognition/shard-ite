---
description: "Add the parts that a person names below one part of the main map (or the root), as one map change of add operations that a person applies, with one stage gate: the person reads the preview"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Parts Add

Add the parts that a person names below one part of the main map, or below the root. The result is one map change that the person reads and applies. The rules of the main map are in The Main Map of [[init-ite]].

The focus of this workflow: the parent part, or the root when no node is selected.

# Input

- The program (its name or id)
- (Optional) The parent: one selected part. No node is the root.
- The words of the person: the parts to add

# The Operations

This workflow uses `add`, and `split` when the level gets too many parts. A map change is one JSON array of operations. They apply in order. Name a part by its id or by its note name. `parent: null` is the root note. `kind` is a type id of the program. `sources` are the `code-refs` of a software program, else wikilinks or URLs.

```text
{"op":"add","title":"<title>","kind":"<type id>","parent":"<part, or null>","sentence":"<one sentence>","prose":"<optional>","sources":["<source>"]}
{"op":"split","parent":"<part, or null>","subsystem":{"title":"<title>","kind":"<type id>","sentence":"<one sentence>"},"children":["<part>","<part>"]}
```

`add` and `split` take an optional `id` (a new UUID v4: `uuidgen | tr A-Z a-z`) for a part that a later operation names. The other operations are in The Map Change of [[init-ite]].

# Actions

## Stage 1: Read the Level

1. Set the focus: `flint ite focus <the parent id>` ([[sk-ite-focus]]), or `flint ite focus --clear` at the root.
2. Read the level of the parent: `flint ite map show "<program>" [--focus <part>]` (the cards, the relations, the findings), and the `types` of the root note.
3. Read the waiting changes: run `flint ite map change list "<program>" --state proposed`, then `flint ite map change show "<program>" <change id>` for each one. When a waiting change adds the same parts already, show it to the person, and ask: review it, or make a new one.
4. Note `max-children` (default 9).
5. Once you know the level, progress to the next stage.

## Stage 2: Plan the Parts

1. Write the list of the parts that the person names, with the words of the person for each title. Find each part that exists already (`flint ite map tree "<program>"`), and do not add it again.
2. For each new part: a title of two to six words, a type of the program, one sentence that says what the part is, and its sources. Never invent a path, a URL, or a note name.
3. The level after the change holds at most `max-children` parts. When it holds more, group related parts with one `split`, or add a container part with an `id` and put the new parts under it.
4. Follow the quality rules of [[init-ite]] for each new part. When no type of the program fits a new part, use `note`, and tell the person.
5. When the words of the person can have two meanings, ask the person one question.
6. Once the plan holds each part of the list, progress to the next stage.

## Stage 3: Propose the Change and Review It With the Person

1. Write the operations as one JSON array to a file: `/tmp/ite-map-<program slug>.json`. Check that it parses: `python3 -m json.tool < <file>`.
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

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the map change id, whether the person applied it, the count of the new parts and their parent, and the most important gap. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

# Output

- One map change in `Steel/Programs/<program>/Proposals/` with the new parts: applied by the person, or discarded
