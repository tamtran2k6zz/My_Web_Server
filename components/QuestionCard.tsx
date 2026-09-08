import React, { useState } from 'react';
import { Question } from '../types';
import { Check, X, Circle, CheckCircle2, AlertCircle } from 'lucide-react';
import DragDropQuestion from './DragDropQuestion';
import FillBlankQuestion from './FillBlankQuestion';

interface Props {
  question: Question;
  index: number;
  onCorrect: () => void;
  onAnswer?: () => void;
}

const QuestionCard: React.FC<Props> = ({ question, index, onCorrect, onAnswer }) => {
  const [answered, setAnswered] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState<number | null>(null);
  const [selectedMulti, setSelectedMulti] = useState<number[]>([]);
  const [selectedTF, setSelectedTF] = useState<{ [key: number]: boolean | null }>({});
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSingleSelect = (optIdx: number) => {
    if (answered) return;
    setSelectedSingle(optIdx);
    setAnswered(true);
    if (question.type === 'single') {
      const correct = optIdx === question.correct;
      setIsCorrect(correct);
      if (correct) onCorrect();
    }
    if (onAnswer) onAnswer();
  };

  const handleMultiToggle = (optIdx: number) => {
    if (answered) return;
    setSelectedMulti(prev =>
      prev.includes(optIdx) ? prev.filter(i => i !== optIdx) : [...prev, optIdx]
    );
  };

  const submitMulti = () => {
    if (question.type !== 'multi') return;
    if (selectedMulti.length === 0) return;
    setAnswered(true);

    const correctSet = new Set(question.correct);
    const selectedSet = new Set(selectedMulti);

    let correct = true;
    if (correctSet.size !== selectedSet.size) correct = false;
    for (let s of selectedSet) if (!correctSet.has(s)) correct = false;

    setIsCorrect(correct);
    if (correct) onCorrect();
    if (onAnswer) onAnswer();
  };

  const handleTFToggle = (rowIdx: number, val: boolean) => {
    if (answered) return;
    setSelectedTF(prev => ({ ...prev, [rowIdx]: val }));
  };

  const submitTF = () => {
    if (question.type !== 'truefalse') return;
    if (Object.keys(selectedTF).length < question.options.length) {
      alert("Vui lòng trả lời đầy đủ tất cả các ý.");
      return;
    }

    setAnswered(true);
    let allCorrect = true;
    question.options.forEach((opt, idx) => {
      if (selectedTF[idx] !== opt.correct) allCorrect = false;
    });

    setIsCorrect(allCorrect);
    if (allCorrect) onCorrect();
    if (onAnswer) onAnswer();
  };

  const cleanText = (txt: string) => {
    if (typeof txt !== 'string') return txt;
    return txt.replace(/^[A-D]\.\s*/i, '').trim();
  };

  const renderContent = () => {
    if (question.html) {
      return <div dangerouslySetInnerHTML={{ __html: question.q }} />;
    }
    return question.q;
  };

  return (
    <article className="glass-panel rounded-2xl overflow-hidden mb-6 transition-all duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-primary/40">
      {/* Header câu hỏi */}
      <div className="p-5 sm:p-6 border-b border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-900/30">
        <h3 className="text-slate-900 dark:text-white font-semibold text-lg flex gap-3 items-start leading-relaxed">
          <span className="text-primary font-bold whitespace-nowrap bg-primary/10 dark:bg-primary/20 px-2.5 py-0.5 rounded-md text-sm self-start mt-0.5">
            Câu {index + 1}
          </span>
          <span className="text-slate-800 dark:text-slate-100 flex-1">{renderContent()}</span>
        </h3>
      </div>

      <div className="p-5 sm:p-6 space-y-4">
        {/* 1. Trắc nghiệm đơn (Single Choice) */}
        {question.type === 'single' && (
          <div role="radiogroup" aria-label={`Câu hỏi ${index + 1}`} className="space-y-3">
            {question.options.map((opt, idx) => {
              const isSelected = selectedSingle === idx;
              const isTargetCorrect = idx === question.correct;
              const optionLetter = String.fromCharCode(65 + idx);
              const textContent = cleanText(opt);

              let styleClass =
                "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group min-h-[52px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ";

              let badgeClass = "w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ";

              if (answered) {
                if (isTargetCorrect) {
                  styleClass += "bg-emerald-500/15 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-medium";
                  badgeClass += "bg-emerald-500 text-white shadow-sm";
                } else if (isSelected) {
                  styleClass += "bg-rose-500/15 border-rose-500 text-rose-950 dark:text-rose-200";
                  badgeClass += "bg-rose-500 text-white shadow-sm";
                } else {
                  styleClass += "bg-slate-100/30 dark:bg-slate-800/30 border-transparent text-slate-400 dark:text-slate-500 opacity-60 cursor-not-allowed";
                  badgeClass += "bg-white/5 text-slate-500";
                }
              } else {
                styleClass += "glass-card hover:bg-white/80 dark:hover:bg-slate-700/60 hover:border-primary/50 text-slate-800 dark:text-slate-100 cursor-pointer active:scale-[0.99]";
                badgeClass += "bg-white/10 text-slate-300 group-hover:bg-primary group-hover:text-slate-950";
              }

              return (
                <button
                  key={idx}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSingleSelect(idx)}
                  disabled={answered}
                  className={styleClass}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className={badgeClass}>{optionLetter}</span>
                    <span className="flex-1 text-base leading-relaxed">{textContent}</span>
                  </div>
                  {answered && isTargetCorrect && <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 shrink-0 ml-3" size={22} />}
                  {answered && isSelected && !isTargetCorrect && <X className="text-rose-600 dark:text-rose-400 shrink-0 ml-3" size={22} />}
                  {!answered && <Circle className="text-slate-300 dark:text-slate-500 group-hover:text-primary transition-colors shrink-0 ml-3" size={20} />}
                </button>
              );
            })}
          </div>
        )}

        {/* 2. Trắc nghiệm nhiều lựa chọn (Multi Choice) */}
        {question.type === 'multi' && (
          <div className="space-y-4">
            <div role="group" aria-label={`Chọn nhiều đáp án cho câu ${index + 1}`} className="space-y-3">
              {question.options.map((opt, idx) => {
                const isSelected = selectedMulti.includes(idx);
                const isTargetCorrect = question.correct.includes(idx);
                const optionLetter = String.fromCharCode(65 + idx);
                const textContent = cleanText(opt);

                let btnClass =
                  "w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 min-h-[52px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ";

                let badgeClass = "w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ";

                if (answered) {
                  if (isTargetCorrect) {
                    btnClass += "bg-emerald-500/15 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-medium";
                    badgeClass += "bg-emerald-500 text-white shadow-sm";
                  } else if (isSelected && !isTargetCorrect) {
                    btnClass += "bg-rose-500/15 border-rose-500 text-rose-950 dark:text-rose-200";
                    badgeClass += "bg-rose-500 text-white shadow-sm";
                  } else {
                    btnClass += "bg-slate-100/30 dark:bg-slate-800/30 border-transparent text-slate-400 dark:text-slate-500 opacity-60 cursor-not-allowed";
                    badgeClass += "bg-white/5 text-slate-500";
                  }
                } else {
                  if (isSelected) {
                    btnClass += "bg-primary/10 border-primary text-primary font-medium dark:bg-primary/20";
                    badgeClass += "bg-primary text-slate-950 font-bold";
                  } else {
                    btnClass += "glass-card hover:bg-white/80 dark:hover:bg-slate-700/60 hover:border-primary/40 text-slate-800 dark:text-slate-100 cursor-pointer active:scale-[0.99]";
                    badgeClass += "bg-white/10 text-slate-300";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    role="checkbox"
                    aria-checked={isSelected}
                    onClick={() => handleMultiToggle(idx)}
                    disabled={answered}
                    className={btnClass}
                  >
                    <span className={badgeClass}>{optionLetter}</span>
                    <div
                      className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-primary border-primary text-slate-950 shadow-sm'
                          : 'bg-white/80 dark:bg-slate-800/80 border-slate-300 dark:border-slate-500'
                      }`}
                    >
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span className="flex-1 text-base leading-relaxed">{textContent}</span>
                  </button>
                );
              })}
            </div>

            {!answered && (
              <button
                type="button"
                onClick={submitMulti}
                disabled={selectedMulti.length === 0}
                className="min-h-[44px] px-6 py-2.5 rounded-xl font-semibold bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
              >
                Xác nhận câu trả lời
              </button>
            )}
          </div>
        )}

        {/* 3. Đúng / Sai (True / False) */}
        {question.type === 'truefalse' && (
          <div className="space-y-4">
            <div className="grid gap-3">
              {question.options.map((row, idx) => {
                const userVal = selectedTF[idx];
                const isRowCorrect = answered ? userVal === row.correct : null;

                let rowBoxClass = "p-4 rounded-xl border glass-card transition-all ";
                if (answered) {
                  rowBoxClass += isRowCorrect
                    ? "!bg-emerald-500/10 !border-emerald-500/40"
                    : "!bg-rose-500/10 !border-rose-500/40";
                }

                return (
                  <div key={idx} className={rowBoxClass}>
                    <div className="mb-3 font-medium text-slate-800 dark:text-slate-100 text-base leading-relaxed">
                      {row.text}
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleTFToggle(idx, true)}
                        disabled={answered}
                        aria-pressed={userVal === true}
                        className={`flex-1 min-h-[44px] py-2 px-4 rounded-lg text-sm font-semibold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          userVal === true
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-white/70 dark:bg-slate-800/70 border-slate-300/80 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700'
                        } ${answered && row.correct === true ? '!bg-emerald-600 !border-emerald-600 !text-white' : ''}`}
                      >
                        Đúng
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTFToggle(idx, false)}
                        disabled={answered}
                        aria-pressed={userVal === false}
                        className={`flex-1 min-h-[44px] py-2 px-4 rounded-lg text-sm font-semibold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          userVal === false
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-white/70 dark:bg-slate-800/70 border-slate-300/80 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700'
                        } ${answered && row.correct === false ? '!bg-emerald-600 !border-emerald-600 !text-white' : ''}`}
                      >
                        Sai
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {!answered && (
              <button
                type="button"
                onClick={submitTF}
                className="min-h-[44px] px-6 py-2.5 rounded-xl font-semibold bg-primary text-white hover:bg-primary/90 transition-all shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
              >
                Xác nhận câu trả lời
              </button>
            )}
          </div>
        )}

        {/* 4. Kéo thả (Drag Drop) */}
        {question.type === 'drag' && (
          <DragDropQuestion
            question={question}
            onCheck={(valid) => {
              setAnswered(true);
              setIsCorrect(valid);
              if (valid && !answered) onCorrect();
              if (onAnswer) onAnswer();
            }}
            onReset={() => {
              if (isCorrect === true) return;
              setAnswered(false);
              setIsCorrect(null);
            }}
            isLocked={answered}
          />
        )}

        {/* 5. Điền khuyết (Fill Blank) */}
        {question.type === 'fillblank' && (
          <FillBlankQuestion
            question={question}
            onCheck={(valid) => {
              setAnswered(true);
              setIsCorrect(valid);
              if (valid && !answered) onCorrect();
              if (onAnswer) onAnswer();
            }}
            onReset={() => {
              if (isCorrect === true) return;
              setAnswered(false);
              setIsCorrect(null);
            }}
            isLocked={answered}
          />
        )}
      </div>

      {/* Thông báo kết quả có aria-live hỗ trợ Screen Reader */}
      {answered && isCorrect !== null && (
        <div
          role="status"
          aria-live="polite"
          className={`px-5 py-3.5 flex items-center gap-3 font-semibold text-sm transition-all border-t ${
            isCorrect
              ? 'bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-900 dark:text-rose-200 border-rose-500/30'
          }`}
        >
          {isCorrect ? (
            <>
              <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 shrink-0" size={22} />
              <span>Chính xác! Bạn đã trả lời đúng câu hỏi này.</span>
            </>
          ) : (
            <>
              <AlertCircle className="text-rose-600 dark:text-rose-400 shrink-0" size={22} />
              <span>Chưa chính xác. Hãy đối chiếu với đáp án đúng được làm nổi bật phía trên.</span>
            </>
          )}
        </div>
      )}
    </article>
  );
};

export default QuestionCard;