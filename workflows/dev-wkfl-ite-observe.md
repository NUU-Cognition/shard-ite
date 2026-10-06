---
description: "Check nodes against reality now: run the automatic contacts, do each agent contact and record it, list each human contact for the person, and report each node that fails"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Observe

Check nodes against reality now, and record what you see. A command records each observation: you never write one into a file. The contact kinds and the grounding are in [[init-ite]].

# Input

- The program and the document (`map`, or a view)
- (Optional) The node ids. With no node: each node of the document that has a contact.
- (Optional) The kinds to run. `command` runs only when the person names it.

# Actions

## Stage 1: Read the Contacts

1. Set the focus: `flint ite focus <node ids>` ([[sk-ite-focus]]).
2. Read the document: `flint ite map "<program>" --json` (or `flint ite view <view> --json`). For each selected node, list its contacts with their kind, their claim, and their state now.
3. Sort the contacts in three lists: the automatic contacts (`reference`, `file`, `command`, `http`, `mesh`, `orbtest`, `note`), the `agent` contacts, and the `human` contacts.
4. Ask the person whether the `command` contacts run now, when there are any. Show each command line first.
5. Once the three lists are complete, progress to the next stage.

## Stage 2: Run the Automatic Contacts

1. Run them: `flint ite run "<program>" [--document <doc>] [--node <id>...]`. Add `--kind command` only when the person agreed in Stage 1.
2. Read the report: each observation with its state and its summary, and each skipped contact with its reason.
3. A contact with the state `error` has a wrong form or cannot run on this machine. Note it for Stage 4.
4. Once the run is done, progress to the next stage.

## Stage 3: Do the Agent Contacts

For each `agent` contact:

1. Set the focus on its node.
2. Do what its `prompt` asks: read the notes, the files, or the pages that it names. Do not change reality to make a claim true.
3. Decide the state: `holds` when what you saw answers yes, `fails` when it answers no, `error` when you could not check it.
4. Record it:
   ```bash
   flint ite observe "<program>" <node> --contact <contact id> --state holds|fails|error --summary "<one to three sentences: what you saw>" [--evidence note="<note name>"] [--evidence url=<url>] [--document <doc>]
   ```
5. Once each agent contact has an observation, progress to the next stage.

## Stage 4: Report

1. List each `human` contact for the person: the node, the claim, and the command that records the answer (`flint ite observe "<program>" <node> --contact <id> --state holds --summary "<what the person saw>"`). Ask the person each claim; record each answer that the person gives in the session with `flint ite observe`, with the words of the person in the summary. Record nothing that the person did not say.
2. Read the grounding again: `flint ite map "<program>"` (or `flint ite view <view>`).
3. Show the person each node that is `failing` or `stale`, with the contact, the claim, and what the check saw. Show each contact with the state `error` and why.
4. Propose [[wkfl-ite-repair]] for the nodes that fail.
5. Once the person has the report, the workflow is done.

# Output

- Observations in the store of this machine, recorded by `flint ite run` and `flint ite observe`
- A report of each node that fails, each stale node, and each human contact that waits for the person
