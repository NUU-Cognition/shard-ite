---
format: steel-process/1
id: do
by: agent
agent: program
action: { object: part, needs-nodes: true, needs-text: false, writes-proposal: true, ask: "What must the agent do?", workflow: null }
task: |
  Read the note of each node and its links. Do the work that each node asks for, or that the text of the person names. Propose each change of a part as a map change: `flint ite part set` (the prose and the fields) and `flint ite link` (the links) propose it when an agent runs them, and `flint ite map change propose` proposes a change of the structure. A person applies each map change. Write a new claim with `flint ite claim new`, then its check, then test it. Report each result of a check that you do with `flint ite claim report`. In the result, name each node and the map change that you proposed for it.
---

# Do the work of these nodes

The agent does the work that the nodes ask for, or that your text names. It proposes each change of a part as a map change, and you apply it.
