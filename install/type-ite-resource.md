---
id: 99a0aa68-a2d8-5748-a2c1-9471228c8250
tags:
  - "#f/metadata"
  - "#f/type"
---

# Resource

A thing that the event needs, such as equipment, food, or a room.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: resource
name: Resource
plural: Resources
description: "A thing that the event needs, such as equipment, food, or a room."
fields: {}
capabilities: [has-claims]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: []}
look: { hue: stone, icon: briefcase, layer: structure }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `resource` |
| Naming | `(Program) <Name> . (Resource) <Title>.md` |
| Capabilities | `has-claims` |
| Templates | `event` |
