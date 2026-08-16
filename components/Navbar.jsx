import { motion } from 'framer-motion'
import { Globe2, LogIn, Menu, ToggleLeft } from 'lucide-react'

export function Navbar({ language, setLanguage, t, user, onLogin, onLogout }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-20 mb-2 rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-4 backdrop-blur-xl shadow-[0_10px_40px_rgba(2,6,23,0.35)]"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/15 ring-1 ring-cyan-300/25">
            <Menu className="h-5 w-5 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-cyan-200/90">
              <Globe2 className="h-4 w-4" />
              <span>Premium Learning Hub</span>
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-white">{t.brand}</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
          <LanguageToggle language={language} setLanguage={setLanguage} />
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
                <img src={user.photoURL} alt="Avatar" className="w-6 h-6 rounded-full" />
                <span className="text-sm font-medium text-slate-200">{user.displayName}</span>
              </div>
              <button onClick={onLogout} className="group inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-300 shadow-md transition hover:bg-slate-700">
                {t.logout}
              </button>
            </div>
          ) : (
            <button onClick={onLogin} className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-cyan-400/30">
              <LogIn className="h-4 w-4 transition group-hover:translate-x-0.5" />
              {t.login}
            </button>
          )}
        </div>
      </div>
    </motion.header>
  )
}

function LanguageToggle({ language, setLanguage }) {
  const isVI = language === 'vi'
  return (
    <button
      onClick={() => setLanguage(isVI ? 'en' : 'vi')}
      className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-white/10"
      aria-label="Toggle language"
    >
      <span className={`text-xs font-semibold tracking-widest ${isVI ? 'text-cyan-300' : 'text-slate-400'}`}>VI</span>
      <div className="relative h-6 w-11 rounded-full bg-slate-700/80 p-1 transition">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.45)]"
          style={{ marginLeft: isVI ? 0 : 18 }}
        />
      </div>
      <span className={`text-xs font-semibold tracking-widest ${!isVI ? 'text-cyan-300' : 'text-slate-400'}`}>EN</span>
      <ToggleLeft className="h-4 w-4 text-slate-400 transition group-hover:text-cyan-300" />
    </button>
  )
}
