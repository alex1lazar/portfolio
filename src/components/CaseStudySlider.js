import React, { useState, useEffect } from 'react';

const CaseStudySlider = ({ images, title, aspectRatio = '16/9' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload adjacent images for smoother navigation
  useEffect(() => {
    if (images && images.length > 1) {
      if (currentIndex < images.length - 1) {
        const preloadNext = new Image();
        preloadNext.src = images[currentIndex + 1].src;
      }
      if (currentIndex > 0) {
        const preloadPrev = new Image();
        preloadPrev.src = images[currentIndex - 1].src;
      }
    }
  }, [currentIndex, images]);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const isFirstImage = currentIndex === 0;
  const isLastImage = currentIndex === images.length - 1;

  return (
    <div className="mb-16">
      {title && (
        <h2 className="font-serif mb-4 mt-12 text-center text-text-dark">{title}</h2>
      )}
      <div className="relative">
        <div className="relative w-full" style={{ aspectRatio }}>
          <div className="absolute inset-0 overflow-hidden rounded-lg shadow-lg">
            <img 
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
          {images.length > 1 && (
            <>
              {/* Left touch area - 25% of width */}
              {!isFirstImage && (
                <button
                  onClick={goToPrevious}
                  className="absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start pl-4 bg-transparent hover:bg-black/5 transition-colors cursor-pointer group"
                  aria-label="Previous image"
                >
                  <div className="bg-white/90 group-hover:bg-white p-3 rounded-full shadow-lg transition-all group-hover:scale-105">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
              )}
              {/* Right touch area - 25% of width */}
              {!isLastImage && (
                <button
                  onClick={goToNext}
                  className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end pr-4 bg-transparent hover:bg-black/5 transition-colors cursor-pointer group"
                  aria-label="Next image"
                >
                  <div className="bg-white/90 group-hover:bg-white p-3 rounded-full shadow-lg transition-all group-hover:scale-105">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M8 15L13 10L8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
              )}
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