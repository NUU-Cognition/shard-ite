---
format: steel-process/1
id: revise
by: agent
agent: program
action: { object: program, needs-nodes: false, needs-text: true, writes-proposal: true, ask: "Which suggestion must the agent write?", workflow: null }
task: |
  Read `Shards/ITE/.later/init-ite-0.4.2.md` first: it holds the rules of this job.
  Read the brief: `flint ite brief "{{program}}" --json`. Find the suggestion of a revision: an item of the section pending with the action kind revision and a target `suggest:<trigger>:<id>`, or the change that the text of the person names. Read the file that the change needs. Write the full new bytes of that one file to a temporary file, then run `flint ite revision propose "{{program}}" --kind <kind> --target <file> --content-file <path> --reason "<why>" --trigger <trigger>`. Do not apply the revision: a person reviews it and applies it.
---

# Write a revision

The agent writes a revision of one file of the living system from a suggestion of the brief or from your text. You review the revision and apply it.
