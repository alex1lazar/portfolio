import React from 'react';
import ReactMarkdown from 'react-markdown';

const ArticleContent = ({ content, imageMap = {} }) => {
  console.log('ArticleContent render - imageMap keys:', Object.keys(imageMap));
  console.log('ArticleContent render - content preview:', content?.substring(0, 500));
  
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        components={{
          h1: ({children}) => <h1 className="text-4xl font-serif text-text-dark mb-6 mt-12">{children}</h1>,
          h2: ({children}) => <h2 className="text-xl font-serif text-text-dark mb-4 mt-10">{children}</h2>,
          h3: ({children}) => <h3 className="text-lg font-serif text-text-dark mb-3 mt-8">{children}</h3>,
          p: ({children, ...props}) => {
            // Check if paragraph contains only an image markdown syntax
            // ReactMarkdown might parse images as paragraphs in some cases
            const childrenStr = typeof children === 'string' ? children : 
              (Array.isArray(children) ? children.map(c => {
                if (typeof c === 'string') return c;
                if (React.isValidElement(c) && c.props?.children) {
                  return String(c.props.children);
                }
                return String(c);
              }).join('') : String(children));
            
            // Check if this paragraph is actually an image markdown (with optional whitespace)
            const imageMatch = childrenStr.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
            if (imageMatch) {
              const [, alt, src] = imageMatch;
              console.log('Found image in paragraph:', { src, alt, hasInMap: src in imageMap, imageMapKeys: Object.keys(imageMap).slice(0, 5) });
              const imageSrc = imageMap[src] || src;
              return (
                <img 
                  src={imageSrc} 
                  alt={alt || ''} 
                  className="w-full mt-2 mb-8 rounded-sm"
                />
              );
            }
            
            // Debug: log if paragraph contains image-like syntax
            if (childrenStr.includes('![') && childrenStr.includes('](')) {
              console.log('Paragraph contains image syntax but not matched:', childrenStr.substring(0, 100));
            }
            
            return <p className="text-text-secondary mb-4 leading-relaxed text-base" {...props}>{children}</p>;
          },
          a: ({href, children}) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover underline">{children}</a>,
          hr: () => <hr className="my-8 border-gray-300" />,
          blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-text-secondary my-4">{children}</blockquote>,
          code: ({children, className, ...props}) => {
            // Check if code block contains image markdown (shouldn't happen, but just in case)
            const codeStr = typeof children === 'string' ? children : String(children);
            if (codeStr.includes('![') && codeStr.includes('](')) {
              console.log('Found image syntax in code block:', codeStr.substring(0, 100));
            }
            return <code className={className} {...props}>{children}</code>;
          },
          img: ({src, alt, ...props}) => {
            console.log('IMG component called:', { src, alt, hasInMap: src in imageMap, imageMapKeys: Object.keys(imageMap).slice(0, 5) });
            // Check if src is an image key in the imageMap
            const imageSrc = imageMap[src] || src;
            return (
              <img 
                src={imageSrc} 
                alt={alt || ''} 
                className="w-full mt-2 mb-8  rounded-sm"
                {...props}
              />
            );
          },
          image: ({src, alt, ...props}) => {
            console.log('IMAGE component called:', { src, alt, hasInMap: src in imageMap });
            // Check if src is an image key in the imageMap
            const imageSrc = imageMap[src] || src;
            return (
              <img 
                src={imageSrc} 
                alt={alt || ''} 
                className="w-full mt-2 mb-8  rounded-sm"
                {...props}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleContent;