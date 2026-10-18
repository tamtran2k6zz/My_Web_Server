import { auth, db, maskEmail } from '../firebase';
import { collection, doc, onSnapshot, orderBy, query, limit, runTransaction, serverTimestamp } from 'firebase/firestore';
import { compareScores, isBetterResult, rankedTopics } from './ranking';

export interface GradeResult {
  score10: number;
  score4: number;
  gradeLetter: 'A' | 'B' | 'C' | 'D' | 'F';
  gradeText: string;
  badgeColor: string;
  textColor: string;
  borderColor: string;
  passed: boolean;
  feedback: string;
}

export interface QuestionAnswerRecord {
  questionIndex: number;
  questionText: string;
  isCorrect: boolean;
  type: string;
  userAnswerText?: string;
  correctAnswerText?: string;
}

export interface ExamRecord {
  id: string;
  userId: string;
  userEmail: string;
  maskedEmail: string;
  displayName: string;
  topicId: string;
  topicName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  grade: GradeResult;
  timeSpentSeconds: number;
  totalDurationSeconds: number;
  timestamp: number;
  dateFormatted: string;
  answers: QuestionAnswerRecord[];
}

export function calculateGrade(score: number, totalQuestions: number): GradeResult {
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  const score10 = Math.round((percentage / 10) * 10) / 10;

  if (score10 >= 8.5) {
    return {
      score10,
      score4: 4.0,
      gradeLetter: 'A',
      gradeText: 'Xuất sắc / Giỏi',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      passed: true,
      feedback: 'Xuất sắc! Bạn đã nắm vững toàn diện và sâu sắc kiến thức Chủ nghĩa Xã hội Khoa học.'
    };
  } else if (score10 >= 7.0) {
    return {
      score10,
      score4: 3.0,
      gradeLetter: 'B',
      gradeText: 'Khá',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-blue-500/10',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      passed: true,
      feedback: 'Khá tốt! Bạn đã đạt chuẩn đầu ra học phần, hãy rà soát các câu sai để bứt phá điểm A.'
    };
  } else if (score10 >= 5.5) {
    return {
      score10,
      score4: 2.0,
      gradeLetter: 'C',
      gradeText: 'Trung bình',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/10',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      passed: true,
      feedback: 'Đạt mức Trung bình. Cần dành thêm thời gian ôn luyện củng cố các nội dung lý luận trọng tâm.'
    };
  } else if (score10 >= 4.0) {
    return {
      score10,
      score4: 1.0,
      gradeLetter: 'D',
      gradeText: 'Trung bình yếu',
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40 shadow-orange-500/10',
      textColor: 'text-orange-400',
      borderColor: 'border-orange-500/30',
      passed: true,
      feedback: 'Cảnh báo: Bạn ở ngưỡng đạt tối thiểu, cần tăng cường ôn tập lại toàn bộ ngân hàng câu hỏi.'
    };
  } else {
    return {
      score10,
      score4: 0.0,
      gradeLetter: 'F',
      gradeText: 'Không đạt (Học lại)',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/10',
      textColor: 'text-rose-400',
      borderColor: 'border-rose-500/30',
      passed: false,
      feedback: 'Chưa đạt yêu cầu chuẩn. Bạn cần ôn luyện lại toàn diện các bài học trước khi thi chính thức.'
    };
  }
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

type CloudRecord = {
  userId: string; topicId: string; topicName: string; score: number; totalQuestions: number;
  timeSpentSeconds: number; totalDurationSeconds: number; maskedEmail: string;
  displayName: string; submissionId: string; submittedAt: any;
  userEmail?: string; answers?: QuestionAnswerRecord[];
};

function fromCloud(id: string, value: CloudRecord): ExamRecord {
  const timestamp = value.submittedAt?.toMillis?.() || 0;
  return {
    ...value, id, userEmail: value.userEmail || '', answers: value.answers || [],
    grade: calculateGrade(value.score, value.totalQuestions),
    percentage: value.totalQuestions ? value.score / value.totalQuestions * 100 : 0,
    timestamp, dateFormatted: new Date(timestamp).toLocaleString('vi-VN')
  };
}

export function leaderboardError(error: unknown): string {
  const code = (error as { code?: string })?.code || '';
  if (code.includes('permission-denied')) return 'Chưa có quyền truy cập bảng xếp hạng. Vui lòng đăng nhập lại hoặc liên hệ quản trị viên.';
  if (code.includes('unavailable')) return 'Chưa kết nối được dữ liệu chung. Kiểm tra mạng và thử lại.';
  if (code.includes('unauthenticated')) return 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
  return 'Không thể đồng bộ dữ liệu lúc này. Vui lòng thử lại.';
}

export function watchLeaderboard(topicId: string, next: (records: ExamRecord[]) => void, error: (error: unknown) => void): () => void {
  return onSnapshot(collection(db, 'quizLeaderboards', topicId, 'entries'), snapshot => {
    next(snapshot.docs.map(item => fromCloud(item.id, item.data() as CloudRecord)).sort(compareScores));
  }, error);
}

export function watchStudentHistory(next: (records: ExamRecord[]) => void, error: (error: unknown) => void): () => void {
  const uid = auth?.currentUser?.uid;
  if (!uid) { error({ code: 'unauthenticated' }); return () => {}; }
  return onSnapshot(query(collection(db, 'quizExamHistory', uid, 'attempts'), orderBy('submittedAt', 'desc'), limit(100)), snapshot => {
    next(snapshot.docs.map(item => fromCloud(item.id, item.data() as CloudRecord)));
  }, error);
}

const pendingKey = (uid: string) => `ictu_pending_exam_results_v1:${uid}`;

export function getPendingExamResults(uid: string): ExamRecord[] {
  try {
    const value = JSON.parse(localStorage.getItem(pendingKey(uid)) || '[]');
    return Array.isArray(value) ? value.filter(record => record.userId === uid && typeof record.id === 'string') : [];
  } catch { return []; }
}

function setPending(record: ExamRecord, pending: boolean): void {
  try {
    const records = getPendingExamResults(record.userId).filter(item => item.id !== record.id);
    if (pending) records.push(record);
    localStorage.setItem(pendingKey(record.userId), JSON.stringify(records));
  } catch { /* The result modal remains available for a manual retry. */ }
}

export async function saveExamResult(record: ExamRecord): Promise<void> {
  const user = auth?.currentUser;
  if (!user || user.uid !== record.userId) throw { code: 'unauthenticated' };
  const topic = rankedTopics.find(item => item.id === record.topicId);
  const personal = ['saved-questions', 'wrong-questions'].includes(record.topicId);
  if ((!topic && !personal) || (topic && topic.count !== record.totalQuestions) ||
      !Number.isInteger(record.score) || record.score < 0 || record.score > record.totalQuestions ||
      !Number.isInteger(record.totalQuestions) || record.totalQuestions < 1 || record.totalQuestions > 225 ||
      record.answers.length !== record.totalQuestions || record.answers.filter(answer => answer.isCorrect).length !== record.score ||
      new Set(record.answers.map(answer => answer.questionIndex)).size !== record.totalQuestions ||
      record.answers.some(answer => !Number.isInteger(answer.questionIndex) || answer.questionIndex < 0 || answer.questionIndex >= record.totalQuestions) ||
      !Number.isInteger(record.totalDurationSeconds) || record.totalDurationSeconds < 600 || record.totalDurationSeconds > 2700 ||
      !Number.isInteger(record.timeSpentSeconds) || record.timeSpentSeconds < 1 || record.timeSpentSeconds > record.totalDurationSeconds) {
    throw new Error('Invalid exam result');
  }
  setPending(record, true);
  const attempt = doc(db, 'quizExamHistory', user.uid, 'attempts', record.id);
  const best = topic ? doc(db, 'quizLeaderboards', topic.id, 'entries', user.uid) : null;
  const summary: CloudRecord = {
    userId: user.uid, topicId: record.topicId, topicName: topic?.name || record.topicName,
    score: record.score, totalQuestions: record.totalQuestions,
    timeSpentSeconds: record.timeSpentSeconds, totalDurationSeconds: record.totalDurationSeconds,
    maskedEmail: maskEmail(user.email), displayName: (user.displayName || 'Sinh viên ICTU').slice(0, 100),
    submissionId: record.id, submittedAt: serverTimestamp()
  };
  await runTransaction(db, async transaction => {
    const [existingAttempt, existingBest] = await Promise.all([transaction.get(attempt), best ? transaction.get(best) : Promise.resolve(null)]);
    if (existingAttempt.exists()) return; // Retry is idempotent.
    transaction.set(attempt, { ...summary, userEmail: user.email || '', answers: record.answers });
    if (best && (!existingBest?.exists() || existingBest.data().totalQuestions !== record.totalQuestions || isBetterResult(record, fromCloud(existingBest.id, existingBest.data() as CloudRecord)))) {
      transaction.set(best, summary);
    }
  });
  setPending(record, false);
}
