---
id: 21c2ee78-145b-5c1c-a990-cf7da3da8ce1
tags:
  - "#f/metadata"
  - "#f/type"
---

# Responsibility

A duty that a team or a role owns.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: responsibility
name: Responsibility
plural: Responsibilities
description: "A duty that a team or a role owns."
fields: {}
capabilities: [has-claims]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], reports-to: []}
look: { hue: teal, icon: clipboard-check, layer: operation }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `responsibility` |
| Naming | `(Program) <Name> . (Responsibility) <Title>.md` |
| Capabilities | `has-claims` |
| Templates | `organisation` |
