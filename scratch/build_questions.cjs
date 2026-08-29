const fs = require('fs');

// Read existing questions.js
const content = fs.readFileSync('questions.js', 'utf8');

const questionsMatch = content.match(/export const questions = (\[[\s\S]*\]);/);
if (!questionsMatch) {
  console.error("Could not find questions array in questions.js");
  process.exit(1);
}

const oldQuestions = eval(questionsMatch[1]);

const part1 = oldQuestions.filter(q => q.article === 'Bài 1');
const part2 = oldQuestions.filter(q => q.article === 'Bài 2');
const part3 = oldQuestions.filter(q => q.article === 'Bài 3');
const newQuestions = oldQuestions.filter(q => q.article === 'Bài 4').map(q => ({
  ...q,
  article: 'new-questions'
}));

// Read parsed Bai 4
const bai4Raw = JSON.parse(fs.readFileSync('parsed_bai4_debug.json', 'utf8'));

const bai4Questions = bai4Raw.map(q => {
  const qText = q.text.trim();
  const isMulti = qText.toLowerCase().includes('(chọn 2 đáp án') ||
                  qText.toLowerCase().includes('(hãy chọn 2 đáp án') ||
                  qText.toLowerCase().includes('(chọn nhiều');
  
  const options = [];
  const correctIndices = [];

  q.options.forEach((opt, optIdx) => {
    options.push(opt.text.trim());
    if (opt.has_color || opt.has_underline || opt.has_highlight || (opt.has_bold && !q.options.some(o => o.has_color))) {
      correctIndices.push(optIdx);
    }
  });

  let ans;
  let qType;
  if (isMulti) {
    ans = correctIndices.map(idx => String.fromCharCode(65 + idx));
    qType = 'multiple';
  } else {
    ans = correctIndices.length > 0 ? String.fromCharCode(65 + correctIndices[0]) : 'A';
    qType = 'single';
  }

  return {
    article: 'Bài 4',
    text: qText,
    options: options,
    answer: ans,
    type: qType
  };
});

console.log(`Part 1: ${part1.length} questions`);
console.log(`Part 2: ${part2.length} questions`);
console.log(`Part 3: ${part3.length} questions`);
console.log(`Part 4 (New from docx): ${bai4Questions.length} questions`);
console.log(`New questions topic: ${newQuestions.length} questions`);

const allQuestions = [
  ...part1,
  ...part2,
  ...part3,
  ...bai4Questions,
  ...newQuestions
];

console.log(`Total questions: ${allQuestions.length}`);

// Write formatted questions.js
const fileContent = `export const questions = ` + JSON.stringify(allQuestions, null, 2) + `;\n`;
fs.writeFileSync('questions.js', fileContent, 'utf8');
console.log("Successfully written questions.js");
