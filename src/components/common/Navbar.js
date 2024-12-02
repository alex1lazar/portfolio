import React from 'react';

function Navbar() {
  return (
    <nav className="w-full h-16">
      <div className="max-w-[1140px] mx-auto h-full px-3 flex flex-row justify-between items-center">
        {/* Left side - Logo and Name */}
        <div className="flex items-center space-x-2">
          <span className="text-[#00C7BD]">●</span> {/* Turquoise dot */}
          <span className="font-medium">Alex Lazar</span>
        </div>

        {/* Right side - Navigation Links */}
        <div className="flex items-center space-x-8">
          <a href="/projects" className="text-gray-800 hover:text-gray-600 transition-colors">
            Projects
          </a>
          <a href="/about" className="text-gray-800 hover:text-gray-600 transition-colors">
            About
          </a>
          <a href="/writing" className="text-gray-800 hover:text-gray-600 transition-colors">
            Writing
          </a>
          <a href="/reading" className="text-gray-800 hover:text-gray-600 transition-colors">
            Reading
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
