---
id: 93911dda-e7f6-5755-b384-f6656258569c
tags:
  - "#f/metadata"
  - "#f/type"
---

# Idea

One idea that is not yet a clear claim.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: idea
name: Idea
plural: Ideas
description: "One idea that is not yet a clear claim."
fields:
  status: { type: text }
capabilities: [has-status]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], part-of: [], option-of: [], answers: [], supports: [], opposes: [], picked: [], acts-on: [], threatens: [], protects: []}
look: { hue: sun, icon: lightbulb, layer: frame }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `idea` |
| Naming | `(Program) <Name> . (Idea) <Title>.md` |
| Capabilities | `has-status` |
| Templates | `thinking` |
