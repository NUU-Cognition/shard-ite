---
id: 15287105-5b7b-51fc-b780-15722183a2a3
tags:
  - "#f/metadata"
  - "#f/type"
---

# Person

A person who takes part: a guest, a speaker, a helper, or a partner.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: person
name: Person
plural: People
description: "A person who takes part: a guest, a speaker, a helper, or a partner."
fields: {}
capabilities: [owner]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: [], reports-to: [], reads: [], writes: []}
look: { hue: rose, icon: user-round, layer: structure }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `person` |
| Naming | `(Program) <Name> . (Person) <Title>.md` |
| Capabilities | `owner` |
| Templates | `event`, `organisation`, `shard`, `work` |
