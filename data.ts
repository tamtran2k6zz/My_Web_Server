import { Topic } from './types';
import { questions } from './questions.js';
import { newTopic } from './newData';

export const data: Record<string, Topic> = {
  "1": {
    name: "PHẦN 1: NHẬP MÔN CNXHKH & SỨ MỆNH LỊCH SỬ CỦA GIAI CẤP CÔNG NHÂN",
    questions: []
  },
  "2": {
    name: "PHẦN 2: CHỦ NGHĨA XÃ HỘI VÀ THỜI KỲ QUÁ ĐỘ LÊN CHỦ NGHĨA XÃ HỘI",
    questions: []
  },
  "3": {
    name: "PHẦN 3: DÂN CHỦ XÃ HỘI CHỦ NGHĨA VÀ NHÀ NƯỚC XÃ HỘI CHỦ NGHĨA",
    questions: []
  },
  "4": {
    name: "PHẦN 4: CƠ CẤU XÃ HỘI – GIAI CẤP VÀ LIÊN MINH GIAI CẤP, TẦNG LỚP",
    questions: []
  },
  "5": {
    name: "PHẦN 5: ĐANG CẬP NHẬT",
    questions: []
  },
  "6": {
    name: "PHẦN 6: ĐANG CẬP NHẬT",
    questions: []
  },
  "new-questions": {
    name: "BỘ CÂU HỎI MỚI (BỔ SUNG)",
    questions: []
  }
};

questions.forEach((q: any) => {
  const match = q.article.match(/Bài\s*(\d+)/i);
  const articleId = match ? match[1] : (q.article === 'new-questions' || q.article === 'Bài new-questions' ? 'new-questions' : q.article);

  if (!data[articleId]) {
    data[articleId] = {
      name: `PHẦN ${articleId}`,
      questions: []
    };
  }

  let correct: any;
  let type: any = q.type;
  if (type === 'dragdrop') type = 'drag';
  if (type === 'multiple') type = 'multi';

  if (type === 'single') {
    correct = typeof q.answer === 'string' ? q.answer.charCodeAt(0) - 65 : 0;
  } else if (type === 'multi') {
    correct = Array.isArray(q.answer) ? q.answer.map((ans: string) => ans.charCodeAt(0) - 65) : [];
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

if (newTopic && Array.isArray(newTopic.questions)) {
  newTopic.questions.forEach((nq: any) => {
    const isDuplicate = data["new-questions"].questions.some((eq: any) => eq.q === nq.q);
    if (!isDuplicate) {
      data["new-questions"].questions.push(nq);
    }
  });
}

