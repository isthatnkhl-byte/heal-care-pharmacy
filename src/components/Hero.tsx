import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Upload, ShieldCheck } from 'lucide-react';
import { GoldenMagicalTypography } from './GoldenMagicalTypography';

interface HeroProps {
  onExploreClick: () => void;
  onUploadClick: () => void;
  onNearingEndChange?: (isNearingEnd: boolean) => void;
}

const TOTAL_FRAMES = 300;
// Exact point at which both the background scroll animation and text appearing finish at the exact same time
const ANIMATION_END_PROGRESS = 0.85;

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onUploadClick,
  onNearingEndChange,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pinScrollProgress, setPinScrollProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Cached frame images for 300-frame scroll animation
  const frameImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const activeFrameRef = useRef<number>(1);
  const isCompletedRef = useRef<boolean>(false);

  // Responsive device check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

    // Clamp DPR to 1.75 on mobile/Android to preserve battery & high FPS on Android GPUs
    const maxDpr = window.innerWidth < 1024 ? 1.75 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Object-fit: cover math across full background with optical centering
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

  // Progressive preloader for frames: Frame 1 immediately, then keyframes, then remaining
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

    // Step 2: Preload keyframes for instant responsiveness
    const step = window.innerWidth < 1024 ? 6 : 5;
    const preloadAll = async () => {
      const keyframes: number[] = [];
      for (let i = 1; i <= TOTAL_FRAMES; i += step) {
        keyframes.push(i);
      }
      if (!keyframes.includes(TOTAL_FRAMES)) keyframes.push(TOTAL_FRAMES);

      for (let i = 0; i < keyframes.length; i += 6) {
        if (isCancelled) return;
        const batch = keyframes.slice(i, i + 6);
        await Promise.allSettled(batch.map((idx) => loadSingleImage(idx)));
      }

      // Step 3: Load remaining frames in background idle time
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

      // Unified synchronization: Frame animation & text appearance end at the EXACT SAME TIME
      const unifiedProgress = Math.min(1, clamped / ANIMATION_END_PROGRESS);
      const frameNum = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(unifiedProgress * (TOTAL_FRAMES - 1)) + 1)
      );

      if (frameNum !== activeFrameRef.current) {
        activeFrameRef.current = frameNum;
        renderFrameToCanvas(frameNum);
      }

      // The navbar MUST be invisible until the scroll completes!
      const isCompleted = clamped >= ANIMATION_END_PROGRESS;
      if (isCompleted !== isCompletedRef.current) {
        isCompletedRef.current = isCompleted;
        onNearingEndChange?.(isCompleted);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [onNearingEndChange, renderFrameToCanvas]);

  // Both background frame animation and text appearing reach 100% completion at the exact same moment
  const unifiedProgress = Math.min(1, pinScrollProgress / ANIMATION_END_PROGRESS);
  const textProgress = unifiedProgress;

  // Text overlay elements (Trust pill, body, CTAs, stats) spawn in smoothly on scroll and finish at the exact same moment
  const spawnProgress = Math.min(1, Math.max(0, (pinScrollProgress - 0.15) / (ANIMATION_END_PROGRESS - 0.15)));
  const isOverlayVisible = pinScrollProgress > 0.02;

  return (
    <section
      ref={trackRef}
      className="relative bg-[#FAF7F2] border-b border-[#EBE3D8]/60"
      style={{ height: isMobile ? '240vh' : '290vh' }}
    >
      {/* Pinned Sticky Viewport with dvh for Android URL bar resilience */}
      <div className="sticky top-0 h-[100dvh] min-h-[100dvh] w-full flex items-center justify-center overflow-hidden touch-pan-y">
        
        {/* Full-Background Hero Scroll Animation Canvas - completely visible on mobile and desktop */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block pointer-events-none"
        />

        {/* Ambient Subtle Gradients that preserve full visibility of the formulation video while aiding text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent from-30% via-[#FAF7F2]/20 via-60% to-[#FAF7F2]/80 to-95% hidden lg:block pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2]/80 via-transparent to-[#FAF7F2]/25 pointer-events-none" />

        {/* Initial Scroll Prompt: Visible at scroll = 0 on both mobile and desktop, disappears as user scrolls */}
        <div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-all duration-300 z-20"
          style={{
            opacity: Math.max(0, 1 - pinScrollProgress / 0.09),
            transform: `translateX(-50%) translateY(${pinScrollProgress * 40}px)`,
          }}
        >
          <div className="px-4 py-2 rounded-full bg-white/92 backdrop-blur-md border border-[#EBE3D8] shadow-lg flex items-center gap-2.5 text-xs font-semibold text-[#2B1B17]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Scroll to explore formulation</span>
            <span className="inline-block animate-bounce text-[#8C5A46] font-bold">↓</span>
          </div>
        </div>

        {/* Floating Text Animation Overlay - No opaque card box; spawns in on scroll directly over the video */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 sm:py-6 lg:py-8 pt-16 sm:pt-20 lg:pt-8 flex items-center justify-center lg:justify-end">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full">
            
            {/* Left columns left open to showcase the full-bleed background animation */}
            <div className="hidden lg:block lg:col-span-6 xl:col-span-7" />

            {/* Right Side / Mobile Center: Transparent Floating Overlay (NO opaque card!) */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left bg-transparent border-none shadow-none p-0 w-full transition-all duration-300">
              
              {/* Trust Badge: Spawns in on scroll */}
              <div
                className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mb-3 sm:mb-4"
                style={{
                  opacity: spawnProgress,
                  transform: `translateY(${(1 - spawnProgress) * 16}px)`,
                  visibility: isOverlayVisible ? 'visible' : 'hidden',
                }}
              >
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#EBE3D8] text-[10px] sm:text-xs font-bold text-[#2B1B17] shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8C5A46] shrink-0" />
                  <span className="tracking-wide">HEAL CARE • MEDICINES, SURGICAL &amp; COSMETICS</span>
                </div>
              </div>

              {/* Editorial Title: Types in simultaneously with the scroll animation with golden sparkles */}
              <div
                className="mb-3 sm:mb-5 font-editorial text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#2B1B17] leading-[1.12] sm:leading-[1.1] tracking-tight min-h-[72px] sm:min-h-[110px] flex items-center justify-center lg:justify-start transition-all duration-300"
                style={{
                  opacity: Math.min(1, textProgress * 2.5 + (pinScrollProgress > 0.02 ? 0.2 : 0)),
                  transform: `scale(${0.96 + Math.min(0.04, textProgress * 0.04)})`,
                }}
              >
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

              {/* Lower Overlay Elements: Body text, Action buttons, Stats - Spawns in smoothly on scroll */}
              <div
                className="w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col items-center lg:items-start"
                style={{
                  opacity: spawnProgress,
                  transform: `translateY(${(1 - spawnProgress) * 20}px)`,
                  pointerEvents: spawnProgress > 0.4 ? 'auto' : 'none',
                  visibility: isOverlayVisible ? 'visible' : 'hidden',
                }}
              >
                {/* Body Copy with soft readability drop-shadow */}
                <p className="text-[#2B1B17] text-xs sm:text-sm lg:text-base leading-relaxed max-w-md font-medium mb-4 sm:mb-6 drop-shadow-[0_1px_4px_rgba(250,247,242,0.9)]">
                  Welcome to Heal Care. Your premier online destination for authentic prescription medicines, hospital surgical equipment, and therapeutic derma cosmetics. Verified by licensed pharmacists with express 2-hour doorstep delivery.
                </p>

                {/* Dual CTAs: Frosted glass buttons overlaying the background formulation animation */}
                <div className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 w-full max-w-sm lg:max-w-none mb-5 sm:mb-7">
                  <button
                    type="button"
                    onClick={onExploreClick}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#2B1B17]/95 hover:bg-[#1F1310] active:scale-98 text-white px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-lg backdrop-blur-md transition-all duration-200 group cursor-pointer"
                  >
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                  <button
                    type="button"
                    onClick={onUploadClick}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white active:scale-98 text-[#2B1B17] border border-[#EBE3D8] px-4.5 sm:px-5.5 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 shadow-md backdrop-blur-md cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#8C5A46]" />
                    <span>Upload Rx</span>
                  </button>
                </div>

                {/* Trust Stats Strip: Floating frosted translucent pill strip */}
                <div className="w-full max-w-md lg:max-w-none p-3 sm:p-4 rounded-2xl bg-white/75 backdrop-blur-md border border-white/80 shadow-md grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div>
                    <div className="font-editorial text-lg sm:text-2xl lg:text-3xl font-bold text-[#2B1B17] tabular-nums">50k+</div>
                    <div className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-[#8C5A46] mt-0.5">Happy Patients</div>
                  </div>
                  <div>
                    <div className="font-editorial text-lg sm:text-2xl lg:text-3xl font-bold text-[#2B1B17] tabular-nums">100%</div>
                    <div className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-[#8C5A46] mt-0.5">Genuine Meds</div>
                  </div>
                  <div>
                    <div className="font-editorial text-lg sm:text-2xl lg:text-3xl font-bold text-[#2B1B17] tabular-nums">2-Hr</div>
                    <div className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-[#8C5A46] mt-0.5">Doorstep Delivery</div>
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
