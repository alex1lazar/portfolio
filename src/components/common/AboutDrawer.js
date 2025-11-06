import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import IconClose from './icons/IconClose';
import { slideRight, fadeIn, transitions } from '../../lib/motion';

function AboutDrawer({ isOpen, onClose }) {
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

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

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
            className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
            onClick={handleBackdropClick}
          />

          {/* Drawer */}
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideRight}
            transition={transitions.smooth}
            className="fixed top-[12px] bottom-[12px] right-[12px] bg-background-primary rounded shadow-lg z-50 overflow-y-auto hide-scrollbar"
            style={{ 
              maxWidth: '600px'
            }}
          >
            <div className="px-6 pt-16 pb-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-[12px] right-[12px] text-text-dark hover:text-text-accent transition-colors"
                aria-label="Close about"
              >
                <IconClose />
              </button>

              {/* About Content */}
              <div className="flex flex-col gap-10 max-w-2xl">
                {/* Image */}
                <div className="h-[95px] w-[171px] relative rounded-xs overflow-hidden">
                  <div className="w-full h-full bg-[#f4f7f0] rounded-xs flex items-center justify-center">
                    <p className="text-sm text-text-muted">Image</p>
                  </div>
                </div>

                {/* Intro Text */}
                <p className="font-serif text-lg font-semibold text-text-dark tracking-[-0.1px]">
                  I'm Alex, a software designer from Romania working with companies that care about their product experiences.
                </p>

                {/* Now Section */}
                <div className="flex flex-col gap-3">
                  <p className="font-serif text-lg font-semibold text-text-dark tracking-[-0.1px]">
                    Now
                  </p>
                  <div className="font-sans text-base text-text-normal space-y-4">
                    <p>
                      Currently, I'm leading all design initiatives at Kota where we're making global benefits more accessible to companies and their employees. I'm used to working in fast-paced companies as a solo designer, fixing things as they come, and improving customers' experience with the company.
                    </p>
                    <p>
                      Product has been a higher focus lately, but I always find myself drifting into marketing and helping the team with web design work.
                    </p>
                  </div>
                </div>

                {/* How I help Section */}
                <div className="flex flex-col gap-4">
                  
                  <p className="font-serif text-lg font-semibold text-text-dark tracking-[-0.1px]">
                    How I help
                  </p>
                  
                  <div className="flex flex-col gap-1">
                    <p className="font-sans font-medium text-text-dark">
                      Design for product and web with early companies
                    </p>
                    <p className="font-sans text-text-normal">
                      A big blocker for early companies is design. The vision, motivation, and power to build are all there, but design is hard to get right. To find a designer that flexes the craft, balances exploration with business needs, and ships for scale is a long process.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="font-sans font-medium text-text-dark">
                      Design informed by metrics and data
                    </p>
                    <p className="font-sans text-text-normal">
                      Usually what happens for early companies is that design is a blocker. The vision, motivation, and power to build is all there, but not design. It's tough to find the right mix of designer that has the quality, explores enough while staying true to the business, and also builds for scale.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="font-sans font-medium text-text-dark">
                      Designing assets
                    </p>
                    <p className="font-sans text-text-normal">
                      There are moments when companies need the wow effect and capture the eyes. Be it a deck, a website page, a LinkedIn image. I come in to help shape the story and sweat the pixels.
                    </p>
                  </div>
                </div>

                {/* Colophon Section */}
                <div className="flex flex-col gap-4">
                  <p className="font-serif text-lg font-semibold text-text-dark tracking-[-0.1px]">
                    Colophon
                  </p>
                  <div className="font-sans text-text-normal space-y-4">
                    <p>
                      This website is built using React and Tailwind, with the help of Cursor. It uses Lastik and Geist as typefaces.
                    </p>
                    <p>
                      I don't track the traffic or use any cookies. If something resonates, copy my email and say hi!
                    </p>
                    <p>
                      My intention is to feel like a quiet, personal place on the internet where people can learn more about my design practice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AboutDrawer;

