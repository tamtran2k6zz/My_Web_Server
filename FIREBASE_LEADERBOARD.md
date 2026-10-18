# Bảng xếp hạng Firestore

Database: `login-kinh-te-mac`, `(default)`, `asia-southeast1`.

- `quizLeaderboards/{topicId}/entries/{uid}`: một kết quả tốt nhất mỗi user/phần; chỉ tên, email che và điểm tóm tắt.
- `quizExamHistory/{uid}/attempts/{submissionId}`: lịch sử riêng, chỉ chủ tài khoản đọc và tạo; không sửa/xóa từ client.
- Chỉ email ICTU đã xác minh được truy cập. Điểm và lịch sử được ghi trong cùng transaction. Retry cùng submissionId không nhân đôi kết quả.
- Xếp theo tỷ lệ đúng chính xác, thời gian ngắn hơn, thời điểm sớm hơn, uid. Lượt thấp hơn vẫn có lịch sử nhưng không thay điểm tốt nhất.
- Câu đã lưu/câu sai là đề cá nhân nên chỉ lưu lịch sử, không xếp hạng chung.
- Dữ liệu demo cũ không được nhập lên database. Bài chưa đồng bộ lưu riêng theo uid trong trình duyệt và có nút gửi lại.
- Đây là công cụ tự luyện: điểm do client gửi, không thay thế hệ thống chấm thi có giám sát trên server.

Kiểm tra:

```powershell
npm run typecheck
npm run check:questions
npm run check:review
$env:JAVA_HOME='C:\Program Files\Java\jdk-24'
$env:PATH="$env:JAVA_HOME\bin;$env:PATH"
npx firebase-tools emulators:exec --only firestore --project demo-quiz-ranking "node scripts/check-leaderboard.mjs"
npm run build
```

Sau khi thay đổi rules, kiểm thử emulator rồi xuất bản `firestore.rules` vào đúng project. Không mở quyền read/write toàn database.
