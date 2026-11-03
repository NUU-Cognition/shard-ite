---
format: steel-process/1
id: update
by: agent
agent: program
action: { object: program, needs-nodes: false, needs-text: false, writes-proposal: false, ask: null, workflow: null }
task: |
  Read `Shards/ITE/.later/init-ite-0.4.2.md` first: it holds the rules of this job.
  1. Run `flint ite check "{{program}}"` and `flint ite claim list "{{program}}"`.
  2. Run each code check that is old or unchecked with `flint ite claim check`.
  3. Follow the workflow `wkfl-ite-observe` (`Shards/ITE/.later/wkfl-ite-observe.md`) for the agent checks (in a headless session, with its `> [!headless]` callouts).
  4. For each claim that fails or is old, follow the workflow `wkfl-ite-repair` (`Shards/ITE/.later/wkfl-ite-repair.md`; in a headless session, with its `> [!headless]` callouts). Propose at most one map change and one candidate.
---

# Bring this program up to date

The agent runs the checks that are old or unchecked, does the agent checks, and repairs what fails. It proposes at most one map change and one candidate.
