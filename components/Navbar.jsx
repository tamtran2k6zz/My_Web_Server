import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe2, LogIn, LogOut, Sparkles, BookOpen, Layers, CheckCircle2, ChevronRight } from 'lucide-react'

export function Navbar({ language, setLanguage, t, user, onLogin, onLogout, homeViewMode, setHomeViewMode }) {
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
        <div className="flex items-center justify-between gap-4">
          {/* Left: Brand Logo with Vesper Mark */}
          <a href="#top" onClick={closeMenu} className="flex items-center gap-3 group cursor-pointer" aria-label="EduQuiz LMS">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/15 shadow-inner shadow-black/40 text-white transition-transform group-hover:scale-105">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <g transform="rotate(-30 12 12)">
                  <circle cx="7.3" cy="3.2" r="1.45"/>
                  <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8"/>
                  <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8"/>
                  <circle cx="16.7" cy="20.8" r="1.45"/>
                </g>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-medium tracking-wide">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>Operational LMS</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center">
                Triết Học<span className="font-normal text-slate-400">.lms</span>
              </h1>
            </div>
          </a>

          {/* Center: Desktop Liquid Metal Navigation Pills */}
          <nav className="hidden md:flex items-center gap-2">
            {setHomeViewMode && (
              <div className="flex items-center bg-white/10 rounded-xl p-1 border border-white/15 mr-2">
                <button
                  type="button"
                  onClick={() => setHomeViewMode('toonhub')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    homeViewMode === 'toonhub'
                      ? 'bg-white text-slate-950 shadow-sm font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Chế độ vòng xoay 3D ToonHub"
                >
                  <Sparkles size={13} />
                  <span>ToonHub 3D</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHomeViewMode('classic')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    homeViewMode === 'classic'
                      ? 'bg-white text-slate-950 shadow-sm font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Chế độ danh mục Vesper truyền thống"
                >
                  <BookOpen size={13} />
                  <span>Danh mục</span>
                </button>
              </div>
            )}
            <a href="#phase-1" className="liquid-pill px-4 py-2 rounded-lg text-xs sm:text-sm font-medium">
              Chủ đề 1 – 4
            </a>
            <a href="#phase-2" className="liquid-pill px-4 py-2 rounded-lg text-xs sm:text-sm font-medium">
              Ôn tập tổng hợp
            </a>
            <a href="#phase-3" className="liquid-pill px-4 py-2 rounded-lg text-xs sm:text-sm font-medium">
              Dạng bài khảo thí
            </a>
            <a href="#stats" className="liquid-pill px-4 py-2 rounded-lg text-xs sm:text-sm font-medium">
              150+ Câu hỏi
            </a>
          </nav>

          {/* Right: Actions (Language & Login/User) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle language={language} setLanguage={setLanguage} />

            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 backdrop-blur-md">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-6 h-6 rounded-full border border-white/20" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center text-xs font-bold">
                      {user.displayName ? user.displayName[0] : 'U'}
                    </div>
                  )}
                  <span className="text-xs sm:text-sm font-medium text-slate-200 hidden sm:inline max-w-[120px] truncate">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="btn-ghost px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                  title="Đăng xuất"
                >
                  <LogOut size={14} />
                  <span className="hidden sm:inline">{t.logout}</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onLogin}
                className="btn-solid px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <LogIn size={15} />
                <span>{t.login}</span>
              </button>
            )}

            {/* Mobile Burger Button */}
            <button
              type="button"
              onClick={toggleMenu}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none"
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
            className="fixed inset-0 z-30 md:hidden bg-black/70 backdrop-blur-2xl flex flex-col justify-center px-6 py-12"
            onClick={closeMenu}
          >
            <div className="flex flex-col gap-3 w-full max-w-sm mx-auto" onClick={(e) => e.stopPropagation()}>
              {setHomeViewMode && (
                <div className="flex items-center bg-white/10 rounded-xl p-1 border border-white/15 mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setHomeViewMode('toonhub')
                      closeMenu()
                    }}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      homeViewMode === 'toonhub'
                        ? 'bg-white text-slate-950 shadow-sm font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Sparkles size={14} />
                    <span>ToonHub 3D</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHomeViewMode('classic')
                      closeMenu()
                    }}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      homeViewMode === 'classic'
                        ? 'bg-white text-slate-950 shadow-sm font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <BookOpen size={14} />
                    <span>Danh mục Vesper</span>
                  </button>
                </div>
              )}
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2 px-2">
                Danh mục khảo thí
              </div>
              <a
                href="#phase-1"
                onClick={closeMenu}
                className="liquid-pill px-5 py-4 rounded-xl text-base font-semibold text-white flex items-center justify-between"
              >
                <span className="flex items-center gap-3"><BookOpen size={18} className="text-cyan-300" /> Chủ đề 1 – 4 (138 câu)</span>
                <ChevronRight size={16} className="text-slate-400" />
              </a>
              <a
                href="#phase-2"
                onClick={closeMenu}
                className="liquid-pill px-5 py-4 rounded-xl text-base font-semibold text-white flex items-center justify-between"
              >
                <span className="flex items-center gap-3"><Layers size={18} className="text-fuchsia-300" /> Ôn tập Tổng hợp 1 – 4</span>
                <ChevronRight size={16} className="text-slate-400" />
              </a>
              <a
                href="#phase-3"
                onClick={closeMenu}
                className="liquid-pill px-5 py-4 rounded-xl text-base font-semibold text-white flex items-center justify-between"
              >
                <span className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-300" /> Luyện tập theo dạng bài</span>
                <ChevronRight size={16} className="text-slate-400" />
              </a>
              <a
                href="#phase-4"
                onClick={closeMenu}
                className="liquid-pill px-5 py-4 rounded-xl text-base font-semibold text-white flex items-center justify-between"
              >
                <span className="flex items-center gap-3"><Sparkles size={18} className="text-amber-300" /> Tổng hợp toàn bộ 150 câu</span>
                <ChevronRight size={16} className="text-slate-400" />
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
      className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-white/10 cursor-pointer"
      aria-label="Toggle language"
    >
      <Globe2 className="h-3.5 w-3.5 text-cyan-300" />
      <span className="text-xs font-semibold tracking-wider text-slate-300">
        {isVI ? 'VI' : 'EN'}
      </span>
    </button>
  )
}
