import { useMemo, useState } from 'react'
import { ArrowRight, BookOpen, Layers3, Puzzle, Sparkles, SquareCheckBig, Target, Wand2, LogIn } from 'lucide-react'
import { Navbar } from './Navbar'
import { Header } from './Header'
import { QuizCard } from './QuizCard'

const content = {
  vi: {
    brand: 'Triết Học Quiz Pro',
    login: 'Đăng nhập bằng Google',
    logout: 'Đăng xuất',
    headerTitle: 'Ngân Hàng Câu Hỏi Triết Học',
    headerSubtitle: 'Chọn chủ đề để bắt đầu...',
    phases: ['Giai đoạn 1 · Chủ đề lẻ', 'Giai đoạn 2 · Ôn tập cụm', 'Giai đoạn 3 · Luyện kỹ năng', 'Giai đoạn 4 · Về đích'],
  },
  en: {
    brand: 'Philosophy Quiz Pro',
    login: 'Sign in with Google',
    logout: 'Sign out',
    headerTitle: 'Philosophy Question Bank',
    headerSubtitle: 'Choose a topic to get started...',
    phases: ['Phase 1 · Individual Topics', 'Phase 2 · Cluster Review', 'Phase 3 · Skill Practice', 'Phase 4 · Final Stretch'],
  },
}

const stagesConfig = [
  {
    key: 'phase-1',
    icon: BookOpen,
    gradient: 'from-cyan-400 to-blue-500',
    cards: [
      { id: '1', title: 'CĐ 1: Nhập môn & Tiền đề CNXHKH', icon: BookOpen },
      { id: '2', title: 'CĐ 2: Sứ mệnh lịch sử của GCCN', icon: Sparkles },
      { id: '3', title: 'CĐ 3: CNXH & Đặc trưng bản chất', icon: Layers3 },
      { id: '4', title: 'CĐ 4: Thời kỳ quá độ lên CNXH', icon: Target },
      { id: '5', title: 'CĐ 5: Dân chủ xã hội chủ nghĩa', icon: Wand2 },
      { id: '6', title: 'CĐ 6: Nhà nước xã hội chủ nghĩa', icon: Puzzle },
      { id: 'new-questions', title: 'Bộ câu hỏi mới', icon: Sparkles },
    ],
  },
  {
    key: 'phase-2',
    icon: Layers3,
    gradient: 'from-fuchsia-400 to-pink-500',
    cards: [
      { id: 'review-1-3', title: 'Ôn tập CĐ 1-3 Cơ bản', icon: Layers3 },
      { id: 'review-4-6', title: 'Ôn tập CĐ 4-6 Nâng cao', icon: Sparkles },
    ],
  },
  {
    key: 'phase-3',
    icon: Target,
    gradient: 'from-emerald-400 to-teal-500',
    cards: [
      { id: 'type-quiz', title: 'Trắc nghiệm', icon: Target },
      { id: 'type-tf', title: 'Đúng / Sai', icon: SquareCheckBig },
      { id: 'type-drag', title: 'Kéo thả & Ghép nối', icon: Puzzle },
    ],
  },
  {
    key: 'phase-4',
    icon: ArrowRight,
    gradient: 'from-amber-300 to-orange-500',
    cards: [{ id: 'review-all', title: 'Tổng hợp toàn bộ', icon: ArrowRight }],
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

  const totalQuestions = useMemo(() => stages.flatMap((stage) => stage.cards).reduce((sum, card) => sum + card.questions, 0), [stages])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.12),transparent_25%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,1))]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <Navbar language={language} setLanguage={setLanguage} t={t} user={user} onLogin={onLogin} onLogout={onLogout} />
        
        {!user ? (
          <div className="flex flex-1 flex-col items-center justify-center mt-8 animate-fade-in-up">
            <div className="max-w-md w-full bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col items-center text-center">
              <div className="h-24 w-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-cyan-500/20">
                 <BookOpen className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                 {t.brand}
              </h2>
              <p className="text-slate-400 mb-10 leading-relaxed text-sm">
                 Nền tảng kiểm tra và ôn tập Triết Học trực tuyến. Vui lòng đăng nhập với tài khoản Google để trải nghiệm đầy đủ các tính năng!
              </p>
              <button 
                onClick={onLogin} 
                className="w-full group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-cyan-400/30"
              >
                <LogIn className="h-5 w-5 transition group-hover:-translate-x-1" />
                {t.login}
              </button>
            </div>
          </div>
        ) : (
          <>
            <Header t={t} totalQuestions={totalQuestions} />

            <main className="mt-8 grid gap-7">
              {stages.map((stage, stageIndex) => (
                <section key={stage.key} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stage.gradient} shadow-lg shadow-cyan-500/10`}>
                      <stage.icon className="h-5 w-5 text-slate-950" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white sm:text-xl">{t.phases[stageIndex]}</h2>
                      <p className="text-sm text-slate-300/80">{stage.cards.length} chủ đề · Thiết kế để học nhanh và kiểm tra mượt mà</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {stage.cards.map((card, cardIndex) => (
                      <QuizCard key={card.id} card={card} delay={stageIndex * 0.12 + cardIndex * 0.08} onClick={() => onTopicSelect(card.id)} />
                    ))}
                  </div>
                </section>
              ))}
            </main>
          </>
        )}
      </div>
    </div>
  )
}
