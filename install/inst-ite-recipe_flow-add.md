---
format: steel-process/1
id: flow-add
by: agent
agent: program
action: { object: instruction-map, needs-nodes: false, needs-text: false, writes-proposal: false, ask: "Which work must the map put in order?", workflow: ite-flow_add }
task: |
  Follow the workflow `wkfl-ite-flow_add` of the ITE shard (`Shards/ITE/workflows/wkfl-ite-flow_add.md`). In a headless session, follow its `> [!headless]` callouts. Do each step of it, in order.
---

# Add an instruction map

The agent writes the instruction map of a process: its steps, decisions, and waits, in order.
