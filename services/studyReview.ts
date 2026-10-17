export interface StudyReview {
  saved: string[];
  wrong: string[];
}

export const emptyReview = (): StudyReview => ({ saved: [], wrong: [] });
export const reviewKey = (userId: string) => `study-review:v1:${userId}`;

export function parseReview(raw: string | null): StudyReview {
  try {
    const value = JSON.parse(raw || 'null');
    const ids = (items: unknown): string[] => Array.isArray(items)
      ? [...new Set(items.filter((item): item is string => typeof item === 'string'))] : [];
    return { saved: ids(value?.saved), wrong: ids(value?.wrong) };
  } catch {
    return emptyReview();
  }
}

export function recordResult(review: StudyReview, id: string, correct: boolean): StudyReview {
  return { ...review, wrong: correct ? review.wrong.filter(item => item !== id) : [...new Set([...review.wrong, id])] };
}

export function toggleSaved(review: StudyReview, id: string): StudyReview {
  return { ...review, saved: review.saved.includes(id) ? review.saved.filter(item => item !== id) : [...review.saved, id] };
}
