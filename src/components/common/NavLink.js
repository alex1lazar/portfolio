import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

function NavLink({ IconComponent, text, to, onClick, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);

  const commonProps = {
    onClick: onClick,
    className: `group flex items-center gap-1 relative ${className}`,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  const content = (
    <>
      <motion.div 
        className="flex items-center"
        whileTap={{ scale: 0.95 }}
        transition={{ type: "easeInOut", stiffness: 400, damping: 17 }}
      >
        <IconComponent className="transition-all duration-200 mr-1" />
      </motion.div>
      <motion.span 
        className="hidden md:block font-serif font-semibold text-lg text-text-dark group-hover:text-text-accent underline whitespace-nowrap overflow-hidden"
        initial={{ opacity: 0.5, x: 0, maxWidth: 0 }}
        animate={isHovered ? { opacity: 1, x: 0, maxWidth: 200 } : { opacity: 0.5, x: 4, maxWidth: 0 }}
        transition={isHovered ? { 
          // Hover in - faster, smoother
          duration: 0.3, 
          ease: "easeOut",
          maxWidth: { duration: 0.25 }
        } : {
          // Hover out - slower exit
          duration: 0.4, 
          ease: "easeIn",
          maxWidth: { duration: 0.3 }
        }}
      >
        {text}
      </motion.span>
    </>
  );

  // If to is provided, use Link; otherwise use button
  if (to) {
    return (
      <Link to={to} {...commonProps}>
        {content}
      </Link>
    );
  }

  return (
    <button {...commonProps}>
      {content}
    </button>
  );
}

export default NavLink;

