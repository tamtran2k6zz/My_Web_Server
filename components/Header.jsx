import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Layers, BookOpen, Timer, Trophy, CheckCircle2 } from 'lucide-react'

export function Header({ t, totalQuestions, activeTopicsCount, isExamMode, onToggleExamMode, onOpenLeaderboard }) {
  return (
    <div className="relative pt-6 pb-10 flex flex-col items-center text-center">
      {/* Top Badges Row */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap items-center justify-center gap-2.5 mb-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300/80 dark:border-white/10 bg-slate-100/80 dark:bg-gradient-to-r dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-md shadow-sm">
          <svg className="w-4 h-4 text-slate-800 dark:text-white filter drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z"/>
          </svg>
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-200">
            Nền tảng Khảo thí LMS · {totalQuestions} Câu hỏi
          </span>
        </div>

        {/* Exam Mode Toggle Chip */}
        <button
          type="button"
          onClick={onToggleExamMode}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition cursor-pointer shadow-md ${
            isExamMode
              ? 'bg-amber-500/20 border-amber-400/50 text-amber-600 dark:text-amber-300 shadow-amber-500/20'
              : 'bg-slate-100/80 dark:bg-white/5 border-slate-300/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10'
          }`}
          title="Bật/Tắt chế độ thi bấm giờ có tính điểm và xếp loại A, B, C, D, F"
        >
          <Timer size={15} className={isExamMode ? 'text-amber-500 dark:text-amber-400 animate-pulse' : 'text-slate-400'} />
          <span>{isExamMode ? '⏱️ Chế độ: Thi bấm giờ (Đang BẬT)' : 'Chế độ: Ôn luyện tự do'}</span>
        </button>
      </motion.div>

      {/* Main Headline with Serif Accent */}
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.15]"
      >
        Khảo thí <span className="font-serif-accent font-normal text-slate-500 dark:text-slate-400">Chủ nghĩa xã hội khoa học</span> chuẩn mực.
      </motion.h1>

      {/* Lede Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-5 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed text-pretty"
      >
        {isExamMode 
          ? "Phòng thi bấm giờ đang kích hoạt: Thời gian làm bài 30 phút, tự động chấm điểm thang 10 & 4, xếp loại học lực A-B-C-D-F, vinh danh bảng vàng và xuất phiếu báo cáo PDF/Excel."
          : `Ngân hàng câu hỏi chuẩn hóa gồm ${activeTopicsCount ? `${activeTopicsCount} học phần` : 'các học phần'} trọng tâm, hỗ trợ trắc nghiệm A-B-C-D, đúng/sai, và kéo thả cảm ứng tiện lợi trên mọi thiết bị.`
        }
      </motion.p>

      {/* Quick Hero Actions */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
      >
        <button
          type="button"
          onClick={onToggleExamMode}
          className={`px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold flex items-center gap-2 cursor-pointer shadow-xl transition-all ${
            isExamMode
              ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold hover:scale-[1.02]'
              : 'btn-solid hover:scale-[1.02]'
          }`}
        >
          <Timer size={18} />
          <span>{isExamMode ? '⏱️ Vào phòng thi bấm giờ' : 'Bật phòng thi bấm giờ'}</span>
        </button>

        <button
          type="button"
          onClick={onOpenLeaderboard}
          className="btn-ghost px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-amber-600 dark:text-amber-300 hover:text-amber-700 dark:hover:text-amber-200 border border-amber-400/40 bg-amber-500/10 flex items-center gap-2 cursor-pointer transition shadow-md"
        >
          <Trophy size={18} className="text-amber-500 dark:text-amber-400" />
          <span>Bảng vinh danh sinh viên</span>
        </button>

        <a
          href="#phase-2"
          className="btn-ghost px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-slate-800 dark:text-white flex items-center gap-2 cursor-pointer"
        >
          <Layers size={18} />
          <span>Ôn tập tổng hợp ({totalQuestions} câu)</span>
        </a>
      </motion.div>
    </div>
  )
}
