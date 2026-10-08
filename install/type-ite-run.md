---
id: 085f7c12-67eb-4db9-8b4b-84f553b13d84
tags:
  - "#f/metadata"
  - "#f/type"
---

# Run

A Run is the record of one walk of an instruction map: which instruction map ran, on which inputs, by which actor, and what happened at each step. The body holds one fenced block with the info string `run`: the immutable snapshot of the resolved instruction map and the append-only list of the accepted events. The state of a run (the status, the position, the values) is derived from the events; the frontmatter fields `status`, `ended`, and `used` and the rendered summary are projections that the engine rewrites at each event. **The engine is the only writer of a Run note.** A person reads it, links to it, and writes below `# Remarks` only.

## Properties

| Property | Value |
|----------|-------|
| Tag | `#ite/run` |
| Format | `steel-run/1` |
| Naming | `(Run) <title> <yyyy-mm-dd hh-mm>.md` |
| Location | `Steel/Programs/<Name>/Runs/` (not in the Mesh) |
| Body | The rendered summary, one fenced `run` block (`{ snapshot, events }`), and `# Remarks` for a person |

## Lifecycle

```
active → paused → active → succeeded | failed | cancelled
```

`flint ite flow start` writes the note with `run.started` and the first visit. Each accepted command appends events in the lock of the Flint, with `expected_seq` and `request_id`, so a repeated request is accepted one time. An edit of a step after the start changes nothing in the run: the run keeps its snapshot.

## Templates

None. The engine writes a Run; no agent and no person creates one from a template.
