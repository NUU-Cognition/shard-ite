// The check of the recipe orbtest-proof (Task 1273, P4), runtime node.
// For each part id of STEEL_PARTS, it reads `stories` and `criteria` of the part from STEEL_PART_FIELDS (the
// frontmatter of each part note, as the YAML parser of the engine reads it: blank lines, comments, inline and block
// lists), takes each criterion of each named story and each named criterion from the rows of the data
// orbtest-results (STEEL_DATA), and prints one verdict with `part`:
// - holds: each criterion is proven or waived;
// - fails: one is failing, stale, gap, or not-run ("3 of 5 criteria proven"), with one evidence item
//   { kind: "criterion", value: "<address>", label: "<state>: <text>" } for each criterion that is not proven;
// - error: the part names no story and no criterion, or names one that is not in the data, a field is not a list of
//   texts, the engine gives no fields of the part, or the data is not fresh.
// The check has no YAML parser of its own: when STEEL_PART_FIELDS is missing (an engine before fix round 1 of Task
// 1273), each verdict is error, never holds. It runs no test, and it writes nothing.

const { basename } = require('node:path');

const PROGRAM = process.env.STEEL_PROGRAM_ID || '';
const PARTS = JSON.parse(process.env.STEEL_PARTS || '[]');
const FILES = JSON.parse(process.env.STEEL_PART_FILES || '{}');
const FIELDS = process.env.STEEL_PART_FIELDS === undefined ? null : JSON.parse(process.env.STEEL_PART_FIELDS || '{}');
const DATA = JSON.parse(process.env.STEEL_DATA || '{}');
const REF = 'data:orbtest-results';

const OK = new Set(['proven', 'waived']);
const out = (line) => console.log(JSON.stringify(line));

/** The texts of one field of a part (`stories`, `criteria`): a text or a list of texts. Null when the field is another value. */
function textsOf(value) {
  if (value === undefined || value === null) return [];
  if (typeof value === 'string') return value.trim() === '' ? [] : [value.trim()];
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) return null;
  return value.map((item) => item.trim()).filter((item) => item !== '');
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
    const title = FILES[part] ? basename(FILES[part]).replace(/\.md$/i, '') : part;
    if (FIELDS === null) {
      out({ part, state: 'error', summary: 'The engine gives no STEEL_PART_FIELDS (a Flint before fix round 1 of Task 1273), so the check cannot read the stories and the criteria of the part. Update Flint.' });
      continue;
    }
    const fields = FIELDS[part];
    if (!fields || typeof fields !== 'object') {
      out({ part, state: 'error', summary: `The part ${part} has no note in the program.` });
      continue;
    }
    const stories = textsOf(fields.stories);
    const criteria = textsOf(fields.criteria);
    if (stories === null || criteria === null) {
      out({ part, state: 'error', summary: `The part ${title} has ${stories === null ? 'stories' : 'criteria'} that is not a list of texts.` });
      continue;
    }
    const note = { title, stories, criteria };
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
