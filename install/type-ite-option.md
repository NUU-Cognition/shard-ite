---
id: b43a4c60-8fe7-5209-a802-fa1d2624c1f4
tags:
  - "#f/metadata"
  - "#f/type"
---

# Option

One possible answer to a question.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: option
name: Option
plural: Options
description: "One possible answer to a question."
fields:
  status: { type: text }
capabilities: [has-status]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], part-of: [], option-of: [], answers: [], supports: [], opposes: [], picked: [], acts-on: [], threatens: [], protects: []}
look: { hue: air, icon: git-branch, layer: explore }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `option` |
| Naming | `(Program) <Name> . (Option) <Title>.md` |
| Capabilities | `has-status` |
| Templates | `thinking` |
