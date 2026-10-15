---
format: steel-process/1
id: do
by: agent
agent: program
action: { object: part, needs-nodes: true, needs-text: false, writes-proposal: false, ask: "What must the agent do?", workflow: null }
task: |
  Read the note of each node and its links. Do the work that each node asks for, or that the text of the person names. Change the prose and the fields of a part with `flint ite part set`. Propose each change of the structure as one map change. Write a new claim with `flint ite claim new`, then its check, then test it. Report each result of a check that you do with `flint ite claim report`. In the result, name each node that you changed and how.
---

# Do the work of these nodes

The agent does the work that the nodes ask for, or that your text names, and says what it changed.
