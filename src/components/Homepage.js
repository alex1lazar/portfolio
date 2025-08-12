import React, { useState } from 'react';
import XLContainer from './containers/XLContainer';
import Slider from './Slider';
import { CSSTransition } from 'react-transition-group';
import '../styles/animations.css';

function Homepage() {
  const [showTooltip, setShowTooltip] = useState(false);

  const copyEmail = () => {
    const email = 'lazarva25@gmail.com';
    navigator.clipboard.writeText(email);
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2400);
  };

  return (
    <div className="homepage-background min-h-screen pt-16">
      <XLContainer>
        {/* 4-column description row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="text-normal">
            <p className="text-base leading-normal font-medium">
              Romanian software designer creating unique experiences for modern startups. Currently working at <a href="https://www.kota.io" className="text-accent underline">Kota</a> where we shape the future of how companies and their employees interact with benefits.
            </p>
          </div>
          
          <div className="text-normal">
            <p className="text-base leading-normal">
              During my bachelor's in Computer Engineering, I sensed that I'm too removed from the human side. Without any idea about what it means, I started learning more about design.
            </p>
          </div>
          
          <div className="text-normal">
            <p className="text-base leading-normal">
              It's how I realized that this field has a great balance between people and their behaviour, visuals and their importance, and innovation. All subjects that spark a deep curiosity in me.
            </p>
          </div>
          
          <div className="text-normal">
            <p className="text-base leading-normal">
              These days, I work with startups that genuinely care about their digital products and about their customers' experience with them.
            </p>
          </div>
        </div>

        {/* Email button */}
        <div className="mb-12">
          <div className="relative inline-block">
            <button
              onClick={copyEmail}
              className="text-accent underline text-lg hover:opacity-80 transition-opacity font-serif"
            >
              Copy my email
            </button>
            
            <CSSTransition
              in={showTooltip}
              timeout={{
                enter: 200,
                exit: 2000
              }}
              classNames="tooltip"
              unmountOnExit
            >
              <div className="tooltip">
                Email copied!
              </div>
            </CSSTransition>
          </div>
        </div>

        {/* Carousel/Slider */}
        <div className="flex-1 mb-16">
          <Slider />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center py-8">
          <div className="text-normal">
            <span className="text-base">Timisoara, Romania</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://x.com/alexvlazar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-normal underline hover:text-accent transition-colors text-base"
            >
              X
            </a>
            <span className="text-normal">/</span>
            <a 
              href="https://www.linkedin.com/in/alexvlazar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-normal underline hover:text-accent transition-colors text-base"
            >
              LinkedIn
            </a>
            <span className="text-normal">/</span>
            <a 
              href="https://www.are.na/alex-lazar/channels" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-normal underline hover:text-muted transition-colors text-base"
            >
              Are.na
            </a>
          </div>
        </div>
      </XLContainer>
    </div>
  );
}

export default Homepage;
