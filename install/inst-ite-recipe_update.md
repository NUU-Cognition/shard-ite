---
format: steel-process/1
id: update
by: agent
agent: program
action: { object: program, needs-nodes: false, needs-text: false, writes-proposal: false, ask: null, workflow: null }
task: |
  1. Run `flint ite check "{{program}}"` and `flint ite claim list "{{program}}"`.
  2. Run each code check that is old or unchecked with `flint ite claim check`.
  3. Follow the workflow `hwkfl-ite-observe` (a headless session) or `wkfl-ite-observe` (an interactive session) for the agent checks.
  4. For each claim that fails or is old, follow the workflow `hwkfl-ite-repair` (a headless session) or `wkfl-ite-repair` (an interactive session). Propose at most one map change and one candidate.
---

# Bring this program up to date

The agent runs the checks that are old or unchecked, does the agent checks, and repairs what fails. It proposes at most one map change and one candidate.
