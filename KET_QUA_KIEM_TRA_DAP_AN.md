# Kết quả kiểm tra ngân hàng câu hỏi

> Báo cáo ghi nhận trạng thái trước khi sửa. Các mục đã được xử lý trong mã nguồn ngày 10/10/2026; xem [chi tiết cập nhật](CAP_NHAT_DAP_AN.md). Những số dòng bên dưới thuộc phiên bản trước khi sửa.

Ngày kiểm tra: 10/10/2026.

**Kết luận: chưa thể coi toàn bộ đáp án là đúng.** Có đáp án cần đổi, câu chỉ cho chọn một đáp án nhưng có nhiều phương án hợp lý, và câu cần sửa nội dung trước khi chấm tự động.

## Phạm vi và cách kiểm tra

- Đã đọc toàn bộ 225 câu trong `questions.js` và 35 câu trong `newData.ts`: tổng cộng 260 câu ứng dụng sử dụng qua `data.ts`.
- `questions.js`: Bài 1 có 40 câu; Bài 2 có 40; Bài 3 có 37; Bài 4 có 41; Bài 5 có 40; Bài 6 có 27.
- Đã kiểm tra cấu trúc đáp án: chữ cái/chỉ số hợp lệ, độ dài đáp án đúng/sai, ánh xạ kéo thả, số đáp án phải chọn. Không phát hiện lỗi cấu trúc trong các kiểm tra này.
- Đã đối chiếu các điểm nghi vấn với giáo trình và tài liệu giảng dạy công khai. Bản giáo trình CNXHKH toàn văn đọc được là bản thảo Bộ GD&ĐT năm 2019, đã sửa sau dạy thí điểm; không phải bản in 2021. Những điểm phụ thuộc bản giáo trình hoặc cách phân loại của giảng viên được ghi rõ.
- Các câu còn lại chưa phát hiện lỗi rõ trong lượt rà soát; đây không phải xác nhận từng câu đều khớp đáp án chính thức của giảng viên.
- Chỉ tạo báo cáo này, chưa thay đổi câu hỏi hoặc đáp án gốc.

## Các điểm cần sửa rõ ràng

| Vị trí | Đáp án/nội dung hiện tại | Kết quả và đề xuất |
|---|---|---|
| `questions.js:1671` — Bài 4, câu 16 | C — 2 quy luật | **Đổi thành A — 3 quy luật.** Giáo trình trình bày ba xu hướng biến đổi có tính quy luật. [Nguồn](https://hcmunre.edu.vn/upload/elfinder/Trang%20Khoa/Khoa%20Luat%20%26LLCT/Ph%E1%BA%A7n%202_GT%20h%E1%BB%8Dc%20ph%E1%BA%A7n%20Ch%E1%BB%A7%20ngh%C4%A9a%20x%C3%A3%20h%E1%BB%99i%20khoa%20h%E1%BB%8Dc%20%28K%29%20Tr%2067%20-Tr144.pdf) |
| `questions.js:1599` — Bài 4, câu 10 | C — 5 giai cấp, tầng lớp | **Theo bản giáo trình đối chiếu, phải là D — 6:** công nhân, nông dân, trí thức, doanh nhân, phụ nữ, thanh niên. Nếu giảng viên chỉ tính một nhóm riêng thì phải ghi tiêu chí đó vào đề. [Giáo trình, tr. 95–97](https://blog.baitaptracnghiem.com/wp-content/uploads/2025/01/giao-trinh-chu-nghia-xa-hoi-khoa-hoc-cnxhkh-khong-chuyen-20240716031811-eqjnc.pdf#page=95) |
| `newData.ts:64` — câu 33(Bài 2) | `correct: 2` — C | **Nên đổi thành `correct: 1` — B.** B nêu đầy đủ tính lặp lại có định kỳ; C chỉ nêu sự lặp lại. [Giáo trình kinh tế chính trị, tr. 61](https://hcmunre.edu.vn/upload/elfinder/Trang%20Khoa/Khoa%20Luat%20%26LLCT/Ph%E1%BA%A7n%201_GT%20h%E1%BB%8Dc%20ph%E1%BA%A7n%20Kinh%20t%E1%BA%BF%20ch%C3%ADnh%20tr%E1%BB%8B%20MNL%28K%29%20Tr%20%C4%91%E1%BA%A7u-%20Tr100.pdf) |
| `questions.js:665` — Bài 2, câu 13 | Chọn phương án sai; chỉ chấm A | **A và D đều sai.** D viết “tất yếu chủ quan”, trong khi câu 33 cùng bài dùng “tất yếu khách quan”. Giữ dạng một đáp án thì sửa D thành “khách quan”; hoặc đổi dạng nhiều đáp án và chấm A, D. |
| `questions.js:1163` — Bài 3, câu 13 | Chỉ chấm C | **A, B, C đều mô tả đặc điểm phù hợp.** Nếu muốn chấm C duy nhất, nên hỏi đặc điểm về cơ sở tổ chức và hoạt động. [Tài liệu về các đặc trưng của Nhà nước pháp quyền XHCN](https://tapchiquyenconnguoi.hcma.vn/Content/nha-nuoc-phap-quyen-xa-hoi-chu-nghia-viet-nam---nhung-gia-tri-dac-trung-pho-bien-va-tinh-dac-thu-5128) |
| `questions.js:281` — Bài 1, câu 24 | “nguồn bổ sung lực lượng phụ cho Đảng” | **Sai nội dung câu dẫn**, dù D là cặp từ dự kiến. Nên bỏ “phụ”, dùng “quan trọng” hoặc “phong phú” theo đúng bản trích dẫn. [Giáo trình, tr. 35](https://blog.baitaptracnghiem.com/wp-content/uploads/2025/01/giao-trinh-chu-nghia-xa-hoi-khoa-hoc-cnxhkh-khong-chuyen-20240716031811-eqjnc.pdf#page=35) |
| `questions.js:1944` — Bài 4, câu 37 | Xếp “Đảng Cộng sản” vào “Nội dung/phương hướng của liên minh” | **Ghép sai loại.** Đây là chủ thể lãnh đạo, không phải nội dung/phương hướng. Có thể chuyển chỉ số `"4"` sang nhóm “Thành phần/yếu tố”, nhưng tốt hơn là thêm nhóm “Chủ thể lãnh đạo” riêng. |
| `newData.ts:256` — câu 30(Bài 4) | B — “Quy luật tỷ suất lợi nhuận bình quân” | **Cần sửa chính phương án B thành “Quy luật lợi nhuận bình quân”.** Giữ `correct: 1` sau khi sửa chữ. [Giáo trình kinh tế chính trị, tr. 82](https://iuv.edu.vn/cms/plugin_upload/preview/news/1468/1111/gt-kinh-te-chinh-tri-m-l-bo-gddt.pdf#page=84) |
| `newData.ts:311` — câu 35(Bài 4) | D — Đầu tư trực tiếp ra nước ngoài | **Không có định nghĩa đầy đủ trong bốn lựa chọn.** A và D là hai hình thức; C lại gộp A với xuất khẩu hàng hóa. Nên viết một lựa chọn về đưa giá trị ra nước ngoài nhằm thu lợi, hoặc hỏi “những hình thức xuất khẩu tư bản” rồi chấm A, D. [Giáo trình kinh tế chính trị, tr. 96](https://iuv.edu.vn/cms/plugin_upload/preview/news/1468/1111/gt-kinh-te-chinh-tri-m-l-bo-gddt.pdf#page=98) |

## Các câu cần làm rõ trước khi khẳng định đáp án duy nhất

Các mục này là nhận xét về phạm vi câu hỏi, tính phân biệt của lựa chọn và khả năng chấm công bằng; không nên tự động đổi đáp án khi chưa sửa đề.

| Vị trí | Vấn đề | Đề xuất |
|---|---|---|
| `questions.js:209` — Bài 1, câu 18 | Hỏi chung về “giải pháp”, nhưng A cũng là biện pháp có thể thực hiện; đề có vẻ muốn phân biệt “phương hướng” và “giải pháp” theo mục giáo trình. | Ghi rõ căn cứ mục giáo trình, hoặc hỏi cụ thể giải pháp gắn chiến lược phát triển kinh tế – xã hội để B duy nhất. |
| `questions.js:233` — Bài 1, câu 20 | D khái quát tình trạng làm thuê, không sở hữu TLSX cho mọi bối cảnh. | Thêm “trong quan hệ sản xuất tư bản chủ nghĩa” nếu giữ C, D. |
| `questions.js:245` — Bài 1, câu 21 | B nói áp bức thực dân, phong kiến nhưng câu hỏi không đặt trong thời thuộc địa. | Thêm mốc/bối cảnh lịch sử. |
| `questions.js:443` — Bài 1, câu 36 | Ghép vế 2 thành “là giải phóng khỏi…” thiếu đối tượng được giải phóng; vế 1 đặt trong lời dẫn của Ăngghen nhưng dùng thuật ngữ khác câu 13. | Bổ sung đối tượng ở vế 2; nếu trích nguyên văn, kiểm tra lại toàn bộ lời trích và thuật ngữ ở vế 1. |
| `questions.js:507` — Bài 1, câu 40 | “Tiền đề khoa lịch sử” là cụm lỗi. | Sửa phương án A; giữ C, D nếu hỏi đúng hai nhóm tiền đề tư tưởng – lý luận và khoa học tự nhiên. |
| `questions.js:901` — Bài 2, câu 32 | B “mâu thuẫn giữa năng suất lao động và nhu cầu phát triển xã hội” có thể hiểu là một mâu thuẫn thực tiễn; chưa đủ cơ sở buộc loại B và chỉ chọn C, D. | Thay B bằng một phát biểu sai rõ ràng hoặc giới hạn câu hỏi theo danh mục cụ thể. |
| `questions.js:1187` — Bài 3, câu 15 | C “nền dân chủ mang tính tập thể” quá chung, chưa phân biệt được bản chất dân chủ XHCN. | Thay C bằng một đặc điểm lý luận chính xác; sau đó xét lại khóa A, C. |
| `questions.js:1247` — Bài 3, câu 20 | Hỏi “tại sao quyền lực thống nhất” nhưng C mô tả phối hợp, kiểm soát cơ quan. | Hỏi trực tiếp nguyên tắc tổ chức quyền lực hoặc viết lại phương án để trả lời đúng lý do. |
| `questions.js:1398` — Bài 3, câu 32, phát biểu 4 | “Không được phân quyền rõ ràng” dễ lẫn “phân quyền” với “phân công”. | Dùng thuật ngữ “phân công, phối hợp và kiểm soát” để khóa Sai rõ nghĩa. |
| `questions.js:1445` — Bài 3, câu 35, phát biểu 4 | “Thực hiện chuyên chính với các giai cấp khác” quá rộng; không phân biệt nhân dân lao động và lực lượng chống đối. | Viết lại phát biểu trước khi quyết định Đúng/Sai. |
| `questions.js:1457` — Bài 3, câu 36, phát biểu 4 | Khẳng định dân chủ luôn là phạm trù lịch sử mà không giới hạn nghĩa “chế độ chính trị”. | Thêm “với tư cách là một chế độ chính trị”; nếu xét giá trị xã hội, cách hiểu khác. |
| `questions.js:1932` — Bài 4, câu 36 | C “Phát huy tính thiên đoàn kết” không có nghĩa rõ ràng. | Sửa thành “Phát huy tinh thần đoàn kết thống nhất” để có thể chấm C, D. |
| `questions.js:1967` — Bài 4, câu 38 | Chốt 5 giai cấp, tầng lớp cho thời kỳ quá độ nói chung, không ghi quốc gia/tiêu chí; lặp vấn đề câu 10. | Nêu rõ Việt Nam và danh mục giáo trình sử dụng; không coi 5 là con số chung cho mọi nước. |
| `questions.js:2076` — Bài 5, câu 5 | A nói hình thái ý thức xã hội, C nói kiến trúc thượng tầng: hai phạm vi có quan hệ bao hàm. | Hỏi “Tôn giáo là một hình thái của…?” và sửa các lựa chọn tương ứng để A duy nhất. |
| `questions.js:2220`, `2406` — Bài 5, câu 17 và câu 31, vế 2 | Dùng “dân tộc” nhưng chưa xác định nghĩa quốc gia hay tộc người. | Thêm “dân tộc – quốc gia” khi hỏi vai trò liên kết của kinh tế. |
| `questions.js:2364`, `2465` — Bài 5, câu 29 và 35 | Đặc trưng ngôn ngữ, văn hóa có thể giao nhau giữa hai nghĩa dân tộc; phân nhóm thành hai tập loại trừ nhau dễ gây hiểu sai. | Ghi “các đặc trưng được liệt kê trong từng mục giáo trình”, hoặc thiết kế lại ghép nối. |
| `questions.js:2385` — Bài 5, câu 30 | Nhóm “Yếu tố liên quan đến tôn giáo” bao trùm cả tâm lý, kinh tế, nhận thức ở nhóm nguồn gốc. | Đổi tên nhóm đầu thành yếu tố cấu thành/biểu hiện cụ thể, bảo đảm hai nhóm không chồng lấn. |
| `questions.js:2487` — Bài 5, câu 36, vế 2 | “Yếu tố thúc đẩy bình đẳng dân tộc” quá rộng để chỉ có “cơ sở pháp lý” là đáp án. | Hỏi rõ yếu tố bảo đảm về mặt pháp luật. |
| `questions.js:2871` — Bài 6, câu 26 | “Gia đình đơn thân” là dạng gia đình, không tự nó mô tả quy mô. | Đổi tên nhóm thành “quy mô và hình thức gia đình”, hoặc thay lựa chọn. |
| `newData.ts:31` — câu 30(Bài 2) | A “thuộc tính sử dụng” gần đồng nghĩa với D “giá trị sử dụng”. | Đổi A thành phương án sai rõ ràng nếu giữ B, D. |
| `newData.ts:152` — câu 30(Bài 3) | A và D trùng “Quy mô sản xuất tăng lên”. | Thay một phương án nhiễu; đáp án C chưa phát hiện sai trong ngữ cảnh tái sản xuất tư bản. |
| `newData.ts:201` — câu 34(Bài 3) | D “cân bằng lợi ích trước mắt và lâu dài” quá chung so với nguyên nhân tích lũy. | Nêu rõ mở rộng sản xuất, tăng năng lực cạnh tranh trong lựa chọn đúng. |
| `newData.ts:338` — câu 30(Bài 5), vế 1 | “Cơ chế thị trường dựa trên phân công lao động xã hội” dễ lẫn với điều kiện ra đời sản xuất hàng hóa. | Nếu giữ đáp án hiện tại, đổi chủ ngữ thành “sản xuất hàng hóa”; nếu hỏi cơ chế thị trường thì viết lại cả vế và đáp án cho chính xác. |
| `newData.ts:371` — câu 22(Bài 6) | B là phương án hợp lý nhất trong bốn lựa chọn, nhưng “tri thức” vắng mặt dù đề hỏi kinh tế tri thức. | Bổ sung/đổi lựa chọn thành “tri thức” nếu muốn hỏi nguồn lực cốt lõi; tránh coi thông tin và tri thức là hoàn toàn đồng nhất. |

## Những điểm dễ nhầm đã kiểm tra thêm

- `newData.ts`, câu 36(Bài 2): khóa Đúng – Sai – Sai – Đúng phù hợp. Với `v = 2.000 USD`, giá trị mới `v + m` lần lượt là 6.000; 10.000; 8.000; 4.000 USD khi tỷ suất thặng dư là 200%; 400%; 300%; 100%.
- `questions.js`, Bài 6 câu 15: không nên tự đổi sang C chỉ vì quan niệm bình đẳng vợ chồng. Câu này có vẻ hỏi danh mục mô hình mô tả trong giáo trình, nên A là đáp án dự kiến; nên thêm “theo các mô hình được giáo trình liệt kê” để tránh khẳng định ông bà không thể làm chủ hộ trong thực tế.
- `questions.js`, Bài 5 câu 14: C — 16 tôn giáo có căn cứ; không nhầm với số tổ chức tôn giáo. Nên gắn mốc số liệu. [Báo Nhân Dân ngày 14/4/2026, dẫn số liệu năm 2025](https://cdn.nhandan.vn/files/65482654329375d277b8e63d55631c88d4acd48ee43659d3edac3db3a2f2eaf2454fa1be70939be6691a92401fbfd009b7ae13cda333b1a658a4aa09dbd85477/baonhandanso25716.pdf).
- 35 câu bổ sung chủ yếu thuộc Kinh tế chính trị Mác – Lênin, trong khi sáu bài chính là CNXHKH. Đây là khác biệt về học phần, cần lưu ý khi dùng chế độ ôn tập tổng hợp.
- README ghi số lượng và mô tả cũ, không phản ánh đúng 260 câu thực tế. Đây không phải lỗi đáp án.

## Ưu tiên xử lý

1. Sửa ba khóa trả lời ở Bài 4 câu 16, Bài 4 câu 10 (theo bản giáo trình đã nêu) và câu 33(Bài 2) của bộ bổ sung.
2. Sửa sáu câu có lỗi câu dẫn, loại đáp án hoặc thiếu đáp án đầy đủ trong bảng đầu; tránh chỉ đổi chữ cái khi đề vẫn nhập nhằng.
3. Chốt lại các câu phụ thuộc phạm vi/thuật ngữ với giáo trình của học phần, rồi mới coi ngân hàng đủ chuẩn để chấm tự động.
