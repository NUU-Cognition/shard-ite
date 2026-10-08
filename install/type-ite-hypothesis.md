---
id: 3555d1b3-02fe-5846-9b9c-7d096b2de488
tags:
  - "#f/metadata"
  - "#f/type"
---

# Hypothesis

A possible answer that a test can support or refute.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: hypothesis
name: Hypothesis
plural: Hypotheses
description: "A possible answer that a test can support or refute."
fields:
  status: { type: text }
capabilities: [has-status]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], supports: [], refutes: []}
look: { hue: fire, icon: lightbulb, layer: argument }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `hypothesis` |
| Naming | `(Program) <Name> . (Hypothesis) <Title>.md` |
| Capabilities | `has-status` |
| Templates | `research` |
