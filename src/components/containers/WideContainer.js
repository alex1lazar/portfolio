import React from 'react';

function WideContainer({ children, className = '' }) {
  return (
    <div className={`max-w-[1120px] mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
}

export default WideContainer; 