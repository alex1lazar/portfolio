import React, { useState } from 'react';
import { typography } from '../styles/theme';
import { CSSTransition } from 'react-transition-group';
import '../styles/animations.css';

function HomeHero() {
  const [showTooltip, setShowTooltip] = useState(false);

  const copyEmail = () => {
    const email = 'lazarva25@gmail.com';
    navigator.clipboard.writeText(email);
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2400); // Total duration: 200ms fade in + 2000ms visible + 200ms fade out
  };

  return (
    <div className="pt-32 font-serif mb-16">
      <h1 className={typography.heading.h1}>Product Designer from Romania</h1>
      <p className="mb-5 text-lg text-text-secondary">
        Currently leading all design efforts at{' '}
        <a 
          href="https://www.kota.io" 
          className="text-text-link underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kota
        </a>
        .
      </p>
      <p className="mb-5 text-lg text-text-secondary">
        I work with start-ups that genuinely care about their customers' experience.
        My focus is on creating clean, functional software that delights the users and helps companies grow.
      </p>
      <p className="mb-8 text-lg text-text-tertiary">
        Otherwise, I'm all about different fields of design, reading, writing, running, and traveling Europe.
      </p>
      <div className="relative inline-block">
        <button
          onClick={copyEmail}
          className="bg-button-primary-bg text-button-primary-text px-4 py-2 rounded hover:bg-button-primary-hover transition-colors font-sans"
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

        <span className="ml-4 text-text-tertiary text-sm font-sans">
          At times open to freelance work
        </span>
      </div>
    </div>
  );
}

export default HomeHero;