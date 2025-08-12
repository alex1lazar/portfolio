import React from 'react';

function XLContainer({ children, className = '' }) {
  return (
    <div className={`max-w-[1440px] mx-auto px-8 ${className}`}>
      {children}
    </div>
  );
}

export default XLContainer; 