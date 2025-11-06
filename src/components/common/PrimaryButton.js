import React from 'react';
import { Link } from 'react-router-dom';

function PrimaryButton({ children, to, onClick, className = '', ...props }) {
  const baseClasses = 'font-sans font-medium text-base text-text-accent hover:underline';

  if (to) {
    return (
      <Link 
        to={to}
        className={`${baseClasses} ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;

