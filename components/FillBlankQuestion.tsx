import React, { useState, useEffect } from 'react';
import { FillBlankQuestion as FillBlankQuestionType } from '../types';
import { Check, RefreshCw, CheckCircle2 } from 'lucide-react';

interface Props {
  question: FillBlankQuestionType;
  onCheck?: (isCorrect: boolean) => void;
  onReset?: () => void;
  isLocked: boolean;
}

const FillBlankQuestion: React.FC<Props> = ({ question, onCheck, onReset, isLocked }) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{ [key: number]: 'correct' | 'wrong' | null }>({});

  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setFeedback({});
  }, [question]);

  const handleChange = (idx: number, val: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [idx]: val }));
  };

  const checkAnswer = () => {
    if (submitted) return;
    let allCorrect = true;
    const newFeedback: { [key: number]: 'correct' | 'wrong' | null } = {};

    question.targets.forEach((_, idx) => {
      const userAns = (answers[idx] || '').trim().toLowerCase();
      const correctAns = question.correct[idx].trim().toLowerCase();

      if (userAns === correctAns) {
        newFeedback[idx] = 'correct';
      } else {
        newFeedback[idx] = 'wrong';
        allCorrect = false;
      }
    });

    setFeedback(newFeedback);
    setSubmitted(true);
    if (onCheck) {
      onCheck(allCorrect);
    }
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    setFeedback({});
    if (onReset) onReset();
  };

  const isWrong = Object.values(feedback).some(status => status === 'wrong');

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {question.targets.map((target, idx) => {
          const parts = target.split('___');
          const status = feedback[idx];
          
          let inputClass = "mx-2 px-3 py-1 bg-white/50 dark:bg-slate-900/50 border-b-2 outline-none transition-all w-48 text-center text-primary font-semibold ";
          
          if (status === 'correct') {
             inputClass += "border-success text-success bg-green-50 dark:bg-green-900/20";
          } else if (status === 'wrong') {
             inputClass += "border-error text-error bg-red-50 dark:bg-red-900/20";
          } else {
             inputClass += "border-slate-300 dark:border-slate-600 focus:border-primary";
          }

          return (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 leading-relaxed flex flex-wrap items-center">
              {parts.map((part, pIdx) => (
                <React.Fragment key={pIdx}>
                  <span>{part}</span>
                  {pIdx < parts.length - 1 && (
                    <input
                      type="text"
                      className={inputClass}
                      value={answers[idx] || ''}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      disabled={submitted}
                      placeholder="..."
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={checkAnswer}
          disabled={submitted}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm ${
            submitted 
              ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-primary/90 hover:shadow-md'
          }`}
        >
          <Check size={18} /> Kiểm tra
        </button>
        
        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
        >
          <RefreshCw size={18} /> Làm lại
        </button>
      </div>

      {submitted && isWrong && (
        <div className="mt-6 p-4 border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 rounded-xl animate-fade-in">
          <h4 className="text-green-800 dark:text-green-300 font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} /> Đáp án đúng:
          </h4>
          <div className="space-y-2">
            {question.correct.map((ans, idx) => (
              <div key={idx} className="flex gap-2 items-center p-3 rounded-lg bg-white dark:bg-slate-800 border border-green-100 dark:border-green-800/50 shadow-sm">
                 <span className="font-semibold text-green-700 dark:text-green-400 whitespace-nowrap opacity-75">Gợi ý {idx + 1}:</span>
                 <span className="text-slate-800 dark:text-slate-100 font-medium">{ans}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FillBlankQuestion;
