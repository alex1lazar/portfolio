import React from 'react';
import NarrowContainer from './containers/NarrowContainer';
import WideContainer from './containers/WideContainer';
import CaseStudySlider from './CaseStudySlider';

// Helper function to parse and render text with bold, italic, and links
const renderTextWithBold = (text) => {
  if (!text || typeof text !== 'string') return text;
  
  // First, split by links to preserve them
  // Pattern: [text](url)
  const linkPattern = /(\[([^\]]+)\]\(([^)]+)\))/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  
  // Find all links
  while ((match = linkPattern.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
    }
    // Add the link
    parts.push({ type: 'link', text: match[2], url: match[3] });
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) });
  }
  
  // If no links found, just use the original text
  if (parts.length === 0) {
    parts.push({ type: 'text', content: text });
  }
  
  // Helper to render formatted text (bold and italic)
  const renderFormattedText = (content) => {
    // Process bold first (**text**), then italic (*text*)
    // We need to be careful: *text* is italic, **text** is bold
    // Pattern: match **text** (bold) or *text* (italic, but not **text**)
    const formatPattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
    const formattedParts = [];
    let formatLastIndex = 0;
    let formatMatch;
    
    while ((formatMatch = formatPattern.exec(content)) !== null) {
      // Add text before the formatting
      if (formatMatch.index > formatLastIndex) {
        formattedParts.push({ 
          type: 'text', 
          content: content.substring(formatLastIndex, formatMatch.index) 
        });
      }
      
      // Determine if it's bold or italic
      const matchedText = formatMatch[0];
      if (matchedText.startsWith('**') && matchedText.endsWith('**')) {
        // Bold: **text**
        const boldText = matchedText.slice(2, -2);
        formattedParts.push({ type: 'bold', content: boldText });
      } else if (matchedText.startsWith('*') && matchedText.endsWith('*')) {
        // Italic: *text*
        const italicText = matchedText.slice(1, -1);
        formattedParts.push({ type: 'italic', content: italicText });
      }
      
      formatLastIndex = formatMatch.index + matchedText.length;
    }
    
    // Add remaining text
    if (formatLastIndex < content.length) {
      formattedParts.push({ 
        type: 'text', 
        content: content.substring(formatLastIndex) 
      });
    }
    
    // If no formatting found, return as plain text
    if (formattedParts.length === 0) {
      formattedParts.push({ type: 'text', content });
    }
    
    return formattedParts.map((part, index) => {
      if (part.type === 'bold') {
        return <strong key={index} className="font-medium">{part.content}</strong>;
      } else if (part.type === 'italic') {
        return <em key={index} className="italic">{part.content}</em>;
      }
      return <React.Fragment key={index}>{part.content}</React.Fragment>;
    });
  };
  
  // Now render each part
  return parts.map((part, partIndex) => {
    if (part.type === 'link') {
      // Check if it's an anchor link (starts with #)
      const isAnchorLink = part.url.startsWith('#');
      return (
        <a
          key={partIndex}
          href={part.url}
          onClick={isAnchorLink ? (e) => {
            e.preventDefault();
            const element = document.querySelector(part.url);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } : undefined}
          target={isAnchorLink ? undefined : '_blank'}
          rel={isAnchorLink ? undefined : 'noopener noreferrer'}
          className="text-color-accent hover:text-primary-hover underline"
        >
          {part.text}
        </a>
      );
    }
    
    // Handle formatted text (bold and italic)
    return (
      <React.Fragment key={partIndex}>
        {renderFormattedText(part.content)}
      </React.Fragment>
    );
  });
};

// Component to render nested lists recursively
const ListRenderer = ({ items, level = 0 }) => {
  if (!items || items.length === 0) return null;
  
  const isNested = level > 0;
  // Top-level: filled disc, nested: hollow circle
  const listClass = isNested 
    ? "list-outside space-y-1 ml-4 mt-1 text-text-normal font-sans text-base"
    : "list-disc list-outside space-y-2 mb-2 text-text-normal font-sans text-base";
  
  return (
    <ul 
      className={listClass}
      style={{
        paddingLeft: isNested ? '1rem' : '1rem',
        listStyleType: isNested ? 'circle' : 'disc'
      }}
    >
      {items.map((item, itemIndex) => {
        const itemText = typeof item === 'string' ? item : item.text;
        return (
          <li 
            key={itemIndex}
            style={{ paddingLeft: '0.25rem' }}
          >
            {renderTextWithBold(itemText)}
            {item.children && item.children.length > 0 && (
              <ListRenderer items={item.children} level={level + 1} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

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
            
            <h1 className="text-[1.75rem] leading-[2.25rem] font-serif mb-6">{title}</h1>
            <p className="text-lg text-text-normal font-serif mb-8 font-sans text-base">{subtitle}</p>
            
          </NarrowContainer>
        </WideContainer>
      </div>

      {/* Hero Image */}
      {heroImage && (
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <img 
            src={heroImage} 
            alt={title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="pb-16">
        {sections.map((section, index) => {
          // Handle carousel sections separately to break out of NarrowContainer
          if (section.type === 'carousel') {
            return (
              <div key={index} id={section.id} className="mb-16 scroll-mt-32">
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
                        <p className="font-sans text-base leading-relaxed text-text-normal mb-4">
                          {renderTextWithBold(section.content)}
                        </p>
                      )}
                      
                      {section.type === 'heading' && (
                        <h2 
                          id={section.id} 
                          className=" font-serif mb-4 mt-12 text-text-dark scroll-mt-32"
                        >
                          {renderTextWithBold(section.content)}
                        </h2>
                      )}
                      
                      {section.type === 'subheading' && (
                        <h3 
                          id={section.id} 
                          className="mb-4 mt-8 text-text-dark scroll-mt-32"
                        >
                          {renderTextWithBold(section.content)}
                        </h3>
                      )}
                      
                      {section.type === 'list' && (
                        <ListRenderer items={section.items} />
                      )}
                      
                      {section.type === 'quote' && (
                        <blockquote className="border-l-4 border-color-accent pl-6 py-4 bg-gray-50 rounded-r-lg mb-6">
                          <p className="text-lg italic text-text-normal font-sans">{renderTextWithBold(section.content)}</p>
                          {section.author && (
                            <cite className="text-sm text-text-normal mt-2 block">— {section.author}</cite>
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
                            <p className="text-text-normal mt-2 text-center">{section.caption}</p>
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
                            <h3 className="text-lg font-serif text-text-dark">{section.title}</h3>
                          <ul className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start">
                                <svg className="w-5 h-5 text-color-accent mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-text-normal font-sans text-base">{renderTextWithBold(item)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {section.type === 'stats' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                          {section.items.map((stat, statIndex) => (
                            <div key={statIndex} className="bg-gray-50 p-6 rounded-lg">
                              <div className="text-2xl font-medium text-color-accent mb-2 font-sans text-base">{stat.value}</div>
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
