---
id: a4610dd6-38ac-532f-9628-342cf5d0514f
tags:
  - "#f/metadata"
  - "#f/type"
---

# Decision

A point in a process where the path divides.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: decision
name: Decision
plural: Decisions
description: "A point in a process where the path divides."
fields:
  status: { type: text }
capabilities: [has-claims, decides, has-status]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: [], reports-to: [], part-of: [], option-of: [], answers: [], supports: [], opposes: [], picked: [], acts-on: [], threatens: [], protects: []}
look: { hue: fire, icon: split, layer: process }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `decision` |
| Naming | `(Program) <Name> . (Decision) <Title>.md` |
| Capabilities | `has-claims`, `decides`, `has-status` |
| Templates | `software`, `process`, `organisation`, `software-mine`, `thinking` |
