import React, { useMemo, useState } from 'react'
import { ArrowRight, BookOpen, Layers3, Puzzle, Sparkles, SquareCheckBig, Target, Wand2, LogIn } from 'lucide-react'
import { Navbar } from './Navbar'
import { Header } from './Header'
import { QuizCard } from './QuizCard'

const content = {
  vi: {
    brand: 'Triết Học LMS',
    login: 'Đăng nhập Google',
    logout: 'Đăng xuất',
    headerTitle: 'Khảo Thí Chủ Nghĩa Xã Hội Khoa Học',
    headerSubtitle: 'Chọn chủ đề để bắt đầu ôn tập...',
    phases: [
      'Giai đoạn 1 · Học phần trọng tâm (Bài 1 – 4)',
      'Giai đoạn 2 · Ôn tập tổng hợp liên chương',
      'Giai đoạn 3 · Chuyên đề theo dạng bài',
      'Giai đoạn 4 · Khảo thí toàn diện'
    ],
  },
  en: {
    brand: 'Philosophy LMS',
    login: 'Google Sign In',
    logout: 'Sign out',
    headerTitle: 'Scientific Socialism Examination',
    headerSubtitle: 'Choose a topic to begin practice...',
    phases: [
      'Phase 1 · Core Units (Lesson 1 – 4)',
      'Phase 2 · Comprehensive Review',
      'Phase 3 · By Question Format',
      'Phase 4 · Complete Assessment'
    ],
  },
}

const stagesConfig = [
  {
    key: 'phase-1',
    id: 'phase-1',
    icon: BookOpen,
    gradient: 'from-cyan-400 to-blue-500',
    title: 'Học phần trọng tâm',
    subtitle: 'Nắm vững kiến thức từng bài theo chương trình chuẩn',
    cards: [
      { id: '1', title: 'Phần 1: Nhập môn & Sứ mệnh LS GCCN', icon: BookOpen },
      { id: '2', title: 'Phần 2: CNXH & Thời kỳ quá độ', icon: Sparkles },
      { id: '3', title: 'Phần 3: Dân chủ & Nhà nước XHCN', icon: Layers3 },
      { id: '4', title: 'Phần 4: Cơ cấu XH - Giai cấp & Liên minh', icon: Target },
      { id: '5', title: 'Phần 5: Đang cập nhật', icon: Wand2, isUpdating: true },
      { id: '6', title: 'Phần 6: Đang cập nhật', icon: Puzzle, isUpdating: true },
      { id: 'new-questions', title: 'Bộ câu hỏi mới (Bổ sung)', icon: Sparkles },
    ],
  },
  {
    key: 'phase-2',
    id: 'phase-2',
    icon: Layers3,
    gradient: 'from-fuchsia-400 to-pink-500',
    title: 'Ôn tập tổng hợp',
    subtitle: 'Tổng hợp ngẫu nhiên các câu hỏi từ Phần 1 đến Phần 4',
    cards: [
      { id: 'review-1-4', title: 'Ôn tập Tổng hợp Phần 1 - 4 (138 câu)', icon: Layers3 },
    ],
  },
  {
    key: 'phase-3',
    id: 'phase-3',
    icon: Target,
    gradient: 'from-emerald-400 to-teal-500',
    title: 'Luyện kỹ năng theo dạng bài',
    subtitle: 'Rèn luyện phản xạ theo từng mô hình câu hỏi chuyên sâu',
    cards: [
      { id: 'type-quiz', title: 'Trắc nghiệm (A, B, C, D)', icon: Target },
      { id: 'type-tf', title: 'Đúng / Sai theo từng phát biểu', icon: SquareCheckBig },
      { id: 'type-drag', title: 'Kéo thả & Ghép nối khái niệm', icon: Puzzle },
    ],
  },
  {
    key: 'phase-4',
    id: 'phase-4',
    icon: ArrowRight,
    gradient: 'from-amber-300 to-orange-500',
    title: 'Khảo thí toàn bộ ngân hàng đề',
    subtitle: 'Thử thách tối đa với toàn bộ 150 câu hỏi xáo trộn',
    cards: [{ id: 'review-all', title: 'Tổng hợp toàn bộ kiến thức (150 câu)', icon: ArrowRight }],
  },
]

export function Home({ onTopicSelect, data, user, onLogin, onLogout }) {
  const [language, setLanguage] = useState('vi')
  const t = content[language]

  // Map configuration to actual data to get question counts dynamically
  const stages = useMemo(() => {
    return stagesConfig.map(stage => ({
      ...stage,
      cards: stage.cards.map(card => {
        const matchingTopic = data[card.id]
        return {
          ...card,
          questions: matchingTopic ? matchingTopic.questions.length : 0
        }
      })
    }))
  }, [data]);

  const totalQuestions = useMemo(() => {
    const keys = ['1', '2', '3', '4', 'new-questions']
    return keys.reduce((sum, key) => sum + (data[key]?.questions?.length || 0), 0)
  }, [data])

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between">
      {/* Background radial glows */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_center,rgba(34,211,238,0.08),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.05),transparent_40%),linear-gradient(180deg,#000000,#05070f)] -z-10" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8 flex-1">
        <Navbar language={language} setLanguage={setLanguage} t={t} user={user} onLogin={onLogin} onLogout={onLogout} />

        <Header t={t} totalQuestions={totalQuestions} />

        <main className="mt-8 space-y-12">
          {stages.map((stage, stageIndex) => (
            <section key={stage.key} id={stage.id} className="space-y-4">
              {/* Section Header */}
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stage.gradient} text-slate-950 font-bold shadow-lg shadow-black/40`}>
                  <stage.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {t.phases[stageIndex]}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {stage.subtitle}
                  </p>
                </div>
              </div>

              {/* Grid of Cards */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {stage.cards.map((card, cardIndex) => (
                  <QuizCard
                    key={card.id}
                    card={card}
                    delay={stageIndex * 0.08 + cardIndex * 0.05}
                    onClick={() => onTopicSelect(card.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>

      {/* Vesper 3-Stats Footer */}
      <footer id="stats" className="relative mt-16 border-t border-white/10 bg-black/60 py-8 px-6 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-300 text-xs sm:text-sm">
          {/* Stat 1 */}
          <div className="inline-flex items-center gap-3.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden="true">
              <defs>
                <linearGradient id="pill-g1" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38"/>
                  <stop offset="100%" stopColor="#3a3a3a" stopOpacity="0.62"/>
                </linearGradient>
                <linearGradient id="pill-g2" x1="13" y1="2" x2="24" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.38"/>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.62"/>
                </linearGradient>
              </defs>
              <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#pill-g1)"/>
              <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#pill-g2)"/>
              <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a"/>
            </svg>
            <span><strong>150+ câu hỏi</strong> chuẩn hoá theo giáo trình 2026</span>
          </div>

          {/* Stat 2 */}
          <div className="inline-flex items-center gap-3.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden="true">
              <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff"/>
              <path d="M12 7.1v7.4M8.15 12.35L12 16.2l3.85-3.85" stroke="#111111" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span><strong>100% tự động</strong> chấm điểm & giải thích tức thì</span>
          </div>

          {/* Stat 3 */}
          <div className="inline-flex items-center gap-3.5">
            <svg width="38" height="21" viewBox="0 0 40 22" fill="none" className="shrink-0" aria-hidden="true">
              <g>
                <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b"/>
                <path d="M6.8 5.8L5.2 2.8L9.2 4.6Z" fill="#2b2b2b"/>
                <path d="M13.6 5.8L15.2 2.8L11.2 4.6Z" fill="#2b2b2b"/>
                <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4"/>
                <circle cx="8.9" cy="11.6" r="0.7" fill="#1a1a1a"/>
                <circle cx="11.5" cy="11.6" r="0.7" fill="#1a1a1a"/>
              </g>
              <g>
                <circle cx="20.2" cy="11" r="9.2" fill="#ffffff"/>
                <circle cx="18.2" cy="9.8" r="1.7" fill="#111111"/>
                <circle cx="22.2" cy="9.8" r="1.7" fill="#111111"/>
                <ellipse cx="20.2" cy="12.6" rx="1.2" ry="0.8" fill="#111111"/>
                <path d="M18.6 14.6c.9.8 2.3.8 3.2 0" stroke="#111111" strokeWidth="1.2" strokeLinecap="round"/>
              </g>
              <g>
                <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d"/>
                <text x="30.2" y="15.1" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="12.5" fill="#ffffff" textAnchor="middle">e</text>
              </g>
            </svg>
            <span><strong>Hàng nghìn sinh viên</strong> tham gia ôn luyện</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
