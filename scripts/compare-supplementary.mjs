import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { questions } from '../questions.js';

const bundle = await build({ entryPoints: [fileURLToPath(new URL('../newData.ts', import.meta.url))], bundle: true, write: false, platform: 'node', format: 'esm' });
const { newTopic } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const manifest = JSON.parse(readFileSync(new URL('../fixtures/cnxh-zip-answer-key.json', import.meta.url), 'utf8'));
const stripNumber = value => value.replace(/^Câu\s*\d+(?:\s*\(Bài\s*\d+\))?\s*:\s*/iu, '');
const normalize = value => stripNumber(value).normalize('NFC').toLowerCase()
  .replace(/\(chọn\s+\d+\s+đáp án[^)]*\)/giu, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const units = q => q.type === 'truefalse' ? q.options.map(option => typeof option === 'string' ? option : option.text)
  : ['drag', 'dragdrop'].includes(q.type) ? q.columns || q.targets : [q.q || q.text];
const zipUnits = questions.flatMap(q => units(q).map(text => ({ question: q, text, key: normalize(text) })));
const matches = [];
for (const q of newTopic.questions) {
  for (const text of units(q)) {
    for (const target of zipUnits) {
      if (normalize(text) && normalize(text) === target.key) matches.push({ supplementary: q.q, supplementaryText: text, zip: `${target.question.article}, ${target.question.text.split(':')[0]}`, zipText: target.text });
    }
  }
}
console.log(JSON.stringify({ supplementary: newTopic.questions.length, zipQuestions: manifest.questions.length, exactQuestionOrStatementMatches: matches }, null, 2));

// Semantic notes follow a manual reading of all 35 supplementary questions and
// all ZIP prompts, including their true/false statements and matching targets.
const semantic = {
  'Câu 24(Bài 6)': ['Gần trùng ý', 'Bài 2 câu 5: cùng hỏi mâu thuẫn giữa lực lượng sản xuất và quan hệ sản xuất dẫn tới sự thay thế chủ nghĩa tư bản. Câu ZIP diễn đạt cụ thể hơn.'],
  'Câu 23(Bài 6)': ['Chỉ gần chủ đề', 'Bài 2 câu 18 và Bài 5 câu 32 có nội dung bản sắc văn hóa; không hỏi biện pháp hạn chế mất bản sắc khi hội nhập.'],
  'Câu 26(Bài 6)': ['Chỉ gần chủ đề', 'Bài 1 câu 17, câu 31 nói lao động công nghiệp/vận hành máy móc; Bài 4 câu 13 hỏi lực lượng đi đầu công nghiệp hóa. Không trùng định nghĩa công nghiệp hóa.'],
  'Câu 30(Bài 5)': ['Chỉ gần chủ đề', 'Bài 2 câu 34 có kinh tế thị trường định hướng XHCN; Bài 1 câu 25 có vai trò Đảng. Không trùng bộ bốn phát biểu kéo thả.']
};
const descriptions = {
  'Câu 36(Bài 2)': 'Bài tính giá trị mới với tư bản khả biến 2.000 USD và các tỷ suất giá trị thặng dư khác nhau',
  'Câu 33(Bài 3)': 'Đúng/sai về cấu tạo hữu cơ, tích tụ tư bản, quy mô tích lũy và bần cùng hóa',
  'Câu 36(Bài 4)': 'Đúng/sai về độc quyền, cạnh tranh và vai trò của tín dụng',
  'Câu 30(Bài 5)': 'Kéo thả về phân công lao động, cơ chế thị trường, vai trò Đảng và định hướng XHCN'
};
const rows = newTopic.questions.map(q => {
  const label = q.q.split(':')[0];
  const [status, detail] = semantic[label] || ['Không phát hiện trùng', 'Không có câu tương đương trong sáu bài ZIP.'];
  return `| ${label} | ${(descriptions[label] || stripNumber(q.q)).replace(/\|/g, '/')} | ${status} | ${detail} |`;
});
const report = `# Đối chiếu bộ câu hỏi bổ sung với ZIP

Ngày kiểm tra: 18/10/2026.

Đã đối chiếu đủ **35 câu bổ sung** trong newData.ts với **225 câu của 6 bài CNXHKH** đã đồng bộ từ ZIP. Dấu kiểm tra nguồn nằm trong fixtures/cnxh-zip-answer-key.json; lệnh npm run check:questions xác nhận ngân hàng sáu bài vẫn khớp nguồn này.

**Kết quả:** ${matches.length} cặp trùng nguyên văn sau khi bỏ số câu, chuẩn hóa chữ hoa/thường, dấu câu và khoảng trắng. Qua đọc nội dung, có **1 câu gần trùng ý**, **3 câu chỉ gần chủ đề**, **31 câu không phát hiện trùng**. Không coi giống vài từ khóa, cùng số câu hoặc cùng số “Bài” là trùng nội dung.

Cặp gần trùng ý: **bổ sung câu 24(Bài 6)** và **ZIP Bài 2 câu 5**. Cả hai dùng mâu thuẫn giữa lực lượng sản xuất và quan hệ sản xuất để giải thích xu hướng thay thế chủ nghĩa tư bản. Câu bổ sung viết ngắn hơn; đây không phải bản sao nguyên văn.

Phần lớn bộ bổ sung thuộc Kinh tế chính trị (hàng hóa, sức lao động, tuần hoàn/chu chuyển, tích lũy tư bản, độc quyền). Sáu bài ZIP là Chủ nghĩa xã hội khoa học. Nhãn “Bài 1–6” của bộ bổ sung không có nghĩa là cùng bài trong ZIP.

## Danh sách 35 câu

| Câu bổ sung | Nội dung | Kết quả | Ghi chú đối chiếu |
|---|---|---|---|
${rows.join('\n')}

## Thay đổi trên web

Đã bỏ thẻ **Bộ câu hỏi mới (Bổ sung)** và ngừng nạp 35 câu này vào ngân hàng chạy trên web. Vì vậy các câu này cũng không xuất hiện trong ôn toàn bộ, chuyên đề theo dạng bài hoặc danh sách ôn lại. Web còn **225 câu của sáu bài trong ZIP**, giữ nguyên đáp án nguồn.

Giữ newData.ts làm bản lưu để có thể kiểm chứng báo cáo; file này không còn được nhập vào ứng dụng. Không xóa lịch sử bài thi đã lưu trên máy người dùng.

Kiểm tra văn bản có thể chạy lại bằng lệnh node scripts/compare-supplementary.mjs; nhận xét gần trùng ý là kết quả đọc nội dung, không phải kết luận tự động từ độ giống từ khóa.
`;
writeFileSync(new URL('../BAO_CAO_TRUNG_CAU_BO_SUNG.md', import.meta.url), report);
