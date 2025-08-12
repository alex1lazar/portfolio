import React, { useState } from 'react';

function Navbar() {
  const [showWorkTooltip, setShowWorkTooltip] = useState(false);
  const [showWritingTooltip, setShowWritingTooltip] = useState(false);
  const [showReadingTooltip, setShowReadingTooltip] = useState(false);

  return (
    <nav className="w-full py-6">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-row justify-between items-center">
        {/* Left side - Name */}
        <div className="flex items-center">
          <span className="navbar-name font-serif">Alex Lazar</span>
        </div>

      

        {/* Right side - Navigation Links */}
        <div className="flex items-center space-x-4">
          {/* Work link with tooltip */}
          <div className="relative inline-block">
            <span 
              className="navbar-link font-serif text-muted cursor-not-allowed"
              onMouseEnter={() => setShowWorkTooltip(true)}
              onMouseLeave={() => setShowWorkTooltip(false)}
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

          <span className="navbar-name font-serif">/</span>
          
          {/* Writing link with tooltip */}
          <div className="relative inline-block">
            <span 
              className="navbar-link font-serif text-muted cursor-not-allowed"
              onMouseEnter={() => setShowWritingTooltip(true)}
              onMouseLeave={() => setShowWritingTooltip(false)}
            >
              Writing
            </span>
            {showWritingTooltip && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-text-dark text-white text-sm rounded shadow-lg z-10 whitespace-nowrap">
                Coming soon
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-dark"></div>
              </div>
            )}
          </div>

          <span className="navbar-name font-serif">/</span>
          
          {/* Reading link with tooltip */}
          <div className="relative inline-block">
            <span 
              className="navbar-link font-serif text-muted cursor-not-allowed"
              onMouseEnter={() => setShowReadingTooltip(true)}
              onMouseLeave={() => setShowReadingTooltip(false)}
            >
              Reading
            </span>
            {showReadingTooltip && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-text-dark text-white text-sm rounded shadow-lg z-10 whitespace-nowrap">
                Coming soon
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-dark"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
