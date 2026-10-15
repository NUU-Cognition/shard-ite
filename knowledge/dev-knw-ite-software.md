---
description: "Programs with a codebase: the field codebase, code-refs, Orbtest stories and criteria, the anchor of a step, the process views of a product, the Orbtest proof as a claim, the review as data and a claim, the claim of a source, the check after a task, and their findings and commands"
---

# Knowledge: Programs with a Codebase

Read this file before you work on a program with a codebase: code-refs, stories, the Orbtest proof, the review, the claim of a source, or the check after a task. The rules of [[init-ite]] and of [[knw-ite-programs]] apply with no change.

## Programs with a Codebase

A program **has a codebase** when its root note has the field `codebase`. The field `codebase`, not the template name, decides the file coverage, the `code-refs`, and the code checks of a program. The template `software` writes `codebase` for a software product, but a program of each template can have it. A software product is usually a program of the template `software`: its parts are the systems, the modules, the features, and the data of the product (the types `system`, `module`, `feature`, and `data` of this shard), and its views show the processes that run through the product.

Each part and each view node can name the code with `code-refs` and the stories of Orbtest with `stories` and `criteria`. The core has no special claim for a program with a codebase. The proof, the review, and the drawing of a source are normal data, processes, and claims, with shared recipes:

| What a person asks | The data | The claim and its check | The recipes |
|---|---|---|---|
| Does the product do what each part says? | `orbtest-results` (maker `make-orbtest-results`) | `orbtest-proof` (check `check-orbtest-proof`) | `orbtest-results`, `orbtest-proof` |
| Did the code change after a person or an agent compared a node with it? | `reviews` (keeper: the process `review`) | `reviews-current` (check `check-reviews-current`) | `review`, `review-current` |
| Did the source of a process change after it was drawn? | none: the core reads the hash | one claim for each source (check `check-<claim id>`) | `source-unchanged` |

The check after a task finds the nodes that a product task changed.

### The Root Note and the Code

The root note of a program with a codebase has two more fields:

| Field | Value |
|---|---|
| `codebase` | A wikilink to a codebase marker: `"[[rf-cb-<slug>]]"`. The markers are in `Mesh/Metadata/References/Codebases/`. The `name` of the marker is the codebase name. `flint resolve codebase <name>` prints its path on this machine on the first line. Each `code-refs` path is relative to this path. |
| `product-root` | The folder that holds `orbtest/`, relative to the codebase. The value is `"."` when it is the codebase root (the default). The `--root` of each `flint orbtest` command is the codebase path joined with `product-root`. Write the field when `orbtest/` is in another folder of the codebase. |

Each code run (a worker, a check, a maker) of a program gets three values from the root note: `STEEL_CODEBASE` (the absolute path of the codebase, or empty when there is none or it is not fulfilled on this machine), `STEEL_PRODUCT_ROOT` (`STEEL_CODEBASE` joined with `product-root`, or empty), and `STEEL_PART_FILES` (a JSON object from each part id of `STEEL_PARTS` to the absolute path of its note).

When the product has no codebase marker, the person adds the reference: `flint reference codebase "<Name>" <path>`, then `flint sync` (the sync writes the marker). When the marker exists but its path is not known on this machine, the person runs `flint fulfill codebase "<Name>" <path>`. `flint reference list` shows each codebase name and its state.

### The Grammar of `code-refs`

A part has `code-refs` in its frontmatter. A view node with a slug id has `code-refs` in its block. A view node of a part has none: the part holds its code.

```
"src/auth/"                            # a folder of the codebase of the program
"src/auth/session.ts"                  # a file
"src/auth/session.ts#SessionManager"   # a symbol in a file
"src/auth/session.ts:L20-L80"          # a line range: a weak anchor
"@Steel/apps/steel-cli/src/serve.ts"   # a file of another codebase of the Flint
```

- A path with no `@` is relative to the codebase of the program. Each path must exist: else the finding `code-ref-missing`.
- `@<Codebase name>/<path>` names a path in another codebase of the Flint. The name after `@` is the `name` of its codebase marker (`flint reference list` shows the names), for example `@Steel/`. Use it when one part of the answer is in another repository.
- A path that leaves the codebase (`../plates/...`, or an absolute path) gives `code-ref-missing`. Use `@<Codebase name>/<path>` in its place.
- A symbol (`#Name`) is a name that the file declares: a function, a class, a type, or a constant. The check only looks for the name as a whole word in the file, so a symbol is a weak anchor. Prefer the file when the whole file holds the claim. Do not use a line range in an accepted view.
- **Name files, not large folders.** A broad code-ref (a large folder such as `packages/flint/src/`) tells the person nothing. After a review, each change of a file in that folder also gives `review-due`. Name the one file or the small folder that holds the claim of the node.
- The coverage of the main map reads the `code-refs` of each part of a type with `covers-files` (see The Main Map in [[knw-ite-programs]]).

### Stories and Criteria

The contract of a product is in its Orbtest stories (`orbtest/stories/`). A part has `stories` and `criteria` in its frontmatter. A view node with a slug id has them in its block.

| Field | Value |
|---|---|
| `stories` | Orbtest story ids, for example `[setup.steps]` |
| `criteria` | Criterion addresses `<story-id>#<index>`, 0-based, for example `[setup.steps#0, setup.steps#3]`. Use it only when the node needs some criteria of a story, not all. |

The criteria of a part are the union: each criterion of each story of `stories`, and each criterion of `criteria`. An address gives its story, so the story need not be in `stories`. When a part needs only some criteria of a story, name those criteria and leave the story out of `stories`: else each criterion of the story counts.

`stories` and `criteria` are plain fields: the engine reads no meaning from them. The check of the claim `orbtest-proof` reads them (see The Orbtest Proof). Take each id and each address from `flint orbtest story list --root <product root>` and `flint orbtest story show <id> --root <product root>`. Never invent a story id or a criterion address: the check gives `error` for a part that names one that Orbtest does not know. The ITE writes no story, no spec, and no case: when a node needs a story that does not exist, say the gap in the prose of the node, and tell the person. The Orbtest shard adds stories.

### The Anchor of a Step

A step of a process view names the part where it runs with `part`, and who acts with `actor`. The anchor joins the view and the main map: the Workbench lights the part of each step on the main map, and the card of a part lists the steps that run in it.

````markdown
### Create the first Flint {#create-the-first-flint}

A Flint is one folder for notes and for shards. The person runs one command with a name for the Flint.

```node
kind: step
actor: "Person"
part: 6b0e2f4c-1d3a-4c5b-9e8f-7a6d5c4b3a21
action: 'flint create "<name>"'
next: [check-the-inputs]
criteria: [setup.steps#2]
```
````

1. **The value of `part`** is the id of one part of the same program (its frontmatter `id`). Take it from `flint ite map "<program>" --json`. A `part` that names no part of the program gives `anchor-missing`.
2. **Only a node with a slug id has `part`.** A node that stands for a part has the part id as its heading id and needs no `part`. Use the part id as the heading id when the node is the part (a node of a `tree` or a `layers` view). Use a slug id and `part` when the node is a step that runs in the part: many steps can run in one part.
3. **The part owns the description of the capability.** The step says only what occurs at this moment of the process. Do not copy the rules and the edge cases of the part into the step.
4. **Name the part that holds the whole step.** Usually this is a feature. A coarse step can name a module or a system. A step that only keeps state can name a data part.
5. **Select the part by its text, not only by its code.** `flint ite view "<view>" --json` gives each step with no `part` its proposed parts (`parts`, each with `source: proposed`, at most 5, the nearest first; `parts_total` counts each match): the parts whose `code-refs` match a code-ref of the step. A proposal is not a claim. Read the note of the part. Name it only when its text says what the step does.
6. **Never invent a part.** When the main map has no part for a step, leave `part` out, and name the gap in your result. The Workbench shows the step with "No part on the map" and its proposed parts. The main map changes only through a map change. A part of another program is not a part of this program, also when the two programs have one codebase: leave `part` out, and name that part and its program in your result.
7. **The part owns the wide anchor to the code.** A step keeps its own `code-refs` only when its claim is narrower than the part: one file or one symbol.
8. **`actor`** is who acts at this moment, as a short name that a person reads: `Person` when the person acts, the name of the product (`Flint`) when the product acts, or the name of another actor (`Agent`, `Git`). Write it when the prose says who acts. Use one name for one actor in the whole view: the strip of the Workbench draws one lane for each name.
9. **Both fields are in the review.** `part` is a reference: it is in the `contract_hash` of the row of the node in `reviews`. `actor` is a field of the text: it is in the `meaning_hash`. When a candidate adds or changes one of them, the review of that node becomes due.

### The Processes of a Software Program

A process of a software product is a view of the map `flow` or `streams`. The Workbench lists each such view under Process views, a list inside the section Views, with its count of steps. The section Processes is another list: the Steel processes of `Steel/Programs/<P>/Processes/`, which a person or a trigger runs. "Show on map" lights the parts of the steps on the main map with the numbers of the steps and the path, and the strip below the main map shows the steps in order, in lanes by actor (Who acts) or by system (Systems).

| Map | It fits when | How to write it |
|---|---|---|
| `flow` | The question is "how does X happen?", and the answer is one sequence | H2 nodes of `kind: step` in the order of the process, each with `next` to the step that follows, and with its `part` and `actor`. A `kind: decision` node has two or more `next`. A step that happens one time before the process (a setup) is a step at the start, with `next` to the first step; say "one time" in its prose. Use `uses` only for a node that is not a step. |
| `streams` | The answer has two or more sequences with separate purposes: "split the flow into streams", "what does each role do?" | One H2 for each stream: a group, or a node of `kind: stream`. H3 steps inside, with `next` in each stream, and with their `part` and `actor`. A `next` to a step of another stream shows a hand-over. |
| `layers` | The question is "how is it built?" | One H2 group for each layer, the layer nearest to the person first. H3 nodes of the parts (the part id as the heading id) inside, with `uses` to the layers below. |
| `tree` | The question is "what are the parts of X?" | The main map is the tree of the parts. Write a tree view only for another tree than the main map. |
| `table` | The question compares items on the same properties | One H2 node for each item, with the same fields in each block and the same order of sentences in each prose |

Each view ends with one node of `kind: note` that names what the view leaves out (quality rule 10).

**The quality rules of a program with a codebase** add to the quality rules of a program:

1. **Anchor each claim.** Each part and each view node that makes a claim about the product has `code-refs` or `stories`, and when you can, both. Name files, not large folders. Only a node of `kind: note` and a group have neither.
2. **Anchor each step of a process to the main map** with `part` and `actor` (see The Anchor of a Step).
3. **Prefer stories to criteria.** Name `criteria` only when the node needs some criteria of a story, not all.
4. **The words of the person, not of the code.** A command that the person types, such as `flint setup`, is a word of the person. A function, a file, a package, a type, or a variable of the code is not: put it in `code-refs` only.
5. **Tell the truth about gaps.** When a node has no story, say so in its prose: "No story tests this." Never invent a story id, a criterion address, a part, or a path.

### The Orbtest Proof

The proof says if the product does what a part says, from the coverage of Orbtest. It is a normal claim with a normal check, and the check reads normal data. Two recipes of this shard give the code:

| File | What it is |
|---|---|
| `Data/orbtest-results/data.md` | A table with one row for each criterion of each story: `address` (`<story>#<n>`), `story`, `index`, `state`, `tier`, and `text`. `kept-by: "process:make-orbtest-results"`. |
| `Processes/make-orbtest-results/process.md` | The maker: `recipe: orbtest-results`, trigger `{ every: 6h }`. It runs `flint orbtest coverage --root "$STEEL_PRODUCT_ROOT" --json` and replaces all rows at each pull (a snapshot). With no product root, it logs the reason and fails. |
| `Reality/orbtest-proof/claim.md` | The claim: `about` lists the parts that name `stories` or `criteria`, `kept-by: "process:check-orbtest-proof"`. Its text names the recipe. |
| `Processes/check-orbtest-proof/process.md` | The check: `recipe: orbtest-proof`, `reads: ["data:orbtest-results"]`. It has no code of its own: the code comes from the recipe. |

1. **The state of a criterion** comes from Orbtest as it is: `proven`, `failing`, `stale`, `gap`, `not-run`, or `waived`.
2. **The criteria of a part** are its `criteria`, and each criterion of each of its `stories`.
3. **The verdict of a part** (one verdict for each part of `about`): `holds` when each criterion is `proven` or `waived`; `fails` when one is `failing`, `stale`, `gap`, or `not-run` (the summary "3 of 5 criteria proven", and one evidence item for each criterion that is not proven); `error` when the part names no story and no criterion, or names one that is not in the data.
4. **The grounding shows the proof.** The card of a part shows the normal grounding mark, as for each claim. There is no other proof mark. Only the link from a part to a story and a criterion gives proof: a `code-refs` path gives none.

To give the proof to a program with a codebase:

1. The maker: `flint ite process new "<program>" make-orbtest-results --recipe orbtest-results --every 6h`.
2. The data note, an external table: `flint ite data new "<program>" orbtest-results --source 'command:flint orbtest coverage --root $STEEL_PRODUCT_ROOT --json' --table address:text story:text index:number state:text tier:text text:text --key address --fresh-for 12h --kept-by process:make-orbtest-results`. Test it with `flint ite data test "<program>" orbtest-results`: it gives one row for each criterion and writes nothing. The form is `Steel/Programs/Flint/Data/orbtest-results/data.md` of this Flint.
3. The claim and its check: `flint ite claim new "<program>" orbtest-proof --about <each part with stories or criteria>... --title "Orbtest proves the criteria of each part" --recipe orbtest-proof`. The check `check-orbtest-proof` starts as a draft with `recipe: orbtest-proof` and no code (the recipe gives `reads`). Test the draft with `flint ite claim test "<program>" orbtest-proof`, then propose its promote: `flint ite process promote "<program>" check-orbtest-proof`. The claim counts only after a person applies the promote.
4. A person enables the maker (`flint ite enable "<program>" make-orbtest-results`).

### The Review

A review says that a person or an agent compared a node with its code at one commit, and found the text of the node true. A review is one row of the native table `reviews` of the program. The note and the view block hold no review: the key `reviewed` is gone, and a note or a block that has it gets the problem "reviewed is gone: a review is a row of the data item reviews (Task 1273)".

| File | What it is |
|---|---|
| `Data/reviews/data.md` | A table with one row for each reviewed node, with the key `node`: a part id, or `view:<view id>#<node id>`. The other columns are `commit`, `at`, `meaning_hash`, `contract_hash`, `by`, and `commits`. `kept-by: "process:review"`. |
| `Processes/review/process.md` | The keeper of `reviews`: `recipe: review` (the agent action review), manual. |
| `Reality/reviews-current/claim.md` | The claim: `about` lists the reviewed nodes, `kept-by: "process:check-reviews-current"`. |
| `Processes/check-reviews-current/process.md` | The check: `recipe: review-current`, `reads: ["data:reviews"]`. |

- `commit` is the HEAD of the codebase of the program at the review. **A review is at a commit**: a file under a code-ref with changes that are not committed stays `review-due` after a new review, and the reason says so. Commit the change of the code first, then review the node. `commits` gives one commit for each other codebase that a `@<Codebase>/` code-ref names. `by` is `person:<Name>` or `agent:<session id>`.
- `meaning_hash` is the hash of the text of the node and of its fields that are not references (for a view node: `kind`, `action`, `result`, `actor`, and the others). `contract_hash` is the hash of its references: `code-refs`, `stories`, `criteria`, and `part`. The place and the title of the node are in no hash, so a move keeps the review.
- **Only `flint ite review` writes a row**, or a person in Steel. Never write a row of `reviews` with your own tools. An agent writes rows only inside a run of the keeper of `reviews` (C4): a job of the action `review` is such a run when the keeper has `recipe: review`. The command refuses each other agent: "Run the process review of the program, or ask a person." The keeper `keep-map-true` and the check after a task only read (`--show`), and name each due node with "Run the process review". A view node of a part has the review of the part.

The state of a review is computed at each read, never written:

| State | When | The verdict of `review-current` |
|---|---|---|
| `reviewed` | Nothing changed after the review | `holds` |
| `review-due` | The text of the node changed after the review ("The text changed after the review."); its references changed ("The references changed after the review."); a file under a code-ref changed after `commit` (committed, staged, unstaged, or a new file); a referenced story changed after `commit`; or, for another codebase, its commit is missing from `commits` or its files changed. Each reason is listed, with at most 20 changed files. | `fails`: the summary gives the reason, and each changed file is an evidence item |
| `anchor-unknown` | The codebase does not resolve, it is not a Git repository, or Git does not have the commit (for example after a rewrite of the history) | `error` |
| `never-reviewed` | The node has no row | `error` ("never reviewed") |

The check runs `flint ite review "<program id>" <each ref of STEEL_ABOUT> --show --json` and gives one verdict for each node of `about`. A review that fails is a normal claim that fails: its part shows `failing` in the grounding, and the brief lists it.

**`review-due` does not mean that the node is false.** Compare the text of the node with the diff of its code after the review: `git -C "<codebase path>" diff <commit of the row> -- <code-ref path>` (for a code-ref of another codebase, use that codebase and its commit in `commits`), and read each changed story with `flint orbtest story show <id> --root <product root>`. The claim is the text, not the names in the code: a new name of a function or a change of its inner logic often keeps the text true. `flint ite review "<program>" <ref>... --show` gives the state, the row, the reasons, and the changed files of each node. When the text is still true, review the node: `flint ite review "<program>" <ref>...`. When it is not true, change the node: a candidate for a view node, or a map change (`edit`) for a part. The action `review` does this work ([[hwkfl-ite-review]] / [[wkfl-ite-review]]). Review only a node that you compared with its code.

To give the review to a program: write the keeper with `flint ite process new "<program>" review --recipe review`, the table with `flint ite data new "<program>" reviews --table node:text commit:text at:text meaning_hash:text contract_hash:text by:text commits:text --key node --kept-by process:review`, and the claim with its check: `flint ite claim new "<program>" reviews-current --about <each reviewed node>... --title "The reviews of the nodes are current" --recipe review-current`. The check starts as a draft: test it with `flint ite claim test "<program>" reviews-current`, then propose its promote (`flint ite process promote "<program>" check-reviews-current`). The claim counts only after a person applies the promote. `flint ite review` refuses a program with no data item `reviews`, and its message gives the command that adds it.

### The Claim of a Source

A process, its instruction map (`map.md`), or a step can be drawn from a source: `source: { ref | path, hash }`. The source is the drawing, and the hash is the source at the time of the drawing. The core reads the hash now: `flint ite process show "<program>" <id> --json` gives `sources`, one item for each source with a hash: `{ ref: "process:<id>" | "process:<id>#<node>", source: { ref, path }, hash, hash_now, state: "same" | "changed" | "missing" }`.

A normal claim tells the person when a source changed. For each source with a hash:

```yaml
# Reality/ship-flint-source/claim.md (Flint Release)
format: steel-claim/2
id: ship-flint-source                        # by custom: <process id>-source
about: ["process:ship-flint#ship"]          # one reference: process:<id> or process:<id>#<node>
kept-by: "process:check-ship-flint-source"
---
# The step Ship to canon mirrors @NUU Dev/src/repo/verbs.ts
```

Write the claim and its check with one command: `flint ite claim new "<program>" <process id>-source --about "process:<id>#<node>" --title "<the step> mirrors <the source>" --recipe source-unchanged`. The check `Processes/check-<claim id>/process.md` has `recipe: source-unchanged`, no code, and no trigger. It starts as a draft: test it with `flint ite claim test "<program>" <claim id>`, then propose its promote (`flint ite process promote "<program>" check-<claim id>`). It gives one verdict: `holds` when the state is `same`; `fails` when it is `changed` (the evidence: the path or the ref, and both hashes); `error` when it is `missing`, or when the reference has no source with a hash.

**The process that draws it again.** The key `redraw` of a source is gone: a source with it gets the problem "redraw is gone: give the process that draws it again a trigger on claim.failed of the claim of the mirror (Task 1273)". When a process draws the map again from its source, give it the trigger `{ on: event, kinds: [claim.failed], about: ["claim:<claim id>"] }` (`flint ite process set "<program>" <id> --add-trigger ...`). A person enables it.

### The Check After a Task

`flint ite check [<program>] --paths <path...> [--checkout <dir>] [--json]` gives the findings of each part and each view that names one of the paths. It writes nothing. At the end of a product task, follow [[sk-ite-check_after_task]]: it emits the event `task.finished` first, and it runs this check only for a program with no standing process that took the event.

1. A path is absolute, or relative to the codebase of a program. A relative path that starts with `..` is dropped. Give absolute paths: then each path matches only the code of its own repository.
2. A path matches a code-ref when both are in one repository, and one path is the other or holds it at a `/` boundary. No glob.
3. A code-ref of a part that matches selects the part, with the findings of the part. A code-ref of a view node that matches selects the whole view, with all the findings of the view.
4. The findings: `review-due`, `anchor-unknown`, and `never-reviewed` (from the rows of `reviews`), `code-ref-missing`, `anchor-missing`, and `anchor-none`.
5. When no part and no view names a path, the command prints `No part or view names <paths>. Nothing to check.` and exits 0. Exit 1: a finding of the level error. Exit 2: a refusal (an unknown program, or a `--checkout` that is not a worktree of the repository or that has a link that leaves it).
6. `--checkout <dir>` reads the code of a worktree of the same repository, in place of the checkout of the codebase.

The text output gives, for each program, each selected part and view with `✓ no findings`, or one line for each finding (`<mark> <level> <code>  <detail>`), then `N part(s), M view(s): E error, W warning, N note`. The check is an aid: it never blocks a landing or a release.

### The Findings of a Program with a Codebase

`flint ite check "<program>"` gives these findings with the other findings of the program. A program with no row in `reviews` and no code-ref gives no new warning. The proof gives no finding: it is the claim `orbtest-proof`, and a failing claim shows as `claim-fails`.

| Code | Level | Meaning |
|---|---|---|
| `code-ref-missing` | warning | A `code-refs` path or symbol of a part or of a view node does not exist, a path leaves its codebase, or the codebase after `@` does not resolve |
| `review-due` | warning | The text, the references, the referenced code, or the referenced stories of a node changed after its review (its row in `reviews`) |
| `anchor-unknown` | warning | The codebase of a review does not resolve, or Git does not have its commit |
| `never-reviewed` | warning | A node of an accepted view has code or stories, and no row in `reviews` |
| `anchor-missing` | warning | A view node names no part of the main map, or a `part` names no part of the program |
| `anchor-none` | note | A view node has no part (a slug heading id) |

### The Commands of a Software Program

| Command | Result | Writes |
|---|---|---|
| `flint ite review "<program>" <ref>... [--commit <sha>] [--show]` | Writes (replaces) the row of each node in the data item `reviews`: a part id, `view:<view id>#<node id>`, or `view:<view id>` (each node of the view that has a block). The default commit is the HEAD of the codebase. It refuses a program with no data item `reviews` (the message gives the command that adds it), a node with no `code-refs` and no `stories` or a block that does not parse (`invalid-input`), a file that changed during the write (`changed`: run it again), an agent outside a run of the keeper of `reviews`, and a codebase that is not a Git repository (`unavailable`). With `--show`, it writes nothing and prints the review of each part or view node that a reference names: its state, its row, its reasons, its changed files, and its changed stories. `--show` takes a part id or `view:<view id>#<node id>`, not a whole view: `view:<view id>` expands to the nodes of the view only for the write. In an Orbh session the actor is `agent:<session id>`, and the review adds one activity record. | The rows of `reviews`; nothing with `--show` |
| `flint ite process show "<program>" <id> --json` | The process, with `sources`: the state of each source with a hash (`same`, `changed`, or `missing`) | Nothing |
| `flint ite check [<program>] --paths <path...> [--checkout <dir>]` | The check after a task | Nothing |
| `flint ite view --candidate <id>` | The document of a candidate as the view will show it | Nothing |
| `flint ite diff --candidate <id> --against-candidate <id>` | The difference of two candidates of one view | Nothing |

The Orbtest commands that an agent reads (each with `--root <product root>`): `flint orbtest story list`, `flint orbtest story show <id>`, `flint orbtest coverage --json` (the recipe `orbtest-results` reads it), and `flint orbtest behaviour list --json`. The `components` of a spec are in the frontmatter of `orbtest/behaviour/specs/<spec-id>.md`.
