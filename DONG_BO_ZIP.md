# Đồng bộ đáp án theo ZIP ngày 17/10/2026

Theo yêu cầu mới, nội dung và đáp án màu đỏ trong `Chủ Nghĩa Xã Hội Khoa Học.zip` là chuẩn cho sáu phần CNXHKH. Đã đọc trực tiếp sáu file Word, gồm 225 câu và 21 bảng kéo thả. Các điều chỉnh theo giáo trình ở lần trước được thay bằng nội dung trong ZIP khi có khác biệt. Bộ bổ sung 35 câu và tính năng lưu câu, ôn câu sai, làm lại toàn bộ được giữ nguyên.

Đây là đồng bộ với tài liệu người dùng chỉ định, không phải một lần thẩm định lại tính chính xác học thuật của tài liệu.

## Các câu trong ảnh

- Bài 1 câu 35 khôi phục câu dẫn và ghép theo đúng bốn hàng Word: nhân tố chủ quan; chủ thể; lực lượng sản xuất; phương thức sản xuất. Hai câu dẫn cuối lần lượt dùng “tiên tiến”, “hiện đại”.
- Bài 1 câu 39 giữ các khóa Đúng, Đúng, Sai, Đúng theo thứ tự trong Word. Khi web xáo trộn các phát biểu, đáp án luôn đi cùng phát biểu tương ứng.
- Trong ảnh kéo thả, “chủ thể” cần nằm ở hàng về quá trình sản xuất vật chất hiện đại; không nằm ở hàng về phương thức sản xuất.

## Phạm vi đối chiếu

- So với bản web trước đồng bộ, 61 câu có khác biệt về nội dung, câu dẫn, cách ghép, thứ tự phương án hoặc khóa chấm sau khi chuẩn hóa khoảng trắng.
- Các khóa chữ cái khôi phục theo ZIP gồm Bài 1 câu 24: A; Bài 2 câu 13: D, chọn một; Bài 4 câu 10: A; Bài 4 câu 38: C. Bài 4 câu 37 trở lại hai nhóm đúng như bảng Word.
- Bài 3 câu 33 cũng lấy cách ghép được in trong Word làm chuẩn. Các nhận xét học thuật của báo cáo trước không tự động ghi đè đáp án từ ZIP.
- Chỉ chuẩn hóa khoảng trắng, Unicode và chuyển lời hướng dẫn chọn nhiều đáp án sang định dạng hiển thị của web; không tự sửa lại nội dung theo một nguồn khác.

## Kiểm tra và cập nhật nguồn

`fixtures/cnxh-zip-answer-key.json` lưu dấu SHA-256 của ZIP, sáu file Word và toàn bộ 225 câu sau khi trích xuất. `npm run check:questions` so sánh đủ 225 câu với dấu kiểm tra nguồn và kiểm tra cấu trúc cả 260 câu qua bộ chuyển đổi dữ liệu của web. `npm run check:review` kiểm tra tính năng ôn lại.

Để đồng bộ khi có ZIP mới, chạy `python scripts/sync-zip-questions.py "đường dẫn tới ZIP"`, sau đó chạy các lệnh kiểm tra và build. Công cụ chỉ đọc ZIP, không sửa file Word hoặc ZIP gốc.
