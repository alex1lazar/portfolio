import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="w-full py-4 sm:py-6">
      <div className="max-w-[1440px] mx-auto px-4 flex justify-between items-start sm:items-center">
        {/* Left side - Name */}
        <Link to="/" className="text-xl sm:text-[1.75rem] leading-6 sm:leading-9 text-text-dark font-serif hover:text-text-accent transition-colors">
          Alex Lazar
        </Link>

        {/* Right side - Navigation Links */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-4">
          {/* Work link */}
          <Link to="/work" className="text-xl sm:text-[1.75rem] leading-5 sm:leading-9 px-0.5 py-1 min-h-[44px] sm:min-h-0 sm:p-0 flex items-center text-right text-text-dark font-serif no-underline hover:text-text-accent transition-colors">
            Work
          </Link>

          <span className="text-xl sm:text-[1.75rem] leading-6 sm:leading-9 text-text-dark font-serif hidden sm:inline">/</span>
          
          {/* Writing link */}
          <Link to="/writing" className="text-xl sm:text-[1.75rem] leading-5 sm:leading-9 px-0.5 py-1 min-h-[44px] sm:min-h-0 sm:p-0 flex items-center text-right text-text-dark font-serif no-underline hover:text-text-accent transition-colors">
            Writing
          </Link>

          <span className="text-xl sm:text-[1.75rem] leading-6 sm:leading-9 text-text-dark font-serif hidden sm:inline">/</span>
          
          {/* Reading link */}
          <Link to="/reading" className="text-xl sm:text-[1.75rem] leading-5 sm:leading-9 px-0.5 py-1 min-h-[44px] sm:min-h-0 sm:p-0 flex items-center text-right text-text-dark font-serif no-underline hover:text-text-accent transition-colors">
            Reading
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
