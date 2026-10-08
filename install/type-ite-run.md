---
id: 085f7c12-67eb-4db9-8b4b-84f553b13d84
tags:
  - "#f/metadata"
  - "#f/type"
---

# Run

A Run is the record of one walk of the instruction map of one process: which process ran, on which inputs, by which actor, and what happened at each node. It is a folder `Steel/Programs/<Name>/Runs/<run id>/` with two files: `run.md` (`format: steel-run/1`: the id, the process, the title, the inputs, the start, the actor, the parent run and node of a child run, the snapshot of the resolved map and its sha, and a summary for a person) and `events.jsonl` (the append-only events). The state of the run and of each node is computed from the events. **The engine is the only writer of a run.** A person and an agent only read it.

## Properties

| Property | Value |
|----------|-------|
| Tag | `#ite/run` |
| Format | `steel-run/1` |
| Naming | `Runs/<run id>/run.md` and `Runs/<run id>/events.jsonl` |
| Location | `Steel/Programs/<Name>/Runs/` (not in the Mesh) |
| Events | One JSON line for each event, with `seq`, `id`, `at`, `by`, `request_id`, `node`, `visit`, and `attempt` |

## Lifecycle

```
active → paused → active → succeeded | failed | cancelled
```

`flint ite flow start` writes the folder with the event `run.started`. Each accepted action appends events in the lock of the Flint, with `expected_seq` and `request_id`, so a repeated request is accepted one time. An edit of the map after the start changes nothing in the run: the run keeps its snapshot.

## Templates

None. The engine writes a Run; no agent and no person creates one from a template.
