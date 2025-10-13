import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [showWorkTooltip, setShowWorkTooltip] = useState(false);
  const [tooltipTimeout, setTooltipTimeout] = useState(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
      }
    };
  }, [tooltipTimeout]);

  return (
    <nav className="w-full py-4 sm:py-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex justify-between items-start sm:items-center">
        {/* Left side - Name */}
        <Link to="/" className="navbar-name font-serif hover:text-text-accent transition-colors">
          Alex Lazar
        </Link>

        {/* Right side - Navigation Links */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-4">
          {/* Work link with tooltip */}
          <div className="relative inline-block">
            <span 
              className="navbar-link font-serif text-text-muted cursor-not-allowed sm:cursor-pointer"
              onMouseEnter={() => setShowWorkTooltip(true)}
              onMouseLeave={() => setShowWorkTooltip(false)}
              onClick={() => {
                setShowWorkTooltip(true);
                // Clear existing timeout
                if (tooltipTimeout) {
                  clearTimeout(tooltipTimeout);
                }
                // Set new timeout to hide tooltip after 1.5s
                const timeout = setTimeout(() => {
                  setShowWorkTooltip(false);
                }, 1200);
                setTooltipTimeout(timeout);
              }}
            >
              Work
            </span>
            {showWorkTooltip && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-text-dark text-white text-sm rounded shadow-lg z-10 whitespace-nowrap">
                Coming soon
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-dark"></div>
              </div>
            )}
          </div>

          <span className="navbar-name font-serif hidden sm:inline">/</span>
          
          {/* Writing link */}
          <Link to="/writing" className="navbar-link text-text-dark font-serif hover:text-text-primary transition-colors">
            Writing
          </Link>

          <span className="navbar-name font-serif hidden sm:inline">/</span>
          
          {/* Reading link */}
          <Link to="/reading" className="navbar-link text-text-dark font-serif hover:text-text-primary transition-colors">
            Reading
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
