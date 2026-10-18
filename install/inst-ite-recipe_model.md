---
format: steel-process/1
id: model
by: agent
agent: program
action: { object: program, needs-nodes: false, needs-text: false, writes-proposal: true, ask: "What is the system, and which sources must the agent read?", workflow: ite-model }
task: |
  Follow the workflow `wkfl-ite-model` of the ITE shard (`Shards/ITE/workflows/wkfl-ite-model.md`). In a headless session, follow its `> [!headless]` callouts. Do each step of it, in order.
---

# Model this system

The agent finds the parts of the system and proposes them in one map change, with their types, parents, and links. You review the map change and apply it.
