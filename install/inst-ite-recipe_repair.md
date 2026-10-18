---
format: steel-process/1
id: repair
by: agent
agent: program
action: { object: claim, needs-nodes: false, needs-text: false, writes-proposal: true, ask: null, workflow: ite-repair }
task: |
  Follow the workflow `wkfl-ite-repair` of the ITE shard (`Shards/ITE/workflows/wkfl-ite-repair.md`). In a headless session, follow its `> [!headless]` callouts. Do each step of it, in order.
---

# Repair what fails

The agent reads the claims that fail and the findings, and proposes the changes of the parts, the processes, and the views that make the model true again.
