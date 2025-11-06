// Motion animation variants and presets
// Reusable animation configurations for consistent animations across the app

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

export const slideUp = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" }
};

export const slideRight = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

// Common transition presets
export const transitions = {
  smooth: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
  },
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30
  },
  quick: {
    duration: 0.2,
    ease: "easeOut"
  }
};

