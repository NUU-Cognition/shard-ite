---
id: 6ff7ae33-3cfb-5324-9b54-a776c8d3ef20
tags:
  - "#f/metadata"
  - "#f/type"
---

# Init

The init file or the headless init: the first file that an agent reads.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: init
name: Init
plural: Inits
description: "The init file or the headless init: the first file that an agent reads."
fields: {}
capabilities: []
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], reads: [], writes: []}
look: { hue: sun, icon: book-open, layer: context }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `init` |
| Naming | `(Program) <Name> . (Init) <Title>.md` |
| Capabilities | none |
| Templates | `shard` |
