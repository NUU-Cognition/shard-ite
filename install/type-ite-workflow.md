---
id: dacb7e98-b279-5139-a4c4-c6d464209036
tags:
  - "#f/metadata"
  - "#f/type"
---

# Workflow

A workflow with stages, interactive or headless.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: workflow
name: Workflow
plural: Workflows
description: "A workflow with stages, interactive or headless."
fields: {}
capabilities: [container]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], reads: [], writes: []}
look: { hue: water, icon: workflow, layer: procedure }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `workflow` |
| Naming | `(Program) <Name> . (Workflow) <Title>.md` |
| Capabilities | `container` |
| Templates | `shard` |
