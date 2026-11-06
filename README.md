# ITE

The shard of the Integrated Thinking Environment (ITE). It lets an agent model a system of any kind as a **program**, and build its **main map**: typed parts in the Mesh, in a tree by `parent`. Each change of the tree is one map change. In the mode `proposal` (the default), a person reads and applies it. In the mode `direct`, which the person chooses, the agent applies its own change at once, with a record and a revert. The Workbench of Steel (the page `/ite`) is the surface for the person. The command `flint ite` of the Flint CLI reads and writes the files.

Version 0.7.0 teaches only the main map, how to compose a level of it, and the two modes of an agent (`proposal` and `direct`). The later modules of the ITE (views, processes, data and claims, agents, and the loop) stay in the code of Flint and Steel. They are off by default, and a person turns one on with `flint ite modules on <id>`. Their shard files wait in `.later/`.

Load it with `flint shard start ite`, also in a headless session.

## Structure

```
Shards/(Source Remote) ITE/
├── shard.yaml                       # the types of the templates (Program, System, Module, Feature, Data, and more); folders Mesh/Programs and Mesh/Metadata/Templates; the install files
├── dev-init-ite.md                  # a program and its main map, the rules, the two modes, where the files live, how to make a program and change its map, the operations of a map change, the command for each piece of work, the setting of the modules, which file to read; the section Headless
├── knowledge/
│   ├── dev-knw-ite-programs.md      # the root note, parts, types, connections, and templates, the tree, coverage, the findings, the map change, places, sizes, faces, drawings, links, the setting, the quality rules
│   ├── dev-knw-ite-canvas.md        # compose a level: read the canvas, choose a shape, compute the places, draw, render, propose with a layout, the canvas problems
│   └── dev-knw-ite-reference.md     # each term, who writes what, meaning versus facts, the folders, each command of the main map, the layout of a map change
├── skills/
│   └── dev-sk-ite-check_after_task.md   # the end of a product task: the parts whose sources name the changed files, then one map change or one gap
├── workflows/                       # program_create, map_create, map_expand, map_refactor, map_cover, map_update, parts_add; each serves a session with a person and a headless session, in the mode proposal or direct
├── templates/
│   ├── dev-tmp-ite-program-v0.1.md          # the root note
│   ├── dev-tmp-ite-part-v0.1.md             # a part
│   └── dev-tmp-ite-template-v0.1.md         # a template of a Flint
├── install/
│   ├── type-ite-<type>.md                   # the type notes (steel-type/1)
│   ├── inst-ite-connection_<id>.md          # the connection notes (steel-connection/1)
│   ├── inst-ite-template_<id>.md            # the six templates of a new program (Mesh/Metadata/Templates)
│   ├── inst-ite-recipe_<id>.md              # the recipes of Steel/Recipes/<id>/process.md (the engine and the later modules read them)
│   └── inst-ite-recipe_<id>_<file>          # the code files of a recipe with code
└── .later/                          # the files of the later modules, with their dev- names; README.md names the module that takes each file back
```

Each workflow serves a session with a person and a headless session: a headless session follows its `> [!headless]` callouts. Each workflow that changes the main map proposes in the mode `proposal`, and applies with `--apply` in the mode `direct`. The code of Flint names some files of this shard (for example the recipes name their workflows), so keep the names.

## Origin

Task 1099 of the Flint NUU Flint (2026-10-01) made the shard. Tasks 1235 and 1237 (2026-10-07 and 2026-10-08) gave it the first version of the model of Steel: one type system with the Mesh, the folder `Steel/`, processes, maps, and instruction maps. Task 1241 (2026-10-08, version 0.4.0) folded the OrbCode shard into it. Task 1260 (2026-10-12) made the init short. Task 1271 (2026-10-15) gave it the Steel model V2, and Task 1273 (2026-10-15) gave it nested folders and living systems. Task 1327 (2026-11-03, version 0.5.0) made the main map a self-contained module: the shard teaches only the main map, and the files of the later modules moved to `.later/`. Task 1329 (2026-11-04, version 0.6.0) added the layout of a map change: the shard teaches how to compose a level. Task 1335 (2026-11-06, version 0.7.0) added the two modes: in the mode `direct`, an agent applies its own change.
