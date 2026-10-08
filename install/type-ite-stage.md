---
id: 2b4fc2f4-46de-55ec-a46d-8dcb078ac1ea
tags:
  - "#f/metadata"
  - "#f/type"
---

# Stage

A group of steps of the process that go together, such as the review or the release.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: stage
name: Stage
plural: Stages
description: "A group of steps of the process that go together, such as the review or the release."
fields:
  status: { type: text }
capabilities: [has-status, container]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: [], reads: [], writes: []}
look: { hue: air, icon: layers, layer: process }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `stage` |
| Naming | `(Program) <Name> . (Stage) <Title>.md` |
| Capabilities | `has-status`, `container` |
| Templates | `process`, `shard` |
