---
description: "The Integrated Thinking Environment, short: the five kernel words, the rules that an agent follows, how to build a program end to end, the forms on one screen, the map from each job to its command, and which knowledge file to read for which job"
---

# ITE

The ITE (Integrated Thinking Environment) lets a person model a **system** of any kind as a **program**, see it on a canvas, check it against reality, and run it. Software is a system. A weekly meeting, an event of a club, a process of a business, and a research are systems too.

The surface for a person is the **Workbench** of Steel (the page `/ite`). This shard gives the agent side. The command is `flint ite`: with no verb, it shows the programs and what waits for a person. Each verb takes `--json`, and `flint ite <verb> --help` gives the flags and one example. `flint ite --help` groups the verbs by job. The meaning is in the Mesh, the machinery is in `Steel/`, and the facts of this machine are in `.flint/steel/`.

Read this file first. It is enough for most jobs. Read a knowledge file only when the table "Read More" sends you there.

## The Kernel

Five words describe each system. Use them with a person, together with the words of each type (a guest, an agenda, a release). Do not add a new word that a person must learn.

| Word | What it is | In the ITE |
|---|---|---|
| Thing | What the system is made of | A **part**: one Mesh note of a type, below the root note of the program. The tree of the parts is the **main map**. |
| State | What is true now | **Data** (a value, a table, a metric) and **claims** (what must be true, each with a check that judges `holds`, `fails`, or `error`) |
| Process | What changes state | A **process** (code, an agent, or a person). A large process has an **instruction map** of steps; a **run** walks it. |
| Event | What happened | One fact in time, through one door: `flint ite event emit`. A **trigger** (a schedule, a hook, an event) starts a process or a check. |
| Plan | What must be next | A **future note** beside the true note (`<name> . (Future) Next`) |

A **proposal** is how a change reaches a person: a map change, a view candidate, or a revision. It is not a kernel word.

Each piece of state names the process that makes it. Each process names the state that it reads (`reads`) and writes (`writes`).

```
event in → route by "about" → process (code, an agent, or a person)
   → a proposal or an effect → a person applies → the state changes → checks judge → the pulse → the person
```

## The Rules

1. **An agent proposes. Only a person decides.** Only a person applies, reverts, approves, refuses, enables, promotes, keeps or accepts a view, and removes, renames, or archives a program or a view. The engine refuses an agent with `forbidden`. Write each reason so that the person can apply it in one click.
2. **One writer of the structure.** The main map changes only through a map change (`flint ite part add`, `part remove`, `map change propose`, `map split|move|rename|merge`). Never write the `parent`, the title, or the `(Type)` word of a part with your own tools.
3. **An agent changes a view only through a candidate**, and never applies it.
4. **Only commands write facts.** A program holds meaning: parts, prose, links, views, claims, data files, processes, maps. It never holds a result, a state, a finding, a position, or a presence. Send a result through the one door: `flint ite claim report`. Never write the log, `Runs/`, `Proposals/`, or the agent log by hand.
5. **Write through `flint ite`** each time a command exists, so that the person sees your change in the activity of the Workbench.
6. **Test before you keep.** `flint ite claim test`, `process test`, and `data test` run the code one time and write nothing. Never keep a check, a process, or a reader that you did not test.
7. **Read before you run.** Never run code that you did not read. Never run a process (`process run`, `flow start`) unless the person asks for exactly that: a process can change the world.
8. **Never invent.** No invented id, path, URL, story id, part, or type. Say a gap in the prose: "Nobody knows this yet."
9. **The words of the person.** Prose first: one to three short paragraphs for each part. A title of two to six words. A level of the main map holds 3 to 9 parts. The full quality rules are in [[knw-ite-programs]].
10. **Simplified Technical English.** Short sentences, active voice, one term for one thing.

## Where Things Live

```
Mesh/Programs/(Program) <Name>/(Program) <Name>.md       the root note (steel-program/1)
Mesh/Programs/(Program) <Name>/Map/(Program) <Name> . (<Type>) <Title>.md   a part
Steel/Programs/<Name>/Data/<id>/data.md                  a piece of data (steel-data/1) and its code
Steel/Programs/<Name>/Reality/<id>/claim.md              a claim (steel-claim/1) and its check
Steel/Programs/<Name>/Processes/<id>/process.md          a process (steel-process/1) and its code
Steel/Programs/<Name>/Processes/<id>/map.md              its instruction map (steel-flow/1)
Steel/Programs/<Name>/Views/(View) <Title>.md            a view (steel-view/1)
Steel/Programs/<Name>/Proposals/  Runs/  History/  State/   only the engines write here
.flint/steel/                                            the facts of this machine: logs, snapshots, events, enables, runs
```

A part is a part when its `parent` chain reaches the root note. Its identity is its frontmatter `id`, not its folder. A reference names one element: a part is its id; the others are `claim:<id>`, `process:<id>`, `process:<id>#<node>`, `data:<id>`, `data:<id>#<output>`, and `view:<id>`.

## Build a Program End to End

Example: "Make a program for my weekly team meeting, with a process that sends the agenda each Monday, and a claim that the agenda exists." The full workflow is [[wkfl-ite-program_create]] (headless: [[hwkfl-ite-program_create]]).

1. **Purpose and template.** `flint ite create "Weekly Team Meeting" --purpose "<one sentence: what the system is, and why>" [--template organisation]`. With no `--template`, the template is a guess from the purpose (`flint ite templates` lists them: `organisation` for a team and its meetings, `process` for repeated work of a business, `event`, `research`, `software`, `general`). Each new program gets the process `keep-map-true`: the agent of the program keeps the map true after each event. It is not enabled.
2. **The first map, as a proposal.** Propose 3 to 9 parts in one map change:
   `echo '[{"op":"add","title":"Monday agenda","kind":"ritual","parent":null,"sentence":"<one sentence>"}, ...]' | flint ite map change propose "Weekly Team Meeting" --ops - --reason "<one sentence>"`
   Read the preview with `flint ite map change show "<program>" <change id>`. A person applies it. The operations are in the table "The Operations of a Map Change" below.
3. **State.** Write each piece of data that the system holds or measures: `Steel/Programs/<Name>/Data/<id>/data.md` from [[tmp-ite-data-v0.1]] (there is no `data new` verb). Test a reader or a maker with `flint ite data test "<program>" <id>`.
4. **Processes.** `flint ite process new "<program>" send-agenda --by code|agent|person --title "<title>" --about data:agenda` (a part id after the apply). Then write the trigger in `process.md` (`trigger: { cron: "0 8 * * 1" }`), the `reads`, the `writes`, the `effect`, and the code, the `prompt`, or the `task`. Test it with `flint ite process test "<program>" send-agenda` (add `--dry` for an agent process or an irreversible process). For one process from one sentence, follow [[sk-ite-process_new]]. For steps in order, follow [[sk-ite-workflow_new]].
5. **Claims.** `flint ite claim new "<program>" agenda-exists --about <part id> --mode ought --by code --title "<title>"`. Before the first apply there is no part: write `claim.md` by hand with `about: ["data:agenda"]`. Write `check.js`, add `fixed-by: [send-agenda]` and `reads`, then `flint ite claim test "<program>" agenda-exists` and `flint ite claim check "<program>" agenda-exists`.
6. **The plan.** `flint ite plan add "<program>" --of <part> --change change --text -` for each thing that must be different next.
7. **Check.** `flint ite check "<program>"` (no new error finding) and `flint ite pulse "<program>"`.
8. **Hand over.** End with the list of what only the person does, each as one command: `flint ite map change apply "<program>" <change id>`, `flint ite enable "<program>" send-agenda`, `flint ite enable "<program>" agenda-exists`, and `flint ite enable "<program>" keep-map-true`.

## The Forms on One Screen

Each form has a template with complete examples: [[tmp-ite-process-v0.1]], [[tmp-ite-claim-v0.1]], [[tmp-ite-data-v0.1]].

```yaml
# Processes/send-agenda/process.md
format: steel-process/1
id: send-agenda
by: code                        # code | agent (prompt:) | person (task:)
runtime: node                   # code: node | python | exec
entry: index.js
about: [<part id>]              # what it acts on (references)
reads: ["data:agenda-items"]    # the data it reads (STEEL_DATA)
writes: ["data:agenda"]         # the native data it may write
effect: [agenda-exists]         # the claims that show that the work worked
trigger: { cron: "0 8 * * 1" }  # manual | { every: 1h } | { cron } | { on: hook } | { on: event, kinds: [...] }
authority: { run: ["person:<Name>", "agent:*"], irreversible: false }   # who may start it; a send outside this machine: irreversible: true
```

```yaml
# Reality/agenda-exists/claim.md
format: steel-claim/1
id: agenda-exists
mode: ought                     # is (a description) | ought (a goal) | will (a prediction)
about: [<part id>]
reads: ["data:agenda"]
by: code                        # code | agent | person | none
entry: check.js                 # prints {"state":"holds|fails|error","summary":"...","values":{...}}
trigger: { every: 1d }
fixed-by: [send-agenda]         # the processes that can make an ought claim true
```

```yaml
# Data/agenda/data.md
format: steel-data/1
id: agenda
by: person                      # no source: native, and by is the maker (code | agent | person)
question: "What is on the agenda this week?"   # a person writes the value in Steel
fresh-for: 7d
# External data adds source: { path | url | command | ref } and a reader: by: code, entry: pull.js
```

A trigger runs only on a machine where a person enabled it. With no enable, a person runs the process with Run now.

### The Operations of a Map Change

`--ops` takes one JSON array. The operations apply in order. A part is its id, its note name, or a unique title; `parent: null` is the root; `kind` is a type id.

| Operation | The JSON |
|---|---|
| `add` | `{"op":"add","title":"<t>","kind":"<type id>","parent":"<part or null>","sentence":"<s>","prose":"<optional>","sources":["..."],"id":"<optional uuid>"}` |
| `move` | `{"op":"move","part":"<part>","parent":"<part or null>"}` |
| `split` | `{"op":"split","parent":"<part or null>","subsystem":{"title":"<t>","kind":"<type id>","sentence":"<s>"},"children":["<part>"]}` |
| `merge` | `{"op":"merge","from":"<part>","into":"<part>"}` |
| `rename` | `{"op":"rename","part":"<part>","title":"<new title>","kind":"<optional type id>"}` |
| `remove` | `{"op":"remove","part":"<part>"}` (its children move up one level) |
| `edit` | `{"op":"edit","part":"<part>","sentence":"<s>","prose":"<p>","sources":["<the whole new list>"]}` |

A map change cannot name a part that another waiting map change adds. So put a new subtree in one map change: give each new part an `id` (a UUID v4), and name it as the `parent` of its children.

## Jobs to Commands

`<program>` is the name or the id of a program. In an Orbh session the CLI acts as the agent, so a structure change is a proposal.

| To do this | Run this |
|---|---|
| See the programs, and what waits for a person | `flint ite` (no verb); `flint ite list` for the counts |
| Read one program first | `flint ite pulse "<program>"`, then `flint ite map tree "<program>"` |
| See the types and the templates | `flint ite types`, `flint ite templates` |
| Make a program | `flint ite create "<name>" --purpose "<one sentence>" [--template <id>]` |
| Add one part | `flint ite part add "<program>" --kind <type id> --title "<title>" [--parent <part>] [--text "<text>"]` |
| Change many parts at once | `flint ite map change propose "<program>" --ops - --reason "<text>"` |
| Change the prose or a field of a part | `flint ite part set "<program>" <part> --text "<text>"` |
| Link two parts | `flint ite link "<program>" <from> <to> --relation <key>` |
| See the waiting map changes | `flint ite map change list "<program>" --state proposed` |
| Add a claim | `flint ite claim new "<program>" <id> --about <part> --mode is\|ought\|will --by code\|agent\|person\|none --title "<title>"` |
| Test and run a check | `flint ite claim test "<program>" <claim>`, `flint ite claim check "<program>" <claim>` |
| Report a result that you saw | `flint ite claim report "<program>" <claim> --state holds\|fails\|error --summary "<text>"` |
| Read, test, or pull data | `flint ite data list\|show\|test\|pull "<program>" [<id>]` |
| Report a value of data (an agent reader) | `flint ite data report "<program>" <id> --value <json>` |
| Add a process | `flint ite process new "<program>" <id> --by code\|agent\|person --title "<title>" --about <ref>` |
| Test a process | `flint ite process test "<program>" <id> [--input k=v]... [--dry]` |
| Add an instruction map | `flint ite flow new "<program>" <process id> --title "<title>"`, then `flint ite flow show "<program>" <process id>` |
| Start a run and follow it (a person asked) | `flint ite flow start "<program>" <process> --follow` (exit 0 done, 1 failed, 3 waits for a person) |
| See the runs | `flint ite flow runs "<program>"`, `flint ite flow status <run> [--follow]`, `flint ite process runs "<program>"` |
| See the triggers | `flint ite triggers "<program>"` |
| Send an event | `flint ite event emit --kind <kind> [--path <file>]... [--ref <ref>]... --summary "<text>"` |
| Read and write the plan | `flint ite plan "<program>"`, `plan add`, `plan set`; `plan realize` proposes one map change |
| Make a dev version of a process | `flint ite process dev "<program>" <id>`; `process promote` proposes it |
| Answer a question with a view | `flint ite job "<program>" --action view --text "<question>"`, or [[wkfl-ite-view]] |
| Find all problems | `flint ite check ["<program>"]` (it runs nothing) |
| The check after a product task | [[sk-ite-check_after_task]] |
| Show where you work | `flint ite focus <node id>...` ([[sk-ite-focus]]) |

A person only (an agent never runs these): `map change apply|revert`, `apply --candidate`, `enable`, `disable`, `flow approve|refuse`, `process approve|refuse`, `revision apply|revert`, `view set`, `view remove`, `rename`, `archive`, `agent dock`.

The exit codes: 0 done; 1 a finding of the level error, or a conflict; 2 a refusal, and nothing was written.

## Read More

| When you | Read |
|---|---|
| Need a term, a folder, or a command that this file does not name | [[knw-ite-reference]]: the terms, the planes, the folders, and every command |
| Write a root note, a part, a map change, a view, a candidate, a map, or a type | [[knw-ite-programs]]: parts, types, the main map and the map change, views, maps, references, proposals, the quality rules |
| Write data, a reader, a maker, a claim, or a check | [[knw-ite-state]]: data and its modes, data maps, claims, checks, the one door, the grounding |
| Write a process, a trigger, or an instruction map, or act on a run | [[knw-ite-processes]]: the three forms, the effect, the authority, triggers and enables, the nodes, runs |
| Emit an event, write the plan, make a dev version, read a pulse, work in a living system, or do a job of the Workbench | [[knw-ite-loop]]: events, the agent of a program, the plan, dev versions, the pulse, living systems, agent sessions and jobs |
| Work on a program of the template `software` | [[knw-ite-software]]: code-refs, stories, the proof, the review, the check after a task |
| Run headless | [[hinit-ite]]: which kind of headless agent you are, and its rules and its result |

## Skills and Workflows

| File | Use it when |
|---|---|
| [[wkfl-ite-program_create]] | A person wants a new program, end to end: purpose, template, the first map, state, processes, claims, plan, and the enables for the person |
| [[sk-ite-process_new]] | A person says one process in one sentence |
| [[sk-ite-workflow_new]] | A person gives the steps of a piece of work in order: one instruction map |
| [[wkfl-ite-model]] | A person wants the map of a system, or more parts on a map |
| [[wkfl-ite-map_create]], [[wkfl-ite-map_expand]], [[wkfl-ite-map_refactor]], [[wkfl-ite-map_cover]], [[wkfl-ite-map_update]], [[wkfl-ite-parts_add]] | One change of the main map: the first level, one part deeper, one level to the size limit, the gap files, one part from its sources, the parts that a person names |
| [[wkfl-ite-view]], [[wkfl-ite-reshape]] | A question with no view; a change of a view in words |
| [[wkfl-ite-claim_add]], [[wkfl-ite-ground]], [[wkfl-ite-observe]], [[wkfl-ite-repair]] | One claim with a tested check; the claims of parts; check the claims now; repair what fails or is old |
| [[wkfl-ite-process_add]], [[wkfl-ite-flow_add]] | One process, or one instruction map, with the person at each stage |
| [[wkfl-ite-review]] | Nodes of a software program have `review-due` |
| [[sk-ite-check_after_task]] | A product task ends |
| [[sk-ite-focus]] | Each workflow: show the person which nodes you work on |

Each workflow has a headless form (`hwkfl-ite-<name>`). A job of the Workbench names its action, and each action has its workflow (`flint ite actions`). The templates of the files are `tmp-ite-<form>-v0.1`: program, part, view, map, claim, data, process, instruction_map, and template.
