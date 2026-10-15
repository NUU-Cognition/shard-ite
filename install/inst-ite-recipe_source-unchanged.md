---
format: steel-process/1
id: source-unchanged
by: code
runtime: node
entry: check.js
timeout: 30s
---

# Check: The source of a mirror did not change after the drawing

The check of the claim of a mirror. A mirror is a process, an instruction map, or a step with a `source` and a `hash`: it draws an instruction that lives outside the model (a file of a codebase, a note, a skill). The `hash` is the sha256 of the text of the source at the drawing. The claim has one reference in `about`: `process:<id>` (the source of `process.md` or of `map.md`) or `process:<id>#<node>` (the source of a step).

The check runs `flint ite process show "<program>" <id> --json` and reads `sources`: each source with a hash, with its hash now and its state. It runs no test, and it writes nothing. It gives one verdict with no `part`:

- **Holds**: each source of the reference is `same`: the hash now is the hash of the drawing.
- **Fails**: a source is `changed`. The evidence names the path or the ref, with both hashes. The process that draws the mirror again listens to `claim.failed` of the claim. It proposes the new drawing, and a person applies it.
- **Error**: a source is `missing` (the core cannot read the file, or the codebase is not known on this machine), or the reference has no source with a hash.

The code is `check.js` in this recipe folder. A process of a program uses this recipe with `recipe: source-unchanged`. The claim names that process in `kept-by`.
