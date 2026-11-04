---
description: "The reference of the ITE for the main map: each term with its meaning, who writes what, meaning versus facts, the folders of a program, and each flint ite command of the main map with what it writes and the exit codes"
orb:
  - "@v1/nuucognition/session/ccaed053-844a-48bd-966a-41a2e32d6412#flint/nuu-flint"
---

# Knowledge: The Reference of the ITE

Read this file when you need the exact meaning of a term, the folder of a file, or a command that the init does not name. The rules of [[init-ite]] apply with no change. This file covers the main map, the module that is always on. The details of the main map are in [[knw-ite-programs]]. How to compose a level is in [[knw-ite-canvas]].

## The ITE as an IDE for Systems

An IDE gives a person one place to write and navigate software. The ITE gives the same for a model of a system:

| An IDE for software | The ITE |
|---|---|
| A project | A **program**: the model of one system. A root note in the Mesh, and the tree of parts below it. |
| A language and its libraries | **Types** and **connections**: Mesh notes that say what each part is and how parts link. A **template** gives the start of a new program. |
| Source files | **Parts**: one Mesh note for each part of the system, of any type |
| The outline of a project | The **main map**: the tree of the parts, as cards on a canvas, one level at a time |
| The Problems panel | **Findings** of the main map |
| Source control | **Map changes**: each change of the tree waits for the apply of a person, and a revert writes back the old files |

Example: Nathan makes the program "Club Launch Night" from the template `event`. An agent reads the notes of Nathan and proposes the first level of the main map as one map change: the goal, the milestones, the roles, the venue, the risks. Nathan reads the preview and applies it. Then Nathan moves two cards by hand, groups three risks, and draws a frame around the work of the night.

The surface is the **Workbench** of Steel (the page `/ite`). This shard gives the agent side: the model, the file forms, the quality rules, and the workflows of the main map.

## The Terms

One term has one meaning. Use these terms in each file and each result.

| Term | Meaning |
|---|---|
| Program | The model of one system: a root note in the Mesh (format `steel-program/1`), and the tree of parts below it. |
| Root note | The note of a program: its purpose, its types, and its prose. The root of the main map. |
| Part | One note of the main map: what the system is made of. Any Mesh type. A note is a part when its `parent` chain reaches the root note. |
| Type | The type of a note: the last `(Type)` word of its file name. A type note in `Mesh/Metadata/Types/` with a `type` block gives its fields, capabilities, connections, and look. The wire field `kind` is the type id. |
| Capability | One thing that the core does with a part of a type. The main map uses `covers-files` and `container`. |
| Connection | A typed link between two parts: a frontmatter key, defined by a connection note. `parent` is not a connection: it is the containment. |
| Template | The start of a new program: its types and connections, and the instruction for the agent. |
| Main map | The tree of the parts by `parent`: what the system is. Each program has one main map. See The Main Map in [[knw-ite-programs]]. |
| Level | The children of one part (or of the root) on the main map. A level has no size limit, unless the program sets `max-children`. |
| Subsystem | A part of the main map with children. A person opens it on the canvas. It is not a separate program. |
| Group | A part with children that shows as a box on the level of its parent, with its parts inside. |
| Layer | A part with children that shows as one card. A person enters it to see its parts. |
| Card | One part on the canvas. With no saved size, a plain card is 208 × 48, and the card of a layer is 320 × 240. |
| Coverage | How much of the codebase the parts cover: the files of a program with `codebase` on its root note. |
| Codebase | The field `codebase` of the root note: the code of the program. It gives the file coverage and the `code-refs`. |
| Code-ref | One entry of `code-refs` of a part: a folder, a file, a symbol, a line range, or a path of another codebase. |
| Sources | The notes, the pages, or the code that a part comes from. |
| Map change | A list of operations on the tree (`add`, `move`, `split`, `merge`, `rename`, `remove`, `edit`) in one file of `Proposals/`. An agent proposes it; a person applies it. |
| Preview | The tree before and after a map change, with the files, the new findings, the dangling links, and the conflicts. |
| Apply, revert, discard | A person writes a map change into the Mesh (apply), or writes back the old files (revert). A person or the agent that proposed it discards it. |
| Place | Where a card is: the top left corner of its box, relative to the room of its parent. A fact of `State/main.json`, not meaning. |
| Size, face, look | The size of the box of a card, what the card shows under its title, and its shape, colour, and layer order. Facts of `State/main.json`. |
| Arrange | One command that puts the cards of a level in columns and rows. On a real level it runs only when a person asks. An agent lays out its own parts in the `layout` of its change. |
| Layout | The field `layout` of a map change: the place of each part and the drawings, as the level is after the change. Facts, not meaning. A person's apply writes them to `State/main.json`. |
| Canvas | One level of the main map as the Workbench draws it: the boxes with absolute places, the drawings, the links, the bounds, and the problems. `flint ite map canvas` reads it. |
| Render | The image (PNG or SVG) of a canvas. `flint ite map render` draws it with no browser and no server. |
| Room | The area of a group box below its title row, 16 from the sides. A place is relative to the room of the parent. |
| Drawing | A shape, a text, a frame, a line, or a group on one level of the canvas. It is not a note, and it changes no part. A fact of `State/main.json`. |
| Finding | One problem that a command computes about a program. |
| Module | One part of the ITE that a person turns on or off for a Flint. The main map (`main-map`) is always on. |
| Setting | The list `modules` of the block `[ite]` of `flint.toml`. `flint ite modules` shows it. |
| Workbench | The ITE surface in Steel. |

## Who Writes What

| What | Home | Writer |
|---|---|---|
| The root note and the parts | The Mesh: `Mesh/Programs/(Program) <Name>/` | A person or an agent, only through a map change (one writer of the structure). A person's hand change applies at once. |
| The prose and the fields of a part | The part note | A person directly, or with `flint ite part set`. An agent through a map change (`edit`). |
| A link | The frontmatter of a part | A person directly, or with `flint ite link`. An agent through a map change. |
| A map change | `Steel/Programs/<P>/Proposals/mc-*.md` | Only the change engine |
| The places, the sizes, the faces, the looks, and the drawings | `Steel/Programs/<P>/State/main.json` | Only the canvas and the commands `place`, `arrange`, and `drawing`, for a person and for an agent; and the apply of a map change with a `layout` (a person) |
| The types, the connections, and the templates | `Mesh/Metadata/Types/`, `Mesh/Metadata/Templates/` | A shard (its install files), or a person |
| The setting of the modules | `flint.toml`, block `[ite]` | A person, with `flint ite modules on|off` |

## A Writer Writes Meaning, a Command Computes Facts

A program holds **meaning**: the root note, the parts, their prose, their types, and their links. A program never holds a **fact** that a command computes:

- No finding, no count, and no coverage in a note.
- No place, size, face, look, or drawing in a note. They are in `State/main.json`. Only the default face of the program, `card-face` of the `main-map` block, is in the root note. A place is not meaning, so a move applies at once, also for an agent.
- Never write a file of `Proposals/` or `State/` with your own tools.

You can tell a person the facts in a conversation or in your result. Do not write them into a program.

## The Folders of a Program

The meaning is in the Mesh. The files of the engine are in `Steel/`.

```
Mesh/Programs/
└── (Program) <Name>/
    ├── (Program) <Name>.md                          # the root note
    └── Map/
        └── (Program) <Name> . (<Type>) <Title>.md   # the default home of a new part (display only)

Steel/Programs/<Name>/
├── program.md                                       # id = the id of the root note
├── Proposals/mc-<stamp>-<slug>.md                   # the map changes (only the change engine writes them)
└── State/main.json                                  # the place { x, y, parent } and the size, the face, and the look of each card, the drawings, the viewport, and the pins
```

The folder `Steel/Programs/<Name>/` can hold more folders of a later module. Keep them as they are.

A folder is for a person: the identity of a part is its `id`, and its membership is its `parent` chain. A part can live anywhere in the Mesh. A Task or a Person can be a part: its `parent` names a part of the program. Each note has one home: another program links to it with a connection, and does not contain it.

**The root note gives the program, not the folder.** The ITE finds each program by its form: each Mesh note with `format: steel-program/1` is a root note. The name of the program is the file stem with no first `(<Type words>) ` prefix: `(Program) Club Launch Night` gives `Club Launch Night`, and a root note `(Product) Flint` gives `Flint`. A new part goes to `Map/` in the folder of the root note, with the name `<stem of the root note> . (<Type>) <Title>.md`. Two root notes with one name give the finding `format` on both, and neither loads.

## The Layout of a Map Change

A map change has `ops` and `layout`. The plan runs the operations first, then reads the layout against the tree after them. So the order of the operations has no effect on a place, and a key of `layout.places` can name a new part of the same change. A change can hold only a layout.

```json
{ "ops": [ ],
  "layout": {
    "places":   { "<part: id, note name, or title>": { "x": 240, "y": 0, "width": 208, "height": 48, "face": "sentence" },
                  "<other part>": { "near": "<part with the same parent>", "side": "right" } },
    "drawings": { "add": [ { "kind": "frame|rect|ellipse|diamond|text|line|group", "x": 0, "y": 0, "w": 320, "h": 200, "text": "<words>",
                             "color": "gray", "z": 0, "layer": null,
                             "from": { "node": "<part>" }, "to": { "node": "<part>" }, "arrow": "end", "route": "straight|elbow",
                             "members": ["<part>"] } ],
                  "set": [ { "id": "<drawing id>", "text": "<new words>" } ],
                  "remove": [ "<drawing id>" ] } } }
```

- A place gives `x` and `y`, or `near` (with `side`: `right` or `below`). `width`, `height`, and `face` are optional. A place snaps to 8. A drawing follows the rules of `flint ite drawing`. A `set` or a `remove` names a drawing that exists, or an `add` of the same change.
- **Which part needs a place:** a part that the current tree does not have (`new`), and a part that the change gives another parent (`new-parent`). They come from `add`, `move`, `split`, `merge`, `remove`, and `plan realize`.
- **The refusal:** an agent's change with such a part and no place is refused before any write: exit 2, code `refused-state`, `reason: "unplaced-parts"`, with `unplaced[]` (`part`, `title`, `parent`, `parent_title`, `why`, `suggested`) and `layout.places` (the suggested place of each). A suggested place is a floor: choose a better one. A person's change is never refused.
- **The apply** (a person) writes the places and the drawings to `State/main.json`. The revert writes back a place or a drawing that nobody changed since. It keeps the others and lists them in the document as `kept`.
- **The preview** (`map change show`, `propose --dry-run`) has a block `Layout`: each place (before → after), each drawing, each unplaced part, and each problem. `--json`: `preview.layout` with `places[]`, `drawings[]`, `unplaced[]`, `levels[]`, and `problems[]`.
- **The problems:** `overlap` (warning), `unplaced` (warning), `far` (note), `empty-drawing` (note). They never refuse a change. `map check` lists them too (`--json`: `canvas.problems`).

### The Canvas and the Render

`flint ite map canvas "<program>" [--in <part>] [--deep] [--json]` reads one level. It reads the files, not the server, and writes nothing. `--json` gives the scene `steel-canvas/1`:

- `level`: `null` (the top of the root), or `{ id, title, mode }`.
- `boxes[]`: `id`, `title`, `kind`, `mode` (`card`, `group`, or `layer`), `parent`, `depth`, `at` (relative to the room of the parent: what `--at` takes), `abs` (on the canvas), `size`, `place` (`saved` or `new`), `face`, `face_text`, `parts` (for a layer), and `marks` (in the scene of a change).
- `drawings[]`, `links[]` (`from`, `to`, `relation`), `bounds` (or `null`), and `problems[]`.

`flint ite map render "<program>" [--in <part>] [--all] [--out <file|dir>] [--format png|svg] [--scale <n>] [--no-grid]` draws the canvas. It writes only the image, with no browser and no server. It has three sources:

- Now: `map render "<program>"`.
- A change: `map render "<program>" --change <id> [--side before|after]`.
- A draft: `map render "<program>" --ops <file|-> [--layout <file|->] [--side before|after]`. The `--ops` file can be `{ "ops": [...], "layout": {...} }`.

It prints the file, the pixel size, the scale, the bounds, the count of the boxes, and the count of the problems. With no `--out`, the file goes to `$ORBH_SCRATCH_DIR`, else to the temporary folder, as `ite-<program slug>-<level slug>.png`. `--all` needs a folder. The image has a grid with coordinate labels, so you can read a place from it. A box with a new place has a dashed border. In a change: green is added, blue is moved or placed, orange is renamed or edited, and (with `--side before`) red is removed or merged. When the PNG cannot be made, the command writes the SVG and says why.

The server gives the same image for a change that waits: `GET /api/ite/programs/:program/changes/:id/canvas?side=before|after&level=root|<part id>&format=svg|json`. The Workbench shows it in the section `Layout` of the review of the change.

## The Commands

`flint ite` is a part of the Flint CLI. Each command takes `--json`. `<program>` is the name or the id of a program. `<id>` is the id of a part: `flint ite map` prints it. `<part>` is an id, a note name, or a unique title.

| Command | Result | Writes |
|---|---|---|
| `flint ite` | The start: each program in one line with its map facts (parts, levels, map changes that wait). The first next command is `flint ite proposals <program>` when a map change waits, else `flint ite map <program>`. `--json`: `{ programs, modules, next }`. | Nothing |
| `flint ite list` | For each program: `<name>  <template>  <N parts in L levels · K map changes wait · G files have no part · E errors>`, its purpose, and the findings of its main map. `--json` adds `modules` and `map_facts`. | Nothing |
| `flint ite types [--type <id>]` | The types and the connections of this Flint, with their capabilities | Nothing |
| `flint ite templates` | The templates that a new program can start from | Nothing |
| `flint ite create <name> --purpose "<one sentence>" [--template <id>]` | A new program: the root note with the `types` of the template, and `Steel/Programs/<Name>/program.md`. With no `--template`, the template is a guess from the purpose. The output names the template, the types, and the root note, says that the map has only its root note, and gives the next commands (`part add`, `map`, `proposals`). | The root note, `Steel/Programs/<Name>/program.md` |
| `flint ite map ...` | The main map: `show`, `tree`, `check`, `coverage`, `canvas`, `render`, `change propose\|list\|show\|apply\|revert\|discard`, `split`, `move`, `rename`, `merge` (see The Commands of the Main Map in [[knw-ite-programs]], and The Layout of a Map Change above) | A proposal, an image, or nothing |
| `flint ite part add <program> --kind <type id> --title "<title>" [--parent <id or note name>] [--text "<text>"] [--field k=v]... [--at <x>,<y>\|--near <part> [--side right\|below]]` | Adds one part: a map change. A person's change applies at once; an agent's change is a proposal. `--field` is for a person only. | One proposal (and the note, when applied) |
| `flint ite part set <program> <id> [--text "<text>"] [--field k=v]... [--base-hash <hash>]` | Changes the text and the fields of a part. It refuses `title`, `kind`, and `parent`. A person's change writes at once; an agent's change is one map change (`edit`). | One note (a person), or one proposal (an agent) |
| `flint ite part remove <program> <id or note name> [--layout <file\|->]` | Removes one part: a map change. Its children move to its parent, and an agent gives each child a place in `--layout`. | One proposal |
| `flint ite link <program> <from id> <to id> --relation <key> [--remove]` | Adds or removes a link of a connection. `--relation refers-to` gives a link that the main map always shows. A person's link writes at once; an agent's link is one map change. | One note (a person), or one proposal (an agent) |
| `flint ite places <program> [--in <part>] [--deep]` | The place of each part of one level (default: the top of the root): the id, the title, the type, the mode (card, group, or layer), x, y, the width, the height, and `saved` or `new` | Nothing |
| `flint ite place <program> <part> (--at <x>,<y> \| --near <part> [--side right\|below]) [--size <w>,<h>\|auto] [--face <face>\|default]` | Sets the place, the size, or the face of one part. It applies at once, for a person and for an agent. | `State/main.json` |
| `flint ite arrange <program> [--in <part>] [--only <part>,<part>] [--deep] [--all]` | One Arrange of one level, or of each level (`--all`). It prints how many parts moved. On a real level, only when a person asks. | `State/main.json` |
| `flint ite proposals [<program>]` | Each change that waits for a person, the oldest first, each with its show command | Nothing |
| `flint ite drawing list <program> [--layer <part>\|root]` | The drawings of the main map, or of one layer | Nothing |
| `flint ite drawing add <program> --kind rect\|ellipse\|diamond\|text\|frame\|line\|group [--id] [--layer] [--at x,y] [--size w,h] [--text] [--color] [--z] [--locked] [--from x,y] [--from-node] [--to x,y] [--to-node] [--arrow] [--route] [--members a,b]` | Adds one drawing (see The Drawings in [[knw-ite-programs]]). It applies at once, for a person and for an agent. | `State/main.json` |
| `flint ite drawing set <program> <drawing id> [the flags of add] [--unlocked]`, `flint ite drawing remove <program> <drawing id>...` | Changes or removes drawings. A locked drawing does not move until `--unlocked`. | `State/main.json` |
| `flint ite check [<program>] [--all]` | The findings of the programs, only for the modules that are on. The last line gives the count of the hidden findings, with `flint ite check --all`. `--all` gives each finding of each module, and each note. Exit 1 only for an error finding that it shows. `--json` adds `modules` and `hidden`. | Nothing |
| `flint ite check [<program>] --paths <path...> [--checkout <dir>] [--json]` | The check after a task: the parts whose sources name one of the paths. `--json`: `programs[]`, each with `program` and `parts[]` (`id`, `title`, `findings`). Exit 0 when no part names the paths. ([[sk-ite-check_after_task]]) | Nothing |
| `flint ite modules [--json]` | Each module of the ITE, its title, and whether it is on in this Flint | Nothing |
| `flint ite modules on\|off <id>` | Turns one module on or off. A person only: an agent gets the code `forbidden` (exit 1). | `flint.toml` |
| `flint ite rename <program> <name> [--base-hash <hash>]` | Renames a program and its files, and updates each wikilink in the Mesh. A person only. | The program, the wikilinks |
| `flint ite archive <program> [--base-hash <hash>]` | Moves a program to `Mesh/Archive/Programs`. Deletes no file. A person only. | The program folder |

The one-operation verbs `map move|split|merge|rename`, `part add`, and `plan realize` take `--at <x>,<y>` or `--near <part> [--side right|below]` for the part that they make or move, and `--layout <file|->` for each other part. `--dry-run` on `map change propose` plans the change and writes nothing.

`flint ite --help` shows the verbs of the modules that are on, then the line `Off in this Flint: <ids>. Their commands still work.` The exit codes: 0 done; 1 a finding of the level error, or a conflict; 2 a refusal, and nothing was written. Each write runs inside the lock of the Flint. The Workbench uses the same code through the routes `/api/ite/*` and `/api/steel/*` of the Flint server, and `GET /api/ite/modules` gives the setting.
