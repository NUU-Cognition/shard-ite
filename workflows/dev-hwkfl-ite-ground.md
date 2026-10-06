---
description: "Headless: find the contacts of nodes with reality, write them with flint ite contact add, run each one time, and return one ite-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Ground (Headless)

Give nodes their contacts with reality, with no person in the session. The contact forms are in The Contact of [[init-ite]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program and the document (`map`, or a view)
- The selected nodes. With no node: each node of the document with no contact that is not of the kind `note`.
- (Optional) The instructions of the person: the sources to use, or the kinds to prefer

# Actions

## Stage 1: Read the Nodes

1. Run the `flint ite focus` command of the prompt ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the document (`flint ite map "<program>" --json`, or `flint ite view <view> --json`). For an OrbCode program, stop: return `No change:` with the next step "use the OrbCode shard and Orbtest" (rule 6 of [[hinit-ite]]).
4. For each node, read its note and write its claim in one sentence. Skip a node that makes no claim, and keep it for the `summary`.
5. Once each selected node has its claim, progress to the next stage.

## Stage 2: Find the Contacts

1. Run `flint orbh session set phase grounding`.
2. For each claim, select the kind with the table of Stage 2 of [[wkfl-ite-ground]]. Prefer a kind that a command can check.
3. Set the focus on the node that you work on. Check each automatic contact one time before you write it (the path, the URL, the note, the query, the command). Never invent a contact. Never write a `command` contact that changes reality with no `direction: act`.
4. A contact touches reality outside the model. A `mesh` query that only finds a part of this program (for example the part of a person, to prove a role) proves only that the model has the part: do not write it. A `mesh` contact counts records of the work or of the world: tasks, meetings, reports, or the `status` that a person writes on a part.
5. When no contact is possible, write no contact, and keep the node for the `summary`.
6. Once each claim has its contacts or its gap, progress to the next stage.

## Stage 3: Write and Run

1. Run `flint orbh session set phase writing`.
2. Write each contact. Give a mapping contact a short, readable id (`--id booking-email`, not the default UUID: the person reads the id in the Workbench). A `note` or `reference` contact is a wikilink: give only `--kind` and `--ref "<note name>"`, with no `--id` and no `--claim`. `flint ite contact add "<program>" <node> --id <short-slug> --kind <kind> [--claim "<claim>"] [--run "<command>"] [--cwd <folder>] [--url <url>] [--path <path>] [--ref "<note name>"] [--query '<json>'] [--expect '<json>'] [--prompt "<question>"] [--fresh-for 7d] [--document <doc>]`. For a node of a view, add `--document <view id>`. `--query` and `--expect` take JSON, for example `--query '{"type":"Task","where":{"status":"done"}}' --expect '{"count":">=1"}'`.
3. Run `flint orbh session set phase checking`. Run the automatic contacts one time: `flint ite run "<program>" --node <id>... --json`. This step is required: before it, each new contact is `unobserved`, and the person sees no grounding. Do not add `--kind command` unless the instructions name it. Take the counts of the `summary` from this run, not from your own check.
4. Run `flint ite check "<program>"`. Repair each `contact-invalid` error.
5. Once each contact is written and run, progress to the next stage.

## Stage 4: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Write the `summary`: the count of the new contacts by kind, the count that holds now, the count that fails now, and the nodes with no possible contact. Use no `'` character.
3. End the turn with the result, and nothing else (`candidate_id` is the candidate of a view, else null):

   ```bash
   flint orbh session return --finish '{"schema":"ite-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

# Output

- Contacts on the selected nodes, each checked one time, and their first observations
- One `ite-result/1` JSON value as the result of the turn
