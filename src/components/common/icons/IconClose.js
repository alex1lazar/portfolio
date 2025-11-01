import React from 'react';

function IconClose({ className = "" }) {
  return (
    <svg 
      fill="none" 
      height="36" 
      viewBox="0 0 36 36" 
      width="36" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="m10.1289 8.98438c1.7575 2.04892 5.0667 6.88832 6.6314 9.00222 5.1839 4.6118 8.8257 6.713 11.5725 7.9019.8422.3126.5645.0349.1732-.2513m-21.39662 1.3772c.13697-.0694 4.15482-2.4315 10.76992-6.4559 3.9365-2.6969 6.6831-5.2308 9.0031-7.6111.8804-.8757 1.1581-1.0769 1.4443-1.2843" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeWidth="2"
      />
    </svg>
  );
}

export default IconClose;

