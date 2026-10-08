---
description: "A piece of data of a program: Steel/Programs/<Program>/Data/<id>/data.md (format steel-data/1), what the system holds and measures, external, native, or blended, with its reader or its maker, and a complete example of each form"
---

# Filename: Steel/Programs/[Program]/Data/[id]/data.md

/*
  Data says what the system holds and measures: one value, a table, a series, or any other shape. The parts say
  what the system is. A value that changes over time, comes from outside, is calculated, or has rows is data, not
  a field of a part. Claims read data and judge it (reads); processes can write native data (writes); data can be
  made from other data (from).

  THE MODE is counted, never written. It answers one question: where is the truth of the value?
  - external: the data has a source, and its reader pulls the values. The model keeps a snapshot on this machine,
    and pulls again when the snapshot is old. A pull never changes the source.
  - native: the data has no source. A maker in the model makes the value: a person writes it, code calculates it
    from other data, an agent writes it, or a process writes it. A value calculated from external data is native:
    its rule is in the model.
  - blended: the data has a source and a field with native: true (a column that a person or a process writes), or
    a custom data map that says so.

  THE FOLDER
  - Steel/Programs/<Program>/Data/<id>/ — the folder name is the id of the data.
  - data.md holds the data. The code of a reader or a maker is in the same folder. The folder is also the native
    store: rows.csv of a table, history.jsonl of a written metric, the files of a custom data map. In Git.
  - The snapshot of a pull, the cache of a calculated value, and the history of a pulled or calculated metric are
    facts of this machine (.flint/steel/data/<program id>/<id>/). Only the core writes them.

  FRONTMATTER CONTRACT. The keys are kebab-case. No comment in the frontmatter. Quote each reference.
  - format: always "steel-data/1".
  - id: a slug, unique in the program, the same as the folder name: "rsvps".
  - about: optional, the references of the elements that the data describes: part ids (UUIDs), process:<id>, ...
  - map: optional. table (rows with a shape; the store is rows.csv), list (the parts of one type: give list-of:
    <Type>), or the id of a data map of Steel/Maps with kind: data (tmp-ite-map-v0.1). Absent: one value.
  - source: optional; with it, the data is external (or blended). One of { path: "<a file of the Flint>" } or
    { path: "@<Codebase>/<path>" }, { url: "<https URL>" }, { command: "<command line>" }, { ref: "[[<note>]]" }.
  - by: code | agent | person. With source: the reader. With no source: the maker. Absent: a value that a person
    writes in value, a table that a process writes, or a list.
  - code: runtime (node | python | exec), entry (the file in the folder: "pull.js", "count.js"), timeout
    (optional, default 60s).
  - agent: prompt (the request), target (optional, runtime/profile). The agent reports through the door:
    flint ite data report.
  - person: question (what Steel asks the person in "Waiting for you"), who (optional, person:<Name>). Until the
    person answers, the data is pending.
  - from: optional, the inputs of a made value: data references only ("data:signups", "data:budget#total:paid").
    A cycle of from is the finding data-cycle.
  - value: optional, a value that a person writes (no map, no source, no entry). Change it with
    flint ite data set, or in Steel (with Undo).
  - shape: a table: the fields of the rows, - { name, kind, key?, native? }. One field has key: true (it joins the
    pulled rows and the native rows of a blended table). native: true marks a column that a person or a process
    writes in external data.
  - outputs: optional, what others read: - { name, kind }. Default: one output value; a table and a list give
    rows, count, and total:<field> for each number or money field.
  - kinds: text | number | boolean | choice | json | date | money. A money value is { "amount": 450,
    "currency": "AUD" }; the short form "450 AUD" is accepted in a frontmatter field and in a CSV cell.
  - trigger: optional, { every: 1h }, { cron: "0 9 * * *" }, or { on: hook }: when the pull or the maker runs
    again. It runs only on a machine where a person enabled it (flint ite enable "<program>" data:<id>).
  - fresh-for: optional, a duration (2h, 1d). A value older than this is old, and each claim that reads it is old.
  - history: optional, keep (a metric: each new value is kept with its time).

  THE CODE OF A READER OR A MAKER
  The core runs the entry in the data folder with FLINT_ROOT, STEEL_PROGRAM_ID, STEEL_DATA_ID, STEEL_SOURCE (JSON:
  the source), STEEL_DATA (JSON: the values of from, { "<reference>": { ref, mode, state, at, age_s, outputs } }),
  and the values of flint.env and flint.env.local, at most timeout. Each line of its output that is one JSON object
  is one record: { "row": { ... } } (one row), { "output": { "<name>": <value> } }, or { "log": "<text>" }. Exit 0
  with no line that is not valid is a good pull. A pulled row that lacks a field of shape that is not native gives
  error ("The source changed its shape"), and the old snapshot stays.

  RULES
  - A reader only reads. It never writes, sends, pushes, publishes, or fetches. The core runs a node reader or maker
    with node --permission: a write of a file outside its temporary folder (TMPDIR) fails. A child process (git) and
    a python or exec reader are not limited: start only commands that read.
  - A calculated value is never stored as truth: give it by: code and from, and the core computes it.
  - A maker never calculates from a missing input: an input with the state none, pending, or error stops it (exit 1,
    with the reason). A custom store does the same in its outputs op.
  - What a person or a process decides is written in Git (value, the native store). What is pulled or calculated is
    a fact of this machine.
  - When two claims read one source, make the source one piece of data, and let both claims read it.
  - A process writes native data only when it names it in writes. External data is written only by its pull.
  - An agent never writes data.md or a store with its own tools: it reports through the door, or it runs as a
    process with writes.
  - Test each reader and each maker before you keep it: flint ite data test "<program>" <id> runs it once, prints
    each record and its problems, and writes nothing. Then run flint ite data list "<program>": data with a problem
    shows it.

  THE BODY
  - One H1: the name of the data for a person ("The sign-ups").
  - One to three short paragraphs: what the data is, where its truth is, who makes it, and who reads it.
*/

## External data (a table, pulled by code)

````markdown
---
format: steel-data/1
id: signups
about: [04264f99-ff43-4d03-a867-e3634a085813]
map: table
source: { path: "Media/Club Launch Night/signups-export.csv" }
by: code
runtime: node
entry: pull.js
timeout: 30s
trigger: { every: 1h }
fresh-for: 2h
shape:
  - { name: name, kind: text }
  - { name: email, kind: text, key: true }
  - { name: signed_up, kind: date }
---

# The sign-ups

The sign-up sheet of the night. The truth is the sheet of the form, so the data is external. The reader `pull.js` reads the CSV export and prints one row for each line. It never changes the file.
````

The file `pull.js` in the same folder:

```js
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const source = JSON.parse(process.env.STEEL_SOURCE || '{}');
const [header, ...lines] = readFileSync(join(process.env.FLINT_ROOT, source.path), 'utf8').trim().split('\n').map((line) => line.split(','));
for (const line of lines) console.log(JSON.stringify({ row: Object.fromEntries(header.map((name, i) => [name, line[i]])) }));
```

## Native data, calculated by code (a metric)

````markdown
---
format: steel-data/1
id: rsvps
about: [8ab2da5b-f95c-43d5-a388-786d06fbda1a]
by: code
runtime: node
entry: count.js
from: ["data:signups"]
outputs:
  - { name: count, kind: number }
history: keep
---

# The RSVPs

The count of the sign-ups. The rule of the count is in the model, so the data is native. The core keeps each new count with its time on this machine.
````

The file `count.js` in the same folder:

```js
const signups = JSON.parse(process.env.STEEL_DATA || '{}')['data:signups'];
// An input with the state none, pending, or error gives no value: the maker fails, and never counts 0.
if (!signups || ['none', 'pending', 'error'].includes(signups.state)) {
  console.error(`The sign-ups have no value (${signups ? signups.state : 'missing'}).`);
  process.exit(1);
}
console.log(JSON.stringify({ output: { count: new Set(signups.outputs.rows.map((row) => row.email)).size } }));
```

## A native value that a person writes

````markdown
---
format: steel-data/1
id: rsvp-target
about: [8ab2da5b-f95c-43d5-a388-786d06fbda1a]
value: 30
outputs:
  - { name: value, kind: number }
---

# The target of the RSVPs

The founders decide the target, so the value is native. Change it in Steel or with `flint ite data set`.
````

## A value that a person gives when Steel asks

````markdown
---
format: steel-data/1
id: walk-ins
about: [8ab2da5b-f95c-43d5-a388-786d06fbda1a]
by: person
question: "How many guests do you expect at the door with no RSVP?"
outputs:
  - { name: value, kind: number }
fresh-for: 14d
---

# The guests with no RSVP

Nobody can pull it: a person decides it. Steel asks the question in "Waiting for you", and the answer is written in Git.
````

## Blended data (a table with a native column)

````markdown
---
format: steel-data/1
id: budget
about: [79ba0719-0444-4280-a1db-1c8803d4511f]
map: table
source: { path: "Media/Club Launch Night/account-export.csv" }
by: code
runtime: node
entry: pull.js
fresh-for: 2d
shape:
  - { name: line, kind: text, key: true }
  - { name: planned, kind: money, native: true }
  - { name: paid, kind: money }
---

# The budget lines

`planned` is native: a person writes it in Steel, and it is in `rows.csv` in this folder. `paid` is pulled from the export of the account. The key `line` joins the two. The outputs are `rows`, `count`, `total:planned`, and `total:paid`.
````
