---
id: 5c553a0a-fb54-4ea3-90aa-9c116a935bbf
tags:
  - "#f/metadata"
  - "#f/type"
---

# Data

A Data part is a shape of state that a software product keeps: a file, a record, or a store that it reads or writes. Say what the state means and what must stay true, not only its fields. Its `parent` is the part that owns it. A Data part is a part of the main map: it is not the data of a program (`Steel/Programs/<P>/Data/`), which holds values.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: data
name: Data
plural: Data
description: "A file, a record, or a store that the product reads or writes."
fields: {}
capabilities: [covers-files]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: []}
look: { hue: earth, icon: database, layer: structure }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `data` |
| Naming | `<stem of the root note> . (Data) <Title>.md` |
| Capabilities | `covers-files` |
| Code | `code-refs`, `stories`, `criteria`, `reviewed` (see Software Programs of [[init-ite]]) |
| Templates | `software` |
