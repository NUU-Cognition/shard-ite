---
description: "A map of Steel/Maps (format steel-map/1): the manifest map.md, the module index.js with render(root, api), the read model that a map reads, the intents that it sends, and one complete example"
---

# Filename: Steel/Maps/[Map Name]/map.md and Steel/Maps/[Map Name]/index.js

/*
  A map is a renderer: code that draws the parts and the connections of a program for a view. It lives in
  Steel/Maps/<Map Name>/ of the Flint (not in the Mesh). A view names it with `map: <map id>` (format ite-view/2).
  Steel runs the module in a sandboxed iframe (sandbox="allow-scripts"): the map cannot read a file, call a route,
  or reach the network. The host of Steel gives it the read model and does the work of its intents.

  THE MANIFEST: map.md (Markdown with frontmatter). No comment in the frontmatter.
  - format: always steel-map/1.
  - id: a slug (lower-case letters, digits, single hyphens), unique in Steel/Maps/. Not the name of a builtin shape
    (flow, streams, layers, tree, table, free, timeline, board).
  - title: the name of the map for a person.
  - entry: the module file in the folder. Default index.js.
  - needs: what a program must have so that the map is useful:
      capabilities: [<capability of a type>...]   (for example runnable, dated, has-status)
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
      view { id, title, question, map, slice, text, parts [<part id>...], prose { <node id>: <text> }, own [{ id, title, parent }] }
        (null for the main map). Show only view.parts when the list is not empty; view.own are the nodes with no part.
      state: { positions, viewport, map }: map is what saveState wrote last (or null).
      proposals: the count of the open proposals of the program.
  - api.onModel(fn): fn(model) after each new model. It returns a function that stops it.
  - api.select(ids): select parts in the Workbench.
  - api.open(partId): open the note of a part.
  - api.propose(ops, reason): a map change (the ops of `flint ite map change propose`: add, move, split, merge,
    rename, remove, edit). A map in the Workbench is the hand of a person: the host applies the change at once,
    with Undo. Only a change of the tree is a map change: a change of a field is not.
  - api.saveState(state): keep a small JSON object for this view (a collapsed column, a filter). Never a fact of a part.

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
