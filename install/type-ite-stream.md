---
id: 07607f47-d87d-5a0b-8681-fd6210583ef4
tags:
  - "#f/metadata"
  - "#f/type"
---

# Stream

A lane of steps that runs beside other lanes, such as the work of the server during the work of the client.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: stream
name: Stream
plural: Streams
description: "A lane of steps that runs beside other lanes, such as the work of the server during the work of the client."
fields: {}
capabilities: [has-claims, container]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: []}
look: { hue: water, icon: waves, layer: process }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `stream` |
| Naming | `(Program) <Name> . (Stream) <Title>.md` |
| Capabilities | `has-claims`, `container` |
| Templates | `software`, `software-mine` |
