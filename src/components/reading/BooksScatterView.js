'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import BookCover from './BookCover';

const COVER_ASPECT = 174 / 234;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getGridDimensions(count, width, height, scatter) {
  const aspect = width / height;
  const cardSpace = scatter?.cardSpace ?? 1;
  const baseCols = Math.max(1, Math.ceil(Math.sqrt(count * aspect)));
  const cols = Math.max(1, Math.round(baseCols / cardSpace));
  const rows = Math.ceil(count / cols);
  return { cols, rows, cellW: width / cols, cellH: height / rows };
}

function computeCoverWidth(width, height, scatter) {
  const cardSpace = scatter?.cardSpace ?? 1;
  const spaceBoost = 1 + (cardSpace - 1) * 0.35;
  const byWidth = (width / (scatter?.coverWidthDivisor ?? 8)) * spaceBoost;
  const byHeight = (height / (scatter?.heightDivisor ?? 2.1)) * COVER_ASPECT * spaceBoost;
  const minW = scatter?.minCoverWidth ?? 72;
  const maxW = scatter?.maxCoverWidth ?? 130;
  return Math.max(minW, Math.min(byWidth, byHeight, maxW));
}

function getEffectiveJitter(scatter) {
  const scatterness = scatter?.scatterness ?? 0.31;
  const jitter = scatter?.jitter ?? 0.31;
  return jitter * (0.35 + scatterness * 0.65);
}

function getEffectiveRotationRange(scatter) {
  const scatterness = scatter?.scatterness ?? 0.31;
  const rotationRange = scatter?.rotationRange ?? 8;
  return rotationRange * (0.25 + scatterness * 0.75);
}

function generateLayout(books, width, height, scatter) {
  const count = books.length;
  if (!count || width <= 0 || height <= 0) {
    return { items: [], coverWidth: 96 };
  }

  const jitterFactor = getEffectiveJitter(scatter);
  const rotationRange = getEffectiveRotationRange(scatter);
  const { cols, cellW, cellH } = getGridDimensions(count, width, height, scatter);
  const coverWidth = computeCoverWidth(width, height, scatter);
  const shuffled = shuffle(books);

  const items = shuffled.map((book, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const jitterX = (Math.random() - 0.5) * cellW * jitterFactor;
    const jitterY = (Math.random() - 0.5) * cellH * jitterFactor;
    const x = col * cellW + cellW / 2 + jitterX;
    const y = row * cellH + cellH / 2 + jitterY;
    const rotation = (Math.random() * 2 - 1) * rotationRange;

    return {
      book,
      leftPct: (x / width) * 100,
      topPct: (y / height) * 100,
      rotation,
      zIndex: index + 1,
    };
  });

  return { items, coverWidth };
}

function BooksScatterView({ books, config, rerollKey = 0 }) {
  const scatter = config?.scatter;
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [layout, setLayout] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const booksWithCovers = useMemo(
    () => books.filter((b) => b.coverImage),
    [books]
  );

  const layoutDeps = useMemo(
    () =>
      JSON.stringify({
        rerollKey,
        scatterness: scatter?.scatterness,
        cardSpace: scatter?.cardSpace,
        jitter: scatter?.jitter,
        rotationRange: scatter?.rotationRange,
        coverWidthDivisor: scatter?.coverWidthDivisor,
        heightDivisor: scatter?.heightDivisor,
        maxCoverWidth: scatter?.maxCoverWidth,
        minCoverWidth: scatter?.minCoverWidth,
        count: booksWithCovers.length,
      }),
    [rerollKey, scatter, booksWithCovers.length]
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (size.width <= 0 || size.height <= 0 || booksWithCovers.length === 0) return;

    setLayout((prev) => {
      const coverWidth = computeCoverWidth(size.width, size.height, scatter);
      if (prev && prev.deps === layoutDeps) {
        return { ...prev, coverWidth };
      }
      const generated = generateLayout(booksWithCovers, size.width, size.height, scatter);
      return { ...generated, deps: layoutDeps };
    });
  }, [size.width, size.height, booksWithCovers, scatter, layoutDeps]);

  if (booksWithCovers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">No book covers found.</p>
      </div>
    );
  }

  const heightRem = scatter?.containerHeightRem ?? 10;
  const activeScale = scatter?.activeScale ?? 1.16;
  const activeZIndex = scatter?.activeZIndex ?? 100;
  const promoteDuration = scatter?.promoteDuration ?? 240;
  const enterStagger = scatter?.enterStagger ?? 0.012;
  const enterDuration = scatter?.enterDuration ?? 0.38;
  const enterFromScale = scatter?.enterFromScale ?? 0.86;
  const enterFromOpacity = scatter?.enterFromOpacity ?? 0;
  const enterFromY = scatter?.enterFromY ?? 10;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        height: `calc(100dvh - ${heightRem}rem)`,
        minHeight: 280,
        maxHeight: `calc(100dvh - 10rem)`,
      }}
    >
      {layout?.items.map(({ book, leftPct, topPct, rotation, zIndex }, index) => {
        const isActive = activeId === book.id;

        return (
          <div
            key={book.id}
            className="absolute origin-center"
            style={{
              width: layout.coverWidth,
              left: `${leftPct}%`,
              top: `${topPct}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: isActive ? activeZIndex : zIndex,
            }}
          >
            <motion.div
              initial={{
                opacity: enterFromOpacity,
                scale: enterFromScale,
                y: enterFromY,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: enterDuration,
                delay: index * enterStagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="origin-center ease-out"
                style={{
                  transform: isActive
                    ? `scale(${activeScale}) rotate(0deg)`
                    : `scale(1) rotate(${rotation}deg)`,
                  transition: `transform ${promoteDuration}ms ease-out`,
                }}
              >
                <BookCover
                  book={book}
                  as="button"
                  type="button"
                  tabIndex={0}
                  className="block w-full cursor-pointer rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-accent"
                  onMouseEnter={() => setActiveId(book.id)}
                  onMouseLeave={() => setActiveId((id) => (id === book.id ? null : id))}
                  onFocus={() => setActiveId(book.id)}
                  onBlur={() => setActiveId((id) => (id === book.id ? null : id))}
                />
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export default BooksScatterView;
