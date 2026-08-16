import { Topic } from "./types";

// Bạn có thể gửi và thêm các câu hỏi mới của mình vào mảng này
export const newTopic: Topic = {
  name: "Những câu hỏi mới",
  questions: [
    {
      type: "single",
      q: "Câu 37(Bài 1): Một làng nghề truyền thống chuyển sang sản xuất theo đơn đặt hàng từ doanh nghiệp và khách hàng. Điều này phản ánh đặc điểm nào của sản xuất hàng hóa?",
      options: [
        "A. Sản phẩm làm ra theo lệnh của chính quyền",
        "B. Sản phẩm làm ra để tiêu dùng trong làng",
        "C. Sản phẩm làm ra để dự trữ",
        "D. Sản phẩm làm ra để phục vụ trao đổi, mua bán",
      ],
      correct: 3,
    },
    {
      type: "single",
      q: "Câu 29(Bài 2): Tuần hoàn tư bản là:",
      options: [
        "A. Sự vận động liên tục của tư bản qua các chu kỳ.",
        "B. Sự biến đổi liên tục của ba hình thái vận động của tư bản rồi trở về hình thái ban đầu với lượng giá trị lớn hơn.",
        "C. Sự vận động của tư bản từ hình thái tiền tệ sang hình thái sản xuất và hình thái hàng hoá rồi trở về hình thái ban đầu với lượng giá trị lớn hơn.",
        "D. Sự vận động liên tục của tư bản qua 3 giai đoạn với 3 hình thái, hoàn thành 3 chức năng, rồi trở về hình thái ban đầu với lượng giá trị lớn hơn.",
      ],
      correct: 3,
    },
    {
      type: "multi",
      q: "Câu 30(Bài 2): Đâu là thuộc tính của hàng hóa sức lao động? (Chọn 2 đáp án đúng nhất)",
      options: [
        "A. Thuộc tính sử dụng của hàng hoá sức lao động",
        "B. Giá trị của hàng hoá sức lao động",
        "C. Giá trị thặng dư",
        "D. Giá trị sử dụng của hàng hoá sức lao động",
      ],
      correct: [1, 3],
    },
    {
      type: "single",
      q: "Câu 31(Bài 2): Tốc độ chu chuyển của tư bản tư bản là:",
      options: [
        "A. Số vòng chu chuyển của tư bản trong một năm",
        "B. Tốc độ lưu thông của tư bản.",
        "C. Thời gian để tư bản thực hiện một vòng tuần hoàn",
        "D. Số vòng chu chuyển của tư bản",
      ],
      correct: 0,
    },
    {
      type: "single",
      q: "Câu 32(Bài 2): Khi nào tiền tệ biến thành tư bản?",
      options: [
        "A. Có lượng tiền tệ đủ lớn",
        "B. Dùng tiền để buôn bán mua rẻ, bán đắt",
        "C. Dùng tiền đầu tư vào sản xuất kinh doanh",
        "D. Sức lao động trở thành hàng hoá",
      ],
      correct: 3,
    },
    {
      type: "single",
      q: "Câu 33(Bài 2): Chu chuyển tư bản là:",
      options: [
        "A. Tốc độ lưu thông của tư bản.",
        "B. Sự tuần hoàn tư bản lặp đi lặp lại một cách có định kỳ",
        "C. Sự tuần hoàn tư bản lặp đi lặp lại",
        "D. Sự vận động của tư bản",
      ],
      correct: 2,
    },
    {
      type: "single",
      q: "Câu 34(Bài 2): Ý nào đúng nhất về tư bản bất biến (c) là?",
      options: [
        "A. Giá trị của nó không thay đổi và được chuyển ngay sang sản phẩm sau một chu kỳ sản xuất",
        "B. Giá trị của nó lớn lên trong quá trình sản xuất",
        "C. Giá trị của nó chuyển dẫn vào sản phẩm qua khấu hao",
        "D. Giá trị của nó không thay đổi về lượng và được chuyển nguyên vẹn sang sản phẩm",
      ],
      correct: 3,
    },
    {
      type: "single",
      q: "Câu 35(Bài 2): Sức lao động trở thành hàng hóa một cách phổ biến từ khi nào?",
      options: [
        "A. Từ khi có sản xuất",
        "B. Từ xã hội chiếm hữu nô lệ",
        "C. Từ khi có kinh tế thị trường",
        "D. Từ khi có CNTB",
      ],
      correct: 3,
    },
    {
      type: "truefalse",
      q: "Câu 36(Bài 2): Cho biết chi phí tư bản khả biến là 2000 usd. Chọn đáp án (Đúng hoặc Sai) với từng trường hợp sau:",
      options: [
        {
          text: "Nếu m' = 200% thì khối lượng giá trị mới do công nhân tạo ra là 6000 usd",
          correct: true,
        },
        {
          text: "Nếu m' = 400% thì khối lượng giá trị mới do công nhân tạo ra là 8000 usd",
          correct: false,
        },
        {
          text: "Nếu m' = 300% thì khối lượng giá trị mới do công nhân tạo ra là 7000 usd",
          correct: false,
        },
        {
          text: "Nếu m' = 100% thì khối lượng giá trị mới do công nhân tạo ra là 4000 usd",
          correct: true,
        },
      ],
    },
    {
      type: "single",
      q: "Câu 37(Bài 2): Tiền công tư bản chủ nghĩa là:",
      options: [
        "A. Giá trị sức lao động",
        "B. Sự trả công cho lao động",
        "C. Giá cả của sức lao động",
        "D. Giá trị của lao động",
      ],
      correct: 2,
    },
    {
      type: "single",
      q: "Câu 38(Bài 2): Một trong những lý do khiến phương pháp sản xuất giá trị thặng dư siêu ngạch mang tính tạm thời là:",
      options: [
        "A. Nhà nước can thiệp thị trường",
        "B. Đối thủ cạnh tranh sẽ nhanh chóng áp dụng công nghệ tương tự",
        "C. Hệ thống máy móc mau lỗi thời",
        "D. Lương công nhân tăng nhanh",
      ],
      correct: 1,
    },
    {
      type: "single",
      q: "Câu 29(Bài 3): Chọn 1 phương án trả lời đúng nhất. Tập trung tư bản phản ánh quan hệ nào trong chủ nghĩa tư bản?",
      options: [
        "A. Giữa các nhà tư bản với nhau",
        "B. Giữa tư bản và nhà nước",
        "C. Giữa công nhân và tư bản",
        "D. Giữa tư bản và thị trường quốc tế",
      ],
      correct: 0,
    },
    {
      type: "single",
      q: "Câu 30(Bài 3): Tái sản xuất giản đơn có đặc điểm gì?",
      options: [
        "A. Quy mô sản xuất tăng lên",
        "B. Đầu tư thặng dư vào sản xuất",
        "C. Toàn bộ thặng dư dùng cho tiêu dùng cá nhân",
        "D. Quy mô sản xuất tăng lên",
      ],
      correct: 2,
    },
    {
      type: "single",
      q: "Câu 31(Bài 3): Chọn 1 phương án trả lời đúng nhất. Một nghệ sĩ vẽ tranh kỹ thuật số và bán trên nền tảng blockchain. Theo anh/chị, tranh kỹ thuật số này có thể được coi là hàng hóa không:",
      options: [
        "A. Có. Vì nó được tạo ra từ lao động, có giá trị sử dụng và có thể trao đổi mua bán",
        "B. Không. Vì công nghệ blockchain chưa được pháp lý công nhận",
        "C. Không. Vì không có hình thái vật chất cụ thể",
        "D. Có. Vì đó là sản phẩm của trí tuệ",
      ],
      correct: 0,
    },
    {
      type: "single",
      q: "Câu 32(Bài 3): Chọn 1 phương án trả lời đúng nhất. Tỷ suất giá trị thặng dư ảnh hưởng đến tích lũy tư bản qua yếu tố nào?",
      options: [
        "A. Giảm năng suất lao động",
        "B. Tăng khối lượng giá trị thặng dư thu được",
        "C. Giảm chi phí sản xuất",
        "D. Tăng giá cả hàng hóa",
      ],
      correct: 1,
    },
    {
      type: "truefalse",
      q: "Câu 33(Bài 3): Điền kết quả (Đúng hoặc Sai) ứng với từng phát biểu dưới đây:",
      options: [
        { text: "Cấu tạo hữu cơ tăng làm giảm thất nghiệp", correct: false },
        { text: "Tích tụ tư bản làm tăng quy mô tư bản xã hội", correct: true },
        {
          text: "Tỷ lệ phân chia thặng dư ảnh hưởng đến quy mô tích lũy",
          correct: true,
        },
        {
          text: "Bần cùng hóa không phải hệ quả của tích lũy tư bản",
          correct: false,
        },
      ],
    },
    {
      type: "single",
      q: "Câu 34(Bài 3): Chọn 1 phương án trả lời đúng nhất. Vì sao nhà tư bản tiết kiệm tiêu dùng cá nhân để tăng tích lũy?",
      options: [
        "A. Để tăng giá trị hàng hóa",
        "B. Để giảm tỷ suất thặng dư",
        "C. Để giảm chi phí sản xuất",
        "D. Để cân bằng lợi ích trước mắt và lâu dài",
      ],
      correct: 3,
    },
    {
      type: "single",
      q: "Câu 35(Bài 3): Chọn 1 phương án trả lời đúng nhất. Năng suất lao động xã hội tăng lên ảnh hưởng đến tích lũy tư bản như thế nào?",
      options: [
        "A. Không ảnh hưởng đến tích lũy",
        "B. Làm tăng chi phí sản xuất",
        "C. Giảm giá trị tư liệu sản xuất và sinh hoạt, tăng thặng dư tích lũy",
        "D. Giảm khối lượng giá trị thặng dư",
      ],
      correct: 2,
    },
    {
      type: "single",
      q: "Câu 36(Bài 3): Chủ nghĩa tư bản phát triển qua các giai đoạn nào?",
      options: [
        "A. Chủ nghĩa tư bản độc quyền và chủ nghĩa đế quốc",
        "B. Chủ nghĩa đế quốc và chủ nghĩa kinh nghiệm",
        "C. Chủ nghĩa tự do cạnh tranh và chủ nghĩa tư bản độc quyền",
        "D. Chủ nghĩa tư bản bất biến và chủ nghĩa tư bản khả biến",
      ],
      correct: 2,
    },
    {
      type: "single",
      q: 'Câu 28(Bài 4): Kết luận sau đây là của ai: "Tự do cạnh tranh đẻ ra tập trung sản xuất và sự tập trung sản xuất này khi phát triển đến mức độ nhất định, lại dẫn tới độc quyền"',
      options: [
        "A. Ph. Ăng ghen",
        "B. Lênin",
        "C. C.Mác",
        "D. Cả C.Mác và Ph. Ăng ghen",
      ],
      correct: 1,
    },
    {
      type: "single",
      q: "Câu 29(Bài 4): CNTB độc quyền xuất hiện vào thời kỳ lịch sử nào?",
      options: [
        "A. Từ sau chiến tranh thế giới thứ hai",
        "B. Cuối thế kỷ XVIII đến đầu XIX",
        "C. Cuối thế kỷ XVII đến đầu thế kỷ XIX",
        "D. Cuối thế kỷ XIX đầu thế kỷ XX",
      ],
      correct: 3,
    },
    {
      type: "single",
      q: "Câu 30(Bài 4): Trong giai đoạn CNTB tự do cạnh tranh quy luật giá trị thặng dư biểu hiện thành:",
      options: [
        "A. Qui luật tỷ suất lợi nhuận độc quyền cao",
        "B. Qui luật tỷ suất lợi nhuận bình quân",
        "C. Qui luật tích lũy tư bản",
        "D. Qui luật giá cả sản xuất",
      ],
      correct: 1,
    },
    {
      type: "single",
      q: "Câu 31(Bài 4): Chủ nghĩa tư bản độc quyền là:",
      options: [
        "A. Một hình thức kinh tế xã hội",
        "B. Một giai đoạn phát triển của phương thức sản xuất tư bản chủ nghĩa",
        "C. Một phương thức sản xuất mới",
        "D. Một nấc thang phát triển của lực lượng sản xuất",
      ],
      correct: 1,
    },
    {
      type: "single",
      q: "Câu 32(Bài 4): Trong CNTB ngày nay, các trùm tài chính thống trị nền kinh tế thông qua:",
      options: [
        'A. Kết hợp "chế độ tham dự" với "chế độ uỷ nhiệm"',
        "B. Các tổ chức tài chính quốc tế",
        'C. "Chế độ tham dự"',
        'D. "Chế độ uỷ nhiệm"',
      ],
      correct: 0,
    },
    {
      type: "single",
      q: "Câu 33(Bài 4): Vai trò mới của ngân hàng trong giai đoạn CNTB độc quyền là:",
      options: [
        "A. Trung tâm thanh toán",
        "B. Trung tâm tín dụng",
        "C. Đầu tư tư bản",
        "D. Khống chế hoạt động của nền kinh tế TBCN",
      ],
      correct: 3,
    },
    {
      type: "single",
      q: "Câu 34(Bài 4): Vì sao trong CNTB độc quyền cạnh tranh không bị thủ tiêu?",
      options: [
        "A. Vì các tổ chức độc quyền cạnh tranh với nhau",
        "B. Vì các xí nghiệp trong nội bộ tổ chức độc quyền cạnh tranh với nhau",
        "C. Vì tổ chức độc quyền cạnh tranh với các công ty ngoài độc quyền",
        "D. Vì cạnh tranh là quy luật khách quan của kinh tế hàng hóa",
      ],
      correct: 3,
    },
    {
      type: "single",
      q: "Câu 35(Bài 4): Xuất khẩu tư bản là:",
      options: [
        "A. Cho nước ngoài vay",
        "B. Mang hàng hóa ra nước ngoài để thực hiện giá trị",
        "C. Cả A và B",
        "D. Đầu tư trực tiếp ra nước ngoài",
      ],
      correct: 3,
    },
    {
      type: "truefalse",
      q: "Câu 36(Bài 4): Điền kết quả (Đúng hoặc Sai) ứng với từng phát biểu dưới đây:",
      options: [
        { text: "Độc quyền không kiểm soát thị trường", correct: false },
        { text: "Độc quyền làm thủ tiêu cạnh tranh tự do", correct: false },
        {
          text: "Cạnh tranh trong độc quyền trở nên gay gắt hơn",
          correct: true,
        },
        {
          text: "Tín dụng tư bản thúc đẩy hình thành độc quyền",
          correct: true,
        },
      ],
    },
    {
      type: "drag",
      q: "Câu 30(Bài 5): Kéo thả đáp án vào phát biểu đúng với các câu từ 1-4 ở vế trái:",
      items: [
        "phân công lao động xã hội",
        "động lực",
        "Vai trò lãnh đạo",
        "định hướng xã hội chủ nghĩa",
      ],
      columns: [
        "Cơ chế thị trường dựa trên ____________ và sự vận hành của quy luật giá trị.",
        "Cơ chế thị trường tạo ____________ để doanh nghiệp nâng cao năng suất lao động và chất lượng hàng hóa.",
        "____________ của Đảng bảo đảm sự phát triển đúng hướng của nền kinh tế.",
        "Mục tiêu phát triển kinh tế ở Việt Nam là phát triển bền vững, bao trùm, gắn liền với ______________.",
      ],
      correct: {
        "0": ["phân công lao động xã hội"],
        "1": ["động lực"],
        "2": ["Vai trò lãnh đạo"],
        "3": ["định hướng xã hội chủ nghĩa"],
      },
    },
    {
      type: "multi",
      q: "Câu 21(Bài 6): Chọn các phương án trả lời đúng. Vì sao các cường quốc tư bản đấu tranh đòi chia lại lãnh thổ thế giới?",
      options: [
        "A. Do sự phân chia lãnh thổ không đều giữa các cường quốc",
        "B. Do nguyên liệu ngày càng thiếu thốn",
        "C. Do thỏa thuận tạm thời giữa các doanh nghiệp",
        "D. Do sự phát triển không đều giữa các cường quốc",
      ],
      correct: [0, 1, 3],
    },
    {
      type: "single",
      q: "Câu 22(Bài 6): Chọn 1 phương án trả lời đúng nhất. Trong nền kinh tế tri thức, yếu tố nào trở thành tài nguyên quan trọng nhất?",
      options: [
        "A. Tài chính",
        "B. Thông tin",
        "C. Địa lý",
        "D. Tài nguyên khoáng sản",
      ],
      correct: 1,
    },
    {
      type: "single",
      q: "Câu 23(Bài 6): Chọn 1 phương án đúng duy nhất. Để hạn chế nguy cơ mất bản sắc văn hóa trong hội nhập, Việt Nam cần:",
      options: [
        "A. Tăng cường thương mại hóa văn hóa truyền thống",
        "B. Ngăn chặn mọi hình thức văn hóa nước ngoài",
        "C. Bảo tồn văn hóa dân tộc đồng thời chọn lọc tinh hoa văn hóa nhân loại",
        "D. Tập trung hội nhập chính trị thay vì văn hóa",
      ],
      correct: 2,
    },
    {
      type: "single",
      q: "Câu 24(Bài 6): Chọn 1 phương án trả lời đúng nhất. Vì sao chủ nghĩa tư bản có xu hướng chuyển hóa sang hình thái mới?",
      options: [
        "A. Do tăng cạnh tranh tự do",
        "B. Do mâu thuẫn giữa lực lượng sản xuất và quan hệ sản xuất",
        "C. Do thiếu mâu thuẫn nội tại",
        "D. Do giảm năng suất lao động",
      ],
      correct: 1,
    },
    {
      type: "multi",
      q: "Câu 25(Bài 6): Chọn 2 phương án trả lời đúng. Những lợi ích chính của hội nhập kinh tế quốc tế đối với Việt Nam gồm:",
      options: [
        "A. Giảm sự cạnh tranh và bảo hộ sản xuất trong nước",
        "B. Nâng cao chất lượng nguồn nhân lực qua hợp tác quốc tế",
        "C. Mở rộng liên kết vùng trong nước",
        "D. Tăng khả năng tiếp cận thị trường quốc tế",
      ],
      correct: [1, 3],
    },
    {
      type: "single",
      q: "Câu 26(Bài 6): Công nghiệp hóa là quá trình chuyển đổi nền sản xuất xã hội từ lao động thủ công là chính sang:",
      options: [
        "A. Lao động có trình độ học vấn cao",
        "B. Lao động bằng máy móc",
        "C. Lao động trí tuệ cao",
        "D. Lao động theo mô hình khép kín",
      ],
      correct: 1,
    },
  ],
};
