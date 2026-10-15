---
id: 819c217f-7d74-4f49-ac0e-be43aa8b2ac3
tags:
  - "#f/metadata"
  - "#f/connection"
---

# refers to

The part refers to the other part. The main map always shows this link.

A part links to another part with the frontmatter key `refers-to`: a wikilink, or a list of wikilinks. A person draws this link on the main map: select a card, then drag from one of the four dots on its sides to another card. An agent proposes it with `flint ite link <program> <from> <to> --relation refers-to`: one map change that a person applies.

`shown: always`: the canvas shows the link at each time, not only when a person selects a card at one end. Each other connection of the ITE shard has no field `shown`, so its links show only on a click (`selected`).

```connection
format: steel-connection/1
id: refers-to
key: refers-to
title: refers to
description: "The part refers to the other part. The main map always shows this link."
capabilities: []
style: reference
shown: always
```
