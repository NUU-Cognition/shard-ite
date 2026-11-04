---
description: "The ITE for the main map: what a program and its main map are, the rules, where the files live, how to make a program and change its map, the operations of a map change, the command for each piece of work, the setting of the modules, which file to read, and the section Headless with its rules and the shape of the result"
orb:
  - "@v1/nuucognition/session/c486136a-df4f-4481-826f-ab4c7dcfc657#flint/nuu-flint"
orbh-fleet: steel-map-refresh-1104
---

# ITE

The ITE (Integrated Thinking Environment) lets a person model a **system** of any kind as a **program**. Software is a system. A weekly meeting, the launch night of a club, a process of a business, and a research are systems too.

A **program** is one root note in the Mesh and the tree of its **parts**. A part is one Mesh note of a type (a goal, a person, a module, a step). The tree of the parts by `parent` is the **main map**: what the system is made of. A part with children is a deeper **level**: a person opens it on the canvas. Each program has one main map.

The surface for a person is the **Workbench** of Steel (the page `/ite`). There a person sees the main map as cards, changes it by hand, and applies each change that an agent proposes. This shard gives the agent side. The command is `flint ite`: with no verb, it shows the programs and the map changes that wait. Each verb takes `--json`, and `flint ite <verb> --help` gives the flags and one example. The CLI is the truth: check a form with `--help`.

> [!headless]
> A headless or subagent Orbh session: read the section `# Headless` at the end of this file too.

Read this file first. With this file and one workflow, you can make a program and change its map. Read a knowledge file only when a step needs more. When `flint shard start ite` says that the build is stale, go on: a person builds it again.

## The Rules

1. **An agent proposes. Only a person decides.** Only a person applies or reverts a map change, and renames or archives a program. The engine refuses an agent with `forbidden`. In an Orbh session, a `Next:` line that only a person may run ends with `(a person)`: name it for the person, and never run it. Write each reason so that the person can decide in one click.
2. **One writer of the structure.** The main map changes only through a map change (`flint ite part add`, `part remove`, `map change propose`, `map split|move|rename|merge`). Never write a part file, a `parent`, a title, or a `(Type)` word with your own tools. Write through `flint ite` each time a command exists, so that the person sees your change in the Workbench.
3. **Only commands write facts.** A program holds meaning: the root note, the parts, their prose, and their links. It never holds a finding, a count, or a place. The place, the size, and the face of each card, and the drawings, are in `State/main.json`. Only the canvas, `flint ite place`, `arrange`, and `drawing` write that file. Never write a file of `Proposals/` by hand.
4. **Test before you hand over.** Read the preview of each map change that you propose. Hand over no change with a new error finding.
5. **Read before you run.** Never run code that you did not read. Run `flint ite arrange` only when a person asks for it: it moves many cards.
6. **Never invent.** No invented id, path, URL, part, or type. Say a gap in the prose: "Nobody knows this yet."
7. **The words of the person.** Use the words that the person uses for the system. Prose first: one to three short paragraphs for each part. A title of two to six words. The quality rules are in [[knw-ite-programs]]. A part can also show its flow in one Mermaid diagram, when a picture says more than the text: see [[knw-ite-programs#Diagrams in the Prose]].
8. **Simplified Technical English.** Short sentences, active voice, one term for one thing.

## Where the Files Live

```
Mesh/Programs/(Program) <Name>/(Program) <Name>.md                          the root note (steel-program/1)
Mesh/Programs/(Program) <Name>/Map/(Program) <Name> . (<Type>) <Title>.md   a part (the default home of a new part)
Mesh/Metadata/Types/, Mesh/Metadata/Templates/                              the types, the connections, and the templates
Steel/Programs/<Name>/Proposals/mc-<stamp>-<slug>.md                        a map change (only the engine writes it)
Steel/Programs/<Name>/State/main.json                                       the places, the sizes, and the faces of the cards, and the drawings
```

A note is a part when its `parent` chain reaches the root note. Its identity is its frontmatter `id`, not its folder. A part names its links with the keys of the connections (`uses`, `depends-on`, `owner`, `refers-to`). A part can have more keys of a later module: keep each key that this shard does not name.

## Make a Program and Change Its Map

1. **The purpose and the template.** `flint ite create "Weekly Team Meeting" --purpose "<one sentence: what the system is, and why>" [--template organisation]`. `flint ite templates` lists the templates: the six of the shard (`organisation`, `process` for repeated work of a business, `event`, `research`, `software`, `general`) and the templates of this Flint. The program gets only its root note, and `Steel/Programs/<Name>/program.md`.
2. **The first map, as one map change.** Write the parts of level 1 as one JSON array (the table below), then: `flint ite map change propose "<program>" --ops <file> --reason "<one sentence>"`.
3. **The person decides.** Read the preview: `flint ite map change show "<program>" <change id>`. `flint ite proposals "<program>"` lists each change that waits. The person applies it in the Workbench, or with `flint ite map change apply "<program>" <change id>` `(a person)`.
4. **Deeper.** One more map change for each next step: a part one level deeper, a clearer level, the parts that the person names. See the workflows below.
5. **Check.** `flint ite map check "<program>"` and `flint ite check "<program>"` give no error.

### The Operations of a Map Change

`--ops` takes one JSON array (`-` reads the standard input). The operations apply in order. A part is its id, its note name, or a unique title. `parent: null` is the root. `kind` is a type id of the program.

| Operation | The JSON |
|---|---|
| `add` | `{"op":"add","title":"<t>","kind":"<type id>","parent":"<part or null>","sentence":"<s>","prose":"<optional>","sources":["..."],"id":"<optional uuid>"}` |
| `move` | `{"op":"move","part":"<part>","parent":"<part or null>"}` |
| `split` | `{"op":"split","parent":"<part or null>","subsystem":{"title":"<t>","kind":"<type id>","sentence":"<s>"},"children":["<part>"]}` |
| `merge` | `{"op":"merge","from":"<part>","into":"<part>"}` (the children, the sources, and the links of `from` go to `into`) |
| `rename` | `{"op":"rename","part":"<part>","title":"<new title>","kind":"<optional type id>"}` (each wikilink changes too) |
| `remove` | `{"op":"remove","part":"<part>"}` (its children move up one level) |
| `edit` | `{"op":"edit","part":"<part>","sentence":"<s>","prose":"<p>","sources":["<the whole new list>"],"fields":{"<key>":"<value>"}}` |

A map change cannot name a part that another waiting map change adds. So put a new subtree in one map change: give each new part an `id` (a new UUID v4), and name it as the `parent` of its children.

## The Commands

`<program>` is the name or the id of a program. `<id>` is the id of a part: `flint ite map` prints it. A map change, the `map` shortcuts, and `place` also take a note name or a unique title. In an Orbh session the CLI acts as the agent, so a change of the structure is a proposal.

| To do this | Run this |
|---|---|
| See the programs and the map changes that wait | `flint ite` (no verb); `flint ite list` (the parts, the levels, the waiting map changes, the files with no part, and the errors of each program) |
| Read one program | `flint ite map "<program>"` (the tree with the id of each part; `--full` adds the text); `flint ite map show "<program>" [--focus <id>]` (one level) |
| See the types and the templates; make a program | `flint ite types`, `flint ite templates`; `flint ite create "<name>" --purpose "<one sentence>" [--template <id>]` |
| Add or remove one part | `flint ite part add "<program>" --kind <type id> --title "<title>" [--parent <id>] [--text "<text>"]`; `flint ite part remove "<program>" <id>` |
| Change many parts at once; move, rename, merge, or group parts | `flint ite map change propose "<program>" --ops <file\|-> --reason "<text>"`; `flint ite map move\|rename\|merge\|split "<program>" ...` (one operation each) |
| Change the prose or a field of a part | `flint ite part set "<program>" <id> --text "<text>"` (a person: at once; an agent: one map change) |
| Link two parts | `flint ite link "<program>" <from id> <to id> --relation <key>` (`refers-to` always shows on the map; a person: at once; an agent: one map change) |
| Read the map changes that wait; take back your own | `flint ite proposals "<program>"`; `map change list "<program>" --state proposed`; `map change show "<program>" <id>`; `map change discard "<program>" <id>` |
| Read or set the place, the size, or the face of a card | `flint ite places "<program>" [--in <id>]`; `flint ite place "<program>" <id> --at <x>,<y>\|--near <id> [--size <w>,<h>] [--face <face>]` (at once, also for an agent); `flint ite arrange "<program>" [--in <id>] [--all]` (only when a person asks) |
| Read or change the drawings | `flint ite drawing list "<program>" [--layer <id>\|root]`; `flint ite drawing add "<program>" --kind rect\|ellipse\|diamond\|text\|frame --at <x>,<y> [--size <w>,<h>] [--text "<t>"]` (a line: `--kind line --from-node <id> --to-node <id>`); `drawing set "<program>" <drawing id> ...`; `drawing remove "<program>" <drawing id>` (at once, also for an agent; a drawing is not structure) |
| Check the map | `flint ite map check "<program>"`, `flint ite map coverage "<program>"`, `flint ite check "<program>"` (the findings of the modules that are on; `--all` gives each finding) |
| The check after a product task | [[sk-ite-check_after_task]] |

A person only (an agent never runs these): `map change apply|revert`, `map change propose --apply`, `rename`, `archive`, `modules on|off`. The exit codes: 0 done; 1 a finding of the level error or a conflict; 2 a refusal of the input, and nothing was written.

## The Modules

The main map is the module `main-map`, and it is always on. `flint ite modules` shows each module and whether it is on (the key `modules` of the block `[ite]` of `flint.toml`). The later modules (`views`, `processes`, `data-claims`, `agents`, `loop`) exist in the code and are off by default: `flint ite --help` names them in one line. Only a person turns one on: `flint ite modules on <id>` `(a person)`. An agent gets `forbidden`.

## Read More

| When you | Read |
|---|---|
| Make a new program | [[wkfl-ite-program_create]] |
| Change the main map: draft level 1; take one part deeper; give one level a clearer shape; place the files that no part covers; update one part from its sources; add the parts that a person names | [[wkfl-ite-map_create]]; [[wkfl-ite-map_expand]]; [[wkfl-ite-map_refactor]]; [[wkfl-ite-map_cover]]; [[wkfl-ite-map_update]]; [[wkfl-ite-parts_add]] |
| Write a root note, a part, a type, or a template; read the places, the drawings, and the quality rules | [[knw-ite-programs]]; the forms [[tmp-ite-program-v0.1]], [[tmp-ite-part-v0.1]], [[tmp-ite-template-v0.1]] |
| Need a term, a folder, or a command that this file does not name | [[knw-ite-reference]] |

# Headless

A headless or subagent Orbh session has no person at the terminal. It loads this init with `flint shard start ite`. The rules above apply with no change. Follow the `> [!headless]` callouts of the workflows.

1. **Show progress.** Set the phase at the start of each stage: `flint orbh session set phase <phase>`. Each workflow names its phases.
2. **Ask no question.** When the instructions are not clear, select the reading that best helps the person, and write it in your result.
3. **Propose; do not decide.** Each change of the main map is one map change that waits for the person. An agent's `part add`, `part remove`, `part set`, and `link` are proposals too. Never apply, revert, or discard the map change that you return. A place and a drawing are not structure: `flint ite place` and `drawing` apply at once. Never write `State/main.json` with your own tools.
4. **Stay inside your work.** Change only the program that your prompt names. Commit only when your prompt says so, with only your own paths.

## Before You Return

- [ ] Each map change: `flint ite map change show "<program>" <change id> --json` shows `change.state` = `proposed`, an empty `preview.conflicts`, and no new finding of the level error in the tree after.
- [ ] `flint ite map check "<program>"` gives no new error for a part that you changed.

Then return as your prompt says. When the prompt gives no shape, return Markdown with these lines:

```
PROGRAM: <name> (<template>): <purpose>
PROPOSED: <each map change id, with the count of each operation>
WAITS FOR YOU: flint ite map change apply "<program>" <change id>   (one line for each change)
GAPS: <what you did not know, and the question for the person>
```
