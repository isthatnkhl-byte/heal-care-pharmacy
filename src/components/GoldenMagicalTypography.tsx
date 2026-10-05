import React, { useEffect, useRef, useState, useMemo } from 'react';

export interface TypographySegment {
  text: string;
  isItalic?: boolean;
  colorClass?: string;
}

interface GoldenMagicalTypographyProps {
  segments: TypographySegment[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  showTrailParticles?: boolean;
  onProgressChange?: (progress: number) => void;
  // External controlled progress (e.g. from a pinned scroll section)
  controlledProgress?: number;
  startViewportRatio?: number;
  endViewportRatio?: number;
}

interface SparkleParticle {
  id: number;
  xOffset: number;
  yOffset: number;
  size: number;
  color: string;
}

interface CharToken {
  char: string;
  globalIndex: number;
  isWordEnd: boolean;
}

interface WordGroup {
  id: string;
  isNewline?: boolean;
  isItalic?: boolean;
  colorClass?: string;
  chars: CharToken[];
}

export const GoldenMagicalTypography: React.FC<GoldenMagicalTypographyProps> = ({
  segments,
  className = '',
  as: Component = 'h1',
  showTrailParticles = true,
  onProgressChange,
  controlledProgress,
  startViewportRatio = 0.90,
  endViewportRatio = 0.40,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalProgress, setInternalProgress] = useState<number>(0);
  const [particles, setParticles] = useState<SparkleParticle[]>([]);
  const particleIdRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);

  // Group characters into non-breaking words to preserve kerning and prevent awkward line breaks,
  // while allowing smooth single-letter type-in within each word!
  const { wordGroups, totalChars } = useMemo(() => {
    const groups: WordGroup[] = [];
    let charCounter = 0;

    segments.forEach((seg, sIdx) => {
      const lines = seg.text.split('\n');
      lines.forEach((line, lineIdx) => {
        if (lineIdx > 0) {
          groups.push({
            id: `nl-${sIdx}-${lineIdx}`,
            isNewline: true,
            isItalic: seg.isItalic,
            colorClass: seg.colorClass,
            chars: [],
          });
        }

        const rawWords = line.split(/(\s+)/).filter(Boolean);
        rawWords.forEach((token, wIdx) => {
          if (/^\s+$/.test(token)) return;

          const charsInWord: CharToken[] = [];
          for (let c = 0; c < token.length; c++) {
            charsInWord.push({
              char: token[c],
              globalIndex: charCounter++,
              isWordEnd: c === token.length - 1,
            });
          }

          groups.push({
            id: `wg-${sIdx}-${lineIdx}-${wIdx}`,
            isNewline: false,
            isItalic: seg.isItalic,
            colorClass: seg.colorClass,
            chars: charsInWord,
          });
        });
      });
    });

    return { wordGroups: groups, totalChars: charCounter };
  }, [segments]);

  // Frame-locked scroll calculation when not controlled externally
  useEffect(() => {
    if (controlledProgress !== undefined) return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startTrigger = windowHeight * startViewportRatio;
      const endTrigger = windowHeight * endViewportRatio;

      let progress = 0;
      if (rect.top > startTrigger) {
        progress = 0;
      } else if (rect.top < endTrigger) {
        progress = 1;
      } else {
        progress = (startTrigger - rect.top) / (startTrigger - endTrigger);
      }

      const clampedProgress = Math.min(1, Math.max(0, progress));
      setInternalProgress(clampedProgress);
      onProgressChange?.(clampedProgress);

      // Spawn subtle golden sparkles tightly around the active letter while actively scrolling
      if (
        showTrailParticles &&
        clampedProgress > 0.05 &&
        clampedProgress < 0.98 &&
        Math.abs(window.scrollY - lastScrollYRef.current) > 2
      ) {
        const newSparkle: SparkleParticle = {
          id: particleIdRef.current++,
          xOffset: (Math.random() - 0.5) * 10,
          yOffset: (Math.random() - 0.5) * 6,
          size: Math.random() * 2.5 + 2,
          color: Math.random() > 0.35 ? '#FBBF24' : '#F59E0B',
        };

        setParticles((prev) => [...prev.slice(-3), newSparkle]);
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newSparkle.id));
        }, 650);
      }

      lastScrollYRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [controlledProgress, endViewportRatio, onProgressChange, showTrailParticles, startViewportRatio]);

  // Spawn particles when controlled externally and actively changing
  useEffect(() => {
    if (controlledProgress === undefined || !showTrailParticles) return;

    if (controlledProgress > 0.03 && controlledProgress < 0.98) {
      const newSparkle: SparkleParticle = {
        id: particleIdRef.current++,
        xOffset: (Math.random() - 0.5) * 10,
        yOffset: (Math.random() - 0.5) * 6,
        size: Math.random() * 2.5 + 2,
        color: Math.random() > 0.35 ? '#FBBF24' : '#F59E0B',
      };

      setParticles((prev) => [...prev.slice(-3), newSparkle]);
      const t = setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newSparkle.id));
      }, 650);

      return () => clearTimeout(t);
    }
  }, [controlledProgress, showTrailParticles]);

  const activeProgress = controlledProgress !== undefined ? controlledProgress : internalProgress;

  // When scroll reaches >= 0.98, all characters adopt the uniform brand color with NO golden trail remaining!
  const isComplete = activeProgress >= 0.98;

  // Soft fade-in envelope (characters emerge whisper-faded over 3.5 character units)
  const FADE_WINDOW = 3.5;

  // Typing frontier mapped so all characters (including last) complete their fade-in smoothly
  const currentCharFloat = activeProgress * (totalChars + FADE_WINDOW);
  const activeCharIndex = Math.min(totalChars - 1, Math.max(0, Math.floor(currentCharFloat)));

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <Component className="relative z-10 leading-[1.12] tracking-tight">
        {wordGroups.map((group) => {
          if (group.isNewline) {
            return <br key={group.id} />;
          }

          return (
            <span
              key={group.id}
              className={`inline-block whitespace-nowrap mr-[0.28em] last:mr-0 align-baseline ${
                group.isItalic ? 'italic font-editorial font-normal' : ''
              } ${group.colorClass || ''}`}
            >
              {group.chars.map((item) => {
                const distFromFrontier = currentCharFloat - item.globalIndex;

                // Smooth fade-in: characters spawn in faded and softly blurred rather than popping strongly
                let charOpacity = 0;
                let charTranslateY = 5;
                let charBlur = 3;

                if (isComplete || distFromFrontier >= FADE_WINDOW) {
                  charOpacity = 1;
                  charTranslateY = 0;
                  charBlur = 0;
                } else if (distFromFrontier > 0) {
                  const spawnRatio = Math.min(1, Math.max(0, distFromFrontier / FADE_WINDOW));
                  // Gentle power curve so newly spawned letters start very faint and airy
                  charOpacity = Math.pow(spawnRatio, 1.3);
                  charTranslateY = (1 - Math.pow(spawnRatio, 0.7)) * 5;
                  charBlur = (1 - spawnRatio) * 3;
                }

                // Is this single letter the current active typing frontier?
                const isActiveLetter =
                  !isComplete && item.globalIndex === activeCharIndex && charOpacity > 0.05;

                // Leading trail (active letter + previous 1-2 letters while scrolling)
                const isInTrail =
                  !isComplete &&
                  item.globalIndex >= activeCharIndex - 2 &&
                  item.globalIndex <= activeCharIndex &&
                  distFromFrontier > 0;

                // Soft golden aura proportional to the character's fade opacity
                const shadowAlpha = isInTrail ? Math.min(0.45, 0.45 * charOpacity) : 0;

                return (
                  <span
                    key={item.globalIndex}
                    className={`inline-block transition-transform duration-75 relative ${
                      isInTrail
                        ? 'text-amber-500/90 font-medium'
                        : isComplete
                        ? '' // Exact uniform brand color
                        : ''
                    }`}
                    style={{
                      opacity: charOpacity,
                      transform: `translateY(${charTranslateY}px)`,
                      filter: charBlur > 0 ? `blur(${charBlur.toFixed(2)}px)` : 'none',
                      textShadow: isInTrail
                        ? `0 0 10px rgba(245, 158, 11, ${shadowAlpha}), 0 0 20px rgba(217, 119, 6, ${shadowAlpha * 0.5})`
                        : undefined,
                    }}
                  >
                    {item.char}

                    {/* Subtle golden embers anchored directly at the letter's center (NO emoji cursor) */}
                    {isActiveLetter && showTrailParticles && particles.length > 0 && (
                      <span className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 overflow-visible pointer-events-none select-none">
                        {particles.map((p) => (
                          <span
                            key={p.id}
                            className="gold-particle absolute inline-block rounded-full"
                            style={
                              {
                                '--px': `${p.xOffset}px`,
                                '--py': `${p.yOffset}px`,
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                backgroundColor: p.color,
                                boxShadow: `0 0 6px ${p.color}, 0 0 10px #F59E0B`,
                              } as React.CSSProperties
                            }
                          />
                        ))}
                      </span>
                    )}
                  </span>
                );
              })}
            </span>
          );
        })}
      </Component>
    </div>
  );
};
