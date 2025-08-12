import React, { useState } from 'react';

const CaseStudySlider = ({ images }) => {
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
    <div className="mb-12">
      <div className="relative">
        <img 
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="w-full rounded-lg shadow-lg"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={goToPrevious}
            className={`text-text-tertiary hover:text-text-primary transition-colors ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={goToNext}
            className={`text-text-tertiary hover:text-text-primary transition-colors ${
              currentIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentIndex === images.length - 1}
          >
            Next
          </button>
        </div>
      </div>
      <p className="text-text-tertiary text-sm mt-2">{images[currentIndex].caption}</p>
    </div>
  );
};

export default CaseStudySlider; 