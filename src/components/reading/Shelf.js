import React from 'react';

function Shelf({ className = '' }) {
  return (
    <div
      role="presentation"
      className={`h-2 w-full rounded-sm bg-text-muted/20 ${className}`}
    />
  );
}

export default Shelf;
