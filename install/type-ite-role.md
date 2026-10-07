---
id: 86fbfd68-420a-5739-afa6-b140f26812fc
tags:
  - "#f/metadata"
  - "#f/type"
---

# Role

A job that one person does at the event, such as host or treasurer.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: role
name: Role
plural: Roles
description: "A job that one person does at the event, such as host or treasurer."
fields: {}
capabilities: [has-claims, owner]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: [], reports-to: []}
look: { hue: rose, icon: id-card, layer: structure }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `role` |
| Naming | `(Program) <Name> . (Role) <Title>.md` |
| Capabilities | `has-claims`, `owner` |
| Templates | `event`, `organisation` |
