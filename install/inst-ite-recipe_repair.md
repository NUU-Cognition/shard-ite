---
format: steel-process/1
id: repair
by: agent
agent: program
action: { object: claim, needs-nodes: false, needs-text: false, writes-proposal: true, ask: null, workflow: ite-repair }
task: |
  Follow the workflow `hwkfl-ite-repair` of the ITE shard (`Shards/ITE/workflows/hwkfl-ite-repair.md`) in a headless session, or `wkfl-ite-repair` (`Shards/ITE/workflows/wkfl-ite-repair.md`) in an interactive session. Do each step of it, in order.
---

# Repair what fails

The agent reads the claims that fail and the findings, and proposes the changes of the parts, the processes, and the views that make the model true again.
