import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, LayoutGrid, Compass } from 'lucide-react';

export interface ToonItem {
  src: string;
  bg: string;
  panel: string;
  topicId: string;
  title: string;
  subtitle: string;
  desc: string;
  questionCount: number;
}

export const IMAGES: ToonItem[] = [
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png',
    bg: '#F4845F',
    panel: '#F79B7F',
    topicId: '1',
    title: 'PHẦN 1: NHẬP MÔN & SỨ MỆNH LS GCCN',
    subtitle: 'Nhập môn CNXHKH & Sứ mệnh giai cấp công nhân',
    desc: 'The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.',
    questionCount: 38,
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
    topicId: '2',
    title: 'PHẦN 2: CHỦ NGHĨA XÃ HỘI & QUÁ ĐỘ',
    subtitle: 'Chủ nghĩa xã hội và thời kỳ quá độ lên CNXH',
    desc: 'The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.',
    questionCount: 41,
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png',
    bg: '#E882B4',
    panel: '#ED9DC4',
    topicId: '3',
    title: 'PHẦN 3: DÂN CHỦ & NHÀ NƯỚC XHCN',
    subtitle: 'Dân chủ xã hội chủ nghĩa & Nhà nước XHCN',
    desc: 'The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.',
    questionCount: 30,
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png',
    bg: '#6EB5FF',
    panel: '#8DC4FF',
    topicId: '4',
    title: 'PHẦN 4: CƠ CẤU XH - GIAI CẤP & LIÊN MINH',
    subtitle: 'Cơ cấu xã hội – giai cấp và liên minh giai cấp, tầng lớp',
    desc: 'The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.',
    questionCount: 29,
  },
];

interface ToonHubProps {
  onTopicSelect: (topicId: string) => void;
  onSwitchToClassic?: () => void;
}

export const ToonHub: React.FC<ToonHubProps> = ({ onTopicSelect, onSwitchToClassic }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  // Preload all 4 images on mount
  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigate carousel
  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) => (direction === 'next' ? (prev + 1) % 4 : (prev + 3) % 4));
      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [isAnimating]
  );

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate('prev');
      } else if (e.key === 'ArrowRight') {
        navigate('next');
      } else if (e.key === 'Enter') {
        onTopicSelect(IMAGES[activeIndex].topicId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, activeIndex, onTopicSelect]);

  // Derive roles for all 4 items
  const getRole = (idx: number) => {
    if (idx === activeIndex) return 'center';
    if (idx === (activeIndex + 3) % 4) return 'left';
    if (idx === (activeIndex + 1) % 4) return 'right';
    return 'back';
  };

  const activeItem = IMAGES[activeIndex];

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{
        backgroundColor: activeItem.bg,
        transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* 1. Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* 2. Giant ghost text "3D SHAPE" */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            zIndex: 2,
            top: '18%',
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(90px, 28vw, 380px)',
            fontWeight: 900,
            color: '#ffffff',
            opacity: 1,
            lineHeight: 1,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          3D SHAPE
        </div>

        {/* 3. Top-left brand label "TOONHUB" */}
        <div
          className="absolute top-6 left-4 sm:left-8 flex items-center gap-3"
          style={{ zIndex: 60 }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold uppercase text-white"
              style={{
                opacity: 0.9,
                letterSpacing: '0.18em',
              }}
            >
              TOONHUB
            </span>
            <span className="hidden sm:inline-block text-white/50 text-xs">•</span>
            <span className="hidden sm:inline-block text-xs uppercase tracking-wider text-white/80 font-medium">
              Khảo Thí CNXHKH
            </span>
          </div>

          {onSwitchToClassic && (
            <button
              type="button"
              onClick={onSwitchToClassic}
              className="ml-3 px-3 py-1.5 rounded-full bg-black/25 hover:bg-black/40 border border-white/25 hover:border-white/50 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md"
              title="Chuyển sang giao diện danh sách truyền thống"
            >
              <LayoutGrid size={13} />
              <span>Giao diện Vesper LMS</span>
            </button>
          )}
        </div>

        {/* Top-right Topic Progress Badge */}
        <div
          className="absolute top-6 right-4 sm:right-8 flex items-center gap-2"
          style={{ zIndex: 60 }}
        >
          <div className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-md text-white text-xs font-semibold tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>
              BÀI {activeIndex + 1} / {IMAGES.length}
            </span>
          </div>
        </div>

        {/* 4. Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((img, idx) => {
            const role = getRole(idx);

            let roleStyle: React.CSSProperties = {
              position: 'absolute',
              aspectRatio: '0.6 / 1',
              transform: 'translateX(-50%)',
              transition:
                'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1)',
              willChange: 'transform, filter, opacity',
            };

            if (role === 'center') {
              roleStyle = {
                ...roleStyle,
                transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
                filter: 'none',
                opacity: 1,
                zIndex: 20,
                left: '50%',
                height: isMobile ? '60%' : '92%',
                bottom: isMobile ? '22%' : '0',
                cursor: 'pointer',
              };
            } else if (role === 'left') {
              roleStyle = {
                ...roleStyle,
                transform: 'translateX(-50%) scale(1)',
                filter: 'blur(2px)',
                opacity: 0.85,
                zIndex: 10,
                left: isMobile ? '20%' : '30%',
                height: isMobile ? '16%' : '28%',
                bottom: isMobile ? '32%' : '12%',
                cursor: 'pointer',
              };
            } else if (role === 'right') {
              roleStyle = {
                ...roleStyle,
                transform: 'translateX(-50%) scale(1)',
                filter: 'blur(2px)',
                opacity: 0.85,
                zIndex: 10,
                left: isMobile ? '80%' : '70%',
                height: isMobile ? '16%' : '28%',
                bottom: isMobile ? '32%' : '12%',
                cursor: 'pointer',
              };
            } else {
              // 'back'
              roleStyle = {
                ...roleStyle,
                transform: 'translateX(-50%) scale(1)',
                filter: 'blur(4px)',
                opacity: 1,
                zIndex: 5,
                left: '50%',
                height: isMobile ? '13%' : '22%',
                bottom: isMobile ? '32%' : '12%',
              };
            }

            return (
              <div
                key={img.src}
                style={roleStyle}
                onClick={() => {
                  if (role === 'left') navigate('prev');
                  else if (role === 'right') navigate('next');
                  else if (role === 'center') onTopicSelect(img.topicId);
                }}
                title={role === 'center' ? `Bắt đầu làm: ${img.title}` : `Xem: ${img.title}`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left text + nav buttons */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24 text-white"
          style={{
            zIndex: 60,
            maxWidth: '320px',
          }}
        >
          <p
            className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px] leading-tight"
            style={{
              opacity: 0.95,
              letterSpacing: '0.02em',
            }}
          >
            TOONHUB FIGURINES
          </p>

          <p
            className="hidden sm:block text-xs sm:text-sm mb-4 sm:mb-5"
            style={{
              opacity: 0.85,
              lineHeight: 1.6,
            }}
          >
            {activeItem.desc}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('prev')}
              aria-label="Previous figurine"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-150 active:scale-95"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid white',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>

            <button
              type="button"
              onClick={() => navigate('next')}
              aria-label="Next figurine"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-150 active:scale-95"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid white',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* 6. Bottom-right link "DISCOVER IT" */}
        <div
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex flex-col items-end gap-1"
          style={{ zIndex: 60 }}
        >
          <div className="hidden sm:flex items-center gap-2 text-white/80 text-xs uppercase tracking-widest font-semibold mb-1">
            <Sparkles size={14} />
            <span>Bắt đầu ôn luyện</span>
          </div>

          <button
            type="button"
            onClick={() => onTopicSelect(activeItem.topicId)}
            className="flex items-center gap-2 text-white cursor-pointer uppercase no-underline transition-opacity duration-200"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(20px, 4vw, 56px)',
              fontWeight: 400,
              opacity: 0.95,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.95';
            }}
            title={`Làm bài trắc nghiệm ${activeItem.title}`}
          >
            <span>DISCOVER IT</span>
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
          </button>

          <span className="text-[11px] sm:text-xs text-white/70 font-medium tracking-wide">
            {activeItem.questionCount} câu hỏi trắc nghiệm
          </span>
        </div>
      </div>
    </div>
  );
};
