# ITE

The shard of the Integrated Thinking Environment (ITE). It lets an agent model a system of any kind as a **program**: parts on a map, views that answer the questions of a person, and contacts that check each claim against reality. The Workbench of Steel (the page `/ite`) is the surface for the person. The command `flint ite` of the Flint CLI reads and writes the files.

Load it with `flint shard start ite` (headless: `flint shard hstart ite`).

## Structure

```
Shards/(Source Local) ITE/
├── shard.yaml                       # types Program and Framework; folders Mesh/Programs and Mesh/Metadata/Frameworks
├── dev-init-ite.md                  # the model, the files, the contact, the grounding, the frameworks, the commands, the quality rules
├── dev-hinit-ite.md                 # the headless rules and the result shape ite-result/1
├── skills/
│   └── dev-sk-ite-focus.md          # show the person which nodes an agent works on
├── workflows/
│   ├── dev-wkfl-ite-model.md        # make or extend the map of a system (headless: dev-hwkfl-ite-model.md)
│   ├── dev-wkfl-ite-view.md         # answer one question with a view, through a candidate
│   ├── dev-wkfl-ite-reshape.md      # change a view, through a candidate
│   ├── dev-wkfl-ite-ground.md       # find the contacts of nodes with reality
│   ├── dev-wkfl-ite-observe.md      # check nodes against reality now
│   └── dev-wkfl-ite-repair.md       # make the model true again
├── templates/
│   ├── dev-tmp-ite-program-v0.1.md
│   ├── dev-tmp-ite-part-v0.1.md
│   ├── dev-tmp-ite-view-v0.1.md
│   └── dev-tmp-ite-framework-v0.1.md
└── install/
    ├── type-ite-program.md
    └── type-ite-framework.md
```

Each workflow has a headless form (`dev-hwkfl-ite-<name>.md`). A job of the Workbench starts it.

## Origin

Task 1099 of the Flint NUU Flint (2026-10-01). The design note of that task holds the model, the file forms, the routes, and the Workbench.
