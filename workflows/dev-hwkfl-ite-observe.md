---
description: "Headless: run the automatic contacts of nodes, do each agent contact and record it, list each human contact, and return one ite-result/1 JSON value with each node that fails"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart ite` if you haven't already.

# Workflow: Observe (Headless)

Check nodes against reality now, with no person in the session. A command records each observation: you never write one into a file. The contact kinds and the grounding are in [[init-ite]]. The rules of a headless session are in [[hinit-ite]].

# Input

- The program and the document (`map`, or a view)
- The selected nodes. With no node: each node of the document that has a contact.
- (Optional) The instructions of the person: the kinds to run. `command` runs only when the instructions name it.

# Actions

## Stage 1: Read the Contacts

1. Run the `flint ite focus` command of the prompt ([[sk-ite-focus]]).
2. Run `flint orbh session set phase reading`.
3. Read the document (`flint ite map "<program>" --json`, or `flint ite view <view> --json`). For each selected node, list its contacts with their kind, their claim, and their state now.
4. Sort the contacts: the automatic contacts, the `agent` contacts, and the `human` contacts.
5. Once the three lists are complete, progress to the next stage.

## Stage 2: Run the Automatic Contacts

1. Run `flint orbh session set phase running`.
2. Run `flint ite run "<program>" [--document <doc>] [--node <id>...] --json`. Add `--kind command` only when the instructions name the kind `command` or a command contact.
3. Keep the counts: holds, fails, error, and skipped (with the reason).
4. Once the run is done, progress to the next stage.

## Stage 3: Do the Agent Contacts

For each `agent` contact:

1. Set the focus on its node.
2. Do what its `prompt` asks, by reading only. Do not change reality to make a claim true.
3. Record it: `flint ite observe "<program>" <node> --contact <contact id> --state holds|fails|error --summary "<what you saw>" [--evidence kind=value] [--document <doc>]`. In an Orbh session, the command records `by` as `agent:<session id>`.
4. Once each agent contact has an observation, progress to the next stage.

## Stage 4: Return the Result

1. Run `flint orbh session set phase returning`. Check each item of Before You Return of [[hinit-ite]]. When an item fails, go back to its stage: do not return with an item open.
2. Read the grounding again (`flint ite map "<program>" --json`, or `flint ite view <view> --json`).
3. Write the `summary`: the counts ("9 contacts hold, 2 fail, 1 error, 3 wait for a person."), then the node that fails and matters most, with what the check saw. Do not record a `human` contact: the person records it in the Workbench. Use no `'` character.
4. End the turn with the result, and nothing else:

   ```bash
   flint orbh session return --finish '{"schema":"ite-result/1","program":"<program>","view_id":null,"candidate_id":null,"base_hash":null,"summary":"<summary>"}'
   ```

   For a view, `view_id` is the id of the view.

# Output

- Observations in the store of this machine, recorded by `flint ite run` and `flint ite observe`
- One `ite-result/1` JSON value as the result of the turn
