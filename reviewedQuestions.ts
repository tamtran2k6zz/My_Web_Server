import { questions as zipQuestions } from './questions.js';
import review from './fixtures/cnxh-syllabus-review.json';

// Each answer correction is supported by its own lesson's PDF.
// Never rewrite the ZIP prompt, choices, targets or question format.
export const reviewedQuestions = zipQuestions.map(question => {
  const number = Number(question.text.match(/^Câu\s+(\d+):/)?.[1]);
  const correction = review.corrections.find(item => item.article === question.article && item.number === number);
  return {
    ...question,
    ...(correction ? { answer: correction.changes.answer } : {}),
    ...(correction ? { syllabusNote: `Đối chiếu giáo trình ${question.article}, trang PDF ${correction.pages.join(', ')}. ${correction.reason}` } : {})
  };
});
