// The check of the recipe review-current (Task 1273, M5), runtime node.
// It runs `flint ite review "<program id>" <each reference of STEEL_ABOUT> --show --json` (a read that writes
// nothing; it compares each node, its code, and its stories now with its row in the data item reviews), and it
// prints one verdict for each reference, with `part`:
// - holds: the review is current;
// - fails: a review is due (the summary gives the reasons; each changed file and story is one evidence item);
// - error: the node has no row ("never reviewed"), or its row cannot be checked.
// It calls the `flint` on PATH, or FLINT_CLI when it is set. It runs no test, and it writes nothing.

const { execFileSync } = require('node:child_process');
const { join } = require('node:path');

const ROOT = process.env.FLINT_ROOT || join(process.cwd(), '../../../../..');
const PROGRAM = process.env.STEEL_PROGRAM_ID || '';
const ABOUT = JSON.parse(process.env.STEEL_ABOUT || '[]');

const out = (line) => console.log(JSON.stringify(line));

/** The reviews of the JSON answer: the value itself, or the value inside the envelope of the CLI. */
function reviewsOf(answer) {
  for (const value of [answer, answer && answer.data, answer && answer.result]) {
    if (value && Array.isArray(value.reviews)) return value.reviews;
  }
  return null;
}

function main() {
  if (ABOUT.length === 0) return;
  let reviews;
  try {
    const flint = process.env.FLINT_CLI || 'flint';
    const text = execFileSync(flint, ['ite', 'review', PROGRAM, ...ABOUT, '--show', '--json'], { cwd: ROOT, encoding: 'utf8', timeout: 50_000, maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
    reviews = reviewsOf(JSON.parse(text));
    if (reviews === null) throw new Error('the answer has no reviews');
  } catch (error) {
    const why = String((error && (error.stderr || error.message)) || error).trim().split('\n')[0];
    for (const part of ABOUT) out({ part, state: 'error', summary: `The review of the node does not read: ${why}.` });
    return;
  }
  const byRef = new Map(reviews.filter((review) => review && typeof review.ref === 'string').map((review) => [review.ref.toLowerCase(), review]));
  for (const part of ABOUT) {
    const review = byRef.get(part.toLowerCase());
    const state = review ? review.state : null;
    if (state === null || state === 'never-reviewed' || !review.anchor) {
      out({ part, state: 'error', summary: `Never reviewed: the node ${part} has no row in the data item reviews. Run the process review of the program, or review the node with: flint ite review "${PROGRAM}" ${part}.` });
      continue;
    }
    const anchor = review.anchor;
    const values = { state, commit: anchor.commit, at: anchor.at, by: anchor.by };
    const reasons = (review.reasons || []).join(' ');
    if (state === 'reviewed') {
      out({ part, state: 'holds', summary: `The review of ${anchor.commit.slice(0, 9)} (${anchor.by}, ${anchor.at}) is current: the node, its code, and its stories did not change after it.`, values });
      continue;
    }
    if (state === 'review-due') {
      const evidence = [
        ...(review.changed_files || []).map((file) => ({ kind: 'file', value: file, label: 'changed after the review' })),
        ...(review.changed_stories || []).map((story) => ({ kind: 'text', value: story, label: 'a story that changed after the review' })),
      ];
      out({ part, state: 'fails', summary: `A review is due. ${reasons}`.trim(), values: { ...values, changed_files: review.changed_files || [], changed_stories: review.changed_stories || [] }, evidence });
      continue;
    }
    out({ part, state: 'error', summary: `The row of the review cannot be checked. ${reasons}`.trim(), values });
  }
}

main();
