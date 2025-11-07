import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import '../../styles/animations.css';

function EmailCopy({ email = 'lazarva25@gmail.com', children, className = '' }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2400);
  };

  return (
    <span className="relative inline-block">
      <span
        onClick={copyEmail}
        className={`underline cursor-pointer hover:text-text-accent transition-colors ${className}`}
      >
        {children}
      </span>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              enter: { duration: 0.2, ease: "easeOut" },
              exit: { duration: 1, ease: "easeOut" }
            }}
            className="tooltip"
            style={{
              pointerEvents: 'none'
            }}
            transformTemplate={({ x, y }) => `translateX(-50%) translateY(${y || 0})`}
          >
            Email copied!
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

export default EmailCopy;

