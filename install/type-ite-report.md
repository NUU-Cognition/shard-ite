---
id: fb6008b4-2fcb-50b1-8513-0b04ca1857c0
tags:
  - "#f/metadata"
  - "#f/type"
---

# Report

A report of the Reports shard: the answer to one question, with evidence.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: report
name: Report
plural: Reports
description: "A report of the Reports shard: the answer to one question, with evidence."
fields:
  date: { type: date }
  status: { type: text }
capabilities: [dated, has-status]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: []}
look: { hue: earth, icon: file-text, layer: work }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `report` |
| Naming | `(Program) <Name> . (Report) <Title>.md` |
| Capabilities | `dated`, `has-status` |
| Templates | `work` |
