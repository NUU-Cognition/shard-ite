---
description: "Make or extend the map of a system from the words of a person and from sources: read, select the template and the types, propose the parts as one map change that the person applies, link them, and name what you left out"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Model

Make the map of a system, or add parts to a map that exists. The result is a program whose map a person can read: the parts in the words of the person, their links, and a list of what the map leaves out. The parts come in as one map change that the person applies. The rules of the files and the quality rules are in [[init-ite]].

# Input

- The system, in the words of the person: what it is, why the person wants to model it
- (Optional) The program, when it exists: its name or its id
- (Optional) Sources: notes of the Mesh, files, pages, or the conversation
- (Optional) The nodes to extend: the ids of parts that the new parts go inside or beside

# Actions

## Stage 1: Understand the System

1. Set the focus. For a program that exists, run `flint ite focus <ids of the selected parts, or of the top parts>` ([[sk-ite-focus]]). For a new program, set the focus after Stage 3.
2. Say the system again in one or two sentences, in the words of the person: what it is, where it starts and ends, and who acts in it. Ask the person one question when the boundary is not clear. Ask no other question in this stage.
3. For a program that exists, read it: `flint ite map "<program>" --json`. Keep the parts, their types, their parents, and their links. Read the root note (its `types`) and the notes of the selected parts.
4. Once you can say the system in one or two sentences, progress to the next stage.

## Stage 2: Read the Sources

1. Read each source that the person gave. Search the Mesh for more: the notes that name the system, its people, and its events (`grep -ril "<word>" Mesh | head`). Read only what helps you name the parts.
2. Write a list of the candidate parts: for each, a title in the words of the person, a one-sentence description, and the source that says it. Note the words that the sources use for each thing, and use one term for one thing.
3. Note each thing that a part needs and that no source says (a gap). Do not invent it.
4. Once the list holds the parts of the system, progress to the next stage.

## Stage 3: Select the Template and the Structure

1. For a new program, run `flint ite templates`. Select the template whose types fit the parts: `process` for a process of a business, `event` for an event, `research` for research, `organisation` for a team, `general` when no other fits. An OrbCode project is a program of the template `software`: for a software product with a codebase, use the OrbCode shard. A program that exists keeps its types: the `types` of its root note. `flint ite types` gives the capabilities of each type (for example `container`, `dated`, `has-status`).
2. Give each candidate part one type of the program (for a new program, a type of the template). When no type fits, use `note`, and tell the person. Never invent a type: a new type is a type note that the person agrees to. Do not add a template or a type unless the person asks.
3. Select, do not dump: keep 12 to 40 parts for a new map. Merge parts that say one idea. Remove parts that do not help a person see the system.
4. Select the parents: the containers of the map, of a type with the capability `container` (a system holds steps, a milestone holds deliverables). A top part has the root note as its parent. A top level of 3 to 9 parts reads well.
5. Select the links: `next` for the order of a process, `depends-on` and `uses` for a dependency, `owner` for who answers for a part, `informs` for information that goes from one part to another. Name a link only when it is true.
6. Show the person the outline: the template or the types, the top parts, the parts inside each, the links, the notes of the Mesh that join the program, and the gaps. Ask: write it, change it, or stop.
7. Once the person agrees, progress to the next stage.

## Stage 4: Write the Parts

1. For a new program, run `flint ite create "<Name>" --template <id> --purpose "<one sentence>"`. The root note gets the `types` of the template, in the form of [[tmp-ite-program-v0.1]]. Then set the focus with `flint ite focus` and the ids of the parents of the new parts: the selected nodes, or the ids that you give to the new top parts in step 2.
2. Write the parts as one JSON array of operations to a file (`/tmp/ite-model-<program slug>.json`), the parents first. Each new part is one `add`:

   ```json
   {"op":"add","id":"<new UUID>","title":"<title>","kind":"<type id>","parent":"<parent id, or null for the root note>","sentence":"<one sentence: what the part is>","prose":"<one or two short paragraphs more>"}
   ```

   Give an `add` an `id` (a new UUID v4: `uuidgen | tr A-Z a-z`) when a later operation names it as `parent`. `kind` is the type id of a type of the program (`Milestone` gives `milestone`). The prose follows the sentence: do not write the sentence again. Say in the prose how the part connects to other parts. The change writes each part in the form of [[tmp-ite-part-v0.1]]. Check that the file parses: `python3 -m json.tool < <file>`.
3. A note of the Mesh that exists and that is a part of the system (a Task, a Person, a meeting) joins the program in the same change: add `{"op":"move","part":"<note name>","parent":"<part id, or null for the root note>"}`. The move writes the `parent` of the note, so that its `parent` chain reaches the root note. Do not copy a note that exists. The engine refuses the move of a note of another program: a note has one home, so link to it in step 6.
4. Propose the change:

   ```bash
   flint ite map change propose "<program>" --ops <file> --reason "<one sentence: what the change adds>"
   ```

   `--ops -` reads the operations from the standard input. Keep the change id (`mc-...`). Do not run `flint ite part add` for each part: an agent's `part add` makes one proposal for each part. An operation that does not apply refuses with `invalid-input` and its index. Repair that operation and propose again. Nothing was written.
5. Show the person the preview: `flint ite map change show "<program>" <change id>` (the tree before and after, the files, and the new findings). Ask the person to apply the change in the Workbench (the review of the change), or with `flint ite map change apply "<program>" <change id>` in their own terminal. You cannot apply it: in an Orbh session the engine refuses an agent with `forbidden`. When the person wants a change, discard the change (`flint ite map change discard "<program>" <change id>`), change the operations, and propose again.
6. After the apply, write each link: `flint ite link "<program>" <from id> <to id> --relation <key>`. A link starts at a part that exists, so write the links only after the apply. Set `owner` and other fields that are not structure with `flint ite part set "<program>" <id> --field owner="[[<note>]]"`. `flint ite part set` refuses `title`, `kind`, and `parent`: change them with a map change.
7. Write the text of the root note: what the system is, how to read the map, and what the map leaves out. Edit the body of the root note (the body only, below the H1). Keep its frontmatter, and keep a `system` block when it has one.
8. When `flint ite map change` is not a command of the CLI (an older build), propose nothing, and write no part file by hand. Keep the file of the operations, and tell the person that the CLI has no map changes, with the path of the file.
9. Once the person applied the change and each link is written, progress to the next stage.

## Stage 5: Check and Show

1. Run `flint ite check "<program>"` and `flint ite map check "<program>"`. Repair each error of your parts (`format`, `link-missing`): a link or a field with `flint ite link` and `flint ite part set`, the structure with a new map change. A `no-contact` note is correct for a new map: the workflow [[wkfl-ite-ground]] writes the processes.
2. Run `flint ite map "<program>"` and read it as the person will: the top level, the containers, the links.
3. Check the map against each quality rule of [[init-ite]]: the words of the person, prose first, one idea for each part, the types of the program, select and do not dump, the truth about gaps.
4. Show the person: the count of the parts and of the links, the top level, each part of the type `note` because no type fits, and the list of what you left out and why. Propose the next job: [[wkfl-ite-ground]] for the processes of the claims, or [[wkfl-ite-view]] for the first question.
5. Once the person has the result, the workflow is done.

# Output

- A program with a main map of parts and links, in the words of the person: one map change in `Steel/Programs/<program>/Proposals/` that the person applied, and the links
- A list of what the map leaves out, and each gap, shown to the person
