import React, { useEffect, useState } from 'react';
import { Moon, Sun, Palette, Settings2, Check } from 'lucide-react';
import { Modal } from './Modal';

const COLORS = [
  { name: 'Indigo', value: '79 70 229', class: 'bg-indigo-600' },
  { name: 'Blue', value: '37 99 235', class: 'bg-blue-600' },
  { name: 'Emerald', value: '5 150 105', class: 'bg-emerald-600' },
  { name: 'Rose', value: '225 29 72', class: 'bg-rose-600' },
  { name: 'Amber', value: '217 119 6', class: 'bg-amber-600' },
  { name: 'Violet', value: '124 58 237', class: 'bg-violet-600' },
];

const ThemeControls = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeColor, setActiveColor] = useState(COLORS[0].value);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    const savedColor = localStorage.getItem('accentColor');
    if (savedColor) {
      setActiveColor(savedColor);
      document.documentElement.style.setProperty('--color-primary', savedColor);
    }
  }, []);

  const toggleDarkMode = (dark: boolean) => {
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const changeColor = (colorValue: string) => {
    setActiveColor(colorValue);
    document.documentElement.style.setProperty('--color-primary', colorValue);
    localStorage.setItem('accentColor', colorValue);
  };

  return (
    <Modal>
      {/* 1. Nút mở Modal */}
      <Modal.Trigger
        className="fixed bottom-6 right-6 z-40 p-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        title="Giao diện"
        aria-label="Cài đặt giao diện"
      >
        <Settings2 size={24} />
      </Modal.Trigger>

      {/* 2. Portal render ra ngoài document.body */}
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content size="sm">
          {/* Header */}
          <Modal.Header>
            <Modal.Title className="flex items-center gap-2">
              <Palette size={20} className="text-primary" />
              Tùy chỉnh giao diện
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>

          {/* Body */}
          <Modal.Body>
            {/* Chế độ sáng / tối */}
            <div>
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 block">
                Chế độ hiển thị
              </label>
              <div className="flex bg-slate-100 dark:bg-slate-700/50 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleDarkMode(false)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                    !isDark
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <Sun size={18} /> Sáng
                </button>
                <button
                  type="button"
                  onClick={() => toggleDarkMode(true)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-700 text-primary shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <Moon size={18} /> Tối
                </button>
              </div>
            </div>

            {/* Bảng màu chủ đạo */}
            <div>
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 block">
                Màu chủ đạo
              </label>
              <div className="grid grid-cols-6 gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => changeColor(color.value)}
                    className={`w-10 h-10 rounded-full ${color.class} flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-primary cursor-pointer ${
                      activeColor === color.value ? 'ring-2 ring-offset-2 dark:ring-offset-slate-800 ring-slate-400 scale-110' : ''
                    }`}
                    title={color.name}
                  >
                    {activeColor === color.value && <Check size={16} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default ThemeControls;