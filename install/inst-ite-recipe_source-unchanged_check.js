// The check of the recipe source-unchanged (Task 1273, M7), runtime node.
// The claim of a mirror has one reference in STEEL_ABOUT: process:<id> or process:<id>#<node>. The check runs
// `flint ite process show "<program id>" <id> --json` (a read that writes nothing) and reads `sources`: each source
// with a hash, with its hash now and its state. It prints one verdict with no `part`:
// - holds: each source of the reference is `same`;
// - fails: a source is `changed` (the evidence: the path or the ref, both hashes);
// - error: a source is `missing`, or the reference has no source with a hash.
// It calls the `flint` on PATH, or FLINT_CLI when it is set. It runs no test, and it writes nothing.

const { execFileSync } = require('node:child_process');
const { join } = require('node:path');

const ROOT = process.env.FLINT_ROOT || join(process.cwd(), '../../../../..');
const PROGRAM = process.env.STEEL_PROGRAM_ID || '';
const ABOUT = JSON.parse(process.env.STEEL_ABOUT || '[]');
const REF = /^process:([a-z0-9][a-z0-9-]*)(#[a-z0-9]+(?:-[a-z0-9]+)*)?$/;

const out = (line) => console.log(JSON.stringify(line));

/** The sources of the JSON answer: the value itself, or the value inside the envelope of the CLI. */
function sourcesOf(answer) {
  for (const value of [answer, answer && answer.data, answer && answer.result]) {
    if (value && Array.isArray(value.sources)) return value.sources;
  }
  return null;
}

/** The text of a source for a person, and its kind of evidence. */
function whereOf(source) {
  const written = (source && source.source) || {};
  if (written.path) return { kind: 'file', value: written.path };
  return { kind: 'note', value: written.ref || source.file };
}

function main() {
  if (ABOUT.length !== 1) {
    out({ state: 'error', summary: `The claim of a mirror has exactly one reference in about (process:<id> or process:<id>#<node>). It has ${ABOUT.length}.` });
    return;
  }
  const ref = ABOUT[0];
  const match = REF.exec(ref);
  if (!match) {
    out({ state: 'error', summary: `The reference ${ref} is not process:<id> or process:<id>#<node>.` });
    return;
  }
  let sources;
  try {
    const flint = process.env.FLINT_CLI || 'flint';
    const text = execFileSync(flint, ['ite', 'process', 'show', PROGRAM, match[1], '--json'], { cwd: ROOT, encoding: 'utf8', timeout: 25_000, maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
    sources = sourcesOf(JSON.parse(text));
    if (sources === null) throw new Error('the answer has no sources');
  } catch (error) {
    const why = String((error && (error.stderr || error.message)) || error).trim().split('\n')[0];
    out({ state: 'error', summary: `The process ${match[1]} does not read: ${why}.` });
    return;
  }
  const own = sources.filter((source) => source && source.ref === ref);
  if (own.length === 0) {
    out({ state: 'error', summary: `The reference ${ref} has no source with a hash. Give the source a hash, or remove this claim.` });
    return;
  }
  const values = { sources: own.map((source) => ({ file: source.file, source: whereOf(source).value, hash: source.hash, hash_now: source.hash_now, state: source.state })) };
  const missing = own.filter((source) => source.state === 'missing');
  if (missing.length > 0) {
    const where = missing.map((source) => whereOf(source).value).join(', ');
    out({ state: 'error', summary: `The core cannot read the source ${where}: the file is not there, or the codebase is not known on this machine.`, values, evidence: missing.map((source) => ({ ...whereOf(source), label: `cannot read; hash of the drawing ${source.hash}` })) });
    return;
  }
  const changed = own.filter((source) => source.state === 'changed');
  if (changed.length > 0) {
    const where = [...new Set(changed.map((source) => whereOf(source).value))].join(', ');
    out({ state: 'fails', summary: `The source ${where} changed after the drawing: the hash of the drawing is ${changed[0].hash.slice(0, 12)}, the hash now is ${String(changed[0].hash_now).slice(0, 12)}. Draw the mirror again.`, values, evidence: changed.map((source) => ({ ...whereOf(source), label: `hash of the drawing ${source.hash}, hash now ${source.hash_now} (${source.file})` })) });
    return;
  }
  const where = [...new Set(own.map((source) => whereOf(source).value))].join(', ');
  out({ state: 'holds', summary: `The source ${where} is as it was at the drawing (sha256 ${own[0].hash.slice(0, 12)}).`, values });
}

main();
