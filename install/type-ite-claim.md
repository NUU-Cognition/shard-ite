---
id: 33b199ab-b61f-576f-9cef-d16137b8617e
tags:
  - "#f/metadata"
  - "#f/type"
---

# Claim

A statement that the research makes. It links to its evidence.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: claim
name: Claim
plural: Claims
description: "A statement that the research makes. It links to its evidence."
fields:
  status: { type: text }
capabilities: [has-claims, has-status]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], supports: [], refutes: [], part-of: [], option-of: [], answers: [], opposes: [], picked: [], acts-on: [], threatens: [], protects: []}
look: { hue: water, icon: quote, layer: argument }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `claim` |
| Naming | `(Program) <Name> . (Claim) <Title>.md` |
| Capabilities | `has-claims`, `has-status` |
| Templates | `research`, `thinking` |
