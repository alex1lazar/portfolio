'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { staticAssetUrl } from '../lib/staticAssetUrl';
import PrimaryButton from './common/PrimaryButton';

const STRIP_CLASSES =
  'flex w-full gap-[12px] overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden';

export default function WorkProjectRow({ title, subtitle, href, images, imageAlts = [] }) {
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isPointerDragging, setIsPointerDragging] = useState(false);
  const scrollRef = useRef(null);
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
  }, [images, updateOverflow]);

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

  const onPointerDown = useCallback((e) => {
    const el = scrollRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    dragPointerRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      scrollStart: el.scrollLeft,
      dragging: false,
    };
    el.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
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

  const onPointerUp = useCallback((e) => {
    const el = scrollRef.current;
    const d = dragPointerRef.current;
    if (d.pointerId !== e.pointerId) return;
    try {
      el?.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    dragPointerRef.current = { pointerId: null, startX: 0, scrollStart: 0, dragging: false };
    setIsPointerDragging(false);
  }, []);

  return (
    <div className="w-full mb-16 md:mb-24">
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
        <h2 className="mb-0 min-w-0 text-left font-serif">
          <span className="text-text-dark">{title}</span>
          <span className="mx-2 font-normal text-text-muted">/</span>
          <span className="font-normal text-text-dark text-text-muted">{subtitle}</span>
        </h2>
        <PrimaryButton to={href} className="hidden shrink-0 pb-0.5 md:inline-block">
          View work
        </PrimaryButton>
      </div>

      <div
        ref={scrollRef}
        role="region"
        aria-label={`${title} project images`}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={`${STRIP_CLASSES} focus:outline-none focus-visible:ring-2 focus-visible:ring-color-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary ${
          hasOverflow
            ? isPointerDragging
              ? 'cursor-grabbing select-none'
              : 'cursor-grab'
            : 'cursor-default'
        }`}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="w-[min(640px,78%)] shrink-0 overflow-hidden rounded-lg bg-background-white"
            style={{ aspectRatio: '915 / 518' }}
          >
            <img
              src={staticAssetUrl(src)}
              alt={imageAlts[index] ?? `${title} preview ${index + 1}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <PrimaryButton to={href} className="mt-4 md:hidden">
        View work
      </PrimaryButton>
    </div>
  );
}
