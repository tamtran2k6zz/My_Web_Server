import React, { useState, useEffect, DragEvent } from 'react';
import { DragDropQuestion as DragDropQuestionType } from '../types';
import { Check, RefreshCw, CheckCircle2, ArrowDown, X, Sparkles } from 'lucide-react';

interface Props {
  question: DragDropQuestionType;
  onCheck?: (isCorrect: boolean) => void;
  onReset?: () => void;
  isLocked: boolean;
}

const DragDropQuestion: React.FC<Props> = ({ question, onCheck, onReset, isLocked }) => {
  const [pool, setPool] = useState<string[]>([]);
  const [columns, setColumns] = useState<{ [key: string]: string[] }>({});
  const [feedback, setFeedback] = useState<{ [key: string]: 'correct' | 'wrong' | null }>({});
  const [submitted, setSubmitted] = useState(false);
  const [draggedData, setDraggedData] = useState<{ item: string; source: string } | null>(null);
  const [selectedItem, setSelectedItem] = useState<{ item: string; source: string } | null>(null);

  // Initialize state
  useEffect(() => {
    setPool([...question.items]);
    const initCols: { [key: string]: string[] } = {};
    question.columns.forEach((_, idx) => {
      initCols[idx.toString()] = [];
    });
    setColumns(initCols);
    setFeedback({});
    setSubmitted(false);
    setSelectedItem(null);
  }, [question]);

  // Core move logic
  const moveItem = (item: string, source: string, targetId: string) => {
    if (source === targetId) return;

    // Remove from source
    if (source === 'pool') {
      setPool((prev) => {
        const index = prev.findIndex((i) => i === item);
        if (index === -1) return prev;
        const newPrev = [...prev];
        newPrev.splice(index, 1);
        return newPrev;
      });
    } else {
      setColumns((prev) => {
        const colItems = prev[source] || [];
        const index = colItems.findIndex((i) => i === item);
        if (index === -1) return prev;
        const newCols = [...colItems];
        newCols.splice(index, 1);
        return {
          ...prev,
          [source]: newCols,
        };
      });
    }

    // Add to target
    if (targetId === 'pool') {
      setPool((prev) => [...prev, item]);
    } else {
      setColumns((prev) => ({
        ...prev,
        [targetId]: [...(prev[targetId] || []), item],
      }));
    }
  };

  // ----------------------------------------------------
  // 1. Mobile & Touch Tap-to-Place Logic
  // ----------------------------------------------------
  const handleItemTap = (item: string, source: string, e?: React.MouseEvent) => {
    if (submitted) return;
    if (e) e.stopPropagation();

    // If tapping an item in a column, return it directly to pool or select it
    if (source !== 'pool') {
      moveItem(item, source, 'pool');
      if (selectedItem?.item === item) setSelectedItem(null);
      return;
    }

    // Tapping item in pool: toggle selection
    if (selectedItem?.item === item && selectedItem?.source === source) {
      setSelectedItem(null);
    } else {
      setSelectedItem({ item, source });
    }
  };

  const handleContainerTap = (targetId: string) => {
    if (submitted) return;
    if (!selectedItem) return;

    moveItem(selectedItem.item, selectedItem.source, targetId);
    setSelectedItem(null);
  };

  // ----------------------------------------------------
  // 2. Desktop HTML5 Drag & Drop Logic
  // ----------------------------------------------------
  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: string, source: 'pool' | string) => {
    if (submitted) {
      e.preventDefault();
      return;
    }
    setDraggedData({ item, source });
    try {
      e.dataTransfer.setData('text/plain', JSON.stringify({ item, source }));
    } catch (err) {
      // Ignore
    }
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (submitted) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetId: 'pool' | string) => {
    if (submitted) return;
    e.preventDefault();

    let item = '';
    let source = '';

    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (dataStr) {
        const data = JSON.parse(dataStr);
        item = data.item;
        source = data.source;
      }
    } catch (err) {
      // Ignored
    }

    if (!item && draggedData) {
      item = draggedData.item;
      source = draggedData.source;
    }

    if (!item || !source) {
      setDraggedData(null);
      return;
    }

    moveItem(item, source, targetId);
    setDraggedData(null);
    setSelectedItem(null);
  };

  // ----------------------------------------------------
  // 3. Submit & Check Answer
  // ----------------------------------------------------
  const checkAnswer = () => {
    if (submitted) return;

    let allCorrect = true;
    const newFeedback: { [key: string]: 'correct' | 'wrong' | null } = {};

    Object.keys(columns).forEach((colKey) => {
      const userItems = columns[colKey];
      const correctItems = question.correct[colKey] || [];

      const isCorrect =
        userItems.length === correctItems.length &&
        [...userItems].sort().join('|') === [...correctItems].sort().join('|');

      if (isCorrect) {
        newFeedback[colKey] = 'correct';
      } else {
        newFeedback[colKey] = 'wrong';
        allCorrect = false;
      }
    });

    setFeedback(newFeedback);
    setSubmitted(true);
    setSelectedItem(null);
    if (onCheck) {
      onCheck(allCorrect);
    }
  };

  const reset = () => {
    setPool([...question.items]);
    const initCols: { [key: string]: string[] } = {};
    question.columns.forEach((_, idx) => {
      initCols[idx.toString()] = [];
    });
    setColumns(initCols);
    setFeedback({});
    setSubmitted(false);
    setSelectedItem(null);
    if (onReset) onReset();
  };

  const isWrong = Object.values(feedback).some((status) => status === 'wrong');

  return (
    <div className="space-y-6">
      {/* Hướng dẫn trên điện thoại */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary text-xs sm:text-sm font-medium border border-primary/20">
        <Sparkles size={16} className="shrink-0" />
        <span>
          <strong>Mẹo điện thoại:</strong> Chạm vào đáp án để chọn, sau đó chạm vào khung để đặt. Chạm vào đáp án trong khung để gỡ lại.
        </span>
      </div>

      {/* Kho dữ liệu (Pool) */}
      <div
        className={`p-4 sm:p-5 rounded-2xl min-h-[90px] border-2 border-dashed transition-all ${
          selectedItem && selectedItem.source !== 'pool'
            ? 'border-primary bg-primary/5 cursor-pointer ring-2 ring-primary/20'
            : 'border-slate-300/80 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-900/60'
        }`}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'pool')}
        onClick={() => selectedItem && selectedItem.source !== 'pool' && handleContainerTap('pool')}
      >
        <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3 font-semibold uppercase tracking-wider flex items-center justify-between">
          <span>Kho đáp án ({pool.length} thẻ)</span>
          {selectedItem && (
            <span className="text-primary text-xs font-bold animate-pulse">
              Đang chọn: &quot;{selectedItem.item.slice(0, 24)}...&quot;
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5">
          {pool.map((item, idx) => {
            const isSelected = selectedItem?.item === item && selectedItem?.source === 'pool';

            return (
              <div
                key={`${item}-${idx}`}
                draggable={!submitted}
                onDragStart={(e) => handleDragStart(e, item, 'pool')}
                onClick={(e) => handleItemTap(item, 'pool', e)}
                className={`min-h-[44px] px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all select-none cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-primary text-white shadow-lg ring-4 ring-primary/30 scale-105 animate-pulse'
                    : 'glass-card text-slate-800 dark:text-slate-100 hover:border-primary/50 active:scale-95 shadow-sm hover:shadow-md'
                } ${submitted ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>{item}</span>
                {isSelected && <ArrowDown size={16} className="animate-bounce" />}
              </div>
            );
          })}

          {pool.length === 0 && (
            <div className="text-slate-400 dark:text-slate-500 text-xs italic py-2">
              Đã chuyển toàn bộ đáp án vào các ô bên dưới.
            </div>
          )}
        </div>
      </div>

      {/* Các cột phân loại / ô mục tiêu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {question.columns.map((colTitle, idx) => {
          const colKey = idx.toString();
          const status = feedback[colKey];
          const hasItems = columns[colKey]?.length > 0;
          const isTargetHighlight = selectedItem !== null;

          let borderColor = "border-slate-200/80 dark:border-slate-700/80";
          let bgColor = "glass-panel";

          if (status === 'correct') {
            borderColor = "border-emerald-500 ring-2 ring-emerald-500/20";
            bgColor = "bg-emerald-500/10";
          } else if (status === 'wrong') {
            borderColor = "border-rose-500 ring-2 ring-rose-500/20";
            bgColor = "bg-rose-500/10";
          } else if (isTargetHighlight) {
            borderColor = "border-primary/60 dark:border-primary/60 border-dashed ring-2 ring-primary/20";
          }

          return (
            <div
              key={idx}
              className={`flex flex-col h-full rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-sm ${borderColor} ${bgColor} ${
                isTargetHighlight && !submitted ? 'cursor-pointer hover:border-primary' : ''
              }`}
              onClick={() => isTargetHighlight && handleContainerTap(colKey)}
            >
              {/* Tiêu đề cột */}
              <div className="p-3.5 sm:p-4 bg-slate-800 dark:bg-slate-900 text-white font-semibold text-sm sm:text-base border-b border-white/10 flex items-center justify-between">
                <span>{colTitle}</span>
                {isTargetHighlight && !submitted && (
                  <span className="text-xs text-cyan-300 font-normal bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/30">
                    Chạm để đặt vào đây
                  </span>
                )}
              </div>

              {/* Vùng chứa các mục đã thả */}
              <div
                className="flex-1 p-3.5 sm:p-4 min-h-[130px] flex flex-col justify-start gap-2.5"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, colKey)}
              >
                {columns[colKey]?.map((item, i) => (
                  <div
                    key={`${item}-${i}`}
                    draggable={!submitted}
                    onDragStart={(e) => handleDragStart(e, item, colKey)}
                    onClick={(e) => handleItemTap(item, colKey, e)}
                    className={`min-h-[44px] px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all select-none flex items-center justify-between gap-3 shadow-sm ${
                      submitted
                        ? 'bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
                        : 'glass-card text-slate-800 dark:text-slate-100 hover:border-rose-400 group cursor-pointer active:scale-95'
                    }`}
                    title={!submitted ? 'Chạm để gỡ về kho' : undefined}
                  >
                    <span className="flex-1">{item}</span>
                    {!submitted && (
                      <span className="text-xs text-rose-500 dark:text-rose-400 opacity-60 group-hover:opacity-100 flex items-center gap-1 font-semibold shrink-0 bg-rose-500/10 px-2 py-1 rounded-lg">
                        <X size={14} /> Gỡ
                      </span>
                    )}
                  </div>
                ))}

                {!hasItems && (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 text-xs sm:text-sm italic py-6 border-2 border-dashed border-slate-200/60 dark:border-slate-700/60 rounded-xl">
                    <span>{isTargetHighlight ? '👇 Chạm vào đây để thả' : 'Kéo hoặc chạm đáp án để thả vào đây'}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Nút hành động */}
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={checkAnswer}
          disabled={submitted}
          className={`min-h-[44px] flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md cursor-pointer ${
            submitted
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg active:scale-95'
          }`}
        >
          <Check size={18} /> Kiểm tra kết quả
        </button>

        <button
          type="button"
          onClick={reset}
          disabled={!onReset && isLocked && submitted}
          className="min-h-[44px] flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold glass-panel text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <RefreshCw size={18} /> Làm lại
        </button>
      </div>

      {/* Hiển thị đáp án đúng khi làm sai */}
      {submitted && isWrong && (
        <div className="mt-6 p-5 border-2 border-emerald-500/30 bg-emerald-500/10 rounded-2xl animate-fade-in space-y-4">
          <h4 className="text-emerald-950 dark:text-emerald-300 font-bold text-base flex items-center gap-2">
            <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400" /> Đáp án chính xác:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.columns.map((colTitle, idx) => {
              const colKey = idx.toString();
              const correctItems = question.correct[colKey] || [];

              return (
                <div key={idx} className="flex flex-col h-full rounded-xl overflow-hidden border border-emerald-500/30 bg-white/60 dark:bg-slate-900/60 shadow-sm">
                  <div className="bg-emerald-600 text-white p-3 text-sm font-semibold">
                    {colTitle}
                  </div>
                  <div className="flex-1 p-3.5 space-y-2">
                    {correctItems.length > 0 ? (
                      correctItems.map((item, i) => (
                        <div
                          key={i}
                          className="px-3 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-emerald-950 dark:text-emerald-200 text-sm font-medium"
                        >
                          {item}
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-400 text-xs text-center italic py-2">Không có mục tương ứng</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropQuestion;