import heroImg1 from '../assets/hero/Slider 1.png';
import heroImg2 from '../assets/hero/Slider 2.png';
import heroImg3 from '../assets/hero/Slider 3.png';
import heroImg4 from '../assets/hero/Slider 4.png';
import heroImg5 from '../assets/hero/Slider 5.png';
import heroImg6 from '../assets/hero/Slider 6.png';
import heroImg7 from '../assets/hero/Slider 7.png';
import heroImg8 from '../assets/hero/Slider 8.png';
import heroImg9 from '../assets/hero/Slider 9.png';
import heroImg10 from '../assets/hero/Slider 10.png';
import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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

const Slider = ({ images = defaultSlides }) => {
  // List of image URLs - use custom images if provided, otherwise use default
  const slides = images;

  // State to track the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Autoplay functionality using useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2400);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full">
      {/* Container with 915:518 aspect ratio (approximately 16:9) */}
      <div className="relative w-full" style={{ aspectRatio: '915/518' }}>
        <div className="absolute inset-0 overflow-hidden rounded">
          <TransitionGroup>
            <CSSTransition
              key={currentSlide}
              timeout={800}
              classNames={{
                enter: 'opacity-0',
                enterActive: 'opacity-100 transition-opacity duration-600 ease-out',
                enterDone: 'opacity-100',
                exit: 'opacity-100',
                exitActive: 'opacity-0 transition-opacity duration-200 ease-in',
                exitDone: 'opacity-0'
              }}
            >
              <div className="absolute inset-0">
                <img
                  src={slides[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-full h-full object-cover"
                  style={{ willChange: 'opacity' }}
                />
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="flex justify-center gap-2 mt-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transition-all duration-[800ms] ease-out ${
              index === currentSlide 
                ? 'w-12 bg-text-dark' 
                : 'w-12 bg-text-muted opacity-40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
