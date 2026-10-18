---
format: steel-process/1
id: claim-add
by: agent
agent: program
action: { object: claim, needs-nodes: false, needs-text: false, writes-proposal: false, ask: "What must be true?", workflow: ite-claim_add }
task: |
  Follow the workflow `wkfl-ite-claim_add` of the ITE shard (`Shards/ITE/workflows/wkfl-ite-claim_add.md`). In a headless session, follow its `> [!headless]` callouts. Do each step of it, in order.
---

# Add a claim

The agent writes one claim about the nodes and its check. A new claim starts with a draft check: the agent tests the check and proposes its promote, and the claim counts only after a person promotes it.
