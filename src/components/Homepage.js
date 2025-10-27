import React, { useState, useEffect } from 'react';
import XLContainer from './containers/XLContainer';
import Slider from './Slider';
import { CSSTransition } from 'react-transition-group';
import '../styles/animations.css';

function Homepage() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const copyEmail = () => {
    const email = 'lazarva25@gmail.com';
    navigator.clipboard.writeText(email);
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2400);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const romaniaTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Bucharest"}));
      const timeString = romaniaTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage-background pt-16 flex flex-col">
      <XLContainer className="flex flex-col">
        <div className="flex flex-col">
          {/* 4-column description row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12 max-w-[32rem] lg:max-w-none lg:mx-0 order-2 lg:order-1">
          <div className="text-normal font-medium">
            <p className="text-base leading-normal">
              Romanian software designer creating unique experiences for modern startups. Currently working at <a href="https://www.kota.io" className="text-accent underline">Kota</a> where we shape the future of how companies and their employees interact with benefits.
            </p>
          </div>
          
          <div className="text-normal">
            <p className="text-base leading-normal">
            During my bachelor's in Computer Engineering, I felt too disconnected from the human and visual side. Without any idea about what it meant, I started learning more about design.
            </p>
          </div>
          
          <div className="text-normal">
            <p className="text-base leading-normal">
              It's how I realized that design has a great balance between people and their behaviour, visuals and their importance, and innovation. All subjects that spark a deep curiosity in me.
            </p>
          </div>
          
          <div className="text-normal">
            <p className="text-base leading-normal">
              These days, I work with startups that genuinely care about their digital products and about their customers' experience with them.
            </p>
          </div>
          </div>

          {/* Email button */}
          <div className="mb-8 order-3 lg:order-2">
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
                exit: 1000
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
          <div className="mb-4 order-1 lg:order-3">
            <Slider />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-8 pb-2 mt-auto">
        <div className="text-normal flex items-center">
          <span className="text-base mr-2">Timisoara, Romania</span>
          {currentTime && <span className="text-muted text-base">({currentTime})</span>}
        </div>
        
        <div className="flex items-center space-x-2">
          <a 
            href="https://x.com/alexvlazar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-muted underline hover:text-text-accent transition-colors text-base"
          >
            X
          </a>
          <span className="text-text-muted">/</span>
          <a 
            href="https://www.linkedin.com/in/alexvlazar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-muted underline hover:text-text-accent transition-colors text-base"
          >
            LinkedIn
          </a>
          <span className="text-text-muted">/</span>
          <a 
            href="https://www.are.na/alex-lazar/channels" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-muted underline hover:text-text-accent transition-colors text-base"
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
