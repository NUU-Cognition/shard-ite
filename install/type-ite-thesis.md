---
id: 83575735-75a8-473a-b5e9-0d6c2906361d
tags:
  - "#f/metadata"
  - "#f/type"
---

# Thesis

A statement that the research argues for, with its evidence.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel. A thesis is a part of the main map, not a claim of `Reality/`: a claim is a test of reality with a check, and a thesis is a statement of the research that its evidence supports or refutes.

```type
format: steel-type/1
id: thesis
name: Thesis
plural: Theses
description: "A statement that the research argues for, with its evidence."
fields:
  status: { type: text }
capabilities: [has-status]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], supports: [], refutes: [], part-of: [], option-of: [], answers: [], opposes: [], picked: [], acts-on: [], threatens: [], protects: []}
look: { hue: water, icon: quote, layer: argument }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `thesis` |
| Naming | `(Program) <Name> . (Thesis) <Title>.md` |
| Capabilities | `has-status` |
| Templates | `research`, `thinking` |
