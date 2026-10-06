---
description: "Make or extend the map of a system from the words of a person and from sources: read, select the framework, write the parts, link them, and name what you left out"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Model

Make the map of a system, or add parts to a map that exists. The result is a program whose map a person can read: the parts in the words of the person, their links, and a list of what the map leaves out. The rules of the files and the quality rules are in [[init-ite]].

# Input

- The system, in the words of the person: what it is, why the person wants to model it
- (Optional) The program, when it exists: its name or its id
- (Optional) Sources: notes of the Mesh, files, pages, or the conversation
- (Optional) The nodes to extend: the ids of parts that the new parts go inside or beside

# Actions

## Stage 1: Understand the System

1. Set the focus. For a program that exists, run `flint ite focus <ids of the selected parts, or of the top parts>` ([[sk-ite-focus]]). For a new program, set the focus after Stage 3.
2. Say the system again in one or two sentences, in the words of the person: what it is, where it starts and ends, and who acts in it. Ask the person one question when the boundary is not clear. Ask no other question in this stage.
3. For a program that exists, read it: `flint ite map "<program>" --json`. Keep the parts, their kinds, their parents, and their links. Read the program file and the notes of the selected parts.
4. Once you can say the system in one or two sentences, progress to the next stage.

## Stage 2: Read the Sources

1. Read each source that the person gave. Search the Mesh for more: the notes that name the system, its people, and its events (`grep -ril "<word>" Mesh | head`). Read only what helps you name the parts.
2. Write a list of the candidate parts: for each, a title in the words of the person, a one-sentence description, and the source that says it. Note the words that the sources use for each thing, and use one term for one thing.
3. Note each thing that a part needs and that no source says (a gap). Do not invent it.
4. Once the list holds the parts of the system, progress to the next stage.

## Stage 3: Select the Framework and the Structure

1. Run `flint ite frameworks`. Select the framework whose kinds fit the parts: `process` for a process of a business, `event` for an event, `research` for research, `organisation` for a team, `software` for a software product (use the OrbCode shard for a software product with a codebase), `general` when no other fits. A program that exists keeps its framework.
2. Give each candidate part one kind of the framework. When a part fits no kind, use the nearest kind and say so to the person. Do not add a framework unless the person asks.
3. Select, do not dump: keep 12 to 40 parts for a new map. Merge parts that say one idea. Remove parts that do not help a person see the system.
4. Select the parents: the containers of the map (a system holds steps, a milestone holds deliverables). A top level of 3 to 9 parts reads well.
5. Select the links: `next` for the order of a process, `depends-on` and `uses` for a dependency, `owner` for who answers for a part, `informs` for information that goes from one part to another. Name a link only when it is true.
6. Show the person the outline: the framework, the top parts, the parts inside each, the links, and the gaps. Ask: write it, change it, or stop.
7. Once the person agrees, progress to the next stage.

## Stage 4: Write the Parts

1. For a new program, run `flint ite create "<Name>" --framework <id> --purpose "<one sentence>"`. Then set the focus on the program: `flint ite focus` with the ids of the first parts as you make them.
2. Write each part, the parents first:
   ```bash
   flint ite part add "<program>" --kind <kind> --title "<title>" [--parent <parent id>] --text "<one to three short paragraphs>"
   ```
   Keep the id that each command prints. Set the focus on the group of parts that you write now.
3. Write each link: `flint ite link "<program>" <from id> <to id> --relation <key>`. Set `owner` and other fields with `flint ite part set "<program>" <id> --field owner="[[<note>]]"`.
4. Include each note of the Mesh that is a part of the system and that already exists (a person, a task, a meeting): `flint ite include "<program>" "<note name>"`. Do not copy a note that exists.
5. Write the text of the program file: what the system is, how to read the map, and what the map leaves out. Use `flint ite part set` for a part, and edit the body of the program file for the program (the body only, below the H1).
6. When `flint ite` is not a command of the CLI, write the files by hand in the forms of [[tmp-ite-program-v0.1]] and [[tmp-ite-part-v0.1]], with a new UUID for each note (`uuidgen | tr A-Z a-z`).
7. Once each part and each link is written, progress to the next stage.

## Stage 5: Check and Show

1. Run `flint ite check "<program>"`. Repair each error (`format`, `link-missing`). A `no-contact` note is correct for a new map: the workflow [[wkfl-ite-ground]] adds the contacts.
2. Run `flint ite map "<program>"` and read it as the person will: the top level, the containers, the links.
3. Check the map against each quality rule of [[init-ite]]: the words of the person, prose first, one idea for each part, select and do not dump, the truth about gaps.
4. Show the person: the count of the parts and of the links, the top level, and the list of what you left out and why. Propose the next job: [[wkfl-ite-ground]] for the contacts, or [[wkfl-ite-view]] for the first question.
5. Once the person has the result, the workflow is done.

# Output

- A program with a map of parts and links, in the words of the person
- A list of what the map leaves out, and each gap, shown to the person
