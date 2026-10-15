---
format: steel-process/1
id: keep-map-true
by: agent
agent: program
task: |
  You are the agent of the program {{program}}. Keep the map of {{program}} true to one event. Work from the root of the Flint {{flint}}. The program is "{{program}}". Its root note is "{{root-note}}".

  1. Find the event.
     - The section "The event" of this job gives the event (`STEEL_EVENT`): its `id`, `kind`, `summary`, `about.paths`, `about.refs`, `about.tasks`, and `payload`.
     - A job with no event (Run now): read the map (`flint ite map "{{program}}"`). When the map has no parts, draft the first level of the map from the purpose of the program and from the notes that it names, as one map change. Go to step 3, and in step 6 use `add` for each part.
     - A job with no event and a map with parts: find an event that needs work. Run `flint ite event list "{{program}}" --limit 20 --json` and `flint ite agent queue "{{program}}" --json`. An event needs work when one of its routes has the target `process:keep-map-true`, and no job of the queue has its event id with the state `queued`, `given`, or `done`. Take the oldest event that needs work. When no event needs work, propose nothing. Say so in the result, and stop.
  2. Find the parts and the views of {{program}} that the event touches.
     - Paths: run `flint ite check "{{program}}" --paths <each path of the event> --json`. It gives the parts and the views that name the files, with their findings.
     - References: read each reference of `about.refs` with the command of its kind. A part id: `flint ite map show "{{program}}" --focus <part id>`. `claim:<id>`: `flint ite claim show "{{program}}" <id>`. `process:<id>` or `process:<id>#<node>`: `flint ite process show "{{program}}" <id>`. `data:<id>` or `data:<id>#<output>`: `flint ite data show "{{program}}" <id>`. `view:<id>` or `view:<id>#<node>`: `flint ite view "<id>"`.
     - Tasks: read the note of each task of `about.tasks`: its goal, its Task Log, `git-repos`, and `wip-commits`.
     - Commits: read only the commits of the repositories of the event. These repositories are the names in `payload.repos`, else the names in `git-repos` of the task. The path of a repository is the first line of `flint resolve codebase <name>`. A commit belongs to the repository where `git -C "<path>" cat-file -e <sha>^{commit}` succeeds. Read the commit only there: `git -C "<path>" show --stat <sha>`. When no repository of the event has a commit, skip it, and name it in the result.
     - When the event touches no part and no view of {{program}}, propose nothing. Say so in the result, and stop.
  3. Read the waiting map changes: `flint ite map change list "{{program}}" --state proposed`, then `flint ite map change show "{{program}}" <change id>` for each one. Do not propose what a waiting change does already. Do not edit or move a part that a waiting change edits or moves.
  4. Compare each touched part with its sources now (for a program with a codebase: the code): its sentence, its prose, its `code-refs`, and its children. The claim is the text, not the names in the code. A new name of a function often keeps the text true.
  5. Each touched part stays true: make no map change. `flint ite map change propose` refuses an empty list of operations. For a program with the data item `reviews`, read the review of each part that you compared (`flint ite review "{{program}}" <part id> --show`), and name each part whose review is due in the result, with "Run the process review". Do not record a review. The map change id of the result is null. Say why in the result, and go to step 7.
  6. A touched part is not true now: propose one map change for this event, with all the parts that the event touches.
     - Use `edit` for a part whose text or `code-refs` is not true now. Use `add` for new code that no part covers, under the part that holds it. Use `remove` for a thing that the work removed.
     - Write the text in Simplified Technical English. Write only what a file or a commit shows. Never invent a path, a name, or a count.
     - Run `flint ite map change propose "{{program}}" --ops - --reason "<the summary of the event>"` with the JSON array on stdin. Then run `flint ite map change show "{{program}}" <change id>`. The change must be `proposed`, with no conflict and no new error finding.
     - For a program with the data item `reviews`, name each touched part whose review is due in the result, with "Run the process review". Do not record a review.
  7. Check the views in both cases: after step 5 and after step 6. When a node of an accepted view that the event touches is not true now, write one candidate with Stages 1 to 4 of [[hwkfl-ite-reshape]].
  8. Read the plan: `flint ite plan "{{program}}" --json`. When the work made a future note true in full, propose its realize: `flint ite plan realize "{{program}}" <future id>`. When the work made a part of it true, propose a partial realize: `flint ite plan realize "{{program}}" <future id> --part -` with `{ "now": "<the new full text of the true note>", "rest": "<the text that stays in the future note>" }` on stdin. A realize is a map change: a person applies it. Never set a state of a future note.
  9. Never apply, revert, or discard a map change or a candidate. Never enable a trigger. Never move a process, a data item, a claim, or a folder of the sidebar (`flint ite move`, `flint ite folder`): only a person moves them. Write no file with your own tools, and do not commit.
  10. End the job with the result form that the brief of this job gives (`steel-result/1`). Put the map change id in `candidate_id`, or null. In the summary, name the event id, the touched parts, the parts whose review is due, the candidate (or none), and each realize that you proposed (or none).
outputs: [{ name: change, kind: text }, { name: summary, kind: text }]
timeout: 60m
concurrency: 1
---

# Keep the map true

After each event of a program, the map of the program must say what is true now. This recipe is the standing process of a program: the process `keep-map-true` of each program has `recipe: keep-map-true`, and it writes its own `about`, `trigger`, `authority`, and `concurrency`. An event starts it, for example `task.finished` (the skill `sk-ite-check_after_task` emits it at the end of a product task) or `commit.landed`. The ITE routes an event to a program when a path of the event is in the `code-refs` of a part of the program, when a reference names an element of the program, or when a task title names a part of the program.

The performer is the agent of the program (`agent: program`). Each event gives that agent one job: the action `update`, with the text `task` above and the event. When the agent works on another job, the new job waits in the queue of the agent. When no agent of the program runs, the ITE starts one. For each event, the agent proposes at most one map change, and a view candidate when a node of an accepted view must change. With no event (Run now) and an empty map, the agent drafts the first level of the map as one map change. When the map stays true, the agent proposes nothing, and names the touched parts whose review is due. When the work made a future note true, in full or in part, the agent proposes its realize. The agent never sets a state of a future note, and it never applies: a person reads each proposal in Steel, and applies it or discards it.

With no `kept-by` on the root note, this process keeps the root, each part with no `kept-by` of its own, and each view with no `kept-by`. It changes no note itself: it writes only proposals. It never moves an item or a folder of the sidebar. It acts on nothing outside this machine. Its trigger runs only on a machine where a person enabled the process: `flint ite enable "<program>" keep-map-true`.
