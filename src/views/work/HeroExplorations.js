'use client';

import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import WideContainer from '../../components/containers/WideContainer';
import IconAddCircle from '../../components/common/icons/IconAddCircle';
import IconWriting from '../../components/common/icons/IconWriting';
import wire01 from '../../assets/work/hero-explorations/Hero wire 1.png';
import wire02 from '../../assets/work/hero-explorations/Hero wire 2.png';
import wire03 from '../../assets/work/hero-explorations/Hero wire 3.png';
import wire04 from '../../assets/work/hero-explorations/Hero wire 4.png';
import wire05 from '../../assets/work/hero-explorations/Hero wire 5.png';
import wire06 from '../../assets/work/hero-explorations/Hero wire 6.png';
import wire07 from '../../assets/work/hero-explorations/Hero wire 7.png';
import wire08 from '../../assets/work/hero-explorations/Hero wire 8.png';
import wire09 from '../../assets/work/hero-explorations/Hero wire 9.png';
import wire10 from '../../assets/work/hero-explorations/Hero wire 10.png';
import exploration01 from '../../assets/work/hero-explorations/Hero Exploration 1.png';
import exploration02 from '../../assets/work/hero-explorations/Hero Exploration 2.png';
import exploration03 from '../../assets/work/hero-explorations/Hero Exploration 3.png';
import exploration04 from '../../assets/work/hero-explorations/Hero Exploration 4.png';
import exploration05 from '../../assets/work/hero-explorations/Hero Exploration 5.png';
import exploration06 from '../../assets/work/hero-explorations/Hero Exploration 6.png';
import exploration07 from '../../assets/work/hero-explorations/Hero Exploration 7.png';
import exploration08 from '../../assets/work/hero-explorations/Hero Exploration 8.png';
import exploration09 from '../../assets/work/hero-explorations/Hero Exploration 9.png';
import exploration10 from '../../assets/work/hero-explorations/Hero exploration 10.png';

function imageSrc(mod) {
  if (!mod) return null;
  return typeof mod === 'string' ? mod : mod.src;
}

const wireUrls = [
  imageSrc(wire01),
  imageSrc(wire02),
  imageSrc(wire03),
  imageSrc(wire04),
  imageSrc(wire05),
  imageSrc(wire06),
  imageSrc(wire07),
  imageSrc(wire08),
  imageSrc(wire09),
  imageSrc(wire10),
];

const explorationUrls = [
  imageSrc(exploration01),
  imageSrc(exploration02),
  imageSrc(exploration03),
  imageSrc(exploration04),
  imageSrc(exploration05),
  imageSrc(exploration06),
  imageSrc(exploration07),
  imageSrc(exploration08),
  imageSrc(exploration09),
  imageSrc(exploration10),
];

/**
 * Motion timings for this page (fixed). For optional local tuning with DialKit,
 * wire `AppDialKit` in `app/layout.js` and reintroduce `useDialKit` here.
 */
const MOTION_EASE = {
  snappy: [0.22, 1, 0.36, 1],
  smooth: [0.4, 0, 0.2, 1],
  linear: [0, 0, 1, 1],
};

const HERO_EXPLORE_WORD_FADE_DURATION = 0.2;

const HERO_EXPLORE_MOTION = {
  wordStaggerSec: 0.09,
  wordFadeDuration: HERO_EXPLORE_WORD_FADE_DURATION,
  wordFirstFadeDuration: Math.min(
    0.14,
    Math.max(0.07, HERO_EXPLORE_WORD_FADE_DURATION * 0.42),
  ),
  wordEase: MOTION_EASE.smooth,
  thumbOverlayMs: 200,
  thumbOverlayEasing: 'ease-out',
  previewDuration: 0.4,
  previewEase: MOTION_EASE.smooth,
  backArrowNudgeClass: 'group-hover:-translate-x-0.5',
  backLinkColorMs: 200,
};

/** Pause after last intro word finishes before the expand trigger fades in. */
const INTRO_TRIGGER_AFTER_WORDS_GAP_SEC = 0.05;

function countWordsInText(text) {
  return text.split(/(\s+)/).filter((p) => p && !/^\s+$/.test(p)).length;
}

/** When the last word (index n-1) finishes its opacity tween. */
function computeIntroTriggerDelay(wordCount, motion = HERO_EXPLORE_MOTION) {
  if (wordCount <= 0) return 0;
  const { wordStaggerSec: stagger, wordFadeDuration: fadeDuration, wordFirstFadeDuration: firstFade } =
    motion;
  if (wordCount === 1) {
    return firstFade;
  }
  return (wordCount - 1) * stagger + fadeDuration;
}

/**
 * Progressive intro: `{ kind: 'expand' }` opens inline word-by-word disclosure.
 * `trigger` accepts any React node; first expand uses IconWriting (accent), nested use IconAddCircle (body text).
 */
const INTRO_SEGMENTS = [
  {
    kind: 'text',
    text: 'The hero is the most important piece of the portfolio. These are some of the explorations I went through. ',
  },
  {
    kind: 'expand',
    trigger: (
      <IconAddCircle className="inline-block h-[1.25rem] w-[1.25rem] shrink-0 translate-y-[4px] align-[-0.02em] text-text-accent group-hover:text-text-accent" />
    ),
    ariaLabel: 'Read more about this page',
    content: [  
      {
        kind: 'text',
        text: 'The direction was simple: a calm, minimalist vibe that allows the work and words to shine. ',
      },
      {
        kind: 'expand',
        trigger: (
          <IconAddCircle className="inline-block h-[1.25rem] w-[1.25rem] shrink-0 translate-y-[4px] align-[-0.02em] text-text-sm group-hover:text-text-sm" />
        ),
        ariaLabel: 'Read a bit more',
        content: [
          {
            kind: 'text',
            text: "I saw this place as a portfolio, playground, and writing space. But the hero still needed to capture the eyes and express just enough to encourage exploration.",
          },
          {
            kind: 'expand',
            trigger: (
              <IconAddCircle className="inline-block h-[1.25rem] w-[1.25rem] shrink-0 translate-y-[4px] align-[-0.02em] text-text-sm group-hover:text-text-sm" />
            ),
            ariaLabel: 'One more detail',
            content: [
              {
                kind: 'text',
                text: 'If you got to this point, maybe it succeeded :)',
              },
            ],
          },
        ],
      },
    ],
  },
];

const WordIndexContext = createContext(null);

function WordIndexProvider({ children }) {
  const indexRef = useRef(0);
  indexRef.current = 0;
  return (
    <WordIndexContext.Provider value={indexRef}>{children}</WordIndexContext.Provider>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function TextWordStagger({ text }) {
  const indexRef = useContext(WordIndexContext);
  const reduceMotion = usePrefersReducedMotion();
  if (!indexRef) {
    return text;
  }
  const { wordStaggerSec: staggerSec, wordFadeDuration: fadeDuration, wordFirstFadeDuration: firstFadeDuration, wordEase: ease } =
    HERO_EXPLORE_MOTION;

  const parts = text.split(/(\s+)/);
  return (
    <>
      {parts.map((part, j) => {
        if (!part) return null;
        if (/^\s+$/.test(part)) {
          return <Fragment key={`s-${j}`}>{part}</Fragment>;
        }
        const idx = indexRef.current;
        indexRef.current += 1;
        if (reduceMotion) {
          return (
            <span key={`w-${idx}-${j}`} className="inline">
              {part}
            </span>
          );
        }
        const isFirstWord = idx === 0;
        return (
          <motion.span
            key={`w-${idx}-${j}`}
            className="inline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: 'tween',
              delay: idx * staggerSec,
              duration: isFirstWord ? firstFadeDuration : fadeDuration,
              ease: isFirstWord ? MOTION_EASE.snappy : ease,
            }}
          >
            {part}
          </motion.span>
        );
      })}
    </>
  );
}

function IntroSegment({ segment, deferTriggerUntilWords, staggerText = true }) {
  if (segment.kind === 'text') {
    if (!staggerText) {
      return segment.text;
    }
    return <TextWordStagger text={segment.text} />;
  }
  if (segment.kind === 'expand') {
    return (
      <ExpandInline
        deferTriggerUntilWords={deferTriggerUntilWords}
        trigger={segment.trigger}
        ariaLabel={segment.ariaLabel}
        segments={segment.content}
      />
    );
  }
  return null;
}

/** Cumulative word count in `segments` before each index (for deferring expand triggers). */
function useWordsBeforeEachSegment(segments) {
  return useMemo(() => {
    const before = [];
    let acc = 0;
    for (let i = 0; i < segments.length; i++) {
      before[i] = acc;
      const seg = segments[i];
      if (seg.kind === 'text') {
        acc += countWordsInText(seg.text);
      }
    }
    return before;
  }, [segments]);
}

function ExpandInlineRevealedContent({ segments }) {
  const wordsBefore = useWordsBeforeEachSegment(segments);
  return (
    <WordIndexProvider>
      {segments.map((seg, i) => (
        <IntroSegment
          key={i}
          segment={seg}
          deferTriggerUntilWords={
            seg.kind === 'expand' ? wordsBefore[i] : undefined
          }
        />
      ))}
    </WordIndexProvider>
  );
}

const expandTriggerButtonClass =
  'group mx-0.5 inline-flex min-h-[1.35em] min-w-[1.35em] cursor-pointer items-center justify-center border-0 bg-transparent p-0 align-baseline font-inherit text-inherit transition-colors hover:text-text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-color-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary';

function ExpandInline({ trigger, ariaLabel, segments, deferTriggerUntilWords }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const shouldDeferIntroTrigger =
    typeof deferTriggerUntilWords === 'number' && deferTriggerUntilWords > 0;
  const deferIntroTrigger = shouldDeferIntroTrigger && !reduceMotion;
  const [triggerFocusable, setTriggerFocusable] = useState(!deferIntroTrigger);

  useEffect(() => {
    setTriggerFocusable(!deferIntroTrigger);
  }, [deferIntroTrigger]);

  if (open) {
    return (
      <span className="inline min-w-0 align-baseline" aria-live="polite">
        <ExpandInlineRevealedContent segments={segments} />
      </span>
    );
  }

  if (reduceMotion || !shouldDeferIntroTrigger) {
    return (
      <button
        type="button"
        aria-expanded={false}
        aria-label={ariaLabel}
        onClick={() => setOpen(true)}
        className={expandTriggerButtonClass}
      >
        <span
          aria-hidden
          className="inline-flex select-none items-center justify-center text-current [&_svg]:shrink-0"
        >
          {trigger}
        </span>
      </button>
    );
  }

  const revealDelay =
    computeIntroTriggerDelay(deferTriggerUntilWords) + INTRO_TRIGGER_AFTER_WORDS_GAP_SEC;

  return (
    <motion.button
      type="button"
      aria-expanded={false}
      aria-label={ariaLabel}
      aria-hidden={triggerFocusable ? undefined : true}
      tabIndex={triggerFocusable ? 0 : -1}
      onClick={() => setOpen(true)}
      className={expandTriggerButtonClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: 'tween',
        delay: revealDelay,
        duration: 0.22,
        ease: MOTION_EASE.snappy,
      }}
      onAnimationComplete={() => setTriggerFocusable(true)}
    >
      <span
        aria-hidden
        className="inline-flex select-none items-center justify-center text-current [&_svg]:shrink-0"
      >
        {trigger}
      </span>
    </motion.button>
  );
}

function IntroProgressiveParagraph({ segments, className = '' }) {
  const firstExpandIndex = segments.findIndex((s) => s.kind === 'expand');
  const beforeExpand =
    firstExpandIndex === -1 ? segments : segments.slice(0, firstExpandIndex);
  const expandSegment =
    firstExpandIndex === -1 ? null : segments[firstExpandIndex];
  const afterExpand =
    firstExpandIndex === -1 ? [] : segments.slice(firstExpandIndex + 1);

  return (
    <p
      className={`mb-10 max-w-xl font-sans text-base leading-relaxed text-text-sm ${className}`}
    >
      {beforeExpand.map((seg, i) => (
        <IntroSegment key={`pre-${i}`} segment={seg} staggerText={false} />
      ))}
      {expandSegment ? (
        <IntroSegment key="expand" segment={expandSegment} staggerText={false} />
      ) : null}
      {afterExpand.map((seg, i) => (
        <IntroSegment key={`post-${i}`} segment={seg} staggerText={false} />
      ))}
    </p>
  );
}

const explorations = wireUrls.map((wireUrl, i) => ({
  id: String(i + 1).padStart(2, '0'),
  thumbSrc: wireUrl,
  previewSrc: explorationUrls[i] ?? null,
  thumbKind: 'photo',
}));

function isArrowKeyNavigationBlockedTarget(target) {
  if (!target || !(target instanceof Element)) return false;
  const el = target.closest(
    'input, textarea, select, [contenteditable="true"], [role="textbox"]',
  );
  return Boolean(el);
}

function TabThumb({ kind, imageSrc }) {
  if (kind === 'photo' && imageSrc) {
    return (
      <img
        src={imageSrc}
        alt=""
        className="h-full w-full object-cover object-top"
        draggable={false}
      />
    );
  }
  if (kind === 'layout') {
    return (
      <div className="flex h-full w-full flex-col gap-1 bg-background-white p-1.5">
        <div className="h-1.5 w-full rounded-[1px] bg-text-dark/15" />
        <div className="flex flex-1 gap-1">
          <div className="h-full w-[45%] rounded-[1px] bg-text-dark/10" />
          <div className="flex-1 rounded-[1px] bg-text-dark/25" />
        </div>
      </div>
    );
  }
  return <div className="h-full w-full bg-background-white" />;
}

export default function HeroExplorations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isPointerDragging, setIsPointerDragging] = useState(false);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const thumbRefs = useRef([]);
  const skipInitialScrollIntoViewRef = useRef(true);
  const suppressNextClickRef = useRef(false);
  const dragPointerRef = useRef({
    pointerId: null,
    startX: 0,
    scrollStart: 0,
    dragging: false,
  });

  const updateOverflow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setHasOverflow(el.scrollWidth > el.clientWidth + 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => updateOverflow());
    ro.observe(el);
    updateOverflow();
    return () => ro.disconnect();
  }, [updateOverflow]);

  useEffect(() => {
    window.addEventListener('resize', updateOverflow);
    return () => window.removeEventListener('resize', updateOverflow);
  }, [updateOverflow]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    if (skipInitialScrollIntoViewRef.current) {
      skipInitialScrollIntoViewRef.current = false;
      return;
    }
    const btn = thumbRefs.current[activeIndex];
    btn?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  const onScrollStripPointerDown = useCallback((e) => {
    const el = scrollRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    if (e.target instanceof Element && e.target.closest('button')) return;
    dragPointerRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      scrollStart: el.scrollLeft,
      dragging: false,
    };
    el.setPointerCapture(e.pointerId);
  }, []);

  const applyStripDragMove = useCallback((e) => {
    const el = scrollRef.current;
    const d = dragPointerRef.current;
    if (d.pointerId !== e.pointerId || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.dragging && Math.abs(dx) > 6) {
      d.dragging = true;
      setIsPointerDragging(true);
    }
    if (d.dragging) {
      el.scrollLeft = d.scrollStart - dx;
    }
  }, []);

  const finishStripDrag = useCallback((e) => {
    const el = scrollRef.current;
    const d = dragPointerRef.current;
    if (d.pointerId !== e.pointerId) return;
    if (d.dragging) suppressNextClickRef.current = true;
    try {
      el?.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    dragPointerRef.current = { pointerId: null, startX: 0, scrollStart: 0, dragging: false };
    setIsPointerDragging(false);
  }, []);

  const onScrollStripPointerMove = applyStripDragMove;
  const onScrollStripPointerUp = finishStripDrag;

  const onThumbPointerDown = useCallback(
    (e) => {
      const el = scrollRef.current;
      if (!el || el.scrollWidth <= el.clientWidth) return;
      e.stopPropagation();
      dragPointerRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        scrollStart: el.scrollLeft,
        dragging: false,
      };
      const onMove = (ev) => {
        applyStripDragMove(ev);
      };
      const onUp = (ev) => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        finishStripDrag(ev);
      };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
    },
    [applyStripDragMove, finishStripDrag],
  );

  useEffect(() => {
    const onWindowKeyDown = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (isArrowKeyNavigationBlockedTarget(e.target)) return;
      e.preventDefault();
      if (e.key === 'ArrowRight') {
        setActiveIndex((i) => Math.min(i + 1, explorations.length - 1));
      } else {
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
    };
    window.addEventListener('keydown', onWindowKeyDown);
    return () => window.removeEventListener('keydown', onWindowKeyDown);
  }, []);

  const active = explorations[activeIndex];

  return (
    <div className="bg-background-primary min-h-screen pb-16 pt-16">
      <WideContainer>
        <Link
          href="/work"
          className="group mb-10 inline-flex cursor-pointer items-center gap-1 font-sans text-sm text-text-dark transition-colors hover:text-text-accent"
          style={{ transitionDuration: `${HERO_EXPLORE_MOTION.backLinkColorMs}ms` }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`shrink-0 text-current transition-transform ${HERO_EXPLORE_MOTION.backArrowNudgeClass}`}
            style={{ transitionDuration: `${HERO_EXPLORE_MOTION.backLinkColorMs}ms` }}
            aria-hidden
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Work
        </Link>

        <IntroProgressiveParagraph segments={INTRO_SEGMENTS} />

        <div ref={containerRef} className="relative mb-10 w-full overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-3 bg-gradient-to-r from-background-primary to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-3 bg-gradient-to-l from-background-primary to-transparent"
            aria-hidden
          />
          <div
            ref={scrollRef}
            tabIndex={0}
            role="region"
            aria-label="Hero exploration thumbnails. Arrow keys change selection."
            onPointerDown={onScrollStripPointerDown}
            onPointerMove={onScrollStripPointerMove}
            onPointerUp={onScrollStripPointerUp}
            onPointerCancel={onScrollStripPointerUp}
            className={`flex w-full gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain pl-1 pr-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-color-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary ${
              hasOverflow
                ? isPointerDragging
                  ? 'cursor-grabbing select-none'
                  : 'cursor-grab'
                : 'cursor-default'
            }`}
          >
            {explorations.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    thumbRefs.current[index] = node;
                  }}
                  type="button"
                  aria-pressed={isActive}
                  onPointerDown={onThumbPointerDown}
                  onClick={() => {
                    if (suppressNextClickRef.current) {
                      suppressNextClickRef.current = false;
                      return;
                    }
                    setActiveIndex(index);
                  }}
                  className={`group relative h-[4.5rem] w-[6.75rem] shrink-0 cursor-pointer overflow-hidden rounded-md bg-background-white md:h-[5rem] md:w-[7.5rem] ${
                    isActive
                      ? 'border-2 border-color-accent shadow-sm'
                      : 'border-2 border-transparent hover:border-text-dark/20'
                  }`}
                >
                  <div className="absolute inset-0 isolate">
                    <div className="absolute inset-0 z-0">
                      <TabThumb kind={item.thumbKind} imageSrc={item.thumbSrc} />
                    </div>
                    <span
                      className={`pointer-events-none absolute inset-0 z-10 bg-color-accent mix-blend-soft-light ${
                        isActive ? 'opacity-80' : 'opacity-0 group-hover:opacity-50'
                      }`}
                      style={{
                        transitionProperty: 'opacity',
                        transitionDuration: `${HERO_EXPLORE_MOTION.thumbOverlayMs}ms`,
                        transitionTimingFunction: HERO_EXPLORE_MOTION.thumbOverlayEasing,
                      }}
                      aria-hidden
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <motion.figure
          className="relative m-0 block mx-auto w-full overflow-hidden rounded bg-background-white p-6"
          style={{ aspectRatio: '1440 / 1024' }}
        >
          <AnimatePresence mode="wait">
            {active.previewSrc ? (
              <motion.img
                key={active.id}
                src={active.previewSrc}
                alt={`Hero exploration ${active.id}`}
                className="h-full w-full object-cover object-top"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: HERO_EXPLORE_MOTION.previewDuration,
                  ease: HERO_EXPLORE_MOTION.previewEase,
                }}
              />
            ) : (
              <motion.div
                key={active.id}
                className="flex h-full w-full items-center justify-center bg-surface"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: HERO_EXPLORE_MOTION.previewDuration,
                  ease: HERO_EXPLORE_MOTION.previewEase,
                }}
              >
                <p className="font-sans text-base text-text-secondary">
                  Exploration preview · {active.id}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.figure>
      </WideContainer>
    </div>
  );
}


