import heroImg1 from '../assets/hero/Hero Img 1.png';
import heroImg2 from '../assets/hero/Hero Img 2.png';
import heroImg3 from '../assets/hero/Hero Img 3.png';
import heroImg4 from '../assets/hero/Hero Img 4.png';
import heroImg5 from '../assets/hero/Hero Img 5.png';
import heroImg6 from '../assets/hero/Hero Img 6.png';
import heroImg7 from '../assets/hero/Hero Img 7.png';
import heroImg8 from '../assets/hero/Hero Img 8.png';
import heroImg9 from '../assets/hero/Hero Img 9.png';
import heroImg10 from '../assets/hero/Hero Gif 10.png';
import heroImg11 from '../assets/hero/Hero Img 11.png';
import heroImg12 from '../assets/hero/Hero Gif 12.png';
import heroImg13 from '../assets/hero/Hero Img 13.png';
import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Slider = () => {
  // List of image URLs (replace these with your actual PNG file paths or URLs)
  const slides = [
    heroImg1,
    heroImg2,
    heroImg3,
    heroImg4,
    heroImg5,
    heroImg6,
    heroImg7,
    heroImg8,
    heroImg9,
    heroImg10,
    heroImg11,
    heroImg12,
    heroImg13,
  ];

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
    <div className="relative w-full max-w-4xl mb-16">
      {/* Container with 915:518 aspect ratio (approximately 16:9) */}
      <div className="relative w-full" style={{ aspectRatio: '915/518' }}>
        <div className="absolute inset-0 overflow-hidden rounded">
          <TransitionGroup>
            <CSSTransition
              key={currentSlide}
              timeout={1000}
              classNames={{
                enter: 'opacity-0',
                enterActive: 'opacity-100 transition-all duration-1000 ease-in-out',
                enterDone: 'opacity-100',
                exit: 'opacity-320',
                exitActive: 'opacity-0 transition-all duration-1000 ease-in-out',
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
    </div>
  );
};

export default Slider;
