import { Topic } from './types';
import { newTopic } from './newData';
import { questions } from './questions.js';

export const data: Record<string, Topic> = {};

const TOPIC_NAMES: Record<string, string> = {
  "1": "CHỦ ĐỀ 1: NHẬP MÔN CNXHKH & TIỀN ĐỀ RA ĐỜI",
  "2": "CHỦ ĐỀ 2: SỨ MỆNH LỊCH SỬ CỦA GIAI CẤP CÔNG NHÂN",
  "3": "CHỦ ĐỀ 3: CHỦ NGHĨA XÃ HỘI VÀ ĐẶC TRƯNG BẢN CHẤT",
  "4": "CHỦ ĐỀ 4: THỜI KỲ QUÁ ĐỘ LÊN CHỦ NGHĨA XÃ HỘI",
  "5": "CHỦ ĐỀ 5: DÂN CHỦ XÃ HỘI CHỦ NGHĨA",
  "6": "CHỦ ĐỀ 6: NHÀ NƯỚC XÃ HỘI CHỦ NGHĨA",
};

questions.forEach((q: any) => {
  const match = q.article.match(/Bài\s*(\d+)/i);
  const articleId = match ? match[1] : q.article;

  if (!data[articleId]) {
    data[articleId] = {
      name: TOPIC_NAMES[articleId] || `CHỦ ĐỀ ${articleId}`,
      questions: []
    };
  }

  let correct: any;
  let type: any = q.type;
  if (type === 'dragdrop') type = 'drag';
  if (type === 'multiple') type = 'multi';

  if (type === 'single') {
    correct = q.answer.charCodeAt(0) - 65;
  } else if (type === 'multi') {
    correct = q.answer.map((ans: string) => ans.charCodeAt(0) - 65);
  } else if (type === 'drag') {
    correct = {};
    for (const key in q.answer) {
      if (Array.isArray(q.answer[key])) {
        correct[key] = q.answer[key].map((idx: string) => q.options[parseInt(idx)]);
      } else {
        correct[key] = [q.options[parseInt(q.answer[key])]];
      }
    }
  }

  const questionObj: any = {
    type: type,
    q: q.text,
  };

  if (type === 'single' || type === 'multi') {
    questionObj.options = q.options;
    questionObj.correct = correct;
  } else if (type === 'truefalse') {
    questionObj.options = q.options.map((opt: string, index: number) => ({
      text: opt,
      correct: q.answer[index] === "Đúng"
    }));
  } else if (type === 'drag') {
    questionObj.columns = q.targets;
    questionObj.items = q.options;
    questionObj.correct = correct;
  } else if (type === 'fillblank') {
    questionObj.targets = q.targets;
    questionObj.correct = q.answer;
  }

  data[articleId].questions.push(questionObj);
});

// Thêm chủ đề mới từ newData.ts nếu có
if (newTopic && newTopic.questions && newTopic.questions.length > 0) {
  data['new-questions'] = newTopic;
}
