'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Stepper, useAutoPlay } from 'pasito';
import 'pasito/styles.css';
import { staticAssetUrl } from '../lib/staticAssetUrl';
import { HERO_SLIDE_IMAGES } from './Slider';

const STEP_DURATION_MS = 2400;

export default function HomepagePasitoSlider({ images = HERO_SLIDE_IMAGES }) {
  const slides = images;
  const count = slides.length;
  const [active, setActive] = useState(0);
  const autoPlayStartedRef = useRef(false);

  const { toggle, filling, fillDuration } = useAutoPlay({
    count,
    active,
    onStepChange: setActive,
    stepDuration: STEP_DURATION_MS,
    loop: true,
  });

  useEffect(() => {
    if (autoPlayStartedRef.current) return;
    autoPlayStartedRef.current = true;
    toggle();
  }, [toggle]);

  const src = staticAssetUrl(slides[active]);

  return (
    <div className="relative w-full" style={{ aspectRatio: '915/518' }}>
      <div className="absolute inset-0 overflow-hidden rounded">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <img
              src={src}
              alt={`Slide ${active + 1}`}
              className="h-full w-full object-cover"
              style={{ willChange: 'opacity' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center pb-3">
        <div className="pointer-events-auto">
          <Stepper
            className="homepage-pasito-stepper"
            count={count}
            active={active}
            onStepClick={setActive}
            filling={filling}
            fillDuration={fillDuration}
          />
        </div>
      </div>
    </div>
  );
}
