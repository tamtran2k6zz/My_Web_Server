import { data } from '../data';

export const rankedTopics = [
  ...Object.entries(data).map(([id, topic]) => ({ id, name: topic.name, count: topic.questions.length })),
  { id: 'review-1-3', name: 'Tổng hợp phần 1 – 3', count: 117 },
  { id: 'review-4-6', name: 'Tổng hợp phần 4 – 6', count: 108 },
  { id: 'review-all', name: 'Toàn bộ 6 phần', count: 225 },
  { id: 'type-quiz', name: 'Chuyên đề trắc nghiệm', count: 182 },
  { id: 'type-tf', name: 'Chuyên đề đúng/sai', count: 22 },
  { id: 'type-drag', name: 'Chuyên đề kéo thả', count: 21 }
];

export interface RankedScore {
  userId: string;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  timestamp: number;
}

export function compareScores(a: RankedScore, b: RankedScore): number {
  // Compare exact percentages, not rounded display grades.
  const scoreDifference = b.score * a.totalQuestions - a.score * b.totalQuestions;
  return scoreDifference || a.timeSpentSeconds - b.timeSpentSeconds || a.timestamp - b.timestamp || a.userId.localeCompare(b.userId);
}

export function isBetterResult(next: RankedScore, previous: RankedScore): boolean {
  return next.score * previous.totalQuestions > previous.score * next.totalQuestions ||
    (next.score * previous.totalQuestions === previous.score * next.totalQuestions && next.timeSpentSeconds < previous.timeSpentSeconds);
}
