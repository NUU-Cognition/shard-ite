---
format: steel-process/1
id: view
by: agent
agent: program
action: { object: view, needs-nodes: false, needs-text: true, writes-proposal: true, ask: "Which question must the view answer?", workflow: ite-view }
task: |
  Follow the workflow `wkfl-ite-view` of the ITE shard (`Shards/ITE/workflows/wkfl-ite-view.md`). In a headless session, follow its `> [!headless]` callouts. Do each step of it, in order.
---

# Answer a question with a view

The agent writes a new view that answers your question. You review the candidate and apply it.
