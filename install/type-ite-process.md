---
id: ae7d22f0-2df2-5c0f-9a8d-f72d76154784
tags:
  - "#f/metadata"
  - "#f/type"
---

# Process

A series of steps that the product runs from a start to an end, such as the sync of a Flint.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: process
name: Process
plural: Processes
description: "A series of steps that the product runs from a start to an end, such as the sync of a Flint."
fields: {}
capabilities: [container]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: []}
look: { hue: air, icon: workflow, layer: process }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `process` |
| Naming | `(Program) <Name> . (Process) <Title>.md` |
| Capabilities | `container` |
| Templates | `software`, `general`, `software-mine` |
