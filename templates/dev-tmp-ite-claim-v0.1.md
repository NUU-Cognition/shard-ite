---
description: "A claim of a program: Steel/Programs/<Program>/Reality/<id>/claim.md (format steel-claim/1), what must be true and its check (code, an agent, or a person), with a complete example of each form"
---

# Filename: Steel/Programs/[Program]/Reality/[id]/claim.md

/*
  A claim says what must be true about the system, and its check reads reality to see if it is true. A check
  never changes anything: it only reads, so anyone can run it again at any time with no harm. The check judges:
  each result is holds, fails, or error, with the values that it saw as evidence. A claim never holds only a value.
  Each result goes through one door (`flint ite claim report`, or the route
  POST /api/steel/programs/<program>/claims/<claim>/results) into the log of the program on this machine
  (.flint/steel/logs/<program id>.jsonl). No file of the Mesh or of Steel/ holds a result or a state.

  THE MODE says what a failure means:
  - is: a description of the world. A failure is drift: the model is out of date. An agent proposes a change of
    the model, and a person applies it.
  - ought: a goal or a limit. A failure means that reality is off target: the world must change, through a
    process of fixed-by, or by the owner.
  - will: a prediction, with p and resolves. It came true or false; nothing is repaired.

  THE FOLDER
  - Steel/Programs/<Program>/Reality/<id>/ — the folder name is the id of the claim. The folder of the program is
    the folder whose program.md has the id of the root note of the program.
  - claim.md holds the claim. A code check keeps its code in the same folder, with any data that it reads.

  FRONTMATTER CONTRACT. The keys are kebab-case. No comment in the frontmatter.
  - format: always "steel-claim/1".
  - id: a slug, unique in the program, the same as the folder name: "rsvps-30".
  - mode: is | ought | will.
  - about: the ids (UUIDs) of the parts that the claim is about: one or more. Never a title. A part has no list of
    claims: the claim names its parts. Find an id in the frontmatter of the part, or with
    `flint ite map "<program>" --json`.
  - owner: optional, a person wikilink "[[@Name]]". Default: the owner of the first part, else the first owner of the
    system. Give an ought claim an owner.
  - by: code | agent | person | none. none: the claim has no check yet; it is unchecked, and the brief lists it in
    unwatched.
  - code (a code check is always its own code; the core has no library of checks):
      runtime: node | python | exec. exec runs the entry file itself.
      entry: the file in the claim folder: "check.js", "check.py".
      timeout: optional, at most this time for one check (default 60s).
    The core runs the entry in the claim folder with FLINT_ROOT, STEEL_PROGRAM_ID, STEEL_CLAIM_ID, STEEL_PARTS
    (a JSON list of the ids of about), STEEL_INPUTS (JSON: the inputs of the run when the check runs for a step,
    else {}), STEEL_RUN_ID (or empty), and the values of flint.env and flint.env.local. Each line of its output
    that is one JSON object is one result: { "state": "holds|fails|error", "part"?: "<an id of about>",
    "values"?: { ... }, "summary": "<text>", "evidence"?: [{ "kind": "url|file|note|text|output", "value", "label"? }] }.
    With no part, the result is for the whole claim. A check of many parts prints one result for each part.
    A line that is not valid is a problem of the check, and gives error.
  - agent:
      prompt: the request. The agent reads, decides holds, fails, or error, and reports through the door
              (`flint ite claim report`). Check now starts one Orbh session with the prompt, the claim, the
              parts, and the door command.
      target: optional, the Orbh target "runtime/profile".
  - person:
      question: what Steel asks the person. The check gives pending, and the person answers holds or fails,
                with a note.
      who: optional, "person:<Name>".
  - trigger: optional, { every: 1d }, { cron: "0 9 * * *" }, { on: hook }, or { on: watch }. With no trigger,
    the claim checks only on Check now, or for a run. A trigger runs only on a machine where a person enabled it.
  - fresh-for: optional, a duration (1h, 2d). A result older than this is old: the check must run again.
  - fixed-by: optional, the ids of the processes (small or large) that can make an ought claim true.
  - p and resolves: a will claim only. p is 0 to 1; resolves is a date in quotes ("2026-10-31").

  RULES
  - Prefer code: a check with no mind. Use an agent when a reading decides, and a person only when only a person
    knows.
  - One check for each claim. Two claims that read the same source read it two times.
  - A check only reads. A fetch that changes only the remote-tracking refs is a read; a write, a send, or a push
    is not.
  - A check that cannot read its source prints one error line, never an old value.
  - Test each code check before you keep it: `flint ite claim test "<program>" <id>` runs the check once, prints
    each line and its problems, and writes nothing. Then run `flint ite claim list "<program>"`: a claim with a
    problem shows it.
  - A check touches reality outside the model. Code that only finds a part of this program proves only that the
    model has the part: do not write it.

  THE BODY
  - One H1: the claim as one sentence for a person ("At least 30 people RSVP by 5 November").
  - One to three short paragraphs: why it matters, what the check reads, and what a person does when it fails.
*/

## A code check

````markdown
---
format: steel-claim/1
id: rsvps-30
mode: ought
about: [8ab2da5b-f95c-43d5-a388-786d06fbda1a, 0910b761-fc23-42a2-ac88-9d0cfebb54cf]
by: code
runtime: node
entry: check.js
timeout: 30s
trigger: { every: 1d }
fresh-for: 2d
fixed-by: [send-reminders]
---

# At least 30 people RSVP by 5 November

On Thursday 5 November, one week before the night, at least 30 people have an RSVP. The check counts the rows of `rsvps.csv` in this folder, the export of the RSVP page. When the claim fails, run `send-reminders`.
````

The file `check.js` in the same folder:

```js
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const rows = readFileSync(join(__dirname, 'rsvps.csv'), 'utf8').split('\n').filter((l) => l.trim()).length - 1;
console.log(JSON.stringify({ state: rows >= 30 ? 'holds' : 'fails', values: { rsvps: rows, target: 30 }, summary: `${rows} of 30 RSVPs.` }));
```

## An agent check

````markdown
---
format: steel-claim/1
id: budget-total
mode: ought
about: [79ba0719-0444-4280-a1db-1c8803d4511f]
by: agent
prompt: "Read the four budget parts of the program Club Launch Night, add the three lines, and report holds when the total is at most 1,400 AUD, else fails. Give the total as a value. Change no file."
fresh-for: 7d
---

# The lines of the budget stay inside 1,400 AUD

The amounts are in the prose of the notes, so an agent reads them better than a script. The agent only reads, and it reports through the door.
````

## A person check

````markdown
---
format: steel-claim/1
id: hall-booked
mode: is
about: [a9d285ce-53f0-448d-9580-5eff8cef7b1d]
by: person
question: "Is the community hall still booked for Thursday 12 November 2026, from 17:30 to 22:00?"
fresh-for: 30d
---

# The hall is booked for the night

The booking is an email from the venue manager. No public page shows it, so a person checks it.
````
