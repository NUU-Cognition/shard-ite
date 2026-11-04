# ITE Releases

## Release 0.6.0

The shard teaches how to compose a level (NUU Flint Task 1329). A map change holds a `layout`, and an agent's change with a new part that has no place is refused.

- New knowledge file `knowledge/dev-knw-ite-canvas.md` ("Compose a Level"). It gives a method: read the level (`map canvas`, `map render`), decide what it says, choose a shape (row, column, group, layer), compute the places from the sizes and the gaps (`ITE_PLACE`), draw only what the links do not say, render the draft and read the image, then dry-run and propose. It has one full worked example with the arithmetic, the rule for a level that a person arranged, the refusal `unplaced-parts`, and the meaning of the problems `overlap`, `unplaced`, `far`, and `empty-drawing`.
- The init has the rule about Arrange changes: `flint ite arrange` on a real level still waits for a person, and an agent lays out its own parts in the `layout` of its change. It has a short section "The Layout of a Map Change", new rows in the command table (`map canvas`, `map render`, `--layout`, `--at`, `--near`, `--dry-run`), a row in Read More, and one item in Before You Return (no `overlap` that you made, and a render that you read). Its size is 131 lines.
- A new stage "Place the Parts on the Canvas" in `map_create`, `map_expand`, `map_refactor`, `map_cover`, `parts_add`, and `program_create`. The stages that follow move by one number. The propose commands take `--layout`. A headless session reads the images itself and fixes the layout at most three times. `map_update` has one line: a change of text needs no place.
- `knw-ite-reference` has the section "The Layout of a Map Change" (the JSON shapes, the refusal, the apply and the revert, the preview, and the problems), the section "The Canvas and the Render", and the new terms Layout, Canvas, Render, and Room. `knw-ite-programs` names the new verbs.
- This version needs a Flint CLI with the verbs `map canvas` and `map render` and the `layout` of a map change (NUU Flint Task 1329). With an older CLI, the new commands in the text do not exist.

## Release 0.5.0

The shard teaches only the main map (NUU Flint Task 1327). The later modules of the ITE stay in the code, and a setting of each Flint turns them on.

- The init is short (120 lines) and teaches only the main map: what a program and its main map are, the rules, where the files live, how to make a program and change its map, the operations of a map change, the command for each piece of work, the setting of the modules, and the section Headless.
- The rules stay: an agent proposes, and only a person decides; one writer of the structure; only commands write facts; test before you hand over; read before you run; never invent.
- New text: the setting of the modules (`flint ite modules`, the block `[ite]` of `flint.toml`), and the drawings of the main map (`flint ite drawing`), in `knw-ite-programs` and `knw-ite-reference`.
- `program_create` makes the program and proposes its first map, then checks it and lists what only the person applies. A new program gets only its root note.
- The six map workflows (`map_create`, `map_expand`, `map_refactor`, `map_cover`, `map_update`, `parts_add`) have no step of a later module. A headless session returns as its prompt says. The stage gate stays: the person reads the preview and applies.
- `sk-ite-check_after_task` finds the parts whose sources name the changed files, and proposes one map change or names one gap. It emits no event.
- The templates `tmp-ite-program`, `tmp-ite-part`, and `tmp-ite-template` have no key and no example of a later module. A key of a later module in an existing note stays.
- The six templates of `install/` have a main map text for the agent. Their types, connections, and blocks do not change. The type note Program (`type-ite-program.md`) has a main map text and names only the kept templates, and the row Code of the type notes Data, Feature, Module, and System names only `code-refs`.
- These files moved to `.later/`, with their `dev-` names: the old init (`dev-init-ite-0.4.2.md`), the workflows `claim_add`, `flow_add`, `ground`, `model`, `observe`, `process_add`, `repair`, `reshape`, `review`, and `view`, the skills `focus`, `process_new`, and `workflow_new`, the knowledge files `loop`, `processes`, `software`, and `state`, and the templates `claim`, `data`, `instruction_map`, `map`, `process`, and `view`. `.later/README.md` names the module that takes each file back.
- No recipe, type, or connection is removed from `install/` or from the `types` of `shard.yaml`: the engine reads the recipes, and existing programs name the types. The recipes of the later actions name their workflow at its path in `.later/` (`Shards/ITE/.later/wkfl-ite-<name>.md`), and the `task` of each of the 13 recipes of a later module (12 with a workflow, and `revise`) first names the old init (`Shards/ITE/.later/init-ite-0.4.2.md`), which holds the rules of the job. So, when a person turns a later module on, its jobs find their workflows and their rules in the build.
- This version needs a Flint CLI whose `flint shard start` skips a folder whose name starts with a dot (NUU Flint Task 1327). An older CLI lists the files of `.later/` too.
