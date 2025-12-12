import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import PrimaryButton from '../components/common/PrimaryButton';

// Import random images from the project
import heroImg1 from '../assets/hero/Slider 1.webp';
import heroImg2 from '../assets/hero/Slider 2.webp';
import heroImg3 from '../assets/hero/Slider 3.webp';
import heroImg4 from '../assets/hero/Slider 4.webp';
import heroImg5 from '../assets/hero/Slider 5.webp';
import advisableImg1 from '../assets/advisable/Slider 1.webp';
import advisableImg2 from '../assets/advisable/Slider 2.webp';
import advisableImg3 from '../assets/advisable/Slider 3.webp';
import carturestiImg1 from '../assets/carturesti/Slider 1.webp';
import carturestiImg2 from '../assets/carturesti/Slider 2.webp';
import carturestiImg3 from '../assets/carturesti/Slider 3.webp';
import kotaImg1 from '../assets/kota/Slider 1.webp';
import kotaImg2 from '../assets/kota/Slider 2.webp';
import kotaImg3 from '../assets/kota/Slider 3.webp';

// Array of all available images
const availableImages = [
  heroImg1, heroImg2, heroImg3, heroImg4, heroImg5,
  advisableImg1, advisableImg2, advisableImg3,
  carturestiImg1, carturestiImg2, carturestiImg3,
  kotaImg1, kotaImg2, kotaImg3
];

// Sample data with random images
const slotItems = [
  {
    id: 1,
    title: 'First Item',
    description: 'This is the description for the first item in the slot wheel.',
    image: availableImages[Math.floor(Math.random() * availableImages.length)]
  },
  {
    id: 2,
    title: 'Second Item',
    description: 'This is the description for the second item in the slot wheel.',
    image: availableImages[Math.floor(Math.random() * availableImages.length)]
  },
  {
    id: 3,
    title: 'Third Item',
    description: 'This is the description for the third item in the slot wheel.',
    image: availableImages[Math.floor(Math.random() * availableImages.length)]
  },
  {
    id: 4,
    title: 'Fourth Item',
    description: 'This is the description for the fourth item in the slot wheel.',
    image: availableImages[Math.floor(Math.random() * availableImages.length)]
  },
  {
    id: 5,
    title: 'Fifth Item',
    description: 'This is the description for the fifth item in the slot wheel.',
    image: availableImages[Math.floor(Math.random() * availableImages.length)]
  },
];

function SlotWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [_selectedIndex, setSelectedIndex] = useState(null);
  const scrollContainerRef = useRef(null);
  const itemsContainerRef = useRef(null);
  const isFirstSpin = useRef(true);
  const animationRef = useRef(null); // Store GSAP timeline for cleanup
  const scrollProxyRef = useRef({ value: 0 }); // Persistent proxy object for GSAP
  const blurProxyRef = useRef({ value: 0 }); // Persistent blur proxy

  const handlePlay = () => {
    if (isSpinning) return; // Prevent multiple spins
    
    setIsSpinning(true);
    
    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }
    
    // Select a random item
    const randomIndex = Math.floor(Math.random() * slotItems.length);
    setSelectedIndex(randomIndex);
    
    // Get the container and items
    const container = scrollContainerRef.current;
    const itemsContainer = itemsContainerRef.current;
    
    if (!container || !itemsContainer) return;
    
    // Get all item elements
    const items = Array.from(itemsContainer.children);
    if (items.length === 0) return;
    
    // Calculate item heights and positions
    let itemTop = 0;
    for (let i = 0; i < randomIndex; i++) {
      const item = items[i];
      if (item) {
        itemTop += item.offsetHeight;
      }
    }
    
    // Get the target item
    const targetItem = items[randomIndex];
    if (!targetItem) return;
    
    const itemHeight = targetItem.offsetHeight;
    const containerHeight = container.clientHeight; // Use clientHeight to exclude scrollbar
    
    // Calculate the scroll position to center the item
    // We want the item to be centered: itemTop + itemHeight/2 should be at containerHeight/2
    let targetScroll = itemTop + (itemHeight / 2) - (containerHeight / 2);
    
    // Ensure targetScroll is within bounds (not negative, not beyond max scroll)
    const totalContentHeight = itemsContainer.scrollHeight;
    const maxScroll = Math.max(0, totalContentHeight - containerHeight);
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
    
    // Get current scroll position (or start from top on first spin)
    const startScroll = isFirstSpin.current ? 0 : container.scrollTop;
    
    // Only reset to top on the first spin
    if (isFirstSpin.current) {
      container.scrollTop = 0;
      isFirstSpin.current = false;
    }
    
    // Safety check: ensure we have valid content height
    if (totalContentHeight <= 0) {
      console.error('Invalid content height');
      setIsSpinning(false);
      return;
    }
    
    const tenRotations = totalContentHeight * 10;
    const afterSpinWrapped = (startScroll + tenRotations) % totalContentHeight;
    
    // Calculate how much more we need to scroll to reach target
    // If target is ahead of us after spinning, continue forward
    // If target is behind, we need one more rotation
    let remainingDistance = targetScroll - afterSpinWrapped;
    if (remainingDistance < 0) {
      remainingDistance += totalContentHeight; // Wrap around
    }
    
    // Calculate total distance - enough to feel like multiple spins
    // We'll use a generous amount to ensure smooth acceleration/deceleration
    const spinMultiplier = 8; // Enough rotations to feel natural
    const totalSpinDistance = totalContentHeight * spinMultiplier;
    const totalDistance = totalSpinDistance + remainingDistance;
    
    // Safety check: ensure total distance is valid
    if (totalDistance <= 0 || !isFinite(totalDistance)) {
      console.error('Invalid total distance', { totalDistance, totalContentHeight, remainingDistance });
      setIsSpinning(false);
      return;
    }
    
    // Use persistent proxy objects for smooth animation
    scrollProxyRef.current.value = startScroll;
    blurProxyRef.current.value = 0;
    const scrollProxy = scrollProxyRef.current;
    const blurProxy = blurProxyRef.current;
    
    // Track previous values for velocity calculation
    let prevScrollValue = startScroll;
    let prevTime = performance.now();
    let velocityHistory = []; // Store recent velocities for smoothing
    
    // Single smooth animation: Start fast -> Reach max speed -> Decelerate -> Ease into final position
    // Using power3.inOut for smooth acceleration to max speed, then gradual deceleration
    
    // Safety timeout to ensure state resets even if animation fails
    const safetyTimeout = setTimeout(() => {
      console.warn('Animation timeout - resetting state');
      setIsSpinning(false);
      if (itemsContainer) {
        itemsContainer.style.filter = 'none';
      }
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    }, 10000); // 10 second timeout
    
    // Ensure the animation target value is different from start
    const endValue = startScroll + totalDistance;
    console.log('Animation values', { startScroll, endValue, difference: endValue - startScroll, totalContentHeight, maxScroll });
    
    // Verify we have a valid animation
    if (endValue === startScroll) {
      console.error('Animation start and end values are the same!');
      setIsSpinning(false);
      return;
    }
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      console.log('Creating GSAP animation...');
      
      animationRef.current = gsap.to(scrollProxy, {
      value: endValue,
      duration: 7, // Total duration - feels natural and not rushed
      ease: "power3.inOut", // Smooth curve: accelerates to max, then decelerates naturally
      immediateRender: false,
      onStart: () => {
        console.log('Animation started - GSAP is running');
      },
      onUpdate: () => {
        // Handle wrapping smoothly
        const currentValue = scrollProxy.value;
        
        // Debug: log first few updates to verify animation is running
        if (velocityHistory.length < 3) {
          console.log('Animation update', { currentValue, scrollProxyValue: scrollProxy.value });
        }
        
        const wrapped = currentValue % totalContentHeight;
        const scrollPosition = Math.min(wrapped, maxScroll);
        container.scrollTop = scrollPosition;
        
        // Calculate velocity for motion blur
        const currentTime = performance.now();
        const deltaTime = (currentTime - prevTime) / 1000; // Convert to seconds
        
        // Calculate velocity (handle wrapping by using absolute difference)
        let deltaScroll = Math.abs(currentValue - prevScrollValue);
        // If the difference is too large, it might be a wrap - use a smaller value
        if (deltaScroll > totalContentHeight / 2) {
          deltaScroll = totalContentHeight - deltaScroll;
        }
        
        const velocity = deltaTime > 0 ? deltaScroll / deltaTime : 0;
        
        // Smooth velocity by averaging recent values
        velocityHistory.push(velocity);
        if (velocityHistory.length > 5) {
          velocityHistory.shift(); // Keep only last 5 values
        }
        const smoothedVelocity = velocityHistory.reduce((a, b) => a + b, 0) / velocityHistory.length;
        
        // Map velocity to blur intensity (0-20px blur)
        // Higher velocity = more blur, with exponential scaling for natural feel
        const maxBlur = 20; // Maximum blur in pixels
        const blurIntensity = Math.min(Math.pow(smoothedVelocity / 200, 0.7), 1) * maxBlur;
        
        // Smoothly interpolate blur value (exponential moving average)
        blurProxy.value += (blurIntensity - blurProxy.value) * 0.3; // 0.3 is the smoothing factor
        
        // Apply blur filter to items container
        if (itemsContainer) {
          itemsContainer.style.filter = `blur(${blurProxy.value}px)`;
        }
        
        // Update previous values
        prevScrollValue = currentValue;
        prevTime = currentTime;
      },
      onComplete: () => {
        console.log('Animation completed');
        // Clear safety timeout
        clearTimeout(safetyTimeout);
        
        // Ensure exact final position
        container.scrollTop = targetScroll;
        
        // Reset spinning state immediately
        setIsSpinning(false);
        animationRef.current = null;
        
        // Fade out blur smoothly
        gsap.to(blurProxy, {
          value: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            if (itemsContainer) {
              itemsContainer.style.filter = 'none';
            }
          }
        });
      },
      onInterrupt: () => {
        // Clear safety timeout
        clearTimeout(safetyTimeout);
        
        // Handle animation interruption
        setIsSpinning(false);
        if (itemsContainer) {
          itemsContainer.style.filter = 'none';
        }
        animationRef.current = null;
      }
      });
      
      console.log('GSAP animation created', animationRef.current);
    });
  };

  // Cleanup on unmount and reset blur when not spinning
  useEffect(() => {
    // Capture ref value for cleanup
    const itemsContainer = itemsContainerRef.current;
    
    // Reset blur when component mounts or when not spinning
    if (itemsContainer && !isSpinning) {
      itemsContainer.style.filter = 'none';
    }
    
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      // Clean up blur on unmount
      if (itemsContainer) {
        itemsContainer.style.filter = 'none';
      }
    };
  }, [isSpinning]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-primary py-20">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Container: 70% height and 70% width, centered, no overflow, white background */}
      <div 
        ref={scrollContainerRef}
        className="w-[70vw] h-[70vh] overflow-y-auto bg-white p-8 hide-scrollbar"
        style={{ 
          width: '70vw', 
          height: '70vh',
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
        }}
      >
        {/* Column of stacked items */}
        <div ref={itemsContainerRef} className="flex flex-col">
          {slotItems.map((item, index) => (
            <div 
              key={item.id} 
              className="flex-shrink-0 mb-8 last:mb-0"
            >
              {/* 16:9 Image */}
              <div className="w-full aspect-video mb-4 overflow-hidden rounded">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-text-dark mb-2">
                {item.title}
              </h3>
              
              {/* Description */}
              <p className="text-text-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Play Button */}
      <div className="mt-8">
        <PrimaryButton 
          onClick={handlePlay}
          className={isSpinning ? 'opacity-50 cursor-not-allowed' : ''}
          disabled={isSpinning}
        >
          {isSpinning ? 'Spinning...' : 'Play'}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default SlotWheel;

