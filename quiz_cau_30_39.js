/**
 * ==============================================================================
 * BỘ CÂU HỎI VÀ ĐÁP ÁN TRẮC NGHIỆM CHỦ NGHĨA XÃ HỘI KHOA HỌC
 * Chủ đề: Cơ cấu xã hội - giai cấp & Liên minh giai cấp, tầng lớp (Câu 30 - Câu 39)
 * ==============================================================================
 */

const quizData = [
  {
    id: 30,
    question: "Những tầng lớp nào sau đây tham gia cơ cấu xã hội - giai cấp ở Việt Nam? (Chọn 2 đáp án đúng)",
    type: "multiple_select",
    requiredSelections: 2,
    options: [
      { key: "A", text: "Tín đồ tôn giáo" },
      { key: "B", text: "Phụ nữ" },
      { key: "C", text: "Thanh niên" }
    ],
    correctAnswers: ["B", "C"],
    answersText: [
      "B. Phụ nữ",
      "C. Thanh niên"
    ],
    explanation: "Trong cơ cấu xã hội - giai cấp ở Việt Nam thời kỳ quá độ, ngoài công nhân, nông dân, trí thức, doanh nhân thì Phụ nữ và Thanh niên là hai tầng lớp/lực lượng xã hội quan trọng được phân tích riêng trong giáo trình."
  },
  {
    id: 31,
    question: "Những nội dung nào sau đây là nội dung cơ bản của liên minh giai cấp, tầng lớp ở Việt Nam trong thời kỳ quá độ lên chủ nghĩa xã hội? (Chọn 2 đáp án đúng)",
    type: "multiple_select",
    requiredSelections: 2,
    options: [
      { key: "A", text: "Nội dung giáo dục" },
      { key: "B", text: "Nội dung chính trị" },
      { key: "C", text: "Nội dung kinh tế" },
      { key: "D", text: "Nội dung tôn giáo" }
    ],
    correctAnswers: ["B", "C"],
    answersText: [
      "B. Nội dung chính trị",
      "C. Nội dung kinh tế"
    ],
    explanation: "Ba nội dung cơ bản của liên minh gồm: Nội dung kinh tế (cơ sở vật chất - kỹ thuật, quyết định nhất), Nội dung chính trị và Nội dung văn hóa - xã hội."
  },
  {
    id: 32,
    question: "Những phương hướng nào sau đây củng cố liên minh giai cấp, tầng lớp ở Việt Nam trong thời kỳ quá độ lên chủ nghĩa xã hội? (Chọn 2 đáp án đúng)",
    type: "multiple_select",
    requiredSelections: 2,
    options: [
      { key: "A", text: "Phát huy tinh thần đoàn kết" },
      { key: "B", text: "Giảm vai trò kinh tế trong xã hội" },
      { key: "C", text: "Tăng vai trò tôn giáo đối với các giai cấp, tầng lớp" },
      { key: "D", text: "Tạo sự đồng thuận giữa các lực lượng" }
    ],
    correctAnswers: ["A", "D"],
    answersText: [
      "A. Phát huy tinh thần đoàn kết",
      "D. Tạo sự đồng thuận giữa các lực lượng"
    ],
    explanation: "Để củng cố liên minh cần phát huy tinh thần đoàn kết toàn dân tộc (A) và tạo sự đồng thuận xã hội giữa các giai cấp, tầng lớp (D)."
  },
  {
    id: 33,
    question: "Kéo thả các đáp án đúng ứng với từng phát biểu sau đây về vị trí, vai trò của các giai cấp, tầng lớp trong cơ cấu xã hội – giai cấp ở Việt Nam trong thời kỳ quá độ lên chủ nghĩa xã hội:",
    type: "drag_and_drop",
    keywords: [
      "đội ngũ vững mạnh",
      "chiến lược quan trọng",
      "đặc biệt quan trọng",
      "sáng tạo đặc biệt"
    ],
    matches: [
      {
        index: 1,
        statement: "Giai cấp công nhân Việt Nam có vai trò...",
        selectedKeyword: "đặc biệt quan trọng"
      },
      {
        index: 2,
        statement: "Đội ngũ doanh nhân được Đảng ta chủ trương xây dựng thành một...",
        selectedKeyword: "đội ngũ vững mạnh"
      },
      {
        index: 3,
        statement: "Giai cấp nông dân cùng với nông nghiệp, nông thôn có vị trí...",
        selectedKeyword: "chiến lược quan trọng"
      },
      {
        index: 4,
        statement: "Đội ngũ trí thức là lực lượng...",
        selectedKeyword: "sáng tạo đặc biệt"
      }
    ]
  },
  {
    id: 34,
    question: "Chọn đáp án (Đúng hoặc Sai) với từng phát biểu sau:",
    type: "true_false",
    statements: [
      {
        index: 1,
        statement: "Đội ngũ doanh nhân không tham gia liên minh giai cấp, tầng lớp.",
        answer: "Sai",
        explanation: "Đội ngũ doanh nhân là lực lượng quan trọng tham gia vào cơ cấu xã hội và khối đại đoàn kết, liên minh."
      },
      {
        index: 2,
        statement: "Đồng thuận xã hội là mục tiêu của liên minh giai cấp, tầng lớp ở Việt Nam.",
        answer: "Đúng",
        explanation: "Mục tiêu chính trị - xã hội của khối liên minh là tạo sự đồng thuận xã hội."
      },
      {
        index: 3,
        statement: "Xây dựng Nhà nước pháp quyền xã hội chủ nghĩa của nhân dân, do nhân dân, vì nhân dân là nội dung văn hoá của liên minh giai cấp, tầng lớp ở Việt Nam.",
        answer: "Sai",
        explanation: "Xây dựng Nhà nước pháp quyền XHCN thuộc về NỘI DUNG CHÍNH TRỊ của khối liên minh."
      },
      {
        index: 4,
        statement: "Nội dung tôn giáo là nội dung chính của liên minh giai cấp, tầng lớp.",
        answer: "Sai",
        explanation: "Liên minh gồm 3 nội dung chính: Kinh tế, Chính trị, Văn hóa - Xã hội."
      }
    ]
  },
  {
    id: 35,
    question: "Chọn đáp án (Đúng hoặc Sai) với từng phát biểu sau:",
    type: "true_false",
    statements: [
      {
        index: 1,
        statement: "Chính sách việc làm không hỗ trợ cơ cấu xã hội - giai cấp.",
        answer: "Sai",
        explanation: "Chính sách việc làm là chính sách kinh tế - xã hội quan trọng tác động trực tiếp đến cơ cấu xã hội - giai cấp."
      },
      {
        index: 2,
        statement: "Đội ngũ doanh nhân là tầng lớp mới trong cơ cấu xã hội - giai cấp.",
        answer: "Đúng",
        explanation: "Đội ngũ doanh nhân phát triển và khẳng định vị trí là tầng lớp mới trong nền kinh tế thị trường định hướng XHCN."
      },
      {
        index: 3,
        statement: "Cơ cấu xã hội - giai cấp ở Việt Nam không biến đổi.",
        answer: "Sai",
        explanation: "Cơ cấu xã hội - giai cấp luôn vận động và biến đổi cùng với sự chuyển dịch cơ cấu kinh tế."
      },
      {
        index: 4,
        statement: "Nâng cao dân trí là chính sách hỗ trợ cơ cấu xã hội - giai cấp.",
        answer: "Đúng",
        explanation: "Nâng cao dân trí và đào tạo nguồn nhân lực hỗ trợ phát triển các giai cấp, tầng lớp."
      }
    ]
  },
  {
    id: 36,
    question: "Chọn đáp án (Đúng hoặc Sai) với từng phát biểu sau:",
    type: "true_false",
    statements: [
      {
        index: 1,
        statement: "Tầng lớp phụ nữ không tham gia cơ cấu xã hội - giai cấp.",
        answer: "Sai",
        explanation: "Phụ nữ là lực lượng xã hội quan trọng tham gia vào cơ cấu xã hội - giai cấp."
      },
      {
        index: 2,
        statement: "Giai cấp công nhân là trung tâm trong cơ cấu xã hội - giai cấp ở Việt Nam.",
        answer: "Đúng",
        explanation: "Giai cấp công nhân giữ vai trò lãnh đạo và là lực lượng trung tâm."
      },
      {
        index: 3,
        statement: "Chính sách tôn giáo là chính sách chính hỗ trợ cơ cấu xã hội - giai cấp.",
        answer: "Sai",
        explanation: "Chính sách kinh tế và chính sách xã hội tổng thể mới là các chính sách nền tảng."
      },
      {
        index: 4,
        statement: "Đội ngũ trí thức đóng vai trò quan trọng trong cơ cấu xã hội - giai cấp.",
        answer: "Đúng",
        explanation: "Đội ngũ trí thức là lực lượng sáng tạo đặc biệt quan trọng trong tiến trình CNH - HĐH."
      }
    ]
  },
  {
    id: 37,
    question: "Kéo thả các yếu tố liên quan đến cơ cấu xã hội - giai cấp ở Việt Nam trong thời kỳ quá độ lên chủ nghĩa xã hội vào các cột tương ứng:",
    type: "category_matching",
    columns: {
      "Giai cấp/tầng lớp trong cơ cấu xã hội": [
        "Giai cấp công nhân",
        "Giai cấp nông dân",
        "Đội ngũ trí thức"
      ],
      "Chính sách hỗ trợ": [
        "Bảo vệ quyền lợi",
        "Nâng cao dân trí",
        "Chính sách an sinh xã hội",
        "Phát triển nông thôn mới"
      ]
    }
  },
  {
    id: 38,
    question: "Những phương hướng nào sau đây nhằm phát triển cơ cấu xã hội - giai cấp ở Việt Nam trong thời kỳ quá độ lên chủ nghĩa xã hội? (Chọn 2 đáp án đúng)",
    type: "multiple_select",
    requiredSelections: 2,
    options: [
      { key: "A", text: "Giảm giáo dục ở những vùng không có điều kiện kinh tế" },
      { key: "B", text: "Tăng dân số ở khu công nghiệp" },
      { key: "C", text: "Xây dựng và hoàn thiện chính sách xã hội tổng thể" },
      { key: "D", text: "Đẩy mạnh công nghiệp hoá, hiện đại hoá" }
    ],
    correctAnswers: ["C", "D"],
    answersText: [
      "C. Xây dựng và hoàn thiện chính sách xã hội tổng thể",
      "D. Đẩy mạnh công nghiệp hoá, hiện đại hoá"
    ],
    explanation: "Hai phương hướng cơ bản: Đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước (D) và Xây dựng, hoàn thiện chính sách xã hội tổng thể (C)."
  },
  {
    id: 39,
    question: "Kéo thả các yếu tố liên quan đến liên minh giai cấp, tầng lớp ở Việt Nam trong thời kỳ quá độ lên chủ nghĩa xã hội vào các cột tương ứng:",
    type: "category_matching",
    columns: {
      "Thành phần/yếu tố của liên minh": [
        "Giai cấp nông dân",
        "Giai cấp công nhân",
        "Tầng lớp phụ nữ",
        "Đảng Cộng sản"
      ],
      "Nội dung/phương hướng của liên minh": [
        "Xóa đói giảm nghèo",
        "Nội dung kinh tế",
        "Tăng cường liên minh",
        "Nội dung chính trị"
      ]
    }
  }
];

/**
 * ==============================================================================
 * CÁC HÀM TIỆN ÍCH HỖ TRỢ TRA CỨU & XỬ LÝ
 * ==============================================================================
 */

// Tra cứu câu hỏi theo ID (30 - 39)
function getQuestionById(id) {
  return quizData.find(item => item.id === Number(id));
}

// Tìm kiếm câu hỏi theo từ khóa trong đề bài
function searchQuestion(keyword) {
  const kw = keyword.toLowerCase().trim();
  return quizData.filter(item => item.question.toLowerCase().includes(kw));
}

// In toàn bộ đáp án ra console dưới dạng tổng kết dễ đọc
function printAllAnswers() {
  console.log("=== TỔNG HỢP ĐÁP ÁN CÂU 30 ĐẾN CÂU 39 ===");
  quizData.forEach(item => {
    console.log(`\n[Câu ${item.id}]: ${item.question}`);
    if (item.type === 'multiple_select' || item.type === 'multiple_choice') {
      console.log(`-> Đáp án đúng: ${item.answersText.join(', ')}`);
    } else if (item.type === 'true_false') {
      item.statements.forEach(st => {
        console.log(`   ${st.index}. ${st.statement} => Đáp án: [${st.answer}]`);
      });
    } else if (item.type === 'drag_and_drop') {
      item.matches.forEach(m => {
        console.log(`   ${m.index}. ${m.statement} => [${m.selectedKeyword}]`);
      });
    } else if (item.type === 'category_matching') {
      Object.entries(item.columns).forEach(([col, values]) => {
        console.log(`   * ${col}: ${values.join(', ')}`);
      });
    }
  });
}

// Xuất module hỗ trợ cả Node.js (CommonJS) và Trình duyệt web (window)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    quizData,
    getQuestionById,
    searchQuestion,
    printAllAnswers
  };
} else if (typeof window !== 'undefined') {
  window.quizData = quizData;
  window.getQuestionById = getQuestionById;
  window.searchQuestion = searchQuestion;
  window.printAllAnswers = printAllAnswers;
}

// Tự động thông báo khi file được nhúng thành công
console.log("[quiz_cau_30_39.js] Đã tải thành công 10 câu hỏi trắc nghiệm (Câu 30 - Câu 39). Gõ printAllAnswers() để xem chi tiết.");
