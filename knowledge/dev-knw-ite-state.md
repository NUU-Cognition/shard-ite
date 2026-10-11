---
description: "The state of a program: data (external, native, blended), data maps and stores, the commands of data, claims and their checks (code, an agent, a person), the one door of the results, the grounding, and the findings of the claims"
---

# Knowledge: State - Data and Claims

Read this file before you write a piece of data, a reader or a maker, a claim, or a check. Data is what the system holds and measures. A claim says what must be true, and its check judges it. The rules of [[init-ite]] apply with no change.

## Data

**Data** says what the system holds and measures: one value, a table, a series, or any other shape. The parts say what the system is; a value that changes over time, comes from outside, is calculated, or has rows is data, not a field of a part. A piece of data is a folder `Steel/Programs/<P>/Data/<id>/` with `data.md` (`format: steel-data/1`). The folder is also the store of its native values. The form is [[tmp-ite-data-v0.1]].

```yaml
---
format: steel-data/1
id: signups                  # a slug, unique in the program; the name of the folder
about: [04264f99-ff43-4d03-a867-e3634a085813]   # optional: references
map: table                   # optional: table | list | <id of a data map of Steel/Maps>; absent: a value
source: { path: "Media/Club Launch Night/signups-export.csv" }   # external: one of command, path, url, ref
by: code                     # the reader (with source) or the maker (no source): code | agent | person
runtime: node                # code: node | python | exec
entry: pull.js               # code
timeout: 30s
trigger: { every: 1h }       # optional: when the pull or the maker runs again
fresh-for: 2h                # optional: a value older than this is old
shape:                       # a table: the fields of the rows, each with its kind
  - { name: email, kind: text, key: true }
  - { name: signed_up, kind: date }
---
# The sign-ups
Prose for a person: what this data is, and where it comes from.
```

The other fields: `prompt` and `target` (an agent), `question` and `who` (a person), `from` (the inputs of a made value: data references), `value` (a value that a person writes), `outputs` (what others read, each with its kind; the default is one output `value`), `history: keep` (a metric), `list-of` (the type of the builtin `list`), and `native: true` on a field of `shape` (a column that a person or a process writes in external data). The kinds of a value are `text`, `number`, `boolean`, `choice`, `json`, `date`, and `money` (`{ "amount": 450, "currency": "AUD" }`, or the short form `450 AUD`).

**The mode** is counted, never written. It answers one question: where is the truth of the value?

| Mode | When | Example in this Flint |
|---|---|---|
| External | The data has a `source`, and its reader pulls each value | `signups` (Club Launch Night), `origin-refs` and `npm-versions` (Flint Release) |
| Native | The data has no `source`: a person writes it, code calculates it, an agent writes it, or a process writes it. A value calculated from external inputs is native: its rule is in the model. | `rsvp-target`, `rsvps`, `reminder-answers`, `seating` (Club Launch Night) |
| Blended | The data has a `source` and a field with `native: true` (or a custom data map that says so) | `budget` (Club Launch Night): `planned` is native, `paid` is pulled |

**How a value is made and kept:**

| What | Who | When | Where |
|---|---|---|---|
| A pull (external, blended) | The reader: code, an agent, or a person | By its trigger, by Pull now, before a check that reads old data (when the trigger is enabled), and before a check of a run or an effect check (when the trigger is enabled) | The snapshot, on this machine |
| A calculated value (`by: code`, no `source`) | The core runs the maker | When a reader needs it and an input is newer than the cache | Only a cache, on this machine |
| A value that a person writes (`value`) | A person | `flint ite data set`, or Steel (with Undo) | `data.md`, in Git |
| A value by an agent or a person (`by: agent`, `by: person`, no `source`) | The agent or the person, through the door | `flint ite data report`, or Steel ("Waiting for you") | `data.md` or the native store, in Git |
| Rows that a process writes | A process that names the data in `writes` | At the end of a run that is `done` | The native store, in Git |
| The history of a metric | The core | At each new value | With the value: in Git (`history.jsonl` of the data folder) for a written value, on this machine for a pulled or calculated value |

1. **The code of a reader or a maker.** The core runs `entry` in the data folder with `FLINT_ROOT`, `STEEL_PROGRAM_ID`, `STEEL_DATA_ID`, `STEEL_SOURCE` (JSON: the `source`), `STEEL_DATA` (JSON: the values of `from`), and the env files, at most `timeout`. Each output line that is one JSON object is one record: `{ "row": {...} }` (one row), `{ "output": { "<name>": <value> } }`, or `{ "log": "<text>" }`. Exit 0 with no line that is not valid is a good pull: the core writes the snapshot, a `pull` record in the log, and a history line for a metric. A row that lacks a pulled field of `shape` gives `error` with "The source changed its shape", and the old snapshot stays.
2. **A pull never changes the source.** A reader only reads, as a check does. Only the process `fetch-flint` of Flint Release fetches, for example: the reader of `origin-refs` reads only the local refs.
   **What the core enforces** (the permission model of Node):
   - A reader or a maker with `runtime: node` runs with `node --permission`: it may read each file, use the network, and start child processes, and it may write only a temporary folder of the run (`TMPDIR`), which the core removes after the run. A write of any other file (its source, the Flint, `.flint/`) fails with `ERR_ACCESS_DENIED`, and the pull fails.
   - The store code of a custom data map (`data.js`) may read only the Flint and write only its store. It has no child process, no worker, and no network.
   - **What stays a rule of the model:** a child process of a reader (for example `git`) is not limited, and a reader or a maker with `runtime: python` or `exec` runs with no limit. So a reader that starts a command runs only commands that read (`git for-each-ref`, `git reflog`, `uptime`), never `git fetch`, a write, a send, or a push.
3. **The state of a value**: `fresh`, `old` (older than `fresh-for`), `none` (never pulled or made), `pending` (a person must write it), or `error` (the last pull or maker failed; the old value stays). A claim that reads a value with the state `old` is old; a claim that reads a value with the state `none` waits for data ("Waits for data: <name> has no value yet"), and it is not old.
4. **A process writes data** only when it names it in `writes`, and only native data. Its code prints `{ "data": { "id": "<data id>", "value": <value> } }` or `{ "data": { "id": "<data id>", "rows": [...], "how": "append" | "replace" } }`. The core writes the store at the end of a run that is `done`, never after `failed`.
5. **An agent writes data only as a process with `writes`, or as the reader or the maker of the data** (through the door). An agent never writes `data.md` or a store with its own tools, and never decides a value for a person.
6. **A test writes nothing.** `flint ite data test` runs the reader or the maker once and prints each record and its problems. Test each reader and each maker before you keep it.
7. **The runs are data too.** `process:<id>#runs` gives the outputs `count`, `succeeded`, `failed`, `cancelled`, `success_rate` (0 to 1, or null), `last_at`, and `nodes` (for each node: `visits`, `done`, `failed`, `mean_s`), from the runs of the process in the last 30 days. A claim about how well an instruction works reads it.

### Data Maps

A large piece of data names a **data map** in `map`. The core has two builtins:

- **`table`**: rows with a `shape`. The native store is `rows.csv` in the data folder. A blended table joins the pulled rows and the native rows by the field with `key: true`; a pulled cell is read-only in Steel, and a native cell can be edited. The outputs are `rows`, `count`, and `total:<field>` for each `money` field and each `number` field with `total: true` in the shape (`{ name, kind: number, total: true }`): a status code or a count of days has no sum.
- **`list`**: the parts of the program of one type (`list-of: <Type>`) with their fields. It has no source, and it is read-only. The outputs are `rows`, `count`, and `total:<field>` (the same rule as a table).

A metric needs no data map: Steel draws its history as a series. Any other shape is a **custom data map**: a map of `Steel/Maps/` with `kind: data`, `entry: index.js` (the drawing in Steel, in the sandbox of the maps), and `store: data.js` (the code of the store, that the core runs in Node). The form is in [[tmp-ite-map-v0.1]].

The protocol of `store`: the core runs `node data.js <op>` in the data folder, with one JSON object on stdin, at most 30 seconds. Stdout is one JSON object.

| `op` | stdin | stdout |
|---|---|---|
| `outputs` | `{ store, snapshot, data, inputs }` | `{ "outputs": {...}, "rows"?: [...], "native"?: true }` |
| `edit` | `{ store, snapshot, data, inputs, intent }` | `{ "files": [{ "path": "<relative to the store>", "content": "<text>" }] }` |
| `merge` | `{ store, snapshot, data, inputs }` | `{ "rows": [...] }` |

`store` is the path of the store, `snapshot` is the newest snapshot (or null), `data` is the frontmatter of `data.md`, and `inputs` is the `STEEL_DATA` object of `from`. **Only the core writes a store**: it writes each file of `edit` inside the store, with the lock and the hash of the store; a path that leaves the store is refused. The drawing gets the data document in `api.model`, and sends an edit with `api.intent({ edit: <intent> })`.

### The Commands of Data

| Command | Result | Writes |
|---|---|---|
| `flint ite data new "<program>" <id> [--title "<t>"] [--text "<prose>"] [--source command:<line>\|url:<url>\|path:<file>\|ref:[[<note>]] \| --from <ref>... \| --value <v>] [--by code\|agent\|person] [--task "<request or question>"] [--outputs <name[:kind]>...] [--about <ref>...] [--every <d> \| --cron "<e>" \| --on hook\|<kind>...] [--fresh-for <d>] [--history] [--table <field>... --key <field> --total <field>...] [--dry-run]` | Writes a new `data.md` in one command. The mode comes from the flags: `--source` external (a reader, code by default), `--from` calculated, `--value` written now, none: a person gives the value when Steel asks. A code reader or maker gets `pull.js` or `make.js`, a stub that runs at once. `--by process`: native data that a process writes (name it in the `writes` of the process). `--table <name[:kind]>... [--key <field>] [--total <number field>...]`: a table with its shape (a source gives one row for each item of a JSON list, or each line of a text). | `Data/<id>/data.md` (and its code) |
| `flint ite data list "<program>"` | The data of a program, with the mode, the state, and the age of each value | Nothing |
| `flint ite data show "<program>" <id>` | One piece of data: its form, its problems, its value now, its rows, and its newest history | Nothing |
| `flint ite data pull "<program>" <id>` | Pull now: runs the reader (or the maker) and keeps the value | The snapshot or the cache, the log |
| `flint ite data test "<program>" <id>` | Runs the reader or the maker once, and prints each record and its problems | Nothing |
| `flint ite data set "<program>" <id> --value <json> [--expect <hash>]` | A person writes the value of native data | `data.md` |
| `flint ite data edit "<program>" <id> --intent <json> [--expect <hash>]` | A person edits the native store of a table or a custom data map with one intent | The store |
| `flint ite data report "<program>" <id> --value <json> \| --output <name=value>... \| --rows <file> [--how append\|replace]` | The door of an agent or a person reader or maker | `data.md`, the store, or the snapshot |
| `flint ite data history "<program>" <id> [--limit <n>]` | The history of a metric, the newest first | Nothing |

## Claims and Checks

A **claim** says what must be true about the system, and its **check** reads reality to see if it is true. A claim is a folder of Steel/, not a field of a part: `Steel/Programs/<P>/Reality/<claim>/claim.md` (`format: steel-claim/1`), with the code of its check in the same folder. The form is [[tmp-ite-claim-v0.1]].

```yaml
---
format: steel-claim/1
id: rsvps-30                 # a slug, unique in the program
mode: ought                  # is | ought | will
about: [8ab2da5b-f95c-43d5-a388-786d06fbda1a, 0910b761-fc23-42a2-ac88-9d0cfebb54cf]   # references
reads: ["data:rsvps#count", "data:rsvp-target"]   # optional: the data that the check reads
owner: "[[@Nathan]]"         # optional; default: the owner of the first part, else the first owner of the system
by: code                     # code | agent | person | none
runtime: node                # code: node | python | exec
entry: check.js              # code
timeout: 30s                 # code; default 60s
trigger: { every: 1d }       # optional (see Triggers and Enables in [[knw-ite-processes]]); none: Check now only
fresh-for: 2d                # optional: a newer result is needed after this
fixed-by: [send-reminders]   # optional: the processes that can make an ought claim true
---
# At least 30 people RSVP by 5 November
Prose for a person: why it matters, and what the check reads.
```

1. **A claim names its subjects** with `about`: one or more references (see References in [[knw-ite-programs]]). A subject is a part, a process, a node of an instruction map, or a piece of data. A part has no list of claims. One claim can be about many elements, and one element can have many claims.
2. **A check never changes anything.** It only reads: a write, a send, a push, or a fetch is not a read (a process fetches). So anyone can run it again at any time with no harm.
3. **The check judges.** It gives `holds`, `fails`, or `error`. The values that it saw go with the result, as evidence. A claim never holds only a value.
4. **A claim reads data.** `reads` names the data that the check reads, and the core gives the values to the check as `STEEL_DATA`. Two claims that read one source read one piece of data: the source is pulled one time. The check still judges with its own code.
5. **Four forms.** `by: code` runs its own code (`runtime`, `entry`). `by: agent` starts one Orbh session with `prompt` (and `target`, optional), and the agent reports through the door. `by: person` gives `pending`, and Steel asks the person the `question` (`who`, optional: `person:<Name>`). `by: none`: the claim has no check yet; it is `unchecked`, and the brief lists it in `unwatched`.
6. **A `will` claim** has `p` (0 to 1) and `resolves` (a date; quote it, so that YAML keeps it as text).
7. **A mirror is a claim too.** Each `source` with a `hash` (of a step, of an instruction map, or of a process) is the mirror claim `claim:mirror:<reference>` (`mode: is`, `by: core`). The core computes its state at each read: `holds` when the hash of the source now is the `hash`, else `fails` with both hashes. Its `fixed-by` is the `redraw` of the source (a process that draws the mirror again, for example `redraw-mirror`), else the action `map-update`. It is listed with the claims, it has no file, and its results are not logged. "The code of each part exists" (`code-refs` of a software program) is an `is` claim whose check reads the codebase. Each review of a node is a mirror claim too (see The Review in [[knw-ite-software]]).

**The code of a check.** The core runs `entry` in the claim folder (`node`, `python3`, or the file) with `FLINT_ROOT`, `STEEL_PROGRAM_ID`, `STEEL_CLAIM_ID`, `STEEL_PARTS` (JSON: the part ids of `about`), `STEEL_ABOUT` (JSON: each reference of `about`), `STEEL_DATA` (JSON: `{ "<reference as written>": { ref, mode, state, at, age_s, outputs, error? } }` for each reference of `reads`; for `data:<id>#<output>`, `outputs` holds only that output), `STEEL_INPUTS` (JSON: the inputs of the run when the check runs for a step, else `{}`), `STEEL_RUN_ID` (the run, or empty), `STEEL_NODE` (the node of the run, or empty), and the values of `flint.env` and `flint.env.local`, at most `timeout`. Each output line that is one JSON object is one result:

```json
{ "state": "holds|fails|error", "part": "<a part id of about>", "values": { "rsvps": 23 }, "summary": "23 of 30 RSVPs.", "evidence": [{ "kind": "url|file|note|text|output", "value": "...", "label": "..." }] }
```

**Before a check**, the core pulls each external data that the claim reads and that is old, when the trigger of that data is enabled on this machine. A check for a run (a precondition or an effect of a step) and the effect checks after a process run pull each external data with a code reader that the claim reads, whatever its age, also when its trigger is not enabled. Data with an agent or a person reader, and native data, are not pulled. Else the check runs with the value that is there, and the value says its age. **A check that gets a value with the state `none`, `pending`, or `error` gives `error`** and names the value: it never judges with a default (an amount that was not pulled is not 0) or with the old value of a failed pull. A scheduled check can judge an old value: the claim is then `old`. One case reads `none` as evidence: a claim that native data exists (a value or a row that a person or a process writes) gives `fails` for `none`, because nobody wrote it yet. For external data, `none` means that nobody pulled it: give `error`. In a run, a check for a run (a precondition, an effect, a wait for a claim) and the effect check after a process give `error` when the check holds but a value that the claim reads is old (older than its `fresh-for`), not there, or waits for a person. The engine does this: an old value never confirms a step or an effect, and the result names the data to pull or to write again. A maker and a custom store follow the same rule for their inputs.

With no `part`, the result is for the whole claim. A check of many parts prints one result for each part (the claim `code-refs` of a software program does). A line that is not valid is a problem of the check, and gives `error`. Test a check with `flint ite claim test "<program>" <claim>`: it runs the check once, prints each line and its problems, and writes nothing.

**The meaning of a failure.** The mode says what must change:

| Mode | What it says | A failure means | What must change | Who |
|---|---|---|---|---|
| `is` | A description of the world | **Drift**: the model is out of date | The model: a map change, a revision, or a new drawing of a mirror | An agent proposes, a person applies |
| `ought` | A goal or a limit | **At risk**: reality is off target | The world: a process of `fixed-by` | The owner of the claim |
| `will` | A prediction | It came true or false | Nothing: the prediction is scored | Nobody |

**The state of a claim** is computed, never stored. It comes from the newest result (of each part, when the results name parts; the claim takes the worst part state): `holds`, `fails`, `error`, `old` (older than `fresh-for`, or a value that it reads is old: the state names that data), `pending` (a person or an agent check waits), or `unchecked`. A `will` claim is `open` until `resolves`, then `came-true` or `came-false` from the first result after `resolves`, else `unresolved`.

**The grounding of a part** comes from the claims about it: `holds` (each claim holds), `failing` (a claim fails or has an error), `old`, `partial`, `unchecked`, or `no-claim`. A review that fails makes the grounding `old`, not `failing`. A group, a view, and a program add the counts of their parts.

**One door.** Each result comes in through one door: `flint ite claim report`, or the route `POST /api/steel/programs/<program>/claims/<claim>/results`. The door checks the claim, the part, and the state, and it records the actor: `person:<Name>`, `agent:<session id>`, `check:<claim>`, or `run:<run id>`. An agent or a person never writes a result into a file.

**The findings.** `flint ite check` gives the findings of the claims, and runs no check:

| Code | Level | When |
|---|---|---|
| `claim-invalid` | error | `claim.md` has a problem, for example a part of `about` that is not a part of the program. The claim does not check. |
| `claim-fails` | error | A result fails: drift for an `is` claim, at risk for an `ought` claim (with `fixed-by`), a surprise for a `will` claim. |
| `claim-error` | error | The check could not check. |
| `claim-old` | warning | The newest result is older than `fresh-for`, or a `will` claim has no result after `resolves`. |
| `claim-unchecked` | note | The claim has no result yet, or it has `by: none`. |
| `claim-fixed-by` | warning | `fixed-by` names a process that `Processes/` does not have. |
| `no-claim` | note | No claim is about a part. |

### The Commands of a Claim

| Command | Result | Writes |
|---|---|---|
| `flint ite claim list "<program>" [--part <id>]` | The claims of a program, with the mode, the form, the parts, the state, and the age of the newest result | Nothing |
| `flint ite claim show "<program>" <claim>` | One claim: its file, its check, its problems, its state, and its newest results | Nothing |
| `flint ite claim new "<program>" <id> --about <ref>... --mode is\|ought\|will --by code\|agent\|person\|none --title "<title>" [--text "<prose>"] [--task "<request or question>"] [--reads <ref>...] [--fixed-by <process>...] [--every <d> \| --cron "<e>" \| --on <kind>...] [--fresh-for <d>] [--p <0 to 1>] [--resolves <YYYY-MM-DD>] [--dry-run]` | Writes a new `claim.md` from the form `steel-claim/1` in one command. `--about` takes a part (its id or its title), `root`, `data:<id>`, `process:<id>`, `process:<id>#<node>`, or `view:<id>`, and the output prints `About: <title> (<type>)` for each. code gets `runtime: node`, `entry: check.js`, `timeout: 30s`, and a stub `check.js` that gives `error` until you write the test (the stub gives `error` for an input that is `none`, `pending`, or `error`, and judges an old value); agent gets a `prompt` and person a `question` (from `--task`, default the title); none gets no check. It refuses an id that is not a slug, an id that exists, a reference that names nothing in the program, and a `will` claim with no `--resolves`. `--dry-run` writes nothing. | `Reality/<id>/claim.md`, and one activity record for an agent |
| `flint ite claim check "<program>" <claim> [--strict]` | Check now (`--strict` exits 1 when the result fails or gives error): a code check runs on this machine; an agent check starts one Orbh session; a person check gives `pending` | The log |
| `flint ite claim test "<program>" <claim> [--data data:<id>=<json>]...` | Runs the check once, and prints each line and its problems. `--data` gives a sample value of a reference of `reads` for this test only (to test the `holds` path before the data has a value). Exit 1 when a line has a problem. | Nothing |
| `flint ite claim report "<program>" <claim> --state holds\|fails\|error [--part <id>] --summary "<text>" [--value k=v]... [--evidence kind=value]... [--observed-at <time>] [--run <run id> --node <node id>]` | The one door: records one result. In an Orbh session the actor is `agent:<session id>`, else `person:<Name>`. A result for a precondition of a run names the run and the node (`--node` only with `--run`); only such a result counts for that node. | The log |
