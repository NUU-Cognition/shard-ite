---
id: d835fb5d-e948-5b09-92cc-be741181dfb8
tags:
  - "#f/metadata"
  - "#f/type"
---

# Task

A piece of work that a person must do. It is a Task of the Mesh, with its own status.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: task
name: Task
plural: Tasks
description: "A piece of work that a person must do. It is a Task of the Mesh, with its own status."
fields:
  date: { type: date }
  status: { type: text }
capabilities: [has-claims, dated, has-status]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: []}
look: { hue: water, icon: list-checks, layer: work }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `task` |
| Naming | `(Program) <Name> . (Task) <Title>.md` |
| Capabilities | `has-claims`, `dated`, `has-status` |
| Templates | `event`, `work` |
