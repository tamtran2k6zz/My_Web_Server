import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Layers, BookOpen } from 'lucide-react'

export function Header({ t, totalQuestions }) {
  return (
    <div className="relative pt-6 pb-10 flex flex-col items-center text-center">
      {/* Sparkle Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-transparent backdrop-blur-md shadow-sm"
      >
        <svg className="w-4 h-4 text-white filter drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z"/>
        </svg>
        <span className="text-xs sm:text-sm font-medium tracking-wide text-slate-200">
          Nền tảng Khảo thí LMS · 150+ Câu hỏi
        </span>
      </motion.div>

      {/* Main Headline with Serif Accent */}
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.15]"
      >
        Khảo thí <span className="font-serif-accent font-normal text-slate-400">Chủ nghĩa xã hội khoa học</span> chuẩn mực.
      </motion.h1>

      {/* Lede Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-5 max-w-2xl text-base sm:text-lg text-slate-400 font-normal leading-relaxed"
      >
        Ngân hàng câu hỏi chuẩn hóa gồm 4 học phần trọng tâm, hỗ trợ trắc nghiệm A-B-C-D, đúng/sai, và kéo thả cảm ứng tiện lợi trên mọi thiết bị.
      </motion.p>

      {/* Quick Hero Actions */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
      >
        <a
          href="#phase-1"
          className="btn-solid px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold flex items-center gap-2 cursor-pointer shadow-xl hover:scale-[1.02]"
        >
          <BookOpen size={18} />
          <span>Bắt đầu ôn tập</span>
        </a>

        <a
          href="#phase-2"
          className="btn-ghost px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white flex items-center gap-2 cursor-pointer"
        >
          <Layers size={18} />
          <span>Ôn tập tổng hợp (138 câu)</span>
        </a>
      </motion.div>
    </div>
  )
}
