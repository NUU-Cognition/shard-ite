---
id: 066f9c09-1838-4260-a170-1d75bad7a611
tags:
  - "#f/metadata"
  - "#f/type"
---

# System

A System is a major boundary of a software product: a part that a person can name and that has its own job, such as the command line, the server, or the web app. A product has one to five systems. A system holds modules and features.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: system
name: System
plural: Systems
description: "A large part of the product that a person can name, such as the command line or the server."
fields: {}
capabilities: [covers-files, covers-boundary, container]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: []}
look: { hue: water, icon: server, layer: structure }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `system` |
| Naming | `<stem of the root note> . (System) <Title>.md` |
| Capabilities | `covers-files`, `covers-boundary`, `container` |
| Code | `code-refs`, `stories`, `criteria`, `reviewed` (see Software Programs of [[init-ite]]) |
| Templates | `software` |
