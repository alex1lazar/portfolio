import React from 'react';
import { motion, useTransform } from 'motion/react';

function ContentWheelItem({ item, position, onHover, parentRotation }) {
  const handleMouseEnter = () => {
    if (onHover) {
      onHover(item);
    }
  };

  const handleMouseLeave = () => {
    if (onHover) {
      onHover(null);
    }
  };

  // Counter-rotate to keep item upright (negative of parent rotation)
  const counterRotation = useTransform(parentRotation, (r) => -r);

  return (
    <div
      className="absolute w-[204px] h-[156px] cursor-pointer"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%)`,
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          rotate: counterRotation,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full bg-gray-200 rounded-sm overflow-hidden relative">
          {/* Image */}
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default ContentWheelItem;

