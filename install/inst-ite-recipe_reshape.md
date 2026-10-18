---
format: steel-process/1
id: reshape
by: agent
agent: program
action: { object: view, needs-nodes: false, needs-text: true, writes-proposal: true, ask: "How must the view change?", workflow: ite-reshape }
task: |
  Follow the workflow `wkfl-ite-reshape` of the ITE shard (`Shards/ITE/workflows/wkfl-ite-reshape.md`). In a headless session, follow its `> [!headless]` callouts. Do each step of it, in order.
---

# Change this view

The agent changes the shape or the content of this view as you ask. You review the candidate and apply it.
