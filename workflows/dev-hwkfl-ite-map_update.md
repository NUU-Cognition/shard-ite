---
description: "Headless: update one part of the main map and its children from their sources now, as one map change that a person applies"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Map Update (Headless)

Update one part of the main map from its sources now: its sentence, its prose, its sources, and its children. A headless agent session follows this workflow for a job of the action `map-update`, with no person in the session. The result is one map change that the person reviews and applies. The rules of the main map are in The Main Map of [[init-ite]]. The rules of a headless session are in [[hinit-ite]].

The focus of this job: the selected part.

# Input

- The program (its name or id)
- The part: one selected node
- (Optional) The instructions of the person: what changed
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
2. Read the part note and the notes of its children.
3. Read each source of the part and of its children now. Software: `git -C <product root> ls-files <ref>` for each code ref, and `git -C <product root> log --oneline -20 -- <refs>` for the recent changes.
4. Compare: what the notes say, and what the sources hold now.
5. Never invent a path, a URL, or a note name. Each source that you write exists now.
6. Once you know what the sources hold, progress to the next stage.

## Stage 3: Plan the Operations

1. Run `flint orbh session set phase planning`.
2. When the sentence or the prose of the part (or of a child) is not true now, `edit` it.
3. When the sources moved, `edit` the sources (the whole new list). Repair each `code-ref-missing` of the part and its children.
4. When a child is gone from the sources, `remove` it. When the sources hold a new thing that has no part, `add` a child of a type of the program.
5. When the title or the type of a part is not true now, `rename` it. For a new type, give `kind`: the new type id.
6. Change only the part and its subtree.
7. Name each existing part by its id (the `id` of the cards). Follow the quality rules of [[init-ite]] for each new part. When no type of the program fits a new part, use `note`, and name the part in the `summary`.
8. Once the plan does the task, progress to the next stage.

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
