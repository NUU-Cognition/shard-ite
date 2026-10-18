---
format: steel-process/1
id: map-cover
by: agent
agent: program
action: { object: map, needs-nodes: false, needs-text: false, writes-proposal: true, ask: null, workflow: ite-map_cover }
task: |
  Follow the workflow `wkfl-ite-map_cover` of the ITE shard (`Shards/ITE/workflows/wkfl-ite-map_cover.md`). In a headless session, follow its `> [!headless]` callouts. Do each step of it, in order.
---

# Cover the gap

The agent gives a part to each file that no part covers: it adds the files to the sources of a part, or adds a part. You review the map change and apply it.
