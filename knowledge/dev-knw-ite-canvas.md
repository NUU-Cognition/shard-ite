---
description: "Compose a level of the main map: read the canvas, decide what the level says, choose a shape (row, column, group, layer), compute the places from the sizes and the gaps, draw only what the links do not say, render the draft and read the image, then propose with a layout (or apply it with `--apply` in the mode direct); one full worked example, the rule for a level that a person arranged, and the meaning of each canvas problem"
orb:
  - "@v1/nuucognition/session/74fcdfda-d339-4da9-9d33-f60f86c78146#flint/nuu-flint"
  - "@v1/nuucognition/session/cb2fbb61-6a9d-4cc8-aa5c-7588d998e369#flint/nuu-flint"
orbh-fleet: ite-canvas-1104
---

# Knowledge: Compose a Level

Read this file before you propose a map change that adds a part, moves a part, or makes a new level. A map change has two halves. The `ops` say what the parts are. The `layout` says where they are. An agent that gives only the `ops` leaves the second half to chance, and the level looks like a mistake.

The rules of [[init-ite]] apply with no change. The facts about places, sizes, and drawings are in [[knw-ite-programs]]. The commands are in [[knw-ite-reference]].

## Why This Matters

A fleet once added 7 cards to the level ITE Workbench of the program NUU Steel. It gave no places. The cards landed in a spread of about 1,500 units, and 3 empty rectangles stood at the top. A person had to read a level that said nothing, and then arrange it by hand.

A level is a picture that a person reads in a few seconds. It must show what comes first, what belongs together, and what is deep. You can make it do that. You need a method, some arithmetic, and a look at the result.

## The Method

1. Read the level.
2. Decide what the level says.
3. Choose a shape.
4. Compute the places.
5. Draw only what the links do not say.
6. Render the draft, read the image, and fix it.
7. Dry-run, then propose.

### 1. Read the Level

Read the level as it is now. Do this before you plan the operations, and again before you write the places.

```bash
flint ite map canvas "<program>" [--in <part>] [--deep]          # absolute places, drawings, links, bounds, problems
flint ite map render "<program>" [--in <part>] --out "$ORBH_SCRATCH_DIR/now.png"
```

Read the output of `map canvas`:

- Each box has `at` (the place that `--at` takes: relative to the room of its parent) and `abs` (the place on the canvas of the level). Use `at` when you write a layout.
- `place: saved` means that a person or an agent put the card there. `place: new` means that no one did: the box is where the next new card would go.
- `bounds` is the box around the level. Use it to find the free room.
- `links` tell you the flow that the level has already.
- `problems` tell you what is wrong now. Do not add to it.

Then open the PNG with your file read tool and look at it. A number list does not show a crowded corner or a long empty gap. The image does. If your tools cannot show an image, read `map canvas --json` and work from the numbers. Say in your result that you did not see the image.

### 2. Decide What the Level Says

Answer four questions in one sentence each, before you write a coordinate:

- **What comes first?** Pick one reading direction for the level: left to right for a flow in time, top to bottom for a list or a hierarchy. Keep the direction that the level has already.
- **Which parts form one flow?** A flow is an order: step, step, step. Use the links (`next`, `depends-on`), the words of the sources, and the order in which a person explains the system.
- **Which parts belong together?** Parts of one theme, one owner, or one phase. They form a group.
- **Which parts are deep?** A part with many parts below it, or with a level of its own, is a layer.

If you cannot say what the level says, the level is not ready for a layout. Return to the plan of the parts.

### 3. Choose a Shape

| The parts are | Use | Why |
|---|---|---|
| An order in time or a chain of steps | A **row** (left to right) at the top of a level; a **column** (top to bottom) inside a group | The eye follows the flow with no help |
| Parts of one theme (at most 9 parts and 2 levels below, `ITE_GROUP_LIMIT`) | A **group**: one part with children, shown as a box | The box says "these belong together" |
| A subsystem with more than 9 parts, or deeper than 2 levels | A **layer**: one card that a person enters | The level stays small |
| Independent parts with no order | A **grid**: rows of at most 4 cards, the same gap | No one reads an order that is not there |

Rules for the shape:

- **A group holds at most 9 parts and 2 levels.** A group in a group is level 2. A bigger part becomes a layer: set `map-mode: layer` with an `edit` operation, or leave it, because the engine makes a part with more than 9 parts a layer.
- **One flow, one line.** Do not break a flow into two rows when it fits in one. A row of 4 cards is 928 units wide. A row of 5 is 1,168. A row of 6 is 1,408, and that is the longest row the engine makes by itself.
- **Do not mix.** A level with a row, a column, and a grid has no direction. Choose one for the level. Use groups to hold the other shapes.

### 4. Compute the Places

A place is the top left corner of a box. It is a multiple of 8. It is relative to the **room** of the parent of the part.

| Thing | Value |
|---|---|
| Card | 208 × 48 |
| Card of a layer | 320 × 240 |
| Gap between boxes at the top of a level | 32 |
| Gap between boxes in a group | 16 |
| The room of a group | It starts 16 from the left side of the group box and 32 from its top (the title row). A place of 0,0 in a group is the corner of the room. |
| Grid | Every place and every size is a multiple of 8. The engine snaps a value that is not. |

**The pitch** is the distance from one box to the next of the same size:

| | Across (x) | Down (y) |
|---|---|---|
| A card at the top of a level | 208 + 32 = 240 | 48 + 32 = 80 |
| A card in a group | 208 + 16 = 224 | 48 + 16 = 64 |
| A layer card at the top of a level | 320 + 32 = 352 | 240 + 32 = 272 |

So the card number *n* of a row at the top of a level (count from 0) is at x = 240 × *n*. The card number *n* of a column in a group is at y = 64 × *n*.

**The size of a group** follows its parts. You never write it. You need it to place the box that comes next:

- width = (the right edge of the rightmost part) + 2 × 16
- height = 32 + (the bottom edge of the lowest part) + 16
- A group of one column of *r* cards: 240 wide, and 32 + 48*r* + 16(*r* − 1) + 16 high. For r = 3: 224.
- A group of *c* columns and *r* rows: width = 208*c* + 16(*c* − 1) + 32, height = 32 + 48*r* + 16(*r* − 1) + 16.

**Two ways to give a place:**

- `{ "x": 240, "y": 0 }`: an exact place. Use it when you computed the layout.
- `{ "near": "<part>", "side": "right" }` (or `"below"`): the engine puts the part beside a part with the same parent, with the right gap. Use it for one part beside a part that exists. The engine reads the size of the box, also of a group.

**A place of a part never depends on the order of the operations.** The layout describes the level after the change.

### 5. Draw Only What the Links Do Not Say

A drawing is not meaning. It helps a person read the level. Draw when it adds something, and not otherwise.

| Draw | When | Example |
|---|---|---|
| A **frame** with a title | A region of the level has a name, and no part has that name | A frame "Before the doors open" around 3 groups |
| A **text** note | A short fact helps the reader: the order, the rule, the reason | "Hall first. Then invites. Then pizza." |
| A **line** with an arrow | A flow that no link shows, or a flow that must always show | An arrow from one group to the next |

Rules for a drawing:

- **Each drawing has words or a purpose.** A frame has a title. A text note has text. A line joins two things. **Never leave an empty rect, ellipse, diamond, or frame.** The check `empty-drawing` finds it.
- **Do not repeat a link.** `uses` and `depends-on` already show when a person selects a card. A line that repeats them only adds noise. Use a link of `refers-to` when the relation is meaning, and a line when it is only for the eye.
- **Put the ends on the parts.** A line has `from.node` and `to.node`. It then follows the cards when a person moves them. Give a point `x`, `y` only when the end is on nothing.
- **A frame holds boxes.** Its box contains the boxes that it names. Check in the render that it does not hide a card.
- **Less is more.** Two or three drawings are enough for a level. Ten are a cage.

### 6. Render the Draft, Read the Image, and Fix It

Render the change before you propose it. Nothing is written.

```bash
flint ite map render "<program>" --ops change.json --out "$ORBH_SCRATCH_DIR/draft.png"
flint ite map render "<program>" --ops ops.json --layout layout.json --side after --in <part> --out "$ORBH_SCRATCH_DIR/draft.png"
```

`change.json` can hold both halves: `{ "ops": [...], "layout": {...} }`. `--layout` takes a file or `-`.

Open the PNG with your file read tool. Check each of these:

- Does the level read in one direction?
- Are the parts of a flow in a line, with equal gaps?
- Does a group box hold only parts that belong together?
- Is any box over another box? Is any text cut?
- Is there a long empty gap, or a card far from the rest?
- Does each drawing say something?
- The new boxes have a dashed border and a mark: green for added, blue for moved or placed. Do they stand where you want?

Fix the layout, and render again. Do this until the image is right. It costs a few seconds. A bad level costs a person minutes.

The printed lines of `map render` give the bounds and the count of the problems. Do not stop at "0 problems". The checks find collisions. They cannot tell if the level is good.

### 7. Dry-Run, Then Propose

```bash
flint ite map change propose "<program>" --ops change.json --reason "<one sentence>" --dry-run
flint ite map change propose "<program>" --ops change.json --reason "<one sentence>"
```

The dry run plans the change, prints the preview with the layout, and writes nothing. If it refuses, it exits 2, as a real propose does. Read the `Layout` block: each place (before → after), each unplaced part, and each problem.

The person then sees the same level in the Workbench: the review of the change shows the level before and after, side by side. Write the reason so that the person knows what moved and why.

In the mode `direct` ([[init-ite#The Two Modes]]), add `--apply` to the second command. The change applies at once. Then render the level again, read the image, and read its problems. When the level is wrong, revert the change (`flint ite map change revert "<program>" <change id>`), fix the layout, and apply again.

## The Refusal of an Unplaced Part

An agent's change is **refused** when a new part, or a part with a new parent, has no place in `layout.places`. The error is `refused-state` with `reason: "unplaced-parts"`. Nothing is written. The error lists each part with its parent and a **suggested place**:

```json
{
  "reason": "unplaced-parts",
  "unplaced": [
    { "part": "…", "title": "Order the pizza", "parent": "…", "parent_title": "Preparation", "why": "new", "suggested": { "x": 0, "y": 128 } }
  ],
  "layout": { "places": { "<part id>": { "x": 0, "y": 128 } } }
}
```

Which parts need a place: each part that the change adds (`add`, the new group and each child of a `split`), each part that gets a new parent (`move`, each child of a `merge`, each child of a `remove`), and each part of `plan realize`.

The suggested place is the place of a new card. It does not overlap another suggestion. **It is a floor, not an answer.** It does not know what the level says. Read the canvas, choose the places with the method above, and propose again. Do not copy the suggestions without a look. Copying them gives the spread that this guide exists to prevent.

A person's change is never refused for a missing place. The apply gives each such part its suggested place.

## A Full Example

The program is "Club Launch". Its event level shows two cards that a person placed: "Launch night" (a goal) at 0,0 and "Run the night" (a step) at 512,0. There is a free space between them. The task: add the preparation work. This is three parts (tasks) in one new group.

**What the level says.** It reads left to right: the goal, then the preparation, then the night. The three tasks form one flow, and they belong together. So: one group "Preparation" between the two cards, and the tasks in a column inside it.

**The operations.** The group has an `id`, so that the three tasks can name it as their parent.

```json
{
  "ops": [
    { "op": "add", "id": "5c1d8a52-0b0e-4a4e-9a34-6a1f0d7b2e11", "title": "Preparation", "kind": "milestone", "parent": null,
      "sentence": "The work that must be done before the doors open." },
    { "op": "add", "title": "Book the hall", "kind": "task", "parent": "5c1d8a52-0b0e-4a4e-9a34-6a1f0d7b2e11",
      "sentence": "Ask the council office for the hall and pay the fee." },
    { "op": "add", "title": "Send the invites", "kind": "task", "parent": "5c1d8a52-0b0e-4a4e-9a34-6a1f0d7b2e11",
      "sentence": "Send one email to each member and ask for an answer." },
    { "op": "add", "title": "Order the pizza", "kind": "task", "parent": "5c1d8a52-0b0e-4a4e-9a34-6a1f0d7b2e11",
      "sentence": "Order food for the number of members who said yes." }
  ],
  "layout": {
    "places": {
      "Preparation":      { "x": 240, "y": 0 },
      "Book the hall":    { "x": 0, "y": 0 },
      "Send the invites": { "x": 0, "y": 64 },
      "Order the pizza":  { "x": 0, "y": 128 }
    },
    "drawings": {
      "add": [
        { "kind": "line", "from": { "node": "Launch night" }, "to": { "node": "Preparation" }, "arrow": "end" },
        { "kind": "line", "from": { "node": "Preparation" }, "to": { "node": "Run the night" }, "arrow": "end" },
        { "kind": "text", "x": 240, "y": 256, "w": 320, "h": 32, "text": "Hall first. Then invites. Then pizza." }
      ]
    }
  }
}
```

**The arithmetic.** Check each number before you write it.

| Box | Place (relative to its room) | Why |
|---|---|---|
| Launch night | 0,0 (kept) | A person placed it. Its right edge is 0 + 208 = 208. |
| Preparation | 240,0 | x = 208 + 32 (the gap at the top of a level) = 240. y = 0 aligns the top with the card. |
| Book the hall | 0,0 | The corner of the room of the group. |
| Send the invites | 0,64 | y = 48 (card) + 16 (gap in a group) = 64. |
| Order the pizza | 0,128 | y = 64 + 48 + 16 = 128. |
| Run the night | 512,0 (kept) | A person placed it. |

The size of the group box: the room holds one column. Its right edge is 0 + 208 = 208, and its bottom edge is 128 + 48 = 176. So the width is 208 + 2 × 16 = **240** and the height is 32 + 176 + 16 = **224**. The box covers x 240 to 480 and y 0 to 224.

The fit with its neighbours: the gap from "Launch night" (right edge 208) to the group (left edge 240) is 32. The gap from the group (right edge 240 + 240 = 480) to "Run the night" (left edge 512) is 32. Both are the gap of a level. The person's space was exactly enough, so no card moves.

The drawings: the two lines have `from.node` and `to.node`, so they follow the boxes. They show the flow that the three boxes have in one row. The text note is under the group: its top is 224 + 32 = 256 (the gap of a level), and it has the width of the group, 240. It says the order of the tasks in the group, which the column alone does not say.

**Render, then propose.**

```bash
flint ite map render "Club Launch" --ops change.json --out "$ORBH_SCRATCH_DIR/draft.png"     # read the image
flint ite map change propose "Club Launch" --ops change.json --reason "Add the preparation work as one group between the goal and the night" --dry-run
flint ite map change propose "Club Launch" --ops change.json --reason "Add the preparation work as one group between the goal and the night"
```

**The shorter form.** If you place only the group beside "Launch night", you can write `"Preparation": { "near": "Launch night", "side": "right" }`. The engine computes 240,0 itself. You still place each task in the group, because they are new parts too: `near` works for a part with the same parent, so `"Send the invites": { "near": "Book the hall", "side": "below" }` gives 0,64.

## A Level That a Person Arranged

A person's place is a decision. Do not undo it.

- **Place your own parts only.** Place each new part and each part that you move. Put it **near what it relates to**: beside the part it follows, or inside the group it joins.
- **Keep each other card.** Do not name an existing part in `layout.places` when it stays where it is.
- **Find the free room.** Read `map canvas`: the boxes, their `abs` places, and `bounds`. Put new parts in a gap, or just beyond the last box of the row or the column. If there is no gap, put the part below the row, aligned with the left edge of the level.
- **Match the level.** Use the direction, the gaps, and the alignment that the person's cards use. If they used a gap of 64, a gap of 32 looks wrong.
- **Never cover a box.** A new box must not overlap an existing one. A group box is large: use its size from the table above.

A change **can also move existing cards**, in both modes. Do this in two cases only:

1. The person asks for a tidier level. Then arrange the whole level with the method above.
2. Your new parts need the room. Move the least number of cards, by the least distance, and say in the reason which cards moved and why.

`flint ite arrange` on a real level still waits for a person. An agent lays out its own new level, and the parts it adds or moves, in the `layout` of its change.

## Move Directly, or Propose

There are three paths for a change of the canvas. They take the same place and drawing shapes. The mode of the session ([[init-ite#The Two Modes]]) decides the path for a move of many cards.

| Path | Commands | What happens | Use it when |
|---|---|---|---|
| **At once, with no record** | `flint ite place` (one card), `flint ite drawing set` (one drawing), `flint ite map layout "<program>" --layout <file\|->` (many items in one write) | It applies at once, also for an agent, in both modes. There is no change file, no review, and no revert. | One card or one drawing, in both modes. In the mode `proposal`: the person asks you to tidy or move something now, or you fix the places of parts that are yours, for example after your change is applied. |
| **Proposal** (the mode `proposal`) | `flint ite map change propose "<program>" --layout <file> [--ops <file>] --reason "<text>"` | Nothing changes until a person applies it. A person can revert it. | The change also has operations. The person should see the level first. You rearrange a level that a person arranged, and the person did not ask for it now. |
| **Direct change** (the mode `direct`) | `flint ite map change propose "<program>" --layout <file> [--ops <file>] --reason "<text>" --apply` | It applies at once. The engine keeps a change file with `state: applied`, and you can revert it. | Each move of many cards, and each change with operations. Use a change with only a layout in place of `map layout`: it has a record and an undo. |

- **The path at once moves only what exists.** A key of `places` must name a part now, and the part keeps its parent. A new part and a new parent are structure, so they always go through a map change: a proposal, or a direct change in the mode `direct`.
- **Check first, and keep the old places.** Run the command with `--dry-run`, and read its problems. The `--json` output of `map layout` holds the `before` of each item: keep it, so that you can give the items back. No command does this for you. A direct change keeps the old places in its change file: `flint ite map change revert "<program>" <change id>` gives them back.
- **The rule for a level that a person arranged stays the same.** A move at once and a direct change are still moves of a person's cards. Do them only when the person asks.

## The Canvas Problems

`map canvas`, `map check`, and the preview of a change list these. They are warnings and notes. They never refuse a change. Only a missing place refuses an agent's change.

| Code | Level | Meaning | What to do |
|---|---|---|---|
| `overlap` | warning | The boxes of two parts intersect, and neither is inside the other. | Move one part. If your change made it, fix it before you propose. |
| `unplaced` | warning | A part has no saved place for its parent. | Place it in the layout. |
| `far` | note | At the top of a level with 3 boxes or more, a box is more than 480 from its nearest neighbour, and more than 3 times the usual gap. | Move it nearer, or ask whether it belongs to the level. |
| `empty-drawing` | note | A rect, ellipse, diamond, or frame has no text and holds no box. | Add words, or remove it. |

**Before you return**, the layout of your change has no `overlap` that you made, and you read a render of it. See Before You Return in [[init-ite]].

## Headless

A headless session follows the same method. It also:

- Writes the files into `$ORBH_SCRATCH_DIR`: `change.json` and the PNG.
- Reads the PNG with its own file read tool. It does not ask a person to look.
- Sets the phase `placing` for this stage: `flint orbh session set phase placing`.
- Returns the paths of the renders in its result, and says which problems are left and why.
- Never runs `flint ite arrange` on a real level.
