import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import IconClose from './icons/IconClose';
import EmailCopy from './EmailCopy';
import { slideRight, fadeIn, transitions } from '../../lib/motion';
import aboutImage from '../../assets/about/About drawer image.webp';
import no1Icon from '../../assets/about/no1.svg';
import no2Icon from '../../assets/about/no2.svg';
import no3Icon from '../../assets/about/no3.svg'; 
import no4Icon from '../../assets/about/no4.svg';

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
                <div className="h-[112px] w-[176px] relative rounded-xs overflow-hidden">
                  <img 
                    src={aboutImage} 
                    alt="me buying Pocari Sweat from a Japanese vending machine" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Intro Text */}
                <p className="font-serif text-lg font-semibold text-text-dark tracking-[-0.1px]">
                  I'm Alex, a software designer from Romania working with companies that care about their product experiences.
                </p>

                {/* Now Section */}
                <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                    <img src={no1Icon} alt="number 1 icon" className="w-8 h-8" />
                  <p className="font-serif text-lg font-semibold text-text-dark tracking-[-0.1px]">
                    Now
                  </p>
                  </div>
                  <div className="font-sans text-base text-text-normal space-y-4">
                    <p>
                    Currently, I’m leading all design initiatives at <a href="https://www.kota.io" className="text-color-accent underline" target="_blank" rel="noopener noreferrer">Kota</a> where we’re making global benefits more accessible to companies and their employees. My main focus is to design for scale across 3 platforms and help create a strong design culture.                    </p>
                    <p>
                    I joined as Kota’s first designer in 2023 working across product, web, and marketing to evolve the entire customer experience.                    </p>
                  </div>
                </div>

                {/* How I help Section */}
                <div className="flex flex-col gap-4">
                  
                <div className="flex gap-2 items-center">
                    <img src={no2Icon} alt="number 2 icon" className="w-8 h-8" />
                  <p className="font-serif text-lg font-semibold text-text-dark tracking-[-0.1px]">
                  What I do
                  </p>
                  </div>
                  
                  <div className="font-sans text-base text-text-normal space-y-4">
                    <p>
                    It’s a hard task to create a great customer experience when your digital design feels disconnected. Depending on the needs of the company, at times I focus more on the product side, at times on the web.
                    </p>
                    <p>
                    This way, I can understand the entire journey and design experiences that come naturally to the user and make sense for the business. Design should always create a win-win situation. 
                    </p>
                    <p>
                    The constants in my practice are iteration, exploration, and building for scale.   
                    </p>
                  </div>
                </div>

                {/* How I do it Section */}
                <div className="flex flex-col gap-4">
                  
                  <div className="flex gap-2 items-center">
                    <img src={no3Icon} alt="number 3 icon" className="w-8 h-8" />
                  <p className="font-serif text-lg font-semibold text-text-dark tracking-[-0.1px]">
                  How I do it
                  </p>
                  </div>

                  <div className="font-sans text-base text-text-normal space-y-4">
                    <p>
                    <span className='font-medium'>I help non-designers imagine.</span> Most founders and teams need proof of how their idea could work. It’s done through exploration, speed, and the guidance on how to build it.                    </p>
                    <p>
                    <span className='font-medium'>I value collaboration and treat everyone as a partner.</span> I don’t own all the solutions but I bring fresh perspectives to how problems can be solved. Either working independently or within a team, I focus on clear communication and a small feedback loop.                    </p>
                    <p>
                    For smooth collaboration to happen, <span className='font-medium'>I share my work often</span>. It’s easier to reach sharp solutions when you treat each project as small steps towards alignment, exploration, and scalability.                    </p>
                  </div>
                </div>

                {/* Colophon Section */}
                <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                    <img src={no4Icon} alt="number 4 icon" className="w-8 h-8" />
                  <p className="font-serif text-lg font-semibold text-text-dark tracking-[-0.1px]">
                  Colophon
                  </p>
                  </div>
                  <div className="font-sans text-text-normal space-y-4">
                    <p>
                    This website is built using React and Tailwind, with the help of Cursor. It uses Lastik and Geist as typefaces.
                    </p>
                    <p>
                    I don't track the traffic or use any cookies. If something resonates, <EmailCopy className="font-sans text-text-accent">copy my email</EmailCopy> and say hi!
                    </p>
                    <p>
                    Went for a more minimal approach in designing this personal website for three  reasons: (1) allow the work and words to be remarked, (2) build a system that facilitates design and writing exploration, (3) keep the engineering complexity low and learn more about product development with Cursor.
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

