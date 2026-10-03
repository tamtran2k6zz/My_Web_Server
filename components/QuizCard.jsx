import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Clock, Sparkles } from 'lucide-react'

export function QuizCard({ card, delay, onClick, isExamMode }) {
  const Icon = card.icon
  const isUpdating = card.questions === 0 || card.isUpdating

  const handleClick = () => {
    if (isUpdating) {
      alert("Phần này đang được cập nhật câu hỏi mới. Vui lòng chọn các phần đã mở để luyện tập nhé!")
      return
    }
    onClick()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <motion.article
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${card.title}, ${isUpdating ? 'Đang cập nhật' : `${card.questions} câu hỏi`}. Nhấn để bắt đầu`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={!isUpdating ? { scale: 1.015, y: -2 } : { scale: 1.005 }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border ${
        isUpdating
          ? 'border-slate-300/80 dark:border-white/10 bg-slate-100/60 dark:bg-white/[0.02] opacity-75 hover:border-amber-500/50 dark:hover:border-amber-400/40'
          : 'border-slate-300/80 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] hover:border-cyan-400/60 dark:hover:border-white/30 hover:bg-white dark:hover:bg-white/[0.07]'
      } p-5 sm:p-6 backdrop-blur-xl shadow-lg shadow-slate-200/50 dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500`}
    >
      {/* Ambient background hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_40%)]" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Icon Box */}
          <motion.div
            whileHover={!isUpdating ? { rotate: [0, -6, 6, 0] } : undefined}
            transition={{ duration: 0.5 }}
            className={`flex h-13 w-13 items-center justify-center rounded-2xl bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/10 shadow-inner shadow-black/10 dark:shadow-black/40 shrink-0 ${
              isUpdating ? 'text-amber-500 dark:text-amber-400' : 'text-cyan-600 dark:text-cyan-300'
            }`}
          >
            <Icon className="h-6 w-6 transition group-hover:scale-110" />
          </motion.div>

          {/* Title & Badges */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-100 transition-colors">
              {card.title}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {isUpdating ? (
                <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                  <Clock size={12} /> Đang cập nhật
                </span>
              ) : (
                <>
                  <span className="rounded-full bg-slate-100 dark:bg-white/5 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-white/10">
                    {card.questions} câu hỏi
                  </span>
                  {isExamMode ? (
                    <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-300 border border-amber-400/30 flex items-center gap-1 animate-pulse">
                      ⏱️ Thi bấm giờ (30p)
                    </span>
                  ) : (
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-300 border border-cyan-400/20 flex items-center gap-1">
                      <Sparkles size={11} /> Xáo trộn ngẫu nhiên
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <ChevronRight className={`mt-1 h-5 w-5 transition-all duration-300 group-hover:translate-x-1 shrink-0 ${isExamMode ? 'text-amber-500 dark:text-amber-400' : 'text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-300'}`} />
      </div>

      {/* Footer link */}
      <div className="relative mt-5 flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <span>{isUpdating ? 'Tài liệu đang soạn thảo' : isExamMode ? 'Khảo thí tính điểm xếp loại A-F' : 'Khởi động kiểm tra'}</span>
        <span className={`inline-flex items-center gap-1.5 font-medium ${isUpdating ? 'text-amber-600 dark:text-amber-400' : isExamMode ? 'text-amber-600 dark:text-amber-300 font-bold' : 'text-cyan-600 dark:text-cyan-300'}`}>
          {isUpdating ? 'Sắp ra mắt' : isExamMode ? 'Vào phòng thi' : 'Bắt đầu ngay'} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.article>
  )
}
