---
format: steel-process/1
id: model
by: agent
agent: program
action: { object: program, needs-nodes: false, needs-text: false, writes-proposal: true, ask: "What is the system, and which sources must the agent read?", workflow: ite-model }
task: |
  Follow the workflow `hwkfl-ite-model` of the ITE shard (`Shards/ITE/workflows/hwkfl-ite-model.md`) in a headless session, or `wkfl-ite-model` (`Shards/ITE/workflows/wkfl-ite-model.md`) in an interactive session. Do each step of it, in order.
---

# Model this system

The agent finds the parts of the system and proposes them in one map change, with their types, parents, and links. You review the map change and apply it.
