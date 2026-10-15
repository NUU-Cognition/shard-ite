---
format: steel-process/1
id: view
by: agent
agent: program
action: { object: view, needs-nodes: false, needs-text: true, writes-proposal: true, ask: "Which question must the view answer?", workflow: ite-view }
task: |
  Follow the workflow `hwkfl-ite-view` of the ITE shard (`Shards/ITE/workflows/hwkfl-ite-view.md`) in a headless session, or `wkfl-ite-view` (`Shards/ITE/workflows/wkfl-ite-view.md`) in an interactive session. Do each step of it, in order.
---

# Answer a question with a view

The agent writes a new view that answers your question. You review the candidate and apply it.
