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

1. **Look for a ready map.** Run `flint ite flow recipes`: `release` (build, test, a person says ship, ship, a smoke check), `triage-event` (an agent reads and classes each event of one kind), `daily-check` (check the claims each day, with a digest), `fix-a-claim` (find the cause, a person approves, fix, check again), and `fleet-day` (a production day with an Orbh fleet). When one fits, write it with one command, and go to step 7: `flint ite flow new "<program>" <id> --recipe <name> [--with <name>=<value>]... [--run-by agent] --dry-run`.
2. **Write the steps in short words**, one step for each item, in order. The kind of each step comes from its words:

   | Write | The step |
   |---|---|
   | `Person: <text>` | A step of a person: Begin and Done in the Workbench |
   | `Agent: <text>` | A step of an agent. It runs on the `target` of its block (`runtime/profile`), else on the Orbh default target of this Flint. |
   | `Agent (continue): <text>`, `Agent (continue <step>): <text>` | A new turn of the agent session of the agent step before it (or of the named step): the agent keeps its context |
   | `Shell: <command>`, `<Name>: Shell: <command>` | A step that runs one command, with the title `Run <command>`, or the name that you give (`Build: Shell: npm run build`). `flow new` also makes its process (the recipe `command`). A command with `;` or `&` needs `--from`, one step on each line. |
   | `<process id>` or `Process: <process id>` | A step that runs a process of the program |
   | `<question>?` | A decision of a person (`Agent: <question>?`: of an agent). `-> A \| B` names its outcomes (default `yes \| no`). An outcome goes to the step with the same name, or `<outcome>: <step>` names its step (`Pass? -> yes: Ship \| no: Check`). Name the step by its words, with no prefix: `ship: Write the notes` for the step `Agent: Write the notes`. |
   | `Wait: 10m`, `Wait: until <ISO time>`, `Wait: claim:<id>`, `Wait: <event kind>` | A wait: a time, a claim that must hold, or the next event of that kind (for example `commit.landed`) |
   | `Map: <process id>` | A sub-map: the map of another process |
   | `A & B` | A and B run at the same time (a parallel node and a join) |
   | Other text | A step that runs the process with that id when the program has one, else a step of a person |

3. **Make the map with one command.** Put `;` between the steps, or write a Markdown list (one step on each line, a `#` line for the title) and give the file:

   ```bash
   flint ite flow new "<program>" <process id> --steps "<step>; <step>; <step>" [--title "<title>"] [--about <ref>...] --dry-run
   flint ite flow new "<program>" <process id> --from <file|-> --dry-run
   ```

   `--dry-run` prints the steps as the engine reads them (each node, its kind, and its next nodes) and the problems, and writes nothing. Read each line. When a step reads wrong, change its words, and run it again. Name each outcome of a decision with the exact name of a step (`Ready? -> Send | Stop`), or give its step (`yes: Ship | no: Check`). An outcome that names no step: the first one goes on to the next step, and each other one ends the map there (an end node; the dry run shows it as "the end of the map"). `Stop`, `End`, and `Done` end the map with no warning. To loop back, name the earlier step.
4. **Write it.** Run the same command with no `--dry-run`. For a new process, give `--run-by agent` when an agent must start runs of the map; else only the owners start it. It writes `Steel/Programs/<program>/Processes/<id>/map.md` (`steel-flow/1`), and `process.md` when the process is new. `flow new` has no trigger flag: for a map that runs by itself, make the process first with `flint ite process new "<program>" <id> --by person --task "<text>" --cron "<expression>"` (or `--every`, `--on`), then `flow new` with the same id. A process that exists keeps its fields.
5. **Complete the steps.** Write the instruction of each step of a person or an agent under its heading in `map.md`: what to do, and what comes out. Pass data between steps with `${<node id>.<output>}` in the `inputs` of a later step: an agent step gets only the values that its map names. An agent step right after a `Shell:` step gets its output at once (`inputs: { stdout: "${<shell step>.stdout}" }`), so `Shell: git log -5; Agent: Summarize the commits` works. The form is in [[tmp-ite-instruction_map-v0.1]].
6. **Change it later.** `flint ite flow set "<program>" <process id> --steps "<the new list>" [--dry-run]` replaces the steps in one command. The title, the prose of the map, and the inputs stay; a map with an error writes nothing; a run that is active keeps its copy. A step with the same id and the same kind keeps its title, its prose, and its block (instruction, inputs, outputs, retry); only its `next` is new, and the answer names the steps that are the same as before. A new or renamed step starts empty: complete it as in step 5.
7. **Check it.** `flint ite flow check "<program>" <process id>`: each problem with the file, the line, the cause, and the fix. Repair each error. Then `flint ite flow show "<program>" <process id>` shows the resolved map.
8. **Hand over.** Tell the person the map and the command that starts a run: `flint ite flow start "<program>" <process id> --follow` (a person runs it, or asks you to). The person sees the map in the Workbench.

# Rules

- Never start a run, approve, or refuse unless the person asks for exactly that.
- An edit of `map.md` never changes a run that is active: each run keeps its own copy of the map.
- A step that sends something outside this machine runs a process with `irreversible: true` ([[sk-ite-process_new]]).
- The nodes, the modes, and the runs are in Instruction Maps and Runs of [[knw-ite-processes]].

# Output

- `Steel/Programs/<program>/Processes/<id>/map.md` (and `process.md` for a new process), checked
- The command that starts a run, for the person
