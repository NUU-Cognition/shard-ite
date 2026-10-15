---
format: steel-process/1
id: ground
by: agent
agent: program
action: { object: claim, needs-nodes: true, needs-text: false, writes-proposal: false, ask: null, workflow: ite-ground }
task: |
  Follow the workflow `hwkfl-ite-ground` of the ITE shard (`Shards/ITE/workflows/hwkfl-ite-ground.md`) in a headless session, or `wkfl-ite-ground` (`Shards/ITE/workflows/wkfl-ite-ground.md`) in an interactive session. Do each step of it, in order.
---

# Write the claims of these parts

The agent finds what must be true about each part, writes a claim with its check (code, an agent, or a person), and runs the check one time.
