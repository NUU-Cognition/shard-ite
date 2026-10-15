// The maker of the recipe orbtest-results (Task 1273, P3), runtime node.
// It runs `flint orbtest coverage --root "$STEEL_PRODUCT_ROOT" --json` and prints one
// `{ "row": {...} }` for each criterion of each story: { address, story, index, state, tier, text }.
// The state is the state of Orbtest: proven, failing, stale, gap, not-run, or waived.
// Each pull replaces all rows (a snapshot). It runs no test, and it writes nothing.
// With no product root, it prints one `{ "log": ... }` and exits 1: the old snapshot stays.

const { execFileSync } = require('node:child_process');

const ROOT = process.env.FLINT_ROOT || process.cwd();
const PRODUCT_ROOT = process.env.STEEL_PRODUCT_ROOT || '';

const out = (line) => console.log(JSON.stringify(line));

function main() {
  if (PRODUCT_ROOT === '') {
    out({ log: 'The program has no product root: its root note names no codebase, or this machine does not fulfill the codebase (flint fulfill codebase "<name>" <path>).' });
    process.exitCode = 1;
    return;
  }
  let coverage;
  try {
    const flint = process.env.FLINT_CLI || 'flint';
    const text = execFileSync(flint, ['orbtest', 'coverage', '--root', PRODUCT_ROOT, '--json'], { cwd: ROOT, encoding: 'utf8', timeout: 110_000, maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
    coverage = JSON.parse(text);
  } catch (error) {
    const why = String((error && (error.stderr || error.message)) || error).trim().split('\n')[0];
    out({ log: `The coverage of Orbtest does not load for ${PRODUCT_ROOT}: ${why}` });
    process.exitCode = 1;
    return;
  }
  const stories = Array.isArray(coverage && coverage.stories) ? coverage.stories : [];
  let rows = 0;
  for (const story of stories) {
    for (const criterion of Array.isArray(story.criteria) ? story.criteria : []) {
      out({ row: { address: criterion.address, story: story.story_id, index: criterion.index, state: criterion.state, tier: story.tier, text: criterion.text } });
      rows += 1;
    }
  }
  out({ log: `${rows} criteria of ${stories.length} stories of ${PRODUCT_ROOT}.` });
}

main();
