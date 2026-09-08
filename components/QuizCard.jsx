import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Clock, Sparkles } from 'lucide-react'

export function QuizCard({ card, delay, onClick }) {
  const Icon = card.icon
  const isUpdating = card.questions === 0 || card.isUpdating

  const handleClick = () => {
    if (isUpdating) {
      alert("Phần này đang được cập nhật câu hỏi mới. Vui lòng chọn Phần 1, Phần 2, Phần 3 hoặc Phần 4 để luyện tập nhé!")
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
          ? 'border-white/10 bg-white/[0.02] opacity-75 hover:border-amber-400/40'
          : 'border-white/10 bg-white/[0.04] hover:border-white/30 hover:bg-white/[0.07]'
      } p-5 sm:p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400`}
    >
      {/* Ambient background hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_40%)]" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Icon Box */}
          <motion.div
            whileHover={!isUpdating ? { rotate: [0, -6, 6, 0] } : undefined}
            transition={{ duration: 0.5 }}
            className={`flex h-13 w-13 items-center justify-center rounded-2xl bg-black/60 border border-white/10 shadow-inner shadow-black/40 shrink-0 ${
              isUpdating ? 'text-amber-400' : 'text-cyan-300'
            }`}
          >
            <Icon className="h-6 w-6 transition group-hover:text-white" />
          </motion.div>

          {/* Title & Badges */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug group-hover:text-cyan-100 transition-colors">
              {card.title}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {isUpdating ? (
                <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                  <Clock size={12} /> Đang cập nhật
                </span>
              ) : (
                <>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 border border-white/10">
                    {card.questions} câu hỏi
                  </span>
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300 border border-cyan-400/20 flex items-center gap-1">
                    <Sparkles size={11} /> Xáo trộn ngẫu nhiên
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <ChevronRight className="mt-1 h-5 w-5 text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300 shrink-0" />
      </div>

      {/* Footer link */}
      <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs sm:text-sm text-slate-400">
        <span>{isUpdating ? 'Tài liệu đang soạn thảo' : 'Khởi động kiểm tra'}</span>
        <span className={`inline-flex items-center gap-1.5 font-medium ${isUpdating ? 'text-amber-400' : 'text-cyan-300'}`}>
          {isUpdating ? 'Sắp ra mắt' : 'Bắt đầu ngay'} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.article>
  )
}
