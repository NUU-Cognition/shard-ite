---
id: db2a3dd4-5f2c-5225-a520-515f08aaea44
tags:
  - "#f/metadata"
  - "#f/type"
---

# Metric

A number that shows how well the process works.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: metric
name: Metric
plural: Metrics
description: "A number that shows how well the process works."
fields: {}
capabilities: [has-claims]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: [], reports-to: []}
look: { hue: stone, icon: gauge, layer: control }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `metric` |
| Naming | `(Program) <Name> . (Metric) <Title>.md` |
| Capabilities | `has-claims` |
| Templates | `process`, `organisation` |
