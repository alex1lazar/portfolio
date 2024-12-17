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
    }, 1500); // Change slide every 1.5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full max-h-[640px] overflow-hidden mb-16 rounded-3xl shadow"> 
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0"
            style={{ backgroundImage: `url(${slide})` }}
          >
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
