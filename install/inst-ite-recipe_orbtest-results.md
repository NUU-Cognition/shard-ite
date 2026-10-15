---
format: steel-process/1
id: orbtest-results
by: code
runtime: node
entry: make.js
timeout: 120s
---

# Make the Orbtest results

The maker of the data `orbtest-results` of a program whose root note names a `codebase`. It runs `flint orbtest coverage --root "$STEEL_PRODUCT_ROOT" --json` and gives one row for each criterion of each story of Orbtest: `address` (`<story>#<n>`), `story`, `index`, `state`, `tier`, and `text`. The state is the state of Orbtest: `proven`, `failing`, `stale`, `gap`, `not-run`, or `waived`. It runs no test, and it writes nothing.

Each pull replaces all rows: the data is a snapshot of the coverage. With no product root (the root note names no codebase, or the codebase is not fulfilled on this machine), the pull fails, and the old snapshot stays. The code is `make.js` in this recipe folder. The maker calls the `flint` on the PATH, or `FLINT_CLI` when it is set.

A process of a program uses this recipe with `recipe: orbtest-results`, and it writes its own `trigger`, for example `{ every: 6h }`. The data note names that process in `kept-by`.
