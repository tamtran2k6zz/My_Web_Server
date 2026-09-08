import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Award, HelpCircle, Layers, List, CreditCard, LayoutGrid, PieChart, CheckSquare, ToggleLeft, MousePointer2 } from 'lucide-react';
import { data as sourceData } from './data';
import { Topic } from './types';
import QuestionCard from './components/QuestionCard';
import { Home } from './components/Home';
import { LoginGate } from './components/LoginGate';
import { auth, loginWithGoogle, logout, isValidIctuEmail } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Helper to clean prefix like "A. ", "B. ", "C. ", "D. "
function cleanOptionText(opt: string): string {
  if (typeof opt !== 'string') return opt;
  return opt.replace(/^[A-D]\.\s*/i, '').trim();
}

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
  const newQ = JSON.parse(JSON.stringify(question));

  if ((newQ.type === 'single' || newQ.type === 'multi') && Array.isArray(newQ.options)) {
    const cleanedOptions = newQ.options.map(cleanOptionText);
    const pairs: { opt: string; index: number }[] = cleanedOptions.map((opt: string, index: number) => ({ opt, index }));
    const shuffledPairs = shuffleArray(pairs);
    newQ.options = shuffledPairs.map((p) => p.opt);

    if (newQ.type === 'single') {
      newQ.correct = shuffledPairs.findIndex((p) => p.index === question.correct);
    } else if (newQ.type === 'multi') {
      newQ.correct = (question.correct || []).map((oldIdx: number) => 
        shuffledPairs.findIndex((p) => p.index === oldIdx)
      ).sort((a: number, b: number) => a - b);
    }
  }

  if (newQ.type === 'truefalse' && Array.isArray(newQ.options)) {
    newQ.options = shuffleArray(newQ.options);
  }

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
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [animDirection, setAnimDirection] = useState<'left' | 'right' | null>(null);
  const [viewMode, setViewMode] = useState<'single' | 'list'>('single');
  const autoAdvanceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const clearAdvanceTimer = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearAdvanceTimer();
    };
  }, []);

  useEffect(() => {
    if (!auth) {
      setLoadingAuth(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (isValidIctuEmail(currentUser.email)) {
          setUser(currentUser);
          setAuthError(null);
        } else {
          await logout();
          setUser(null);
          setAuthError(`Tài khoản (${currentUser.email || 'không xác định'}) không hợp lệ. Hệ thống chỉ cho phép tài khoản có đuôi @ictu.edu.vn.`);
        }
      } else {
        setUser(null);
      }
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
    const keys1to4 = ['1', '2', '3', '4'];

    return {
      ...processedStandardTopics,
      "review-1-4": generateReviewTopic(keys1to4, "TỔNG HỢP: ÔN TẬP PHẦN 1 - 4 (148 CÂU)"),
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
      "review-all": generateReviewTopic(keys, "TỔNG HỢP: ÔN TẬP TOÀN BỘ KIẾN THỨC (150 CÂU)")
    };
  }, []);

  const handleTopicSelect = (id: string) => {
    clearAdvanceTimer();
    setActiveTopicId(id);
    setScore(0);
    setCurrentQuestionIndex(0);
    setAnimDirection(null);
    setViewMode('single');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExit = () => {
    clearAdvanceTimer();
    setActiveTopicId(null);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  const activeTopic = activeTopicId ? data[activeTopicId] : null;

  const handleNext = () => {
    clearAdvanceTimer();
    if (activeTopic && currentQuestionIndex < activeTopic.questions.length - 1) {
      setAnimDirection('right');
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    clearAdvanceTimer();
    if (currentQuestionIndex > 0) {
      setAnimDirection('left');
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAnswer = () => {
    if (viewMode === 'single' && activeTopic && currentQuestionIndex < activeTopic.questions.length - 1) {
      clearAdvanceTimer();
      autoAdvanceTimerRef.current = setTimeout(() => {
        handleNext();
      }, 1500);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      const { user: loggedInUser, error } = await loginWithGoogle();
      if (error) {
        setAuthError(error);
      } else if (loggedInUser) {
        setUser(loggedInUser);
        setAuthError(null);
      }
    } catch (err: any) {
      setAuthError(err?.message || "Đăng nhập thất bại");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setActiveTopicId(null);
    setScore(0);
    setCurrentQuestionIndex(0);
    setAuthError(null);
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent shadow-lg shadow-cyan-500/20"></div>
        <p className="mt-4 text-slate-400 font-medium tracking-wider text-xs uppercase">Đang nạp cấu hình...</p>
      </div>
    );
  }

  // Gatekeeper: Must authenticate with @ictu.edu.vn account to enter
  if (!user) {
    return <LoginGate onLogin={handleLogin} authError={authError} isLoggingIn={isLoggingIn} />;
  }

  if (!activeTopic) {
    return <Home data={data} onTopicSelect={handleTopicSelect} user={user} onLogin={handleLogin} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-black font-sans text-slate-100 transition-colors duration-300">
      {/* Header Sticky Liquid Glass */}
      <header className="sticky top-0 z-30 glass-panel border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={handleExit}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition group cursor-pointer shrink-0"
              title="Quay lại danh sách"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-white/30 transition shrink-0">
                <ChevronLeft size={18} />
              </div>
              <span className="font-semibold text-sm hidden sm:inline whitespace-nowrap">Quay lại</span>
            </button>

            <div className="h-4 w-px bg-white/15 mx-1 hidden sm:block shrink-0"></div>

            <h1 className="font-semibold text-sm sm:text-base text-white tracking-tight truncate">
              {activeTopic.name}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Score Chip */}
            <div className="glass-card px-3.5 py-1.5 rounded-full flex items-center gap-2 font-semibold text-xs sm:text-sm text-slate-200 border border-white/10 shrink-0 whitespace-nowrap">
              <Award size={16} className="text-amber-400 shrink-0" />
              <span>{score} / {activeTopic.questions.length}</span>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-white/5 rounded-xl p-1 gap-1 shrink-0 border border-white/10">
              <button
                type="button"
                onClick={() => setViewMode('single')}
                className={`min-h-[32px] px-2.5 flex items-center justify-center rounded-lg text-xs transition-all cursor-pointer ${
                  viewMode === 'single'
                    ? 'bg-white text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Từng câu"
              >
                <CreditCard size={15} className="mr-1" />
                <span className="hidden sm:inline">Từng câu</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`min-h-[32px] px-2.5 flex items-center justify-center rounded-lg text-xs transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Danh sách"
              >
                <List size={15} className="mr-1" />
                <span className="hidden sm:inline">Danh sách</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 sm:p-6 pb-24">
        <div className="space-y-6">
          {/* Active Topic Banner */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl border border-white/10">
            <div className="flex items-start justify-between gap-4 relative z-10">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>Chủ đề đang làm bài</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                  {activeTopic.name}
                </h2>
                <div className="flex flex-wrap items-center gap-3 font-medium text-xs sm:text-sm text-slate-300">
                  <span className="bg-white/10 text-white px-3 py-1 rounded-full font-semibold border border-white/15">
                    {viewMode === 'single'
                      ? `Câu ${currentQuestionIndex + 1} / ${activeTopic.questions.length}`
                      : `Tổng cộng: ${activeTopic.questions.length} câu`}
                  </span>
                  <span className="text-slate-400">• Tự động lưu tiến độ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question View Area */}
          <div className={viewMode === 'single' ? "relative min-h-[380px]" : "space-y-6"}>
            {activeTopic.questions.map((q, idx) => (
              <div
                key={`${activeTopicId}-${idx}`}
                className={
                  viewMode === 'single'
                    ? idx === currentQuestionIndex
                      ? 'block'
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

          {/* Bottom Action Controls */}
          {viewMode === 'single' ? (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="btn-ghost px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                  <span>Câu trước</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentQuestionIndex === activeTopic.questions.length - 1}
                  className="btn-solid px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
                >
                  <span>Câu tiếp theo</span>
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleExit}
                  className="text-slate-400 hover:text-white text-xs font-medium underline-offset-4 hover:underline cursor-pointer"
                >
                  Rời khỏi bài kiểm tra
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center pt-8 pb-4">
              <button
                type="button"
                onClick={handleExit}
                className="btn-ghost px-6 py-3 text-sm font-semibold rounded-full flex items-center gap-2 cursor-pointer shadow-md"
              >
                <ChevronLeft size={18} />
                <span>Hoàn tất & Quay lại danh mục</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;