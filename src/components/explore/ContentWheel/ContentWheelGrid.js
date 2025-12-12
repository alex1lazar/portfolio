import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import ContentWheelItem from './ContentWheelItem';

function ContentWheelGrid({ items }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const rotation = useMotionValue(0);
  const animationRef = useRef(null);
  
  // Animation duration in seconds for one full rotation
  const ROTATION_DURATION = 120;

  // Calculate positions for circular layout
  const calculatePositions = (itemCount, radius = 600) => {
    const centerX = 0;
    const centerY = 0;
    const angleStep = 360 / itemCount;

    return items.map((item, index) => {
      // Start from top (270 degrees) and go clockwise
      const angle = (index * angleStep - 90) * (Math.PI / 180);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return {
        x,
        y,
      };
    });
  };

  const positions = calculatePositions(items.length);
  const isHovered = hoveredItem !== null;

  useEffect(() => {
    if (isHovered) {
      // Pause animation when hovering
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    } else {
      // Resume animation when not hovering
      if (!animationRef.current) {
        animationRef.current = animate(rotation, 360, {
          duration: ROTATION_DURATION,
          repeat: Infinity,
          ease: "linear",
        });
      }
    }
  }, [isHovered, rotation]);

  // Start the animation on mount
  useEffect(() => {
    animationRef.current = animate(rotation, 360, {
      duration: ROTATION_DURATION,
      repeat: Infinity,
      ease: "linear",
    });
    
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, [rotation]);

  return (
    <div className="relative w-full h-[1000px]">
      {/* Center content area for hover info */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {hoveredItem && (
          <motion.div
            className="text-center max-w-md px-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="font-serif font-semibold text-xl text-text-dark mb-2">
              {hoveredItem.title}
            </h2>
            <p className="font-sans text-base text-text-secondary">
              {hoveredItem.description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Circular grid of items - centered container with rotation */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          style={{
            transformOrigin: 'center center',
            rotate: rotation,
          }}
        >
          {items.map((item, index) => (
            <ContentWheelItem
              key={item.id}
              item={item}
              position={positions[index]}
              onHover={setHoveredItem}
              parentRotation={rotation}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default ContentWheelGrid;

