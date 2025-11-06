import React from 'react';

function ProjectBlock({ title, subtitle, description, children }) {
  return (
    <div className="w-full mb-30 md:mb-60">
      {/* Title Section */}
      <div className="flex justify-center mb-4">
        <div className="text-center font-serif">
          <h2 className="mb-0">
            <span className="text-text-dark">{title}</span>
            <span className="text-text-muted mx-2 font-normal">/</span>
            <span className="text-text-dark text-text-muted font-normal">{subtitle}</span>
          </h2>
        </div>
      </div>    

      {/* Slider/Content Section */}
      <div className="max-w-full mb-4">
        {children}
      </div>

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

