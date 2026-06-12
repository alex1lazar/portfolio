'use client';

import React from 'react';
import { motion } from 'motion/react';

export const READING_VIEWS = [
  { id: 'scatter', label: 'Scatter' },
  { id: 'grid', label: 'Grid' },
  { id: 'masonry', label: 'Masonry' },
  { id: 'shelf', label: 'Shelf' },
];

function ViewIcon({ id, className = '' }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: '0 0 18 18',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className,
    'aria-hidden': true,
  };

  switch (id) {
    case 'scatter':
      return (
        <svg {...props}>
          <rect x="1.5" y="2" width="6" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.25" transform="rotate(-6 4.5 6.5)" />
          <rect x="6" y="4" width="6" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.25" transform="rotate(4 9 8.5)" />
          <rect x="10.5" y="1.5" width="6" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.25" transform="rotate(-3 13.5 6)" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...props}>
          <rect x="2" y="2" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
          <rect x="11" y="2" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
          <rect x="2" y="11" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
          <rect x="11" y="11" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      );
    case 'masonry':
      return (
        <svg {...props}>
          <rect x="2" y="2" width="4" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
          <rect x="2" y="11" width="4" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
          <rect x="7.5" y="2" width="4" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
          <rect x="7.5" y="9" width="4" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
          <rect x="13" y="2" width="3" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      );
    case 'shelf':
      return (
        <svg {...props}>
          <rect x="2" y="3" width="3" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
          <rect x="6" y="3" width="3" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
          <rect x="10" y="3" width="3" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
          <rect x="14" y="3" width="2" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
          <line x1="1.5" y1="9.5" x2="16.5" y2="9.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          <line x1="1.5" y1="14.5" x2="16.5" y2="14.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function ReadingViewToolbar({ activeView, onViewChange, config }) {
  const toolbar = config?.toolbar ?? {};
  const animationStyle = toolbar.animationStyle ?? 'slidingPill';
  const spring = toolbar.spring ?? { type: 'spring', visualDuration: 0.32, bounce: 0.12 };
  const activeScale = toolbar.activeScale ?? 1.03;
  const inactiveScale = toolbar.inactiveScale ?? 0.98;
  const tapScale = toolbar.tapScale ?? 0.96;

  return (
    <div
      className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 px-4 w-full max-w-fit pointer-events-auto"
      role="tablist"
      aria-label="Reading layout views"
    >
      <div className="flex items-center gap-1 rounded-full  bg-background-primary px-2 py-2 shadow-lg">
        {READING_VIEWS.map(({ id, label }) => {
          const isActive = activeView === id;

          return (
            <motion.button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`${label} view`}
              onClick={() => onViewChange(id)}
              whileTap={{ scale: tapScale }}
              animate={{
                scale: animationStyle === 'scalePop'
                  ? (isActive ? activeScale : inactiveScale)
                  : 1,
              }}
              transition={spring}
              className={`relative flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-full px-3 py-2 font-sans leading-tight sm:flex-row sm:gap-1.5 sm:text-xs ${
                animationStyle === 'fadeHighlight' && isActive
                  ? 'bg-color-accent'
                  : isActive && animationStyle !== 'slidingPill'
                    ? 'bg-color-accent text-white'
                    : isActive
                      ? 'text-white font-semibold'
                      : 'text-text-muted hover:text-text-dark'
              }`}
            >
              {animationStyle === 'slidingPill' && isActive && (
                <motion.span
                  layoutId="reading-toolbar-active-pill"
                  className="absolute inset-0 rounded-full bg-color-accent"
                  transition={spring}
                />
              )}

              <span className="relative z-10 flex flex-col items-center gap-0.5 sm:flex-row sm:gap-1.5">
                <motion.span
                  animate={{
                    scale: animationStyle === 'fadeHighlight'
                      ? (isActive ? activeScale : inactiveScale)
                      : 1,
                  }}
                  transition={spring}
                  className="flex items-center justify-center"
                >
                  <ViewIcon id={id} />
                </motion.span>
                <motion.span
                  animate={{
                    opacity: animationStyle === 'fadeHighlight' ? (isActive ? 1 : 0.72) : 1,
                  }}
                  transition={spring}
                >
                  {label}
                </motion.span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default ReadingViewToolbar;
