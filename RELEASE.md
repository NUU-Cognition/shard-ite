# ITE Releases

## Release 0.5.0

The shard teaches only the main map (NUU Flint Task 1327). The later modules of the ITE stay in the code, and a setting of each Flint turns them on.

- The init is short (120 lines) and teaches only the main map: what a program and its main map are, the rules, where the files live, how to make a program and change its map, the operations of a map change, each job with its command, the setting of the modules, and the section Headless.
- The rules stay: an agent proposes, and only a person decides; one writer of the structure; only commands write facts; test before you hand over; read before you run; never invent.
- New text: the setting of the modules (`flint ite modules`, the block `[ite]` of `flint.toml`), and the drawings of the main map (`flint ite drawing`), in `knw-ite-programs` and `knw-ite-reference`.
- `program_create` makes the program and proposes its first map, then checks it and lists what only the person applies. A new program gets only its root note.
- The six map workflows (`map_create`, `map_expand`, `map_refactor`, `map_cover`, `map_update`, `parts_add`) have no step of a later module. A headless session returns as its prompt says. The stage gate stays: the person reads the preview and applies.
- `sk-ite-check_after_task` finds the parts whose sources name the changed files, and proposes one map change or names one gap. It emits no event.
- The templates `tmp-ite-program`, `tmp-ite-part`, and `tmp-ite-template` have no key and no example of a later module. A key of a later module in an existing note stays.
- The six templates of `install/` have a main map text for the agent. Their types, connections, and blocks do not change.
- These files moved to `.later/`, with their `dev-` names: the old init (`dev-init-ite-0.4.2.md`), the workflows `claim_add`, `flow_add`, `ground`, `model`, `observe`, `process_add`, `repair`, `reshape`, `review`, and `view`, the skills `focus`, `process_new`, and `workflow_new`, the knowledge files `loop`, `processes`, `software`, and `state`, and the templates `claim`, `data`, `instruction_map`, `map`, `process`, and `view`. `.later/README.md` names the module that takes each file back.
- `install/` and the `types` of `shard.yaml` do not change: the engine reads the recipes, and existing programs name the types.
- This version needs a Flint CLI whose `flint shard start` skips a folder whose name starts with a dot (NUU Flint Task 1327). An older CLI lists the files of `.later/` too.
