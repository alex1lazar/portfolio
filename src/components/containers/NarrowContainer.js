import React from 'react';

const NarrowContainer = ({ children }) => {
  return (
    <div className="max-w-[640px]">
      {children}
    </div>
  );
};

export default NarrowContainer; 