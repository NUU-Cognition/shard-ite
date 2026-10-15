---
format: steel-process/1
id: parts-add
by: agent
agent: program
action: { object: map, needs-nodes: false, needs-text: false, writes-proposal: true, ask: "Which parts must the agent add?", workflow: ite-parts_add }
task: |
  Follow the workflow `hwkfl-ite-parts_add` of the ITE shard (`Shards/ITE/workflows/hwkfl-ite-parts_add.md`) in a headless session, or `wkfl-ite-parts_add` (`Shards/ITE/workflows/wkfl-ite-parts_add.md`) in an interactive session. Do each step of it, in order.
---

# Add parts

The agent proposes the parts that you name, below the node or at the root, in one map change. You review the map change and apply it.
