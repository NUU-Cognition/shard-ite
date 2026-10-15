// The check of the recipe orbtest-proof (Task 1273, P4), runtime node.
// For each part id of STEEL_PARTS, it reads `stories` and `criteria` from the frontmatter of the part
// note (STEEL_PART_FILES), takes each criterion of each named story and each named criterion from the
// rows of the data orbtest-results (STEEL_DATA), and prints one verdict with `part`:
// - holds: each criterion is proven or waived;
// - fails: one is failing, stale, gap, or not-run ("3 of 5 criteria proven"), with one evidence item
//   { kind: "criterion", value: "<address>", label: "<state>: <text>" } for each criterion that is not proven;
// - error: the part names no story and no criterion, or names one that is not in the data, or the data
//   is not fresh.
// It runs no test, and it writes nothing.

const { readFileSync } = require('node:fs');
const { basename } = require('node:path');

const PROGRAM = process.env.STEEL_PROGRAM_ID || '';
const PARTS = JSON.parse(process.env.STEEL_PARTS || '[]');
const FILES = JSON.parse(process.env.STEEL_PART_FILES || '{}');
const DATA = JSON.parse(process.env.STEEL_DATA || '{}');
const REF = 'data:orbtest-results';

const OK = new Set(['proven', 'waived']);
const out = (line) => console.log(JSON.stringify(line));

/** A scalar of YAML with no quotes. */
function unquote(text) {
  const value = text.trim();
  if (value.length >= 2 && ((value[0] === '"' && value.endsWith('"')) || (value[0] === "'" && value.endsWith("'")))) return value.slice(1, -1);
  return value;
}

/** The items of one key of the frontmatter: `key: a`, `key: [a, b]`, or a block of `- a` lines. */
function listField(lines, key) {
  const at = lines.findIndex((line) => line.startsWith(`${key}:`));
  if (at < 0) return [];
  const rest = lines[at].slice(key.length + 1).trim();
  if (rest.startsWith('[')) return rest.replace(/^\[|\]$/g, '').split(',').map(unquote).filter((item) => item !== '');
  if (rest !== '') return [unquote(rest)];
  const items = [];
  for (const line of lines.slice(at + 1)) {
    const item = /^\s*-\s+(.*)$/.exec(line);
    if (!item) break;
    items.push(unquote(item[1]));
  }
  return items.filter((value) => value !== '');
}

/** The title, `stories`, and `criteria` of a part note. */
function readPart(path) {
  const text = readFileSync(path, 'utf8');
  const lines = text.startsWith('---') ? text.slice(3, Math.max(3, text.indexOf('\n---', 3))).split('\n') : [];
  return { title: basename(path).replace(/\.md$/i, ''), stories: listField(lines, 'stories'), criteria: listField(lines, 'criteria') };
}

function main() {
  const item = DATA[REF];
  if (!item || item.state !== 'fresh') {
    const state = item ? item.state : 'not read';
    for (const part of PARTS) out({ part, state: 'error', summary: `The data orbtest-results has no fresh value (its state is ${state}). Pull it: flint ite data pull "${PROGRAM}" orbtest-results.` });
    return;
  }
  const rows = (item.outputs && Array.isArray(item.outputs.rows) ? item.outputs.rows : []).filter((row) => row && typeof row.address === 'string');
  const byAddress = new Map(rows.map((row) => [row.address, row]));
  const byStory = new Map();
  for (const row of rows) byStory.set(row.story, [...(byStory.get(row.story) || []), row]);

  for (const part of PARTS) {
    const file = FILES[part];
    if (!file) {
      out({ part, state: 'error', summary: `The part ${part} has no note in the program.` });
      continue;
    }
    let note;
    try {
      note = readPart(file);
    } catch (error) {
      out({ part, state: 'error', summary: `The note of the part ${part} does not read: ${String(error && error.message).split('\n')[0]}` });
      continue;
    }
    if (note.stories.length === 0 && note.criteria.length === 0) {
      out({ part, state: 'error', summary: `The part ${note.title} names no story and no criterion of Orbtest.` });
      continue;
    }
    const missing = [...note.stories.filter((story) => !byStory.has(story)), ...note.criteria.filter((address) => !byAddress.has(address))];
    if (missing.length > 0) {
      out({ part, state: 'error', summary: `The part ${note.title} names ${missing.join(', ')}, which ${missing.length === 1 ? 'is' : 'are'} not in the data orbtest-results.` });
      continue;
    }
    const taken = new Map();
    for (const story of note.stories) for (const row of byStory.get(story)) taken.set(row.address, row);
    for (const address of note.criteria) taken.set(address, byAddress.get(address));
    const all = [...taken.values()];
    const proven = all.filter((row) => row.state === 'proven').length;
    const waived = all.filter((row) => row.state === 'waived').length;
    const open = all.filter((row) => !OK.has(row.state));
    const counts = {};
    for (const row of all) counts[row.state] = (counts[row.state] || 0) + 1;
    const of = `${proven} of ${all.length} ${all.length === 1 ? 'criterion' : 'criteria'} proven${waived > 0 ? `, ${waived} waived` : ''}`;
    const values = { criteria: all.length, proven, waived, failing: counts.failing || 0, stale: counts.stale || 0, gap: counts.gap || 0, not_run: counts['not-run'] || 0 };
    if (open.length === 0) {
      out({ part, state: 'holds', summary: `${of}.`, values });
      continue;
    }
    out({ part, state: 'fails', summary: `${of}.`, values, evidence: open.map((row) => ({ kind: 'criterion', value: row.address, label: `${row.state}: ${row.text}` })) });
  }
}

main();
