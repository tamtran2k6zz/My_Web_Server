import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, AlertCircle, BookOpen, CheckCircle2, Lock } from 'lucide-react';

interface LoginGateProps {
  onLogin: () => void;
  authError: string | null;
  isLoggingIn: boolean;
}

export const LoginGate: React.FC<LoginGateProps> = ({ onLogin, authError, isLoggingIn }) => {
  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_center,rgba(34,211,238,0.12),transparent_50%),radial-gradient(circle_at_20%_60%,rgba(168,85,247,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(56,189,248,0.06),transparent_45%),linear-gradient(180deg,#000000,#040711)] -z-10" />

      {/* Header bar */}
      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/15 shadow-inner shadow-black/40 text-white">
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
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-cyan-300 font-medium tracking-wide">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>ICTU Authentication Portal</span>
            </div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center">
              Triết Học<span className="font-normal text-slate-400 ml-1">.lms</span>
            </h1>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-slate-300 backdrop-blur-md">
          <ShieldCheck size={14} className="text-cyan-300" />
          <span>Cổng xác thực nội bộ</span>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="relative mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle top light bar */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* Sparkle badge */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-xs font-semibold tracking-wide">
              <Lock size={13} className="shrink-0" />
              <span>Yêu cầu đăng nhập để truy cập</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Hệ Thống Khảo Thí LMS
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Ôn luyện <span className="font-serif-accent italic text-white font-normal">Chủ nghĩa xã hội khoa học</span> dành riêng cho sinh viên và cán bộ Trường Đại học CNTT & Truyền thông (ICTU).
            </p>
          </div>

          {/* Error Banner if any */}
          {authError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 rounded-2xl border border-rose-500/40 bg-rose-500/15 p-4 text-rose-200 text-sm flex items-start gap-3"
            >
              <AlertCircle size={20} className="text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                <p className="font-semibold text-white mb-1">Xác thực không thành công</p>
                <p>{authError}</p>
              </div>
            </motion.div>
          )}

          {/* Allowed Domain Notice Card */}
          <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
              <span className="text-slate-400">Tên miền được phép:</span>
              <span className="font-mono font-bold text-cyan-300 bg-cyan-400/10 px-2.5 py-0.5 rounded-md border border-cyan-400/20">
                @ictu.edu.vn
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Vui lòng sử dụng địa chỉ email do trường cấp (ví dụ: <span className="text-slate-200 font-mono">DTCxxxxxx@ictu.edu.vn</span>) để đăng nhập Google. Các tài khoản cá nhân khác (@gmail.com, ...) sẽ tự động bị từ chối.
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={onLogin}
            disabled={isLoggingIn}
            className="w-full btn-solid py-4 px-6 rounded-2xl text-sm sm:text-base font-bold flex items-center justify-center gap-3 cursor-pointer shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin shrink-0" />
                <span>Đang kết nối xác thực Google...</span>
              </>
            ) : (
              <>
                {/* Official Google 'G' Logo */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Đăng nhập với Google (@ictu.edu.vn)</span>
              </>
            )}
          </button>

          {/* Features Highlights */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <BookOpen size={16} className="text-cyan-300 mx-auto mb-1.5" />
              <p className="font-semibold text-xs text-white">150+ Câu hỏi</p>
              <p className="text-[11px] text-slate-400 mt-0.5">4 phần chuẩn hóa</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <CheckCircle2 size={16} className="text-emerald-300 mx-auto mb-1.5" />
              <p className="font-semibold text-xs text-white">Chấm tức thì</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Hiển thị đáp án ngay</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <Sparkles size={16} className="text-amber-300 mx-auto mb-1.5" />
              <p className="font-semibold text-xs text-white">Xáo trộn đề</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Chống học vẹt</p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative mx-auto w-full max-w-6xl py-6 px-6 text-center text-xs text-slate-500 border-t border-white/10">
        <p>© 2026 Trường Đại học Công nghệ Thông tin & Truyền thông — Đại học Thái Nguyên</p>
        <p className="mt-1 text-[11px] text-slate-600">Hệ thống khảo thí trực tuyến môn Triết học Mác – Lênin & Chủ nghĩa xã hội khoa học</p>
      </footer>
    </div>
  );
};
