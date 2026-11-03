---
format: steel-process/1
id: ground
by: agent
agent: program
action: { object: claim, needs-nodes: true, needs-text: false, writes-proposal: false, ask: null, workflow: ite-ground }
task: |
  Read `Shards/ITE/.later/init-ite-0.4.2.md` first: it holds the rules of this job.
  Follow the workflow `wkfl-ite-ground` of the ITE shard (`Shards/ITE/.later/wkfl-ite-ground.md`). In a headless session, follow its `> [!headless]` callouts. Do each step of it, in order.
---

# Write the claims of these parts

The agent finds what must be true now about each part, and writes a claim with its check (code, an agent, or a person). A new claim starts with a draft check: the agent tests the check and proposes its promote, and the claim counts only after a person promotes it.
