---
description: "Headless: make or extend the map of a system from the words of a person and from sources, write the parts and the links with flint ite, and return one ite-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Model (Headless)

Make the map of a system, or add parts to a map that exists, with no person in the session. The rules of the files and the quality rules are in [[init-ite]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program (its name and its id) and the document `map`
- The instructions of the person: the system, its purpose, and the sources
- (Optional) The selected nodes: the parts that the new parts go inside or beside

# Actions

## Stage 1: Understand the System

1. Run the `flint ite focus` command of the prompt ([[sk-ite-focus]]). With no node, focus on the top parts of the map. When the map is empty, you set the focus in Stage 4, step 3.
2. Run `flint orbh session set phase reading`.
3. Say the system again in one or two sentences: what it is, where it starts and ends, and who acts in it. When the boundary is not clear, select the reading that best helps the person, and keep it for the `summary`.
4. Read the program: `flint ite map "<program>" --json` and the program file. Keep the parts, their kinds, their parents, and their links. For an OrbCode program, stop: return `No change:` with the next step "use the OrbCode shard" (rule 6 of [[hinit-ite]]).
5. Once you can say the system in one or two sentences, progress to the next stage.

## Stage 2: Read the Sources

1. Read each source that the instructions name. Search the Mesh for more (`grep -ril "<word>" Mesh | head`). Read only what helps you name the parts.
2. Write a list of the candidate parts: a title in the words of the person, a one-sentence description, and the source of each. Use one term for one thing.
3. Note each gap: a thing that a part needs and that no source says. Do not invent it.
4. Once the list holds the parts of the system, progress to the next stage.

## Stage 3: Select the Structure

1. Run `flint orbh session set phase shaping`.
2. Use the framework of the program (`flint ite frameworks` gives its kinds). Give each candidate part one kind. When a part fits no kind, use the nearest kind and name it in the `summary`.
3. Select, do not dump: 12 to 40 parts for a new map; for an extension, only the parts that the instructions ask for. Merge parts that say one idea.
4. Select the parents. The map opens on its top level, so the top level has 3 to 9 parts: containers (a `system`, a `goal`, a `milestone`, a `method`, a `team`, as the framework has them) and the few parts that stand alone. Each other part gets a `parent`. A map of 19 parts with no parent is 19 cards in a grid: it is not a map.
5. Select the links (`next`, `depends-on`, `uses`, `owner`, `informs`). Name a link only when it is true.
6. Once the outline is complete, progress to the next stage.

## Stage 4: Write the Parts

1. Run `flint orbh session set phase writing`.
2. Write the parents first: `flint ite part add "<program>" --kind <kind> --title "<title>" --text "<prose>" --json`. Keep the id of each new part.
3. Set the focus on the parents that you just wrote, so that the person sees you on the new map: `flint ite focus <id> <id> ...` ([[sk-ite-focus]]).
4. Write the parts inside each parent: `flint ite part add "<program>" --kind <kind> --title "<title>" --parent <parent id> --text "<prose>" --json`. Before each parent, run `flint ite focus <parent id>`.
5. Write each link: `flint ite link "<program>" <from id> <to id> --relation <key>`. Set other fields with `flint ite part set "<program>" <id> --field <key>=<value>`.
6. Include each note of the Mesh that is a part of the system and that already exists: `flint ite include "<program>" "<note name>"`. A wrong include comes off with `--remove` (the note stays).
7. When the program file has no text for a person, write it below the H1: what the system is, how to read the map, and what the map leaves out. Change no other line of the program file.
8. When `flint ite` is not a command of the CLI, write the files by hand in the forms of [[tmp-ite-part-v0.1]], with a new UUID for each note, and say so in the `summary`.
9. Once each part and each link is written, progress to the next stage.

## Stage 5: Check

1. Run `flint orbh session set phase checking`.
2. Run `flint ite check "<program>"`. Repair each error of your parts (`format`, `link-missing`). A `no-contact` note is correct for a new part.
3. Read `flint ite map "<program>"`. Check the parts against the quality rules of [[init-ite]].
4. Once the check has no error of your parts, progress to the next stage.

## Stage 6: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: the count of the new parts and of the new links, the reading that you selected, and the most important gap or the most important part that you left out. Propose the next job ("Find the contacts of these nodes") when the parts have no contact.
3. End the turn with the result, and nothing else:

   ```bash
   flint orbh session return --finish '{"schema":"ite-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

# Output

- New parts and links on the map of the program, written with `flint ite`
- One `ite-result/1` JSON value as the result of the turn
