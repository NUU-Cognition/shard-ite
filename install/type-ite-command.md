---
id: 60a6281b-3ea3-5065-8007-ddd8af5ec9dc
tags:
  - "#f/metadata"
  - "#f/type"
---

# Command

A command of the CLI that the shard runs.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: command
name: Command
plural: Commands
description: "A command of the CLI that the shard runs."
fields: {}
capabilities: []
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], reads: [], writes: []}
look: { hue: teal, icon: terminal, layer: runtime }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `command` |
| Naming | `(Program) <Name> . (Command) <Title>.md` |
| Capabilities | none |
| Templates | `shard` |
