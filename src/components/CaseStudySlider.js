import React, { useState } from 'react';

const CaseStudySlider = ({ images, title, aspectRatio = '16/9' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="mb-16">
      {title && (
        <h2 className="text-[1.75rem] leading-[2.25rem] font-serif mb-8 text-center">{title}</h2>
      )}
      <div className="relative">
        <div className="relative w-full" style={{ aspectRatio }}>
          <div className="absolute inset-0 overflow-hidden rounded-lg shadow-lg">
            <img 
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover object-center"
            />
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-105"
                aria-label="Previous image"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-105"
                aria-label="Next image"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M8 15L13 10L8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
        {images[currentIndex].caption && (
          <p className="text-text-tertiary text-sm mt-4 text-center max-w-2xl mx-auto">{images[currentIndex].caption}</p>
        )}
      </div>
    </div>
  );
};

export default CaseStudySlider; 