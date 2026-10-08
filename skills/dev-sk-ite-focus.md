---
description: "Show the person which nodes of a program you work on now: set the focus of this Orbh session with flint ite focus"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` (or `hstart` in a headless session) if you haven't already.

# Skill: Focus

The Workbench shows each live agent session as an orb on the nodes of its **focus**. The focus tells the person where you work now. Set it at the start of each workflow of this shard, and change it each time your work moves to other nodes.

# Input

- The node ids that you work on now: the ids of parts of the map (the frontmatter `id` of each note), or the heading ids of the nodes of a view
- (Optional) The program, when the session metadata has no `ite-program`

# Actions

1. Find the ids. For the map: `flint ite map "<program>" --json` gives each node with its `id` and its `title`. For a view: `flint ite view <view id> --json`. The prompt of a job gives the ids of the selected nodes.
2. Select at most 8 nodes: the nodes that you read or change in the next minutes. For a whole program, select the top parts, or the parts of the stage that you work on now.
3. Set the focus:
   ```bash
   flint ite focus <node id> <node id> ...
   ```
   The command writes the interface key `ite-focus` of this Orbh session (a comma-separated list). It changes no file of the program.
4. When the work moves (a new stage, a new group of parts, a new node of a view), run step 3 again with the new ids. The last focus replaces the one before it.
5. When a new part gets its id (after `flint ite part add`), you can add it to the focus, so that the person sees the new card with you on it.

# Rules

- The focus is a fact of the session, not of the program. Never write it into a file of the program.
- Name only ids that exist in the document. An id that does not exist shows no orb.
- Do not change the focus on each tool call. Change it when the work moves.

# Output

- The interface key `ite-focus` of this session names the nodes that you work on now
