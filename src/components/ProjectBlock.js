import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ProjectBlock({ title, subtitle, description, children, link }) {
  const navigate = useNavigate();
  
  const TitleContent = () => (
    <h2 className="mb-0">
      <span className="text-text-dark">{title}</span>
      <span className="text-text-muted mx-2 font-normal">/</span>
      <span className="text-text-dark text-text-muted font-normal">{subtitle}</span>
    </h2>
  );

  const handleSliderClick = (e) => {
    if (link) {
      e.preventDefault();
      navigate(link);
    }
  };

  return (
    <div className="w-full mb-24 md:mb-60">
      {/* Title Section */}
      <div className="flex justify-center mb-4">
        <div className="text-center font-serif">
          {link ? (
            <Link to={link} className="block group hover:opacity-70 transition-opacity">
              <TitleContent />
            </Link>
          ) : (
            <TitleContent />
          )}
        </div>
      </div>    

      {/* Slider/Content Section */}
      {link ? (
        <div 
          className="max-w-full mb-4 group hover:opacity-70 transition-opacity cursor-pointer relative"
          onClick={handleSliderClick}
          style={{ zIndex: 1 }}
        >
          <div style={{ pointerEvents: 'none' }}>
            {children}
          </div>
        </div>
      ) : (
        <div className="max-w-full mb-4">
          {children}
        </div>
      )}

      {/* Description Section */}
      <div className="flex justify-center">
        <p className="text-center text-base text-text-dark max-w-3xl px-4">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ProjectBlock;

