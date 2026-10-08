---
description: "Headless: make or extend the map of a system from the words of a person and from sources, propose the parts as one map change, write the links of the parts that exist with flint ite, and return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Model (Headless)

Make the map of a system, or add parts to a map that exists, with no person in the session. The new parts go into one map change that the person reviews and applies. The rules of the files and the quality rules are in [[init-ite]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program (its name and its id) and the document `map`
- The instructions of the person: the system, its purpose, and the sources
- (Optional) The selected nodes: the parts that the new parts go inside or beside

# Actions

## Stage 1: Understand the System

1. Run the `flint ite focus` command of the prompt ([[sk-ite-focus]]). With no node, focus on the top parts of the map. When the map is empty, you set the focus in Stage 4, step 3.
2. Run `flint orbh session set phase reading`.
3. Say the system again in one or two sentences: what it is, where it starts and ends, and who acts in it. When the boundary is not clear, select the reading that best helps the person, and keep it for the `summary`.
4. Read the program: `flint ite map "<program>" --json` and the root note. Keep the parts, their types, their parents, and their links, and the `types` of the root note. For an OrbCode project (a program of the template `software` in `Mesh/OrbCode/`), stop and write nothing: return `No change:` with the change that you would make, and the next step "use the OrbCode shard, or a map job" (rule 6 of [[hinit-ite]]).
5. Once you can say the system in one or two sentences, progress to the next stage.

## Stage 2: Read the Sources

1. Read each source that the instructions name. Search the Mesh for more (`grep -ril "<word>" Mesh | head`). Read only what helps you name the parts.
2. Write a list of the candidate parts: a title in the words of the person, a one-sentence description, and the source of each. Use one term for one thing.
3. Note each gap: a thing that a part needs and that no source says. Do not invent it.
4. Once the list holds the parts of the system, progress to the next stage.

## Stage 3: Select the Structure

1. Run `flint orbh session set phase shaping`.
2. Use the types of the program: the `types` of the root note (`flint ite types` gives the capabilities of each type). Give each candidate part one of them. When no type fits, use `note`, and name the part in the `summary`. Never invent a type.
3. Select, do not dump: 12 to 40 parts for a new map; for an extension, only the parts that the instructions ask for. Merge parts that say one idea.
4. Select the parents. The map opens on its top level, so the top level has 3 to 9 parts: containers (parts of a type with the capability `container`, for example a `system`, a `goal`, a `milestone`, a `method`, or a `team`, as the types of the program have them) and the few parts that stand alone. A top part has the root note as its parent. Each other part gets a parent part. A map of 19 top parts is 19 cards in a grid: it is not a map.
5. Select the links (`next`, `depends-on`, `uses`, `owner`, `informs`). Name a link only when it is true.
6. Once the outline is complete, progress to the next stage.

## Stage 4: Write the Parts

1. Run `flint orbh session set phase writing`.
2. Write the operations as one JSON array to a file: `/tmp/ite-model-$ORBH_SESSION_ID.json`, the parents first. Each new part is one `add`:

   ```json
   {"op":"add","id":"<new UUID>","title":"<title>","kind":"<type id>","parent":"<parent id, or null for the root note>","sentence":"<one sentence: what the part is>","prose":"<one or two short paragraphs more>"}
   ```

   Give each parent an `id` (a new UUID v4: `uuidgen | tr A-Z a-z`), so that its children name it as `parent`. `kind` is the type id of a type of the program (`Milestone` gives `milestone`). The prose follows the sentence: do not write the sentence again. Say in the prose how the part connects to other parts. Check that the file parses: `python3 -m json.tool < /tmp/ite-model-$ORBH_SESSION_ID.json`.
3. Set the focus on the parents of the new parts, so that the person sees where you work: `flint ite focus <id> <id> ...` with the ids of the selected nodes, or the ids that you gave to the new top parts ([[sk-ite-focus]]).
4. Each note of the Mesh that exists and that is a part of the system (a Task, a Person, a meeting) joins the program in the same change: add `{"op":"move","part":"<note name>","parent":"<part id, or null for the root note>"}` to the array. The move writes the `parent` of the note, so that its `parent` chain reaches the root note. Do not copy a note that exists. The engine refuses the move of a note of another program: a note has one home, so link to it.
5. Propose all the parts as one map change:

   ```bash
   flint ite map change propose "<program>" --ops /tmp/ite-model-$ORBH_SESSION_ID.json --reason "<one sentence: what the change adds>" --json
   ```

   Keep the change id (`mc-...`). Do not run `flint ite part add` for each part: an agent's `part add` makes one proposal for each part. An operation that does not apply refuses with `invalid-input` and its index ("Operation 3 (add): ..."). Repair that operation and propose again. Nothing was written.
6. Read the preview (`flint ite map change show "<program>" <change id> --json`): the tree after must hold your plan, with no new finding of the level error. When the preview shows a mistake, discard your change (`flint ite map change discard "<program>" <change id>`), repair the operations, and propose again. Do this at most two times. Never apply the change.
7. Write each link that starts at a part that exists now: `flint ite link "<program>" <from id> <to id> --relation <key>`. Set the other fields of a part that exists with `flint ite part set "<program>" <id> --field <key>=<value>` (never `title`, `kind`, or `parent`). A link of a new part waits for the apply: the part has no file yet, and `flint ite link` refuses it. Keep the count of the waiting links for the `summary`.
8. When the root note has no text for a person, write it below the H1: what the system is, how to read the map, and what the map leaves out. Change no other line of the root note, and keep a `system` block when it has one.
9. When `flint ite map change` is not a command of the CLI (an older build), propose nothing, and write no part file by hand. Keep the file of the operations, and say in the `summary` that the CLI has no map changes, with the path of the file.
10. Once the change is proposed and each link of the parts that exist is written, progress to the next stage.

## Stage 5: Check

1. Run `flint orbh session set phase checking`.
2. Run `flint ite check "<program>"`. Repair each error of the parts that you changed (`format`, `link-missing`). A `no-process` note is correct for a new part: the job `ground` gives it a process.
3. Read the tree after of the change (`flint ite map change show "<program>" <change id>`). Check the new parts against the quality rules of [[init-ite]].
4. Once the check has no error of your parts, progress to the next stage.

## Stage 6: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: the count of the new parts in the change, of the notes that join the program, and of the links (written now, and waiting for the apply), the reading that you selected, and the most important gap or the most important part that you left out. Name each part of the type `note` because no type fits. Propose the job `ground` when the parts make claims and have no process, and the job `model` again after the apply when links wait. Use no `'` character.
3. Do not apply, revert, or discard the change that you return.
4. End the turn with the result, and nothing else:

   ```bash
   flint orbh session return --finish '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":"<change id>","base_hash":null,"summary":"<summary>"}'
   ```

   When you proposed no change, `candidate_id` is `null`, and the `summary` starts with `No change:` and gives the reason.

# Output

- One map change with the new parts in `Steel/Programs/<program>/Proposals/`, with the state `proposed`, and the links of the parts that exist, written with `flint ite`
- One `steel-result/1` JSON value as the result of the turn, with the change id as `candidate_id`
