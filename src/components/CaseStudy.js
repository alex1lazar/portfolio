import React from 'react';
import NarrowContainer from './containers/NarrowContainer';
import WideContainer from './containers/WideContainer';
import CaseStudySlider from './CaseStudySlider';

const CaseStudy = ({ 
  title, 
  subtitle, 
  role, 
  period, 
  sections = [], 
  heroImage, 
  onBack 
}) => {

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="pt-32">
        <WideContainer>
          <NarrowContainer>
            <button 
              onClick={onBack}
              className="flex items-center text-text-secondary hover:text-text-primary mb-8 transition-colors font-sans text-base"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-2 rotate-180">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Writing
            </button>
            
            <h1 className="text-[1.75rem] leading-[2.25rem] font-serif mb-6">{title}</h1>
            <p className="text-lg text-text-normal font-serif mb-8 font-sans text-base">{subtitle}</p>
            
            <div className="flex flex-wrap gap-8 text-sm font-sans text-base">
              <div>
                <span className="text-text-muted">Role</span>
                <p>{role}</p>
              </div>
              <div>
                <span className="text-text-muted">Period</span>
                <p>{period}</p>
              </div>
            </div>
          </NarrowContainer>
        </WideContainer>
      </div>

      {/* Hero Image */}
      {/* {heroImage && (
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <img 
            src={heroImage} 
            alt={title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )} */}

      {/* Content */}
      <div className="pb-16">
        {sections.map((section, index) => {
          // Handle carousel sections separately to break out of NarrowContainer
          if (section.type === 'carousel') {
            return (
              <div key={index} className="mb-16">
                <div className="max-w-7xl mx-auto px-6">
                  <CaseStudySlider 
                    images={section.images}
                    title={section.title}
                    aspectRatio={section.aspectRatio || '16/9'}
                  />
                </div>
              </div>
            );
          }

          // All other sections stay within NarrowContainer
          return (
            <div key={index}>
              <WideContainer>
                <NarrowContainer>
                  <div className="prose prose-lg max-w-none">
                    <div className="mb-2">
                      {section.type === 'paragraph' && (
                        <p className="font-sans text-base leading-relaxed text-text-secondary mb-4">
                          {section.content}
                        </p>
                      )}
                      
                      {section.type === 'heading' && (
                        <h2 className="text-[1.5rem] leading-[2rem] font-serif mb-4 mt-12">{section.content}</h2>
                      )}
                      
                      {section.type === 'subheading' && (
                        <h3 className="text-lg font-serif mb-2 mt-8 font-sans text-base">{section.content}</h3>
                      )}
                      
                      {section.type === 'list' && (
                        <ul className="list-disc list-inside space-y-2 mb-6 text-text-secondary font-sans text-base">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      )}
                      
                      {section.type === 'quote' && (
                        <blockquote className="border-l-4 border-color-accent pl-6 py-4 bg-gray-50 rounded-r-lg mb-6">
                          <p className="text-lg italic text-text-secondary font-sans">{section.content}</p>
                          {section.author && (
                            <cite className="text-sm text-text-tertiary mt-2 block">— {section.author}</cite>
                          )}
                        </blockquote>
                      )}
                      
                      {section.type === 'image' && (
                        <div className="my-8">
                          <img 
                            src={section.src} 
                            alt={section.alt} 
                            className="w-full h-auto rounded-lg shadow-lg"
                          />
                          {section.caption && (
                            <p className="text-text-tertiary text-sm mt-2 text-center">{section.caption}</p>
                          )}
                        </div>
                      )}
                      
                      {section.type === 'link' && (
                        <div className="my-6">
                          <a 
                            href={section.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-color-accent hover:text-primary-hover underline font-sans"
                          >
                            {section.text}
                          </a>
                        </div>
                      )}
                      
                      {section.type === 'overview' && (
                        <div className="bg-surface-light p-8 rounded-sm my-12">
                          <div className="flex items-center mb-2">
                            <span className="text-2xl">{section.icon}</span>
                            <h3 className="text-lg font-serif text-text-dark">{section.title}</h3>
                          </div>
                          <ul className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start">
                                <svg className="w-5 h-5 text-color-accent mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-text-secondary font-sans text-base">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {section.type === 'stats' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                          {section.items.map((stat, statIndex) => (
                            <div key={statIndex} className="bg-gray-50 p-6 rounded-lg">
                              <div className="text-2xl font-bold text-color-accent mb-2 font-sans text-base">{stat.value}</div>
                              <div className="text-text-secondary font-sans text-base">{stat.description}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </NarrowContainer>
              </WideContainer>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CaseStudy;
