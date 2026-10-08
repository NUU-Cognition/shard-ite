---
description: "Headless: add the parts that a person names below one part of the main map (or the root), as one map change of add operations that a person applies, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Parts Add (Headless)

Add the parts that a person names below one part of the main map, or below the root. A headless agent session follows this workflow for a job of the action `parts-add` ("Add parts with an agent" in the Workbench), with no person in the session. The result is one map change that the person reviews and applies. The rules of the main map are in The Main Map of [[init-ite]]. The rules of a headless session are in [[hinit-ite]].

The focus of this job: the parent part, or the root when no node is selected.

# Input

- The program (its name or id)
- (Optional) The parent: one selected part. No node is the root.
- The text of the person: the parts to add, in the words of the person

# The Operations

This workflow uses `add`, and `split` when the level gets too many parts. A map change is one JSON array of operations. They apply in order. Name a part by its id or by its note name. `parent: null` is the root note. `kind` is a type id of the program (the `types` of the root note). `sources` are the `code-refs` of a software program (paths relative to the product root; a folder ends with `/`), else wikilinks or URLs.

```text
{"op":"add","title":"<title>","kind":"<type id>","parent":"<part, or null>","sentence":"<one sentence>","prose":"<optional>","sources":["<source>"]}
{"op":"split","parent":"<part, or null>","subsystem":{"title":"<title>","kind":"<type id>","sentence":"<one sentence>"},"children":["<part>","<part>"]}
```

- `add` and `split` take an optional `id` (a new UUID v4: `uuidgen | tr A-Z a-z`). Give it when a later operation of the same change names the new part: a new part below a new part.
- `split` takes only children of its `parent` at that point of the change.
- The other operations are in The Map Change of [[init-ite]]. Change the main map only through a map change: do not write a part file with your own tools, and do not run `flint ite part add` for each part.

# Actions

## Stage 1: Read the Level

1. Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the level of the parent: `flint ite map show "<program>" [--focus <part>] --json` (the cards, the relations, the findings), and the root note (its `types`).
4. Read the waiting changes: run `flint ite map change list "<program>" --state proposed`, then `flint ite map change show "<program>" <change id> --json` for each one, and read its operations. When a waiting change adds the same parts already, propose nothing: return its id with a summary that says so.
5. Note `max-children` (default 9).
6. Once you know the level, progress to the next stage.

## Stage 2: Read the Words of the Person

1. Run `flint orbh session set phase reading-sources`.
2. Write the list of the parts that the text of the person names. Use the words of the person for each title. Do not add a part that the person did not name, except a container that groups them (see Stage 3).
3. Find each part that exists already: `flint ite map tree "<program>"`. Do not add a second part for one thing: name the existing part in the `summary`.
4. Read the note of the parent and the sources that the text names. Never invent a path, a URL, or a note name. Each source that you write exists now.
5. When the text of the person is empty or names no part, propose nothing: return `No change:` with the reason.
6. Once the list is complete, progress to the next stage.

## Stage 3: Plan the Operations

1. Run `flint orbh session set phase planning`.
2. Write one `add` for each new part, under the parent (`parent`: the id of the parent, or `null` for the root). For each: a title of two to six words in the words of the person, a type of the program, one sentence that says what the part is, the prose that the text gives, and its sources.
3. **The size limit.** The level after the change holds at most `max-children` parts. When it holds more, group related parts with one `split`, or add a container part with an `id` and put the new parts under it. When a group is not clear, add the parts and name the finding `map-too-many-children` in the `summary`, with the action `map-refactor` as the next step.
4. Follow the quality rules of [[init-ite]] for each new part. When no type of the program fits a new part, use `note`, and name the part in the `summary`.
5. Once the plan holds each part of the list, progress to the next stage.

## Stage 4: Propose the Change

1. Run `flint orbh session set phase proposing`.
2. Write the operations as one JSON array to a file: `/tmp/ite-map-$ORBH_SESSION_ID.json`. Check that it parses: `python3 -m json.tool < /tmp/ite-map-$ORBH_SESSION_ID.json`.
3. Propose the change:

   ```bash
   flint ite map change propose "<program>" --ops - --reason "<one sentence: what the change adds>" --json < /tmp/ite-map-$ORBH_SESSION_ID.json
   ```

   An operation that does not apply refuses with `invalid-input` and its index ("Operation 3 (add): ..."). Repair that operation and propose again. Nothing was written.
4. Read the preview of the output (`flint ite map change show "<program>" <change id> --json`): the tree after, `findings.added`, `files`, and `conflicts`.
   - The tree after must hold your plan. It must have no new finding of the level error.
   - When the preview shows a mistake, discard your change (`flint ite map change discard "<program>" <change id>`), repair the operations, and propose again. Do this at most two times.
5. Never apply the change. Once one change is proposed and its preview is correct, progress to the next stage.

## Stage 5: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]].
2. Write the `summary`: the count of the new parts and their parent, each part of the type `note`, each part that existed already, and the most important gap. Use no `'` character.
3. Do not apply, revert, or discard the change that you return.
4. End the job with the result, and nothing else:

   ```bash
   flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":"<change id>","base_hash":null,"summary":"<summary>"}'
   ```

   When you proposed no change, `candidate_id` is `null`, and the `summary` starts with `No change:` and gives the reason.

# Output

- One map change in `Steel/Programs/<program>/Proposals/` with the new parts, with the state `proposed`
- One activity record of the map change
- One `steel-result/1` JSON value as the result of the job, with the change id as `candidate_id`
