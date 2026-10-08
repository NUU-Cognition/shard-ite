---
description: "A process of a program: Steel/Programs/<Program>/Processes/<id>/process.md (format steel-process/1), a small instruction that the program owns and can run, by code, an agent, or a person, with a complete example of each form"
---

# Filename: Steel/Programs/[Program]/Processes/[id]/process.md

/*
  A process is a small instruction that the program owns and can run: one description, and code, an agent, or a
  person. It does work, and it can change the world. So it needs authority: a person enables its trigger on a
  machine, and an irreversible process needs the approval of a person before each run. A process changes the
  model only through a proposal. A process that checks reality and changes nothing is not a process: it is the
  check of a claim (tmp-ite-claim-v0.1).

  A process with a map.md in its folder is a large process: it runs as a run of its instruction map
  (tmp-ite-instruction_map-v0.1). One thing at two sizes.

  THE FOLDER
  - Steel/Programs/<Program>/Processes/<id>/ — the folder name is the id of the process.
  - process.md holds the description. A code process keeps its code in the same folder.

  FRONTMATTER CONTRACT. The keys are kebab-case. No comment in the frontmatter.
  - format: always "steel-process/1".
  - id: a slug, unique in the program, the same as the folder name: "send-reminders".
  - by: code | agent | person.
  - parts: optional, the ids (UUIDs) of the parts that the process uses. Never a title.
  - inputs, outputs: optional, lists of { name, kind, required?, prompt? }. kind: text | number | boolean |
    choice | json (choice adds choices: [...]).
  - effect: optional, the ids of the claims that show that the work worked. After a done run, the core runs their
    checks once, with the same inputs. Only a check confirms an effect.
  - trigger: manual, { every: 10m }, { cron: "0 9 * * *" }, { on: hook }, or { on: watch }. A trigger runs only
    on a machine where a person enabled it (`flint ite enable "<program>" <id>`).
  - authority: optional, { run: ["person:<Name>"], approve: true|false, irreversible: true|false }. irreversible
    implies approve, and an agent never approves.
  - concurrency: optional, at most this many runs at once.
  - code (a code process is always its own code):
      runtime: node | python | exec. entry: the file in the folder. timeout: optional (default 60s).
    The core runs the entry with FLINT_ROOT, STEEL_PROGRAM_ID, STEEL_PROCESS_ID, STEEL_PARTS, STEEL_INPUTS,
    STEEL_STATE (JSON: the state of the process across its runs), STEEL_RUN_ID (or empty), STEEL_EVENT (a hook
    or a watch), and the values of flint.env and flint.env.local. Each line of its output that is one JSON
    object is one record: { "output": { "<name>": <value> } }, { "state": { ... } } (the new state of the
    process), or { "log": "<text>" }. Exit 0 is done; another exit is failed. A file that the process writes on
    this machine goes into .flint/steel/state/<program id>/.
  - agent:
      prompt: the request, with ${inputs.<name>} for an input. One Orbh session starts, and its result gives
              the outputs.
      target: optional, the Orbh target "runtime/profile". timeout: optional.
  - person:
      task: what the person does. The run gives waiting; Steel shows the task, and the person presses Done with
            the outputs.
      who: optional, "person:<Name>".
  - source: optional. The process runs an instruction outside as one unit, so it is external: { command: "<a
    command line, with ${inputs.<name>}>" }, { path: "@<Codebase>/<path>", hash: "<sha256>" }, or
    { ref: "[[<a skill, a workflow, or a note>]]", hash: "<sha256>" } (an agent follows it). The hash is the
    sha256 of the source text when you wrote the process; a later change of the source is the finding
    mirror-drift.

  RULES
  - Test each code process before you keep it: `flint ite process test "<program>" <id> [--input k=v]` runs the
    code once, prints each record and its problems, writes nothing to the log, and changes no state. A process
    with irreversible: true or a source refuses the test unless --dry is given.
  - A process that changes the world outside this machine (a push, a send, a publish) is irreversible.
  - Give the claims that show the result in effect. The record of a process never confirms its own work.
  - After you write a process, run `flint ite process list "<program>"`: a process with a problem shows it, and
    it does not run.

  THE BODY
  - One H1: the title for a person ("Send the reminders").
  - One to three short paragraphs: what the process does, why, and what it changes.
*/

## A code process

````markdown
---
format: steel-process/1
id: send-reminders
by: code
runtime: node
entry: index.js
timeout: 30s
parts: [366cc014-1f13-49f9-89f7-215623dfc872]
outputs: [{ name: sent, kind: number }]
effect: [rsvps-30]
trigger: manual
authority: { run: ["person:Nathan"], approve: false, irreversible: false }
---

# Send the reminders

Mei sends a reminder to each person on the mailing list who has no RSVP yet. After the run, the check of `rsvps-30` runs once.
````

The file `index.js` in the same folder:

```js
const sent = 8; // send the reminders here
console.log(JSON.stringify({ log: `Sent ${sent} reminders.` }));
console.log(JSON.stringify({ output: { sent } }));
```

## An agent process

````markdown
---
format: steel-process/1
id: write-ship-summary
by: agent
prompt: "Read the commits of origin/canon..${inputs.head} in the repository flint. Write one line that says what the ship holds. Change no file."
target: claude/o55xh
parts: [02586506-e1e8-4674-a72b-eeca885c9bc8]
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
