---
description: "Find where each claim of a node touches reality: select the contact kind, write the contact with flint ite contact add, and run it one time"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` if you haven't already.

# Workflow: Ground

Give nodes their contacts with reality. For each node, find where its claim touches reality, select the kind of contact that checks it best, write the contact, and run it one time. The contact forms are in The Contact of [[init-ite]].

# Input

- The program and the document (`map`, or a view)
- (Optional) The node ids. With no node: each node of the document that makes a claim and has no contact.

# Actions

## Stage 1: Read the Nodes

1. Set the focus: `flint ite focus <node ids>` ([[sk-ite-focus]]).
2. Read the document: `flint ite map "<program>" --json` (or `flint ite view <view> --json`). With no node ids, select each node with the grounding `no-contact` that is not of the kind `note`.
3. For each node, read its note and write its claim in one sentence: what is true in reality when the node is true. A node that makes no claim (a group, a remark) needs no contact: say so, and skip it.
4. Once each selected node has its claim, progress to the next stage.

## Stage 2: Find the Contacts

For each claim, find the place where reality shows it, and select the kind. Prefer a kind that a command can check with no mind:

| When the claim is about | Select | Example |
|---|---|---|
| A file, a folder, or a symbol of a codebase | `file` | `@Steel/apps/nuu-steel/src/ite/canvas/` |
| A state that a command prints (a branch, a build, a count) | `command` with `expect` | `git -C "../Repos/flint" rev-parse --verify canon` |
| A public page or an API that answers | `http` with `expect` | the page of the venue, a status API |
| Notes of the Mesh (a count, a state of tasks) | `mesh` with `expect.count` | each task of the launch is done |
| The stories of a product | `orbtest` | `stories: [setup.steps]` |
| A record that is the evidence (a meeting, a report) | `note` (a wikilink) | `"[[(Meeting) 2026-09-28 Venue Call]]"` |
| A codebase or another Flint that must be on this machine | `reference` (a wikilink) | `"[[rf-cb-flint]]"` |
| A fact that an agent can check by reading | `agent` with `prompt` | "Read the sponsor sheet and say if three sponsors signed." |
| A fact that only a person knows or sees | `human` with `claim` | "Nathan walked through the venue." |

1. Write each contact with an `id` (a short slug), a `claim`, and a `fresh-for` when reality changes (`12h` for a status, `7d` for a plan, `30d` for a booking).
2. **Check each automatic contact one time before you write it**: the path exists, the command runs and matches, the URL answers, the note exists, the query matches. Never invent a contact that you did not check. A `command` must be cheap and must not change reality; a contact that changes reality gets `direction: act`.
3. A contact touches reality outside the model. A `mesh` query that only finds a part of this program (for example the part of a person, to prove a role) proves only that the model has the part: do not write it. A `mesh` contact counts records of the work or of the world: tasks, meetings, reports, or the `status` that a person writes on a part.
4. When no contact is possible, write no contact, and say the gap in the prose of the node.
5. Show the person the list: each node, its claim, and its contacts. Ask: write them, or change them.
6. Once the person agrees, progress to the next stage.

## Stage 3: Write and Run

1. For each contact, set the focus on its node and write it:
   ```bash
   flint ite contact add "<program>" <node> --id <short-slug> --kind <kind> [--claim "<claim>"] [--run "<command>"] [--cwd <folder>] [--url <url>] [--path <path>] [--ref "<note name>"] [--query '<json>'] [--expect '<json>'] [--prompt "<question>"] [--fresh-for 7d] [--document <doc>]
   ```
   Give a mapping contact a short, readable `--id` (`booking-email`): the person reads it in the Workbench. A `note` or `reference` contact is a wikilink: give only `--kind` and `--ref "<note name>"`. `--query` and `--expect` take JSON, for example `--query '{"type":"Task","where":{"status":"done"}}' --expect '{"count":">=1"}'`.
2. Run the automatic contacts one time: `flint ite run "<program>" --node <id>...`. This step is required: before it, each new contact is `unobserved`. Add `--kind command` only when the person agreed that the commands run.
3. Read the result. A contact that fails now is not an error of the workflow: it is a fact for the person. A contact that gives `error` has a wrong form: repair it and run it again.
4. Run `flint ite check "<program>"`. Repair each `contact-invalid` error.
5. Show the person each node with its contacts and their states. Propose [[wkfl-ite-observe]] for the `agent` and `human` contacts.
6. Once each contact is written and run, the workflow is done.

# Output

- Contacts on the selected nodes, each checked one time
- The first observations of the automatic contacts
- Each node with no possible contact, named to the person
