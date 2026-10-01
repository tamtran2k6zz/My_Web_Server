import { maskEmail } from '../firebase';

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

const STORAGE_KEY = 'ictu_exam_records_v1';

// Initial realistic benchmark rankings for ICTU students
const initialMockLeaderboard: ExamRecord[] = [
  {
    id: 'mock-1',
    userId: 'u-1',
    userEmail: 'nguyenvanh@ictu.edu.vn',
    maskedEmail: 'ng***nh@ictu.edu.vn',
    displayName: 'Nguyễn Văn H.',
    topicId: 'review-all',
    topicName: 'Khảo thí toàn bộ ngân hàng đề',
    score: 39,
    totalQuestions: 40,
    percentage: 97.5,
    grade: calculateGrade(39, 40),
    timeSpentSeconds: 1140, // 19m 00s
    totalDurationSeconds: 1800,
    timestamp: Date.now() - 3600000 * 5,
    dateFormatted: new Date(Date.now() - 3600000 * 5).toLocaleString('vi-VN'),
    answers: []
  },
  {
    id: 'mock-2',
    userId: 'u-2',
    userEmail: 'tranminhkhoi@ictu.edu.vn',
    maskedEmail: 'tr***oi@ictu.edu.vn',
    displayName: 'Trần Minh K.',
    topicId: 'review-4-6',
    topicName: 'Ôn tập Tổng hợp Phần 4 – 6',
    score: 38,
    totalQuestions: 40,
    percentage: 95.0,
    grade: calculateGrade(38, 40),
    timeSpentSeconds: 1260, // 21m
    totalDurationSeconds: 1800,
    timestamp: Date.now() - 3600000 * 12,
    dateFormatted: new Date(Date.now() - 3600000 * 12).toLocaleString('vi-VN'),
    answers: []
  },
  {
    id: 'mock-3',
    userId: 'u-3',
    userEmail: 'lethuyduong@ictu.edu.vn',
    maskedEmail: 'le***ng@ictu.edu.vn',
    displayName: 'Lê Thùy D.',
    topicId: 'review-1-3',
    topicName: 'Ôn tập Tổng hợp Phần 1 – 3',
    score: 37,
    totalQuestions: 40,
    percentage: 92.5,
    grade: calculateGrade(37, 40),
    timeSpentSeconds: 1080,
    totalDurationSeconds: 1800,
    timestamp: Date.now() - 3600000 * 24,
    dateFormatted: new Date(Date.now() - 3600000 * 24).toLocaleString('vi-VN'),
    answers: []
  },
  {
    id: 'mock-4',
    userId: 'u-4',
    userEmail: 'hoangvietanh@ictu.edu.vn',
    maskedEmail: 'ho***nh@ictu.edu.vn',
    displayName: 'Hoàng Việt A.',
    topicId: '6',
    topicName: 'Phần 6: Vấn đề Gia đình trong TKQĐ',
    score: 26,
    totalQuestions: 27,
    percentage: 96.3,
    grade: calculateGrade(26, 27),
    timeSpentSeconds: 780,
    totalDurationSeconds: 1200,
    timestamp: Date.now() - 3600000 * 30,
    dateFormatted: new Date(Date.now() - 3600000 * 30).toLocaleString('vi-VN'),
    answers: []
  },
  {
    id: 'mock-5',
    userId: 'u-5',
    userEmail: 'dangquanghuy@ictu.edu.vn',
    maskedEmail: 'da***uy@ictu.edu.vn',
    displayName: 'Đặng Quang H.',
    topicId: 'review-all',
    topicName: 'Khảo thí toàn bộ ngân hàng đề',
    score: 35,
    totalQuestions: 40,
    percentage: 87.5,
    grade: calculateGrade(35, 40),
    timeSpentSeconds: 1410,
    totalDurationSeconds: 1800,
    timestamp: Date.now() - 3600000 * 48,
    dateFormatted: new Date(Date.now() - 3600000 * 48).toLocaleString('vi-VN'),
    answers: []
  }
];

export function getExamLeaderboard(): ExamRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockLeaderboard));
      return initialMockLeaderboard;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return sortLeaderboard(parsed);
    }
    return initialMockLeaderboard;
  } catch (e) {
    return initialMockLeaderboard;
  }
}

export function saveExamResult(record: ExamRecord): ExamRecord[] {
  const current = getExamLeaderboard();
  const updated = [record, ...current.filter(item => item.id !== record.id)];
  const sorted = sortLeaderboard(updated);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
  } catch (e) {
    console.error("Could not save to localStorage", e);
  }
  return sorted;
}

export function getStudentExamHistory(email?: string): ExamRecord[] {
  if (!email) return [];
  const normalized = email.toLowerCase().trim();
  const all = getExamLeaderboard();
  return all.filter(r => (r.userEmail || '').toLowerCase().trim() === normalized);
}

function sortLeaderboard(records: ExamRecord[]): ExamRecord[] {
  return [...records].sort((a, b) => {
    // 1. Highest score10
    if (b.grade.score10 !== a.grade.score10) {
      return b.grade.score10 - a.grade.score10;
    }
    // 2. Faster time spent
    if (a.timeSpentSeconds !== b.timeSpentSeconds) {
      return a.timeSpentSeconds - b.timeSpentSeconds;
    }
    // 3. More recent
    return b.timestamp - a.timestamp;
  });
}
