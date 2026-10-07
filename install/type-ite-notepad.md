---
id: 337fc556-98b1-5522-8883-ca39552d453d
tags:
  - "#f/metadata"
  - "#f/type"
---

# Notepad

A notepad of the Notepad shard: the thinking of a person on one topic.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: notepad
name: Notepad
plural: Notepads
description: "A notepad of the Notepad shard: the thinking of a person on one topic."
fields:
  status: { type: text }
capabilities: [has-claims, has-status]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: []}
look: { hue: air, icon: notebook-pen, layer: work }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `notepad` |
| Naming | `(Program) <Name> . (Notepad) <Title>.md` |
| Capabilities | `has-claims`, `has-status` |
| Templates | `work` |
