import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="w-full py-4 sm:py-6">
      <div className="max-w-[1440px] mx-auto px-4 flex justify-between items-start sm:items-center">
        {/* Left side - Name */}
        <Link to="/" className="navbar-name font-serif hover:text-text-accent transition-colors">
          Alex Lazar
        </Link>

        {/* Right side - Navigation Links */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-4">
          {/* Work link */}
          <Link to="/work" className="navbar-link text-text-dark font-serif hover:text-text-primary transition-colors">
            Work
          </Link>

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
