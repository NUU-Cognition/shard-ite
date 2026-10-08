---
id: 629e2e36-c356-531d-a148-3bd84f95db64
tags:
  - "#f/metadata"
  - "#f/type"
---

# Risk

A thing that can go wrong, and what to do when it does.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: risk
name: Risk
plural: Risks
description: "A thing that can go wrong, and what to do when it does."
fields:
  status: { type: text }
capabilities: [has-status]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: [], part-of: [], option-of: [], answers: [], supports: [], opposes: [], picked: [], acts-on: [], threatens: [], protects: []}
look: { hue: fire, icon: triangle-alert, layer: control }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `risk` |
| Naming | `(Program) <Name> . (Risk) <Title>.md` |
| Capabilities | `has-status` |
| Templates | `event`, `thinking` |
