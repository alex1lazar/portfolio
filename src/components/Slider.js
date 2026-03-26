'use client';

import heroImg1 from '../assets/hero/Slider 1.webp';
import heroImg2 from '../assets/hero/Slider 2.webp';
import heroImg3 from '../assets/hero/Slider 3.webp';
import heroImg4 from '../assets/hero/Slider 4.webp';
import heroImg5 from '../assets/hero/Slider 5.webp';
import heroImg6 from '../assets/hero/Slider 6.webp';
import heroImg7 from '../assets/hero/Slider 7.webp';
import heroImg8 from '../assets/hero/Slider 8.png';
import heroImg9 from '../assets/hero/Slider 9.webp';
import heroImg10 from '../assets/hero/Slider 10.webp';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { staticAssetUrl } from '../lib/staticAssetUrl';

const defaultSlides = [
  heroImg1,
  heroImg2,
  heroImg3,
  heroImg4,
  heroImg5,
  heroImg6,
  heroImg7,
  heroImg8,
  heroImg9,
  heroImg10
];

const Slider = ({ images = defaultSlides, delay = 0 }) => {
  const slides = images;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
      }, 2400);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [slides.length, delay]);

  const src = staticAssetUrl(slides[currentSlide]);

  return (
    <div className="relative w-full">
      <div className="relative w-full" style={{ aspectRatio: '915/518' }}>
        <div className="absolute inset-0 overflow-hidden rounded">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: currentSlide === 0 ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <img
                src={src}
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-full object-cover"
                style={{ willChange: 'opacity' }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Slider;
