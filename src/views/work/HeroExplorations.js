'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
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

const INTRO =
  'The hero is the most important piece of the portfolio. End of 2025, I set out to change mine. These are some of the explorations I went through. ✍🏼';

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
    // Pointer capture on the strip steals pointerup from thumb buttons, so click never fires.
    // Only start strip drag from padding/gap (target is the scroller itself, not a card).
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
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 text-current transition-transform group-hover:-translate-x-0.5"
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

        <p className="mb-10 max-w-xl font-sans text-base leading-relaxed text-text-sm">
          {INTRO}
        </p>

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
                        className={`pointer-events-none absolute inset-0 z-10 bg-color-accent mix-blend-soft-light transition-opacity duration-200 ease-out ${
                          isActive ? 'opacity-80' : 'opacity-0 group-hover:opacity-50'
                        }`}
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
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <motion.div
                key={active.id}
                className="flex h-full w-full items-center justify-center bg-surface"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
