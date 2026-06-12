'use client';

import { useMemo } from 'react';
import { useDialKit } from 'dialkit';

export const TRANSITION_EASE = {
  easeOut: [0.22, 1, 0.36, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  snappy: [0.33, 1, 0.68, 1],
};

export function useReadingDialKit({ onScatterReroll }) {
  const dial = useDialKit(
    'Reading Views',
    {
      settingsPanel: {
        type: 'select',
        options: ['scatter', 'grid', 'masonry', 'shelf', 'transitions', 'toolbar'],
        default: 'scatter',
      },
      scatter: {
        scatterness: [0.13, 0, 1],
        cardSpace: [1.2, 0.4, 2.5],
        coverWidthDivisor: [6.4, 4, 14],
        heightDivisor: [2.5, 1.5, 4.5],
        maxCoverWidth: [130, 80, 200],
        minCoverWidth: [72, 48, 120],
        jitter: [0.31, 0, 0.85],
        rotationRange: [8, 0, 20],
        activeScale: [1.16, 1, 1.3],
        activeZIndex: [100, 1, 100],
        containerHeightRem: [10, 8, 28],
        promoteDuration: [240, 100, 800],
        enterStagger: [0.012, 0, 0.06],
        enterDuration: [0.38, 0.1, 1.2],
        enterFromScale: [0.86, 0.5, 1],
        enterFromOpacity: [0, 0, 1],
        enterFromY: [10, 0, 40],
        reroll: { type: 'action', label: 'Re-randomize scatter' },
      },
      grid: {
        _collapsed: true,
        yearSectionGap: [40, 32, 120],
        coverMaxWidth: [220, 120, 220],
        columnGap: [10, 4, 24],
        rowGap: [30, 16, 64],
      },
      masonry: {
        _collapsed: true,
        colsDefault: [4, 1, 8],
        cols900: [2.6, 1, 6],
        cols600: [1.8, 1, 4],
        cols400: [2.6, 1, 3],
        gutter: [12, 0, 24],
        tileGap: [9, 0, 32],
      },
      shelf: {
        _collapsed: true,
        booksPerRowLg: [4.6, 3, 8],
        booksPerRowMd: [3.6, 2, 6],
        booksPerRowSm: [2.8, 2, 5],
        booksPerRowXs: [2, 1, 4],
        coverMaxWidth: [140, 100, 220],
        rowGap: [42, 16, 80],
        bookGap: [13, 4, 24],
      },
      transitions: {
        mode: {
          type: 'select',
          options: ['fadeUp', 'scaleCrossfade', 'blurSlide', 'riseSpring'],
          default: 'fadeUp',
        },
        duration: [0.5, 0.05, 1.2],
        enterY: [14, 0, 80],
        exitY: [10, 0, 80],
        enterScale: [0.97, 0.85, 1],
        exitScale: [0.98, 0.85, 1],
        enterOpacity: [0, 0, 1],
        exitOpacity: [0, 0, 1],
        blur: [20, 0, 24],
        useSpring: false,
        spring: {
          type: 'spring',
          visualDuration: 0.38,
          bounce: 0.08,
          __mode: 'simple',
        },
        ease: {
          type: 'select',
          options: ['easeOut', 'easeInOut', 'snappy'],
          default: 'easeOut',
        },
      },
      toolbar: {
        _collapsed: true,
        animationStyle: {
          type: 'select',
          options: ['slidingPill', 'scalePop', 'fadeHighlight'],
          default: 'slidingPill',
        },
        spring: {
          type: 'spring',
          stiffness: 200,
          damping: 35,
          mass: 2.5,
          __mode: 'advanced',
        },
        activeScale: [1, 1, 1.12],
        inactiveScale: [1, 0.9, 1],
        tapScale: [1, 0.9, 1],
      },
    },
    {
      onAction: (path) => {
        if (path === 'scatter.reroll') onScatterReroll?.();
      },
    }
  );

  const config = useMemo(
    () => ({
      scatter: dial.scatter,
      grid: dial.grid,
      masonry: {
        ...dial.masonry,
        breakpointCols: {
          default: Math.max(1, Math.round(dial.masonry.colsDefault)),
          900: Math.max(1, Math.round(dial.masonry.cols900)),
          600: Math.max(1, Math.round(dial.masonry.cols600)),
          400: Math.max(1, Math.round(dial.masonry.cols400)),
        },
      },
      shelf: dial.shelf,
      transitions: {
        ...dial.transitions,
        easeCurve: TRANSITION_EASE[dial.transitions.ease] ?? TRANSITION_EASE.easeOut,
      },
      toolbar: dial.toolbar,
      settingsPanel: dial.settingsPanel,
    }),
    [dial]
  );

  return config;
}
