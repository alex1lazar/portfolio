'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";

// Hook for swapping in real images later (optional).
// If you fill these, cards will render images instead of flat colors.
const IMAGE_URLS = [
  // "https://images.example.com/1.jpg",
  // "https://images.example.com/2.jpg",
];

const CARD_W = 220;
const CARD_H = 300;
const VISIBLE_COUNT = 6;
const TOTAL_COUNT = 22; // large pool, only ~6 visible in the container
const SPEED_PX_PER_S = 18; // subtle left -> right motion
const ARC_TOP_GUTTER_PX = 44; // pushes the arc down for visibility

function makeCards(count) {
  return Array.from({ length: count }).map((_, i) => {
    const hue = Math.round((i * 360) / count);
    const color = `hsl(${hue}, 78%, 52%)`;
    const imageUrl = IMAGE_URLS.length ? IMAGE_URLS[i % IMAGE_URLS.length] : null;
    return {
      id: `card_${i}`,
      color,
      imageUrl,
      // small per-card variation for visual depth
      tilt: ((i % 7) - 3) * 0.9,
      lift: ((i % 5) - 2) * 4,
    };
  });
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export default function HeroExplore() {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastTRef = useRef(0);

  const cards = useMemo(() => makeCards(TOTAL_COUNT), []);
  const [layout, setLayout] = useState(() => ({
    w: 1120,
    h: 620,
    spacing: 160,
  }));
  const positionsRef = useRef([]);
  const [, bump] = useState(0);

  // Measure container and derive spacing so ~6 cards are visible centered.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.max(320, Math.round(rect.width || 0));
      const h = Math.max(380, Math.round(rect.height || 0));
      // spacing derived so 6 cards fit within container with slight overlap
      const maxSpacing = 190;
      const minSpacing = 120;
      const spacing = clamp((w - CARD_W) / Math.max(1, VISIBLE_COUNT - 1), minSpacing, maxSpacing);
      setLayout((prev) => (prev.w === w && prev.h === h && prev.spacing === spacing ? prev : { w, h, spacing }));
    };

    measure();
    let ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    } else {
      window.addEventListener("resize", measure);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", measure);
    };
  }, []);

  // Initialize positions whenever spacing changes.
  useEffect(() => {
    const { w, spacing } = layout;
    const totalSpan = (TOTAL_COUNT - 1) * spacing;
    const leftStart = w / 2 - totalSpan / 2; // center whole strip
    positionsRef.current = cards.map((_, i) => leftStart + i * spacing);
    bump((n) => n + 1);
  }, [layout, cards]);

  // Animate positions left -> right, wrapping from right edge to far left.
  useEffect(() => {
    const tick = (t) => {
      if (!lastTRef.current) lastTRef.current = t;
      const dt = Math.min(0.05, (t - lastTRef.current) / 1000);
      lastTRef.current = t;

      const xs = positionsRef.current;
      if (!xs.length) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const dx = SPEED_PX_PER_S * dt;
      for (let i = 0; i < xs.length; i += 1) xs[i] += dx;

      const leftMost = Math.min(...xs);
      const rightCull = layout.w + CARD_W + 80;
      for (let i = 0; i < xs.length; i += 1) {
        if (xs[i] > rightCull) xs[i] = leftMost - layout.spacing;
      }

      bump((n) => (n + 1) % 1_000_000);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTRef.current = 0;
    };
  }, [layout.w, layout.spacing]);

  return (
    <section className="HeroExploreLoop" aria-label="Looping cards">
      <div className="HeroExploreLoop__stage" ref={containerRef} aria-hidden="true">
        {cards.map((card, i) => {
          const x = positionsRef.current[i] ?? 0;
          // Only render cards near the viewport for performance.
          const inRange = x > -CARD_W - 140 && x < layout.w + CARD_W + 140;
          if (!inRange) return null;

          const centerX = layout.w / 2;
          const cardCenterX = x + CARD_W / 2;
          const dx = cardCenterX - centerX;
          const dist = Math.abs(dx);
          const z = Math.round(1000 - dist);

          // Semicircle arc: circle center below the container.
          const circleCenterY = layout.h * 1.45;
          const radius = Math.max(layout.w * 0.92, 760);
          const maxDx = radius * 0.92;
          const clampedDx = clamp(dx, -maxDx, maxDx);
          const underRoot = Math.max(1, radius * radius - clampedDx * clampedDx);
          const arcY = circleCenterY - Math.sqrt(underRoot);

          // Tangent rotation along the arc.
          const denom = Math.sqrt(underRoot);
          const slope = clampedDx / denom;
          const arcRot = (Math.atan(slope) * 180) / Math.PI;

          const y = arcY - layout.h * 0.08 + ARC_TOP_GUTTER_PX + card.lift;
          const rot = arcRot + card.tilt;

          return (
          <div
            key={card.id}
            className="HeroExploreLoop__card"
            style={{
              width: `${CARD_W}px`,
              height: `${CARD_H}px`,
              transform: `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) rotate(${rot}deg)`,
              backgroundColor: card.imageUrl ? undefined : card.color,
              zIndex: z,
            }}
          >
            {card.imageUrl ? (
              <img className="HeroExploreLoop__img" src={card.imageUrl} alt="" draggable={false} />
            ) : (
              <div className="HeroExploreLoop__shine" />
            )}
          </div>
          );
        })}
      </div>

      <style>{`
        .HeroExploreLoop{
          position: relative;
          height: clamp(520px, 62vh, 740px);
          overflow: hidden;
          background: transparent;
        }
        .HeroExploreLoop__stage{
          position: relative;
          height: 100%;
          width: 100%;
        }
        .HeroExploreLoop__card{
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 18px;
          transform-origin: 50% 85%;
          box-shadow:
            0 18px 50px rgba(0,0,0,.28),
            0 1px 0 rgba(255,255,255,.08) inset;
          overflow: hidden;
          will-change: transform;
        }
        .HeroExploreLoop__shine{
          position:absolute; inset:0;
          background:
            radial-gradient(480px 280px at 20% 20%, rgba(255,255,255,.22), rgba(255,255,255,0) 58%),
            radial-gradient(520px 320px at 85% 80%, rgba(0,0,0,.22), rgba(0,0,0,0) 60%);
          opacity: .9;
        }
        .HeroExploreLoop__img{
          position:absolute; inset:0;
          width:100%;
          height:100%;
          object-fit: cover;
          user-select:none;
          -webkit-user-drag:none;
        }
      `}</style>
    </section>
  );
}

