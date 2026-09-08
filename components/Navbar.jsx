import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe2, LogIn, LogOut, Sparkles, BookOpen, Layers, CheckCircle2, ChevronRight } from 'lucide-react'

export function Navbar({ language, setLanguage, t, user, onLogin, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(prev => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-40 mb-6 rounded-2xl border border-white/10 bg-black/60 px-4 sm:px-6 py-3.5 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Brand Logo with Vesper Mark */}
          <a href="#top" onClick={closeMenu} className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink-0" aria-label="EduQuiz LMS">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/15 shadow-inner shadow-black/40 text-white transition-transform group-hover:scale-105 shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <g transform="rotate(-30 12 12)">
                  <circle cx="7.3" cy="3.2" r="1.45"/>
                  <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8"/>
                  <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8"/>
                  <circle cx="16.7" cy="20.8" r="1.45"/>
                </g>
              </svg>
            </div>
            <div className="shrink-0 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-cyan-300 font-medium tracking-wide whitespace-nowrap">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0"></span>
                <span>Operational LMS</span>
              </div>
              <h1 className="text-sm sm:text-base xl:text-lg font-bold tracking-tight text-white flex items-center whitespace-nowrap leading-none mt-0.5 sm:mt-1">
                Triết Học<span className="font-normal text-slate-400 ml-1">.lms</span>
              </h1>
            </div>
          </a>

          {/* Center: Desktop Liquid Metal Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
            <a href="#phase-1" className="liquid-pill px-3 py-1.5 xl:px-4 xl:py-2 rounded-lg text-xs xl:text-sm font-medium whitespace-nowrap shrink-0">
              Chủ đề 1 – 4
            </a>
            <a href="#phase-2" className="liquid-pill px-3 py-1.5 xl:px-4 xl:py-2 rounded-lg text-xs xl:text-sm font-medium whitespace-nowrap shrink-0">
              Ôn tập tổng hợp
            </a>
            <a href="#phase-3" className="liquid-pill px-3 py-1.5 xl:px-4 xl:py-2 rounded-lg text-xs xl:text-sm font-medium whitespace-nowrap shrink-0">
              Dạng bài khảo thí
            </a>
            <a href="#stats" className="liquid-pill px-3 py-1.5 xl:px-4 xl:py-2 rounded-lg text-xs xl:text-sm font-medium whitespace-nowrap shrink-0">
              150+ Câu hỏi
            </a>
          </nav>

          {/* Right: Actions (Language & Login/User) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageToggle language={language} setLanguage={setLanguage} />

            {user ? (
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 backdrop-blur-md shrink-0">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-6 h-6 rounded-full border border-white/20 shrink-0" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center text-xs font-bold shrink-0">
                      {user.displayName ? user.displayName[0] : 'U'}
                    </div>
                  )}
                  <span className="text-xs sm:text-sm font-medium text-slate-200 hidden sm:inline max-w-[120px] truncate whitespace-nowrap">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="btn-ghost px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap"
                  title="Đăng xuất"
                >
                  <LogOut size={14} className="shrink-0" />
                  <span className="hidden sm:inline">{t.logout}</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onLogin}
                className="btn-solid px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-lg shrink-0 whitespace-nowrap"
              >
                <LogIn size={15} className="shrink-0" />
                <span>{t.login}</span>
              </button>
            )}

            {/* Mobile / Tablet Burger Button (shown below lg: 1024px) */}
            <button
              type="button"
              onClick={toggleMenu}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none shrink-0"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`block w-4 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
              <span className={`block w-4 h-0.5 bg-white transition-opacity duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100 my-0.5'}`} />
              <span className={`block w-4 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Backdrop & Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-2xl flex flex-col justify-center px-6 py-12"
            onClick={closeMenu}
          >
            <div className="flex flex-col gap-3 w-full max-w-sm mx-auto" onClick={(e) => e.stopPropagation()}>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2 px-2">
                Danh mục khảo thí
              </div>
              <a
                href="#phase-1"
                onClick={closeMenu}
                className="liquid-pill px-5 py-4 rounded-xl text-base font-semibold text-white flex items-center justify-between"
              >
                <span className="flex items-center gap-3"><BookOpen size={18} className="text-cyan-300 shrink-0" /> <span>Chủ đề 1 – 4 (138 câu)</span></span>
                <ChevronRight size={16} className="text-slate-400 shrink-0" />
              </a>
              <a
                href="#phase-2"
                onClick={closeMenu}
                className="liquid-pill px-5 py-4 rounded-xl text-base font-semibold text-white flex items-center justify-between"
              >
                <span className="flex items-center gap-3"><Layers size={18} className="text-fuchsia-300 shrink-0" /> <span>Ôn tập Tổng hợp 1 – 4</span></span>
                <ChevronRight size={16} className="text-slate-400 shrink-0" />
              </a>
              <a
                href="#phase-3"
                onClick={closeMenu}
                className="liquid-pill px-5 py-4 rounded-xl text-base font-semibold text-white flex items-center justify-between"
              >
                <span className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-300 shrink-0" /> <span>Luyện tập theo dạng bài</span></span>
                <ChevronRight size={16} className="text-slate-400 shrink-0" />
              </a>
              <a
                href="#phase-4"
                onClick={closeMenu}
                className="liquid-pill px-5 py-4 rounded-xl text-base font-semibold text-white flex items-center justify-between"
              >
                <span className="flex items-center gap-3"><Sparkles size={18} className="text-amber-300 shrink-0" /> <span>Tổng hợp toàn bộ 150 câu</span></span>
                <ChevronRight size={16} className="text-slate-400 shrink-0" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function LanguageToggle({ language, setLanguage }) {
  const isVI = language === 'vi'
  return (
    <button
      type="button"
      onClick={() => setLanguage(isVI ? 'en' : 'vi')}
      className="group flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-white/10 cursor-pointer shrink-0 whitespace-nowrap"
      aria-label="Toggle language"
    >
      <Globe2 className="h-3.5 w-3.5 text-cyan-300 shrink-0" />
      <span className="text-xs font-semibold tracking-wider text-slate-300">
        {isVI ? 'VI' : 'EN'}
      </span>
    </button>
  )
}
