import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  className?: string;
  variant?: 'compact' | 'expanded';
}

export function useTheme() {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-mode') as ThemeMode | null;
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved;
      }
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const updateTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const effectiveDark =
        themeMode === 'dark' || (themeMode === 'system' && prefersDark);

      setResolvedTheme(effectiveDark ? 'dark' : 'light');

      if (effectiveDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Update meta theme-color for mobile address bar
      let metaTheme = document.querySelector('meta[name="theme-color"]');
      if (!metaTheme) {
        metaTheme = document.createElement('meta');
        metaTheme.setAttribute('name', 'theme-color');
        document.head.appendChild(metaTheme);
      }
      metaTheme.setAttribute('content', effectiveDark ? '#000000' : '#f8fafc');
    };

    updateTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (themeMode === 'system') {
        updateTheme();
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [themeMode]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('theme-mode', mode);
  };

  return { themeMode, setThemeMode, resolvedTheme };
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', variant = 'compact' }) => {
  const { themeMode, setThemeMode, resolvedTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Expanded variant for Mobile Navigation Drawer
  if (variant === 'expanded') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          Chế độ giao diện (Sáng / Tối / Tự động)
        </div>
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-200/60 dark:bg-white/5 border border-slate-300/80 dark:border-white/10">
          <button
            type="button"
            onClick={() => setThemeMode('light')}
            className={`flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-medium transition cursor-pointer ${
              themeMode === 'light'
                ? 'bg-white text-cyan-600 font-bold shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sun size={17} className={themeMode === 'light' ? 'text-amber-500' : ''} />
            <span>Ngày (Sáng)</span>
          </button>

          <button
            type="button"
            onClick={() => setThemeMode('dark')}
            className={`flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-medium transition cursor-pointer ${
              themeMode === 'dark'
                ? 'bg-slate-800 text-cyan-300 font-bold shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Moon size={17} className={themeMode === 'dark' ? 'text-cyan-400' : ''} />
            <span>Đêm (Tối)</span>
          </button>

          <button
            type="button"
            onClick={() => setThemeMode('system')}
            className={`flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-medium transition cursor-pointer ${
              themeMode === 'system'
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-300 font-bold shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Tự động đồng bộ theo cài đặt Windows hoặc điện thoại"
          >
            <Laptop size={17} />
            <span>Hệ thống</span>
          </button>
        </div>
      </div>
    );
  }

  // Compact variant for Desktop Navbar
  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="group flex items-center gap-1.5 rounded-full border border-slate-300/80 dark:border-white/10 bg-slate-100/70 dark:bg-white/5 px-2.5 py-1.5 backdrop-blur-md transition hover:border-cyan-400/50 hover:bg-white/80 dark:hover:bg-white/10 cursor-pointer shrink-0 whitespace-nowrap text-slate-700 dark:text-slate-300 shadow-sm"
        aria-label="Chọn giao diện đêm / ngày / hệ thống"
        title={
          themeMode === 'light'
            ? 'Giao diện: Ban ngày'
            : themeMode === 'dark'
            ? 'Giao diện: Ban đêm'
            : 'Giao diện: Theo hệ thống'
        }
      >
        {themeMode === 'light' && <Sun size={15} className="text-amber-500 shrink-0" />}
        {themeMode === 'dark' && <Moon size={15} className="text-cyan-400 shrink-0" />}
        {themeMode === 'system' && (
          <Laptop size={15} className="text-cyan-500 dark:text-cyan-300 shrink-0" />
        )}
        <span className="text-xs font-semibold">
          {themeMode === 'light' ? 'Ngày' : themeMode === 'dark' ? 'Đêm' : 'Hệ thống'}
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-1.5 shadow-2xl shadow-black/20 dark:shadow-black/60 z-50 animate-fade-in">
          <button
            type="button"
            onClick={() => {
              setThemeMode('light');
              setDropdownOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
              themeMode === 'light'
                ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 font-bold'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sun size={15} className="text-amber-500" />
              <span>Giao diện Ngày</span>
            </span>
            {themeMode === 'light' && <Check size={14} className="text-cyan-600 dark:text-cyan-300" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setThemeMode('dark');
              setDropdownOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
              themeMode === 'dark'
                ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 font-bold'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <Moon size={15} className="text-cyan-400" />
              <span>Giao diện Đêm</span>
            </span>
            {themeMode === 'dark' && <Check size={14} className="text-cyan-600 dark:text-cyan-300" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setThemeMode('system');
              setDropdownOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
              themeMode === 'system'
                ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 font-bold'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <Laptop size={15} className="text-cyan-500 dark:text-cyan-300" />
              <span>Theo hệ thống</span>
            </span>
            {themeMode === 'system' && <Check size={14} className="text-cyan-600 dark:text-cyan-300" />}
          </button>
        </div>
      )}
    </div>
  );
};
