import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Clock, Download, X, User, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { getExamLeaderboard, getStudentExamHistory, ExamRecord, formatDuration } from '../services/examService';
import { exportLeaderboardToExcel, exportExamToPdf, exportExamToExcel } from '../services/exportService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentEmail?: string;
}

export const LeaderboardModal: React.FC<Props> = ({ isOpen, onClose, currentEmail }) => {
  const [tab, setTab] = useState<'global' | 'history'>('global');
  const [leaderboard, setLeaderboard] = useState<ExamRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      setLeaderboard(getExamLeaderboard());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const myHistory = getStudentExamHistory(currentEmail);
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const getRankBadge = (index: number) => {
    if (index === 0) return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-400/30">🥇</span>;
    if (index === 1) return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-950 font-bold text-sm shadow-md shadow-slate-300/30">🥈</span>;
    if (index === 2) return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-sm shadow-md shadow-amber-600/30">🥉</span>;
    return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-slate-300 font-bold text-xs">{index + 1}</span>;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-black border border-slate-200 dark:border-white/15 p-5 sm:p-7 shadow-2xl shadow-cyan-950/20 dark:shadow-cyan-950/40 my-8 flex flex-col max-h-[90vh] text-slate-900 dark:text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="leaderboard-title"
      >
        {/* Glow ambient */}
        <div className="pointer-events-none absolute -top-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 transition cursor-pointer"
          aria-label="Đóng bảng xếp hạng"
          title="Đóng"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pr-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2 select-none">
              <Trophy size={14} />
              <span>Bảng vinh danh thành tích sinh viên</span>
            </div>
            <h2 id="leaderboard-title" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight text-pretty">
              Xếp Hạng Năng Lực Học Phần
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Hệ thống khảo thí Chủ nghĩa Xã hội Khoa học • Đại học CNTT & Truyền thông (ICTU)
            </p>
          </div>

          {/* Lecturer Quick Export Button */}
          <button
            type="button"
            onClick={() => exportLeaderboardToExcel(leaderboard)}
            className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2 transition cursor-pointer self-start sm:self-center shrink-0 shadow-sm"
            title="Dành cho Giảng viên: Xuất toàn bộ danh sách điểm sinh viên ra Excel"
          >
            <Download size={15} />
            <span>Xuất Danh Sách Excel</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3 mb-5 shrink-0">
          <button
            type="button"
            onClick={() => setTab('global')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
              tab === 'global'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-white/5'
            }`}
          >
            <Trophy size={16} />
            <span>Bảng vinh danh toàn trường ({leaderboard.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setTab('history')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
              tab === 'history'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-400/20 font-bold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-white/5'
            }`}
          >
            <User size={16} />
            <span>Lịch sử thi của tôi ({myHistory.length})</span>
          </button>
        </div>

        {/* Tab 1: Global Leaderboard */}
        {tab === 'global' && (
          <div className="flex-1 overflow-y-auto pr-1 space-y-5 custom-scrollbar">
            {/* Top 3 Podium Cards */}
            {top3.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {top3.map((rec, idx) => (
                  <div
                    key={rec.id}
                    className={`rounded-2xl p-4 border relative overflow-hidden flex flex-col justify-between ${
                      idx === 0
                        ? 'bg-gradient-to-b from-amber-50 to-amber-100/30 dark:from-amber-500/15 dark:to-amber-950/30 border-amber-300 dark:border-amber-500/40 shadow-lg shadow-amber-500/10'
                        : idx === 1
                        ? 'bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-400/10 dark:to-slate-900/30 border-slate-200 dark:border-slate-400/30'
                        : 'bg-gradient-to-b from-orange-50 to-orange-100/30 dark:from-amber-700/10 dark:to-stone-900/30 border-orange-200 dark:border-amber-700/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {getRankBadge(idx)}
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white font-mono truncate max-w-[130px]">
                            {rec.maskedEmail}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[130px]">
                            {rec.displayName || 'Sinh viên ICTU'}
                          </div>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold select-none ${rec.grade.badgeColor}`}>
                        Loại {rec.grade.gradeLetter}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/10 flex items-end justify-between">
                      <div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase select-none">Điểm số</div>
                        <div className="text-xl font-black text-amber-600 dark:text-amber-400 tabular-nums">
                          {rec.grade.score10.toFixed(1)} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ 10</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase select-none">Thời gian</div>
                        <div className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 tabular-nums">
                          {formatDuration(rec.timeSpentSeconds)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Rest of Leaderboard Table */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden bg-slate-50/50 dark:bg-white/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[10px] select-none">
                    <tr>
                      <th className="py-3 px-3 text-center">Hạng</th>
                      <th className="py-3 px-3">Sinh viên</th>
                      <th className="py-3 px-3">Học phần khảo thí</th>
                      <th className="py-3 px-3 text-center">Đúng</th>
                      <th className="py-3 px-3 text-center">Điểm (10)</th>
                      <th className="py-3 px-3 text-center">Xếp loại</th>
                      <th className="py-3 px-3 text-center">Thời gian</th>
                      <th className="py-3 px-3 text-right">Ngày thi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                    {leaderboard.map((rec, index) => (
                      <tr 
                        key={rec.id}
                        className={`hover:bg-slate-100/70 dark:hover:bg-white/5 transition ${
                          currentEmail && rec.userEmail.toLowerCase() === currentEmail.toLowerCase()
                            ? 'bg-cyan-500/10 font-medium'
                            : ''
                        }`}
                      >
                        <td className="py-3 px-3 text-center">
                          {getRankBadge(index)}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-900 dark:text-white font-mono">{rec.maskedEmail}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">{rec.displayName || 'Sinh viên ICTU'}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-700 dark:text-slate-300 max-w-[160px] truncate" title={rec.topicName}>
                          {rec.topicName}
                        </td>
                        <td className="py-3 px-3 text-center text-slate-700 dark:text-slate-300 tabular-nums">
                          {rec.score} / {rec.totalQuestions}
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-slate-900 dark:text-white tabular-nums">
                          {rec.grade.score10.toFixed(1)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold select-none ${rec.grade.badgeColor}`}>
                            Loại {rec.grade.gradeLetter}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-slate-600 dark:text-slate-400 tabular-nums">
                          {formatDuration(rec.timeSpentSeconds)}
                        </td>
                        <td className="py-3 px-3 text-right text-slate-500 dark:text-slate-400 text-[10px]">
                          {rec.dateFormatted.split(',')[0]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: My Exam History */}
        {tab === 'history' && (
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
            {myHistory.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <Trophy size={36} className="mx-auto text-slate-400 dark:text-slate-600 mb-3" />
                <h4 className="text-base font-semibold text-slate-900 dark:text-white">Chưa có kết quả khảo thí</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 text-pretty">
                  Hãy bật chế độ "Phòng thi bấm giờ" và hoàn tất ít nhất một đề thi để ghi danh vào bảng xếp hạng!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {myHistory.map(rec => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-white/20 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold select-none ${rec.grade.badgeColor}`}>
                          Loại {rec.grade.gradeLetter} ({rec.grade.gradeText})
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">• {rec.dateFormatted}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{rec.topicName}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 mt-1">
                        <span>Đúng: <b className="tabular-nums">{rec.score}/{rec.totalQuestions}</b> ({rec.percentage.toFixed(1)}%)</span>
                        <span>•</span>
                        <span>Điểm 10: <b className="text-amber-600 dark:text-amber-400 tabular-nums">{rec.grade.score10.toFixed(1)}</b></span>
                        <span>•</span>
                        <span>Thời gian: <b className="tabular-nums font-mono">{formatDuration(rec.timeSpentSeconds)}</b></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => exportExamToPdf(rec)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-700 dark:text-red-300 border border-red-500/30 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                        title="Tải lại PDF phiếu báo điểm"
                      >
                        <Download size={13} />
                        <span>PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => exportExamToExcel(rec)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                        title="Tải lại Excel bảng điểm"
                      >
                        <Download size={13} />
                        <span>Excel</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
