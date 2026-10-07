---
id: de256af6-c9ef-5aa3-813b-fa3a2f82aafa
tags:
  - "#f/metadata"
  - "#f/type"
---

# Deliverable

A thing that the event makes or gives, such as a poster, a booking, or a speech.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: deliverable
name: Deliverable
plural: Deliverables
description: "A thing that the event makes or gives, such as a poster, a booking, or a speech."
fields:
  date: { type: date }
  status: { type: text }
capabilities: [has-claims, dated, has-status]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: []}
look: { hue: teal, icon: package, layer: plan }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `deliverable` |
| Naming | `(Program) <Name> . (Deliverable) <Title>.md` |
| Capabilities | `has-claims`, `dated`, `has-status` |
| Templates | `event` |
