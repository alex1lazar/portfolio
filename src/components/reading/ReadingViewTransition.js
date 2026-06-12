'use client';

import { motion } from 'motion/react';

function getViewTransitionProps(mode, t) {
  const base = {
    initial: {
      opacity: t.enterOpacity,
      y: t.enterY,
      scale: t.enterScale,
      filter: mode === 'blurSlide' ? `blur(${t.blur}px)` : 'blur(0px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: {
      opacity: t.exitOpacity,
      y: -t.exitY,
      scale: t.exitScale,
      filter: mode === 'blurSlide' ? `blur(${t.blur}px)` : 'blur(0px)',
    },
  };

  if (mode === 'scaleCrossfade') {
    base.initial.scale = t.enterScale;
    base.exit.scale = t.exitScale;
    base.initial.y = t.enterY * 0.35;
    base.exit.y = -t.exitY * 0.35;
  }

  if (mode === 'riseSpring') {
    base.initial.y = t.enterY;
    base.initial.scale = t.enterScale;
  }

  return base;
}

function getViewTransitionTiming(t) {
  if (t.useSpring) {
    return t.spring;
  }

  return {
    duration: t.duration,
    ease: t.easeCurve,
  };
}

export function ReadingViewTransition({ viewKey, transitions, children }) {
  const mode = transitions?.mode ?? 'riseSpring';
  const motionProps = getViewTransitionProps(mode, transitions);
  const timing = getViewTransitionTiming(transitions);

  return (
    <motion.div
      key={viewKey}
      initial={motionProps.initial}
      animate={motionProps.animate}
      exit={motionProps.exit}
      transition={timing}
    >
      {children}
    </motion.div>
  );
}
