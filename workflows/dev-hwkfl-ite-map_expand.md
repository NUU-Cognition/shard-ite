---
description: "Headless: take one part of the main map one level deeper: 3 to 9 children that cover its sources, as one map change that a person applies"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Map Expand (Headless)

Take one part of the main map one level deeper: 3 to 9 children that together cover the sources of the part. The job `map-expand` of the Workbench starts this workflow, with no person in the session. The result is one map change that the person reviews and applies. The rules of the main map are in The Main Map of [[init-ite]]. The rules of a headless session are in [[hinit-ite]].

The focus of this job: the selected part.

# Input

- The program (its name or id)
- The part: one selected node
- (Optional) The instructions of the person
- The prompt of the job: the level of the focus, the coverage gaps, the task, and the form of each operation

# Actions

## Stage 1: Read the Level

1. Run the `flint ite focus` command of the prompt ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the level of the focus: the section The main map of the prompt. When the prompt says that the ITE could not load the main map, run `flint ite map show "<program>" [--focus <part>] --json` and `flint ite map coverage "<program>" --json`.
4. Read the waiting changes: run `flint ite map change list "<program>" --state proposed`, then `flint ite map change show "<program>" <change id> --json` for each one, and read its operations. The list shows no focus: decide from the operations. When a waiting change does your task already, propose nothing: return its id with a summary that says so. Do not `edit` or `move` a part that a waiting change moves or edits: the later change gets a conflict (`changed`) at the apply.
5. Note `max-children` (default 9) and the product root of a software program. When `max-children` is less than 3, read "3 to `max-children`" below as exactly `max-children`.
6. Once you know the level, progress to the next stage.

## Stage 2: Read the Sources

1. Run `flint orbh session set phase reading-sources`.
2. Read the part note: its sentence, its prose, and its sources.
3. Software: read the files below each code ref of the part (`git -C <product root> ls-files <ref>`). Other programs: read each source of the part (the wikilinks and the URLs of its `sources`).
4. Find the 3 to `max-children` things inside the part.
5. Never invent a path, a URL, or a note name. Each source that you write exists now.
6. Once you know what the sources hold, progress to the next stage.

## Stage 3: Plan the Operations

1. Run `flint orbh session set phase planning`.
2. Write 3 to `max-children` children under the part (`add` with `parent`: the id of the part). For each: a title of two to six words, a type of the program, one sentence, and its sources.
3. **The 100% rule.** Together the children cover all the sources of the part: each source of the part goes to one child, as the same path or as more precise paths. No two children share a file.
4. **Keep the children that exist.** When the part has children already, keep them and add only what is missing. Group existing children with `split` when that makes the level clearer.
5. When the part holds fewer than 3 things, propose no change: a part with one child is a finding. Say so in the result.
6. Name each existing part by its id (the `id` of the cards). Follow the quality rules of [[init-ite]] for each new part. When no type of the program fits a new part, use `note`, and name the part in the `summary`.
7. Once the plan does the task, progress to the next stage.

## Stage 4: Propose the Change

1. Run `flint orbh session set phase proposing`.
2. Write the operations as one JSON array to a file: `/tmp/ite-map-$ORBH_SESSION_ID.json`. Check that it parses: `python3 -m json.tool < /tmp/ite-map-$ORBH_SESSION_ID.json`.
3. Propose the change:

   ```bash
   flint ite map change propose "<program>" --ops /tmp/ite-map-$ORBH_SESSION_ID.json --reason "<one sentence: what the change does>" --json
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
4. End the turn with the result, and nothing else:

   ```bash
   flint orbh session return --finish '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":"<change id>","base_hash":null,"summary":"<summary>"}'
   ```

   When you proposed no change, `candidate_id` is `null`, and the `summary` starts with `No change:` and gives the reason.

# Output

- One map change in `Steel/Programs/<program>/Proposals/`, with the state `proposed`
- One `steel-result/1` JSON value as the result of the turn, with the change id as `candidate_id`
