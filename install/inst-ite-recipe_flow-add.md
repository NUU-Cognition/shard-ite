---
format: steel-process/1
id: flow-add
by: agent
agent: program
action: { object: instruction-map, needs-nodes: false, needs-text: false, writes-proposal: false, ask: "Which work must the map put in order?", workflow: ite-flow_add }
task: |
  Follow the workflow `hwkfl-ite-flow_add` of the ITE shard (`Shards/ITE/workflows/hwkfl-ite-flow_add.md`) in a headless session, or `wkfl-ite-flow_add` (`Shards/ITE/workflows/wkfl-ite-flow_add.md`) in an interactive session. Do each step of it, in order.
---

# Add an instruction map

The agent writes the instruction map of a process: its steps, decisions, and waits, in order.
