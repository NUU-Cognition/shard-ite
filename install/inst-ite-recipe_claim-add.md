---
format: steel-process/1
id: claim-add
by: agent
agent: program
action: { object: claim, needs-nodes: false, needs-text: false, writes-proposal: false, ask: "What must be true?", workflow: ite-claim_add }
task: |
  Follow the workflow `hwkfl-ite-claim_add` of the ITE shard (`Shards/ITE/workflows/hwkfl-ite-claim_add.md`) in a headless session, or `wkfl-ite-claim_add` (`Shards/ITE/workflows/wkfl-ite-claim_add.md`) in an interactive session. Do each step of it, in order.
---

# Add a claim

The agent writes one claim about the nodes and its check, tests the check, and runs it one time.
