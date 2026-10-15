---
format: steel-process/1
id: orbtest-proof
by: code
runtime: node
entry: check.js
timeout: 60s
reads: ["data:orbtest-results"]
---

# Check: Orbtest proves the criteria of each part

The check of a claim about the parts of a program whose root note names a `codebase`. It reads the rows of the data `orbtest-results` and the fields `stories` and `criteria` of each part. It runs no test, and it writes nothing.

For each part of the claim, it takes each criterion of each story that the part names in `stories`, and each criterion that the part names in `criteria` (`<story>#<n>`). It gives one verdict for each part:

- **Holds**: each criterion is `proven` or `waived`.
- **Fails**: a criterion is `failing`, `stale`, `gap`, or `not-run`. The summary gives the count, for example "3 of 5 criteria proven". Each criterion that is not proven is one evidence item with its state and its text. Run the behaviour tests of the part: `flint orbtest behaviour run --root <product root> --story <id>`.
- **Error**: the part names no story and no criterion, the part names a story or a criterion that is not in the data, or the data `orbtest-results` is not fresh (pull it with `flint ite data pull "<program>" orbtest-results`).

The code is `check.js` in this recipe folder. A process of a program uses this recipe with `recipe: orbtest-proof`. The claim names that process in `kept-by`.
