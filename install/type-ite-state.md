---
id: ddcab388-5e2b-516b-a64a-eaf8fd6fa0cb
tags:
  - "#f/metadata"
  - "#f/type"
---

# State

A condition of the system at one time.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: state
name: State
plural: States
description: "A condition of the system at one time."
fields: {}
capabilities: [has-claims]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: []}
look: { hue: teal, icon: circle-dot, layer: dynamics }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `state` |
| Naming | `(Program) <Name> . (State) <Title>.md` |
| Capabilities | `has-claims` |
| Templates | `general` |
