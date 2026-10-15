---
format: steel-process/1
id: process-add
by: agent
agent: program
action: { object: process, needs-nodes: false, needs-text: false, writes-proposal: false, ask: "What work must the process do?", workflow: ite-process_add }
task: |
  Follow the workflow `hwkfl-ite-process_add` of the ITE shard (`Shards/ITE/workflows/hwkfl-ite-process_add.md`) in a headless session, or `wkfl-ite-process_add` (`Shards/ITE/workflows/wkfl-ite-process_add.md`) in an interactive session. Do each step of it, in order.
---

# Add a process

The agent writes one process for the nodes (code, an agent, or a person), and tests it.
