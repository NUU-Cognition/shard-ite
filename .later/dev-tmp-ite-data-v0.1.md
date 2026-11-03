---
description: "A piece of data of a program: Steel/Programs/<Program>/Data/<id>/data.md (format steel-data/2), what the system holds and measures, external, native, or blended, with its keeper (kept-by) and its maker process Processes/make-<id>/, the output and the environment of a maker, and a complete example of a pulled value, a calculated value, a value of a person, and a table"
---

# Filename: Steel/Programs/[Program]/Data/[id]/data.md

/*
  Data says what the system holds and measures: one value, a table, a series, or any other shape. The parts say
  what the system is. A value that changes over time, comes from outside, is calculated, or has rows is data, not
  a field of a part. A check reads data and judges it (reads of the check process). A maker reads other data to
  make a value (reads of the maker process).

  The data note holds the meaning and the shape. Its keeper writes its values: kept-by names the process that keeps
  it. That process is its MAKER: a normal process of the program in Processes/make-<data id>/ (tmp-ite-process-v0.1),
  with its page, its runs, its log, its triggers, and its draft version. A maker pulls a source, calculates a value,
  asks an agent, or asks a person.

  THE MODE is counted, never written. It answers one question: where is the truth of the value?
  - external: the data has a source, and its maker pulls the values. The model keeps a snapshot on this machine, and
    pulls again when the snapshot is old. A pull never changes the source.
  - native: the data has no source. A person writes the value, code calculates it from other data, an agent writes
    it, or a process writes it. A value calculated from external data is native: its rule is in the model.
  - blended: the data has a source and a field with native: true (a column that a person or a process writes), or a
    custom data map that says so.

  THE FOLDERS
  - Steel/Programs/<Program>/Data/<id>/ — the folder name is the id of the data. data.md holds the data note. The
    folder is also the native store: rows.csv of a table, history.jsonl of a written metric, the files of a custom data
    map. In Git.
  - Steel/Programs/<Program>/Processes/make-<id>/ — the maker: process.md and its entry file (pull.js, make.js).
  - The snapshot of a pull, the cache of a calculated value, and the history of a pulled or calculated metric are
    facts of this machine (.flint/steel/data/<program id>/<id>/). Only the core writes them.

  THE DATA NOTE: FRONTMATTER CONTRACT (format steel-data/2). The keys are kebab-case. No comment in the frontmatter.
  Quote each reference. The keys are exactly these. Each other key is a problem.
  - format: always "steel-data/2".
  - id: a slug, unique in the program, the same as the folder name: "signups".
  - about: optional, the references of the elements that the data describes: part ids (UUIDs), process:<id>, ...
  - map: optional. table (rows with a shape; the store is rows.csv), list (the parts of one type: give list-of:
    <Type>), or the id of a data map of Steel/Maps with kind: data (tmp-ite-map-v0.1). Absent: one value.
  - list-of: the type of the builtin map list.
  - source: optional; with it, the data is external (or blended). One of { path: "<a file of the Flint>" } or
    { path: "@<Codebase>/<path>" }, { url: "<https URL>" }, { command: "<command line>" }, { ref: "[[<note>]]" }.
    The maker gets it as STEEL_SOURCE.
  - value: optional, a value that a person writes (no map, no source, no maker). Change it with flint ite data set, or
    in Steel (with Undo).
  - shape: a table: the fields of the rows, - { name, kind, key?, native?, total? }. One field has key: true (it joins
    the pulled rows and the native rows of a blended table). native: true marks a column that a person or a process
    writes in external data.
  - outputs: optional, what others read: - { name, kind }. Default: one output value; a table and a list give rows,
    count, and total:<field> for each money field and each number field with total: true in shape.
  - kinds: text | number | boolean | choice | json | date | money. A money value is { "amount": 450, "currency": "AUD" };
    the short form "450 AUD" is accepted in a frontmatter field and in a CSV cell.
  - fresh-for: optional, a duration (2h, 1d). A value older than this is old, and each claim whose check reads it is
    old.
  - history: optional, keep (a metric: each new value is kept with its time).
  - kept-by: "process:<id>", a process of the same program: the one writer of the values. Required, except for data
    with value (a person writes the value in the file) and for the builtin map list. A data item never inherits a
    keeper.

  THE MAKER PROCESS (format steel-process/1; the full form is tmp-ite-process-v0.1)
  - id: "make-<data id>" (a process that keeps more than one data item can have another id).
  - by: code | agent | person.
      code:   runtime (node | python | exec), entry (the file in the folder: "pull.js", "make.js"), timeout (optional,
              default 60s). A code maker with no source of its data and no trigger is a CALCULATION: the core runs it
              when a reader needs the value, and stores nothing.
      agent:  prompt (the request), target (optional, runtime/profile). The agent reports through the door:
              flint ite data report.
      person: task (what Steel asks the person in "Waiting for you"), who (optional, person:<Name>). Until the person
              answers, the data is pending.
  - reads: optional, the inputs of a made value: data references ("data:signups", "data:budget#total:paid"). A cycle
    of reads between makers is the finding data-cycle.
  - trigger: optional, { every: 1h }, { cron: "0 9 * * *" }, or an event trigger: when the pull or the maker runs
    again. It runs only on a machine where a person enabled the maker (flint ite enable "<program>" make-<id>).

  THE OUTPUT OF A CODE MAKER
  Each line of its output that is one JSON object is one record: { "row": { ... } } (one row),
  { "output": { "<name>": <value> } }, or { "log": "<text>" }. Add "data": "<data id>" to each record when the maker
  keeps more than one data item. Exit 0 with no line that is not valid is a good pull. A pulled row that lacks a field
  of shape that is not native gives error ("The source changed its shape"), and the old snapshot stays.

  THE ENVIRONMENT OF A CODE MAKER
  The core runs the entry in the folder of the maker with FLINT_ROOT, STEEL_PROGRAM_ID, STEEL_PROCESS_ID, STEEL_KEEPS
  (a JSON list of the references that the process keeps, for example ["data:signups"]), STEEL_DATA_ID (when it keeps
  one data item), STEEL_SOURCE (JSON: the source of that data note), STEEL_DATA (JSON: the values of reads,
  { "<reference>": { ref, mode, state, at, age_s, outputs } }), STEEL_INPUTS, STEEL_RUN_ID, STEEL_NODE, and the values
  of flint.env and flint.env.local, at most timeout.

  RULES
  - Only the keeper writes the values of a data item. A person can always write native data in Steel. A worker or a
    step of an instruction map writes a data item only when the data item names its process in kept-by: its code prints
    { "data": { "id": "<data id>", "value": <value> } } or { "data": { "id": "<data id>", "rows": [...], "how":
    "append" | "replace" } }, and the core writes it at the end of a run that is done. External data is written only by
    its pull.
  - A maker that pulls only reads. It never writes, sends, pushes, publishes, or fetches. The core runs a node maker
    with node --permission: a write of a file outside its temporary folder (TMPDIR) fails. A child process (git) and a
    python or exec maker are not limited: start only commands that read.
  - A calculated value is never stored as truth: give its maker by: code and reads, and no trigger, and the core
    computes it.
  - A maker never calculates from a missing input: an input with the state none, pending, or error stops it (exit 1,
    with the reason). A custom store does the same in its outputs op.
  - What a person or a process decides is written in Git (value, the native store). What is pulled or calculated is a
    fact of this machine.
  - When two checks read one source, make the source one piece of data, and let both checks read it.
  - An agent never writes data.md or a store with its own tools: it reports through the door as the maker of the data,
    or it runs as a process that the data names in kept-by.
  - `flint ite data new "<program>" <id>` writes data.md and, when the data needs a maker, Processes/make-<id>/: give
    the data flags, and --kept-by process:<id> (a process that exists) or the flags of a new maker (--by, --runtime,
    --reads, --prompt, --task, --who, and the trigger flags). The CLI is the truth: check the flags with `--help`.
  - Test each maker before you keep it: flint ite data test "<program>" <id> runs the maker once, prints each record
    and its problems, and writes nothing. Then run flint ite data list "<program>": data with a problem shows it.

  THE BODY OF THE DATA NOTE
  - One H1: the name of the data for a person ("The sign-ups").
  - One to three short paragraphs: what the data is, where its truth is, who makes it, and who reads it.
  THE BODY OF THE MAKER
  - One H1: what the maker does ("Pull the sign-ups"). One sentence: what it reads, and how.
*/

## A pulled value (external data: a table that code pulls)

The data note `Data/signups/data.md`:

````markdown
---
format: steel-data/2
id: signups
about: [04264f99-ff43-4d03-a867-e3634a085813]
map: table
source: { path: "Media/Club Launch Night/signups-export.csv" }
fresh-for: 2h
shape:
  - { name: name, kind: text }
  - { name: email, kind: text, key: true }
  - { name: signed_up, kind: date }
kept-by: "process:make-signups"
---

# The sign-ups

The sign-up sheet of the night. The truth is the sheet of the form, so the data is external. The maker `make-signups` reads the CSV export each hour and gives one row for each line. It never changes the file.
````

Its maker `Processes/make-signups/process.md`:

````markdown
---
format: steel-process/1
id: make-signups
by: code
runtime: node
entry: pull.js
timeout: 30s
trigger: { every: 1h }
---

# Pull the sign-ups

The maker reads the CSV export of the sign-up form and prints one row for each line.
````

The file `pull.js` in the same folder:

```js
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const source = JSON.parse(process.env.STEEL_SOURCE || '{}');
const [header, ...lines] = readFileSync(join(process.env.FLINT_ROOT, source.path), 'utf8').trim().split('\n').map((line) => line.split(','));
for (const line of lines) console.log(JSON.stringify({ row: Object.fromEntries(header.map((name, i) => [name, line[i]])) }));
```

## A calculated value (native data: a metric that code calculates)

The data note `Data/rsvps/data.md`:

````markdown
---
format: steel-data/2
id: rsvps
about: [8ab2da5b-f95c-43d5-a388-786d06fbda1a]
outputs:
  - { name: count, kind: number }
history: keep
kept-by: "process:make-rsvps"
---

# The RSVPs

The count of the sign-ups. The rule of the count is in the model, so the data is native. The core keeps each new count with its time on this machine.
````

Its maker `Processes/make-rsvps/process.md`: a calculation (code, `reads`, no `source`, no trigger), so the core runs it when a reader needs the count.

````markdown
---
format: steel-process/1
id: make-rsvps
by: code
runtime: node
entry: make.js
reads: ["data:signups"]
---

# Count the RSVPs

The maker counts the sign-ups with a different email.
````

The file `make.js` in the same folder:

```js
const signups = JSON.parse(process.env.STEEL_DATA || '{}')['data:signups'];
// An input with the state none, pending, or error gives no value: the maker fails, and never counts 0.
if (!signups || ['none', 'pending', 'error'].includes(signups.state)) {
  console.error(`The sign-ups have no value (${signups ? signups.state : 'missing'}).`);
  process.exit(1);
}
console.log(JSON.stringify({ output: { count: new Set(signups.outputs.rows.map((row) => row.email)).size } }));
```

## A value of a person

A value that a person writes in the file has no keeper and no maker:

````markdown
---
format: steel-data/2
id: rsvp-target
about: [8ab2da5b-f95c-43d5-a388-786d06fbda1a]
value: 30
outputs:
  - { name: value, kind: number }
---

# The target of the RSVPs

The founders decide the target, so the value is native. Change it in Steel or with `flint ite data set`.
````

A value that a person gives when Steel asks has a person maker. The data note `Data/walk-ins/data.md`:

````markdown
---
format: steel-data/2
id: walk-ins
about: [8ab2da5b-f95c-43d5-a388-786d06fbda1a]
outputs:
  - { name: value, kind: number }
fresh-for: 14d
kept-by: "process:make-walk-ins"
---

# The guests with no RSVP

Nobody can pull it: a person decides it. Steel asks the question in "Waiting for you", and the answer is written in Git.
````

Its maker `Processes/make-walk-ins/process.md`:

````markdown
---
format: steel-process/1
id: make-walk-ins
by: person
task: "How many guests do you expect at the door with no RSVP?"
who: "person:Priya"
---

# Ask for the guests with no RSVP

Steel asks Priya, and her answer is the value.
````

## A table (blended data: a pulled column and a native column)

The data note `Data/budget/data.md`:

````markdown
---
format: steel-data/2
id: budget
about: [79ba0719-0444-4280-a1db-1c8803d4511f]
map: table
source: { path: "Media/Club Launch Night/account-export.csv" }
fresh-for: 2d
shape:
  - { name: line, kind: text, key: true }
  - { name: planned, kind: money, native: true }
  - { name: paid, kind: money }
kept-by: "process:make-budget"
---

# The budget lines

`planned` is native: a person writes it in Steel, and it is in `rows.csv` in this folder. `paid` is pulled from the export of the account by the maker `make-budget`. The key `line` joins the two. The outputs are `rows`, `count`, `total:planned`, and `total:paid`.
````

The maker `make-budget` has `by: code`, `runtime: node`, and `entry: pull.js`, and it prints one `{ "row": { "line": ..., "paid": ... } }` for each line of the export. A table that a process writes (a worker, not a maker of a source) has no `source`, and `kept-by` names that process: for example `kept-by: "process:send-reminders"` on the table `reminder-answers`.
