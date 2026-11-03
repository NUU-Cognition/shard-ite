---
format: steel-process/1
id: review
by: agent
agent: program
action: { object: part, needs-nodes: true, needs-text: false, writes-proposal: false, ask: null, workflow: ite-review }
task: |
  Read `Shards/ITE/.later/init-ite-0.4.2.md` first: it holds the rules of this job.
  Follow the workflow `wkfl-ite-review` of the ITE shard (`Shards/ITE/.later/wkfl-ite-review.md`). In a headless session, follow its `> [!headless]` callouts. Do each step of it, in order.
---

# Review these nodes against their code

The agent compares each node with the changes of its code and its stories after its last review (its row in the data item `reviews`). It reviews each node that is true (`flint ite review` writes its row), and proposes a candidate (a view node) or a map change (a part) for each node that is not true.
