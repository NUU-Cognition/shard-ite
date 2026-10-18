---
format: steel-process/1
id: process-add
by: agent
agent: program
action: { object: process, needs-nodes: false, needs-text: false, writes-proposal: false, ask: "What work must the process do?", workflow: ite-process_add }
task: |
  Follow the workflow `wkfl-ite-process_add` of the ITE shard (`Shards/ITE/workflows/wkfl-ite-process_add.md`). In a headless session, follow its `> [!headless]` callouts. Do each step of it, in order.
---

# Add a process

The agent writes one process for the nodes (code, an agent, or a person), and tests it.
