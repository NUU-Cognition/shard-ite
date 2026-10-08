---
id: b6d60de0-6d58-4242-8dc5-bab0e5775ee0
tags:
  - "#f/metadata"
  - "#f/type"
---

# Feature

A Feature is one capability of a software product: one thing that a person can do with it. Write it so that a person who does not read code understands the capability. A feature is one capability, not one file. A step of a process view names the feature where it runs with `part`.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: feature
name: Feature
plural: Features
description: "One thing that a person can do with the product."
fields: {}
capabilities: [covers-files]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: []}
look: { hue: sun, icon: sparkles, layer: structure }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `feature` |
| Naming | `<stem of the root note> . (Feature) <Title>.md` |
| Capabilities | `covers-files` |
| Code | `code-refs`, `stories`, `criteria`, `reviewed` (see Software Programs of [[init-ite]]) |
| Templates | `software` |
