import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Upload, ShieldCheck } from 'lucide-react';
import { GoldenMagicalTypography } from './GoldenMagicalTypography';

interface HeroProps {
  onExploreClick: () => void;
  onUploadClick: () => void;
  onNearingEndChange?: (isNearingEnd: boolean) => void;
}

const TOTAL_FRAMES = 300;
// Point at which both scroll animation and text type-in reach 100% completion
const ANIMATION_END_PROGRESS = 0.82;

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onUploadClick,
  onNearingEndChange,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pinScrollProgress, setPinScrollProgress] = useState<number>(0);

  // Cached frame images for 300-frame scroll animation
  const frameImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const activeFrameRef = useRef<number>(1);
  const isNearingEndRef = useRef<boolean>(false);

  // Helper to format frame path: /hero-frames/frame_000001.jpg
  const getFramePath = useCallback((index: number) => {
    const padded = String(index).padStart(6, '0');
    return `/hero-frames/frame_${padded}.jpg`;
  }, []);

  // Draw frame to full-bleed background canvas with high-DPI scaling and object-fit cover
  const renderFrameToCanvas = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find requested frame or fall back to closest loaded frame
    let img = frameImagesRef.current[frameNum];
    if (!img || !img.complete || img.naturalWidth === 0) {
      if (loadedFramesRef.current.size > 0) {
        let closest = 1;
        let minDiff = Infinity;
        loadedFramesRef.current.forEach((loadedIdx) => {
          const diff = Math.abs(loadedIdx - frameNum);
          if (diff < minDiff) {
            minDiff = diff;
            closest = loadedIdx;
          }
        });
        img = frameImagesRef.current[closest];
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Object-fit: cover math across full background
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const scale = Math.max(rect.width / imgW, rect.height / imgH);
    const w = imgW * scale;
    const h = imgH * scale;
    const x = (rect.width - w) / 2;
    const y = (rect.height - h) / 2;

    ctx.drawImage(img, x, y, w, h);
    ctx.restore();
  }, []);

  // Progressive preloader for all 300 frames
  useEffect(() => {
    let isCancelled = false;

    const loadSingleImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (frameImagesRef.current[index]) {
          resolve(frameImagesRef.current[index]!);
          return;
        }
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          if (isCancelled) return;
          frameImagesRef.current[index] = img;
          loadedFramesRef.current.add(index);
          resolve(img);
        };
        img.onerror = reject;
      });
    };

    // Step 1: Immediately load Frame 1 and draw it
    loadSingleImage(1).then(() => {
      if (isCancelled) return;
      renderFrameToCanvas(1);
    });

    // Step 2: Preload keyframes every 5th frame for instant responsiveness
    const preloadAll = async () => {
      const keyframes: number[] = [];
      for (let i = 1; i <= TOTAL_FRAMES; i += 5) {
        keyframes.push(i);
      }
      if (!keyframes.includes(TOTAL_FRAMES)) keyframes.push(TOTAL_FRAMES);

      for (let i = 0; i < keyframes.length; i += 6) {
        if (isCancelled) return;
        const batch = keyframes.slice(i, i + 6);
        await Promise.allSettled(batch.map((idx) => loadSingleImage(idx)));
      }

      // Step 3: Load remaining frames in background
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) return;
        if (!loadedFramesRef.current.has(i)) {
          loadSingleImage(i);
        }
      }
    };

    preloadAll();

    return () => {
      isCancelled = true;
    };
  }, [getFramePath, renderFrameToCanvas]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      renderFrameToCanvas(activeFrameRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrameToCanvas]);

  // Pinned scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const el = trackRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Track starts from top: 0 since navbar is hidden during the hero animation
      const scrollDistance = -rect.top;
      const totalScrollableDistance = el.offsetHeight - windowHeight;

      let progress = 0;
      if (scrollDistance <= 0) {
        progress = 0;
      } else if (scrollDistance >= totalScrollableDistance) {
        progress = 1;
      } else {
        progress = scrollDistance / totalScrollableDistance;
      }

      const clamped = Math.min(1, Math.max(0, progress));
      setPinScrollProgress(clamped);

      // Frame animation and text type-in finish at the EXACT SAME TIME at ANIMATION_END_PROGRESS (0.82)
      const unifiedProgress = Math.min(1, clamped / ANIMATION_END_PROGRESS);
      const frameNum = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(unifiedProgress * (TOTAL_FRAMES - 1)) + 1)
      );

      if (frameNum !== activeFrameRef.current) {
        activeFrameRef.current = frameNum;
        renderFrameToCanvas(frameNum);
      }

      // Check whether animation nears its end (triggers navbar and lower elements)
      const isNearingEnd = clamped >= ANIMATION_END_PROGRESS;
      if (isNearingEnd !== isNearingEndRef.current) {
        isNearingEndRef.current = isNearingEnd;
        onNearingEndChange?.(isNearingEnd);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [onNearingEndChange, renderFrameToCanvas]);

  // Unified synchronized progress: Frame animation & Type-in text finish at the exact same moment
  const unifiedProgress = Math.min(1, pinScrollProgress / ANIMATION_END_PROGRESS);
  const textProgress = unifiedProgress;

  // Lower elements (trust pill, description, CTAs, stats) load smoothly after the animation finishes
  const isNearingEnd = pinScrollProgress >= ANIMATION_END_PROGRESS;
  const lowerElementsProgress = isNearingEnd
    ? Math.min(1, Math.max(0, (pinScrollProgress - ANIMATION_END_PROGRESS) / 0.16))
    : 0;

  return (
    <section
      ref={trackRef}
      className="relative bg-[#FAF7F2] border-b border-[#EBE3D8]/60"
      style={{ height: '320vh' }}
    >
      {/* Pinned Full-Screen Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Full-Background Hero Scroll Animation Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block"
        />

        {/* Ambient Lighting & Legibility Gradients */}
        {/* Crisp clear window on the left, soft warm apothecary cream gradient on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent from-40% via-[#FAF7F2]/20 via-65% to-[#FAF7F2]/90 to-95% pointer-events-none" />
        {/* Subtle top and bottom vignette to blend seamlessly into next sections */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2]/80 via-transparent to-[#FAF7F2]/30 pointer-events-none" />

        {/* Initial Scroll Hint: Visible only at the very beginning, disappears as soon as user scrolls */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-all duration-300 z-20"
          style={{
            opacity: Math.max(0, 1 - pinScrollProgress / 0.08),
            transform: `translateX(-50%) translateY(${pinScrollProgress * 40}px)`,
          }}
        >
          <div className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#EBE3D8] shadow-lg flex items-center gap-2.5 text-xs font-semibold text-[#2B1B17]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Scroll to experience formulation</span>
            <span className="inline-block animate-bounce text-[#8C5A46] font-bold">↓</span>
          </div>
        </div>

        {/* Foreground Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left columns left open to showcase the full-background product and skin animation */}
            <div className="hidden lg:block lg:col-span-6 xl:col-span-7" />

            {/* Right Side: Type-In Text and Lower Elements shifted gracefully to the right */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start justify-center lg:pl-6 xl:pl-10 p-6 sm:p-8 lg:p-0 rounded-3xl lg:rounded-none bg-white/70 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border border-white/60 lg:border-none shadow-xl lg:shadow-none transition-all duration-500 ease-out">
              
              {/* Trust Pill: Hidden until animation finishes, then loads with lower elements */}
              <div
                className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mb-3 sm:mb-5"
                style={{
                  opacity: lowerElementsProgress,
                  transform: `translateY(${(1 - lowerElementsProgress) * 16}px)`,
                  visibility: lowerElementsProgress > 0 ? 'visible' : 'hidden',
                }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-[#EBE3D8]/90 text-xs font-semibold text-[#2B1B17] shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8C5A46]" />
                  <span className="tracking-wide">HEAL CARE • MEDICINES, SURGICAL &amp; COSMETICS</span>
                </div>
              </div>

              {/* Editorial Title: Types in simultaneously with the background scroll animation */}
              <div className="mb-4 sm:mb-6 font-editorial text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#2B1B17] leading-[1.08] tracking-tight min-h-[90px] sm:min-h-[140px] flex items-center">
                <GoldenMagicalTypography
                  as="h1"
                  segments={[
                    { text: 'Your Health,\n', colorClass: 'text-[#2B1B17]' },
                    { text: 'Our Heritage.', isItalic: true, colorClass: 'text-[#8C5A46]' },
                  ]}
                  controlledProgress={textProgress}
                  showTrailParticles={true}
                />
              </div>

              {/* Lower Elements (Body Copy, CTAs, Stats Strip): Strictly load AFTER the animation finishes */}
              <div
                className="w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: lowerElementsProgress,
                  transform: `translateY(${(1 - lowerElementsProgress) * 20}px)`,
                  pointerEvents: lowerElementsProgress > 0.4 ? 'auto' : 'none',
                  visibility: lowerElementsProgress > 0 ? 'visible' : 'hidden',
                }}
              >
                {/* Body Copy */}
                <p className="text-[#3E3228] text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-medium mb-6 sm:mb-8">
                  Welcome to Heal Care. Your premier destination for authentic prescription medicines, hospital-grade surgical equipment, and advanced derma cosmetics. Verified by licensed pharmacists with prompt doorstep delivery.
                </p>

                {/* Dual CTAs */}
                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8 sm:mb-10">
                  <button
                    onClick={onExploreClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2B1B17] hover:bg-[#1F1310] hover:shadow-lg hover:-translate-y-0.5 text-white px-7 py-3.5 rounded-full text-sm font-bold tracking-wide shadow-md transition-all duration-300 group cursor-pointer"
                  >
                    <span>Explore Formulations</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={onUploadClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF7F2] hover:shadow-md hover:-translate-y-0.5 text-[#2B1B17] border border-[#EBE3D8] px-6 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-[#8C5A46]" />
                    <span>Upload Prescription</span>
                  </button>
                </div>

                {/* Stats Strip */}
                <div className="pt-4 sm:pt-6 border-t border-[#EBE3D8]/80 grid grid-cols-3 gap-4 sm:gap-10 w-full">
                  <div>
                    <div className="font-editorial text-2xl sm:text-4xl font-bold text-[#2B1B17] tabular-nums">50k+</div>
                    <div className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#8C5A46] mt-0.5">Happy Patients</div>
                  </div>
                  <div>
                    <div className="font-editorial text-2xl sm:text-4xl font-bold text-[#2B1B17] tabular-nums">100%</div>
                    <div className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#8C5A46] mt-0.5">Genuine Medicines</div>
                  </div>
                  <div>
                    <div className="font-editorial text-2xl sm:text-4xl font-bold text-[#2B1B17] tabular-nums">120m</div>
                    <div className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#8C5A46] mt-0.5">Doorstep Delivery</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
