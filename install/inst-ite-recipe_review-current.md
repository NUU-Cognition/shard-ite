---
format: steel-process/1
id: review-current
by: code
runtime: node
entry: check.js
timeout: 60s
reads: ["data:reviews"]
---

# Check: The review of each node is current

The check of a claim about the reviewed nodes of a program: parts, and nodes of views (`view:<view id>#<node id>`). The rows of the data item `reviews` hold the review of each node: the commit, the time, the hash of the meaning and the hash of the contract of the node, and who reviewed it. The check runs `flint ite review "<program>" <each reference of about> --show --json`. That read compares each node, its code, and its stories now with its row. It runs no test, and it writes nothing.

It gives one verdict for each reference of `about`, with `part`:

- **Holds**: the review is current. The node, the files under its `code-refs`, and its stories did not change after the commit of the row.
- **Fails**: a review is due. The summary gives the reasons. Each changed file and each changed story is one evidence item. Compare the node with the changes. Then run the process `review` of the program, or change the node.
- **Error**: the node has no row in `reviews` (never reviewed), or the row cannot be checked (the codebase does not resolve, or Git does not have the commit).

The code is `check.js` in this recipe folder. A process of a program uses this recipe with `recipe: review-current`. The claim names that process in `kept-by`.
