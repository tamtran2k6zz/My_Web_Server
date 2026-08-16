import { Sparkles } from 'lucide-react'

export function Header({ t, totalQuestions }) {
  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-[1.5fr_0.9fr] lg:items-end">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur">
          <Sparkles className="h-4 w-4" />
          <span>{t.headerSubtitle}</span>
        </div>
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {t.headerTitle}
        </h2>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-xl shadow-slate-950/30">
        <p className="text-sm text-slate-300">Tổng số câu trong hệ thống</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <div className="text-3xl font-bold text-white">{totalQuestions}</div>
            <div className="text-xs uppercase tracking-[0.28em] text-slate-400">Questions</div>
          </div>
          <div className="rounded-xl bg-emerald-400/10 px-3 py-2 text-sm font-medium text-emerald-300 ring-1 ring-emerald-400/20">
            Ready to learn
          </div>
        </div>
      </div>
    </div>
  )
}
