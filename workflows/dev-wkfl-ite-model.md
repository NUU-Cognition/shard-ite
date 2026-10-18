---
description: "Make or extend the map of a system from the words of a person and from sources: read, select the template and the types, propose the parts as one map change that the person applies, link them, and name what you left out; in a headless session, return one steel-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Model

Make the map of a system, or add parts to a map that exists. The result is a program whose map a person can read: the parts in the words of the person, their links, and a list of what the map leaves out. The parts come in as one map change that the person applies. The rules of the files and the quality rules are in [[knw-ite-programs]].

> [!headless]
> A headless agent session follows this workflow with no person in the session. Do each stage, and follow the `> [!headless]` callout in it. The rules of a headless session are in [[init-ite#Headless]].
> - The new parts go into one map change that the person reviews and applies.
> - The job ends with one `steel-result/1` JSON value, as the callout of The End of a Job says.

# Input

- The system, in the words of the person: what it is, why the person wants to model it
- (Optional) The program, when it exists: its name or its id
- (Optional) Sources: notes of the Mesh, files, pages, or the conversation
- (Optional) The nodes to extend: the ids of parts that the new parts go inside or beside

> [!headless]
> - The program (its name and its id) and the document `map`
> - The instructions of the person: the system, its purpose, and the sources
> - (Optional) The selected nodes: the parts that the new parts go inside or beside

# Actions

## Stage 1: Understand the System

1. Set the focus. For a program that exists, run `flint ite focus <ids of the selected parts, or of the top parts>` ([[sk-ite-focus]]). For a new program, set the focus after Stage 3.
2. Say the system again in one or two sentences, in the words of the person: what it is, where it starts and ends, and who acts in it. Ask the person one question when the boundary is not clear. Ask no other question in this stage.
3. For a program that exists, read it: `flint ite map "<program>" --json`. Keep the parts, their types, their parents, and their links. Read the root note (its `types`) and the notes of the selected parts.
4. Once you can say the system in one or two sentences, progress to the next stage.

> [!headless]
> - Run the `flint ite focus` command of the prompt of the job ([[sk-ite-focus]]). With no node, focus on the top parts of the map. When the map is empty, you set the focus in Stage 4.
> - Run `flint orbh session set phase reading`.
> - Ask no question. When the boundary is not clear, select the reading that best helps the person, and keep it for the `summary`.
> - Read the program: `flint ite map "<program>" --json` and the root note. Keep the parts, their types, their parents, and their links, and the `types` of the root note.

## Stage 2: Read the Sources

1. Read each source that the person gave. Search the Mesh for more: the notes that name the system, its people, and its events (`grep -ril "<word>" Mesh | head`). Read only what helps you name the parts.
2. Write a list of the candidate parts: for each, a title in the words of the person, a one-sentence description, and the source that says it. Note the words that the sources use for each thing, and use one term for one thing.
3. Note each thing that a part needs and that no source says (a gap). Do not invent it.
4. Once the list holds the parts of the system, progress to the next stage.

## Stage 3: Select the Template and the Structure

1. For a new program, run `flint ite templates`. Select the template whose types fit the parts: `process` for a process of a business, `event` for an event, `research` for research, `organisation` for a team, `general` when no other fits. A software product with a codebase is a program of the template `software`: give its root note `codebase` and `product-root`, and give its parts `code-refs` and `stories` (see Programs with a Codebase of [[knw-ite-software]]). The field `codebase`, not the template, gives a program its file coverage and its code checks. A program that exists keeps its types: the `types` of its root note. `flint ite types` gives the capabilities of each type (for example `container`, `dated`, `has-status`).
2. Give each candidate part one type of the program (for a new program, a type of the template). When no type fits, use `note`, and tell the person. Never invent a type: a new type is a type note that the person agrees to. Do not add a template or a type unless the person asks.
3. Select, do not dump: keep 12 to 40 parts for a new map. Merge parts that say one idea. Remove parts that do not help a person see the system.
4. Select the parents: the containers of the map, of a type with the capability `container` (a system holds steps, a milestone holds deliverables). A top part has the root note as its parent.
5. Select the links: `next` for the order of a process, `depends-on` and `uses` for a dependency, `owner` for who answers for a part, `informs` for information that goes from one part to another. Name a link only when it is true.
6. A process, a data item, or a view that the person must see on the map is a pointer part: a part with `points-to` (`process:<id>`, `data:<id>`, or `view:<id>`), added as each part (`"fields":{"points-to":"process:<id>"}`). Write no `status` on a new part: the engine reads no status of a part (a Task keeps its own status). The keeper of a new part is the keeper of its parent: write `kept-by` only when the part needs another keeper.
7. Show the person the outline: the template or the types, the top parts, the parts inside each, the links, the pointer parts, the notes of the Mesh that join the program, and the gaps. Ask: write it, change it, or stop.
8. Once the person agrees, progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase shaping`.
> - Use the types of the program: the `types` of the root note (`flint ite types` gives the capabilities of each type). Give each candidate part one of them. When no type fits, use `note`, and name the part in the `summary`. Never invent a type.
> - Select, do not dump: 12 to 40 parts for a new map; for an extension, only the parts that the instructions ask for.
> - Select the parents. The map opens on its top level, so the top level holds the containers (parts of a type with the capability `container`, for example a `system`, a `goal`, a `milestone`, a `method`, or a `team`, as the types of the program have them) and the parts that stand alone. A top part has the root note as its parent. Each other part gets a parent part.
> - Do not show the outline to a person, and do not wait for a person. Once the outline is complete, progress to the next stage.

## Stage 4: Write the Parts

1. For a new program, run `flint ite create "<Name>" --template <id> --purpose "<one sentence>"`. The root note gets the `types` of the template, in the form of [[tmp-ite-program-v0.1]]. Then set the focus with `flint ite focus` and the ids of the parents of the new parts: the selected nodes, or the ids that you give to the new top parts in step 2.
2. Write the parts as one JSON array of operations to a file (`/tmp/ite-model-<program slug>.json`), the parents first. Each new part is one `add`:

   ```json
   {"op":"add","id":"<new UUID>","title":"<title>","kind":"<type id>","parent":"<parent id, or null for the root note>","sentence":"<one sentence: what the part is>","prose":"<one or two short paragraphs more>"}
   ```

   Give an `add` an `id` (a new UUID v4: `uuidgen | tr A-Z a-z`) when a later operation names it as `parent`. `kind` is the type id of a type of the program (`Milestone` gives `milestone`). The prose follows the sentence: do not write the sentence again. Say in the prose how the part connects to other parts. Give the links and the other fields of a new part in `fields` of its `add`: each connection key with a list of wikilinks, for example `"fields":{"uses":["[[<note of the other part>]]"],"owner":"[[<note>]]"}`. A link that starts at a part that exists is an `edit` with `fields` (the whole new list of the key). The change writes each part in the form of [[tmp-ite-part-v0.1]]. Check that the file parses: `python3 -m json.tool < <file>`.
3. A note of the Mesh that exists and that is a part of the system (a Task, a Person, a meeting) joins the program in the same change: add `{"op":"move","part":"<note name>","parent":"<part id, or null for the root note>"}`. The move writes the `parent` of the note, so that its `parent` chain reaches the root note. Do not copy a note that exists. The engine refuses the move of a note of another program: a note has one home, so link to it in step 6.
4. Propose the change:

   ```bash
   flint ite map change propose "<program>" --ops <file> --reason "<one sentence: what the change adds>"
   ```

   `--ops -` reads the operations from the standard input. Keep the change id (`mc-...`). Do not run `flint ite part add` for each part: an agent's `part add` makes one proposal for each part. An operation that does not apply refuses with `invalid-input` and its index. Repair that operation and propose again. Nothing was written.
5. Show the person the preview: `flint ite map change show "<program>" <change id>` (the tree before and after, the files, and the new findings). Ask the person to apply the change in the Workbench (the review of the change), or with `flint ite map change apply "<program>" <change id>` in their own terminal. You cannot apply it: in an Orbh session the engine refuses an agent with `forbidden`. When the person wants a change, discard the change (`flint ite map change discard "<program>" <change id>`), change the operations, and propose again.
6. The links are in the change (step 2). When the person wants one more link or field after the apply, run `flint ite link "<program>" <from id> <to id> --relation <key>` or `flint ite part set "<program>" <id> --field owner="[[<note>]]"`: an agent's command proposes one map change, and the person applies it. `flint ite part set` refuses `title`, `kind`, and `parent`: change them with a map change.
7. Write the text of the root note: what the system is, how to read the map, and what the map leaves out. Edit the body of the root note (the body only, below the H1). Keep its frontmatter, and keep a `system` block when it has one.
8. Once the person applied the change (and each later link or field proposal), progress to the next stage.

> [!headless]
> - Run `flint orbh session set phase writing`.
> - Write the operations to the file `/tmp/ite-model-$ORBH_SESSION_ID.json`, the parents first. Give each parent an `id` (a new UUID v4: `uuidgen | tr A-Z a-z`), so that its children name it as `parent`. This workflow uses only `add` and `move` (and `edit` with `fields` for a link from a part that exists); the other operations are in The Map Change of [[knw-ite-programs]]. Check that the file parses: `python3 -m json.tool < /tmp/ite-model-$ORBH_SESSION_ID.json`.
> - Set the focus on the parents of the new parts, so that the person sees where you work: `flint ite focus <id> <id> ...` with the ids of the selected nodes, or the ids that you gave to the new top parts ([[sk-ite-focus]]).
> - Add each `move` of a note of the Mesh to the array.
> - Propose all the parts as one map change:
>
>   ```bash
>   flint ite map change propose "<program>" --ops - --reason "<one sentence: what the change adds>" --json < /tmp/ite-model-$ORBH_SESSION_ID.json
>   ```
>
>   An operation that does not apply refuses with `invalid-input` and its index ("Operation 3 (add): ..."). Repair that operation and propose again. Nothing was written.
> - Do not show the preview to a person, and do not ask for the apply (step 5). Read the preview (`flint ite map change show "<program>" <change id> --json`): the tree after must hold your plan, with no new finding of the level error. When the preview shows a mistake, discard your change (`flint ite map change discard "<program>" <change id>`), repair the operations, and propose again. Do this at most two times. Never apply the change.
> - The links are in the map change: in `fields` of each `add`, and in an `edit` with `fields` (the whole new list of the key) for a link that starts at a part that exists. An agent's `flint ite link` and `flint ite part set` each propose one more map change that a person applies: do not use them for the links of this job (step 6). When you find a link only after the propose, discard the change, add the link, and propose again (the limit of two times holds). Keep the count of the links for the `summary`.
> - Write the text of the root note only when the root note has no text for a person. Change no other line of the root note, and keep a `system` block when it has one.
> - Do not wait for the apply. Once the change is proposed with each link in it, also each link that starts at a part that exists, progress to the next stage.

## Stage 5: Check and Show

1. Run `flint ite check "<program>"` and `flint ite map check "<program>"`. Repair each error of your parts (`format`, `link-missing`) with a new map change: an `edit` with `fields`, or an agent's `flint ite link` or `flint ite part set` (each proposes one map change that the person applies). A `no-claim` note is correct for a new map: the workflow [[wkfl-ite-ground]] writes the processes.
2. Run `flint ite map "<program>"` and read it as the person will: the top level, the containers, the links.
3. Check the map against each quality rule of [[knw-ite-programs]]: the words of the person, prose first, one idea for each part, the types of the program, select and do not dump, the truth about gaps.
4. Show the person: the count of the parts and of the links, the top level, each part of the type `note` because no type fits, and the list of what you left out and why. Propose the next job: [[wkfl-ite-ground]] for the processes of the claims, or [[wkfl-ite-view]] for the first question.
5. Once the person has the result, the workflow is done.

> [!headless]
> - Run `flint orbh session set phase checking`.
> - Run `flint ite check "<program>"`. Repair each error of the parts that you changed (`format`, `link-missing`). A `no-claim` note is correct for a new part: the action `ground` or `claim-add` gives it a claim.
> - In place of step 2, read the tree after of the change (`flint ite map change show "<program>" <change id>`). Check the new parts against the quality rules of [[knw-ite-programs]].
> - Do not show the result to a person (step 4): it goes into the `summary`.
> - Once the check has no error of your parts, end the job as the callout of The End of a Job says.

# The End of a Job

When an agent session of the Workbench follows this workflow for a job, end the job in the chat:

1. Write the result in the chat: the map change id, whether the person applied it, the counts of the parts and the links, and what you left out. Use short sentences.
2. Wait for the person. Do not end the session, and never run `flint orbh session return --finish`: the person gives the next job in the chat or in the Workbench, or ends the session with End.

> [!headless]
> A headless session does not end the job in the chat, and does not wait for the person. It returns the result:
> 1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[init-ite#Headless]]. When an item fails, go back to its stage: do not return with an item open.
> 2. Write the `summary`: the count of the new parts in the change, of the notes that join the program, and of the links in the change, the reading that you selected, and the most important gap or the most important part that you left out. Name each part of the type `note` because no type fits. Propose the action `ground` when the parts make claims and have no claim. Use no `'` character.
> 3. Do not apply, revert, or discard the change that you return.
> 4. End the job with the result, and nothing else:
>
>    ```bash
>    flint orbh session return --await '{"schema":"steel-result/1","program":"<program>","view_id":null,"candidate_id":"<change id>","base_hash":null,"summary":"<summary>"}'
>    ```
>
>    When you proposed no change, `candidate_id` is `null`, and the `summary` starts with `No change:` and gives the reason.

# Output

- A program with a main map of parts and links, in the words of the person: one map change in `Steel/Programs/<program>/Proposals/` that the person applied, and the links
- A list of what the map leaves out, and each gap, shown to the person

> [!headless]
> - One map change in `Steel/Programs/<program>/Proposals/`, with the state `proposed`. It holds the new parts, the moves of the notes that join the program, and all the links: also each link that starts at a part that exists (an `edit` with `fields`). No separate `flint ite link` or `flint ite part set` proposal
> - One `steel-result/1` JSON value as the result of the job, with the change id as `candidate_id`
