---
format: steel-process/1
id: review
by: agent
agent: program
action: { object: part, needs-nodes: true, needs-text: false, writes-proposal: false, ask: null, workflow: ite-review }
task: |
  Follow the workflow `hwkfl-ite-review` of the ITE shard (`Shards/ITE/workflows/hwkfl-ite-review.md`) in a headless session, or `wkfl-ite-review` (`Shards/ITE/workflows/wkfl-ite-review.md`) in an interactive session. Do each step of it, in order.
---

# Review these nodes against their code

The agent compares each node with the changes of its code and its stories after its last review (its row in the data item `reviews`). It reviews each node that is true (`flint ite review` writes its row), and proposes a candidate (a view node) or a map change (a part) for each node that is not true.
