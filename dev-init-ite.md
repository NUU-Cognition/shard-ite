---
description: "The Integrated Thinking Environment, short: the four kernel words, the rules that an agent follows, how to build a program end to end, the forms on one screen, the map from each job to its command, and which knowledge file to read for which job"
---

# ITE

The ITE (Integrated Thinking Environment) lets a person model a **system** of any kind as a **program**, see it on a canvas, check it against reality, and run it. Software is a system. A weekly meeting, an event of a club, a process of a business, and a research are systems too.

The surface for a person is the **Workbench** of Steel (the page `/ite`). This shard gives the agent side. The command is `flint ite`: with no verb, it shows the programs and what waits for a person. Each verb takes `--json`, and `flint ite <verb> --help` gives the flags and one example. `flint ite --help` groups the verbs by job. The meaning is in the Mesh, the machinery is in `Steel/`, and the facts of this machine are in `.flint/steel/`.

Read this file first. It is enough to start. For a job with a workflow, read that workflow and the template of each file that you write. Read a knowledge file only when a step needs more than this file, the workflow, and the template give. When `flint shard hstart ite` says that the build is stale, go on with the build: the source changed after it, and a person builds it again. The CLI is the truth: check a form with `--help`.

## The Kernel

Four words describe each system. Use them with a person, together with the words of each type (a guest, an agenda, a release). Do not add a new word that a person must learn.

| Word | What it is | In the ITE |
|---|---|---|
| Model | What the system is, and what must be true now | The root note and its **parts** (Mesh notes of a type; the tree of the parts is the **main map**), **pointer parts** (a part with `points-to`), **views**, **future notes** (the plan of the model), the statement of each **claim** (a test of reality), and **instruction maps** |
| Process | Everything that executes | A **process** (code, an agent, or a person). Its job comes from its links: a **check** keeps a claim, a **maker** keeps a data item, a **keeper** keeps a model note, and a **worker** keeps nothing. A **recipe** is a shared process of this shard. A large process has an **instruction map** of steps; a **run** walks it. The plan of a process is its **draft** version (`dev/`). |
| Data | What the system holds and measures | A **data note** (`data.md`: the meaning and the shape), and the state: values, verdicts, runs, places, proposals, enables, and approvals |
| Event | What happened | One line of the event log, through one door: `flint ite event emit`. A **trigger** of a process (manual, a schedule, or an event) starts it. |

A **proposal** is how a change reaches a person: a map change, a view candidate, a revision, a realize of a future note, or a promote of a draft. It is not a kernel word.

Each relation is written at one end only. A note names its keeper with `kept-by` (a claim names its check, a data note names its maker, a part names its keeper or inherits the keeper of its parent); the process document computes the other end (`keeps` and `jobs`). A process names the data that it reads with `reads`. A process has no `writes`: only the keeper of a data item writes its values.

```
event in → route by "about" → a trigger of a process (code, an agent, or a person)
   → a proposal or an effect → a person applies → the data changes → the checks judge → the pulse → the person
```

## The Rules

1. **An agent proposes. Only a person decides.** Only a person applies (a map change, a revision, a realize, a promote), reverts, approves, refuses, enables, accepts a view, and removes, renames, or archives a program or a view. The engine refuses an agent with `forbidden`. In an Orbh session, a `Next:` line that only a person may run ends with `(a person)`: name it for the person in your result, and never run it. Write each reason so that the person can apply it in one click.
2. **One writer of the structure.** The main map changes only through a map change (`flint ite part add`, `part remove`, `map change propose`, `map split|move|rename|merge`). Never write the `parent`, the title, or the `(Type)` word of a part with your own tools.
3. **An agent changes a view only through a candidate**, and never applies it.
4. **Only commands write facts.** A program holds meaning: parts, prose, links, views, claims, data files, processes, maps. It never holds a result, a state, a finding, a position, or a presence. The saved place of a card is in `State/main.json`: `flint ite place` and `flint ite arrange` write it at once (The Places of the Main Map in [[knw-ite-programs]]). Send a result through the one door: `flint ite claim report`. Never write the log, `Runs/`, the agent log, or a map change or a revision in `Proposals/` by hand. A view candidate is the one file of `Proposals/` that an agent writes ([[wkfl-ite-view]], [[wkfl-ite-reshape]]).
5. **Write through `flint ite`** each time a command exists, so that the person sees your change in the activity of the Workbench.
6. **Test before you hand over.** `flint ite claim test`, `process test`, and `data test` run the code one time and write nothing. Never leave a check, a process, or a maker that you did not test.
7. **Read before you run.** Never run code that you did not read. Never run a process (`process run`, `flow start`) unless the person asks for exactly that: a process can change the world.
8. **Never invent.** No invented id, path, URL, story id, part, or type. Say a gap in the prose: "Nobody knows this yet."
9. **The words of the person.** Prose first: one to three short paragraphs for each part. A title of two to six words. A level of the main map holds 3 to 9 parts. The full quality rules are in [[knw-ite-programs]].
10. **Simplified Technical English.** Short sentences, active voice, one term for one thing.

## Where Things Live

```
Mesh/Programs/(Program) <Name>/(Program) <Name>.md       the root note (steel-program/1)
Mesh/Programs/(Program) <Name>/Map/(Program) <Name> . (<Type>) <Title>.md   a part
Steel/Programs/<Name>/Data/<id>/data.md                  a data note (steel-data/2) and its native store
Steel/Programs/<Name>/Reality/<id>/claim.md              a claim (steel-claim/2): only the statement
Steel/Programs/<Name>/Processes/<id>/process.md          a process (steel-process/1) and its code: each check (check-<claim id>), each maker (make-<data id>), each keeper, and each worker
Steel/Programs/<Name>/Processes/<id>/map.md              its instruction map (steel-flow/1)
Steel/Programs/<Name>/Processes/<id>/dev/                its draft version (only a person runs it and promotes it)
Steel/Programs/<Name>/Views/(View) <Title>.md            a view (steel-view/1)
Steel/Programs/<Name>/Proposals/  Runs/  History/  State/   only the engines write here (an agent writes a view candidate)
Steel/Recipes/<id>/process.md                            a recipe: a shared process of this shard (the shard writes it; never edit it)
.flint/steel/                                            the facts of this machine: logs, snapshots, events, enables, runs
```

A part is a part when its `parent` chain reaches the root note. Its identity is its frontmatter `id`, not its folder. A reference names one element: a part is its id; the others are `claim:<id>`, `process:<id>`, `process:<id>#<node>`, `data:<id>`, `data:<id>#<output>`, and `view:<id>`. A keeper is `process:<id>` in `kept-by`; a part with no `kept-by` uses the keeper of its parent, up to the root note, and the root uses `process:keep-map-true`.

## Build a Program End to End

Example: "Make a program for my weekly team meeting, with a process that sends the agenda each Monday, and a claim that the agenda exists." The full workflow is [[wkfl-ite-program_create]] (headless: [[hwkfl-ite-program_create]]).

1. **Purpose and template.** `flint ite create "Weekly Team Meeting" --purpose "<one sentence: what the system is, and why>" [--template organisation]`. With no `--template`, the template is a guess from the purpose (`flint ite templates` lists the templates of this Flint, with the six that the shard installs: `organisation` for a team and its meetings, `process` for repeated work of a business, `event`, `research`, `software`, `general`). Each new program gets the process `keep-map-true` (`recipe: keep-map-true`: the agent of the program keeps the map true after each event, and it is the keeper of the root note; it is not enabled) and a starter kit of its template: one piece of data, one code process that runs at once, and one claim with its code check that reads the data (for an organisation: the data `next-meeting`, the process `days-until-meeting`, and the claim `next-meeting-ahead`; a process template gets the runs of `keep-map-true`; a software template gets the newest commit). Read the kit with `flint ite process list`, `flint ite data list`, and `flint ite claim list` before you add your own: use it where it fits, and change it with `process set`.
2. **The first map, as a proposal.** Propose 3 to 9 parts in one map change:
   `echo '[{"op":"add","title":"Monday agenda","kind":"ritual","parent":null,"sentence":"<one sentence>"}, ...]' | flint ite map change propose "Weekly Team Meeting" --ops - --reason "<one sentence>"`
   Read the preview with `flint ite map change show "<program>" <change id>`. A person applies it. The operations are in the table "The Operations of a Map Change" below.
3. **Data.** One command writes each piece of data that the system holds or measures, and its maker:
   `flint ite data new "<program>" agenda-topics --by person --task "What topics go on the agenda this week?" --fresh-for 7d` (a person gives the value when Steel asks: the command writes the data note and its maker `make-agenda-topics`).
   `--source command:<line>|url:<url>|path:<file>` with `--by code` makes external data and a maker that pulls it, `--by code --reads data:<id>` a calculated value, and `--value` a value now (no maker). Test each maker with `flint ite data test "<program>" <id>`, then pull it one time with `flint ite data pull "<program>" <id>` (a test writes nothing). A value of a person shows as `pending` in `flint ite data list`.
4. **Processes.** One command writes a process with its trigger, its data, and a stub of code that runs at once:
   `flint ite process new "<program>" send-agenda --by code --task "Send the agenda to the team" --reads data:agenda-topics --cron "0 8 * * 1" --irreversible`
   A process has no `writes`. A value or a table that a process writes names that process as its keeper: `flint ite data new "<program>" agenda --table week:date sent_at:date --key week --kept-by process:send-agenda` (write the process first). A starter writes a process that runs at once: `flint ite process starters`, then `--starter <name>`. A recipe gives a shared process: `--recipe <id>`. Then write the work (the code, the `prompt`, or the `task`), name the claim of step 5 with `flint ite process set "<program>" send-agenda --effect agenda-exists`, and run `flint ite process check "<program>" send-agenda` and `flint ite process test "<program>" send-agenda` (`--dry` for an agent process or an irreversible process). Follow [[sk-ite-process_new]]. For steps in order, follow [[sk-ite-workflow_new]] (`flint ite flow new "<program>" <id> --steps "<step>; <step>"`).
5. **Claims.** A claim says what must be true now. It never states a goal, a target with a date, or a prediction. One command writes a claim and its check:
   `flint ite claim new "<program>" agenda-exists --about data:agenda --title "The agenda of this week exists" --by code --reads data:agenda --cron "30 8 * * 1"`
   `--about` takes a part (its id or its title), `root`, `data:<id>`, `process:<id>`, or `view:<id>`. The command writes `Reality/agenda-exists/claim.md` and the check process `check-agenda-exists` as a draft (`Processes/check-agenda-exists/dev/`), with a stub `check.js` that gives `error` until you write the test. Write it, then `flint ite claim test "<program>" agenda-exists`. Propose the promote: `flint ite process promote "<program>" check-agenda-exists`. The claim counts only after a person applies the promote. A claim names no fix: when the world must change after a failure, give the process that repairs it the trigger `--on claim.failed --on-about claim:agenda-exists`; with no such process, the keeper of the part proposes a change of the model.
6. **The plan.** A person decides the plan. Write a future note only in a session that a person drives, or when the prompt of a builder asks for it: `flint ite plan add "<program>" --of <part> --change change --append "<the change in one sentence>"` (the future starts as the true note). A future note has no state. It needs a part that exists, so write it after the first apply. A job agent and an engine agent write no future note: they name it in the result. The keeper reports progress with a realize proposal (`flint ite plan realize`, full or partial); a person applies it.
7. **Check.** `flint ite check "<program>"` (no new error finding) and `flint ite pulse "<program>"`.
8. **Living (when the person wants a brief).** Write the full root note with one `system` block (owners, boundary, attention, authority, and governor; no `goals`; the form is in [[tmp-ite-program-v0.1]]), and propose it: `flint ite revision propose "<program>" --kind system --target "<root note file>" --content-file <file> --reason "<text>"`. A person applies it with `flint ite revision apply "<program>" <id> --protected`. Then `flint ite brief "<program>"` works.
9. **Hand over.** End with the list of what only the person does, each as one command: `flint ite map change apply "<program>" <change id>`, `flint ite revision apply "<program>" <id>` (the promote of each check), `flint ite revision apply "<program>" <id> --protected` (step 8), `flint ite process set "<program>" <id> --run-by agent` (only for a process that an agent must start), and `flint ite enable "<program>" --all` (each process that is off and has no problem; or `flint ite enable "<program>" <process id>`, which enables each trigger of that process).

## The Forms on One Screen

Each form has a template with complete examples: [[tmp-ite-data-v0.1]], [[tmp-ite-process-v0.1]], [[tmp-ite-claim-v0.1]]. The forms of the example tell one story: a person writes the topics, the process sends the agenda and writes it to a table that it keeps, and the check of the claim reads the table.

```yaml
# Data/agenda-topics/data.md: a value that a person gives when Steel asks
format: steel-data/2
id: agenda-topics
fresh-for: 7d
kept-by: "process:make-agenda-topics"   # its maker: the one writer of its values
# External data adds source: { path | url | command | ref }, and its maker is code that pulls it
```

```yaml
# Processes/make-agenda-topics/process.md: the maker (a person)
format: steel-process/1
id: make-agenda-topics
by: person                      # code (runtime, entry) | agent (prompt) | person (task, who)
task: "What topics go on the agenda this week?"   # the person writes the value in Steel
```

```yaml
# Data/agenda/data.md: a table that the process send-agenda keeps
format: steel-data/2
id: agenda
map: table
shape:
  - { name: week, kind: date, key: true }
  - { name: sent_at, kind: date }
kept-by: "process:send-agenda"
```

An agent can make native data too: a maker `by: agent` with a `prompt` (no `source` on the data note), for example a table of the open items of the reports. It reports the rows through the door with `flint ite data report "<program>" <id> --rows <file> --how replace`.

```yaml
# Processes/send-agenda/process.md: it keeps the table agenda, so its job is maker
format: steel-process/1
id: send-agenda
by: code
runtime: node                   # code: node | python | exec
entry: index.js                 # prints {"data":{"id":"agenda","rows":[...],"how":"append"}} and {"output":{...}}
about: ["data:agenda"]          # what it acts on (references)
reads: ["data:agenda-topics"]   # the data that it reads (STEEL_DATA)
effect: [agenda-exists]         # the claims that show that the work worked
trigger: { cron: "0 8 * * 1" }  # manual | { every: 1h } | { cron } | { on: event, kinds: [...], about: [...] } | a list
authority: { approve: true, irreversible: true }   # --irreversible writes this: it sends outside this machine, so a person approves each run
```

```yaml
# Reality/agenda-exists/claim.md: what must be true now (the keys are exactly format, id, about, kept-by, owner, fresh-for)
format: steel-claim/2
id: agenda-exists
about: ["data:agenda"]
kept-by: "process:check-agenda-exists"   # its check
```

```yaml
# Processes/check-agenda-exists/process.md: the check (it only reads)
format: steel-process/1
id: check-agenda-exists
by: code                        # code | agent | person (a person check: task "Is this true now: <the claim>?")
runtime: node
entry: check.js                 # prints {"state":"holds|fails|error","summary":"..."}: holds when a row of this week exists
reads: ["data:agenda"]
trigger: { cron: "30 8 * * 1" }
```

**When a claim fails, the links say which side changes.** A process with the trigger `{ on: event, kinds: [claim.failed], about: ["claim:<id>"] }` repairs the world: the brief says "repair by <process>". With no such process, the keeper of the first part of `about` proposes a change of the model: the brief says "change the model: <keeper>".

`authority.run` names who may start a process: `person:<Name>`, `person:*`, `agent:*`, or `agent:<target>` With no `authority`, the owners of the system (else the person of this machine) may start it, and an agent may not. Only a person gives agents a run right: `flint ite process set "<program>" <id> --run-by agent`. The engine refuses `--run-by` from an agent on each path (`process new`, `process set`, `flow new`), so an agent names this command for the person in its result. A person gives `agent:*` only to a process that changes nothing outside this Flint.

Only a process has a trigger, and a trigger runs only on a machine where a person enabled its process. With no enable, a person runs the process with Run now (Check now for a check).

### The Operations of a Map Change

`--ops` takes one JSON array. The operations apply in order. A part is its id, its note name, or a unique title; `parent: null` is the root; `kind` is a type id.

| Operation | The JSON |
|---|---|
| `add` | `{"op":"add","title":"<t>","kind":"<type id>","parent":"<part or null>","sentence":"<s>","prose":"<optional>","sources":["..."],"id":"<optional uuid>","fields":{"points-to":"<optional: process:<id>, data:<id>, or view:<id>>","kept-by":"<optional: process:<id>>"}}` |
| `move` | `{"op":"move","part":"<part>","parent":"<part or null>"}` |
| `split` | `{"op":"split","parent":"<part or null>","subsystem":{"title":"<t>","kind":"<type id>","sentence":"<s>"},"children":["<part>"]}` |
| `merge` | `{"op":"merge","from":"<part>","into":"<part>"}` |
| `rename` | `{"op":"rename","part":"<part>","title":"<new title>","kind":"<optional type id>"}` |
| `remove` | `{"op":"remove","part":"<part>"}` (its children move up one level) |
| `edit` | `{"op":"edit","part":"<part>","sentence":"<s>","prose":"<p>","sources":["<the whole new list>"],"fields":{"<key>":"<value>"}}` |

A map change cannot name a part that another waiting map change adds. So put a new subtree in one map change: give each new part an `id` (a UUID v4), and name it as the `parent` of its children.

## Jobs to Commands

`<program>` is the name or the id of a program. In an Orbh session the CLI acts as the agent, so a structure change is a proposal.

| To do this | Run this |
|---|---|
| See the programs, and what waits for a person | `flint ite` (no verb); `flint ite list` for the counts |
| Read one program first | `flint ite pulse "<program>"`, then `flint ite map "<program>"` (the tree with the id of each part); `flint ite pulse` with no program gives one line for each program |
| See the types and the templates | `flint ite types`, `flint ite templates` |
| See the jobs of a process (what it keeps) | `flint ite process show "<program>" <id>` (`keeps` and `jobs`: check, maker, keeper, or worker) |
| Make a program | `flint ite create "<name>" --purpose "<one sentence>" [--template <id>]` |
| Add one part | `flint ite part add "<program>" --kind <type id> --title "<title>" [--parent <part>] [--text "<text>"]` |
| Change many parts at once | `flint ite map change propose "<program>" --ops - --reason "<text>"` |
| Change the prose or a field of a part | `flint ite part set "<program>" <part> --text "<text>"` (a person: it writes at once; an agent: it proposes one map change that a person applies) |
| Link two parts | `flint ite link "<program>" <from> <to> --relation <key>` (a person: it writes at once; an agent: it proposes one map change that a person applies) |
| See what waits for a person | `flint ite waiting` (all programs: runs, checks, values, claims that fail, and proposals, the most urgent first); `flint ite proposals ["<program>"]` (the map changes, the revisions, and the view candidates, the oldest first) |
| Add a claim and its check | `flint ite claim new "<program>" <id> --about <ref>... --title "<title>" --by code\|agent\|person [--runtime] [--reads <ref>...] [--prompt] [--task] [--who] [--every\|--cron\|--on <kind> [--on-about <ref>]] [--fresh-for]` (the check starts as a draft; `process promote "<program>" check-<id>` proposes it for a person) |
| Give an old program the standing process | `flint ite process new "<program>" keep-map-true --recipe keep-map-true --on task.finished --on commit.landed` |
| Test and run a check | `flint ite claim test "<program>" <claim> [--data data:<id>=<json>]`, `flint ite claim check "<program>" <claim> [--strict]` (`--strict` exits 1 when the result fails or gives error) |
| Report a result that you saw | `flint ite claim report "<program>" <claim> --state holds\|fails\|error --summary "<text>"` |
| Add data and its maker | `flint ite data new "<program>" <id> [--source <kind:value> \| --value <v> \| --table ...] [--kept-by process:<id> \| --by code\|agent\|person [--reads data:<id>...] [--task "<question>"] [--every\|--cron]] [--fresh-for] [--history]` |
| Read, test, or pull data | `flint ite data list\|show\|test\|pull "<program>" [<id>]` |
| Report a value or rows of data (an agent or a person maker) | `flint ite data report "<program>" <id> --value <json>`, or `--rows <file> --how replace\|append` |
| Add a process | `flint ite process new "<program>" <id> --by code\|agent\|person --task "<text>" [--reads] [--every\|--cron\|--on <kind> [--on-about <ref>] [--scope any]] [--irreversible]`, or `--starter <name>` (`flint ite process starters`), or `--recipe <id>` (a shared process of `Steel/Recipes/`) |
| Read a process in words before you change or run it | `flint ite process explain "<program>" <id>` |
| Change a process or a map | `flint ite process set "<program>" <id> [--task] [--reads] [--cron] ...`, `flint ite flow set "<program>" <id> --steps "<list>"` (only the keys that you give; a change with a problem writes nothing; the trigger flags replace each trigger: `--add-trigger` adds one and keeps the others, and `--remove-trigger <id>` removes one) |
| Check a process or a map (it runs nothing) | `flint ite process check "<program>" [<id>]`, `flint ite flow check "<program>" [<id>]` |
| Find processes | `flint ite process list "<program>" [--failing] [--waiting] [--enabled] [--never-ran] [--problems] [--by <form>]` |
| Test a process | `flint ite process test "<program>" <id> [--input k=v]... [--data data:<id>=<json>]... [--dry]` |
| Add an instruction map | `flint ite flow new "<program>" <process id> --steps "<step>; <step>"` (or `--from <file>`, or a ready map: `--starter <name>` from `flint ite flow starters`), then `flint ite flow check` |
| Start a run and follow it (a person asked) | `flint ite flow start "<program>" <process> --follow` (exit 0 done, 1 failed, 3 waits for a person), or `--to-end` (to the end, also through the waits of a person: exit 0 or 1) |
| See the runs | `flint ite flow runs ["<program>"] [--failed] [--waiting] [--since 2h]` (with no program: each program in one read), `flint ite flow status <run> [--follow]`, `flint ite process runs ["<program>"]` |
| Run again from the failed step (a person asked) | `flint ite flow retry <run> [--from <node>] [--input k=v] [--follow]` |
| See the triggers | `flint ite triggers ["<program>"] [--enabled]` (with no program: each trigger of this Flint, the enabled first with their next time) |
| Send an event | `flint ite event emit --kind <kind> [--path <file>]... [--ref <ref>]... --summary "<text>"` |
| Read and write the plan | `flint ite plan "<program>"`, `plan show`, `plan add`; `plan realize "<program>" <future id>` proposes one map change (full), and `--part -` proposes a partial realize (`{ "now", "rest" }` on stdin) |
| Make a draft version of a process | `flint ite process dev "<program>" <id>`; `process promote` proposes it |
| Make a program living | `flint ite revision propose "<program>" --kind system --target "<root note file>" --content-file <file> --reason "<text>"` |
| Give a job to an agent of a program and wait for it | `flint ite job "<program>" --action <id> [--node <id>...] [--text "<text>"] --wait [minutes]` (exit 0 done, 1 failed, 2 still works, 3 waits for a person; `flint ite actions` lists the actions) |
| Answer a question with a view | `flint ite job "<program>" --action view --text "<question>" --wait`, or [[wkfl-ite-view]] |
| Find all problems | `flint ite check ["<program>"]` (it runs nothing) |
| The check after a product task | [[sk-ite-check_after_task]] |
| Show where you work | `flint ite focus <node id>...` ([[sk-ite-focus]]) |

A person only (an agent never runs these): `map change apply|revert`, `apply --candidate`, `enable` (also `--all`), `disable`, `--run-by` (on `process new`, `process set`, `flow new`), `flow approve|refuse`, `process approve|refuse`, `revision apply|revert`, `view accept`, `view draft`, `view remove`, `rename`, `archive`, `agent dock`.

The exit codes: 0 done; 1 a finding of the level error, a conflict, or a run that failed or did not start (also a refusal of `process run`); 2 a refusal of the input, and nothing was written. The help of each verb names its exit codes.

## Read More

| When you | Read |
|---|---|
| Need a term, a folder, or a command that this file does not name | [[knw-ite-reference]]: the terms, the planes, the folders, and every command |
| Write a root note, a part, a map change, a view, a candidate, a map, or a type | [[knw-ite-programs]]: parts, types, the main map and the map change, views, maps, references, proposals, the quality rules |
| Write data, a maker, a claim, or a check | [[knw-ite-state]]: data and its modes, makers, data maps, claims, checks, which side changes when a claim fails, the one door, the grounding |
| Write a process, a trigger, or an instruction map, or act on a run | [[knw-ite-processes]]: the jobs, the keepers, recipes and starters, the three forms, the effect, the authority, the three trigger kinds and the events, the nodes, runs |
| Emit an event, write the plan, make a draft version, read a pulse, work in a living system, or do a job of the Workbench | [[knw-ite-loop]]: events, the agent of a program, the plan and the realize, draft versions, the pulse, living systems, agent sessions and jobs |
| Work on a program of the template `software` | [[knw-ite-software]]: code-refs, stories, the proof, the review, the check after a task |
| Run headless | [[hinit-ite]]: which kind of headless agent you are, and its rules and its result |

## Skills and Workflows

| File | Use it when |
|---|---|
| [[wkfl-ite-program_create]] | A person wants a new program, end to end: purpose, template, the first map, data, processes, claims and their checks, plan, and the enables and the promotes for the person |
| [[sk-ite-process_new]] | A person says one process in one sentence |
| [[sk-ite-workflow_new]] | A person gives the steps of a piece of work in order: one instruction map |
| [[wkfl-ite-model]] | A person wants the map of a system, or more parts on a map |
| [[wkfl-ite-map_create]], [[wkfl-ite-map_expand]], [[wkfl-ite-map_refactor]], [[wkfl-ite-map_cover]], [[wkfl-ite-map_update]], [[wkfl-ite-parts_add]] | One change of the main map: the first level, one part deeper, one level to the size limit, the gap files, one part from its sources, the parts that a person names |
| [[wkfl-ite-view]], [[wkfl-ite-reshape]] | A question with no view; a change of a view in words |
| [[wkfl-ite-claim_add]], [[wkfl-ite-ground]], [[wkfl-ite-observe]], [[wkfl-ite-repair]] | One claim with its tested check; the claims of parts; check the claims now; repair what fails or is old (the world or the model) |
| [[wkfl-ite-process_add]], [[wkfl-ite-flow_add]] | One process, or one instruction map, with the person at each stage |
| [[wkfl-ite-review]] | Nodes of a software program have `review-due` |
| [[sk-ite-check_after_task]] | A product task ends |
| [[sk-ite-focus]] | Each workflow: show the person which nodes you work on |

Each workflow has a headless form (`hwkfl-ite-<name>`). A job of the Workbench names its action, and each action is a recipe of `Steel/Recipes/` that names its workflow or gives its steps (`flint ite actions`). The templates of the files are `tmp-ite-<form>-v0.1`: program, part, view, map, claim, data, process, instruction_map, and template.
