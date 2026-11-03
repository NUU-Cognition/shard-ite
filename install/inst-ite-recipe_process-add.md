---
format: steel-process/1
id: process-add
by: agent
agent: program
action: { object: process, needs-nodes: false, needs-text: false, writes-proposal: false, ask: "What work must the process do?", workflow: ite-process_add }
task: |
  Read `Shards/ITE/.later/init-ite-0.4.2.md` first: it holds the rules of this job.
  Follow the workflow `wkfl-ite-process_add` of the ITE shard (`Shards/ITE/.later/wkfl-ite-process_add.md`). In a headless session, follow its `> [!headless]` callouts. Do each step of it, in order.
---

# Add a process

The agent writes one process for the nodes (code, an agent, or a person), and tests it.
