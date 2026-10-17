import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { questions } from '../questions.js';

// Exercise the same data.ts adapter used by the web app, including supplementary data.
const bundle = await build({
  entryPoints: [fileURLToPath(new URL('../data.ts', import.meta.url))],
  bundle: true,
  write: false,
  platform: 'node',
  format: 'esm',
});
const { data } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);

const expectedCounts = { '1': 40, '2': 40, '3': 37, '4': 41, '5': 40, '6': 27, 'new-questions': 35 };
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
function selected(q) {
  const indices = q.type === 'single' ? [q.correct] : q.correct;
  return indices.map(i => q.options[i].replace(/^[A-D]\.\s*/, ''));
}

// The supplied ZIP is the user's authority. These hashes were extracted from its
// DOCX paragraphs and red answer runs, independently of the application adapter.
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
assert.deepEqual(Object.values(workerMatching.correct).flat(), ['nhân tố chủ quan', 'chủ thể', 'lực lượng sản xuất', 'phương thức sản xuất']);
assert.match(workerMatching.columns[2], /tiên tiến/);
assert.match(workerMatching.columns[3], /hiện đại/);
assert.equal(find('1', 'Câu 39:').options[1].correct, true);
assert.match(selected(find('new-questions', 'Câu 33(Bài 2):'))[0], /có định kỳ/);
assert.match(selected(find('new-questions', 'Câu 30(Bài 4):'))[0], /^Quy luật lợi nhuận bình quân$/);
assert.match(selected(find('new-questions', 'Câu 35(Bài 4):'))[0], /đầu tư trực tiếp hoặc cho vay/);
const surplusExercise = find('new-questions', 'Câu 36(Bài 2):');
const rates = [200, 400, 300, 100];
const proposedValues = [6000, 8000, 7000, 4000];
surplusExercise.options.forEach((option, i) => {
  assert.equal(option.correct, proposedValues[i] === 2000 * (1 + rates[i] / 100));
});

console.log('PASS: all 225 CNXHKH questions match the ZIP fingerprint; all 260 questions pass structure and adapter checks.');
