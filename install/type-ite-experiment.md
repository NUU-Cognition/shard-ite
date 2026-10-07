---
id: 91e5f919-9cb3-5cb1-bdb4-e1a01a475782
tags:
  - "#f/metadata"
  - "#f/type"
---

# Experiment

One test of a hypothesis, with its setup and its result.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: experiment
name: Experiment
plural: Experiments
description: "One test of a hypothesis, with its setup and its result."
fields:
  date: { type: date }
  status: { type: text }
capabilities: [has-claims, dated, has-status, container]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], supports: [], refutes: []}
look: { hue: rose, icon: flask-conical, layer: process }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `experiment` |
| Naming | `(Program) <Name> . (Experiment) <Title>.md` |
| Capabilities | `has-claims`, `dated`, `has-status`, `container` |
| Templates | `research` |
