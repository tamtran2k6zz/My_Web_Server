import { questions as zipQuestions } from './questions.js';
import review from './fixtures/cnxh-syllabus-review.json';

// Preserve the ZIP verbatim; apply only reviewed, documented syllabus corrections.
export const reviewedQuestions = zipQuestions.map(question => {
  const number = Number(question.text.match(/^Câu\s+(\d+):/)?.[1]);
  const correction = review.corrections.find(item => item.article === question.article && item.number === number);
  return {
    ...question,
    ...(correction?.changes || {}),
    ...(correction ? { syllabusNote: `Đối chiếu giáo trình ${question.article}, trang PDF ${correction.pages.join(', ')}. ${correction.reason}` } : {})
  };
});
