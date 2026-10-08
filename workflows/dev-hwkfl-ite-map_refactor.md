---
description: "Headless: bring one level of the main map to the size limit with split, merge, move, and rename, as one map change that a person applies"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Map Refactor (Headless)

Refactor one level of the main map: the children of the focus (a part, or the root). Bring the level to the size limit: at most `max-children` children, no part with one child, and no part with a marker. A headless agent session follows this workflow for a job of the action `map-refactor`, with no person in the session. The result is one map change that the person reviews and applies. The rules of the main map are in The Main Map of [[init-ite]]. The rules of a headless session are in [[hinit-ite]].

The focus of this job: the selected part, or the root when no node is selected.

# Input

- The program (its name or id)
- (Optional) The focus: one selected part; no node is the root
- (Optional) The instructions of the person
- The prompt of the job: the data of the level of the focus (the cards, the relations, the findings) and the coverage gaps. The steps and the form of each operation are in this workflow.

# The Operations

The prompt of the job gives only the data: the level and the gaps. The form of each operation is here. A map change is one JSON array of operations. They apply in order. Name a part by its id (the `id` of the cards of the prompt of the job) or by its note name. `parent: null` is the root note (the engine writes `parent: "[[<root note>]]"`). `kind` is a type id of the program (the `types` of the root note). `sources` are the `code-refs` of a software program (paths relative to the product root; a folder ends with `/`), else wikilinks or URLs.

```text
{"op":"add","title":"<title>","kind":"<type id>","parent":"<part, or null>","sentence":"<one sentence>","prose":"<optional>","sources":["<source>"]}
{"op":"move","part":"<part>","parent":"<part, or null>"}
{"op":"split","parent":"<part, or null>","subsystem":{"title":"<title>","kind":"<type id>","sentence":"<one sentence>"},"children":["<part>","<part>"]}
{"op":"merge","from":"<part>","into":"<part>"}
{"op":"rename","part":"<part>","title":"<new title>","kind":"<optional: a new type id>"}
{"op":"remove","part":"<part>"}
{"op":"edit","part":"<part>","sentence":"<optional>","prose":"<optional>","sources":["<the whole new list>"]}
```

- `add` and `split` take an optional `id` (a new UUID v4: `uuidgen | tr A-Z a-z`). Give it when a later operation of the same change names the new part.
- `split` takes only children of its `parent` at that point of the change.
- `merge` moves the children and the sources of `from` to `into`, rewrites each link to `from`, and removes `from`.
- `rename` keeps the id and rewrites each wikilink to the old name. With `kind`, the file name gets the new `(Type)` word.
- `remove` moves the children up one level, and leaves the links to the part: the preview lists them.
- Change the main map only through a map change. Do not write a part file with your own tools, and do not run `flint ite part add` or `flint ite part set` on the main map in this job.

# Actions

## Stage 1: Read the Level

1. Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the level of the focus: the section The main map of the prompt of the job. When the prompt says that the ITE could not load the main map, run `flint ite map show "<program>" [--focus <part>] --json` and `flint ite map coverage "<program>" --json`.
4. Read the waiting changes: run `flint ite map change list "<program>" --state proposed`, then `flint ite map change show "<program>" <change id> --json` for each one, and read its operations. The list shows no focus: decide from the operations. When a waiting change does your task already, propose nothing: return its id with a summary that says so. Do not `edit` or `move` a part that a waiting change moves or edits: the later change gets a conflict (`changed`) at the apply.
5. Note `max-children` (default 9) and the product root of a software program. When `max-children` is less than 3, read "3 to `max-children`" below as exactly `max-children`.
6. Once you know the level, progress to the next stage.

## Stage 2: Read the Sources

1. Run `flint orbh session set phase reading-sources`.
2. Read the cards of the level: the title, the sentence, the type, the count of children, and the findings of each.
3. Read the relations of the level: the cards with many links between them belong together.
4. Read the part notes of the cards when the sentence does not say what the part is.
5. Never invent a path, a URL, or a note name. Each source that you write exists now.
6. Once you know what the sources hold, progress to the next stage.

## Stage 3: Plan the Operations

1. Run `flint orbh session set phase planning`.
2. Use only `split`, `merge`, `move`, and `rename`. Do not change sources, and do not remove parts in this job.
3. **Too many children** (`map-too-many-children`): group related cards into 2 to `max-children` subsystems with `split`. Each subsystem gets a title, a type of the program (software: `system` or `module`), and one sentence that says what it holds. Group by meaning and by the relations of the level, not by the first letter.
4. **One child** (`map-single-child`): `merge` the child into its parent, or `move` siblings to it.
5. **A marker** (`parent-missing`, `parent-outside`, `cycle`): `move` the part to its correct parent.
6. **A part at the wrong level**: `move` it. **A title that does not say what the part is**: `rename` it. **A type that does not fit the part**: `rename` it with `kind`, the new type id (`{"op":"rename","part":"<id>","title":"<the title>","kind":"<type id>"}`). The title can stay.
7. The level after the change has 3 to `max-children` children. Do not make a new level of one child.
8. Name each existing part by its id (the `id` of the cards). Follow the quality rules of [[init-ite]] for each new part. When no type of the program fits a new part, use `note`, and name the part in the `summary`.
9. Once the plan does the task, progress to the next stage.

## Stage 4: Propose the Change

1. Run `flint orbh session set phase proposing`.
2. Write the operations as one JSON array to a file: `/tmp/ite-map-$ORBH_SESSION_ID.json`. Check that it parses: `python3 -m json.tool < /tmp/ite-map-$ORBH_SESSION_ID.json`.
3. Propose the change:

   ```bash
   flint ite map change propose "<program>" --ops - --reason "<one sentence: what the change does>" --json < /tmp/ite-map-$ORBH_SESSION_ID.json
   ```

   An operation that does not apply refuses with `invalid-input` and its index ("Operation 3 (move): ..."). Repair that operation and propose again. Nothing was written.
4. Read the preview of the output (`flint ite map change show "<program>" <change id> --json`): the tree after, `findings.added`, `files`, `dangling`, and `conflicts`.
   - The tree after must hold your plan. It must have no new finding of the level error.
   - When the preview shows a mistake, discard your change (`flint ite map change discard "<program>" <change id>`), repair the operations, and propose again. Do this at most two times.
5. When `flint ite map` has no verbs in the CLI (an older build), propose nothing. Keep the file of the operations, and say in the `summary` that the CLI has no map verbs, with the path of the file.
6. Never apply the change. Once one change is proposed and its preview is correct, progress to the next stage.

## Stage 5: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]].
2. Write the `summary`: what the change does (the counts of each operation), the findings that it repairs, and the most important gap or decision for the person. Use no `'` character.
3. Do not apply, revert, or discard the change that you return.
4. End the job with the result, and nothing else:

   ```bash
   flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":"<change id>","base_hash":null,"summary":"<summary>"}'
   ```

   When you proposed no change, `candidate_id` is `null`, and the `summary` starts with `No change:` and gives the reason.

# Output

- One map change in `Steel/Programs/<program>/Proposals/`, with the state `proposed`
- One `steel-result/1` JSON value as the result of the job, with the change id as `candidate_id`
