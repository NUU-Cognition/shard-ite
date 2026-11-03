# The Later Files of the ITE Shard

Version 0.5.0 of the ITE shard teaches only the main map (NUU Flint Task 1327). The files of the later modules wait here, with their `dev-` names. The code of each later module stays in Flint and in Steel. A person turns a module on for one Flint with `flint ite modules on <id>`.

A module that comes back takes its files back with `git mv` to their old folder. Then the init, the README, and the knowledge files of the shard name them again.

| File | Old folder | The module that takes it back |
|---|---|---|
| `dev-init-ite-0.4.2.md` | the root (it was `dev-init-ite.md`) | Each later module: the old init, whole. Take its sections back with the module that each section teaches. |
| `dev-wkfl-ite-view.md` | `workflows/` | `views` |
| `dev-wkfl-ite-reshape.md` | `workflows/` | `views` |
| `dev-tmp-ite-view-v0.1.md` | `templates/` | `views` |
| `dev-tmp-ite-map-v0.1.md` | `templates/` | `views` |
| `dev-wkfl-ite-process_add.md` | `workflows/` | `processes` |
| `dev-wkfl-ite-flow_add.md` | `workflows/` | `processes` |
| `dev-sk-ite-process_new.md` | `skills/` | `processes` |
| `dev-sk-ite-workflow_new.md` | `skills/` | `processes` |
| `dev-knw-ite-processes.md` | `knowledge/` | `processes` |
| `dev-tmp-ite-process-v0.1.md` | `templates/` | `processes` |
| `dev-tmp-ite-instruction_map-v0.1.md` | `templates/` | `processes` |
| `dev-wkfl-ite-claim_add.md` | `workflows/` | `data-claims` |
| `dev-wkfl-ite-ground.md` | `workflows/` | `data-claims` |
| `dev-wkfl-ite-observe.md` | `workflows/` | `data-claims` |
| `dev-wkfl-ite-repair.md` | `workflows/` | `data-claims` |
| `dev-wkfl-ite-review.md` | `workflows/` | `data-claims` |
| `dev-knw-ite-state.md` | `knowledge/` | `data-claims` |
| `dev-knw-ite-software.md` | `knowledge/` | `data-claims` |
| `dev-tmp-ite-claim-v0.1.md` | `templates/` | `data-claims` |
| `dev-tmp-ite-data-v0.1.md` | `templates/` | `data-claims` |
| `dev-wkfl-ite-model.md` | `workflows/` | `agents` (it overlaps `map_create` and `parts_add`; the action `model` of a job names it) |
| `dev-sk-ite-focus.md` | `skills/` | `agents` |
| `dev-knw-ite-loop.md` | `knowledge/` | `loop` |

## Notes

- `dev-knw-ite-loop.md` also teaches the agent sessions and their jobs (the module `agents`). Split it when only one of the two modules comes back.
- `dev-knw-ite-software.md` also teaches the view nodes of a product (the module `views`) and the check after a task with an event (the module `loop`).
- The recipes in `install/` stay in the shard: the engine reads them, and existing programs name them. The recipes of the jobs (for example `inst-ite-recipe_claim-add.md`) name the workflows here by their built names. A job of a later module can run only after its workflow is back in `workflows/`.
- The build of the shard copies this folder, and `flint shard start` does not list it (NUU Flint Task 1327). No agent loads a file of this folder.
