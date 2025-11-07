import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmailCopy from './common/EmailCopy';

const SectionHeader = ({ title }) => (
  <div className="flex gap-1.5 items-center shrink-0 w-[128px]">
    <div className="rounded-[1px] shrink-0 w-2 h-2 bg-color-accent"></div>
    <p className="font-serif text-lg text-text-dark whitespace-nowrap">
      {title}
    </p>
  </div>
);

function ExploreSection({ onOpenAbout }) {
  const [currentTime, setCurrentTime] = useState('');

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
    <div className="flex gap-6 items-start flex-col md:flex-row">
      <SectionHeader title="Explore" />
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start gap-3 justify-between">
          <div className="flex gap-3 items-center">
            <Link 
              to="/work" 
              className="font-serif font-semibold text-lg text-text-dark underline hover:text-text-accent transition-colors"
            >
              Work
            </Link>
            <span className="font-serif text-lg text-text-dark opacity-30">/</span>
            <Link 
              to="/reading" 
              className="font-serif font-semibold text-lg text-text-dark underline hover:text-text-accent transition-colors"
            >
              Reading
            </Link>
            <span className="font-serif text-lg text-text-dark opacity-30">/</span>
            <Link 
              to="/writing" 
              className="font-serif font-semibold text-lg text-text-dark underline hover:text-text-accent transition-colors"
            >
              Writing
            </Link>
            <span className="font-serif text-lg text-text-dark opacity-30">/</span>
            <button 
              onClick={onOpenAbout}
              className="font-serif font-semibold text-lg text-text-dark underline hover:text-text-accent transition-colors"
            >
              About
            </button>
          </div>
          <div className="relative inline-block">
            <EmailCopy className="font-serif font-semibold text-lg text-text-dark underline transition-opacity hover:text-text-accent">
              Copy my email
            </EmailCopy>
          </div>
        </div>
        <div className="flex gap-12 items-end">
          <div className="flex gap-3 items-center flex-col-reverse md:flex-row">
            <p className="font-sans font-normal text-base text-text-muted whitespace-nowrap">
              Timisoara, Romania {currentTime && `(${currentTime})`}
            </p>
            <div className="flex gap-3 items-center">
              <span className="font-sans text-base text-text-muted hidden">/</span>
              <a 
                href="https://x.com/alexvlazar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-sans font-normal text-base text-text-muted underline hover:text-text-accent transition-colors"
              >
                X
              </a>
              <span className="font-sans text-base text-text-muted">/</span>
              <a 
                href="https://www.linkedin.com/in/alexvlazar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-sans font-normal text-base text-text-muted underline hover:text-text-accent transition-colors"
              >
                LinkedIn
              </a>
              <span className="font-sans text-base text-text-muted">/</span>
              <a 
                href="https://www.are.na/alex-lazar/channels" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-sans font-normal text-base text-text-muted underline hover:text-text-accent transition-colors"
              >
                Are.na
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreSection;

