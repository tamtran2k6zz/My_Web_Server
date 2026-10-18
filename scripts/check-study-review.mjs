import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

async function load(relative) {
  const output = await build({ entryPoints: [fileURLToPath(new URL(relative, import.meta.url))], bundle: true, write: false, platform: 'node', format: 'esm' });
  return import(`data:text/javascript;base64,${Buffer.from(output.outputFiles[0].text).toString('base64')}`);
}
const { emptyReview, parseReview, recordResult, reviewKey, toggleSaved } = await load('../services/studyReview.ts');
const { data } = await load('../data.ts');
const bank = Object.values(data).flatMap(topic => topic.questions);
assert.equal(new Set(bank.map(q => q.id)).size, 225, 'Each active question has a unique identity before shuffling');
assert.ok(bank.every(q => typeof q.id === 'string' && q.id.length > 0));
const id = bank[0].id;
let review = toggleSaved(emptyReview(), id);
review = recordResult(review, id, false);
review = recordResult(review, id, false);
assert.deepEqual(review, { saved: [id], wrong: [id] }, 'Saving and getting an answer wrong must not duplicate it');
review = parseReview(JSON.stringify(review));
assert.deepEqual(review, { saved: [id], wrong: [id] }, 'Both lists survive a browser storage round trip');
review = recordResult(review, id, true);
assert.deepEqual(review, { saved: [id], wrong: [] }, 'Correct retry clears wrong status without losing the manual bookmark');
review = toggleSaved(review, id);
assert.deepEqual(review, emptyReview(), 'The save button also removes a bookmark');
assert.notEqual(reviewKey('user-a'), reviewKey('user-b'), 'Accounts have separate storage');
assert.deepEqual(parseReview('{broken'), emptyReview());
assert.deepEqual(parseReview(null), emptyReview());
assert.deepEqual(parseReview('{"saved":["1:0",null,5,"1:0"],"wrong":"invalid"}'), { saved: ['1:0'], wrong: [] });
const cardBundle = await build({ entryPoints: [fileURLToPath(new URL('../components/QuestionCard.tsx', import.meta.url))], bundle: true, write: false, platform: 'node', format: 'cjs', packages: 'external' });
const module = { exports: {} };
new Function('require', 'module', 'exports', cardBundle.outputFiles[0].text)(createRequire(import.meta.url), module, module.exports);
const QuestionCard = module.exports.default;
const renderCard = isSaved => renderToStaticMarkup(React.createElement(QuestionCard, { question: bank[0], index: 0, onCorrect() {}, onToggleSave() {}, isSaved }));
assert.match(renderCard(false), /aria-pressed="false"/);
assert.match(renderCard(false), /Lưu để làm lại/);
assert.match(renderCard(true), /aria-pressed="true"/);
assert.match(renderCard(true), /Đã lưu/);
const homeBundle = await build({ entryPoints: [fileURLToPath(new URL('../components/Home.jsx', import.meta.url))], bundle: true, write: false, platform: 'node', format: 'cjs', packages: 'external' });
const homeModule = { exports: {} };
new Function('require', 'module', 'exports', homeBundle.outputFiles[0].text)(createRequire(import.meta.url), homeModule, homeModule.exports);
const homeMarkup = renderToStaticMarkup(React.createElement(homeModule.exports.Home, {
  data, user: null, onTopicSelect() {}, onLogin() {}, onLogout() {}, onToggleExamMode() {}, onOpenLeaderboard() {}
}));
assert.ok(!homeMarkup.includes('Bộ câu hỏi mới'), 'Removed supplementary card must not render on the homepage');
assert.ok(!homeMarkup.includes('260'), 'Homepage must not display the old total');
assert.ok(homeMarkup.includes('225'), 'Homepage shows the six-lesson total');
console.log('PASS: stable question IDs, bookmarks, wrong-answer retries, persistence, malformed storage and account separation.');
