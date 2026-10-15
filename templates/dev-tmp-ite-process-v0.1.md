---
description: "A process of a program: Steel/Programs/<Program>/Processes/<id>/process.md (format steel-process/1), everything that executes (a check, a maker, a keeper, or a worker), by code, an agent, or a person, with its recipe, its computed jobs, the three trigger kinds and the event kinds, its authority, and a complete example of each form, with a worker that repairs a failed claim"
---

# Filename: Steel/Programs/[Program]/Processes/[id]/process.md

/*
  A process is everything that executes in a program: one description, and code, an agent, or a person. It does
  work, and it can change the world. So it needs authority: a person enables it on a machine, and an irreversible
  process needs the approval of a person before each run. A process changes the model only through a proposal.

  THE JOBS OF A PROCESS are computed from the links, never written. A note names its keeper with kept-by, at one end
  only; the process document gives the other end: keeps (the references of the notes that name it in kept-by) and
  jobs:
  - check: it keeps a claim (tmp-ite-claim-v0.1). Its id is check-<claim id>. It only reads.
  - maker: it keeps a data item (tmp-ite-data-v0.1). Its id is often make-<data id>.
  - keeper: it keeps a model note: a part, the root note, or a view (the standing process keep-map-true keeps the
    root, so it keeps each part with no kept-by).
  - worker: it keeps nothing. It does work: a fetch, a send, a repair of the world.
  A process has no kept-by. The plan of a process is its draft version (Processes/<id>/dev/).

  A process with a map.md in its folder is a large process: it runs as a run of its instruction map
  (tmp-ite-instruction_map-v0.1). One thing at two sizes.

  THE FOLDER
  - Steel/Programs/<Program>/Processes/<id>/ — the folder name is the id of the process.
  - process.md holds the description. A code process keeps its code in the same folder.
  - dev/ holds the draft version (the same files). Only a person runs it, and a person promotes it through a revision.

  FRONTMATTER CONTRACT. The keys are kebab-case. No comment in the frontmatter.
  - format: always "steel-process/1".
  - id: a slug, unique in the program, the same as the folder name: "fetch-flint".
  - recipe: optional, the id of a recipe: a shared process of the ITE shard in Steel/Recipes/<id>/process.md. The
    process gets each field of the recipe that it does not write. The text of a recipe can hold {{program}} (the name
    of the program), {{root-note}} (the path of the root note), and {{flint}} (the name of the Flint): the engine fills
    them. Never edit a file of Steel/Recipes/: the shard writes it again at each update. Write your own fields in the
    process of the program. The recipes: the 20 agent actions of the Workbench (`flint ite actions`) and keep-map-true.
  - by: code | agent | person.
  - about: optional, the references of the elements that the process acts on: a part id (a UUID), process:<id>,
    process:<id>#<node> (a node of an instruction map), data:<id>, claim:<id>. Never a title. Quote a reference with a
    colon: about: ["process:ship-flint#ship"]. An event trigger with no about of its own routes by this about.
  - reads: optional, the data that the process reads (data:<id>, data:<id>#<output>, process:<id>#runs). The code gets
    the values as STEEL_DATA, and an agent gets them in its prompt.
  - inputs, outputs: optional, lists of { name, kind, required?, prompt? }. kind: text | number | boolean | choice |
    json | date | money (choice adds choices: [...]).
  - effect: optional, the ids of the claims that show that the work worked. After a done run, the core runs their
    checks once, with the same inputs. Only a check confirms an effect.
  - trigger: optional; see THE TRIGGERS below. Default: manual.
  - authority: optional, { run: ["person:<Name>"], approve: true|false, irreversible: true|false }. irreversible
    implies approve, and an agent never approves. The engine refuses irreversible: true on a process that keeps a
    claim. Each actor of run is person:<Name>, person:*, agent:* (each agent), or agent:<target>. An agent may Run now
    only a process whose run names it. Only a person gives agent:* (flint ite process set <program> <id> --run-by
    agent), and only to a process that changes nothing outside this Flint (it reads, or writes only the data that
    names it in kept-by). An agent never writes run by hand.
  - concurrency: optional, at most this many runs at once.
  - No writes: a process names no data that it writes. The data note names its keeper (kept-by: "process:<id>"),
    and that gives the process the authority to write it. A file with writes has the problem "writes is gone: name
    this process in kept-by of the data".
  - code (a code process is always its own code):
      runtime: node | python | exec. entry: the file in the folder. timeout: optional (default 60s).
    The core runs the entry with FLINT_ROOT, STEEL_PROGRAM_ID, STEEL_PROCESS_ID, STEEL_KEEPS (a JSON list of the
    references that the process keeps), STEEL_PARTS (the part ids of about), STEEL_ABOUT (each reference of about),
    STEEL_DATA (the values of reads), STEEL_INPUTS, STEEL_STATE (JSON: the state of the process across its runs),
    STEEL_RUN_ID and STEEL_NODE (or empty), STEEL_EVENT (the event that started the run, or empty), and the values of
    flint.env and flint.env.local. A check also gets STEEL_CLAIM_ID; a maker also gets STEEL_DATA_ID and STEEL_SOURCE.
    Each line of its output that is one JSON object is one record:
      { "output": { "<name>": <value> } }; { "state": { ... } } (the new state of the process);
      { "data": { "id": "<data id>", "value": <value> } } or { "data": { "id": "<data id>", "rows": [...], "how":
        "append" | "replace" } } (only for a data item that names this process in kept-by; the core writes it at the
        end of a run that is done, never after failed);
      { "log": "<text>" };
      a check prints verdicts ({ "state": "holds|fails|error", ... }: tmp-ite-claim-v0.1), and a maker prints
      { "row": { ... } } and { "output": ... } (tmp-ite-data-v0.1).
    Exit 0 is done; another exit is failed. A file that the process writes on this machine goes into
    .flint/steel/state/<program id>/.
  - agent:
      prompt: the request, with ${inputs.<name>} for an input. One Orbh session starts, and its result gives the
              outputs.
      target: optional, the Orbh target "runtime/profile". timeout: optional.
      agent: optional, own (the default: one new Orbh session) or program (the agent session of the program does the
             work as one job of the action update, with the text task and the event, through a queue). With
             agent: program, give the request in task. See [[knw-ite-loop]].
  - person:
      task: what the person does. The run gives waiting; Steel shows the task, and the person presses Done with the
            outputs.
      who: optional, "person:<Name>".
  - source: optional. The process runs an instruction outside as one unit, so it is external: { command: "<a command
    line, with ${inputs.<name>}>" }, { path: "@<Codebase>/<path>", hash: "<sha256>" }, or { ref: "[[<a skill, a
    workflow, or a note>]]", hash: "<sha256>" } (an agent follows it). A source with a hash is a mirror: the core gives
    the process the mirror claim claim:mirror:process:<id>, which fails when the source changes. Add redraw: <process
    id> to name the process that draws the mirror again (for example redraw-mirror: an agent that proposes the new file
    as a revision); with no redraw, the fix is the action map-update.
    THE HASH: the sha256 of the bytes of the source file. The file of a ref "[[<name>]]" is the Mesh note with that
    name, else the shard file with that name (for example Shards/<Shard>/workflows/<name>.md). The file of a path
    "@<Codebase>/<path>" is <path> in the folder that flint resolve codebase "<Codebase>" prints. Get the hash with:
      shasum -a 256 "<file>" | cut -d" " -f1
    and paste the 64 hex characters. A command has no hash: it is not a mirror.

  THE TRIGGERS. Three kinds: manual, schedule, and event. Only a process has a trigger.
    trigger: manual                                                   # Run now, Check now, or a run (the default)
    trigger: { every: 30m }                                           # schedule
    trigger: { cron: "0 9 * * *" }                                    # schedule, by the clock of this machine
    trigger: { on: event, kinds: [claim.failed], about: ["claim:remote-fresh"] }
    trigger: { on: event, kinds: [task.finished, commit.landed] }    # with no about: the about of the process
    trigger: { on: event, kinds: [webhook], scope: any }              # each event of the kind for this program
    trigger: [{ every: 1h }, { on: event, kinds: [claim.failed], about: ["claim:remote-fresh"] }]
  - A list holds more than one trigger. The id of a trigger of a list is <process id>#<index> (from 1). manual is
    never in a list.
  - The event kinds: task.finished, commit.landed, note.added, webhook, manual, file.changed, claim.failed,
    claim.holds, data.changed, run.finished, proposal.applied. claim.failed comes when a check stores fails after a
    verdict that was not fails; claim.holds comes when holds follows fails or error; data.changed comes when new values
    differ from the last values; run.finished comes when a run ends; proposal.applied comes when a person applies a map
    change, a revision, a realize, or a promote.
  - The match: the kind of the event is in kinds, and: with about on the trigger, a reference of the event is in that
    about (a part id matches a part id; a changed path matches a code-refs of a part of that about); with no about and
    scope: about (the default), the event is about the about of the process; with scope: any, each event of the kind
    that routes to the program matches.
  - A Git hook and a file watch are sources of events: the hook emits commit.landed, and the watch emits file.changed
    (Steel watches the code-refs of the parts of the about of each enabled trigger with file.changed). The HTTP hook
    of a process (POST /api/steel/programs/<program>/hooks/<process>) emits webhook about process:<process>: listen
    with { on: event, kinds: [webhook], about: ["process:<process>"] }. The event is STEEL_EVENT of the run.
  - The loop guard: an event that a run emits carries the chain of its processes, and the router never routes an event
    to a process that is in its chain.
  - A trigger runs only on a machine where a person enabled the process: flint ite enable "<program>" <process id>. The
    enable of a process enables each trigger of the process. An agent never enables.
  - The CLI writes a trigger with --every <d>, --cron "<expr>", --on <kind> (repeat it), --on-about <ref> (repeat it),
    --scope any, or --manual (on process new and process set). The CLI is the truth: check the flags with `--help`.

  RULES
  - Test each code process before you keep it: `flint ite process test "<program>" <id> [--input k=v]` runs the code
    once, prints each record and its problems, writes nothing to the log, and changes no state. A process with
    irreversible: true or a source refuses the test unless --dry is given.
  - A process that changes the world outside this machine (a push, a send, a publish) is irreversible.
  - A process changes the model only through a proposal: a map change, a candidate, or a revision of a file of Steel/
    (`flint ite revision propose --kind steel`). A keeper writes only proposals for the notes that it keeps, never the
    note itself. A process writes a data item only when the data item names it in kept-by.
  - Give the claims that show the result in effect. The record of a process never confirms its own work.
  - A starter writes the files of a new process one time: `flint ite process new "<program>" <id> --starter <name>`
    (`flint ite process starters` lists them). A recipe is shared: `--recipe <id>` writes a process with recipe: <id>.
  - After you write a process, run `flint ite process check "<program>" <id>` and `flint ite process list
    "<program>"`: a process with a problem shows it, and it does not run.

  THE BODY
  - One H1: the title for a person ("Fetch the refs of flint").
  - One to three short paragraphs: what the process does, why, and what it changes.
*/

## A worker that repairs a failed claim

A worker keeps nothing: it repairs the world. Its event trigger listens to the failure of the claim `remote-fresh`, so `on_fail` of that claim names it ("repair by fetch-flint"). It also runs each hour. Its effect is the claim: after a done run, the check of `remote-fresh` runs once.

````markdown
---
format: steel-process/1
id: fetch-flint
by: code
runtime: node
entry: index.js
timeout: 60s
about: ["claim:remote-fresh", "data:origin-refs"]
outputs: [{ name: fetched, kind: boolean }]
effect: [remote-fresh]
trigger: [{ every: 1h }, { on: event, kinds: [claim.failed], about: ["claim:remote-fresh"] }]
authority: { run: ["person:Nathan", "agent:*"], approve: false, irreversible: false }
concurrency: 1
---

# Fetch the refs of flint

The worker runs `git fetch origin` in the checkout of `flint` on this machine. A fetch changes only the refs of this machine, so the process is not irreversible, and an agent may run it. After the fetch, the check of `remote-fresh` runs once, and the maker of `origin-refs` pulls again when its value is old.
````

The file `index.js` in the same folder:

```js
const { execFileSync } = require('node:child_process');
// The path of the checkout is the first line of `flint resolve codebase flint`.
const repo = execFileSync('flint', ['resolve', 'codebase', 'flint'], { encoding: 'utf8' }).split('\n')[0].trim();
execFileSync('git', ['-C', repo, 'fetch', 'origin'], { stdio: 'inherit' });
console.log(JSON.stringify({ output: { fetched: true } }));
```

## A code process that writes the data that it keeps

The table `reminder-answers` names this process as its keeper (`kept-by: "process:send-reminders"` in its `data.md`), so the process may write its rows. The process sends mail, so it is irreversible, and a person approves each run.

````markdown
---
format: steel-process/1
id: send-reminders
by: code
runtime: node
entry: index.js
timeout: 30s
about: [366cc014-1f13-49f9-89f7-215623dfc872]
reads: ["data:signups"]
outputs: [{ name: sent, kind: number }]
trigger: manual
authority: { run: ["person:Nathan"], approve: true, irreversible: true }
---

# Send the reminders

Mei sends a reminder to each person on the mailing list who has no RSVP yet, and the process records each answer in the table `reminder-answers`.
````

The file `index.js` in the same folder:

```js
const answers = [{ name: 'Nina Walker', email: 'nina.walker@example.org' }]; // send the reminders here
console.log(JSON.stringify({ log: `Recorded ${answers.length} answers.` }));
console.log(JSON.stringify({ data: { id: 'reminder-answers', rows: answers, how: 'append' } }));
console.log(JSON.stringify({ output: { sent: answers.length } }));
```

## An agent process

````markdown
---
format: steel-process/1
id: write-ship-summary
by: agent
prompt: "Read the commits of origin/canon..${inputs.head} in the repository flint. Write one line that says what the ship holds. Change no file."
target: claude/o55xh
about: [02586506-e1e8-4674-a72b-eeca885c9bc8]
inputs: [{ name: head, kind: text, required: true }]
outputs: [{ name: summary, kind: text }]
trigger: manual
---

# Write the ship summary

An agent reads the commits that the ship holds, and writes one line for the `--summary` value of the ship.
````

## An external process

````markdown
---
format: steel-process/1
id: ship-to-canon
by: code
source: { command: "ndv repo ship flint --summary ${inputs.summary}" }
inputs: [{ name: summary, kind: text, required: true }]
effect: [canon-shipped]
trigger: manual
authority: { run: ["person:Nathan"], approve: true, irreversible: true }
---

# Ship to canon

The command `ndv repo ship flint` is the truth of the ship: this process only names it. The ship pushes to the remote, so Nathan approves each run.
````

## A process of a recipe

The standing process of a program uses the recipe `keep-map-true` (`Steel/Recipes/keep-map-true/process.md`). It writes only its own fields: the recipe gives `by: agent`, `agent: program`, the task, the outputs, and the timeout. The root note has no `kept-by`, so this process keeps the root and each part with no `kept-by` of its own.

````markdown
---
format: steel-process/1
id: keep-map-true
recipe: keep-map-true
about: [725de833-59c8-4773-9781-a979476596b7]
trigger: { on: event, kinds: [task.finished, commit.landed] }
authority: { run: ["person:Nathan"], approve: false, irreversible: false }
concurrency: 1
---

# Keep the map true

After each task and each commit of Flint, the agent of the program proposes the change that keeps the map of Flint true.
````
