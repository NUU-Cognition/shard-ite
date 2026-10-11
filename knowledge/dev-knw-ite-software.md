---
description: "Software programs: the root note and the codebase, code-refs, Orbtest stories and criteria, the anchor of a step, the process views of a product, the proof of a node, the review, the check after a task, and their findings and commands"
---

# Knowledge: Software Programs

Read this file before you work on a program of the template `software`: code-refs, stories, the proof, the review, or the check after a task. The rules of [[init-ite]] and of [[knw-ite-programs]] apply with no change.

## Software Programs

A **software program** is a program of the template `software`: the model of a software product. Its parts are the systems, the modules, the features, and the data of the product (the types `system`, `module`, `feature`, and `data` of this shard), and its views show the processes that run through the product. Each part and each view node can name the code with `code-refs` and the stories of Orbtest with `stories` and `criteria`. With these links, the core shows the **proof** of each node (does the product do what the node says?), and the **review** of each node (did the code change after a person or an agent compared the node with it?). The check after a task finds the nodes that a product task changed.

### The Root Note and the Code

The root note of a software program has two more fields:

| Field | Value |
|---|---|
| `codebase` | A wikilink to a codebase marker: `"[[rf-cb-<slug>]]"`. The markers are in `Mesh/Metadata/References/Codebases/`. The `name` of the marker is the codebase name. `flint resolve codebase <name>` prints its path on this machine on the first line. Each `code-refs` path is relative to this path. |
| `product-root` | The folder that holds `orbtest/`, relative to the codebase. The value is `"."` when it is the codebase root. The `--root` of each `flint orbtest` command is the codebase path joined with `product-root`. With no field, the product root is the codebase root (`.`): the program gets its proof when the codebase root holds Orbtest definitions, and it has no proof (and no finding) when it holds none. Write the field when `orbtest/` is in another folder of the codebase. |

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
- A symbol (`#Name`) is a name that the file declares: a function, a class, a type, or a constant. The check only looks for the name as a whole word in the file, so a symbol is a weak anchor. Prefer the file when the whole file holds the claim. Do not use a line range in a kept view.
- **Name files, not large folders.** A code-ref matches each spec of Orbtest whose `components` path is equal to it, inside it, or a parent of it. A broad code-ref (a large folder such as `packages/flint/src/`) gives the person hundreds of related cases that tell nothing. After a review, each change of a file in that folder also gives `review-due`. Name the one file or the small folder that holds the claim of the node.
- The coverage of the main map reads the `code-refs` of each part of a type with `covers-files` (see The Main Map in [[knw-ite-programs]]).

### Stories and Criteria

The contract of a product is in its Orbtest stories (`orbtest/stories/`). A part has `stories` and `criteria` in its frontmatter. A view node with a slug id has them in its block.

| Field | Value |
|---|---|
| `stories` | Orbtest story ids, for example `[setup.steps]` |
| `criteria` | Criterion addresses `<story-id>#<index>`, 0-based, for example `[setup.steps#0, setup.steps#3]`. Use it only when the node needs some criteria of a story, not all. An explicit list, also an empty list, replaces the criteria of the `stories`. An address gives its story, so the story need not be in `stories`. |

Take each id and each address from `flint orbtest story list --root <product root>` and `flint orbtest story show <id> --root <product root>`. Never invent a story id or a criterion address: an unknown id gives `story-missing` (an error). The ITE writes no story, no spec, and no case: when a node needs a story that does not exist, say the gap in the prose of the node, and tell the person. The Orbtest shard adds stories.

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
9. **Both fields are in the review.** `part` is a reference: it is in the `contract_hash`. `actor` is a field of the text: it is in the `meaning_hash`. When a candidate adds or changes one of them, remove the `reviewed` mapping of that node.

### The Processes of a Software Program

A process of a software product is a view of the map `flow` or `streams`. The Workbench lists each such view under Process views, a list inside the section Views, with its proof dot and its count of steps. The section Processes is another list: the Steel processes of `Steel/Programs/<P>/Processes/`, which a person or a trigger runs. "Show on map" lights the parts of the steps on the main map with the numbers of the steps and the path, and the strip below the main map shows the steps in order, in lanes by actor (Who acts) or by system (Systems).

| Map | It fits when | How to write it |
|---|---|---|
| `flow` | The question is "how does X happen?", and the answer is one sequence | H2 nodes of `kind: step` in the order of the process, each with `next` to the step that follows, and with its `part` and `actor`. A `kind: decision` node has two or more `next`. A step that happens one time before the process (a setup) is a step at the start, with `next` to the first step; say "one time" in its prose. Use `uses` only for a node that is not a step. |
| `streams` | The answer has two or more sequences with separate purposes: "split the flow into streams", "what does each role do?" | One H2 for each stream: a group, or a node of `kind: stream`. H3 steps inside, with `next` in each stream, and with their `part` and `actor`. A `next` to a step of another stream shows a hand-over. |
| `layers` | The question is "how is it built?" | One H2 group for each layer, the layer nearest to the person first. H3 nodes of the parts (the part id as the heading id) inside, with `uses` to the layers below. |
| `tree` | The question is "what are the parts of X?" | The main map is the tree of the parts. Write a tree view only for another tree than the main map. |
| `table` | The question compares items on the same properties | One H2 node for each item, with the same fields in each block and the same order of sentences in each prose |

Each view ends with one node of `kind: note` that names what the view leaves out (quality rule 10). A node of the kind `note` with no story and no criterion has no proof, and it gets no `no-contract`.

**The quality rules of a software program** add to the quality rules of a program:

1. **Anchor each claim.** Each part and each view node that makes a claim about the product has `code-refs` or `stories`, and when you can, both. Name files, not large folders. Only a node of `kind: note` and a group have neither.
2. **Anchor each step of a process to the main map** with `part` and `actor` (see The Anchor of a Step).
3. **Prefer stories to criteria.** Name `criteria` only when the node needs some criteria of a story, not all.
4. **The words of the person, not of the code.** A command that the person types, such as `flint setup`, is a word of the person. A function, a file, a package, a type, or a variable of the code is not: put it in `code-refs` only.
5. **Tell the truth about gaps.** When a node has no story, say so in its prose: "No story proves this." Never invent a story id, a criterion address, a part, or a path.

### The Proof of a Node

The proof says if the product does what a node says, from the coverage of Orbtest. **The core computes the proof at each read, as it computes the grounding. Never write it into a file.** The proof is not a claim: a claim gives `holds` or `fails`, and the proof has six states.

1. **The criteria of a node** are its `criteria`; an explicit list, also an empty list, wins. Else they are each criterion of each of its `stories`. A part takes them from its frontmatter. A view node with a slug id takes them from its block. A view node of a part has the proof of the part.
2. **The state of a criterion** comes from Orbtest as it is: `proven`, `failing`, `stale`, `gap`, `not-run`, or `waived`.
3. **The proof of a node**, in this order: no criterion: `no-contract`; else a criterion is `failing`: `failing`; else a criterion is `stale`: `stale`; else each criterion is `proven`: `proven`; else one criterion or more is `proven`: `partial`; else `unproven`. An address that Orbtest does not know counts in the total only. A node of the kind `note` with no story and no criterion has no proof.
4. **A part with children** has its own proof, and the proof below: the union of the criteria of its subtree, with the count of the parts below that have no criterion. A closed card of the main map shows the proof below. A group of a view takes the union of its nodes.
5. **Related cases never prove a node.** They are the cases of each spec whose `components` path matches a `code-refs` path of the node, only for the paths of the codebase of the program: at most the 20 nearest, with the total. Only the link from a node to a story, a criterion, and a case gives proof. A node with hundreds of related cases has a code-ref that is too broad.
6. **The report of a case** opens in the Workbench, in the section Proof of the node.
7. **The product root.** With no `product-root`, the product root is the codebase root: the program has a proof when that root holds Orbtest definitions, and no proof and no finding when it holds none. A `product-root` that is outside the codebase, or whose folder has no Orbtest definitions that load, gives the finding `proof-unavailable`.

The Workbench shows the proof as a dot on each card of the main map and of a view, beside the grounding: proven, partial, unproven, failing, stale, or no-contract. `flint ite proof "<program>"` gives the proof of each part and each view node; `flint ite proof "<program>" <ref>` gives the criteria, the cases, and the related cases of one node. A claim can read the proof: its check runs `flint ite proof "<program id>" --json`.

### The Review

A review says that a person or an agent compared a node with its code at one commit, and found the text of the node true. The anchor is one YAML flow mapping under the key `reviewed`: in the frontmatter of a part, or in the `node` block of a view node with a slug id. A view node of a part has the review of the part.

```yaml
reviewed: { commit: 19ad162cf, at: "2026-10-08T22:10:00Z", meaning_hash: "<sha256>", contract_hash: "<sha256>", by: "person:Nathan", commits: { Steel: 243fbb2 } }
```

- `commit` is the HEAD of the codebase of the program at the review. **An anchor is a commit**: a file under a code-ref with changes that are not committed stays `review-due` after a new review, and the reason says so. Commit the change of the code first, then review the node. `commits` gives one commit for each other codebase that a `@<Codebase>/` code-ref names. `by` is `person:<Name>` or `agent:<session id>`.
- `meaning_hash` is the hash of the text of the node and of its fields that are not references (for a view node: `kind`, `action`, `result`, `actor`, and the others). `contract_hash` is the hash of its references: `code-refs`, `stories`, `criteria`, and `part`. The place and the title of the node are in no hash, so a move keeps the anchor.
- **Only the review writes `reviewed`**: `flint ite review`, or Mark as reviewed in the Workbench. Never write or edit a value of `reviewed` with your own tools. A candidate copies the mapping of a node unchanged when the text and the references of the node do not change. When they change, the candidate removes the mapping of that node.

The state of a review is computed at each read, never written:

| State | When | The review mirror claim |
|---|---|---|
| `reviewed` | Nothing changed after the anchor | `holds` |
| `review-due` | The text of the node changed after the review ("The text changed after the review."); its references changed ("The references changed after the review."); a file under a code-ref changed after `commit` (committed, staged, unstaged, or a new file); a referenced story changed after `commit`; or, for another codebase, its commit is missing from `commits` or its files changed. Each reason is listed, with at most 20 changed files. | `fails` |
| `anchor-unknown` | The codebase does not resolve, it is not a Git repository, or Git does not have the commit (for example after a rewrite of the history) | `error` |
| `never-reviewed` | A view node with a slug id in a `kept` view, with `code-refs` or `stories`, and no anchor. A finding only: no claim. | — |

A part with no anchor has no review state and no finding.

**The review is a mirror claim.** Each node with an anchor is the claim `claim:mirror:<reference>`: `claim:mirror:<part id>` for a part, or `claim:mirror:view:<view id>#<node id>` for a view node. Its mode is `is`, it is `by: core`, and it has no file and no log. A review that fails gives the finding `review-due` (a warning), not `claim-fails`: a review is necessary, but the text is not shown false. It makes the grounding of its part `old`, not `failing`. The brief of a living system lists it in `drift`.

**`review-due` does not mean that the node is false.** Compare the text of the node with the diff of its code after the anchor: `git -C "<codebase path>" diff <reviewed.commit> -- <code-ref path>` (for a code-ref of another codebase, use that codebase and its commit in `commits`), and read each changed story with `flint orbtest story show <id> --root <product root>`. The claim is the text, not the names in the code: a new name of a function or a change of its inner logic often keeps the text true. `flint ite review "<program>" <ref>... --show` gives the state, the anchor, the reasons, and the changed files of each node. When the text is still true, review the node: `flint ite review "<program>" <ref>...`. When it is not true, change the node: a candidate for a view node, or a map change (`edit`) for a part. The action `review` does this work ([[hwkfl-ite-review]] / [[wkfl-ite-review]]). Review only a node that you compared with its code.

### The Check After a Task

`flint ite check [<program>] --paths <path...> [--checkout <dir>] [--json]` gives the findings of each part and each view that names one of the paths. It writes nothing. At the end of a product task, follow [[sk-ite-check_after_task]]: it emits the event `task.finished` first, and it runs this check only for a program with no standing process that took the event.

1. A path is absolute, or relative to the codebase of a program. A relative path that starts with `..` is dropped. Give absolute paths: then each path matches only the code of its own repository.
2. A path matches a code-ref when both are in one repository, and one path is the other or holds it at a `/` boundary. No glob.
3. A code-ref of a part that matches selects the part, with the findings of the part. A code-ref of a view node that matches selects the whole view, with all the findings of the view.
4. The findings: `review-due`, `anchor-unknown`, `never-reviewed`, `code-ref-missing`, `story-missing`, `no-contract`, `anchor-missing`, and `anchor-none`.
5. When no part and no view names a path, the command prints `No part or view names <paths>. Nothing to check.` and exits 0. Exit 1: a finding of the level error. Exit 2: a refusal (an unknown program, or a `--checkout` that is not a worktree of the repository or that has a link that leaves it).
6. `--checkout <dir>` reads the code and the Orbtest definitions of a worktree of the same repository, in place of the checkout of the codebase. The cases of a checkout that is not the primary checkout have no report.

The text output gives, for each program, each selected part and view with `✓ no findings`, or one line for each finding (`<mark> <level> <code>  <detail>`), then `N part(s), M view(s): E error, W warning, N note`. The check is an aid: it never blocks a landing or a release.

### The Findings of a Software Program

`flint ite check "<program>"` gives these findings with the other findings of the program. A software program with no anchor and no story gives no new warning.

| Code | Level | Meaning |
|---|---|---|
| `code-ref-missing` | warning | A `code-refs` path or symbol of a part or of a view node does not exist, a path leaves its codebase, or the codebase after `@` does not resolve |
| `story-missing` | error | A story id or a criterion address of a part or of a view node does not exist in Orbtest, or an address is not canonical |
| `no-contract` | note | A view node with a slug id names no story and no criterion, and it is not of the kind `note` |
| `proof-unavailable` | warning | The program has `product-root`, but the product root is outside the codebase, or its Orbtest definitions do not load |
| `review-due` | warning | The text, the references, the referenced code, or the referenced stories of a node changed after its review |
| `anchor-unknown` | warning | The codebase of a review does not resolve, or Git does not have its commit |
| `never-reviewed` | warning | A node of a kept view has code or stories, and no review |
| `anchor-missing` | warning | A view node names no part of the main map, or a `part` names no part of the program |
| `anchor-none` | note | A view node has no part (a slug heading id) |

### The Commands of a Software Program

| Command | Result | Writes |
|---|---|---|
| `flint ite proof "<program>" [<ref>] [--candidate <id>] [--checkout <dir>]` | With no `<ref>`: each part and each view node with its proof and its counts. With a `<ref>` (a part id, or `view:<view id>#<node id>`): its criteria with their states, its cases, its tasks, and its related cases with the total | Nothing |
| `flint ite review "<program>" <ref>... [--commit <sha>] [--show]` | Writes the anchor `reviewed` of each node: a part id, `view:<view id>#<node id>`, or `view:<view id>` (each node of the view that has a block). The default commit is the HEAD of the codebase. It refuses (exit 2) a node with no `code-refs` and no `stories` or a block that does not parse (`invalid-input`), a file that changed during the write (`changed`: run it again), and a codebase that is not a Git repository (`unavailable`). With `--show`, it writes nothing and prints the review of each part or view node that a reference names: its state, its anchor, its reasons, its changed files, and its changed stories. `--show` takes a part id or `view:<view id>#<node id>`, not a whole view: `view:<view id>` expands to the nodes of the view only for the write. In an Orbh session the actor is `agent:<session id>`, and the review adds one activity record. | The frontmatter key `reviewed` of a part, or the block lines of a view node; nothing with `--show` |
| `flint ite check [<program>] --paths <path...> [--checkout <dir>]` | The check after a task | Nothing |
| `flint ite view --candidate <id>` | The document of a candidate as the view will show it, with the proof of each node | Nothing |
| `flint ite diff --candidate <id> --against-candidate <id>` | The difference of two candidates of one view | Nothing |

The Orbtest commands that an agent reads (each with `--root <product root>`): `flint orbtest story list`, `flint orbtest story show <id>`, `flint orbtest coverage --json`, and `flint orbtest behaviour list --json`. The `components` of a spec are in the frontmatter of `orbtest/behaviour/specs/<spec-id>.md`.
