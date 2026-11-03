---
description: "Data and claims of a program: the data note (external, native, blended) and its maker process, data maps and stores, the commands of data, claims as tests of reality and their check processes (code, an agent, a person), which side changes when a claim fails, the one door of the results, the grounding, and the findings"
---

# Knowledge: Data and Claims

Read this file before you write a data note, a maker, a claim, or a check. Data is what the system holds and measures. A claim is a test of reality: it says what must be true now, and its check judges it. A maker and a check are processes ([[knw-ite-processes]]). The rules of [[init-ite]] apply with no change.

## Data

**Data** says what the system holds and measures: one value, a table, a series, or any other shape. The parts say what the system is; a value that changes over time, comes from outside, is calculated, or has rows is data, not a field of a part. A piece of data is a folder `Steel/Programs/<P>/Data/<id>/` (or `Data/<folder>/<id>/` in a folder of the sidebar: see Folders in [[knw-ite-processes]]) with the data note `data.md` (`format: steel-data/2`): its meaning and its shape. The folder is also the store of its native values. The form is [[tmp-ite-data-v0.1]].

```yaml
---
format: steel-data/2
id: signups                  # a slug, unique in the program; the name of the folder
about: [04264f99-ff43-4d03-a867-e3634a085813]   # optional: references
map: table                   # optional: table | list | <id of a data map of Steel/Maps>; absent: a value
source: { path: "Media/Club Launch Night/signups-export.csv" }   # external: one of command, path, url, ref
fresh-for: 2h                # optional: a value older than this is old
shape:                       # a table: the fields of the rows, each with its kind
  - { name: email, kind: text, key: true }
  - { name: signed_up, kind: date }
kept-by: "process:make-signups"   # the keeper: the one writer of the values
---
# The sign-ups
Prose for a person: what this data is, and where it comes from.
```

The keys of a data note are exactly `format`, `id`, `about`, `map`, `list-of`, `source`, `value`, `shape`, `outputs`, `fresh-for`, `history`, and `kept-by`. Each other key is a problem. `value` is a value that a person writes in the file. `outputs` is what others read, each with its kind (the default is one output `value`). `history: keep` makes a metric. `list-of` is the type of the builtin `list`. `native: true` on a field of `shape` is a column that a person or a process writes in external data. The kinds of a value are `text`, `number`, `boolean`, `choice`, `json`, `date`, and `money` (`{ "amount": 450, "currency": "AUD" }`, or the short form `450 AUD`).

**The keeper of a data item.** `kept-by` names one process of the same program: the only writer of the values. It is required, except for a data item with `value` (a person writes the value in the file) and for the builtin map `list`. A data item never inherits a keeper. Its keeper is its **maker**: a normal process, usually `Processes/make-<data id>/`, with its page, its runs, its log, its triggers, and its draft version. A worker that writes a data item (for example a process that sends the agenda and records it) is the maker of that data item too: the data note names it in `kept-by`.

**The maker** has the fields of a process ([[tmp-ite-process-v0.1]]): `by` (`code` with `runtime`, `entry`, and `timeout`; `agent` with `prompt` and `target`; `person` with `task` and `who`), `reads` (the inputs of a made value: data references), and `trigger` (when the pull or the maker runs again). A maker `by: code` of a data item with no `source` and with no trigger is a **calculation**: the core runs it when a reader needs the value, and stores nothing.

**The mode** is counted, never written. It answers one question: where is the truth of the value?

| Mode | When | Example in this Flint |
|---|---|---|
| External | The data has a `source`, and its maker pulls each value | `signups` (Club Launch Night), `origin-refs` and `npm-versions` (Flint Release) |
| Native | The data has no `source`: a person writes it, code calculates it, an agent writes it, or a process writes it. A value calculated from external inputs is native: its rule is in the model. | `rsvp-target`, `rsvps`, `reminder-answers`, `seating` (Club Launch Night) |
| Blended | The data has a `source` and a field with `native: true` (or a custom data map that says so) | `budget` (Club Launch Night): `planned` is native, `paid` is pulled |

**How a value is made and kept:**

| What | Who | When | Where |
|---|---|---|---|
| A pull (external, blended) | The maker: code, an agent, or a person | By the trigger of the maker, by Pull now, before a check that reads old data (when the maker is enabled), and before a check of a run or an effect check | The snapshot, on this machine |
| A calculated value (a code maker, no `source`, no trigger) | The core runs the maker | When a reader needs it and an input is newer than the cache | Only a cache, on this machine |
| A value that a person writes (`value`) | A person | `flint ite data set`, or Steel (with Undo) | `data.md`, in Git |
| A value of an agent or a person maker (no `source`) | The agent or the person, through the door | `flint ite data report`, or Steel ("Waiting for you") | `data.md` or the native store, in Git |
| Rows that a process writes | The process that the data note names in `kept-by` | At the end of a run that is `done` | The native store, in Git |
| The history of a metric | The core | At each new value | With the value: in Git (`history.jsonl` of the data folder) for a written value, on this machine for a pulled or calculated value |

1. **The code of a maker.** The core runs `entry` in the folder of the maker with `FLINT_ROOT`, `STEEL_PROGRAM_ID`, `STEEL_PROCESS_ID`, `STEEL_KEEPS` (JSON: the references that the process keeps), `STEEL_DATA_ID` (when it keeps one data item), `STEEL_SOURCE` (JSON: the `source` of that data note), `STEEL_DATA` (JSON: the values of `reads`), `STEEL_INPUTS`, `STEEL_RUN_ID`, `STEEL_NODE`, and the env files, at most `timeout`. Each output line that is one JSON object is one record: `{ "row": {...} }` (one row), `{ "output": { "<name>": <value> } }`, or `{ "log": "<text>" }`. A maker that keeps more than one data item adds `"data": "<data id>"` to each record. Exit 0 with no line that is not valid is a good pull: the core writes the snapshot, a `pull` record in the log, and a history line for a metric. A row that lacks a pulled field of `shape` gives `error` with "The source changed its shape", and the old snapshot stays.
2. **A pull never changes the source.** A maker that pulls only reads, as a check does. Only a worker fetches: for example the process `fetch-flint` of Flint Release fetches, and the maker of `origin-refs` reads only the local refs.
   **What the core enforces** (the permission model of Node):
   - A maker with `runtime: node` runs with `node --permission`: it may read each file, use the network, and start child processes, and it may write only a temporary folder of the run (`TMPDIR`), which the core removes after the run. A write of any other file (its source, the Flint, `.flint/`) fails with `ERR_ACCESS_DENIED`, and the pull fails.
   - The store code of a custom data map (`data.js`) may read only the Flint and write only its store. It has no child process, no worker, and no network.
   - **What stays a rule of the model:** a child process of a maker (for example `git`) is not limited, and a maker with `runtime: python` or `exec` runs with no limit. So a maker that starts a command runs only commands that read (`git for-each-ref`, `git reflog`, `uptime`), never `git fetch`, a write, a send, or a push.
3. **The state of a value**: `fresh`, `old` (older than `fresh-for`), `none` (never pulled or made), `pending` (a person must write it), or `error` (the last pull or maker failed; the old value stays). A claim whose check reads a value with the state `old` is old; a claim whose check reads a value with the state `none` waits for data ("Waits for data: <name> has no value yet"), and it is not old.
4. **Only the keeper writes the values of a data item.** A process writes a data item only when the data note names it in `kept-by`, and only native data. Its code prints `{ "data": { "id": "<data id>", "value": <value> } }` or `{ "data": { "id": "<data id>", "rows": [...], "how": "append" | "replace" } }`. The core writes the store at the end of a run that is `done`, never after `failed`. A step of an instruction map writes a data item only when the data item names the process of the step in `kept-by`. External data is written only by its pull. A person can always write native data in Steel. A process has no `writes`.
5. **An agent writes data only as the maker of the data** (through the door), or as a process that the data names in `kept-by`. An agent never writes `data.md` or a store with its own tools, and never decides a value for a person.
6. **A test writes nothing.** `flint ite data test` runs the maker once and prints each record and its problems. Test each maker before you hand it over.
7. **The runs are data too.** `process:<id>#runs` gives the outputs `count`, `succeeded`, `failed`, `cancelled`, `success_rate` (0 to 1, or null), `last_at`, and `nodes` (for each node: `visits`, `done`, `failed`, `mean_s`), from the runs of the process in the last 30 days. A claim about how well an instruction works reads it.
8. **An event.** When a pull, a maker run, or a write of a person gives values that differ from the last values, the engine emits `data.changed` with `about.refs` = `data:<id>`. A process can listen to it ([[knw-ite-loop]]).

### Data Maps

A large piece of data names a **data map** in `map`. The core has two builtins:

- **`table`**: rows with a `shape`. The native store is `rows.csv` in the data folder. A blended table joins the pulled rows and the native rows by the field with `key: true`; a pulled cell is read-only in Steel, and a native cell can be edited. The outputs are `rows`, `count`, and `total:<field>` for each `money` field and each `number` field with `total: true` in the shape (`{ name, kind: number, total: true }`): a status code or a count of days has no sum.
- **`list`**: the parts of the program of one type (`list-of: <Type>`) with their fields. It has no source, no keeper, and it is read-only. The outputs are `rows`, `count`, and `total:<field>` (the same rule as a table).

A metric needs no data map: Steel draws its history as a series. Any other shape is a **custom data map**: a map of `Steel/Maps/` with `kind: data`, `entry: index.js` (the drawing in Steel, in the sandbox of the maps), and `store: data.js` (the code of the store, that the core runs in Node). The form is in [[tmp-ite-map-v0.1]].

The protocol of `store`: the core runs `node data.js <op>` in the data folder, with one JSON object on stdin, at most 30 seconds. Stdout is one JSON object.

| `op` | stdin | stdout |
|---|---|---|
| `outputs` | `{ store, snapshot, data, inputs }` | `{ "outputs": {...}, "rows"?: [...], "native"?: true }` |
| `edit` | `{ store, snapshot, data, inputs, intent }` | `{ "files": [{ "path": "<relative to the store>", "content": "<text>" }] }` |
| `merge` | `{ store, snapshot, data, inputs }` | `{ "rows": [...] }` |

`store` is the path of the store, `snapshot` is the newest snapshot (or null), `data` is the frontmatter of `data.md`, and `inputs` is the `STEEL_DATA` object of the `reads` of its maker. **Only the core writes a store**: it writes each file of `edit` inside the store, with the lock and the hash of the store; a path that leaves the store is refused. The drawing gets the data document in `api.model`, and sends an edit with `api.intent({ edit: <intent> })`.

### The Commands of Data

The CLI is the truth: check the flags with `--help`.

| Command | Result | Writes |
|---|---|---|
| `flint ite data new "<program>" <id> [--title "<t>"] [--text "<prose>"] [--source command:<line>\|url:<url>\|path:<file>\|ref:[[<note>]] \| --value <v> \| --table <field>... --key <field> --total <field>...] [--outputs <name[:kind]>...] [--about <ref>...] [--fresh-for <d>] [--history] [--kept-by process:<id> \| --by code\|agent\|person [--runtime] [--reads data:<id>...] [--prompt] [--task "<question>"] [--who] [the trigger flags]] [--dry-run]` | Writes a new data note and, when the data needs a maker, its maker `Processes/make-<id>/` in one command. `--kept-by` names a process that exists as the keeper (for example a worker that writes a table). The flags of a new maker: `--source` with `--by code` (a maker that pulls; a stub `pull.js`), `--by code --reads data:<id>` (a calculation; a stub `make.js`), `--by agent --prompt`, or `--by person --task` (a person gives the value when Steel asks). `--value` writes a value now, with no maker. The trigger flags are `--every`, `--cron`, `--on <kind>`, `--on-about <ref>`, `--scope any`, and `--manual`. | `Data/<id>/data.md`, and `Processes/make-<id>/` |
| `flint ite data list "<program>"` | The data of a program, with the mode, the keeper, the state, and the age of each value | Nothing |
| `flint ite data show "<program>" <id>` | One piece of data: its form, its keeper, its problems, its value now, its rows, and its newest history | Nothing |
| `flint ite data pull "<program>" <id>` | Pull now: runs the maker and keeps the value | The snapshot or the cache, the log |
| `flint ite data test "<program>" <id>` | Runs the maker once, and prints each record and its problems | Nothing |
| `flint ite data set "<program>" <id> --value <json> [--expect <hash>]` | A person writes the value of native data. `data set` changes only the fields of the data note; `process set` changes its maker. | `data.md` |
| `flint ite data edit "<program>" <id> --intent <json> [--expect <hash>]` | A person edits the native store of a table or a custom data map with one intent | The store |
| `flint ite data report "<program>" <id> --value <json> \| --output <name=value>... \| --rows <file> [--how append\|replace]` | The door of an agent or a person maker | `data.md`, the store, or the snapshot |
| `flint ite data history "<program>" <id> [--limit <n>]` | The history of a metric, the newest first | Nothing |

## Claims and Checks

A **claim** is a test of reality. It says what must be true **now** about the system. It never states a goal, a target with a date, or a prediction: write a goal as the prose of a part (the type `goal` is plain text), and a plan as a future note ([[knw-ite-loop]]). A claim is a folder of `Steel/`, not a field of a part: `Steel/Programs/<P>/Reality/<claim>/claim.md` (`format: steel-claim/2`), or `Reality/<folder>/<claim>/` in a folder of the sidebar. The folder holds only `claim.md`. Each claim has a file and a check process: there is no claim of the core. Its **check** is a normal process: `Processes/check-<claim id>/`, with the code of the check. The form is [[tmp-ite-claim-v0.1]].

```yaml
---
format: steel-claim/2
id: remote-fresh             # a slug, unique in the program
about: [d24d76dd-8090-4682-82f3-87307db7ed86, "data:origin-refs"]   # references: the subjects
kept-by: "process:check-remote-fresh"   # required: its check, a process of the same program
owner: "[[@Nathan]]"         # optional; default: the owner of the first part, else the first owner of the system
fresh-for: 2h                # optional: a newer result is needed after this
---
# The remote refs of flint are less than 2 hours old
Prose for a person: why it matters, what the check reads, and what a person does when it fails.
```

```yaml
---
format: steel-process/1
id: check-remote-fresh
by: code                     # code | agent | person
runtime: node                # code: node | python | exec
entry: check.js
timeout: 30s                 # code; default 60s
reads: ["data:origin-refs#fetched_at"]   # optional: the data that the check reads
trigger: { every: 1d }       # optional (see Triggers and Events in [[knw-ite-processes]]); none: Check now only
---
# Check that the remote refs of flint are fresh
One sentence: what the check reads.
```

1. **The keys of a claim are exactly** `format`, `id`, `about`, `kept-by`, `owner` (optional), and `fresh-for` (optional). Each other key is a problem, and a claim with a problem does not check.
2. **A claim names its subjects** with `about`: one or more references (see References in [[knw-ite-programs]]). A subject is a part, a process, a node of an instruction map, or a piece of data. A part has no list of claims. One claim can be about many elements, and one element can have many claims.
3. **A claim names its check** with `kept-by`. It is required, and a claim never inherits a keeper. One check can keep more than one claim. "Check now" of a claim is one run of its check.
4. **A check never changes anything.** It only reads: a write, a send, a push, or a fetch is not a read (a worker fetches). So anyone can run it again at any time with no harm. The engine refuses `irreversible: true` on a process that keeps a claim.
5. **The check judges.** It gives `holds`, `fails`, or `error`. The values that it saw go with the result, as evidence. A claim never holds only a value.
6. **A check reads data.** `reads` of the check names the data that it reads, and the core gives the values to the check as `STEEL_DATA`. Two checks that read one source read one piece of data: the source is pulled one time. The check still judges with its own code.
7. **Three forms of a check.** `by: code` runs its own code (`runtime`, `entry`). `by: agent` starts one Orbh session with `prompt` (and `target`, optional), and the agent reports through the door. `by: person` gives `pending`, and Steel asks the person the `task` (`who`, optional: `person:<Name>`); a claim with no code check gets a person check with the task "Is this true now: <the H1 of the claim>?".
8. **A new claim counts only after the promote of its check.** `flint ite claim new` writes the claim and its check as a draft (`Processes/check-<id>/dev/`). Until a person applies the promote (`flint ite process promote "<program>" check-<id>` proposes it), the claim is `unchecked`.
9. **A source, a review, and the Orbtest proof are normal claims.** Each `source` with a `hash` gets a claim with `about: ["process:<id>"]` or `["process:<id>#<node>"]` and a check with `recipe: source-unchanged`. The review of the nodes is the claim `reviews-current` (the recipe `review-current`, which reads the data item `reviews`). The proof is the claim `orbtest-proof` (the recipe `orbtest-proof`, which reads the data item `orbtest-results`). Each has a file, a check process, and logged results. See [[knw-ite-software]].

**The code of a check.** The core runs `entry` in the folder of the check process (`node`, `python3`, or the file; for a check with `recipe: <id>` and no own entry file, the entry of the recipe folder, with the folder of the process as the working folder) with `FLINT_ROOT`, `STEEL_PROGRAM_ID`, `STEEL_PROCESS_ID`, `STEEL_KEEPS` (JSON: the references that the process keeps), `STEEL_CLAIM_ID` (when it keeps one claim), `STEEL_PARTS` (JSON: the part ids of `about` of that claim), `STEEL_ABOUT` (JSON: each reference of `about` of that claim), `STEEL_DATA` (JSON: `{ "<reference as written>": { ref, mode, state, at, age_s, outputs, error? } }` for each reference of `reads`; for `data:<id>#<output>`, `outputs` holds only that output), `STEEL_INPUTS` (JSON: the inputs of the run when the check runs for a step, else `{}`), `STEEL_RUN_ID` (the run, or empty), `STEEL_NODE` (the node of the run, or empty), `STEEL_CODEBASE`, `STEEL_PRODUCT_ROOT`, `STEEL_PART_FILES`, and `STEEL_PART_FIELDS` (see [[knw-ite-software]]), and the values of `flint.env` and `flint.env.local`, at most `timeout`. Each output line that is one JSON object is one verdict:

```json
{ "state": "holds|fails|error", "claim": "<claim id>", "part": "<a part id of about>", "values": { "hours": 3.5 }, "summary": "The last fetch is 3.5 hours old.", "evidence": [{ "kind": "url|file|note|text|output", "value": "...", "label": "..." }] }
```

`claim` is required when the process keeps more than one claim; else leave it out. With no `part`, the verdict is for the whole claim. A check of many parts prints one verdict for each part (the claims `code-refs` and `orbtest-proof` of a program with a codebase do). A line that is not valid is a problem of the check, and gives `error`. Test a check with `flint ite claim test "<program>" <claim>`: it runs the check once, prints each line and its problems, and writes nothing.

**Before a check**, the core pulls each external data of `reads` that is old, when the maker of that data is enabled on this machine. A check for a run (a precondition or an effect of a step) and the effect checks after a process run pull each external data with a code maker that the check reads, whatever its age, also when its maker is not enabled. Data with an agent or a person maker, and native data, are not pulled. Else the check runs with the value that is there, and the value says its age. **A check that gets a value with the state `none`, `pending`, or `error` gives `error`** and names the value: it never judges with a default (an amount that was not pulled is not 0) or with the old value of a failed pull. A scheduled check can judge an old value: the claim is then `old`. One case reads `none` as evidence: a claim that native data exists (a value or a row that a person or a process writes) gives `fails` for `none`, because nobody wrote it yet. For external data, `none` means that nobody pulled it: give `error`. In a run, a check for a run (a precondition, an effect, a wait for a claim) and the effect check after a process give `error` when the check holds but a value that the check reads is old (older than its `fresh-for`), not there, or waits for a person. The engine does this: an old value never confirms a step or an effect, and the result names the data to pull or to write again. A maker and a custom store follow the same rule for their inputs.

### When a Claim Fails: Which Side Changes

The links say which side changes (D10 of Task 1271). The core computes `on_fail` for a claim that fails: `{ repair: [<process ids>], keeper: <reference or null> }`.

| The links | What changes | Who | The brief says |
|---|---|---|---|
| A process of the program has the trigger `{ on: event, kinds: [claim.failed], about: ["claim:<id>"] }` (`repair` is not empty) | **The world**: the process repairs it | The repair process, when a person enabled it (or a person runs it) | "repair by <process>" |
| No process repairs the claim (`repair` is empty) | **The model**: the claim says what the system is, and the system is now different | The keeper of the first part of `about` (its `kept-by`, or the keeper of its parent, up to the root: often `keep-map-true`) proposes a change of the model; a person applies it | "change the model: <keeper>" |

A claim names no process that fixes it. To give a claim a repair, give the repair process the event trigger. When the engine stores a verdict `fails` and the last verdict of the claim (or of that part) was not `fails`, it emits the event `claim.failed` with `about.refs` = `claim:<id>` and each reference of the `about` of the claim. When a verdict `holds` follows `fails` or `error`, it emits `claim.holds`.

**The state of a claim** is computed, never stored. It comes from the newest result (of each part, when the results name parts; the claim takes the worst part state): `holds`, `fails`, `error`, `old` (older than `fresh-for`, or a value that the check reads is old: the state names that data), `pending` (a person or an agent check waits), or `unchecked` (no result yet, or the check is a draft only).

**The grounding of a part** comes from the claims about it: `holds` (each claim holds), `failing` (a claim fails or has an error), `old`, `partial`, `unchecked`, or `no-claim`. A part that no claim covers is "untested": a computed fact, never a field of the part. A group, a view, and a program add the counts of their parts.

**One door.** Each result comes in through one door: `flint ite claim report`, or the route `POST /api/steel/programs/<program>/claims/<claim>/results`. The door checks the claim, the part, and the state, and it records the actor: `person:<Name>`, `agent:<session id>`, `check:<claim>`, or `run:<run id>`. An agent or a person never writes a result into a file.

**The findings.** `flint ite check` gives the findings of the claims, and runs no check:

| Code | Level | When |
|---|---|---|
| `claim-invalid` | error | `claim.md` has a problem: a key that is not one of the six, no `kept-by`, or a part of `about` that is not a part of the program. The claim does not check. |
| `claim-fails` | error | A result fails. `on_fail` says which side changes. |
| `claim-error` | error | The check could not check. |
| `claim-old` | warning | The newest result is older than `fresh-for`. |
| `claim-unchecked` | note | The claim has no result yet, or its check is a draft only. |
| `no-claim` | note | No claim is about a part. |
| `unknown-reference` | error | A reference (`about`, `reads`, `kept-by`, `points-to`, `effect`, the `about` of a trigger) names no element of the program. |
| `process-invalid` | error | The `process.md` of a check or a maker has a problem: it does not run. |

### The Commands of a Claim

The CLI is the truth: check the flags with `--help`.

| Command | Result | Writes |
|---|---|---|
| `flint ite claim list "<program>" [--part <id>]` | The claims of a program, with the check, the parts, the state, and the age of the newest result | Nothing |
| `flint ite claim show "<program>" <claim>` | One claim: its file, its check, its problems, its state, its `on_fail`, and its newest results | Nothing |
| `flint ite claim new "<program>" <id> --about <ref>... --title "<title>" [--owner "[[@Name]]"] [--fresh-for <d>] --by code\|agent\|person [--runtime node\|python\|exec] [--reads <ref>...] [--prompt "<request>"] [--task "<question>"] [--who person:<Name>] [the trigger flags] [--text "<prose>"] [--dry-run]` | Writes a new `claim.md` (`steel-claim/2`) and its check process as a draft (`Processes/check-<id>/dev/process.md`) in one command. `--about` takes a part (its id or its title), `root`, `data:<id>`, `process:<id>`, `process:<id>#<node>`, or `view:<id>`, and the output prints `About: <title> (<type>)` for each. A code check gets a stub `check.js` that gives `error` until you write the test (the stub gives `error` for an input that is `none`, `pending`, or `error`, and judges an old value). It refuses an id that is not a slug, an id that exists, and a reference that names nothing in the program. `--dry-run` writes nothing. | `Reality/<id>/claim.md`, `Processes/check-<id>/dev/`, and one activity record for an agent |
| `flint ite claim set "<program>" <claim> ...` | Changes only the fields of the claim note. `process set "<program>" check-<id>` changes the check. | `claim.md` |
| `flint ite process promote "<program>" check-<id>` | Proposes the promote of the draft check: one revision. A person applies it, and then the claim counts. | One revision |
| `flint ite claim check "<program>" <claim> [--strict]` | Check now: one run of the check (`--strict` exits 1 when the result fails or gives error). A code check runs on this machine; an agent check starts one Orbh session; a person check gives `pending` | The log |
| `flint ite claim test "<program>" <claim> [--data data:<id>=<json>]...` | Runs the check once, and prints each line and its problems. `--data` gives a sample value of a reference of `reads` for this test only (to test the `holds` path before the data has a value). Exit 1 when a line has a problem. | Nothing |
| `flint ite claim report "<program>" <claim> --state holds\|fails\|error [--part <id>] --summary "<text>" [--value k=v]... [--evidence kind=value]... [--observed-at <time>] [--run <run id> --node <node id>]` | The one door: records one result. In an Orbh session the actor is `agent:<session id>`, else `person:<Name>`. A result for a precondition of a run names the run and the node (`--node` only with `--run`); only such a result counts for that node. | The log |
