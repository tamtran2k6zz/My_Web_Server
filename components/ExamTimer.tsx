import React, { useEffect, useState } from 'react';
import { Timer, AlertTriangle, Send } from 'lucide-react';
import { formatDuration } from '../services/examService';

interface Props {
  initialSeconds: number;
  onTimeUp: () => void;
  onSubmit: () => void;
  isPaused?: boolean;
}

export const ExamTimer: React.FC<Props> = ({ initialSeconds, onTimeUp, onSubmit, isPaused = false }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isPaused) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused, onTimeUp]);

  const percentage = Math.max(0, Math.min(100, (timeLeft / initialSeconds) * 100));
  const isWarning = timeLeft <= 300 && timeLeft > 60; // < 5 mins
  const isDanger = timeLeft <= 60; // < 1 min

  return (
    <div className={`flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl border transition-all duration-300 ${
      isDanger
        ? 'bg-rose-950/60 border-rose-500/60 text-rose-300 shadow-lg shadow-rose-950/50 animate-pulse'
        : isWarning
        ? 'bg-amber-950/50 border-amber-500/50 text-amber-300 shadow-md shadow-amber-950/40'
        : 'bg-white/5 border-white/10 text-cyan-300 backdrop-blur-md'
    }`}>
      <div className="flex items-center gap-1.5 shrink-0">
        {isDanger ? (
          <AlertTriangle size={16} className="text-rose-400 animate-bounce" />
        ) : (
          <Timer size={16} className={isWarning ? 'text-amber-400' : 'text-cyan-400'} />
        )}
        <span className="font-mono font-bold text-xs sm:text-sm tracking-wider">
          {formatDuration(timeLeft)}
        </span>
      </div>

      {/* Mini Progress Bar */}
      <div className="w-12 sm:w-16 h-1.5 bg-white/10 rounded-full overflow-hidden shrink-0 hidden sm:block">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isDanger ? 'bg-rose-500' : isWarning ? 'bg-amber-400' : 'bg-gradient-to-r from-cyan-400 to-blue-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={onSubmit}
        className="ml-1 sm:ml-2 px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-bold hover:brightness-110 active:scale-95 transition flex items-center gap-1 shadow-sm cursor-pointer whitespace-nowrap"
        title="Nộp bài thi và xem kết quả"
      >
        <Send size={12} />
        <span>Nộp bài</span>
      </button>
    </div>
  );
};
