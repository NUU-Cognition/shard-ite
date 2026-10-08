---
id: a8de6c7f-2cee-40de-903f-5c12bbc3de36
tags:
  - "#f/metadata"
  - "#f/type"
---

# Module

A Module is an area of a system that groups related features behind one job, such as the parser of a file or the store of the settings. A folder or a package is evidence for a module, not proof: the unit is the job. A small product can go from a system to its features with no module.

A part of a program can have this type. The type gives the fields, the capabilities, the connections, and the look of the part in Steel.

```type
format: steel-type/1
id: module
name: Module
plural: Modules
description: "A part of a system that has one job, such as the parser of a file."
fields: {}
capabilities: [covers-files, container]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: []}
look: { hue: teal, icon: boxes, layer: structure }
```

## Properties

| Property | Value |
|----------|-------|
| Type id | `module` |
| Naming | `<stem of the root note> . (Module) <Title>.md` |
| Capabilities | `covers-files`, `container` |
| Code | `code-refs`, `stories`, `criteria`, `reviewed` (see Software Programs of [[init-ite]]) |
| Templates | `software` |
