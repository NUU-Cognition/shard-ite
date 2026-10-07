---
id: 1bb22e65-10f4-5afc-af8b-b4f97ce8c54d
tags:
  - "#f/metadata"
  - "#f/type"
---

# Milestone

A point in time when a part of the plan is done, such as "Venue booked".

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: milestone
name: Milestone
plural: Milestones
description: "A point in time when a part of the plan is done, such as \"Venue booked\"."
fields:
  date: { type: date }
  status: { type: text }
capabilities: [has-claims, dated, has-status, container]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: []}
look: { hue: fire, icon: flag, layer: plan }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `milestone` |
| Naming | `(Program) <Name> . (Milestone) <Title>.md` |
| Capabilities | `has-claims`, `dated`, `has-status`, `container` |
| Templates | `event` |
