---
description: "A map of Steel/Maps (format steel-map/1): the manifest map.md, the module index.js with render(root, api), the read model that a map reads, the intents that it sends, and one complete example; and a data map (kind: data) with the code of its store, data.js"
---

# Filename: Steel/Maps/[Map Name]/map.md and Steel/Maps/[Map Name]/index.js

/*
  A map is a renderer: code that draws the parts and the connections of a program for a view. It lives in
  Steel/Maps/<Map Name>/ of the Flint (not in the Mesh). A view names it with `map: <map id>` (format steel-view/1).
  Steel runs the module in a sandboxed iframe (sandbox="allow-scripts"): the map cannot read a file, call a route,
  or reach the network. The host of Steel gives it the read model and does the work of its intents.

  THE MANIFEST: map.md (Markdown with frontmatter). No comment in the frontmatter.
  - format: always steel-map/1.
  - id: a slug (lower-case letters, digits, single hyphens), unique in Steel/Maps/. Not the name of a builtin shape
    (flow, streams, layers, tree, table, free, timeline, board).
  - title: the name of the map for a person.
  - entry: the module file in the folder. Default index.js.
  - needs: what a program must have so that the map is useful:
      capabilities: [<capability of a type>...]   (for example dated, has-status, owner)
      connections: [<connection key>...]          (for example owner, next, depends-on)
      fields: [<field name>...]                   (for example status, date)
    GET /api/steel/maps?program=<p> says for each map whether the program meets its needs.
  - The body: one H1 (the title), then prose for a person in Simplified Technical English: what the map shows,
    how to read it, what a click does, and what it needs.

  THE MODULE: plain JavaScript, one ES module. No build, no bundler, no import of a package.
  - export function render(root, api): root is an empty DOM element. Draw into it.
  - Use plain DOM (createElement, textContent). Never put text of the model into innerHTML.
  - Draw again in api.onModel(fn): the host sends a new model after each change of the program.
  - The map never writes. It sends intents through api.

  THE API
  - api.model: the read model (SteelReadModel of flint-contracts steel-maps.ts):
      program { id, name, purpose }
      types [{ id, name, capabilities, fields, look }]   connections [{ key, title, capabilities }]
      parts [{ id, type, title, prose, parent, fields, claims [{ id, mode, about, state, value }], grounding, note }]
      links [{ from, to, key }]
      view { id, title, question, map, slice, text, parts [<part id>...], own [{ id, title, parent }],
             titles { <node id>: <words of the heading> }, prose { <node id>: <text> },
             fields { <node id>: { date, status, actor, kind, ... } }, links [{ from, to, key }] }
        (null for the main map). Show only view.parts and view.own when the view has nodes; view.own are the nodes
        with no part. Use view.titles for the words of the view, and view.fields for what the view says of a node
        (for example a `date` that the part does not have).
      state: { positions, viewport, map }: map is what saveState wrote last (or null).
      proposals: the count of the open proposals of the program.
  - api.onModel(fn): fn(model) after each new model. It returns a function that stops it.
  - api.select(ids): select parts in the Workbench.
  - api.open(partId): open the note of a part.
  - api.propose(ops, reason): a map change (the ops of `flint ite map change propose`: add, move, split, merge,
    rename, remove, edit). A map in the Workbench is the hand of a person: the host applies the change at once,
    with Undo. Only a change of the tree is a map change: a change of a field is not.
  - api.saveState(state): keep a small JSON object for this view (a collapsed column, a filter). Never a fact of a part.

  A DATA MAP (kind: data) draws one piece of data, not a view, and it keeps the store of that data. See the section
  "A data map" below, and Data Maps in [[init-ite]].

  THE RULES
  - A map only draws. The core computes the tree, the links, the grounding, and the claim states.
  - Name a part by its id. A title is for a person.
  - Keep the module small and readable: about 150 lines. Comments in Simplified Technical English.
  - Check the module: node --input-type=module --check < index.js
*/

````markdown
---
format: steel-map/1
id: MAP-ID
title: MAP TITLE
entry: index.js
needs:
  capabilities: []
  connections: []
  fields: []
---
# MAP TITLE

[What the map shows, in one to three sentences.]

How to read the map:

- [One line for each thing that a person sees.]

What a click does:

- One click selects the part.
- A double click opens the note of the part.

[What the map needs from a program.]
````

## A complete example

File: `Steel/Maps/Late Parts/map.md`

````markdown
---
format: steel-map/1
id: late-parts
title: Late Parts
entry: index.js
needs:
  capabilities: [dated]
  connections: []
  fields: [date]
---
# Late Parts

This map shows the parts of a program whose date is in the past and whose status is not done. The oldest part is first.

How to read the map:

- Each row is one part: its date, its title, and its type.
- A program with no late part shows the line "No part is late."

What a click does:

- One click selects the part.
- A double click opens the note of the part.

The map needs parts of a type with the capability dated, and the field date.
````

File: `Steel/Maps/Late Parts/index.js`

```js
// Late Parts: the parts with a date in the past and a status that is not done.
// The map reads only api.model. It puts model text only in textContent.

export function render(root, api) {
  const draw = (model) => {
    root.replaceChildren();
    const shown = model.view && model.view.parts.length > 0 ? new Set(model.view.parts) : null;
    const today = new Date().toISOString().slice(0, 10);
    const late = model.parts
      .filter((part) => !shown || shown.has(part.id))
      .filter((part) => typeof part.fields.date === 'string' && part.fields.date < today && part.fields.status !== 'done')
      .sort((a, b) => String(a.fields.date).localeCompare(String(b.fields.date)));
    if (late.length === 0) {
      const line = document.createElement('p');
      line.textContent = 'No part is late.';
      root.append(line);
      return;
    }
    const list = document.createElement('ul');
    for (const part of late) {
      const row = document.createElement('li');
      row.textContent = `${part.fields.date}  ${part.title}  (${part.type})`;
      row.addEventListener('click', () => api.select([part.id]));
      row.addEventListener('dblclick', () => api.open(part.id));
      list.append(row);
    }
    root.append(list);
  };
  draw(api.model);
  api.onModel(draw);
}
```

What the example does:

- The manifest says what the map needs, so Steel offers it only for a program with dated parts.
- The module reads only `api.model`, draws with plain DOM, and draws again on each new model.
- A click sends the intent `select`, and a double click sends `open`. The map writes nothing.

## A data map

A data map is the custom code of a large piece of data: a graph, a document, a seating plan, a sheet with formulas. The core has two builtin data maps, `table` and `list`; write a custom data map only for another shape. A piece of data names it with `map: <map id>` in its `data.md` ([[tmp-ite-data-v0.1]]). The data folder (`Steel/Programs/<Program>/Data/<id>/`) is its store, in Git.

/*
  THE MANIFEST: map.md with format steel-map/1, id, title, kind: data, entry: index.js (the drawing), and
  store: data.js (the code of the store). No needs: a data map draws one piece of data.

  THE DRAWING: index.js exports render(root, api), as a map of a view, in the same sandbox.
  - api.model: the document of the data (GET /api/steel/programs/<p>/data/<id>): data (the frontmatter), now
    ({ ref, mode, state, at, age_s, outputs, error? }), rows (at most 500), shape, history, hash, store_hash.
  - api.onModel(fn): fn(model) after each new document.
  - api.intent({ edit: <intent> }): one edit of a person. The host sends it to the core
    (POST .../data/<id>/edit), and the core asks data.js for the new files.

  THE STORE: data.js is plain Node (CommonJS, no package). The core runs `node data.js <op>` in the data folder,
  with one JSON object on stdin, at most 30 seconds. Stdout is one JSON object. A problem: exit 1, with the reason
  on stderr.
  - outputs: stdin { store, snapshot, data, inputs } -> { "outputs": { ... }, "rows"?: [...], "native"?: true }
  - edit:    stdin { store, snapshot, data, inputs, intent } -> { "files": [{ "path": "<relative to the store>",
             "content": "<text>" }] }
  - merge:   stdin { store, snapshot, data, inputs } -> { "rows": [...] } (a blended data: join the pulled rows of
             the snapshot with the native rows of the store)
  store is the path of the store; snapshot is the newest snapshot (or null); data is the frontmatter of data.md;
  inputs is the STEEL_DATA object of the `from` of the data. "native": true says that the store holds native
  values (a data with a source is then blended).

  THE RULES
  - The store code only reads files. It never writes: the core writes each file of edit inside the store, with the
    lock and the hash of the store. A path that leaves the store is refused. The core runs data.js with
    node --permission: it may read only the Flint and write only its store, and it has no child process, no worker,
    and no network.
  - One edit gives the full new text of each changed file. Keep the files easy to read in a diff of Git.
  - Test the store code with a JSON file on stdin: node data.js outputs < input.json
*/

The complete example of this Flint is the data map Seating: `Steel/Maps/Seating/map.md`, `index.js`, and `data.js`. The data `seating` of Club Launch Night uses it: the names come from the sign-ups (`from`), and the table of each guest is native (`seating.json` in the store).

File: `Steel/Maps/Seating/map.md`

````markdown
---
format: steel-map/1
id: seating
title: Seating
kind: data
entry: index.js
store: data.js
---
# Seating

This data map is a seating plan: the guests of an event at their tables. The names come from other data (the inputs of `from`). The table of each guest is native: a person decides it here.
````

The skeleton of `data.js`:

```js
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

let text = '';
process.stdin.on('data', (chunk) => { text += chunk; });
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(text || '{}');
    const plan = JSON.parse(readFileSync(join(input.store, 'seating.json'), 'utf8'));
    const op = process.argv[2];
    if (op === 'outputs') {
      console.log(JSON.stringify({ outputs: { seated: Object.keys(plan.seats).length }, native: true }));
    } else if (op === 'edit') {
      const seats = { ...plan.seats, [input.intent.email]: input.intent.table };
      console.log(JSON.stringify({ files: [{ path: 'seating.json', content: `${JSON.stringify({ ...plan, seats }, null, 2)}\n` }] }));
    } else {
      throw new Error(`the op ${op} is not known`);
    }
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
});
```
