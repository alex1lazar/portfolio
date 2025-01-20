import React from 'react';

function NarrowContainer({ children, className = '' }) {
  return (
    <div className={`max-w-[640px] px-4 ${className}`}>
      {children}
    </div>
  );
}

export default NarrowContainer; 