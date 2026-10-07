---
id: d0198cf3-2042-5534-b147-0a82cfd95c44
tags:
  - "#f/metadata"
  - "#f/type"
---

# Goal

What the event must achieve, such as 120 guests or a new sponsor.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: goal
name: Goal
plural: Goals
description: "What the event must achieve, such as 120 guests or a new sponsor."
fields: {}
capabilities: [has-claims, container]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: [], reports-to: []}
look: { hue: sun, icon: target, layer: plan }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `goal` |
| Naming | `(Program) <Name> . (Goal) <Title>.md` |
| Capabilities | `has-claims`, `container` |
| Templates | `event`, `organisation`, `general` |
