---
id: f19fb502-4a57-577c-9db0-80c1e8d84750
tags:
  - "#f/metadata"
  - "#f/type"
---

# Team

A group of people that work together.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: team
name: Team
plural: Teams
description: "A group of people that work together."
fields: {}
capabilities: [has-claims, owner, container]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], reports-to: []}
look: { hue: water, icon: users, layer: structure }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `team` |
| Naming | `(Program) <Name> . (Team) <Title>.md` |
| Capabilities | `has-claims`, `owner`, `container` |
| Templates | `organisation` |
