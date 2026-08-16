import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Clock } from 'lucide-react'

export function QuizCard({ card, delay, onClick }) {
  const Icon = card.icon
  const isUpdating = card.questions === 0 || card.isUpdating

  const handleClick = () => {
    if (isUpdating) {
      alert("Phần này đang được cập nhật câu hỏi mới. Vui lòng chọn Phần 1, Phần 2 hoặc Phần 3 để luyện tập nhé!")
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
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      whileHover={!isUpdating ? { scale: 1.02 } : { scale: 1.005 }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-[0_12px_40px_rgba(2,6,23,0.35)] transition ${
        isUpdating 
          ? 'opacity-75 hover:border-amber-400/40' 
          : 'hover:border-cyan-300/40'
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_35%)]" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <motion.div
            whileHover={!isUpdating ? { rotate: [0, -8, 8, 0] } : undefined}
            transition={{ duration: 0.6 }}
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900/70 ring-1 ring-white/10 shadow-inner shadow-black/20 shrink-0 ${
              isUpdating ? 'text-amber-400' : 'text-cyan-300'
            }`}
          >
            <Icon className="h-7 w-7 transition group-hover:text-white" />
          </motion.div>
          <div>
            <h3 className="text-xl font-semibold text-white">{card.title}</h3>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {isUpdating ? (
                <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-amber-500/30 flex items-center gap-1.5">
                  <Clock size={12} /> Đang cập nhật
                </span>
              ) : (
                <>
                  <span className="rounded-full bg-slate-800/90 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">
                    {card.questions} câu hỏi
                  </span>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
                    Xáo trộn ngẫu nhiên
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <ChevronRight className="mt-1 h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-200 shrink-0" />
      </div>

      <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-400">
        <span>{isUpdating ? 'Tài liệu đang soạn thảo' : 'Khởi động bài học'}</span>
        <span className={`inline-flex items-center gap-1 font-medium ${isUpdating ? 'text-amber-400' : 'text-cyan-300'}`}>
          {isUpdating ? 'Sắp ra mắt' : 'Bắt đầu'} <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </motion.article>
  )
}
