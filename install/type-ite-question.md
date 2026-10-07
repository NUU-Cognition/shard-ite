---
id: 7757166b-32f9-510b-a171-7d3a7bc1c008
tags:
  - "#f/metadata"
  - "#f/type"
---

# Question

A question that the research must answer.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: question
name: Question
plural: Questions
description: "A question that the research must answer."
fields:
  status: { type: text }
capabilities: [has-status, container]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], supports: [], refutes: [], part-of: [], option-of: [], answers: [], opposes: [], picked: [], acts-on: [], threatens: [], protects: []}
look: { hue: sun, icon: circle-help, layer: argument }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `question` |
| Naming | `(Program) <Name> . (Question) <Title>.md` |
| Capabilities | `has-status`, `container` |
| Templates | `research`, `general`, `thinking` |
