---
format: steel-process/1
id: observe
by: agent
agent: program
action: { object: claim, needs-nodes: false, needs-text: false, writes-proposal: false, ask: null, workflow: ite-observe }
task: |
  Follow the workflow `wkfl-ite-observe` of the ITE shard (`Shards/ITE/workflows/wkfl-ite-observe.md`). In a headless session, follow its `> [!headless]` callouts. Do each step of it, in order.
---

# Check the claims

The agent runs the checks of the claims about the parts, does the checks that need a mind, and reports each result with `flint ite claim report`.
