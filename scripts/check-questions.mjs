import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { questions } from '../questions.js';

// Exercise the same data.ts adapter used by the web app.
const bundle = await build({
  entryPoints: [fileURLToPath(new URL('../data.ts', import.meta.url))],
  bundle: true,
  write: false,
  platform: 'node',
  format: 'esm',
  metafile: true,
});
assert.ok(!Object.keys(bundle.metafile.inputs).some(path => path.endsWith('newData.ts')), 'Archived supplementary data must not be bundled into the app');
const { data } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);

const expectedCounts = { '1': 40, '2': 40, '3': 37, '4': 41, '5': 40, '6': 27 };
assert.equal(questions.length, 225);
for (const q of questions) {
  const label = `${q.article}: ${q.text}`;
  if (q.type === 'single' || q.type === 'multiple') {
    const answers = q.type === 'single' ? [q.answer] : q.answer;
    assert.ok(Array.isArray(answers) && answers.length > 0, label);
    answers.forEach(answer => assert.match(answer, /^[A-D]$/, label));
  } else if (q.type === 'truefalse') {
    assert.equal(q.answer.length, q.options.length, label);
    q.answer.forEach(answer => assert.ok(['Đúng', 'Sai'].includes(answer), label));
  }
}
assert.deepEqual(Object.keys(data).sort(), Object.keys(expectedCounts).sort());
const clean = value => value.replace(/^[A-D]\.\s*/, '').trim().toLowerCase();
for (const [topicId, count] of Object.entries(expectedCounts)) {
  const bank = data[topicId].questions;
  assert.equal(bank.length, count, `Question count for topic ${topicId}`);
  assert.equal(new Set(bank.map(q => q.q)).size, bank.length, `Duplicate prompts in ${topicId}`);
  for (const q of bank) {
    const label = `${topicId}: ${q.q}`;
    assert.ok(q.q.trim(), label);
    if (q.type === 'single' || q.type === 'multi') {
      assert.ok(q.options.length >= 2, label);
      assert.equal(new Set(q.options.map(clean)).size, q.options.length, `Duplicate choices: ${label}`);
      const indices = q.type === 'single' ? [q.correct] : q.correct;
      assert.ok(indices.length > 0, label);
      assert.equal(new Set(indices).size, indices.length, label);
      indices.forEach(i => assert.ok(Number.isInteger(i) && i >= 0 && i < q.options.length, label));
      if (q.type === 'multi') {
        const statedCount = q.q.match(/Chọn\s+(\d+)/i);
        if (statedCount) assert.equal(indices.length, Number(statedCount[1]), `Selection count: ${label}`);
      }
    } else if (q.type === 'truefalse') {
      assert.ok(q.options.length > 0, label);
      q.options.forEach(option => {
        assert.equal(typeof option.correct, 'boolean', label);
        assert.ok(option.text.trim(), label);
      });
    } else if (q.type === 'drag') {
      assert.equal(new Set(q.items).size, q.items.length, `Repeated drag items: ${label}`);
      assert.deepEqual(Object.keys(q.correct).sort(), q.columns.map((_, i) => String(i)).sort(), label);
      const assigned = Object.values(q.correct).flat();
      assert.deepEqual([...assigned].sort(), [...q.items].sort(), `Each item must belong to one target: ${label}`);
    } else if (q.type === 'fillblank') {
      assert.equal(q.targets.length, q.correct.length, label);
    } else {
      assert.fail(`Unsupported type ${q.type}: ${label}`);
    }
  }
}

function find(topicId, prefix) {
  const found = data[topicId].questions.filter(q => q.q.startsWith(prefix));
  assert.equal(found.length, 1, prefix);
  return found[0];
}
// Keep the original ZIP immutable. The later user-supplied syllabus takes priority
// only where a reviewed correction has an explicit source and rationale.
const manifest = JSON.parse(readFileSync(new URL('../fixtures/cnxh-zip-answer-key.json', import.meta.url), 'utf8'));
const canonical = value => Array.isArray(value) ? value.map(canonical)
  : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
assert.equal(manifest.questions.length, questions.length);
questions.forEach((question, index) => {
  const expected = manifest.questions[index];
  const digest = createHash('sha256').update(JSON.stringify(canonical(question))).digest('hex');
  assert.equal(question.article, expected.article);
  assert.ok(question.text.startsWith(`Câu ${expected.number}:`));
  assert.equal(digest, expected.sha256, `ZIP mismatch: ${question.article}, câu ${expected.number}`);
});
const workerMatching = find('1', 'Câu 35:');
assert.deepEqual(Object.values(workerMatching.correct).flat(), ['nhân tố chủ quan', 'chủ thể', 'phương thức sản xuất', 'lực lượng sản xuất']);
assert.match(workerMatching.columns[2], /tiên tiến/);
assert.match(workerMatching.columns[3], /hiện đại/);
assert.equal(find('1', 'Câu 39:').options[1].correct, true);
// The user requires matching-lesson evidence and the original question format.
const review = JSON.parse(readFileSync(new URL('../fixtures/cnxh-syllabus-review.json', import.meta.url), 'utf8'));
assert.equal(review.sources.length, 6);
assert.equal(review.corrections.length, 5);
const ids = new Set();
for (const correction of review.corrections) {
  const key = `${correction.article}:${correction.number}`;
  assert.ok(!ids.has(key), `Duplicate correction ${key}`); ids.add(key);
  const original = questions.find(q => q.article === correction.article && q.text.startsWith(`Câu ${correction.number}:`));
  assert.deepEqual(original, correction.before, `Correction must target reviewed ZIP: ${key}`);
  assert.deepEqual(Object.keys(correction.changes), ['answer'], `Only the answer key may change: ${key}`);
  assert.ok(correction.pages.length && correction.reason);
  assert.ok(correction.references.length);
  correction.references.forEach(ref => assert.equal(ref.article, correction.article, `Cross-lesson evidence is forbidden: ${key}`));
  assert.ok(find(correction.article.match(/\d+/)[0], `Câu ${correction.number}:`).syllabusNote.includes(correction.reason));
}
for (const original of questions) {
  const topicId = original.article.match(/\d+/)[0];
  const number = Number(original.text.match(/^Câu\s+(\d+):/)[1]);
  const adapted = find(topicId, `Câu ${number}:`);
  assert.equal(adapted.q, original.text);
  const expectedType = { multiple: 'multi', dragdrop: 'drag' }[original.type] || original.type;
  assert.equal(adapted.type, expectedType, `Original question type must remain unchanged: ${topicId}/${number}`);
  if (original.type === 'truefalse') assert.deepEqual(adapted.options.map(item => item.text), original.options);
  else if (original.type === 'dragdrop') {
    assert.deepEqual(adapted.items, original.options); assert.deepEqual(adapted.columns, original.targets);
  } else assert.deepEqual(adapted.options, original.options);
  if (!review.corrections.some(c => c.article === original.article && c.number === number)) {
    if (original.type === 'single') assert.equal(adapted.correct, original.answer.charCodeAt(0) - 65);
    else if (original.type === 'multiple') assert.deepEqual(adapted.correct, original.answer.map(a => a.charCodeAt(0) - 65));
    else if (original.type === 'truefalse') assert.deepEqual(adapted.options.map(o => o.correct), original.answer.map(a => a === 'Đúng'));
    else if (original.type === 'dragdrop') assert.deepEqual(adapted.correct, Object.fromEntries(Object.entries(original.answer).map(([k,v])=>[k,v.map(i=>original.options[Number(i)])])));
  }
}
assert.equal(find('1', 'Câu 24:').correct, 0);
assert.equal(find('2', 'Câu 13:').correct, 3);
assert.equal(find('3', 'Câu 13:').correct, 2);
assert.deepEqual(Object.values(find('3', 'Câu 33:').correct).flat(), ['Bầu cử Quốc hội', 'Thượng tôn pháp luật', 'Chủ thể quyền lực', 'Dân chủ đại diện']);
assert.equal(find('4', 'Câu 10:').correct, 3);
assert.equal(find('4', 'Câu 38:').correct, 2);
assert.ok(Object.values(find('4', 'Câu 37:').correct)[1].includes('Đảng Cộng sản'));
assert.equal(find('6', 'Câu 25:').options[2].correct, true);
assert.equal(Object.values(data).flatMap(topic => topic.questions).length, 225);
assert.equal(data['new-questions'], undefined);
console.log('PASS: all 225 ZIP prompts, options and types preserved; 5 answer-only corrections with same-lesson evidence; every other answer matches ZIP.');
