---
id: 24a45cb2-5387-54e4-b1f0-10d65f7da1e3
tags:
  - "#f/metadata"
  - "#f/type"
---

# Agent

An agent session that runs the shard, interactive or headless.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: agent
name: Agent
plural: Agents
description: "An agent session that runs the shard, interactive or headless."
fields: {}
capabilities: [has-claims, owner]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], reads: [], writes: []}
look: { hue: rose, icon: bot, layer: runtime }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `agent` |
| Naming | `(Program) <Name> . (Agent) <Title>.md` |
| Capabilities | `has-claims`, `owner` |
| Templates | `shard` |
