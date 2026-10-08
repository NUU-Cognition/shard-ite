---
id: d568ccb8-c149-57d3-bb40-574ca7b8fbae
tags:
  - "#f/metadata"
  - "#f/type"
---

# Ritual

A meeting or a practice that repeats, such as a weekly review.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: ritual
name: Ritual
plural: Rituals
description: "A meeting or a practice that repeats, such as a weekly review."
fields:
  date: { type: date }
capabilities: [dated]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], reports-to: []}
look: { hue: air, icon: repeat, layer: operation }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `ritual` |
| Naming | `(Program) <Name> . (Ritual) <Title>.md` |
| Capabilities | `dated` |
| Templates | `organisation` |
