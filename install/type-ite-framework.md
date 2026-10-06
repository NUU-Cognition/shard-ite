---
id: 3a33689f-8e23-4de5-a5e8-01301e204fca
tags:
  - "#f/metadata"
  - "#f/type"
---

# Framework

A Framework is the vocabulary of one kind of system: the kinds of its nodes (for example `goal`, `milestone`, `venue`), the relations between the nodes (`next`, `uses`, `depends-on`), the layers that a person shows and hides as a whole, the shapes that fit its views, and example questions. A Program names one Framework, and the Workbench draws each part with the icon and the hue of its kind. The ITE has six builtin frameworks in code: `software`, `process`, `event`, `research`, `organisation`, and `general`. A Framework note in the Mesh adds a new framework to this Flint, or replaces a builtin framework when it has the same id. A Framework is not a template: a template gives the form of one note, and a Framework gives the words that a whole model uses. A Framework is not a Mesh type: a kind can name a Mesh type (the kind `task` is the type `Task`), but most kinds are plain parts of a map.

## Properties

| Property | Value |
|----------|-------|
| Tag | `#ite/framework` |
| Format | `ite-framework/1` |
| Naming | `(Framework) <Title>.md` |
| Location | `Mesh/Metadata/Frameworks/` |
| Body | One fenced block with the info string `framework`: YAML with the fields of `IteFramework` |

## Lifecycle

```
written → used by programs → changed (each program reads the new form at the next read)
```

A change of a kind id breaks each part that uses the old id: the check gives a `framework` note for each such part.

## Templates

- [[tmp-ite-framework-v0.1]] — Framework
