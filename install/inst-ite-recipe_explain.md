---
format: steel-process/1
id: explain
by: agent
agent: program
action: { object: part, needs-nodes: true, needs-text: false, writes-proposal: false, ask: "What do you want to know?", workflow: null }
task: |
  Read each node, its note, its links, and the claims about it. Explain them in the result: what each node is, how the nodes connect, and what is not clear or not true. Change no file.
---

# Explain these nodes

The agent reads the nodes, their notes, their links, and the claims about them, and explains them to you. It changes no file.
