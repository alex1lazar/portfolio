import React from 'react';

function NarrowContainer({ children, className = '' }) {
  return (
    <div className={`max-w-[640px] mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
}

export default NarrowContainer; 