# ITE

The shard of the Integrated Thinking Environment (ITE). It lets an agent model a system of any kind as a **program**: typed parts in the Mesh, views and maps in `Steel/`, processes that check each claim against reality, and instruction maps that a person or an agent runs. The Workbench of Steel (the page `/ite`) is the surface for the person. The command `flint ite` of the Flint CLI reads and writes the files.

Load it with `flint shard start ite` (headless: `flint shard hstart ite`).

## Structure

```
Shards/(Source Remote) ITE/
├── shard.yaml                       # types Program, Run, System, Module, Feature, Data, and the types of the templates; folders Mesh/Programs and Mesh/Metadata/Templates
├── dev-init-ite.md                  # the model, the files, types and templates, views and maps, processes and the log, the main map, software programs (the proof, the review, the check after a task), instruction maps, living systems, the commands, the quality rules
├── dev-hinit-ite.md                 # the headless rules and the result shape steel-result/1
├── skills/
│   ├── dev-sk-ite-focus.md          # show the person which nodes an agent works on
│   └── dev-sk-ite-check_after_task.md   # the end of a product task: check the parts and views that name the changed files
├── workflows/                       # model, view, reshape, review, ground, observe, repair, and map_create|expand|refactor|cover|update; each has a headless form
├── templates/
│   ├── dev-tmp-ite-program-v0.1.md          # the root note
│   ├── dev-tmp-ite-part-v0.1.md             # a part
│   ├── dev-tmp-ite-view-v0.1.md             # a view (steel-view/1)
│   ├── dev-tmp-ite-map-v0.1.md              # a map of Steel/Maps
│   ├── dev-tmp-ite-process-v0.1.md          # a process (steel-process/1)
│   ├── dev-tmp-ite-instruction_map-v0.1.md  # an instruction map
│   ├── dev-tmp-ite-template-v0.1.md         # a template of a Flint
│   └── dev-tmp-ite-program_<id>-v1.0.md     # the six templates of a new program
└── install/
    ├── type-ite-<type>.md                   # the type notes (steel-type/1)
    └── inst-ite-connection_<id>.md          # the connection notes (steel-connection/1)
```

Each workflow has a headless form (`dev-hwkfl-ite-<name>.md`). A job of the Workbench starts it.

## Origin

Task 1099 of the Flint NUU Flint (2026-10-01) made the shard. Tasks 1235 and 1237 (2026-10-07 and 2026-10-08) gave it the first version of the model of Steel: one type system with the Mesh, the folder `Steel/`, processes, maps, and instruction maps, with the forms `steel-*/1`. Task 1241 (2026-10-08, version 0.4.0) folded the OrbCode shard into it: a software product is a program of the template `software`, with the proof of each node from Orbtest, the review of a node against its code, and the check after a product task.
