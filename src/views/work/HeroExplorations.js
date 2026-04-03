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
import { useDialKit } from 'dialkit';
import WideContainer from '../../components/containers/WideContainer';
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

/* ─────────────────────────────────────────────────────────
 * DIALKIT → MOTION (Hero explorations)
 *
 * Open the “Hero explorations” panel (top-right) to tune timings.
 * Dropdowns map to the derived values in deriveHeroExploreMotion().
 * ───────────────────────────────────────────────────────── */

const HERO_EXPLORE_DIAL_CONFIG = {
  introReveal: {
    staggerPreset: {
      type: 'select',
      default: 'comfortable',
      options: [
        { value: 'tight', label: 'Gap between words · tight (fast)' },
        { value: 'comfortable', label: 'Gap between words · comfortable' },
        { value: 'slow', label: 'Gap between words · slow' },
        { value: 'dramatic', label: 'Gap between words · dramatic' },
      ],
    },
    fadeDuration: {
      type: 'select',
      default: '0.2s',
      options: [
        { value: '0.12s', label: 'Single-word fade · 0.12s' },
        { value: '0.2s', label: 'Single-word fade · 0.2s' },
        { value: '0.35s', label: 'Single-word fade · 0.35s' },
        { value: '0.5s', label: 'Single-word fade · 0.5s' },
      ],
    },
    easing: {
      type: 'select',
      default: 'snappy',
      options: [
        { value: 'snappy', label: 'Word opacity curve · snappy' },
        { value: 'smooth', label: 'Word opacity curve · smooth' },
        { value: 'linear', label: 'Word opacity curve · linear' },
      ],
    },
  },
  thumbnailStrip: {
    accentOverlayMs: {
      type: 'select',
      default: '200ms',
      options: [
        { value: '100ms', label: 'Thumb accent wash · 100ms' },
        { value: '200ms', label: 'Thumb accent wash · 200ms' },
        { value: '300ms', label: 'Thumb accent wash · 300ms' },
        { value: '450ms', label: 'Thumb accent wash · 450ms' },
      ],
    },
    accentOverlayEasing: {
      type: 'select',
      default: 'ease-out',
      options: [
        { value: 'ease-out', label: 'Thumb wash easing · ease-out' },
        { value: 'ease-in-out', label: 'Thumb wash easing · ease-in-out' },
        { value: 'linear', label: 'Thumb wash easing · linear' },
      ],
    },
  },
  previewSwap: {
    crossfadeDuration: {
      type: 'select',
      default: '0.25s',
      options: [
        { value: '0.15s', label: 'Main preview crossfade · 0.15s' },
        { value: '0.25s', label: 'Main preview crossfade · 0.25s' },
        { value: '0.4s', label: 'Main preview crossfade · 0.4s' },
        { value: '0.6s', label: 'Main preview crossfade · 0.6s' },
      ],
    },
    crossfadeEasing: {
      type: 'select',
      default: 'snappy',
      options: [
        { value: 'snappy', label: 'Preview opacity curve · snappy' },
        { value: 'smooth', label: 'Preview opacity curve · smooth' },
        { value: 'linear', label: 'Preview opacity curve · linear' },
      ],
    },
  },
  backLink: {
    arrowNudgePreset: {
      type: 'select',
      default: 'subtle',
      options: [
        { value: 'none', label: 'Back arrow hover nudge · none' },
        { value: 'subtle', label: 'Back arrow hover nudge · subtle' },
        { value: 'medium', label: 'Back arrow hover nudge · medium' },
        { value: 'strong', label: 'Back arrow hover nudge · strong' },
      ],
    },
    linkColorMs: {
      type: 'select',
      default: '200ms',
      options: [
        { value: '120ms', label: 'Back link color + arrow · 120ms' },
        { value: '200ms', label: 'Back link color + arrow · 200ms' },
        { value: '320ms', label: 'Back link color + arrow · 320ms' },
        { value: '500ms', label: 'Back link color + arrow · 500ms' },
      ],
    },
  },
};

const MOTION_EASE = {
  snappy: [0.22, 1, 0.36, 1],
  smooth: [0.4, 0, 0.2, 1],
  linear: [0, 0, 1, 1],
};

function deriveHeroExploreMotion(d) {
  const staggerSec =
    d.introReveal.staggerPreset === 'tight'
      ? 0.035
      : d.introReveal.staggerPreset === 'slow'
        ? 0.09
        : d.introReveal.staggerPreset === 'dramatic'
          ? 0.14
          : 0.055;

  const fadeMap = { '0.12s': 0.12, '0.2s': 0.2, '0.35s': 0.35, '0.5s': 0.5 };
  const wordFadeDuration = fadeMap[d.introReveal.fadeDuration] ?? 0.2;
  const wordEase = MOTION_EASE[d.introReveal.easing] ?? MOTION_EASE.snappy;

  const thumbMsMap = { '100ms': 100, '200ms': 200, '300ms': 300, '450ms': 450 };
  const thumbOverlayMs = thumbMsMap[d.thumbnailStrip.accentOverlayMs] ?? 200;
  const cssEaseMap = {
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
    linear: 'linear',
  };
  const thumbOverlayEasing =
    cssEaseMap[d.thumbnailStrip.accentOverlayEasing] ?? 'ease-out';

  const previewDurMap = { '0.15s': 0.15, '0.25s': 0.25, '0.4s': 0.4, '0.6s': 0.6 };
  const previewDuration = previewDurMap[d.previewSwap.crossfadeDuration] ?? 0.25;
  const previewEase =
    MOTION_EASE[d.previewSwap.crossfadeEasing] ?? MOTION_EASE.snappy;

  const nudgeMap = {
    none: '',
    subtle: 'group-hover:-translate-x-0.5',
    medium: 'group-hover:-translate-x-1',
    strong: 'group-hover:-translate-x-1.5',
  };
  const backArrowNudgeClass = nudgeMap[d.backLink.arrowNudgePreset] ?? nudgeMap.subtle;

  const linkMsMap = { '120ms': 120, '200ms': 200, '320ms': 320, '500ms': 500 };
  const backLinkColorMs = linkMsMap[d.backLink.linkColorMs] ?? 200;

  return {
    wordStaggerSec: staggerSec,
    wordFadeDuration,
    wordEase,
    thumbOverlayMs,
    thumbOverlayEasing,
    previewDuration,
    previewEase,
    backArrowNudgeClass,
    backLinkColorMs,
  };
}

const HeroExploreMotionDialContext = createContext(null);

/**
 * Progressive intro: `{ kind: 'expand' }` opens inline word-by-word disclosure.
 */
const INTRO_SEGMENTS = [
  {
    kind: 'text',
    text: 'The hero is the most important piece of the portfolio. End of 2025, I set out to change mine. These are some of the explorations I went through. ',
  },
  {
    kind: 'expand',
    trigger: '✍🏼',
    ariaLabel: 'Read more about this page',
    content: [
      {
        kind: 'text',
        text: 'The strip above runs from early wires toward later explorations—use clicks or arrow keys to move through them. ',
      },
      {
        kind: 'expand',
        trigger: '·',
        ariaLabel: 'Read a bit more',
        content: [
          {
            kind: 'text',
            text: "I'm showing process, not only finals, because the hero is where layout, type, and motion decisions stack up. ",
          },
          {
            kind: 'expand',
            trigger: '·',
            ariaLabel: 'One more detail',
            content: [
              {
                kind: 'text',
                text: 'Replace these sentences with your own; add or remove `expand` blocks (up to a handful) as you like.',
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
  const motionDial = useContext(HeroExploreMotionDialContext);
  if (!indexRef) {
    return text;
  }
  const staggerSec = motionDial?.wordStaggerSec ?? 0.055;
  const fadeDuration = motionDial?.wordFadeDuration ?? 0.2;
  const ease = motionDial?.wordEase ?? MOTION_EASE.snappy;

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
        return (
          <motion.span
            key={`w-${idx}-${j}`}
            className="inline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: idx * staggerSec,
              duration: fadeDuration,
              ease,
            }}
          >
            {part}
          </motion.span>
        );
      })}
    </>
  );
}

function IntroSegment({ segment }) {
  if (segment.kind === 'text') {
    return <TextWordStagger text={segment.text} />;
  }
  if (segment.kind === 'expand') {
    return (
      <ExpandInline
        trigger={segment.trigger}
        ariaLabel={segment.ariaLabel}
        segments={segment.content}
      />
    );
  }
  return null;
}

function ExpandInlineRevealedContent({ segments }) {
  return (
    <WordIndexProvider>
      {segments.map((seg, i) => (
        <IntroSegment key={i} segment={seg} />
      ))}
    </WordIndexProvider>
  );
}

function ExpandInline({ trigger, ariaLabel, segments }) {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <span className="inline min-w-0 align-baseline" aria-live="polite">
        <ExpandInlineRevealedContent segments={segments} />
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-expanded={false}
      aria-label={ariaLabel}
      onClick={() => setOpen(true)}
      className="mx-0.5 inline-flex min-h-[1.35em] min-w-[1.35em] cursor-pointer items-center justify-center border-0 border-b border-dotted border-text-dark/35 bg-transparent p-0 align-baseline font-inherit text-inherit transition-colors hover:border-text-dark/55 hover:text-text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-color-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
    >
      <span aria-hidden className="select-none">
        {trigger}
      </span>
    </button>
  );
}

function IntroProgressiveParagraph({ segments, className = '' }) {
  return (
    <p
      className={`mb-10 max-w-xl font-sans text-base leading-relaxed text-text-sm ${className}`}
    >
      {segments.map((seg, i) => (
        <IntroSegment key={i} segment={seg} />
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
  const dial = useDialKit('Hero explorations', HERO_EXPLORE_DIAL_CONFIG);

  const motionDial = useMemo(
    () => deriveHeroExploreMotion(dial),
    [
      dial.introReveal.staggerPreset,
      dial.introReveal.fadeDuration,
      dial.introReveal.easing,
      dial.thumbnailStrip.accentOverlayMs,
      dial.thumbnailStrip.accentOverlayEasing,
      dial.previewSwap.crossfadeDuration,
      dial.previewSwap.crossfadeEasing,
      dial.backLink.arrowNudgePreset,
      dial.backLink.linkColorMs,
    ],
  );

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
    <HeroExploreMotionDialContext.Provider value={motionDial}>
      <div className="bg-background-primary min-h-screen pb-16 pt-16">
        <WideContainer>
          <Link
            href="/work"
            className="group mb-10 inline-flex cursor-pointer items-center gap-1 font-sans text-sm text-text-dark transition-colors hover:text-text-accent"
            style={{ transitionDuration: `${motionDial.backLinkColorMs}ms` }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`shrink-0 text-current transition-transform ${motionDial.backArrowNudgeClass}`}
              style={{ transitionDuration: `${motionDial.backLinkColorMs}ms` }}
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
                          transitionDuration: `${motionDial.thumbOverlayMs}ms`,
                          transitionTimingFunction: motionDial.thumbOverlayEasing,
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
                    duration: motionDial.previewDuration,
                    ease: motionDial.previewEase,
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
                    duration: motionDial.previewDuration,
                    ease: motionDial.previewEase,
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
    </HeroExploreMotionDialContext.Provider>
  );
}
