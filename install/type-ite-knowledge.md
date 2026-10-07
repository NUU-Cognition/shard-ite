---
id: 4b765e64-18aa-5c26-9f2b-e011b898af16
tags:
  - "#f/metadata"
  - "#f/type"
---

# Knowledge

A knowledge file: deep reference that an agent reads on demand.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: knowledge
name: Knowledge
plural: Knowledge
description: "A knowledge file: deep reference that an agent reads on demand."
fields: {}
capabilities: [has-claims]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], reads: [], writes: []}
look: { hue: sun, icon: library, layer: context }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `knowledge` |
| Naming | `(Program) <Name> . (Knowledge) <Title>.md` |
| Capabilities | `has-claims` |
| Templates | `shard` |
