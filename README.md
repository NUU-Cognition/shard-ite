# ITE

The shard of the Integrated Thinking Environment (ITE). It lets an agent model a system of any kind as a **program**: typed parts in the Mesh, views and maps in `Steel/`, claims that test reality with their check processes, data with their makers, recipes (shared processes), and instruction maps that a person or an agent runs. The Workbench of Steel (the page `/ite`) is the surface for the person. The command `flint ite` of the Flint CLI reads and writes the files.

Load it with `flint shard start ite`, also in a headless session.

## Structure

```
Shards/(Source Remote) ITE/
├── shard.yaml                       # types Program, Run, System, Module, Feature, Data, and the types of the templates; folders Mesh/Programs and Mesh/Metadata/Templates
├── dev-init-ite.md                  # the kernel, the rules, a program end to end, the forms on one screen, jobs to commands, which knowledge file to read; the section Headless: the three kinds of headless agent (a job agent, an engine agent, a builder), their rules, and the result shape steel-result/1
├── knowledge/
│   ├── dev-knw-ite-reference.md     # each term, the planes, meaning versus facts, the folders, every command
│   ├── dev-knw-ite-programs.md      # the root note, parts, types and templates, views, maps, references, proposals, the main map, the quality rules
│   ├── dev-knw-ite-state.md         # data and their makers, data maps, claims and their checks, which side changes when a claim fails, the one door of the results
│   ├── dev-knw-ite-processes.md     # processes and their jobs, keepers, the folders of the sidebar, recipes (also with code) and starters, triggers and events, instruction maps, runs
│   ├── dev-knw-ite-loop.md          # events, the agent of a program, the plan and the realize, draft versions, the pulse, the system of each program, agent sessions and jobs
│   └── dev-knw-ite-software.md      # programs with a codebase: code-refs, stories, the Orbtest proof, the review, the claim of a source, the check after a task
├── skills/
│   ├── dev-sk-ite-focus.md          # show the person which nodes an agent works on
│   ├── dev-sk-ite-check_after_task.md   # the end of a product task: emit task.finished, then check the parts and views that name the changed files
│   ├── dev-sk-ite-process_new.md    # one process from one sentence, with one command
│   └── dev-sk-ite-workflow_new.md   # one instruction map from a list of steps, with one command
├── workflows/                       # program_create (a program end to end), model, view, reshape, review, ground, observe, repair, claim_add, process_add, flow_add, parts_add, and map_create|expand|refactor|cover|update; each has a headless form
├── templates/
│   ├── dev-tmp-ite-program-v0.1.md          # the root note
│   ├── dev-tmp-ite-part-v0.1.md             # a part
│   ├── dev-tmp-ite-view-v0.1.md             # a view (steel-view/1)
│   ├── dev-tmp-ite-map-v0.1.md              # a map of Steel/Maps
│   ├── dev-tmp-ite-process-v0.1.md          # a process (steel-process/1)
│   ├── dev-tmp-ite-instruction_map-v0.1.md  # an instruction map
│   ├── dev-tmp-ite-claim-v0.1.md            # a claim (steel-claim/2) and its check process
│   ├── dev-tmp-ite-data-v0.1.md             # a data note (steel-data/2) and its maker process
│   └── dev-tmp-ite-template-v0.1.md         # a template of a Flint
└── install/
    ├── type-ite-<type>.md                   # the type notes (steel-type/1)
    ├── inst-ite-connection_<id>.md          # the connection notes (steel-connection/1)
    ├── inst-ite-template_<id>.md            # the six templates of a new program (Mesh/Metadata/Templates)
    ├── inst-ite-recipe_<id>.md              # the recipes: the shared processes of Steel/Recipes/<id>/process.md (the 20 agent actions, keep-map-true, and the four recipes with code)
    └── inst-ite-recipe_<id>_<file>          # the code files of a recipe with code (Steel/Recipes/<id>/<file>): orbtest-results, orbtest-proof, review-current, source-unchanged
```

Each workflow serves both modes: a headless session follows its `> [!headless]` callouts. A job of the Workbench starts the workflow of its action by name (the code of flint names each file), so keep the names.

## Origin

Task 1099 of the Flint NUU Flint (2026-10-01) made the shard. Tasks 1235 and 1237 (2026-10-07 and 2026-10-08) gave it the first version of the model of Steel: one type system with the Mesh, the folder `Steel/`, processes, maps, and instruction maps, with the forms `steel-*/1`. Task 1241 (2026-10-08, version 0.4.0) folded the OrbCode shard into it: a software product is a program of the template `software`, with the proof of each node from Orbtest, the review of a node against its code, and the check after a product task. Task 1260 (2026-10-12) made the init short: the depth moved into six knowledge files by topic, and the shard got the workflow `program_create` and the skills `process_new` and `workflow_new`. Task 1271 (2026-10-15) gave it the Steel model V2: four kernel words (model, process, data, event), claims as tests with check processes, makers as processes, keepers (`kept-by`), pointer parts, recipes, three trigger kinds, and plans with no states. Task 1273 (2026-10-15) gave it nested folders for the processes, the data, and the claims, made the Orbtest proof, the review, and the claims of a source normal data, claims, and recipes with code, made `codebase` (not the template name) decide the file coverage, and made each program a living system.
