---
description: "The Integrated Thinking Environment, short: the four kernel words, the rules that an agent follows, how to build a program end to end, the forms on one screen, the map from each job to its command, which knowledge file to read for which job, and the section Headless: which kind of headless agent you are, its rules, and its result"
---

# ITE

The ITE (Integrated Thinking Environment) lets a person model a **system** of any kind as a **program**, see it on a canvas, check it against reality, and run it. Software is a system. A weekly meeting, an event of a club, a process of a business, and a research are systems too.

The surface for a person is the **Workbench** of Steel (the page `/ite`). This shard gives the agent side. The command is `flint ite`: with no verb, it shows the programs and what waits for a person. Each verb takes `--json`, and `flint ite <verb> --help` gives the flags and one example. `flint ite --help` groups the verbs by job. The meaning is in the Mesh, the machinery is in `Steel/`, and the facts of this machine are in `.flint/steel/`.

> [!headless]
> A headless or subagent Orbh session: read the section `# Headless` at the end of this file too. It says which kind of headless agent you are, and your rules and your result.

Read this file first. It is enough to start. For a job with a workflow, read that workflow and the template of each file that you write. Read a knowledge file only when a step needs more than this file, the workflow, and the template give. When `flint shard start ite` says that the build is stale, go on with the build: the source changed after it, and a person builds it again. The CLI is the truth: check a form with `--help`.

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
9. **The words of the person.** Prose first: one to three short paragraphs for each part. A title of two to six words. A level of the main map has no size limit. The full quality rules are in [[knw-ite-programs]].
10. **Simplified Technical English.** Short sentences, active voice, one term for one thing.
11. **Folders are for a person.** An agent moves an item or a folder only when a person asks for it (`flint ite move`, `flint ite folder`). A folder has no meaning: no rule, count, trigger, or reference uses it.

## Where Things Live

```
Mesh/Programs/(Program) <Name>/(Program) <Name>.md       the root note (steel-program/1)
Mesh/Programs/(Program) <Name>/Map/(Program) <Name> . (<Type>) <Title>.md   a part
Steel/Programs/<Name>/Data/<id>/data.md                  a data note (steel-data/2) and its native store
Steel/Programs/<Name>/Reality/<id>/claim.md              a claim (steel-claim/2): only the statement
Steel/Programs/<Name>/Processes/<id>/process.md          a process (steel-process/1) and its code: each check (check-<claim id>), each maker (make-<data id>), each keeper, and each worker
Steel/Programs/<Name>/Processes/<id>/map.md              its instruction map (steel-flow/1)
Steel/Programs/<Name>/Processes/<id>/dev/                its draft version (only a person runs it and promotes it)
Steel/Programs/<Name>/Processes/<folder>/<id>/          the same item in a folder of the sidebar (also Data/<folder>/ and Reality/<folder>/)
Steel/Programs/<Name>/Views/(View) <Title>.md            a view (steel-view/1)
Steel/Programs/<Name>/Proposals/  Runs/  History/  State/   only the engines write here (an agent writes a view candidate)
Steel/Recipes/<id>/process.md                            a recipe: a shared process of this shard, with its code files when it has code (the shard writes it; never edit it)
.flint/steel/                                            the facts of this machine: logs, snapshots, events, enables, runs
```

A part is a part when its `parent` chain reaches the root note. Its identity is its frontmatter `id`, not its folder. A reference names one element: a part is its id; the others are `claim:<id>`, `process:<id>`, `process:<id>#<node>`, `data:<id>`, `data:<id>#<output>`, and `view:<id>`. A keeper is `process:<id>` in `kept-by`; a part with no `kept-by` uses the keeper of its parent, up to the root note, and the root uses `process:keep-map-true`.

A person groups the processes, the data, and the claims into nested **folders** under `Processes/`, `Data/`, and `Reality/`. A folder that holds `process.md` (or `dev/process.md`), `data.md`, or `claim.md` is an item; each other folder there is a folder of the sidebar. The id of an item is the name of its folder, and it is unique for each kind across all folders. A reference never holds a folder, and a move changes no reference. The details are in "Folders" in [[knw-ite-processes]].

## Build a Program End to End

Example: "Make a program for my weekly team meeting, with a process that sends the agenda each Monday, and a claim that the agenda exists." The full workflow is [[wkfl-ite-program_create]] (in a headless session, with its `> [!headless]` callouts).

1. **Purpose and template.** `flint ite create "Weekly Team Meeting" --purpose "<one sentence: what the system is, and why>" [--template organisation]`. With no `--template`, the template is a guess from the purpose (`flint ite templates` lists the templates of this Flint, with the six that the shard installs: `organisation` for a team and its meetings, `process` for repeated work of a business, `event`, `research`, `software`, `general`). Each new program gets the process `keep-map-true` (`recipe: keep-map-true`: the agent of the program keeps the map true after each event, and it is the keeper of the root note; it is not enabled) and a starter kit of its template: one piece of data, one code process that runs at once, and one claim with its code check that reads the data (for an organisation: the data `next-meeting`, the process `days-until-meeting`, and the claim `next-meeting-ahead`; a process template gets the runs of `keep-map-true`; a software template gets the newest commit). Read the kit with `flint ite process list`, `flint ite data list`, and `flint ite claim list` before you add your own: use it where it fits, and change it with `process set`.
2. **The first map, as a proposal.** Propose the parts of level 1 in one map change:
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
8. **The system (only when the defaults do not fit).** Each program is a living system: `flint ite brief "<program>"` works at once. The `system` block of the root note is optional, and each key has a default (the owners are the `authors` of the root note, the timezone is UTC). To change a key, write the full root note with one `system` block (owners, boundary, attention, authority, and governor; no `goals`; the form is in [[tmp-ite-program-v0.1]]), and propose it: `flint ite revision propose "<program>" --kind system --target "<root note file>" --content-file <file> --reason "<text>"`. A person applies it with `flint ite revision apply "<program>" <id> --protected`.
9. **Hand over.** End with the list of what only the person does, each as one command: `flint ite map change apply "<program>" <change id>`, `flint ite revision apply "<program>" <id>` (the promote of each check), `flint ite revision apply "<program>" <id> --protected` (step 8, when you wrote it), `flint ite process set "<program>" <id> --run-by agent` (only for a process that an agent must start), and `flint ite enable "<program>" --all` (each process that is off and has no problem; or `flint ite enable "<program>" <process id>`, which enables each trigger of that process).

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
| Add a claim and its check | `flint ite claim new "<program>" <id> --about <ref>... --title "<title>" --by code\|agent\|person [--runtime] [--reads <ref>...] [--prompt] [--task] [--who] [--every\|--cron\|--on <kind> [--on-about <ref>]] [--fresh-for] [--folder <path>]`, or `--recipe <id>` in place of the check flags (a check of a recipe: `orbtest-proof`, `review-current`, `source-unchanged`; no code of its own) (the check starts as a draft; `process promote "<program>" check-<id>` proposes it for a person) |
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
| Find processes | `flint ite process list "<program>" [--failing] [--waiting] [--enabled] [--never-ran] [--problems] [--by <form>] [--folder <path>]` |
| Put an item in a folder (only when a person asks) | `flint ite move "<program>" <process:id \| data:id \| claim:id> --to "<path>"` (`--to ""` is the top); `flint ite folder list\|new\|rename\|move\|remove "<program>" ...`; `--folder <path>` on `process new`, `data new`, `claim new`, and `flow new` |
| Test a process | `flint ite process test "<program>" <id> [--input k=v]... [--data data:<id>=<json>]... [--dry]` |
| Add an instruction map | `flint ite flow new "<program>" <process id> --steps "<step>; <step>"` (or `--from <file>`, or a ready map: `--starter <name>` from `flint ite flow starters`), then `flint ite flow check` |
| Start a run and follow it (a person asked) | `flint ite flow start "<program>" <process> --follow` (exit 0 done, 1 failed, 3 waits for a person), or `--to-end` (to the end, also through the waits of a person: exit 0 or 1) |
| See the runs | `flint ite flow runs ["<program>"] [--failed] [--waiting] [--since 2h]` (with no program: each program in one read), `flint ite flow status <run> [--follow]`, `flint ite process runs ["<program>"]` |
| Run again from the failed step (a person asked) | `flint ite flow retry <run> [--from <node>] [--input k=v] [--follow]` |
| See the triggers | `flint ite triggers ["<program>"] [--enabled]` (with no program: each trigger of this Flint, the enabled first with their next time) |
| Send an event | `flint ite event emit --kind <kind> [--path <file>]... [--ref <ref>]... --summary "<text>"` |
| Read and write the plan | `flint ite plan "<program>"`, `plan show`, `plan add`; `plan realize "<program>" <future id>` proposes one map change (full), and `--part -` proposes a partial realize (`{ "now", "rest" }` on stdin) |
| Make a draft version of a process | `flint ite process dev "<program>" <id>`; `process promote` proposes it |
| Change the system block of a program | `flint ite revision propose "<program>" --kind system --target "<root note file>" --content-file <file> --reason "<text>"` |
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
| Emit an event, write the plan, make a draft version, read a pulse, work with the system of a program, or do a job of the Workbench | [[knw-ite-loop]]: events, the agent of a program, the plan and the realize, draft versions, the pulse, the system of a program, agent sessions and jobs |
| Work on a program with a `codebase` on its root note | [[knw-ite-software]]: code-refs, stories, the Orbtest proof as a claim, the review as data and a claim, the claims of a source, the check after a task |
| Run headless | [[init-ite#Headless]]: which kind of headless agent you are, and its rules and its result |

## Skills and Workflows

| File | Use it when |
|---|---|
| [[wkfl-ite-program_create]] | A person wants a new program, end to end: purpose, template, the first map, data, processes, claims and their checks, plan, and the enables and the promotes for the person |
| [[sk-ite-process_new]] | A person says one process in one sentence |
| [[sk-ite-workflow_new]] | A person gives the steps of a piece of work in order: one instruction map |
| [[wkfl-ite-model]] | A person wants the map of a system, or more parts on a map |
| [[wkfl-ite-map_create]], [[wkfl-ite-map_expand]], [[wkfl-ite-map_refactor]], [[wkfl-ite-map_cover]], [[wkfl-ite-map_update]], [[wkfl-ite-parts_add]] | One change of the main map: the first level, one part deeper, a clearer shape of one level, the gap files, one part from its sources, the parts that a person names |
| [[wkfl-ite-view]], [[wkfl-ite-reshape]] | A question with no view; a change of a view in words |
| [[wkfl-ite-claim_add]], [[wkfl-ite-ground]], [[wkfl-ite-observe]], [[wkfl-ite-repair]] | One claim with its tested check; the claims of parts; check the claims now; repair what fails or is old (the world or the model) |
| [[wkfl-ite-process_add]], [[wkfl-ite-flow_add]] | One process, or one instruction map, with the person at each stage |
| [[wkfl-ite-review]] | Nodes of a program with a codebase have `review-due` |
| [[sk-ite-check_after_task]] | A product task ends |
| [[sk-ite-focus]] | Each workflow: show the person which nodes you work on |

Each workflow serves both modes: a headless session follows its `> [!headless]` callouts. A job of the Workbench names its action, and each action is a recipe of `Steel/Recipes/` that names its workflow or gives its steps (`flint ite actions`). The templates of the files are `tmp-ite-<form>-v0.1`: program, part, view, map, claim, data, process, instruction_map, and template.

# Headless

A headless or subagent Orbh session has no person at the terminal. It loads this init with `flint shard start ite`, as an interactive session does. Follow the `> [!headless]` callouts of the workflows.

The kernel, the rules, and the commands above apply with no change. This section gives only what is different when no person is in the session.

## Which Headless Agent Are You?

Read your first prompt, and find your row. Each row has its own result.

| Your first prompt | You are | Read | Your result |
|---|---|---|---|
| The orientation of a program, or a job with an action (the session metadata has `ite-kind: job`) | A **job agent** of the Workbench | The Rules of Each Headless Agent, then Jobs of the Workbench | One line of `steel-result/1`, with `flint orbh session return --await` |
| A process started you: a check of a claim, a maker of data, a worker, or a step of a run (the prompt names the process, the run and the node, the claim, or the data) | An **engine agent** | The Rules of Each Headless Agent, then Agents That the Engine Starts | The outputs, or a report through the door, with `flint orbh session return --finish` |
| A person or a manager sent you a task (for example "build the program X" or "add a process") | A **builder** | The Rules of Each Headless Agent, then Builders | The return shape of your prompt. `steel-result/1` and `--await` of a job do not apply. |

## The Rules of Each Headless Agent

1. **Show the person where you work.** When your prompt gives a `flint ite focus` command, run it first. Run `flint ite focus <node ids>` again each time your work moves to other nodes. Follow [[sk-ite-focus]].
2. **Show progress.** In an Orbh session, set the phase at the start of each stage: `flint orbh session set phase <phase>`. Each workflow names its phases. With no Orbh session (no `ORBH_SESSION_ID`), skip the phase and the focus commands.
3. **Ask no question.** When the instructions are not clear, select the reading that best helps the person, and write that reading in your result (the `summary` of a job).
4. **A view changes only through a candidate.** Never write a file in `Views/` or in `History/` of `Steel/Programs/<P>/`. Never apply a candidate, and never discard the candidate that you return. The person reviews it in the Workbench.
5. **The structure changes only through a map change.** An agent's `flint ite part add` and `part remove` are proposals; `flint ite map change propose` is one proposal for many operations. An agent's `flint ite part set` (the prose and the fields that are not structure) and `flint ite link` (a link) are proposals too: each proposes one map change (`edit`) that a person applies. A person's `part set` and `link` write at once. Never write the `parent`, the title, or the `(Type)` word of a part with your own tools. Never apply, revert, or discard the map change that you return. A place of a card is not structure: `flint ite place` and `flint ite arrange` apply at once, with no proposal; never write `State/main.json` with your own tools.
6. **Review only what you compared.** `flint ite review` writes the row of a node in the data item `reviews` of the program. An agent writes rows only inside a run of the keeper of `reviews`: a job of the action `review` is such a run when that keeper has `recipe: review`. Else the command refuses an agent ("Run the process review of the program, or ask a person."): use only `--show`, and name each due node in your result with "Run the process review". Run it only for a node whose text you compared with the diff of its code and of its stories after the last review, and found true ([[wkfl-ite-review]], [[sk-ite-check_after_task]]). When you cannot decide, do not review the node: name it in the `summary` as "review-due, not decided". Never write a row of `reviews` with your own tools, and never write a key `reviewed` in a note or in a node block: it is gone.
7. **Claims, data, and processes are files. Results go through the door.**
   - Start each new file with its command. The command writes the files from their forms, and it records you in the activity.
   - A new claim and its check: `flint ite claim new`. The check starts as a draft.
   - A new piece of data and its maker: `flint ite data new`. When a process of the program writes the value or the table, give `--kept-by process:<id>`.
   - A new process: `flint ite process new`. A new instruction map: `flint ite flow new`.
   - Then write the rest of each file and its code. Use the template of each form: a claim and its check with [[tmp-ite-claim-v0.1]], a process with [[tmp-ite-process-v0.1]], a map with [[tmp-ite-instruction_map-v0.1]], and a data note and its maker with [[tmp-ite-data-v0.1]].
   - Send each result with `flint ite claim check` or `flint ite claim report`. Never write the log by hand.
   - Never write a value of data that a person decides (`value`, the rows of a native store) with your own tools. Give such data a person maker (`--by person --task "<the question>"`). The person writes the value in Steel.
8. **Never run code that you did not read.** A code check and a code process run their own code on this machine: read the entry first. Never run a process (`flint ite process run`) unless the prompt of the person asks for exactly that: a process can change the world. Never enable a process or its trigger: only a person does. Never rename, archive, or remove a program or a view (`flint ite rename`, `archive`, `view remove`), unless the prompt of the person asks for exactly that.
9. **Never leave a check, a process, or a maker that you did not test.** Test each code check that you write with `flint ite claim test "<program>" <claim>`. A new check is a draft: propose its promote with `flint ite process promote "<program>" check-<claim id>`, and name the revision in your result; the claim counts only after a person applies it. Run a check one time (`flint ite claim check`) only when it is a production version. Test each code process that you write with `flint ite process test "<program>" <process>`. Test each maker of data that you write with `flint ite data test "<program>" <id>`, and pull it one time (`flint ite data pull`).
10. **Stay inside your work.** A job agent and an engine agent change only the parts of the program, the files of its folder in `Steel/`, and the log through `flint ite`, and do not commit: the person commits. A builder changes what its prompt names, and commits only when its prompt says so, with only its own paths. Never write the agent log.
11. **Move an item only when a person asks.** Never move a process, a data item, a claim, or a folder of the sidebar (`flint ite move`, `flint ite folder`) unless the prompt of the person asks for exactly that. A new item goes to the top, or to the folder that the prompt names (`--folder <path>`).

### Instruction Maps and Runs

The section Instruction Maps and Runs of [[knw-ite-processes]] applies. In a headless session, these rules are added:

1. **The engine is the only writer of a run.** Never create, edit, or delete a file in `Steel/Programs/<P>/Runs/`.
2. **An instruction map is a file.** A change of a node is an edit of `Processes/<id>/map.md` ([[tmp-ite-instruction_map-v0.1]]); check it with `flint ite flow check`, and read it with `flint ite flow show`. An external map is read-only: a change goes to its source. An edit never changes an active run: the run keeps its snapshot.
3. **Run an instruction map only when the prompt asks for exactly that.** `flint ite flow start`, `begin`, `done`, `answer`, `skip`, `retry`, `pause`, `resume`, and `cancel` act for the person. Never run `approve` or `refuse`. Read the runs with `flint ite flow list`, `show`, `runs`, `status`, and `events`.

## Builders

A builder makes or changes a program for a person or a manager, with no job of the Workbench. The person reads your work later, so each change must wait for the person in one place.

1. **Follow the workflow that your prompt names.** For a new program, follow [[wkfl-ite-program_create]]. For one process, follow [[sk-ite-process_new]]. For steps in order, follow [[sk-ite-workflow_new]].
2. **Propose; do not decide.** Each change of the main map is a map change that waits for the person. Never apply it. Never enable a process, approve a run, or apply the promote of a draft.
3. **Test each check, process, and maker** that you write, as rule 9 says. Run `flint ite process check` and `flint ite flow check` for each process and map that you write.
4. **The plan.** Write a future note (`flint ite plan add`) only when your prompt asks for it, and list each one for the person. A future note has no state. Else name what must be next in your result.
5. **End with the list for the person.** Your result names each proposal that waits (the map change ids, the realize ids, and the revision ids, also the promote of each new check), and each command that only a person runs (`flint ite map change apply`, `flint ite revision apply` for a promote, `flint ite revision apply --protected`, `flint ite process set "<program>" <id> --run-by agent` for a process that an agent must start, `flint ite enable "<program>" --all`), one line each.
6. **Return as your prompt says.** Use the return shape and the commit rules of your prompt. The result rules of a job below do not apply to you.

## Agents That the Engine Starts

An agent check, an agent maker, an agent worker, and an agent step of a run keep one Orbh session for one dispatch: each is a process. They take no job, and the run takes the result of the session only. Each agent step returns with `--finish`. A later step of the map with `session: <your step>` continues your finished session as a new turn: then read its prompt as the next step of the same work.

### Living Systems

Each program is a living system. The section Living Systems of [[knw-ite-loop]] applies. In a headless session, these rules are added:

1. **Take the instruction from the system.** When your prompt names a living system with no other work, run `flint ite prompt "<program>" --json` and follow the text in its field `prompt`. Do not follow a copy of the instruction in another text: a copy can be old. The command records that an agent took a prompt (the vital sign "use").
2. **An agent process or an agent step returns only its outputs.** When a process or a step of a run started you, your result gives its outputs: one JSON line `{ "output": { "<name>": <value> } }`, or, for one `text` output, only that text. Return it with `flint orbh session return --finish "<result>"`: this result rule replaces the shape `steel-result/1` and the `--await` of a job. An agent check, an agent process, and an agent step keep one session for one dispatch: they take no job. The run takes the result of your session only.
3. **An agent maker reports through the door.** When the maker of a data item started you, read its source as its `prompt` says, and report the value with `flint ite data report "<program>" <id> --value <json>` (or `--output <name>=<value>`, or `--rows <file>`). Change nothing in the source.
4. **An agent check reports through the door.** When the check of a claim started you, read what its prompt names, and report the result with `flint ite claim report "<program>" <claim> --state holds|fails|error --summary "<text>" [--part <id>] [--value <name>=<value>]...`. When the engine started you for a node of a run, your prompt names `--run <run id> --node <node id>`: give both, or the result does not count for that node. Never report what you did not see. A report never confirms the effect of a process: only a check after the work does.
5. **Read; do not decide for a person.** You can run `flint ite claim list`, `claim show`, `claim check` (a check only reads), `flint ite brief`, `flint ite vitals`, and `flint ite system`. Never run `flint ite flow approve` or `refuse`, never answer a decision of a person, never enable a process, never acknowledge an item of the brief, and never run `flint ite revision apply`, `revert`, or `discard`, unless the prompt of the person asks for exactly that. The authority layer refuses an agent for an approval and an enable.
6. **A protected change goes through a revision.** To change `authority` or `governor` of the system block, write the full new root note and run `flint ite revision propose`. Never apply it. A direct edit of these keys shows as the finding `protected-change`.
7. **Never act on the world** (a ship, a push, a publish, a release) in a living system unless the process or the step that started you says so, and the run has its approval.
8. **Never write the log, a run, a map change, or a revision by hand.** A view candidate is the one proposal that an agent writes as a file (rule 4).

The reconciliation of a living system (a cron with no instruction map, for example the morning cron of Flint Release) follows the reconciliation prompt of `flint ite prompt "<program>" --json`: it runs the checks of the old claims with `flint ite claim check`, and returns the brief as Markdown (`flint ite brief "<program>" --markdown`) as its result. It acts on nothing.

## Jobs of the Workbench

A person starts a headless **agent session** in the agent panel of the Workbench (`POST /api/ite/agents`), or with `flint ite agent start` or `flint ite job`. See Agent Sessions and Jobs of [[knw-ite-loop]].

The first prompt is the **orientation**: the program and this shard, with no job. When it has no job, read the program (`flint ite map tree`, `flint ite claim list`, and `flint ite check`), then end with `flint orbh session return --await "<one to three sentences: what the program is, and what needs work>"`.

Each **job** then comes to you as a new prompt. The prompt of a job names:

- the action, its title, and the workflow to follow (or its steps, for an action with no workflow);
- the document: `map`, or a view with its id, its file, its question, its map, and its `base_hash` now;
- the nodes: the id, the title, the type, and the note of each selected node;
- the data of a map action: the level of the focus and the coverage gaps;
- the text of the person;
- the first `flint ite focus` command;
- the form of the result.

The session metadata has the keys `ite-program`, `ite-program-id`, `ite-kind` (`job`), `ite-document`, `ite-focus` (the nodes of the current job), `ite-job` (the action of the current job), `ite-job-number`, and `ite-target`. Steel writes them at each new job. A person or another agent can start the same workflows with `flint orbh request`, with the same inputs in the prompt.

| Action | Workflow | Writes |
|---|---|---|
| `model` | [[wkfl-ite-model]] | One map change with the new parts and their links (`flint ite map change propose`) |
| `parts-add` | [[wkfl-ite-parts_add]] | One map change with the new parts below one part |
| `view` | [[wkfl-ite-view]] | One candidate in `Proposals/` |
| `reshape` | [[wkfl-ite-reshape]] | One candidate in `Proposals/` |
| `claim-add` | [[wkfl-ite-claim_add]] | One claim in `Reality/` and its draft check in `Processes/check-<id>/` (`flint ite claim new`), tested, and the promote of the check |
| `ground` | [[wkfl-ite-ground]] | Claims in `Reality/` with their draft checks, tested, and the promote of each check |
| `observe` | [[wkfl-ite-observe]] | Results, with `flint ite claim check` and `flint ite claim report` |
| `repair` | [[wkfl-ite-repair]] | For each claim that fails, the side that must change: the world (the name of its repair process for the person) or the model (a map change, a revision, or a candidate) |
| `process-add` | [[wkfl-ite-process_add]] | One process in `Processes/` (`flint ite process new`) and its code, prompt, or task |
| `flow-add` | [[wkfl-ite-flow_add]] | One instruction map `map.md` (`flint ite flow new`) and its nodes |
| `map-create` | [[wkfl-ite-map_create]] | One map change (the root and level 1), with `flint ite map change propose` |
| `map-expand` | [[wkfl-ite-map_expand]] | One map change (the children of one part) |
| `map-refactor` | [[wkfl-ite-map_refactor]] | One map change (a clearer shape of one level: split, merge, move, rename) |
| `map-cover` | [[wkfl-ite-map_cover]] | One map change (the sources of the gap files) |
| `map-update` | [[wkfl-ite-map_update]] | One map change (one part from its sources now) |
| `review` | [[wkfl-ite-review]] | The row in `reviews` of each node that is still true (`flint ite review`), and at most one candidate or one map change for the nodes that are not true |
| `free`, `update`, `explain`, `do`, `revise` | None: the prompt of the job gives the steps (from the recipe of the action; `free` is built in) | What the prompt of the job asks for. `explain` changes no file. |

**The job of an event.** A process with `agent: program` (for example the standing process `keep-map-true`) gives you a job of the action `update`. Its prompt holds the `task` of the process and the event (`STEEL_EVENT`). Follow the `task`. Make one proposal for each event, with all the parts that the event touches. When the work made a future note true, in full or in part, propose its realize (`flint ite plan realize "<program>" <future id>`, or `--part -` with `{ "now", "rest" }` on stdin): a person applies it. Never set a state of a future note. When more jobs wait in your queue, the next job comes after you return. See [[knw-ite-loop]].

**One session, many jobs.** Keep what you learned about the program for the next job, but read the program again where a job changes it. Do each job alone: do not continue an older job in a new one, unless the text of the person asks for that.

### Before You Return

Check each item. A job that skips an item gives the person a result that the Workbench cannot show or that is not true.

- [ ] You ran `flint shard start ite` once in this session, and the `flint ite focus` command of the prompt of this job, and you changed the focus when the work moved.
- [ ] You did each stage of the workflow, in order, and set its phase.
- [ ] A candidate: `flint ite check --candidate <candidate-id>` exits 0 (no error finding), and `flint ite diff --candidate <candidate-id>` says that it can be applied (no conflict).
- [ ] A map change: `flint ite map change show "<program>" <change id> --json` shows `change.state` = `proposed`, an empty `preview.conflicts`, and no new finding of the level error in the tree after.
- [ ] Parts, claims, data, and maps: `flint ite check "<program>"` gives no new finding of the code `format`, `link-missing`, `ref-missing`, `claim-invalid`, `unknown-reference`, `data-cycle`, or `pointer-target-missing` for a part, a claim, a piece of data, or a map that you changed, and `flint ite process check` and `flint ite flow check` give no error for a process or a map that you changed. `claim-fails` is not in this list: it is a true answer about the world (`flint ite check` exits 1 for it), so report it.
- [ ] Each code check that you wrote passed `flint ite claim test`, and you proposed its promote. A production check ran one time, and its claim holds, or its prose says why it fails.
- [ ] A review: you compared each node that you reviewed with the diff of its code after its last review, and `flint ite review` wrote its row in `reviews`. You reviewed no node that your candidate or your map change changes.
- [ ] Each maker of data that you wrote passed `flint ite data test` and was pulled one time, and `flint ite data list "<program>"` shows no problem for it.
- [ ] A living system: you took the instruction from `flint ite prompt`, and you approved, refused, enabled, and applied nothing that the prompt of the person did not ask for.
- [ ] The result is one line of JSON of the schema `steel-result/1`, and nothing else.
- [ ] You end the job with `flint orbh session return --await`, not `--finish`.

### The Result of a Job

The last action of each job is:

```bash
flint orbh session return --await '<json>'
```

Use `--await`, never `--finish`: the agent session stays ready for the next job. A finished agent session takes no new job, so the person must start a new agent. The person ends the agent session with End in the Workbench. The next job comes to you as a new prompt. A message of the person during a job: answer it in the result of the job, never with `flint orbh message send`.

The payload is one line of JSON of the schema `steel-result/1`, with no other text:

```json
{"schema":"steel-result/1","program":"<program name>","view_id":"<uuid or null>","candidate_id":"<candidate id or null>","base_hash":"<sha256 hex or null>","summary":"<one to three short sentences for the person>"}
```

- `program` is the name of the program.
- `view_id` is the `view_id` of the candidate (the UUID of the view, not the `id` of the candidate file), or the id of the view that the job worked on, or `null` for the map.
- `candidate_id` is the file stem of the candidate, or `null` when the workflow wrote no candidate (`ground`, `observe`, and a `repair` that wrote no proposal). For a `model` or `map-*` workflow, it is the map change id (`mc-...`), and `view_id` and `base_hash` are `null`.
- `base_hash` is the `base_hash` of the candidate: the SHA-256 hex for a reshape, `null` for a new view or for no candidate.
- `summary` tells the person what changed and what is true now, in one to three short sentences of Simplified Technical English. Name the counts (for example "Added 14 parts and 19 links." or "6 parts hold, 2 fail, 3 wait for a person."), then the most important gap. Write it with no `'` character and no line break, so that the shell quote stays correct.

**A failure has the same schema.** When you cannot do the work (the program does not exist, the view does not exist, or an error of the check stays), return `candidate_id: null` and a `summary` that starts with `No change:` and gives the reason and the one thing that the person can do. When this session wrote a candidate that has an error, remove it first with `flint ite discard --candidate <candidate-id>`: this is the one discard that a headless session does.

When the prompt of the job gives another result shape, use the shape of the prompt.
