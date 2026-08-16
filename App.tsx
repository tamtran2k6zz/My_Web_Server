import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Award, HelpCircle, Layers, List, CreditCard, LayoutGrid, PieChart, CheckSquare, ToggleLeft, MousePointer2 } from 'lucide-react';
import { data as sourceData } from './data';
import { Topic } from './types';
import QuestionCard from './components/QuestionCard';
import ThemeControls from './components/ThemeControls';
import { Home } from './components/Home';
import { auth, loginWithGoogle, logout } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Helper to shuffle an array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// Helper to randomize options within a question and recalculate correct index
function randomizeQuestionOptions(question: any) {
  // Deep clone to avoid mutating original data
  const newQ = JSON.parse(JSON.stringify(question));

  // 1. Single and Multi Choice: Shuffle options and update 'correct' indices
  if ((newQ.type === 'single' || newQ.type === 'multi') && Array.isArray(newQ.options)) {
    const pairs: { opt: string; index: number }[] = newQ.options.map((opt: string, index: number) => ({ opt, index }));
    const shuffledPairs = shuffleArray(pairs);
    newQ.options = shuffledPairs.map((p) => p.opt);

    if (newQ.type === 'single') {
      newQ.correct = shuffledPairs.findIndex((p) => p.index === question.correct);
    } else if (newQ.type === 'multi') {
      newQ.correct = question.correct.map((oldIdx: number) => 
        shuffledPairs.findIndex((p) => p.index === oldIdx)
      ).sort((a: number, b: number) => a - b);
    }
  }

  // 2. True/False: Shuffle the rows (options)
  if (newQ.type === 'truefalse' && Array.isArray(newQ.options)) {
    newQ.options = shuffleArray(newQ.options);
  }

  // 3. Drag and Drop: Shuffle the pool of items
  if (newQ.type === 'drag' && Array.isArray(newQ.items)) {
    newQ.items = shuffleArray(newQ.items);
  }

  return newQ;
}

function App() {
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [animDirection, setAnimDirection] = useState<'left' | 'right' | null>(null);
  const [viewMode, setViewMode] = useState<'single' | 'list'>('single');

  useEffect(() => {
    if (!auth) {
      setLoadingAuth(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Generate data with shuffling applied to ALL topics (standard and review)
  const data = useMemo<Record<string, Topic>>(() => {
    const processQuestions = (questions: any[]) => {
      const shuffledQuestions = shuffleArray([...questions]);
      return shuffledQuestions.map(q => randomizeQuestionOptions(q));
    };

    const generateReviewTopic = (topicIds: string[], name: string): Topic => {
      let questions: any[] = [];
      topicIds.forEach(id => {
        if (sourceData[id]) {
          questions = [...questions, ...sourceData[id].questions];
        }
      });
      
      return {
        name,
        questions: processQuestions(questions)
      };
    };

    const allQuestionsRaw = Object.values(sourceData).reduce((acc: any[], topic) => [...acc, ...topic.questions], []);
    
    const processedStandardTopics: Record<string, Topic> = {};
    Object.keys(sourceData).forEach(key => {
      const topic = sourceData[key];
      processedStandardTopics[key] = {
        name: topic.name,
        questions: processQuestions(topic.questions)
      };
    });

    const keys = Object.keys(sourceData);
    const keys1to3 = ['1', '2', '3'];
    const keys4to6 = ['4', '5', '6'];

    return {
      ...processedStandardTopics,
      "review-1-3": generateReviewTopic(keys1to3, "TỔNG HỢP: ÔN TẬP PHẦN 1 - 3 (109 CÂU)"),
      "type-quiz": {
        name: "LUYỆN TẬP: CHUYÊN ĐỀ TRẮC NGHIỆM (A,B,C,D)",
        questions: processQuestions(allQuestionsRaw.filter((q: any) => q.type === 'single' || q.type === 'multi'))
      },
      "type-tf": {
        name: "LUYỆN TẬP: CHUYÊN ĐỀ ĐÚNG / SAI",
        questions: processQuestions(allQuestionsRaw.filter((q: any) => q.type === 'truefalse'))
      },
      "type-drag": {
        name: "LUYỆN TẬP: CHUYÊN ĐỀ KÉO THẢ & GHÉP NỐI",
        questions: processQuestions(allQuestionsRaw.filter((q: any) => q.type === 'drag' || q.type === 'match'))
      },
      "review-all": generateReviewTopic(keys, "TỔNG HỢP: ÔN TẬP TOÀN BỘ KIẾN THỨC")
    };
  }, []);

  const handleTopicSelect = (id: string) => {
    setActiveTopicId(id);
    setScore(0);
    setCurrentQuestionIndex(0);
    setAnimDirection(null);
    setViewMode('single');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExit = () => {
    setActiveTopicId(null);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  const activeTopic = activeTopicId ? data[activeTopicId] : null;

  const handleNext = () => {
    if (activeTopic && currentQuestionIndex < activeTopic.questions.length - 1) {
      setAnimDirection('right');
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setAnimDirection('left');
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAnswer = () => {
    if (viewMode === 'single' && activeTopic && currentQuestionIndex < activeTopic.questions.length - 1) {
      setTimeout(() => handleNext(), 1500);
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent shadow-lg shadow-cyan-500/20"></div>
        <p className="mt-4 text-cyan-300/80 font-medium tracking-wider text-sm uppercase">Đang tải cấu hình...</p>
      </div>
    );
  }

  if (!activeTopic) {
    return <Home data={data} onTopicSelect={handleTopicSelect} user={user} onLogin={loginWithGoogle} onLogout={logout} />;
  }

  return (
    <div className="min-h-screen font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-primary/20 selection:text-primary">
      <ThemeControls />

      {/* Header Liquid Glass */}
      <header className="sticky top-0 z-30 glass-panel border-b border-white/30 dark:border-white/10 transition-all duration-300">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/15 dark:bg-primary/25 p-2.5 rounded-xl text-primary border border-primary/20 shadow-sm">
              <BookOpen size={22} />
            </div>
            <h1 className="font-bold text-lg hidden sm:block text-slate-900 dark:text-white tracking-tight">
              Triết Học Quiz Pro
            </h1>
          </div>

          <div className="flex items-center gap-3" role="status" aria-live="polite">
            <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm text-slate-800 dark:text-slate-100 shadow-sm">
              <Award size={18} className="text-amber-500" />
              <span>{score} / {activeTopic.questions.length}</span>
            </div>
            <button
              type="button"
              onClick={handleExit}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-full text-slate-600 dark:text-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
              title="Quay lại danh sách chủ đề"
              aria-label="Thoát bài kiểm tra"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 sm:p-6 pb-24">
        <div className="space-y-6">
          {/* Banner Liquid Glass Header */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-white/40 dark:border-white/10 animate-fade-in">
            <div className="flex items-start justify-between gap-4 relative z-10">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight">
                  {activeTopic.name}
                </h2>
                <div className="flex flex-wrap items-center gap-3 font-medium text-sm text-slate-600 dark:text-slate-300">
                  <span className="bg-primary/15 text-primary px-3 py-1 rounded-full font-semibold border border-primary/20">
                    {viewMode === 'single'
                      ? `Câu hỏi ${currentQuestionIndex + 1} / ${activeTopic.questions.length}`
                      : `Tổng số: ${activeTopic.questions.length} câu`}
                  </span>
                  <span className="hidden sm:inline">• Phản hồi tức thì</span>
                </div>
              </div>

              {/* Nút chuyển chế độ xem */}
              <div className="flex bg-slate-200/50 dark:bg-slate-800/60 rounded-xl p-1 gap-1 shrink-0 border border-slate-300/40 dark:border-slate-700/60">
                <button
                  type="button"
                  onClick={() => setViewMode('single')}
                  className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                    viewMode === 'single'
                      ? 'bg-white dark:bg-slate-700 text-primary shadow-sm font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Chế độ từng câu"
                  aria-label="Xem từng câu một"
                >
                  <CreditCard size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-slate-700 text-primary shadow-sm font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Chế độ danh sách"
                  aria-label="Xem toàn bộ danh sách"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Danh sách câu hỏi */}
          <div className={viewMode === 'single' ? "relative min-h-[380px]" : "space-y-6"}>
            {activeTopic.questions.map((q, idx) => (
              <div
                key={`${activeTopicId}-${idx}`}
                className={
                  viewMode === 'single'
                    ? idx === currentQuestionIndex
                      ? `block ${animDirection === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right'}`
                      : 'hidden'
                    : 'block'
                }
              >
                <QuestionCard
                  question={q}
                  index={idx}
                  onCorrect={() => setScore(prev => prev + 1)}
                  onAnswer={handleAnswer}
                />
              </div>
            ))}
          </div>

          {/* Thanh điều hướng tiếp / lùi */}
          {viewMode === 'single' ? (
            <div className="space-y-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="min-h-[44px] flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold glass-panel text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                >
                  <ChevronLeft size={20} />
                  Câu trước
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentQuestionIndex === activeTopic.questions.length - 1}
                  className="min-h-[44px] flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                >
                  Câu tiếp
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleExit}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 text-sm font-medium underline-offset-4 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 py-1"
                >
                  Thoát bài kiểm tra
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center pt-8 pb-4">
              <button
                type="button"
                onClick={handleExit}
                className="min-h-[44px] flex items-center gap-2 px-6 py-3 glass-panel hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-full transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
              >
                <ChevronLeft size={20} />
                Quay lại danh sách chủ đề
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;