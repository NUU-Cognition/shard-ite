---
id: a9d89992-0e4c-552c-80d0-19ecced783c9
tags:
  - "#f/metadata"
  - "#f/type"
---

# Actor

A person or another program that uses the product.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: actor
name: Actor
plural: Actors
description: "A person or another program that uses the product."
fields: {}
capabilities: [owner]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: []}
look: { hue: rose, icon: user-round, layer: actors }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `actor` |
| Naming | `(Program) <Name> . (Actor) <Title>.md` |
| Capabilities | `owner` |
| Templates | `software`, `process`, `general`, `software-mine` |
