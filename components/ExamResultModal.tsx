import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, CheckCircle2, XCircle, Clock, FileText, Download, 
  RotateCcw, Trophy, ChevronRight, X, Sparkles, GraduationCap 
} from 'lucide-react';
import { ExamRecord, formatDuration } from '../services/examService';
import { exportExamToPdf, exportExamToExcel } from '../services/exportService';

interface Props {
  record: ExamRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  onViewLeaderboard: () => void;
}

export const ExamResultModal: React.FC<Props> = ({
  record,
  isOpen,
  onClose,
  onRetry,
  onViewLeaderboard
}) => {
  useEffect(() => {
    if (isOpen && record && (record.grade.gradeLetter === 'A' || record.grade.gradeLetter === 'B')) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 300);
      } catch (e) {
        // Fallback gracefully if confetti fails
      }
    }
  }, [isOpen, record]);

  if (!isOpen || !record) return null;

  const { grade } = record;
  const incorrectCount = record.totalQuestions - record.score;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-slate-900 to-black border border-white/15 p-6 sm:p-8 shadow-2xl shadow-cyan-950/40 my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exam-result-title"
      >
        {/* Glow ambient */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition cursor-pointer"
          title="Đóng"
        >
          <X size={18} />
        </button>

        {/* Header Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <GraduationCap size={14} />
            <span>Kết quả khảo thí chính thức</span>
          </div>
          <h2 id="exam-result-title" className="text-xl sm:text-2xl font-bold text-white">
            {record.topicName}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Sinh viên: <span className="text-slate-300 font-semibold">{record.maskedEmail}</span> • {record.dateFormatted}
          </p>
        </div>

        {/* Big Grade Badge */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 mb-6 relative overflow-hidden">
          <div className={`flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-2 ${grade.badgeColor} mb-3 shadow-lg relative`}>
            <span className="text-4xl sm:text-5xl font-black tracking-tight">{grade.gradeLetter}</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-0.5">Xếp loại</span>
          </div>

          <div className="text-center space-y-1">
            <h3 className={`text-lg sm:text-xl font-bold ${grade.textColor}`}>
              {grade.gradeText}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto italic">
              "{grade.feedback}"
            </p>
          </div>
        </div>

        {/* 4 Score Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 text-center">
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Thang điểm 10</div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1">
              {grade.score10.toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ 10</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 text-center">
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Thang điểm 4</div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1">
              {grade.score4.toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ 4.0</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 text-center">
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Số câu đúng</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1">
              <CheckCircle2 size={18} />
              <span>{record.score}</span>
              <span className="text-xs text-slate-400 font-normal">/ {record.totalQuestions}</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 text-center">
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Thời gian làm</div>
            <div className="text-xl sm:text-2xl font-bold text-cyan-300 mt-1 flex items-center justify-center gap-1 font-mono">
              <Clock size={16} />
              <span>{formatDuration(record.timeSpentSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Export Buttons Section for Lecturers & Students */}
        <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <FileText size={14} className="text-cyan-400" />
            <span>Xuất phiếu báo cáo nộp Giảng viên</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => exportExamToPdf(record)}
              className="px-4 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 shadow-sm"
              title="Tải về phiếu báo điểm định dạng PDF chuẩn A4"
            >
              <Download size={16} />
              <span>Xuất Báo Cáo PDF (.pdf)</span>
            </button>

            <button
              type="button"
              onClick={() => exportExamToExcel(record)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 shadow-sm"
              title="Tải về bảng điểm chi tiết định dạng Excel"
            >
              <Download size={16} />
              <span>Xuất Bảng Điểm Excel (.xlsx)</span>
            </button>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onViewLeaderboard}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Trophy size={16} />
            <span>Bảng Vinh Danh</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onRetry}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>Luyện lại đề</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial btn-solid px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg"
            >
              <span>Xem lại câu hỏi</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
