---
description: "Make one instruction map from a list of steps with one command: write the steps in short words (Person:, Agent:, a question, Wait:, Map:, A & B), make the map with flint ite flow new --steps or --from, read the steps back, check it, and show it. The person starts the runs."
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start ite` (or `hstart` in a headless session) if you haven't already.

# Skill: Workflow New

Make one instruction map (a workflow: the steps of a process in order) from a list of steps of a person, for example "Collect the topics; Agent: Write the agenda; Is it ready? -> Send | Stop; Send". One command writes a correct `map.md`. You never start a run unless the person asks for exactly that.

# Input

- The program
- The process id of the map: a new id, or a process that exists
- The steps in order, in the words of the person

# Actions

1. **Write the steps in short words**, one step for each item, in order. The kind of each step comes from its words:

   | Write | The step |
   |---|---|
   | `Person: <text>` | A step of a person: Begin and Done in the Workbench |
   | `Agent: <text>` | A step of an agent |
   | `<process id>` or `Process: <process id>` | A step that runs a process of the program |
   | `<question>?` | A decision of a person (`Agent: <question>?`: of an agent). `-> A \| B` names its outcomes (default `yes \| no`). An outcome goes to the step with the same name. |
   | `Wait: 10m`, `Wait: until <ISO time>`, `Wait: claim:<id>`, `Wait: <event kind>` | A wait: a time, a claim that must hold, or the next event of that kind (for example `commit.landed`) |
   | `Map: <process id>` | A sub-map: the map of another process |
   | `A & B` | A and B run at the same time (a parallel node and a join) |
   | Other text | A step that runs the process with that id when the program has one, else a step of a person |

2. **Make the map with one command.** Put `;` between the steps, or write a Markdown list (one step on each line, a `#` line for the title) and give the file:

   ```bash
   flint ite flow new "<program>" <process id> --steps "<step>; <step>; <step>" [--title "<title>"] [--about <ref>...] --dry-run
   flint ite flow new "<program>" <process id> --from <file|-> --dry-run
   ```

   `--dry-run` prints the steps as the engine reads them (each node, its kind, and its next nodes) and the problems, and writes nothing. Read each line. When a step reads wrong, change its words, and run it again. Name each outcome of a decision with the exact name of a step (`Ready? -> Send | Stop`, not `yes: Send`): an outcome that names no step ends the map there, and the dry run shows it as "the end of the map". To loop back, name the earlier step.
3. **Write it.** Run the same command with no `--dry-run`. It writes `Steel/Programs/<program>/Processes/<id>/map.md` (`steel-flow/1`), and `process.md` when the process is new.
4. **Complete the steps.** Write the instruction of each step of a person or an agent under its heading in `map.md`: what to do, and what comes out. Pass data between steps with `${<node id>.<output>}` in the `inputs` of a later step. The form is in [[tmp-ite-instruction_map-v0.1]].
5. **Check it.** `flint ite flow check "<program>" <process id>`: each problem with the file, the line, the cause, and the fix. Repair each error. Then `flint ite flow show "<program>" <process id>` shows the resolved map.
6. **Hand over.** Tell the person the map and the command that starts a run: `flint ite flow start "<program>" <process id> --follow` (a person runs it, or asks you to). The person sees the map in the Workbench.

# Rules

- Never start a run, approve, or refuse unless the person asks for exactly that.
- An edit of `map.md` never changes a run that is active: each run keeps its own copy of the map.
- A step that sends something outside this machine runs a process with `irreversible: true` ([[sk-ite-process_new]]).
- The nodes, the modes, and the runs are in Instruction Maps and Runs of [[knw-ite-processes]].

# Output

- `Steel/Programs/<program>/Processes/<id>/map.md` (and `process.md` for a new process), checked
- The command that starts a run, for the person
