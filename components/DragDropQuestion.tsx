import React, { useState, useEffect, DragEvent } from 'react';
import { DragDropQuestion as DragDropQuestionType } from '../types';
import { Check, RefreshCw, CheckCircle2 } from 'lucide-react';

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
  const [draggedData, setDraggedData] = useState<{item: string, source: string} | null>(null);

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
  }, [question]);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: string, source: 'pool' | string) => {
    if (submitted) {
      e.preventDefault();
      return;
    }
    setDraggedData({ item, source });
    try {
      e.dataTransfer.setData('text/plain', JSON.stringify({ item, source }));
    } catch(err) {
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
    } catch(err) {
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

    if (source === targetId) {
      setDraggedData(null);
      return;
    }

    // Remove from source
    if (source === 'pool') {
      setPool((prev) => {
        const index = prev.findIndex(i => i === item);
        if (index === -1) return prev;
        const newPrev = [...prev];
        newPrev.splice(index, 1);
        return newPrev;
      });
    } else {
      setColumns((prev) => {
        const colItems = prev[source] || [];
        const index = colItems.findIndex(i => i === item);
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
    
    setDraggedData(null);
  };

  const checkAnswer = () => {
    if (submitted) return;
    
    let allCorrect = true;
    const newFeedback: { [key: string]: 'correct' | 'wrong' | null } = {};

    Object.keys(columns).forEach((colKey) => {
      const userItems = columns[colKey];
      const correctItems = question.correct[colKey] || [];
      
      // Check if user items match correct items (ignoring order with duplicates)
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
    if (onReset) onReset();
  };

  const isWrong = Object.values(feedback).some(status => status === 'wrong');

  return (
    <div className="space-y-6">
      <div 
        className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg min-h-[80px] border-2 border-dashed border-slate-300 dark:border-slate-700 transition-colors"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'pool')}
      >
        <div className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium uppercase tracking-wider">Kho dữ liệu (Kéo thả vào ô bên dưới)</div>
        <div className="flex flex-wrap gap-2">
          {pool.map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              draggable={!submitted}
              onDragStart={(e) => handleDragStart(e, item, 'pool')}
              className={`px-3 py-2 bg-white dark:bg-slate-700 border border-indigo-200 dark:border-indigo-900 rounded shadow-sm text-sm cursor-grab active:cursor-grabbing hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-200 transition-all ${submitted ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.columns.map((colTitle, idx) => {
          const colKey = idx.toString();
          const status = feedback[colKey];
          let borderColor = "border-slate-200 dark:border-slate-700";
          let bgColor = "bg-slate-50 dark:bg-slate-800";

          if (status === 'correct') {
            borderColor = "border-success";
            bgColor = "bg-green-50 dark:bg-green-900/20";
          } else if (status === 'wrong') {
            borderColor = "border-error";
            bgColor = "bg-red-50 dark:bg-red-900/20";
          }

          return (
            <div key={idx} className="flex flex-col h-full">
              <div className="bg-slate-800 dark:bg-slate-700 text-white p-3 rounded-t-lg text-sm font-semibold">
                {colTitle}
              </div>
              <div
                className={`flex-1 p-3 border-2 border-t-0 rounded-b-lg min-h-[120px] transition-colors ${borderColor} ${bgColor}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, colKey)}
              >
                <div className="flex flex-col gap-2">
                  {columns[colKey]?.map((item, i) => (
                    <div
                      key={`${item}-${i}`}
                      draggable={!submitted}
                      onDragStart={(e) => handleDragStart(e, item, colKey)}
                      className={`px-3 py-2 bg-white dark:bg-slate-700 border border-indigo-100 dark:border-indigo-900 rounded shadow-sm text-sm text-slate-700 dark:text-slate-200 ${submitted ? 'cursor-default' : 'cursor-grab'}`}
                    >
                      {item}
                    </div>
                  ))}
                  {columns[colKey]?.length === 0 && (
                    <div className="text-slate-400 dark:text-slate-500 text-xs text-center py-4 italic">Thả vào đây</div>
                  )}
                </div>
              </div>
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
          disabled={!onReset && isLocked && submitted}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm
            ${(!onReset && isLocked && submitted) 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-200 dark:border-slate-700' 
                : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 active:scale-95'
            }`}
        >
          <RefreshCw size={18} /> Làm lại
        </button>
      </div>

      {submitted && isWrong && (
        <div className="mt-6 p-4 border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 rounded-xl animate-fade-in">
          <h4 className="text-green-800 dark:text-green-300 font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} /> Đáp án đúng:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.columns.map((colTitle, idx) => {
              const colKey = idx.toString();
              const correctItems = question.correct[colKey] || [];
              
              return (
                <div key={idx} className="flex flex-col h-full">
                  <div className="bg-green-700 dark:bg-green-800 text-white p-3 rounded-t-lg text-sm font-semibold opacity-90">
                    {colTitle}
                  </div>
                  <div className="flex-1 p-3 border-2 border-t-0 border-green-200 dark:border-green-800 bg-white dark:bg-slate-800 rounded-b-lg">
                    <div className="flex flex-col gap-2">
                      {correctItems.length > 0 ? (
                        correctItems.map((item, i) => (
                          <div
                            key={i}
                            className="px-3 py-2 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded text-green-900 dark:text-green-200 text-sm shadow-sm"
                          >
                            {item}
                          </div>
                        ))
                      ) : (
                        <div className="text-slate-400 text-xs text-center italic">Không có nội dung</div>
                      )}
                    </div>
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