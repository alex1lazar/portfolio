import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import IconWork from './icons/IconWork';
import IconWriting from './icons/IconWriting';
import IconReading from './icons/IconReading';
import IconClose from './icons/IconClose';
import { slideUp, fadeIn, transitions } from '../../lib/motion';

function MobileDrawer({ isOpen, onClose }) {

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle click outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={transitions.smooth}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={handleBackdropClick}
          />

          {/* Drawer */}
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideUp}
            transition={transitions.smooth}
            className="fixed bottom-0 left-0 right-0 bg-background-primary rounded-t-lg shadow-lg z-50 md:hidden"
          >
            <div className="px-6 py-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-text-dark hover:text-text-accent transition-colors"
                aria-label="Close menu"
              >
                <IconClose className="w-6 h-6" />
              </button>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-6">
                <Link
                  to="/work"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-text-dark hover:text-text-accent transition-colors"
                >
                  <IconWork />
                  <span className="font-serif font-semibold text-lg underline">Work</span>
                </Link>
                
                <Link
                  to="/writing"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-text-dark hover:text-text-accent transition-colors"
                >
                  <IconWriting />
                  <span className="font-serif font-semibold text-lg underline">Writing</span>
                </Link>
                
                <Link
                  to="/reading"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-text-dark hover:text-text-accent transition-colors"
                >
                  <IconReading />
                  <span className="font-serif font-semibold text-lg underline">Reading</span>
                </Link>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileDrawer;

