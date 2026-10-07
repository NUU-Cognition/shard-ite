---
id: c9e3bb11-97c1-5f51-b3bf-41b22a509d95
tags:
  - "#f/metadata"
  - "#f/type"
---

# Rule

One rule that each workflow of the shard follows.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: rule
name: Rule
plural: Rules
description: "One rule that each workflow of the shard follows."
fields: {}
capabilities: [has-claims]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], reads: [], writes: []}
look: { hue: fire, icon: shield, layer: context }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `rule` |
| Naming | `(Program) <Name> . (Rule) <Title>.md` |
| Capabilities | `has-claims` |
| Templates | `shard` |
