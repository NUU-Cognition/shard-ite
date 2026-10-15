---
format: steel-process/1
id: map-create
by: agent
agent: program
action: { object: map, needs-nodes: false, needs-text: false, writes-proposal: true, ask: null, workflow: ite-map_create }
task: |
  Follow the workflow `hwkfl-ite-map_create` of the ITE shard (`Shards/ITE/workflows/hwkfl-ite-map_create.md`) in a headless session, or `wkfl-ite-map_create` (`Shards/ITE/workflows/wkfl-ite-map_create.md`) in an interactive session. Do each step of it, in order.
---

# Draft the main map

The agent reads the sources of the system and drafts the root and level 1 of the main map. You review the map change and apply it.
