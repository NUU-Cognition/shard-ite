---
id: be1ee620-5e7f-5738-849e-530c97aab45c
tags:
  - "#f/metadata"
  - "#f/type"
---

# Step

One step of a process: one action and its result.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: step
name: Step
plural: Steps
description: "One step of a process: one action and its result."
fields:
  status: { type: text }
capabilities: [has-status]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: [], supports: [], refutes: []}
look: { hue: air, icon: footprints, layer: process }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `step` |
| Naming | `(Program) <Name> . (Step) <Title>.md` |
| Capabilities | `has-status` |
| Templates | `software`, `process`, `event`, `research`, `software-mine` |
