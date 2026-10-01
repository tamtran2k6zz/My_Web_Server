import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { ExamRecord, formatDuration } from './examService';

/**
 * Remove Vietnamese accents for standard PDF font compatibility
 */
function removeVietnameseTones(str: string): string {
  if (!str) return '';
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}

export function exportExamToPdf(record: ExamRecord) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 36, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text("TRUONG DAI HOC CONG NGHE THONG TIN VA TRUYEN THONG - ICTU", 105, 12, { align: 'center' });
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text("KHOA LY LUAN CHINH TRI - HE THONG KHAO THI TRUC TUYEN EDUQUIZ LMS", 105, 18, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(56, 189, 248); // sky-400
  doc.text("PHIEU BAO CAO KET QUA KHAO THI HOC PHAN", 105, 27, { align: 'center' });

  // Student & Exam Info
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);

  const cleanEmail = record.maskedEmail || record.userEmail;
  const cleanTopic = removeVietnameseTones(record.topicName);

  autoTable(doc, {
    startY: 42,
    head: [['THONG TIN SINH VIEN', 'CHI TIET HOC PHAN & DOT THI']],
    body: [
      [`Email / Tai khoan: ${cleanEmail}`, `Mon thi: Chu nghia Xa hoi Khoa hoc`],
      [`Ho va ten: ${removeVietnameseTones(record.displayName || 'Sinh vien ICTU')}`, `Hoc phan / De thi: ${cleanTopic}`],
      [`Ngay gio nop bai: ${record.dateFormatted}`, `Thoi gian lam bai: ${formatDuration(record.timeSpentSeconds)} / ${formatDuration(record.totalDurationSeconds)}`],
    ],
    theme: 'grid',
    headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 2.5 }
  });

  // Summary Score Table
  const finalY1 = (doc as any).lastAutoTable.finalY + 6;

  autoTable(doc, {
    startY: finalY1,
    head: [['SO CAU DUNG', 'TY LE (%)', 'DIEM THANG 10', 'DIEM THANG 4', 'XEP LOAI', 'KET QUA']],
    body: [
      [
        `${record.score} / ${record.totalQuestions}`,
        `${record.percentage.toFixed(1)}%`,
        `${record.grade.score10.toFixed(1)} / 10`,
        `${record.grade.score4.toFixed(1)} / 4.0`,
        `Loai ${record.grade.gradeLetter}`,
        record.grade.passed ? "DAT (PASS)" : "HOC LAI (FAIL)"
      ]
    ],
    theme: 'plain',
    headStyles: { fillColor: [14, 116, 144], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center' },
    bodyStyles: { fontStyle: 'bold', halign: 'center', fontSize: 11 },
    styles: { cellPadding: 3.5 }
  });

  // Detailed Questions Review (if answers array exists)
  if (record.answers && record.answers.length > 0) {
    const finalY2 = (doc as any).lastAutoTable.finalY + 6;
    const answerRows = record.answers.map((ans, idx) => [
      `Cau ${idx + 1}`,
      removeVietnameseTones(ans.questionText).slice(0, 75) + '...',
      ans.isCorrect ? "DUNG (+)" : "SAI (-)"
    ]);

    autoTable(doc, {
      startY: finalY2,
      head: [['STT', 'NOI DUNG CAU HOI', 'KET QUA']],
      body: answerRows,
      theme: 'striped',
      headStyles: { fillColor: [51, 65, 85], textColor: [255, 255, 255] },
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 16, halign: 'center' },
        1: { cellWidth: 145 },
        2: { cellWidth: 25, halign: 'center', fontStyle: 'bold' }
      }
    });
  }

  // Footer / Signatures
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text("Xac nhan cua Sinh vien", 40, pageHeight - 25, { align: 'center' });
  doc.text("(Ky va ghi ro ho ten)", 40, pageHeight - 20, { align: 'center' });

  doc.text("Xac nhan cua Giang vien cham thi", 160, pageHeight - 25, { align: 'center' });
  doc.text("(Ky va ghi ro ho ten)", 160, pageHeight - 20, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("Trich xuat tu he thong khao thi EduQuiz LMS - Dai hoc Cong nghe Thong tin & Truyen thong Thai Nguyen", 105, pageHeight - 8, { align: 'center' });

  const safeFilename = `Ket_qua_thi_ICTU_${record.userEmail.split('@')[0]}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(safeFilename);
}

export function exportExamToExcel(record: ExamRecord) {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Summary
  const summaryData = [
    ["TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG (ICTU)"],
    ["KHOA LÝ LUẬN CHÍNH TRỊ - HỆ THỐNG KHẢO THÍ EDUQUIZ LMS"],
    ["PHIẾU BÁO CÁO KẾT QUẢ ÔN THI VÀ ĐÁNH GIÁ NĂNG LỰC"],
    [],
    ["Thông tin", "Giá trị"],
    ["Tài khoản / Email", record.userEmail],
    ["Email che bảo mật", record.maskedEmail],
    ["Họ và tên", record.displayName || "Sinh viên ICTU"],
    ["Học phần / Đề thi", record.topicName],
    ["Số câu trả lời đúng", `${record.score} / ${record.totalQuestions}`],
    ["Tỷ lệ chính xác", `${record.percentage.toFixed(1)}%`],
    ["Điểm số thang 10", record.grade.score10],
    ["Điểm thang 4", record.grade.score4],
    ["Xếp loại học lực", `Loại ${record.grade.gradeLetter} (${record.grade.gradeText})`],
    ["Trạng thái hoàn thành", record.grade.passed ? "ĐẠT (PASS)" : "HỌC LẠI (FAIL)"],
    ["Thời gian làm bài", `${formatDuration(record.timeSpentSeconds)} (Giới hạn: ${formatDuration(record.totalDurationSeconds)})`],
    ["Ngày giờ nộp bài", record.dateFormatted],
    ["Nhận xét kết quả", record.grade.feedback]
  ];

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, wsSummary, "Tong_Quan");

  // Sheet 2: Detailed Questions (if available)
  if (record.answers && record.answers.length > 0) {
    const detailHeaders = [["STT", "Nội dung câu hỏi", "Dạng câu", "Kết quả"]];
    const detailRows = record.answers.map((ans, idx) => [
      idx + 1,
      ans.questionText,
      ans.type || "Trắc nghiệm",
      ans.isCorrect ? "ĐÚNG" : "SAI"
    ]);

    const wsDetail = XLSX.utils.aoa_to_sheet([...detailHeaders, ...detailRows]);
    XLSX.utils.book_append_sheet(wb, wsDetail, "Chi_Tiet_Cau_Hoi");
  }

  const safeFilename = `Ket_qua_thi_ICTU_${record.userEmail.split('@')[0]}_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(wb, safeFilename);
}

export function exportLeaderboardToExcel(records: ExamRecord[]) {
  const wb = XLSX.utils.book_new();

  const headers = [
    ["TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG (ICTU)"],
    ["KHOA LÝ LUẬN CHÍNH TRỊ - BẢNG ĐIỂM VINH DANH & XẾP HẠNG SINH VIÊN"],
    ["Môn học: Chủ nghĩa Xã hội Khoa học"],
    [],
    ["Hạng", "Email Sinh Viên", "Họ và Tên", "Học Phần Khảo Thí", "Đúng / Tổng", "Tỷ Lệ (%)", "Điểm Thang 10", "Điểm Thang 4", "Xếp Loại", "Thời Gian Làm Bài", "Ngày Nộp Bài"]
  ];

  const rows = records.map((rec, index) => [
    index + 1,
    rec.maskedEmail || rec.userEmail,
    rec.displayName || "Sinh viên ICTU",
    rec.topicName,
    `${rec.score} / ${rec.totalQuestions}`,
    `${rec.percentage.toFixed(1)}%`,
    rec.grade.score10,
    rec.grade.score4,
    `Loại ${rec.grade.gradeLetter}`,
    formatDuration(rec.timeSpentSeconds),
    rec.dateFormatted
  ]);

  const ws = XLSX.utils.aoa_to_sheet([...headers, ...rows]);
  XLSX.utils.book_append_sheet(wb, ws, "Bang_Vinh_Danh");

  const safeFilename = `Bang_Vinh_Danh_Diem_Thi_ICTU_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(wb, safeFilename);
}
