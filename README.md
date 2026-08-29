<div align="center">

# 🎓 EduQuiz LMS — Nền Tảng Khảo Thí & Ôn Luyện Trực Tuyến
### Hệ Thống Đánh Giá Năng Lực Môn Chủ Nghĩa Xã Hội Khoa Học & Lý Luận Chính Trị

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase_Auth-Ready-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-success?style=for-the-badge&logo=w3c&logoColor=white)](https://www.w3.org/WAI/standards-guidelines/wcag/)

<p align="center">
  <b>Giải pháp EdTech tương tác thế hệ mới dành cho giảng viên và sinh viên các trường Đại học & Cao đẳng</b><br />
  Tối ưu hóa trải nghiệm tự học, ôn tập đa dạng hình thức khảo thí và tương tác thông minh trên mọi thiết bị.
</p>

---

</div>

## 📌 Giới Thiệu Tổng Quan

**EduQuiz LMS** là nền tảng kiểm tra, đánh giá và tự học trực tuyến chuyên biệt cho khối kiến thức **Lý luận Chính trị (Chủ nghĩa Xã hội Khoa học, Triết học Mác – Lênin)**. Hệ thống được thiết kế theo tiêu chuẩn hệ thống quản lý học tập (**LMS - Learning Management System**), kết hợp ngôn ngữ thiết kế **Liquid Glassmorphism** hiện đại cùng trải nghiệm kiểm thử phong phú.

Ứng dụng đáp ứng đầy đủ các yêu cầu khắt khe về **hiệu năng (Performance)**, **khả năng tương thích thiết bị di động (Mobile Optimization)** và **tiêu chuẩn trợ năng quốc tế (WCAG 2.1 AA Accessibility)**.

---

## ✨ Tính Năng Cốt Lõi (Key Features)

### 1. 📝 Đa Dạng Định Dạng Khảo Thí (Multi-Format Assessment)
Hệ thống hỗ trợ 5 mô hình câu hỏi tương tác nâng cao thay vì trắc nghiệm đơn thuần:
* **Trắc nghiệm đơn (Single Choice)**: 4 lựa chọn tiêu chuẩn (A, B, C, D) với chấm điểm tức thời.
* **Trắc nghiệm phức hợp (Multiple Choice)**: Yêu cầu chọn từ 2 đáp án đúng trở lên, rèn luyện tư duy logic sâu.
* **Đánh giá Đúng / Sai (True / False Group)**: Phân tích và chấm điểm tính chính xác trên từng phát biểu độc lập.
* **Kéo thả & Ghép nối (Interactive Matching & Drag-Drop)**:
  * **Desktop**: Thao tác kéo thả chuột HTML5 Drag & Drop mượt mà.
  * **Mobile / Cảm ứng**: Cơ chế **Tap-to-Select & Tap-to-Place (Chạm để chọn & Chạm vào khung để đặt)** độc quyền, khắc phục hoàn toàn sự bất tiện khi vuốt trên màn hình điện thoại.
* **Điền khuyết (Fill in the Blanks)**: Kiểm tra khả năng ghi nhớ thuật ngữ và khái niệm chuyên ngành.

### 2. 🎯 Phân Hệ Ôn Tập & Luyện Đề Đa Chiều
* **Luyện tập theo Học phần/Chương học**: Đi sâu vào từng bài học với lộ trình từ cơ bản đến nâng cao.
* **Ôn tập Tổng hợp Toàn diện**: Tổng hợp ngẫu nhiên các câu hỏi từ tất cả các chương học đã mở.
* **Luyện thi theo Chuyên đề dạng bài**: Tập trung ôn luyện riêng biệt cho dạng Trắc nghiệm, Đúng/Sai hoặc Kéo thả ghép nối.
* **Thuật toán Fisher-Yates Shuffling**: Đảm bảo thứ tự câu hỏi và phương án trả lời được xáo trộn ngẫu nhiên trong mỗi phiên làm bài, chống học vẹt và chống gian lận.

### 3. 🎨 Giao Diện Liquid Glass & Chuẩn Trợ Năng WCAG 2.1 AA
* **Chế độ Sáng / Tối (Light & Dark Mode)**: Hỗ trợ chuyển đổi giao diện linh hoạt với bảng màu tương phản cao.
* **Compound Modal Component**: Cấu trúc Modal tiêu chuẩn WAI-ARIA (`role="dialog"`, Focus Trap, ESC Key Handler, Scroll Lock, Focus Restoration).
* **Keyboard Navigation**: Điều hướng 100% bằng bàn phím (`Tab`, `Space`, `Enter`, phím số `1-4` / `A-D`).
* **Phản hồi học tập chi tiết**: Hệ thống giải thích câu trả lời đúng, chỉ ra phần sai và hiển thị hiệu ứng vinh danh (`Canvas Confetti`) khi đạt kết quả xuất sắc.

### 4. 🔐 Tích Hợp Xác Thực & Lưu Trữ Đám Mây
* Xác thực đăng nhập an toàn qua **Google OAuth (Firebase Authentication)**.
* Đồng bộ điểm số, lưu lại lịch sử làm bài và quản lý hồ sơ sinh viên.

---

## 📊 Cấu Trúc Ngân Hàng Câu Hỏi (Question Bank Hierarchy)

Hệ thống hiện tại tích hợp **150 câu hỏi chuẩn hóa**, được phân bổ khoa học theo giáo trình:

```
📦 NGÂN HÀNG KHẢO THÍ CHỦ NGHĨA XÃ HỘI KHOA HỌC (150 CÂU)
 ┣ 📜 PHẦN 1: Nhập môn CNXHKH & Sứ mệnh LS của giai cấp công nhân (38 câu)
 ┣ 📜 PHẦN 2: Chủ nghĩa xã hội và thời kỳ quá độ lên CNXH (41 câu)
 ┣ 📜 PHẦN 3: Dân chủ xã hội chủ nghĩa và Nhà nước xã hội chủ nghĩa (30 câu)
 ┣ 📜 PHẦN 4: Cơ cấu xã hội – giai cấp và liên minh giai cấp, tầng lớp (29 câu)
 ┣ 📜 BỘ CÂU HỎI MỚI: Các câu hỏi trắc nghiệm bổ sung & câu hỏi vận dụng (12 câu)
 ┣ ⏳ PHẦN 5: Vấn đề dân tộc và tôn giáo trong thời kỳ quá độ (Đang cập nhật)
 ┗ ⏳ PHẦN 6: Vấn đề gia đình trong thời kỳ quá độ lên CNXH (Đang cập nhật)
```

---

## 🏗️ Kiến Trúc Công Nghệ (Tech Stack)

| Phân hệ | Công nghệ sử dụng | Mục đích |
| :--- | :--- | :--- |
| **Core Framework** | React 18 + TypeScript | Xây dựng giao diện hướng thành phần (Component-driven) Type-safe |
| **Build Tool** | Vite 6 | Tốc độ biên dịch siêu tốc, tối ưu hóa bundle sản phẩm |
| **Styling & Theme** | Tailwind CSS + Custom Glass Utilities | Giao diện hiệu ứng kính mờ (Backdrop Blur), Ambient Glows |
| **Animation** | Framer Motion | Hiệu ứng chuyển động phân cấp mượt mà |
| **Icons** | Lucide React | Hệ thống biểu tượng giao diện trực quan |
| **Authentication** | Firebase Auth | Xác thực người dùng Google Single Sign-On (SSO) |
| **Deployment** | Vercel Edge Network | Mạng phân phối toàn cầu, CI/CD tự động từ kho lưu trữ Git |

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Môi Trường Cục Bộ

### 1. Yêu cầu tiên quyết (Prerequisites)
* **Node.js**: Phiên bản `18.x` hoặc `20.x+`
* **npm** hoặc **pnpm / yarn**

### 2. Cài đặt các gói phụ thuộc
```bash
# Clone repository
git clone https://github.com/tamtran2k6zz/My_Web_Server.git
cd triết-học-quiz

# Cài đặt thư viện
npm install
```

### 3. Cấu hình biến môi trường
Tạo file `.env.local` tại thư mục gốc với các thông số cấu hình Firebase của bạn:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Khởi chạy máy chủ phát triển (Development Server)
```bash
npm run dev
```
Truy cập ứng dụng tại: `http://localhost:5173`

### 5. Đóng gói mã nguồn (Production Build)
```bash
npm run build
```

---

## 🌐 Hướng Dẫn Triển Khai Lên Vercel (Production Deployment)

Ứng dụng đã được tích hợp sẵn tệp cấu hình `vercel.json` phục vụ việc định tuyến Single Page Application (SPA).

1. Cài đặt Vercel CLI (nếu chưa có):
   ```bash
   npm install -g vercel
   ```
2. Triển khai trực tiếp lên môi trường Production:
   ```bash
   npx vercel --prod
   ```
3. **Cấu hình Firebase Authorized Domains**:
   * Truy cập **Firebase Console** $\rightarrow$ **Authentication** $\rightarrow$ **Settings** $\rightarrow$ **Authorized domains**.
   * Thêm domain của Vercel (ví dụ: `quiz-full-mon.vercel.app`) vào danh sách cho phép để tính năng đăng nhập Google OAuth hoạt động chính xác.

---

## 🗺️ Kế Hoạch Phát Triển (Roadmap)

- [x] Tích hợp 4 học phần trọng tâm (138 câu) + Bộ đề mở rộng (12 câu).
- [x] Hỗ trợ tương tác cảm ứng di động (Mobile Tap-to-Place).
- [x] Tối ưu hóa tiêu chuẩn trợ năng WAI-ARIA & WCAG 2.1 AA.
- [ ] Bổ sung ngân hàng câu hỏi Phần 5 (Vấn đề Dân tộc - Tôn giáo) và Phần 6 (Gia đình).
- [ ] Tính năng phòng thi bấm giờ (Timed Examination Mode) có xếp loại A, B, C, D, F.
- [ ] Bảng vinh danh & Xếp hạng thành tích sinh viên (Global Leaderboard).
- [ ] Xuất báo cáo kết quả ôn thi định dạng PDF / Excel cho giảng viên.

---

## 📄 Bản Quyền & Giấy Phép (License)

Dự án được phân phối dưới giấy phép **MIT License**. Mọi cá nhân và tổ chức đều có thể tự do tham khảo, học tập và triển khai cho mục đích giáo dục.

<div align="center">
  <sub>Phát triển với ❤️ vì sự nghiệp giáo dục và chuyển đổi số trong giảng dạy Đại học.</sub>
</div>
