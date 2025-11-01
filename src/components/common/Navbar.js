import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import MobileDrawer from './MobileDrawer';
import IconWork from './icons/IconWork';
import IconWriting from './icons/IconWriting';
import IconReading from './icons/IconReading';
import IconMenu from './icons/IconMenu';

function Navbar({ hideName = false }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <nav className="w-full mx-auto">
        <div className="max-w-[1120px] mx-auto px-4 flex justify-between items-center">
          {/* Left side - Name */}
          {!hideName && (
            <Link to="/" className="text-lg text-text-dark font-serif hover:text-text-accent transition-colors">
              Alex Lazar
            </Link>
          )}

          {/* Desktop Navigation - Icon-only with hover text */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink
              IconComponent={IconWork}
              text="Work"
              to="/work"
              className="text-text-dark hover:text-text-accent transition-colors"
            />
            <span className="font-serif text-lg text-text-dark opacity-30">/</span>
            <NavLink
              IconComponent={IconWriting}
              text="Writing"
              to="/writing"
              className="text-text-dark hover:text-text-accent transition-colors"
            />
            <span className="font-serif text-lg text-text-dark opacity-30">/</span>
            <NavLink
              IconComponent={IconReading}
              text="Reading"
              to="/reading"
              className="text-text-dark hover:text-text-accent transition-colors"
            />
          </div>

          {/* Mobile Navigation - Menu button */}
          <button
            onClick={toggleDrawer}
            className="md:hidden flex items-center text-text-dark hover:text-text-accent transition-colors"
            aria-label="Open menu"
          >
            <IconMenu />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
}

export default Navbar;
