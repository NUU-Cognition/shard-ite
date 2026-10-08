---
description: "A process of a program: Steel/Programs/<Program>/Reality/<id>/process.md (format steel-process/1), the one way that the model touches reality, by code, an agent, or a person, with a complete example of each form"
---

# Filename: Steel/Programs/[Program]/Reality/[id]/process.md

/*
  A process is one way that the model touches reality. It checks one or more parts of a program and gives
  observations. It never changes the world: code that changes the world is an instruction, outside the model.
  A process has three forms: code (a script in the process folder), an agent request, and a person's check. Each form gives the same result: observations, through one door
  (`flint ite process observe`, or the route POST /api/steel/programs/<program>/observations), into the log of the
  program on this machine (.flint/steel/logs/<program id>.jsonl). No file of the Mesh or of Steel/ holds an
  observation or a state.

  The core never starts a process by itself. A person or a run asks for it (Run now in Steel,
  `flint ite process run "<program>" <id>`), or the process starts itself with its own means: a schedule of the
  module crons, an Orbh cron, a live module, or a hook. `flint sync` does not schedule it.

  THE FOLDER
  - Steel/Programs/<Program>/Reality/<id>/ — the folder name is the id of the process. The folder of the program
    is the folder whose program.md has the id of the root note of the program.
  - process.md holds the manifest. A code process keeps its code in the same folder.

  FRONTMATTER CONTRACT. The keys are kebab-case. No comment in the frontmatter.
  - format: always "steel-process/1".
  - id: a slug, unique in the program, the same as the folder name: "booking-email".
  - by: code | agent | person.
  - parts: the ids (UUIDs) of the parts that the process checks. Never a title: a rename changes no id. Find the
    id in the frontmatter of the part, or with `flint ite map "<program>" --json`.
  - feeds: optional, the ids of the claims that the process gives a value to (a living system).
  - expect-every: optional, a promise, not a trigger: 12h, 7d, 30d. When the newest observation is older, the
    process is late: the part is stale, and `flint ite check` gives `process-late`.
  - code (a code process is always its own code; the core has no library of checks):
      runtime: node | python | exec. `exec` runs the entry file itself.
      entry: the file in the process folder: "check.mjs", "check.py".
      timeout: optional, at most this time for one run (default 60s).
    The core runs the entry in the process folder with FLINT_ROOT, STEEL_PROGRAM_ID, STEEL_PROCESS_ID,
    STEEL_PARTS (a JSON list of the part ids), and the values of flint.env and flint.env.local. Each line of its
    output that is one JSON object is one observation: { "part": "<id>", "state": "holds|fails|error",
    "summary": "<text>", "evidence"?: [{ "kind", "value", "label"? }] } for a yes-or-no check, or { "part": "<id>",
    "claim": "<id>", "value": <value>, "type": "<type>", "unit"?: "<unit>", "summary": "<text>", "evidence"?: [...] }
    for the value of a claim that the process feeds. Each other line is for a person. An exit code that is not 0, with no observation, gives one
    `error` observation for each part.
  - agent:
      prompt: the request. The agent reads, decides holds, fails, or error, and reports each part with
              `flint ite process observe`. Run now starts one Orbh session with the prompt, the parts, the
              claims, and the door command. The text of the result of the session is not an observation.
      target: optional, the Orbh target "runtime/profile". Default: the default target of this machine.
  - person:
      claim: the sentence that the person confirms. Run now gives `pending`, and Steel asks the person in the
             panel Reality of the part. The answer is the observation.
      who: optional, "person:<Name>".

  RULES
  - Prefer code: a check with no mind. Use an agent when a reading decides, and a person only when only a
    person knows.
  - Test each code process before you keep it: `flint ite process test "<program>" <id>` runs the code one time,
    checks each line against the door, and writes nothing to the log. Never invent a process that you did not check.
  - A process touches reality outside the model. Code that only finds a part of this program proves only that the
    model has the part: do not write it.
  - After you write a process, run `flint ite process list "<program>"`: a process with a problem shows it, and
    it does not run. Then run it one time: `flint ite process run "<program>" <id>`.

  THE BODY
  - One H1: the title for a person ("Booking email", "The forecast of the night").
  - One to three short paragraphs: what the process checks, why, and what a person does when it fails.
*/

## A code process

````markdown
---
format: steel-process/1
id: rsvp-count
by: code
runtime: node
entry: check.mjs
timeout: 30s
parts:
  - 04264f99-ff43-4d03-a867-e3634a085813
expect-every: 1d
---

# The count of the RSVPs

The script reads the count of the RSVPs from the export of the ticket service and reports it. It holds when 80 or more guests answered.
````

The file `check.mjs` in the same folder:

```js
const [part] = JSON.parse(process.env.STEEL_PARTS);
const count = 84; // read it from the export
console.log(JSON.stringify({ part, state: count >= 80 ? 'holds' : 'fails', summary: `${count} guests answered the RSVP.` }));
```

## An agent process

````markdown
---
format: steel-process/1
id: sponsors-signed
by: agent
target: claude/o55h
parts:
  - 9ee6423c-9cff-464e-9a8f-dd5722e9dafc
prompt: Read the sponsor sheet in the shared drive and say if two sponsors signed their letter.
expect-every: 7d
---

# Two sponsors signed

The sponsor sheet is a table that only a reader can check. The agent reads it and reports one observation.
````

## A person's check

````markdown
---
format: steel-process/1
id: booking-email
by: person
who: person:Priya
parts:
  - a9d285ce-53f0-448d-9580-5eff8cef7b1d
claim: The venue manager confirmed by email the booking of the hall for Thursday 12 November 2026, from 17:30 to 22:00.
expect-every: 30d
---

# Booking email

The booking is an email from the venue manager to Priya. No public page shows the booking, so a person confirms it.
````
